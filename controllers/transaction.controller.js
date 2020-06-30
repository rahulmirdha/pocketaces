const db = require('../models/index');
const Transaction = db.transacions;
const Op = db.Sequelize.Op;

/**
 * Returns status 200 0k to client
 * @description creates/stores transaction in db
 * @param {Double} req.body.amount amount of transaction
 * @param {String} req.body.type type of transaction
 * @param {Long} (optional) req.body.parent_id parent_id 
 * @return {Object} status:200 if success
 */
const create = (req, res) => {
    if(!(req.body.amount && req.body.type)){
        res.status(400).send({
            message: 'amount or transaction type cannot be empty'
        });
        return;
    }
    const transaction = {
        amount: req.body.amount,
        type: req.body.type,
        parentId: req.body.parentId
    }

    Transaction.create(transaction).
    then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "error occured while storing the transaction"
        });
    });
};

/**
 * @description finds a transaction by id and return the details
 * @param {Long} req.params.transaction_id , id of the transaction
 * @return {Object} {status: 200, data: data}
 */
const findById = (req, res) => {
    const id = req.params.transaction_id;
    if(!id){
        res.status(400).send({
            message: "param transaction_id cannot be empty"
        });
        return;
    }

    Transaction.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || `error while finding the transaction: ${id}`
        });
    })

};

/**
 * @description updates a transaction by id
 * @param {Long} req.params.transaction_id , id of the transaction 
 * @param {object} req.body , updated body of the transaction
 * @return {Object} status: 200 if success
 */
const updateOne = (req, res) => {
    const id = req.params.transaction_id;
    if(!(id && (req.body.amount || req.body.type))){
        res.status(400).send({
            message: "sent request does not contain all the req fields"
        });
        return;
    }
    Transaction.update(req.body, {
        where: {id: id}
    })
    .then(num => {
        if(num == 1){
            res.send({
                message: `Updated transaction with id: ${id}`
            });
        }else{
            res.status(201).send({
                message: `transaction with transaction_id: ${id} not found!`
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message: `error in updating transaction_id: ${id}`
        })
    });

};

/**
 * @description , finds all trasactions of requested type and returns in json format
 * @param {String} req.params.type , type of transaction 
 * @return {Object} {status: 200, data: data}
 */
const findByType = (req, res) => {
    const typ = req.params.type;
    if(!typ){
        res.status(400).send({
            message: `parameter type is required`
        });
        return;
    }
    Transaction.findAll({where: {type: typ}})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: `Error in finding transaction of type: ${type}`
        });
    })

};

/**
 * @description recursively goes through all children nodes and adds amount
 * @param {Object} allDec, tree with all it's descendents
 * @returns {Number} sum, sum of all amounts in the transaction
 */
const calRecSum = async (allDec) => {
    let sum = 0;
    sum += allDec['amount'];
    
    if(!allDec.children){
        return sum;
    }
    for(let i = 0; i < allDec.children.length; i++){
        sum+= await calRecSum(allDec.children[i])
    }
    console.log("sum :", sum);
    return sum;
}

/**
 * @description calculates a sum of all transactions that are transitively linked by their parent_id 
 * @param {Long} req.param.transaction_id , id of transaction
 * @returns {Objec} {status: 200, sum: sum}
 */
const getSum = async (req, res) => {
    const id = req.params.transaction_id;
    if(!id){
        res.status(400).send({message: "param id cannot be empty!"});
    }
    const allDesc = await Transaction.findOne({
        where: {id: id},
        include: {
            model: Transaction,
            as: 'descendents',
            hierarchy: true
        }
    });
    console.log("print alldesc: ");
    console.log(allDesc.amount);

    if(!allDesc){
        res.status(500).send({
            message: `unable to find sum with transaction_id: ${id}`
        });
    }
    
    sum = await calRecSum(allDesc);
    res.send({sum:sum});

};

/**
 * @description deletes requested transaction and it's children if exists
 * @param {Long} req.params.transaction_id, transaction_id to be deleted 
 * @return {Object} {staus: 200} 
 */
const deleteOne = (req, res) => {

};

module.exports = {
    create: create,
    findById: findById,
    updateOne: updateOne,
    findByType: findByType,
    getSum: getSum,
    deleteOne: deleteOne
}