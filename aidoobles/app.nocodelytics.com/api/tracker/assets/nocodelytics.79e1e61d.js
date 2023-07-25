! function(e) {
    "function" == typeof define && define.amd ? define(e) : e()
}((function() {
    "use strict";
    ! function() {
        const e = {};
        try {
            if (process) return process.env = Object.assign({}, process.env), void Object.assign(process.env, e)
        } catch (e) {}
        globalThis.process = {
            env: e
        }
    }();
    const e = (e, t = 300) => {
            let n;
            return function(...o) {
                clearTimeout(n), n = setTimeout((() => e.apply(this, o)), t)
            }
        },
        t = e => !0 === e || "true" === e || "1" === e,
        n = t(process.env.CI),
        o = t(localStorage.getItem("nocodelytics:debug") || ""),
        i = document.querySelector("#nocodelytics-snippet"),
        r = window.__NOCODELYTICS_SITE_ID__ || i ? .dataset.siteId || "";
    if (!r && !n) throw new Error("siteId not found. Make sure you have the latest version of the snippet.");
    const s = {
        app: {
            name: "nocodelytics",
            api: {
                url: (() => {
                    const e = localStorage.getItem("nocodelytics:apiUrl");
                    if ("string" == typeof e) return e;
                    if (window.location.origin.includes("localhost")) return "http://localhost:8001/api/tracker";
                    try {
                        return (i.textContent ? .match(/https:\/\/.*.nocodelytics.com/gi) || [])[0].split("/api")[0] + "/api/tracker"
                    } catch {
                        return "https://app.nocodelytics.com/api/tracker"
                    }
                })()
            },
            siteId: r
        },
        ci: n,
        debug: o
    };
    o && console.info(s);
    const a = (...e) => {
            s.debug && !s.ci && console.info(...e)
        },
        c = (e, t = 300) => {
            let n, o, i;
            return function() {
                const r = this,
                    s = arguments;
                n ? (clearTimeout(o), o = setTimeout((() => {
                    Date.now() - i >= t && (e.apply(r, s), i = Date.now())
                }), Math.max(t - (Date.now() - i), 0))) : (e.apply(r, s), i = Date.now(), n = !0)
            }
        },
        l = [],
        d = c((async () => {
            if (0 === l.length) return;
            const e = await fetch(`${s.app.api.url}/uuid?c=${l.length}`, {
                headers: {
                    Accept: "application/json"
                }
            });
            for (const t of await e.json()) {
                const e = l.pop();
                e && e(t)
            }
        }), 0),
        m = () => {
            const e = new Promise((e => {
                l.push(e)
            }));
            return d(), e
        },
        u = e => {
            const t = e,
                n = new URLSearchParams;
            for (const e of Object.keys(t)) {
                const o = t[e];
                o && n.append(e, o)
            }
            return n.toString()
        },
        w = "nocodelytics:visitor-id",
        p = async () => {
            const e = localStorage.getItem(w) || localStorage.getItem("Nocodelytics:visitor-id");
            if (e && "undefined" !== e && "null" !== e) return e;
            const t = await m();
            return localStorage.setItem(w, t), t
        },
        f = async () => {
            var e;
            if (!await (e = {
                    timeoutInSeconds: 1
                }, new Promise((t => {
                    const n = e ? .timeoutInSeconds || 1;
                    if (window && window.Outseta) return t(window.Outseta);
                    let o = 0;
                    const i = setInterval((() => {
                        o >= n - 1 && (clearInterval(i), t(null)), o += 1, window.Outseta && (clearInterval(i), t(window.Outseta))
                    }), 1e3)
                })))) return a("outsetaObject not found"), null;
            try {
                const e = await (window.Outseta ? .getUser());
                return a("getOutsetaUser:", e), e || null
            } catch (e) {
                return console.error(e), null
            }
        },
        y = async () => {
            var e;
            if (!await (e = {
                    timeoutInSeconds: 1
                }, new Promise((t => {
                    const n = e ? .timeoutInSeconds || 1;
                    if (window && window.$memberstackDom) return t(window.$memberstackDom);
                    let o = 0;
                    const i = setInterval((() => {
                        o >= n - 1 && (clearInterval(i), t(null)), o += 1, window.$memberstackDom && (clearInterval(i), t(window.$memberstackDom))
                    }), 1e3)
                })))) return a("memberstackObject not found"), null;
            try {
                const e = await (window.$memberstackDom ? .getCurrentMember());
                return a("getMemberstackUser:", e), e || null
            } catch (e) {
                return console.error(e), null
            }
        },
        g = async () => {
            const [e, t] = await Promise.all([f(), y()]);
            if (!(({
                    memberstack: e,
                    outseta: t
                }) => {
                    try {
                        return !!e ? .data || !!e ? .information ? .id || !!t
                    } catch (e) {
                        return console.error(e), !1
                    }
                })({
                    outseta: e,
                    memberstack: window.memberstack || t
                })) return null;
            const n = {
                    visitorId: await p(),
                    memberstackId: e ? .Uid ? null : t ? .data ? .id || window.memberstack ? .information ? .id,
                    outsetaId: e ? .Uid || null,
                    emailAddress: e ? .Email || t ? .data ? .auth ? .email || window.memberstack ? .information ? .email
                },
                o = await fetch(`${s.app.api.url}/visitor?${u(n)}`);
            if (o.status >= 400) return null;
            const i = await o.text();
            return i ? (localStorage.setItem(w, i), i) : null
        };
    var v, h;
    ! function(e) {
        e.Click = "click", e.Cms = "cms", e.Keyboard = "keyboard", e.View = "view", e.Form = "form"
    }(v || (v = {})),
    function(e) {
        e.Display = "display", e.Interact = "interact", e.Submit = "submit"
    }(h || (h = {}));
    const I = {
            [v.Click]: "c",
            [v.Cms]: "m",
            [v.Form]: "f",
            [v.Keyboard]: "k",
            [v.View]: "v"
        },
        b = {
            [h.Display]: "d",
            [h.Interact]: "i",
            [h.Submit]: "s"
        },
        S = async e => {
            const t = {
                id: e.id,
                s: s.app.siteId,
                t: I[e.eventType],
                p: window.location.pathname + window.location.search,
                c: e.cssClass,
                i: e.cssId,
                va: e.value,
                v: await p(),
                r: document.referrer,
                f: e.formStage && b[e.formStage],
                is: e.cmsItemSlug,
                cl: e.cmsListIndex ? .toString(),
                ci: e.cmsItemIndex ? .toString(),
                d: document.location.hostname
            };
            await fetch(`${s.app.api.url}/n?${u(t)}`, {
                cache: "no-cache",
                credentials: "omit"
            })
        },
        k = [],
        E = async (t, n) => {
            if (!t.id || k.includes(t.id) || !(e => {
                    if (!(e instanceof Element)) throw new Error("DomUtil: elem is not an element.");
                    const t = getComputedStyle(e);
                    if ("none" === t.display) return !1;
                    if ("visible" !== t.visibility) return !1;
                    if (Number.parseInt(t.opacity, 10) < .1) return !1;
                    if (e.offsetWidth + e.offsetHeight + e.getBoundingClientRect().height + e.getBoundingClientRect().width === 0) return !1;
                    const n = {
                        x: e.getBoundingClientRect().left + e.offsetWidth / 2,
                        y: e.getBoundingClientRect().top + e.offsetHeight / 2
                    };
                    if (n.x < 0) return !1;
                    if (n.x > (document.documentElement.clientWidth || window.innerWidth)) return !1;
                    if (n.y < 0) return !1;
                    if (n.y > (document.documentElement.clientHeight || window.innerHeight)) return !1;
                    let o = document.elementFromPoint(n.x, n.y);
                    do {
                        if (o === e) return !0
                    } while (o = o ? .parentNode);
                    return !1
                })(t)) return;
            let o = await m();
            const i = t.id;
            n.onChange({
                id: o,
                cssId: i,
                formStage: h.Display
            }), k.push(t.id);
            let r = !1;
            const s = {
                    cssId: t.id
                },
                c = [...document.querySelectorAll("input[type=password]")].map((e => e.name));
            a("registerFormEventsListener", {
                passwordInputNames: c,
                metricEvent: s
            });
            const l = e((() => {
                    r || n.onChange({
                        id: o,
                        cssId: t.id,
                        formStage: h.Interact
                    })
                })),
                d = () => {
                    r || (r = !0, setTimeout((async () => {
                        r = !1, o = await m()
                    }), 1e3), n.onChange({
                        id: o,
                        cssId: t.id,
                        formStage: h.Submit
                    }))
                };
            t.addEventListener("keydown", (() => l(t))), t.addEventListener("click", (() => l(t))), t.addEventListener("change", (() => l(t)));
            for (const e of ["input[type=submit]", "button[type=submit]"])
                for (const n of t.querySelectorAll(e)) a("registerFormEventsListener", {
                    submitBtn: n
                }), n.addEventListener("click", (() => d())), n.addEventListener("pointerdown", (() => d()));
            t.addEventListener("submit", (() => d()))
        },
        C = e => {
            for (const t of e.root.querySelectorAll("form")) E(t, e)
        },
        x = async t => {
            await g(), S({
                eventType: v.View
            }), (e => {
                a("registerFormEventsListener", e.root.querySelectorAll("form"));
                const {
                    root: t
                } = e;
                new MutationObserver(c((() => {
                    C(e)
                }), 1e3)).observe(t, {
                    attributes: !0,
                    childList: !0,
                    characterData: !0,
                    subtree: !0
                }), C(e)
            })({
                root: t,
                onChange: e => S({
                    eventType: v.Form,
                    ...e
                })
            }), (({
                root: e,
                onEvent: t
            }) => {
                e.addEventListener("pointerdown", (async e => {
                    const n = e.target;
                    a("pointerdown", {
                        target: n
                    });
                    const o = n.closest("a") || n.closest("button") || n;
                    a("pointerdown", {
                        element: o
                    }), !o.id && !o.className || "w-dyn-item" === o.className || ["input"].includes(o.tagName.toLowerCase()) ? a("pointerdown", "w-dyn-item found. Do nothing.") : t({
                        cssClass: o.className || void 0,
                        cssId: o.id || void 0
                    })
                }))
            })({
                root: t,
                onEvent: e => S({
                    eventType: v.Click,
                    ...e
                })
            }), (({
                root: t,
                onEvent: n
            }) => {
                for (const [o, i] of t.querySelectorAll(".w-dyn-list").entries()) {
                    a("registerCmsEventClick", {
                        listIndex: o,
                        listElement: i
                    });
                    for (const [t, r] of i.querySelectorAll(".w-dyn-item").entries()) a("registerCmsEventClick", {
                        itemIndex: t,
                        itemElement: r
                    }), r.addEventListener("pointerdown", e((() => {
                        const e = i.className.split(" ").find((e => e.startsWith("nocodelytics-"))) ? .trim(),
                            s = r.querySelector("input.nocodelytics-list-item") ? .value;
                        n({
                            listIndex: o,
                            itemIndex: t,
                            collectionCssClass: e,
                            collectionItemSlug: s
                        })
                    })))
                }
            })({
                root: t,
                onEvent: ({
                    collectionCssClass: e,
                    collectionItemSlug: t,
                    itemIndex: n,
                    listIndex: o
                }) => S({
                    eventType: v.Cms,
                    cssClass: e,
                    cmsItemSlug: t,
                    cmsListIndex: o,
                    cmsItemIndex: n
                })
            }), (async ({
                root: t,
                onEvent: n
            }) => {
                a("registerKeyboardEventsListener");
                const o = [...t.querySelectorAll("input")].filter((e => !e.type || ["color", "date", "datetime-local", "email", "month", "number", "range", "search", "tel", "text", "time", "url", "week"].includes(e.type)));
                a({
                    inputElements: o
                });
                const i = await Promise.all(o.map((() => m())));
                a("fetching uuids for keyboard events", i);
                for (const [t, r] of o.entries())
                    if (!r.type || ["color", "date", "datetime-local", "email", "month", "number", "range", "search", "tel", "text", "time", "url", "week"].includes(r.type)) {
                        a("registerKeyboardEventsListener", {
                            inputElement: r
                        });
                        let o = i[t];
                        r.addEventListener("keyup", e((async e => {
                            const {
                                id: t,
                                className: i,
                                value: s
                            } = e.target;
                            (t || i) && ("" !== s ? (a("registerKeyboardEventsListener", r, "change", s), n({
                                eventId: o,
                                cssId: t,
                                cssClass: i,
                                value: s
                            })) : o = await m())
                        })))
                    } else a(r, "rejected")
            })({
                root: t,
                onEvent: async e => S({
                    id: e.eventId,
                    eventType: v.Keyboard,
                    ...e
                })
            })
        };
    (async () => {
        localStorage.getItem("nocodelytics:disabled") || (navigator.doNotTrack || window.external && "msTrackingProtectionEnabled" in window.external) && ("yes" == navigator.doNotTrack || "1" == navigator.doNotTrack) || await x(document.body)
    })()
}));
//# sourceMappingURL=nocodelytics.79e1e61d.js.map