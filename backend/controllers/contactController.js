const Contact = require("../models/Contact");

const sendContactMessage = async (req, res) => {
    

    console.log("✅ Contact route hit");

   

    try{

        const {
            name,
            email,
            phone,
            subject,
            message
        } = req.body;

        if(
            !name ||
            !email ||
            !phone ||
            !subject ||
            !message
        ){

            return res.status(400).json({
                success:false,
                message:"Please fill all fields."
            });

        }

        const contact = await Contact.create({

            name,
            email,
            phone,
            subject,
            message

        });

        res.status(201).json({

            success:true,
            message:"Message sent successfully.",
            contact

        });

    }

    catch(error){

        res.status(500).json({

            success:false,
            message:error.message

        });

    }

};
module.exports = {
    sendContactMessage
};