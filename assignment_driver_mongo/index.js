import express from 'express'
import { bootStrap } from './src/app.controller.js'
const app = express()
const port = process.env.PORT 

bootStrap(express, app)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))