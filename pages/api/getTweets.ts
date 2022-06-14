// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { sanityClient } from '../../sanity';
import { Tweet } from '../../typings';
import { groq } from 'next-sanity';

type Data = {
  tweets: Tweet[];
};

//groq is a query language of sanity
const feedQuery = groq`
*[_type=="tweet"]{
    _id,
    ...
  }| order(_createdAt desc)
`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //using sanityClient which we configs in ../../sanity
  const tweets: Tweet[] = await sanityClient.fetch(feedQuery);
  res.status(200).json({ tweets });
}
