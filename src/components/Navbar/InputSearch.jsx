"use client"

import { MagnifyingGlass } from "@phosphor-icons/react"
import { useRouter } from "next/navigation"
import { useRef } from "react"

const InputSearch = () => {
  const searchRef = useRef()
  const router = useRouter()

  const handleSearch = (event) => {
    const keyword = searchRef.current.value

    if (!keyword || keyword.trim() == "") return
    

    if (event.key == "Enter" || event.type === "click") {
      event.preventDefault()
      router.push(`/Search/${keyword}`)
    }
    
    
  }
  return (
    <div className="relative">
      <input 
        placeholder="Search..." 
        className="w-full p-2 pr-9 rounded"
        ref={searchRef}
        onKeyDown={handleSearch}
      />
      <button className="absolute top-1 end-0 z-10" onClick={handleSearch}>
        <MagnifyingGlass size={32}/>
      </button>
    </div>
  )
}

export default InputSearch