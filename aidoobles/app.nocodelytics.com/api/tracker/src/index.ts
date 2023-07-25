import { registerEventsListener } from "./registerEventsListener";

const isDoNotTrackEnabled = (): boolean => {
    if (
        navigator.doNotTrack ||
        // eslint-disable-next-line no-secrets/no-secrets
        (window.external && "msTrackingProtectionEnabled" in window.external)
    ) {
        return navigator.doNotTrack == "yes" || navigator.doNotTrack == "1";
    }
    return false;
};

(async () => {
    if (
        localStorage.getItem("nocodelytics:disabled") ||
        isDoNotTrackEnabled()
    ) {
        return;
    }
    await registerEventsListener(document.body);
})();
