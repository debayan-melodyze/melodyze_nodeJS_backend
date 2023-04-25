import express from 'express';
import router from './routes/index.js'

const app = express();
// const routes = require('./routes');
const routes = router

app.use(express.json());
app.use('/', routes);



app.listen(3000, () => {
  console.log('App listening on port 3000');
});