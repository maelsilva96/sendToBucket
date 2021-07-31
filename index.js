const core = require('@actions/core');
const github = require('@actions/github');
const https = require('https');
const fs = require('fs');
const exec = require('@actions/exec');

try {
    const urlFile = core.getInput('urlFile');
    const outputFile = core.getInput('outputFile');
    const file = fs.createWriteStream(outputFile);
    const request = https.get(urlFile, function(response) {
      response.pipe(file);
    });
    exec.exec('./vswhere.exe -latest -requires Microsoft.Component.MSBuild -find MSBuild\\**\\Bin\\MSBuild.exe').then((item) => {
        console.log(item);
    }).catch((err) => {
        console.log(err);
    });
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);
  } catch (error) {
    core.setFailed(error.message);
  }