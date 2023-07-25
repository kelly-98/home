import { CI, toBoolean } from "./envVar";

interface Config {
    app: {
        name: string;
        api: {
            url: string;
        };
        siteId: string;
    };
    ci: boolean;
    debug: boolean;
}

const debug = toBoolean(localStorage.getItem("nocodelytics:debug") || "");
const nocodelyticsScriptElement = document.querySelector(
    "#nocodelytics-snippet",
) as HTMLElement;
const siteId =
    window.__NOCODELYTICS_SITE_ID__ ||
    nocodelyticsScriptElement?.dataset.siteId ||
    "";

if (!siteId && !CI) {
    throw new Error(
        "siteId not found. Make sure you have the latest version of the snippet.",
    );
}

const apiUrl = ((): string => {
    const localstorageUrl = localStorage.getItem("nocodelytics:apiUrl");
    if (typeof localstorageUrl === "string") {
        return localstorageUrl;
    }
    if (window.location.origin.includes("localhost")) {
        return "http://localhost:8001/api/tracker";
    }
    try {
        return (
            (nocodelyticsScriptElement.textContent?.match(
                /https:\/\/.*.nocodelytics.com/gi,
            ) || [])[0]!.split("/api")[0] + "/api/tracker"
        );
    } catch {
        return "https://app.nocodelytics.com/api/tracker";
    }
})();

export const config: Config = {
    app: {
        name: "nocodelytics",
        api: {
            url: apiUrl,
        },
        siteId,
    },
    ci: CI,
    debug,
};

if (debug) {
    console.info(config);
}
