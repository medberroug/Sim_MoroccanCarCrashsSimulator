const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
app.use(bodyParser.json())
app.use(cors())

const sim = require('./main')

app.post('/s1/:IX/:IY/:IZ', async function (req, res) {
    // res.send('user TODO created')
    var result = []
    await result.push(sim.loopSim(parseInt(req.params.IX), parseInt(req.params.IY), parseInt(req.params.IZ), 40, 0))
    await result.push(sim.mathCalculator(result[0]))
    console.log(result);
    res.send(result)
})

app.post('/s2/:IX/:IY/:IZ', async function (req, res) {
    // res.send('user TODO created')
    var result = []
    await result.push(sim.loopSim(parseInt(req.params.IX), parseInt(req.params.IY), parseInt(req.params.IZ), 40, 1))
    await result.push(sim.mathCalculator(result[0]))
    console.log(result);
    res.send(result)
})

app.post('/s3/:IX/:IY/:IZ', async function (req, res) {
    // res.send('user TODO created')
    var result = []
    var red = 0
    await result.push(sim.loopSim(parseInt(req.params.IX), parseInt(req.params.IY), parseInt(req.params.IZ), 40, red))
    await result.push(sim.mathCalculator(result[0]))
    while(true){
        if (result[1][1][0][8] > 2000 || (result[1][1][0][12] / result[1][1][0][0]) > 0.5) {
            console.log("NTAAAM 26");
            console.log(result[1][1][0]);
            red = red + 1
            result = []
            await result.push(sim.loopSim(parseInt(req.params.IX), parseInt(req.params.IY), parseInt(req.params.IZ), 40, red))
            await result.push(sim.mathCalculator(result[0]))
        }else{
            break
        }
    }
    // console.log(result);


    res.send({
        a: result,
        iter: red
    })
})


let port = process.env.PORT || 8079
app.listen(port, function () {
    console.log("Server is listening on port:" + port);
})