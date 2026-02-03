const fs = require('fs');
const path = require('path');
const Parser = require('rss-parser');

const parser = new Parser();
const MEDIUM_FEED = 'https://medium.com/feed/@codiologies';

async function fetchAndWrite() {
  try {
    console.log('Fetching Medium feed...');
    const feed = await parser.parseURL(MEDIUM_FEED);
    const items = (feed.items || []).map((item) => ({
      _id: item.guid || item.link,
      title: item.title,
      link: item.link,
      excerpt: item.contentSnippet || (item.content ? item.content.replace(/<[^>]+>/g, '').slice(0, 300) : ''),
      publishedAt: item.isoDate,
      tags: item.categories || [],
      author: item.creator || item.author || 'Sajal Gupta',
      image: item.enclosure?.url || (() => {
        const match = item.content && item.content.match(/<img[^>]+src="([^">]+)"/i);
        return match ? match[1] : undefined;
      })(),
    }));

    const outPath = path.join(__dirname, '..', 'public', 'medium.json');
    fs.writeFileSync(outPath, JSON.stringify(items, null, 2));
    console.log('Wrote medium.json with', items.length, 'items to', outPath);
  } catch (err) {
    console.error('Failed to fetch Medium feed:', err);
    // Write empty array to avoid fetch errors in runtime
    const outPath = path.join(__dirname, '..', 'public', 'medium.json');
    fs.writeFileSync(outPath, JSON.stringify([], null, 2));
    console.log('Wrote empty medium.json to avoid runtime failures.');
  }
}

fetchAndWrite();