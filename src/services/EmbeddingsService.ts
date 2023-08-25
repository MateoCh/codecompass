import { IEmbeddingsService } from "../interfaces/IEmbeddingsService";

export class EmbeddingsService implements IEmbeddingsService{
    async getVector(text:String):Promise<number[]>{
        return [];
    }
}