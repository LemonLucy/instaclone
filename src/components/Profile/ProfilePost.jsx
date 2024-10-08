import React from 'react';
import {
  Button,
  Input,
  VStack,
  Divider,
  Avatar,
  Text,
  GridItem,
  Image,
  Box,
  Flex,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  ModalCloseButton,
  useBreakpointValue,
} from '@chakra-ui/react';
import { AiFillHeart } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import Comment from '../Comment/Comment';
import PostFooter from '../FeedPosts/PostFooter';

const ProfilePost = ({ img }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  return (
    <>
      <GridItem position="relative" cursor="pointer" onClick={onOpen}>
        <Box
          position="relative"
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

      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay />
        <ModalContent
          maxW="900px"
          borderRadius="md"
          overflow="hidden"
          bg="gray.800"
          flexDirection={isSmallScreen ? 'column' : 'row'}
        >
          <ModalBody p={0} display="flex" flexDirection={isSmallScreen ? 'column' : 'row'}>
            {/* 이미지 섹션 */}
            <Box flex="1" maxW={isSmallScreen ? '100%' : '60%'} bg="black">
              <Image src={img} alt="Profile post enlarged" w="full" h="full" objectFit="cover" />
            </Box>

            {/* 텍스트 및 댓글 섹션 */}
            {!isSmallScreen && (
              <Flex flex="1" direction="column" p={4} bg="gray.900" color="white" maxW="60%">
                <Flex align="center" justify="space-between" mb={2}>
                  <Flex align="center" gap={2}>
                    <Avatar src="/profilepic.png" size="sm" name="As a Programmer" />
                    <Text fontSize="sm" fontWeight="bold">asaprogrammer</Text>
                  </Flex>
                  <Flex align="center" gap={4}>
                    <Box as={MdDelete} color="gray.500" boxSize={4} cursor="pointer" mt="2px" />
                    <ModalCloseButton position="relative" top="2px" color="white" />
                  </Flex>
                </Flex>

                <Divider borderColor="gray.700" />

                <VStack spacing={4} align="flex-start" mt={4} direction="row" maxH="400px" overflowY="auto">
                  <Comment createdAt="1d ago" username="asaprogrammer_" profilePic="/profilepic.png" text="Dummy images from Unsplash" />
                  <Comment createdAt="12h ago" username="abrahmov" profilePic="https://bit.ly/dan-abramov" text="Nice pic" />
                  <Comment createdAt="3h ago" username="kentodds" profilePic="https://bit.ly/kent-c-dodds" text="Good clone dude!" />
                  <Comment createdAt="1d ago" username="asaprogrammer_" profilePic="/profilepic.png" text="Dummy images from Unsplash" />
                  <Comment createdAt="12h ago" username="abrahmov" profilePic="https://bit.ly/dan-abramov" text="Nice pic" />
                  <Comment createdAt="3h ago" username="kentodds" profilePic="https://bit.ly/kent-c-dodds" text="Good clone dude!" />
                  <Comment createdAt="1d ago" username="asaprogrammer_" profilePic="/profilepic.png" text="Dummy images from Unsplash" />
                  <Comment createdAt="12h ago" username="abrahmov" profilePic="https://bit.ly/dan-abramov" text="Nice pic" />
                  <Comment createdAt="3h ago" username="kentodds" profilePic="https://bit.ly/kent-c-dodds" text="Good clone dude!" />

                </VStack>

                <Divider borderColor="gray.700" />

                <PostFooter isProfilePage={true} />
              </Flex>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfilePost;
