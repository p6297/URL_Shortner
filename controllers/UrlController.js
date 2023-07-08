const shortid = require("shortid");
const URL = require("../models/Url");

const GenerateNewShortId = async(req,res) => {
try {
    const body = req.body;
    if(!body.url) {
        res.status(400).json({error:"Url is Required."})
    }
    const ShortId = shortid.generate();

    await URL.create({
        shortId:ShortId,
        redirectUrl:body.url,
        visitHistory:[]
    })

    res.status(200).json({id:ShortId})



} catch (error) {
    res.send(500).send(error.message);
    
}
}


const GetAnalytics = async (req,res) => {
    const shortId = req.params.shortId;

    const result = await URL.findOne({shortId});
    return res.json({totalClicks:result.visitHistory.length,
                    analytics:result.visitHistory})
}




module.exports = {
    GenerateNewShortId,
    GetAnalytics
}