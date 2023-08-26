const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose');
require('dotenv').config()
const mongoUrl = process.env.MONGO_URL
mongoose.connect(mongoUrl).then(() => console.log('Connected to database successfully'))
const todoSchema = new mongoose.Schema({
    task : String,
    done : {
        type : Boolean,
        default : false
    }
})

const modal = mongoose.model('Tasks', todoSchema);

app.use(cors())
app.use(express.json())

app.get('/tasks', async(req, res) => {
    modal.find().then((data) =>  res.status(200).send(data))
})

app.post('/add', async(req, res) => {
    modal.create({task : req.body.task}).then(() => console.log('Created Successfully'))
})

app.delete('/remove/:id', async(req, res) => {
    await modal.findByIdAndDelete(req.params.id).then(() => console.log('Deleted Successfully'))
})



app.listen(3001, () => console.log('Server started at port 3001'))
