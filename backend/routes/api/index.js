const router = require('express').Router();




//all the routes for rooms/bookings/
//the orginal index.js will send them here

router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
  });


module.exports = router;
