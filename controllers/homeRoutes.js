const router = require('express').Router();
const sequelize = require('../config/connection');
const {Post, User, Comment} = require('../models');
const withAuth = require('../utils/auth');

// GET homepage
router.get('/', async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_content', 'user_id', 'post_id'],
          include: {
            model: User,
            attributes: ['username']
          },
          model: User,
          attributes: ['username']
        },
      ],
    });
    const posts = dbPostData.map((post) => post.get({ plain: true}));
    res.render('homepage', {
      posts, logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('post/:id', async (req,res) => {
  try{
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_content', 'post_id', 'user_id', 'created_at'],
          include: [
            {
            model: User,
            attributes: ['username']
            },
          ],
        },
      ],
    });
    const post = postData.get({plain:true});
    // Pass data and session flag into template
    res.render('post', {
      ...post,
      logged_in: req.session.logged_in
    });
  }catch(err){
  res.status(500).json(err);
  }
});


// login, if session exists redirect to homepage
router.get('/login', withAuth, (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/signup', (req,res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});


module.exports = router;