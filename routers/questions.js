const router = require('express').Router();
const mongoose = require('mongoose');
const uniqid = require('uniqid')

const questionModel = require('../models/questions');

//for saving single question to database
router.post('/new', async (req, res) => {
    const question = new questionModel({
        // id: uniqid(),
        category: req.body.category,
        question: req.body.question,
        description: req.body.description,
        option1: req.body.option1,
        option2: req.body.option2,
        option3: req.body.option3,
        option4: req.body.option4,
        option5: req.body.option5,
        option6: req.body.option6,
        multiple_correct_answers: req.body.multiple_correct_answers,
        correct_option1: req.body.correct_option1,
        correct_option2: req.body.correct_option2,
        correct_option3: req.body.correct_option3,
        correct_option4: req.body.correct_option4,
        correct_option5: req.body.correct_option5,
        correct_option6: req.body.correct_option6,
    })

    try {
        const result = await question.save();
        res.status(200).json(result);
    } catch (error) {
        console.log(error)
        res.status(404).json("error during saving the file")
    }
})

//for saving multiple question
router.post('/newmultiple', async (req, res) => {
    let isError = false;
    let resultArr = []

    if (Array.isArray(req.body)) {
        req.body.map((SingleQuest) => {
            const question = new questionModel({
                // id: uniqid(),
                category: SingleQuest.category,
                question: SingleQuest.question,
                description: SingleQuest.description,
                option1: SingleQuest.option1,
                option2: SingleQuest.option2,
                option3: SingleQuest.option3,
                option4: SingleQuest.option4,
                option5: SingleQuest.option5,
                option6: SingleQuest.option6,
                multiple_correct_answers: SingleQuest.multiple_correct_answers,
                correct_option1: SingleQuest.correct_option1,
                correct_option2: SingleQuest.correct_option2,
                correct_option3: SingleQuest.correct_option3,
                correct_option4: SingleQuest.correct_option4,
                correct_option5: SingleQuest.correct_option5,
                correct_option6: SingleQuest.correct_option6,
            });

            try {
                const result = question.save();
                resultArr.push(result);
            } catch (error) {
                isError = true;
            }
        })

        if (Error) {
            res.status(404).send({ msg: 'error on saving data' });
        } else {
            res.status(200).send({ result: resultArr });
        }

    }
})


router.get('/bycategory/:category', async (req, res) => {

    try {
        const result = await questionModel.find({ category: req.params.category });
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json('error during fetching data from database')
    }
})

//for getting all the questions
router.get('/all', async (req, res) => {
    try {
        const result = await questionModel.find({});
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json('error during fetching data from database')
    }
})

router.get('/allcategories', async (req, res) => {
    try {
        const result = await questionModel.find({});
        const arrResult = result.map((row) => row.category);
        //converting array to set for removeing duplicate category values
        const setResult = new Set();
        arrResult.map((cate) => {
            setResult.add(cate)
        })
        res.status(200).send([...setResult]);
    }
    catch (err) {
        res.status(404).send(err);
    }

});

router.delete('/delete:id', async (req, res) => {
    // console.log(req.params.id)
    try {
        const result = await questionModel.remove({ _id: req.params.id })
        res.status(200).send(result)
    } catch (error) {
        res.status(404).send(error)
    }
})



module.exports = router;