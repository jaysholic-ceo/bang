import { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
    title: "개인정보처리방침",
    description: "지인마취통증의학과 강북점의 개인정보처리방침을 안내해 드립니다.",
    path: "/policy/privacy",
});

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-white pt-32 pb-24">
            <div className="container mx-auto max-w-4xl px-6">
                <div className="mb-16 text-center">
                    <h1 className="text-4xl font-serif font-bold text-foreground mb-4 tracking-tight">개인정보처리방침</h1>
                    <p className="text-muted-foreground font-medium">환자님의 개인정보를 소중히 보호하며 투명하게 관리합니다.</p>
                </div>

                <div className="space-y-12">
                    <section>
                        <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                            <div className="w-1.5 h-6 bg-primary rounded-full" />
                            제1조 (개인정보의 처리 목적)
                        </h2>
                        <div className="text-sm text-muted-foreground leading-loose space-y-4 font-light">
                            <p>지인마취통증의학과 강북점(이하 &apos;병원&apos;)은 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 사용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>진료 서비스 제공: 진찰, 예약, 증명서 발급 등</li>
                                <li>진료비 청구, 수납, 미수금 결제 등</li>
                                <li>상담 및 안내: 검진 및 예약 안내 등</li>
                                <li>민원 처리: 불만 처리 등 민원 처리, 고지사항 전달</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                            <div className="w-1.5 h-6 bg-primary rounded-full" />
                            제2조 (개인정보의 처리 및 보유 기간)
                        </h2>
                        <div className="text-sm text-muted-foreground leading-loose space-y-4 font-light">
                            <p>병원은 의료법 및 관련 법령에 명시된 기간 동안 개인정보를 보유하며, 그 이후에는 지체 없이 파기합니다.</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>진료기록부: 10년 (의료법)</li>
                                <li>처방전: 2년 (의료법)</li>
                                <li>수술기록: 10년 (의료법)</li>
                                <li>검사내용 및 소견기록: 5년 (의료법)</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                            <div className="w-1.5 h-6 bg-primary rounded-full" />
                            제3조 (정보주체의 권리·의무 및 그 행사방법)
                        </h2>
                        <div className="text-sm text-muted-foreground leading-loose space-y-4 font-light">
                            <p>정보주체는 병원에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다. 단, 의료법에 따라 파기가 금지된 진료기록부 등의 정보는 삭제 요청 시 제한될 수 있습니다.</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                            <div className="w-1.5 h-6 bg-primary rounded-full" />
                            제4조 (개인정보 보호책임자)
                        </h2>
                        <div className="text-sm text-muted-foreground leading-loose space-y-4 font-light">
                            <p>병원은 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.</p>
                            <div className="bg-background p-6 rounded-2xl mt-4 border border-border">
                                <p className="font-bold text-foreground mb-2">개인정보 보호담당자</p>
                                <ul className="space-y-1">
                                    <li>성명: 지인마취통증의학과 강북점 원장</li>
                                    <li>연락처: 02-6431-1234</li>
                                    <li>이메일: [이메일 주소 입력 필요]</li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>
                
                <p className="mt-16 text-[12px] text-muted-foreground border-t border-border pt-8">
                    공고일자: 2024년 1월 1일 / 시행일자: 2024년 1월 8일
                </p>
            </div>
        </div>
    );
}
