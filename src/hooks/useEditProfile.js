//fireStore  사용자 정보 업데이트
import { useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { firestore } from "../firebase/firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import useUserProfileStore from "../store/userProfileStore";
import useUploadImage from "./useUploadImg";

const useEditProfile = ({path}) => {
	const [isUpdating, setIsUpdating] = useState(false);
	const authUser = useAuthStore((state) => state.user);
	const setAuthUser = useAuthStore((state) => state.setUser);
	const setUserProfile = useUserProfileStore((state) => state.setUserProfile);
	const showToast = useShowToast();
	const uploadImage=useUploadImage(path);

	const editProfile = async (inputs={}, selectedFile=null, newPost=null) => {
		if (isUpdating || !authUser) return;
		setIsUpdating(true);

		const userDocRef = doc(firestore, "users", authUser.uid);
		let URL = "";

		try {
			if (selectedFile) {
                URL = await uploadImage(selectedFile);
			}

			const updatedUser = {
				...authUser,
				fullName: inputs.fullName || authUser.fullName,
				username: inputs.username || authUser.username,
				bio: inputs.bio || authUser.bio,
				profilePicURL: URL || authUser.profilePicURL,
			};

			// Firestore 업데이트 객체 생성
			const updates = { ...updatedUser };

			// posts 배열에 새 게시물 추가가 필요한 경우
			if (newPost) {
				const postData = {
				  postId: newPost.postId || Date.now().toString(),
				  caption: newPost.caption || "",
				  imageURL: newPost.imageURL || URL,
				  createdAt: new Date().toISOString(),
				};
				updates.posts = arrayUnion(postData); // posts 배열에 추가
			}

			// Firestore에 업데이트 수행
			await updateDoc(userDocRef, updates);

			localStorage.setItem("user-info", JSON.stringify(updatedUser));
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