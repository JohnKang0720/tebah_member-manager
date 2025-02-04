const { Pool } = require('pg')
require('dotenv').config()

const db = new Pool({
  connectionString: "postgres://default:LgnO1f8UPHDI@ep-crimson-paper-a45txdup-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require?sslmode=require",
})

module.exports = db
