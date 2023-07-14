require('dotenv').config();
const express = require('express');
const axios = require('axios');
const router = express.Router();

const getPhotos = async () => {
  //   const URL = `https://api.unsplash.com/photos?client_id=${process.env.UNSPLASHAPI_KEY}`;
  const URL = `https://api.unsplash.com/photos?client_id=EXHr9WnNMv1Hl8Y99eMaXkOqlqFYRN4OE34SINtEtCQ`;
  const photos = await axios.get(URL);
  photos.data.map((photo) => {
    return {
      id: photo.id,
      description: photo.description,
      imageURL: photo.urls.full,
    };
  });
};
