const express = require('express');
const axios = require('axios');
const router = express.Router();

const getProducts = async () => {
  const URL = `https://api.unsplash.com/photos?client_id=${process.env.unsplashAPI_KEY}`;
  const products = await axios.get(URL);
  return products.data.map((product) => ({
    id: product.id,
    name: product.user.name,
    description:
      product.description ||
      'The product does not have a provided description.',
    imageURL:
      product.urls.full ||
      'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled.png',
  }));
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
