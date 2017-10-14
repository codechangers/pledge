const json2csv = require('json2csv');
const fs = require('fs');

// eslint-disable-next-line
module.exports = async (model, callback) => {
  const data = await model.findAll({ raw: true });
  if (!data.length) {
    return callback(new Error('No Data'));
  }
  const fields = Object.keys(model.rawAttributes).forEach(key => key.field);
  const csv = json2csv({ data, fields });
  fs.writeFile('file.csv', csv, callback);
};
