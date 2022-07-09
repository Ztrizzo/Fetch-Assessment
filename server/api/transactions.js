const router = require('express').Router();
const Transaction = require('../data-models/transactions');
const Payer = require('../data-models/payer');
const { validateTransactionRequest, validateSpendRequest } = require('./middlewares');
require('../seed-data.js');



module.exports = router;




router.post('/addTransaction', validateTransactionRequest, async (req, res, next) => {
  try{
    new Transaction(req.body);
    const points = Payer.findByName(req.body.payer).getPointTotal();
    res.status(201).send({points});
  }
  catch(error){
    next(error);
  }
})

router.post('/spendPoints',validateSpendRequest, async (req, res, next) => {
  try{
    res.status(201).send(Transaction.spendPoints(req.body.points));
  }
  catch(error){
    next(error);
  }
})

router.get('/allPointBalances', async(req, res, next) => {
  try{
    res.status(200).send(Payer.allPointBalances());

  }
  catch(error){
    next(error);
  }
})