const router = require('express-promise-router')();
const controller = require('../controllers');

router.route('/:resource').get(controller.resourceGet);
router.route('/:resource').post(controller.resourcePost);
router.route('/:resource/:id').get(controller.resourceById);

module.exports = router;
