/**
 * Returns a wrapper, passing the call to 'method' at maximum once per 'delay' milliseconds.
 * Those calls that fall into the "cooldown" period, are ignored
 *
 * @param {Function} cb callback
 * @param {number} delay - milliseconds
 * @returns {Function} throttled callback
 */
export const throttle = (cb, delay) => {
    let wait = false;
    let savedArgs;
    const wrapper = (...args) => {
        if (wait) {
            savedArgs = args;
            return;
        }

        cb(...args);
        wait = true;

        setTimeout(() => {
            wait = false;
            if (savedArgs) {
                // "savedArgs" might contains few arguments, so it's necessary to use spread operator
                // https://github.com/AdguardTeam/Scriptlets/issues/284#issuecomment-1419464354
                wrapper(...savedArgs);
                savedArgs = null;
            }
        }, delay);
    };
    return wrapper;
};
