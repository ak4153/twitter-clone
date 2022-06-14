// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { sanityClient } from '../../sanity';
import { TweetComment } from '../../typings';
import { groq } from 'next-sanity';

type Data = {
  comments: TweetComment[];
};

//groq is a query language of sanity

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const feedQuery = groq`
*[_type=="comment"&&tweet._ref=="${req.query.tweetId}"]{
    _id,
    ...
    
  }| order(_createdAt asc)
`;
  //using sanityClient which we configs in ../../sanity
  const comments: TweetComment[] = await sanityClient.fetch(feedQuery);
  res.status(200).json({ comments });
}
