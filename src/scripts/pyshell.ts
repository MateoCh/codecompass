// let {PythonShell} = require('python-shell')
// let {PythonShell} = require('python-shell')
let pyshell = new PythonShell('hierarchy.py');

// sends a message to the Python script via stdin
pyshell.send("C:/Users/lrodr/OneDrive - Universidad de los Andes/laura/2023-2/CodeSavant/pythonshell/prueba");

let hierarchy="";
pyshell.on('message', function (message) {
  // received a message sent from the Python script (a simple "print" statement)
  console.log(message)
  hierarchy = hierarchy+ message
  // console.log(hierarchy);
});
// end the input stream and allow the process to exit
pyshell.end(function (err,code,signal) {
  if (err) throw err;
  console.log('The exit code was: ' + code);
  console.log('The exit signal was: ' + signal);
  console.log('finished');

});

let pyshell2 = new PythonShell('qa.py');

console.log(hierarchy)
// sends a message to the Python script via stdin
pyshell2.send("What food should I give to my dog?");

pyshell2.on('message', function (message) {
  // received a message sent from the Python script (a simple "print" statement)
  let message1 = message;
  console.log(message1);
});

pyshell2.end(function (err,code,signal) {
  if (err) throw err;
  console.log('The exit code was: ' + code);
  console.log('The exit signal was: ' + signal);
  console.log('finished');
});