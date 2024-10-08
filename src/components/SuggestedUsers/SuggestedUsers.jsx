import React from 'react'
import { VStack,Flex,Box,Text, Link } from '@chakra-ui/react'
import SuggestedHeader from "./SuggestedHeader"
import SuggestedUser from "./SuggestedUser"

const SuggestedUsers = () => {
  return <VStack py={8} px={6} gap={4}>
    <SuggestedHeader />

    <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
        <Text>Suggested for you</Text>
        <Text fontSize={12} fontWeight={"bold"} color={"gray.400"} cursor={"pointer"}>
        See All </Text>
    </Flex>

    <SuggestedUser name ="Dan" followers={1394} avatar='https://bit.ly/dan-abnamov' />
    <SuggestedUser name ="Dan" followers={1394} avatar='https://bit.ly/dan-abnamov' />
    <SuggestedUser name ="Dan" followers={1394} avatar='https://bit.ly/dan-abnamov' />

    <Box fontSize={12} color={"gray.500" } mt={5}
    > 2024 Built By{" "}
    <Link href='https://github.com/LemonLucy'  target='_blank' color='blue.500' fontSize={14}> As a Programmer
    </Link>
    </Box>
  </VStack>
}

export default SuggestedUsers