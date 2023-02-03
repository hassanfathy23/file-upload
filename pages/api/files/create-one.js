import Image from "../../../models/images.ts";
import connectDB from "../../../lib/ConnectDB";

export default async function handler(req, res) {
  try {
    await connectDB();

    const {title, url} = req.body
    console.log(title, url)

    if(!title || !url) {
        return res.status(404).json({msg: "should provide title and url"})
    }

    const newImage = new Image({
      title: title,
      url: url
    });

    await newImage.save();

    return res.status(200).json(newImage);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
}
