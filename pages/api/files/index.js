

import Image from '../../../models/images.ts'

export default async function handler(req, res) {
    try {
        const images = await Image.find()
        if(!images) {
            return res.status(404).json({msg: "can not find any images"})
        }

        return res.status(200).json(images)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}