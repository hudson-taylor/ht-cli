
"use strict";

var path = require("path");
var fs   = require("fs");
var cp   = require("child_process");

var inquirer = require("inquirer");
var rimraf   = require("rimraf");

var nameQuestion = {
    name: "name",
    message: "What would you like your project to be called?",
    validate: function(input) {
        return /^[a-zA-Z0-9_!]+$/.test(input);
    }
};

var questions = [ nameQuestion ];

inquirer.prompt(questions, function(answers) {

    var name = answers.name;

    var skelPath = path.join(process.cwd(), name);

    if(fs.existsSync(skelPath)) {
        console.error(">> That directory already exists, please select another name.");
        process.exit(1);
    }

    /* Clone the ht-skeleton directory into . */
    cp.exec("git clone https://github.com/hudson-taylor/ht-skeleton.git " + name, function(err) {

        if(err) {
            console.error(">> There was an error cloning the git repository:", err);
            process.exit(1);
        }

        process.chdir(skelPath);

        /* rm -Rf {{name}}/.git */
        rimraf(path.join(skelPath, ".git"), function(err) {

            if(err) {
                console.error(">> There was an error removing .git from the cloned repository:", err);
                process.exit(1);
            }

            console.log(">> Cloned skeleton Hudson-Taylor repository into", name);
            process.exit(0);

        });

    });

});