import { useColorMode } from "@chakra-ui/color-mode";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Flex, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Stack, Link, IconButton } from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/client";
import NextLink from 'next/link'
import Jdenticon from './Jdenticon'

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [session] = useSession()

  return (
    <Box px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <NextLink href="/">
          <Link fontSize="xl">SimpleBlog</Link>
        </NextLink>
        <Flex alignItems={'center'}>
          <Stack direction={'row'} spacing={2}>
            <IconButton onClick={toggleColorMode} icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />} aria-label="Toggle Theme" />
            {
              session?.user?.email ?
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={'full'}
                    variant={'link'}
                    cursor={'pointer'}
                    minW={0}
                  >
                    <Jdenticon value={session.user.email} size={40} />
                  </MenuButton>
                  <MenuList alignItems={'center'}>
                    <br />
                    <Center>
                      <Jdenticon value={session.user.email} size={80} />
                    </Center>
                    <br />
                    <Center>
                      <p>{session.user.email}</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    <MenuItem>
                      <NextLink href="/posts/create" passHref>
                        <Link>Create Post</Link>
                      </NextLink>
                    </MenuItem>
                    <MenuItem onClick={() => signOut({ redirect: false })}>Logout</MenuItem>
                  </MenuList>
                </Menu>
                :
                <Button onClick={() => signIn()}>Get started</Button>
            }

          </Stack>
        </Flex>
      </Flex>
    </Box>
  )
}