import { NextRequest, NextResponse } from 'next/server';
import { Repos } from 'types';

export default async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const languageName = searchParams.get('lang') || '';
  const page = searchParams.get('p') || '1';
  const sort = searchParams.get('s') || '';
  const order = searchParams.get('o') || 'desc';
  const searchQuery = searchParams.get('q') || '';
  const startStars = searchParams.get('startStars') || 1;
  const endStars = searchParams.get('endStars') || '';
  const starsQuery =
    startStars && endStars
      ? `stars:${startStars}..${endStars}`
      : startStars && !endStars
      ? `stars:>${startStars}`
      : !startStars && endStars
      ? `stars:<${endStars}`
      : '';

  const apiUrl = `https://api.github.com/search/repositories?q=topic%3Ahacktoberfest+language%3A${languageName}+${searchQuery}+${starsQuery}&page=${page}&per_page=21&sort=${sort}&order=${order}`;

  const res = await fetch(apiUrl, {
    headers: { Accept: 'application/vnd.github.mercy-preview+json' }
  });
  const repos: Repos = await res.json();
  repos.items = repos.items.filter(repo => !repo.archived);

  return NextResponse.json({
    page: +page,
    languageName,
    repos
  });
};

export const config = {
  runtime: 'experimental-edge'
};
