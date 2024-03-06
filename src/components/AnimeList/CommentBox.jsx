import prisma from "@/libs/prisma"
import React from "react"


const CommentBox = async ({anime_mal_id}) => {
  const comments =  await prisma.comment.findMany({where: {anime_mal_id}} )

  const renderStarRating = (rating) => {
    const maxRating = 5;
    const starArray = Array.from({ length: maxRating }, (_, index) => ({
      id: index + 1,
      filled: index < rating,
    }));

    return (
      <div className="flex flex-row">
        {starArray.map((star) => (
          <img
            key={star.id}
            src={star.filled ? "/Filled-Star.png" : "/Empty-Star.png"}
            alt={star.filled ? "Filled Star" : "Empty Star"}
            style={{ width: "15px", height: "15px", marginRight: "2px" }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4 mb-4">
      {comments.map(comment => {
        return (
          <div 
          key={comment.id} 
          className=" text-sm text-color-primary bg-color-lightdark p-4 border border-color-borderdark">
            <a>{comment.username}</a>
            <p>{comment.comment}</p>
            {renderStarRating(comment.rating)}
          </div>
        )
      })}
    </div>
  )
}

export default CommentBox