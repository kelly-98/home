import { logger } from "../../helpers";

export const registerClickEventListener = ({
    root,
    onEvent,
}: {
    root: HTMLElement;
    onEvent: (data: { cssClass?: string; cssId?: string }) => void;
}) => {
    root.addEventListener("pointerdown", async (event: Event) => {
        const target = event.target as HTMLElement;
        logger.info("pointerdown", { target });
        const element =
            target.closest("a") || target.closest("button") || target;
        logger.info("pointerdown", { element });
        if (
            (!element.id && !element.className) ||
            element.className === "w-dyn-item" ||
            ["input"].includes(element.tagName.toLowerCase())
        ) {
            logger.info("pointerdown", "w-dyn-item found. Do nothing.");
            return;
        }
        onEvent({
            cssClass: element.className || undefined,
            cssId: element.id || undefined,
        });
    });
};
