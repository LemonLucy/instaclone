//이미지 firebase에 업로드하고 다운로드 반환
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/firebase';

const useUploadImage = () => {
    const uploadImage = async (file) => {
      if(!file||!file.name){
        throw new Error("file is not valid");
      }
      const storageRef = ref(storage, `profilePics/${file.name}`); // 저장할 경로 설정
      await uploadBytes(storageRef, file); // 이미지 업로드
      const url = await getDownloadURL(storageRef); // 업로드 후 다운로드 URL 가져오기
      return url; // URL 반환
    };
  
    return uploadImage;
};
export default useUploadImage;