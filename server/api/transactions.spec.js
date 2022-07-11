const chai = require('chai');
const chaiHttp = require('chai-http');
const Transaction = require('../data-models/transactions')
const Payer = require('../data-models/payer');
const server = require('../server');
const should = chai.should();
const expect = chai.expect;


//middleware for testing server requests
chai.use(chaiHttp);

describe('addTransaction', () => {

  it('should respond with a 400 if the payer is not found', (done) => {
    chai.request(server)
    .post('/api/transactions/addTransaction')
    .send({payer: 'INVALID', points: 1200, timestamp:"2013-11-02T14:00:00Z"})
    .end((err, res) => {
      res.should.have.status(400);
      res.error.text.should.exist;
      done();
    })
  })

  it('should respond with a 400 status if the request is invalid', (done) => {
    chai.request(server)
    .post('/api/transactions/addTransaction')
    .send({payer: 'DANNON', points: 1200}) //intentionally missing the timestamp
    .end((err, res) => {
      res.should.have.status(400);
      done();
    })
  })

  it("should add to the payer's total points", (done) => {
    const pointsBefore = Payer.findByName('DANNON').getPointTotal();
    chai.request(server)
    .post('/api/transactions/addTransaction')
    .send({payer: 'DANNON', points: 1200, timestamp:"2013-11-02T14:00:00Z"})
    .end((err, res) => {
      Payer.findByName('DANNON').getPointTotal().should.equal(pointsBefore + 1200);
      done();
    })
  })

  it("should return the payer's new point total", (done) => {
    new Transaction({payer:'YOPLAIT', points: 400, timestamp:"2014-11-02T14:00:00Z"})
    chai.request(server)
    .post('/api/transactions/addTransaction')
    .send({payer: 'YOPLAIT', points: 100, timestamp:"2013-11-02T14:00:00Z"})
    .end((err, res) => {
      const payer = Payer.findByName('YOPLAIT');
      res.body.points.should.equal(payer.getPointTotal());
      done();
    })
  })
})


describe('spendPoints', () => {

  it('should respond with a 400 status if the request is invalid', (done) => {
    chai.request(server)
    .post('/api/transactions/spendPoints')
    .send({points: -1}) //invalid request
    .end((err, res) => {
      res.should.have.status(400);
      done();
    })
  })

  it('should respond with a 400 status if the spend is too large', (done) => {
    chai.request(server)
    .post('/api/transactions/spendPoints')
    .send({points: 9999999999})
    .end((err, res) => {
      res.should.have.status(400);
      done();
    })
  })

  it('should respond with an array of all the points that each payer paid', () => {
    chai.request(server)
    .post('/api/transactions/spendPoints')
    .send({points: 2000})
    .end((err, res) => {
      
      res.should.have.status(201);
      res.body.should.be.a('array');
      Object.keys(res.body).length.should.equal(3);
    })
  })
})

describe('allPointBalances', () => {
  it("should return all payer's points balances", (done) => {
    chai.request(server)
    .get('/api/transactions/allPointBalances')
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('array');
      done();
    })
  })
})