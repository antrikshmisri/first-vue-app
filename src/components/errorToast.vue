<template>
    <div v-for="(error, index) in errors" :key="error.id">
        <ErrorPanel
            :type="error.type"
            :errorLabel="error.label"
            :index="index"
            @hide="() => handlePanelHide(error.id)"
        />
    </div>
</template>

<script>
    import {useErrorsStore} from '../stores/errors'
    import {storeToRefs} from 'pinia'

    import ErrorPanel from './panel.vue'

    export default {
        components: {
            ErrorPanel
        },
        setup() {
            const errorsStore = useErrorsStore()
            const {errors} = storeToRefs(errorsStore)

            const handlePanelHide = (errorId) => {
                errorsStore.removeError(errorId)
            }

            return {
                errors,
                handlePanelHide
            }
        }
    }
</script>