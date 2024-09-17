const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());
const courses = [
    { id: 1, name: 'courseOne' },
    { id: 2, name: 'courseTwo' },
    { id: 3, name: 'courseThree' },
]

/* GET */

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// All courses
app.get('/api/courses', (req, res) => {
    res.send(courses);
});

// Single course
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with the requested ID was not found');
    res.send(course);
});


// Multiple route parametes
app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params);
});

// Query string parametes
app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.query);
});


/* POST */

app.post('/api/courses', (req, res) => {
     //validateCourse() with object destructuring to get error property
     const { error } = validateCourse(req.body);
     if (error) {
         // 400 bad request
         res.status(400).send(error.details[0].message);
         return;
     }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
})

/* PUT */

app.put('/api/courses/:id', (req, res) => {

    // Lookup the course
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with the requested ID was not found');

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




//Environment Variable called PORT
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on Port ${port}`));