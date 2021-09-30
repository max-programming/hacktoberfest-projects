import Image from 'next/image';
import { emojify } from '@twuni/emojify';

interface Props {
  repo: any;
}

export default function Card({ repo }: Props) {
  return (
    <div className='shadow-sm card bg-neutral text-neutral-content'>
      <div className='card-body'>
        <div className='avatar'>
          <div className='w-10 h-10 mb-2 rounded-full'>
            <a
              href={repo.owner.html_url}
              title={repo.owner.login}
              target='_blank'
              rel='noreferrer'
            >
              <Image
                src={repo.owner.avatar_url}
                blurDataURL='data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mPsrQcAAZ8BDlpDGcMAAAAASUVORK5CYII='
                placeholder='blur'
                width={50}
                height={50}
                alt={repo.owner.login}
              />
            </a>
          </div>
        </div>
        <a
          href={repo.html_url}
          title={repo.name}
          target='_blank'
          rel='noreferrer'
          className='card-title link link-hover text-warning'
        >
          {repo.name}
        </a>
        <p className='gemojify'>{emojify(repo.description)}</p>
        <div className='card-actions'>
          {repo.topics.map((topic: string) => (
            <a
              key={topic}
              href={`https://github.com/topics/${topic}`}
              target='_blank'
              rel='noreferrer'
              className={`badge ${
                topic === 'hacktoberfest' ? 'badge-warning' : 'badge-info'
              }`}
            >
              {topic}
            </a>
          ))}
        </div>
        <div className='card-actions'>
          <div className='shadow stats'>
            <div className='stat'>
              <div className='stat-title'>⭐ Stars</div>
              <div className='stat-value'>{repo.stargazers_count}</div>
            </div>
          </div>
          <div className='shadow stats'>
            <div className='stat'>
              <div className='stat-title'>🍴 Forks</div>
              <div className='stat-value'>{repo.forks}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* <div className='indicator-item indicator-top'>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          title="Go to repository"
          className="btn btn-sm btn-warning"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </a>
      </div> */
