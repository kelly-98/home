import { debounce, logger } from "../../helpers";

interface RegisterCmsEventClickParams {
    root: HTMLElement;
    onEvent(params: {
        listIndex: number;
        itemIndex: number;
        collectionCssClass?: string;
        collectionItemSlug?: string;
    }): void;
}

export const registerCmsEventClick = ({
    root,
    onEvent,
}: RegisterCmsEventClickParams): void => {
    for (const [listIndex, listElement] of root
        .querySelectorAll(".w-dyn-list")
        .entries()) {
        logger.info("registerCmsEventClick", { listIndex, listElement });

        for (const [itemIndex, itemElement] of (listElement as HTMLElement)
            .querySelectorAll(".w-dyn-item")
            .entries()) {
            logger.info("registerCmsEventClick", { itemIndex, itemElement });

            itemElement.addEventListener(
                "pointerdown",
                debounce(() => {
                    const collectionCssClass = listElement.className
                        .split(" ")
                        .find((className) =>
                            className.startsWith("nocodelytics-"),
                        )
                        ?.trim();
                    const collectionItemSlug = (
                        itemElement.querySelector(
                            "input.nocodelytics-list-item",
                        ) as HTMLInputElement | null
                    )?.value;
                    onEvent({
                        listIndex,
                        itemIndex,
                        collectionCssClass,
                        collectionItemSlug,
                    });
                }),
            );
        }
    }
};
