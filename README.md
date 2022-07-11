# Fetch Backend Assessment
<p>
  Hello!

  My name is Zach and this is my backend assessment for Fetch Rewards.

  Below are the instuctions for installing and running this application.
</p>

- LinkedIn: https://www.linkedin.com/in/zacharyrizzo/
- Github: https://github.com/Ztrizzo



## How to Install
1. Clone this repository into a directory, then navigate to this project's root folder. You must have Node and npm installed on your machine for this application to run.

2. Install this project using the command: 
```
  npm install
```

3. Start the server by running:
```
  npm start
```
4. optionally, if you would like to run the server with seeded dummy data, run:
```
  npm start:seed
```

## Server requests

  The server will accept HTTP requests with JSON objects and will run on localhost://8080 by default.

  **There are only 6 valid payers in the system:**
  * DANNON
  * UNILEVER
  * MILLER COORS
  * GENERAL MILLS
  * DOLE
  * YOPLAIT



### POST /api/transactions/addTransaction

* A POST request to this endpoint will create a new transaction with the data sent. It will return the payer's new point balance after the transaction.

* Transactions must have the format: { "payer": "DANNON", "points": 1000, "timestamp": "2020-11-02T14:00:00Z" }

* Response: { "points": 300 }




### POST /api/transactions/spendPoints

* A POST request to this endpoint will spend points based on the oldest transactions in the system. It will return an array of all the payers points that were spent with the number of points that they spent

* request must have the format: { "points": 5000 }

* Response:  
>[  
    {
        "payer": "DOLE",
        "points": -152
    },  
    {
        "payer": "MILLER COORS",
        "points": -94
    },  
    {
        "payer": "DANNON",
        "points": -254
    }  
]
### GET /api/transactions/allPointBalances

* A GET request to this endpoint will return an array of all payers in the system with the number of points that they have in their account.

* Response: 
>[  
    {
        "DANNON": 7258
    },  
    {
        "UNILEVER": 8156
    },  
    {
        "MILLER COORS": 10150
    },  
    {
        "GENERAL MILLS": 11193
    },  
    {
        "DOLE": 6720
    },  
    {
        "YOPLAIT": 7265
    }  
]  


## Technologies
To complete this assessment, I used: Node.js, Express.js, Mocha.js, Chai.js