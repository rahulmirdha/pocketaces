/**
 * @description dbSchema for transaction
 * parentId is inbuilt defined by sequelize-hierarchy
 */
module.exports = (sequelize, Sequelize) => {
    
    const Transaction = sequelize.define("transaction", {
        amount: {
            type: Sequelize.DOUBLE
        },
        type:{
            type: Sequelize.STRING
        }
    });

    Transaction.isHierarchy()

    return Transaction;
};