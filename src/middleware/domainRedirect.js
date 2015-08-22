import url from 'url';

export default function domainRedirect(sourceDomains, destDomain, code = 301) {
  let sourceDomainSet = new Set(sourceDomains.map(
    domain => domain.toLowerCase()
  ));

  return function*(next) {
    let domain = this.host
      .split('.')
      .slice(-this.app.subdomainOffset)
      .join('.');

    if (!sourceDomainSet.has(domain.toLowerCase())) {
      yield* next;
      return;
    }

    let newDomain = [destDomain, ...this.subdomains].join('.');
    let parts = url.parse(this.url);
    parts.host = newDomain;
    let newUrl = url.format(parts);

    this.status = code;
    this.redirect(newUrl);
  };
}
