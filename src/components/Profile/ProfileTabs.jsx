import React from 'react'
import { Flex,Box,Text } from '@chakra-ui/react'
import { BsBookmark, BsGrid3X3, BsSuitHeart } from 'react-icons/bs'

const ProfileTabs = () => {
  return (
    <Flex>
        <Flex borderTop={"1px solid white"} alignItems={"center"} p="3" gap={1} cursor={"pointer"}>
        <Box display="flex" alignItems="center" gap={1} fontSize={20}>
                <BsGrid3X3 />
                <Text fontSize={12} display={{base: "none",sm:"block"}}>Posts</Text>
            </Box>
        </Flex>


        <Flex alignItems={"center"} p="3" gap={1} cursor={"pointer"}>
        <Box display="flex" alignItems="center" gap={1} fontSize={20}>
                <BsBookmark />
                <Text fontSize={12} display={{base: "none",sm:"block"}}>Saved</Text>
            </Box>
        </Flex>

        <Flex alignItems={"center"} p="3" gap={1} cursor={"pointer"}>
        <Box display="flex" alignItems="center" gap={1} fontSize={20}>
                <BsSuitHeart />
                <Text fontSize={12} display={{base: "none",sm:"block"}}>Likes</Text>
            </Box>
        </Flex>
    </Flex>
  )
}

export default ProfileTabs