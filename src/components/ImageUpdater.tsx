import { useState } from "react";
import { updateImage } from "../_lib/APIs/TaskAPIs";

const ImageUpdater = ({ previousImagePath }: any) => {
  const [file, setFile] = useState<null | any>(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const handleUpdate = async () => {
    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }

    try {
      const newImageUrl = await updateImage(previousImagePath, file);
      setMessage(`Upload successful! Image URL: ${newImageUrl}`);
    } catch (error: any) {
      setMessage(`Upload failed: ${error.message}`);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpdate}>Update Image</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ImageUpdater;
