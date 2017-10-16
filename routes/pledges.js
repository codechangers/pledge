const express = require('express');
const validator = require('validator');
const fs = require('fs');
const modelToCsv = require('../helpers/modelToCsv');
const sendEmail = require('../helpers/sendEmail');
const camel = require('camelcase');
const jwt = require('express-jwt');
const { pledge } = require('../models');

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
    const data = await pledge.findAll({
      raw: true,
    });
    res.render('data-sheet', {
      data,
      header: 'Pledges',
      token: req.query.token,
      fields: pledge.rawAttributes,
    });
  },
);

router.post('/', async (req, res) => {
  const values = {};
  Object.keys(req.body).forEach(key => {
    const value = req.body[key];
    if (value) {
      values[camel(key)] = value.trim();
    }
  });
  [values.email, values.guardianEmail].forEach(email => {
    if (email) {
      if (!validator.isEmail(email)) {
        res.status(422).send('Invalid email');
      }
    }
  });
  pledge.create(values).then(() => res.status(200).send())
  // eslint-disable-next-line
    .then(() => {
      if (values.email || values.guardianEmail) {
        return sendEmail(Object.assign({}, values));
      }
    })
    .catch(e => res.status(500).send(e));
});

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
  }),
  (req, res, next) => {
    // eslint-disable-next-line
    modelToCsv(pledge, err => {
      if (err) {
        return next(err);
      }
      res.download('file.csv');
      fs.stat('file.csv', error => {
        if (error) {
          return next(err);
        }
        fs.unlink('file.csv');
        // eslint-disable-next-line
        return;
      });
    });
  },
);

module.exports = router;
