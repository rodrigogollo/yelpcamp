var express = require("express");
var router = express.Router({mergeParams: true}); //fixes the error that cannot find the campgrounds id when is passed the app.use("/campgrounds/:id/comments", comments);
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");
// =======================================
// =========== COMMENTS ROUTE ============
// =======================================

//Comments New
router.get("/new", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, foundedCampground){
        if(err){
            res.redirect("/campgrounds/"+ req.params.id);
        }else{
            res.render("comments/new", {campground: foundedCampground});
        }
    })
});
// Comments Create
router.post("/", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
       if(err){
           req.flash("error", "Something went wrong.");
           res.redirect("/campgrounds");
       } else{
           Comment.create(req.body.comment, function(err, comment){
               if(err){
                   console.log(err)
               } else{
                   comment.author.id = req.user._id;
                   comment.author.username = req.user.username;
                   comment.save();
                   campground.comments.push(comment);
                   campground.save();
                   res.redirect("/campgrounds/"+ campground._id);
                   req.flash("success", "Successfully created your comment.")
               }
           })
       }
    });
});
//EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){ //without the simplified route would be /campgrounds/:id/comments/:comment_id/edit watch the /:comment_id because can't be called the same name otherwise would overwrite
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err || !foundCampground){
            req.flash("error", "Campground not found.");
            res.redirect("back");
        } 
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            } else{
                res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
            }
        });
    });
});

//UPDATE ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
       if(err){
           res.redirect("back");
       } else{
           res.redirect("/campgrounds/"+ req.params.id);
       }
    });
});

//DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       }
       req.flash("success", "Your comment was deleted.");
       res.redirect("/campgrounds/"+ req.params.id);
   })
});

module.exports = router;