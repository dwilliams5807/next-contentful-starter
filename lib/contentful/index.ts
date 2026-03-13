export async function fetchContentfulData(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<Record<string, unknown>> {
  const res = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE}/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.CONTENTFUL_API}`,
      },
      body: JSON.stringify({ query, variables }),
    }
  );

  if (!res.ok) {
    throw new Error(`Contentful fetch failed: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();

  if (json.errors) {
    throw new Error(`Contentful GraphQL error: ${json.errors[0]?.message}`);
  }

  return json.data;
}
