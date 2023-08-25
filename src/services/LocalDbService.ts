import path = require('path');
import { LocalIndex } from 'vectra';
import { IVectorDb } from '../interfaces/IVectorDb';

export class LocalVectorDbService implements IVectorDb{
	private static _instance = new LocalVectorDbService();
	static get instance(){return this._instance;}
	private index:LocalIndex|null=null;

	async initDb():Promise<void>{
		this.index = new LocalIndex(path.join(__dirname, '..', 'vectra_index_db'));
		if (!await this.index.isIndexCreated()) {
			await this.index.createIndex();
		}
	}

	async query(vector:number[],numDocs:number):Promise<String[]|null>{
		let res:String[]=[];
		if(this.index!==null){
			const results = await this.index!.queryItems(vector,numDocs);
			if(results.length>0){
				for(const result of results){
					res.push(String(result.item.metadata.text));
				}
			}
		}
		return res.length>0?res:null;
	}

	addItem(vector: number[], metadata: String):void{
		if(this.index!==null){
			this.index!.insertItem({
				vector:vector,
				metadata: {metadata}
			});
		}
	};





}
