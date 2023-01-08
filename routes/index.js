const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.locals.welcome = 'Welcome'; 
  res.render('index', {title: 'Nodepop'});
 
});

module.exports = router;