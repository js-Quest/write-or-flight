const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req,res) => {
  try{
  //   const postData = await Post.findAll({
  //   where: {
  //     user_id: req.session.user_id,
  //   },
  //     include: [
  //       {
  //         model: Comment,
  //         attributes: ['id', 'comment_content', 'user_id', 'post_id', 'created_at'],
  //         include: {
  //           model: User,
  //           attributes: ['name']
  //         },
  //       },
  //       {
  //         model: User,
  //         attributes: ['name']
  //       }
  //     ],
  // });
  // // Serialize data so the template can read it
  // const posts = postData.map((post) => post.get ({plain: true}));
  // // Pass data and session flag into template
  // res.render('dashboard', { posts, logged_in: true })
  // }catch(err){
  //   res.status(500).json(err);
  

      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ["password"] },
        include: [{ model: Blogpost }],
      });

      const user = userData.get({ plain: true });

      res.render("dashboard", {
        ...user,
        logged_in: true,
      });
    } catch (err) {
      res.status(500).json(err);
    
  }
});

// new post
router.get('/new', (req,res) => {
  res.render('add-post', {
    logged_in: true
  })
})

// edit post
router.get('/edit/:id', withAuth, async (req,res)=>{
  try{
    const postData = await Post.findOne({
      where:{
        id: req.params.id
      },
      include:[{
        model: Comment,
        attributes: ['id', 'comment_content', 'user_id', 'post_id', 'created_at'],
        include: {
          model: User,
          attributes: ['name'],
        }
      }]
    })
    const post = postData.get({plain: true})
    res.render('editPost', {
      post, 
      logged_in: true,
    });
  }catch(err){
    res.status(500).json(err)
  }
})


module.exports = router;