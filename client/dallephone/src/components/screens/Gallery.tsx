import React from 'react';
import ScrollingPhotos from '../organisms/ScrollingPhotos';

const Gallery = () => {
  return (
    <ScrollingPhotos showCreator publicOnly={true} />
  );
};

export default Gallery;
