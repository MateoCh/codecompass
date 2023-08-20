class Message
{
    message: String;
    incoming:boolean;
    
    constructor(message:String,incoming:boolean){
        this.message=message;
        this.incoming=incoming;
    }
}

export default Message;