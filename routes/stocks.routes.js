module.exports = app => {
  const stocks = require("../controllers/stocks_controller.js");
  const users = require("../controllers/user.controller.js");

  // Create a new Customer
  app.post("/users/login", users.login);

  app.post("/users/register", users.register);

  app.post("/stock/add", stocks.add);

  app.post("/stock/addInfo", stocks.addInfo);

  app.post("/stock/updateStockInfoById", stocks.updateStockInfoById);

  app.post("/stock/findStockById", stocks.findStockById);

  app.post("/stock/getStockListByUserID", stocks.getStockListByUserID);
};

/*
CREATE TABLE `stock_info` (
  `stock_info_id` int(11) NOT NULL AUTO_INCREMENT,
  `stock_id` varchar(45) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `text` varchar(2555) DEFAULT NULL,
  `shares` float DEFAULT NULL,
  `entry` float DEFAULT NULL,
  `stock_exit` float DEFAULT NULL,
  `be` float DEFAULT NULL,
  `p1` float DEFAULT NULL,
  `p2` float DEFAULT NULL,
  `p5` float DEFAULT NULL,
  `p10` float DEFAULT NULL,
  `alert` float DEFAULT '0',
  `alerted` int(11) DEFAULT '0',
  `risk_entry` float DEFAULT NULL,
  `risk_exit` float DEFAULT NULL,
  `risk_capital` float DEFAULT NULL,
  `risk_perc` float DEFAULT NULL,
  `risk_position` float DEFAULT '0',
  `risk_shares` float DEFAULT NULL,
  `current_price` varchar(225) NOT NULL DEFAULT '0',
  `change_perc` varchar(225) NOT NULL DEFAULT '0',
  PRIMARY KEY (`stock_info_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

*/