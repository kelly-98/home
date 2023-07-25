import { logger } from "../helpers";
import { toQueryString } from "../helpers/toQueryString";
import { config } from "./config";
import { getMemberstackObject } from "./getMemberstackObject";
import { getOutsetaObject } from "./getOutsetaObject";
import { getVisitorId, VISITOR_ID_KEY } from "./getVisitorId";
import { isMember } from "./isMember";

export type MemberstackObject = {
    information?: {
        id: string;
        email: string;
        "first-name"?: string;
        "last-name"?: string;
        "gdpr-opt-in"?: boolean;
    };
};

export type Memberstack2Object = {
    data?: {
        auth: {
            email: string;
            hasPassword: boolean;
        };
        id: string;
        createdAt: string;
        loginRedirect: string;
        verified: boolean;
    };
};

export type OutsetaObject = {
    Email: string;
    Uid: string;
};

const getOutsetaUser = async (): Promise<{
    Email: string;
    Uid: string;
} | null> => {
    const outsetaObject = await getOutsetaObject({ timeoutInSeconds: 1 });
    if (!outsetaObject) {
        logger.info("outsetaObject not found");
        return null;
    }
    try {
        const outseta = await window.Outseta?.getUser();
        logger.info(`getOutsetaUser:`, outseta);
        return outseta || null;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getMemberstackUser = async (): Promise<{
    data?:
        | {
              auth: {
                  email: string;
                  hasPassword: boolean;
              };
              id: string;
              createdAt: string;
              loginRedirect: string;
              verified: boolean;
          }
        | undefined;
} | null> => {
    const memberstackObject = await getMemberstackObject({
        timeoutInSeconds: 1,
    });
    if (!memberstackObject) {
        logger.info("memberstackObject not found");
        return null;
    }
    try {
        const memberstack = await window.$memberstackDom?.getCurrentMember();
        logger.info(`getMemberstackUser:`, memberstack);
        return memberstack || null;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const setVisitorIdFromRemote = async (): Promise<string | null> => {
    const [outseta, memberstack] = await Promise.all([
        getOutsetaUser(),
        getMemberstackUser(),
    ]);

    if (
        !isMember({ outseta, memberstack: window.memberstack || memberstack })
    ) {
        return null;
    }

    const data = {
        visitorId: await getVisitorId(),
        memberstackId: outseta?.Uid
            ? null
            : memberstack?.data?.id || window.memberstack?.information?.id,
        outsetaId: outseta?.Uid || null,
        emailAddress:
            outseta?.Email ||
            memberstack?.data?.auth?.email ||
            window.memberstack?.information?.email,
    };

    const response = await fetch(
        `${config.app.api.url}/visitor?${toQueryString(data)}`,
    );
    if (response.status >= 400) {
        return null;
    }
    const visitorId = await response.text();
    if (!visitorId) {
        return null;
    }
    localStorage.setItem(VISITOR_ID_KEY, visitorId);
    return visitorId;
};
