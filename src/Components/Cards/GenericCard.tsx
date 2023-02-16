import React from 'react';

type GenericCardProps = {
  content: string | Blob,
  title: string,
  onClick?: () => void,
}

const GenericCard = ({ content, title, onClick }: GenericCardProps) => {


  const renderMenu = () => {
    // TODO: Implement rendering dropdown option menu
  };

  const renderContent = (content: string | Blob) => {
    if (typeof(content) === 'string') return <span className='text-7xl'> {content} </span>;

    // TODO: Implement Bitmap (Blob) image render -> map Blob to <image>
    return null;
  };

  return (
    <div onClick={onClick} className="flex flex-col items-center p-2 gap-2 w-60 h-56 border-[1px] cursor-pointer rounded-md border-gray-400 hover:border-gray-800 ease-out duration-300 dark:border-gray-400 dark:hover:border-gray-100">
      <div className='h-44 w-full flex flex-col justify-center items-center'>
        {renderContent(content)}
      </div>
      <div className='flex flex-row h-8 items-center w-full border-t-[1px] border-gray-400 hover:border-gray-800 ease-out duration-300 dark:border-gray-400 dark:hover:border-gray-100'>
        <span className='w-full'> {title} </span>
        <div className='h-full w-12'>
          <button type="button" onClick={renderMenu}> ... </button>
        </div>
      </div>
    </div>
  );
};

export default GenericCard;
