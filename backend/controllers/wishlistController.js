const Wishlist = require("../models/Wishlist");

// Add
const addToWishlist = async (req, res) => {

    try {

        const user = req.user.userId;

        const {
            restaurantId,
            restaurantName,
            image,
            category,
            rating,
            deliveryTime
        } = req.body;

        const exists = await Wishlist.findOne({
            user,
            restaurantId,
        });

        if (exists) {

            return res.status(400).json({
                message: "Already in wishlist"
            });

        }

        const item = await Wishlist.create({

            user,

            restaurantId,

            restaurantName,

            image,

            category,

            rating,

            deliveryTime

        });

        res.status(201).json(item);

    }

    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};

// Get

const getWishlist = async (req,res)=>{

    const items = await Wishlist.find({

        user:req.user.userId

    });

    res.json(items);

};

// Delete

const removeWishlist = async(req,res)=>{

    await Wishlist.findByIdAndDelete(

        req.params.id

    );

    res.json({

        message:"Removed"

    });

};

module.exports={

    addToWishlist,

    getWishlist,

    removeWishlist

};