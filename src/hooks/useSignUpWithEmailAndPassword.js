import { doc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../firebase/firebase";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import useShowToast from "./useShowToast";

const useSignUpWithEmailAndPassword = () => {
    const [
        createUserWithEmailAndPassword,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);
      const showToast=useShowToast();

      const signup= async(inputs)=>{
        if(!inputs.email||!inputs.password ||!inputs.username||!inputs.fullName){
            showToast("Error","please fill all the fiedls","error");
            return
        }
        try{
            const newUser=await createUserWithEmailAndPassword(inputs.email,inputs.password)

            if(newUser){
                const userDoc={
                    uid:newUser.user.uid,
                    email:inputs.email,
                    username:inputs.username,
                    fullName:inputs.fullName,
                    bio:"",
                    profilePicURL:"",
                    followers:[],
                    following:[],
                    posts:[],
                    createdAt:Date.now()
                }
                await setDoc(doc(firestore,"users",newUser.user.uid),userDoc);
                localStorage.setItem("user-info",JSON.stringify(userDoc))
                showToast("Success", "Account created successfully!", "success");
            }
        }catch(error){
            console.error('Firebase signup error:', error.code, error.message);
            showToast("Error",error.message,"error");
        }
      }
  return{loading,error,signup}
}

export default useSignUpWithEmailAndPassword