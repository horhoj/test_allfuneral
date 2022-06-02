import { FC } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import {
  OrganizationItem,
  OrganizationItemType,
} from '../../../../../types/organizations';
import { Input } from '../../../../../UIKit/Input';
import { Button } from '../../../../../UIKit/Button';
import { Multiselect } from '../../../../../UIKit/Multiselect';
import { FormErrorValidationHelper } from '../../../../../UIKit/FormErrorValidationHelper';
import styles from './CommonDataEditForm.module.scss';
import { dateTransform } from './helpers';

interface CommonDataEditFormProps {
  initialValues: OrganizationItem;
  onSubmit: (values: OrganizationItem) => void;
  onCancel: () => void;
}

const validationSchema = yup.object({
  name: yup.string().required('Должно быть заполнено'),
  businessEntity: yup.string().required('Должно быть заполнено'),
  type: yup.array().min(1, 'Должен быть указан хотя бы один тип'),
  contract: yup.object({
    no: yup.string().required('Должно быть заполнено'),
    issue_date: yup.date().required('Должно быть заполнено'),
  }),
});

interface TypeOptionItem {
  label: string;
  value: OrganizationItemType;
}

const typeOptionList: TypeOptionItem[] = [
  { label: 'Агент', value: 'agent' },
  { label: 'Подрядчик', value: 'contractor' },
];

export const CommonDataEditForm: FC<CommonDataEditFormProps> = ({
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
          title={'Наименование'}
          type="text"
          placeholder={'Введите полное наименование'}
          {...formik.getFieldProps('name')}
        />
        {Boolean(formik.touched.name) && Boolean(formik.errors.name) && (
          <FormErrorValidationHelper>
            {formik.errors.name}
          </FormErrorValidationHelper>
        )}
      </div>
      <div>
        <Input
          title={'Форма'}
          type="text"
          placeholder={'Введите форму'}
          {...formik.getFieldProps('businessEntity')}
        />
        {Boolean(formik.touched.businessEntity) &&
          Boolean(formik.errors.businessEntity) && (
            <FormErrorValidationHelper>
              {formik.errors.businessEntity}
            </FormErrorValidationHelper>
          )}
      </div>
      <div className={styles.contractWrap}>
        <div className={styles.formControl}>
          <Input
            title={'Номер договора'}
            type="text"
            placeholder={'Введите номер'}
            {...formik.getFieldProps('contract.no')}
          />
          {Boolean(formik.touched.contract?.no) &&
            Boolean(formik.errors.contract?.no) && (
              <FormErrorValidationHelper>
                {formik.errors.contract?.no}
              </FormErrorValidationHelper>
            )}
        </div>
        <div>от</div>
        <div className={styles.formControl}>
          <Input
            title={'Дата договора'}
            type="date"
            placeholder={'Введите дату'}
            {...formik.getFieldProps('contract.issue_date')}
            value={dateTransform(
              formik.getFieldProps('contract.issue_date').value,
            )}
          />

          {Boolean(formik.touched.contract?.issue_date) &&
            Boolean(formik.errors.contract?.issue_date) && (
              <FormErrorValidationHelper>
                {formik.errors.contract?.issue_date}
              </FormErrorValidationHelper>
            )}
        </div>
      </div>

      <div>
        <Multiselect
          title={'Тип'}
          placeholder={'Введите форму'}
          optionsList={typeOptionList}
          {...formik.getFieldProps('type')}
        />
        {Boolean(formik.errors.type) && (
          <FormErrorValidationHelper>
            {formik.errors.type}
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
