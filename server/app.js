const express = require('express');
const mongoose= require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv');
const voteRouter = require('./routes/vote');

const config =require('./config/key')

const userRouter=require('./routes/user')
const bodyParser = require('body-parser')
const cookieParser =require('cookie-parser')


//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))
//application/json
app.use(bodyParser.json())
app.use(cookieParser())


dotenv.config();
const app = express();
const { PORT, MONGO_URI } = process.env;

app.set('port', PORT);
app.use(
  morgan('dev'),
  express.json(),
  express.urlencoded({ extended: false }),
  express.static('uploads')
);

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });

app.use('/user',userRouter)
app.use('/vote', voteRouter);

app.listen(app.get('port'), () => {
  console.log(`server running on port ${app.get('port')}...`);
});