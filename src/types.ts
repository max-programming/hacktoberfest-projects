export interface Repos {
  items: Array<Repo>;
  total_count: number;
}

export interface Repo {
  id: string;
  html_url: string;
  name: string;
  description: string;
  topics: Array<string>;
  stargazers_count: number;
  forks: number;
  archived: boolean;
  owner: {
    html_url: string;
    login: string;
    avatar_url: string;
    name: string;
  };
}
