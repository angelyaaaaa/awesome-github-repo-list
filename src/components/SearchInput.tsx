import { ChangeEventHandler } from 'react';
import '../styles/SearchInput.css';

type SearchInputProps = {
  onInputChange: ChangeEventHandler<HTMLInputElement>;
  keyword: string;
}

const SearchInput = ({ onInputChange, keyword }: SearchInputProps) => {
  return (
    <input className="input" value={keyword} onChange={onInputChange} />
  )
}

export default SearchInput;
