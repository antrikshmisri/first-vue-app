<template>
  <ul>
    <li v-for="item in items" :key="item.id" class="item-list">
      <ComposableInput
        :class="_getItemClass(item)"
        @submit="
          (newInputValue) => {
            handleItemNameChange(item.id, newInputValue)
          }
        "
        :storedValue="item.name"
        @update:storedValue="(newValue) => (item.name = newValue)"
      />
      <span class="action-checkbox">
        <input
          type="checkbox"
          v-model="item.finished"
          @change="
            (event) => {
              handleItemCheckboxChange(item.id, event.target.checked)
            }
          "
        />
        <button
          class="delete-btn"
          @click="
            () => {
              handleItemDelete(item.id)
            }
          "
        >
          🗑️
        </button>
      </span>
    </li>
  </ul>
</template>

<script>
import ComposableInput from './composableInput.vue'

export default {
  components: {
    ComposableInput
  },
  props: {
    /**
     * The list of items to display.
     */
    items: {
      type: Array,
      required: true
    }
  },
  setup(props, {emit}) {
    const handleItemChange = (itemId, updates) => {
      emit('item-change', itemId, updates)
    }

    const handleItemNameChange = (itemId, newName) => {
      const updates = {
        name: newName
      }

      handleItemChange(itemId, updates)
    }

    const handleItemCheckboxChange = (itemId, newFinished) => {
      const updates = {
        finished: newFinished
      }

      handleItemChange(itemId, updates)
    }

    const handleItemDelete = (itemId) => {
      emit('item-delete', itemId)
    }

    const _getItemClass = (item) => {
      return {
        finished: item.finished,
        pending: !item.finished
      }
    }

    return {
      handleItemNameChange,
      handleItemCheckboxChange,
      handleItemDelete,
      _getItemClass
    }
  }
}
</script>

<style scoped>
.item-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 200px;
}

.action-checkbox {
  accent-color: aqua;

  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.action-checkbox input {
  size: 1rem;
}

.delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  color: firebrick;
}
</style>
