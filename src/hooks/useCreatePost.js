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
	const showToast = useShowToast();
	const uploadImage=useUploadImage();
    const authUser=useAuthStore((state)=>state.user);
    const createPost=usePostStore(state => state.createPost)
    // const addPost=useUserProfileStore(state=>state.addPost);

    const fuckPost = async (caption,selectedFile) => {
        if(!selectedFile) throw new Error('Please select an image');
		setIsUpdating(true);
        const newPost = {
            caption: caption,
            likes:[],
            comments: [],
            createdAt: new Date().now(),
            createdBy: authUser.uid,
        };

		try {
            //add post img to storage
            const postDocRef=await addDoc(collection(firestore,"posts"),newPost);
            const userDocRef=doc(firestore,"users",authUser.uid);
            const downloadURL=uploadImage("posts");

            await updateDoc(userDocRef,{posts:arrayUnion(postDocRef.id)})
            
            await updateDoc(postDocRef,{imageURL:downloadURL});
            
            newPost.imgURL=downloadURL;
            createPost({...newPost,id:postDocRef.id});

            showToast("Success", "Post created successfully", "success");
		} catch (error) {
			showToast("Error", error.message, "error");
		}finally{
            setIsUpdating(false);
        }
	};

	return { fuckPost, isUpdating };
};

export default useCreatePost;