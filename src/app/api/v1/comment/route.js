import prisma from "@/libs/prisma"

export async function POST(request) {
  const {anime_mal_id, user_email, comment, username, anime_title, rating } = await request.json()
  const data = {anime_mal_id, user_email, comment, username, anime_title, rating}

  const createComment = await prisma.comment.create({data})

  if(!createComment) return Response.json({status:500, isCreated: false})
  else return Response.json({status:200, isCreated: true})
}