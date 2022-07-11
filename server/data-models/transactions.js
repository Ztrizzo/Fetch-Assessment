const TransactionQueue = require('./TransactionQueue');

const activeTransactions = new TransactionQueue();
const loggedTransactions = [];

//unique id for each transaction, starts at one
let id = 1;

class Transaction{
  constructor({payer, points, timestamp}){
    this.id = id++;
    this.payer = payer;
    this.points = points;
    this.timestamp = new Date(timestamp);

    //negative transactions are treated as spends
    if(points < 0){
      loggedTransactions.push(this)
      handleNegativeTransaction(this);
    }
    else
      activeTransactions.insert(this);
  }
}

const handleNegativeTransaction = function(transaction){
  let points = transaction.points;

  for(let i = 0; i < activeTransactions.length && points < 0; i++){
    const activeTransaction = activeTransactions[i]
    if(transaction.payer === activeTransaction.payer){
      if(activeTransaction.points > -points){
        activeTransaction.points += points;
        points = 0;
        return;
      }
      else{
        loggedTransactions.push(activeTransactions.splice(i, 1)[0]);
        i--;
        points += activeTransaction.points;
      }


    }
  }

}

//returns total points for all transactions in the system
Transaction.totalAvailablePoints = () => {
  return activeTransactions.reduce((accum, transaction) => accum + transaction.points, 0)
}

//returns list of all transactions
Transaction.getAll = () => {
  return activeTransactions;
}

Transaction.spendPoints = (points) => {
  const allSpends = {};
  while(points > 0){
    const oldestTransaction = activeTransactions.peek() 

    //if the oldest transaction has enough points, we just decrease the points from that transaction
    if (oldestTransaction.points > points){
      oldestTransaction.points -= points;
      // allSpends.push({payer: oldestTransaction.payer, points: -points })
      if(allSpends[oldestTransaction.payer]) allSpends[oldestTransaction.payer] += -points;
      else allSpends[oldestTransaction.payer] = -points;
      points = 0;
    }
    //else we remove transactions in FIFO order until all points are accounted for
    else{
      const transaction = activeTransactions.shift();
      loggedTransactions.push(transaction);
      points -= transaction.points;
      // allSpends.push({payer: transaction.payer, points: -transaction.points});
      if(allSpends[transaction.payer]) allSpends[transaction.payer] += -transaction.points;
      else allSpends[transaction.payer] = -transaction.points;
    }
  }

  //Turn response into an array of objects
  return Object.keys(allSpends).map(key => {return {payer: key, points: allSpends[key]}});
}

module.exports = Transaction;