import { Post, User } from ".prisma/client";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Center, Box, Stack, Heading, Text } from "@chakra-ui/layout";
import { Avatar } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useCallback, useRef } from "react";
import Jdenticon from './Jdenticon'

export interface PopulatedPost extends Post {
  author: Pick<User, 'email'>
}

export default function Card({ post }: { post: PopulatedPost }) {
  const router = useRouter()

  const redirect = useCallback(() => {
    router.push(`/posts/${post.id}`)
  }, [router, post])

  return (
    // <Center py={6}>
    <Box
      // maxW={'445px'}
      // w={'full'}
      bg={useColorModeValue('white', 'gray.900')}
      boxShadow={'2xl'}
      rounded={'md'}
      p={6}
      overflow={'hidden'}
      cursor={'pointer'}
      onClick={redirect}
    >
      <Stack>
        <Heading
          color={useColorModeValue('gray.700', 'white')}
          fontSize={'2xl'}
          fontFamily={'body'}>
          {post.title}
        </Heading>
      </Stack>
      <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
        <Jdenticon size={40} value={post.author.email} />
        <Stack direction={'column'} spacing={0} fontSize={'sm'}>
          <Text fontWeight={600}>{post.author.email}</Text>
          <Text color={'gray.500'}>{new Date(post.updatedAt).toDateString()}</Text>
        </Stack>
      </Stack>
    </Box>
    // </Center>
  )
}