require('dotenv').config()

const {
	USER_NAME, HOST, DATABASE, PASSWORD, DIALECT
} = process.env

module.exports = {
  "development": {
    "username": USER_NAME,
    "password": PASSWORD,
    "database": DATABASE,
    "host": HOST,
    "dialect": DIALECT
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
