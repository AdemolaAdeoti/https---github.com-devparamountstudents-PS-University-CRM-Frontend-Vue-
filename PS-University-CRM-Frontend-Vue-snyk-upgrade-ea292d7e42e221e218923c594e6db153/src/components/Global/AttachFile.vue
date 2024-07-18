<template>
    <div style="
                  position: relative;
                  cursor: pointer;
                  border: solid 1px #efefef;
                  border-radius: 10px;
                  display: flex;
                  justify-content: center;
                  padding: 0.8em;
                  width: 175px;
                  background-color: #fff;
                  gap: 10px;
                ">
        <div id="doc-actions">
            <div>
                <button>view</button>
            </div>
            <div>
                <button>delete</button>
            </div>
        </div>
        <div>
            <img :src="require(`@/assets/images/pdf_icon.png`)" />
        </div>
        <div style="font-size: 12px">
            <div style="
                      width: 100px;
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                    ">
                {{ file.name }}
            </div>
            <div>{{ file.size }} MB</div>
        </div>
    </div>

</template>

<script>
export default {
    name: 'PAttachFile',
    props: ['file'],
    data() {
    return {
    
    };
  },

}
</script>


<style>

</style>