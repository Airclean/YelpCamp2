var Camp = require("../models/camp.js");
var Comment = require("../models/comment.js");
var middlewareObject = {};
middlewareObject.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "Please Login First!");
    res.redirect("/login");
};

middlewareObject.isAuthor = function(req, res, next) {
    if (req.isAuthenticated()) {
        Camp.findById(req.params.id, function(err, camp) {
            if (err || !camp) {
                console.log(err);
                req.flash("error", "Camp Not Found");
                res.redirect("/campgrounds");
            }
            else {
                if (camp.author.id.equals(req.user._id)) {
                    next();
                }
                else {
                    req.flash("error", "You are not authorized!");
                    res.redirect("/campgrounds");
                }
            }
        })
    }
    else {
        req.flash("error", "You should login first!");
        res.redirect("/campgrounds");
    }
};

middlewareObject.isCommentAuthor = function(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, comment) {
            if (err || !comment) {
                req.flash("error", "Comment Not Found");
            }
            else {
                if (comment.author.id.equals(req.user._id)) { //req.user._id is string, comment.author.id is an object
                    next();
                }
                else {
                    req.flash("err", "You are not authorized!");
                    res.redirect("/campgrounds");
                }
            }
        })
    }
    else {
        req.flash("err", "You should login first!")
        res.redirect("/campgrounds");
    }
};

module.exports = middlewareObject;
