import { ChangeEventHandler } from 'react';
import '../styles/SearchInput.css';

type SearchInputProps = {
  onInputChange: ChangeEventHandler<HTMLInputElement>;
  keyword: string;
}

const SearchInput = ({ onInputChange, keyword }: SearchInputProps) => {
  return (
    <div className="input-wrapper">
      <input value={keyword} onChange={onInputChange} />
    </div>
  )
}

export default SearchInput;
