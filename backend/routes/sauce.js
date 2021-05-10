const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const sauceCtrl = require('../controllers/sauce');

router.post('/new-sauce', auth, sauceCtrl.addSauce);
router.use('/sauces', auth, sauceCtrl.viewSauces);

module.exports = router;