import { doc, setDoc, collection,query, where, getDocs } from "firebase/firestore";
import { auth, firestore } from "../firebase/firebase";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";

const useSignUpWithEmailAndPassword = () => {
    const [
        createUserWithEmailAndPassword,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);
    const showToast=useShowToast();
    const loginUser= useAuthStore(state => state.login)

    const signup= async(inputs)=>{
        if(!inputs.email||!inputs.password ||!inputs.username||!inputs.fullName){
            showToast('error','please fill the blanks','error');
            return
        }

        const usersRef=collection(firestore,"users");
        const q= query(usersRef, where("username", "==", inputs.username));

        const querySnapshot=await getDocs(q);

        if(!querySnapshot.empty){
            showToast('error','user already exists','error');
            return;
        }
        try{
            //1.firebase와 상호작용 : 사용자 등록, firestore에 저장
            const newUser = await createUserWithEmailAndPassword( inputs.email, inputs.password);            

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
                //2. 상태관리 : 전역적으로 사용자 정보 유지, 다른 곳에서 사용할수있도록
                localStorage.setItem("user-info",JSON.stringify(userDoc))
                loginUser(userDoc);   
            } 
        }catch(error){
            showToast('error',error.message,'error');
        }
    }
    return{loading,error,signup}
}

export default useSignUpWithEmailAndPassword