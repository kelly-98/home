import { debounce, logger, uuid } from "../../helpers";

interface RegisterKeyboardEventsListenerParams {
    root: HTMLElement;
    onEvent(params: {
        eventId: string;
        cssId: string;
        cssClass: string;
        value: string;
    }): void;
}

export const registerKeyboardEventsListener = async ({
    root,
    onEvent,
}: RegisterKeyboardEventsListenerParams): Promise<void> => {
    logger.info("registerKeyboardEventsListener");
    const inputElements = [...root.querySelectorAll("input")].filter(
        (inputElement) =>
            !inputElement.type ||
            [
                "color",
                "date",
                "datetime-local",
                "email",
                "month",
                "number",
                "range",
                "search",
                "tel",
                "text",
                "time",
                "url",
                "week",
            ].includes(inputElement.type),
    );
    logger.info({ inputElements });

    const uuids = await Promise.all(inputElements.map(() => uuid()));
    logger.info(`fetching uuids for keyboard events`, uuids);

    for (const [index, inputElement] of inputElements.entries()) {
        if (
            !inputElement.type ||
            [
                "color",
                "date",
                "datetime-local",
                "email",
                "month",
                "number",
                "range",
                "search",
                "tel",
                "text",
                "time",
                "url",
                "week",
            ].includes(inputElement.type)
        ) {
            logger.info("registerKeyboardEventsListener", { inputElement });
            let eventId = uuids[index];
            inputElement.addEventListener(
                "keyup",
                debounce(async (event: Event) => {
                    const {
                        id: cssId,
                        className: cssClass,
                        value,
                    } = event.target as HTMLInputElement;
                    if (!cssId && !cssClass) {
                        return;
                    }
                    if (value === "") {
                        eventId = await uuid();
                        return;
                    }
                    logger.info(
                        "registerKeyboardEventsListener",
                        inputElement,
                        "change",
                        value,
                    );
                    onEvent({
                        eventId,
                        cssId,
                        cssClass,
                        value,
                    });
                }),
            );
        } else {
            logger.info(inputElement, `rejected`);
        }
    }
};
