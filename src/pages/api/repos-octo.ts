import { NextRequest, NextResponse } from 'next/server';
import { Octokit, App } from 'octokit';

const octokit = new Octokit({ userAgent: 'myApp v1.2.3' });

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

  const data = await octokit.rest.search.topics({
    q: `hacktoberfest+language%3A${languageName}+${searchQuery}+${starsQuery}`,
    page: +page,
    per_page: 21,
    sort,
    order
  });

  // const apiUrl = `https://api.github.com/search/repositories?q=topic%3Ahacktoberfest+language%3A${languageName}+${searchQuery}+${starsQuery}&page=${page}&per_page=21&sort=${sort}&order=${order}`;
  return NextResponse.json({
    data
    // page: +page,
    // languageName,
    // repos
  });
};

export const config = {
  runtime: 'experimental-edge'
};
