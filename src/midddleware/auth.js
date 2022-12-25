const customerModel = require("../models/customermodel");

// ................................................................ MIDDLEWARE .........................................................

exports.middleware = async (req, res, next) => {
  try {
    if (!Object.keys(req.query).includes("customerID")) {
      return res
        .status(400)
        .send({ status: false, message: "provide your UUID customerID" });
    }
    const customer = await customerModel.findOne({
      customerID: req.query.customerID,
    });
    if (!customer) {
      return res
        .status(400)
        .send({
          status: false,
          message:
            "Customer is either deleted or never existed",
        });
    }
    req.customer = customer;
    next();
  } catch (err) {
    return res.sendStatus(500);
  }
};
