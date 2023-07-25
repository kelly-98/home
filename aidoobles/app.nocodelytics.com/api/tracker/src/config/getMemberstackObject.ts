interface GetMemberstackObjectParams {
    timeoutInSeconds: number;
}

export const getMemberstackObject = (
    params?: GetMemberstackObjectParams,
): Promise<typeof $memberstackDom | null> =>
    new Promise((resolve) => {
        const timeoutInSeconds = params?.timeoutInSeconds || 1;
        if (window && window.$memberstackDom) {
            return resolve(window.$memberstackDom);
        }
        let callCount = 0;

        const interval = setInterval(() => {
            if (callCount >= timeoutInSeconds - 1) {
                clearInterval(interval);
                resolve(null);
            }
            callCount += 1;
            if (window.$memberstackDom) {
                clearInterval(interval);
                resolve(window.$memberstackDom);
            }
        }, 1000);
    });
