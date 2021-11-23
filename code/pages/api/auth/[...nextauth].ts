import nextAuth from "next-auth";
import Providers from "next-auth/providers"
import { hash, compare } from "bcryptjs"
import prisma from "../../../lib/prisma";

export default nextAuth({
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Email' },
        password: { label: 'Password', type: 'password' },
        new: { label: 'New User?', type: 'checkbox', style: { display: 'flex '} }
      },
      async authorize(credentials) {
        try {
          const password = await hash(credentials.password, 10)
          if (credentials.new === '') {
            const user = await prisma.user.create({
              data: {
                email: credentials.email,
                password
              }
            })
            return user
          } else {
            const user = await prisma.user.findUnique({
              where: { email: credentials.email }
            })
            if (!user)
              throw new Error('User not found');
            if (!await compare(credentials.password, user.password))
              throw new Error('Invalid password')
            return user
          }
        } catch (error) {
          return null
        }
      }
    })
  ]
})