async function handler(
  event: AWSCloudFrontFunction.Event,
): Promise<AWSCloudFrontFunction.Request | AWSCloudFrontFunction.Response> {
  const request = event.request;
  const headers = request.headers;

  let locale = 'en';

  const languageHeader = headers['accept-language']?.value?.slice(0, 2);
  if (languageHeader && ['nl', 'en'].includes(languageHeader)) {
    locale = languageHeader;
  }

  return {
    statusCode: 301,
    statusDescription: 'Moved Permanently',
    headers: {
      location: { value: `https://www.ocoda.be/${locale}/dries` },
      'cache-control': { value: 'max-age=86400' },
    },
  };
}
