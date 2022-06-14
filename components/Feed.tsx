import { RefreshIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Tweet } from '../typings';
import { fetchTweets } from '../utils/fetchTweets';
import TweetBox from './TweetBox';
import TweetComponent from './TweetComponent';

interface Props {
  tweets: Tweet[];
}

function Feed({ tweets: tweetsProp }: Props) {
  const [tweets, setTweets] = useState<Tweet[]>(tweetsProp);

  const handleRefresh = async () => {
    const refreshToast = toast.loading('Refreshing...');
    const tweets = await fetchTweets();
    setTweets(tweets);
    toast.success('Feed Updated', { id: refreshToast });
  };

  return (
    <div
      className=" col-span-7 
    lg:col-span-5
    border-x
    max-h-screen overflow-scroll
    scrollbar-hide
    "
    >
      <div className="flex items-center justify-between  ">
        <h1 className="p-5 pb-0 text-xl font-bold">Home</h1>
        <RefreshIcon
          onClick={handleRefresh}
          className="h-8 w-8 mr-5 mt-5 
        text-twitter
        cursor-pointer 
        transition-all duration-500 ease-out
        hover:rotate-180 
        active:scale-125
        "
        />
      </div>

      <div>
        <TweetBox setTweets={setTweets} />
      </div>
      <div className="">
        {tweets.map((tweet) => (
          <TweetComponent tweet={tweet} key={tweet._id} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
