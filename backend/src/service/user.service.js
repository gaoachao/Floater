const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required:true
  }
});

const authCodeSchema = new Schema({
	authCode:{
		type: String,
    required: true,
	},
	email: {
    type: String,
    required: true,
  }
})


const userModel = mongoose.model("users", userSchema);
const authCodeModel = mongoose.model("authcode", authCodeSchema);


module.exports = {
	userModel,
	authCodeModel
}