var express        = require('express'),
    app            = express(),
    bodyParser     = require('body-parser'),
    mongoose       = require('mongoose'),
    Campground     = require('./models/campground'),
    Comment        = require('./models/comment'),
    seedDB         = require('./seeds'),
    passport       = require('passport'),
    LocalStrategy  = require('passport-local'),
    methodOverride = require('method-override'),
    flash          = require('connect-flash'),
    User           = require('./models/user.js');

//REQUIRE ALL THE ROUTES
var commentRoutes    = require("./Routes/comments.js"),
    campgroundRoutes = require("./Routes/campgrounds.js"),
    indexRoutes      = require("./Routes/index.js");

//commecting to the database (local[test] or heroku[production] depending on the environment)

var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp"; //setting an default database if the process.env.DATABASEURL was empty, to prevent errors
mongoose.connect(url, { useNewUrlParser: true }); 



//USING THE PUBLIC FOLDER
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(flash());
app.set("view engine", "ejs");

// seedDB(); //seed the database

//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "This is the secret called potato",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Set currentUser as user object to every route
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//Use The Routes Required
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/", indexRoutes);
//DEFINE THAT ALL THE PAGES WILL START WITH /camgrounds
app.use("/campgrounds", campgroundRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YELP CAMP server has started!")
});