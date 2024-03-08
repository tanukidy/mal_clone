import Header from "@/components/AnimeList/Header"
import AnimeList from "@/components/AnimeList"
import { getAnimeResponse, getNestedAnimeResponse, reproduce } from "@/libs/api-list"

const Home = async () => {

  const topAnime = await getAnimeResponse("top/anime")
  let recommendedAnime = await getNestedAnimeResponse("recommendations/anime", "entry")
  recommendedAnime = reproduce(recommendedAnime, 30)
  const seasonalAnime = await getAnimeResponse("seasons/now")
  
  return (
    <> 
      <section>
        <Header title="Seasonal Anime" linkTitle="See All" linkHref="/Season"/>
        <AnimeList api={seasonalAnime}/>
      </section>

      <section>
        <Header title="Top Anime Series" linkTitle="See All" linkHref="/Populer"/>
        <AnimeList api={topAnime}/>
      </section>

      <section>
        <Header title="Recommendations"/>
        <AnimeList api={recommendedAnime}/>
      </section>
    </>
  )
}

export default Home
