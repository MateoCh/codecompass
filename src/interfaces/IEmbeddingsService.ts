export interface IEmbeddingsService{
    getVector: (text:String)=>Promise<number[]>;
}