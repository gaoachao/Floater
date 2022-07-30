const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adviceSchema = new Schema({
	comment:{
		type:String,
		require:true
	},
	email:{
		type:String,
		require:true
	},
	advice:{
		type:String,
		require:true
	}
})

const adviceModel = mongoose.model('advice',adviceSchema);

module.exports = {
	adviceModel
}