import {
    Button,
    Box,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    Avatar,
    AvatarBadge,
    IconButton,
    Center,
  } from '@chakra-ui/react'
  import { SmallCloseIcon } from '@chakra-ui/icons'
  import { useState,useRef } from 'react'
  import useAuthStore from '../../store/authStore'
  import usePreviewImg from '../../hooks/usePreviewImg'
  import useEditProfile from '../../hooks/useEditProfile'
  import useShowToast from '../../hooks/useShowToast'

  export default function UserProfileEdit({onClose}) {
    const [inputs,setInputs]=useState({
      fullName: "",
      username: "",
      bio: "",     
    })

    const authUser=useAuthStore((state)=>state.user);
    const fileRef=useRef(null);    
    const { imageUrl, handleImageChange } = usePreviewImg(authUser.imageUrl);
    const {isUpdating,editProfile}=useEditProfile({ path: "profilePic" });
    const showToast=useShowToast();
    const [selectedFile, setSelectedFile] = useState(null);

    const handleImageChangeWrapper = (e) => {
      const file = e.target.files[0];
      if (file) {
        handleImageChange(e);
        setSelectedFile(file);
      }    
    };

    const handleEditProfile=async() =>{
      try {
        await editProfile(inputs,selectedFile);
        showToast("Success", "Profile updated successfully", "success");
        onClose();
      }catch(error){
        showToast("Error", error.message, "error");
      }
    }

    return (
      <Box
        position="absolute" // 절대 위치로 설정
        top="50%" // 화면 중앙에 배치
        left="50%"
        transform="translate(-50%, -50%)" // 중앙 정렬
        bg={useColorModeValue("white", "gray.700")}
        p={6}
        rounded="xl"
        boxShadow="lg"
        zIndex={10} // 상위 레이어에 표시
        maxW="md"
        w="full"
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          User Profile Edit
        </Heading>
  
        <Stack spacing={4}>
          <FormControl id="userName">
            <Stack direction={["column", "row"]} spacing={6}>
              <Center>
                <Avatar size="xl" src={imageUrl}>
                  <AvatarBadge
                    as={IconButton}
                    size="sm"
                    rounded="full"
                    top="-10px"
                    colorScheme="red"
                    aria-label="remove Image"
                    icon={<SmallCloseIcon />}
                    onClick={() => {
                      setSelectedFile(null);
                    }}
                  />
                </Avatar>
              </Center>
              <Center w="full">
                <Button w="full" onClick={() => fileRef.current.click()}>
                  Edit Profile Image
                </Button>
              </Center>
              <Input type="file" hidden ref={fileRef} onChange={handleImageChangeWrapper} />
            </Stack>
          </FormControl>
  
          <FormControl>
            <FormLabel>Full Name</FormLabel>
            <Input
              placeholder="Full Name"
              value={inputs.fullName || authUser.fullName}
              onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
            />
          </FormControl>
  
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              placeholder="Username"
              value={inputs.username || authUser.username}
              onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
            />
          </FormControl>
  
          <FormControl>
            <FormLabel>Bio</FormLabel>
            <Input
              placeholder="Bio"
              value={inputs.bio || authUser.bio}
              onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
            />
          </FormControl>
  
          <Stack spacing={6} direction={["column", "row"]}>
            <Button
              bg="red.400"
              color="white"
              w="full"
              _hover={{ bg: "red.500" }}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              bg="blue.400"
              color="white"
              w="full"
              _hover={{ bg: "blue.500" }}
              onClick={handleEditProfile}
              isLoading={isUpdating}
            >
              Save
            </Button>
          </Stack>
        </Stack>
      </Box>
    );  }