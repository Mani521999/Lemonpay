/** Packages */
const http = require("http");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


/** Services */
import config from './Config/config'
import { connect } from "./Services/connection";

/** Routes */
import Routes from "./Routes/v1";

/** Initiate Server */
const app = express();
app.options(/(.*)/, cors());
app.use(cors())
app.use(bodyParser.urlencoded({ limit: '200mb', extended: false }));
app.use(bodyParser.json({ limit: '100mb' }));
app.use('/api', Routes)

app.get("/", (req, res) => { return res.send("Server running") });
app.get(/(.*)/, (req, res) => { return res.status(500).json({ error: "Bad Request !" }) });

/** Server-Creation */
const server = http.createServer(app);

app.listen(config.PORT, (err) => {
    console.log("server running with", config.PORT);
    connect() //  Database Connection.
});


