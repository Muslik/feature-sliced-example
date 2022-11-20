import { ChangeEvent } from "react";
import { Icon, Input, Dropdown, LabelControl, Checkbox, Radio } from "../";

import styles from "./Select.module.scss";

const ANY = "Любой";

type Multiple = {
  multiple: true;
  selected: string[];
};

type Single = {
  multiple?: false;
  selected: string;
};

type Props = {
  name: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
} & (Multiple | Single);

export const Select = ({
  onChange,
  selected,
  options,
  multiple,
  name,
}: Props) => {
  if (!options) {
    return null;
  }

  const handleChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    onChange(value);
  };

  const getDescription = () => {
    if (!multiple) {
      return options.find((option) => option.value === selected)?.label ?? "";
    }

    const areNonSelected = selected.length === 0;
    const areAllSelected = options.every((option) =>
      selected.includes(option.value)
    );
    if (areNonSelected || areAllSelected) {
      return ANY;
    }

    return options
      .filter((option) => selected.includes(option.value))
      .map((option) => option.label)
      .join(", ");
  };

  const getMultipleOptions = () =>
    options.map((option) => (
      <LabelControl
        key={option.value}
        control={
          <Checkbox
            name={name}
            value={option.value}
            onChange={handleChange}
            checked={selected.includes(option.value)}
          />
        }
        label={option.label}
      />
    ));

  const getOptions = () =>
    options.map((option) => (
      <LabelControl
        key={option.value}
        hideToggle={true}
        control={
          <Radio
            name={name}
            value={option.value}
            onChange={handleChange}
            checked={selected === option.value}
          />
        }
        label={option.label}
      />
    ));

  const renderedOptions = multiple ? getMultipleOptions() : getOptions();

  return (
    <div className={styles.select}>
      <Dropdown
        trigger={
          <Input
            postfix={<Icon name="varrow" fill="var(--light-blue)" />}
            readOnly
            value={getDescription()}
          />
        }
        overlay={<>{renderedOptions}</>}
        className={styles.overlay}
      />
    </div>
  );
};
