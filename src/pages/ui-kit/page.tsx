import { useState } from "react";
import cls from "classnames";
import {
  Button,
  Checkbox,
  Radio,
  Input,
  Modal,
  Dropdown,
  Select,
} from "src/shared/ui";

import styles from "./UiKit.module.scss";

const options = [
  {
    value: "new",
    label: "Новый",
  },
  {
    value: "in_progress",
    label: "В работе",
  },
  {
    value: "done",
    label: "Выполнен",
  },
];

export const UiKitPage = () => {
  const [inputState, setInputState] = useState("08.09.2016");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState("new");

  const handleClickToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleChangeSelect = (value: string) => {
    setSelected(value);
  };

  return (
    <div>
      <div className={styles.box}>
        <Button onClick={handleClickToggleModal}>Открыть модалку</Button>
        <Modal
          isOpen={isModalOpen}
          position="right"
          fullHeight={true}
        >
          <button onClick={handleClickToggleModal}>Закрыть</button>
          Hello World
        </Modal>
      </div>
      <div className={styles.box}>
        <Select
          options={options}
          selected={selected}
          onChange={handleChangeSelect}
          name="status"
        />
      </div>
      <div className={styles.box}>
        <Dropdown
          trigger={
            <Button icon="bin" theme="danger" size="small">
              Удалить записи
            </Button>
          }
          overlay={
            <>
              <div className={styles.dropdownElement}>Удалить n записей?</div>
              <Button
                size="small"
                withFullWidth={true}
                theme="blueReverse"
                className={styles.dropdownElement}
              >
                Да
              </Button>
              <Button
                size="small"
                withFullWidth={true}
                theme="blue"
                className={styles.dropdownElement}
              >
                Нет
              </Button>
            </>
          }
        />
      </div>
      <div className={styles.box}>
        <label className={styles.inputLabel}>
          <div className={styles.labelText}>Дата и время заказа</div>
          <Input
            prefix="до"
            style={{ width: "256px" }}
            placeholder="Введите"
            className={styles.input}
          />
        </label>
        <label className={styles.inputLabel}>
          <div className={styles.labelText}>Дата и время заказа</div>
          <Input
            prefix="c"
            style={{ width: "256px" }}
            value={inputState}
            onChange={(e) => setInputState(e.target.value)}
            placeholder="Введите"
            hasError={true}
            allowClear={true}
            className={styles.input}
          />
        </label>
        <label className={styles.inputLabel}>
          <div className={styles.labelText}>Дата и время заказа</div>
          <Input
            style={{ width: "256px" }}
            defaultValue="06.12.2021"
            placeholder="Введите"
            className={styles.input}
            disabled={true}
          />
        </label>
      </div>
      <div className={cls(styles.box, styles.boxCheckbox)}>
        <Checkbox defaultChecked={true} className={styles.checkbox} />
        <Checkbox className={styles.checkbox} />
      </div>
      <div className={cls(styles.box, styles.boxCheckbox)}>
        <Radio name="radio" defaultChecked={true} className={styles.checkbox} />
        <Radio name="radio" className={styles.checkbox} />
      </div>
      <div className={styles.box}>
        <div className={styles.buttonRow}>
          <div className={styles.buttonColumn}>
            <Button theme="blue" size="medium" icon="sun">
              Text here
            </Button>
            <Button theme="blue" size="medium">
              Text here
            </Button>
            <Button theme="blue" size="medium" icon="sun" />
          </div>
          <div className={styles.buttonColumn}>
            <Button theme="blueReverse" size="medium" icon="sun">
              Text here
            </Button>
            <Button theme="blueReverse" size="medium">
              Text here
            </Button>
            <Button theme="blueReverse" size="medium" icon="sun" />
          </div>
          <div className={styles.buttonColumn}>
            <Button theme="blackReverse" size="medium" icon="sun">
              Text here
            </Button>
            <Button theme="blackReverse" size="medium">
              Text here
            </Button>
            <Button theme="blackReverse" size="medium" icon="sun" />
          </div>
        </div>
        <div className={styles.buttonRow}>
          <div className={styles.buttonColumn}>
            <Button theme="blue" size="small" icon="sun">
              Text here
            </Button>
            <Button theme="blue" size="small">
              Text here
            </Button>
            <Button theme="blue" size="small" icon="sun" />
          </div>
          <div className={styles.buttonColumn}>
            <Button theme="blueReverse" size="small" icon="sun">
              Text here
            </Button>
            <Button theme="blueReverse" size="small">
              Text here
            </Button>
            <Button theme="blueReverse" size="small" icon="sun" />
          </div>
          <div className={styles.buttonColumn}>
            <Button theme="blackReverse" size="small" icon="sun">
              Text here
            </Button>
            <Button theme="blackReverse" size="small">
              Text here
            </Button>
            <Button theme="blackReverse" size="small" icon="sun" />
          </div>
        </div>
      </div>
    </div>
  );
};
