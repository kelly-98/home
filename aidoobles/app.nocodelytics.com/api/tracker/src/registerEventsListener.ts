import { setVisitorIdFromRemote } from "./config/setVisitorIdFromRemote";
import {
    registerClickEventListener,
    registerCmsEventClick,
    registerFormEventsListener,
    registerKeyboardEventsListener,
} from "./listeners";
import { EventType, sendEvent } from "./sendEvent";

export const registerEventsListener = async (
    root: HTMLElement,
): Promise<void> => {
    await setVisitorIdFromRemote();
    sendEvent({
        eventType: EventType.View,
    });
    registerFormEventsListener({
        root,
        onChange: (data) => sendEvent({ eventType: EventType.Form, ...data }),
    });
    registerClickEventListener({
        root,
        onEvent: (data) => sendEvent({ eventType: EventType.Click, ...data }),
    });
    registerCmsEventClick({
        root,
        onEvent: ({
            collectionCssClass,
            collectionItemSlug,
            itemIndex,
            listIndex,
        }) =>
            sendEvent({
                eventType: EventType.Cms,
                cssClass: collectionCssClass,
                cmsItemSlug: collectionItemSlug,
                cmsListIndex: listIndex,
                cmsItemIndex: itemIndex,
            }),
    });
    registerKeyboardEventsListener({
        root,
        onEvent: async (params) =>
            sendEvent({
                id: params.eventId,
                eventType: EventType.Keyboard,
                ...params,
            }),
    });
};
