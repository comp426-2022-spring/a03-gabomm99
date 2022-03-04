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
    res.type('text/plain')
    res.status(200).end(`200 OK`)
}
)
app.get('/app/flip', (req, res) => {
    var flip = coinFlip()
    res.type('application/json')
    res.status(200).json({'flip': flip})
})

app.get('/app/flips/:number', (req,res) => {
    var manyFlip = coinFlips(req.params.number)
    var sumFlip = countFlips(manyFlip)
    res.type('application/json')
    res.status(200).json({'raw': manyFlip, 'summary': sumFlip})
})


app.get('/app/flip/call/heads', (req, res) => {
  var flipResult = flipACoin("heads")
  var call = flipResult.call
  var flip = flipResult.flip
  var result = flipResult.result
  res.type('application/json')
  res.status(200).json({'call': call, 'flip': flip, 'result': result})
})

app.get('/app/flip/call/tails', (req, res) => {
  var flipResult = flipACoin("tails")
  var call = flipResult.call
  var flip = flipResult.flip
  var result = flipResult.result
  res.type('application/json')
  res.status(200).json({'call': call, 'flip': flip, 'result': result})
})

app.use(function(req, res){
    res.status(404).send("Endpoint does not exist")
    res.type('text/plain')
})
