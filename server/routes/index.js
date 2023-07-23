const Router = require('express');
const router = new Router();

const canvasRouter = require('./canvasRouter');


router.use('/canvas', canvasRouter);

module.exports = router;
