<template>
    <div>
        <label :for="name">{{ label }}</label>
        <div class="input-group d-flex align-items-center trackform-input">
            <input type="text" class="form-control" v-model="value" :id="name" :name="name"
                @change="inputValue($event.target.value)" :required="isRequired" />
            <i class="pi pi-times track-input-field-btn" type="button" @click="clear(value)"></i>
        </div>
    </div>
</template>

<script>
export default {
    name: 'p-input',
    props: {
        
        label: {
            type: String,
            required: true,
            default: '',
        },
        name: {
            type: String,
            required: true,
            default: '',
        },
        isRequired: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    data()
    {
        return {}
    },
    methods: {
        clear(x)
        {
            console.log(x)
        },
        inputValue(res)
        {
            console.log(res)
        },
    },
}
</script>

<style lang="scss" scoped>
/** input field hack to ensure the clear btn within the input fields are always circular **/
.input-group> :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback) {
    margin-left: 0px;
    border-top-left-radius: 100%;
    border-bottom-left-radius: 100%;
}

.trackform-input {
    input {
        padding-right: 40px;
    }

    .track-input-field-btn {
        position: absolute;
        right: 10px;
        margin: 0;
        z-index: 5;
        padding: 4px;
        border: 1px solid #98a2b3;
        border-radius: 100%;
        font-size: 10px;
        background-color: #98a2b3;
        color: white;
    }
}
</style>