const express = require('express');
const router = express.Router();

// Render a view 
router.get('/', (req, res) => {
    res.render('index', { title: "Jurgen's Express App", message: "Hello, hello, hello"})
});


module.exports = router;