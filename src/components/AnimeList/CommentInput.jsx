"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import StarRatings from "react-star-ratings"

const CommentInput = ({anime_mal_id, user_email, username, anime_title}) => {
  const [comment, setComment] = useState("")
  const [isCreated, setIsCreated] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [rating, setRating] = useState(0)

  const router = useRouter()

  const handleInput = (event) => {
    setComment(event.target.value)
    setErrorMessage("")
  }

  const handlePosting = async (event) => {
      event.preventDefault()

      if (comment.length < 3) {
        setErrorMessage("Comment must be at least 3 characters long")
        return
      }

      const data = {anime_mal_id, user_email, comment, username, anime_title, rating: rating.toString()}

      const response = await fetch("/api/v1/comment", {
        method: "POST",
        body: JSON.stringify(data)
      })
      const postComment = await response.json()
      if(postComment.status == 200) {
        setIsCreated(postComment.isCreated)
        setComment("")
        setRating(0)
        router.refresh()
      }
      return
  }

  return (
    <div className="flex flex-col gap-2">
      {isCreated && <p className="text-color-primary">postingan terkirim...</p>}
      {errorMessage && <p className="text-color-primary">{errorMessage}</p>}
      <textarea 
      onChange={handleInput} 
      value={comment} 
      className="w-full h-32 text-xl p-2"
      />
      <StarRatings
        rating={rating}
        starRatedColor="orange"
        starHoverColor="orange"
        starEmptyColor="grey"
        changeRating={(newRating) => setRating(newRating)}
        numberOfStars={5}
        starDimension="20px"
        starSpacing="2px"
      />
      <button 
      onClick={handlePosting} 
      className="bg-color-accent w-52 py-2 px-2">
        Posting Komentar
      </button>
    </div>
  )
}

export default CommentInput