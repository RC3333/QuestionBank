const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    QuestionHeading: {type:String,required:true},
    QuestionDescription: {type:String,required:true},
    imagePath: { type: String, required: true }
});

module.exports =mongoose.model('Post',postSchema);