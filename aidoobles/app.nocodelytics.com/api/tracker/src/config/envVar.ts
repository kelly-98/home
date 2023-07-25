export const toBoolean = (value?: string | boolean): boolean =>
    value === true || value === "true" || value === "1";

export const CI = toBoolean(process.env.CI);
