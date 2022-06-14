import React from 'react';

import {
  BellIcon,
  HashtagIcon,
  BookmarkIcon,
  CollectionIcon,
  DotsCircleHorizontalIcon,
  MailIcon,
  UserIcon,
  HomeIcon,
} from '@heroicons/react/outline';
//components
import SidebarRow from './SidebarRow';
import { signIn, signOut, useSession } from 'next-auth/react';

function Sidebar() {
  const { data: session } = useSession();

  return (
    <div
      className="flex flex-col 
    col-span-2
    items-center px-4 
    md:items-start
    "
    >
      <img
        src="assets/twitterIcon.png"
        className="h-10 w-10 m-3"
        alt="twitter"
      />
      <SidebarRow title="Home" Icon={HomeIcon} />
      <SidebarRow title="Hashtag" Icon={HashtagIcon} />
      <SidebarRow title="Bookmarks" Icon={BookmarkIcon} />
      <SidebarRow title="Lists" Icon={CollectionIcon} />
      <SidebarRow title="Home" Icon={DotsCircleHorizontalIcon} />
      <SidebarRow title="Messages" Icon={MailIcon} />
      <SidebarRow title="Profile" Icon={UserIcon} />
      <SidebarRow title="Notifications" Icon={BellIcon} />
      <SidebarRow
        onClick={session ? signOut : signIn}
        title={session ? 'Sign-Out' : 'Sign-In'}
        Icon={DotsCircleHorizontalIcon}
      />
    </div>
  );
}

export default Sidebar;
