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
// Get All Messages
const getAllMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Get Single Message
const getMessageById = async (req, res) => {
  try {
    const message = await Contact.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        message: "Message not found",
      });
    }

    res.status(200).json(message);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Delete Message
const deleteMessage = async (req, res) => {
  try {
    const message = await Contact.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        message: "Message not found",
      });
    }

    await message.deleteOne();

    res.status(200).json({
      message: "Message deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
module.exports = {
  sendContactMessage,
  getAllMessages,
  getMessageById,
  deleteMessage,
};