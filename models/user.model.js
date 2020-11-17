const sql = require("./db.js");

// constructor
const User = function(user) {
  this.username = user.username;
  this.password = user.password;
  this.is_active = user.active;
};

User.login = (User, result) => {
  sql.query("SELECT user_id FROM stocks_user WHERE username = ? AND password = ?", [User.username, User.password], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if(!res.length) {
      result(null, {status_code: 1002, user_id: 0});    
      return;
    }

    console.log(res[0].user_id);
    var user_id = res[0].user_id;
    result(null, {status_code:1001, user_id: user_id});
  });
};
 

User.register = (User, result) => {
  /*
    add checking of duplicates
  */

  sql.query("SELECT user_id FROM stocks_user WHERE username = ?", [User.username], (err, res_duplicate) => {
    console.log("CHECK DUPLICATE");
    console.log(res_duplicate);

    if(res_duplicate.length > 1) {
      console.log("DUPLICATE");
      result(null, {status_code:9002, user_id: 0});
      return;
    }

    sql.query("INSERT INTO stocks_user SET ?", User, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created user: ", { id: res.insertId, ...User });
      result(null, { status_code:9001, id: res.insertId, ...User });
    });

  });  


};

User.findById = (customerId, result) => {
  sql.query(`SELECT * FROM customers WHERE id = ${customerId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found customer: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

User.getAll = result => {
  sql.query("SELECT * FROM customers", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};

User.updateById = (id, customer, result) => {
  sql.query(
    "UPDATE customers SET email = ?, name = ?, active = ? WHERE id = ?",
    [customer.email, customer.name, customer.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated customer: ", { id: id, ...customer });
      result(null, { id: id, ...customer });
    }
  );
};

User.remove = (id, result) => {
  sql.query("DELETE FROM customers WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted customer with id: ", id);
    result(null, res);
  });
};

User.removeAll = result => {
  sql.query("DELETE FROM customers", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} customers`);
    result(null, res);
  });
};

module.exports = User;
