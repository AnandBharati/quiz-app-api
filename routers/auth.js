const router = require('express').Router();
const loginModule = require('../models/login')
const bcrypt = require('bcrypt');

router.post('/new', async (req, res) => {

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const user = new loginModule({
        username: req.body.username,
        email: req.body.email,
        password: hash,
    })

    try {
        const result = await user.save();
        result ? res.status(200).json(result) : res.status(404).send({ msg: 'error while inserting data' })
    } catch (error) {
        res.status(404).json('error while inserting')
    }
});

router.post('/validate', async (req, res) => {
    try {
        const result = await loginModule.findOne({ username: req.body.username })
        if(!result){
            res.status(404).send({ 'msg': 'incorrect credential' })   
            return
        }else{
            if (req.body.password && bcrypt.compareSync(req.body.password, result.password)) {
                res.send(result);
            }else{
                res.status(404).send({ 'msg': 'incorrect credential' })
            }
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({ 'msg': 'error on validating' });
    }
});


module.exports = router;