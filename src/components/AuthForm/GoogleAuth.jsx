import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, firestore } from "../../firebase/firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { Flex, Image, Text } from "@chakra-ui/react";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";

const GoogleAuth = ({ prefix }) => {
  const showToast = useShowToast();
  const loginUser = useAuthStore((state) => state.login);

  const handleGoogleAuth = async () => {
    const provider = new GoogleAuthProvider(); // GoogleAuthProvider 인스턴스 생성

    try {
      // 구글 팝업 로그인
      const result = await signInWithPopup(auth, provider);

      // Firebase Authentication에서 반환한 사용자 정보
      const user = result.user;

      const userDocRef=doc(firestore, "users", user.uid);
      const userDocSnap= await getDoc(userDocRef)

      if(!userDocSnap.exists()){
        // sign up
        const userDoc = {
          uid: user.uid,
          email: user.email,
          username: user.email.split("@")[0],
          fullName: user.displayName,
          bio: "",
          profilePicURL: user.photoURL,
          followers: [],
          following: [],
          posts: [],
          createdAt: Date.now(),
        };
  
        // Firestore에 사용자 정보 저장
        await setDoc(doc(firestore, "users", user.uid), userDoc);
  
        // 로컬스토리지에 사용자 정보 저장
        localStorage.setItem("user-info", JSON.stringify(userDoc));
  
        // 전역 상태 업데이트
        loginUser(userDoc);
  
        showToast("Success", "You have successfully signed in with Google", "success");
      
      }else{ //login
        const existingUserDoc=userDocSnap.data();

        localStorage.setItem("user-info",JSON.stringify(existingUserDoc));

        loginUser(existingUserDoc);

        showToast("Success", "You have successfully logged in with Google", "success");
      }

    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return (
    <Flex alignItems={"center"} justifyContent={"center"} cursor={"pointer"} onClick={handleGoogleAuth}>
      <Image src="google.png" w={5} alt="Google logo" />
      <Text mx="2" color={"blue.500"}>{prefix} with Google</Text>
    </Flex>
  );
};

export default GoogleAuth;
