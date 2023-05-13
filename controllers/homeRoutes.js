const router = require('express').Router();
const {Post, User, Comment} = require('../models');

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
            attributes: ['name']
          },
          model: User,
          attributes: ['username']
        },
      ],
    });
    const posts = dbPostData.map((post) => post.get({ plain: true}));
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// login, if session exists redirect to homepage
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});



module.exports = router;