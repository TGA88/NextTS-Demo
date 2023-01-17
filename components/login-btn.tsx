import { Button } from "@mui/material"
import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        <h2>Signed in as {session.user.name}</h2> <br />
        <Button variant="contained" color="error" onClick={() => signOut()}>Sign out</Button>
      </>
    )
  }
  return (
    <>
      <Button variant="contained"  onClick={() => signIn()}>Sign in to AD</Button>
    </>
  )
}