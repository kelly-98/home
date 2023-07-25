import { uuid } from "../helpers/uuid";

export const VISITOR_ID_KEY = `nocodelytics:visitor-id`;

export const getVisitorId = async (): Promise<string> => {
    const existingVisitorId =
        localStorage.getItem(VISITOR_ID_KEY) ||
        localStorage.getItem("Nocodelytics:visitor-id"); // for legacy remove in a few months
    if (
        existingVisitorId &&
        existingVisitorId !== "undefined" &&
        existingVisitorId !== "null"
    ) {
        return existingVisitorId;
    }
    const generatedVisitorId = await uuid();
    localStorage.setItem(VISITOR_ID_KEY, generatedVisitorId);
    return generatedVisitorId;
};
