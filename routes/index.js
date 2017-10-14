const express = require('express');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/login', (req, res, next) => {
  if (req.query && validator.equals(req.query.credentials, process.env.ADMIN_CREDENTIALS)) {
    const token = jwt.sign({ user: 'admin' }, process.env.SECRET);
    res.redirect(`/pledges?token=${token}`);
    return;
  }
  const err = new Error('Invalid credentials');
  err.status = 401;
  next(err);
});
module.exports = router;
