export type SvgTypes =
  | 'answered'
  | 'checked'
  | 'enter'
  | 'visible'
  | 'tag'
  | 'close'
  | 'heart'
  | 'write'
  | 'delete'
  | 'logout'
  | 'login'
  | 'loading'
  | 'search'
  | 'menu';

export const svgIcons = {
  answered: (color: string = '#ffffff') => (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.8512 2.39999C7.97463 2.39999 2.40002 7.9746 2.40002 14.8512C2.40002 21.7277 7.97463 27.3023 14.8512 27.3023C21.7278 27.3023 27.3024 21.7277 27.3024 14.8512C27.3024 7.9746 21.7278 2.39999 14.8512 2.39999ZM22.0471 12.9129L14.4926 20.468C14.0268 20.9338 13.4074 21.1904 12.7489 21.1904C12.0903 21.1904 11.4709 20.9338 11.0051 20.468L7.6553 17.1182C7.16897 16.6318 6.9012 15.9844 6.9012 15.2953C6.9012 14.6062 7.16897 13.9588 7.6553 13.4725C8.14221 12.9855 8.78967 12.7172 9.47815 12.7172C10.1666 12.7172 10.8141 12.9855 11.301 13.4725L12.7489 14.9197L18.4014 9.26718C18.8883 8.78027 19.5358 8.51191 20.2242 8.51191C20.9127 8.51191 21.5602 8.78027 22.0471 9.26718C22.5334 9.75351 22.8012 10.401 22.8012 11.09C22.8012 11.7791 22.5334 12.4266 22.0471 12.9129Z"
        fill={color}
      />
    </svg>
  ),

  checked: (type: boolean, color: string = '#ff3c3c') =>
    type ? (
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.23125 17.1054L13.7016 25.0132C14.0531 25.3414 14.5172 25.5242 15 25.5242C15.4828 25.5242 15.9469 25.3414 16.2984 25.0132L24.7688 17.1054C26.1938 15.7788 27 13.9179 27 11.9726V11.7007C27 8.42416 24.6328 5.63041 21.4031 5.09135C19.2656 4.7351 17.0906 5.43354 15.5625 6.96166L15 7.52416L14.4375 6.96166C12.9094 5.43354 10.7344 4.7351 8.59688 5.09135C5.36719 5.63041 3 8.42416 3 11.7007V11.9726C3 13.9179 3.80625 15.7788 5.23125 17.1054Z"
          fill={color}
        />
      </svg>
    ) : (
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.5844 24.9396L13.4672 24.8318L5.25469 17.2052C3.81562 15.8693 3 13.9943 3 12.0302V11.8755C3 8.57553 5.34375 5.74428 8.5875 5.12553C10.4344 4.76928 12.3234 5.19584 13.8281 6.25522C14.25 6.55522 14.6438 6.90209 15 7.30053C15.1969 7.07553 15.4078 6.86928 15.6328 6.67709C15.8062 6.52709 15.9844 6.38647 16.1719 6.25522C17.6766 5.19584 19.5656 4.76928 21.4125 5.12084C24.6562 5.73959 27 8.57553 27 11.8755V12.0302C27 13.9943 26.1844 15.8693 24.7453 17.2052L16.5328 24.8318L16.4156 24.9396C16.0313 25.2958 15.525 25.4974 15 25.4974C14.475 25.4974 13.9688 25.3005 13.5844 24.9396ZM14.2078 9.78959C14.1891 9.77553 14.175 9.75678 14.1609 9.73803L13.3266 8.80053L13.3219 8.79584C12.2391 7.58178 10.6031 7.02866 9.00937 7.33334C6.825 7.75053 5.25 9.65366 5.25 11.8755V12.0302C5.25 13.3662 5.80781 14.6458 6.7875 15.5552L15 23.1818L23.2125 15.5552C24.1922 14.6458 24.75 13.3662 24.75 12.0302V11.8755C24.75 9.65834 23.175 7.75053 20.9953 7.33334C19.4016 7.02866 17.7609 7.58647 16.6828 8.79584C16.6828 8.79584 16.6828 8.79584 16.6781 8.80053C16.6734 8.80522 16.6781 8.80053 16.6734 8.80522L15.8391 9.74272C15.825 9.76147 15.8062 9.77553 15.7922 9.79428C15.5812 10.0052 15.2953 10.1224 15 10.1224C14.7047 10.1224 14.4188 10.0052 14.2078 9.79428V9.78959Z"
          fill={color}
        />
      </svg>
    ),

  enter: (size: 'large' | 'medium', color: string = '#ffffff') =>
    size === 'large' ? (
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M25 8.75V10.25C25 12.3502 25 13.4003 24.5913 14.2025C24.2318 14.9081 23.6581 15.4818 22.9525 15.8413C22.1502 16.25 21.1002 16.25 19 16.25H5M5 16.25L10 11.25M5 16.25L10 21.25"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ) : (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.6666 5.83333V6.83333C16.6666 8.23346 16.6666 8.9335 16.3941 9.46833C16.1545 9.93875 15.7721 10.3212 15.3016 10.5608C14.7668 10.8333 14.0668 10.8333 12.6666 10.8333H3.33331M3.33331 10.8333L6.66665 7.49999M3.33331 10.8333L6.66665 14.1667"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),

  write: (color: string = '#ffffff') => (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.5284 5.01667L19.9833 5.47154C20.3367 5.82491 20.3367 6.39632 19.9833 6.74594L18.8893 7.84365L17.1563 6.11062L18.2503 5.01667C18.6036 4.66329 19.175 4.66329 19.5247 5.01667H19.5284ZM10.8369 12.4337L15.8819 7.38502L17.6149 9.11805L12.5662 14.163C12.4572 14.272 12.3219 14.351 12.1752 14.3923L9.97606 15.0201L10.6039 12.8209C10.6452 12.6743 10.7242 12.539 10.8332 12.43L10.8369 12.4337ZM16.9759 3.74227L9.55878 11.1556C9.23172 11.4826 8.99489 11.8849 8.87083 12.3247L7.79567 16.084C7.70545 16.3998 7.79191 16.7381 8.02499 16.9712C8.25807 17.2043 8.5964 17.2907 8.91218 17.2005L12.6715 16.1254C13.1151 15.9975 13.5173 15.7607 13.8406 15.4374L21.2577 8.0241C22.314 6.96774 22.314 5.2535 21.2577 4.19714L20.8028 3.74227C19.7464 2.68591 18.0322 2.68591 16.9759 3.74227ZM6.25812 5.20839C4.43111 5.20839 2.94995 6.68955 2.94995 8.51656V18.7418C2.94995 20.5688 4.43111 22.05 6.25812 22.05H16.4834C18.3104 22.05 19.7916 20.5688 19.7916 18.7418V14.5314C19.7916 14.0314 19.3893 13.6292 18.8893 13.6292C18.3893 13.6292 17.9871 14.0314 17.9871 14.5314V18.7418C17.9871 19.5726 17.3142 20.2455 16.4834 20.2455H6.25812C5.42732 20.2455 4.75441 19.5726 4.75441 18.7418V8.51656C4.75441 7.68576 5.42732 7.01285 6.25812 7.01285H10.4685C10.9685 7.01285 11.3708 6.6106 11.3708 6.11062C11.3708 5.61063 10.9685 5.20839 10.4685 5.20839H6.25812Z"
        fill={color}
      />
    </svg>
  ),

  delete: (color: string = '#DF0C0C') => (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.4167 10.8343C10.7613 10.8343 11.0407 11.1137 11.0407 11.4583V17.7083C11.0407 18.053 10.7613 18.3323 10.4167 18.3323C10.072 18.3323 9.79266 18.053 9.79266 17.7083V11.4583C9.79266 11.1137 10.072 10.8343 10.4167 10.8343Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.49268 11.4583C9.49268 10.948 9.90636 10.5343 10.4167 10.5343C10.927 10.5343 11.3407 10.948 11.3407 11.4583V17.7083C11.3407 18.2186 10.927 18.6323 10.4167 18.6323C9.90636 18.6323 9.49268 18.2186 9.49268 17.7083V11.4583ZM10.4167 11.1343C10.2377 11.1343 10.0927 11.2794 10.0927 11.4583V17.7083C10.0927 17.8873 10.2377 18.0323 10.4167 18.0323C10.5956 18.0323 10.7407 17.8873 10.7407 17.7083V11.4583C10.7407 11.2794 10.5956 11.1343 10.4167 11.1343Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.5834 10.8343C14.928 10.8343 15.2074 11.1137 15.2074 11.4583V17.7083C15.2074 18.053 14.928 18.3323 14.5834 18.3323C14.2387 18.3323 13.9594 18.053 13.9594 17.7083V11.4583C13.9594 11.1137 14.2387 10.8343 14.5834 10.8343Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.6594 11.4583C13.6594 10.948 14.0731 10.5343 14.5834 10.5343C15.0937 10.5343 15.5074 10.948 15.5074 11.4583V17.7083C15.5074 18.2186 15.0937 18.6323 14.5834 18.6323C14.0731 18.6323 13.6594 18.2186 13.6594 17.7083V11.4583ZM14.5834 11.1343C14.4044 11.1343 14.2594 11.2794 14.2594 11.4583V17.7083C14.2594 17.8873 14.4044 18.0323 14.5834 18.0323C14.7623 18.0323 14.9074 17.8873 14.9074 17.7083V11.4583C14.9074 11.2794 14.7623 11.1343 14.5834 11.1343Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.54266 7.29166C3.54266 6.94704 3.82204 6.66766 4.16666 6.66766H20.8333C21.178 6.66766 21.4573 6.94704 21.4573 7.29166C21.4573 7.63629 21.178 7.91566 20.8333 7.91566H4.16666C3.82204 7.91566 3.54266 7.63629 3.54266 7.29166Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.24268 7.29168C3.24268 6.78136 3.65636 6.36768 4.16668 6.36768H20.8333C21.3437 6.36768 21.7573 6.78136 21.7573 7.29168C21.7573 7.80199 21.3437 8.21568 20.8333 8.21568H4.16668C3.65636 8.21568 3.24268 7.80199 3.24268 7.29168ZM4.16668 6.96768C3.98774 6.96768 3.84268 7.11274 3.84268 7.29168C3.84268 7.47062 3.98774 7.61568 4.16668 7.61568H20.8333C21.0123 7.61568 21.1573 7.47062 21.1573 7.29168C21.1573 7.11274 21.0123 6.96768 20.8333 6.96768H4.16668Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.62604 7.29166C5.62604 6.94704 5.90541 6.66766 6.25004 6.66766H18.75C19.0947 6.66766 19.374 6.94704 19.374 7.29166V18.75C19.374 20.8206 17.6956 22.499 15.625 22.499H9.37504C7.30453 22.499 5.62604 20.8206 5.62604 18.75V7.29166ZM6.87404 7.91566V18.75C6.87404 20.1313 7.99377 21.251 9.37504 21.251H15.625C17.0063 21.251 18.126 20.1313 18.126 18.75V7.91566H6.87404Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.32599 7.29168C5.32599 6.78136 5.73968 6.36768 6.24999 6.36768H18.75C19.2603 6.36768 19.674 6.78136 19.674 7.29168V18.75C19.674 20.9863 17.8612 22.799 15.625 22.799H9.37499C7.1388 22.799 5.32599 20.9863 5.32599 18.75V7.29168ZM6.24999 6.96768C6.07105 6.96768 5.92599 7.11274 5.92599 7.29168V18.75C5.92599 20.6549 7.47017 22.199 9.37499 22.199H15.625C17.5299 22.199 19.074 20.6549 19.074 18.75V7.29168C19.074 7.11274 18.9289 6.96768 18.75 6.96768H6.24999ZM6.57399 7.91568C6.57399 7.74999 6.7083 7.61568 6.87399 7.61568H18.126C18.2917 7.61568 18.426 7.74999 18.426 7.91568V18.75C18.426 20.297 17.172 21.551 15.625 21.551H9.37499C7.82804 21.551 6.57399 20.297 6.57399 18.75V7.91568ZM7.17399 8.21568V18.75C7.17399 19.9656 8.1594 20.951 9.37499 20.951H15.625C16.8406 20.951 17.826 19.9656 17.826 18.75V8.21568H7.17399Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.4584 3.74901C10.6524 3.74901 9.99904 4.40237 9.99904 5.20834V6.66767H15.001V5.20834C15.001 4.40237 14.3477 3.74901 13.5417 3.74901H11.4584ZM8.75104 5.20834C8.75104 3.71312 9.96315 2.50101 11.4584 2.50101H13.5417C15.037 2.50101 16.249 3.71313 16.249 5.20834V7.29167C16.249 7.6363 15.9697 7.91567 15.625 7.91567H9.37504C9.03041 7.91567 8.75104 7.6363 8.75104 7.29167V5.20834Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.45099 5.20834C8.45099 3.54743 9.79742 2.201 11.4583 2.201H13.5417C15.2026 2.201 16.549 3.54744 16.549 5.20834V7.29167C16.549 7.80198 16.1353 8.21567 15.625 8.21567H9.37499C8.86468 8.21567 8.45099 7.80198 8.45099 7.29167V5.20834ZM11.4583 2.801C10.1288 2.801 9.05099 3.8788 9.05099 5.20834V7.29167C9.05099 7.47061 9.19605 7.61567 9.37499 7.61567H15.625C15.8039 7.61567 15.949 7.47061 15.949 7.29167V5.20834C15.949 3.87881 14.8712 2.801 13.5417 2.801H11.4583ZM11.4583 4.049C10.818 4.049 10.299 4.56805 10.299 5.20834V6.36767H14.701V5.20834C14.701 4.56805 14.182 4.049 13.5417 4.049H11.4583ZM9.69899 5.20834C9.69899 4.23668 10.4867 3.449 11.4583 3.449H13.5417C14.5133 3.449 15.301 4.23668 15.301 5.20834V6.66767C15.301 6.83336 15.1667 6.96767 15.001 6.96767H9.99899C9.8333 6.96767 9.69899 6.83336 9.69899 6.66767V5.20834Z"
        fill={color}
      />
    </svg>
  ),

  visible: (type: boolean, color: string = '#111111') =>
    type ? (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.99844 3C7.47366 3 5.45196 4.15 3.98021 5.51875C2.51784 6.875 1.5398 8.5 1.07734 9.61562C0.974221 9.8625 0.974221 10.1375 1.07734 10.3844C1.5398 11.5 2.51784 13.125 3.98021 14.4812C5.45196 15.85 7.47366 17 9.99844 17C12.5232 17 14.5449 15.85 16.0167 14.4812C17.479 13.1219 18.4571 11.5 18.9227 10.3844C19.0258 10.1375 19.0258 9.8625 18.9227 9.61562C18.4571 8.5 17.479 6.875 16.0167 5.51875C14.5449 4.15 12.5232 3 9.99844 3ZM5.49883 10C5.49883 8.80653 5.97289 7.66193 6.81673 6.81802C7.66057 5.97411 8.80507 5.5 9.99844 5.5C11.1918 5.5 12.3363 5.97411 13.1801 6.81802C14.024 7.66193 14.498 8.80653 14.498 10C14.498 11.1935 14.024 12.3381 13.1801 13.182C12.3363 14.0259 11.1918 14.5 9.99844 14.5C8.80507 14.5 7.66057 14.0259 6.81673 13.182C5.97289 12.3381 5.49883 11.1935 5.49883 10ZM9.99844 8C9.99844 9.10313 9.10164 10 7.99861 10C7.77676 10 7.56427 9.9625 7.36429 9.89687C7.19243 9.84062 6.99245 9.94688 6.9987 10.1281C7.00807 10.3438 7.03932 10.5594 7.09869 10.775C7.52678 12.375 9.17351 13.325 10.7734 12.8969C12.3732 12.4688 13.3232 10.8219 12.8951 9.22188C12.5482 7.925 11.4014 7.05312 10.1266 7C9.94532 6.99375 9.83908 7.19063 9.89532 7.36562C9.96094 7.56563 9.99844 7.77813 9.99844 8Z"
          fill={color}
        />
      </svg>
    ) : (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.98021 5.51875C5.45196 4.15 7.47366 3 9.99844 3C10.7161 3 11.393 3.0929 12.0283 3.25733L10.7007 5.55513C10.4699 5.51865 10.2351 5.5 9.99844 5.5C8.80507 5.5 7.66057 5.97411 6.81673 6.81802C5.97289 7.66193 5.49883 8.80653 5.49883 10C5.49883 11.035 5.85533 12.0332 6.50032 12.8304L5.04965 15.3563C4.66601 15.0825 4.30936 14.7874 3.98021 14.4812C2.51784 13.125 1.5398 11.5 1.07734 10.3844C0.974221 10.1375 0.974221 9.8625 1.07734 9.61562C1.5398 8.5 2.51784 6.875 3.98021 5.51875Z"
          fill={color}
        />
        <path
          d="M16.0167 14.4812C14.5449 15.85 12.5232 17 9.99844 17C9.42357 17 8.87479 16.9404 8.35264 16.8321L9.70284 14.4903C9.80094 14.4967 9.89952 14.5 9.99844 14.5C11.1918 14.5 12.3363 14.0259 13.1801 13.182C14.024 12.3381 14.498 11.1935 14.498 10C14.498 9.10351 14.2306 8.23461 13.7398 7.5L15.2578 4.87431C15.5251 5.08073 15.7781 5.29687 16.0167 5.51875C17.479 6.875 18.4571 8.5 18.9227 9.61562C19.0258 9.8625 19.0258 10.1375 18.9227 10.3844C18.4571 11.5 17.479 13.1219 16.0167 14.4812Z"
          fill={color}
        />
        <path
          d="M7.36429 9.89687C7.56427 9.9625 7.77676 10 7.99861 10C8.04599 10 8.09298 9.99835 8.13955 9.99509L7.33583 11.3862C7.23662 11.1955 7.15653 10.9912 7.09869 10.775C7.03932 10.5594 7.00807 10.3438 6.9987 10.1281C6.99245 9.94688 7.19243 9.84062 7.36429 9.89687Z"
          fill={color}
        />
        <path
          d="M12.8951 9.22188C13.3232 10.8219 12.3732 12.4688 10.7734 12.8969C10.7134 12.9129 10.6534 12.927 10.5934 12.9392L12.8434 9.04914C12.8622 9.10583 12.8794 9.16342 12.8951 9.22188Z"
          fill={color}
        />
        <path
          d="M12.9075 3.53863L11.6032 5.79591C12.1651 6.01044 12.6833 6.33732 13.1235 6.76241L14.5119 4.35C14.017 4.03523 13.4819 3.75837 12.9075 3.53863Z"
          fill={color}
        />
        <path
          d="M10.8394 7.11762L7.92253 12.1667C8.3673 12.5911 8.93616 12.8728 9.54926 12.9658L12.3398 8.12209C11.9536 7.64003 11.4272 7.28983 10.8394 7.11762Z"
          fill={color}
        />
        <path
          d="M7.16354 13.4946L5.80314 15.8437C6.31303 16.1406 6.86272 16.3958 7.45125 16.5903L8.75691 14.3253C8.1779 14.1591 7.63539 13.8774 7.16354 13.4946Z"
          fill={color}
        />
        <path
          d="M13.7558 1.80913C14.0138 1.36226 14.5852 1.20915 15.0321 1.46715C15.479 1.72515 15.6321 2.29656 15.3741 2.74342L6.46103 18.1812C6.20303 18.6281 5.63163 18.7812 5.18476 18.5232C4.73789 18.2652 4.58478 17.6938 4.84278 17.2469L13.7558 1.80913Z"
          fill={color}
        />
      </svg>
    ),

  tag: (color: string = '#ffffff') => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5793 3.75H14.4849L12.4512 16.123H10.5457L12.5793 3.75ZM5.31616 11.1328H14.9634L14.6387 13.0469H5L5.31616 11.1328ZM8.22144 3.75H10.127L8.10181 16.123H6.18774L8.22144 3.75ZM6.02539 6.82617H15.6726L15.3564 8.74023H5.70923L6.02539 6.82617Z"
        fill={color}
      />
    </svg>
  ),

  close: (color: string = '#ffffff') => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.90076 1.60001C5.31638 1.60001 1.59998 5.31641 1.59998 9.90079C1.59998 14.4852 5.31638 18.2016 9.90076 18.2016C14.4851 18.2016 18.2015 14.4852 18.2015 9.90079C18.2015 5.31641 14.4851 1.60001 9.90076 1.60001ZM13.9863 11.5555C14.6574 12.2266 14.6574 13.3148 13.9863 13.9863C13.3152 14.6574 12.2269 14.6574 11.5554 13.9863L9.90076 12.3316L8.24607 13.9863C7.57498 14.6574 6.48669 14.6574 5.81521 13.9863C5.14412 13.3152 5.14412 12.227 5.81521 11.5555L7.4699 9.90079L5.81521 8.2461C5.14412 7.57501 5.14412 6.48672 5.81521 5.81524C6.4863 5.14415 7.57458 5.14415 8.24607 5.81524L9.90076 7.46993L11.5554 5.81524C12.2265 5.14415 13.3148 5.14415 13.9863 5.81524C14.6574 6.48633 14.6574 7.57462 13.9863 8.2461L12.3312 9.90079L13.9863 11.5555Z"
        fill={color}
      />
    </svg>
  ),

  back: (color: string = '#ffffff') => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.27467 9.86467C2.90844 10.2161 2.90844 10.7867 3.27467 11.1381L7.02485 14.7365C7.39108 15.0878 7.98584 15.0878 8.35207 14.7365C8.7183 14.3851 8.7183 13.8144 8.35207 13.463L6.20157 11.3996H17.0625C17.581 11.3996 18 10.9976 18 10.5C18 10.0024 17.581 9.60042 17.0625 9.60042H6.20157L8.35207 7.53701C8.7183 7.18562 8.7183 6.61495 8.35207 6.26355C7.98584 5.91215 7.39108 5.91215 7.02485 6.26355L3.27467 9.86186V9.86467Z"
        fill={color}
      />
    </svg>
  ),

  heart: (color: string = '#ff3c3c') => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.4875 11.3875L9.13438 16.6594C9.36875 16.8781 9.67812 17 10 17C10.3219 17 10.6313 16.8781 10.8656 16.6594L16.5125 11.3875C17.4625 10.5031 18 9.2625 18 7.96562V7.78437C18 5.6 16.4219 3.7375 14.2688 3.37812C12.8438 3.14062 11.3938 3.60625 10.375 4.625L10 5L9.625 4.625C8.60625 3.60625 7.15625 3.14062 5.73125 3.37812C3.57812 3.7375 2 5.6 2 7.78437V7.96562C2 9.2625 2.5375 10.5031 3.4875 11.3875Z"
        fill={color}
      />
    </svg>
  ),

  logout: (color: string = '#ffffff') => (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.8329 12.9534C21.837 12.9492 21.837 12.9492 21.8412 12.945C21.8538 12.9283 21.8663 12.9158 21.8747 12.8991C21.8788 12.8949 21.8788 12.8907 21.883 12.8865C21.8914 12.8698 21.9039 12.8531 21.9123 12.8364C21.9123 12.8322 21.9164 12.828 21.9164 12.828C21.9248 12.8113 21.9332 12.7946 21.9415 12.7737C21.9415 12.7695 21.9415 12.7695 21.9457 12.7653C21.954 12.7486 21.9582 12.7277 21.9666 12.7068C21.9666 12.7027 21.9666 12.6985 21.9708 12.6985C21.9749 12.6776 21.9833 12.6609 21.9833 12.64C21.9833 12.6316 21.9833 12.6274 21.9875 12.6191C21.9917 12.6024 21.9917 12.5857 21.9958 12.5689C22 12.5439 22 12.523 22 12.4979C22 12.4728 22 12.4519 21.9958 12.4269C21.9958 12.4102 21.9917 12.3934 21.9875 12.3767C21.9875 12.3684 21.9875 12.3642 21.9833 12.3558C21.9791 12.3349 21.9749 12.3182 21.9708 12.2973C21.9708 12.2932 21.9708 12.289 21.9666 12.289C21.9624 12.2681 21.954 12.2514 21.9457 12.2305C21.9457 12.2263 21.9457 12.2263 21.9415 12.2221C21.9332 12.2054 21.9248 12.1845 21.9164 12.1678C21.9164 12.1636 21.9123 12.1594 21.9123 12.1594C21.9039 12.1427 21.8955 12.126 21.883 12.1093C21.8788 12.1051 21.8788 12.1009 21.8747 12.0968C21.8621 12.08 21.8538 12.0633 21.8412 12.0508C21.837 12.0466 21.837 12.0466 21.8329 12.0424C21.8162 12.0257 21.8036 12.0048 21.7827 11.9881L17.6501 7.85968C17.3701 7.57971 16.9147 7.57971 16.6347 7.85968C16.3547 8.13964 16.3547 8.59511 16.6347 8.87507L19.543 11.7834H7.98086C7.5839 11.7834 7.26215 12.1051 7.26215 12.4979C7.26215 12.8949 7.5839 13.2166 7.98086 13.2166H19.5472L16.6598 16.104C16.3798 16.384 16.3798 16.8395 16.6598 17.1194C16.7977 17.2573 16.9815 17.3284 17.1654 17.3284C17.3492 17.3284 17.5331 17.2573 17.671 17.1194L21.7785 13.0119C21.7994 12.9868 21.8162 12.9701 21.8329 12.9534Z"
        fill={color}
        stroke={color}
      />
      <path
        d="M6.89026 3.69781H12.2389C12.6358 3.69781 12.9576 3.37606 12.9576 2.98327C12.9576 2.58631 12.6358 2.26456 12.2389 2.26456H6.89026C4.74665 2.26456 3 4.01121 3 6.15482V18.8452C3 20.9888 4.74665 22.7354 6.89026 22.7354H12.1511C12.5481 22.7354 12.8698 22.4137 12.8698 22.0209C12.8698 21.6239 12.5481 21.3022 12.1511 21.3022H6.89026C5.5364 21.3022 4.43325 20.199 4.43325 18.8452V6.15482C4.43743 4.79678 5.5364 3.69781 6.89026 3.69781Z"
        fill={color}
        stroke={color}
      />
    </svg>
  ),

  login: (color: string = '#ffffff') => (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.5707 12.9753C17.5749 12.9711 17.5749 12.9711 17.5791 12.967C17.5916 12.9502 17.6042 12.9377 17.6125 12.921C17.6167 12.9168 17.6167 12.9126 17.6209 12.9085C17.6292 12.8917 17.6418 12.875 17.6501 12.8583C17.6501 12.8541 17.6543 12.85 17.6543 12.85C17.6627 12.8332 17.671 12.8165 17.6794 12.7956C17.6794 12.7915 17.6794 12.7915 17.6835 12.7873C17.6919 12.7706 17.6961 12.7497 17.7044 12.7288C17.7044 12.7246 17.7044 12.7204 17.7086 12.7204C17.7128 12.6995 17.7212 12.6828 17.7212 12.6619C17.7212 12.6536 17.7212 12.6494 17.7253 12.641C17.7295 12.6243 17.7295 12.6076 17.7337 12.5909C17.7379 12.5658 17.7379 12.5449 17.7379 12.5198C17.7379 12.4948 17.7379 12.4739 17.7337 12.4488C17.7337 12.4321 17.7295 12.4154 17.7253 12.3987C17.7253 12.3903 17.7253 12.3861 17.7212 12.3778C17.717 12.3569 17.7128 12.3402 17.7086 12.3193C17.7086 12.3151 17.7086 12.3109 17.7044 12.3109C17.7003 12.29 17.6919 12.2733 17.6835 12.2524C17.6835 12.2482 17.6835 12.2482 17.6794 12.2441C17.671 12.2273 17.6627 12.2065 17.6543 12.1897C17.6543 12.1856 17.6501 12.1814 17.6501 12.1814C17.6418 12.1647 17.6334 12.148 17.6209 12.1312C17.6167 12.1271 17.6167 12.1229 17.6125 12.1187C17.6 12.102 17.5916 12.0853 17.5791 12.0727C17.5749 12.0686 17.5749 12.0686 17.5707 12.0644C17.554 12.0477 17.5415 12.0268 17.5206 12.0101L13.388 7.88162C13.108 7.60165 12.6525 7.60165 12.3726 7.88162C12.0926 8.16159 12.0926 8.61705 12.3726 8.89702L15.2809 11.8053H3.71872C3.32175 11.8053 3 12.1271 3 12.5198C3 12.9168 3.32175 13.2386 3.71872 13.2386H15.285L12.3976 16.126C12.1177 16.4059 12.1177 16.8614 12.3976 17.1414C12.5355 17.2793 12.7194 17.3503 12.9032 17.3503C13.0871 17.3503 13.271 17.2793 13.4089 17.1414L17.5164 13.0338C17.5373 13.0087 17.554 12.992 17.5707 12.9753Z"
        fill={color}
        stroke={color}
      />
      <path
        d="M18.1097 21.3022L12.7611 21.3022C12.3642 21.3022 12.0424 21.6239 12.0424 22.0167C12.0424 22.4137 12.3642 22.7354 12.7611 22.7354L18.1097 22.7354C20.2534 22.7354 22 20.9888 22 18.8452L22 6.15482C22 4.01121 20.2534 2.26456 18.1097 2.26456L12.8489 2.26456C12.4519 2.26456 12.1302 2.58631 12.1302 2.97909C12.1302 3.37606 12.4519 3.69781 12.8489 3.69781L18.1097 3.69781C19.4636 3.69781 20.5667 4.80096 20.5667 6.15482L20.5667 18.8452C20.5626 20.2032 19.4636 21.3022 18.1097 21.3022Z"
        fill={color}
        stroke={color}
      />
    </svg>
  ),

  loading: (color: string = '#ffffff') => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {' '}
        <path
          d="M20.0001 12C20.0001 13.3811 19.6425 14.7386 18.9623 15.9405C18.282 17.1424 17.3022 18.1477 16.1182 18.8587C14.9341 19.5696 13.5862 19.9619 12.2056 19.9974C10.825 20.0328 9.45873 19.7103 8.23975 19.0612"
          stroke={color}
          strokeWidth="1.488"
          strokeLinecap="round"
        ></path>{' '}
      </g>
    </svg>
  ),

  search: (color: string = '#222222') => (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M25 23.75L20.3713 19.1213M22.7941 13.2721C22.7941 8.70353 19.0906 5 14.5221 5C9.95353 5 6.25 8.70353 6.25 13.2721C6.25 17.8406 9.95353 21.5441 14.5221 21.5441C19.0906 21.5441 22.7941 17.8406 22.7941 13.2721Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  menu: (color: string = '#222222') => (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5 7.29167C11.3494 7.29167 10.4166 6.35893 10.4166 5.20833C10.4166 4.05774 11.3494 3.125 12.5 3.125C13.6506 3.125 14.5833 4.05774 14.5833 5.20833C14.5833 6.35893 13.6506 7.29167 12.5 7.29167Z"
        fill={color}
      />
      <path
        d="M12.5 14.5833C11.3494 14.5833 10.4166 13.6506 10.4166 12.5C10.4166 11.3494 11.3494 10.4167 12.5 10.4167C13.6506 10.4167 14.5833 11.3494 14.5833 12.5C14.5833 13.6506 13.6506 14.5833 12.5 14.5833Z"
        fill={color}
      />
      <path
        d="M12.5 21.875C11.3494 21.875 10.4166 20.9423 10.4166 19.7917C10.4166 18.641 11.3494 17.7083 12.5 17.7083C13.6506 17.7083 14.5833 18.641 14.5833 19.7917C14.5833 20.9423 13.6506 21.875 12.5 21.875Z"
        fill={color}
      />
    </svg>
  ),
};
