<script>
import {blur, fade, fly} from 'svelte/transition';
</script>
<div class="modal-container" in:blur out:fade>
    <div class="modal-content" transition:fly={{ y:500}}>
        <!-- 
        <slot name="header"><p>default text</p></slot>
        <hr>
        <slot name="body"><p>default text</p></slot>
        <hr>
        <slot name="footer"><p>default text</p></slot> 
        -->
        <slot></slot>
    </div>
</div>
