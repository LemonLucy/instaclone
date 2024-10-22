import { useEffect, useState } from 'react';
import usePostStore from '../store/postStore';
import useUserProfileStore from '../store/userProfileStore';
import useShowToast from './useShowToast';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';

const useGetUserPosts = () => {
    const [isLoading,setIsLoading]=useState(true);
    const {posts,setPosts}=usePostStore();
    const showToast=useShowToast();
    const userProfile=useUserProfileStore((state)=>state.userProfile);

    useEffect(() =>{
        const getPosts=async () => {
            if(!userProfile) {
                console.log('userProfile이 없습니다. 로딩 종료');
                setIsLoading(false);
                return;
            }
            console.log('userProfile 존재:', userProfile);
            setIsLoading(true);
            setPosts([])
            try{
                const q=query(collection(firestore,"posts"),where("createdBy","==",userProfile.uid))
                const querySnapshot=await getDocs(q)
                console.log('Firestore 쿼리 성공:', querySnapshot.size);

                const posts=[]
                querySnapshot.forEach(doc=>{
                    posts.push({...doc.data(), id:doc.id})
                })

                posts.sort((a,b) =>b.createdAt - a.createdAt)
                console.log('정렬된 포스트:', posts);
                
                setPosts(posts)

            }catch(error){
                showToast("Error",error.message,"error");
                setPosts([])
            }finally{
                setIsLoading(false);
            }
        }
        getPosts();
    },[setPosts,userProfile,showToast])
    return {isLoading,posts}
}

export default useGetUserPosts