import { debounce, logger, throttle } from "../../helpers";
import { isVisible } from "../../helpers/isVisible";
import { uuid } from "../../helpers/uuid";
import { FormStage } from "../../sendEvent";

interface RegisterFormEventsListenerParams {
    root: HTMLElement;
    onChange: (data: {
        id: string;
        cssId: string;
        formStage: FormStage;
    }) => void;
}

export const registeredForms: string[] = [];

export const registerFormEvent = async (
    form: HTMLFormElement,
    params: RegisterFormEventsListenerParams,
) => {
    if (!form.id || registeredForms.includes(form.id) || !isVisible(form)) {
        return;
    }
    let id = await uuid();
    const cssId = form.id;
    // view the form
    params.onChange({ id, cssId, formStage: FormStage.Display });

    registeredForms.push(form.id); // make sure we don't register twice
    let submitted = false;
    const metricEvent = {
        cssId: form.id,
    };
    const passwordInputNames: string[] = [
        ...document.querySelectorAll("input[type=password]"),
    ].map((inputElement) => (inputElement as HTMLInputElement).name);

    logger.info("registerFormEventsListener", {
        passwordInputNames,
        metricEvent,
    });

    const handleEventChange = debounce(() => {
        if (submitted) {
            return;
        }
        params.onChange({ id, cssId: form.id, formStage: FormStage.Interact });
    });
    const handleSubmit = () => {
        if (submitted) {
            return;
        }
        submitted = true;
        setTimeout(async () => {
            submitted = false;
            id = await uuid();
        }, 1000);
        params.onChange({ id, cssId: form.id, formStage: FormStage.Submit });
    };

    form.addEventListener("keydown", () => handleEventChange(form));
    form.addEventListener("click", () => handleEventChange(form));
    form.addEventListener("change", () => handleEventChange(form));

    for (const cssSelector of ["input[type=submit]", "button[type=submit]"]) {
        for (const submitBtn of form.querySelectorAll(cssSelector)) {
            logger.info("registerFormEventsListener", { submitBtn });
            submitBtn.addEventListener("click", () => handleSubmit());
            submitBtn.addEventListener("pointerdown", () => handleSubmit());
        }
    }
    form.addEventListener("submit", () => handleSubmit());
};

const registerAllForms = (params: RegisterFormEventsListenerParams) => {
    for (const form of params.root.querySelectorAll("form")) {
        registerFormEvent(form, params);
    }
};

export const registerFormEventsListener = (
    params: RegisterFormEventsListenerParams,
): void => {
    logger.info(
        "registerFormEventsListener",
        params.root.querySelectorAll("form"),
    );
    const { root } = params;
    const observer = new MutationObserver(
        throttle(() => {
            registerAllForms(params);
        }, 1000),
    );
    observer.observe(root, {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true,
    });
    registerAllForms(params);
};
