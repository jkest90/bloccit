const express = require('express');
const router = express.Router();

// route definitions

router.get('/', (req, res, next) => {
   res.send('Welcome to Bloccit!');
});

module.exports = router;
