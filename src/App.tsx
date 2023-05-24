import { useEffect, useState, useCallback, useRef } from 'react';
import SearchInput from './components/SearchInput';
import ResultList, { ListItemType } from './components/ResultList';
import ObserverSection from './components/ObserverSection';
import { useDebounce } from 'use-debounce';
import useFetchRepo from './hooks/useFetchRepos';

import './App.css';

const App = () => {
  const [keyword, setKeyword] = useState('');
  const [debouncedQuery] = useDebounce(keyword, 800);
  const { fetchRepo, list, isLoading, error } = useFetchRepo();

  useEffect(() => {
    if (debouncedQuery) { fetchRepo(debouncedQuery) }
  }, [debouncedQuery]);

  const handleRefresh = useCallback(() => {
    if (debouncedQuery) { fetchRepo(debouncedQuery) }
  }, [debouncedQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <div className="frame">
      <SearchInput onInputChange={handleInputChange} keyword={keyword} />
      <ResultList list={list} isLoading={isLoading} error={error} />
      <ObserverSection onRefresh={handleRefresh} />
    </div>
  );
}

export default App;
