// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { HelloWorldPanel } from './helloWorldPanel';
import { SidebarProvider } from './SidebarProvider';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "codecompass" is now active!');
	const sidebarProvider = new SidebarProvider(context.extensionUri);
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(
		"codecompass-sidebar",
		sidebarProvider
		)
	);

	let disposable = vscode.commands.registerCommand('codecompass.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from CodeCompass!');
	});

	vscode.commands.registerCommand("codecompass.initChat",()=>{
		HelloWorldPanel.createOrShow(context.extensionUri);
		vscode.window.showInformationMessage('Hi I\'m compass, your personal chatbot assistant, pleased to meet you! :)');
	});
	vscode.commands.registerCommand("codecompass.refresh",async ()=>{
		// HelloWorldPanel.kill();
		// HelloWorldPanel.createOrShow(context.extensionUri);
		await vscode.commands.executeCommand("workbench.action.closeSidebar");
		await vscode.commands.executeCommand("workbench.view.extension.codecompass-sidebar-view");
		// setTimeout(()=>{
		// vscode.commands.executeCommand("workbench.action.webview.openDeveloperTools");
		// },500);
	});
	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
