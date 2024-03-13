"use client"

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';

const AnimeList = ({ api, isGrid }) => { 
  const [startIndex, setStartIndex] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 640);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleNext = () => {
     if (api && api.data) {
      setStartIndex((prevIndex) => (prevIndex + 4) % api.data.length);
    }
  };

  const handlePrev = () => {
     if (api && api.data) {
      setStartIndex((prevIndex) => (prevIndex - 4 + api.data.length) % api.data.length);
    }
  };

  const visibleAnimes = api?.data? [ 
    ...api.data.slice(startIndex, startIndex + 7),
    ...api.data.slice(0, Math.max(0, 7 - (api.data.length - startIndex))),
  ] : []

  return (
    <div className="relative bg-color-dark">
      <div className={`flex overflow-hidden space-x-4 ${isGrid ? "grid-container" : "border-t border-color-borderdark"} py-2 group`}>
        {isGrid ? (
          <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 md:px-4 sm:px-4">
            {isGrid.data?.map((anime, index) => (
              <Link
                href={`/Anime/${anime.mal_id}`}
                className="cursor-pointer text-color-primary hover:text-color-accent transition-all"
                key={index}
              >
                <Image
                  src={anime.images.webp.image_url}
                  alt={anime.title}
                  width={350}
                  height={350}
                  className="w-full max-h-64 xl:max-h-80 object-cover img-scale"
                />
                <h3 className="font-bold md:text-xl text-md p-4">{anime.title}</h3>
              </Link>
            ))}
          </div>
        ) : (
          visibleAnimes.map((anime, index) => (
            <Link
              key={index}
              href={`/Anime/${anime.mal_id}`}
              className="cursor-pointer text-color-primary hover:text-color-accent transition-all"
            >
              <div className="flex-shrink-0 md:w-48 w-40">
                <Image
                  src={anime.images.webp.image_url}
                  alt={anime.title}
                  width={350}
                  height={350}
                  className="w-full sm:w-30 h-80 sm:h-30 object-cover img-scale"
                />
                <h3 className="font-bold text-md p-4 title-ellipsis">{anime.title}</h3>
              </div>
            </Link>
          ))
        )}
        {!isSmallScreen && !isGrid &&(
          <>
        <div className='absolute top-1/2 left-[-24px] -translate-y-20 border rounded-r-full bg-color-dark py-5 px-1 opacity-0 group-hover:translate-x-2 group-hover:opacity-90 transition-all ease-in-out duration-500 z-5'>
          <CaretLeft onClick={handlePrev} className='' size={40} />
        </div>
        <div className='absolute top-1/2 right-[-7px] -translate-y-20 border rounded-l-full bg-color-dark py-5 px-1 opacity-0 group-hover:translate-x-[-7px] group-hover:opacity-90 transition-all ease-in-out duration-500 z-5'>
          <CaretRight onClick={handleNext} className='' size={40} />
        </div>
        </>
        )}
      </div>
    </div>
  );
};

export default AnimeList;