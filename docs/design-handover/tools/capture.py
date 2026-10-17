"""개편 화면 캡처 스크립트 (데스크톱 1440px, 모바일 390px, 전체 페이지).

사용:
  1) 저장소에서 `npm run build && npx next start -p 3100` 로 서버를 띄웁니다.
  2) pip install playwright && playwright install chromium (처음 한 번)
  3) python3 docs/design-handover/tools/capture.py [출력폴더]
     (출력폴더를 생략하면 저장소 밖 /tmp/jiin-captures 에 저장합니다. 저장소 안에 폴더를 만들지 마세요.)

세로가 8000px 을 넘는 캡처는 이미지 도구에서 거부될 수 있으니 필요하면 위·아래로 나눕니다.
"""
import asyncio, pathlib, sys
from playwright.async_api import async_playwright

OUT = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else "/tmp/jiin-captures")
OUT.mkdir(parents=True, exist_ok=True)
BASE = "http://localhost:3100"
PAGES = [("01-home", "/"), ("02-intro", "/intro"), ("03-medical", "/medical"),
         ("04-guide", "/guide"), ("05-news", "/news"), ("06-community", "/community")]

async def scroll_through(pg):
    h = await pg.evaluate("document.documentElement.scrollHeight"); y = 0
    while y < h:
        await pg.evaluate(f"window.scrollTo(0,{y})"); await pg.wait_for_timeout(120); y += 400
        h = await pg.evaluate("document.documentElement.scrollHeight")
    await pg.wait_for_timeout(600); await pg.evaluate("window.scrollTo(0,0)"); await pg.wait_for_timeout(400)

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for dev, (w, h) in {"desktop": (1440, 900), "mobile": (390, 844)}.items():
            ctx = await b.new_context(viewport={"width": w, "height": h})
            pg = await ctx.new_page()
            for name, path in PAGES:
                await pg.goto(BASE + path, wait_until="load"); await pg.wait_for_timeout(1000)
                await scroll_through(pg)
                await pg.add_style_tag(content=".fixed.bottom-0{display:none !important}")  # 모바일 하단 고정 바 숨김
                await pg.screenshot(path=str(OUT / f"{name}-{dev}.png"), full_page=True)
                print(dev, name)
            await ctx.close()
        await b.close()

asyncio.run(main())
