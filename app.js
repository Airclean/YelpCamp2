var express = require("express");
var app = express();
var mongoose = require("mongoose");
var Camp = require("./models/camp");
var Comment = require("./models/comment");
var seed = require("./seeds");
var bodyParser = require("body-parser");
var passport = require("passport");
var passportLocal = require("passport-local");
var User = require("./models/user");
var methodOverride = require("method-override");
var flash = require("connect-flash");

var campRoute = require("./routes/campgrounds.js"),
    commentRoute = require("./routes/comments.js"),
    authenticationRoute = require("./routes/authentication.js");
var url = process.env.DATABASEURL || 'mongodb://localhost:27017/Yelp';
mongoose.connect(url, { useNewUrlParser: true });
// mongoose.connect('mongodb://localhost:27017/Yelp', { useNewUrlParser: true });
//APP CONFIG
app.set("view engine", "ejs");
app.use(flash());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(require("express-session")({
    secret: "This is my first authentication app",
    resave: false,
    saveUninitialized: false
}));
app.locals.moment = require("moment");
app.use(methodOverride("_method"));
passport.use(new passportLocal(User.authenticate()));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
seed();
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
app.use("/campgrounds", campRoute);
app.use("/campgrounds/:id/comments", commentRoute);
app.use("/", authenticationRoute);

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The YelpCamp Server has started");
});
