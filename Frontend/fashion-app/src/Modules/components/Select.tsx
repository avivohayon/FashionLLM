import { useState, useEffect } from "react";
import styles from "./select.module.css";

type SelectOption = {
  label: string; // the name of the service
  value: any; // the value of the service
};

type SelectProps = {
  options: SelectOption[];
  value?: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
};

// const options: SelectOption[] = [
//   { label: "asos", value: 1 },
//   { label: "shein", value: 2 },
// ];
// { value, onChange }: SelectProps

export function Select({ value, options, onChange }: SelectProps) {
  // Service Selection bar functionality
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen]);

  console.log(`cuurnet selected option is: ${value?.label}`);

  function selectOption(option: SelectOption) {
    if (option !== value) onChange(option);
  }

  function isOptionSelected(option: SelectOption) {
    return option.label === value?.label;
  }

  return (
    <div
      tabIndex={0}
      className={styles.container}
      onClick={() => setIsOpen((prev) => !prev)}
      onBlur={() => setIsOpen(false)}
    >
      <span className={styles.value}>{value?.label}</span>
      {/* <button className={styles["clear-btn"]}>&times;</button> */}
      <div className={styles.divider}></div>
      <div className={styles.caret}></div>
      <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
        {options.map((option, index) => (
          <li
            key={option.label}
            className={`${styles.option} ${
              isOptionSelected(option) ? styles.selected : ""
            }
            ${index === highlightedIndex ? styles.highlighted : ""} `}
            onClick={(e) => {
              e.stopPropagation();
              selectOption(option);
              setIsOpen(false);
            }}
            onMouseEnter={() => setHighlightedIndex(index)}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
