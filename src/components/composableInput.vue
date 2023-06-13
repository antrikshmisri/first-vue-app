<template>
  <div class="input-container">
    <form v-if="isComposing" @submit.prevent="handleConfirmPress">
      <input
        type="text"
        ref="input"
        :value="storedValue"
        @input="handleInput"
        @blur="handleConfirmPress"
        placeholder="Enter a value"
      />
    </form>
    <strong v-else @click="handleInputPress" :class="inputClass">{{ storedValue }}</strong>
    <p class="error-label">{{ errorLabel }}</p>
  </div>
</template>

<script>
export default {
  props: {
    class: {
      type: String,
      default: ''
    },
    storedValue: {
      type: String,
      default: ''
    }
  },
  emits: ['submit', 'update:storedValue'],
  computed: {
    /**
     * Get the input class.
     */
    inputClass() {
      return {
        'input-value': true,
        [this.class]: true
      }
    }
  },
  data() {
    return {
      isComposing: true,
      errorLabel: ''
    }
  },
  mounted() {
    if (this.storedValue) {
      this.isComposing = false
    }
  },
  methods: {
    /**
     * Handle the confirm press event.
     */
    handleConfirmPress() {
      if (!this.storedValue) {
        this.errorLabel = 'Please enter a value'
      }

      this.$emit('submit', this.storedValue)
      this.isComposing = false
    },
    /**
     * Handle the input event.
     */
    handleInput(event) {
      const { value } = event.target

      if (value) {
        this.errorLabel = ''
      }

      /**
       * Emit the update:storedValue event to update the storedValue prop.
       */
      this.$emit('update:storedValue', value)
    },
    handleInputPress() {
      this.isComposing = true
    }
  },
  watch: {
    /**
     * Watch the isComposing property if it changes to true then trigger the focus event
     * on the input element. Because the input element is only rendered when isComposing
     * is true, we need to wait for the next tick to trigger the focus event.
     */
    isComposing(value) {
      if (value) {
        this.$nextTick(() => {
          this.$refs.input.focus()
        })
      }
    }
  }
}
</script>

<style scoped>
input {
  outline: none;
  border: none;
  font-size: 1.5rem;
  padding: 0;
  margin: 0;
  background: transparent;
  color: var(--color-border);

  border-bottom: 1px solid var(--color-border);
}

p.error-label {
  color: firebrick;
}

strong.input-value {
  font-size: 1.5rem;
  cursor: pointer;
}

.finished {
  text-decoration: line-through;
  color: aqua;
}

.pending {
  text-decoration: none;
  color: firebrick;
}
</style>
