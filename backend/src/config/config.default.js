const dotenv = require('dotenv');

dotenv.config();


// process是进程，env是环境变量
// console.log(process.env.APP_PORT);

module.exports = process.env;