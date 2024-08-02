const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();


const Student = require('./models/student');

const port = process.env.PORT || 4000;
mongoose.connect(process.env.MONGO_URI)


app.use(express.json())
app.use(cors());

app.get('/bfhl',(req,res)=>{
    res.status(200).json({ "operation_code" : 1 })
});

app.post('/bfhl', async (req,res)=>{
    try {
        const {status, userId, collegeEmailId, collegeRollNumber, numbers, alphabets} = req.body;

        const newStudent = new Student({
            status,
            userId,
            collegeEmailId,
            collegeRollNumber,
            numbers,
            alphabets 
        });

        const savedStudent = await newStudent.save();

        res.json({
            status: savedStudent.status,
            userId: savedStudent.userId,
            collegeEmailId: savedStudent.collegeEmailId,
            collegeRollNumber: savedStudent.collegeRollNumber,
            numbers: savedStudent.numbers,
            alphabets: savedStudent.alphabets,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

app.listen(port, () => {
    console.log(`Server Listening @ ${port}`);
});