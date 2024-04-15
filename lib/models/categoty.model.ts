import { Document, Schema, model, models } from "mongoose";

export interface ICategory extends Document {
  _id: string;
  name: string;
}

const categorySchema = new Schema({
  name: { type: String, required: true, unique: true },
});

const Event = models.Category || model("category", categorySchema);

export default Event;
