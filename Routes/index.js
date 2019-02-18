var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var passport = require("passport");
var User = require("../models/user");

//ROOT ROUTE
router.get("/", function(req, res){
   res.render("landing");
});


//AUTH ROUTES
router.get("/register", function(req, res) {
    res.render("register");
});

router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
       if(err){
           req.flash("error", err.message);
           return res.redirect("/register");
       }
       passport.authenticate("local")(req, res, function(){
           req.flash("success", "Welcome to YelpCamp " + user.username);
           res.redirect("/campgrounds");
       })
    });
});

//SHOW LOGIN FORM
router.get("/login", function(req, res) {
    res.render("login");
});
//HANDLE LOGIN LOGIN
router.post("/login", passport.authenticate("local",
    {
        successRedirect:"/campgrounds",
        failureRedirect:"/login"
    }), function(req, res){
        
});

//LOGOUT ROUTE
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/campgrounds");
});

//ROUTE THAT GOES TO AN OUTSIDE LINK
// app.get("/merch", function(req, res){
//     res.redirect("https://www.google.com");
// });

module.exports = router;