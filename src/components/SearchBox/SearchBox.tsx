import styles from "./SearchBox.module.css";
import type { ChangeEvent } from "react";

interface SearchBoxProps {
  value: string;
  onChange: (newValue: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ value, onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      className={styles.input}
      type="text"
      placeholder="Search notes"
      value={value}
      onChange={handleChange}
    />
  );
};

export default SearchBox;
