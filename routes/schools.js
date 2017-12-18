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

router.get(
  '/:id',
  // eslint-disable-next-line
  async (req, res, next) => {
    const { id } = req.params;
    const data = await school.findById(id, {
      raw: true,
    });
    if (!data) {
      const err = new Error('Item w/ id not found');
      err.status = 404;
      return next(err);
    }
    return res.json(data);
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
    if (req.body.id) {
      school.update({ name: req.body.name }, { where: { id: req.body.id } })
        .then(() => {
          res.redirect(`/schools?token=${req.body.token}`);
        });
    } else {
      school.create({ name: req.body.name }).then(() => {
        res.redirect(`/schools?token=${req.body.token}`);
      });
    }
  },
);

router.get(
  '/export/all',
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
