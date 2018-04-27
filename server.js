const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const Pusher = require('pusher')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const port = process.env.PORT || 8080

const pusher = new Pusher({
  appId: process.env.app_id,
  key: process.env.key,
  secret: process.env.secret,
  cluster: 'eu',
  encrypted: true
})

app.post('/add-review', function (req, res) {
  pusher.trigger('rotten-pepper', 'new-movie-review', req.body)
  res.sendStatus(200)
})

app.listen(port, function () {
  console.log('Node app is running at localhost:' + port)
})
