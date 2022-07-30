const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bottleSchema = new Schema({
	bottleType:{
		type: String,
    required: true,
	},
	isMuseum:{
		type:String,
		required:true
	},
	content:{
		type:String,
		require:true
	},
	isImage:{
		type:String,
		require:true
	},
	imageName:{
		type:String,
		require:true
	},
	email:{
		type:String,
		require:true
	},
	path:{
		type:String,
		require:true
	}
})

const bottleModel = mongoose.model('bottles',bottleSchema);

module.exports = {
	bottleModel
}