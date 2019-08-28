const express = require('express')
const request = require('superagent')
const xml2js = require('xml2js')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors());

app.get('/', async (req, res) => {


    const hkjcLink = 'https://iosbsinfo02.hkjc.com/info/IOSBS/FB_GetInfo.ashx?QT=FB_ODDS_ALL&CouponIndex=*&Day=*&Filter=*&MatchNum=*&TourID=*&SpcItem=0&Lang=zh-HK';

    var reply = await new Promise(function (resolve, reject) {
        request.get(hkjcLink).then(function (res) {
            resolve(res);
        })
    })

    var xml = reply.text;

    var resultJson = await new Promise(function (resolve, reject) {
        var xmlParser = new xml2js.Parser({mergeAttrs:false})
        
        xmlParser.parseString(xml, function (err, result) {
            resolve(result);
        })
    }
    )
    res.send(resultJson);

})

app.listen(port, () => console.log(`Listening on port ${port}`))


