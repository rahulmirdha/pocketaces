module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define("transaction", {
        transaction_id: {
            type: Sequelize.LONG,
            primaryKey: true
        },
        amount: {
            type: Sequelize.DOUBLE
        },
        type:{
            type: Sequelize.STRING
        },
        parent_id: {
            type: Sequelize.LONG,
            hierarchy: true
        }
    });

    return Transaction;
};