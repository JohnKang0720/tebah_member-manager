const { Pool } = require('pg')
require('dotenv').config()

const db = new Pool({
  connectionString: "postgresql://default:LgnO1f8UPHDI@ep-crimson-paper-a45txdup-pooler.us-east-1.aws.neon.tech/tebah_db?sslmode=require",
})

module.exports = db
