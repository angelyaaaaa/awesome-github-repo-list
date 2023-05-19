import { useEffect, useState, ChangeEvent } from 'react';
import SearchInput from './components/SearchInput';
import ResultList, { ListItemType } from './components/ResultList';
import './App.css';
import { Octokit } from "octokit";
import { useDebounce } from 'use-debounce';

const octokit = new Octokit({
  auth: process.env.REACT_APP_GITHUB_TOKEN,
});

const fetchRepo = async (query: string, page?: number) => {
  const { data: { items } } = await octokit.request('GET /search/repositories', {
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    },
    q: query,
    per_page: 10,
    page,
  });
  return items.map(item => ({
    id: item.id,
    name: item.full_name,
    url: item.html_url,
    description: item.description,
    lastUpdated: item.updated_at,
    stars: item.stargazers_count,
    avatarUrl: item.owner?.avatar_url,
    language: item.language,
    topics: item.topics,
  }));
}

const App = () => {
  const [list, setList] = useState<ListItemType[]>([]);
  const [keyword, setKeyword] = useState('');
  const [query] = useDebounce(keyword, 800);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setIsLoading(true)
    if (query) {
      fetchRepo(query)
        .then(setList)
        .then(() => setIsLoading(false))
        .catch(setError)
    } else {
      setList([]);
    }
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <div className="frame">
      <SearchInput onInputChange={handleInputChange} keyword={keyword} />
      <ResultList list={list} isLoading={isLoading} error={error} />
      <div></div>
    </div>
  );
}

export default App;
