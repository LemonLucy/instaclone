import React from 'react'
import { Flex,Avatar,AvatarGroup,VStack,Text,Button } from '@chakra-ui/react'

const ProfileHeader = () => {
  return (<Flex gap={{base: 4,sm: 10}} py={10} direction={{ base: "column", sm:"row"}}>

    <AvatarGroup size={{base: "xl", md:"2xl"}} justifySelf={"center"} alignSelf={"flex-start"} mx={"auto"}>
        <Avatar name='As a Programmer' src='/profilepic.png' alt='As a programmer logo' />
    </AvatarGroup>

    <VStack alignItems={"start"} gap={2} mx={"auto"} flex={1}>
        <Flex gap={4} direction={{base:"column",sm:"row"}} justifyContent={{base: "center", sm: "flex-start"}} alignItems={"center"} w={"full"}>
            <Text fontSize={{base: "sm", md: "lg"}}>asaprogrammer</Text>
            <Flex gap={4} alignItems={"center"} jusifyContent={"center"}>
                <Button bg={"white"} color={"black"} _hover={{bg: "whiteAlpha.800"}} size={{base: "xs", md: "sm"}}>
                    Edit Profile
                </Button>
            </Flex>
        </Flex>

        <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
            <Text fontSize={{base: "xs",md:"sm"}}>
                <Text as='span' fontWeight={"bold"} mr={1}>4</Text>
                Posts
            </Text>
            <Text fontSize={{base: "xs",md:"sm"}}>
                <Text as='span' fontWeight={"bold"} mr={1}>49</Text>
                Followers
            </Text>
            <Text fontSize={{base: "xs",md:"sm"}}>
                <Text as='span' fontWeight={"bold"} mr={1}>32</Text>
                Following
            </Text>
        </Flex>
        <Flex>
            <Text>As a Programmer</Text>
        </Flex>
            <Text fontSize={{base: "xs",md:"sm"}}>Tutorials</Text>
        </VStack>
    </Flex>
  )
}

export default ProfileHeader