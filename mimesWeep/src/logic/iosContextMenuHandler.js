/**
 * IOS devices (iPhones, iPads) do not support onContextMenu trigger components.
 * onContextMenu is trigged by a right-click on desktops or long-press on Android devices.
 * This code is a workaround that allows us to differentiate between a tap or a long-press on IOS devices.
 */

// Number of milliseconds that represents a long-press
const longPressDurationMs = 350;

export default class IOSContextMenuHandler {
    constructor(leftClickCallback, rightClickback) {
        this.leftClickCallback = leftClickCallback;
        this.rightClickCallback = rightClickback;
        this.longPressCountdown = null;
        this.longPressOccurred = false;
    }


    // On touch start we kick off a timer that will let us differentiate between a tap or a long-press
    onTouchStart = e => {
        // Prevent any default IOS action, just as open share menu etc.
        e.preventDefault();

        this.longPressOccurred = false;

        // If timer runs out perform long-press action and flag we have done so
        this.longPressCountdown = setTimeout(() => {
            this.longPressOccurred = true;
            this.rightClickCallback();
        }, longPressDurationMs);
    };

    // On move clear the timer
    onTouchMove = e => {
        // Prevent any default IOS action, just as open share menu etc.
        e.preventDefault();

        clearTimeout(this.longPressCountdown);
        this.longPressOccurred = false;
    };

    // On cancel clear the timer
    onTouchCancel = e => {
        // Prevent any default IOS action, just as open share menu etc.
        e.preventDefault();

        clearTimeout(this.longPressCountdown);
        this.longPressOccurred = false;
    };

    // On touch end if long-press was not already triggered then perform tap action.
    // Regardless we clear the timeout and long-press flag.
    onTouchEnd = e => {
        // Prevent any default IOS action, just as open share menu etc.
        e.preventDefault();

        // User did not touch screen for long enough to be considered a long-press so perform tap action
        if (!this.longPressOccurred) {
            this.leftClickCallback();
        }

        clearTimeout(this.longPressCountdown);
        this.longPressOccurred = false;
    };
}
