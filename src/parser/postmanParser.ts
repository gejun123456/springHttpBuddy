import pc from 'postman-collection';

export interface PostmanRequest {
  name: string;
  method: string;
  url: string;
  headers: { key: string; value: string }[];
  body?: string;
  bodyContentType?: string;
}

export interface PostmanParseResult {
  collectionName: string;
  requests: PostmanRequest[];
}

/**
 * Parse a Postman Collection v2/v2.1 JSON into a flat list of requests.
 */
export function parsePostmanCollection(jsonStr: string): PostmanParseResult {
  const raw = JSON.parse(jsonStr);
  const collection = new pc.Collection(raw);

  const requests: PostmanRequest[] = [];

  flattenItems(collection.items, '', requests);

  return {
    collectionName: collection.name || 'Imported',
    requests,
  };
}

function flattenItems(
  items: any,
  folderPath: string,
  out: PostmanRequest[]
): void {
  items.each((item: any) => {
    // ItemGroup (folder) with sub-items
    if (item.items?.count() > 0) {
      const subPath = folderPath ? `${folderPath}/${item.name}` : item.name;
      flattenItems(item.items, subPath, out);
      return;
    }

    // Leaf item = actual request
    const req = item.request;
    if (!req) return;

    const name = folderPath
      ? `${folderPath}: ${item.name}`
      : item.name;

    const url = extractUrl(req.url);
    const method = req.method || 'GET';

    const headers: { key: string; value: string }[] = [];
    if (req.headers?.count()) {
      req.headers.each((h: any) => {
        if (h.disabled) return;
        headers.push({ key: h.key, value: h.value });
      });
    }

    let body: string | undefined;
    let bodyContentType: string | undefined;
    if (req.body) {
      const result = extractBody(req.body);
      body = result.body;
      bodyContentType = result.contentType;
    }

    out.push({ name, method, url, headers, body, bodyContentType });
  });
}

function extractUrl(url: any): string {
  if (!url) return '';

  // url.toString() — when the URL was given as a plain string, this returns
  // the full URL with protocol (e.g. "https://api.example.com/users").
  // When given as an object { raw, host, path, … }, toString() may drop the
  // protocol (e.g. "api.example.com/users").  If it starts with http, use it.
  const str = url.toString();
  if (str && /^https?:\/\//i.test(str)) return str;

  // If raw was set to a full URL, use it directly
  if (url.raw && /^https?:\/\//i.test(url.raw)) {
    // Append query parameters that aren't already in raw
    if (url.query?.count()) {
      const qs = collectQueryString(url.query);
      if (qs) return url.raw + (url.raw.includes('?') ? '&' : '?') + qs;
    }
    return url.raw;
  }

  // Reconstruct from components
  const protocol = url.protocol || 'https';
  const host = Array.isArray(url.host) ? url.host.join('.') : url.host || '';
  const port = url.port ? `:${url.port}` : '';
  const path = url.path
    ? '/' + (Array.isArray(url.path) ? url.path.join('/') : url.path)
    : '';

  if (!host) return str || '';

  let result = `${protocol}://${host}${port}${path}`;

  // Append query parameters
  const qs = collectQueryString(url.query);
  if (qs) result += '?' + qs;

  return result;
}

function collectQueryString(query: any): string {
  if (!query?.count()) return '';
  const qs: string[] = [];
  query.each((q: any) => {
    if (q.disabled) return;
    qs.push(`${encodeURIComponent(q.key)}=${encodeURIComponent(q.value || '')}`);
  });
  return qs.join('&');
}

/**
 * Encode a form value for use in urlencoded/form-data bodies while preserving
 * httpYac variable syntax ({{ ... }}) so variables survive unencoded.
 */
function encodeFormValue(value: string): string {
  // Split on httpYac variable boundaries, encode non-variable parts
  const parts = value.split(/(\{\{[^}]*\}\})/g);
  return parts
    .map((part) => {
      if (part.startsWith('{{') && part.endsWith('}}')) return part;
      return encodeURIComponent(part);
    })
    .join('');
}

function extractBody(body: any): { body: string; contentType?: string } {
  switch (body.mode) {
    case 'raw': {
      const raw = body.raw || '';
      let contentType: string | undefined;
      const lang = body.options?.raw?.language;
      if (lang === 'json') contentType = 'application/json';
      else if (lang === 'xml') contentType = 'application/xml';
      else if (lang === 'text') contentType = 'text/plain';
      else if (lang === 'javascript') contentType = 'application/javascript';
      else if (lang === 'html') contentType = 'text/html';

      // Auto-detect JSON if it parses
      if (!contentType) {
        try {
          JSON.parse(raw);
          contentType = 'application/json';
        } catch {
          contentType = 'text/plain';
        }
      }

      return { body: raw, contentType };
    }

    case 'urlencoded': {
      const parts: string[] = [];
      body.urlencoded?.each((p: any) => {
        parts.push(`${encodeURIComponent(p.key)}=${encodeFormValue(p.value || '')}`);
      });
      return {
        body: parts.join('&'),
        contentType: 'application/x-www-form-urlencoded',
      };
    }

    case 'formdata': {
      const parts: string[] = [];
      body.formdata?.each((p: any) => {
        if (p.type === 'file') {
          parts.push(`${encodeURIComponent(p.key)}=[FILE: ${p.src || '?null?'}]`);
        } else {
          parts.push(`${encodeURIComponent(p.key)}=${encodeFormValue(p.value || '')}`);
        }
      });
      return {
        body: parts.join('&'),
        contentType: 'multipart/form-data',
      };
    }

    case 'graphql': {
      const query = body.graphql?.query || '';
      const vars = body.graphql?.variables || '{}';
      return {
        body: JSON.stringify({ query, variables: JSON.parse(vars) }, null, 2),
        contentType: 'application/json',
      };
    }

    case 'file':
      return {
        body: `[FILE: ${body.file?.src || '?null?'}]`,
      };

    default:
      return { body: '' };
  }
}