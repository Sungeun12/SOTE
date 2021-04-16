const express = require('express');
const morgan = require('morgan');
const indexRouter = require('./routes');

const app = express();
app.set('port', process.env.PORT || 5000);

app.use(
  morgan('dev'),
  express.json(),
  express.urlencoded({extended: false}),
);

app.use('/', indexRouter);

app.listen(app.get('port'), () => {
    console.log(`server running on port ${app.get('port')}...`);
});