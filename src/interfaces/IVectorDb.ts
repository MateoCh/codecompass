export interface IVectorDb{
    initDb: ()=>Promise<void>;
    query: (vector:number[],numDocs:number)=>Promise<String[]|null>;
    addItem: (vector:number[],metadata:String)=>void;
}