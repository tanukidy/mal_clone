"use client"

const { FileSearch } = require("@phosphor-icons/react")
const { useRouter } = require("next/navigation")

const Blank = ({title}) => {
  const router = useRouter()

  return (
    <div className="min-h-screen max-w-xl mx-auto flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-4">
        <FileSearch size={44} className="text-color-accent"/>
        <h3 className="text-color-accent text-4xl font-bold ">
          {title}
        </h3>
        <button onClick={() => router.back()} className="text-color-primary hover:text-color-accent transition-all underline">
          Back
        </button>
      </div>
    </div>
  )
}

export default Blank