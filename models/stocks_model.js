const sql = require("./db.js");

const Stock = function(stock) {
  this.name = stock.name;
  this.text = stock.text;
  this.user_id = stock.user_id;
  this.page_id = stock.page_id;
  this.is_active = stock.is_active;
  this.stock_country = stock.stock_country;
};

Stock.add = (Stock, result) => {
  sql.query("INSERT INTO stocks SET ?", Stock, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created stock: ", { id: res.insertId, ...Stock });
    result(null, { id: res.insertId, ...Stock });
  });
}

Stock.addInfo = (StockInfo, result) => {
  sql.query("INSERT INTO stock_info SET ?", StockInfo, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created stock info: ", { id: res.insertId, ...StockInfo });
    result(null, { id: res.insertId, ...StockInfo });
  });
}

Stock.updateStockInfoById = (Stock, stockId, result) => {
  sql.query("UPDATE stock_info SET ? WHERE stock_id = ? ", [Stock, stockId], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("updated stock: ", { id: res, ...Stock });
    result(null, { id: res, ...Stock });
  });
}

Stock.findStockById = (stockID, stockCountry, pageID, result) => {
  var query = "SELECT * \
              FROM stocks s \
              LEFT JOIN stock_info si ON s.id = si.stock_id \
              WHERE s.id = ? \
                AND s.stock_country = ? \
                AND s.page_id = ?";

  sql.query(query, [stockID, stockCountry, pageID], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    var query_result = res[0];
    console.log("get stock: ", { query_result });
    result(null, { res });
  });
}

Stock.getStockListByUserID = (userID, stockCountry, pageID, result) => {
  var query = "SELECT * FROM stocks \
        WHERE user_id = ? \
        AND stock_country = ? \
        AND page_id = ?";

  sql.query(query, [userID, stockCountry, pageID], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    var query_result = res;
    console.log("get stocks of user and page: " + userID+stockCountry, { query_result });
    result(null,  {stocks:res} );
  });
}



module.exports = Stock;

