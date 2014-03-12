var inquirer = require('inquirer');
var question = {
  type: "list",
  name: "output",
  message: "Launch with:",
  choices: ['file', 'stdout', 'mongodb']
};

inquirer.prompt(question, function (answer) {
  switch (answer.output) {
    case 'file':
      break;
    case 'stdout':
      break;
    case 'mongodb':
      break;
    default:
      throw new Error('Invaild output type.');
  }
});
