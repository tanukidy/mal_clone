import Link from "next/link"
import InputSearch from "./InputSearch"
import UserActionButton from "./UserActionButton"

const NavBar = () => {
  return (
    <header className="bg-color-accent">
      <div className="flex flex-col justify-between md:flex-row md:items-center p-4 gap-2">
        <Link href="/" className="font-bold text-2xl">My Anime List Clone</Link>
        <InputSearch/>
        <UserActionButton/>
      </div>
    </header>
  )
}

export default NavBar