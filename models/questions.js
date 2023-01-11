const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
    // id: {
    //     type: String,
    //     unique: true,
    // },
    category: String,
    question: String,
    description: String,
    option1: String,
    option2: String,
    option3: String,
    option4: String,
    option5: String,
    option6: String,
    multiple_correct_answers: Boolean,
    correct_option1: Boolean,
    correct_option2: Boolean,
    correct_option3: Boolean,
    correct_option4: Boolean,
    correct_option5: Boolean,
    correct_option6: Boolean,
});

module.exports = new mongoose.model('question', QuizSchema)