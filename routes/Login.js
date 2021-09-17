var express = require('express');
const { report } = require('.');
var router = express.Router();
var authen = require('../models/authenticate');
var display_table = require('../models/product_display');
// var un = 'vanduc';
// var pw = '123'

/* GET users listing. */
router.get('/', function(req, res, next) 
{
  res.render('login', { message: "Input your credential"});
});

router.post("/", async function(req, res)
{
  var auth = await authen(req.body.username, req.body.password);
  console.log("check " + auth);
  
  if(auth == true)
  {
    /* Display table at BACKEND 
    table_string = await display_table();
    res.render('users',  {title: "Welcome to userpage", message: table_string});
    */
    var pg_conn = require('../models/pg_config');
    var product_query = 'SELECT * FROM product';
    var data = await pg_conn.query(product_query);
    console.log(data);
    res.render('users_fe',  
    {
      title: "Userpage",
      h1_title: "Welcome to ATN shop page",
      h2_title: "Fetch data table by EJS",
      userData: data
    });

    // table_string = await display_table();
    // res.render('users', {title: "Welcome", message: table_string});
  }
  else
  {
    res.render('login', {message: "Please fix your credential"});
  }


  // // Send message 
  // if( req.body.username == '') 
  //   {
  //     // alert('You have not entered username');
  //     res.send(`<script>alert('You have not entered username')</script>`);
  //   }
  // if(req.body.password == '')
  //   {
  //     // alert('You have not entered a password');
  //     res.send(`<script>alert('You have not entered a password')</script>`);
  //   }
  // if(req.body.username == un && req.body.password == pw)
  //   {
  //     res.render('users', {title: "Welcome", message: "Hello"});
  //   }
  // else
  //   {
  //     // res.render('login', {message: "Please fix your credential"});
  //     res.send(`<script>alert('Please fix your credential')</script>`);
  //     return true;
  //   }
  // return false;
})

module.exports = router;
