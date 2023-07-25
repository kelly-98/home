import { CreateEventInput } from "@nocodelytics/shared";

import { config } from "./config";
import { getVisitorId } from "./config/getVisitorId";
import { toQueryString } from "./helpers/toQueryString";

export enum EventType {
    Click = "click",
    Cms = "cms",
    Keyboard = "keyboard",
    View = "view",
    Form = "form",
}

export enum FormStage {
    Display = "display",
    Interact = "interact",
    Submit = "submit",
}

export interface SendEventParams {
    id?: string;
    eventType: EventType;
    cssClass?: string;
    cssId?: string;
    value?: string;
    formStage?: FormStage;
    cmsItemSlug?: string;
    cmsListIndex?: number;
    cmsItemIndex?: number;
}

const eventTypeMapping: { [key in EventType]: CreateEventInput["t"] } = {
    [EventType.Click]: "c",
    [EventType.Cms]: "m",
    [EventType.Form]: "f",
    [EventType.Keyboard]: "k",
    [EventType.View]: "v",
};

const formStageMapping: { [key in FormStage]: CreateEventInput["f"] } = {
    [FormStage.Display]: "d",
    [FormStage.Interact]: "i",
    [FormStage.Submit]: "s",
};

export const sendEvent = async (params: SendEventParams) => {
    const data: CreateEventInput = {
        id: params.id,
        s: config.app.siteId,
        t: eventTypeMapping[params.eventType],
        p: window.location.pathname + window.location.search,
        c: params.cssClass,
        i: params.cssId,
        va: params.value,
        v: await getVisitorId(),
        r: document.referrer,
        f: params.formStage && formStageMapping[params.formStage],
        is: params.cmsItemSlug,
        cl: params.cmsListIndex?.toString(),
        ci: params.cmsItemIndex?.toString(),
        d: document.location.hostname,
    };

    await fetch(`${config.app.api.url}/n?${toQueryString(data)}`, {
        cache: "no-cache",
        credentials: "omit",
    });
};
