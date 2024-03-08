import Header from "@/components/Dashboard/Header"
import Blank from "@/components/Dashboard/Blank"

const page = async () => {
  
 return (
  <section className="mt-4 px-4 w-full">
    <Header title={"My Collection"}/>

    <div className="sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Blank title={"NO COLLECTION"}/>
    </div>
  </section>
  
 )
}

export default page