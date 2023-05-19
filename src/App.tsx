import { useEffect, useState, ChangeEvent } from 'react';
import SearchInput from './components/SearchInput';
import ResultList, { ListItemType } from './components/ResultList';
import './App.css';
import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.REACT_APP_GITHUB_TOKEN,
});

const App = () => {
  const [list, setList] = useState<ListItemType[]>([]);
  const [keyword, setKeyword] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data: { items } } = await octokit.request('GET /search/repositories', {
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        },
        q: 'react',
      });
      setList(items.map(item => ({
        id: item.id,
        name: item.full_name,
        url: item.html_url,
        description: item.description,
        lastUpdated: item.updated_at,
        stars: item.stargazers_count,
        avatarUrl: item.owner?.avatar_url,
        language: item.language,
        topics: item.topics,
      })));
    }
    fetchData();
  }, []);

  return (
    <>
      <SearchInput onInputChange={handleInputChange} keyword={keyword} />
      <ResultList list={list} />
      <div></div>
    </>
  );
}

export default App;
