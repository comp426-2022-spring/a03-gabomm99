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

function coinFlips(flips) {
  let multiFlip = []
  let i = 0
  while (i < flips){
    multiFlip.push(coinFlip())
    i++
  }
  return multiFlip
}

function countFlips(array) {
  let counter = {heads: 0, tails: 0} 
  for (let flip in array){
    if (array[flip] == "tails"){
      counter.tails++
    }
    else{
      counter.heads++
    }
  }
  return counter
}

function flipACoin(call) {
  let outcome = "lose"
  let flipOut = coinFlip()
  if (flipOut == call){
    outcome = "win"
  }
  let scenario = {call: call, flip: flipOut, result: outcome }
  return scenario
}





const express = require('express')
const app = express()



const args = require("minimist")(process.argv.slice(2))
args["port"]
var port = args.port || process.env.PORT || 5555

const server = app.listen(port, () =>{
    console.log('App is running on port %PORT%'.replace('%PORT%', port))
})


app.get('/app', (req, res) => {
    res.statusCode = 200
    res.statusMessage = 'OK'
    res.setHeader(res.statusCode, {'Content-Type' : 'text/plain'})
    res.end(res.statusCode+ ' ' + res.statusMessage)
}
)
app.get('/app/flip', (req, res) => {
    var flip = coinFlip()
    res.type("text/json")
    res.status(200).json({'flip': flip})
})

app.get('/app/flips/:number', (req,res) => {
    var manyFlip = coinFlips(req.params.number)
    var sumFlip = countFlips(manyFlip)
    res.type("text/json")
    res.status(200).json({'raw': manyFlip})
})


app.get('/app/flip/call/:coinSide', (req, res) => {
  var flipResult = flipACoin()
  res.status(200).send({flipResult})
  res.type("text/plain")
})


app.use(function(req, res){
    res.status(404).send("Endpoint does not exist")
    res.type("text/plain")
})
