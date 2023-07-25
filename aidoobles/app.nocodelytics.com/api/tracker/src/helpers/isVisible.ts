export const isVisible = (elem: HTMLElement): boolean => {
    if (!(elem instanceof Element))
        throw new Error("DomUtil: elem is not an element.");
    const style = getComputedStyle(elem);
    if (style.display === "none") return false;
    if (style.visibility !== "visible") return false;
    if (Number.parseInt(style.opacity, 10) < 0.1) return false;
    if (
        elem.offsetWidth +
            elem.offsetHeight +
            elem.getBoundingClientRect().height +
            elem.getBoundingClientRect().width ===
        0
    ) {
        return false;
    }
    const elemCenter = {
        x: elem.getBoundingClientRect().left + elem.offsetWidth / 2,
        y: elem.getBoundingClientRect().top + elem.offsetHeight / 2,
    };
    if (elemCenter.x < 0) return false;
    if (
        elemCenter.x >
        (document.documentElement.clientWidth || window.innerWidth)
    )
        return false;
    if (elemCenter.y < 0) return false;
    if (
        elemCenter.y >
        (document.documentElement.clientHeight || window.innerHeight)
    )
        return false;
    let pointContainer = document.elementFromPoint(elemCenter.x, elemCenter.y);
    do {
        if (pointContainer === elem) return true;
    } while (((pointContainer as unknown) = pointContainer?.parentNode));
    return false;
};
