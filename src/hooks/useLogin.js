import useShowToast from "./useShowToast"
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from "../firebase/firebase";
import useAuthStore from "../store/authStore";
import { doc,getDoc } from "firebase/firestore";
import { useEffect } from "react";

const useLogin = () => {
  const showToast=useShowToast();
  const [
    signInWithEmailAndPassword,
    
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  const loginUser=useAuthStore((state)=>state.login);

  useEffect(() => {
    if (error) {
      showToast("Error", error.message, "error");
    }
  }, [error]);

  const login=async(inputs) =>{
    if(!inputs.email||!inputs.password){
        return showToast("Error","Please fill all the fields", "error"); 
    }
    try{
        const userCred=await signInWithEmailAndPassword(inputs.email,inputs.password);
        if(userCred){
            const docRef=doc(firestore, "users",userCred.user.uid);
            const docSnap=await getDoc(docRef);

            //local storage에 사용자 정보 저장
            localStorage.setItem("user-info", JSON.stringify(docSnap.data()));
            loginUser(docSnap.data())
            console.log("Logined")
        }
    }catch(error){
        console.log("Login failed:", error);
    }
  }
  return {loading,error,login}
}

export default useLogin