
import { Octokit } from "octokit";
import { useState, useRef, useEffect } from 'react';
import { ListItemType } from '../components/ResultList';
import { OctokitResponse } from '@octokit/types';

const octokit = new Octokit({
  auth: process.env.REACT_APP_GITHUB_TOKEN,
});

const listItemMapper = (item: OctokitResponse<any>['data']): ListItemType => ({
  id: item.id,
  name: item.full_name,
  url: item.html_url,
  description: item.description,
  lastUpdated: item.updated_at,
  stars: item.stargazers_count,
  avatarUrl: item.owner?.avatar_url,
  language: item.language,
  topics: item.topics,
});

const useFetchRepo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>();
  const [list, setList] = useState<ListItemType[]>([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState<string>('');
  const previousQuery = useRef<string>('');
  

  useEffect(() => {
    const searchRepo = async () => {
      try {
        if (!query) {
          setIsLoading(false);
          setList([]);
          return;
        }

        const { data: { items } } = await octokit.request('GET /search/repositories', {
          headers: {
            'X-GitHub-Api-Version': '2022-11-28'
          },
          q: query,
          per_page: 10,
          page,
        });

        setIsLoading(false);
        const newList = items.map(listItemMapper);
        setList(query !== previousQuery.current ? newList : [...list, ...newList]);
        previousQuery.current = query;
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    }
    setIsLoading(true);
    searchRepo();
  }, [page, query]);
  const fetchRepo = (q: string) => { 
    setQuery(q);
    if (!q || q !== previousQuery.current) {
      setPage(1);
    } else {
      setPage(p => p + 1);
    }
  }
  return { fetchRepo, list, page, isLoading, error };
}


export default useFetchRepo;