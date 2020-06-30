const express = require('express');
const transaction = require('../controllers/transaction.controller');

module.exports = app => {
    const router = express.Router();

    //create a transaction
    router.post("/", transaction.create);

    // find a transaction by it's id
    router.get("/:transaction_id", transaction.findById);

    // Update a transaction with id
    router.put("/:transaction_id", transaction.updateOne);

    // find all transaction of req type
    router.get("/type/:type", transaction.findByType);

    // get sum all transaction int hierarcy related by parent-child
    router.get("/sum/:transaction_id", transaction.getSum);

    // Delete a tranaction with id
    router.delete("/:transaction_id", transaction.deleteOne);

    app.use('/transactionservice', router);

};