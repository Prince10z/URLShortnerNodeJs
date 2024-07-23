const express = require("express");
const urlRoute = require("./routes/url");
const connectdb = require("./connect");
require('dotenv').config();
const app = express();
const PORT = 2001;
const URL = require("./models/url");
const path = require("path");
const staticRoute = require("./routes/staticRouter");
connectdb(process.env.url);
//MiddleWares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set('views', path.resolve('./views'));
//Routes
app.use('/url', urlRoute);
app.use('/', staticRoute);

app.get('/test', async (req, res) => {
    const allurls = await URL.find({});
    return res.render('home', { url: allurls });
})
app.get('/redirect/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                }
            }
        }
    );
    res.redirect(entry.redirectURL);
})
app.delete('/delete', async (req, res) => {
    const entry = await URL.deleteMany({});
    res.json({ status: "Success" });
})
//Starting Server
app.listen(process.env.PORT || PORT, () => {
    console.log(`Starting server at port :${PORT}...`);
})
