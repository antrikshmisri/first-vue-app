<template>
  <main>
    <h1>Here are your items:</h1>
      <List
        :items="list"
        v-if="list && list.length > 0"
        @item-change="handleListItemChange"
        @item-delete="handleListItemDelete"
      />
      <h1 v-else class="no-items-msg">There are no items in your list!</h1>

    <button class="floating-btn add-item-btn" @click="handleListItemAdd">+</button>
  </main>
  <ErrorToast />
</template>

<script>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import List from '../components/List.vue'
import ErrorToast from '../components/errorToast.vue'
import { useListStore } from '../stores/list'

export default {
  components: {
    List,
    ErrorToast
  },
  setup() {
    const listStore = useListStore()
    const {list} = storeToRefs(listStore)

    /**
     * Handle list item name change.
     * @param {Number} itemId - The id of the item that changed.
     * @param {Object} updates - The updates to apply to the item.
     */
    const handleListItemChange = (itemId, updates) => {
      listStore.update(itemId, updates)
    }

    /**
     * Handle list item deletion.
     * @param {Number} itemId - The id of the item to delete.
     */
    const handleListItemDelete = (itemId) => {
      listStore.remove(itemId)
    }

    /**
     * Handle new list item addition.
     */
    const handleListItemAdd = () => {
      listStore.add()
    }

    // Load stored list on component mount
    onMounted(() => {
      listStore.getListData()
    })

    return {
      list,
      handleListItemChange,
      handleListItemDelete,
      handleListItemAdd
    }
  }
}
</script>

<style scoped>
main {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

h1.no-items-msg {
  color: firebrick;
  margin-left: 1rem;
}

button.floating-btn {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  height: 4rem;
  width: 4rem;
  border-radius: 50%;
  border: none;
  background-color: var(--vt-c-white-mute);
  color: var(--vt-c-black-mute);
  font-size: 2rem;
  cursor: pointer;
}
</style>
