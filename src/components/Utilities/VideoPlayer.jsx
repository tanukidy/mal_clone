"use client"

import { XCircle } from "@phosphor-icons/react"
import { useState } from "react"
import YouTube from "react-youtube"

const VideoPlayer = ({youtubeId}) => {
  const [isOpen, setIsOpen] = useState(true)

  const handleVideoPlayer = () => {
    setIsOpen((prevState) => !prevState)
  }

  const option = {
    width: "300",
    height: "250"
  }

  const Player = () => {
    return (
      <div className="fixed bottom-2 right-2">
      <button onClick={handleVideoPlayer} className="text-color-primary float-right hover:text-color-accent"><XCircle size={32} /></button>
      <YouTube
        videoId={youtubeId}
        onReady={(event) => event.target.pauseVideo()}
        opts={option}
      />
    </div>
    )
  }

  return isOpen ? <Player/> : 
  <button onClick={handleVideoPlayer} className="fixed bottom-5 right-5 px-2 rounded border bg-color-primary text-color-dark text-xl hover:bg-color-accent hover:font-bold transition-all shadow-xl">
    Watch Trailer
  </button>
}

export default VideoPlayer