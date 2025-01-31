import { Document, model, Schema, Types } from "mongoose";
import mongooseHidden from 'mongoose-hidden'
export interface IBook {
    _id?: Types.ObjectId,
    title: String,
    author: String,
    price: Number, 
    stock: Number,
    category: String,
    description: String
}

export type BookDocument = Document & IBook;

const schema = new Schema({
    title: {type: String, require: true},
    author: {type: String, require: true},
    price: {type: Number, require: true},
    stock: {type: Number, require: true},
    category: {type: String, require: true},
    description: {type: String, require: false},
}, { timestamps: true }).plugin(mongooseHidden(), { hidden: { _id: false } })


export default model<BookDocument>('books', schema);