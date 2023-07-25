import { config } from "../config";

export const logger = {
    info: (...args: unknown[]): void => {
        if (config.debug && !config.ci) {
            console.info(...args);
        }
    },
};
