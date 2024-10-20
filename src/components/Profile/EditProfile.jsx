import {
    Button,
    Flex,
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
      <Flex 
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
            User Profile Edit
          </Heading>
          <FormControl id="userName">
            <Stack direction={['column', 'row']} spacing={6}>
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
                  />
                </Avatar>
              </Center>
              <Center w="full">
                <Button w="full" onClick={() => fileRef.current.click()}>Edit Profile</Button>
              </Center>
              <Input type='file' hidden ref={fileRef} 
              onChange={handleImageChangeWrapper}
              />
            </Stack>
          </FormControl>

          <FormControl>
            <FormLabel fontSize={"sm"}>Full Name</FormLabel>
            <Input
                placeholder={"Full Name"}
                size={"sm"}
                type={"text"}
                value={inputs.fullName || authUser.fullName}
                onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
            />
        </FormControl>

        <FormControl>
            <FormLabel fontSize={"sm"}>Username</FormLabel>
            <Input
                placeholder={"Username"}
                size={"sm"}
                type={"text"}
                value={inputs.username || authUser.username}
                onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
            />
        </FormControl>

        <FormControl>
            <FormLabel fontSize={"sm"}>Bio</FormLabel>
            <Input
                placeholder={"Bio"}
                size={"sm"}
                type={"text"}
                value={inputs.bio || authUser.bio}
                onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
            />
        </FormControl>
          <Stack spacing={6} direction={['column', 'row']}>
            <Button
              bg={'red.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'red.500',
              }}
              onClick={onClose}
              >
              Cancel
            </Button>
            <Button
              bg={'blue.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'blue.500',
              }}
              onClick={handleEditProfile}
              isLoading={isUpdating}
              >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    )
  }