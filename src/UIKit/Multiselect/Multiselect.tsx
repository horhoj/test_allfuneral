import { FC } from 'react';
import Select, { StylesConfig, Props } from 'react-select';
import styles from './Multiselect.module.scss';

export interface OptionsListItem {
  label: string;
  value: string;
}

interface MultiselectPropsEx extends Props {
  title?: string;
  optionsList: OptionsListItem[];
  value: string[];
  onChange: (e: unknown) => void;
}

type MultiselectProps = Omit<MultiselectPropsEx, 'className' | 'style'>;

export const Multiselect: FC<MultiselectProps> = ({
  optionsList,
  title,
  value,
  onChange,
  ...props
}) => {
  const currentValue: OptionsListItem[] = value.reduce(
    (prev, current) => [
      ...prev,
      ...optionsList.filter((optionItem) => optionItem.value === current),
    ],
    [] as OptionsListItem[],
  );

  const customStyles: StylesConfig = {
    control: (styles, state) => ({
      ...styles,
      width: '100%',
      padding: '5px 4px',
      borderRadius: '3px',
      boxShadow: 'none !important',
      border: state.isFocused ? '1px solid #3b3b3b' : '1px solid #cdcdcd',
      ':hover': state.isFocused
        ? { ...styles[':hover'], border: '1px solid #3b3b3b' }
        : {
            ...styles[':hover'],
            border: '1px solid #808080',
          },
    }),
    placeholder: (styles) => ({
      ...styles,
      textTransform: 'uppercase',
      opacity: '1',
      color: '#808080',
    }),
  };

  const handleChange = (e: unknown) => {
    const value: string[] = (e as OptionsListItem[]).map(
      (optionItem) => optionItem.value,
    );

    const newEventData: unknown = {
      target: {
        name: props.name,
        id: props.id,
        value,
      },
    };
    onChange(newEventData);
  };

  return (
    <div className={styles.wrap}>
      {title && <div className={styles.title}>{title}</div>}
      <Select
        className={styles.select}
        styles={customStyles}
        isMulti={true}
        options={optionsList}
        value={currentValue}
        onChange={handleChange}
        {...props}
      />
    </div>
  );
};
