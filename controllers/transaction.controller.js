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

};

/**
 * @description finds a transaction by id and return the details
 * @param {Long} req.params.transaction_id , id of the transaction
 * @return {Object} {status: 200, data: data}
 */
const findById = (req, res) => {

};

/**
 * @description updates a transaction by id
 * @param {Long} req.params.transaction_id , id of the transaction 
 * @param {object} req.body , updated body of the transaction
 * @return {Object} status: 200 if success
 */
const updateOne = (req, res) => {

};

/**
 * @description , finds all trasactions of requested type and returns in json format
 * @param {String} req.params.type , type of transaction 
 * @return {Object} {status: 200, data: data}
 */
const findByType = (req, res) => {

};

/**
 * @description calculates a sum of all transactions that are transitively linked by their parent_id 
 * @param {Long} req.param.transaction_id , id of transaction
 * @returns {Objec} {status: 200, sum: sum}
 */
const getSum = (req, res) => {

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