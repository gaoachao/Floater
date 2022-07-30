const Router = require('koa-router');

const { auth } = require('../middleware/auth.middleware')

const { 
	upload,
	pickup,
	museum,
	myBottle
} = require('../controller/bottle.controller')

const router = new Router({prefix: '/bottle'})

router.post('/upload',auth,upload);

router.get('/pickup',auth,pickup);

router.get('/museum',auth,museum);

router.get('/myBottle',auth,myBottle);


module.exports = router;