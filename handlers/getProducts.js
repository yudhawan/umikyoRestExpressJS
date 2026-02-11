const { Field } = require("../db/services");

async function getProducts(req, res) {
  const data = new Field("Products");
  const products = await data.getAll();

  const response = {
    data: products,
    length: products.length,
    page: 1,
    offset: 10,
  };

  res.json(response);
}

module.exports = getProducts;
