import { PrismaClient } from '@prisma/client'
import 'dotenv/config'
import express from 'express'
import errorHandler from './handlers/error.handler.js'
import Routes from './routes/routes.js'
const prisma = new PrismaClient()

const app = express()
app.use(express.json())
const PORT = process.env.PORT
app.use('/api', Routes())
app.use(errorHandler)

async function initDB() {
  try {
    await prisma.$connect()
    console.log('Databasega ulandi')
  } catch (error) {
    console.error(error.message)
  }
}
await initDB()
app.listen(PORT, console.log(`server is running http://localhost:${PORT}`))
