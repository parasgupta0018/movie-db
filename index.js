const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
// import routes
const authRoute = require('./routes/auth');
const favRoute = require('./routes/fav');
const cors = require('cors');
const PORT = process.env.PORT || 5000;

dotenv.config();
app.use(cors());
// connect to db
mongoose.connect(process.env.MONGODB_URI || process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to DB!'))
  .catch(error => console.log(error.message));
  

// middleware
app.use(express.json());
// route middlewares
app.use('/server/', authRoute);
app.use('/fav', favRoute);

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*',(req,res) => {
    res.sendFile(path.resolve(__dirname, 'client','build','index.html'));
  })
}

app.listen(PORT, () => console.log(`The server has started in port 5000 - http://localhost:5000/`));