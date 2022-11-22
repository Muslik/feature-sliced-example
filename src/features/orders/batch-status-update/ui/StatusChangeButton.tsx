import { STATUSES_MAP } from 'src/entities/orders';
import { Button, ButtonProps, Dropdown, LabelControl, Radio } from 'src/shared/ui';

import styles from './StatusChangeButton.module.scss';

type Props = {
  onChange: (key: string) => void;
} & Omit<ButtonProps, 'onChange'>;

export const StatusChangeButton = ({ onChange, className, ...props }: Props) => {
  return (
    <Dropdown
      position="top"
      className={styles.dropdown}
      trigger={
        <Button size="small" theme="blue" icon="pencil" {...props}>
          Изменить статус
        </Button>
      }
      overlay={
        <>
          {Object.keys(STATUSES_MAP).map((key) => {
            return (
              <LabelControl
                key={key}
                hideToggle
                control={<Radio onChange={() => onChange(key)} />}
                label={STATUSES_MAP[key]}
              />
            );
          })}
        </>
      }
    />
  );
};
