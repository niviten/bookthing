import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import Book from './model/book.model.js'
import bookController from './controller/book.controller.js'

const app = express()

async function initDB() {
    try {
        const dbUrl = 'mongodb://localhost:27017/bookthing'
        await mongoose.connect(dbUrl)
        console.log('connected to db')
        return true
    } catch (err) {
        console.log('error while connecting to db')
        console.error(err)
    }
    return false
}

async function startServer() {
    if (!await initDB()) {
        return
    }

    app.use(express.json())
    app.use(cors())

    app.get('/', async function (_req, res) {
        const result = await Book.create({
            book_id: 1,
            book_name: 'The Great Gatsby',
            author_name: 'F. Scott Fitzgerald',
            is_active: true,
            editions: ['First Edition', 'Collector’s Edition'],
        });
        res.send(result)
    })

    app.post('/test', function (req, res) {
        const { name, age } = req.body
        res.send(`hi ${name},your age is ${age}`)
    })

    app.get('/books', bookController.getAll)

    app.get('/books/:book_id', bookController.getById)
    
    app.post('/books', bookController.create)

    app.put('/books/:book_id', bookController.update)

    app.delete('/books/:book_id', bookController.deleteBook)

    app.listen(7000, function() {
        console.log('server started at', 7000)
    })
}

await startServer()
