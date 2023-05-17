const Question = require("../models/questionModel")


// get a question
const createQuestion = async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json(questions);
      } catch (err) {
        res.status(400).json({err: err.message});
      }
}


module.exports = {
    createQuestion
}