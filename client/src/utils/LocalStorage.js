/**
 * Save key and value pair to local storage
 * @param key the key
 * @param value the value
 */
export function saveToLocalStorage(key, value) {
    if (global.localStorage) {
        global.localStorage.setItem(key, JSON.stringify(value));
    }
}

/**
 * Load value from local storage
 * @param key the key
 */
export function loadFromLocalStorage(key) {
    let localStorageItem = {};
    if (global.localStorage) {
        try {
            localStorageItem = JSON.parse(global.localStorage.getItem(key));
        } catch (e) {
            console.log(e);
        }
    }
    return localStorageItem;
}