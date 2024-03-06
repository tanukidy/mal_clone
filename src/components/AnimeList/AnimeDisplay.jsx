"use client"

import { useState, useEffect } from 'react';
import Header from "@/components/AnimeList/Header";
import AnimeList from "@/components/AnimeList";
import { getAnimeResponse, getNestedAnimeResponse } from "@/libs/api-list";

const AnimeDisplay = () => {
  const [topAnime, setTopAnime] = useState([]);
  const [recommendedAnime, setRecommendedAnime] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const topAnimeData = await getAnimeResponse("top/anime", "limit=12");
        const recommendedAnimeData = await getNestedAnimeResponse("recommendations/anime", "entry");

        setTopAnime(topAnimeData.data || []);
        setRecommendedAnime(recommendedAnimeData);
        setFetchError(null);
      
      } catch (error) {
        setFetchError(error.message);
      }
    };

    fetchData();
  }, []);

  const handleArrowClick = (direction) => {
    if (direction === 'prev' && startIndex > 0) {
      setStartIndex(startIndex - 4);
    } else if (direction === 'next' && startIndex + 4 < topAnime.length) {
      setStartIndex(startIndex + 4);
    }
  };

  const visibleTopAnime = topAnime.slice(startIndex, startIndex + 4);
  

  return (
    <> 
      <section>
        <Header title="Top Anime Series" linkTitle="See All" linkHref="/Populer"/>
        {fetchError ? (
          <div>Error fetching data: {fetchError}</div>
        ) : (
          <>
            <AnimeList api={visibleTopAnime}/>
            
            {topAnime.length > 4 && (
              <div>
                <button onClick={() => handleArrowClick('prev')}>Previous</button>
                <button onClick={() => handleArrowClick('next')}>Next</button>
              </div>
            )}
          </>
        )}
      </section>

      <section>
        <Header title="Recommendations"/>
        <AnimeList api={recommendedAnime}/>
      </section>
    </>
  );
};

export default AnimeDisplay;
