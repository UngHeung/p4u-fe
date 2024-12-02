import {
  AlertTypes,
  ReasonTypes,
  StatusTypes,
  TargetTypes,
} from '../const/alertInterface';
import {
  AlertTypeEnum,
  ReasonTypeEnum,
  SolutionTypeEnum,
  TargetTypeEnum,
} from '../enum/alertMessage.enum';

export const generateAlertMessage = ({
  target,
  type,
  status,
  reason,
}: {
  target: TargetTypes;
  type: AlertTypes;
  reason?: ReasonTypes;
  status?: StatusTypes;
}): string => {
  if (type !== 'FAILURE') {
    return `${TargetTypeEnum[target as keyof typeof TargetTypeEnum]} ${AlertTypeEnum[type]}`;
  }

  return status
    ? generateFailureMessage(status, target, reason)
    : `${TargetTypeEnum[target as keyof typeof TargetTypeEnum]} ${AlertTypeEnum[type]}`;
};

const generateFailureMessage = (
  status: StatusTypes,
  target?: TargetTypes,
  reason?: ReasonTypes,
): string => {
  if (status === 400 && reason && target) {
    return `[${TargetTypeEnum[target as keyof typeof TargetTypeEnum]}]\n${ReasonTypeEnum[reason]}\n${SolutionTypeEnum[reason as keyof typeof SolutionTypeEnum]}`;
  }

  if (status === 401 && reason) {
    if (target) {
      return `[${TargetTypeEnum[target as keyof typeof TargetTypeEnum]}]\n${ReasonTypeEnum[reason]}\n${SolutionTypeEnum[reason as keyof typeof SolutionTypeEnum]}`;
    }

    return `${ReasonTypeEnum[reason]}\n${SolutionTypeEnum[reason as keyof typeof SolutionTypeEnum]}`;
  }

  if (status === 403 && reason) {
    return `${ReasonTypeEnum[reason]}`;
  }

  if (status === 404 && target) {
    return `[${TargetTypeEnum[target as keyof typeof TargetTypeEnum]}]\n${ReasonTypeEnum.NOT_FOUND}\n${SolutionTypeEnum.NOT_FOUND}`;
  }

  if (status === 409 && reason && target) {
    return `[${TargetTypeEnum[target as keyof typeof TargetTypeEnum]}]\n${ReasonTypeEnum[reason]}\n${SolutionTypeEnum[reason as keyof typeof SolutionTypeEnum]}`;
  }

  return `${ReasonTypeEnum.INTERNAL_SERVER_ERROR}\n${SolutionTypeEnum.INTERNAL_SERVER_ERROR}`;
};
