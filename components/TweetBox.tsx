import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import {
  CalendarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  SearchCircleIcon,
} from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import { Tweet, TweetBody } from '../typings';
import toast from 'react-hot-toast';
import { fetchTweets } from '../utils/fetchTweets';

interface Props {
  setTweets: Dispatch<SetStateAction<Tweet[]>>;
}

function TweetBox({ setTweets }: Props) {
  const [input, setInput] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [imageUrlBoxOpen, setImageBoxUrlBoxOpen] = useState<boolean>(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const { data: session } = useSession();

  const addImageToTweet = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!imageInputRef.current?.value) return;
    setImageUrl(imageInputRef.current.value);
    imageInputRef.current.value = '';
    setImageBoxUrlBoxOpen(false);
  };

  const postTweet = async () => {
    const successToast = toast.loading('Posting Tweet..');
    const data: TweetBody = {
      text: input,
      username: session?.user?.name || 'none',
      profileImage: session?.user?.image || 'assets/profile.jpg',
      image: imageUrl,
    };

    const result = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + 'api/' + 'addTweet',
      {
        method: 'post',
        body: JSON.stringify(data),
      }
    );

    const json = await result.json();
    const newTweets: Tweet[] = await fetchTweets();
    //prop drilled from 1 above
    setTweets(newTweets);
    toast.success('Tweet Posted', { id: successToast });
    return json;
  };

  const handleSubmitTweet = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postTweet();
    setInput('');
    setImageBoxUrlBoxOpen(false);
    setImageUrl('');
  };

  return (
    <div className="flex space-x-2 p-5">
      <img
        className="h-14 w-14 mt-4  rounded-full object-cover self-start  "
        src={session?.user?.image ? session.user?.image : 'assets/profile.jpg'}
        alt="profilepic"
      />

      <div className="flex flex-1 items-center pl-2 ">
        <form
          onSubmit={handleSubmitTweet}
          action=""
          className=" flex flex-1 flex-col"
        >
          <input
            className="h-24 w-full text-xl outline-none placeholder:text-xl"
            type="text"
            placeholder="What's Happening?"
            onChange={(e) => setInput(e.target.value)}
          />

          <div className="flex items-center">
            <div className="flex space-x-2 text-twitter flex-1 ">
              <PhotographIcon
                onClick={() => setImageBoxUrlBoxOpen((prev) => (prev = !prev))}
                className="h-5 w-5
              cursor-pointer
              transition-transform duration-150 ease-out hover:scale-150
              "
              />
              <SearchCircleIcon className="h-5 w-5" />
              <EmojiHappyIcon className="h-5 w-5" />
              <CalendarIcon className="h-5 w-5" />
              <LocationMarkerIcon className="h-5 w-5" />
            </div>
            <button
              disabled={!input || !session}
              className="bg-twitter rounded-full px-5 py-2 font-bold text-white
              disabled:opacity-40
              "
            >
              Tweet
            </button>
          </div>

          {imageUrlBoxOpen && (
            <form className="bg-twitter/80 mt-5 rounded-lg flex py-2 px-4">
              <input
                ref={imageInputRef}
                className=" p-2 bg-transparent flex flex-1 outline-none placeholder:text-white "
                type="text"
                placeholder="Enter Image URL..."
              />
              <button
                className={`
               rounded-full text-md p-1 font-bold 
                 text-white
               `}
                onClick={addImageToTweet}
              >
                Add Image
              </button>
            </form>
          )}
          {imageUrl && (
            <img
              className="mt-5 w-full h-40  shadow-lg object-contain rounded-xl"
              src={imageUrl}
              alt="image"
            ></img>
          )}
        </form>
      </div>
    </div>
  );
}

export default TweetBox;
