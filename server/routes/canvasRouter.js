const Router = require('express');
const canvasController = require('../controllers/canvasController');
const router = new Router();

router.get('/', canvasController.getCanvas);
router.post('/', canvasController.saveCanvas);

module.exports = router;
