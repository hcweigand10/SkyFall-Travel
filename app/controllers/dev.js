const packJson = require('../../package.json');
const sequelize = require('../util/database');

const router = require('express').Router();

router.get('/config', getConfig);
router.get('/version', getVersion);
router.get('/seq', seq); //test sequelize connection

module.exports = router;
// [GET] ../dev/config
const getConfig = (req, res, next) => {
  return res.status(200).json({ packJson });
};

// [GET] ../dev/version
const getVersion = (req, res, next) => {
  return res.status(200).json({ 'nps Backend': packJson.version });
};

// [GET] ../dev/seq
const seq = async (req, res, next) => {
  try {
    await sequelize.authenticate();
    console.log('Sequelize Connection established');
    res.status(200).json('Sequelize Connection established');
    next();
  } catch (error) {
    next(error);
  }
};