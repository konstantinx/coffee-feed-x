import React, { useState } from 'react';

interface ImageProps {
  src?: string;
  alt: string;
}

const Image: React.FC<ImageProps> = ({ src, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <>
      {!isLoaded && <div className='image__placeholder'>Loading...</div>}
      <img
        src={src}
        alt={alt}
        onLoad={handleImageLoad}
        style={{ display: isLoaded ? 'block' : 'none' }}
      />
    </>
  );
};

export default Image;
