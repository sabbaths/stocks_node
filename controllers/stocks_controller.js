const Stock = require("../models/stocks_model.js");

exports.add = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const stock = new Stock({
    name: req.body.name,
    text: req.body.text,
    user_id: req.body.user_id,
    page_id: req.body.page_id,
    is_active: req.body.is_active,
    stock_country: req.body.stock_country,
  });

  // Save Customer in the database
  Stock.add(stock, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Stock."
      });
    else res.send(data);
  });
};

exports.addInfo = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  var stockInfo = {
    name: req.body.name,
    text: req.body.text,
    stock_id: req.body.stock_id,
    shares: req.body.shares,
    stock_exit: req.body.stock_exit,
    be: req.body.be,
    p1: req.body.p1,
    p2: req.body.p2,
    p5: req.body.p5,
    p10: req.body.p10,
    alert: req.body.alert,
    alerted: req.body.alerted,
    risk_entry: req.body.risk_entry,
    risk_exit: req.body.risk_exit,
    risk_capital: req.body.risk_capital,
    risk_perc: req.body.risk_perc,
    risk_position: req.body.risk_position,
    risk_shares: req.body.risk_shares,
    current_price: req.body.current_price,
    change_perc: req.body.change_perc
  };

  // Save Customer in the database
  Stock.addInfo(stockInfo, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Stock."
      });
    else res.send(data);
  });
};

exports.updateStockInfoById = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  var stockId = req.body.stock_id;

  var stockInfo = {
    name: req.body.name,
    text: req.body.text,
    stock_id: req.body.stock_id,
    shares: req.body.shares,
    entry: req.body.entry,
    stock_exit: req.body.stock_exit,
    be: req.body.be,
    p1: req.body.p1,
    p2: req.body.p2,
    p5: req.body.p5,
    p10: req.body.p10,
    alert: req.body.alert,
    alerted: req.body.alerted,
    risk_entry: req.body.risk_entry,
    risk_exit: req.body.risk_exit,
    risk_capital: req.body.risk_capital,
    risk_perc: req.body.risk_perc,
    risk_position: req.body.risk_position,
    risk_shares: req.body.risk_shares,
    current_price: req.body.current_price,
    change_perc: req.body.change_perc
  };

  // Save Customer in the database
  Stock.updateStockInfoById(stockInfo, stockId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Stock."
      });
    else res.send(data);
  });
};

exports.findStockById = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  var stockID = req.body.stockID;
  var stockCountry = req.body.stockCountry;
  var pageID = req.body.pageID;

  // Save Customer in the database
  Stock.findStockById(stockID, stockCountry, pageID, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Stock."
      });
    else res.send(data);
  });
};

exports.getStockListByUserID = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  var userID = req.body.userID;
  var pageID = req.body.pageID;
  var stockCountry = req.body.stockCountry;

  // Save Customer in the database
  Stock.getStockListByUserID(userID, stockCountry, pageID, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Stock."
      });
    else res.send(data);
  });
};