import Parser from 'rss-parser';

export const dynamic = 'force-static';
export const revalidate = 1800;

const parser = new Parser();

function extractImageFromContent(content?: string) {
  if (!content) return undefined;
  const match = content.match(/<img[^>]+src="([^">]+)"/i);
  return match ? match[1] : undefined;
}

export async function GET() {
  try {
    const feed = await parser.parseURL('https://medium.com/feed/@codiologies');

    const items = (feed.items || []).map((item: any) => ({
      _id: item.guid || item.link,
      title: item.title,
      link: item.link,
      excerpt: item.contentSnippet || (item.content ? item.content.replace(/<[^>]+>/g, '').slice(0, 300) : ''),
      publishedAt: item.isoDate,
      tags: item.categories || [],
      author: item.creator || item.author || 'Sajal Gupta',
      image: item.enclosure?.url || extractImageFromContent(item.content),
      readingTime: item['content:encoded'] ? undefined : undefined,
    }));

    return new Response(JSON.stringify(items), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=60',
      },
    });
  } catch (err) {
    console.error('Failed to fetch Medium feed', err);
    return new Response(JSON.stringify({ error: 'Failed to fetch Medium feed' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
      },
    });
  }
}