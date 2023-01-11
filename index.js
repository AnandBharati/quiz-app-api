const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();

//routers
const questionRouter = require('./routers/questions');
const loginRouter = require('./routers/login');
const authRouter = require('./routers/auth');

//datebase operations
const mongoose = require('mongoose');
mongoose.set('strictQuery', false)
const con = mongoose.connect('mongodb+srv://Anand:Anand12345@quiz-app-db.x1mdq6i.mongodb.net/test')
// mongoose.connect('mongodb://localhost:27017/quiz')

app.use(express.json());
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.listen(process.env.PORT || '5000')

app.get('/', (req, res) => {
    res.status(200).json('working')
})

app.use('/questions', questionRouter);
app.use('/users', loginRouter);
app.use('/auth', authRouter);