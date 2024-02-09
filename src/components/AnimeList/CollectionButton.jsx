"use client"

import { PlusSquare } from "@phosphor-icons/react";
import React, { useState } from "react";

const CollectionButton = ({ anime_mal_id, user_email, anime_title, anime_image}) => {
  const [isCreated, setIsCreated] = useState(false)

  const handleCollection = async (event) => {
    event.preventDefault()

    const data = {anime_mal_id, user_email, anime_title, anime_image}

    const response = await fetch("/api/v1/collection", {
      method: "POST",
      body: JSON.stringify(data)
    })
    const collection = await response.json()
    if(collection.status == 200) {
      setIsCreated(collection.isCreated)
    }
    return
  }

  return (
    <>
        {
        isCreated 
        ? 
        <p className="text-color-primary">Success</p> 
        :
        <button
          onClick={handleCollection}
          className="flex gap-1 pr-2 w-36 py-1 bg-color-accent text-sm justify-center items-center rounded">
          <PlusSquare size={15} color="#222831" weight="fill"/>
          Add to My List
        </button>
        }
    </>
  )
}

export default CollectionButton