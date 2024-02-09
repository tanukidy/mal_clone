"use client"

import AnimeList from "@/components/AnimeList"
import HeaderMenu from "@/components/Utilities/HeaderMenu"
import Pagination from "@/components/Utilities/Pagination"
import React, {useEffect ,useState} from "react"
import { getAnimeResponse } from "@/libs/api-list"

const page = () => {
  const [page, setPage] = useState(1)
  const [seasonalAnime, setSeasonalAnime] = useState([])

  const fetchData = async() => {
    const SeasonAnime = await getAnimeResponse("seasons/now", `page=${page}`)
      setSeasonalAnime(SeasonAnime)
  }
  
  useEffect(() => {
    fetchData()
  }, [page]) 
  
  return (
    <> 
        <HeaderMenu title={`ANIME SEASON #${page}`}/>
        <AnimeList isGrid={seasonalAnime}/>
        <Pagination 
        page={page} 
        lastPage={seasonalAnime.pagination?.last_visible_page}
        setPage = {setPage}/>
    </>
  )
}

export default page
