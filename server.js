var express = require("express");

var PORT = process.env.PORT || 8088;

var app = express()

// set the static folder
app.use(express.static('public'));

// set the middleware to handle data parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

app.listen(PORT, function () {
    console.log("Server is listening on http://localhost:" + PORT)
})