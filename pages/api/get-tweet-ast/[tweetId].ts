import { fetchTweetAst } from 'static-tweets'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).send({ error: 'method not allowed' })
  }

  const tweetId = req.query.tweetId

  if (!tweetId || typeof tweetId !== 'string') {
    return res
      .status(400)
      .send({ error: 'missing required parameter "tweetId"' })
  }

  const tweetAst = await fetchTweetAst(tweetId)

  res.status(200).json(tweetAst)
}
