<template>
    <div class="panel-container show">
        <div :class="panelCardClasses">
            <p class="error-msg">
                {{ errorLabel }}
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            type: {
                type: String,
                default: 'error'
            },
            errorLabel: {
                type: String,
                default: ''
            },
            index: {
                type: Number,
                default: 0
            }
        },
        computed: {
            panelCardClasses() {
                return {
                    'panel-card': true,
                    'error': this.type === 'error',
                    'success': this.type === 'success',
                    'warning': this.type === 'warning',
                }
            }
        },
        methods: {
            handlePanelHide() {
                this.$el.classList.remove('show')
                this.$el.classList.add('hide')
                this.$emit('hide')
            }
        },
        mounted() {
            this.$el.style.bottom = `${this.index * 110}px`

            setTimeout(() => {
                this.handlePanelHide()
            }, 3000);
        }
    }
</script>

<style scoped>
    .panel-container {
        position: absolute;
        bottom: 0;
        right: 0;

        min-width: 300px;
        max-width: 400px;
        height: 100px;

        margin: 0 20px 20px 0;
        padding: 20px;

        border-radius: 5px;
        justify-content: center;
        align-items: center;
    }

    .panel-card {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;

        width: 100%;
        height: 100%;

        margin: 0 20px 20px 0;
        padding: 20px;

        border-radius: 5px;
        justify-content: center;
        align-items: center;

        background-color: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        transition: all 0.5s ease-in-out;
    }

    .panel-card.hide {
        opacity: 0;
        transform: translateY(100%);
    }

    .panel-card.show {
        opacity: 1;
        transform: translateY(0);
    }

    .panel-card.error {
        border-left: 5px solid #f44336;
    }

    .panel-card.success {
        border-left: 5px solid #4caf50;
    }

    .panel-card.warning {
        border-left: 5px solid #ff9800;
    }

    p.error-msg {
        font-size: 1.2rem;
        font-weight: 500;
        color: firebrick;
    }
</style>