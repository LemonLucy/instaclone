import {  useState,useEffect } from 'react';
// import useUploadImage from './useUploadImg';
import useShowToast from "./useShowToast";

const usePreviewImg = (initialImage) => {
    const [imageUrl, setImageUrl] = useState(initialImage);
    const showToast = useShowToast();
    const maxFileSizeInBytes = 2 * 1024 * 1024; // 2MB
    // const uploadImage = useUploadImage(); // 이미지 업로드 훅 사용
  
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file &&file.type.startsWith("image/")) {
        if (file.size > maxFileSizeInBytes) {
            showToast("Error", "File size must be less than 2MB", "error");
            setImageUrl(null);
            return;
        }
        const url = URL.createObjectURL(file); // 미리보기 URL 생성
        setImageUrl(url);

        // const reader = new FileReader();

        // reader.onloadend = () => {
        //     setImageUrl(reader.result);
        // };
      }else {
        showToast("Error", "Please select an image file", "error");
        setImageUrl(null);
        }
    };
  
    useEffect(() => {
      return () => {
          if (imageUrl) {
              URL.revokeObjectURL(imageUrl); // Free memory
          }
      };
  }, [imageUrl]);

    return { imageUrl, handleImageChange,setImageUrl };
  };
  
  export default usePreviewImg;