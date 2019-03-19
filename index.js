#!/usr/bin/env node
"use strict";

var inquirer = require("inquirer");
var chalk = require("chalk");

var response = chalk.cyan;

var resume = require("./resume.json");

var resumePrompts = {
  type: "list",
  name: "resumeOptions",
  message: "What would you like to learn about?",
  choices: [...Object.keys(resume), "Exit Resume"]
};

function main() {
  console.log("Hello there 👋 Welcome to Spencer Bramson's resume. Thanks for checking it out!");
  resumeHandler();
}

function resumeHandler() {
  inquirer.prompt(resumePrompts).then(answer => {
    if (answer.resumeOptions == "Exit Resume") {
      return;
    }
    var option = answer.resumeOptions;
    console.log(response("••••••••••••••••••••••••••••••••••••••••"));
    resume[`${option}`].forEach(info => {
      console.log(response("+ " + info));
    });
    console.log(response("••••••••••••••••••••••••••••••••••••••••"));
    // console.log(resume[`${option}`]);
    inquirer
      .prompt({
        type: "list",
        name: "exitBack",
        message: "Go Back or Exit Resume?",
        choices: ["Go Back", "Exit Resume"]
      })
      .then(choice => {
        if (choice.exitBack == "Exit Resume") {
          return;
        } else {
          resumeHandler();
        }
      });
  });
}

main();