/**
 * Store for all globally caught errors
 */
import { defineStore } from "pinia";

export const useErrorsStore = defineStore('errors', {
    id: 'errors',
    state: () => ({
        errors: []
    }),
    actions: {
        /**
         * Add an error to the errors store
         * @param {Object} error - The error to add to the store
         * @param {string} error.message - The error message
         * @param {number} error.id - The id of the error
         * @returns {void}
         */
        addError(error) {
            this.errors = [...this.errors, error]; 
        },

        /**
         * Remove an error from the errors store
         * @param {number} id - The id of the error to remove
         * @returns {void}
         */
        removeError(id) {
            this.errors = this.errors.filter(error => error.id !== id);
        },

        /**
         * Clear all errors from the errors store
         */
        clearErrors() {
            this.errors = [];
            this.currentErrorIndex = 0;
        },

        $reset() {
            this.clearErrors();
        }
    }
})