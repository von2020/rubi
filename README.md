# rubi

Naira Deposit App

1.  Sign Up:
   POST request
	localhost:3000/user/signup  :used for registering New Users
	sample payload:
	{
	"email" : "mattew@gmail.com",
	"password": "Password"
	}


2. Login:
	POST request
	localhost:3000/user/login: used for signing in new users
	{
	"email" : "mattew@gmail.com",
	"password": "Password"
	}


3.Deposit:
POST request
	localhost:3000/deposit/ : used for making deposits 
	{
	"name" : "manni simms",
	"amount": "9000"
	}

4.Deposit:
GET request
	localhost:3000/deposit/ : used for making deposits 
	{
	"name" : "manni simms",
	"amount": "9000"
	}
