import React from 'react';
import { user } from '../../database/database';
import ScrollingPhotos from '../organisms/ScrollingPhotos';

const Gallery = () => {
  return (
    <ScrollingPhotos user={user()?.id} publicOnly={true} />
  );
};

export default Gallery;
