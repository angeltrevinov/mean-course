const express = require('express');
const multer = require('multer');

const Post = require('../models/post');

const router = express.Router();

const MINE_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MINE_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid minetype');

    if(isValid) {
      error = null;
    }

    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MINE_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

//                                                          //for handling post request to the route, se just print and
//                                                          //    send a successful message
router.post("", multer({storage: storage}).single('image'), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + '/images/' + req.file.filename
  });
  post.save().then(result => {
    res.status(201).json({
      message: 'post was added successfully',
      post: {
        ...result,
        id: result._id,
      }
    });
  });
});

router.put("/:id", multer({storage: storage}).single('image'), (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + '://' + req.get('host');
    imagePath = url + '/images/' + req.file.filename;
  }
  const post = new Post({
    _id: req.params.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath
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

