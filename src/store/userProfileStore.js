import {create} from "zustand";

const useUserProfileStore=create((set) => ({
    userProfile:null,
    setUserProfile: (userProfile) => {
        console.log('zustand에서 setUserProfile 호출')
        set({userProfile})
    }
}))

export default useUserProfileStore