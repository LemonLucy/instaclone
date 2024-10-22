import { Grid,VStack,Skeleton,Box,Flex,Text } from '@chakra-ui/react'
import ProfilePost from './ProfilePost'
import useGetUserPosts from '../../hooks/useGetUserPosts'

const ProfilePosts = () => {
    
  const {isLoading,posts}=useGetUserPosts()
  console.log(isLoading);

  const noPostsFound=!isLoading &&posts.length==0;
  if(noPostsFound) return <NoPostsFound />
  console.log(isLoading);

  return (
    <Grid templateColumns={{ base: "1fr", sm: "repeat(3, 1fr)" }} gap={6}>
        {isLoading &&
          [0, 1, 2,].map((_, idx) => (
            <VStack key={idx} gap={4} alignItems={"flex-start"}>
              <Skeleton w="full" h="300px">
                <Box h="300px" />
              </Skeleton>
            </VStack>
          ))}

        {!isLoading && (
            <>
            {posts.map((post) => (
              <ProfilePost post={post} key={post.id} />
            ))}
            </>
        )}
    </Grid>
  )
}

export default ProfilePosts

const NoPostsFound = () => {
	return (
		<Flex flexDir='column' textAlign={"center"} mx={"auto"} mt={10}>
			<Text fontSize={"2xl"}>No Posts Found🤔</Text>
		</Flex>
	);
};