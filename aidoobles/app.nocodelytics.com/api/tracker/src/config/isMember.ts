import {
    Memberstack2Object,
    MemberstackObject,
    OutsetaObject,
} from "./setVisitorIdFromRemote";

interface IsMemberParams {
    memberstack?: MemberstackObject | Memberstack2Object | null;
    outseta?: OutsetaObject | null;
}

export const isMember = ({ memberstack, outseta }: IsMemberParams): Boolean => {
    try {
        if ((memberstack as Memberstack2Object)?.data) {
            return true;
        }
        if ((memberstack as MemberstackObject)?.information?.id) {
            return true;
        }
        if (outseta) {
            return true;
        }
        return false;
    } catch (error) {
        console.error(error);
        return false;
    }
};
