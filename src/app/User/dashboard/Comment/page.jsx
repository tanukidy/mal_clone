import Blank from "@/components/Dashboard/Blank"
import Header from "@/components/Dashboard/Header"


const page = async () => {

  return (
    <section className="px-4 mt-4 w-full">
      <Header title={"My Comment"}/>
      <div className="grid grid-cols-1 py-2 gap-4">
        <Blank title={"NO COMMENT"}/>
      </div>
    </section>
  )
}

export default page