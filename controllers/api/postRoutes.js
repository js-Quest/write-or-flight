const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// // get all posts
// router.get('/', async (req,res) => {
//   try{
//     Post.findAll({ 
//       attributes: ['id', 'title', 'post_content', 'created_at'],
//       order: [['created_at', 'DESC']],
//       include: [
//         {
//           model: Comment,
//           attributes: ['id', 'comment_content', 'post_id', 'user_id', 'created_at'],
//           include: {
//               model: User,
//               attributes: ['username']
//             },
//         },
//         {
//           model: User,
//           attributes: ['username']
//         }
//       ],
//     })
//   }
// })

// router.get('/:id', async (req, res) => {
//   try {
//     const postData = await Post.findByPk(req.params.id, {
//       include: [
//         {
//           model: Comment,
//           attributes: ['id', 'comment_content', 'post_id', 'user_id', 'created_at'],
//           include: [
//             {
//               model: User,
//               attributes: ['username']
//             },
//           ],
//         },
//       ],
//     });
//     const post = postData.get({ plain: true });
//     // Pass data and session flag into template
//     res.render('post', {
//       ...post,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// module.exports = router;

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await newPost.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newPost)
  }catch(err){
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) =>{
try {
  const postData = await Post.destroy({
    where: {
      id: req.params.id,
      user_id: req.session.user_id,
    }
  });
  if (!postData){
    res.status(404).json({message: 'Np post found with this ID'})
    return;
  }
  res.status(200).json(postData);
  }catch(err){
    res.status(500).json(err);
  } 
});

module.exports = router;