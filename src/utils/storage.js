const getLocalStorageItem = (key) => {
    try {
        const item = localStorage.getItem(key);
        return JSON.parse(item);
    } catch (error) {
        console.log(error);
    }
}

const setLocalStorageItem = (key, value) => {
    try {
        const parsedValue = JSON.stringify(value);
        localStorage.setItem(key, parsedValue);
    } catch (error) {
        console.log(error);
    }
}

export {
    getLocalStorageItem,
    setLocalStorageItem
}