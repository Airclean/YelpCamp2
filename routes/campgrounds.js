var express = require("express"),
    router = express.Router(),
    Camp = require("../models/camp.js"),
    middleware = require("../middleware/index.js");

var NodeGeocoder = require('node-geocoder');

var options = {
    provider: 'google',
    httpAdapter: 'https',
    apiKey: process.env.GEOCODER_API_KEY,
    formatter: null
};

var geocoder = NodeGeocoder(options);

router.get("/", function(req, res) {
    console.log("entered");
    Camp.find({}, function(err, allCampgrounds) {
        if (err) {
            req.flash("error", err.message);
            res.redirect("/camgrounds");
        }
        else {
            res.render("campgrounds/index", { campgrounds: allCampgrounds });
        }
    });
});
router.post("/", middleware.isLoggedIn, function(req, res) {
    if (req.body.name && req.body.image && req.body.price) {

        geocoder.geocode(req.body.location, function(err, data) {
            if (err || !data.length) {
                console.log(err);
                console.log(data.length);
                req.flash('error', 'Invalid address');
                return res.redirect("/campgrounds");
            }
            var lat = data[0].latitude;
            var lng = data[0].longitude;
            var location = data[0].formattedAddress;
            var author = { username: req.user.username, id: req.user._id };
            var newcamp = { name: req.body.name, price: req.body.price, image: req.body.image, description: req.body.description, author: author, location: location, lat: lat, lng: lng };
            Camp.create(newcamp, function(err, newcamp) {
                if (err) {
                    req.flash("error", err.message);
                }
                else {
                    console.log(newcamp);
                    console.log("camp Added In");
                    req.flash("success", "Camp successfully added in!");
                    res.redirect("/campgrounds");
                }
            });
        });
    }
});
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/newcamp");
});

router.get("/:id", function(req, res) {
    Camp.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if (err || !foundCampground) {
            req.flash("error", "Camp Not Found");
            res.redirect("/campgrouds");
        }
        else {
            res.render("campgrounds/show", { campground: foundCampground });
        }
    });

});

router.get("/:id/edit", middleware.isAuthor, function(req, res) {
    Camp.findById(req.params.id, function(err, camp) {
        if (err || !camp) {
            req.flash("error", "Camp Not Found");
            res.redirect("/campgrounds");
        }
        else {
            res.render("campgrounds/campEdit", { campground: camp });
        }
    });

});

router.put("/:id", middleware.isAuthor, function(req, res) {
    geocoder.geocode(req.body.location, function(err, data) {
        if (err || !data.length) {
            req.flash('error', 'Invalid address');
            return res.redirect("/campgrounds");
        }
        req.body.campground.lat = data[0].latitude;
        req.body.campground.lng = data[0].longitude;
        req.body.campground.location = data[0].formattedAddress;
        Camp.findByIdAndUpdate(req.params.id, req.body.campground, function(err, camp) {
            if (err || !camp) {
                req.flash("error", "Camp Not Found");
                res.redirect("/campgrounds");
            }
            else {
                req.flash("success", "Updated Successfully");
                res.redirect("/campgrounds/" + req.params.id);
            }
        });
    });
});
router.delete("/:id", middleware.isAuthor, function(req, res) {
    Camp.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            req.flash("error", err.message);
            res.redirect("/campgrounds");
        }
        else {
            req.flash("success", "Deleted Successfully");
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;
