# Banks-api
## Api to fetch the exchange rates from different banks


## Installation

Requires [Node.js](https://nodejs.org/) v14+ to run.
The server uses github actions and you don't need to do anything in order to run it!! 

```sh
npm i
node api.js
node scrapper.js
```

For production environments... I recomand using pm2

```sh
npm install
npm i -g pm2
pm2 start api.js
pm2 start scrapper.js
```
Then create a file named .env and add the following:
DB_URI=Your mongodb uri
EMAIL_USERNAME= the email 
EMAIL_PASSWORD= the password of the email


## Api endpoints
### GET  /api/all-records

It returns a list of all records in that specific day.
#### Parameters



Optional:
 -  date - specific a date
                    Ex: 10-31-2021
 - page: the page you want
 - perPage: how many elements to be on that specific page

Example of request: GET /api/all-records?page=1&perPage=10

#### Response
It will be a json with the following syntax:
```javascript
{
    totalPages: Number,
    page: Number,
    numberOfElements: Number,
    perPage: Number,
    results: [
            {
                 _id: Number,
                 bankId: String, // (representing the id of the Bank)
                 createdAt: Date,
                 updatedAt: Date,
                 values: [
                    {
                        code: String, // (representing the name of the currency. Ex: EUR, USD)
                        buy: Number,
                        sell: Number
                    }
                 ]
        }
    ]
}
```
### GET  /api/all-records/:id

It returns a list of all records from a bank from that specific day.
#### Parameters
Required:
- id: the id of the bank

Optional:
 -  date - specific a date
                    Ex: 30-10-2021
 - page: the page you want
 - perPage: how many elements to be on that specific page


Example of request: GET /api/record-by-bank/617e8a3e96bfba1cfd522f21?page=1&perPage=10

#### Response
It will be a json with the following syntax:
```javascript
{
    totalPages: Number,
    page: Number,
    numberOfElements: Number,
    perPage: Number,
    results: [
            {
                 _id: Number,
                 bankId: String, // (representing the id of the Bank)
                 createdAt: Date,
                 updatedAt: Date,
                 values: [
                    {
                        code: String, // (representing the name of the currency. Ex: EUR, USD)
                        buy: Number,
                        sell: Number
                    }
                 ]
        }
    ]
}
```

### GET  /api/get-currencies

It returns a list of all currencies
#### Parameters
Optional:
- page: the page you want
- perPage: how many elements to be on that specific page

Example of request: GET /api/get-currencies?page=1&perPage=10

#### Response
It will be a json with the following syntax:
```javascript
{
    totalPages: Number,
    page: Number,
    numberOfElements: Number,
    perPage: Number,
    results: [
            {
                 _id: Number,
                 currency: String, // (Ex: USD, EUR)
                 name: String, // (representing the name of the currency)
        }
    ]
}
```

### GET  /api/get-currencies/:id

It returns all info about a specific currency
#### Parameters
Required:
- id: the id of the currency

Example of request: GET /api/get-currencies/6176dfb3e1316b6ce76ac47c

#### Response
It will be a json with the following syntax:
```javascript
{
    _id: Number,
    currency: String (Ex: USD)
    int_name: String,
    code_iso_4217: String,
    code_iso_3166_1: String,
    zecimal_nr: String,
    countries: [String],
    name: String
}
```

### GET  /api/get-banks

It returns all info about all banks
#### Parameters
Optional:
- page: the page you want
- perPage: how many elements to be on that specific page

Example of request: GET /api/get-banks?page=1&perPage=10

#### Response
It will be a json with the following syntax:
```javascript
{

    totalPages: Number,
    page: Number,
    perPage: Number,
    results: [
                {
                   _id: Number,
                   name: String,
                   created_at: Date,
                   contact_details: {
                        tel: String,
                        fax: String,
                        mail: String,
                        website: String,
                        SWIFT: String
                    },
                    working_hours: {
                        monday: 08:15-17:00,
                        tuesday: 08:15-17:00,
                        Wednesday: 08:15-17:00,
                        thursday: 08:15-17:00,
                        friday: 08:15-17:00,
                        saturday: null,
                        sunday: null
                    },
                    adress: {
                        street: String,
                        city: String,
                        postal_code: String,
                        sector: String,
                        number: String
                    }
            }
    ]
}
```
### GET  /api/get-banks/:id

It returns all info about a specific bank
#### Parameters
Required:
- id: the id of the bank

Example of request: GET /api/get-banks/617e8a3e96bfba1cfd522f21

#### Response
It will be a json with the following syntax:
```javascript
{
   _id: Number,
   name: String,
   created_at: Date,
   contact_details: {
        tel: String,
        fax: String,
        mail: String,
        website: String,
        SWIFT: String
    },
    working_hours: {
        monday: 08:15-17:00,
        tuesday: 08:15-17:00,
        Wednesday: 08:15-17:00,
        thursday: 08:15-17:00,
        friday: 08:15-17:00,
        saturday: null,
        sunday: null
    },
    adress: {
        street: String,
        city: String,
        postal_code: String,
        sector: String,
        number: String
    }
}
```

### POST  /api/contact

It sends an email
#### Parameters
Required:
- subject: the subject of the email
- to: the addres to send the email to
- text: the message



          

