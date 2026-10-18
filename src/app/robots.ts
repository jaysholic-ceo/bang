import { MetadataRoute } from 'next';
import { SITE_INDEXABLE, SITE_URL } from '@/lib/clinic';

// 정식 오픈 전(SITE_INDEXABLE=false)에는 각 페이지의 noindex 로 검색 노출을 막고,
// 크롤러가 그 noindex 를 읽을 수 있도록 robots.txt 는 막지 않습니다. sitemap 은 오픈 후에만 알립니다.
export default function robots(): MetadataRoute.Robots {
    return {
        rules: { userAgent: '*', allow: '/' },
        ...(SITE_INDEXABLE ? { sitemap: `${SITE_URL}/sitemap.xml` } : {}),
    };
}
