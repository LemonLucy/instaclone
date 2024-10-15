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
  import { useState } from 'react'
  
  export default function UserProfileEdit({onClose}) {
    const [inputs,setInputs]=useState({
        fullName: "",
		username: "",
		bio: "",
    })

    const handleEditProfile=()=>{
        console.log(inputs);
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
            <FormLabel>User Icon</FormLabel>
            <Stack direction={['column', 'row']} spacing={6}>
              <Center>
                <Avatar size="xl" src="https://bit.ly/sage-adebayo">
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
                <Button w="full">Change Icon</Button>
              </Center>
            </Stack>
          </FormControl>

          <FormControl>
            <FormLabel fontSize={"sm"}>Full Name</FormLabel>
            <Input
                placeholder={"Full Name"}
                size={"sm"}
                type={"text"}
                value={inputs.fullName}
                onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
            />
        </FormControl>

        <FormControl>
            <FormLabel fontSize={"sm"}>Username</FormLabel>
            <Input
                placeholder={"Username"}
                size={"sm"}
                type={"text"}
                value={inputs.username}
                onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
            />
        </FormControl>

        <FormControl>
            <FormLabel fontSize={"sm"}>Bio</FormLabel>
            <Input
                placeholder={"Bio"}
                size={"sm"}
                type={"text"}
                value={inputs.bio}
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
              >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    )
  }