const Payer = require('../data-models/payer');
const Transaction = require('../data-models/transactions');


//Checks to make sure the server route was sent a valid transaction
const validateTransactionRequest = (req, res, next) => {
  const transaction = req.body;
  let message;
  if(!transaction.payer)
    message = 'Missing payer information';
  else if(!Payer.findByName(req.body.payer))
    message = 'Payer does not exist';
  else if(Payer.findByName(req.body.payer).getPointTotal() + transaction.points < 0)
    message = 'Payer does not have enough points!'
  else if(!transaction.points)
    message = 'Transaction must have points';
  else if(!transaction.timestamp)
    message = 'Transaction must have a timestamp';
  if(message)
    return res.status(400).send({message});
  
  next();
}

//Checks to make sure the server route was sent a valid spend request
const validateSpendRequest = (req, res, next) => {
  let message;
  const points = req.body.points;
  if(!points)
    message = 'Request must have points';
  if(points < 0)
    message = 'Points cannot be negative';
  if(typeof points !== 'number')
    message = 'Invalid type for points';
  else if(points > Transaction.totalAvailablePoints())
    message = 'Not enough points in the system!';

  if(message)
    return res.status(400).send({message});

  next();

}

module.exports = { validateTransactionRequest, validateSpendRequest };