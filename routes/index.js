const { Router } = require("express");
const registerUser = require("../handlers/registerUser");
const userLogin = require("../handlers/userLogin");
const getUsers = require("../handlers/getUsers");
const changeStatUser = require("../handlers/changeStatUser");
const validationToken = require("../handlers/validationToken");
const createProduct = require("../handlers/createProduct");
const getProducts = require("../handlers/getProducts");
const createCategory = require("../handlers/createCategory");
const getCategories = require("../handlers/getCategories");
const submitOrder = require("../handlers/submitOrder");
const getStatusOrder = require("../handlers/getStatusOrder");

const router = Router();

router.get("/", (req, res) => {
  res.json("Terrrrr");
});

router.post("/registerUser", registerUser);
router.get("/getUsers", getUsers);
router.post("/userLogin", userLogin);
router.post("/addProduct", createProduct);
router.post("/addCategory", createCategory);
router.get("/getProducts", getProducts);
router.get("/getCategories", getCategories);
router.post("/submitOrder", submitOrder);
router.get("/getStatusOrder", getStatusOrder);
router.post("/changeStatUser", changeStatUser);
router.post("/validationToken", validationToken);

module.exports = router;
