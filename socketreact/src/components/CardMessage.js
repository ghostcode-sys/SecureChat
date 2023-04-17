import React, { useEffect, useRef, useState } from "react";
import sten from "./sten";
import axios from "axios";
import { LOCALIMG } from "./utils";
const CardMessage = ({ msg, hideCard }) => {
  const focus = useRef(null);
  // const [file, setFile] = useState(null);
  const [isEncoded, setisEncoded] = useState(false);
  const [preview, setPreview] = useState("");
  const [previewEncode, setPreviewEncode] = useState("");
  const handleChange = (e) => {
    if (e.target.files[0]) {
      // setFile(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const hideText = () => {
    const im = document.getElementById("orgImg");
    const imgDataUrl = sten.encode(msg, im);
    if (imgDataUrl) {
      setisEncoded(true);
      setPreviewEncode(imgDataUrl);
    }
  };

  useEffect(() => {
    setisEncoded(false);
    setPreview("");
  }, []);

  function dataURLtoBlob() {
    var arr = previewEncode.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return (new Blob([u8arr], { type: mime }));
  }
  
  const uploadImage = async () => {
    try {
      const blob = dataURLtoBlob()
      if(blob){
        const fd = new FormData();
        fd.append("chatimages", blob);

        const res =await axios.post(LOCALIMG, fd);
        if(res && res.data){
          hideCard(res.data);
        }
        else{
          window.alert("Image not Uploaded please try again")
        }
      }
    } catch (error) {
      window.alert("Image not Uploaded please try again")
    }
  }

  return (
    <div className="fixed bottom-1/2 left-1/2 border-2 w-64 h-72 rounded bg-lime-50">
      {!preview && (
        <button
          className="w-64 h-72 flex justify-center items-center "
          onClick={() => focus.current.click()}
        >
          <img src="https://img.icons8.com/ios/50/null/image--v1.png" alt="icon of potrait" />
        </button>
      )}
      <input
        type="file"
        onChange={handleChange}
        ref={focus}
        className="hidden"
      />
      {preview &&
        (!isEncoded ? (
          <img src={preview} alt="Preview" className="w-64 h-64" id="orgImg" />
        ) : (
          <img src={previewEncode} alt="Encoded" className="w-64 h-64" />
        ))}
      {preview &&
        (!isEncoded ? (
          <button onClick={hideText} className="text-center w-64 px-4 font-bold"> Hide Text</button>
        ) : (
          <button onClick={uploadImage} className="text-center w-64 px-4 font-bold"> Send Message</button>
        ))}
    </div>
  );
};

export default CardMessage;
