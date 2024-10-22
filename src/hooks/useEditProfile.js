//fireStore  사용자 정보 업데이트
import { useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { firestore } from "../firebase/firebase";
import {  doc, updateDoc } from "firebase/firestore";
import useUserProfileStore from "../store/userProfileStore";
import useUploadImage from "./useUploadImg";

const useEditProfile = () => {
	const [isUpdating, setIsUpdating] = useState(false); //로딩중 상태관리

	//authStore전역 상태관리
	const authUser = useAuthStore((state) => state.user); 
	const setAuthUser = useAuthStore((state) => state.setUser);
	const setUserProfile = useUserProfileStore((state) => state.setUserProfile);

	const showToast = useShowToast();

	//firebase storage에 이미지 업로드 -> 이미지 url 반환
	const uploadImage=useUploadImage();

	const editProfile = async (inputs,selectedFile) => {
		if (isUpdating || !authUser) return;
		setIsUpdating(true);

		//firestore에 docs url 반환
		const userDocRef = doc(firestore, "users", authUser.uid);
		let URL = "";

		try {
			if (selectedFile) {
                URL = await uploadImage(selectedFile,"/profilePic");
			}

			const updatedUser = {
				...authUser,
				fullName: inputs.fullName || authUser.fullName,
				username: inputs.username || authUser.username,
				bio: inputs.bio || authUser.bio,
				profilePicURL: URL || authUser.profilePicURL,
			};

			// Firestore에 업데이트 수행
			await updateDoc(userDocRef, updatedUser);

			//브라우저 로컬 저장소에 user-info업데이트
			localStorage.setItem("user-info", JSON.stringify(updatedUser));

			//zustnad 상태저장소에 업데이트
			setAuthUser(updatedUser);
			setUserProfile(updatedUser);
			
			showToast("Success", "Profile updated successfully", "success");
		} catch (error) {
			showToast("Error", error.message, "error");
		}
	};

	return { editProfile, isUpdating };
};

export default useEditProfile;