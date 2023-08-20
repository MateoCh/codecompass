<script lang="ts">
    import Message from "../classes/Message";
    import MessageView from "./MessageView.svelte";
    let chat_msg=''
    function send(){
       chat_msg='';
       document.getElementById("chat-input")!.innerHTML='';
    }
    let messages:Message[]=[
        new Message('Hello from compass',true),
        new Message(`
            Hello from user
            hello from user
            hello from user
            hello from user
            hello from user
            hello from user
            hello from user
            hello from user
            hello from user
        `,false),
        new Message('Hello from compass',true),
        new Message('Hello from user',false),
        new Message('Hello from compass',true),
        new Message('Hello from user',false),
        new Message('Hello from compass',true),
        new Message('Hello from user',false),
        new Message('Hello from compass',true),
        new Message('Hello from user',false),
        new Message('Hello from compass',true),
        new Message('Hello from user',false),
        new Message('Hello from compass',true),
        new Message('Hello from user',false),
        new Message('Hello from compass',true),
        new Message('Hello from user',false),
        new Message('Hello from compass',true),
        new Message('Hello from user',false),
        new Message('Hello from compass',true),
        new Message('Hello from user',false),
        new Message('Hello from compass',true),
        new Message('Hello from user',false),
        new Message('Hello from compass',true),
        new Message('Hello from user',false),
        new Message('Hello from compass',true),
        new Message('Hello from user',false),
        new Message('Hello from compass',true),
        new Message('Hello from user',false),
        new Message('Hello from compass',true),
        new Message('Hello from user',false),
        new Message('Hello from compass',true),
        new Message('Hello from user',false),
        new Message('Hello from compass',true),
        new Message('Hello from user',false),
        new Message('Hello from compass',true),
        new Message('Hello from user',false),
        new Message('Hello from compass',true),
        new Message('Hello from user',false),
        new Message('Hello from compass',true),
        new Message('Hello from user',false),
        new Message('Hello from compass',true),
        new Message('Hello from user',false)
    ]

</script>
<div id="chat-box">
    <div id="chat-display">
        {#each messages as msg}
            <MessageView message={msg}/>
        {/each}

    </div>
    <div id="chat-input-area">
        <textarea name="" id="chat-input" cols="20" rows="3" bind:value={chat_msg}/>
        <button on:click={send}>
            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M1 1.91L1.78 1.5L15 7.44899V8.3999L1.78 14.33L1 13.91L2.58311 8L1 1.91ZM3.6118 8.5L2.33037 13.1295L13.5 7.8999L2.33037 2.83859L3.6118 7.43874L9 7.5V8.5H3.6118Z"/></svg>
            <!-- <img src="../../media/send.svg" alt="Send"> -->
            <!-- Send -->
        </button>
    </div>
</div>