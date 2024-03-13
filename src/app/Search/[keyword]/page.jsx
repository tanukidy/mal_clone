import AnimeList from "@/components/AnimeList"
import Header from "@/components/AnimeList/Header"
import { getAnimeResponse } from "@/libs/api-list"

const page = async ({params}) => {
  const keyword = params.keyword
  const decodedkeyword = decodeURI(keyword)

  const searchAnime = await getAnimeResponse("anime", `q=${decodedkeyword}`)
  
  return (
    <> 
      <section>
        <Header title={`Search for ${decodedkeyword}...`} linkTitle="" linkHref=""/>
        <AnimeList api={searchAnime}/>
      </section>
    </>
  )
}

export default page