export type StatusTypes = 200 | 201 | 400 | 401 | 403 | 404 | 409 | 500;
export type AlertTypes = 'SUCCESS' | 'FAILURE' | 'NOTICE';
export type ReasonTypes =
  | 'BAD_REQUEST'
  | 'NOT_FOUND'
  | 'DUPLICATE'
  | 'FORBIDDEN'
  | 'UNAUTHORIZED'
  | 'ID_OR_PASSWORD'
  | 'INTERNAL_SERVER_ERROR'
  | 'NO_CHANGE'
  | 'NOT_VERIFIED'
  | 'NOT_FOUND_USER'
  | 'TAG_LENGTH'
  | 'TAG_COUNT'
  | 'THANKS_LENGTH';

export type SolutionTypes =
  | 'BAD_REQUEST'
  | 'NOT_FOUND'
  | 'DUPLICATE'
  | 'UNAUTHORIZED'
  | 'ID_OR_PASSWORD'
  | 'INTERNAL_SERVER_ERROR';

export type TargetTypes =
  | 'LOGIN'
  | 'SIGNUP'
  | 'USER'
  | 'ID'
  | 'PASSWORD'
  | 'ID_OR_PASSWORD'
  | 'NAME'
  | 'EMAIL'
  | 'NICKNAME'
  | 'RESET_CODE'
  | 'RESET_PASSWORD'
  | 'EMAIL_VERIFICATION'
  | 'EMAIL_VERIFICATION_CODE'
  | 'NOT_VERIFIED'
  | 'NICKNAME_ACTIVITY'
  | 'NICKNAME_DEACTIVITY'
  | 'NICKNAME_UPDATE'
  | 'MY_INFO_EDIT'
  | 'NO_CHANGE'
  | 'TITLE'
  | 'CONTENT'
  | 'KEYWORDS'
  | 'CARD_WRITE'
  | 'CARD_DELETE'
  | 'CARD_ACTIVATE'
  | 'CARD_DEACTIVATE'
  | 'CARD_REPORT'
  | 'CARD_REPORT_RESET'
  | 'CARD_PICK'
  | 'CARD_TODAY'
  | 'CARD_UNPICK'
  | 'CARD_ANSWERED'
  | 'CARD_ANSWERED_CANCEL'
  | 'TAG'
  | 'THANKS_WRITE'
  | 'THANKS_EDIT'
  | 'THANKS_DELETE'
  | 'THANKS_PICK'
  | 'THANKS_UNPICK'
  | 'THANKS_REACTION'
  | 'THANKS_REACTION_CANCEL';

export interface AlertProps {
  message: string;
  index?: number;
  type: AlertTypes;
  isExiting?: boolean;
}

export interface AlertMessageProps {
  target: TargetTypes;
  type: AlertTypes;
  status?: StatusTypes;
  reason?: ReasonTypes;
}
