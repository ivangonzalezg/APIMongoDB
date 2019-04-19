const router = require('express-promise-router')();
const controller = require('../controllers');

router.route('/teams').get(controller.resource);

module.exports = router;
