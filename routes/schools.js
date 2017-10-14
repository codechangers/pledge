const express = require('express');
const modelToCsv = require('../helpers/modelToCsv');
const jwt = require('express-jwt');
const { school } = require('../models');

const router = express.Router();

router.get(
  '/',
  jwt({
    secret: process.env.SECRET,
    getToken(req) {
      if (req.query && req.query.token) {
        return req.query.token;
      }
      return null;
    },
  }),
  async (req, res) => {
    const data = await school.findAll({
      raw: true,
    });
    res.render('schools', {
      data,
      header: 'Schools',
      token: req.query.token,
      fields: school.rawAttributes,
    });
  },
);

router.post(
  '/',
  jwt({
    secret: process.env.SECRET,
    getToken(req) {
      if (req.body && req.body.token) {
        return req.body.token;
      }
      return null;
    },
  }),
  (req, res) => {
    school.create({ name: req.body.name }).then(() => {
      res.redirect(`/schools?token=${req.body.token}`);
    });
  },
);

router.get(
  '/export',
  jwt({
    secret: process.env.SECRET,
    getToken(req) {
      if (req.query && req.query.token) {
        return req.query.token;
      }
      return null;
    },
  }), (req, res, next) => {
    // eslint-disable-next-line
    modelToCsv(school, err => {
      if (err) {
        return next(err);
      }
      res.download('file.csv');
    });
  },
);

module.exports = router;
