/**
 * Removes some unwanted characters and seconds indicators for
 * a more clean presentation.
 * @param {String} timestamp Timestamp to format
 */
export function formatTimeStamp(timestamp) {
    let newTime = timestamp.replace(/([A-Z])/g, " ");
    return newTime.slice(0, (newTime.indexOf(".") - 3));
}