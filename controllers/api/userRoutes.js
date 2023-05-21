const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// Get all users
router.get('/', (req, res) => {
  User.findAll({
    attributes: {
      exclude: ['password']
    }
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create user /api/users
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.name = userData.name;
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
  // try{
  //   const {name, email, password} = req.body;
  //   const existingUser = await User.findOne({where: {email} });
  //   if (existingUser){
  //     return res.status(400).json({error: 'email already exists, please choose a unique email or login'})
  //   }

  //   const newUser = await User.create({ name, email, password });
  //   req.session.save(() => {
  //     req.session.name = newUser.name;
  //     req.session.user_id = newUser.id;
  //     req.session.logged_in = true;
  //     res.status(200).json(newUser);
  //   })
  // }catch{
  //   res.status(500).json({error: 'something went wrong'})
  // }
});

// match login and password to a user and verify correct input
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: {email: req.body.email} });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.name = userData.name;
      req.session.logged_in = true;
      console.log(userData.name);
      res.json({ user: userData.name, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});



module.exports = router;