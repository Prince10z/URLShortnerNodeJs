const short = require("shortid");
const URL = require("../models/url");
async function handleGeneratingurl(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "url is required" });


    const shortID = short.generate();
    await URL.create(
        {
            shortId: shortID,
            redirectURL: body.url,
            visitHistory: [],
        }
    );
    return res.render('home', {
        id: shortID
    });
    // return res.json({ id: shortID });
}
async function handlegettingurl(req, res) {
    try {
        const iddata = req.params.id;
        const entry = await URL.findOneAndUpdate({ shortId: iddata }, {
            $push: {
                visitHistory: {
                    timestamp: Date.now()
                }
            }
        });
        console.log(entry);
        if (!entry) {
            return res.status(401).json({ status: "First Register" });
        }
        return res.redirect(entry.redirectURL);


    } catch (e) {
        return res.status(500).json({ status: "Error", message: e.message });
    }
}
async function handleNumberOfClicks(req, res) {
    try {
        const user = await URL.findOne({ shortId: req.params.id });
        if (!user) {
            return res.status(400).json({ status: "User do not exist please check " });
        }

        return res.status(200).json({ visits: user.visitHistory.length, timelaps: user.visitHistory });

    } catch (e) {
        return res.status(500).json({ status: "Error", message: e.message });
    }
}
module.exports = { handleGeneratingurl, handlegettingurl, handleNumberOfClicks };