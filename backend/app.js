const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts');
const app = express();

mongoose.connect("mongodb+srv://angel:gvgPpGbMyO2yaaWj@mean-course-ipbif.mongodb.net/NodeAngular?retryWrites=true&w=majority").then(
  console.log('connected')
);

//                                                          //decompres from JSONs
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/images', express.static(path.join('backend/images')));

//                                                          //Set headers for the requests
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.use("/api/posts", postsRoutes);


module.exports = app;
