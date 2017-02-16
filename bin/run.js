#! /usr/bin/env node
const shell = require("shelljs");
const phantomjs = require('phantomjs');
process.env.PHANTOMJS_EXECUTABLE = phantomjs.path;
const cmdOptions = {
  schema: {
    alias: 'f',
    describe: 'schema file path',
    show: true,
    demand: true
  },
  rebase: {
    alias: 'r',
    describe: 'rebase the screenshots',
    show: true
  },
  nf: {
    alias: 'nf',
    describe: 'a new schema to run tests and compare screenshot results with original schema'
  },
  output: {},
  scenario: {
    alias: 's',
    describe: 'specified scenario to test',
    show: true
  },
  imgdir: {
    alias: 'd',
    describe: 'custom path to save screenshot results',
    show: true
  }
};
const yargs = require('yargs');
Object.keys(cmdOptions).forEach((opt) => {
  if(!cmdOptions[opt].show) {
    return;
  }
  yargs.option(opt, cmdOptions[opt]);
});

const argv = yargs.argv;
let cmd = "$(npm root -g)/vbot/node_modules/casperjs/bin/casperjs test $(npm root -g)/vbot/runner.js";
Object.keys(cmdOptions).forEach((opt) => {
  if (!argv[opt]) {
    return;
  }
  cmd += ' --' + opt + '=' + argv[opt];
});
shell.exec(cmd);
