const { Router } = require("express");
const { authorization } = require("../middleware/authorization");
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

router.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Public routes
router.post("/registerUser", registerUser);
router.post("/userLogin", userLogin);
router.post("/validationToken", validationToken);

// Protected routes
router.get("/getUsers", authorization, getUsers);
router.post("/changeStatUser", authorization, changeStatUser);
router.post("/addProduct", authorization, createProduct);
router.get("/getProducts", authorization, getProducts);
router.post("/addCategory", authorization, createCategory);
router.get("/getCategories", authorization, getCategories);
router.post("/submitOrder", authorization, submitOrder);
router.get("/getStatusOrder", authorization, getStatusOrder);

module.exports = router;
