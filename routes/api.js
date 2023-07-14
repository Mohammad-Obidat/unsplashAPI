const express = require('express');
const axios = require('axios');
const router = express.Router();

const getProducts = async () => {
  const URL = `https://api.unsplash.com/photos?client_id=${process.env.unsplashAPI_KEY}`;
  const products = await axios.get(URL);
  products.data.map((product) => {
    return {
      id: product.id,
      description: product.description,
      imageURL: product.urls.full,
    };
  });
};

router.get('/', async (req, res) => {
  try {
    const products = await getProducts();
    res.status(200).send(products);
  } catch (error) {
    res.sendStatus(400);
  }
});

module.exports = router;
