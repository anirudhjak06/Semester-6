const { Router } = require("express");
const Student = require("../models/Student")

const router = Router()

// Get collection
router.get("/", async (req, res) =>{
    try {
        const students = await Student.find()
        res.json(students)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Create individual
router.post("/", async (req, res) =>{
    const student = new Student({
        name: req.body.name,
        roll: req.body.roll,
        cgpa: req.body.cgpa
    })
    try {
        const newStudent = await student.save()
        res.status(201).json(newStudent)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Get individual
router.get("/:id", getStudent, (req, res) =>{
    res.status(200).json(res.student)
})

//update individual
router.patch("/:id", getStudent, async (req, res) =>{
    if(req.body.name != null){
        res.student.name = req.body.name
    }
    if(req.body.roll != null){
        res.student.roll = req.body.roll
    }
    if(req.body.cgpa != null){
        res.student.cgpa = req.body.cgpa
    }
    try {
        const updatedStudent = await res.student.save()
        res.status(200).json(updatedStudent)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//delete individual
router.delete("/:id", getStudent, async (req, res) =>{
    try {
        await res.student.remove()
        res.status(200).json({message: "deleted succesfully"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

async function getStudent(req,res,nxt) {
    let student
    try {
        student = await Student.findById(req.params.id)
        if(student == null){
            return res.status(400).json({message: "student does not exist"})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
    res.student = student
    nxt()
}

module.exports = router