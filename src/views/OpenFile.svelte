<script lang="ts">
    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher<{
        file: File
    }>()
    
    let fileInput: HTMLInputElement

    let files: FileList | null = null
    $: file = files && files[0]
    let name = ''

    $: console.log(files);

    $: if (file) {
      dispatch('onFile', { file })
    }
    
    function getFileSize (file: File | null) {
      if (!file) { return 0; }
      return file.size;
    }

    $: fileSize = getFileSize(file);

    const maxFileSize = 50 * 1024 * 1024; // 10 MB
</script>

<!-- <openFile onFile={(e) => { currentFile = e.detail.file; }}> -->

<div>
    File: <br>
    <button 
        class='select-file-button'
        on:click="{() => { fileInput.click() }}"
        >
        {file !== null ? file.name : 'Select file'}
    </button>
    <input 
        class="file-input"
        bind:files={files}
        bind:this={fileInput}
        placeholder="Select file"
        type="file"
        accept=".csv"
        />

    {#if fileSize > maxFileSize}
        <div class="error">
            File size is too big. Max file size is {Math.round(maxFileSize / 1024 / 1024)} MB
        </div>
    {/if}
</div>

<style lang="less">
    .error {
        color: red;
        font-size: medium;
    }

    .file-input {
        display: none;
    }

    .select-file-button {
        width: 100%;
        height: 40px;
        margin-bottom: 3px;
    }
</style>
