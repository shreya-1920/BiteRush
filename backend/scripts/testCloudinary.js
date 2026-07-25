require("dotenv").config();

const { v2: cloudinary } = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function test() {
  try {
    const result = await cloudinary.uploader.upload(
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600",
      {
        folder: "biterush/test",
      }
    );

    console.log("✅ Uploaded Successfully");
    console.log(result.secure_url);
  } catch (err) {
    console.error(err);
  }
}

test();