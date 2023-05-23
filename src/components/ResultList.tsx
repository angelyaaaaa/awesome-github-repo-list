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

type ResultListProps = {
  list: ListItemType[];
  isLoading: boolean;
  error?: Error;
}

const ResultRow = (item: ListItemType) => {
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

const ResultList = ({ list, isLoading, error }: ResultListProps) => {
  return (
    <div className="result-list">
      <dl>
        {list.map((item) => (
          <dt key={item.id}>
            <ResultRow {...item} />
          </dt>
        ))}
      </dl>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  )
}

export default ResultList;
