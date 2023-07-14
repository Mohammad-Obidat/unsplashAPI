import React from 'react';
import ImageCard from './ImageCard';

function ImageGallery() {
  return (
    <>
      <div className='container'>
        <div className='row text-center text-lg-start'>
          <ImageCard />
        </div>
      </div>
    </>
  );
}

export default ImageGallery;
