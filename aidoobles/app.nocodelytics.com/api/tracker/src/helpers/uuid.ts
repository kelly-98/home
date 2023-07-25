import { config } from "../config";
import { throttle } from "../helpers";

const queries: Array<(value: string | PromiseLike<string>) => void> = [];

const sendRequest = throttle(async () => {
    if (queries.length === 0) {
        return;
    }
    const response = await fetch(
        `${config.app.api.url}/uuid?c=${queries.length}`,
        {
            headers: {
                Accept: "application/json",
            },
        },
    );
    for (const uuid of await response.json()) {
        const resolve = queries.pop();
        resolve && resolve(uuid);
    }
}, 0);

export const uuid = (): Promise<string> => {
    const promise = new Promise<string>((resolve) => {
        queries.push(resolve);
    });
    sendRequest();
    return promise;
};
