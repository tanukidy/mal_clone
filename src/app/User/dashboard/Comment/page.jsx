

import Blank from "@/components/Dashboard/Blank"
import Header from "@/components/Dashboard/Header"
import { authUserSession } from "@/libs/auth-libs"
import prisma from "@/libs/prisma"
import Image from "next/image"
import Link from "next/link"

const page = async () => {
    const user = await authUserSession()
    const comments = await prisma.comment.findMany({where: {user_email: user.email} })

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
    <section className="px-4 mt-4 w-full">
      <Header title={"My Comment"}/>
      <div className="grid grid-cols-1 py-2 gap-4">
        {comments.length === 0
         ? 
         <Blank title={"NO COMMENT"}/>
         :
         comments.map(comment => {
          return (

            <Link href={`/Anime/${comment.anime_mal_id}`} key={comment.id} className="flex flex-row gap-2 bg-color-lightdark text-color-primary p-2">
              <Image 
                src={comment.anime_image}
                alt=""
                width={60}
                height={60}
              />
              <div>
                <p className="text-sm">{comment.anime_title}</p>
                <p className="italic small-text">{comment.comment}</p>
                {renderStarRating(comment.rating)}
              </div>
            </Link>
              
          )
        })
        }
        
      </div>
    </section>
  )
}

export default page