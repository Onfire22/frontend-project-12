import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

export const useModalValidation = (channels) => {
  const { t } = useTranslation();
  const names = channels.map((channel) => channel.name);
  return yup.object().shape({
    name: yup
      .string()
      .required(t('modals.errors.required'))
      .min(3, t('modals.errors.nameLength'))
      .max(20, t('modals.errors.nameLength'))
      .notOneOf(names, t('modals.errors.unique')),
  });
};

export const useSignUpValidation = () => {
  const { t } = useTranslation();
  return yup.object().shape({
    username: yup
      .string()
      .required(t('forms.errors.required'))
      .min(3, t('forms.errors.login'))
      .max(20, t('forms.errors.login')),
    password: yup
      .string()
      .required(t('forms.errors.required'))
      .min(6, t('forms.errors.password')),
    confirmPassword: yup
      .string()
      .required(t('forms.errors.required'))
      .oneOf([yup.ref('password')], t('forms.errors.passwordConfirm')),
  });
};
