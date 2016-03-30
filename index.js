var express = require('express');
var session = require('express-session');

var csurf = require("csurf");
var csrfProtection = csurf();
var app = express();

app.use(session({
  secret: 'some_secret'
}));

app.use(function (req, res, next) {
    if (req.method == "GET" && req.path == "/logout") {
        req.method = "POST";
        csrfProtection(req, res, function() {
            req.method = "GET";
            next();
        });
    } else {
        next();
    }
});

app.use(csrfProtection);

app.get("/", function(req, res) {
    res.send("/logout?_csrf=" + req.csrfToken());
});

app.get("/logout", function(req, res) {
    res.send("Gonna logout");
});

app.listen(3000, function() {
      console.log('Example app listening on port 3000!');
});
