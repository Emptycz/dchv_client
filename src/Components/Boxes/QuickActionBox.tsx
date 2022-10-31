import React, { ReactElement } from 'react';

type QuickActionBoxType = {
  label: string,
  icon?: ReactElement;
  className?: string;
  onClick?: () => void;
};

const QuickActionBox = ({ label, icon, className, onClick }: QuickActionBoxType) => {
  return (
    <div onClick={onClick} className='flex cursor-pointer flex-col items-center border-2 rounded-md dark:border-gray-700 p-2 ease-out duration-300 hover:scale-105'>
      <div className={`w-32 h-32 bg-green-300 ${className}`}>
        {icon}
      </div>
      <span> {label} </span>
    </div>
  );
};

export default QuickActionBox;