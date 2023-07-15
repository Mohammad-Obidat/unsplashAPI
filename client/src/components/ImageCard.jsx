import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Spinner, Toast, ToastContainer } from 'react-bootstrap';

function ImageCard() {
  const [photoUrl, setPhotoUrl] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchImagesUrl = async () => {
    try {
      const imagesUrl = await fetch('/api/imageGallery');
      const response = await imagesUrl.json();

      // Verify the response structure and adjust accordingly
      const imageUrl = Array.isArray(response) ? response : [];
      setPhotoUrl(imageUrl);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while fetching images url.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImagesUrl();
  }, []);

  return (
    <>
      {loading ? (
        <div className='d-flex justify-content-center align-items-center vh-100'>
          <Spinner
            animation='border'
            variant='primary'
            style={{ width: '2.5rem', height: '2.5rem' }}
          />
        </div>
      ) : error ? (
        <ToastContainer position='middle-center'>
          <Toast
            bg='info'
            show={true}
            onClose={() => setError(null)}
            className='error-toast'
          >
            <Toast.Header closeButton={false}>
              <strong>Error</strong>
            </Toast.Header>
            <Toast.Body>{error}</Toast.Body>
          </Toast>
        </ToastContainer>
      ) : (
        photoUrl.map((image) => (
          <div
            key={photoUrl.indexOf(image)}
            className='col-lg-3 col-md-4 col-6'
          >
            <Link to={image} className='d-block mb-4 h-100'>
              <img className='img-fluid img-thumbnail' src={image} alt='' />
            </Link>
          </div>
        ))
      )}
    </>
  );
}

export default ImageCard;
