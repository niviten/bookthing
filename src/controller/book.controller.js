import { Types } from 'mongoose'
import Book from '../model/book.model.js'

async function getAll(_req, res) {
    try {
        const books = await Book.find()
        return res.json(books)
    } catch (err) {
        return res.json({ error: err.message ? err.message : err })
    }
}

async function getById(req, res) {
    const bookId = req.params['book_id']
    try {
        if (!Types.ObjectId.isValid(bookId)) {
            throw new Error('Invalid book id')
        }
        const book = await Book.findById(bookId)
        if (!book) {
            throw new Error('Book not found')
        }
        return res.json(book)
    } catch (err) {
        return res.json({ error: err.message ? err.message : err })
    }
}

async function create(req, res) {
    const bookDetails = {
        title: req.body.title,
        author: req.body.author,
        pages: req.body.pages,
        in_stock: req.body.in_stock,
    }

    try {
        const result = await Book.create(bookDetails)
        console.log('create response', result)
        return res.json(result)
    } catch (err) {
        return res.json({ error: err.message ? err.message : err })
    }
}

async function update(req, res) {
    const bookId = req.params['book_id']
    const bookDetails = {
        title: req.body.title,
        author: req.body.author,
        pages: req.body.pages,
        in_stock: req.body.in_stock,
    }
    
    try {
        if (!Types.ObjectId.isValid(bookId)) {
            throw new Error('Invalid book id')
        }
        const updatedBook = await Book.findByIdAndUpdate(bookId, bookDetails, { new: true })
        if (!updatedBook) {
            throw new Error('Book not found')
        }
        return res.json(updatedBook)
    } catch (err) {
        return res.json({ error: err.message ? err.message : err })
    }
}

async function deleteBook(req, res) {
    const bookId = req.params['book_id']

    try {
        if (!Types.ObjectId.isValid(bookId)) {
            throw new Error('Invalid book id')
        }
        const deletedBook = await Book.findByIdAndDelete(bookId)
        if (!deletedBook) {
            throw new Error('Book not found')
        }
        return res.json(deletedBook)
    } catch (err) {
        return res.json({ error: err.message ? err.message : err })
    }
}

export default {
    getAll: getAll,
    getById: getById,
    create: create,
    update: update,
    deleteBook: deleteBook,
}
