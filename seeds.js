var mongoose = require("mongoose"),
    Camp = require("./models/camp"),
    Comment = require("./models/comment");

var data = [{
        name: "Villa",
        image: "https://images.unsplash.com/photo-1540206458-b0341c457d03?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=baa87575454c1358d201f896a6950c4d&auto=format&fit=crop&w=500&q=60",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "MilkyWay",
        image: "https://images.unsplash.com/photo-1540562553672-061066d38080?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a0988a79dee395b4f738d0752f399296&auto=format&fit=crop&w=500&q=60",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Golden Gate",
        image: "https://images.unsplash.com/photo-1540546582283-4d6d4cd190c7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=507f8392fac41ca980daee81f35edbe7&auto=format&fit=crop&w=500&q=60",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
];

function seedDb() {
    Camp.remove({}, function(err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Camp Removed!");
            Comment.remove({}, function(err) {
                if (err) {
                    console.log(err);
                }
                else {

                }
            });
        }
    });
}

module.exports = seedDb;
