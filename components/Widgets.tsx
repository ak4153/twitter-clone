import { SearchIcon } from '@heroicons/react/outline';
import React from 'react';
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterFollowButton,
  TwitterHashtagButton,
  TwitterMentionButton,
  TwitterTweetEmbed,
  TwitterMomentShare,
  TwitterDMButton,
  TwitterVideoEmbed,
  TwitterOnAirButton,
} from 'react-twitter-embed';

function Widgets() {
  return (
    <div
      className="px-2 mt-2 col-span-2 
    
    hidden
    lg:inline
    "
    >
      <div
        className="flex items-center space-x-2
      mt-2 p-3
      bg-gray-100 rounded-full"
      >
        <SearchIcon className="w-5 h-5 text-gray-400" />

        <input
          type="text"
          placeholder="Search Twitter"
          className="bg-transparent flex-1 outline-none  "
        />
      </div>

      <div className="flex items-center">
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="elonmusk"
          options={{ height: 800 }}
        />
      </div>
    </div>
  );
}

export default Widgets;
