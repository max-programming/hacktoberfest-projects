interface Repo {
  total_count: number;
  items: Array<{
    id: number;
    name: string;
    full_name: string;
    html_url: string;
    description: string;
  }>;
}

export async function getReposData(language: string, params: URLSearchParams) {
  const page = params.get('p') || '1';
  const sort = params.get('s') || 'stars';
  const order = params.get('o') || 'desc';
  const searchQuery = params.get('q') || '';
  const startStars = Number(params.get('startStars')) || 1;
  const endStars = params.get('endStars') || '';
  const starsQuery =
    startStars && endStars
      ? `stars:${startStars}..${endStars}`
      : startStars && !endStars
      ? `stars:>${startStars}`
      : !startStars && endStars
      ? `stars:<${endStars}`
      : '';

  const apiUrl = `https://api.github.com/search/repositories?q=topic%3Ahacktoberfest+language%3A${language}+${searchQuery}+${starsQuery}&page=${page}&per_page=21&sort=${sort}&order=${order}`;
  const res = await fetch(apiUrl, {
    headers: { Accept: 'application/vnd.github.mercy-preview+json' },
    next: {
      revalidate: 60
    }
  });

  if (!res.ok) return undefined;

  const repos: Repo = await res.json();
  repos.items = repos.items.filter((repo: any) => !repo.archived);

  if (repos.items.length === 0) return undefined;

  return {
    repos,
    page: Number(page)
  };
}
