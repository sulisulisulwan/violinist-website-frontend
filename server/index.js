import express from 'express'
import cors from 'cors'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))


const port = 1234;
const app = express();

app.use(express.static('./dist'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())

app.get('*', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../dist/index.html'))
})

app.listen(port, () => {
  console.log(`listening on ${port}`)
})

/***********
*  ROUTES
************/


