const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../model/User');

router.post('/getFav',verify, async(req,res)=>{
    const user = await User.findOne({ _id: req.body.id });
    res.json({favourites: user.favourites});
})
router.post('/remFav',verify, async(req,res)=>{
  User.update({_id: req.body.id},{$pull: { favourites: {"imdbID": req.body.imdbID}}},
  function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  })
})
router.post('/postFav',verify, async(req,res)=>{
    User.findById(req.body.id, function (err, docs) {
      if (err){
        res.status(400).send("User Not found");
      }
      else{
        User.updateOne(
          { _id: req.body.id },
          { $addToSet: { favourites: [req.body.movie] } },
          function(err, result) {
            if (err) {
              res.send(err);
            } else {
              res.send(result);
            }
          }
        );
      }
  });
})

module.exports = router;