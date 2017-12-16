//Modules
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose');
// Express
const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/posts');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting'))
db.once('open', function(callback){
    console.log('Connected successfully')
})
// Schema
const Post = require('../models/post')
// Main endpoint
app.get('/posts', (req, res)=>{
    Post.find({}, 'title description', (error, posts)=>{
        if(error){
            console.error(error)
        }
        res.send({
            posts: posts
        })
    }).sort({_id:-1})
})
// Add a new post endpoint
app.post('/posts', (req, res)=>{
    const db = req.db
    const title = req.body.title;
    const description = req.body.description
    const new_post = new Post({
        title: title,
        description: description,
    })

    new_post.save((error)=>{
        if(error){
            console.log(error)
        }
        res.send({
            success: true,
            message: 'Post saved successfully'
        })
    })
})
// Fetch a single post endpoint
app.get('/posts/:id', (req, res) => {
    const db = req.db
    Post.findById(req.params.id, 'title description', (error, post) => {
        if (error) {
            console.error(error)
        }
        res.send(post)
    })
})
// Update a post endpoint
app.put('/posts/:id', (req, res) => {
    const db = req.db
    Post.findById(req.params.id, 'title description', (error, post) => {
        if (error){
            console.error(error)
        }
        post.title = req.body.title
        post.description = req.body.description
        post.save((error)=>{
            if (error){
                console.log(error)
            }
            res.send({
                success: true
            })
        })
    })
})
// Delete a  post endpoint
app.delete('/posts/:id', (req,res)=>{
    const db = req.db
    Post.remove({
        _id: req.params.id
    },
    (err, post)=>{
        if (err){
            res.send(err)
        }
        res.send({
            success: true
        })
    })
})
// Running the Server
app.listen(process.env.PORT || 8081)
