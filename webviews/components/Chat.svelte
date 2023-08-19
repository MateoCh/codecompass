<script lang="ts">
    let chat_msg=''
    function send(){
       chat_msg='';
       document.getElementById("chat-input")!.innerHTML='';
    }

</script>
<div id="chat-box">
    <div id="chat-display">

    </div>
    <div id="chat-input-area">
        <textarea name="" id="chat-input" cols="20" rows="5" bind:value={chat_msg}/>
        <button on:click={send}>Send</button>
    </div>
</div>