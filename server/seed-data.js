const Payer = require('./data-models/payer');
const Transaction = require('./data-models/transactions');

const payers = [];

//List of all valid payers
const dannon = new Payer('DANNON');
payers.push(dannon)
const unilever = new Payer('UNILEVER');
payers.push(unilever)
const miller = new Payer('MILLER COORS');
payers.push(miller)
const gm = new Payer('GENERAL MILLS');
payers.push(gm)
const dole = new Payer('DOLE');
payers.push(dole)
const yoplait = new Payer('YOPLAIT');
payers.push(yoplait)

const randomTimestamp = () => {
  const randomYear = `202${Math.floor(Math.random() * 4)}`;
  const randomMonth = `${Math.ceil(Math.random() * 12)}`.toString().padStart(2, 0);
  const randomDay = `${Math.ceil(Math.random() * 28)}`.toString().padStart(2, 0);
  const randomHour = `${Math.floor(Math.random() * 23)}`.toString().padStart(2, 0);
  return `${randomYear}-${randomMonth}-${randomDay}T${randomHour}:00:00Z`;

}


if(process.env.SEED){
  for(let i = 0; i < 100; i++){
    new Transaction({payer: payers[Math.floor(Math.random() * payers.length)].name, points: Math.ceil(Math.random() * 1000), timestamp: randomTimestamp()})
  }
}




console.log(dannon.getPointTotal());