import React from 'react';
import { Avatar, Flex, Text } from '@chakra-ui/react';

const Comment = ({ createdAt, username, profilePic, text }) => {
  return (
    <Flex align="center" gap={3} w="full">
      <Avatar src={profilePic} name={username} size="sm" />
      <Flex direction="row" gap={3} flex="1">
        <Flex direction="column" gap={1}>
            <Text fontWeight="bold" fontSize="sm">
            {username}
            </Text>
            <Text fontSize="xs" color="gray.500">
                {createdAt}
            </Text>
        </Flex>
        <Text fontSize="sm">{text}</Text>
      </Flex>
    </Flex>
  );
};

export default Comment;
