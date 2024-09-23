import type { CloudFrontRequestEvent } from 'aws-lambda';

async function handler(event: CloudFrontRequestEvent) {
  const request = event.Records[0].cf.request;
  const headers = request.headers;

  // Get the Host header from the incoming request
  const hostHeader = headers.host?.[0].value;

  // Apex domain and www subdomain
  const apexDomain = 'drieshooghe.com';
  const wwwDomain = 'www.drieshooghe.com';

  // If the request is to the apex domain, redirect to the www domain
  if (hostHeader === apexDomain) {
    const redirectUrl = `https://${wwwDomain}${request.uri}`;

    // Return a 301 redirect response
    return {
      status: '301',
      statusDescription: 'Moved Permanently',
      headers: {
        location: [{ key: 'Location', value: redirectUrl }],
        'cache-control': [{ key: 'Cache-Control', value: 'max-age=86400' }],
      },
    };
  }

  return request;
}
