// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "codecompass" is now active!');

	let disposable = vscode.commands.registerCommand('codecompass.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from CodeCompass!');
	});

	vscode.commands.registerCommand("codecompass.initChat",()=>{
		vscode.window.showInformationMessage('Hi I\'m compass, your personal chatbot assistant, pleased to meet you! :)');
	});
	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
