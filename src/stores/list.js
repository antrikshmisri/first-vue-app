import { defineStore } from "pinia";
import { setLocalStorageItem, getLocalStorageItem } from "../utils/storage.js";
import ERROR_MSGS from '../constants/errors.js';
import { LIST_ITEMS_KEY } from "../constants/storage.js";

const {COMPOSABLE_INPUT: {NO_INPUT_VALUE: emptyInputErrorMsg}} = ERROR_MSGS;

export const useListStore = defineStore('list', {
    id: 'list',
    state: () => ({
        list: [],
        localStorageKey: LIST_ITEMS_KEY,
        isLoading: false
    }),

    /**
     * Actions related to the list store
     */
    actions: {
        /**
         * Get the list data from local storage
         */
        getListData() {
            this.isLoading = true;

            const list = getLocalStorageItem(this.localStorageKey);

            this.list = list || [];
            this.isLoading = false;
        },
        /**
         * Make updates to the list local storage record
         */
        _updateLocalStorage() {
            setLocalStorageItem(this.localStorageKey, this.list);
        },

        /**
         * Add multiple items to the list
         * @param {Array} items - The items to add to the list
         * @returns {void}
         */
        addItems(items) {
            if (!items && !items.length) {
                return
            }

            this.list = [...this.list, ...items];
            this._updateLocalStorage();
        },

        /**
         * Add a new item to the list
         * @param {string} value - The value to add to the list
         * @returns {void}
         */
        add(value="") {
            const listItem = {
                id: Math.random(),
                name: value,
                finished: false
            }

            this.list.push(listItem);
            this._updateLocalStorage();
        },

        /**
         * Remove an item from the list
         * @param {number} id - The id of the item to remove
         * @returns {void}
         */
        remove(id) {
            // update the store state
            this.list = this.list.filter(item => item.id !== id)

            // update the local storage record
            this._updateLocalStorage();
        },

        /**
         * Update an item in the list
         * @param {number} id - The id of the item to update
         * @param {object} updates - The updates to apply to the item
         * @param {string} updates.name - The new name of the item
         * @param {boolean} updates.finished - The new finished state of the item
         * @returns {void}
         */
        update(id, updates) {
            const {name, finished} = updates;

            if (typeof name === 'string' && !name.length) {
                throw new Error(emptyInputErrorMsg);
            }

            // update the store state
            this.list = this.list.map((item) => {
                if (item.id !== id) {
                    return item
                }

                !!name && (item.name = name);
                !!finished && (item.finished = finished);
                return item;
            })

            // update the local storage record
            this._updateLocalStorage();
        },

        $reset() {
            this.list = [];
            this._updateLocalStorage();
        }
    }
})