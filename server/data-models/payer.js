const allPayers = [];
const Transaction = require('./transactions');

class Payer{
  constructor(name){
    this.name = name;
    allPayers.push(this);
  }

  getPointTotal(){
    let numPoints = 0;
    Transaction.getAll().forEach(transaction => {
      if(transaction.payer === this.name)
        numPoints += transaction.points;
    })

    return numPoints;
  }
  


}
//returns null if payer is not found
Payer.findByName = (name) => {
  return allPayers.find(payer => payer.name === name) || null;
}
module.exports = Payer;