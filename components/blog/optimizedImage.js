import React, { memo } from 'react';
import Image from 'next/image';

const OptimizedImage = memo(({ file, selectedFile, handleFileClick, index }) => {
    return (
      <div
        key={index}
        className={`border-[1px] border-gray-300 cursor-pointer p-2 rounded ${
          selectedFile === file.name ? "border-orange-500 dark:border-orange-900 bg-orange-200 dark:bg-orange-900 border-[1px]" : "border-transparent"
        }`}
        onClick={() => handleFileClick(file)}
      >
        <img
          src={file.preview}
          alt={file.description}
          className="w-full h-72 lg:h-72 object-contain rounded"
        />
      </div>
    );
  });

  OptimizedImage.displayName = 'OptimizedImage';
  
  export default OptimizedImage;