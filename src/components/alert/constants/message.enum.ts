export type ErrorMessageEnumTypes =
  | 'INTERNAL_SERVER_EXCEPTION'
  | 'FORBIDDEN_EXCEPTION'
  | 'UNAUTHENTICATED_EXCEPTION'
  | 'UNAUTHORIZED_EXCEPTION';

export type SuccessMessageEnumTypes =
  | 'SUCCESS_SIGN_IN'
  | 'SUCCESS_SIGN_UP'
  | 'SUCCESS_WRITE_CARD';

export type ValidationMessageEnumTypes =
  | 'EMPTY_NAME'
  | 'EMPTY_ID'
  | 'EMPTY_PASSWORD'
  | 'EMPTY_CARD_TITLE'
  | 'EMPTY_CARD_CONTENT'
  | 'EMPTY_TAG_KEYWORD'
  | 'WRONG_ID'
  | 'WRONG_NAME'
  | 'WRONG_PASSWORD'
  | 'WRONG_CARD_TITLE'
  | 'WRONG_CARD_CONTENT'
  | 'WRONG_EMPTY_CARD_TAGS_LIST'
  | 'WRONG_FULL_CARD_TAGS_LIST'
  | 'WRONG_TAG_KEYWORD'
  | 'WRONG_IS_ALEADY_TAG';

export type FailureMessageEnumTypes =
  | 'FAILURE_CONFLICT_ID'
  | 'FAILURE_CONFLICT_NAME'
  | 'FAILURE_CONFLICT_ACCOUNT';

export enum ERROR_MESSAGE_ENUM {
  INTERNAL_SERVER_EXCEPTION = '서버에 문제가 발생했습니다.',
  FORBIDDEN_EXCEPTION = '권한이 없습니다.',
  UNAUTHENTICATED_EXCEPTION = '로그인이 필요합니다.',
  UNAUTHORIZED_EXCEPTION = '아이디 또는 비밀번호를 확인해주세요.',

  NOT_FOUND_USER = '존재하지 않는 유저입니다.',
  NOT_FOUND_EMAIL = '존재하지 않는 이메일입니다.',
  NOT_FOUND_RESET_CODE = '존재하지 않는 재설정 코드입니다.',

  UNAUTHORIZED_RESET_CODE = '재설정 코드가 만료되었습니다.',
  UNAUTHORIZED_PASSWORD = '비밀번호가 일치하지 않습니다.',
  UNAUTHORIZED_EMAIL = '이메일이 일치하지 않습니다.',
}

export enum SUCCESS_MESSAGE_ENUM {
  SUCCESS_SIGN_IN = '로그인 성공!\n환영합니다.',
  SUCCESS_SIGN_UP = '회원가입 성공!\n축하합니다.',
  SUCCESS_WRITE_CARD = '카드가 등록되었습니다.',
  SUCCESS_RESET_PASSWORD = '비밀번호가 변경되었습니다.',
}

export enum FAILURE_MESSAGE_ENUM {
  FAILURE_CONFLICT_ID = '이미 가입된 아이디입니다.',
  FAILURE_CONFLICT_NAME = '이미 사용중인 이름입니다.',
  FAILURE_CONFLICT_ACCOUNT = '이미 사용중인 계정입니다.',
}

export enum VALIDATION_MESSAGE_ENUM {
  EMPTY_NAME = '이름을 입력해주세요.',
  EMPTY_ID = '아이디를 입력해주세요.',
  EMPTY_PASSWORD = '비밀번호를 입력해주세요.',
  EMPTY_NEW_PASSWORD = '새로운 비밀번호를 입력해주세요.',
  EMPTY_EMAIL = '이메일을 입력해주세요.',
  EMPTY_CARD_TITLE = '제목을 입력해주세요.',
  EMPTY_CARD_CONTENT = '내용을 입력해주세요.',
  EMPTY_TAG_KEYWORD = '태그는 공백 없이\n최소 2자~8자로 입력해주세요.',
  EMPTY_RESET_CODE = '재설정 코드를 입력해주세요.',

  WRONG_ID = '아이디는 영문 소문자와 숫자\n6자~12자로 입력해주세요.',
  WRONG_NAME = '이름은 한글 또는 영문\n2~12자로 입력해주세요.',
  WRONG_PASSWORD = '비밀번호는 영문 대소문자,\n특수문자 포함 8~16자로 입력해주세요.',
  WRONG_CARD_TITLE = '기도제목은 최소 2자~15자로\n입력해주세요.',
  WRONG_CARD_CONTENT = '기도내용은 최대 500자까지\n입력할 수 있습니다.',
  WRONG_EMPTY_CARD_TAGS_LIST = '태그는 최소 1개 이상 등록해야 합니다.',
  WRONG_FULL_CARD_TAGS_LIST = '태그는 최대 5개까지 등록이 가능합니다.',
  WRONG_TAG_KEYWORD = '태그는 최소 2자~8자로\n입력해주세요.',
  WRONG_IS_ALEADY_TAG = '이미 등록된 태그입니다.',
}

export enum NOTIFICATION_MESSAGE_ENUM {
  NOTIFICATION_SEND_EMAIL_FORGOT_PASSWORD = '비밀번호 변경을 위한\n메일이 전송되었습니다.',
}
