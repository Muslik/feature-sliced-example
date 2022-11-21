import { Button, ButtonProps, Dropdown, DropdownItem } from 'src/shared/ui';

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
          <DropdownItem>Удалить {deleteCount} записей?</DropdownItem>
          <DropdownItem>
            <Button withFullWidth={true} size="small" theme="blueReverse" onClick={onDelete}>
              Удалить
            </Button>
          </DropdownItem>
          <DropdownItem>
            <Button withFullWidth={true} size="small" theme="blue">
              Отмена
            </Button>
          </DropdownItem>
        </>
      }
    />
  );
};
