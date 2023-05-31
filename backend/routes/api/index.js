const router = require('express').Router();
const { restoreUser } = require('../../utils/auth.js');

router.use(restoreUser);



//all the routes for rooms/bookings/
//the orginal index.js will send them here

router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
  });


  // GET /api/set-token-cookie
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
router.get('/set-token-cookie', async (_req, res) => {
  const user = await User.findOne({
    where: {
      username: 'Demo-lition'
    }
  });
  setTokenCookie(res, user);
  return res.json({ user: user });
});

// GET /api/restore-user


router.get(
  '/restore-user',
  (req, res) => {
    return res.json(req.user);
  }
);

router.use(restoreUser);
const { requireAuth } = require('../../utils/auth.js');
router.get(
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);


module.exports = router;