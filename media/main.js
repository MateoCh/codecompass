(function(){
    const vscode = acquireVsCodeApi();
    console.log('hello from javascript');
    const button=document.getElementById('button');
    button.innerHTML='hello from javascript';
}());