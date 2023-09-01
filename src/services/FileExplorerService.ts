import path = require('path');
import fs = require('fs');

export class FileExplorerService{
    private static _instance= new FileExplorerService();
    static get instance(){return this._instance};

    private dir:string=path.join(__dirname);

    changeDir=(newDir:string)=>this.dir=newDir;
    printCurDir=()=>console.log(this.dir);
    
    readFile(fpath:string){
        fs.readFile(''+fpath,(err,data)=>{
            console.log(data);
        });
    }

    exploreDir({fPaths=[this.dir]}:{fPaths?:string[]}={}){
        fPaths.forEach(fPath=>{
            const results=fs.readdirSync(''+fPath);
            const folders=results.filter(res=>fs.lstatSync(path.resolve(''+fPath,res)).isDirectory());
            const files=results.filter(res=>fs.lstatSync(path.resolve(''+fPath,res)).isFile());
            const innerFolderPaths=folders.map(f=>path.resolve(''+fPath,f));
            if(innerFolderPaths.length!==0){
                innerFolderPaths.forEach(ifp=>console.log(ifp));
                this.exploreDir({fPaths:innerFolderPaths});
            }
            if(files.length!==0){
                files.forEach(f=>console.log(f));
            }
            

        });
        
    }

}