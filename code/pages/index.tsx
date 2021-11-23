import { VStack } from '@chakra-ui/layout'
import { Text, Link, SimpleGrid } from '@chakra-ui/react'
import type { GetServerSideProps } from 'next'
import NextLink from 'next/link'
import Card, { PopulatedPost } from '../components/Card'
import prisma from '../lib/prisma'

export const getServerSideProps: GetServerSideProps = async () => {
  const posts = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      author: {
        select: {
          email: true,
        }
      },
      updatedAt: true,
    }
  })
  return { props: { posts: JSON.parse(JSON.stringify(posts)) } }
}

export default function Home({ posts }: { posts: PopulatedPost[] }) {
  return (
    // <VStack align="center" w="100%" spacing={4}>
    <SimpleGrid minChildWidth={250} p={10} spacing={5}>
      {posts.map((v) => (
        <Card key={v.id} post={v} />
      ))}
      {
        !posts.length &&
        <NextLink href="/posts/create" passHref>
          <Link fontSize="4xl" id="get-started-link">Create a Post to get started</Link>
        </NextLink>
      }
    </SimpleGrid>

    // </VStack>
  )
}
