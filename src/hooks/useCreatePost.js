//fireStore  사용자 정보 업데이트
import { useState } from "react";
import useShowToast from "./useShowToast";
import { firestore } from "../firebase/firebase";
import {  addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import useUploadImage from "./useUploadImg";
import useAuthStore from "../store/authStore";
import usePostStore from "../store/postStore";

const useCreatePost = () => {
	const [isUpdating, setIsUpdating] = useState(false);

	const uploadImage=useUploadImage(); //firestore에 업로드한 이미지 url가져옴

    //zustand에서 전역상태 불러옴
    const authUser=useAuthStore((state)=>state.user);
    const createPost=usePostStore(state => state.createPost)
    // const addPost=useUserProfileStore(state=>state.addPost);

    const showToast = useShowToast();

    const createNewPost = async (caption,selectedFile) => {
        if(isUpdating)return;
		setIsUpdating(true);

        let URL="";//이미지 파일 url

		try {
            if(selectedFile){
                URL=await uploadImage(selectedFile, "/postPic"); 
            }

            const newPost = {
                caption: caption,
                likes:[],
                comments: [],
                createdAt: new Date().now(),
                createdBy: authUser.uid,
                imageUrl: URL,
            };

            //firestore에 post 컬렉션 추가
            const postDocRef=await addDoc(collection(firestore,"posts"),newPost);
            const userDocRef=doc(firestore,"users",authUser.uid);

            await updateDoc(userDocRef,{posts:arrayUnion(postDocRef.id)}) //authUser객체의 posts필드에 포스트 ID추가

            //zustand 전역상태관리에 새포스트 추가
            createPost({...newPost,id:postDocRef.id});

            showToast("Success", "Post created successfully", "success");
		} catch (error) {
			showToast("Error", error.message, "error");
		}finally{
            setIsUpdating(false);
        }
	};

	return { createNewPost, isUpdating };
};

export default useCreatePost;