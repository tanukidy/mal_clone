import { authUserSession } from "@/libs/auth-libs"
import Image from "next/image"
import Link from "next/link"


const page = async() => {
  const user = await authUserSession()

  return (
    <div className="flex flex-col mt-8 justify-center items-center text-color-primary">
      <h5 className="text-2xl font-bold">Welcome, {user.name}</h5>
      <Image src={user.image} alt="..." width={250} height={250}/>
      <div className="flex py-8 gap-4">
        <Link href={"/User/dashboard/Collection"} className="bg-color-accent text-color-dark text-xl font-bold px-4 py-3">My Collection</Link>
        <Link href={"/User/dashboard/Comment"} className="bg-color-accent text-color-dark text-xl font-bold px-4 py-3">My Comment</Link>
      </div>
    </div>
  )
}

export default page