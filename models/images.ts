import mongoose, {Schema, model, models} from "mongoose";

const imagesSchema = new Schema({
   title: String,
   url: String
}, {timestamps: true})

let DataSet = models.Image || model('Image', imagesSchema)

export default DataSet
