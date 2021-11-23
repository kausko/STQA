import { PrismaClientValidationError } from '@prisma/client/runtime'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'
import prisma from '../../../lib/prisma'

interface Body {
  title: string
  content: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })

  if (!session) {
    return res.status(401).send("Authentication required")
  }

  if (req.method === 'POST') {
    try {
      const { title, content } = JSON.parse(req.body) as Body
      if (!title || !content)
        throw new Error("Missing fields")
      const { id } = await prisma.post.create({
        data: {
          title,
          content,
          author: {
            connect: { email: session.user!.email as string }
          }
        }
      })
      return res.status(201).json({ id })
    } catch (error: any) {
      return res.status(400).send(error.message)
    }
  }

  if (req.method === 'PUT') {
    try {
      const { title, content } = JSON.parse(req.body) as Body
      if (!title && !content)
        throw new Error("Missing fields")
      const id = parseInt(req.query.id as string)
      await prisma.post.update({
        where: { id },
        data: { title, content }
      })
      return res.status(200).send('Post updated')
    } catch (error: any) {
      return res.status(400).send(error.message)
    }
  }

  if (req.method === 'DELETE') {
    const id = parseInt(req.query.id as string)
    await prisma.post.delete({ where: { id } })
    return res.status(200).send('Post deleted')
  }

  return res.status(405).send('Method not allowed')
}