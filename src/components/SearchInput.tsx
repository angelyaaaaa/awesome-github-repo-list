import { ChangeEventHandler } from 'react'

type SearchInputProps = {
  onInputChange: ChangeEventHandler<HTMLInputElement>;
  keyword: string;
}

const SearchInput = ({ onInputChange, keyword }: SearchInputProps) => {
  return (
    <input value={keyword} onChange={onInputChange} />
  )
}

export default SearchInput;
