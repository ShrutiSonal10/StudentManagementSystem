const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Students = require("../models/Students");
const {body, validationResult}= require("express-validator");
//ROUTE1 : get all students using : POST "api/student/fetchallstudents" login requires
router.post("/fetchallstudents",fetchuser,async (req,res)=>{
   try{const students = await Students.find({user: req.user,id});
   res.json(students);
   } 
   catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server Error");
   }

})
//ROUTE2 :add students using : POST "api/auth/addstudents" login requires
router.post("/addstudents",fetchuser,  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("roll_number", "Enter a valid roll_number").isLength({ min: 3 }),
    body("contact", "Enter a valid contact").isLength({max: 15}),
    body("branch", "Enter a valid branch").isLength({max:100}),
    body("semester", "Enter a valid semester").isLength({max:3}),
    body("year", "Enter a valid year of degree").isLength({min:2}),
  ],async (req,res)=>{
    try{
        const {name, roll_number,contact, branch, semester, year}= req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const student = new Students({
        name, roll_number,contact, branch, semester, year, user: req.user.id
    })
    const savedStudent = await student.save();
    res.json(savedStudent);
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    

})
//ROUTE3 :update students using : POST "api/auth/updatestudents" login requires
router.put("/updatestudent/:id",fetchuser,async (req,res)=>{
    try{
    const {name, roll_number,contact, branch, semester, year}= req.body;
    //create a new student object
    const newStudent= {};
    if(name){newStudent.name=name};
    if(roll_number){newStudent.roll_number=roll_number};
    if(contact){newStudent.contact=contact};
    if(branch){newStudent.branch=branch};
    if(semester){newStudent.semester=semester};
    if(year){newStudent.year=year};
    //find the note to be updated and update it
    let student = await Students.findById(req.params.id);
    if(!student){
        res.status(404).send("Not found");
    }
    if(student.user.toString()!==req.user.id){
        return res.status(401).send("Not allowed");
    }
student = await Students.findByIdAndUpdate(req.params.id,{$set: newStudent},{new:true});
res.json(student);
}
catch(error){ console.error(error.message);
    res.status(500).send("Internal Server Error");

}
});
 //ROUTE4 :delete an existing students using : POST "api/auth/deletestudent" login requires
router.delete("/deletedstudent/:id",fetchuser,async (req,res)=>{
    try{
    const {name, roll_number,contact, branch, semester, year}= req.body;
    //create a new student object
    const newStudent= {};
    if(name){newStudent.name=name};
    if(roll_number){newStudent.roll_number=roll_number};
    if(contact){newStudent.contact=contact};
    if(branch){newStudent.branch=branch};
    if(semester){newStudent.semester=semester};
    if(year){newStudent.year=year};
    //find the note to be deleted and delete it
    let student = await Students.findById(req.params.id);
    if(!student){
        res.status(404).send("Not found");
    }
    //delete student only if it belongs to the current user's classroom
    if(student.user.toString()!==req.user.id){
        return res.status(401).send("Not allowed");
    }
student = await Students.findByIdAndDelete(req.params.id,{$set: newStudent},{new:true});
res.json("Success student have been deleted");
    }
    catch(error){ console.error(error.message);
        res.status(500).send("Internal Server Error");

    }
});
// ROUTE5:API endpoint to fetch students within a range of roll numbers
router.get('/:startRoll/:endRoll', async (req, res) => {
    try {
        const startRoll = parseInt(req.params.startRoll);
        const endRoll = parseInt(req.params.endRoll);

        const students = await Students.find({ roll_number: { $gte: startRoll, $lte: endRoll } });
        res.json(students);
    } catch (error) {
        console.error("Error occurred while fetching students:", error);
        res.status(500).send("Internal Server Error");
    }
});




module.exports = router