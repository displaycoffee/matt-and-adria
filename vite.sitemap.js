import packageJSON from './package.json';
const hostname = packageJSON.homepage || 'https://localhost:3000';
const location = new URL(hostname);

let sitemap = {
	hostname: location.origin,
	readable: true,
	exclude: ['/assets', '/assets/css', '/assets/fonts', '/assets/images', '/assets/images/test', '/assets/images/theme', '/assets/js'],
	dynamicRoutes: ['/page-one', '/page-two', '/page-two/child-page-one', '/page-two/child-page-two'],
};
if (location?.pathname && location.pathname != '/') {
	sitemap.basePath = location.pathname;
}

export const sitemapConfig = sitemap;
