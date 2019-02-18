var mongoose   = require('mongoose'),
    Campground = require('./models/campground'),
    Comment    = require('./models/comment');
    
var data = [
    {
        name: "Test 123",
        image: "https://images.unsplash.com/photo-1547152850-11ac68bbe48f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1492&q=80",
        description: "mountains"
    },
    {
        name: "Test 5555",
        image: "https://www.nationalparks.nsw.gov.au/-/media/npws/images/parks/munmorah-state-conservation-area/background/freemans-campground-background.jpg",
        description: "beautifulbeautiful night beautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful night beautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful night beautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful night beautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful night beautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful night beautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful night beautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful nightbeautiful"
    },
    {
        name: "WOWOWO",
        image: "https://images.unsplash.com/photo-1500332988905-1bf2a5733f63?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        description: "lake"
    },
]

function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds");
            //add few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } else{
                    console.log("added campground");
                    //add comments
                    Comment.create({text: "nice place wow", author: "Homer"}, function(err, comment){
                        if(err){
                            console.log(err)
                        } else{
                            campground.comments.push(comment);
                            campground.save()
                            console.log("created new comment");
                        }
                       
                    });
                }
            });
        });
    });


   
    
}
module.exports = seedDB;
