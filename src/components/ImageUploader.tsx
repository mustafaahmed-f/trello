import { useState } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import supabase from "../_lib/supabase";
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
interface props {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  onUploadComplete: (uploaded: boolean) => void;
}

const {
  data: { user },
} = await supabase.auth.getUser();

const ImageUploader = ({ register, setValue, onUploadComplete }: props) => {
  const [file, setFile] = useState<null | any>(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }

    const filePath = `${user?.id}/${file?.name}`; // Uploading to root of the bucket

    // Upload file to Supabase
    const { error } = await supabase.storage
      .from("Trello tasks") // replace with your bucket name
      .upload(filePath, file);

    if (error) {
      setMessage(`Upload failed: ${error.message}`);
    } else {
      const publicURL = `${supabaseUrl}/storage/v1/object/public/Trello%20tasks/${user?.id}/${file.name}`;
      setValue("image", publicURL); // Set the public URL in the form
      console.log(publicURL);
      setMessage("Upload successful!");
      onUploadComplete(true);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        type="file"
        {...register("image", {
          onChange: (e) => handleFileChange(e),
        })}
      />
      <button
        onClick={handleUpload}
        className="hover:text-teal-400"
        type="button"
      >
        Upload Image
      </button>
      {message && <p className="text-green-400">{message}</p>}
    </div>
  );
};

export default ImageUploader;
