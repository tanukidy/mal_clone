import { getAnimeResponse } from "@/libs/api-list"
import VideoPlayer from "@/components/Utilities/VideoPlayer"
import Image from "next/image"
import CollectionButton from "@/components/AnimeList/CollectionButton"
import { authUserSession } from "@/libs/auth-libs"
import prisma from "@/libs/prisma"
import CommentInput from "@/components/AnimeList/CommentInput"
import CommentBox from "@/components/AnimeList/CommentBox"
import AnimeInfo from "@/components/AnimeList/AnimeInfo"


const page = async ({params:{id}}) => {
  const anime = await getAnimeResponse(`anime/${id}`, "")
  const characters = await getAnimeResponse(`anime/${id}/characters`, "")
  const user = await authUserSession()
  const collection = await prisma.collection.findFirst({
    where: {user_email: user?.email, anime_mal_id: id}
  })

  const aboutText = anime.data.synopsis !== null ? anime.data.synopsis : "No synopsis information has been added to this title.";
  const lines = aboutText.split('\n')
  const synopsis = lines.map((line, index) => {
    if (line.trim() === '') {
        // If the line is empty, add py-2 class
        return <p key={index} className="py-2">{line}</p>;
    } else {
        // Otherwise, wrap it in a <p> without padding
        return <p key={index}>{line}</p>;
    }
  })
 
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const airedFrom = `${monthNames[anime.data.aired.prop.from.month - 1]} ${anime.data.aired.prop.from.day}, ${anime.data.aired.prop.from.year}`
  let airedCheck;
  if (anime.data.aired.prop.to !== null && anime.data.aired.prop.to.month !== null) {
    const airedTo = `${monthNames[anime.data.aired.prop.to.month - 1]} ${anime.data.aired.prop.to.day}, ${anime.data.aired.prop.to.year}`;
    airedCheck = airedTo;
  } else {
    airedCheck = "?";
  }
  const airedDate = `${airedFrom} to ${airedCheck}`

  let producerNames = []; //Producer
  if (anime.data.producers) {
    producerNames = anime.data.producers.map(producer => producer.name);
  } else {
    producerNames = ["Unknown"];
  }
  const fixProducerNames = producerNames.join(', ')

  let licensorsNames = []; // Liconsors
  if (anime.data.licensors && anime.data.licensors.length > 0) {
    licensorsNames = anime.data.licensors.map(licensors => licensors.name);
  } else {
    licensorsNames = ["None Found,"];
  }
  const fixLicensorsNames = licensorsNames.join(', ')

  let studiosNames = []; //Studios
  if (anime.data.studios) {
    studiosNames = anime.data.studios.map(studios => studios.name);
  } else {
    studiosNames = ["Unknown"];
  }
  const fixStudiosNames = studiosNames.join(', ')

  let genresNames = []; //Genres
  if (anime.data.genres) {
    genresNames = anime.data.genres.map(genres => genres.name);
  } else {
    genresNames = ["Unknown"];
  }
  const fixGenresNames = genresNames.join(', ')
  

  return (   
    <>
      <div className="flex flex-col px-2 border border-color-borderdark py-5">
        <h3 className="text-color-primary text-2xl">{anime.data.title}</h3>
      </div>
      <div className="pt-2 px-2 flex sm:flex-nowrap flex-wrap gap-2 border border-t-0 border-color-borderdark">
        <div className="flex flex-col w-225 border-r border-color-borderdark pr-1"> {/* left info */}
          <Image
            src={anime.data.images.webp.image_url}
            alt={anime.data.images.jpg.image_url}
            width={220}
            height={220}
            className="rounded object-cover "
          />
          <div className="text-color-primary text-sm w-full"> {/* left Alternative Titles */}
            <h2 className="border-b border-color-borderdark text-md font-bold left-info-titles">
              Alternative Titles
            </h2>
            <p className="left-info">Synonyms: <span className="text-color-primary">{anime.data.title_synonyms ?? "Unknown"}</span></p>
            <p className="left-info">Japanese: <span className="text-color-primary">{anime.data.title_japanese ?? "Unknown"}</span></p>
            <p className="left-info">English: <span className="text-color-primary">{anime.data.title_english ?? "Unknown"}</span></p>
          </div>
          <div className="text-color-primary text-sm w-full"> {/* left Information */}
            <h2 className="border-b border-color-borderdark text-md font-bold left-info-titles">
              Information
            </h2>
            <p className="left-info">Type: <span className="text-color-link hover:underline">{anime.data.type ?? "Unknown"}</span> </p>
            <p className="left-info">Episodes: <span className="text-color-primary">{anime.data.episodes ?? "Unknown"}</span></p>
            <p className="left-info">Status: <span className="text-color-primary">{anime.data.status ?? "Unknown"}</span></p>
            <p className="left-info">Aired: <span className="text-color-primary">{airedDate ?? "Unknown"}</span></p>
            <p className="left-info">Premiered: <span className="text-color-link hover:underline">{anime.data.season} {anime.data.year}</span></p>
            <p className="left-info">Broadcast: <span className="text-color-primary">{anime.data.broadcast.string ?? "Unknown"}</span></p>
            <p className="left-info">Producers: <span className="text-color-link hover:underline">{fixProducerNames ?? "Unknown"}</span></p>
            <p className="left-info">Licensors: <span className="text-color-link hover:underline">{fixLicensorsNames ?? "Unknown"}</span></p>
            <p className="left-info">Studios: <span className="text-color-link hover:underline">{fixStudiosNames ?? "Unknown"}</span></p>
            <p className="left-info">Source: <span className="text-color-primary">{anime.data.source ?? "Unknown"}</span></p>
            <p className="left-info">Genres: <span className="text-color-link hover:underline">{fixGenresNames ?? "Unknown"}</span></p>
            <p className="left-info">Duration: <span className="text-color-primary">{anime.data.duration ?? "Unknown"}</span></p>
            <p className="left-info">Rating: <span className="text-color-primary">{anime.data.rating ?? "Unknown"}</span></p>
          </div>
          <div className="text-color-primary text-sm w-full"> {/* left Statistics */}
            <h2 className="border-b border-color-borderdark text-md font-bold left-info-titles">
              Statistics
            </h2>
            <p className="left-info">Score: <span className="text-color-primary">{anime.data.score ?? "N/A"} {anime.data.scored_by ?? "(scored by - users)"}</span></p>
            <p className="left-info">Ranked: <span className="text-color-primary">{anime.data.rank ? `#${anime.data.rank}` : "N/A"}</span></p>
            <p className="left-info">Popularity: <span className="text-color-primary">{anime.data.popularity ? `#${anime.data.popularity}` : "N/A"}</span></p>
            <p className="left-info">Members: <span className="text-color-primary">{anime.data.members.toLocaleString() ?? "N/A"}</span></p>
            <p className="left-info">Favorites: <span className="text-color-primary">{anime.data.favorites.toLocaleString() ?? "N/A"}</span></p>
          </div>
        </div>

        <div className="flex-1 flex-col gap-2"> {/* main */}
          <div className="flex flex-row justify-between"> {/* top anime info */} 
            <div> 
              <div className="flex flex-row h-24 text-color-primary bg-color-lightdark rounded border border-color-borderdark overflow-x-auto pr-5 mb-2">
                <div className="w-20 flex flex-col sm:text-sm md:text-md justify-center items-center p-2">
                  <h3 className="flex bg-color-accent small-text text-color-dark px-3 h-4 rounded justify-center items-center">SCORE</h3>
                  <b className="text-xl">{anime.data.score ?? "N/A"}</b>
                  <p className="small-text mt-[-7px]">{anime.data.scored_by ?? "- user"}</p>
                </div>

                <div className="flex mt-3 mb-3 border-r p-1 border-color-borderdark"></div>
                  
                <div className="flex flex-col gap-2 mt-3">
                  <div className="flex flex-row">
                    <div className="w-28 flex flex-row gap-1 items-center p-3 anime-stats">
                      <h3>Ranked</h3>
                      <b>{anime.data.rank ? `#${anime.data.rank}` : "N/A"}</b>
                    </div>

                    <div className="w-32 flex flex-row gap-1 items-center p-3 anime-stats">
                      <h3>Popularity</h3>
                      <b>{anime.data.popularity ? `#${anime.data.popularity}` : "N/A"}</b>
                    </div>

                    <div className="w-36 flex flex-row gap-1 items-center p-3 anime-stats">
                      <h3>Members</h3>
                      <b>{anime.data.members.toLocaleString() ?? "N/A"}</b>
                    </div>
                  </div>
                    <div className="flex flex-row">
                      <h3 className="px-3 border-r border-color-borderdark small-text text-color-link hover:underline">{anime.data.season} {anime.data.year}</h3>
                      <h3 className="px-3 border-r border-color-borderdark small-text text-color-link hover:underline">{anime.data.type ?? "N/A"}</h3>
                      <h3 className="px-3 small-text text-color-link hover:underline">{fixStudiosNames ?? "Unknown"}</h3>
                    </div>
                </div>
              </div>
              {!collection && user && <CollectionButton anime_mal_id={id} user_email={user?.email} anime_title={anime.data.title} anime_image={anime.data.images.webp.image_url}/>}
            </div>
            <div>
              <VideoPlayer youtubeId={anime.data.trailer.youtube_id}/>
            </div>
          </div>
          
          <div className="flex flex-col text-sm gap-2 text-color-primary mt-5"> {/* Synopsis */}
            <div className="flex justify-between pb-1 border-b border-color-borderdark">
              <b>Synopsis</b>
              <a href={`/Anime/${anime.mal_id}`} className="small-text text-color-link hover:underline">Edit</a>
            </div>
            <div className="small-text ">{synopsis}</div>
          </div>

          <div className="flex flex-col gap-2 text-color-primary mt-5"> {/* Characters & Voice Actors */}
            <div className="flex justify-between text-sm pb-1 border-b border-color-borderdark ">
              <b>Characters & Voice Actors</b>
              <a href={`/Anime/${anime.mal_id}`} className="small-text text-color-link hover:underline">More Characters</a>
            </div>
            <div className="flex flex-row small-text">
              <div className="flex flex-row justify-between w-full">
                <AnimeInfo data={characters} type="characters-left"/>
                <AnimeInfo data={characters} type="voiceActors-left" />
              </div>
              <div className="border-l border-color-borderdark mx-2 mb-1"></div>
              <div className="flex flex-row justify-between w-full">
                <AnimeInfo data={characters} type="characters-right"/>
                <AnimeInfo data={characters} type="voiceActors-right" />
              </div>
            </div>
          </div>
          
          <div className="mt-5"> {/* Reviews */}
            <h3 className="text-color-primary text-md font-bold mb-4">Reviews</h3>
            <CommentBox anime_mal_id={id}/>
            {user ? (
            <CommentInput
              anime_mal_id={id}
              user_email={user.email}
              username={user.name}
              anime_title={anime.data.title}
              anime_image={anime.data.images.webp.image_url}
            />
            ) : (
            <div className="text-color-primary">
              <a href="/api/auth/signin" className="text-color-link hover:underline">Sign In</a> to comment.
            </div>
            )}
            
            
          </div>
        </div>
      </div>
    </>
  )
}

export default page