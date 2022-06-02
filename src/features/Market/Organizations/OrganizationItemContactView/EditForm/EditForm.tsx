import { FC } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Input } from '../../../../../UIKit/Input';
import { Button } from '../../../../../UIKit/Button';
import { FormErrorValidationHelper } from '../../../../../UIKit/FormErrorValidationHelper';
import { OrganizationItemContactItem } from '../../../../../types/organizations';
import styles from './EditForm.module.scss';

interface NameEditFormProps {
  initialValues: OrganizationItemContactItem;
  onSubmit: (values: OrganizationItemContactItem) => void;
  onCancel: () => void;
}

const validationSchema = yup.object({
  lastname: yup.string().required('Должно быть заполнено'),
  firstname: yup.string().required('Должно быть заполнено'),
  patronymic: yup.string().required('Должно быть заполнено'),
  email: yup.string().required('Должно быть заполнено'),
  phone: yup
    .string()
    .min(11, 'не менее 11 символов')
    .max(11, 'не более 11 символов')
    .required('Должно быть заполнено'),
});

export const EditForm: FC<NameEditFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
}) => {
  const formik = useFormik<OrganizationItemContactItem>({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      noValidate
      autoComplete={'off'}
      className={styles.wrap}
    >
      <div className={styles.blockWrap}>
        <div>
          <Input
            title={'Фамилия'}
            type="text"
            placeholder={'Введите фамилию'}
            {...formik.getFieldProps('lastname')}
          />
          {Boolean(formik.touched.lastname) &&
            Boolean(formik.errors.lastname) && (
              <FormErrorValidationHelper>
                {formik.errors.lastname}
              </FormErrorValidationHelper>
            )}
        </div>
        <div>
          <Input
            title={'Имя'}
            type="text"
            placeholder={'Введите имя'}
            {...formik.getFieldProps('firstname')}
          />
          {Boolean(formik.touched.firstname) &&
            Boolean(formik.errors.firstname) && (
              <FormErrorValidationHelper>
                {formik.errors.firstname}
              </FormErrorValidationHelper>
            )}
        </div>
        <div>
          <Input
            title={'Отчество'}
            type="text"
            placeholder={'Введите отчество'}
            {...formik.getFieldProps('patronymic')}
          />
          {Boolean(formik.touched.patronymic) &&
            Boolean(formik.errors.patronymic) && (
              <FormErrorValidationHelper>
                {formik.errors.patronymic}
              </FormErrorValidationHelper>
            )}
        </div>
      </div>
      <div className={styles.blockWrap}>
        <div>
          <Input
            title={'Email'}
            type="text"
            placeholder={'Введите email'}
            {...formik.getFieldProps('email')}
          />
          {Boolean(formik.touched.email) && Boolean(formik.errors.email) && (
            <FormErrorValidationHelper>
              {formik.errors.email}
            </FormErrorValidationHelper>
          )}
        </div>
        <div>
          <Input
            title={'Телефон'}
            type="text"
            placeholder={'Введите телефон'}
            {...formik.getFieldProps('phone')}
          />
          {Boolean(formik.touched.phone) && Boolean(formik.errors.phone) && (
            <FormErrorValidationHelper>
              {formik.errors.phone}
            </FormErrorValidationHelper>
          )}
        </div>
      </div>

      <div className={styles.controlPanelWrap}>
        <Button type={'button'} onClick={onCancel}>
          Отмена
        </Button>
        <Button type={'submit'}>Сохранить</Button>
      </div>
    </form>
  );
};
