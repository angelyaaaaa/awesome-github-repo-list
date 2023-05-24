import useVirtualDisplay from '../hooks/useVirtualDisplay';

import '../styles/ResultList.css';

export type ListItemType = {
  id: number;
  name: string; // full_name
  url: string; // html_url
  description: string | null;
  lastUpdated: string; // updated_at, Format: date-time
  stars: number; // stargazers_count
  avatarUrl: string | undefined; // owner.avatar_url
  language: string | null; // language
  topics: string[] | undefined; // topics
}

type ResultRowProps = {
  item: ListItemType;
}

const ResultRow = ({ item }: ResultRowProps) => {
  return (
    <div className="result-row">

      <div className="result-name">
        <img className='avatar' src={item.avatarUrl} />
        <div className="text">{item.name}</div>
      </div>
      <div className="result-description">{item.description}</div>
      <div className="result-tags">
        {item.topics?.map(topic => (
          <div className="tag" key={item.id + topic}>{topic}</div>
        ))}
      </div>
      <div className="result-infos">
        <div className="language">{item.language}</div>
        <div className="stars">{item.stars}</div>
        <div className="last-updated">{new Date(item.lastUpdated).toDateString()}</div>
      </div>
    </div>
  )
}

type ResultListProps = {
  list: ListItemType[];
  isLoading: boolean;
  error?: Error;
};

const ResultList = ({ list, isLoading, error }: ResultListProps) => {
  const itemHeight = 180;
  const visibleItems = 10;
  const { startIndex, getEndIndex, refContainer } = useVirtualDisplay(itemHeight, visibleItems);

  return (
    <div className="result-list">
      <div className="virtual-container" >
        <dl ref={refContainer}>
          {list
            .slice(startIndex, getEndIndex(list.length))
            .map((item, index) => (
              <dt
                key={item.id}
                style={{
                  position: 'absolute',
                  top: `${(startIndex + index) * itemHeight}px`,
                  height: `${itemHeight}px`,
                  width: '100%',
                }}
              >
                <ResultRow item={item} />
              </dt>
            ))
          }
        </dl>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
      </div>
    </div>
  )
}

export default ResultList;
