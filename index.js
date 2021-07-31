const core = require('@actions/core');
const github = require('@actions/github');
const https = require('https');
const fs = require('fs');
const exec = require('@actions/exec');

try {
    let urlFile = core.getInput('urlFile');
    if (urlFile == '') urlFile = "https://github.com/microsoft/vswhere/releases/download/2.8.4/vswhere.exe";
    let outputFile = core.getInput('outputFile');
    if (outputFile == '') outputFile = "./vswhere.exe";
    const file = fs.createWriteStream(outputFile);
    const request = https.get(urlFile, function(response) {
      response.pipe(file);
    });
    const result = async () => {
        return await exec.exec('./vswhere.exe -latest -requires Microsoft.Component.MSBuild -find MSBuild\\**\\Bin\\MSBuild.exe');
    }
    core.exportVariable('msbuild', 'C:\\Program Files (x86)\\Microsoft Visual Studio\\2019\\Enterprise\\MSBuild\\Current\\bin\\MSBuild.exe');
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);
  } catch (error) {
    core.setFailed(error.message);
  }