<script lang="ts">

    import Message from "../classes/Message";
    // import FileSaver from "../classes/FileSaver";
    import MessageView from "./MessageView.svelte";
    import { FastAPIService } from "../classes/FastAPIService";
    
    let chat_msg='';
    let canSend=true;
    const fastAPIService = new FastAPIService();
    let messages:Message[]=[];
    
    // function send(){
    //     canSend=false;
    //     addMsg(chat_msg,false);
    //     chat_msg='';
    //     document.getElementById("chat-input")!.innerHTML='';
    //     setTimeout(()=>receive('Error, no conection'),20000);
    //     addMsg('',true);
    //     loadingMsg(0);
    // }

    async function send() {
            canSend = false;
            addMsg(chat_msg, false);
            chat_msg = '';
            document.getElementById("chat-input")!.innerHTML = '';

            try {
                const response = await fastAPIService.postData({ message: chat_msg });
                const responseData = response.data;
                receive(responseData.message);
            } catch (error) {
                console.error('Error sending message:', error);
                receive('Error, no connection');
            }

            addMsg('', true);
            loadingMsg(0);
    }

    function receive(msg:String){
        removeLastMsg();
        canSend=true;
        addMsg(msg,true);
    }

     // Function to upload a file
    async function uploadFile() {
        const fileInput = document.getElementById("file-input") as HTMLInputElement;
        const file = fileInput.files;

        if (!file) {
            alert("Please select a valid zip file.");
            return;
        }

        try {
        const formData = new FormData();
        formData.append("file", file[0]);

        const response = await fastAPIService.uploadFile(formData);

        // Handle the response from the API as needed
        const responseData = response.data;
        receive(responseData.message);
        } catch (error) {
        console.error("Error uploading file:", error);
        receive("Error uploading file");
        }
    }

    function addMsg(msg:String,incoming:boolean){
        messages=[...messages,new Message(msg,incoming)];
        let chatDisplay=document.getElementById("chat-display");
        setTimeout(()=>chatDisplay!.scrollTop=chatDisplay!.scrollHeight,50);
    }
    function loadingMsg(i:number){
        setTimeout(()=>{ // Revisar si el mensaje ya llego, si ya se escribio el archivo
                if(!canSend){
                    removeLastMsg();
                    addMsg('.'.repeat(i+1),true);
                    loadingMsg((i+1)%3);
                }
            },500);
    }
    let removeLastMsg=()=> messages=[...messages.slice(0,-1)];
    let send_key=(event:KeyboardEvent)=>event.key=='Enter' && canSend?send():null;

</script>
<div id="chat-box">
    <div id="chat-display">
        {#each messages as msg}
            <MessageView message={msg}/>
        {/each}

    </div>
    <div id="chat-input-area">
        <textarea name="" id="chat-input" cols="20" rows="3" bind:value={chat_msg} on:keydown={send_key}/>
        <button on:click={send} disabled='{!canSend}'>
            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                <path d="M1 1.91L1.78 1.5L15 7.44899V8.3999L1.78 14.33L1 13.91L2.58311 8L1 1.91ZM3.6118 8.5L2.33037 13.1295L13.5 7.8999L2.33037 2.83859L3.6118 7.43874L9 7.5V8.5H3.6118Z"/>
            </svg>
        </button>
    </div>
    <div id="file-upload">
        <input type="file" id="file-input" accept=".zip" />
        <button on:click={uploadFile}>Upload File</button>
    </div>
    
</div>