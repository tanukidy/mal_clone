import AnimeInfo from "@/components/AnimeList/AnimeInfo";
import { getAnimeResponse } from "@/libs/api-list"
import Image from "next/image"


const page = async ({params:{id}}) => {
  const characters = await getAnimeResponse(`characters/${id}/full`, "")
  
  const aboutText = characters.data.about;
  const lines = aboutText.split('\n')

  const synopsis = lines.map((line, index) => {
    if (line.trim() === '') {
        // If the line is empty, add py-2 class
        return <p key={index} className="py-2">{line}</p>;
    } else {
        // Otherwise, wrap it in a <p> without padding
        return <p key={index}>{line}</p>;
    }
  });
  let favoriteCheck;
  if (characters.data.favorites === null) {
    favoriteCheck = "N/A"
  } else {
    favoriteCheck = characters.data.favorites.toLocaleString()
  }

  const fullName = characters.data.name
  const nickName = characters.data.nicknames
  const nameParts = fullName.split(' ')
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');
  let resultName;
  if (nickName.length === 0) {
    resultName = fullName
  } else {
    resultName = `${firstName} "${nickName}" ${lastName}`
  }

  


  return (
    <>
      <div className="border border-color-borderdark bg-color-lightdark">
        <h1 className="text-color-primary font-bold text-md" style={{padding: "2px 10px 2px 10px"}}>{resultName}</h1>
      </div>
      <div className="flex flex-cols text-color-primary border border-color-borderdark mb-2" style={{padding: "5px 10px 10px 10px"}}>
        <div className="border-r border-color-borderdark bottom-1 my-1 flex flex-col gap-3 left-img-info"> {/* left */}
          <Image 
            src={characters.data.images.webp.image_url}
            alt={characters.data.images.jpg.image_url}
            width={220}
            height={220}
          />
          <div className="border-y text-color-link small-text cursor-pointer p-1" style={{borderColor:"rgb(52, 82, 147)"}}>
            Add to Favorites
          </div>
          <div className="border-b border-color-borderdark pb-1 text-sm font-bold">
            Animeography
          </div>
            <AnimeInfo data={characters} type="character-anime"/>
          <div className="border-b border-color-borderdark pb-1 text-sm font-bold">
            Mangaography
          </div>
            <AnimeInfo data={characters} type="character-manga"/>
          <div className="small-text">
            Member Favorites: {favoriteCheck}
          </div>
        </div>
        
        <div className="flex flex-col gap-3 px-2 w-full"> {/* main */}
          <div className="text-md border-b border-color-borderdark"><b>{fullName}</b> ({characters.data.name_kanji})</div>
          <div className="text-color-primary small-text"> {/* character info */}
            {synopsis}
          </div>
          <div> {/* voice actors */}
            <h2 className="text-md font-bold border-b border-color-borderdark my-2 py-1">Voice Actors</h2>
            <AnimeInfo data={characters} type="voice-actors"/>
          </div>
        </div>
      </div>
    </>
  )
}

export default page