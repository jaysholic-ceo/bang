import { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = {
    title: "비급여 수가표 | 지인마취통증의학과 강북점",
    description: "지인마취통증의학과 강북점의 비급여 항목 및 수가를 안내해 드립니다. 의료법 제45조에 의거하여 투명하게 공개합니다.",
};

const DRUGS = [
    { name: "네포팜주 (Nefopam inj)", code: "6988503581", price: "10,000", note: "" },
    { name: "아미노플라스마주 250ml (Aminoplasma inj)", code: "64740090900", price: "40,000", note: "" },
    { name: "뉴트리헥사주스주 100ml (Nutri Hexas inj)", code: "64510303600", price: "-", note: "" },
    { name: "트레스탄캡셀 (Trestan Cap)", code: "647802340", price: "400", note: "" },
    { name: "프리베나13주 (Prevenar inj)", code: "648902270", price: "120,000", note: "" },
    { name: "안국니트로무리엔연고 20g", code: "650201050", price: "2,000", note: "" },
    { name: "히루니다제주 (Hylunidase inj)", code: "650801740", price: "54,000", note: "" },
    { name: "조스타박스주 (Zostavax inj)", code: "655500900", price: "150,000", note: "" },
    { name: "싱그릭스 (Shingrix inj)", code: "650003220", price: "230,000", note: "" },
    { name: "액티몰스 (Actimols solution)", code: "650900501", price: "3,300", note: "" },
    { name: "올페인캡셀 (Allpain Cap)", code: "659900640", price: "600", note: "" },
    { name: "ATP-S 주 (ATP-S inj)", code: "645905981", price: "20,000", note: "" },
    { name: "리포라제주 (Liporase inj)", code: "-", price: "100,000~130,000", note: "부위에 따라 차등" },
    { name: "메리트 D 주 (Merit D inj)", code: "670400521", price: "40,000", note: "" },
    { name: "마시주 (Masi inj)", code: "670600670", price: "5,000", note: "" },
    { name: "메리트 비타민 주 (BB-S inj)", code: "670600790", price: "15,000", note: "" },
    { name: "비타모주 (Vitamo inj)", code: "670601120", price: "5,000", note: "" },
    { name: "진코발주 (Ginkobal inj)", code: "670601940", price: "10,000", note: "" },
    { name: "하이코민주 (Hycomin inj)", code: "670623630", price: "10,000", note: "" },
    { name: "카페인주 (Caffeine inj)", code: "670603330", price: "3,000", note: "" },
    { name: "피리독신주 (Pyridoxine HCL inj)", code: "670603640", price: "5,000", note: "" },
    { name: "칼리민로선 50ml", code: "657400580", price: "2,500", note: "" },
    { name: "아세트펜프리믹스 50ml", code: "640007401", price: "15,000", note: "" },
    { name: "아세트펜프리믹스 100ml", code: "640007291", price: "20,000", note: "" },
    { name: "히알넥스 (Hyalnex)", code: "698503611", price: "63,000", note: "" },
    { name: "히알주 (Hyal inj)", code: "643705231", price: "61,000", note: "" },
    { name: "아모부로펜주 (Amoburofen inj)", code: "670707751", price: "30,000", note: "" },
    { name: "셀레나제 100프로포 250ug (Selenase inj)", code: "672900380", price: "5,000", note: "" },
    { name: "라이넥주 (Laennec inj)", code: "681100020", price: "30,000", note: "" },
    { name: "히시파겐씨주 (Hishipagen-C inj)", code: "681100261", price: "20,000", note: "" },
    { name: "오마원페리주 (Omap one peri inj)", code: "640006701", price: "80,000", note: "" },
    { name: "이뮨알파원주 (Immun Alpha1 inj)", code: "681100411", price: "60,000", note: "" },
    { name: "하이랙스주 (Hirax inj)", code: "65482041", price: "150,000", note: "" },
    { name: "메디스카겔 (Medi Scar Gel)", code: "BM50004E8", price: "38,000", note: "" },
    { name: "인플루엔자 백신 (Influenza vaccine)", code: "-", price: "35,000", note: "" },
];

const PROCEDURES = [
    { category: "상급병실료", sub: "상급병실료", name: "1인실", code: "ABZ01", price: "100,000", range: "", note: "" },
    { category: "상급병실료", sub: "상급병실료", name: "2인실", code: "ABZ02", price: "50,000", range: "", note: "" },
    { category: "검사료", sub: "초음파검사료", name: "도플러초음파 (Doppler US)", code: "EB848", price: "50,000", range: "", note: "" },
    { category: "검사료", sub: "초음파검사료", name: "근골관절초음파 (MSK US)", code: "EB846", price: "30,000", range: "~70,000", note: "" },
    { category: "방사선료", sub: "골밀도검사", name: "골다공증 검사", code: "HC342", price: "45,000", range: "~60,000", note: "" },
    { category: "이학요법료", sub: "이학요법료", name: "도수치료 — 사지관절 (Manual therapy)", code: "MX1222", price: "10,000", range: "~60,000", note: "" },
    { category: "이학요법료", sub: "이학요법료", name: "도수치료 — 척추 (Manual therapy)", code: "MX1222", price: "80,000", range: "", note: "" },
    { category: "이학요법료", sub: "이학요법료", name: "증식치료 — 사지관절 (Prolotherapy)", code: "MY142", price: "10,000", range: "~20,000", note: "level당" },
    { category: "이학요법료", sub: "이학요법료", name: "증식치료 — 척추 (Spine prolotherapy)", code: "MY143", price: "120,000", range: "", note: "" },
    { category: "이학요법료", sub: "이학요법료", name: "F.I.M.S", code: "MZ001", price: "130,000", range: "", note: "" },
];

const MATERIALS = [
    { category: "풍선확장경막외강압박술", name: "풍선카테터 (ZINeu Catheter)", code: "BJ801NX", price: "900,000", note: "" },
    { category: "경막외강 신경박리술", name: "추간공성형술 카테터 (FORAMOON)", code: "BJ800SH", price: "900,000", note: "" },
    { category: "경막외강 신경박리술", name: "EPI-GEN CATH", code: "BJ701RG", price: "500,000", note: "" },
    { category: "보조기", name: "손목고정보조기 (Wrist brace)", code: "BC208YF", price: "15,000", note: "" },
    { category: "보조기", name: "척추골절보조기 (TLSO Back Brace)", code: "BC224PV", price: "150,000", note: "" },
    { category: "보조기", name: "필터주사기 (Filter needle)", code: "M11003", price: "1,000", note: "" },
    { category: "보조기", name: "목보호대 (Thomas collar)", code: "-", price: "8,000", note: "" },
    { category: "보조기", name: "목발 (Crutch)", code: "-", price: "20,000", note: "" },
];

export default function PricePolicyPage() {
    return (
        <div className="min-h-screen bg-background pb-24">
            <div className="mb-10 md:mb-16">
                <PageHero
                    eyebrow="비급여 안내"
                    title="비급여 수가표"
                    description="의료법 제45조에 의거하여 비급여 항목 및 수가를 다음과 같이 투명하게 공개합니다."
                />
            </div>

            <div className="container mx-auto max-w-6xl px-4 md:px-6 space-y-10 md:space-y-16">
                {/* Section 1: 약제 */}
                <section>
                    <div className="flex items-center gap-3 mb-6 md:mb-8">
                        <div className="w-1.5 h-8 bg-primary rounded-full" />
                        <h2 className="text-xl md:text-2xl font-serif font-bold text-zinc-900 tracking-tight">약제 <span className="text-muted-foreground font-normal text-sm md:text-base ml-2">(주사제·캡슐 등)</span></h2>
                    </div>
                    <div className="bg-white rounded-2xl md:rounded-[2rem] shadow-premium border border-slate-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left min-w-[640px]">
                                <thead>
                                    <tr className="bg-slate-50/80 border-b border-slate-200">
                                        <th className="px-4 md:px-6 py-4 font-bold text-zinc-700 text-[11px] md:text-xs uppercase tracking-wider">명칭</th>
                                        <th className="px-4 md:px-6 py-4 font-bold text-zinc-700 text-[11px] md:text-xs uppercase tracking-wider">코드</th>
                                        <th className="px-4 md:px-6 py-4 font-bold text-zinc-700 text-[11px] md:text-xs uppercase tracking-wider text-right">비용(원)</th>
                                        <th className="px-4 md:px-6 py-4 font-bold text-zinc-700 text-[11px] md:text-xs uppercase tracking-wider">비고</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {DRUGS.map((d, i) => (
                                        <tr key={i} className="hover:bg-primary/[0.02] transition-colors">
                                            <td className="px-4 md:px-6 py-3.5 text-zinc-900 font-medium text-[13px] break-keep">{d.name}</td>
                                            <td className="px-4 md:px-6 py-3.5 text-muted-foreground text-xs font-mono">{d.code}</td>
                                            <td className="px-4 md:px-6 py-3.5 text-zinc-900 font-bold text-right tabular-nums">{d.price}</td>
                                            <td className="px-4 md:px-6 py-3.5 text-zinc-500 text-xs">{d.note}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* Section 2: 행위 */}
                <section>
                    <div className="flex items-center gap-3 mb-6 md:mb-8">
                        <div className="w-1.5 h-8 bg-primary rounded-full" />
                        <h2 className="text-xl md:text-2xl font-serif font-bold text-zinc-900 tracking-tight">행위 <span className="text-muted-foreground font-normal text-sm md:text-base ml-2">(검사·치료 등)</span></h2>
                    </div>
                    <div className="bg-white rounded-2xl md:rounded-[2rem] shadow-premium border border-slate-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left min-w-[740px]">
                                <thead>
                                    <tr className="bg-slate-50/80 border-b border-slate-200">
                                        <th className="px-4 md:px-6 py-4 font-bold text-zinc-700 text-[11px] md:text-xs uppercase tracking-wider">분류</th>
                                        <th className="px-4 md:px-6 py-4 font-bold text-zinc-700 text-[11px] md:text-xs uppercase tracking-wider">명칭</th>
                                        <th className="px-4 md:px-6 py-4 font-bold text-zinc-700 text-[11px] md:text-xs uppercase tracking-wider">코드</th>
                                        <th className="px-4 md:px-6 py-4 font-bold text-zinc-700 text-[11px] md:text-xs uppercase tracking-wider text-right">비용(원)</th>
                                        <th className="px-4 md:px-6 py-4 font-bold text-zinc-700 text-[11px] md:text-xs uppercase tracking-wider">비고</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {PROCEDURES.map((p, i) => (
                                        <tr key={i} className="hover:bg-primary/[0.02] transition-colors">
                                            <td className="px-4 md:px-6 py-3.5 text-zinc-500 text-xs font-bold">{p.category}</td>
                                            <td className="px-4 md:px-6 py-3.5 text-zinc-900 font-medium text-[13px] break-keep">{p.name}</td>
                                            <td className="px-4 md:px-6 py-3.5 text-muted-foreground text-xs font-mono">{p.code}</td>
                                            <td className="px-4 md:px-6 py-3.5 text-zinc-900 font-bold text-right tabular-nums whitespace-nowrap">{p.price}{p.range && <span className="text-muted-foreground font-normal">{p.range}</span>}</td>
                                            <td className="px-4 md:px-6 py-3.5 text-zinc-500 text-xs">{p.note}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* Section 3: 치료재료 */}
                <section>
                    <div className="flex items-center gap-3 mb-6 md:mb-8">
                        <div className="w-1.5 h-8 bg-primary rounded-full" />
                        <h2 className="text-xl md:text-2xl font-serif font-bold text-zinc-900 tracking-tight">치료재료 <span className="text-muted-foreground font-normal text-sm md:text-base ml-2">(보조기·재료 등)</span></h2>
                    </div>
                    <div className="bg-white rounded-2xl md:rounded-[2rem] shadow-premium border border-slate-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left min-w-[640px]">
                                <thead>
                                    <tr className="bg-slate-50/80 border-b border-slate-200">
                                        <th className="px-4 md:px-6 py-4 font-bold text-zinc-700 text-[11px] md:text-xs uppercase tracking-wider">분류</th>
                                        <th className="px-4 md:px-6 py-4 font-bold text-zinc-700 text-[11px] md:text-xs uppercase tracking-wider">명칭</th>
                                        <th className="px-4 md:px-6 py-4 font-bold text-zinc-700 text-[11px] md:text-xs uppercase tracking-wider">코드</th>
                                        <th className="px-4 md:px-6 py-4 font-bold text-zinc-700 text-[11px] md:text-xs uppercase tracking-wider text-right">비용(원)</th>
                                        <th className="px-4 md:px-6 py-4 font-bold text-zinc-700 text-[11px] md:text-xs uppercase tracking-wider">비고</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {MATERIALS.map((m, i) => (
                                        <tr key={i} className="hover:bg-primary/[0.02] transition-colors">
                                            <td className="px-4 md:px-6 py-3.5 text-zinc-500 text-xs font-bold">{m.category}</td>
                                            <td className="px-4 md:px-6 py-3.5 text-zinc-900 font-medium text-[13px] break-keep">{m.name}</td>
                                            <td className="px-4 md:px-6 py-3.5 text-muted-foreground text-xs font-mono">{m.code}</td>
                                            <td className="px-4 md:px-6 py-3.5 text-zinc-900 font-bold text-right tabular-nums">{m.price}</td>
                                            <td className="px-4 md:px-6 py-3.5 text-zinc-500 text-xs">{m.note}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* Footer Notice */}
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-premium border border-slate-100">
                    <p className="text-[12px] md:text-[13px] text-zinc-500 leading-relaxed break-keep">
                        <span className="text-primary font-bold">*</span> 위 비용은 치료 재료대 및 사용량에 따라 변동될 수 있습니다.<br />
                        <span className="text-primary font-bold">*</span> 상세한 비용 문의는 원내 데스크(02-6431-1234)에서 안내해 드립니다.<br />
                        <span className="text-primary font-bold">*</span> 본 수가표는 의료법 제45조 및 시행규칙 제42조의2에 의거하여 게시합니다.
                    </p>
                </div>
            </div>
        </div>
    );
}
