import AnimeInfo from "@/components/AnimeList/AnimeInfo";
import { getAnimeResponse } from "@/libs/api-list"
import Image from "next/image"


const page = async ({params:{id}}) => {
  const people = await getAnimeResponse(`people/${id}/full`, "")

  const birthday = people.data.birthday; // Example birthday string

  // Extract month, day, and year from the birthday string
  const month = new Date(birthday).toLocaleString('en', { month: 'short' });
  const day = new Date(birthday).getDate();
  const year = new Date(birthday).getFullYear();

  // Construct the formatted date string
  const formattedBirthday = `${month} ${day}, ${year}`;

  

  const aboutText = people.data.about !== null ? people.data.about : "";
  const lines = aboutText.split('\n')

  const people_info = lines.map((line, index) => {
    if (line.trim() === '') {
        // If the line is empty, add py-2 class
        return <p key={index} className="py-2">{line}</p>;
    } else {
        // Otherwise, wrap it in a <p> without padding
        return <p key={index}>{line}</p>;
    }
  });

  let alternate_names = []; //names
  if (people.data.alternate_names) {
    alternate_names = people.data.alternate_names.map(name => name);
  } else {
    alternate_names = ["Unknown"];
  }
  const fixAlternate_names = alternate_names.join(', ')

  return (
    <>
      <div className="border border-color-borderdark bg-color-lightdark">
        <h1 className="text-color-primary font-bold text-md" style={{padding: "2px 10px 2px 10px"}}>{people.data.name}</h1>
      </div>
      <div className="flex flex-cols text-color-primary border border-color-borderdark mb-2" style={{padding: "5px 10px 10px 10px"}}>
        <div className="border-r border-color-borderdark bottom-1 my-1 flex flex-col gap-3 left-img-info"> {/* left */}
          <Image 
            src={people.data.images.jpg.image_url}
            alt={people.data.name}
            width={220}
            height={220}
          />
          <div className="border-y text-color-link small-text cursor-pointer p-1" style={{borderColor:"rgb(52, 82, 147)"}}>
            Add to Favorites
          </div>
          <div className="small-text text-color-textgrey gap-2">
            <p>Given name: <span className="text-color-primary">{people.data.given_name ?? "Unknown"}</span></p>
            <p>Family name: <span className="text-color-primary">{people.data.family_name ?? "Unknown"}</span></p>
            <p>Alternate names: <span className="text-color-primary">{fixAlternate_names}</span></p>
            <p>Birthday: <span className="text-color-primary">{formattedBirthday ?? "Unknown"}</span></p>
            <p>Member Favorites: <span className="text-color-primary">{people.data.favorites ?? "N/A"}</span></p>
            <div>
              <p>More:</p>
              <div className="text-color-primary">{people_info ?? "N/A"}</div>
            </div>
          </div>
            
        </div>
        
        <div className="text-color-primary flex flex-col gap-3 px-2 w-full"> {/* main */}
          <h2 className="text-sm border-b border-color-borderdark pb-1"> {/* voice actors Roles */}
            Voice Acting Roles
          </h2>
          <div className="flex flex-row justify-between"> 
            <AnimeInfo data={people} type="va-animes"/>
            <AnimeInfo data={people} type="va-characters"/> 
          </div>
        </div>
      </div>
    </>
  )
}

export default page