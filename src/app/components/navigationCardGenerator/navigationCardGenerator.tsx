import { useData } from 'nextra/data';
import React from 'react';
import { FileResult } from './fileResult';

type NavigationCardGeneratorSSRProps = {
  filePath: string;
};

export function NavigationCardGeneratorSSR({ filePath }: NavigationCardGeneratorSSRProps) {
  const { navigationCardContent } = useData();
  const cardFolder = filePath.replace('/pages', '');
  const content = navigationCardContent.find((file: FileResult) => file.url === filePath).content;
  const contentAsObj = JSON.parse(content);

  return (
    <>
      {Object.keys(contentAsObj).map((key, index) => {
        const title = contentAsObj[key];
        const headerNumber = index + 1;

        return (
          <div key={key}>
            <div className="group h-full rounded-[12px] shadow-sm transition-all hover:shadow-lg dark:hover:shadow-lg dark:hover:nx-bg-primary-100/5 border border-gray-500 hover:nx-bg-gray-100">
              <a className="flex flex-col p-5 h-full" href={`${cardFolder}/${key}`}>
                <div className="p-1 items-center my-auto">
                  <div className="inline-flex justify-auto items-center">
                    <div className="mr-2 flex h-8 w-8 flex-none flex-shrink-0 items-center justify-center rounded-full nx-bg-primary-100 nx-text-primary-800 dark:nx-bg-primary-400/10 text-sm font-bold dark:nx-text-primary-600 group-hover:bg-white group-hover:text-white dark:group-hover:bg-[#171717] dark:group-hover:text-black">
                      <div className="group-hover:hidden">{headerNumber}</div>
                      <svg
                        className="hidden h-5 fill-none group-hover:block stroke-black dark:stroke-white stroke-linecap-round stoke-linejoin-round stroke-width-1.5"
                        height="24"
                        shapeRendering="geometricPrecision"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <path d="M8 6 L18 12"></path>
                        <path d="M8 18 L18 12"></path>
                      </svg>
                    </div>
                    <p className="hyphens-auto">{title}</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        );
      })}
    </>
  );
}
