const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// /api/comments

router.get('/', async (req,res) => {
  try{ 
    const dbCommentData = await Comment.findAll({})
  res.status(200).json(dbCommentData)
  }catch(err){
    res.status(500).json(err)
  }
})

router.post('/', async (req,res) ={
  try{
    if (req.session) {
      Comment.create({
        
      })
    }

  }catch(err){

  }
})

module.exports = router;