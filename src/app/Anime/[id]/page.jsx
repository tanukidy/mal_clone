import { getAnimeResponse } from "@/libs/api-list"
import VideoPlayer from "@/components/Utilities/VideoPlayer"
import Image from "next/image"
import CollectionButton from "@/components/AnimeList/CollectionButton"
import { authUserSession } from "@/libs/auth-libs"
import prisma from "@/libs/prisma"
import CommentInput from "@/components/AnimeList/CommentInput"
import CommentBox from "@/components/AnimeList/CommentBox"

const page = async ({params:{id}}) => {
  const anime = await getAnimeResponse(`anime/${id}`, "")
  const user = await authUserSession()
  const collection = await prisma.collection.findFirst({
    where: {user_email: user?.email, anime_mal_id: id}
  })
  
  return (   
    <>
      <div className="flex flex-col pt-4 px-4">
        <h3 className="text-color-primary text-2xl">{anime.data.title}</h3>
      </div>
      <div className="pt-4 px-4 flex sm:flex-nowrap flex-wrap gap-2">
        <Image
          src={anime.data.images.webp.image_url}
          alt={anime.data.images.jpg.image_url}
          width={350}
          height={250}
          className=" md:w-80 xl:w-80 rounded object-cover"
        />
        <div className="flex flex-col gap-2">
            <div className="flex flex-row h-24 text-color-primary bg-color-lightdark rounded border border-color-borderdark overflow-x-auto pr-5">
              <div className="w-20 flex flex-col sm:text-sm md:text-md justify-center items-center p-2">
                <h3 className="flex bg-color-accent small-text text-color-dark px-3 h-4 rounded justify-center items-center">SCORE</h3>
                <b className="text-xl">{anime.data.score}</b>
              </div>

              <div className="flex mt-3 mb-3 border-r p-1 border-color-borderdark"></div>
              
              <div className="flex flex-col gap-2 mt-3"> 
                <div className="flex flex-row">
                  <div className="w-28 flex flex-row gap-1 items-center p-3 anime-stats">
                    <h3>Ranked</h3>
                    <b>#{anime.data.rank}</b>
                  </div>

                  <div className="w-32 flex flex-row gap-1 items-center p-3 anime-stats">
                    <h3>Popularity</h3>
                    <b>#{anime.data.popularity}</b>
                  </div>

                  <div className="w-36 flex flex-row gap-1 items-center p-3 anime-stats">
                    <h3>Members</h3>
                    <b>{anime.data.members.toLocaleString()}</b>
                  </div>
                </div>
                <div className="flex flex-row">
                  <h3 className="px-3 border-r border-color-borderdark small-text ">{anime.data.season} {anime.data.year}</h3>
                  <h3 className="px-3 border-r border-color-borderdark small-text">{anime.data.type}</h3>
                  <h3 className="px-3 small-text">{anime.data.studios.name}</h3>
                </div>
              </div>
            </div>

          {!collection && user && <CollectionButton anime_mal_id={id} user_email={user?.email} anime_title={anime.data.title} anime_image={anime.data.images.webp.image_url}/>}
        </div>
      </div>

      
      <div className="flex flex-col pt-4 px-4 gap-2 sm:text-xl text-2xl text-color-primary">
          <h3>Synopsis:</h3>
          <p>{anime.data.synopsis}</p>
        </div>
      <div className="p-4">
          <h3 className="text-color-primary text-2xl font-bold mb-4">Comment</h3>
          <CommentBox anime_mal_id={id}/>
          {user && <CommentInput anime_mal_id={id} user_email={user?.email} username={user?.name} anime_title={anime.data.title}/>}
      </div>
      <div>
        <VideoPlayer youtubeId={anime.data.trailer.youtube_id}/>
      </div>
    </>
  )
}

export default page