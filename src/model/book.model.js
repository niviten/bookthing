import mongoose from 'mongoose'

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    author: {
        type: String,
        required: true,
    },
    pages: {
        type: Number,
        default: 0,
    },
    in_stock: {
        type: Boolean,
        default: true,
    }
})

const Book = mongoose.model('Book', bookSchema)

export default Book
