const express = require('express');

const Post = require('../models/post');

const router = express.Router();

//                                                          //for handling post request to the route, se just print and
//                                                          //    send a successful message
router.post("", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(result => {
    res.status(201).json({
      message: 'post was added successfully',
      id: result._id
    });
  });
});

router.put("/:id", (req, res, next) => {
  const post = new Post({
    _id: req.params.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({ _id: req.params.id }, post).then(result => {
    res.status(200).json({ message: 'successful' });
  });
});


//                                                          //for handling get request to the route, se just print and
//                                                          //    send a successful message with the array of posts
router.get( '', (req, res, next ) => {

  Post.find().then(
    documents => {
      res.status(200).json({
        message: 'request successful',
        posts: documents
      });
    }
  );

});

router.delete('/:id', (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then(
    result => {
      res.status(200).json({ message: "post deleted" });
    }
  );
});

router.get('/:id', (req, res, next) => {
  Post.findById(req.params.id).then(
    post => {
      if(post) {
        res.status(200).json(post);
      } else {
        res.status(400).json({message: 'post not found'});
      }
    }
  );
});

module.exports = router;

