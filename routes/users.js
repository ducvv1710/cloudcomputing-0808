var express = require('express');
const pg_conn = require('../models/pg_config');
var router = express.Router();

/* GET users page. */
router.get('/', function(req, res, next) 
{
  res.send('user', {title: "User page", message: "Authorized users"});
});
/* GET EDIT page */
router.get('/edit/:name', function(req, res)
{
  var product_id = req.params.name;
  var edit_query = {
    text: `SELECT * FROM product WHERE product_name = $1`,
    values: [product_id]
  };
  pg_conn.query(edit_query, function(err, data)
  {
    if (err) throw err;
    res.render('edit_form', {title: "Edit page", edit_query: data.rows[0]});
  });
});
/* POST from the edit_form submision */
router.post('/edit/:name', function(req, res)
{
  var product_id = req.params.name;
  const update_query = {
    text: "UPDATE product SET shop_name = $1,	product_name = $2, price = $3, amount = $4 WHERE product_name = $5",
    values: [req.body.shop_name, req.body.product_name, req.body.price, req.body.amount, ]
  };
  pg_conn.query(update_query, function(err, data)
  {
    if(err)
    {
      throw err;
      res.render('error', {message: "Update got an error", error: err});
    }
    else
    {
      var product_query = 'SELECT * FROM product';
      pg_conn.query(product_query, function(err, data)
      {
        //console.log(data)
        res.render('users_fe', 
        {
          title: "Userpage",
          h1_title: "Welcome to ATN shop page",
          h2_title: "Fetch data table by EJS",
          userData: data
        });
      });
    };
  });
});

/* GET INSERT page */
/*insert*/
router.get('/insert', function(req, res) {
  res.render('insert_form', { title: "please Insert Data base " });
});
router.post('/insert', function(req, res) {
  const insert_query = {
      text: "INSERT INTO product VALUES ($1,$2,$3,$4)",
      values: [req.body.shop_name, req.body.product_name, req.body.price, req.body.amount]
  };
  pg_conn.query(insert_query, function(err, data) {
      if (err) {
          throw err;
          res.render('error', { message: "Insert got error", error: err })
      } else {
          var product_query = 'SELECT * FROM product';
          pg_conn.query(product_query, function(err, data) {
              res.render('users_fe', {
                      title: "Welcome to ATN shop Page",
                      h1_title: "Welcome to DPCB shop Page",
                      h2_title: "Insert query database successfully",
                      userData: data
                  }); 
             
          });
      };
  });
});

/* DELETE request */
router.get('/delete/:name', function(req, res)
{
  var shop_name = req.params.name;
  var del_query = {
    text: "DELETE FROM product WHERE product_name = $1",
    values: [shop_name]
  }
  pg_conn.query(del_query, function(err, data)
  {
    if(err)
    {
      throw err;
      res.render('error', {message: "Update got an error", error: err});
    }
    else
    {
      var product_query = 'SELECT * FROM product';
      pg_conn.query(product_query, function(err, data)
      {
        //console.log(data)
        res.render('users_fe', 
        {
          title: "Userpage",
          h1_title: "Welcome to ATN shop page",
          h2_title: "Delete a row sucessfully",
          userData: data
        });
      });
    };
  });

});

module.exports = router;
