import { Button, ButtonProps, Dropdown } from 'src/shared/ui';

type Props = {
  deleteCount: number;
  onDelete: () => void;
} & ButtonProps;

export const DeleteButton = ({ onDelete, deleteCount, ...props }: Props) => {
  return (
    <Dropdown
      position="top"
      trigger={
        <Button size="small" theme="danger" icon="bin" {...props}>
          Удалить
        </Button>
      }
      overlay={
        <>
          Удалить {deleteCount} записей?
          <Button withFullWidth={true} size="small" theme="blueReverse" onClick={onDelete}>
            Удалить
          </Button>
          <Button withFullWidth={true} size="small" theme="blue">
            Отмена
          </Button>
        </>
      }
    />
  );
};
