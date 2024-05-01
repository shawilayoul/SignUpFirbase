import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { db, storage } from "../firebase";
import { updateProfile } from "firebase/auth";

const Profile = ({ currentUser }) => {
  const [imageUpload, setImageUpload] = useState(null);
  const [photoURL, setPhotoURL] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
  );

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImageUpload(e.target.files[0]);
    }
  };
  const uploadFile = () => {
    const imagRef = ref(storage, "image");
    uploadBytes(imagRef, imageUpload)
      .then(() => {
        getDownloadURL(imagRef)
          .then((url) => {
            setPhotoURL(url);
            console.log(url);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => console.log(error.message));
  };
  return (
    <div>
      <div>
        <label htmlFor="userImage">Upload an image</label>
        <input
          type="file"
          id="userImage"
          name="userImage"
         // accept="image/*"
          onChange={(e)=>handleImageChange(e)}
        />
        <div className="useImage">
          <img src={photoURL} alt="" />
        </div>

        <button onClick={uploadFile}>upload</button>
      </div>
    </div>
  );
};

export default Profile;
