import React, { useState } from 'react';

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: string | number;
  height?: string | number;
  loading?: 'lazy' | 'eager';
  fallbackSrc?: string;
}

export const Image: React.FC<ImageProps> = ({ 
  src, 
  alt, 
  className = '', 
  width, 
  height, 
  loading = 'lazy',
  fallbackSrc = 'https://via.placeholder.com/300x200/182b34/FFFFFF?text=Image+Not+Found' 
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  
  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      className={className}
      onError={handleError}
    />
  );
};