<script lang="ts">
    import Message from "../classes/Message";
    export let message:Message;
</script>

<div class="message-div-{message.incoming?'incoming':'outgoing'}">
    {#if !message.incoming}
        <div></div>
    {/if}
    <div class="message-box {message.incoming?'message-incoming':'message-outgoing'}">
        {message.message}
    </div>
    {#if message.incoming}
        <div></div>
    {/if}
</div>