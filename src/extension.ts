// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { PythonShell } from 'python-shell';
// let {PythonShell} = require('python-shell')
import { HelloWorldPanel } from './helloWorldPanel';
import { SidebarProvider } from './SidebarProvider';
import { LocalVectorDbService } from './services/LocalDbService';
import { FileExplorerService } from './services/FileExplorerService';
// import { OpenAI } from "langchain/llms/openai";
// import { OpenAIEmbeddings } from "langchain/embeddings/openai";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
	const db= LocalVectorDbService.instance;
	const fse= FileExplorerService.instance; // Lee archivos
	await db.initDb();
	// fse.printCurDir();
	// fse.changeDir('/Users/mateochaparro/Documents/hackatonDevSavant/codecompass/src');
	// fse.printCurDir();
	// fse.exploreDir();
	console.log('Congratulations, your extension "codecompass" is now active!');
	// const embeddings = new OpenAIEmbeddings();
	// const res = await embeddings.embedQuery("Hello world");
	// console.log(res);
	// const llm = new OpenAI({
	// 	openAIApiKey:'',
	// 	temperature:0.9
	// });
	// const result = await llm.predict("What would be a good company name for a company that makes colorful socks?");
	// console.log(result);

	let pyshell = new PythonShell("C:/Users/lrodr/OneDrive - Universidad de los Andes/laura/2023-2/CodeSavant/codecompass/src/hierarchy.py");
	console.log("Pyshell hierarchy created");
	// sends a message to the Python script via stdin
	pyshell.send("C:/Users/lrodr/OneDrive - Universidad de los Andes/laura/2023-2/CodeSavant/pythonshell/prueba");

	let hierarchy="";
	pyshell.on('message', function (message: string) {
		// received a message sent from the Python script (a simple "print" statement)
		console.log(message);
		hierarchy = hierarchy+ message;
		// console.log(hierarchy);
	});
	// end the input stream and allow the process to exit
	pyshell.end(function (err,code,signal) {
		if (err) throw err;
		console.log('The exit code was: ' + code);
		console.log('The exit signal was: ' + signal);
		console.log('finished');

	});

	let pyshell2 = new PythonShell('C:/Users/lrodr/OneDrive - Universidad de los Andes/laura/2023-2/CodeSavant/codecompass/src/qa.py');

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
