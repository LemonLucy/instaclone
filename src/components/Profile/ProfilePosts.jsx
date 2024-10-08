import {useState,useEffect} from 'react'
import { Grid,VStack,Flex,Skeleton,Box } from '@chakra-ui/react'
import ProfilePost from './ProfilePost'

const ProfilePosts = () => {
    const [isLoading,setIsLoading]=useState(true)

    useEffect(() =>{
        setTimeout(() =>{
            setIsLoading(false)
        },2000)
    },[])
  return (
<Grid templateColumns={{ base: "1fr", sm: "repeat(3, 1fr)" }} gap={6}>
  {isLoading &&
    [0, 1, 2, 3, 4, 5].map((_, idx) => (
      <VStack key={idx} gap={4} alignItems={"flex-start"}>
        <Skeleton w="full" h="300px">
          <Box h="300px" />
        </Skeleton>
      </VStack>
    ))}

    {!isLoading && (
        <>
        <ProfilePost img="/img1.png" />
        <ProfilePost img="/img2.png" />
        <ProfilePost img="/img3.png" />
        <ProfilePost img="/img4.png" />

        </>
    )}
</Grid>
  )
}

export default ProfilePosts