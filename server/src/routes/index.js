const express = require('express');

const router = express.Router();
const HttpStatus = require('http-status-codes');

const feedHandler = require('./../components/feed');

router.get('/feeds', feedHandler.get);
router.delete('/feeds/:feedId', feedHandler.deleteFeed);

// for server liveness probe
router.get('/status', (req, res) => {
  return res.status(HttpStatus.OK).json({ message: 'OK' });
});

module.exports = router;
