import { useState } from "react";
import supabase from "../_lib/supabase";

const ImageUploader = () => {
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

    const filePath = `${file?.name}`; // Uploading to root of the bucket

    // Upload file to Supabase
    const { error } = await supabase.storage
      .from("Trello tasks") // replace with your bucket name
      .upload(filePath, file);

    if (error) {
      setMessage(`Upload failed: ${error.message}`);
    } else {
      setMessage("Upload successful!");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Image</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ImageUploader;
