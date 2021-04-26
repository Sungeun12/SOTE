const express = require('express');
const mongoose= require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv');
const voteRouter = require('./routes/vote');

dotenv.config();
const app = express();
const { PORT, MONGO_URI } = process.env;

app.set('port', PORT);
app.use(
  morgan('dev'),
  express.json(),
  express.urlencoded({ extended: false }),
);

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });

app.use('/vote', voteRouter);

app.listen(app.get('port'), () => {
  console.log(`server running on port ${app.get('port')}...`);
});