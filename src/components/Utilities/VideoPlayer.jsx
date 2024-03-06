"use client"

import { useState } from "react";
import YouTube from "react-youtube";
import { Play, X } from "@phosphor-icons/react";

const VideoPlayer = ({ youtubeId }) => {
  const [isOpen, setIsOpen] = useState(true);
  const thumbnailUrl = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;

  const handleVideoPlayer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const option = {
    width: "1053",
    height: "473"
  };

  const Player = () => {
    return (
      <div className="absolute top-13 left-3">
        <button onClick={handleVideoPlayer} className="absolute text-color-primary right-[-10px] top-[-10px] hover:text-color-accent bg-color-dark border border-color-primary py-1 px-1 border-bold" style={{borderRadius: "50%"}}>
          <X size={15} weight="bold"/>
        </button>
        <YouTube
          videoId={youtubeId}
          onReady={(event) => event.target.pauseVideo()}
          opts={option}
        />
      </div>
    );
  };

  return isOpen ? (
    <div className="relative flex justify-center items-center" style={{ width: "200px", height: "133px" }}>
      <img src={thumbnailUrl} alt="Video Thumbnail" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      <button
      onClick={handleVideoPlayer}
      className="absolute flex flex-row items-center gap-1 rounded border bg-color-dark text-color-primary text-sm transition-all shadow-xl bg-opacity-80 py-1 px-2"
    >
      <Play size={15} color="#eeeae3" weight="fill" className="border border-color-primary p-1" style={{borderRadius: "50%"}}/>
      Play
    </button>
      
    </div>
  ) : (
    <Player />
  );
};

export default VideoPlayer;
