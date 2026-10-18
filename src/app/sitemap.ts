import { MetadataRoute } from 'next';
import { BODY_PART_GROUPS } from '@/data/body-parts';
import { getNewsPosts } from '@/data/posts';
import { SITE_URL } from '@/lib/clinic';

// 사이트의 모든 공개 페이지. 질환은 body-parts.ts, 게시글은 posts 데이터에서 자동으로 만듭니다.
export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();
    const page = (
        path: string,
        changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'],
        priority: number,
        lastModified: Date = now,
    ) => ({ url: `${SITE_URL}${path}`, lastModified, changeFrequency, priority });

    const diseases = BODY_PART_GROUPS.flatMap((group) => group.items.map((item) => item.href));
    const posts = getNewsPosts();

    return [
        page('/', 'weekly', 1),
        page('/intro', 'monthly', 0.8),
        page('/intro/doctor-choi', 'monthly', 0.6),
        page('/intro/doctor-lee', 'monthly', 0.6),
        page('/intro/doctor-jung', 'monthly', 0.6),
        page('/medical', 'monthly', 0.8),
        ...diseases.map((href) => page(href, 'monthly', 0.7)),
        page('/guide', 'monthly', 0.7),
        page('/news', 'weekly', 0.7),
        ...posts.map((post) => page(`/news/${post.id}`, 'yearly', 0.5, new Date(post.date))),
        page('/policy/price', 'yearly', 0.3),
        page('/policy/privacy', 'yearly', 0.2),
    ];
}
