import React from 'react';
import useColorMode from '../../Hooks/ColorMode.hook';
import FilespaceNavbar from '../../Components/Navbar/FilespaceNavbar';

type ContainerTypes = {
  title: string,
  showMenu?: boolean,
  children?: React.ReactNode,
}

export const FilespaceContainer = ({ title, children }: ContainerTypes) => {

  const { mode: colorMode } = useColorMode();
  return (
    <div className={`${colorMode} flex flex-row h-screen`}>
      <div className="flex flex-col min-w-screen max-w-full">
        <FilespaceNavbar title={title} />
        <div className="h-full px-6 py-6 dark:bg-gray-800 text-gray-800 dark:text-slate-200 transition duration-200 ease-linear">
          {children}
        </div>
      </div>
    </div>
  );
};

export default FilespaceContainer;
