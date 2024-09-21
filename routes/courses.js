const express = require('express');
const router = express.Router();

const courses = [
    { id: 1, name: 'courseOne' },
    { id: 2, name: 'courseTwo' },
    { id: 3, name: 'courseThree' },
]


/* GET */

// All courses
router.get('/', (req, res) => {
    res.send(courses);
});

// Single course
router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the requested ID was not found');
    res.send(course);
});

/* POST */

router.post('/', (req, res) => {
    //validateCourse() with object destructuring to get error property
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
})

/* PUT */

router.put('/:id', (req, res) => {
    // Lookup the course
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the requested ID was not found');
     
    
    //validateCourse() with tradtional JS 
    //const result = validateCourse(req.body);
    //validateCourse() with object destructuring to get error property
    const { error } = validateCourse(req.body);
    if (error) {
        // 400 bad request
        res.status(400).send(error.details[0].message);
        return;
    }
    // Update the course
    course.name = req.body.name;

    //Return the updated course
    res.send(course);

});

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })
    return schema.validate(course);
}

/* DELETE*/
router.delete('/:id', (req, res) => {
    // Lookup the course
    const course = courses.find(c => c.id === parseInt(req.params.id));
    console.log('The course to be deleted is ', course);
    // Not existing, return 404
    if (!course) return res.status(404).send('The course with the requested ID was not found');

    // Delete 
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    // Return the same course
    res.send(course);

});

module.exports = router;