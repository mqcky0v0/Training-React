import { ActionStatusType, ActorRoleType, AuthorityType } from "..";

export const actionStatusTypeStr = (v: ActionStatusType) => {
  switch (v) {
    case ActionStatusType.UNPROCESSED:
      return "Unprocessed";
    case ActionStatusType.PROCESSING:
      return "Processing";
    case ActionStatusType.PROCESSED:
      return "Processed";
    case ActionStatusType.CANCELLED:
      return "Cancelled";
    default:
      return "Error";
  }
};

export const actorRoleTypeStr = (v: ActorRoleType) => {
  switch (v) {
    case ActorRoleType.USER:
      return "User";
    case ActorRoleType.ADMINISTRATOR:
      return "Admin";
    case ActorRoleType.INTERNAL:
      return "Staff";
    default:
      return "Anonymous";
  }
};

export const authorityTypeStr = (v: AuthorityType) => {
  switch (v) {
    case AuthorityType.ADMIN:
      return "管理者";
    case AuthorityType.USER:
      return "ユーザー";
  }
};
