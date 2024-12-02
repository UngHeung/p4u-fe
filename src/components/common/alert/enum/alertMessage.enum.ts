export enum TargetTypeEnum {
  LOGIN = '로그인',
  SIGNUP = '회원가입',
  USER = '유저',
  ID = '아이디',
  PASSWORD = '비밀번호',
  ID_OR_PASSWORD = '아이디 또는 비밀번호',
  NAME = '이름',
  EMAIL = '이메일',
  NICKNAME = '닉네임',
  RESET_PASSWORD = '비밀번호 재설정',
  RESET_CODE = '비밀번호 재설정 코드',
  EMAIL_VERIFICATION = '이메일 인증',
  EMAIL_VERIFICATION_CODE = '이메일 인증 코드',
  NOT_VERIFIED = '이메일 인증 안됨',
  NICKNAME_ACTIVITY = '별명으로 활동',
  NICKNAME_DEACTIVITY = '별명으로 활동 취소',
  NICKNAME_UPDATE = '닉네임 변경',
  MY_INFO_EDIT = '내 정보 수정',
  NO_CHANGE = '변경할 내용이 없습니다.',
  CARD_WRITE = '카드 작성',
  CARD_DELETE = '카드 삭제',
  CARD_ACTIVATE = '카드 활성화',
  CARD_DEACTIVATE = '카드 비활성화',
  CARD_REPORT = '카드 신고',
  CARD_REPORT_RESET = '카드 신고 초기화',
  CARD_PICK = '카드 선택',
  CARD_UNPICK = '카드 선택 취소',
  CARD_ANSWERED = '카드 응답',
  TAG = '태그',
  THANKS_WRITE = '감사 작성',
  THANKS_EDIT = '감사 수정',
  THANKS_DELETE = '감사 삭제',
  THANKS_ACTIVATE = '감사 활성화',
  THANKS_DEACTIVATE = '감사 비활성화',
  THANKS_REPORT = '감사 신고',
  THANKS_REPORT_RESET = '감사 신고 초기화',
  THANKS_REACTION = '리액션',
  THANKS_REACTION_CANCEL = '리액션 취소',
}

export enum AlertTypeEnum {
  SUCCESS = '성공',
  FAILURE = '실패',
  NOTICE = '알림',
}

export enum ReasonTypeEnum {
  BAD_REQUEST = '잘못된 요청입니다.',
  NOT_FOUND = '값이 존재하지 않습니다.',
  DUPLICATE = '이미 존재합니다.',
  FORBIDDEN = '권한이 없는 사용자입니다.',
  UNAUTHORIZED = '인증되지 않은 사용자입니다.',
  WRONG_EMAIL = '이메일 주소가 올바르지 않습니다.',
  WRONG_CODE = '인증 코드가 올바르지 않습니다.',
  ID_OR_PASSWORD = '아이디 또는 비밀번호가 일치하지 않습니다.',
  INTERNAL_SERVER_ERROR = '서버에 문제가 발생했습니다.',
  NOT_VERIFIED = '이메일 인증을 진행해주세요.',
  NO_CHANGE = '변경할 내용이 없습니다.',
  NOT_FOUND_USER = '유저가 존재하지 않습니다.',
}

export enum SolutionTypeEnum {
  BAD_REQUEST = '입력한 값을 확인해주세요.',
  NOT_FOUND = '값을 입력해주세요.',
  DUPLICATE = '새로운 값을 입력해주세요.',
  UNAUTHORIZED = '로그인 후 이용해주세요.',
  ID_OR_PASSWORD = '아이디 또는 비밀번호를 확인해주세요.',
  INTERNAL_SERVER_ERROR = '관리자에게 문의해주세요.',
  NO_CHANGE = '변경후 다시 요청해주세요.',
}
