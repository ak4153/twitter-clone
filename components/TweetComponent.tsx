import React, { FormEvent, useEffect, useState } from 'react';
import { Comment, Tweet, TweetComment } from '../typings';
import TimeAgo from 'react-timeago';
import {
  ChatAlt2Icon,
  HeartIcon,
  SwitchHorizontalIcon,
  UploadIcon,
} from '@heroicons/react/outline';
import { fetchComments } from '../utils/fetchComments';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';

interface Props {
  tweet: Tweet;
}

export default function SingleTweet({ tweet }: Props) {
  const [tweetComments, setTweetComments] = useState<TweetComment[]>([]);
  const [commentBoxOpen, setCommentBoxOpen] = useState<Boolean>(false);
  const [commentInput, setCommentInput] = useState<string>('');
  const { data: session } = useSession();

  useEffect(() => {
    refreshComments();
    return () => {
      setTweetComments([]);
    };
  }, []);

  const refreshComments = async () => {
    const comments: TweetComment[] = await fetchComments(tweet._id);
    setTweetComments(comments);
  };

  const postComment = async () => {
    const successToast = toast.loading('Posting Tweet..');
    const data: Comment = {
      comment: commentInput,
      username: session?.user?.name || 'none',
      profileImage: session?.user?.image || 'assets/profile.jpg',
    };

    const result = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL +
        'api/' +
        'addComment' +
        `?tweetId=${tweet._id}`,
      {
        method: 'post',
        body: JSON.stringify(data),
      }
    );

    const json = await result.json();
    const newTweets: TweetComment[] = await fetchComments(tweet._id);
    //prop drilled from 1 above
    setTweetComments(newTweets);
    toast.success('Tweet Posted', { id: successToast });
    return json;
  };

  const handleSubmitComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postComment();
    setCommentInput('');
    setCommentBoxOpen(false);
  };
  return (
    <div className=" p-5 flex flex-col space-x-3 border-y border-gray-100">
      <div className="flex space-x-3">
        <img
          className="w-10 h-10
          rounded-full
          object-cover
          "
          src={tweet.profileImage}
          alt="profileimage"
        />

        <div>
          <div className="flex items-center space-x-1">
            <p className="mr-1 font-bold">{tweet.username}</p>
            <p className="hidden text-sm text-gray-500 sm:inline">
              @{tweet.username.replace(/\s+/g, '').toLocaleLowerCase()}
            </p>
            <TimeAgo
              className="text-sm text-gray-500"
              date={tweet._createdAt}
            />
          </div>

          <p className="pt-1">{tweet.text}</p>
          {tweet.image && (
            <img
              className=" m-5 ml-0 mb-1 max-h-60 object-cover shadow-sm rounded-lg"
              src={tweet.image}
              alt="image"
            />
          )}
        </div>
      </div>

      <div className=" mt-5 flex justify-between">
        <div className=" flex cursor-pointer items-center space-x-3 text-gray-400">
          <ChatAlt2Icon
            onClick={() => setCommentBoxOpen((prev) => (prev = !prev))}
            className="h-5 w-5  "
          />
          <p>{tweetComments?.length}</p>
        </div>
        <div className=" flex cursor-pointer items-center space-x-3 text-gray-400">
          <HeartIcon className="h-5 w-5 " />
        </div>
        <div className=" flex cursor-pointer items-center space-x-3 text-gray-400">
          <SwitchHorizontalIcon className="h-5 w-5 " />
        </div>
        <div className=" flex cursor-pointer items-center space-x-3 text-gray-400">
          <UploadIcon className="h-5 w-5  " />
        </div>
      </div>

      {commentBoxOpen && (
        <form
          onSubmit={handleSubmitComment}
          className="bg-twitter/80 rounded-lg mt-3 p-5 flex justify-between 
        "
        >
          <input
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder={`What's On Your Mind?`}
            className="outline-none bg-transparent placeholder:text-white text-white"
            type="text"
          />
          <button
            disabled={commentInput ? false : true}
            className="rounded-full bg-twitter/80 p-2 text-white font-bold cursor-pointer disabled:cursor-auto disabled:text-gray-500"
          >
            Comment
          </button>
        </form>
      )}

      {tweetComments?.length > 0 && (
        <div className=" my-2 mt-5 max-h-44 space-y-2 overflow-y-scroll border-t border-gray-100">
          {tweetComments.map((comment) => (
            <div
              className=" relative  flex items-center border-x border-gray-100 "
              key={comment._id}
            >
              <hr className="absolute left-3 top-9 h-8 border-x border-twitter/50" />
              <img
                className=" mr-3 h-7 w-7 rounded-full object-cover  "
                src={comment.profileImage}
                alt="image"
              />

              <div>
                <div className=" flex items-center flex-row space-x-1  ">
                  <p className="mr-1 font-bold">{comment.username}</p>
                  <p className="hidden text-sm text-gray-500 sm:inline">
                    @{comment.username.replace(/\s+/g, '').toLocaleLowerCase()}
                  </p>
                  <TimeAgo
                    className="text-sm text-gray-500"
                    date={comment._createdAt}
                  />
                </div>
                <div>
                  <p>{comment.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
