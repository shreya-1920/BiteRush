const Address = require("../models/Address");

// ================= SAVE ADDRESS =================

exports.saveAddress = async (req,res)=>{

    try{

        const {fullName,phone,address,label}=req.body;

        const newAddress=await Address.create({

            user:req.user.userId,

            fullName,

            phone,

            address,

            label

        });

        res.status(201).json({

            success:true,

            message:"Address saved successfully.",

            address:newAddress

        });

    }

    catch(err){

        res.status(500).json({

            success:false,

            message:err.message

        });

    }

};

// ================= GET USER ADDRESSES =================

exports.getAddresses=async(req,res)=>{

    try{

        const addresses=await Address.find({

            user:req.user.userId

        });

        res.status(200).json({

            success:true,

            addresses

        });

    }

    catch(err){

        res.status(500).json({

            success:false,

            message:err.message

        });

    }

};

// ================= UPDATE ADDRESS =================

exports.updateAddress=async(req,res)=>{

    try{

        const address=await Address.findByIdAndUpdate(

            req.params.id,

            req.body,

            {new:true}

        );

        res.status(200).json({

            success:true,

            message:"Address updated.",

            address

        });

    }

    catch(err){

        res.status(500).json({

            success:false,

            message:err.message

        });

    }

};

// ================= DELETE ADDRESS =================

exports.deleteAddress=async(req,res)=>{

    try{

        await Address.findByIdAndDelete(req.params.id);

        res.status(200).json({

            success:true,

            message:"Address deleted."

        });

    }

    catch(err){

        res.status(500).json({

            success:false,

            message:err.message

        });

    }

};