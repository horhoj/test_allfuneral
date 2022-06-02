import { FC } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { OrganizationItem } from '../../../../../types/organizations';
import { Input } from '../../../../../UIKit/Input';
import { Button } from '../../../../../UIKit/Button';
import { FormErrorValidationHelper } from '../../../../../UIKit/FormErrorValidationHelper';
import styles from './NameEditForm.module.scss';

interface NameEditFormProps {
  initialValues: OrganizationItem;
  onSubmit: (values: OrganizationItem) => void;
  onCancel: () => void;
}

const validationSchema = yup.object({
  shortName: yup.string().required('Должно быть заполнено'),
});

export const NameEditForm: FC<NameEditFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
}) => {
  const formik = useFormik<OrganizationItem>({
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
      <div>
        <Input
          title={'Краткое наименование'}
          type="text"
          placeholder={'Введите короткое наименование'}
          {...formik.getFieldProps('shortName')}
        />
        {Boolean(formik.touched.shortName) &&
          Boolean(formik.errors.shortName) && (
            <FormErrorValidationHelper>
              {formik.errors.shortName}
            </FormErrorValidationHelper>
          )}
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
