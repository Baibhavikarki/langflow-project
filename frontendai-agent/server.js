require('dotenv').config();
var express = require("express");
const cors = require('cors');

var app = express();

const PORT = process.env.PORT || 3000;  // Use PORT from .env, fallback to 3000

//middleware to parse json bodies
app.use(express.json());

//use cors middleware
app.use(cors({
    origin: 'http://localhost:3000'
}));


//in-memory array to store data
let students = [];

//simple post route
app.post('/add-all-student', (req, res)=>{
    const body = req.body; //extract name from the rquest body
    if(!body){
        return res.status(400).json({error: 'body is Required'});
    }
    students.push(...body); //add names to the students array
    res.status(201).json(
        {   message: 'student added successfully', 
            student: body,
            showAllStudents: students
        }
    )
});


app.get('/get-all-students', (req, res) => {
    res.send(students);
})

app.delete('/delete-true-flag', (req, res)=> {
    const initiallength = students.length;


    students = students.filter(student => student.flag !== true);

    if (students.length === initiallength){
        return res.status(404).json({error: 'student not found'});

    }


    res.status(200).send(students);
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

