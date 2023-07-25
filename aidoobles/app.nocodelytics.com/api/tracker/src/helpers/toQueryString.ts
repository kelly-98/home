export const toQueryString = (_data: object): string => {
    const data = _data as unknown as { [key: string]: string };
    const searchParams = new URLSearchParams();
    for (const key of Object.keys(data)) {
        const value = data[key];
        if (value) {
            searchParams.append(key, value);
        }
    }
    return searchParams.toString();
};
