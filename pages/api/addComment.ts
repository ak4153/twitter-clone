// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Comment, TweetComment } from '../../typings';

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data: Comment = JSON.parse(req.body);
  console.log('data>>', data);
  const mutations = {
    mutations: [
      {
        create: {
          _type: 'comment',
          comment: data.comment,
          username: data.username,
          profileImage: data.profileImage,
          tweet: { _ref: req.query.tweetId, _type: 'reference' },
        },
      },
    ],
  };
  const apiEndpoint = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`;
  const result = await fetch(apiEndpoint, {
    method: 'post',
    headers: {
      'Content-type': 'application/json',
      //authorization is needed in order to authenticate a request in the data-set
      Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`,
    },
    body: JSON.stringify(mutations),
  });
  const json = await result.json();

  res.status(200).json({ message: 'Added a Comment to dataset' });
}
