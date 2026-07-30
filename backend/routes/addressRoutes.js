const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {

    saveAddress,

    getAddresses,

    updateAddress,

    deleteAddress

} = require("../controllers/addressController");

router.post("/",authMiddleware,saveAddress);

router.get("/",authMiddleware,getAddresses);

router.put("/:id",authMiddleware,updateAddress);

router.delete("/:id",authMiddleware,deleteAddress);

module.exports=router;