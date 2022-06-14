import React from 'react';

interface Props {
  Icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  title: string;
  onClick?: () => {};
}

function SidebarRow({ Icon, title, onClick }: Props) {
  return (
    <div
      onClick={() => onClick?.()}
      className="group
       flex items-center space-x-2 px-4 py-3
       max-w-fit
      cursor-pointer
      rounded-full
     hover:bg-gray-100 
     transition-all duration-200 
     
     "
    >
      <Icon className="h-6 w-6" />
      <p
        className="group-hover:text-twitter 
        text-base font-light
        hidden
      md:inline
      lg:text-xl
      "
      >
        {title}
      </p>
    </div>
  );
}

export default SidebarRow;
