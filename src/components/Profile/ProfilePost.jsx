import React from 'react'
import { GridItem,Image,Box,Flex,Icon } from '@chakra-ui/react'
import { AiFillHeart } from 'react-icons/ai'
import { FaComment } from 'react-icons/fa';

const ProfilePost = ({img}) => {
  return (
    <GridItem position="relative" cursor="pointer">
      <Box position="relative"
        _hover={{ opacity: 0.8 }} 
        transition="opacity 0.2s ease-in-out"
      >
            <Image src={img} alt="Profile post" w="full" h="300px" objectFit="cover" borderRadius="md" />
        </Box>

        {/* 호버 시 표시되는 아이콘 */}
        <Flex
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        justify="center"
        align="center"
        gap={10}
        opacity={0} // 기본 상태에서 숨김
        _hover={{ opacity: 1 }} // 호버 시 보이도록 설정
        transition="opacity 0.2s ease-in-out"
      >
        <Icon as={AiFillHeart} color="white" boxSize={6} />
        <Icon as={FaComment} color="white" boxSize={6} />
      </Flex>
    </GridItem>
  )
}

export default ProfilePost