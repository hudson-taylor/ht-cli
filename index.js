#!/usr/bin/env node

"use strict";

var path = require("path");

var inquirer = require("inquirer");

// Prompt for initial action
var actionQuestion = {
    name: "action",
    type: "list",
    message: "Please choose an action:",
    choices: [
        { value: 1, name: "Start new Hudson-Taylor based project"          }
        // { value: 2, name: "Create a new Hudson-Taylor service"          },
        // { value: 3, name: "Generate documentation for existing service" }
    ]
};

inquirer.prompt([ actionQuestion ], function(answer) {

    var action = answer.action;

    switch(action) {

        case 1: {
            require(path.resolve(__dirname, "actions/new_project"));
            break;
        }

        // case 2: {
        //     require(path.resolve(__dirname, "actions/new_service"));
        //     break;
        // }

        // case 3: {
        //     require(path.resolve(__dirname, "actions/gen_documentation"));
        //     break;
        // }

        default: {
            // I don't think you can get here, anyway.
            console.error("Invalid answer.");
            process.exit(1);
        }

    }

});