
import { Octokit } from "octokit";
import { useState, useRef } from 'react';
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
  const previousQuery = useRef<string>('');

  const fetchRepo = async (query: string) => {
    setIsLoading(true);
    try {
      
      if (!query) {
        setPage(1);
        setIsLoading(false);
        setList([]);
        return;
      }

      // NOTE: New query, reset page to 1
      if (query !== previousQuery.current) {
        const { data: { items } } = await octokit.request('GET /search/repositories', {
          headers: {
            'X-GitHub-Api-Version': '2022-11-28'
          },
          q: query,
          per_page: 10,
          page: 1,
        });
        
        setPage(1);
        setIsLoading(false);
        const newList = items.map(listItemMapper);
        setList(newList);
        previousQuery.current = query;
      } else {
        const { data: { items } } = await octokit.request('GET /search/repositories', {
          headers: {
            'X-GitHub-Api-Version': '2022-11-28'
          },
          q: query,
          per_page: 10,
          page: page + 1,
        });

        const newList = items.map(listItemMapper);
        setList([...list, ...newList]);
        setPage(page + 1);
        setIsLoading(false);
      }
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  }
  
  return { fetchRepo, list, page, isLoading, error };
}

export default useFetchRepo;