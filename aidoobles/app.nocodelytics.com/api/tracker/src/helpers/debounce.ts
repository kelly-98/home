// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = (fn: Function, ms = 300): any => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: unknown, ...args: unknown[]) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
};
