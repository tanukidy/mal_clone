import { authUserSession } from "@/libs/auth-libs"
import Link from "next/link"

const UserActionButton = async() => {
  const user = await authUserSession()
  const actionLabel = user ? "Sign Out" : "Sign In"
  const actionURL = user ? "/api/auth/signout" : "/api/auth/signin"

  return (
    <div className="flex justify-between gap-2 items-center">
      {
        user ? <Link href={"/User/dashboard"}>Dashboard</Link> : null
      }
      <Link href={actionURL} className="bg-color-dark text-color-accent py-1 px-8 inline-block">{actionLabel}</Link>
    </div>
  )
}

export default UserActionButton