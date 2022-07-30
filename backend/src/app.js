const app = require('./app/index')
const mongoose = require('mongoose');
const {APP_PORT} = require('./config/config.default')


mongoose.connect('mongodb://localhost/Floater',{
	useNewUrlParser: true, 
	useUnifiedTopology: true,
	family: 4,})
	.then(() => console.log('success'))
	.catch((err) => console.log('failed',err))

app.listen(APP_PORT,()=>{
	console.log(`server is running on ${APP_PORT}`);
})