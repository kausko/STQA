import { HStack, VStack } from "@chakra-ui/layout";
import { Editable, EditablePreview, EditableInput, useColorMode, Button, useToast } from "@chakra-ui/react"
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import type { PopulatedPost } from "../../components/Card";
import prisma from "../../lib/prisma";
import Editor from "rich-markdown-editor";
import { FormEvent, useState } from "react";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(ctx!.params!.id as string) || 0,
    },
    select: {
      id: true,
      title: true,
      content: true,
      author: {
        select: {
          email: true,
        }
      },
      // updatedAt: true,
    }
  })
  return { props: { post } }
}

export default function Post({ post }: { post: PopulatedPost | null }) {
  const router = useRouter()
  const toast = useToast()
  const [session] = useSession()
  const { colorMode } = useColorMode();

  const [postData, setPostData] = useState({})

  const handleTitle = (data: string) => {
    setPostData(d => ({ ...d, "title": data }))
  }

  const handleEditable = (v?: () => string) => {
    console.log(v)
    if (typeof v === "function") {
      setPostData(d => ({ ...d, "content": v() }))
    }
  }

  if (!session && router.query.id === 'create') {
    toast({
      title: 'You need to be logged in to create a post',
      status: 'error'
    })
    router.push('/')
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if (!post) {
        const { id } = await (await fetch('/api/post/create', {
          method: 'POST',
          body: JSON.stringify(postData)
        })).json()
        toast({
          title: 'Post created',
          status: 'success'
        })
        router.push(`/posts/${id}`)
      }
      else {
        await fetch(`/api/post/${post.id}`, {
          method: 'PUT',
          body: JSON.stringify(postData)
        })
        toast({
          title: 'Post updated',
          status: 'info'
        })
      }
    } catch (error: any) {
      toast({
        title: error.message,
        status: 'error'
      })
    }
  }

  const handleDelete = () => {
    fetch(`/api/post/${post!.id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(() => {
        toast({
          title: 'Post deleted',
          status: 'info'
        })
        router.push('/')
      })
      .catch(err => toast({
        title: err.message,
        status: 'error'
      }))
  }

  return (
    <VStack w="100vw" align="start" px={10}>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <HStack justify="space-between">
          <Editable
            isDisabled={router.query.id !== 'create' && session?.user?.email !== post?.author.email}
            defaultValue={post?.title || ""}
            placeholder="Click to add title"
            fontSize="5xl"
            pb={5}
            onChange={handleTitle}
          >
            <EditablePreview />
            <EditableInput />
          </Editable>
          <HStack spacing={3}>
            {(router.query.id === 'create' || session?.user?.email === post?.author.email) && <Button type="submit">Submit</Button>}
            {session?.user?.email === post?.author.email && <Button colorScheme="red" onClick={handleDelete}>Delete</Button>}
          </HStack>
        </HStack>
        <Editor
          defaultValue={post?.content || ""}
          readOnly={router.query.id !== 'create' && session?.user?.email !== post?.author.email}
          dark={colorMode === 'dark'}
          onChange={handleEditable}
        />
      </form>
    </VStack>
  )
}