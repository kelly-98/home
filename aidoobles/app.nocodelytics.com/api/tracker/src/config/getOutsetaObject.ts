interface GetOutsetaObjectParams {
    timeoutInSeconds: number;
}

export const getOutsetaObject = (
    params?: GetOutsetaObjectParams,
): Promise<typeof Outseta | null> =>
    new Promise((resolve) => {
        const timeoutInSeconds = params?.timeoutInSeconds || 1;
        if (window && window.Outseta) {
            return resolve(window.Outseta);
        }
        let callCount = 0;

        const interval = setInterval(() => {
            if (callCount >= timeoutInSeconds - 1) {
                clearInterval(interval);
                resolve(null);
            }
            callCount += 1;
            if (window.Outseta) {
                clearInterval(interval);
                resolve(window.Outseta);
            }
        }, 1000);
    });
