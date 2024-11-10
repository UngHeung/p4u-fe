export type AlertMessageEnumTypes =
  | "WRONG_ID_OR_PASSWORD"
  | "EMPTY_NAME"
  | "WRONG_NAME_LENGHT"
  | "WRONG_NAME_CHAR_TYPE"
  | "EMPTY_ID"
  | "WRONG_ID_LENGTH"
  | "WRONG_ID_CHAR_TYPE"
  | "EMPTY_PASSWORD"
  | "WRONG_PASSWORD_LENGTH"
  | "WRONG_PASSWORD_CHAR_TYPE"
  | "WRONG_PRAY_TITLE_LENGTH"
  | "WRONG_TAG_LENGTH"
  | "TAG_MAX_COUNT";

export enum ALERT_MESSAGE_ENUM {
  WRONG_ID_OR_PASSWORD = "아이디 또는 비밀번호가 틀립니다.",
  EMPTY_NAME = "이름을 입력해주세요.",
  WRONG_NAME_LENGHT = "이름은 2자~12자로\n입력해주세요.",
  WRONG_NAME_CHAR_TYPE = "이름은 한글, 영문 대소문자만\n입력이 가능합니다.",
  EMPTY_ID = "아이디를 입력해주세요.",
  WRONG_ID_LENGTH = "아이디는 6자~12자로\n입력해주세요.",
  WRONG_ID_CHAR_TYPE = "아이디는 영문 소문자와 숫자만\n입력이 가능합니다.",
  EMPTY_PASSWORD = "비밀번호를 입력해주세요.",
  WRONG_PASSWORD_LENGTH = "비밀번호는 8자~16자로\n입력해주세요.",
  WRONG_PASSWORD_CHAR_TYPE = "비밀번호는 영문 대소문자와 특수문자\n(!@#$%)만 입력이 가능합니다.",
  WRONG_PRAY_TITLE_LENGTH = "기도제목은 2자~15자로\n입력해주세요.",
  WRONG_TAG_LENGTH = "태그는 최소 2자~8자로\n입력해주세요.",
  TAG_MAX_COUNT = "태그는 최대 5개까지\n추가할 수 있습니다.",
}
