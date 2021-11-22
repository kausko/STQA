import { Center } from "@chakra-ui/layout";
import { CircularProgress } from "@chakra-ui/progress";
import { useSession } from "next-auth/client";
import { AppProps } from "next/app";
import Navbar from './Navbar';

export default function Loading({ Component, pageProps }: AppProps) {
  const [, loading] = useSession()
  if (loading)
    return (
      <Center w="100vw" h="100vh">
        <CircularProgress isIndeterminate />
      </Center>
    )

  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar />
      <Component {...pageProps} />
    </div>
  )

}