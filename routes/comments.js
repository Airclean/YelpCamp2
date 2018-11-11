var express = require("express"),
    router = express.Router({ mergeParams: true }),
    Camp = require("../models/camp.js"),
    Comment = require("../models/comment.js"),
    middleware = require("../middleware/index.js");


router.get("/new", middleware.isLoggedIn, function(req, res) {
    Camp.findById(req.params.id, function(err, camp) {
        if (err) {
            req.flash("error", err.message);
            res.redirect("/campgrounds");
        }
        else {
            res.render("comments/new_comment", { camp: camp });
        }
    })

});

router.post("/", middleware.isLoggedIn, function(req, res) { //Create new comment and added in the camp
    Comment.create(req.body.comment, function(err, comment) {
        if (err) {
            res.render("campgrounds/" + req.params.id);
        }
        else {
            Camp.findById(req.params.id, function(err, camp) {
                if (err) {
                    req.flash("error", err.message);
                    res.redirect("/campgrounds");
                }
                else {
                    comment.author.id = req.user.id;
                    comment.author.username = req.user.username;
                    comment.save();
                    camp.comments.push(comment);
                    camp.save();
                    req.flash("success", "New Comment Added In");
                    res.redirect("/campgrounds/" + req.params.id);
                }
            })
        }
    })
});

router.get("/:comment_id/edit", middleware.isCommentAuthor, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, comment) {
        if (err) {
            req.flash("error", err);
        }
        else {
            res.render("comments/edit", { campgroundId: req.params.id, comment: comment });
        }
    })
});

router.put("/:comment_id", middleware.isCommentAuthor, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, comment) {
        if (err) {
            req.flash("error", err.message);
            res.redirect("/campgrounds");
        }
        else {
            req.flash("success", "Comment Updated Successfully!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});

router.delete("/:comment_id", middleware.isCommentAuthor, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if (err) {
            req.flash("error", "Comment Not Found");
            res.redirect("/campgrounds");
        }
        else {
            req.flash("success", "Deleted Successfully!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});

module.exports = router;
