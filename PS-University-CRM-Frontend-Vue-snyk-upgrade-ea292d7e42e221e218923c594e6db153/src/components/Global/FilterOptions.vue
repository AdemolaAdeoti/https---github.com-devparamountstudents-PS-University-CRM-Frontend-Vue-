<template>
    <div id="animatedFilterOptions" class="ps-3 d-flex flex-column w-100">
        <div class="row d-flex justify-content-evenly align-items-center">
            <div class="col-md-3 mb-3 inputGroupContainer">
                <!-- Course first_name -->
                <label style="font-weight: 600 !important" class="mb-1">First Name</label>

                <InputText v-model="filters.first_name" class="w-100" type="text" placeholder="First Name" />
            </div>
            <div class="col-md-3 mb-3 inputGroupContainer">
                <!-- last_name -->
                <label style="font-weight: 600 !important" class="mb-1">Last Name</label>

                <InputText v-model="filters.last_name" class="w-100" type="text" placeholder="Last Name" />
            </div>

            <div class="col-md-3 mb-3 inputGroupContainer">
                <!-- last_name -->
                <label style="font-weight: 600 !important" class="mb-1">Unique ID</label>

                <InputText v-model="filters.unique_id" class="w-100" type="text" placeholder="Unique ID" />
            </div>
            <div class="col-md-3 mb-3 ">
                <div class="col inputGroupContainer">
                    <!-- University Status -->
                    <label style="font-weight: 600 !important" class="mb-1">Status</label>

                    <Dropdown v-model="filters.status" :options="statuses" placeholder="Status" class="w-100" />
                </div>
            </div>
        </div>
        <div class="row mb-3">
            <div class="col-md-5 mb-3 ">
                <label style="font-weight: 600 !important" class="mb-1">Date</label>
                <div class="p-inputgroup flex-1">
                    <span class="p-inputgroup-addon py-0">
                        <Dropdown v-model="filters.created_at[0]"
                            :options="[{ name: 'Greater Than Date', value: '>' }, { name: 'Less Than Date', value: '<' }, { name: 'Equal', value: '=' }]"
                            optionLabel="name" optionValue="value" placeholder="Status" />
                    </span>
                    <Calendar v-model="filters.created_at[1]" dateFormat="dd/mm/yy" />
                    <!--  <input
          v-model="filters.created_at[1]"          
          class="w-100"
          type="date"
          placeholder="Unique ID"
        /> -->
                </div>
            </div>
            <div class="col-md-6 row">
                <div class="col-md-6 d-flex px-0 mb-3" style="place-items: flex-end;justify-content: center;">
                    <button @click="search" class="bg-warning border py-2 px-5 w-75">Search</button>
                </div>
                <div class="col-md-6 d-flex mb-3" style="place-items: flex-end;justify-content: center;">
                    <button @click="cleardata" class="border py-2 px-5 w-75">
                        Clear All</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';
import InputText from 'primevue/inputtext';
export default {
    name: "FilterOptions",
    components: {
        Dropdown,
        Calendar,
        InputText
    },
    props: {
        statuses: Array
    },
    data() {
        return {
            filters: {
                first_name: "",
                last_name: "",
                unique_id: "",
                status: "",
                created_at: ['', '']
            }
        };
    },
    methods: {
        cleardata() {
            this.filters = {
                first_name: "",
                last_name: "",
                unique_id: "",
                status: "",
                created_at: ['', '']
            };
            this.$emit('onSearch', this.filters);
        },
        search() {
            // Perform search logic here
            this.$emit('onSearch', this.filters);
        }
    }
};
</script>


<style scoped>
#animatedFilterOptions {
    animation-name: animate;
    animation-duration: 0.5s;
    animation-timing-function: ease-in-out;
    animation-iteration-count: 1;
}

@keyframes animate {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.inputGroupContainer {
    margin-top: 32px;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.inputTypeText {
    width: 90%;
    padding: 10px 14px 10px 12px;
    border: 0.5px solid #000000;
    border-radius: 4px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type="number"] {
    -moz-appearance: textfield;
}

.inputTypeSelect {
    width: 90%;
    padding: 2px 2px 2px 2px;
    border: 0.5px solid #000000;
    border-radius: 8px;
}
</style>
