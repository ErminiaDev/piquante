const express = require('express');
const router = express.Router();

const multer = require('../middleware/multer-config');

const auth = require('../middleware/auth')

const sauceCtrl = require('../controllers/sauce');

router.get('/', auth,sauceCtrl.findSauces)
router.get('/:id', auth, sauceCtrl.findOneSauce)
router.post('', auth, multer, sauceCtrl.createSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, sauceCtrl.evaluateSauce);

module.exports = router;