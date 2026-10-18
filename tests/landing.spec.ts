import { test, expect } from '@playwright/test';

// 주요 페이지가 뜨고, 질환 카드·링크·SEO 기본값이 유지되는지 확인합니다.
// 실행: npm run build && npx next start -p 3000 을 띄운 뒤 npx playwright test
// (다른 주소로 확인하려면 PW_BASE_URL 환경변수로 바꿉니다. playwright.config.ts 참고)

const DISEASE_SLUGS = [
  'disc',
  'stenosis',
  'frozen-shoulder',
  'rotator-cuff',
  'tennis-elbow',
  'carpal-tunnel',
  'arthritis',
  'shingles',
  'balloon-neuroplasty',
];

test('홈: 제목·헤더·푸터·히어로가 보인다', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/지인마취통증의학과 강북점/);
  await expect(page.locator('header')).toBeVisible();
  await expect(page.locator('footer')).toBeVisible();
  await expect(page.locator('h1')).toBeVisible();
});

test('홈: 배경 영상 정지 버튼이 영상을 내린다', async ({ page }) => {
  await page.goto('/');
  const toggle = page.getByRole('button', { name: /배경 영상/ });
  test.skip((await toggle.count()) === 0, '모션 줄이기 설정이거나 영상이 없는 경우');
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('section iframe')).toHaveCount(0);
});

test('본원 소개: 제목과 의료진 3인 링크', async ({ page }) => {
  await page.goto('/intro');
  await expect(page.getByRole('heading', { level: 1, name: '본원 소개' })).toBeVisible();
  for (const slug of ['doctor-choi', 'doctor-lee', 'doctor-jung']) {
    await expect(page.locator(`a[href="/intro/${slug}"]`).first()).toBeAttached();
  }
});

test('주요 질환: 카드 8개, 질환 링크 9개', async ({ page }) => {
  await page.goto('/medical');
  await expect(page.locator('h1')).toBeVisible();
  for (const slug of DISEASE_SLUGS) {
    await expect(page.locator(`main a[href="/medical/${slug}"]`).first()).toBeAttached();
  }
  // 카드 8개 (디스크·척추관협착증은 한 카드에 링크 2개)
  for (const title of ['디스크', '대상포진', '오십견', '회전근개파열', '퇴행성관절염', '손목터널증후군', '테니스엘보우', '풍선신경성형술']) {
    await expect(page.getByRole('heading', { level: 3, name: new RegExp(`^${title}`) })).toHaveCount(1);
  }
});

for (const slug of DISEASE_SLUGS) {
  test(`질환 상세 /medical/${slug} 가 열린다`, async ({ page }) => {
    const res = await page.goto(`/medical/${slug}`);
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1')).toBeVisible();
  });
}

test('목록에 없는 질환 주소는 404', async ({ page }) => {
  const res = await page.goto('/medical/not-a-disease');
  expect(res?.status()).toBe(404);
});

test('본원 소식: 목록과 첫 글이 열린다', async ({ page }) => {
  await page.goto('/news');
  await expect(page.locator('h1')).toBeVisible();
  const first = page.locator('main a[href^="/news/"]').first();
  const href = await first.getAttribute('href');
  expect(href).toBeTruthy();
  const res = await page.goto(href!);
  expect(res?.status()).toBe(200);
  await expect(page.locator('h1')).toBeVisible();
});

test('SEO 기본값: canonical·robots 메타·robots.txt·sitemap', async ({ page, request }) => {
  for (const path of ['/', '/intro', '/medical/disc', '/news', '/guide', '/policy/price']) {
    await page.goto(path);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    await expect(page.locator('meta[name="robots"]')).toHaveCount(1);
  }
  const robots = await request.get('/robots.txt');
  expect(robots.status()).toBe(200);
  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.status()).toBe(200);
  const locs = ((await sitemap.text()).match(/<loc>/g) || []).length;
  expect(locs).toBeGreaterThanOrEqual(20);
});

test('빈 링크(href="#")가 없다', async ({ page }) => {
  for (const path of ['/', '/intro', '/medical', '/guide', '/news']) {
    await page.goto(path);
    await expect(page.locator('a[href="#"]')).toHaveCount(0);
  }
});
