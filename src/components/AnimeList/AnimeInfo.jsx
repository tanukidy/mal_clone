import Image from 'next/image';
import Link from 'next/link';

const AnimeInfo = ({ data, type }) => {
  let values = []
  
  if (type === 'characters-left') {
    values = data.data.slice(0, 5).map((data, index) => (
      <Link 
        href={`/character/${data.character.mal_id}`}
        key={index}
      >
        <div className="flex flex-row space-x-2 cursor-pointer text-color-primary mb-1 border-b border-color-borderdark pb-1 px-1 small-table">
          <Image
            src={data.character.images.webp.image_url}
            alt={data.character.name}
            width={40}
            height={40}
          />
          <div>
            <p className='small-text text-color-link hover:underline'>{data.character.name}</p>
            <p className='small-text'>{data.role}</p>
          </div>
        </div>
      </Link>
    ));
  } else if (type === 'voiceActors-left') {
    let vatest = [];
    vatest = data.data.map(wah => wah.voice_actors);
    const allvoiceactors = vatest.flat();
    const japaneseVoiceActors = allvoiceactors.filter(actor => actor.language === 'Japanese');

    values = japaneseVoiceActors.slice(0, 5).map((data, index) => (
      <Link 
        href={`/people/${data.person.mal_id}`}
        key={index}
      >
        <div className="flex flex-row space-x-2 cursor-pointer text-color-primary text-right justify-end mb-1 border-b border-color-borderdark pb-1 px-1 small-table">
          <div>
            <p className='small-text top text-color-link hover:underline'>{data.person.name}</p>
            <p className='small-text'>{data.language}</p>
          </div>
          <Image
            src={data.person.images.jpg.image_url}
            alt={data.person.name}
            width={40}
            height={40}
          />
        </div>
      </Link>
    ));
  } else if (type === 'characters-right') {
    values = data.data.slice(5, 10).map((data, index) => (
      <Link 
        href={`/character/${data.character.mal_id}`}
        key={index}
      >
        <div className="flex flex-row space-x-2 cursor-pointer text-color-primary mb-1 border-b border-color-borderdark pb-1 px-1 small-table">
          <Image
            src={data.character.images.webp.image_url}
            alt={data.character.name}
            width={40}
            height={40}
          />
          <div>
            <p className='small-text text-color-link hover:underline'>{data.character.name}</p>
            <p className='small-text'>{data.role}</p>
          </div>
        </div>
      </Link>
    ));
  } else if (type === 'voiceActors-right') {
    let vatest = [];
    vatest = data.data.map(wah => wah.voice_actors);
    const allvoiceactors = vatest.flat();
    const japaneseVoiceActors = allvoiceactors.filter(actor => actor.language === 'Japanese');

    values = japaneseVoiceActors.slice(5, 10).map((data, index) => (
      <Link 
        href={`/people/${data.person.mal_id}`}
        key={index}
      >
        <div className="flex flex-row space-x-2 cursor-pointer text-color-primary text-right justify-end mb-1 border-b border-color-borderdark pb-1 px-1 small-table">
          <div>
            <p className='small-text text-color-link hover:underline'>{data.person.name}</p>
            <p className='small-text'>{data.language}</p>
          </div>
          <Image
            src={data.person.images.jpg.image_url}
            alt={data.person.name}
            width={40}
            height={40}
          />
        </div>
      </Link>
    ));
  } else if (type === 'voice-actors') {
    const allvoiceactors = data.data.voices

    values = allvoiceactors.map((data, index) => (
      <Link 
        href={`/people/${data.person.mal_id}`}
        key={index}
      >
        <div className="flex flex-row space-x-2 cursor-pointer text-color-primary mb-1 border-b border-color-borderdark pb-1 px-1 small-table">
          <Image
            src={data.person.images.jpg.image_url}
            alt={data.person.name}
            width={40}
            height={40}
          />
          <div>
            <p className='small-text text-color-link hover:underline'>{data.person.name}</p>
            <p className='small-text'>{data.language}</p>
          </div>
        </div>
      </Link>
    )); 
  } else if (type === 'character-anime') {
    const allAnime = data.data.anime

    values = allAnime.map((data, index) => (
      <Link 
        href={`/Anime/${data.anime.mal_id}`}
        key={index}
      >
        <div className="flex flex-row space-x-2 cursor-pointer text-color-primary mb-1 border-b border-color-borderdark pb-1 px-1 small-table">
          <Image
            src={data.anime.images.webp.image_url}
            alt={data.anime.images.jpg.image_url}
            width={40}
            height={40}
          />
          <div>
            <p className='small-text text-color-link hover:underline'>{data.anime.title}</p>
            <p className='small-text'>{data.role}</p>
          </div>
        </div>
      </Link>
    )); 
  } else if (type === 'character-manga') {
    const allManga = data.data.manga

    values = allManga.map((data, index) => (
      <Link 
        href={`/manga/${data.manga.mal_id}`}
        key={index}
      >
        <div className="flex flex-row space-x-2 cursor-pointer text-color-primary mb-1 border-b border-color-borderdark pb-1 px-1 small-table">
          <Image
            src={data.manga.images.webp.image_url}
            alt={data.manga.images.jpg.image_url}
            width={40}
            height={40}
          />
          <div>
            <p className='small-text text-color-link hover:underline'>{data.manga.title}</p>
            <p className='small-text'>{data.role}</p>
          </div>
        </div>
      </Link>
    )); 
  } else if (type === 'va-animes') {
    const allAnime = data.data.voices

    values = allAnime.map((data, index) => (
      <Link 
        href={`/Anime/${data.anime.mal_id}`}
        key={index}
      >
        <div className="flex flex-row space-x-2 cursor-pointer text-color-primary mb-1 border-b border-color-borderdark pb-1 px-1 small-table">
          <Image
            src={data.anime.images.webp.image_url}
            alt={data.anime.images.jpg.image_url}
            width={40}
            height={40}
          />
          <div>
            <p className='small-text text-color-link hover:underline'>{data.anime.title}</p>
          </div>
        </div>
      </Link>
    )); 
  } else if (type === 'va-characters') {
    const allCharacters = data.data.voices

    values = allCharacters.map((data, index) => (
      <Link 
        href={`/character/${data.character.mal_id}`}
        key={index}
      >
        <div className="flex flex-row space-x-2 cursor-pointer text-color-primary mb-1 border-b border-color-borderdark pb-1 px-1 small-table text-right justify-end">
          <div>
            <p className='small-text text-color-link hover:underline'>{data.character.name}</p>
            <p className='small-text'>{data.role}</p>
          </div>
          <Image
            src={data.character.images.jpg.image_url}
            alt={data.character.images.webp.image_url}
            width={40}
            height={40}
          />
        </div>
      </Link>
    )); 
  }
  
  return (
    <div className='w-full'>
      {values}
    </div>
  );
};

export default AnimeInfo
