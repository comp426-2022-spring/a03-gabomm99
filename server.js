const express = require('express')
const app = express()

var port = 5555

const server = app.listen(port, () =>{
    console.log('App is running on port %PORT%'.replace('%PORT', port))
})

function coinFlip() {
    let result
    let flip = Math.random()
    if ( flip < 0.5) {
      result = "heads"
    } else {
      result = "tails"
    }
    return result
  }

app.get('/app', (req, res) => {
    res.status(200).end('API is working')
    res.type('text/plain')
}
)
app.get('/app/flip', (req, res) => {
    var flip = coinFlip()
    res.status(200).json({'flip': flip})
})

app.get('/app/echo/:number', (req,res) => {
    res.status(200).json({ 'message': req.params.number})
})
app.use(function(req, res){
    res.status(404).send("Endpoint does not exist")
    res.type("text/plain")
})