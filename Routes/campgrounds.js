var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware/"); //if require a folder the index.js is required

//INDEX ROUTE - display all the campgrounds
router.get("/", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log("ERROR");
            console.log(err);
        } else{
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

//CREATE ROUTE - add new campground to de DB
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var price = req.body.price;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var nemCampground = {name: name, price: price, image: image, description: description, author: author};
    Campground.create(nemCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
            console.log(newlyCreated);
           res.redirect("/campgrounds"); 
        }
    });
});

//NEW - show form to create new campground 
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

//SHOW - shows more info about the campground
router.get("/:id", function(req, res){
    //find the campground with provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err || !foundCampground){
           req.flash("error", "Campground not found.");
           res.redirect("/campgrounds");
       } else{
            res.render("campgrounds/show", {campground: foundCampground});
       }
    });
    //render show template with that campground
});

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){ //don't need to verify error because already did in 'checkCampgroundOwnership' function
        res.render("campgrounds/edit", {campground: foundCampground}); 
    });
});
//UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err){
           console.log(err);
       } else{
           res.redirect("/campgrounds/"+ req.params.id);
       }
    });
});

//DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        }
        res.redirect("/campgrounds");
    });
});

module.exports = router;