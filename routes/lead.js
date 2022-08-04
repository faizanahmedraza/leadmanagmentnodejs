const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { create, findOne, findAll, update, destroy} = require('../controllers/LeadController')

router.route('/').get(protect, findAll);
router.route('/:id').get(protect, findOne);
router.route('/').post(protect, create);
router.route('/:id').patch(protect, update);
router.route('/:id').delete(protect, destroy);

module.exports = router;