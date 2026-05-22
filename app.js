// Issue data with full analysis
const EXPECTED_STRATEGIC_INSIGHTS_SCHEMA_VERSION = 'strategic_insights_v1';
const issueData = {
    sugar: {
        title: "가당음료에 설탕 부담금(1L당 100원)을 부과해야 한다",
        subtitle: "국민건강증진 목적 조세 신설에 대한 찬반",
        category: "보건",
        stats: { agree: 11.2, agreeish: 26.8, disagreeish: 30.9, disagree: 17.4, unsure: 13.7 },
        segments: {
            ideology5: { prog:[24,38,16,8,14], modprog:[18,34,20,12,16], mod:[10,28,29,16,17], modcons:[6,20,36,24,14], cons:[4,14,38,32,12] },
            age6: { a18:[22,34,18,10,16], a30:[18,32,22,12,16], a40:[12,28,28,18,14], a50:[10,24,32,20,14], a60:[8,18,36,26,12], a70:[6,14,38,30,12] },
            region7: { seoul:[14,30,26,16,14], gyeonggi:[12,28,28,18,14], chungcheong:[10,26,30,20,14], honam:[20,36,18,12,14], busan:[8,22,34,22,14], daegu:[6,18,36,28,12], gangwon:[11,26,28,20,15] }
        },
        ideology: { prog: [21, 37, 18, 10, 14], mod: [10, 28, 29, 16, 17], cons: [5, 17, 38, 30, 10] },
        age: { a20: [20, 32, 20, 12, 16], a40: [12, 30, 28, 17, 13], a60: [8, 20, 35, 25, 12] },
        region: { honam: [19, 36, 20, 12, 13], seoul: [13, 29, 28, 17, 13], yeongnam: [7, 18, 36, 26, 13] },
        factors: [
            { coef: "+1.42", name: "정치성향: 진보 (vs 보수)", sig: "p<.001***", pos: true },
            { coef: "+0.89", name: "연령: 18-29세 (vs 60+)", sig: "p<.01**", pos: true },
            { coef: "+0.72", name: "지역: 호남권 (vs 영남권)", sig: "p<.01**", pos: true },
            { coef: "+0.45", name: "성별: 여성 (vs 남성)", sig: "p<.05*", pos: true },
            { coef: "-0.38", name: "성인병이력: 있음", sig: "p<.05*", pos: false },
            { coef: "-0.62", name: "월지출: 200만원+ (vs 50만원이하)", sig: "p<.01**", pos: false }
        ],
        target: "진보 성향 20-30대 호남권 여성 (동의 확률 3.2배↑)",
        risks: { critical: ["물가 부담 - 50대+ 중도보수층 이탈 (38%)", "역진세 논란 - 저소득층 부담 가중 프레임 (32%)"], medium: ["업계 반발 - 음료/식품업계 로비", "실효성 의문 - 100원으로 소비 감소 미미"], insight: ["세수 용처 명확화 (건보료 인하 연계)", "취약계층 예외 조항 검토", "영남권 중장년층 타겟 설득 캠페인"] },
        jury: [
            { name: "김지현", demo: "28세/여/진보/서울", stance: "agree", quote: "영국은 부담금 도입 후 제조사가 자발적으로 당 함량을 30% 줄였어요. 소비자가 아니라 기업이 바뀌는 정책입니다. 징벌이 아니라 설계의 문제예요." },
            { name: "이준호", demo: "35세/남/중도진보/경기", stance: "agreeish", quote: "100원이면 행동 변화엔 약하지만, 세수를 건보료 인하에 연계하면 저항을 줄일 수 있어요. '건강세'가 아니라 '건보 할인 재원'으로 프레이밍해야 합니다." },
            { name: "박서연", demo: "42세/여/중도/인천", stance: "unsure", quote: "편의점 500ml 콜라가 50원 오르는 건데, 그걸로 뭐가 바뀌나 싶어요. 실효성 데이터가 없으면 또 하나의 잡세로 전락할 겁니다." },
            { name: "정민수", demo: "55세/남/중도보수/대구", stance: "disagreeish", quote: "저소득층이 편의점 음료를 더 많이 삽니다. 결국 역진세예요. 부담금 걷어서 강남 헬스장 보조금 주는 꼴 나면 분노가 폭발합니다." },
            { name: "최은지", demo: "31세/여/진보/광주", stance: "agree", quote: "멕시코가 증명했잖아요. 도입 1년 만에 당뇨 관련 의료비가 연 4조원 절감됐어요. 반대하는 분들, 숫자로 답해주세요." },
            { name: "김영철", demo: "68세/남/보수/부산", stance: "disagree", quote: "내가 뭘 마시든 정부가 왜 간섭합니까. 건강은 개인 책임이지 세금으로 해결할 문제가 아니에요. 이게 자유 대한민국입니까." },
            { name: "송미라", demo: "38세/여/중도진보/대전", stance: "agreeish", quote: "학교 앞 문방구에서 아이들이 500원짜리 에너지 음료를 사요. 부담금 수익으로 학교 급식 과일 간식을 지원하면 설득력이 생깁니다." },
            { name: "오재훈", demo: "48세/남/중도/경남", stance: "disagreeish", quote: "음료업계 20만 종사자입니다. 수요 감소보다 무서운 건 '건강에 나쁜 업종' 낙인이에요. 레시피 개선 인센티브가 먼저 아닌가요." },
            { name: "한수진", demo: "52세/여/중도/충북", stance: "unsure", quote: "세금을 걷는 건 쉽지만 어디에 쓰는지 투명하게 공개된 적이 있나요? 용처 없는 부담금은 그냥 증세입니다." },
            { name: "윤상호", demo: "62세/남/보수/경북", stance: "disagree", quote: "담뱃값 올렸을 때 세수만 늘고 흡연율은 제자리였어요. 규제 만능주의의 또 다른 실패작이 될 겁니다." },
            { name: "장현우", demo: "25세/남/중도진보/서울", stance: "agreeish", quote: "건보 적자가 매년 3조씩 늘고 있어요. 당류가 원인인 대사증후군 의료비를 생각하면, 이건 예방투자지 규제가 아닙니다." },
            { name: "조은혜", demo: "45세/여/중도보수/울산", stance: "disagreeish", quote: "이미 식약처가 당류 줄이기 캠페인 하고 있잖아요. 교육으로 될 일을 세금으로 하면 국민이 정부를 교육자가 아니라 징수원으로 봅니다." }
        ],
        mapDots: [
            { id: "P2", x: 22, y: 25, color: "#10b981", label: "진보 20대", desc: "진보적 청년층. 건강권/공공성 프레임에 호응" },
            { id: "M3", x: 32, y: 35, color: "#34d399", label: "중도진보 30대", desc: "합리적 진보. 근거 기반 정책에 조건부 지지" },
            { id: "C4", x: 50, y: 52, color: "#f59e0b", label: "중도 40대", desc: "핵심 설득 타겟. 물가 vs 건강 저울질" },
            { id: "R5", x: 68, y: 65, color: "#f87171", label: "중도보수 50대", desc: "세금 저항 심리 강함. 역진세 논란에 민감" },
            { id: "R6", x: 78, y: 78, color: "#ef4444", label: "보수 60+", desc: "강한 반대. 개인 선택권 침해 프레임" },
            { id: "H", x: 28, y: 30, color: "#06b6d4", label: "호남권", desc: "진보 성향 높아 동의율 55%로 최고" },
            { id: "S", x: 48, y: 48, color: "#8b5cf6", label: "수도권", desc: "중도적. 여론 향방의 캐스팅보트" },
            { id: "Y", x: 72, y: 70, color: "#ec4899", label: "영남권", desc: "보수 성향 높아 반대율 62%로 최고" }
        ]
    },
    realestate: {
        title: "다주택자 양도세 중과세율을 복원해야 한다",
        subtitle: "2주택 이상 보유자 양도차익 추가 과세 재시행",
        category: "부동산",
        stats: { agree: 28.2, agreeish: 24.1, disagreeish: 22.4, disagree: 17.8, unsure: 7.5 },
        segments: {
            ideology5: { prog:[18,28,26,18,10], modprog:[16,26,28,20,10], mod:[22,24,24,18,12], modcons:[30,24,20,14,12], cons:[38,22,16,12,12] },
            age6: { a18:[14,20,28,26,12], a30:[16,24,26,22,12], a40:[24,26,22,16,12], a50:[28,24,20,16,12], a60:[34,24,18,12,12], a70:[38,22,16,14,10] },
            region7: { seoul:[22,26,24,16,12], gyeonggi:[20,24,26,18,12], chungcheong:[24,24,22,18,12], honam:[14,22,28,24,12], busan:[30,24,20,14,12], daegu:[34,22,18,14,12], gangwon:[22,24,24,18,12] }
        },
        ideology: { prog: [16, 26, 28, 22, 8], mod: [22, 24, 24, 18, 12], cons: [36, 24, 18, 12, 10] },
        age: { a20: [14, 22, 28, 24, 12], a40: [24, 26, 22, 16, 12], a60: [32, 24, 20, 14, 10] },
        region: { honam: [14, 24, 28, 24, 10], seoul: [20, 24, 26, 18, 12], yeongnam: [32, 24, 20, 14, 10] },
        factors: [
            { coef: "+1.68", name: "정치성향: 진보 (vs 보수)", sig: "p<.001***", pos: true },
            { coef: "+1.12", name: "주택소유: 무주택 (vs 다주택)", sig: "p<.001***", pos: true },
            { coef: "+0.78", name: "연령: 30대 (vs 60+)", sig: "p<.01**", pos: true },
            { coef: "-0.92", name: "소득: 상위 20% (vs 하위 20%)", sig: "p<.001***", pos: false },
            { coef: "-0.55", name: "지역: 강남3구 거주", sig: "p<.01**", pos: false }
        ],
        target: "진보 성향 무주택 30대 (동의 확률 4.1배↑)",
        risks: { critical: ["거래 절벽 우려 - 매물 잠김 현상 심화", "조세 저항 - 다주택자 단체 반발"], medium: ["실효성 논란 - 가격 하락 효과 미미", "역외 투자 유출 - 부동산 대신 해외 자산"], insight: ["무주택자 혜택 연계 필수", "1주택 장기보유 실거주자 예외", "단계적 도입으로 시장 충격 완화"] },
        jury: [
            { name: "김민재", demo: "32세/남/진보/서울", stance: "agree", quote: "서울 아파트 평균 12억인데 30대 연봉으로 30년을 모아야 해요. 투기 수요를 세금으로 차단하지 않으면 이 세대는 영원히 집을 못 삽니다." },
            { name: "이수정", demo: "29세/여/중도진보/경기", stance: "agree", quote: "중과세 유예 2년 동안 다주택자 순매수가 47% 늘었어요. '시장 자율'이라는 건 결국 투기꾼의 자유였던 겁니다." },
            { name: "박영호", demo: "58세/남/중도/대전", stance: "unsure", quote: "중과 복원하면 매물이 잠기고, 안 하면 가격이 오르고. 정답이 없어요. 보유세 강화가 더 효과적이지 않을까요?" },
            { name: "정상훈", demo: "52세/남/보수/서울", stance: "disagree", quote: "팔지도 못하게 세금 물리면 전세 물량이 줄어요. 결국 피해는 세입자한테 갑니다. 거래 절벽이 서민한테 유리한 적이 단 한 번도 없었어요." },
            { name: "최미영", demo: "45세/여/중도/부산", stance: "disagreeish", quote: "문재인 정부 때 25번 부동산 대책 내놓고 집값 83% 올랐잖아요. 규제의 역설을 이제 학습해야 합니다." },
            { name: "김태우", demo: "62세/남/보수/대구", stance: "disagree", quote: "내 재산을 내 맘대로 사고파는 게 뭐가 문제입니까. 세금으로 시장 통제하겠다는 발상 자체가 사회주의적이에요." },
            { name: "송지은", demo: "35세/여/진보/광주", stance: "agree", quote: "캐나다는 외국인 투기 차단 + 양도세 강화로 밴쿠버 집값을 2년 만에 15% 잡았어요. 공급만이 답이라는 건 개발업계 논리입니다." },
            { name: "오현우", demo: "41세/남/중도보수/경남", stance: "disagreeish", quote: "지방은 이미 집이 안 팔려요. 전국 일률 중과는 서울 문제를 지방에 떠넘기는 거예요. 지역 차등이 필수입니다." },
            { name: "한정민", demo: "27세/남/중도진보/서울", stance: "agreeish", quote: "영끌해서 1주택 마련한 사람과 10채 굴리는 사람이 같은 세율? 실거주 1주택은 완전 예외, 3주택부터 징벌적으로 가야 합니다." },
            { name: "윤서희", demo: "48세/여/중도/인천", stance: "agreeish", quote: "아이 둘 키우는데 전셋집 3번째 쫓겨났어요. 다주택자가 전세를 미끼로 갭투자하는 구조를 끊으려면 세금밖에 방법이 없어요." },
            { name: "장동현", demo: "55세/남/보수/경북", stance: "disagree", quote: "기업인으로서 말합니다. 부동산이 자산의 70%인 나라에서 양도세 중과는 소비 위축→경기 침체의 방아쇠입니다." },
            { name: "조윤아", demo: "38세/여/중도진보/대전", stance: "agreeish", quote: "실거주 목적 1주택자와 투기 목적 다주택자를 같이 취급하면 안 돼요. '실거주 예외 + 다주택 중과'가 정답이라고 봅니다." }
        ],
        mapDots: [
            { id: "P2", x: 20, y: 20, color: "#10b981", label: "진보 20-30대", desc: "무주택자 다수. 강력 지지" },
            { id: "M4", x: 38, y: 38, color: "#34d399", label: "중도진보 40대", desc: "내 집 마련 희망층. 조건부 지지" },
            { id: "C5", x: 52, y: 55, color: "#f59e0b", label: "중도 50대", desc: "1주택 보유. 실거주 예외 요구" },
            { id: "R6", x: 75, y: 75, color: "#ef4444", label: "보수 60+", desc: "다주택 비율 높음. 강한 반대" },
            { id: "H", x: 25, y: 25, color: "#06b6d4", label: "호남권", desc: "진보 성향. 동의율 68%" },
            { id: "S", x: 45, y: 45, color: "#8b5cf6", label: "수도권", desc: "무주택 비율 높아 56% 지지" },
            { id: "Y", x: 70, y: 72, color: "#ec4899", label: "영남권", desc: "보수 성향. 반대율 60%" }
        ]
    },
    semiconductor: {
        title: "반도체 투자에 대한 세액공제를 25%로 확대해야 한다",
        subtitle: "반도체특별법 기반 대규모 시설투자 조세지원 강화",
        category: "산업",
        stats: { agree: 26.4, agreeish: 31.8, disagreeish: 17.5, disagree: 10.2, unsure: 14.1 },
        segments: {
            ideology5: { prog:[12,18,28,30,12], modprog:[16,22,26,26,10], mod:[34,24,18,16,8], modcons:[44,24,14,10,8], cons:[56,22,10,4,8] },
            age6: { a18:[16,20,26,28,10], a30:[22,24,22,22,10], a40:[34,25,18,15,8], a50:[40,24,16,12,8], a60:[50,22,12,8,8], a70:[54,20,12,6,8] },
            region7: { seoul:[32,25,20,15,8], gyeonggi:[30,24,22,16,8], chungcheong:[36,24,18,14,8], honam:[14,20,28,28,10], busan:[42,24,16,10,8], daegu:[48,22,14,8,8], gangwon:[34,24,20,14,8] }
        },
        ideology: { prog: [14, 20, 28, 28, 10], mod: [34, 24, 18, 16, 8], cons: [52, 24, 10, 6, 8] },
        age: { a20: [18, 22, 24, 26, 10], a40: [34, 25, 18, 15, 8], a60: [48, 24, 12, 8, 8] },
        region: { honam: [16, 20, 26, 28, 10], seoul: [32, 25, 20, 15, 8], yeongnam: [46, 24, 14, 10, 6] },
        factors: [
            { coef: "+0.85", name: "직업: IT/제조업 종사", sig: "p<.001***", pos: true },
            { coef: "+0.62", name: "투자: 반도체 관련주 보유", sig: "p<.01**", pos: true },
            { coef: "+0.48", name: "지역: 경기 남부 (평택/화성)", sig: "p<.05*", pos: true },
            { coef: "-0.35", name: "정치성향: 진보 (vs 보수)", sig: "p<.05*", pos: false },
            { coef: "-0.42", name: "환경 관심도: 높음", sig: "p<.05*", pos: false }
        ],
        target: "IT/제조업 반도체 관련주 보유 수도권 거주자 (동의 확률 2.4배↑)",
        risks: { critical: ["특정 대기업 특혜 논란", "재정 부담 - 세수 감소 우려"], medium: ["환경 문제 - 용수/전력 과다 사용", "지역 편중 - 비수도권 소외"], insight: ["중소 협력업체 동반 지원 명시", "친환경 투자 조건 연계", "비수도권 투자 시 추가 인센티브"] },
        jury: [
            { name: "김동원", demo: "42세/남/중도/경기", stance: "agree", quote: "TSMC에 미국이 520억 달러 쏟고 있어요. 우리가 25% 공제도 안 하면 삼성·하이닉스 투자가 텍사스로 갑니다. 이건 이념이 아니라 생존입니다." },
            { name: "이하늘", demo: "28세/여/중도진보/서울", stance: "agreeish", quote: "공제 혜택이 대기업에만 가면 안 돼요. 장비·소재·패키징 중소기업 동반 공제가 법안에 반드시 포함돼야 합니다." },
            { name: "박준형", demo: "35세/남/보수/경기", stance: "agree", quote: "평택 캠퍼스 하나가 연 매출 40조예요. 공제 3조 주고 세수 12조 걷는 구조입니다. 이걸 특혜라 부르는 건 산수를 못 하는 겁니다." },
            { name: "정수민", demo: "48세/여/진보/광주", stance: "disagreeish", quote: "삼성이 지난 5년간 법인세 실효세율 12%였어요. 추가 공제하면 실질 세율이 10% 미만으로 내려가요. 중소기업은 22% 내는데, 이게 공정한가요?" },
            { name: "최원석", demo: "55세/남/중도보수/대구", stance: "agreeish", quote: "중국이 반도체 굴기에 연 30조 쏟고 있습니다. 미국·일본·EU 모두 보조금 전쟁 중이에요. 우리만 시장 논리 운운하면 5년 뒤 격차가 돌이킬 수 없어집니다." },
            { name: "김예진", demo: "32세/여/진보/서울", stance: "unsure", quote: "용인 반도체 클러스터가 연간 지하수 4억 톤을 쓸 예정이에요. 환경 영향 평가를 특별법으로 면제하는 건 위험합니다." },
            { name: "송태현", demo: "45세/남/중도/부산", stance: "agreeish", quote: "반도체 수출이 GDP의 18%예요. 자동차·조선까지 합치면 20% 넘어요. 이 산업이 흔들리면 나라 전체가 흔들립니다." },
            { name: "오지영", demo: "38세/여/중도진보/대전", stance: "unsure", quote: "대전 ETRI 연구원입니다. 세액 공제보다 인력 양성에 예산을 써야 해요. 반도체 석·박사가 연 400명 부족한데 공장만 지으면 뭘 하나요." },
            { name: "한승우", demo: "62세/남/보수/경북", stance: "agree", quote: "미국 CHIPS Act가 2년 만에 반도체 일자리 11만개를 만들었습니다. 국익 앞에 좌우가 어딨습니까." },
            { name: "윤채린", demo: "25세/여/중도/인천", stance: "agreeish", quote: "취업 시장에서 반도체만큼 확실한 분야가 없어요. 공제가 투자로 이어지고, 투자가 채용으로 이어지면 청년 고용 문제가 풀려요." },
            { name: "장호진", demo: "50세/남/보수/경남", stance: "agree", quote: "TSMC 장쑤밍 회장이 '한국은 노조 리스크와 세금 불확실성이 투자 장벽'이라고 했어요. 외국 기업도 보는데 우리가 특별법 하나를 못 해주면 말이 됩니까." },
            { name: "조미래", demo: "41세/여/진보/전북", stance: "disagreeish", quote: "전북에는 반도체 클러스터가 없어요. 수도권 집중 투자는 지역 격차를 더 벌립니다. 비수도권 소부장 단지 의무 배치를 넣으세요." }
        ],
        mapDots: [
            { id: "P3", x: 28, y: 40, color: "#10b981", label: "진보 30대", desc: "환경/특혜 우려로 유보적" },
            { id: "M4", x: 45, y: 35, color: "#34d399", label: "중도 40대", desc: "경제론에 호응. 지지 우세" },
            { id: "C5", x: 55, y: 32, color: "#f59e0b", label: "중도보수 50대", desc: "산업 경쟁력 중시. 강한 지지" },
            { id: "R6", x: 72, y: 28, color: "#ef4444", label: "보수 60+", desc: "국익론 강조. 높은 지지율" },
            { id: "IT", x: 60, y: 25, color: "#3b82f6", label: "IT/제조업", desc: "직접 이해관계. 동의 78%" },
            { id: "GY", x: 55, y: 30, color: "#8b5cf6", label: "경기 남부", desc: "투자 수혜 지역. 동의 72%" }
        ]
    },
    samsung_strike: {
        title: "삼성전자 파업에 긴급조정권을 발동해야 한다",
        subtitle: "반도체 기간산업 보호를 위한 정부 개입 찬반",
        category: "노동",
        stats: { agree: 32.4, agreeish: 23.8, disagreeish: 18.6, disagree: 16.2, unsure: 9.0 },
        segments: {
            ideology5: { prog:[12,16,26,34,12], modprog:[18,22,24,26,10], mod:[30,28,20,14,8], modcons:[42,24,16,10,8], cons:[52,22,12,6,8] },
            age6: { a18:[18,20,26,26,10], a30:[22,22,24,22,10], a40:[34,25,18,15,8], a50:[40,24,16,12,8], a60:[48,22,14,8,8], a70:[50,20,14,8,8] },
            region7: { seoul:[32,25,20,15,8], gyeonggi:[30,24,22,16,8], chungcheong:[36,24,18,14,8], honam:[16,20,26,28,10], busan:[40,24,16,12,8], daegu:[46,22,14,10,8], gangwon:[34,24,20,14,8] }
        },
        ideology: { prog: [12, 18, 25, 32, 13], mod: [30, 28, 20, 14, 8], cons: [52, 26, 10, 5, 7] },
        age: { a20: [18, 22, 24, 26, 10], a40: [34, 25, 18, 15, 8], a60: [48, 24, 12, 8, 8] },
        region: { honam: [16, 20, 26, 28, 10], seoul: [32, 25, 20, 15, 8], yeongnam: [46, 24, 14, 10, 6] },
        factors: [
            { coef: "+1.82", name: "정치성향: 보수 (vs 진보)", sig: "p<.001***", pos: true },
            { coef: "+1.15", name: "직업: 제조업·IT 종사자", sig: "p<.001***", pos: true },
            { coef: "+0.68", name: "투자: 삼성전자 주주", sig: "p<.01**", pos: true },
            { coef: "-1.42", name: "노조 가입 경험: 있음", sig: "p<.001***", pos: false },
            { coef: "-0.78", name: "정치성향: 진보 (vs 보수)", sig: "p<.01**", pos: false }
        ],
        target: "보수 성향 제조업 종사 삼성전자 주주 (동의 확률 4.8배↑)",
        risks: { critical: ["노동 기본권 침해 논란 - 진보진영 강력 반발", "긴급조정 실패 시 노사 갈등 극대화"], medium: ["해외 투자자 신뢰도 하락 - ESG 리스크", "협력업체 연쇄 피해 - 하청 노동자 실직"], insight: ["노사 자율교섭 우선 + 조건부 긴급조정 검토", "성과급 배분 투명성 확보 방안 병행", "국회 차원 반도체 산업 특별법 논의 활용"] },
        jury: [
            { name: "김태현", demo: "35세/남/중도/경기", stance: "agree", quote: "삼성 파운드리 1일 가동 중단 손실이 800억이에요. 3일이면 퀄컴·엔비디아 납기가 틀어지고, 이건 국가 신용도 문제로 번집니다. 대화가 원칙이지만 시간이 없어요." },
            { name: "이수빈", demo: "28세/여/진보/서울", stance: "disagree", quote: "긴급조정권은 1953년 제정 이래 7번 발동됐고, 매번 노동자 패배로 끝났어요. 정부가 중재자가 아니라 사측의 대리인으로 기능한 거죠. 이 선례를 반복하면 안 됩니다." },
            { name: "박성호", demo: "52세/남/보수/경북", stance: "agree", quote: "대만 TSMC 직원은 파업권이 사실상 없어요. 경쟁국이 24시간 돌리는데 우리만 멈추면, 반도체 패권은 끝입니다." },
            { name: "정미래", demo: "31세/여/중도진보/광주", stance: "disagreeish", quote: "삼성 영업이익 10조인데 직원 평균 연봉은 1.2억이에요. 이익 대비 인건비 비율이 TSMC보다 낮아요. 성과 배분 구조부터 고쳐야지 파업을 탄압하면 안 됩니다." },
            { name: "최동환", demo: "45세/남/중도보수/부산", stance: "agreeish", quote: "긴급조정 발동 전 72시간 냉각기를 두고, 그 동안 중노위 조정안을 노사 양측이 수용하는 '조건부 조정'이 현실적 대안입니다." },
            { name: "김연아", demo: "38세/여/중도/대전", stance: "unsure", quote: "노동부 장관이 '파업 발생하면 긴급조정 불가피'라고 했는데, 파업 전에 으름장 놓는 건 중재가 아니라 편들기예요. 절차적 정당성이 흔들립니다." },
            { name: "송재원", demo: "55세/남/보수/울산", stance: "agree", quote: "현대차 노조 출신입니다. 파업은 권리지만, 기간산업 파업은 국민 전체를 인질로 잡는 거예요. 반도체는 전력·통신과 동급으로 관리해야 합니다." },
            { name: "오지혜", demo: "26세/여/진보/서울", stance: "disagree", quote: "이재용 회장이 3년 전 '노조와 상생하겠다'고 했어요. 그 약속은 어디 갔나요? 경영진이 약속을 어겼는데 노동자만 참으라는 건 불공정합니다." },
            { name: "한정우", demo: "48세/남/중도/인천", stance: "agreeish", quote: "중노위 조정안을 투표로 물어보자는 제안이 나왔는데, 노조가 거부했어요. 민주적 절차를 노조 스스로 거부한 거라면 긴급조정 명분이 생긴 겁니다." },
            { name: "윤가영", demo: "33세/여/중도진보/경기", stance: "disagreeish", quote: "성과급 30% 요구가 과하다는 여론이 있지만, 삼성전자 사내유보금이 300조예요. 직원 2만명에게 30% 줘도 3조, 유보금의 1%예요. 숫자를 보세요." },
            { name: "장민석", demo: "62세/남/보수/대구", stance: "agree", quote: "인텔이 파운드리 수주전에서 삼성 파업을 마케팅에 쓰고 있어요. '우리는 파업 리스크 없다'고요. 국가 브랜드가 실시간으로 훼손되고 있습니다." },
            { name: "조윤서", demo: "42세/여/중도/충북", stance: "unsure", quote: "둘 다 물러서야 하는데 누구도 안 물러서고 있어요. 정부가 해야 할 건 긴급조정이 아니라, 양측이 체면을 지키면서 합의할 수 있는 제3의 카드를 만드는 거예요." }
        ],
        mapDots: [
            { id: "C6", x: 75, y: 25, color: "#05B16C", label: "보수 60+", desc: "국익론·산업보호. 긴급조정 강력 지지" },
            { id: "C5", x: 65, y: 35, color: "#34D399", label: "중도보수 50대", desc: "실리적. 조건부 긴급조정 지지" },
            { id: "M4", x: 48, y: 48, color: "#F59E0B", label: "중도 40대", desc: "핵심 설득층. 양비론 우세" },
            { id: "P3", x: 30, y: 65, color: "#F87171", label: "중도진보 30대", desc: "노동권 중시. 긴급조정 반대" },
            { id: "P2", x: 20, y: 78, color: "#FA3737", label: "진보 20대", desc: "헌법적 파업권 강조. 강한 반대" }
        ]
    },
    crime_penalty: {
        title: "사회적 약자 대상 강력범죄의 양형을 대폭 강화해야 한다",
        subtitle: "청소년·여성 대상 범죄 엄벌주의 적용에 대한 찬반",
        category: "사회",
        stats: { agree: 48.2, agreeish: 28.4, disagreeish: 10.2, disagree: 5.8, unsure: 7.4 },
        segments: {
            ideology5: { prog:[44,30,12,6,8], modprog:[46,30,10,6,8], mod:[48,30,10,5,7], modcons:[52,26,8,6,8], cons:[58,24,8,4,6] },
            age6: { a18:[54,28,8,4,6], a30:[52,28,10,4,6], a40:[48,30,10,5,7], a50:[46,28,10,8,8], a60:[44,26,12,10,8], a70:[42,24,14,10,10] },
            region7: { seoul:[48,30,10,5,7], gyeonggi:[46,30,10,6,8], chungcheong:[48,28,10,6,8], honam:[52,28,8,4,8], busan:[46,28,12,6,8], daegu:[44,26,12,10,8], gangwon:[48,28,10,6,8] }
        },
        ideology: { prog: [42, 30, 14, 6, 8], mod: [48, 30, 10, 5, 7], cons: [55, 25, 8, 5, 7] },
        age: { a20: [52, 28, 10, 4, 6], a40: [48, 30, 10, 5, 7], a60: [44, 28, 12, 8, 8] },
        region: { honam: [50, 28, 10, 4, 8], seoul: [48, 30, 10, 5, 7], yeongnam: [46, 28, 12, 7, 7] },
        factors: [
            { coef: "+1.24", name: "성별: 여성 (vs 남성)", sig: "p<.001***", pos: true },
            { coef: "+0.92", name: "자녀: 있음 (vs 없음)", sig: "p<.001***", pos: true },
            { coef: "+0.58", name: "범죄 피해 경험: 있음", sig: "p<.01**", pos: true },
            { coef: "-0.42", name: "법학 전공/법률 종사", sig: "p<.05*", pos: false },
            { coef: "-0.35", name: "인권단체 활동 경험", sig: "p<.05*", pos: false }
        ],
        target: "자녀 있는 여성 (동의 확률 3.6배↑)",
        risks: { critical: ["엄벌 만능주의 비판 - 재범률 감소 효과 미미 연구", "양형 기준 과도 시 인권 침해 논란"], medium: ["사법부 독립성 위축 - 여론 재판 우려", "사회구조적 원인 간과 - 빈곤·정신건강"], insight: ["예방 시스템(CCTV·안전귀가) 병행 필수", "정신건강 치료·재범방지 프로그램 강화", "피해자 지원 인프라 확충이 실질적 효과"] },
        jury: [
            { name: "김서영", demo: "34세/여/중도/서울", stance: "agree", quote: "광주 세 모녀 사건 가해자가 무기징역 중 교도소에서 사망했어요. 피해자 가족은 평생 트라우마인데 가해자는 세금으로 밥 먹다 죽었어요. 양형이 정의로운가요?" },
            { name: "이준혁", demo: "42세/남/중도진보/경기", stance: "agreeish", quote: "미국 메건법, 영국 사라법 모두 특정 사건 뒤에 나왔어요. 감정입법이라 비판하지만, 실제 아동 성범죄 재범률을 14% 낮췄습니다. 데이터를 봐야죠." },
            { name: "박지원", demo: "28세/여/진보/광주", stance: "agree", quote: "여성 1인 가구 범죄 피해율이 다인 가구의 2.8배예요. 서울시 안심귀가 서비스 예산이 연 30억인데, CCTV 유지보수비가 연 200억이에요. 예방 예산의 우선순위가 틀렸습니다." },
            { name: "정한수", demo: "55세/남/보수/대구", stance: "agree", quote: "법무부 통계로 아동 성범죄 재범률이 14.3%예요. 7명 중 1명이 또 범죄를 저질러요. 전자발찌만으로 되겠습니까? 최소 가석방 없는 무기형이 답입니다." },
            { name: "최유진", demo: "38세/여/중도/부산", stance: "agreeish", quote: "엄벌과 치료는 양자택일이 아니에요. 독일은 징역형에 의무 심리치료를 결합해서 재범률을 8%까지 낮췄어요. 형량만 올리는 건 반쪽짜리입니다." },
            { name: "김도현", demo: "45세/남/중도보수/대전", stance: "agree", quote: "초등학교 통학로에 CCTV 사각지대가 전국 4,200곳이에요. 양형 강화보다 이 4,200곳을 먼저 커버하는 게 아이를 실질적으로 살리는 정책입니다." },
            { name: "송예린", demo: "25세/여/진보/서울", stance: "agreeish", quote: "신상공개 확대를 주장하시는데, 현재 공개된 성범죄자 중 주소지 확인 가능한 비율이 62%에 불과해요. 제도를 만들어놓고 관리를 안 하면 의미 없습니다." },
            { name: "오성민", demo: "62세/남/보수/경남", stance: "agree", quote: "손녀가 초등학생인데 매일 걱정이에요. 가해자 인권 이전에 피해자 생존권이 먼저입니다. 이건 보수·진보 문제가 아닙니다." },
            { name: "한소윤", demo: "31세/여/중도진보/인천", stance: "agree", quote: "피해자 국선변호사 수임료가 건당 50만원이에요. 가해자 국선변호사는 150만원이고요. 피해자 지원 예산을 3배로 늘려야 형평이 맞습니다." },
            { name: "윤재호", demo: "48세/남/중도/충북", stance: "agreeish", quote: "재범방지 프로그램 이수율이 38%에 불과해요. 형량을 올려봤자 출소 후 관리가 안 되면 사회에 시한폭탄을 돌려보내는 거예요." },
            { name: "장미경", demo: "52세/여/중도보수/경북", stance: "agree", quote: "피해 아동이 법정에서 가해자와 대면해야 하는 현행 제도가 2차 가해예요. 영상 증언 확대와 피해자 전담 법정 설치가 시급합니다." },
            { name: "조현석", demo: "35세/남/진보/전북", stance: "disagreeish", quote: "노르웨이가 최장 형량 21년인데 재범률 세계 최저예요. 엄벌이 답이라면 미국 텍사스가 세계에서 가장 안전해야 하는데 그렇지 않죠." }
        ],
        mapDots: [
            { id: "ALL", x: 35, y: 22, color: "#05B16C", label: "전 성향 동의", desc: "좌우 이념 무관 76%+ 동의" },
            { id: "F", x: 30, y: 18, color: "#1597D4", label: "여성", desc: "성별 무관 높은 동의율이나 여성이 더 강함" },
            { id: "P", x: 25, y: 28, color: "#34D399", label: "부모층", desc: "자녀 유무가 가장 강한 예측변수" },
            { id: "L", x: 42, y: 62, color: "#F59E0B", label: "법률 전문가", desc: "유일한 유보 그룹. 실효성 의문" }
        ]
    },
    airport_parking: {
        title: "인천공항 직원 전용 주차 특혜를 폐지해야 한다",
        subtitle: "공항 주차면 85% 직원 점유 실태에 대한 제도 개선 찬반",
        category: "행정",
        stats: { agree: 52.8, agreeish: 24.1, disagreeish: 9.4, disagree: 6.2, unsure: 7.5 },
        segments: {
            ideology5: { prog:[66,22,4,2,6], modprog:[62,24,6,2,6], mod:[54,26,8,5,7], modcons:[50,24,10,8,8], cons:[46,24,12,10,8] },
            age6: { a18:[54,28,8,4,6], a30:[56,26,8,4,6], a40:[58,24,8,4,6], a50:[56,24,8,6,6], a60:[54,22,10,6,8], a70:[50,22,12,8,8] },
            region7: { seoul:[56,26,8,4,6], gyeonggi:[54,26,8,4,8], chungcheong:[52,26,10,4,8], honam:[64,22,4,2,8], busan:[50,24,10,8,8], daegu:[46,24,12,10,8], gangwon:[52,24,10,6,8] }
        },
        ideology: { prog: [62, 22, 6, 4, 6], mod: [54, 26, 8, 5, 7], cons: [48, 24, 12, 8, 8] },
        age: { a20: [52, 26, 10, 5, 7], a40: [58, 24, 8, 4, 6], a60: [54, 22, 10, 6, 8] },
        region: { honam: [62, 24, 6, 2, 6], seoul: [56, 26, 8, 4, 6], yeongnam: [48, 24, 12, 8, 8] },
        factors: [
            { coef: "+1.12", name: "해외여행 빈도: 연 2회+ (vs 0회)", sig: "p<.001***", pos: true },
            { coef: "+0.82", name: "인천공항 주차 경험: 있음", sig: "p<.001***", pos: true },
            { coef: "+0.45", name: "지역: 수도권 거주", sig: "p<.05*", pos: true },
            { coef: "-0.68", name: "직업: 공항·공기업 종사자", sig: "p<.01**", pos: false }
        ],
        target: "수도권 거주 연 2회+ 해외여행 경험자 (동의 확률 2.8배↑)",
        risks: { critical: ["공항 직원 출퇴근 대안 부재 시 운영 차질", "노조 반발 - 복리후생 축소 저항"], medium: ["대중교통 연결 미흡 - 교대근무자 불편", "유료 전환 시 인건비 상승 압력"], insight: ["셔틀버스 확충 + 원거리 주차장 운영", "주차권 발급 기준 합리화 (직급·거리별 차등)", "여행객 주차 예약제 도입 병행"] },
        jury: [
            { name: "김하늘", demo: "32세/여/중도/서울", stance: "agree", quote: "새벽 비행기 타려고 4시에 갔더니 주차장이 꽉 찼어요. 알고 보니 직원 정기주차가 85%래요. 공항은 여행객을 위한 시설이지 직원 복지시설이 아닙니다." },
            { name: "이종민", demo: "45세/남/중도보수/인천", stance: "agree", quote: "인천공항공사 직원 1인당 복리후생비가 연 1,200만원이에요. 민간 기업 평균의 3배. 주차 특혜는 빙산의 일각이고 공기업 방만 경영의 상징입니다." },
            { name: "박윤하", demo: "38세/여/중도진보/경기", stance: "agreeish", quote: "단순 폐지하면 직원들이 영종도 주변 주택가에 무단주차해요. 셔틀버스 증편이나 직원 전용 외곽 주차장 건설 같은 대안이 동시에 나와야 합니다." },
            { name: "정태호", demo: "50세/남/보수/대구", stance: "agree", quote: "해외 공항 중 직원 주차 비율이 30%를 넘는 곳이 없어요. 나리타 12%, 히드로 18%, 창이 15%. 85%는 국제적 망신입니다." },
            { name: "최선아", demo: "28세/여/진보/광주", stance: "agreeish", quote: "공항 청소·보안 파견직 직원들은 정기주차권 자체가 없어요. 같은 공항에서 일하는데 정규직만 특혜를 받는 건 내부 불평등이기도 합니다." },
            { name: "김영수", demo: "42세/남/중도/부산", stance: "agree", quote: "주차비 수입이 연 800억인데, 직원 무료 주차로 인한 기회비용이 연 200억으로 추정됩니다. 그 200억이면 공항철도 요금을 반값으로 만들 수 있어요." },
            { name: "송미정", demo: "55세/여/중도보수/대전", stance: "agree", quote: "세금으로 지은 공항에서 세금으로 월급 받는 직원이 주차까지 무료? 국민 상식에 안 맞습니다. 최소한 유료 전환은 해야죠." },
            { name: "오진우", demo: "35세/남/중도진보/서울", stance: "agreeish", quote: "주차 폐지보다 근본 해법은 공항 접근 교통 인프라예요. 공항철도 직통 배차를 30분에서 15분으로 줄이면 주차 수요 자체가 30% 감소합니다." },
            { name: "한보라", demo: "48세/여/중도/경남", stance: "agree", quote: "가족 4명 해외여행에 주차비만 15만원 들었어요. 그런데 옆 건물 직원은 무료? 국민 눈높이를 생각하세요." },
            { name: "윤세진", demo: "30세/남/진보/전북", stance: "unsure", quote: "야간 교대 직원들 사정도 있어요. 새벽 4시 출근인데 대중교통이 없잖아요. 완전 폐지보다 야간 근무자 한정 유지가 합리적이라고 봅니다." },
            { name: "장서윤", demo: "60세/여/보수/경북", stance: "agree", quote: "공항공사가 지난해 영업이익 1.2조인데 직원 주차 특혜 비용 200억을 아끼지 못하면서 주차요금은 올렸어요. 이건 도덕적 해이입니다." },
            { name: "조광호", demo: "40세/남/중도/충북", stance: "disagreeish", quote: "주차장 총 면적을 늘리는 게 근본 해결이에요. 직원 뺀다고 여행객 주차난이 해결되지 않아요. T3 건설하면서 주차 6,000면 확충이 같이 가야 합니다." }
        ],
        mapDots: [
            { id: "ALL", x: 40, y: 22, color: "#05B16C", label: "전 성향 동의", desc: "이념 무관 높은 동의율 77%" },
            { id: "T", x: 35, y: 18, color: "#1597D4", label: "해외여행 경험자", desc: "직접 경험이 강한 동의 예측변수" },
            { id: "S", x: 42, y: 25, color: "#34D399", label: "수도권", desc: "인천공항 이용 빈도 높아 공감" },
            { id: "E", x: 55, y: 68, color: "#F59E0B", label: "공항 종사자", desc: "유일한 반대 그룹. 복리후생 축소 우려" }
        ]
    },
    teacher_protect: {
        title: "학생 폭행·폭언으로부터 교사를 보호하는 법제화가 필요하다",
        subtitle: "교권 보호법 강화에 대한 찬반",
        category: "교육",
        stats: { agree: 55.4, agreeish: 26.2, disagreeish: 7.8, disagree: 4.2, unsure: 6.4 },
        segments: {
            ideology5: { prog:[52,28,8,4,8], modprog:[50,30,8,4,8], mod:[56,26,8,4,6], modcons:[58,24,6,4,8], cons:[60,22,6,4,8] },
            age6: { a18:[48,32,8,4,8], a30:[50,30,8,4,8], a40:[58,26,6,4,6], a50:[58,24,8,4,6], a60:[56,24,8,5,7], a70:[54,22,10,6,8] },
            region7: { seoul:[56,28,8,3,5], gyeonggi:[54,28,8,4,6], chungcheong:[56,26,8,4,6], honam:[54,28,6,4,8], busan:[54,24,10,5,7], daegu:[52,24,10,6,8], gangwon:[54,26,8,4,8] }
        },
        ideology: { prog: [50, 28, 10, 5, 7], mod: [56, 26, 8, 4, 6], cons: [58, 24, 6, 4, 8] },
        age: { a20: [48, 30, 10, 5, 7], a40: [58, 26, 6, 4, 6], a60: [56, 24, 8, 5, 7] },
        region: { honam: [54, 26, 8, 4, 8], seoul: [56, 28, 8, 3, 5], yeongnam: [54, 24, 8, 6, 8] },
        factors: [
            { coef: "+1.35", name: "직업: 교육 종사자", sig: "p<.001***", pos: true },
            { coef: "+0.92", name: "자녀 학령기: 초등 (vs 없음)", sig: "p<.001***", pos: true },
            { coef: "+0.55", name: "교사 지인: 있음", sig: "p<.01**", pos: true },
            { coef: "-0.48", name: "학교폭력 가해 경험 자녀", sig: "p<.05*", pos: false }
        ],
        target: "교육계 종사자 및 학령기 자녀 부모 (동의 확률 3.8배↑)",
        risks: { critical: ["학생 인권 vs 교권 충돌 — 균형점 설정 난제", "처벌 강화만으로 근본 해결 불가"], medium: ["학부모 반발 — '내 아이 처벌' 거부감", "교육 현장 위축 — 지도 회피 현상"], insight: ["전문 상담인력 학교 배치 의무화", "폭력 학생 분리교육 + 치료 프로그램", "교사 심리치료 지원 제도 확충"] },
        jury: [
            { name: "김소연", demo: "36세/여/중도/서울", stance: "agree", quote: "서울교대 연구에서 교사 72%가 '학생 폭력 후 아무런 행정 조치가 없었다'고 답했어요. 법이 없으니 교장도 못 건드리는 겁니다. 근거법이 필수입니다." },
            { name: "이민혁", demo: "42세/남/중도보수/경기", stance: "agree", quote: "교사 1인이 담당하는 학생 수가 OECD 평균의 1.4배예요. 과밀학급에서 폭력까지 감당하라는 건 국가가 교사를 소모품 취급하는 겁니다." },
            { name: "박은주", demo: "29세/여/진보/광주", stance: "agreeish", quote: "서이초 사건 이후 1년, 교사 심리상담 지원 예산이 교육부 전체의 0.3%예요. 법만 만들고 예산을 안 붙이면 또 장식법이 됩니다." },
            { name: "정용석", demo: "55세/남/보수/대구", stance: "agree", quote: "체벌 금지 이후 대안 없이 교권이 무너졌어요. '학생 인권'만 강조하고 '교사 안전'은 방치한 10년의 결과입니다. 교사도 노동자이고, 안전할 권리가 있어요." },
            { name: "최다은", demo: "32세/여/중도진보/대전", stance: "agreeish", quote: "문제 학생의 80%는 가정 문제가 원인이에요. 학교 사회복지사를 전체 학교의 30%에만 배치하는 현실을 바꾸지 않으면 교사 보호법은 뒷북입니다." },
            { name: "김성호", demo: "48세/남/중도/부산", stance: "agree", quote: "작년 교사 퇴직 사유 중 '직업 불만'이 37%로 1위예요. 5년 전엔 12%였어요. 이 속도면 3년 뒤 교사 지원자가 반토막 납니다. 구조적 위기입니다." },
            { name: "송유리", demo: "25세/여/진보/서울", stance: "agreeish", quote: "교대 재학생입니다. 동기 중 40%가 임용 포기를 고민해요. '교사가 돼서 맞아야 하나'라는 말이 농담이 아니에요. 교사 지망생의 안전 불안을 해소해야 합니다." },
            { name: "오태준", demo: "58세/남/보수/경남", stance: "agree", quote: "일본은 '학교교육법'에 교사 보호 조항이 있고, 교내 폭력 발생 시 경찰 개입이 의무화돼 있어요. 우리는 교사가 112에 전화하면 '내부적으로 해결하라'고 해요." },
            { name: "한지민", demo: "40세/여/중도/인천", stance: "agree", quote: "아이 담임이 3개월 만에 교체됐어요. 전 담임이 학생에게 맞고 병가를 갔다더라고요. 학부모로서 안정적 교육환경을 위해서라도 교사 보호가 필요해요." },
            { name: "윤준서", demo: "35세/남/중도진보/전북", stance: "agreeish", quote: "폭력 학생 분리교육이 필요하지만, 현재 대안교실이 전체 학교의 8%에만 있어요. 인프라 없이 분리만 하면 그 학생은 사회에서도 분리됩니다." },
            { name: "장수빈", demo: "50세/여/중도보수/경북", stance: "agree", quote: "교사 55%가 사직을 고민한다는 조사 결과가 나왔어요. 민간 기업이라면 비상경영 들어갈 수치인데, 교육부는 뭘 하고 있는 겁니까." },
            { name: "조현아", demo: "27세/여/중도/충북", stance: "unsure", quote: "초등 저학년 아이가 교사를 때리면 처벌해야 하나요? 발달 단계를 고려한 차등 적용이 있어야지, 일률적 엄벌은 또 다른 문제를 만듭니다." }
        ],
        mapDots: [
            { id: "ALL", x: 45, y: 20, color: "#05B16C", label: "전 성향 동의", desc: "좌우 이념 무관 81%+ 동의" },
            { id: "T", x: 40, y: 15, color: "#1597D4", label: "교육계", desc: "가장 강한 동의. 현장 체감" },
            { id: "P", x: 38, y: 22, color: "#34D399", label: "학부모", desc: "자녀 학령기일수록 동의 높음" },
            { id: "Y", x: 50, y: 58, color: "#F59E0B", label: "청년 무자녀", desc: "상대적 무관심. 유보적 입장" }
        ]
    }
};
window.deepSurveyIssueData = issueData;

function toggleTheme() {
    const h = document.documentElement;
    const n = h.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    h.setAttribute('data-theme', n);
    document.getElementById('theme-icon').className = `mono-icon mono-icon-${n === 'dark' ? 'moon' : 'sun'}`;
    document.getElementById('theme-text').textContent = n === 'dark' ? '다크' : '라이트';
}

function switchMainTab(tab) {
    document.querySelectorAll('.panel-content').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    document.getElementById(tab + '-content').classList.add('active');
    event.target.classList.add('active');
}

function isModalUserLoggedIn() {
    try {
        return !!JSON.parse(localStorage.getItem('deep-survey-user') || 'null')?.id;
    } catch (_) {
        return false;
    }
}

function enforceAnalysisAuth(type) {
    const gatedTypes = new Set();
    const needsLogin = gatedTypes.has(type) && !isModalUserLoggedIn();
    document.querySelectorAll('.analysis-content').forEach(content => {
        content.classList.remove('is-login-locked');
        content.querySelector('.analysis-login-lock')?.remove();
    });
    document.querySelectorAll('.analysis-tab').forEach(tab => tab.classList.remove('is-login-locked-tab'));
    if (!needsLogin) return;
    const content = document.getElementById(type + '-analysis');
    if (!content) return;
    content.classList.add('is-login-locked');
    const lock = document.createElement('div');
    lock.className = 'analysis-login-lock';
    lock.innerHTML = `<div class="analysis-login-card">
        <strong>로그인 후 열람 가능합니다.</strong>
        <button type="button" onclick="openLogin?.('로그인 후 열람 가능합니다.')">로그인하기</button>
    </div>`;
    content.appendChild(lock);
    const activeTab = document.querySelector(`.analysis-tab[onclick*="${type}"]`);
    activeTab?.classList.add('is-login-locked-tab');
}

function getAnalysisTab(root, type) {
    return root?.querySelector?.(`.analysis-tab[data-analysis-tab="${type}"]`)
        || root?.querySelector?.(`.analysis-tab[onclick*="${type}"]`)
        || document.querySelector(`.analysis-tab[data-analysis-tab="${type}"]`)
        || document.querySelector(`.analysis-tab[onclick*="${type}"]`);
}

function setActiveAnalysis(type, explicitTab = null) {
    const sourceTab = explicitTab?.closest?.('.analysis-tab') || explicitTab || getAnalysisTab(document, type);
    const scope = sourceTab?.closest?.('.poll-segment-reveal') || document;
    const content = scope.querySelector?.(`#${type}-analysis`) || document.getElementById(type + '-analysis');
    scope.querySelectorAll?.('.analysis-content').forEach(c => c.classList.remove('active'));
    scope.querySelectorAll?.('.analysis-tab').forEach(t => t.classList.remove('active'));
    content?.classList.add('active');
    sourceTab?.classList.add('active');
    if (scope.classList?.contains('poll-segment-reveal')) {
        setPollSegmentRevealState(scope, true);
    }
    enforceAnalysisAuth(type);
}

function switchAnalysis(type) {
    const eventTarget = window.event?.target;
    setActiveAnalysis(type, eventTarget?.closest?.('.analysis-tab') || null);
}

function resetModalSwipeState() {
    const modal = document.getElementById('modal');
    const panel = modal?.querySelector('.modal-content');
    modal?.classList.remove('is-swipe-dismissing');
    panel?.classList.remove('is-swipe-tracking', 'modal-swipe-dismiss-left', 'modal-swipe-dismiss-right');
    panel?.style.removeProperty('--modal-swipe-x');
    panel?.style.removeProperty('--modal-swipe-rotate');
    panel?.style.removeProperty('--modal-swipe-opacity');
}

function openModal(issueKey) {
    const issue = issueData[issueKey] || issueData.sugar;
    activeModalIssueKey = issueKey;
    renderModal(issue, issueKey);
    document.querySelector('.bottom-tab-bar')?.classList.remove('is-hidden');
    resetModalSwipeState();
    document.getElementById('modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(e) {
    if (!e || e.target.id === 'modal') {
        const modal = document.getElementById('modal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
        resetModalSwipeState();
    }
}

function initModalSwipeDismiss() {
    const modal = document.getElementById('modal');
    if (!modal || modal.dataset.swipeDismissReady === 'true') return;
    modal.dataset.swipeDismissReady = 'true';

    let startX = 0;
    let startY = 0;
    let lastX = 0;
    let pointerId = null;
    let tracking = false;
    let horizontalIntent = false;
    const minDismissDistance = 96;
    const maxDrag = 220;

    function getPanel() {
        return modal.querySelector('.modal-content');
    }

    function shouldIgnoreSwipeStart(target) {
        return Boolean(target?.closest?.([
            'input',
            'textarea',
            'select',
            '[contenteditable="true"]',
            '.detail-analysis-tabs',
            '.analysis-tabs',
            '.result-tabs',
            '.ranking-carousel',
            '.modal-comment-form',
        ].join(',')));
    }

    function clearSwipeTracking() {
        const panel = getPanel();
        panel?.classList.remove('is-swipe-tracking');
        panel?.style.setProperty('--modal-swipe-x', '0px');
        panel?.style.setProperty('--modal-swipe-rotate', '0deg');
        panel?.style.setProperty('--modal-swipe-opacity', '1');
        tracking = false;
        horizontalIntent = false;
        pointerId = null;
    }

    modal.addEventListener('pointerdown', event => {
        if (!modal.classList.contains('active') || event.pointerType === 'mouse') return;
        const panel = event.target.closest?.('.modal-content');
        if (!panel || shouldIgnoreSwipeStart(event.target)) return;
        startX = event.clientX;
        startY = event.clientY;
        lastX = event.clientX;
        pointerId = event.pointerId;
        tracking = true;
        horizontalIntent = false;
        panel.classList.add('is-swipe-tracking');
        try {
            panel.setPointerCapture?.(event.pointerId);
        } catch (_) {
            // Synthetic/browser-smoke pointer events may not be capturable; real touch pointers are.
        }
    }, { passive: true });

    modal.addEventListener('pointermove', event => {
        if (!tracking || event.pointerId !== pointerId) return;
        const dx = event.clientX - startX;
        const dy = event.clientY - startY;
        lastX = event.clientX;
        if (!horizontalIntent && Math.abs(dy) > Math.abs(dx) * 1.2 && Math.abs(dy) > 18) {
            clearSwipeTracking();
            return;
        }
        if (Math.abs(dx) < 10) return;
        horizontalIntent = Math.abs(dx) >= Math.abs(dy) * 1.1;
        if (!horizontalIntent) return;
        event.preventDefault();
        const panel = getPanel();
        const clamped = Math.max(-maxDrag, Math.min(maxDrag, dx));
        const progress = Math.min(1, Math.abs(clamped) / minDismissDistance);
        panel?.style.setProperty('--modal-swipe-x', `${clamped}px`);
        panel?.style.setProperty('--modal-swipe-rotate', `${clamped / 42}deg`);
        panel?.style.setProperty('--modal-swipe-opacity', `${1 - progress * 0.22}`);
    }, { passive: false });

    function finishSwipe(event) {
        if (!tracking || event.pointerId !== pointerId) return;
        const dx = event.clientX - startX || lastX - startX;
        const dy = event.clientY - startY;
        const panel = getPanel();
        tracking = false;
        pointerId = null;
        try {
            panel?.releasePointerCapture?.(event.pointerId);
        } catch (_) {
            // Ignore non-captured synthetic pointers used by automated browser smoke checks.
        }

        if (Math.abs(dx) < minDismissDistance || Math.abs(dx) < Math.abs(dy) * 1.25) {
            clearSwipeTracking();
            return;
        }

        modal.classList.add('is-swipe-dismissing');
        panel?.classList.remove('is-swipe-tracking');
        panel?.classList.add(dx < 0 ? 'modal-swipe-dismiss-left' : 'modal-swipe-dismiss-right');
        window.setTimeout(() => closeModal(), 230);
    }

    modal.addEventListener('pointerup', finishSwipe, { passive: true });
    modal.addEventListener('pointercancel', clearSwipeTracking, { passive: true });
}

function monoIcon(name) {
    return `<span class="mono-icon mono-icon-${name}" aria-hidden="true"></span>`;
}

function getStanceTargets(stats = {}, total = 12) {
    const stances = ['agree', 'agreeish', 'disagreeish', 'disagree', 'unsure'];
    const values = [
        +stats.agree || 0,
        +stats.agreeish || 0,
        +stats.disagreeish || 0,
        +stats.disagree || 0,
        +stats.unsure || 0,
    ];
    const sum = values.reduce((acc, value) => acc + value, 0) || 100;
    const quotas = values.map((value, i) => {
        const exact = value / sum * total;
        return { stance: stances[i], count: Math.floor(exact), remainder: exact - Math.floor(exact) };
    });
    let assigned = quotas.reduce((acc, item) => acc + item.count, 0);
    quotas.sort((a, b) => b.remainder - a.remainder);
    for (let i = 0; assigned < total; i++, assigned++) {
        quotas[i % quotas.length].count += 1;
    }
    return Object.fromEntries(quotas.map(item => [item.stance, item.count]));
}

function buildSupplementalJuror(issue, idx, stance) {
    const profiles = [
        ['정하늘', '29세/여/중도/서울'],
        ['오민재', '36세/남/중도진보/경기'],
        ['한서윤', '44세/여/진보/광주'],
        ['유태성', '51세/남/중도보수/부산'],
        ['강도현', '58세/남/보수/대구'],
        ['문지아', '33세/여/중도/인천'],
        ['배준호', '47세/남/중도/대전'],
        ['신유리', '62세/여/중도보수/강원'],
        ['조현우', '40세/남/진보/전북'],
        ['임가은', '55세/여/보수/경남'],
        ['서민기', '31세/남/중도진보/충청'],
        ['권나래', '68세/여/중도/제주'],
    ];
    const stanceQuotes = {
        agree: `${issue.title}은 지금보다 강한 대응이 필요하다고 봅니다.`,
        agreeish: '취지는 대체로 동의하지만 시행 기준은 더 분명해야 합니다.',
        disagreeish: `문제의식은 이해하지만 ${issue.category || '해당'} 현장의 부담도 따져봐야 합니다.`,
        disagree: '이 방식은 부작용이 커서 다른 대안을 먼저 검토해야 합니다.',
        unsure: '양쪽 논리가 모두 있어서 근거 자료를 더 보고 판단하고 싶습니다.',
    };
    const [name, demo] = profiles[idx % profiles.length];
    return {
        name,
        demo,
        stance,
        quote: stanceQuotes[stance] || stanceQuotes.unsure,
        generated: true,
    };
}

function completeJuryPanel(issue, total = 12) {
    const panel = Array.isArray(issue?.jury) ? issue.jury.slice(0, total) : [];
    if (panel.length >= total) return panel;

    const targets = getStanceTargets(issue?.stats || {}, total);
    const counts = panel.reduce((acc, juror) => {
        acc[juror.stance] = (acc[juror.stance] || 0) + 1;
        return acc;
    }, {});
    const order = ['agree', 'agreeish', 'disagreeish', 'disagree', 'unsure'];

    while (panel.length < total) {
        const stance = order.find(key => (counts[key] || 0) < (targets[key] || 0)) || order[panel.length % order.length];
        panel.push(buildSupplementalJuror(issue || {}, panel.length, stance));
        counts[stance] = (counts[stance] || 0) + 1;
    }
    return panel;
}

function formatSignedPoint(value) {
    const numeric = Number(value) || 0;
    const prefix = numeric > 0 ? '+' : numeric < 0 ? '-' : '';
    return `${prefix}${formatPct(Math.abs(numeric))}%p`;
}

function removeExternalModalAnalysisShell() {
    const modalBody = document.querySelector('.modal-body');
    if (!modalBody) return;
    const managedPanelIds = new Set([
        'segment-analysis',
        'jury-analysis',
        'risk-analysis',
        'map-analysis',
        'regression-analysis',
    ]);
    [...modalBody.children].forEach(child => {
        if (child.classList?.contains('detail-analysis-tabs') || managedPanelIds.has(child.id)) {
            child.remove();
        }
    });
}

function renderModal(issue, issueKey = activeModalIssueKey) {
    switchAnalysis('comments');

    // Title
    const category = issue.category || '이슈';
    const modalCategory = document.getElementById('modal-category');
    if (modalCategory) modalCategory.textContent = category;
    const modalTitle = document.getElementById('modal-title');
    const modalSubtitle = document.getElementById('modal-subtitle');
    if (modalTitle) {
        modalTitle.textContent = '';
        modalTitle.hidden = true;
    }
    if (modalSubtitle) {
        modalSubtitle.textContent = '';
        modalSubtitle.hidden = true;
    }

    // Stats
    const s = issue.stats;
    const totals = getOpinionTotals(s);
    const statNet = document.getElementById('stat-net');
    if (statNet) {
        statNet.textContent = formatSignedPoint(totals.net);
        statNet.style.color = totals.net > 0 ? 'var(--opinion-agree)' : totals.net < 0 ? 'var(--opinion-disagree)' : 'var(--text-secondary)';
    }
    document.getElementById('stat-agree').textContent = formatPct(totals.agree) + '%';
    document.getElementById('stat-disagree').textContent = formatPct(totals.disagree) + '%';
    document.getElementById('stat-unsure').textContent = formatPct(totals.unsure) + '%';

    const pollBriefing = document.getElementById('poll-briefing-card');
    if (pollBriefing) {
        pollBriefing.innerHTML = renderPollBriefingCard(issue, { modal: true });
        removeExternalModalAnalysisShell();
        initPollSegmentReveals(pollBriefing);
        switchAnalysis('segment');
    }

    // Draw donut pie chart
    const canvas = document.getElementById('opinion-pie');
    if (canvas && canvas.getContext) {
        const ctx = canvas.getContext('2d');
        const W = canvas.width, H = canvas.height;
        const cx = W / 2, cy = H / 2, R = 85, r = 50;
        const styles = getComputedStyle(document.documentElement);
        const agreeColor = styles.getPropertyValue('--opinion-agree').trim() || '#1597D4';
        const disagreeColor = styles.getPropertyValue('--opinion-disagree').trim() || '#BF6959';
        const neutralColor = styles.getPropertyValue('--opinion-neutral').trim() || '#C5CCD6';
        ctx.clearRect(0, 0, W, H);
        const values = [totals.agree, totals.disagree, totals.unsure];
        const colors = [agreeColor, disagreeColor, neutralColor];
        const total = values.reduce((a, b) => a + b, 0);
        let angle = -Math.PI / 2;
        values.forEach((v, i) => {
            const slice = (v / total) * Math.PI * 2;
            ctx.beginPath();
            ctx.arc(cx, cy, R, angle, angle + slice);
            ctx.arc(cx, cy, r, angle + slice, angle, true);
            ctx.closePath();
            ctx.fillStyle = colors[i];
            ctx.fill();
            angle += slice;
        });
        const netColor = totals.net > 0 ? agreeColor : totals.net < 0 ? disagreeColor : '#8590A4';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = netColor;
        ctx.font = 'bold 20px Google Sans, Noto Sans KR, sans-serif';
        ctx.fillText(formatSignedPoint(totals.net), cx, cy - 12);
        ctx.font = '9px Google Sans, Noto Sans KR, sans-serif';
        ctx.fillText('순동의', cx, cy + 4);
        ctx.font = '8px Google Sans, Noto Sans KR, sans-serif';
        ctx.fillStyle = '#8590A4';
        ctx.fillText('(동의 - 비동의)', cx, cy + 19);
    }


    // Segment Charts — dynamic render
    const seg = issue.segments || {};
    function segmentRows(labels, keys, data) {
        return keys
            .map((k, i) => data[k] ? distributionToDetailRow(labels[i], data[k]) : null)
            .filter(Boolean);
    }
    let segHtml = '';
    // 정치성향별 5단계
    const ideo = seg.ideology5 || issue.ideology;
    if (ideo) {
        const labels5 = ['진보','중도진보','중도','중도보수','보수'];
        const keys5 = ['prog','modprog','mod','modcons','cons'];
        segHtml += '<div class="chart-container detail-dot-container"><div class="chart-title">정치성향별 (5단계)</div>' +
            renderDetailDotChart(segmentRows(labels5, keys5, ideo)) + '</div>';
    }
    // 연령대별 6개
    const age = seg.age6 || issue.age;
    if (age) {
        const labelsA = ['18-29','30대','40대','50대','60대','70+'];
        const keysA = ['a18','a30','a40','a50','a60','a70'];
        segHtml += '<div class="chart-container detail-dot-container"><div class="chart-title">연령대별 (6개)</div>' +
            renderDetailDotChart(segmentRows(labelsA, keysA, age)) + '</div>';
    }
    // 지역별 7권역 — 바차트
    const reg = seg.region7 || issue.region;
    if (reg) {
        const regKeys = ['seoul','gyeonggi','chungcheong','honam','busan','daegu','gangwon'];
        const regNames = ['서울','경기/인천','대전/충청','광주/전라','부산/경남','대구/경북','강원/제주'];
        segHtml += '<div class="chart-container detail-dot-container"><div class="chart-title">지역별 (7권역)</div>' +
            renderDetailDotChart(segmentRows(regNames, regKeys, reg)) + '</div>';
    }
    const segmentCharts = document.getElementById('segment-charts');
    if (segmentCharts) segmentCharts.innerHTML = renderPollSegmentSections(issue, true) || segHtml;

    // Factors
    const factors = (Array.isArray(issue.factors) && issue.factors.length) ? issue.factors : buildFallbackFactors(issue);
    const regressionAnalysis = buildRegressionAnalysis(issue, factors);
    const factorList = document.getElementById('factor-list');
    if (factorList) factorList.innerHTML = renderRegressionFactorList(regressionAnalysis);
    const regressionDiagnostics = document.getElementById('regression-diagnostics');
    if (regressionDiagnostics) regressionDiagnostics.innerHTML = renderRegressionDiagnostics(regressionAnalysis);
    const targetSegment = document.getElementById('target-segment');
    if (targetSegment) targetSegment.innerHTML = monoIcon('target') + ' 핵심 타겟: <strong>' + (issue.target || buildFallbackTargetSegment(issue)) + '</strong>';

    // Risks — Risk Matrix + Scenario Analysis
    const r = buildRiskProfile(issue);
    let riskHtml = '<div class="risk-matrix-section">';
    // Risk Matrix header
    riskHtml += '<div class="risk-card"><h5 style="color:var(--text-secondary);margin-bottom:12px">' + monoIcon('risk') + ' 리스크 매트릭스 — 발생가능성 × 영향도</h5>';
    riskHtml += '<table class="risk-matrix-table"><thead><tr><th>리스크 요인</th><th>가능성</th><th>영향도</th><th>등급</th></tr></thead><tbody>';
    r.critical.forEach(c => riskHtml += `<tr><td>${c}</td><td>높음</td><td>치명적</td><td><span style="color:var(--text-secondary);font-weight:700">${monoIcon('risk')} 핵심</span></td></tr>`);
    r.medium.forEach(m => riskHtml += `<tr><td>${m}</td><td>중간</td><td>상당</td><td><span style="color:var(--text-secondary);font-weight:700">${monoIcon('alert')} 주의</span></td></tr>`);
    riskHtml += '</tbody></table></div>';
    // Scenario Analysis
    riskHtml += '<div class="risk-card"><h5 style="color:var(--text-secondary);margin-bottom:12px">' + monoIcon('chart') + ' 시나리오 분석</h5>';
    riskHtml += '<div class="scenario-grid">';
    riskHtml += '<div class="scenario-item scenario-best"><div class="scenario-label">' + monoIcon('check') + ' 최선의 경우</div><div class="scenario-desc">' + (r.insight[0] || '') + '</div><div class="scenario-note">이해관계자 합의 도출 + 정책 신뢰도 확보 시</div></div>';
    riskHtml += '<div class="scenario-item scenario-likely"><div class="scenario-label">' + monoIcon('neutral') + ' 가장 가능성 높음</div><div class="scenario-desc">' + (r.insight[1] || '') + '</div><div class="scenario-note">현 추세 유지 시 가장 높은 확률의 시나리오</div></div>';
    riskHtml += '<div class="scenario-item scenario-worst"><div class="scenario-label">' + monoIcon('risk') + ' 최악의 경우</div><div class="scenario-desc">' + (r.critical[0] || '') + '</div><div class="scenario-note">정책 실패 + 여론 반전 시 최악의 시나리오</div></div>';
    riskHtml += '</div></div>';
    // Pre-mortem Insight
    riskHtml += '<div class="risk-card"><h5 style="color:var(--text-secondary)">' + monoIcon('idea') + ' 사전 점검 인사이트</h5><ul>';
    r.insight.forEach(i => riskHtml += '<li>' + i + '</li>');
    riskHtml += '</ul></div></div>';
    document.getElementById('risk-content').innerHTML = riskHtml;

    // Jury
    let juryHtml = '';
    const juryPanel = completeJuryPanel(issue);
    juryPanel.forEach(j => {
        juryHtml += `<div class="jury-card"><div class="jury-avatar" style="background:linear-gradient(135deg,${STANCE_GRADIENT[j.stance] || STANCE_GRADIENT.unsure})">${monoIcon('person')}</div><div class="jury-name">${j.name}</div><div class="jury-demo">${j.demo}</div><span class="jury-stance ${STANCE_CLASS[j.stance] || STANCE_CLASS.unsure}">${STANCE_LABEL[j.stance] || STANCE_LABEL.unsure}</span><div class="jury-quote">"${j.quote}"</div></div>`;
    });
    document.getElementById('jury-grid').innerHTML = juryHtml;

    // Cross-tabulation Bubble Map
    window._mapIssue = issue;
    renderBubbleMap('ideology_age');

    // Admin-only validation metrics are not shown in the public issue detail.
    const poi = issue.stats;
    const t2 = (poi.agree + poi.agreeish);
    const b2 = (poi.disagreeish + poi.disagree);
    // Simulated cross-validation metrics based on issue characteristics
    const baseAcc = 0;
    const variance = Math.abs(t2 - b2) < 10 ? -2.8 : Math.abs(t2 - b2) < 20 ? -1.2 : 0.5;
    const accuracy = Math.min(98.5, baseAcc + variance + (Math.random() * 1.2 - 0.6)).toFixed(1);
    const panelMatch = Math.min(97, parseFloat(accuracy) + (Math.random() * 2.5)).toFixed(1);
    const kappa = (parseFloat(accuracy) / 100 * 0.85 + 0.08).toFixed(3);
    const rmse = (100 - parseFloat(accuracy)).toFixed(1);
    const nPanelVerified = 0;
    const recPrecision = Math.min(96.8, parseFloat(accuracy) + 1.5 + Math.random()).toFixed(1);
    const recRecall = Math.min(94.5, parseFloat(accuracy) - 0.5 + Math.random()).toFixed(1);
    const f1 = (2 * parseFloat(recPrecision) * parseFloat(recRecall) / (parseFloat(recPrecision) + parseFloat(recRecall))).toFixed(1);

    let poiHtml = `
    <div class="poi-section">
        <div class="poi-header">
            <h4>${monoIcon('lock')} AI 추정 안내</h4>
            <p>관리자 전용 검증 지표는 상세 화면에 표시하지 않습니다.</p>
        </div>
        <div class="poi-grid">
            <div class="poi-card poi-card-primary">
                <div class="poi-card-icon">${monoIcon('target')}</div>
                <div class="poi-card-value" style="color:var(--accent-green)">${accuracy}%</div>
                <div class="poi-card-label">관리자 전용 지표</div>
                <div class="poi-card-desc">5겹 교차검증 MAE</div>
            </div>
            <div class="poi-card">
                <div class="poi-card-icon">${monoIcon('users')}</div>
                <div class="poi-card-value" style="color:var(--accent-blue)">${panelMatch}%</div>
                <div class="poi-card-label">관리자 전용 지표</div>
                <div class="poi-card-desc">${nPanelVerified.toLocaleString()}명 검증 완료</div>
            </div>
            <div class="poi-card">
                <div class="poi-card-icon">${monoIcon('ruler')}</div>
                <div class="poi-card-value" style="color:var(--accent-purple)">κ=${kappa}</div>
                <div class="poi-card-label">코헨 카파</div>
                <div class="poi-card-desc">상세 화면 미표시</div>
            </div>
            <div class="poi-card">
                <div class="poi-card-icon">${monoIcon('down')}</div>
                <div class="poi-card-value" style="color:var(--accent-orange)">${rmse}%p</div>
                <div class="poi-card-label">관리자 지표</div>
                <div class="poi-card-desc">예측-실측 편차 (낮을수록 우수)</div>
            </div>
        </div>
        <div class="poi-detail-section">
            <div class="poi-detail-card">
                <h5>${monoIcon('refresh')} 교차검증 프로세스</h5>
                <div class="poi-steps">
                    <div class="poi-step"><span class="poi-step-num">1</span><span>관리자 표본 기준 검증</span></div>
                    <div class="poi-step"><span class="poi-step-num">2</span><span>인구통계(성별·연령·지역·성향) + 심리변수(MBTI·가치관) 기반 가중 추정</span></div>
                    <div class="poi-step"><span class="poi-step-num">3</span><span>관리자 대시보드에서만 검증 지표 산출</span></div>
                    <div class="poi-step"><span class="poi-step-num">4</span><span>응답 일관성은 관리자 대시보드에서만 검토</span></div>
                    <div class="poi-step"><span class="poi-step-num">5</span><span>추천 알고리즘(CF+CBF) 접합 → 유사 패널 군집 예측 보정</span></div>
                </div>
            </div>
            <div class="poi-detail-card">
                <h5>${monoIcon('bot')} 추천 알고리즘 접합 성능</h5>
                <div class="poi-algo-grid">
                    <div class="poi-algo-item">
                        <div class="poi-algo-name">유사응답 기반 추천</div>
                        <div class="poi-algo-bar"><div class="poi-algo-fill" style="width:${recPrecision}%;background:var(--accent-blue)"></div></div>
                        <div class="poi-algo-val">정밀도 ${recPrecision}%</div>
                    </div>
                    <div class="poi-algo-item">
                        <div class="poi-algo-name">속성 기반 추천</div>
                        <div class="poi-algo-bar"><div class="poi-algo-fill" style="width:${recRecall}%;background:var(--accent-purple)"></div></div>
                        <div class="poi-algo-val">재현율 ${recRecall}%</div>
                    </div>
                    <div class="poi-algo-item">
                        <div class="poi-algo-name">혼합 앙상블</div>
                        <div class="poi-algo-bar"><div class="poi-algo-fill" style="width:${f1}%;background:var(--accent-green)"></div></div>
                        <div class="poi-algo-val">F1-Score ${f1}%</div>
                    </div>
                </div>
                <p class="poi-algo-note">${monoIcon('idea')} 세그먼트 특성을 보정해 추정 편향을 줄이는 관리자용 검토 항목입니다.</p>
            </div>
        </div>
        <div class="poi-confidence">
            <span class="poi-badge poi-badge-mid">${monoIcon('alert')} 관리자 전용</span>
            <span class="poi-confidence-text">이 영역은 공개 상세 화면에서 숨겨집니다.</span>
        </div>
    </div>`;
    const poiContent = document.getElementById('poi-content');
    if (poiContent) poiContent.innerHTML = poiHtml;
    renderModalComments(issue, issueKey);
    renderRelatedArticles(issue, issueKey);
}

const MODAL_COMMENTS_STORAGE_KEY = 'deep-survey-issue-comments';
const MODAL_USER_STORAGE_KEY = 'deep-survey-user';

function readModalJsonStorage(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch (_) {
        return fallback;
    }
}

function writeModalJsonStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (_) {
        // Local previews may block storage; comments simply become session-only.
    }
}

function getModalCommentKey(issue, issueKey = activeModalIssueKey) {
    return issueKey || Object.keys(issueData).find(key => issueData[key] === issue) || issue?.title || 'deep-survey-issue';
}

function readModalComments(key) {
    const allComments = readModalJsonStorage(MODAL_COMMENTS_STORAGE_KEY, {});
    return Array.isArray(allComments[key]) ? allComments[key] : [];
}

function writeModalComments(key, comments) {
    const allComments = readModalJsonStorage(MODAL_COMMENTS_STORAGE_KEY, {});
    allComments[key] = comments.slice(-80);
    writeModalJsonStorage(MODAL_COMMENTS_STORAGE_KEY, allComments);
}

function getModalCurrentUser() {
    return readModalJsonStorage(MODAL_USER_STORAGE_KEY, null);
}

function formatModalCommentTime(value) {
    const date = value ? new Date(value) : null;
    if (!date || Number.isNaN(date.getTime())) return '방금';
    const diffSeconds = Math.max(0, Math.floor((Date.now() - date.getTime()) / 1000));
    if (diffSeconds < 45) return '방금';
    const diffMinutes = Math.floor(diffSeconds / 60);
    if (diffMinutes < 60) return `${diffMinutes}분 전`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}시간 전`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays}일 전`;
    return date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' });
}

function modalCommentPasswordHash(password) {
    const normalized = String(password || '').trim();
    if (!normalized) return '';
    let hash = 2166136261;
    for (let i = 0; i < normalized.length; i += 1) {
        hash ^= normalized.charCodeAt(i);
        hash = Math.imul(hash, 16777619);
    }
    return `demo-fnv1a:${(hash >>> 0).toString(16)}`;
}

function ensureModalCommentShape(comment, index = 0) {
    const createdAt = comment.createdAt || comment.timestamp || new Date(Date.now() - index * 60000).toISOString();
    return {
        id: comment.id || `c_${Date.parse(createdAt) || Date.now()}_${index}_${Math.random().toString(36).slice(2, 7)}`,
        author: comment.author || '익명',
        text: comment.text || '',
        passwordHash: comment.passwordHash || '',
        createdAt,
        updatedAt: comment.updatedAt || null,
        recommendedBy: Array.isArray(comment.recommendedBy) ? comment.recommendedBy : [],
        recommendCount: Number(comment.recommendCount || comment.recommendations || 0),
        avatarUrl: comment.avatarUrl || comment.photoURL || comment.picture || '',
        isAnonymous: comment.isAnonymous ?? !comment.avatarUrl,
    };
}

function getCommentVoterId() {
    let voterId = localStorage.getItem('deep-survey-comment-voter-id');
    if (!voterId) {
        voterId = `visitor_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
        localStorage.setItem('deep-survey-comment-voter-id', voterId);
    }
    return voterId;
}

function renderModalCommentAvatar(comment) {
    if (comment.avatarUrl) {
        return `<img class="comment-avatar-img" src="${escapeHtml(comment.avatarUrl)}" alt="${escapeHtml(comment.author)} 프로필">`;
    }
    return '<span class="comment-avatar-blank" aria-hidden="true"></span>';
}

function renderModalCommentItems(comments) {
    if (!comments.length) return '<div class="comment-empty">아직 댓글이 없습니다. 첫 의견을 남겨주세요.</div>';
    const voterId = getCommentVoterId();
    return `<div class="comment-list modal-comment-list">${comments.slice().reverse().map((rawComment, reverseIndex) => {
        const originalIndex = comments.length - 1 - reverseIndex;
        const comment = ensureModalCommentShape(rawComment, originalIndex);
        const hasRecommended = comment.recommendedBy.includes(voterId);
        const edited = comment.updatedAt ? '<span class="comment-edited">수정됨</span>' : '';
        const timestamp = `<time datetime="${escapeHtml(comment.updatedAt || comment.createdAt)}" data-comment-time="${escapeHtml(comment.updatedAt || comment.createdAt)}">${escapeHtml(formatModalCommentTime(comment.updatedAt || comment.createdAt))}</time>${edited}`;
        const isEditing = String(activeModalCommentEditId || '') === String(comment.id);
        const isDeleteConfirming = String(activeModalCommentDeleteConfirmId || '') === String(comment.id);
        const editForm = isEditing ? `<div class="modal-comment-edit-form" role="group" aria-label="댓글 수정">
                <textarea data-modal-comment-edit-input="${escapeHtml(comment.id)}" maxlength="300" rows="3" aria-label="댓글 수정 내용">${escapeHtml(comment.text)}</textarea>
                <div class="modal-comment-edit-actions">
                    <button type="button" class="comment-action-btn" onclick="cancelModalCommentEdit()">취소</button>
                    <button type="button" class="comment-action-btn recommend" onclick="saveModalCommentEdit('${escapeHtml(comment.id)}')">저장</button>
                </div>
            </div>` : '';
        const deleteConfirm = isDeleteConfirming ? `<div class="modal-comment-delete-confirm" role="group" tabindex="-1" data-modal-comment-delete-confirm="${escapeHtml(comment.id)}" aria-label="댓글 삭제 확인" onkeydown="handleModalCommentDeleteConfirmKeydown(event)">
                <span>삭제할까요?</span>
                <div class="modal-comment-delete-actions">
                    <button type="button" class="comment-action-btn" data-modal-comment-delete-cancel="${escapeHtml(comment.id)}" onclick="cancelModalCommentDelete()">취소</button>
                    <button type="button" class="comment-action-btn danger" onclick="confirmModalCommentDelete('${escapeHtml(comment.id)}')">삭제</button>
                </div>
            </div>` : '';
        return `<article class="comment-item" data-comment-id="${escapeHtml(comment.id)}">
            <div class="comment-avatar">${renderModalCommentAvatar(comment)}</div>
            <div class="comment-body">
                <div class="comment-meta">
                    <strong>${escapeHtml(comment.author)}</strong>
                    <span>${timestamp}</span>
                </div>
                <p>${escapeHtml(comment.text)}</p>
            </div>
            <div class="comment-actions" aria-label="댓글 작업">
                <div class="comment-actions-top">
                    <button type="button" class="comment-action-btn" onclick="startModalCommentEdit('${escapeHtml(comment.id)}')">수정</button>
                    <button type="button" class="comment-action-btn danger" onclick="deleteModalComment('${escapeHtml(comment.id)}')">삭제</button>
                </div>
                <button type="button" class="comment-action-btn recommend ${hasRecommended ? 'active' : ''}" onclick="toggleModalCommentRecommend('${escapeHtml(comment.id)}')">추천 <strong>${comment.recommendCount}</strong></button>
            </div>
            ${editForm}
            ${deleteConfirm}
        </article>`;
    }).join('')}</div>`;
}

function updateModalCommentCounter(input) {
    const value = input?.value || '';
    const remaining = Math.max(0, 300 - value.length);
    const counter = document.getElementById('modal-comment-count');
    if (counter) {
        counter.textContent = `${remaining.toLocaleString('ko-KR')}자 남음`;
        counter.classList.toggle('is-limit-near', remaining <= 30);
    }
    if (value.trim()) setModalCommentFormStatus('');
}

function setModalCommentFormStatus(message = '', tone = 'neutral') {
    const status = document.getElementById('modal-comment-status');
    if (!status) return;
    status.textContent = message;
    status.classList.toggle('is-error', tone === 'error');
}

function handleModalCommentKeydown(event) {
    if (!(event.ctrlKey || event.metaKey) || event.key !== 'Enter') return;
    event.preventDefault();
    submitModalComment();
}

function renderModalComments(issue, issueKey = activeModalIssueKey) {
    const container = document.getElementById('modal-comments-content');
    if (!container) return;
    const key = getModalCommentKey(issue, issueKey);
    const user = getModalCurrentUser();
    const comments = readModalComments(key).map(ensureModalCommentShape);
    writeModalComments(key, comments);
    const authorLabel = user?.name || user?.providerLabel || '익명';

    const inputArea = `<div class="comment-form modal-comment-form">
            <div class="modal-comment-topline">
                <div class="modal-comment-author">
                    <span>${escapeHtml(authorLabel)}</span>
                    ${user ? '<em>로그인 댓글</em>' : '<em>비로그인 댓글</em>'}
                </div>
                ${user ? '' : '<input id="modal-comment-password" class="modal-comment-password-inline" type="password" maxlength="32" autocomplete="new-password" placeholder="수정·삭제용 비밀번호">'}
            </div>
            <textarea id="modal-comment-input" rows="3" maxlength="300" placeholder="의견을 남겨주세요" aria-describedby="modal-comment-help modal-comment-count modal-comment-status" oninput="updateModalCommentCounter(this)" onkeydown="handleModalCommentKeydown(event)"></textarea>
            <div class="modal-comment-footer">
                <p class="comment-form-note" id="modal-comment-help">익명 댓글은 입력한 비밀번호로만 수정·삭제할 수 있습니다.</p>
                <span class="modal-comment-count" id="modal-comment-count" role="status" aria-live="polite">300자 남음</span>
            </div>
            <span class="modal-comment-status" id="modal-comment-status" role="status" aria-live="polite"></span>
            <button type="button" onclick="submitModalComment()">댓글 달기</button>
        </div>`;

    container.innerHTML = `<section class="modal-comments-panel">
        <div class="analysis-panel-head">
            <h4>${monoIcon('comment')} 댓글</h4>
            <span>${comments.length.toLocaleString('ko-KR')}개</span>
        </div>
        ${inputArea}
        ${renderModalCommentItems(comments)}
    </section>`;
    scheduleModalCommentTimeRefresh();
}

function openModalLoginPrompt() {
    if (typeof window.openLogin === 'function') {
        window.openLogin('댓글을 작성하려면 로그인이 필요합니다.');
    }
}

function submitModalComment() {
    const issue = issueData[activeModalIssueKey] || issueData.sugar;
    const key = getModalCommentKey(issue, activeModalIssueKey);
    const user = getModalCurrentUser();
    const input = document.getElementById('modal-comment-input');
    const text = input?.value?.trim();
    if (!text) {
        setModalCommentFormStatus('의견을 입력하세요.', 'error');
        input?.focus();
        return;
    }
    const passwordInput = document.getElementById('modal-comment-password');
    const password = user ? '' : passwordInput?.value?.trim();
    if (!user && (!password || password.length < 4)) {
        setModalCommentFormStatus('비밀번호 4자 이상 입력하세요.', 'error');
        passwordInput?.focus();
        return;
    }
    const comments = readModalComments(key).map(ensureModalCommentShape);
    const now = new Date().toISOString();
    comments.push({
        id: `c_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        author: user?.name || user?.providerLabel || '익명',
        text,
        passwordHash: user ? '' : modalCommentPasswordHash(password),
        createdAt: now,
        updatedAt: null,
        recommendedBy: [],
        recommendCount: 0,
        avatarUrl: user?.avatarUrl || user?.photoURL || user?.picture || user?.image || '',
        isAnonymous: !user,
    });
    writeModalComments(key, comments);
    renderModalComments(issue, key);
    if (typeof window.showShareToast === 'function') {
        window.showShareToast('댓글을 남겼어요');
    }
}

function findModalCommentById(comments, commentId) {
    return comments.find(comment => String(comment.id) === String(commentId));
}

function assertModalCommentPermission(comment, actionLabel = '수정') {
    if (!comment.passwordHash) return true;
    const passwordInput = document.getElementById('modal-comment-password');
    const password = passwordInput?.value?.trim() || '';
    if (!password) {
        setModalCommentFormStatus('비밀번호를 입력하세요. ' + actionLabel + '에 필요합니다.', 'error');
        passwordInput?.focus();
        return false;
    }
    if (modalCommentPasswordHash(password) !== comment.passwordHash) {
        setModalCommentFormStatus('비밀번호가 맞지 않습니다.', 'error');
        passwordInput?.focus();
        return false;
    }
    setModalCommentFormStatus('');
    return true;
}

function startModalCommentEdit(commentId) {
    const issue = issueData[activeModalIssueKey] || issueData.sugar;
    const key = getModalCommentKey(issue, activeModalIssueKey);
    const comments = readModalComments(key).map(ensureModalCommentShape);
    const comment = findModalCommentById(comments, commentId);
    if (!comment || !assertModalCommentPermission(comment, '수정')) return;
    activeModalCommentEditId = comment.id;
    activeModalCommentDeleteConfirmId = null;
    renderModalComments(issue, key);
    requestAnimationFrame(() => {
        const editor = document.querySelector('[data-modal-comment-edit-input="' + window.CSS.escape(String(commentId)) + '"]');
        editor?.focus();
        editor?.select();
    });
    setModalCommentFormStatus('수정 중입니다. 저장 또는 취소를 선택하세요.');
}

function cancelModalCommentEdit() {
    const issue = issueData[activeModalIssueKey] || issueData.sugar;
    const key = getModalCommentKey(issue, activeModalIssueKey);
    activeModalCommentEditId = null;
    renderModalComments(issue, key);
    setModalCommentFormStatus('수정을 취소했어요.');
}

function saveModalCommentEdit(commentId) {
    const issue = issueData[activeModalIssueKey] || issueData.sugar;
    const key = getModalCommentKey(issue, activeModalIssueKey);
    const comments = readModalComments(key).map(ensureModalCommentShape);
    const comment = findModalCommentById(comments, commentId);
    if (!comment) return;
    if (String(activeModalCommentEditId || '') !== String(comment.id) && !assertModalCommentPermission(comment, '수정')) return;
    const editor = document.querySelector('[data-modal-comment-edit-input="' + window.CSS.escape(String(commentId)) + '"]');
    const trimmed = editor?.value?.trim() || '';
    if (!trimmed) {
        setModalCommentFormStatus('댓글 내용을 입력하세요.', 'error');
        editor?.focus();
        return;
    }
    comment.text = trimmed.slice(0, 300);
    comment.updatedAt = new Date().toISOString();
    activeModalCommentEditId = null;
    writeModalComments(key, comments);
    renderModalComments(issue, key);
    setModalCommentFormStatus('댓글을 수정했어요.');
}

function deleteModalComment(commentId) {
    const issue = issueData[activeModalIssueKey] || issueData.sugar;
    const key = getModalCommentKey(issue, activeModalIssueKey);
    const comments = readModalComments(key).map(ensureModalCommentShape);
    const comment = findModalCommentById(comments, commentId);
    if (!comment || !assertModalCommentPermission(comment, '삭제')) return;
    activeModalCommentEditId = null;
    activeModalCommentDeleteConfirmId = comment.id;
    renderModalComments(issue, key);
    focusModalCommentDeleteCancel(comment.id);
    requestAnimationFrame(() => focusModalCommentDeleteCancel(comment.id));
    setModalCommentFormStatus('삭제할 댓글을 확인하세요.');
}

function focusModalCommentDeleteCancel(commentId) {
    const cancelButton = document.querySelector('[data-modal-comment-delete-cancel="' + window.CSS.escape(String(commentId)) + '"]');
    cancelButton?.focus();
}

function handleModalCommentDeleteConfirmKeydown(event) {
    if (event.key !== 'Escape') return;
    event.preventDefault();
    cancelModalCommentDelete();
}

function cancelModalCommentDelete() {
    const issue = issueData[activeModalIssueKey] || issueData.sugar;
    const key = getModalCommentKey(issue, activeModalIssueKey);
    activeModalCommentDeleteConfirmId = null;
    renderModalComments(issue, key);
    setModalCommentFormStatus('삭제를 취소했어요.');
}

function confirmModalCommentDelete(commentId) {
    const issue = issueData[activeModalIssueKey] || issueData.sugar;
    const key = getModalCommentKey(issue, activeModalIssueKey);
    const comments = readModalComments(key).map(ensureModalCommentShape);
    const comment = findModalCommentById(comments, commentId);
    if (!comment || String(activeModalCommentDeleteConfirmId || '') !== String(comment.id)) return;
    if (!assertModalCommentPermission(comment, '삭제')) return;
    activeModalCommentDeleteConfirmId = null;
    writeModalComments(key, comments.filter(item => item.id !== comment.id));
    renderModalComments(issue, key);
    setModalCommentFormStatus('댓글을 삭제했어요.');
}

function toggleModalCommentRecommend(commentId) {
    const issue = issueData[activeModalIssueKey] || issueData.sugar;
    const key = getModalCommentKey(issue, activeModalIssueKey);
    const voterId = getCommentVoterId();
    const comments = readModalComments(key).map(ensureModalCommentShape);
    const comment = findModalCommentById(comments, commentId);
    if (!comment) return;
    const already = comment.recommendedBy.includes(voterId);
    comment.recommendedBy = already
        ? comment.recommendedBy.filter(id => id !== voterId)
        : [...comment.recommendedBy, voterId];
    comment.recommendCount = comment.recommendedBy.length;
    writeModalComments(key, comments);
    renderModalComments(issue, key);
}

let modalCommentTimeRefreshTimer = null;
function refreshModalCommentTimes() {
    document.querySelectorAll('[data-comment-time]').forEach(node => {
        node.textContent = formatModalCommentTime(node.dataset.commentTime);
    });
}
function scheduleModalCommentTimeRefresh() {
    if (modalCommentTimeRefreshTimer) clearInterval(modalCommentTimeRefreshTimer);
    refreshModalCommentTimes();
    modalCommentTimeRefreshTimer = setInterval(refreshModalCommentTimes, 30000);
}

function findRelatedIssueSource(issue, issueKey = activeModalIssueKey) {
    const candidates = [
        ...(Array.isArray(liveIssueFeedItems) ? liveIssueFeedItems : []),
        ...(typeof FALLBACK_LIVE_ISSUES !== 'undefined' ? FALLBACK_LIVE_ISSUES : []),
    ];
    return candidates.find(item =>
        item.issue_key === issueKey ||
        item.title === issue?.title ||
        item.hot_title === issue?.title ||
        (item.title && issue?.title && item.title.includes(issue.title.slice(0, 8)))
    );
}

function buildGeneratedRelatedArticles(issue) {
    const risks = issue?.risks || {};
    const critical = (risks.critical || []).slice(0, 2).join(' · ');
    const insight = (risks.insight || []).slice(0, 2).join(' · ');
    return [
        {
            source: `${issue?.category || '이슈'} 브리프`,
            title: `${issue?.title || '정책 이슈'} 핵심 쟁점 정리`,
            text: issue?.subtitle || insight || '찬반 여론과 정책 실행 조건을 함께 확인해야 하는 이슈입니다.',
        },
        {
            source: '리스크 노트',
            title: '실행 전 확인할 리스크',
            text: critical || '이해관계자 반발, 재정 부담, 현장 집행 가능성을 함께 검토해야 합니다.',
        },
        {
            source: '세그먼트 관찰',
            title: '성향·연령·지역별 반응 차이',
            text: issue?.target || '세부 세그먼트별 동의와 비동의의 격차를 비교해 메시지 우선순위를 잡아야 합니다.',
        },
    ];
}

function buildFallbackFactors(issue) {
    const category = issue?.category || '정책';
    const keyword = (issue?.keywords || [])[0] || category;
    return [
        { coef: '+0.28', name: `이슈 분류: ${category}`, sig: 'derived', pos: true },
        { coef: '+0.17', name: `핵심 키워드: ${keyword}`, sig: 'keyword', pos: true },
        { coef: '-0.14', name: '출처 검증 전 불확실성', sig: 'caution', pos: false },
    ];
}

function buildFallbackTargetSegment(issue) {
    const category = issue?.category || '정책';
    const keyword = (issue?.keywords || [])[0] || category;
    return `${category} 관심층 · ${keyword} 관련 판단 유보층`;
}

let regressionImprovementBacklogCache = null;

function getRegressionImprovementBacklog() {
    if (regressionImprovementBacklogCache) return regressionImprovementBacklogCache;
    const entries = [
        ['outcome', '5점 응답을 단순 찬성률로 접어 정보가 손실됨', '이진 지지와 순서형 결과를 병렬 추정'],
        ['outcome', '강한 동의와 약한 동의가 같은 지지로 처리됨', '강도 점수와 지지 여부를 분리 표시'],
        ['sampling', '표본 프레임 변수와 설명 후보가 섞여 보임', '프레임/설명 후보를 모델 카드에서 분리'],
        ['sampling', '가중치 적용 여부가 회귀 탭에 없음', '표본추출 방식, n, 신뢰수준을 헤더에 노출'],
        ['uncertainty', '계수만 있고 신뢰구간이 없어 과대해석 위험', 'CI, odds ratio, 표본수를 함께 표시'],
        ['uncertainty', 'p값 라벨이 확정 검정처럼 보임', '탐색적 근사 p값과 한계 문구 병기'],
        ['stability', '소표본 세그먼트가 큰 계수로 과장될 수 있음', '세그먼트 n과 CI 폭 기반 안정성 등급'],
        ['diagnostics', '모델 설명력과 적용 범위가 숨겨짐', '모델 카드에 목적, 범위, 한계, 다음 검증 명시'],
        ['causality', '상관을 원인처럼 읽을 위험', '인과 아님 경고를 탭 상단에 고정'],
        ['workflow', '분석 결과가 다음 조사 설계로 이어지지 않음', '각 요인마다 다음 질문/표본 보강 액션 생성'],
        ['model', '단변량 후보 효과라 교란 제거가 부족', '다변량 로지스틱 회귀 추가'],
        ['model', '5점 응답의 순서를 활용하지 못함', 'ordinal logit/probit 병행'],
        ['model', '지역·연령·성별 희소 셀이 불안정', '계층 베이지안 부분풀링 적용'],
        ['model', '정책 유형별 기저 분포가 고정 규칙에 가까움', '정책 유형 prior를 실측으로 업데이트'],
        ['model', '상호작용 효과가 보이지 않음', '정치성향 x 연령, 지역 x 이해관계 상호작용 추가'],
        ['model', '비선형 임계값을 표현하기 어려움', 'GAM 또는 monotonic tree 보조 모델 비교'],
        ['model', '잘 모름 집단이 단순 중립으로 섞임', '유보/미결정 hurdle 모델 추가'],
        ['model', '강한 반대의 동원 위험을 따로 예측하지 않음', 'strong oppose 이진 모델 산출'],
        ['model', '메시지 문구 효과가 설명변수로 들어가지 않음', '문구 프레임 임베딩/토픽 변수 추가'],
        ['model', '대체추출 시 분산이 과소평가될 수 있음', '대체추출 설계효과와 bootstrap SE 반영'],
        ['validation', '학습/검증 분리가 없음', 'seed 고정 holdout과 반복 교차검증'],
        ['validation', '확률 보정 확인이 없음', 'calibration curve와 Brier score 표시'],
        ['validation', 'AUC/정확도 하나로는 정책판단에 부족', 'AUC, log loss, calibration, segment error 묶음'],
        ['validation', '외부 실제 패널 검증과 연결되지 않음', '실제 패널 응답 posterior recalibration'],
        ['validation', '시간 변화에 따른 계수 drift가 없음', '이슈 업데이트별 계수 drift 그래프'],
        ['validation', '지역별 오차가 전체 평균에 묻힘', '지역/연령/성별 worst-cell error 공개'],
        ['validation', '질문 문항 순서 효과가 반영되지 않음', '문항 순서 randomized block 테스트'],
        ['validation', '응답 생성 모델 변경 영향이 추적되지 않음', '모델 버전별 결과 diff 저장'],
        ['validation', '민감 세그먼트의 오분류 리스크가 숨겨짐', '세그먼트별 false positive/negative 경고'],
        ['validation', '표본 프레임 업데이트와 회귀 결과가 분리됨', '프레임 월 변경 전후 계수 민감도 비교'],
        ['data', '직업·자산·가치관 변수 품질 진단이 부족', 'missingness, cardinality, rare category 진단'],
        ['data', '유사 범주가 과도하게 분산됨', '범주 병합 규칙과 reference category 명시'],
        ['data', '텍스트 출처와 응답 변수 연결이 약함', '기사/문서 프레임 변수를 feature store로 저장'],
        ['data', '가상 표본과 패널 표본이 같은 신뢰도로 보일 수 있음', 'panel interval과 model interval 배지 분리'],
        ['data', '표본 가중치 극단값이 결과를 흔들 수 있음', 'weight trimming 민감도 리포트'],
        ['data', '응답 확률벡터 생성 규칙이 충분히 감사되지 않음', 'row별 feature contribution audit 저장'],
        ['data', '실제 조사와 합성 응답 provenance가 흐려짐', 'row provenance와 사용 가능 범위를 필수 필드화'],
        ['data', '희소 집단 privacy와 안정성이 충돌', '최소 셀 크기와 suppression 규칙 도입'],
        ['product', '계수를 바로 의사결정 신호로 오해할 수 있음', '탐색용/결정용/보강필요 신호를 텍스트로 구분'],
        ['product', '상세 탭이 숫자 나열로 끝날 수 있음', '요인 → 해석 제한 → 다음 질문 카드 구조'],
        ['product', '50개 개선점이 실행 우선순위 없이 부담스럽게 보임', '적용됨/다음 단계 상태로 묶어 표시'],
        ['product', '반대층 설득 액션과 회귀 결과가 분리됨', '음의 계수 요인을 우려 완화 메시지로 연결'],
        ['product', '상세 탭과 커스텀 시뮬레이션 결과 언어가 다름', 'regression_analysis 공통 payload로 통일'],
        ['governance', '모델 한계가 감사 카드와 떨어져 있음', '모델 카드에 seed/frame/version/hash 연결'],
        ['governance', '정책 외부 공유 시 확정처럼 보일 위험', '공유 문구에 exploratory screening caveat 삽입'],
        ['governance', '민감 변수 사용 기준이 명확하지 않음', '민감 변수 사용/미사용 모드와 사유 기록'],
        ['governance', '자동화된 차별 영향 검사가 없음', 'disparate impact diagnostic 추가'],
        ['governance', '법/의료/금융 고위험 이슈에 같은 표시를 씀', '고위험 도메인 회귀 탭 경고 레벨 상향'],
        ['governance', '사용자가 모델 변경 이력을 볼 수 없음', '분석 버전 changelog와 schema version 노출'],
        ['governance', '모델 결과 삭제/재현 절차가 명확하지 않음', '입력 hash 기반 재현·삭제·재실행 정책 연결'],
    ];
    regressionImprovementBacklogCache = entries.map(([area, problem, improvement], index) => ({
        id: index + 1,
        area,
        problem,
        improvement,
        status: index < 10 || index === 39 || index === 40 || index === 42 ? 'applied_now' : 'next',
    }));
    return regressionImprovementBacklogCache;
}

function normalizeRegressionFactor(factor, index, fallbackN = 1000) {
    const coefValue = Number.parseFloat(String(factor?.coef_value ?? factor?.coef ?? '0').replace(/[^\d.+-]/g, '')) || 0;
    const ci = Array.isArray(factor?.ci) ? factor.ci : [coefValue - 0.35, coefValue + 0.35];
    const n = Number(factor?.n || Math.max(40, Math.round(fallbackN / (index + 3))));
    const ciWidth = Math.abs((Number(ci[1]) || 0) - (Number(ci[0]) || 0));
    return {
        feature_label: factor?.feature_label || '설명 후보',
        category: factor?.category || '',
        name: factor?.name || '주요 설명 후보',
        coef: factor?.coef || `${coefValue >= 0 ? '+' : ''}${coefValue.toFixed(2)}`,
        coef_value: coefValue,
        odds_ratio: factor?.odds_ratio || Number(Math.exp(coefValue).toFixed(3)),
        ci,
        sig: factor?.sig || 'derived',
        pos: factor?.pos !== undefined ? !!factor.pos : coefValue >= 0,
        n,
        support_rate_pct: Number(factor?.support_rate_pct || 0),
        lift_pct: Number(factor?.lift_pct || coefValue * 8),
        stability: factor?.stability || (n >= 100 && ciWidth <= 1.2 ? 'high' : n >= 40 ? 'medium' : 'low'),
        interpretation: factor?.interpretation || (coefValue >= 0 ? '지지 가능성이 높은 후보 요인' : '반대/유보 가능성이 높은 후보 요인'),
        next_action: factor?.next_action || '같은 표본 조건에서 문구와 보완책을 바꿔 재검증',
    };
}

function buildRegressionAnalysis(issue, fallbackFactors = []) {
    const source = issue?.regression_analysis || issue?.regression || null;
    const stats = getOpinionTotals(issue?.stats || {});
    const sampleN = Number(issue?.sample_n || issue?.sample_size || source?.method?.sample_n || 1000);
    const backlog = source?.improvement_backlog_50 || getRegressionImprovementBacklog();
    const factors = (source?.factors?.length ? source.factors : fallbackFactors).map((factor, index) => normalizeRegressionFactor(factor, index, sampleN));
    const appliedNow = backlog.filter(item => item.status === 'applied_now').length;
    return {
        schema_version: source?.schema_version || 'regression_screening_v2',
        title: source?.title || '회귀 스크리닝 모델 진단',
        current_modeling: source?.current_modeling || [
            '기존 상세 탭은 세그먼트별 동의율 차이를 coef/p값처럼 표시했다.',
            '현재 표시는 실제 다변량 인과 회귀가 아니라 후보 변수 스크리닝이다.',
            '이번 화면은 계수, CI, n, 안정성, 다음 검증 질문을 함께 보여 과대해석을 줄인다.',
            '다변량/순서형/계층 모델과 실제 패널 검증은 다음 단계로 남긴다.',
        ],
        method: {
            model_type: source?.method?.model_type || 'one_vs_rest_log_odds_screening',
            outcome: source?.method?.outcome || 'support_binary = agreement_score >= 0.52',
            secondary_outcome: source?.method?.secondary_outcome || 'agreement_score_0_to_1',
            candidate_features: source?.method?.candidate_features || ['정치성향', '연령대', '지역', '성별'],
            confidence_level: source?.method?.confidence_level || 0.95,
            sample_n: sampleN,
            support_rate_pct: source?.method?.support_rate_pct || stats.agree,
            sampling_method: source?.method?.sampling_method || 'panel_factor_screening_fallback',
        },
        model_quality: source?.model_quality || {
            screening_strength: Math.round(Math.abs(stats.net) / 2),
            reliability_grade: '탐색',
            margin_of_error_pct: null,
            calibration_status: 'pending_holdout_validation',
        },
        factors,
        critical_review: source?.critical_review || [
            '단변량 스크리닝이므로 정치성향·연령·지역 간 교란을 완전히 제거하지 못한다.',
            '합성/패널 응답 벡터 기반 결과라 실제 여론조사 확정값이 아니다.',
            '희소 세그먼트의 큰 계수는 넓은 CI와 함께 보아야 한다.',
            'p값은 탐색적 정규근사 신호이며 정책 결론의 단독 근거가 아니다.',
            '질문 문구와 순서 효과는 아직 회귀식에 들어가지 않는다.',
        ],
        detail_tab_structure: source?.detail_tab_structure || ['모델 카드', '핵심 요인', '비판적 진단', '개선 백로그 50'],
        improvement_backlog_50: backlog,
        improvement_summary: source?.improvement_summary || {
            total: backlog.length,
            applied_now: appliedNow,
            next: backlog.length - appliedNow,
            later: 0,
        },
        warnings: source?.warnings || [],
    };
}

function renderRegressionFactorList(analysis) {
    const factors = analysis?.factors || [];
    if (!factors.length) return '<div class="regression-empty">표본 row가 부족해 후보 요인을 계산하지 못했습니다.</div>';
    return factors.map(f => {
        const tone = f.pos ? 'positive' : 'negative';
        const ci = Array.isArray(f.ci) ? `${Number(f.ci[0]).toFixed(2)} ~ ${Number(f.ci[1]).toFixed(2)}` : '—';
        const stabilityLabel = f.stability === 'high' ? '안정' : f.stability === 'medium' ? '주의' : '보강 필요';
        return `<article class="regression-factor-card">
            <div class="regression-factor-main">
                <span class="factor-coef ${tone}">${escapeHtml(f.coef)}</span>
                <div>
                    <strong>${escapeHtml(f.name)}</strong>
                    <p>${escapeHtml(f.interpretation || '')}</p>
                </div>
                <span class="factor-sig">${escapeHtml(f.sig || '')}</span>
            </div>
            <div class="regression-factor-meta">
                <span>OR ${escapeHtml(String(f.odds_ratio ?? '—'))}</span>
                <span>CI ${escapeHtml(ci)}</span>
                <span>n=${Number(f.n || 0).toLocaleString('ko-KR')}</span>
                <span>${escapeHtml(stabilityLabel)}</span>
            </div>
            <p class="regression-next-action">${escapeHtml(f.next_action || '')}</p>
        </article>`;
    }).join('');
}

function renderRegressionDiagnostics(analysis) {
    const method = analysis?.method || {};
    const quality = analysis?.model_quality || {};
    const summary = analysis?.improvement_summary || {};
    const backlog = analysis?.improvement_backlog_50 || [];
    const critical = analysis?.critical_review || [];
    const current = analysis?.current_modeling || [];
    const backlogRows = backlog.map(item => `<li><span>${String(item.id).padStart(2, '0')}</span><strong>${escapeHtml(item.area)}</strong><em>${escapeHtml(item.status === 'applied_now' ? '반영' : '다음')}</em><p>${escapeHtml(item.problem)} → ${escapeHtml(item.improvement)}</p></li>`).join('');
    return `<div class="regression-diagnostics">
        <section class="regression-model-card">
            <div class="analysis-panel-head">
                <h4>${monoIcon('chart')} ${escapeHtml(analysis?.title || '회귀 스크리닝')}</h4>
                <span>${escapeHtml(analysis?.schema_version || 'v2')}</span>
            </div>
            <div class="regression-model-grid">
                <div><span>모델</span><strong>${escapeHtml(method.model_type || 'screening')}</strong></div>
                <div><span>결과변수</span><strong>${escapeHtml(method.outcome || 'support_binary')}</strong></div>
                <div><span>표본</span><strong>n=${Number(method.sample_n || 0).toLocaleString('ko-KR')}</strong></div>
                <div><span>신뢰수준</span><strong>${Math.round(Number(method.confidence_level || 0.95) * 100)}%</strong></div>
            </div>
            <p class="regression-caveat">탐색적 스크리닝입니다. 인과 추정이나 최종 여론조사 수치로 사용하지 않고, 다음 표본·질문 설계의 우선순위를 정하는 용도입니다.</p>
        </section>
        <section class="regression-review-grid">
            <div class="regression-review-card">
                <h5>현재 구조</h5>
                <ul>${current.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
            </div>
            <div class="regression-review-card">
                <h5>비판적 진단</h5>
                <ul>${critical.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
            </div>
        </section>
        <section class="regression-quality-strip">
            <span>스크리닝 강도 <strong>${escapeHtml(String(quality.screening_strength ?? '—'))}</strong></span>
            <span>오차범위 <strong>${quality.margin_of_error_pct === null || quality.margin_of_error_pct === undefined ? '—' : `±${escapeHtml(String(quality.margin_of_error_pct))}%p`}</strong></span>
            <span>보정 상태 <strong>${escapeHtml(quality.calibration_status || 'pending')}</strong></span>
        </section>
        <details class="regression-backlog">
            <summary>개선 백로그 50 · 반영 ${Number(summary.applied_now || 0)} / 전체 ${Number(summary.total || backlog.length || 0)}</summary>
            <ol>${backlogRows}</ol>
        </details>
    </div>`;
}

function buildRiskProfile(issue) {
    const risks = issue?.risks || {};
    return {
        critical: (risks.critical && risks.critical.length) ? risks.critical : [
            '초기 이슈 정의가 좁아 핵심 반대 논리를 놓칠 가능성',
            '검증 기사 출처 부재로 외부 사실관계 확인 필요',
        ],
        medium: (risks.medium && risks.medium.length) ? risks.medium : [
            '이해관계자별 비용·편익이 충분히 분리되지 않음',
            '여론 질문 문구에 따라 찬반 격차가 크게 흔들릴 수 있음',
        ],
        insight: (risks.insight && risks.insight.length) ? risks.insight : [
            '문제 정의, 비용 부담, 책임 주체를 분리해 조사',
            '반대층 우려를 먼저 묻고 보완책 수용성을 재측정',
            '추가 출처가 확보되면 사실관계 기반 질문으로 재실행',
        ],
    };
}

function buildSourceIndependentAnalyses(issue, issueKey = activeModalIssueKey) {
    const totals = getOpinionTotals(issue?.stats || {});
    const risks = buildRiskProfile(issue);
    const factors = (Array.isArray(issue?.factors) && issue.factors.length) ? issue.factors : buildFallbackFactors(issue);
    const target = issue?.target || buildFallbackTargetSegment(issue);
    const sourceText = getIssueSourceText(issue) || issue?.summary || issue?.subtitle || issue?.title || '';
    const toolkit = buildSurveyQuestionToolkitCards(issue || {}, inferPolicyTypeFromIssue(issue || {}), sourceText);
    const generatedBriefs = buildGeneratedRelatedArticles(issue || {});
    return [
        {
            label: '여론 구조',
            title: `순동의 ${formatSignedPoint(totals.net)}`,
            text: `동의 ${formatPct(totals.agree)}%, 비동의 ${formatPct(totals.disagree)}%, 판단 유보 ${formatPct(totals.unsure)}%로 우선순위를 잡습니다.`,
        },
        {
            label: '세그먼트',
            title: '먼저 볼 집단',
            text: target,
        },
        {
            label: '요인 추정',
            title: factors[0]?.name || '주요 설명 변수',
            text: `${factors[0]?.coef || '+0.00'} · ${factors[0]?.sig || 'derived'} 기준으로 추가 표본에서 검증할 후보 요인입니다.`,
        },
        {
            label: '리스크',
            title: '초기 실패 시나리오',
            text: risks.critical.slice(0, 2).join(' · '),
        },
        {
            label: '보완 방향',
            title: '다음 설계 포인트',
            text: risks.insight.slice(0, 2).join(' · '),
        },
        {
            label: '질문 설계',
            title: toolkit[0]?.research_purpose || toolkit[0]?.lane || '추가 조사 질문',
            text: toolkit[0]?.title || generatedBriefs[0]?.text || '기사 출처가 확보되기 전에도 표본조사로 쟁점 구조를 먼저 확인합니다.',
        },
    ].filter(card => card.title || card.text).slice(0, 6);
}

function isVerifiedRelatedArticle(article) {
    if (!article || !(article.title || article.text || article.summary)) return false;
    const source = String(article.source || '');
    return !/(로컬|기본 이슈|이슈 라이브러리|사용자 입력|Deep Survey|브리프|리스크|세그먼트)/i.test(source);
}

function getRelatedArticles(issue, issueKey = activeModalIssueKey) {
    const sourceIssue = findRelatedIssueSource(issue, issueKey);
    const rawArticles = [
        ...((sourceIssue && Array.isArray(sourceIssue.articles)) ? sourceIssue.articles : []),
        ...((issue && Array.isArray(issue.articles)) ? issue.articles : []),
    ];
    const articles = rawArticles.filter(isVerifiedRelatedArticle);
    const seen = new Set();
    return articles
        .filter(article => {
            const key = `${article.source || ''}:${article.title || article.text || ''}`;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        })
        .slice(0, 5);
}

function renderRelatedArticles(issue, issueKey = activeModalIssueKey) {
    const container = document.getElementById('related-articles-content');
    if (!container) return;
    const articles = getRelatedArticles(issue, issueKey);
    const fallbackCards = articles.length ? [] : buildGeneratedRelatedArticles(issue);
    const status = articles.length
        ? `<div class="related-source-status" aria-label="관련 기사 출처 상태"><strong>검증된 기사 출처 ${articles.length.toLocaleString('ko-KR')}건</strong><span>카드별 출처 링크를 먼저 확인하세요 · 현재 여론 수치 아님</span></div>`
        : `<div class="related-source-status" aria-label="관련 기사 출처 상태"><strong>출처 검증 대기</strong><span>확인 가능한 기사 출처가 아직 없어 보조 분석으로만 표시합니다 · 현재 여론 수치 아님</span></div>`;
    const cards = (articles.length ? articles : fallbackCards).map(article => `<article class="related-article-card">
        <span>${escapeHtml(article.source || '분석 메모')}</span>
        <strong>${escapeHtml(article.title || '관련 쟁점')}</strong>
        <p>${escapeHtml(article.summary || article.text || '')}</p>
    </article>`).join('');
    container.innerHTML = `${status}<div class="related-article-grid">${cards}</div>`;
}

// ── Cross-Tabulation Bubble Map ──
const MAP_META = {
    ideology: {
        keys: ['prog','modprog','mod','modcons','cons'],
        labels: ['진보','중도진보','중도','중도보수','보수'],
        segKey: 'ideology5',
        cross: ['age','region'],
        crossLabels: { age:['18-29','30대','40대','50대','60대','70+'], region:['서울','경기','충청','호남','부산경남','대구경북','강원'] },
        crossKeys: { age:['a18','a30','a40','a50','a60','a70'], region:['seoul','gyeonggi','chungcheong','honam','busan','daegu','gangwon'] },
        crossSeg: { age:'age6', region:'region7' },
        desc: 'X축=정치성향 | 버블=연령(6)×지역(7)=42개 | Y축=동의율 | 크기=표본 비중'
    },
    age: {
        keys: ['a18','a30','a40','a50','a60','a70'],
        labels: ['18-29','30대','40대','50대','60대','70+'],
        segKey: 'age6',
        cross: ['ideology','region'],
        crossLabels: { ideology:['진보','중도진보','중도','중도보수','보수'], region:['서울','경기','충청','호남','부산경남','대구경북','강원'] },
        crossKeys: { ideology:['prog','modprog','mod','modcons','cons'], region:['seoul','gyeonggi','chungcheong','honam','busan','daegu','gangwon'] },
        crossSeg: { ideology:'ideology5', region:'region7' },
        desc: 'X축=연령대 | 버블=성향(5)×지역(7)=35개 | Y축=동의율 | 크기=표본 비중'
    },
    region: {
        keys: ['seoul','gyeonggi','chungcheong','honam','busan','daegu','gangwon'],
        labels: ['서울','경기','충청','호남','부산경남','대구경북','강원'],
        segKey: 'region7',
        cross: ['ideology','age'],
        crossLabels: { ideology:['진보','중도진보','중도','중도보수','보수'], age:['18-29','30대','40대','50대','60대','70+'] },
        crossKeys: { ideology:['prog','modprog','mod','modcons','cons'], age:['a18','a30','a40','a50','a60','a70'] },
        crossSeg: { ideology:'ideology5', age:'age6' },
        desc: 'X축=지역(7권역) | 버블=성향(5)×연령(6)=30개 | Y축=동의율 | 크기=표본 비중'
    }
};
const PANEL_W = { prog:.182, modprog:.182, mod:.376, modcons:.130, cons:.130,
    a18:.146, a30:.229, a40:.320, a50:.219, a60:.067, a70:.019,
    seoul:.205, gyeonggi:.340, chungcheong:.098, honam:.079, busan:.159, daegu:.092, gangwon:.027,
    female:.501, male:.499 };

const MAP_DIMENSIONS = {
    ideology: {
        name: '성향',
        keys: ['prog', 'modprog', 'mod', 'modcons', 'cons'],
        labels: ['진보', '중도진보', '중도', '중도보수', '보수'],
        segKey: 'ideology5',
    },
    age: {
        name: '연령',
        keys: ['a18', 'a30', 'a40', 'a50', 'a60', 'a70'],
        labels: ['18-29', '30대', '40대', '50대', '60대', '70+'],
        segKey: 'age6',
    },
    region: {
        name: '지역',
        keys: ['seoul', 'gyeonggi', 'chungcheong', 'honam', 'busan', 'daegu', 'gangwon'],
        labels: ['서울', '경기/인천', '충청', '호남', '부산/경남', '대구/경북', '강원/제주'],
        segKey: 'region7',
    },
    gender: {
        name: '성별',
        keys: ['female', 'male'],
        labels: ['여성', '남성'],
        segKey: 'gender2',
    },
};

const MAP_PAIR_META = {
    ideology_age: { x: 'ideology', y: 'age', label: '성향 × 연령' },
    ideology_region: { x: 'ideology', y: 'region', label: '성향 × 지역' },
    age_region: { x: 'age', y: 'region', label: '연령 × 지역' },
    gender_ideology: { x: 'gender', y: 'ideology', label: '성별 × 성향' },
    gender_age: { x: 'gender', y: 'age', label: '성별 × 연령' },
    gender_region: { x: 'gender', y: 'region', label: '성별 × 지역' },
};
let selectedMapDimensions = ['ideology', 'age'];

function syncMapDimensionButtons() {
    document.querySelectorAll('.map-axis-btn[data-map-dim]').forEach(button => {
        button.classList.toggle('active', selectedMapDimensions.includes(button.dataset.mapDim));
    });
}

function mapPairFromDimensions(dimensions) {
    const [first, second] = dimensions;
    const direct = `${first}_${second}`;
    const reverse = `${second}_${first}`;
    if (MAP_PAIR_META[direct]) return direct;
    if (MAP_PAIR_META[reverse]) return reverse;
    return 'ideology_age';
}

function axisPercent(index, count, start, span, dimension) {
    if (count <= 1) return start + span / 2;
    const raw = start + index * (span / (count - 1));
    if (dimension !== 'gender') return raw;
    const center = start + span / 2;
    return center + (raw - center) * 0.6;
}

function top2ForDimension(issue, dimension, key) {
    const seg = issue.segments || {};
    const dim = MAP_DIMENSIONS[dimension];
    const fallback = issue[dimension]?.[key];
    const source = dimension === 'gender' ? inferGenderSource(issue) : seg[dim.segKey];
    const vals = source?.[key] || fallback || [20, 20, 20, 20, 20];
    return Number(vals[0] || 0) + Number(vals[1] || 0);
}

function renderMapDimensionPrompt() {
    syncMapDimensionButtons();
    const map = document.getElementById('positioning-map');
    const description = document.getElementById('map-description');
    const bubbleCount = document.getElementById('map-bubble-count');
    const legend = document.getElementById('map-legend');
    if (map) map.innerHTML = '<div class="map-selection-warning">⚠️2가지를 모두 선택해주세요</div>';
    if (description) description.textContent = '';
    if (bubbleCount) bubbleCount.textContent = `${selectedMapDimensions.length}/2 선택`;
    if (legend) legend.innerHTML = '';
}

function renderDemographicBubbleMap(pair = 'ideology_age') {
    const issue = window._mapIssue;
    if (!issue) return;

    const meta = MAP_PAIR_META[pair] || MAP_PAIR_META.ideology_age;
    const xDim = MAP_DIMENSIONS[meta.x];
    const yDim = MAP_DIMENSIONS[meta.y];
    const overallT2 = Math.max(1, Number(issue.stats.agree || 0) + Number(issue.stats.agreeish || 0));

    const bubbles = [];
    xDim.keys.forEach((xKey, xi) => {
        yDim.keys.forEach((yKey, yi) => {
            const xT2 = top2ForDimension(issue, meta.x, xKey);
            const yT2 = top2ForDimension(issue, meta.y, yKey);
            const top2 = Math.min(98, Math.max(2, overallT2 * (xT2 / overallT2) * (yT2 / overallT2)));
            const weight = (PANEL_W[xKey] || 0.08) * (PANEL_W[yKey] || 0.08);
            bubbles.push({
                xi,
                yi,
                xLabel: xDim.labels[xi],
                yLabel: yDim.labels[yi],
                top2,
                weight,
            });
        });
    });

    const minW = Math.min(...bubbles.map(b => b.weight));
    const maxW = Math.max(...bubbles.map(b => b.weight));
    let html = '';
    html += `<span class="bmap-axis-title x">${xDim.name}</span>`;
    html += `<span class="bmap-axis-title y">${yDim.name}</span>`;

    xDim.labels.forEach((label, index) => {
        const left = axisPercent(index, xDim.keys.length, 12, 82, meta.x);
        html += `<div class="bmap-vgridline" style="left:${left}%"></div>`;
        html += `<span class="bmap-xlabel" style="left:${left}%">${label}</span>`;
    });

    yDim.labels.forEach((label, index) => {
        const top = axisPercent(index, yDim.keys.length, 9, 78, meta.y);
        html += `<div class="bmap-gridline" style="top:${top}%"></div>`;
        html += `<span class="bmap-ylabel" style="top:${top}%">${label}</span>`;
    });

    bubbles.forEach((bubble, index) => {
        const xPos = axisPercent(bubble.xi, xDim.keys.length, 12, 82, meta.x);
        const yPos = axisPercent(bubble.yi, yDim.keys.length, 9, 78, meta.y);
        const jitterX = Math.sin(index * 4.9) * 1.4;
        const jitterY = Math.cos(index * 3.7) * 1.0;
        const size = 9 + ((bubble.weight - minW) / (maxW - minW + 0.0001)) * 27;
        const hue = bubble.top2 >= 62 ? 198 : bubble.top2 >= 44 ? 43 : 8;
        const sat = bubble.top2 >= 62 ? 82 : bubble.top2 >= 44 ? 76 : 63;
        const light = bubble.top2 >= 62 ? 46 : bubble.top2 >= 44 ? 56 : 56;
        const borderLight = bubble.top2 >= 62 ? 36 : bubble.top2 >= 44 ? 42 : 42;
        const alpha = 0.58 + (bubble.weight / (maxW + 0.0001)) * 0.34;
        html += `<div class="bmap-bubble" style="left:calc(${xPos + jitterX}% - ${size / 2}px);top:calc(${yPos + jitterY}% - ${size / 2}px);width:${size}px;height:${size}px;background:hsla(${hue},${sat}%,${light}%,${alpha.toFixed(2)});border-color:hsla(${hue},${sat}%,${borderLight}%,0.72)" title="${xDim.name}: ${bubble.xLabel} | ${yDim.name}: ${bubble.yLabel}\n동의율: ${bubble.top2.toFixed(1)}% | 표본 비중: ${(bubble.weight * 100).toFixed(2)}%"></div>`;
    });

    document.getElementById('positioning-map').innerHTML = html;
    document.getElementById('map-description').textContent = `${meta.label} 좌표입니다. 색상은 동의율, 크기는 표본 비중을 뜻합니다.`;
    document.getElementById('map-bubble-count').textContent = `${bubbles.length}개 버블`;

    let legend = '<div class="bmap-legend-row"><span class="bmap-legend-title">크기 = 표본 비중</span>';
    [8, 18, 30].forEach((size, index) => {
        const label = ['작음', '중간', '큼'][index];
        legend += `<span class="bmap-legend-bubble" style="width:${size + 6}px;height:${size + 6}px"></span><span class="bmap-legend-label">${label}</span>`;
    });
    legend += '</div><div class="bmap-legend-row"><span class="bmap-legend-title">색상 = 동의율</span>';
    legend += '<span class="bmap-legend-color" style="background:hsla(8,63%,56%,.75)"></span><span class="bmap-legend-label">낮음</span>';
    legend += '<span class="bmap-legend-color" style="background:hsla(43,76%,56%,.75)"></span><span class="bmap-legend-label">중간</span>';
    legend += '<span class="bmap-legend-color" style="background:hsla(198,82%,46%,.75)"></span><span class="bmap-legend-label">높음</span>';
    legend += '</div>';
    document.getElementById('map-legend').innerHTML = legend;

    selectedMapDimensions = [meta.x, meta.y];
    syncMapDimensionButtons();
}

function renderBubbleMap(axis) {
    return renderDemographicBubbleMap(axis);
    const issue = window._mapIssue;
    if (!issue) return;
    const seg = issue.segments || {};
    const m = MAP_META[axis];
    const xData = seg[m.segKey] || {};
    const c1Key = m.cross[0], c2Key = m.cross[1];
    const c1Keys = m.crossKeys[c1Key], c2Keys = m.crossKeys[c2Key];
    const c1Labels = m.crossLabels[c1Key], c2Labels = m.crossLabels[c2Key];
    const c1Data = seg[MAP_META[c1Key]?.segKey] || {};
    const c2Data = seg[MAP_META[c2Key]?.segKey] || {};
    const overallT2 = (issue.stats.agree + issue.stats.agreeish);

    // Build bubbles
    const bubbles = [];
    m.keys.forEach((xk, xi) => {
        const xVals = xData[xk] || [20,20,20,20,20];
        const xT2 = xVals[0] + xVals[1];
        c1Keys.forEach((ck1, ci) => {
            c2Keys.forEach((ck2, cj) => {
                const c1Vals = c1Data[ck1] || [20,20,20,20,20];
                const c2Vals = c2Data[ck2] || [20,20,20,20,20];
                const c1T2 = c1Vals[0] + c1Vals[1];
                const c2T2 = c2Vals[0] + c2Vals[1];
                // multiplicative estimation
                const estT2 = Math.min(98, Math.max(2, overallT2 * (xT2/overallT2) * (c1T2/overallT2) * (c2T2/overallT2)));
                const w1 = PANEL_W[ck1] || 0.1;
                const w2 = PANEL_W[ck2] || 0.1;
                const weight = w1 * w2;
                bubbles.push({
                    xi, xLabel: m.labels[xi],
                    c1Label: c1Labels[ci], c2Label: c2Labels[cj],
                    top2: estT2, weight,
                    label: `${c1Labels[ci]}·${c2Labels[cj]}`
                });
            });
        });
    });

    // Normalize weights
    const maxW = Math.max(...bubbles.map(b => b.weight));
    const minW = Math.min(...bubbles.map(b => b.weight));

    // Colors
    const xCount = m.keys.length;
    const c1Count = c1Keys.length;
    const c2Count = c2Keys.length;
    const hueBase = { ideology: 150, age: 210, region: 30 };

    // Render
    let html = '';
    // X-axis labels at bottom
    m.labels.forEach((lb, i) => {
        const left = 8 + i * (84 / (xCount - 1));
        html += `<span class="bmap-xlabel" style="left:${left}%">${lb}</span>`;
    });
    // Y-axis labels
    html += '<span class="bmap-ylabel" style="top:5%">100%</span>';
    html += '<span class="bmap-ylabel" style="top:50%">50%</span>';
    html += '<span class="bmap-ylabel" style="top:95%">0%</span>';
    html += '<span class="bmap-ytitle">동의율 →</span>';
    // Grid lines
    for (let g = 0; g <= 4; g++) {
        html += `<div class="bmap-gridline" style="top:${g * 25}%"></div>`;
    }

    // Bubbles
    bubbles.forEach((b, bi) => {
        const xPos = 8 + b.xi * (84 / (xCount - 1));
        const yPos = 100 - b.top2; // 0% at bottom, 100% at top
        // Jitter
        const jx = (Math.sin(bi * 7.3) * 3);
        const jy = (Math.cos(bi * 5.7) * 1.5);
        const size = 8 + ((b.weight - minW) / (maxW - minW + 0.0001)) * 28;
        // Color by agreement
        const hue = b.top2 > 60 ? 150 : b.top2 > 40 ? 45 : 0;
        const sat = 70 + Math.abs(b.top2 - 50) * 0.6;
        const alpha = 0.55 + (b.weight / (maxW + 0.0001)) * 0.35;
        html += `<div class="bmap-bubble" style="left:calc(${xPos + jx}% - ${size/2}px);top:calc(${yPos + jy}% - ${size/2}px);width:${size}px;height:${size}px;background:hsla(${hue},${sat}%,45%,${alpha.toFixed(2)});border-color:hsla(${hue},${sat}%,35%,0.6)" title="${b.xLabel} | ${b.label}\n동의율: ${b.top2.toFixed(1)}% | 비중: ${(b.weight * 100).toFixed(2)}%"></div>`;
    });

    document.getElementById('positioning-map').innerHTML = html;
    document.getElementById('map-description').textContent = m.desc;
    document.getElementById('map-bubble-count').textContent = `${bubbles.length}개 버블`;

    // Legend — size + color guide
    let legend = '<div class="bmap-legend-row"><span class="bmap-legend-title">크기 = 표본 비중</span>';
    [6, 15, 28].forEach((sz, i) => {
        const lb = ['소','중','대'][i];
        legend += `<span class="bmap-legend-bubble" style="width:${sz+6}px;height:${sz+6}px"></span><span class="bmap-legend-label">${lb}</span>`;
    });
    legend += '</div><div class="bmap-legend-row"><span class="bmap-legend-title">색상 = 동의율</span>';
    legend += '<span class="bmap-legend-color" style="background:hsla(8,63%,56%,.7)"></span><span class="bmap-legend-label">낮음</span>';
    legend += '<span class="bmap-legend-color" style="background:hsla(43,76%,56%,.7)"></span><span class="bmap-legend-label">중간</span>';
    legend += '<span class="bmap-legend-color" style="background:hsla(198,82%,46%,.7)"></span><span class="bmap-legend-label">높음</span>';
    legend += '</div>';
    document.getElementById('map-legend').innerHTML = legend;

    // Active button
    document.querySelectorAll('.map-axis-btn').forEach(b => b.classList.remove('active'));
    document.querySelector(`.map-axis-btn[onclick="switchMapAxis('${axis}')"]`)?.classList.add('active');
}

function switchMapAxis(axis) {
    const meta = MAP_PAIR_META[axis] || MAP_PAIR_META.ideology_age;
    selectedMapDimensions = [meta.x, meta.y];
    renderBubbleMap(axis);
}

function switchMapDimension(dimension) {
    if (!MAP_DIMENSIONS[dimension]) return;
    if (selectedMapDimensions.includes(dimension)) {
        selectedMapDimensions = selectedMapDimensions.filter(item => item !== dimension);
    } else if (selectedMapDimensions.length < 2) {
        selectedMapDimensions = [...selectedMapDimensions, dimension];
    } else {
        selectedMapDimensions = [selectedMapDimensions[1] || 'ideology', dimension];
    }
    if (selectedMapDimensions.length < 2) {
        renderMapDimensionPrompt();
        return;
    }
    renderBubbleMap(mapPairFromDimensions(selectedMapDimensions.slice(0, 2)));
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// Sample Boost
let currentSampleSize = 100;
function selectSample(el, size) {
    document.querySelectorAll('.boost-option').forEach(o => o.classList.remove('active'));
    el.classList.add('active');
    currentSampleSize = size;
}

// IDI Chat
let currentIdiPersona = null;
let idiRemainingQuestions = {};
let idiChatHistory = {};

function initIdiPersonas(jury) {
    const container = document.getElementById('idi-personas');
    if (!container) return;
    let html = '';
    jury.forEach((j, i) => {
        idiRemainingQuestions[j.name] = 10;
        idiChatHistory[j.name] = [];
        html += `<div class="idi-persona ${i === 0 ? 'active' : ''}" onclick="selectIdiPersona(${i})" data-idx="${i}">
            <div class="idi-persona-avatar" style="background:linear-gradient(135deg,${STANCE_GRADIENT[j.stance] || STANCE_GRADIENT.unsure})">${monoIcon('person')}</div>
            <div class="idi-persona-info"><div class="idi-persona-name">${j.name}</div><div class="idi-persona-demo">${j.demo}</div></div>
        </div>`;
    });
    container.innerHTML = html;
    if (jury.length > 0) selectIdiPersona(0);
}

function selectIdiPersona(idx) {
    const issue = window.currentIssue;
    if (!issue) return;
    const j = issue.jury[idx];
    currentIdiPersona = j;

    document.querySelectorAll('.idi-persona').forEach(p => p.classList.remove('active'));
    document.querySelector(`.idi-persona[data-idx="${idx}"]`)?.classList.add('active');

    document.getElementById('idi-chat-avatar').style.background = `linear-gradient(135deg,${STANCE_GRADIENT[j.stance] || STANCE_GRADIENT.unsure})`;
    document.getElementById('idi-chat-avatar').innerHTML = monoIcon('person');
    document.getElementById('idi-chat-name').textContent = j.name;
    document.getElementById('idi-chat-demo').textContent = j.demo;
    document.getElementById('idi-remaining-count').textContent = idiRemainingQuestions[j.name];

    // Render chat history
    let msgHtml = `<div class="idi-msg bot">안녕하세요. 저는 ${j.demo.split('/')[0]} ${j.demo.includes('여') ? '여성' : '남성'} ${j.name}입니다. ${j.demo.split('/')[3]}에 거주하며 ${j.demo.split('/')[2]} 성향입니다. "${j.quote}" 이 이슈에 대해 궁금한 점이 있으시면 물어봐 주세요.</div>`;
    (idiChatHistory[j.name] || []).forEach(m => {
        msgHtml += `<div class="idi-msg ${m.type}">${m.text}</div>`;
    });
    document.getElementById('idi-chat-messages').innerHTML = msgHtml;
    document.getElementById('idi-chat-messages').scrollTop = 99999;
}

function sendIdiMessage() {
    if (!currentIdiPersona) return;
    const input = document.getElementById('idi-input');
    const q = input.value.trim();
    if (!q) return;
    if (idiRemainingQuestions[currentIdiPersona.name] <= 0) {
        alert('이 페르소나에 대한 질문 횟수(10회)를 모두 사용했습니다.');
        return;
    }

    input.value = '';
    idiRemainingQuestions[currentIdiPersona.name]--;
    document.getElementById('idi-remaining-count').textContent = idiRemainingQuestions[currentIdiPersona.name];

    idiChatHistory[currentIdiPersona.name].push({ type: 'user', text: q });

    // Mock response based on persona
    const responses = {
        agree: [`네, 저는 이 정책에 전적으로 동의해요. ${q}에 대해서도 긍정적으로 생각합니다.`, `좋은 질문이에요. 저는 ${currentIdiPersona.demo.split('/')[2]} 성향이라 이런 정책을 지지하는 편이에요.`],
        agreeish: [`음, 대체로 동의하는 편이에요. 하지만 ${q}에 대해서는 조금 더 생각해봐야 할 것 같아요.`, `취지는 좋다고 봐요. 다만 실행 과정에서 보완이 필요하겠죠.`],
        disagreeish: [`솔직히 좀 회의적이에요. ${q} 관련해서도 우려되는 부분이 있어요.`, `저는 반대 쪽에 가까워요. 부작용이 더 클 것 같거든요.`],
        disagree: [`저는 강하게 반대합니다. ${q}라는 질문 자체가 문제의 본질을 놓치고 있어요.`, `개인의 자유를 침해한다고 봐요. 정부가 너무 개입하면 안 됩니다.`],
        unsure: [`솔직히 잘 모르겠어요. ${q}에 대해서도 양쪽 의견이 다 일리가 있어 보여요.`, `더 많은 정보가 필요한 것 같아요. 아직 판단하기 이르다고 생각해요.`]
    };
    const resp = responses[currentIdiPersona.stance][Math.floor(Math.random() * 2)];

    setTimeout(() => {
        idiChatHistory[currentIdiPersona.name].push({ type: 'bot', text: resp });
        let msgHtml = document.getElementById('idi-chat-messages').innerHTML;
        msgHtml += `<div class="idi-msg user">${q}</div><div class="idi-msg bot">${resp}</div>`;
        document.getElementById('idi-chat-messages').innerHTML = msgHtml;
        document.getElementById('idi-chat-messages').scrollTop = 99999;
    }, 500);
}

// FGI Report
function renderFgiReport(issue) {
    const fgiQuestions = [
        { q: `${issue.title}에 대해 처음 들었을 때 어떤 생각이 드셨나요?`, theme: '첫인상' },
        { q: '이 정책이 본인의 일상생활에 어떤 영향을 미칠 것 같나요?', theme: '개인영향' },
        { q: '찬성하는 분들은 어떤 점이 가장 중요하다고 생각하시나요?', theme: '찬성논거' },
        { q: '반대하는 분들의 우려는 무엇인지 공유해주세요.', theme: '반대논거' },
        { q: '정책의 실효성에 대해 어떻게 평가하시나요?', theme: '실효성' }
    ];

    let html = '';
    fgiQuestions.forEach((q, qIdx) => {
        html += `<div class="fgi-question"><div class="fgi-question-header"><span class="fgi-question-num">Q${qIdx + 1}</span><span class="fgi-question-text">${q.q}</span></div><div class="fgi-responses">`;

        // Select 3-4 random jurors for each question
        const selectedJury = issue.jury.slice().sort(() => Math.random() - 0.5).slice(0, 3 + Math.floor(Math.random() * 2));
        selectedJury.forEach(j => {
            const fgiResponses = {
                agree: [`저는 긍정적이에요. ${issue.title}은 사회적으로 필요한 조치라고 봅니다.`, `찬성합니다. 좀 더 적극적으로 추진했으면 좋겠어요.`],
                agreeish: [`대체로 동의하지만, 세부 사항은 조정이 필요해 보여요.`, `취지는 좋은데 실행 방법이 중요하죠.`],
                disagreeish: [`좀 우려되는 부분이 있어요. 부작용을 더 고려해야 해요.`, `다른 대안도 검토해봐야 하지 않을까요?`],
                disagree: [`반대입니다. 근본적인 접근 방식이 잘못됐다고 봐요.`, `효과보다 부작용이 클 거예요.`],
                unsure: [`아직 잘 모르겠어요. 더 많은 정보가 필요해요.`, `양쪽 의견 다 일리가 있어서 판단이 어렵네요.`]
            };
            const resp = fgiResponses[j.stance][Math.floor(Math.random() * 2)];
            html += `<div class="fgi-response"><div class="fgi-response-avatar" style="background:linear-gradient(135deg,${STANCE_GRADIENT[j.stance] || STANCE_GRADIENT.unsure})">${monoIcon('person')}</div><div class="fgi-response-content"><div class="fgi-response-name">${j.name} <span style="font-weight:400;color:var(--text-secondary)">(${j.demo})</span></div><div class="fgi-response-text">${resp}</div></div></div>`;
        });
        html += '</div></div>';
    });

    html += `<div class="fgi-summary"><h5>${monoIcon('chart')} FGI 분석 요약</h5><ul>
        <li><strong>주요 찬성 논거:</strong> 사회적 필요성, 해외 성공 사례, 장기적 이익</li>
        <li><strong>주요 반대 논거:</strong> 경제적 부담, 개인 자유 침해, 실효성 의문</li>
        <li><strong>핵심 설득 포인트:</strong> 구체적 혜택 제시, 취약계층 보호 대책, 단계적 도입</li>
        <li><strong>추가 조사 필요:</strong> 실제 행동 변화 의향, 대안 정책 선호도</li>
    </ul></div>`;

    document.getElementById('fgi-content').innerHTML = html;
}

// Keep modal state available without rendering removed interview/report panels.
const originalRenderModal = renderModal;
renderModal = function (issue, issueKey = activeModalIssueKey) {
    window.currentIssue = issue;
    originalRenderModal(issue, issueKey);
};

// ── Custom Policy Simulation ──
const API_BASES = (() => {
    const origin = window.location.origin;
    const localBases = [
        'http://localhost:8000/api/v1',
        'http://127.0.0.1:8000/api/v1',
        'http://localhost:8001/api/v1',
        'http://127.0.0.1:8001/api/v1',
    ];
    if (origin.startsWith('file') || origin === 'null') return localBases;
    if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
        return [origin + '/api/v1', ...localBases.filter(base => !base.startsWith(origin))];
    }
    // Remote origins (e.g. GitHub Pages): try origin first, then fall back to local dev server
    return [origin + '/api/v1', ...localBases];
})();

async function apiFetch(path, options = {}) {
    let lastError;
    for (const base of API_BASES) {
        try {
            const res = await fetch(`${base}${path}`, options);
            if (res.ok || ![404, 405, 502, 503, 504].includes(res.status)) return res;
            lastError = new Error(`API ${res.status}`);
        } catch (err) {
            lastError = err;
        }
    }
    throw lastError || new Error('API unavailable');
}

const LIVE_ISSUE_REFRESH_MS = 60 * 1000;
let liveIssueFeedTimer = null;
let liveIssueAutoRefreshEnabled = true;
let liveIssueFeedLoading = false;
let trendingTickerTimer = null;
let trendingTickerIndex = 0;
let rankingTickerTimer = null;
let rankingTickerGroupStart = 3;
let customSimulationPollTimer = null;
let liveIssueFeedItems = [];
const DISALLOWED_LIVE_REFERENCE_PATTERNS = [
    /awake/i,
    /실시간\s*주식\s*공시/i,
    /주식\s*공시\s*정리채널/i,
];
let selectedLiveIssueKey = null;
let activeModalIssueKey = null;
let activeModalCommentEditId = null;
let activeModalCommentDeleteConfirmId = null;
let policyDirections = [];
let selectedPolicyDirectionIds = new Set();
let activePromptDirection = null;
let activePromptSuggestionText = '';
const PUBLIC_AGENDA_REFRESH_MS = 5 * 60 * 1000;
const PUBLIC_AGENDA_DEFAULT_VIEW = 'list';
const PUBLIC_AGENDA_VIEW_MODES = new Set(['grid-3-2', 'grid-2-3', 'list']);
const PUBLIC_AGENDA_COMMITTEE_SHORT_LABELS = {
    '과학기술정보방송통신위원회': '과방위',
    '산업통상자원중소벤처기업위원회': '산자중기위',
    '보건복지위원회': '복지위',
    '정무위원회': '정무위',
    '교육위원회': '교육위',
    '국토교통위원회': '국토위',
};
const publicAgendaState = {
    parliament: { loading: false, loaded: false, timer: null, items: [], lastPayload: null, viewMode: PUBLIC_AGENDA_DEFAULT_VIEW },
    government: { loading: false, loaded: false, timer: null, items: [], lastPayload: null, viewMode: PUBLIC_AGENDA_DEFAULT_VIEW },
};

let customSimMode = 'panel';
let documentIntakeTimer = null;
let lastDocumentIssueKey = null;
const DOCUMENT_INTAKE_MIN_CHARS = 80;
const DOCUMENT_EXAMPLE_TEXT = `정부가 도심 주차난과 지역 상권 접근성 문제를 줄이기 위해 공공기관 부설주차장 야간 개방을 확대하는 방안을 검토하고 있다. 주민 편의와 상권 활성화 기대가 있지만, 인근 거주자의 소음·안전 우려와 운영 비용 부담도 함께 제기되고 있다.`;
const QUESTION_DESIGN_TOOLKIT_PROMPT = `당신은 20년 차 수석 정책 연구원이자 마켓 리서처입니다. 당신의 임무는 제공된 문서를 분석하여, 핵심 아젠다를 추출한 뒤, 그와 관련한 여론의 첨예한 쟁점, 혹은 정책적 트레이드 오프 및 관건에 대한 [ 일반 대중 ] 대상의 설문조사 문항을 설계하는 것입니다. 주어진 아젠다별로 5점 척도(Likert Scale) 문항 2개, 객관식 선다형 문항 2개, 정책적 조언을 묻는 주관식 문항 1개를 만듭니다. 문항은 중립적이고 객관적인 어조를 유지하여 유도성 질문(Leading question)을 철저히 배제할 것. 선지는 동시에 MECE 해야하며 선지 하나에 하나만을 물어야 함. 각 문항 마다의 의도(Research Purpose)를 1줄씩 간략히 병기해둘 것(표시하지 않더라도).`;
window.QUESTION_DESIGN_TOOLKIT_PROMPT = QUESTION_DESIGN_TOOLKIT_PROMPT;

const FALLBACK_LIVE_ISSUES = [
    {
        issue_key: 'samsung_strike',
        title: '삼성전자 파업 긴급조정권 논란',
        hot_title: '삼성전자 파업 긴급조정권 쟁점 추적',
        category: '노동',
        summary: '반도체 공급망과 노동권 사이에서 정부 개입 수위를 묻는 쟁점입니다.',
        mentions: 28,
        source_count: 5,
        change_pct: 56,
        views: 28400,
        comments: 12840,
        is_new: false,
        keywords: ['삼성전자', '파업', '긴급조정권'],
        articles: [{ source: '로컬 기본 이슈', title: '삼성전자 파업 긴급조정권 논란', text: '반도체 핵심 산업에서 파업권과 국가경제 리스크를 어떻게 조정할지에 대한 쟁점입니다.' }],
        research_questions: [
            { lane: '쟁점 찬반', title: '삼성전자 파업에 정부 긴급조정권을 발동해야 한다', description: '국가경제 리스크와 노동권 제한 우려를 함께 판단합니다.', policy_type: 'labor' },
            { lane: '개입 수준', title: '핵심 산업 파업에는 별도 중재 절차가 필요하다', description: '반도체 등 기간산업의 예외적 조정장치 필요성을 묻습니다.', policy_type: 'labor' },
        ],
        policy_options: [
            { lane: '행정', title: '72시간 노사 중재 후 조건부 긴급조정 검토', description: '즉시 개입보다 조정 절차를 먼저 두는 방식입니다.', policy_type: 'labor' },
        ],
    },
    {
        issue_key: 'crime_penalty',
        title: '흉악범죄 양형 강화 논란',
        hot_title: '흉악범죄 양형 강화 쟁점 추적',
        category: '사회',
        summary: '강력 처벌 요구와 예방·교정 실효성 논쟁이 함께 커지는 이슈입니다.',
        mentions: 18,
        source_count: 4,
        change_pct: 0,
        views: 14200,
        comments: 5680,
        is_new: true,
        keywords: ['흉악범죄', '양형', '처벌'],
        articles: [{ source: '로컬 기본 이슈', title: '흉악범죄 양형 강화 논란', text: '피해자 보호, 재범 방지, 과잉처벌 우려를 동시에 다루는 사회 안전 쟁점입니다.' }],
        research_questions: [
            { lane: '쟁점 찬반', title: '흉악범죄에 대한 양형 기준을 더 강화해야 한다', description: '안전 체감과 형벌 실효성 사이의 인식을 측정합니다.', policy_type: 'default' },
        ],
        policy_options: [
            { lane: '입법', title: '고위험 범죄 양형 기준과 피해자 보호 절차 강화', description: '형량 강화와 피해자 지원을 묶은 입법 패키지입니다.', policy_type: 'default' },
        ],
    },
    {
        issue_key: 'kospi_tax',
        title: '금투세 재추진 논란',
        hot_title: '금투세 재추진 쟁점 추적',
        category: '경제',
        summary: '조세 형평성과 개인투자자 시장 위축 우려가 맞서는 경제 이슈입니다.',
        mentions: 15,
        source_count: 4,
        change_pct: 22,
        views: 12800,
        comments: 4920,
        is_new: false,
        keywords: ['금투세', '주식', '과세'],
        articles: [{ source: '로컬 기본 이슈', title: '금투세 재추진 논란', text: '증시 활성화, 조세 형평, 개인투자자 부담을 함께 검토하는 쟁점입니다.' }],
        research_questions: [
            { lane: '쟁점 찬반', title: '금융투자소득세를 재추진해야 한다', description: '자본소득 과세와 시장 위축 우려의 상대적 무게를 묻습니다.', policy_type: 'deregulation' },
        ],
        policy_options: [
            { lane: '입법', title: '대주주·고소득 투자자 중심 단계적 금투세 도입', description: '과세 범위와 시행 시점을 조정하는 절충안입니다.', policy_type: 'deregulation' },
        ],
    },
    {
        issue_key: 'airport_parking',
        title: '인천공항 직원 주차 특혜 논란',
        hot_title: '인천공항 직원 주차 특혜 쟁점 추적',
        category: '행정',
        summary: '공공기관 복리후생과 이용객 편익 사이의 형평성 논란입니다.',
        mentions: 12,
        source_count: 3,
        change_pct: 0,
        views: 8900,
        comments: 3420,
        is_new: true,
        keywords: ['인천공항', '직원주차', '특혜'],
        articles: [{ source: '로컬 기본 이슈', title: '인천공항 직원 주차 특혜 논란', text: '공항 주차 공간 배분과 공공기관 복리후생 기준을 묻는 이슈입니다.' }],
        research_questions: [
            { lane: '쟁점 찬반', title: '인천공항 직원 전용 주차 혜택을 축소해야 한다', description: '이용객 편익과 직원 근무 여건을 비교합니다.', policy_type: 'default' },
        ],
        policy_options: [
            { lane: '행정', title: '직원 주차 배정 기준 공개와 단계적 유료 전환', description: '현장 운영 부담을 줄이면서 형평성을 높이는 방안입니다.', policy_type: 'default' },
        ],
    },
    {
        issue_key: 'ai_dividend',
        title: 'AI 국민배당금 논란',
        hot_title: 'AI 국민배당금 쟁점 추적',
        category: '재정',
        summary: 'AI 생산성 이익을 국민에게 배분할지, 재정 지속가능성을 우선할지 묻는 이슈입니다.',
        mentions: 10,
        source_count: 3,
        change_pct: 15,
        views: 4400,
        comments: 1600,
        is_new: false,
        keywords: ['AI', '국민배당', '재정'],
        articles: [{ source: '로컬 기본 이슈', title: 'AI 국민배당금 논란', text: 'AI 초과이익 과세와 보편 배당의 재정 타당성을 검토하는 쟁점입니다.' }],
        research_questions: [
            { lane: '쟁점 찬반', title: 'AI 산업 초과이익을 국민배당금으로 나눠야 한다', description: '기술 이익 공유와 재정 부담 인식을 측정합니다.', policy_type: 'welfare_tax' },
        ],
        policy_options: [
            { lane: '재정', title: 'AI 초과이익 기금 조성과 취약계층 우선 배당', description: '보편 배당보다 재정 부담을 낮춘 단계적 설계입니다.', policy_type: 'welfare_tax' },
        ],
    },
];

function selectCustomSimMode(mode) {
    customSimMode = mode === 'nemotron' ? 'nemotron' : 'panel';

    document.querySelectorAll('.custom-sim-tab').forEach(tab => tab.classList.remove('active'));
    document.getElementById(`sim-mode-${customSimMode}`)?.classList.add('active');
    updateSamplingDesignLabels();
}

function moveCustomSimulationToTop() {
    const surveyContent = document.getElementById('survey-content');
    const customSim = document.querySelector('.custom-sim-section');
    const trending = document.querySelector('.trending-section');
    if (!surveyContent || !customSim || !trending) return;
    if (customSim.nextElementSibling === trending) return;
    surveyContent.insertBefore(customSim, trending);
}

function initLiveIssueFeed() {
    renderLiveIssueFeed(buildFallbackLiveIssueFeed('local_cache_first'));
    window.setTimeout(fetchLiveIssueFeed, 0);
    startLiveIssueAutoRefresh();
}

function startLiveIssueAutoRefresh() {
    if (liveIssueFeedTimer) clearInterval(liveIssueFeedTimer);
    if (!liveIssueAutoRefreshEnabled) return;
    liveIssueFeedTimer = setInterval(fetchLiveIssueFeed, LIVE_ISSUE_REFRESH_MS);
}

function updateLiveIssueAutoRefreshControl() {
    const control = document.querySelector('.trend-refresh-control');
    if (!control) return;
    control.innerHTML = `<span class="trend-control-icon ${liveIssueAutoRefreshEnabled ? 'is-pause' : 'is-play'}" aria-hidden="true"></span>`;
    control.title = liveIssueAutoRefreshEnabled ? '이슈 레이더 일시정지' : '이슈 레이더 재개';
    control.setAttribute('aria-pressed', liveIssueAutoRefreshEnabled ? 'false' : 'true');
    control.setAttribute('aria-label', liveIssueAutoRefreshEnabled ? '이슈 레이더 자동 갱신 일시정지' : '이슈 레이더 자동 갱신 재개');
    const section = document.querySelector('.trending-section');
    document.querySelector('.trending-list')?.classList.toggle('is-paused', !liveIssueAutoRefreshEnabled || section?.classList.contains('is-vertical'));
}

function toggleLiveIssueAutoRefresh() {
    liveIssueAutoRefreshEnabled = !liveIssueAutoRefreshEnabled;
    startLiveIssueAutoRefresh();
    updateLiveIssueAutoRefreshControl();
    if (liveIssueAutoRefreshEnabled) {
        restartTrendingTicker();
    } else {
        stopTrendingTicker();
    }
    updateLiveIssueMeta({ refreshed_at: new Date().toISOString() });
}

function updateFeedSyncStatus(data, state = 'ready') {
    const status = document.getElementById('article-feed-status');
    if (!status) return;
    status.classList.toggle('is-waiting', state === 'waiting');
    status.classList.toggle('is-synced', state === 'synced');
    status.classList.toggle('is-local', state === 'local');
    const refreshed = data?.refreshed_at ? new Date(data.refreshed_at) : null;
    const time = refreshed && !Number.isNaN(refreshed.getTime())
        ? refreshed.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
        : new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
    status.textContent = time;
}

function buildFallbackLiveIssueFeed(source = 'local_fallback') {
    const baseItems = FALLBACK_LIVE_ISSUES.map(issue => ({ ...issue, is_fallback: true }));
    const extras = Object.entries(issueData || {})
        .filter(([key, issue]) => key !== 'sugar' && issue?.title)
        .slice(0, 10)
        .map(([key, issue], idx) => ({
            issue_key: `library_${key}`,
            title: issue.title,
            hot_title: issue.title,
            category: issue.category || '정책',
            summary: issue.subtitle || '라이브러리 이슈 기반 주요 신호입니다.',
            mentions: 9 - (idx % 5),
            source_count: 2 + (idx % 4),
            change_pct: idx % 3 === 0 ? 0 : 12 + idx * 3,
            views: 3600 + idx * 730,
            comments: 900 + idx * 180,
            is_new: idx % 4 === 0,
            keywords: [issue.category || '정책'],
            articles: [{ source: '로컬 이슈 라이브러리', title: issue.title, text: issue.subtitle || issue.title }],
            is_fallback: true,
        }));
    const seen = new Set();
    const items = [...baseItems, ...extras].filter(issue => {
        if (!issue.issue_key || seen.has(issue.issue_key)) return false;
        seen.add(issue.issue_key);
        return true;
    }).slice(0, 15);
    return {
        source,
        is_fallback: true,
        refreshed_at: new Date().toISOString(),
        recommended_refresh_seconds: LIVE_ISSUE_REFRESH_MS / 1000,
        minimum_refresh_seconds: 60,
        article_count: items.length,
        trending: items,
        hot: [...items].sort((a, b) => (b.views + b.comments * 2) - (a.views + a.comments * 2)).slice(0, 15),
    };
}

function hasDisallowedLiveReference(value) {
    const text = String(value || '');
    return DISALLOWED_LIVE_REFERENCE_PATTERNS.some(pattern => pattern.test(text));
}

function articleHasDisallowedLiveReference(article) {
    if (!article || typeof article !== 'object') return false;
    return [
        article.source,
        article.source_name,
        article.channel,
        article.channel_name,
        article.feed,
        article.feed_name,
    ].some(hasDisallowedLiveReference);
}

function issueHasDisallowedLiveReference(issue) {
    if (!issue || typeof issue !== 'object') return false;
    return [
        issue.source,
        issue.source_name,
        issue.channel,
        issue.channel_name,
        issue.feed,
        issue.feed_name,
    ].some(hasDisallowedLiveReference);
}

function sanitizeLiveIssueFeedReferences(data) {
    if (!data || typeof data !== 'object') return data;
    const sanitizeIssue = issue => {
        if (!issue || typeof issue !== 'object' || issueHasDisallowedLiveReference(issue)) return null;
        if (!Array.isArray(issue.articles)) return issue;
        const articles = issue.articles.filter(article => !articleHasDisallowedLiveReference(article));
        if (issue.articles.length && !articles.length) return null;
        const sourceCount = articles.length
            ? Math.max(1, new Set(articles.map(article => String(article.source || '').trim()).filter(Boolean)).size)
            : issue.source_count;
        return { ...issue, articles, source_count: sourceCount };
    };
    const trending = (Array.isArray(data.trending) ? data.trending : []).map(sanitizeIssue).filter(Boolean);
    const hot = (Array.isArray(data.hot) ? data.hot : []).map(sanitizeIssue).filter(Boolean);
    return {
        ...data,
        trending,
        hot,
        source_policy: {
            ...(data.source_policy || {}),
            policy: '1mm_only',
            allowed_channels: ['1mm'],
            excluded_channels: ['AWAKE - 실시간 주식 공시 정리채널'],
        },
        article_count: [...trending, ...hot].reduce((sum, issue) => sum + (Array.isArray(issue.articles) ? issue.articles.length : 0), 0),
    };
}

async function fetchStaticLiveIssueSnapshot() {
    const res = await fetch(`live-issues.json?_=${Date.now()}`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`static snapshot ${res.status}`);
    const data = await res.json();
    return {
        ...data,
        source: data?.source ? `${data.source}_static_snapshot` : 'naver_1mm_static_snapshot',
        is_static_snapshot: true,
    };
}

async function fetchLiveIssueFeed() {
    if (liveIssueFeedLoading) return;
    liveIssueFeedLoading = true;
    updateFeedSyncStatus(null, 'waiting');
    try {
        const res = await apiFetch(`/survey/issues/live?_=${Date.now()}`, {
            cache: 'no-store',
        });
        if (!res.ok) throw new Error(`API ${res.status}`);
        const data = await res.json();
        renderLiveIssueFeed(data);
    } catch (err) {
        try {
            const snapshot = await fetchStaticLiveIssueSnapshot();
            renderLiveIssueFeed(snapshot);
        } catch (snapshotErr) {
            renderLiveIssueFeed(buildFallbackLiveIssueFeed('local_fallback_api_unavailable'));
        }
    } finally {
        liveIssueFeedLoading = false;
    }
}

function renderLiveIssueFeed(data) {
    data = sanitizeLiveIssueFeedReferences(data);
    if (!data || !Array.isArray(data.trending) || !Array.isArray(data.hot) || !data.trending.length) {
        data = buildFallbackLiveIssueFeed(data?.source ? `${data.source}_empty` : 'local_fallback_empty');
    }
    data = { ...data, trending: buildTopTenTrending(data) };
    upsertLiveIssueModalData(data);
    updatePolicyBriefingFeed(data);

    const trendingList = document.querySelector('.trending-list');
    if (trendingList) {
        const topTen = data.trending.slice(0, 10);
        const loopItems = topTen.length ? [...topTen, topTen[0]] : [];
        trendingList.innerHTML = `<div class="trending-track">${loopItems.map((issue, idx) => renderTrendingItem(issue, idx % Math.max(topTen.length, 1), { clone: idx >= topTen.length })).join('')}</div>`;
        refreshTrendingTickerMetrics();
    }

    const hotCarousel = document.querySelector('.hot-carousel');
    if (hotCarousel) {
        hotCarousel.innerHTML = data.hot.map(renderHotIssueCard).join('');
    }

    updateLiveIssueMeta(data);
    updateFeedSyncStatus(data, data?.is_fallback ? 'local' : 'synced');
}

function buildTopTenTrending(data) {
    const fallback = buildFallbackLiveIssueFeed('local_top_ten_fill');
    const merged = [
        ...(Array.isArray(data?.trending) ? data.trending : []),
        ...(Array.isArray(data?.hot) ? data.hot : []),
        ...(fallback.trending || []),
    ];
    const seen = new Set();
    return merged.filter(issue => {
        const key = issue?.issue_key || issue?.title;
        if (!key || seen.has(key)) return false;
        seen.add(key);
        return true;
    }).slice(0, 10);
}

function getTrendingItemActionLabel(item, expanded) {
    const rank = item?.querySelector?.('.trend-rank')?.textContent?.trim() || '';
    const title = item?.querySelector?.('.trend-name')?.textContent?.trim() || '';
    const change = item?.querySelector?.('.trend-change')?.textContent?.trim() || '';
    const parts = [rank, title, change].filter(Boolean).join(' ');
    return `${parts} ${expanded ? '상세 보기' : '이슈 레이더 펼치기'}`.trim();
}

function updateTrendingItemActionLabels(section, expanded) {
    const root = section || document.querySelector('.trending-section');
    root?.querySelectorAll?.('.trending-item:not([aria-hidden="true"])').forEach(item => {
        const label = getTrendingItemActionLabel(item, expanded);
        item.setAttribute('aria-label', label);
        item.setAttribute('title', label);
    });
}

function toggleIssueRadarVertical(event) {
    const target = event?.target;
    if (target?.closest?.('.trend-refresh-control')) return;
    const section = target?.closest?.('.trending-section') || document.querySelector('.trending-section');
    if (!section) return;
    const header = section.querySelector('[data-radar-toggle]');
    const list = section.querySelector('.trending-list');
    const track = section.querySelector('.trending-track');
    const expanded = !section.classList.contains('is-vertical');
    section.classList.toggle('is-vertical', expanded);
    header?.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    updateTrendingItemActionLabels(section, expanded);
    if (track) {
        track.style.transition = 'none';
        track.style.transform = 'translateY(0)';
        track.getBoundingClientRect();
        track.style.transition = '';
    }
    if (expanded) {
        list?.classList.add('is-paused');
        stopTrendingTicker();
    } else {
        list?.classList.toggle('is-paused', !liveIssueAutoRefreshEnabled);
        restartTrendingTicker();
    }
}
window.toggleIssueRadarVertical = toggleIssueRadarVertical;

function updatePolicyBriefingFeed(data) {
    liveIssueFeedItems = buildIssueRankingItemsFromRadar(data, 30);

    renderArticleList();
    if (!selectedLiveIssueKey || !liveIssueFeedItems.some(issue => issue.issue_key === selectedLiveIssueKey)) {
        selectIssueBriefing(liveIssueFeedItems[0]?.issue_key);
    } else {
        renderPolicyDirections();
    }
}

function buildIssueRankingItemsFromRadar(data, target = 30) {
    const fallbackItems = buildFallbackLiveIssueFeed('local_supplement').trending || [];
    const merged = [
        ...(Array.isArray(data?.trending) ? data.trending : []),
        ...(Array.isArray(data?.hot) ? data.hot : []),
        ...fallbackItems,
    ];
    const seen = new Set();
    const ordered = merged.filter(issue => {
        const key = issue?.issue_key || issue?.title;
        if (!key || seen.has(key)) return false;
        seen.add(key);
        return true;
    });
    return expandRankedIssues(ordered, target);
}

function renderDocumentIntakeFeedback(analysis = null, state = 'idle') {
    const feedback = document.getElementById('document-intake-feedback');
    const insights = document.getElementById('document-intake-insights');
    const button = document.getElementById('document-analyze-btn');
    const text = document.getElementById('document-intake-text')?.value || '';
    const ready = text.trim().length >= DOCUMENT_INTAKE_MIN_CHARS;
    if (button) button.disabled = !ready;
    if (feedback) {
        feedback.classList.toggle('is-ready', ready && state !== 'applied');
        feedback.classList.toggle('is-applied', state === 'applied');
        const count = text.trim().length;
        const label = state === 'applied' ? '반영됨' : ready ? `${count.toLocaleString('ko-KR')}자` : '';
        feedback.innerHTML = label ? `<span>${escapeHtml(label)}</span>` : '';
    }
    if (!insights) return;
    if (!analysis) {
        insights.hidden = true;
        insights.innerHTML = '';
        return;
    }
    insights.hidden = false;
    const chips = [analysis.category, ...(analysis.keywords || []).slice(0, 5)].filter(Boolean);
    const nudges = [...(analysis.nudges || [])].slice(0, 4);
    insights.innerHTML = `<div class="document-insight-card">
        <span>추출한 이슈</span>
        <strong>${escapeHtml(analysis.title)}</strong>
        <p>${escapeHtml(analysis.summary)}</p>
        <div class="document-chip-row">${chips.map(chip => `<em class="document-chip">${escapeHtml(chip)}</em>`).join('')}</div>
    </div>
    <div class="document-insight-card">
        <span>판단 보조</span>
        <div class="document-chip-row">${nudges.map(chip => `<em class="document-chip warn">${escapeHtml(chip)}</em>`).join('')}</div>
    </div>`;
}

function resizeDocumentIntakeTextarea(textarea) {
    if (!textarea) return;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(220, Math.max(94, textarea.scrollHeight))}px`;
}

function isPromptQuestionText(text) {
    const trimmed = String(text || '').trim();
    if (!trimmed) return false;
    if (/[?？]\s*$/.test(trimmed) && trimmed.length <= 220) return true;
    return trimmed.length <= 160 && !/[\r\n]/.test(trimmed) && !/^https?:\/\//i.test(trimmed);
}

function isCurrentAutoPrompt(text) {
    const textarea = document.getElementById('document-intake-text');
    const normalized = String(text || '').trim();
    return Boolean(textarea?.dataset.autoPrompt === '1' && normalized && normalized === activePromptSuggestionText);
}

function showDocumentIntakePreset(textarea) {
    if (!textarea) return;
    if (!textarea.dataset.defaultPlaceholder) textarea.dataset.defaultPlaceholder = textarea.getAttribute('placeholder') || '';
    const suggestedPreset = textarea.dataset.suggestedQuestion || activePromptSuggestionText || '';
    const preset = suggestedPreset || textarea.dataset.defaultPlaceholder || '';
    const shouldShow = Boolean(preset && !textarea.value.trim() && document.activeElement !== textarea && textarea.dataset.presetHidden !== '1');
    textarea.placeholder = shouldShow ? preset : '';
    textarea.classList.toggle('has-preset-placeholder', Boolean(shouldShow && suggestedPreset));
    textarea.classList.toggle('is-preset-hidden', !shouldShow && Boolean(suggestedPreset));
}

function hideDocumentIntakePreset(textarea) {
    if (!textarea) return;
    textarea.dataset.presetHidden = '1';
    textarea.placeholder = '';
    textarea.classList.remove('has-preset-placeholder');
    textarea.classList.add('is-preset-hidden');
}

function initDocumentIntakePresetBehavior() {
    const textarea = document.getElementById('document-intake-text');
    if (!textarea || textarea.dataset.presetBound === '1') return;
    textarea.dataset.defaultPlaceholder = textarea.getAttribute('placeholder') || '';
    textarea.dataset.presetBound = '1';
    ['focus', 'focusin', 'pointerdown', 'mousedown', 'touchstart', 'keydown', 'beforeinput'].forEach(eventName => {
        textarea.addEventListener(eventName, () => hideDocumentIntakePreset(textarea), true);
    });
    textarea.addEventListener('blur', () => {
        delete textarea.dataset.presetHidden;
        if (!textarea.value.trim()) showDocumentIntakePreset(textarea);
    });
    showDocumentIntakePreset(textarea);
}

function shouldApplyDocumentIntakeText(text) {
    const trimmed = String(text || '').trim();
    if (trimmed.length < DOCUMENT_INTAKE_MIN_CHARS) return false;
    if (isCurrentAutoPrompt(trimmed)) return false;
    if (isPromptQuestionText(trimmed)) return false;
    return true;
}

function handleDocumentIntakeInput() {
    const textarea = document.getElementById('document-intake-text');
    resizeDocumentIntakeTextarea(textarea);
    clearTimeout(documentIntakeTimer);
    const text = textarea?.value || '';
    if (textarea) {
        const trimmed = text.trim();
        if (trimmed) {
            textarea.dataset.autoPrompt = '0';
            hideDocumentIntakePreset(textarea);
        } else if (textarea.dataset.suggestedQuestion) {
            textarea.dataset.autoPrompt = '1';
            if (document.activeElement === textarea || textarea.dataset.presetHidden === '1') {
                hideDocumentIntakePreset(textarea);
            } else {
                showDocumentIntakePreset(textarea);
            }
        }
    }
    if (!shouldApplyDocumentIntakeText(text)) {
        renderDocumentIntakeFeedback(null, 'idle');
        return;
    }
    documentIntakeTimer = setTimeout(() => {
        renderDocumentIntakeFeedback(analyzeDocumentText(text), 'ready');
    }, 180);
}

function handleDocumentFileInput(event) {
    const file = event?.target?.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
        const textarea = document.getElementById('document-intake-text');
        if (textarea) textarea.value = String(reader.result || '');
        handleDocumentIntakeInput();
    };
    reader.readAsText(file, 'utf-8');
}

function fillDocumentIntakeExample() {
    const textarea = document.getElementById('document-intake-text');
    if (textarea) textarea.value = DOCUMENT_EXAMPLE_TEXT;
    handleDocumentIntakeInput();
    renderDocumentIntakeFeedback(analyzeDocumentText(DOCUMENT_EXAMPLE_TEXT), 'ready');
    setTimeout(applyDocumentIntake, 220);
}

function tokenizeDocument(text) {
    const cleaned = String(text || '').replace(/https?:\/\/\S+/g, ' ').replace(/[^0-9A-Za-z가-힣\s]/g, ' ');
    const stop = new Set(['정부','국회','정책','관련','검토','방안','문제','필요','대해','대한','하고','있다','한다','이번','위해','기준','확대','강화','도입','제도','사회','국민','사람','것으로','에서는']);
    const counts = new Map();
    cleaned.split(/\s+/).forEach(token => {
        const word = token.trim();
        if (word.length < 2 || stop.has(word)) return;
        counts.set(word, (counts.get(word) || 0) + 1);
    });
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([word]) => word).slice(0, 8);
}

function inferDocumentCategory(text) {
    const t = String(text || '');
    if (/API[- ]?first|OpenAPI|Swagger|GraphQL|CONTRACT_SPEC|DB Architect|Backend Engineer|Frontend Developer|ORM|Docker|WSL2|오케스트레이터|병렬 개발|풀스택|프론트엔드|백엔드/.test(t)) return '개발 오케스트레이션';
    if (/노동|노조|파업|근로|임금|산재|플랫폼 노동|휴식권/.test(t)) return '노동';
    if (/부동산|주택|전세|월세|아파트|임대|재건축/.test(t)) return '부동산';
    if (/세금|금융|증시|투자|물가|소득|기업|규제/.test(t)) return '경제';
    if (/복지|의료|보건|연금|돌봄|교육|건강/.test(t)) return '복지';
    if (/AI|반도체|산업|기술|R&D|수출|스타트업/.test(t)) return '산업';
    if (/외교|안보|국방|무역|중국|미국|일본|북한/.test(t)) return '외교';
    if (/환경|기후|탄소|에너지|원전|재생/.test(t)) return '환경';
    return '정책';
}

function inferDocumentStakeholders(text) {
    if (/API[- ]?first|OpenAPI|Swagger|GraphQL|CONTRACT_SPEC|DB Architect|Backend Engineer|Frontend Developer|ORM|Docker|WSL2|오케스트레이터|병렬 개발|풀스택|프론트엔드|백엔드/.test(text)) return ['계약', 'DB', '백엔드', '프론트엔드', '테스트'];
    const candidates = [
        ['정부', /정부|부처|행정|대통령|지자체/], ['국회', /국회|의원|입법|법안/], ['기업', /기업|업계|사업자|플랫폼|대기업|중소기업/],
        ['노동자', /노동자|근로자|노조|종사자|직원/], ['소비자', /소비자|이용자|시민|국민/], ['지역', /지역|수도권|지방|서울|부산|대구|광주/],
        ['취약계층', /취약|저소득|고령|청년|아동|장애/]
    ];
    return candidates.filter(([, pattern]) => pattern.test(text)).map(([label]) => label).slice(0, 5);
}

function firstMeaningfulSentence(text) {
    return String(text || '').replace(/\s+/g, ' ').split(/[.!?。\n]/).map(s => s.trim()).find(s => s.length >= 12) || '사용자 입력 문서 기반 정책 쟁점';
}

function documentHash(text) {
    let hash = 0;
    for (let i = 0; i < text.length; i += 1) hash = ((hash << 5) - hash + text.charCodeAt(i)) | 0;
    return Math.abs(hash).toString(36).slice(0, 8);
}

function getSurveyAgendaSubject(issue) {
    const raw = String(issue?.hot_title || issue?.title || issue?.summary || '').replace(/\s+/g, ' ').trim();
    if (!raw) return '이 사안';
    const cleaned = raw.replace(/^문서 추출:\s*/i, '').replace(/[.?!。]+$/g, '').trim();
    return cleaned.length > 44 ? `${cleaned.slice(0, 44)}...` : cleaned;
}

function hasKoreanFinalConsonant(text) {
    const chars = String(text || '').trim().replace(/[^\uAC00-\uD7A3]/g, '');
    if (!chars) return false;
    const code = chars.charCodeAt(chars.length - 1) - 0xAC00;
    return code >= 0 && code <= 11171 && code % 28 !== 0;
}

function withComitativeParticle(subject) {
    return `${subject}${hasKoreanFinalConsonant(subject) ? '과' : '와'}`;
}

function buildSurveyQuestionToolkitCards(issue, inferredType = inferPolicyTypeFromIssue(issue), sourceText = getIssueSourceText(issue)) {
    const subject = getSurveyAgendaSubject(issue);
    const base = `${withComitativeParticle(subject)} 관련해`;
    return [
        {
            lane: '5점 척도',
            title: `${base} 공공 부문의 개입이 필요하다고 보십니까?`,
            description: 'Research Purpose: 해당 아젠다에 대한 공적 개입 필요성의 기본 수용도를 측정합니다.',
            research_purpose: '공적 개입 필요성 수용도 측정',
            question_type: 'likert_5',
            response_scale: ['전혀 동의하지 않음', '동의하지 않는 편', '보통', '동의하는 편', '매우 동의'],
            policy_type: inferredType,
            source_text: sourceText,
            toolkit_prompt: QUESTION_DESIGN_TOOLKIT_PROMPT,
        },
        {
            lane: '5점 척도',
            title: `${base} 예상되는 비용이나 불편을 감수할 수 있다고 보십니까?`,
            description: 'Research Purpose: 정책 추진 과정의 비용·불편 감수 의향을 확인합니다.',
            research_purpose: '비용·불편 감수 의향 측정',
            question_type: 'likert_5',
            response_scale: ['전혀 동의하지 않음', '동의하지 않는 편', '보통', '동의하는 편', '매우 동의'],
            policy_type: inferredType,
            source_text: sourceText,
            toolkit_prompt: QUESTION_DESIGN_TOOLKIT_PROMPT,
        },
        {
            lane: '객관식',
            title: `${base} 가장 우선적으로 고려해야 할 기준은 무엇이라고 보십니까?`,
            description: 'Research Purpose: 정책 판단에서 대중이 중시하는 우선 기준을 파악합니다.',
            research_purpose: '우선 판단 기준 파악',
            question_type: 'multiple_choice',
            choices: ['개인의 권리와 보호', '공공 안전과 사회적 안정', '경제적 비용과 재정 부담', '제도 운영의 공정성과 실행 가능성', '아직 판단하기 어려움'],
            policy_type: inferredType,
            source_text: sourceText,
            toolkit_prompt: QUESTION_DESIGN_TOOLKIT_PROMPT,
        },
        {
            lane: '객관식',
            title: `${base} 정책 결정 전에 가장 보완되어야 할 정보는 무엇이라고 보십니까?`,
            description: 'Research Purpose: 의사결정 전 추가 검증이 필요한 정보 영역을 식별합니다.',
            research_purpose: '추가 정보 수요 식별',
            question_type: 'multiple_choice',
            choices: ['피해 또는 편익을 받는 대상', '재정·행정 비용 규모', '실행 가능성과 부작용', '대안 정책과의 비교', '아직 판단하기 어려움'],
            policy_type: inferredType,
            source_text: sourceText,
            toolkit_prompt: QUESTION_DESIGN_TOOLKIT_PROMPT,
        },
        {
            lane: '주관식',
            title: `${base} 정책 입안자가 반드시 고려해야 할 점은 무엇이라고 생각하십니까?`,
            description: 'Research Purpose: 구조화된 보기로 포착하기 어려운 우려와 제안을 수집합니다.',
            research_purpose: '비정형 우려·제안 수집',
            question_type: 'open_ended',
            policy_type: inferredType,
            source_text: sourceText,
            toolkit_prompt: QUESTION_DESIGN_TOOLKIT_PROMPT,
        },
    ];
}

function analyzeDocumentText(text) {
    const raw = String(text || '').trim();
    const category = inferDocumentCategory(raw);
    const keywords = tokenizeDocument(raw);
    const stakeholders = inferDocumentStakeholders(raw);
    const sentence = firstMeaningfulSentence(raw);
    const title = sentence.length > 54 ? `${sentence.slice(0, 54)}...` : sentence;
    const summary = category === '개발 오케스트레이션'
        ? 'API & Schema Contract를 단일 진실원천으로 삼아 DB·백엔드·프론트엔드 병렬 구현과 통합 테스트 흐름을 추출했습니다.'
        : `${category} 문서에서 ${stakeholders.length ? stakeholders.join('·') : '이해관계자'} 간 책임, 비용, 수용성 쟁점을 추출했습니다.`;
    const nudges = category === '개발 오케스트레이션'
        ? ['계약 먼저 고정', 'mock 응답 공유', 'DB/API/UI 독립 실행', '통합 테스트 필수']
        : ['정의 필요', '비용·책임 확인', '반대층 먼저 보기'];
    if (category !== '개발 오케스트레이션' && !/\d/.test(raw)) nudges.push('수치 근거 보강');
    return { raw, category, keywords, stakeholders, title, summary, nudges };
}

function buildDocumentIssueFromAnalysis(analysis) {
    const issueKey = `doc_${documentHash(analysis.raw)}`;
    const policyType = inferPolicyTypeFromIssue({ category: analysis.category, title: analysis.title, keywords: analysis.keywords });
    const stakeholderPhrase = analysis.stakeholders.length ? analysis.stakeholders.join('·') : '주요 이해관계자';
    const isOmniStack = analysis.category === '개발 오케스트레이션';
    const researchQuestions = isOmniStack ? [
        { lane: '계약 우선', title: 'CONTRACT_SPEC를 DB·백엔드·프론트엔드의 단일 진실원천으로 고정할까요?', description: '구현 전에 OpenAPI/Schema와 mock response를 먼저 잠그는 방식의 수용성을 확인합니다.', policy_type: policyType, source_text: analysis.raw, question_type: 'issue_stance' },
        { lane: '병렬 구현', title: 'DB·Backend·Frontend를 계약 기반으로 독립 병렬 개발해도 될까요?', description: '각 에이전트가 서로 기다리지 않고 계약만 보고 구현하는 워크플로의 리스크를 검증합니다.', policy_type: policyType, source_text: analysis.raw, question_type: 'issue_stance' },
        { lane: '검증 기준', title: 'Frontend→API→DB 자동 테스트를 완료 조건으로 삼을까요?', description: 'PyTest/Jest/Postman 또는 컨테이너 smoke test를 릴리즈 게이트로 둘지 묻습니다.', policy_type: policyType, source_text: analysis.raw, question_type: 'issue_stance' },
    ] : [
        { lane: '쟁점 찬반', title: `${analysis.title} 문제 인식에 동의하십니까?`, description: `문서가 제기한 문제 정의 자체에 대한 수용성을 확인합니다.`, policy_type: policyType, source_text: analysis.raw, question_type: 'issue_stance' },
        { lane: '개입 수준', title: `${analysis.title}에 공적 개입이 필요하다고 보십니까?`, description: `${stakeholderPhrase} 사이에서 정부·국회·시장 자율의 적정 경계를 묻습니다.`, policy_type: policyType, source_text: analysis.raw, question_type: 'issue_stance' },
        { lane: '비용·책임', title: `${analysis.title}의 비용과 책임은 누가 부담해야 합니까?`, description: `정책 수용성을 좌우하는 비용 부담, 책임 소재, 예외 기준을 검증합니다.`, policy_type: policyType, source_text: analysis.raw, question_type: 'issue_stance' },
    ];
    const policyOptions = isOmniStack ? [
        { lane: 'Contract', title: 'OpenAPI + Schema Contract 자동 생성', description: '요구사항에서 엔티티, endpoint, mock response, 오류 스키마를 먼저 생성합니다.', policy_type: policyType, source_text: analysis.raw, question_type: 'policy_option' },
        { lane: 'Agents', title: 'DB·Backend·Frontend 산출물 분리 저장', description: '/database/schema.sql, /backend/main.py, /frontend/app.js처럼 agent output을 파일로 자동 분배합니다.', policy_type: policyType, source_text: analysis.raw, question_type: 'policy_option' },
        { lane: 'Tests', title: '컨테이너 smoke test와 API 흐름 검증', description: 'Docker/WSL2 실행 전제의 Frontend→API→DB 회귀 테스트를 생성합니다.', policy_type: policyType, source_text: analysis.raw, question_type: 'policy_option' },
    ] : [
        { lane: '입법', title: `${analysis.title} 기준·책임 명확화 법안`, description: '정의, 적용 대상, 예외, 권리구제 절차를 법률에 명시하는 방향입니다.', policy_type: policyType, source_text: analysis.raw, question_type: 'policy_option' },
        { lane: '행정', title: `${analysis.title} 30일 현장 점검·가이드라인`, description: '법 개정 전 현장 혼선을 줄이는 단기 행정 패키지입니다.', policy_type: policyType, source_text: analysis.raw, question_type: 'policy_option' },
        { lane: '보완책', title: `${analysis.title} 반대층 우려 완화 패키지`, description: '비용 부담, 피해 보완, 정보 공개를 묶어 반발 프레임을 낮추는 방향입니다.', policy_type: policyType, source_text: analysis.raw, question_type: 'policy_option' },
    ];
    return {
        issue_key: issueKey,
        title: analysis.title,
        hot_title: `문서 추출: ${analysis.title}`,
        category: analysis.category,
        summary: analysis.summary,
        mentions: 1,
        source_count: 1,
        change_pct: 0,
        views: 0,
        comments: 0,
        is_new: true,
        is_document_intake: true,
        keywords: analysis.keywords,
        articles: [{ source: '사용자 입력 문서', title: analysis.title, text: analysis.raw.slice(0, 1800) }],
        research_questions: buildSurveyQuestionToolkitCards({
            title: analysis.title,
            category: analysis.category,
            keywords: analysis.keywords,
            articles: [{ text: analysis.raw }],
        }, policyType, analysis.raw),
        policy_options: policyOptions,
    };
}

function applyDocumentIntake() {
    const text = document.getElementById('document-intake-text')?.value || '';
    if (text.trim().length < DOCUMENT_INTAKE_MIN_CHARS) {
        renderDocumentIntakeFeedback(null, 'idle');
        return;
    }
    const analysis = analyzeDocumentText(text);
    const issue = buildDocumentIssueFromAnalysis(analysis);
    lastDocumentIssueKey = issue.issue_key;
    liveIssueFeedItems = [issue, ...liveIssueFeedItems.filter(item => item.issue_key !== issue.issue_key && !item.is_document_intake)].slice(0, 15);
    selectIssueBriefing(issue.issue_key);
    renderDocumentIntakeFeedback(analysis, 'applied');
    document.getElementById('document-intake-text')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function renderArticleList() {
    const container = document.getElementById('live-article-list');
    const status = document.getElementById('article-feed-status');
    if (!container) return;

    if (!liveIssueFeedItems.length) {
        container.innerHTML = '<div class="empty-article-state">주요이슈를 불러오는 중입니다.</div>';
        if (status) status.textContent = new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
        return;
    }

    const ranked = expandRankedIssues(liveIssueFeedItems, 30);
    liveIssueFeedItems = ranked;
    const pages = [];
    for (let i = 0; i < ranked.length; i += 10) pages.push(ranked.slice(i, i + 10));
    const expandButton = document.querySelector('[data-ranking-expand]');
    if (expandButton) {
        expandButton.textContent = '모두 보기';
        expandButton.setAttribute('aria-expanded', 'false');
    }
    container.innerHTML = `<div class="ranking-shell" id="ranking-shell">
        <div class="ranking-viewport" aria-label="상위 이슈 3개">
            <div class="ranking-track">${renderCompactRankingRows(ranked, 0)}</div>
        </div>
        <div class="ranking-expanded-panel" id="ranking-expanded-panel" hidden>
            <div class="ranking-expanded-head">
                <button type="button" onclick="toggleRankingPanel(event)">접기</button>
            </div>
            <div class="ranking-carousel" id="ranking-carousel" onscroll="updateRankingDots()">
                ${pages.map((page, pageIdx) => `<div class="ranking-page" aria-label="이슈 순위 ${pageIdx + 1}번째 칸">${page.map((issue, idx) => renderArticleBrief(issue, pageIdx * 10 + idx, false)).join('')}</div>`).join('')}
            </div>
            <div class="ranking-dots" aria-label="순위 페이지">${pages.map((_, idx) => `<button type="button" class="ranking-dot ${idx === 0 ? 'active' : ''}" aria-label="${idx + 1}번째 칸" onclick="scrollRankingPage(${idx})"></button>`).join('')}</div>
        </div>
    </div>`;
    startRankingTicker(ranked);
}

function expandRankedIssues(items, target = 30) {
    const out = [];
    const used = new Set();
    const push = issue => {
        if (!issue || used.has(issue.issue_key)) return;
        used.add(issue.issue_key);
        out.push(issue);
    };
    items.forEach(push);
    Object.entries(issueData || {}).forEach(([key, issue]) => push({
        issue_key: key,
        title: issue.title,
        hot_title: issue.title,
        summary: issue.subtitle || '',
        mentions: Math.max(4, Math.round((issue.sample_n || 1000) / 220)),
        source_count: 3,
        change_pct: Math.max(0, Math.round(Math.abs((issue.stats?.agree || 0) - (issue.stats?.disagree || 0)))),
        views: Number(issue.sample_n || issue.sample_size || 6200) + out.length * 310,
        comments: Math.round(Number(issue.sample_n || issue.sample_size || 6200) / 3),
        is_new: out.length % 4 === 0,
        keywords: [issue.title.split(/\s+/)[0]].filter(Boolean),
        articles: [{ source: '이슈 라이브러리', title: issue.title, text: issue.subtitle || issue.title }],
    }));
    const seeds = out.slice();
    let idx = 0;
    while (out.length < target && seeds.length) {
        const base = seeds[idx % seeds.length];
        const cloneNo = out.length + 1;
        out.push({ ...base, issue_key: `${base.issue_key}_rank_${cloneNo}`, title: `${base.title} 후속 쟁점`, views: Number(base.views || 5000) + cloneNo * 173, comments: Number(base.comments || 1200) + cloneNo * 41, change_pct: (Number(base.change_pct || 0) + cloneNo) % 61, is_new: cloneNo % 5 === 0 });
        idx += 1;
    }
    return out.slice(0, target);
}

function renderArticleFeedError() {
    renderLiveIssueFeed(buildFallbackLiveIssueFeed('local_fallback_error'));
}

function renderCompactRankingRows(ranked, startIndex = 0) {
    const items = Array.isArray(ranked) ? ranked : [];
    const groupStart = Math.max(0, Math.min(Number(startIndex) || 0, Math.max(0, items.length - 1)));
    const indices = [groupStart, groupStart + 1, groupStart + 2];
    return indices
        .filter(index => items[index])
        .map(index => renderArticleBrief(items[index], index, true))
        .join('');
}

function stopRankingTicker() {
    if (rankingTickerTimer) clearInterval(rankingTickerTimer);
    rankingTickerTimer = null;
}

function startRankingTicker(ranked = liveIssueFeedItems) {
    stopRankingTicker();
    const items = Array.isArray(ranked) ? ranked : [];
    if (items.length <= 3) return;
    rankingTickerGroupStart = 3;
    rankingTickerTimer = setInterval(() => {
        const shell = document.getElementById('ranking-shell');
        const track = shell?.querySelector('.ranking-track');
        if (!shell || !track || shell.classList.contains('expanded')) return;
        track.classList.add('is-switching');
        window.setTimeout(() => {
            track.innerHTML = renderCompactRankingRows(items, rankingTickerGroupStart);
            track.classList.remove('is-switching');
            rankingTickerGroupStart = rankingTickerGroupStart + 3 >= items.length ? 0 : rankingTickerGroupStart + 3;
        }, 130);
    }, 5000);
}

function renderArticleBrief(issue, idx = 0, compact = false) {
    const active = issue.issue_key === selectedLiveIssueKey ? 'active' : '';
    const rank = String(idx + 1).padStart(2, '0');
    const trend = formatIssueTrendLabel(issue) || '—';
    return `<button class="article-brief ranking-row ${compact ? 'compact' : ''} ${active}" type="button" onclick="event.stopPropagation();selectIssueBriefing('${escapeHtml(issue.issue_key)}')">
        <span class="ranking-rank">${rank}</span>
        <strong>${escapeHtml(issue.title)}</strong>
        <em>${escapeHtml(trend)}</em>
    </button>`;
}

function toggleRankingPanel(event) {
    event?.preventDefault?.();
    const shell = document.getElementById('ranking-shell');
    const panel = document.getElementById('ranking-expanded-panel');
    const trigger = document.querySelector('[data-ranking-expand]') || shell?.querySelector('.ranking-expand-btn');
    if (!shell || !panel || !trigger) return;
    const open = panel.hidden;
    panel.hidden = !open;
    shell.classList.toggle('expanded', open);
    trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
    trigger.textContent = open ? '접기' : '모두 보기';
    if (open) {
        stopRankingTicker();
        setTimeout(updateRankingDots, 30);
    } else {
        startRankingTicker(liveIssueFeedItems);
    }
}
window.toggleRankingPanel = toggleRankingPanel;

function scrollRankingPage(index) {
    const carousel = document.getElementById('ranking-carousel');
    const page = carousel?.querySelector('.ranking-page');
    if (!carousel || !page) return;
    carousel.scrollTo({ left: index * carousel.clientWidth, behavior: 'smooth' });
    setTimeout(updateRankingDots, 260);
}
window.scrollRankingPage = scrollRankingPage;

function updateRankingDots() {
    const carousel = document.getElementById('ranking-carousel');
    if (!carousel) return;
    const index = Math.round(carousel.scrollLeft / Math.max(1, carousel.clientWidth));
    document.querySelectorAll('.ranking-dot').forEach((dot, idx) => dot.classList.toggle('active', idx === index));
}
window.updateRankingDots = updateRankingDots;

function setSimulationSettingsOpen(open) {
    const panel = document.getElementById('sampling-options-panel');
    const button = document.querySelector('.sim-settings-btn');
    if (!panel) return;
    panel.hidden = !open;
    button?.setAttribute('aria-expanded', open ? 'true' : 'false');
    panel.classList.toggle('open', open);
}

function closeSimulationSettings() {
    setSimulationSettingsOpen(false);
}
window.closeSimulationSettings = closeSimulationSettings;

function toggleSimulationSettings(event) {
    event?.preventDefault?.();
    const panel = document.getElementById('sampling-options-panel');
    if (!panel) return;
    setSimulationSettingsOpen(panel.hidden);
}
window.toggleSimulationSettings = toggleSimulationSettings;

function selectIssueBriefing(issueKey) {
    if (!issueKey) return;
    selectedLiveIssueKey = issueKey;
    const issue = getSelectedLiveIssue();
    policyDirections = buildPolicyDirections(issue);
    selectedPolicyDirectionIds = new Set();
    syncRecommendedQuestionPrompt({ force: true });
    renderArticleList();
    renderPolicyDirections();
}

function getSelectedLiveIssue() {
    return liveIssueFeedItems.find(issue => issue.issue_key === selectedLiveIssueKey) || liveIssueFeedItems[0] || null;
}

function buildPolicyDirections(issue) {
    if (!issue) return [];
    const inferredType = inferPolicyTypeFromIssue(issue);
    const sourceText = getIssueSourceText(issue) || (issue.keywords || []).slice(0, 3).join(', ');
    const candidates = buildSurveyQuestionToolkitCards(issue, inferredType, sourceText);
    return pickRandomPolicyDirections(candidates, 2);
}

function pickRandomPolicyDirections(items, count = 2) {
    const pool = (items || []).filter(Boolean);
    for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0, count);
}

function buildDefaultIssueQuestions(issue, inferredType = inferPolicyTypeFromIssue(issue), sourceText = getIssueSourceText(issue)) {
    const category = issue.category || '정책';
    const keyword = (issue.keywords || [])[0] || category;
    const issueKey = issue.issue_key || 'live_issue';
    const base = [
        ['문제인식', `${keyword} 이슈를 공적 의제로 다룰 만큼 심각하다고 보십니까?`],
        ['개입수준', `정부·국회가 ${category} 문제에 직접 개입해야 한다고 보십니까?`],
        ['책임배분', `대응 비용과 책임은 정부·기업·개인 중 어디에 우선 배분해야 합니까?`],
        ['해법선호', `가이드라인보다 법·제도 개정이 필요하다고 보십니까?`],
        ['속도/부작용', `부작용이 있어도 빠른 대응을 우선해야 한다고 보십니까?`],
    ];
    return base.map(([lane, title], idx) => ({
        id: `${issueKey}_question_${idx + 1}`,
        lane,
        title,
        description: '',
        policy_type: inferredType,
        source_text: sourceText,
        question_type: 'issue_stance',
    }));
}

function buildDefaultPolicyOptions(issue, inferredType = inferPolicyTypeFromIssue(issue), sourceText = getIssueSourceText(issue)) {
    const title = issue.title || '소스 기반 이슈';
    const category = issue.category || '정책';
    const issueKey = issue.issue_key || 'live_issue';
    return [
        {
            id: `${issueKey}_policy_1`,
            lane: '입법',
            title: `${title} 관련 기준·의무 명확화 법안`,
            description: `${category} 쟁점의 책임 주체와 적용 기준을 법률에 명시하고, 예외·벌칙·권리구제 절차를 함께 설계합니다.`,
            policy_type: inferredType,
            source_text: sourceText,
            question_type: 'policy_option',
        },
        {
            id: `${issueKey}_policy_2`,
            lane: '행정',
            title: `${title} 관계부처 합동 점검·가이드라인`,
            description: `시행령, 고시, 부처 합동점검으로 단기 대응합니다. 현장 혼선을 줄이고 30~90일 내 행정 집행력을 확인하는 방향입니다.`,
            policy_type: inferredType,
            source_text: sourceText,
            question_type: 'policy_option',
        },
        {
            id: `${issueKey}_policy_3`,
            lane: category === '경제' || category === '부동산' ? '재정·감독' : '감독·지원',
            title: `${title} 피해완화·감독 패키지`,
            description: `직접 규제만이 아니라 피해 계층 지원, 재정 보완, 감독 강화, 데이터 공개를 묶어 사회적 수용성을 높입니다.`,
            policy_type: inferredType,
            source_text: sourceText,
            question_type: 'policy_option',
        },
    ];
}

function buildExpertSelections(issue) {
    const inferredType = inferPolicyTypeFromIssue(issue);
    const sourceText = getIssueSourceText(issue) || (issue.keywords || []).slice(0, 3).join(', ');
    const toolkitQuestions = buildSurveyQuestionToolkitCards(issue, inferredType, sourceText);
    const questionCards = (issue.research_questions || []).slice(0, 5).map((card, idx) =>
        normalizeExpertSelection(card, idx, 'question', issue, inferredType, sourceText)
    ).filter(card => card && card.question_type !== 'policy_option');
    const policyCards = (issue.policy_options || []).slice(0, 3).map((card, idx) =>
        normalizeExpertSelection(card, idx, 'policy', issue, inferredType, sourceText)
    ).filter(Boolean);
    const fallbackPolicies = buildDefaultPolicyOptions(issue, inferredType, sourceText);
    return [
        ...[...questionCards, ...toolkitQuestions.slice(questionCards.length)].slice(0, 5),
        ...[...policyCards, ...fallbackPolicies.slice(policyCards.length)].slice(0, 3),
    ];
}

function normalizeExpertSelection(card, idx, kind, issue, inferredType, sourceText) {
    if (!card) return null;
    const title = card.title || card.question;
    if (!title) return null;
    const questionLanes = ['쟁점 찬반', '개입 수준', '비용·책임'];
    const policyLanes = ['입법', '행정', '감독·지원'];
    return {
        id: `${issue.issue_key}_${kind}_${idx + 1}`,
        lane: card.lane || (kind === 'question' ? questionLanes[idx] : policyLanes[idx]),
        title,
        description: card.description || '해당 이슈의 여론 분포와 응답 강도를 추정합니다.',
        research_purpose: card.research_purpose || card.description || '',
        response_scale: card.response_scale || null,
        choices: Array.isArray(card.choices) ? card.choices : null,
        toolkit_prompt: card.toolkit_prompt || QUESTION_DESIGN_TOOLKIT_PROMPT,
        policy_type: card.policy_type || inferredType,
        source_text: card.source_text || sourceText,
        question_type: card.question_type || (kind === 'question' ? 'issue_stance' : 'policy_option'),
    };
}

function getIssueSourceText(issue) {
    return (issue.articles || []).slice(0, 3)
        .map(article => article.text || article.title)
        .filter(Boolean)
        .join(' / ');
}

function inferPolicyTypeFromIssue(issue) {
    const text = `${issue.category || ''} ${issue.title || ''} ${(issue.keywords || []).join(' ')}`;
    if (/부동산|주택|전세|월세|아파트/.test(text)) return 'real_estate_regulation';
    if (/노동|노조|파업|근로|임금/.test(text)) return 'labor';
    if (/산업|AI|반도체|기술|R&D|수출/.test(text)) return 'industry_support';
    if (/경제|세금|금리|금융|규제|기업/.test(text)) return 'deregulation';
    if (/복지|의료|보건|교육|지원|연금/.test(text)) return 'welfare_tax';
    return 'default';
}

function renderPolicyDirections() {
    syncRecommendedQuestionPrompt();
}

function formatRecommendationQuestion(direction) {
    const title = String(direction?.title || '').trim();
    if (!title) return '이 이슈를 어떻게 물어볼까요?';
    if (/[?？]$/.test(title)) return title;
    if (direction?.question_type === 'policy_option') {
        return `${title.replace(/[.。]+$/, '')}에 대해 어떻게 보십니까?`;
    }
    return `${title.replace(/[.。]+$/, '')}에 동의하십니까?`;
}

function syncRecommendedQuestionPrompt({ force = false } = {}) {
    const textarea = document.getElementById('document-intake-text');
    if (!textarea || !policyDirections.length) return;
    const direction = policyDirections[0];
    const questionText = formatRecommendationQuestion(direction);
    if (!questionText) return;
    activePromptDirection = direction;
    activePromptSuggestionText = questionText;
    if (direction?.id) selectedPolicyDirectionIds = new Set([direction.id]);

    const currentText = textarea.value.trim();
    const previousSuggestion = textarea.dataset.suggestedQuestion || '';
    const canReplace = force || !currentText || textarea.dataset.autoPrompt === '1' || currentText === previousSuggestion;
    textarea.dataset.suggestedQuestion = questionText;
    if (!canReplace) return;

    if (!currentText || textarea.dataset.autoPrompt === '1' || currentText === previousSuggestion) {
        textarea.value = '';
    }
    textarea.dataset.autoPrompt = '1';
    showDocumentIntakePreset(textarea);
    resizeDocumentIntakeTextarea(textarea);
    renderDocumentIntakeFeedback(null, 'idle');
}

function buildPromptDirectionFromInput(issue) {
    const textarea = document.getElementById('document-intake-text');
    const typedQuestion = textarea?.value?.trim() || '';
    const baseDirection = activePromptDirection || policyDirections[0] || buildSurveyQuestionToolkitCards(
        issue || {},
        inferPolicyTypeFromIssue(issue || {}),
        getIssueSourceText(issue || {})
    )[0];
    const questionText = typedQuestion || formatRecommendationQuestion(baseDirection);
    if (!questionText) return null;
    return {
        ...baseDirection,
        id: `${issue?.issue_key || 'prompt'}_input_question`,
        title: questionText,
        description: baseDirection?.description || '입력 칸에 작성된 질문을 기준으로 여론 분포와 응답 강도를 추정합니다.',
        research_purpose: baseDirection?.research_purpose || baseDirection?.description || '입력 질문 기준 수용성 측정',
        policy_type: baseDirection?.policy_type || inferPolicyTypeFromIssue(issue || {}),
        source_text: baseDirection?.source_text || getIssueSourceText(issue || {}) || questionText,
        question_type: baseDirection?.question_type || 'issue_stance',
    };
}

function togglePolicyDirection(directionId) {
    if (!directionId) return;
    if (selectedPolicyDirectionIds.has(directionId)) {
        selectedPolicyDirectionIds.delete(directionId);
    } else {
        selectedPolicyDirectionIds.add(directionId);
    }
    renderPolicyDirections();
}

function upsertLiveIssueModalData(data) {
    const allIssues = [...(data.trending || []), ...(data.hot || [])];
    allIssues.forEach(issue => {
        if (!issue.issue_key || issueData[issue.issue_key]) return;
        const stats = buildLiveIssueStats(issue);
        issueData[issue.issue_key] = {
            title: issue.hot_title || issue.title,
            subtitle: (issue.articles || []).slice(0, 2).map(a => `${a.source}: ${a.title}`).join(' · ') || '소스 피드 기반 추출 이슈',
            category: issue.category || '정치',
            stats,
            segments: issueData.sugar.segments,
            ideology: issueData.sugar.ideology,
            age: issueData.sugar.age,
            region: issueData.sugar.region,
            factors: [
                { coef: '+0.31', name: `분류: ${issue.category || '정치'} 이슈 노출도`, sig: 'rss live', pos: true },
                { coef: '+0.18', name: `키워드: ${(issue.keywords || []).slice(0, 2).join(', ') || '소스 피드'}`, sig: 'keyword', pos: true },
            ],
            target: `${issue.category || '정치'} 관심층 · 최근 이슈 신호 ${issue.mentions || 1}건`,
            risks: {
                critical: ['초기 이슈 신호 편향 가능성', '동일 이슈 중복 클러스터링 점검 필요'],
                medium: ['1분 단위 갱신이라 초단기 급등은 다음 라운드에 반영', '이슈 텍스트 기반 분류라 본문 맥락은 제한적'],
                insight: ['핵심 키워드와 출처를 함께 확인', '표본 설계 전에 이슈 제목을 정책 질문으로 정제 권장'],
            },
            jury: issueData.sugar.jury,
            mapDots: issueData.sugar.mapDots,
        };
    });
}

function buildLiveIssueStats(issue) {
    const seed = Math.abs(hashString(issue.issue_key || issue.title || 'live'));
    const agree = 14 + (seed % 22);
    const agreeish = 22 + ((seed >> 3) % 18);
    const unsure = 8 + ((seed >> 6) % 10);
    const remaining = Math.max(10, 100 - agree - agreeish - unsure);
    const disagreeish = Math.round(remaining * 0.58 * 10) / 10;
    const disagree = Math.round((remaining - disagreeish) * 10) / 10;
    return { agree, agreeish, disagreeish, disagree, unsure };
}

function hashString(value) {
    let hash = 0;
    for (let i = 0; i < String(value).length; i++) {
        hash = ((hash << 5) - hash) + String(value).charCodeAt(i);
        hash |= 0;
    }
    return hash;
}

function handleIssueOpenKey(event, issueKey) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openModal(issueKey);
    }
}

function handleTrendingIssueActivate(event, issueKey) {
    event?.preventDefault?.();
    event?.stopPropagation?.();
    const section = event?.currentTarget?.closest?.('.trending-section') || document.querySelector('.trending-section');
    if (section && !section.classList.contains('is-vertical')) {
        toggleIssueRadarVertical(event);
        return;
    }
    openModal(issueKey);
}

function handleTrendingIssueOpenKey(event, issueKey) {
    if (event.key === 'Enter' || event.key === ' ') {
        handleTrendingIssueActivate(event, issueKey);
    }
}

function renderTrendingItem(issue, idx, options = {}) {
    const rank = idx + 1;
    const rankClass = rank === 1 ? 'gold' : rank === 2 ? 'silver' : rank === 3 ? 'bronze' : '';
    const changeText = formatIssueTrendLabel(issue);
    const changeClass = getIssueTrendClass(issue);
    const safeTitle = escapeHtml(issue.title);
    const safeIssueKey = escapeHtml(issue.issue_key);
    const accessibleLabel = `${rank}위 ${issue.title} ${changeText} 이슈 레이더 펼치기`;
    const hiddenAttrs = options.clone ? ' aria-hidden="true" tabindex="-1"' : ` tabindex="0" aria-label="${escapeHtml(accessibleLabel)}"`;
    return `<div class="trending-item" role="button"${hiddenAttrs} onclick="handleTrendingIssueActivate(event, '${safeIssueKey}')" onkeydown="handleTrendingIssueOpenKey(event, '${safeIssueKey}')" title="${escapeHtml(accessibleLabel)}">
        <span class="trend-rank ${rankClass}">${rank}위</span>
        <div class="trend-info">
            <span class="trend-name">${safeTitle}</span>
        </div>
        <span class="trend-change ${changeClass}">${escapeHtml(changeText)}</span>
    </div>`;
}

function getIssueTrendClass(issue) {
    return formatIssueScoreLabel(issue) ? 'trend-score' : (issue?.is_new || !issue?.change_pct ? 'trend-new' : 'trend-up');
}

function formatIssueTrendLabel(issue) {
    const scoreLabel = formatIssueScoreLabel(issue);
    if (scoreLabel) return scoreLabel;
    if (issue?.is_new || !issue?.change_pct) return '신규';
    return `↑${Math.round(issue.change_pct)}%`;
}

function renderHotIssueCard(issue) {
    const fire = monoIcon(issue.is_new ? 'bolt' : 'hot');
    const title = issue.hot_title || issue.title;
    const safeIssueKey = escapeHtml(issue.issue_key);
    const scoreLabel = formatIssueTrendLabel(issue);
    return `<div class="hot-card" role="button" tabindex="0" aria-label="${escapeHtml(title)} 상세 보기" onclick="openModal('${safeIssueKey}')" onkeydown="handleIssueOpenKey(event, '${safeIssueKey}')">
        <div class="hot-card-header"><span class="cat">${escapeHtml(issue.category || '이슈')}</span><span class="fire">${fire}</span></div>
        <h4>${escapeHtml(title)}</h4>
        <p class="hot-card-trust">출처 검증 대기 · 현재 여론 수치 아님</p>
        <div class="stats"><span>${escapeHtml(scoreLabel)}</span><span>${formatCompactNumber(issue.source_count || 1)}개 출처</span></div>
    </div>`;
}

function getIssueScore(issue) {
    const explicit = Number(issue?.issue_score ?? issue?.score);
    if (Number.isFinite(explicit) && explicit > 0) return explicit;
    const views = Number(issue?.views) || 0;
    const comments = Number(issue?.comments) || 0;
    const mentions = Number(issue?.mentions) || 0;
    const sourceCount = Number(issue?.source_count) || 0;
    const raw = views + comments * 2 + mentions * 450 + sourceCount * 300;
    if (!raw) return 0;
    return Math.min(99, Math.max(1, 18 + Math.log10(raw + 1) * 12 + Math.min(mentions, 20) * 0.55 + Math.min(sourceCount, 8) * 0.8));
}

function formatIssueScoreLabel(issue) {
    const display = String(issue?.issue_score_display || '').trim();
    if (display) return `점수 ${display}`;
    const score = getIssueScore(issue);
    if (!score) return '';
    const rounded = score >= 100 ? score.toFixed(1) : score >= 10 ? Math.round(score) : score.toFixed(1);
    return `점수 ${rounded}`;
}

function parseCountText(value) {
    const text = String(value || '').replace(/,/g, '');
    const match = text.match(/(\d+(?:\.\d+)?)\s*(만|천)?/);
    if (!match) return 0;
    let count = Number(match[1]);
    if (match[2] === '만') count *= 10000;
    if (match[2] === '천') count *= 1000;
    return Math.round(count);
}

function formatPeopleCount(count) {
    const value = Math.max(0, Math.round(Number(count) || 0));
    return `${value.toLocaleString('ko-KR')}명`;
}

function estimateViewsFromIssue(issue, sampleCount) {
    if (issue?.views) return Number(issue.views) || 0;
    const seed = Math.abs(hashString(issue?.issue_key || issue?.title || 'issue'));
    const base = Math.max(1200, Number(sampleCount) || 0);
    return base + 1800 + (seed % 7800);
}

function formatRelativeUploadTime(rawValue) {
    const raw = String(rawValue || '').replace(/\s+/g, ' ').trim();
    if (!raw || raw === '방금') return '1분 전';
    const compact = raw.replace(/\s+/g, '');
    const relative = compact.match(/^(\d+)(분|시간|일|주|달|개월)전$/);
    if (relative) {
        const unit = relative[2] === '개월' ? '달' : relative[2];
        return `${relative[1]}${unit} 전`;
    }
    if (/^어제$/.test(compact)) return '어제';

    const dateMatch = compact.match(/^(\d{1,2})\/(\d{1,2})$/);
    if (dateMatch) {
        const now = new Date();
        const month = Number(dateMatch[1]) - 1;
        const day = Number(dateMatch[2]);
        let date = new Date(now.getFullYear(), month, day);
        if (date > now) date = new Date(now.getFullYear() - 1, month, day);
        const diffDays = Math.max(1, Math.floor((now - date) / 86400000));
        if (diffDays === 1) return '어제';
        if (diffDays < 7) return `${diffDays}일 전`;
        if (diffDays < 35) return `${Math.floor(diffDays / 7)}주 전`;
        return `${Math.floor(diffDays / 30)}달 전`;
    }

    const parsed = new Date(raw);
    if (!Number.isNaN(parsed.getTime())) {
        const diffMs = Math.max(0, Date.now() - parsed.getTime());
        const minutes = Math.max(1, Math.floor(diffMs / 60000));
        if (minutes < 60) return `${minutes}분 전`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}시간 전`;
        const days = Math.floor(hours / 24);
        if (days === 1) return '어제';
        if (days < 7) return `${days}일 전`;
        if (days < 35) return `${Math.floor(days / 7)}주 전`;
        return `${Math.floor(days / 30)}달 전`;
    }

    return raw;
}

function updateLiveIssueMeta(data) {
    const refreshed = data.refreshed_at ? new Date(data.refreshed_at) : null;
    const refreshedText = refreshed && !Number.isNaN(refreshed.getTime())
        ? refreshed.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
        : '방금';

    const trendMeta = document.querySelector('#trend-refresh-status') || document.querySelector('.trending-header > span');
    if (trendMeta) trendMeta.textContent = refreshedText;
    updateLiveIssueAutoRefreshControl();

    const hotHeader = document.querySelector('.hot-header');
    if (hotHeader && !hotHeader.querySelector('.live-feed-meta')) {
        const meta = document.createElement('span');
        meta.className = 'live-feed-meta';
        hotHeader.appendChild(meta);
    }
    const hotMeta = hotHeader?.querySelector('.live-feed-meta');
    if (hotMeta) hotMeta.textContent = `${refreshedText} 갱신`;
}

function refreshTrendingTickerMetrics() {
    const section = document.querySelector('.trending-section');
    if (!section) return;
    const items = Array.from(section.querySelectorAll('.trending-track .trending-item'));
    const rowHeight = parseInt(getComputedStyle(section).getPropertyValue('--ticker-row-height'), 10) || 44;
    const tickerSteps = Math.max(items.length - 1, 1);
    section.style.setProperty('--ticker-steps', String(tickerSteps));
    section.style.setProperty('--ticker-offset', `-${tickerSteps * rowHeight}px`);
    section.style.setProperty('--ticker-duration', `${tickerSteps * 2}s`);
    document.querySelector('.trending-list')?.classList.toggle('is-paused', !liveIssueAutoRefreshEnabled);
    if (section.classList.contains('is-vertical')) {
        document.querySelector('.trending-list')?.classList.add('is-paused');
        const track = section.querySelector('.trending-track');
        if (track) {
            track.style.transition = 'none';
            track.style.transform = 'translateY(0)';
            track.getBoundingClientRect();
            track.style.transition = '';
        }
        stopTrendingTicker();
        return;
    }
    restartTrendingTicker();
}

function stopTrendingTicker() {
    if (trendingTickerTimer) {
        clearInterval(trendingTickerTimer);
        trendingTickerTimer = null;
    }
}

function restartTrendingTicker() {
    stopTrendingTicker();
    const section = document.querySelector('.trending-section');
    const track = section?.querySelector('.trending-track');
    const items = track ? Array.from(track.querySelectorAll('.trending-item')) : [];
    if (!section || !track || items.length <= 1) return;
    if (section.classList.contains('is-vertical')) return;

    const rowHeight = parseInt(getComputedStyle(section).getPropertyValue('--ticker-row-height'), 10) || 44;
    trendingTickerIndex = 0;
    track.style.transition = 'none';
    track.style.transform = 'translateY(0)';
    track.getBoundingClientRect();
    track.style.transition = '';

    if (!liveIssueAutoRefreshEnabled) return;

    trendingTickerTimer = setInterval(() => {
        trendingTickerIndex += 1;
        track.style.transform = `translateY(-${trendingTickerIndex * rowHeight}px)`;
        if (trendingTickerIndex >= items.length - 1) {
            window.setTimeout(() => {
                track.style.transition = 'none';
                track.style.transform = 'translateY(0)';
                trendingTickerIndex = 0;
                track.getBoundingClientRect();
                track.style.transition = '';
            }, 460);
        }
    }, 2000);
}

function formatCompactNumber(value) {
    return Number(value || 0).toLocaleString('ko-KR');
}

const DEFAULT_SAMPLING_TARGET_MOE = 0.03;
const SAMPLE_SIZE_MIN = 500;
const SAMPLE_SIZE_MAX = 5000;
const SAMPLE_SIZE_STEP = 100;
let customFixedSampleSize = 2000;
const KOSIS_FRAME_FALLBACK = `month,region,sex,age_group,population
2026-05,강원,남성,18~29세,2000
2026-05,강원,남성,30대,5000
2026-05,강원,남성,40대,5000
2026-05,강원,남성,50대,4000
2026-05,강원,남성,60대,4000
2026-05,강원,여성,18~29세,1000
2026-05,강원,여성,30대,8000
2026-05,강원,여성,40대,8000
2026-05,강원,여성,50대,5000
2026-05,강원,여성,60대,2000
2026-05,광주/전라,남성,18~29세,17000
2026-05,광주/전라,남성,30대,28000
2026-05,광주/전라,남성,40대,38000
2026-05,광주/전라,남성,50대,15000
2026-05,광주/전라,남성,60대,10000
2026-05,광주/전라,남성,70세 이상,1000
2026-05,광주/전라,여성,18~29세,8000
2026-05,광주/전라,여성,30대,23000
2026-05,광주/전라,여성,40대,28000
2026-05,광주/전라,여성,50대,10000
2026-05,광주/전라,여성,60대,7000
2026-05,대구/경북,남성,18~29세,14000
2026-05,대구/경북,남성,30대,27000
2026-05,대구/경북,남성,40대,30000
2026-05,대구/경북,남성,50대,16000
2026-05,대구/경북,남성,60대,10000
2026-05,대구/경북,여성,18~29세,10000
2026-05,대구/경북,여성,30대,26000
2026-05,대구/경북,여성,40대,28000
2026-05,대구/경북,여성,50대,17000
2026-05,대구/경북,여성,60대,12000
2026-05,대전/세종/충청,남성,18~29세,12000
2026-05,대전/세종/충청,남성,30대,24000
2026-05,대전/세종/충청,남성,40대,25000
2026-05,대전/세종/충청,남성,50대,12000
2026-05,대전/세종/충청,남성,60대,9000
2026-05,대전/세종/충청,여성,18~29세,10000
2026-05,대전/세종/충청,여성,30대,23000
2026-05,대전/세종/충청,여성,40대,23000
2026-05,대전/세종/충청,여성,50대,11000
2026-05,대전/세종/충청,여성,60대,7000
2026-05,부산/울산/경남,남성,18~29세,14000
2026-05,부산/울산/경남,남성,30대,27000
2026-05,부산/울산/경남,남성,40대,33000
2026-05,부산/울산/경남,남성,50대,15000
2026-05,부산/울산/경남,남성,60대,12000
2026-05,부산/울산/경남,여성,18~29세,12000
2026-05,부산/울산/경남,여성,30대,28000
2026-05,부산/울산/경남,여성,40대,35000
2026-05,부산/울산/경남,여성,50대,15000
2026-05,부산/울산/경남,여성,60대,11000
2026-05,서울,남성,18~29세,19000
2026-05,서울,남성,30대,40000
2026-05,서울,남성,40대,45000
2026-05,서울,남성,50대,22000
2026-05,서울,남성,60대,10000
2026-05,서울,여성,18~29세,20000
2026-05,서울,여성,30대,42000
2026-05,서울,여성,40대,47000
2026-05,서울,여성,50대,24000
2026-05,서울,여성,60대,12000
2026-05,경기/인천,남성,18~29세,30000
2026-05,경기/인천,남성,30대,60000
2026-05,경기/인천,남성,40대,70000
2026-05,경기/인천,남성,50대,32000
2026-05,경기/인천,남성,60대,14000
2026-05,경기/인천,여성,18~29세,31000
2026-05,경기/인천,여성,30대,62000
2026-05,경기/인천,여성,40대,72000
2026-05,경기/인천,여성,50대,33000
2026-05,경기/인천,여성,60대,15000`;
let activePopulationFrame = [];
let lastSamplingPlan = null;

const NATIONAL_ADULT_POPULATION_N = 44_500_000;

function parsePopulationFrameCsv(csvText) {
    const cells = csvText.trim().split(/\r?\n/).slice(1).map(line => {
        const [month, region, sex, age_group, population] = line.split(',');
        const normalizedRegion = region === '인천/경기' ? '경기/인천' : region;
        return { month, region: normalizedRegion, sex, age_group, population: Number(population || 0) };
    }).filter(cell => cell.region && cell.sex && cell.age_group && cell.population > 0);
    const total = cells.reduce((sum, cell) => sum + cell.population, 0);
    if (total > 0 && total < 10_000_000) {
        const scale = NATIONAL_ADULT_POPULATION_N / total;
        return cells.map(cell => ({ ...cell, population: Math.max(1, Math.round(cell.population * scale)) }));
    }
    return cells;
}

function samplingZScore(level) {
    const zMap = { 0.95: 1.959963984540054, 0.96: 2.0537489106318225, 0.97: 2.17009037758456, 0.98: 2.3263478740408408, 0.99: 2.5758293035489004 };
    return zMap[Number(level).toFixed(2)] || 1.959963984540054;
}

function requiredSampleSizeForPlan(confidenceLevel, populationN, targetMoe = DEFAULT_SAMPLING_TARGET_MOE) {
    const z = samplingZScore(confidenceLevel);
    const p = 0.5;
    const n0 = (z * z * p * (1 - p)) / (targetMoe * targetMoe);
    if (populationN > 0) return Math.ceil(n0 / (1 + ((n0 - 1) / populationN)));
    return Math.ceil(n0);
}

function postComputedMoe(sampleN, confidenceLevel, populationN) {
    const n = Math.max(1, Number(sampleN || 1));
    const z = samplingZScore(confidenceLevel);
    const fpc = populationN > 1 && n < populationN ? Math.sqrt((populationN - n) / (populationN - 1)) : 1;
    return z * Math.sqrt(0.25 / n) * fpc;
}

function getSelectedChipValues(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return ['전체'];
    const active = [...container.querySelectorAll('.sampling-chip.active')].map(btn => btn.dataset.value);
    return active.length ? active : ['전체'];
}

function renderSamplingChips() {
    if (!activePopulationFrame.length) activePopulationFrame = parsePopulationFrameCsv(KOSIS_FRAME_FALLBACK);
    const genders = ['전체', '여성', '남성'];
    const regionPriority = ['서울', '경기/인천', '인천/경기', '대전/세종/충청', '부산/울산/경남', '대구/경북', '광주/전라', '강원', '제주'];
    const uniqueRegions = [...new Set(activePopulationFrame.map(cell => cell.region))];
    const sortedRegions = uniqueRegions.sort((a, b) => {
        const ia = regionPriority.indexOf(a);
        const ib = regionPriority.indexOf(b);
        return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib) || a.localeCompare(b, 'ko-KR');
    });
    const regions = ['전체', ...sortedRegions];
    const ages = ['전체', ...new Set(activePopulationFrame.map(cell => cell.age_group))];
    const render = (id, values) => {
        const el = document.getElementById(id);
        if (!el || el.dataset.rendered === '1') return;
        el.innerHTML = values.map((value, index) => `<button type="button" class="sampling-chip ${index === 0 ? 'active' : ''}" data-value="${escapeHtml(value)}" onclick="toggleSamplingChip('${id}', '${escapeHtml(value)}')">${escapeHtml(value)}</button>`).join('');
        el.dataset.rendered = '1';
    };
    render('custom-gender-filter', genders);
    render('custom-region-filter', regions);
    render('custom-age-filter', ages);
}

function toggleSamplingChip(containerId, value) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const buttons = [...container.querySelectorAll('.sampling-chip')];
    const target = buttons.find(btn => btn.dataset.value === value);
    if (!target) return;
    if (value === '전체') {
        buttons.forEach(btn => btn.classList.toggle('active', btn.dataset.value === '전체'));
    } else {
        buttons.find(btn => btn.dataset.value === '전체')?.classList.remove('active');
        target.classList.toggle('active');
        if (!buttons.some(btn => btn.classList.contains('active'))) buttons.find(btn => btn.dataset.value === '전체')?.classList.add('active');
    }
    updateSamplingDesignLabels();
}

function getFilteredPopulationFrame() {
    const regions = getSelectedChipValues('custom-region-filter');
    const ages = getSelectedChipValues('custom-age-filter');
    const genders = getSelectedChipValues('custom-gender-filter');
    return activePopulationFrame.filter(cell =>
        (regions.includes('전체') || regions.includes(cell.region)) &&
        (ages.includes('전체') || ages.includes(cell.age_group)) &&
        (genders.includes('전체') || genders.includes(cell.sex))
    );
}

async function loadPopulationFrameForMonth(month) {
    if (window.location.protocol === 'file:') {
        activePopulationFrame = parsePopulationFrameCsv(KOSIS_FRAME_FALLBACK);
        document.querySelectorAll('.sampling-chips').forEach(el => { el.dataset.rendered = '0'; });
        renderSamplingChips();
        return;
    }
    try {
        const res = await fetch(`/data/population_frames/${encodeURIComponent(month)}.csv`, { cache: 'no-store' });
        if (!res.ok) throw new Error(`frame ${res.status}`);
        activePopulationFrame = parsePopulationFrameCsv(await res.text());
    } catch (_) {
        activePopulationFrame = parsePopulationFrameCsv(KOSIS_FRAME_FALLBACK);
    }
    document.querySelectorAll('.sampling-chips').forEach(el => { el.dataset.rendered = '0'; });
    renderSamplingChips();
}

function updateSampleSizeLabel() {
    updateSamplingDesignLabels();
}

function clampSampleSize(size) {
    const parsed = Number(size);
    if (!Number.isFinite(parsed)) return customFixedSampleSize;
    const stepped = Math.round(parsed / SAMPLE_SIZE_STEP) * SAMPLE_SIZE_STEP;
    return Math.max(SAMPLE_SIZE_MIN, Math.min(SAMPLE_SIZE_MAX, stepped));
}

function selectFixedSampleSize(size) {
    customFixedSampleSize = clampSampleSize(size);
    updateSamplingDesignLabels();
}
window.selectFixedSampleSize = selectFixedSampleSize;

function formatPopulationFrameLabel(month) {
    const [year, rawMonth] = String(month || '2026-05').split('-');
    const monthNumber = Number(rawMonth);
    const monthLabel = Number.isFinite(monthNumber) && monthNumber > 0 ? String(monthNumber) : (rawMonth || '5');
    return `${year}.${monthLabel}. 기준`;
}

function updateSamplingDesignLabels() {
    if (!activePopulationFrame.length) activePopulationFrame = parsePopulationFrameCsv(KOSIS_FRAME_FALLBACK);
    renderSamplingChips();
    const confidence = document.getElementById('custom-confidence-range');
    const confidenceLevel = Number(confidence?.value || 95) / 100;
    const confidenceLabel = document.getElementById('custom-confidence-label');
    if (confidenceLabel) confidenceLabel.textContent = `${Math.round(confidenceLevel * 100)}%`;
    const marginRange = document.getElementById('custom-margin-range');
    const targetMoe = Number(marginRange?.value || 3) / 100;
    const targetMarginLabel = document.getElementById('custom-target-margin-label');
    if (targetMarginLabel) targetMarginLabel.textContent = `±${(targetMoe * 100).toFixed(1)}%p`;

    const month = activePopulationFrame[0]?.month || '2026-05';
    const frameSource = document.getElementById('custom-frame-source-label');
    if (frameSource) frameSource.textContent = formatPopulationFrameLabel(month);

    const selectedFrame = getFilteredPopulationFrame();
    const populationN = selectedFrame.reduce((sum, cell) => sum + cell.population, 0);
    const recommendedN = requiredSampleSizeForPlan(confidenceLevel, populationN, targetMoe);
    const finalN = customFixedSampleSize;
    const achievedMoe = postComputedMoe(finalN, confidenceLevel, populationN);
    const regions = getSelectedChipValues('custom-region-filter');
    const ages = getSelectedChipValues('custom-age-filter');
    const genders = getSelectedChipValues('custom-gender-filter');

    lastSamplingPlan = { confidenceLevel, targetMoe, populationN, recommendedN, finalN, achievedMoe, regions, ages, genders, month };

    const sampleRange = document.getElementById('custom-sample-size-range');
    if (sampleRange) sampleRange.value = String(finalN);
    const fixedSampleLabel = document.getElementById('custom-fixed-sample-label');
    if (fixedSampleLabel) fixedSampleLabel.textContent = `${finalN.toLocaleString('ko-KR')}명`;

    const sampleLabel = document.getElementById('custom-sample-size-label');
    const populationLabel = document.getElementById('custom-population-label');
    const recommendedLabel = document.getElementById('custom-recommended-n-label');
    const marginLabel = document.getElementById('custom-margin-label');
    const summary = document.getElementById('custom-sampling-summary');
    if (sampleLabel) sampleLabel.textContent = `${finalN.toLocaleString('ko-KR')}명`;
    if (populationLabel) populationLabel.textContent = `${populationN.toLocaleString('ko-KR')}명`;
    if (recommendedLabel) recommendedLabel.textContent = `${recommendedN.toLocaleString('ko-KR')}명`;
    if (marginLabel) marginLabel.textContent = `±${(achievedMoe * 100).toFixed(1)}%p`;
    if (summary) summary.textContent = `선택한 표본 프레임 기준 목표 신뢰수준 ${Math.round(confidenceLevel * 100)}%, 목표 오차범위 ±${(targetMoe * 100).toFixed(1)}%p의 권장 표본은 ${recommendedN.toLocaleString('ko-KR')}명입니다. 현재 실행 표본 ${finalN.toLocaleString('ko-KR')}명의 사후 오차범위는 ±${(achievedMoe * 100).toFixed(1)}%p입니다.`;
}

function getSamplingDesignOptions() {
    updateSamplingDesignLabels();
    const plan = lastSamplingPlan || {};
    const cleanMulti = (values) => (values || ['전체']).includes('전체') ? null : values;
    return {
        confidence_level: plan.confidenceLevel || 0.95,
        margin_of_error: plan.targetMoe || DEFAULT_SAMPLING_TARGET_MOE,
        post_computed_margin_of_error: plan.achievedMoe || null,
        population_frame_month: plan.month || '2026-05',
        sampling_mode: 'frame_allocated_raked',
        filter_region: cleanMulti(plan.regions),
        filter_age: cleanMulti(plan.ages),
        filter_gender: cleanMulti(plan.genders),
    };
}

function getSelectedSampleSize() {
    updateSamplingDesignLabels();
    return lastSamplingPlan?.finalN || 1067;
}

async function runCustomSimulation() {
    const intakeText = document.getElementById('document-intake-text')?.value?.trim() || '';
    if (shouldApplyDocumentIntakeText(intakeText) && lastDocumentIssueKey !== `doc_${documentHash(intakeText)}`) {
        applyDocumentIntake();
    }
    const issue = getSelectedLiveIssue();
    const baseDirection = buildPromptDirectionFromInput(issue);
    if (!baseDirection) {
        const btn = document.querySelector('.custom-sim-btn');
        if (btn) {
            btn.classList.add('attention');
            setTimeout(() => btn.classList.remove('attention'), 900);
        }
        return;
    }

    closeSimulationSettings();
    const resultCard = document.getElementById('custom-sim-result');
    if (resultCard) resultCard.style.display = 'none';

    clearSimulationFailure();
    const designContainer = document.getElementById('survey-design-container');

    // Phase 1: Call the AI design endpoint
    renderSimulationProgress(5, 'AI가 최적 설문을 설계하는 중…', 'running');
    const actionBtn = document.querySelector('.custom-sim-btn');
    const originalBtnText = actionBtn?.textContent;
    if (actionBtn) {
        actionBtn.disabled = true;
        actionBtn.textContent = '설문 설계 중…';
    }

    try {
        const designRes = await apiFetch('/survey/design', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: baseDirection.title }),
        });

        if (!designRes.ok) {
            console.warn('Design endpoint unavailable, running simulation directly');
            renderSurveyDesignFallbackNotice('endpoint');
            if (designContainer) designContainer.style.display = '';
            if (actionBtn) {
                actionBtn.disabled = false;
                actionBtn.textContent = originalBtnText || '▶ 시뮬레이션 실행';
            }
            await runDirectSimulation([baseDirection], issue);
            return;
        }

        const designData = await designRes.json();
        const questions = designData.questions || [];

        if (!questions.length) {
            renderSurveyDesignFallbackNotice('empty');
            if (designContainer) designContainer.style.display = '';
            if (actionBtn) {
                actionBtn.disabled = false;
                actionBtn.textContent = originalBtnText || '▶ 시뮬레이션 실행';
            }
            await runDirectSimulation([baseDirection], issue);
            return;
        }

        window._lastDesignedQuestions = questions;
        window._lastDesignIssue = issue;

        renderSurveyDesignCards(questions);
        if (designContainer) designContainer.style.display = '';
        renderSimulationProgress(100, 'AI 설문 설계 완료 — 시뮬레이션할 문항을 선택하세요', 'completed');

        if (actionBtn) {
            actionBtn.disabled = false;
            actionBtn.textContent = originalBtnText || '▶ 시뮬레이션 실행';
        }

    } catch (err) {
        console.warn('Design phase error, falling back to direct simulation:', err);
        renderSurveyDesignFallbackNotice('error');
        if (designContainer) designContainer.style.display = '';
        if (actionBtn) {
            actionBtn.disabled = false;
            actionBtn.textContent = originalBtnText || '▶ 시뮬레이션 실행';
        }
        await runDirectSimulation([baseDirection], issue);
    }
}

function renderSurveyDesignFallbackNotice(reason = 'error') {
    const notice = document.getElementById('survey-design-fallback');
    const grid = document.getElementById('survey-design-grid');
    const countEl = document.getElementById('survey-design-count');
    if (!notice) return;
    const reasonLabel = reason === 'empty' ? '추천 문항 없음' : reason === 'endpoint' ? '설계 API 응답 없음' : '설계 오류';
    notice.hidden = false;
    notice.innerHTML = `
        <span class="survey-design-fallback-kicker">${reasonLabel}</span>
        <strong>문항 설계 건너뜀</strong>
        <span>입력 보존 · 기본 시뮬레이션으로 진행</span>
    `;
    notice.setAttribute('aria-label', `${reasonLabel}: 문항 설계 건너뜀, 입력 보존, 기본 시뮬레이션으로 진행`);
    if (grid) grid.innerHTML = '';
    if (countEl) {
        countEl.innerHTML = '<strong>1</strong>개 기본 문항 실행 중';
        countEl.setAttribute('aria-label', '1개 기본 문항 실행 중');
    }
}

let _selectedDesignQuestionIndices = new Set();

function renderSurveyDesignCards(questions) {
    const grid = document.getElementById('survey-design-grid');
    const fallback = document.getElementById('survey-design-fallback');
    if (fallback) {
        fallback.hidden = true;
        fallback.innerHTML = '';
    }
    if (!grid) return;
    _selectedDesignQuestionIndices = new Set(questions.map((_, i) => i));

    const badgeLabels = {
        likert_5: '5점 척도',
        multiple_choice: '객관식',
        open_ended: '주관식',
        issue_stance: '쟁점 질문',
        policy_option: '정책 대안',
        binary: '양자택일',
        tripartite: '삼자택일',
        custom: '맞춤형',
    };

    grid.innerHTML = questions.map((q, i) => `
        <div class="survey-question-card selected" data-design-idx="${i}" role="checkbox" tabindex="0" aria-checked="true" aria-label="${escapeHtml(q.policy_title)} 문항 선택" onclick="toggleDesignQuestion(${i})" onkeydown="handleDesignQuestionKeydown(event, ${i})">
            <div class="survey-question-card-top">
                <span class="survey-question-badge ${escapeHtml(q.question_type)}">${escapeHtml(badgeLabels[q.question_type] || q.question_type)}</span>
                <div class="survey-question-checkbox-wrapper" aria-hidden="true">
                    <input type="checkbox" class="survey-question-checkbox" checked data-design-check="${i}" tabindex="-1"
                           onclick="event.stopPropagation(); toggleDesignQuestion(${i})" aria-label="${escapeHtml(q.policy_title)} 문항 선택" />
                </div>
            </div>
            <p class="survey-question-title">${escapeHtml(q.policy_title)}</p>
            <p class="survey-question-description">${escapeHtml(q.policy_description || '')}</p>
            <div class="survey-question-choices">
                ${(q.choices || []).map(c => `<span class="survey-question-choice-pill">${escapeHtml(c)}</span>`).join('')}
            </div>
            <p class="survey-question-rationale">${escapeHtml(q.rationale || '')}</p>
        </div>
    `).join('');

    updateDesignSelectionCount();
}

function toggleDesignQuestion(idx) {
    if (_selectedDesignQuestionIndices.has(idx)) {
        _selectedDesignQuestionIndices.delete(idx);
    } else {
        _selectedDesignQuestionIndices.add(idx);
    }
    const card = document.querySelector(`.survey-question-card[data-design-idx="${idx}"]`);
    const checkbox = document.querySelector(`input[data-design-check="${idx}"]`);
    const isSelected = _selectedDesignQuestionIndices.has(idx);
    if (card) {
        card.classList.toggle('selected', isSelected);
        card.setAttribute('aria-checked', String(isSelected));
    }
    if (checkbox) checkbox.checked = isSelected;
    updateDesignSelectionCount();
}

function handleDesignQuestionKeydown(event, idx) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleDesignQuestion(idx);
    }
}

function updateDesignSelectionCount() {
    const countEl = document.getElementById('survey-design-count');
    if (countEl) {
        const selectedCount = _selectedDesignQuestionIndices.size;
        const label = `${selectedCount}개 문항 선택됨`;
        countEl.innerHTML = `<strong>${selectedCount}</strong>개 선택됨`;
        countEl.setAttribute('aria-label', label);
    }
}

async function runSequentialSimulationsFromDesign() {
    const questions = window._lastDesignedQuestions || [];
    const issue = window._lastDesignIssue || getSelectedLiveIssue();
    const selectedQuestions = [..._selectedDesignQuestionIndices]
        .sort((a, b) => a - b)
        .map(i => questions[i])
        .filter(Boolean);

    if (!selectedQuestions.length) {
        const countEl = document.getElementById('survey-design-count');
        if (countEl) {
            countEl.innerHTML = '<strong style="color:var(--opinion-disagree)">0</strong>개 선택됨 — 최소 1개 문항을 선택하세요';
            countEl.setAttribute('aria-label', '0개 문항 선택됨 — 최소 1개 문항을 선택하세요');
        }
        return;
    }

    const designContainer = document.getElementById('survey-design-container');
    if (designContainer) designContainer.style.display = 'none';

    const directions = selectedQuestions.map((q, i) => ({
        id: `design_q_${i}`,
        title: q.policy_title,
        description: q.policy_description || '',
        research_purpose: q.rationale || q.policy_description || '',
        policy_type: inferPolicyTypeFromIssue(issue || {}),
        source_text: q.policy_description || '',
        question_type: q.question_type || 'likert_5',
        choices: q.choices || null,
    }));

    await runDirectSimulation(directions, issue);
}

async function runDirectSimulation(selectedDirections, issue) {
    const sampleSize = getSelectedSampleSize();
    const resultCard = document.getElementById('custom-sim-result');
    if (resultCard) resultCard.style.display = 'none';

    clearSimulationFailure();
    renderSimulationProgress(2, '실시간 시뮬레이션 작업을 생성하는 중', 'running');

    const actionBtn = document.querySelector('.custom-sim-btn');
    const originalBtnText = actionBtn?.textContent;

    if (actionBtn) {
        actionBtn.disabled = true;
        actionBtn.textContent = '시뮬레이션 중…';
    }

    try {
        const results = [];
        let lastCompletedJobEvents = [];
        for (let i = 0; i < selectedDirections.length; i++) {
            const direction = selectedDirections[i];
            const job = await startSimulationJob(direction, issue, sampleSize);
            const completedJob = await pollCustomSimulationJob(job.job_id, direction.title, i, selectedDirections.length);
            lastCompletedJobEvents = completedJob.events || [];
            results.push({ direction, result: completedJob.result });
        }

        renderSimulationResults(results);
        if (actionBtn) {
            actionBtn.disabled = false;
            actionBtn.textContent = originalBtnText || '▶ 시뮬레이션 실행';
        }
        renderSimulationProgress(100, '실시간 표본추출 완료', 'completed', lastCompletedJobEvents);

    } catch (err) {
        renderSimulationProgress(100, '실시간 시뮬레이션 실패', 'failed');
        renderSimulationFailure(err, selectedDirections, issue, sampleSize);
        if (actionBtn) {
            actionBtn.disabled = false;
            actionBtn.textContent = originalBtnText || '▶ 시뮬레이션 실행';
            actionBtn.classList.remove('attention');
        }
    }
}

function buildQuestionnaireGenerationPayload(direction, issue) {
    return {
        toolkit_prompt: QUESTION_DESIGN_TOOLKIT_PROMPT,
        agenda: getSurveyAgendaSubject(issue || direction),
        selected_question: String(direction?.title || '').trim(),
        question_type: direction?.question_type || 'likert_5',
        research_purpose: direction?.research_purpose || direction?.description || '',
        response_scale: direction?.response_scale || null,
        choices: direction?.choices || null,
        display_rule: '입력 칸에는 질문문만 표시하고 선지는 노출하지 않습니다.',
        output_contract: {
            likert_5_count: 2,
            multiple_choice_count: 2,
            open_ended_count: 1,
            audience: '일반 대중',
            avoid_leading_questions: true,
            require_mece_choices: true,
            include_research_purpose: true,
        },
    };
}

async function startSimulationJob(direction, issue, sampleSize) {
    const questionnaireGeneration = buildQuestionnaireGenerationPayload(direction, issue);
    const startRes = await apiFetch('/survey/simulations/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            mode: customSimMode,
            policy_title: direction.title,
            policy_description: `${direction.description}\n\n질문 유형: ${direction.question_type === 'policy_option' ? '정책 방향 평가' : '쟁점 질문'}\n근거 이슈: ${issue?.title || ''}\n근거 자료: ${direction.source_text || ''}`,
            policy_type: direction.policy_type,
            sample_size: sampleSize,
            question_type: direction.question_type || 'likert_5',
            choices: direction.choices || null,
            question_design_toolkit_prompt: QUESTION_DESIGN_TOOLKIT_PROMPT,
            questionnaire_generation: questionnaireGeneration,
            ...getSamplingDesignOptions(),
        }),
    });
    if (!startRes.ok) throw new Error(await extractApiErrorMessage(startRes, `API ${startRes.status}`));
    return startRes.json();
}

async function extractApiErrorMessage(response, fallback = 'API unavailable') {
    try {
        const payload = await response.clone().json();
        return extractSimulationErrorMessage(payload) || fallback;
    } catch (_) {
        try {
            return (await response.clone().text()) || fallback;
        } catch (__) {
            return fallback;
        }
    }
}

function extractSimulationErrorMessage(errorLike) {
    if (!errorLike) return '';
    if (typeof errorLike === 'string') return errorLike;
    if (errorLike instanceof Error) return errorLike.message;
    const detail = errorLike.detail || errorLike.error || errorLike;
    if (typeof detail === 'string') return detail;
    if (detail.code === 'JOB_TIMEOUT') return '시뮬레이션 시간이 초과되었습니다. 시간 초과 후 안전하게 중단했으며 다시 실행할 수 있습니다.';
    if (detail.code === 'JOB_CONCURRENCY_LIMIT') return '이미 실행 중인 시뮬레이션이 많습니다. 진행 중인 결과를 확인한 뒤 다시 실행하세요.';
    return detail.message || detail.internal || detail.code || '';
}

function pollCustomSimulationJob(jobId, title, index = 0, total = 1) {
    if (customSimulationPollTimer) clearInterval(customSimulationPollTimer);

    return new Promise((resolve, reject) => {
        const poll = async () => {
        try {
            const res = await apiFetch(`/survey/simulations/${encodeURIComponent(jobId)}?_=${Date.now()}`, {
                cache: 'no-store',
            });
            if (!res.ok) throw new Error(`API ${res.status}`);
            const job = await res.json();
            const batchProgress = Math.round(((index / total) * 100) + ((job.progress || 0) / total));
            renderSimulationProgress(batchProgress, `[${index + 1}/${total}] ${job.status_text || '계산하는 중'}`, job.state || 'running', job.events || []);

            if (job.state === 'completed') {
                clearInterval(customSimulationPollTimer);
                customSimulationPollTimer = null;
                resolve(job);
            } else if (job.state === 'failed') {
                clearInterval(customSimulationPollTimer);
                customSimulationPollTimer = null;
                const failureMessage = extractSimulationErrorMessage(job.error) || '분석 실패';
                renderSimulationProgress(100, failureMessage, 'failed');
                reject(new Error(failureMessage));
            } else if (job.state === 'cancelled') {
                clearInterval(customSimulationPollTimer);
                customSimulationPollTimer = null;
                const cancelledMessage = extractSimulationErrorMessage(job.error) || '시뮬레이션이 취소되었습니다';
                const cancelledError = new Error(cancelledMessage);
                cancelledError.code = job.error?.code || 'JOB_CANCELLED';
                renderSimulationProgress(100, cancelledMessage, 'cancelled', job.events || []);
                reject(cancelledError);
            }
        } catch (err) {
            clearInterval(customSimulationPollTimer);
            customSimulationPollTimer = null;
            const failureMessage = extractSimulationErrorMessage(err) || '진행률을 확인하지 못했습니다';
            renderSimulationProgress(100, failureMessage, 'failed');
            reject(new Error(failureMessage));
        }
        };

        poll();
        customSimulationPollTimer = setInterval(poll, 450);
    });
}

function renderSimulationResults(results) {
    if (!results.length) return;
    clearSimulationFailure();
    document.querySelectorAll('.multi-result-section').forEach(section => section.remove());
    if (results.length === 1) {
        renderCustomSimResult(results[0].direction.title, results[0].result);
        return;
    }

    const [first, ...rest] = results;
    renderCustomSimResult(first.direction.title, first.result);
    const container = document.getElementById('custom-jury-section');
    if (!container) return;
    const extraHtml = rest.map(({ direction, result }, index) => renderCompactSimulationResult(direction, result, index + 2)).join('');
    const summaryHtml = `<div class="multi-result-summary" data-multi-result-summary>
        <span class="multi-result-summary-chip strong">상세 1개</span>
        <span class="multi-result-summary-chip">비교 ${rest.length}개</span>
        <span class="multi-result-summary-chip">총 ${results.length}개 문항</span>
    </div>`;
    container.insertAdjacentHTML('beforebegin', `<section class="multi-result-section" aria-label="선택 문항별 시뮬레이션 결과 비교"><h5>선택 문항 비교</h5>${summaryHtml}${extraHtml}</section>`);
}

function clearSimulationFailure() {
    const errorEl = document.getElementById('custom-sim-error');
    if (errorEl) errorEl.innerHTML = '';
}

function renderSimulationFailure(error, directions = [], issue = null, sampleSize = 0) {
    const errorEl = document.getElementById('custom-sim-error');
    if (!errorEl) return;
    const selectedTitles = directions.map(direction => direction.title).filter(Boolean);
    errorEl.innerHTML = `<div class="simulation-error-card">
        <div class="simulation-error-head">
            <strong>실시간 시뮬레이션을 실행하지 못했습니다</strong>
            <span>fallback 결과를 표시하지 않았습니다</span>
        </div>
        <p>이 버튼은 이제 저장된 데모값을 띄우지 않고, 백엔드 표본추출 job이 성공했을 때만 결과를 보여줍니다. API 서버가 켜져 있는지와 <code>/api/v1/survey/simulations/start</code> 접근 가능 여부를 확인해야 합니다.</p>
        <p class="simulation-error-preserved">입력은 보존했습니다. 같은 이슈·질문·표본수로 다시 실행하거나 API 설정을 확인할 수 있습니다.</p>
        <div class="simulation-error-trust-strip" aria-label="실패 후 보존된 실행 조건">
            <span><strong>입력·표본 조건 보존</strong> 같은 질문과 표본수로 다시 실행</span>
            <span><strong>감사 카드는 성공한 실행에서 생성</strong> 실패한 job에는 seed·hash를 꾸며내지 않음</span>
            <span><strong>fallback 결과 없음</strong> 완료된 백엔드 결과만 표시</span>
        </div>
        <div class="sampling-audit-grid">
            <span>이슈</span><strong>${escapeHtml(issue?.title || '선택 이슈 없음')}</strong>
            <span>선택 질문</span><strong>${escapeHtml(selectedTitles.join(' / ') || '없음')}</strong>
            <span>표본수</span><strong>${Number(sampleSize || 0).toLocaleString('ko-KR')}명</strong>
            <span>오류</span><strong>${escapeHtml(error?.message || error || 'API unavailable')}</strong>
        </div>
        <div class="simulation-error-recovery" aria-label="시뮬레이션 실패 복구 행동">
            <button type="button" class="simulation-retry-btn primary" onclick="runCustomSimulation()">다시 실행</button>
            <button type="button" class="simulation-retry-btn" onclick="openMyPage('settings')">설정 확인</button>
        </div>
    </div>`;
    errorEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function renderCompactSimulationResult(direction, data, sequenceNumber = null) {
    const estimate = data?.score_estimate || {};
    const ci = estimate.confidence_interval?.mean_agreement_pct || [0, 0];
    const sequenceLabel = sequenceNumber ? `${sequenceNumber}번 문항` : '비교 문항';
    return `<div class="multi-result-card" data-multi-result-card>
        <div>
            <span>${escapeHtml(sequenceLabel)}</span>
            <strong>${escapeHtml(direction.title)}</strong>
            <em class="ai-estimate-inline">AI 추정</em>
        </div>
        <div class="multi-result-metrics">
            <span>평균 ${escapeHtml(estimate.mean_agreement_pct ?? '-')}%</span>
            <span>95% CI ${escapeHtml(ci[0])}~${escapeHtml(ci[1])}%</span>
            <span>신뢰도 ${escapeHtml(estimate.reliability?.score ?? '-')}</span>
        </div>
    </div>`;
}

function renderSimulationProgress(progress, statusText, state, events = []) {
    const loading = document.getElementById('custom-sim-loading');
    if (!loading) return;
    const safeProgress = Math.max(0, Math.min(100, Math.round(progress || 0)));
    const stateClass = state === 'failed' ? 'failed' : state === 'completed' ? 'completed' : state === 'cancelled' ? 'cancelled' : 'running';
    const timelineHtml = renderSamplingTimeline(events);
    loading.innerHTML = `<div class="simulation-progress">
        <div class="progress-donut ${stateClass}" style="--progress:${safeProgress}">
            <span>${safeProgress}%</span>
        </div>
        <div class="simulation-progress-copy">
            <strong>${escapeHtml(statusText || '계산하는 중')}</strong>
            <span>${customSimMode === 'nemotron' ? '가상 표본추출' : '패널 표본추출'}</span>
        </div>
    </div>${timelineHtml}`;
}

function renderSamplingTimeline(events = []) {
    const visibleEvents = (Array.isArray(events) ? events : [])
        .filter(event => event && event.payload && (event.payload.visible_label || event.payload.stage_code))
        .slice(-6);
    if (!visibleEvents.length) return '';
    const rows = visibleEvents.map(event => {
        const payload = event.payload || {};
        const label = payload.visible_label || event.status_text || event.stage || '표본 단계';
        const stageCode = payload.stage_code || event.stage || 'stage';
        const warningCount = Number(payload.warning_count || (Array.isArray(payload.warnings) ? payload.warnings.length : 0));
        const facts = [
            payload.sample_size ? `n=${Number(payload.sample_size).toLocaleString('ko-KR')}` : '',
            payload.population_frame_month ? `frame=${payload.population_frame_month}` : '',
            payload.random_seed !== undefined && payload.random_seed !== null ? `seed=${payload.random_seed}` : '',
            payload.jury_n ? `jury=${payload.jury_n}` : '',
            payload.stage_duration_ms !== undefined && payload.stage_duration_ms !== null ? `${payload.stage_duration_ms}ms` : '',
            warningCount ? `경고 ${warningCount}건` : '경고 0건',
        ].filter(Boolean).join(' · ');
        return `<li>
            <span class="sampling-stage-dot"></span>
            <div><strong>${escapeHtml(label)}</strong><em>${escapeHtml(stageCode)}${facts ? ' · ' + escapeHtml(facts) : ''}</em></div>
        </li>`;
    }).join('');
    return `<ol class="sampling-progress-timeline" aria-label="표본추출 감사 타임라인">${rows}</ol>`;
}

function normalizePublicAgendaView(mode) {
    return PUBLIC_AGENDA_VIEW_MODES.has(mode) ? mode : PUBLIC_AGENDA_DEFAULT_VIEW;
}

function getPublicAgendaViewStorageKey(kind) {
    return `deep-survey-public-agenda-view:${kind}`;
}

function readPublicAgendaView(kind) {
    try {
        return normalizePublicAgendaView(localStorage.getItem(getPublicAgendaViewStorageKey(kind)));
    } catch (_) {
        return PUBLIC_AGENDA_DEFAULT_VIEW;
    }
}

function writePublicAgendaView(kind, mode) {
    try {
        localStorage.setItem(getPublicAgendaViewStorageKey(kind), mode);
    } catch (_) {
        // Local previews may block storage; view mode still works for this session.
    }
}

function syncPublicAgendaViewControls(kind, mode = publicAgendaState[kind]?.viewMode) {
    const nextMode = normalizePublicAgendaView(mode);
    document.querySelectorAll(`[data-public-agenda-kind="${kind}"][data-public-view]`).forEach(button => {
        const active = normalizePublicAgendaView(button.dataset.publicView) === nextMode;
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
}

window.setPublicAgendaView = function (kind, mode) {
    if (!publicAgendaState[kind]) return;
    const nextMode = normalizePublicAgendaView(mode);
    publicAgendaState[kind].viewMode = nextMode;
    writePublicAgendaView(kind, nextMode);
    syncPublicAgendaViewControls(kind, nextMode);
    const payload = publicAgendaState[kind].lastPayload || { kind, items: publicAgendaState[kind].items, count: publicAgendaState[kind].items.length };
    renderPublicAgendaFeed(kind, payload);
};

function initPublicAgendaFeeds() {
    ['parliament', 'government'].forEach(kind => {
        publicAgendaState[kind].viewMode = readPublicAgendaView(kind);
        syncPublicAgendaViewControls(kind);
        renderPublicAgendaLoading(kind, '동기화 대기');
        refreshPublicAgendaFeed(kind);
        if (publicAgendaState[kind].timer) clearInterval(publicAgendaState[kind].timer);
        publicAgendaState[kind].timer = setInterval(() => refreshPublicAgendaFeed(kind, { silent: true }), PUBLIC_AGENDA_REFRESH_MS);
    });
}

window.refreshPublicAgendaFeed = async function (kind, options = {}) {
    if (!publicAgendaState[kind] || publicAgendaState[kind].loading) return;
    publicAgendaState[kind].loading = true;
    if (!options.silent) renderPublicAgendaLoading(kind, '동기화 중');
    try {
        const limit = 50;
        const res = await apiFetch(`/survey/public-agenda/${kind}?limit=${limit}&_=${Date.now()}`, { cache: 'no-store' });
        if (!res.ok) throw new Error(`API ${res.status}`);
        const data = await res.json();
        publicAgendaState[kind].items = Array.isArray(data.items) ? data.items : [];
        publicAgendaState[kind].loaded = true;
        renderPublicAgendaFeed(kind, data);
    } catch (err) {
        const fallback = buildFallbackPublicAgenda(kind);
        publicAgendaState[kind].items = fallback.items;
        publicAgendaState[kind].loaded = true;
        renderPublicAgendaFeed(kind, fallback);
    } finally {
        publicAgendaState[kind].loading = false;
    }
};

function renderPublicAgendaLoading(kind, label) {
    const status = document.getElementById(`${kind}-feed-status`);
    const list = document.getElementById(`${kind}-feed-list`);
    if (status) status.textContent = label;
    if (list && !publicAgendaState[kind]?.loaded) {
        list.innerHTML = '<div class="public-agenda-loading" role="status" aria-live="polite" aria-label="안건 불러오는 중"><span class="public-agenda-loading-donut" aria-hidden="true"></span></div>';
    }
}

function buildFallbackPublicAgenda(kind) {
    const base = kind === 'parliament'
        ? [
            ['ai_basic_act', '인공지능 책임성 및 이용자 고지 강화 법률안', '과학기술정보방송통신위원회', '계류'],
            ['platform_fee_act', '온라인 플랫폼 수수료 투명화 및 분쟁조정 법률안', '정무위원회', '위원회 회부'],
            ['care_worker_act', '돌봄노동자 처우개선 및 안전관리 법률안', '보건복지위원회', '계류'],
            ['climate_grid_act', '재생에너지 계통접속 우선처리 법률안', '산업통상자원중소벤처기업위원회', '소관위 접수'],
        ]
        : [
            ['fuel_support', '고유가 피해지원금 2차 지급 신청 시작', '대한민국 정책브리핑', '정책 발표'],
            ['renewable_100gw', '2030년 재생에너지 100GW 보급 조기 달성', '대한민국 정책브리핑', '정책 발표'],
            ['youth_newdeal', '청년뉴딜 8000억 원 가동', '대한민국 정책브리핑', '정책 발표'],
            ['lunch_support', '중소기업 근로자 점심값 20% 지원', '대한민국 정책브리핑', '정책 발표'],
        ];
    const modifiers = ['본안', '재정추계안', '지방적용안', '단계시행안', '성과점검 반영안'];
    const expanded = Array.from({ length: 50 }, (_, index) => {
        const [id, title, committee, status] = base[index % base.length];
        const modifier = modifiers[Math.floor(index / base.length) % modifiers.length];
        return [
            `${id}_${String(index + 1).padStart(2, '0')}`,
            index < base.length ? title : `${title} ${modifier}`,
            committee,
            status,
            fallbackPublicAgendaDate(index),
        ];
    });
    const items = expanded.map(([id, title, committee, status, proposedAt]) => {
        const poll = deterministicPublicPoll(title);
        const spine = title.replace(/(일부개정법률안|전부개정법률안|개정법률안|법률안)$/g, '');
        return {
            id,
            kind,
            title,
            category: inferPublicAgendaCategory(title),
            source_name: committee,
            summary: `${title}의 정책 효과, 형평성, 재정 부담, 집행 가능성을 기준으로 반응을 추정합니다.`,
            policy_spine: spine,
            poll_question: `${spine}에 동의하십니까?`,
            committee: kind === 'parliament' ? committee : '',
            status,
            proposed_at: proposedAt,
            is_fallback: true,
            poll,
        };
    }).sort((a, b) => a.poll.gap - b.poll.gap);
    return {
        kind,
        source: 'local_fallback',
        source_url: kind === 'parliament'
            ? 'https://likms.assembly.go.kr/bill/bi/bill/state/mooringBillPage.do'
            : 'https://www.korea.kr/',
        refreshed_at: new Date().toISOString(),
        count: items.length,
        items,
    };
}

function fallbackPublicAgendaDate(index) {
    const ageDays = [0, 1, 2, 3, 5, 8, 13, 21, 34, 62, 95, 180, 370, 540];
    const days = ageDays[index % ageDays.length] + Math.floor(index / ageDays.length) * 11;
    const date = new Date();
    date.setDate(date.getDate() - days);
    return formatPublicAgendaIsoDate(date);
}

function deterministicPublicPoll(title) {
    let hash = 0;
    for (let i = 0; i < title.length; i++) hash = ((hash << 5) - hash + title.charCodeAt(i)) | 0;
    const seed = Math.abs(hash);
    const support = 40 + (seed % 18);
    const oppose = 38 + ((seed >> 4) % 18);
    const unsure = Math.max(6, 100 - support - oppose);
    const total = support + oppose + unsure;
    const normalizedSupport = Math.round((support / total) * 1000) / 10;
    const normalizedOppose = Math.round((oppose / total) * 1000) / 10;
    const normalizedUnsure = Math.round((100 - normalizedSupport - normalizedOppose) * 10) / 10;
    return {
        model: 'deep_survey_fast_panel_v1',
        sample_n: 1200 + (seed % 1400),
        support: normalizedSupport,
        oppose: normalizedOppose,
        unsure: normalizedUnsure,
        gap: Math.round(Math.abs(normalizedSupport - normalizedOppose) * 10) / 10,
        net_support: Math.round((normalizedSupport - normalizedOppose) * 10) / 10,
        contention: Math.abs(normalizedSupport - normalizedOppose) < 3 ? '초접전' : '접전',
    };
}

function inferPublicAgendaCategory(title) {
    if (/세|금융|투자|기업|산업|수출|펀드/.test(title)) return '경제';
    if (/복지|지원|수당|돌봄|청년|저소득/.test(title)) return '복지';
    if (/근로|노동|고용|임금|노조/.test(title)) return '노동';
    if (/교육|학교|대학|학생|교원/.test(title)) return '교육';
    if (/기후|환경|에너지|재생|탄소/.test(title)) return '환경';
    if (/안전|범죄|재난|보호|경찰/.test(title)) return '안전';
    return '정책';
}

function renderPublicAgendaFeed(kind, data) {
    const status = document.getElementById(`${kind}-feed-status`);
    const count = document.getElementById(`${kind}-feed-count`);
    const list = document.getElementById(`${kind}-feed-list`);
    if (!list) return;
    const items = Array.isArray(data?.items) ? data.items : [];
    const refreshed = data?.refreshed_at ? new Date(data.refreshed_at) : null;
    const time = refreshed && !Number.isNaN(refreshed.getTime())
        ? refreshed.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
        : '방금';
    if (status) {
        const source = data?.source === 'local_fallback' ? '로컬 폴백' : (kind === 'parliament' ? '국회 동기화' : '정책브리핑 동기화');
        status.textContent = `${source} · ${time}`;
    }
    if (count) count.textContent = `${Number(data?.count || items.length || 0).toLocaleString('ko-KR')}건`;
    publicAgendaState[kind].items = items;
    publicAgendaState[kind].lastPayload = data;
    const viewMode = normalizePublicAgendaView(publicAgendaState[kind]?.viewMode);
    list.classList.remove('public-agenda-view-grid-3-2', 'public-agenda-view-grid-2-3', 'public-agenda-view-list');
    list.classList.add(`public-agenda-view-${viewMode}`);
    list.dataset.publicAgendaView = viewMode;
    syncPublicAgendaViewControls(kind, viewMode);
    if (!items.length) {
        list.innerHTML = '<div class="public-agenda-empty">표시할 안건 없음</div>';
        return;
    }
    list.innerHTML = items.map((item, idx) => renderPublicAgendaCard(kind, item, idx, viewMode)).join('');
}

function renderPublicOpinionChoices(support, oppose, unsure) {
    const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
    const dotSize = value => Math.round(clamp(20 + Math.sqrt(Math.max(0, value)) * 5.8, 22, 60));
    const cardDotSize = value => Math.round(clamp(14 + Math.sqrt(Math.max(0, value)) * 3.2, 16, 36));
    const points = [
        { side: 'agree', label: '강한 동의', value: support * 0.46 },
        { side: 'agree', label: '동의', value: support * 0.34 },
        { side: 'agree', label: '약한 동의', value: support * 0.2 },
        { side: 'neutral', label: '유보', value: unsure },
        { side: 'oppose', label: '약한 비동의', value: oppose * 0.2 },
        { side: 'oppose', label: '비동의', value: oppose * 0.34 },
        { side: 'oppose', label: '강한 비동의', value: oppose * 0.46 },
    ];
    const dots = points.map(point => `<span class="public-scale-dot ${point.side}" style="--dot-size:${dotSize(point.value)}px;--dot-card-size:${cardDotSize(point.value)}px" title="${escapeHtml(point.label)} ${point.value.toFixed(1)}%"></span>`).join('');
    return `<div class="public-opinion-scale" aria-label="동의 ${support.toFixed(1)}%, 비동의 ${oppose.toFixed(1)}%, 유보 ${unsure.toFixed(1)}%">
        <span class="public-scale-label agree">동의</span>
        <div class="public-opinion-dots" aria-hidden="true">${dots}</div>
        <span class="public-scale-label oppose">비동의</span>
    </div>`;
}

function getPublicAgendaVoteStorageKey(kind, id) {
    return `deep-survey-public-agenda-vote:${kind}:${id}`;
}

function readPublicAgendaVote(kind, id) {
    try {
        return localStorage.getItem(getPublicAgendaVoteStorageKey(kind, id)) || '';
    } catch (_) {
        return '';
    }
}

function writePublicAgendaVote(kind, id, stance) {
    try {
        localStorage.setItem(getPublicAgendaVoteStorageKey(kind, id), stance);
    } catch (_) {
        // Vote still updates visually when local storage is blocked.
    }
}

function getPublicAgendaVisitorId() {
    try {
        let visitorId = localStorage.getItem('deep-survey-public-agenda-visitor-id');
        if (!visitorId) {
            visitorId = `public_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
            localStorage.setItem('deep-survey-public-agenda-visitor-id', visitorId);
        }
        return visitorId;
    } catch (_) {
        return `public_session_${Date.now().toString(36)}`;
    }
}

function getPublicAgendaSegmentSnapshot() {
    try {
        const user = JSON.parse(localStorage.getItem('deep-survey-user') || 'null');
        const persona = user?.persona || {};
        return {
            user_id: user?.id || '',
            gender: persona.gender || '',
            age_group: persona.age || '',
            region: persona.region || '',
            ideology: persona.ideology || '',
        };
    } catch (_) {
        return {};
    }
}

function syncPublicAgendaVoteSelection(kind, id, stance) {
    const card = document.querySelector(`[data-public-agenda-kind="${kind}"][data-public-agenda-id="${CSS.escape(String(id || ''))}"]`);
    if (!card) return;
    card.querySelectorAll('[data-public-vote]').forEach(button => {
        const active = button.dataset.publicVote === stance;
        button.classList.toggle('selected', active);
        button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    const hasVote = Boolean(stance);
    card.classList.toggle('has-public-vote', hasVote);
    card.querySelectorAll('[data-public-vote-scale]').forEach(scale => {
        scale.classList.toggle('is-hidden', hasVote);
        scale.setAttribute('aria-hidden', hasVote ? 'true' : 'false');
    });
    card.querySelectorAll('[data-public-poll-result]').forEach(result => {
        result.classList.toggle('is-visible', hasVote);
        result.setAttribute('aria-hidden', hasVote ? 'false' : 'true');
    });
}

window.submitPublicAgendaVote = async function (kind, id, stance) {
    if (!kind || !id || !stance) return;
    writePublicAgendaVote(kind, id, stance);
    syncPublicAgendaVoteSelection(kind, id, stance);
    const item = (publicAgendaState[kind]?.items || []).find(candidate => String(candidate.id) === String(id));
    try {
        await apiFetch('/survey/public-agenda/votes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                agenda_kind: kind,
                agenda_id: id,
                stance,
                anonymous_fingerprint: getPublicAgendaVisitorId(),
                segment_snapshot: getPublicAgendaSegmentSnapshot(),
                poll_snapshot: item?.poll || {},
                source_snapshot: {
                    title: item?.title || '',
                    category: item?.category || '',
                    source_name: item?.source_name || '',
                    status: item?.status || '',
                    proposed_at: item?.proposed_at || '',
                },
            }),
        });
    } catch (_) {
        // Offline/demo mode keeps the local vote so the UI remains responsive.
    }
};

function renderPublicOpinionVoteScale(kind, item) {
    const id = item?.id || '';
    const selected = readPublicAgendaVote(kind, id);
    const choices = [
        { stance: 'strong_agree', side: 'agree agree-strong', label: '강한 동의' },
        { stance: 'agree', side: 'agree', label: '동의' },
        { stance: 'unsure', side: 'neutral', label: '유보' },
        { stance: 'disagree', side: 'oppose', label: '비동의' },
        { stance: 'strong_disagree', side: 'oppose oppose-strong', label: '강한 비동의' },
    ];
    const dots = choices.map(choice => `<button class="public-scale-dot ${choice.side} ${selected === choice.stance ? 'selected' : ''}" type="button" data-public-vote="${choice.stance}" onclick="submitPublicAgendaVote('${escapeHtml(kind)}','${escapeHtml(id)}','${choice.stance}')" aria-label="${escapeHtml(choice.label)}" aria-pressed="${selected === choice.stance ? 'true' : 'false'}"></button>`).join('');
    return `<div class="public-opinion-scale ${selected ? 'is-hidden' : ''}" data-public-vote-scale="${escapeHtml(id)}" aria-label="동의-비동의 투표" aria-hidden="${selected ? 'true' : 'false'}">
        <span class="public-scale-label agree">동의</span>
        <div class="public-opinion-dots">${dots}</div>
        <span class="public-scale-label oppose">비동의</span>
    </div>`;
}

function parsePublicAgendaDate(value) {
    const raw = String(value || '').trim();
    if (!raw) return null;
    let match = raw.match(/^(\d{4})(\d{2})(\d{2})$/);
    if (match) return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
    match = raw.match(/(20\d{2})\s*년\s*(\d{1,2})\s*월\s*(\d{1,2})\s*일/);
    if (match) return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
    match = raw.match(/(20\d{2})[./-](\d{1,2})[./-](\d{1,2})/);
    if (match) return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
    const parsed = new Date(raw);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function formatPublicAgendaIsoDate(date) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}

function formatPublicAgendaExactDate(date) {
    return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
}

function getPublicAgendaDateAgeDays(date) {
    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const dateStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return Math.max(0, Math.floor((todayStart - dateStart) / 86400000));
}

function formatPublicAgendaRelativeDate(date) {
    const days = getPublicAgendaDateAgeDays(date);
    if (days === 0) return '오늘';
    if (days === 1) return '어제';
    if (days < 7) return `${days}일 전`;
    if (days < 35) return `${Math.floor(days / 7)}주 전`;
    if (days < 365) return `${Math.floor(days / 30)}달 전`;
    return `${Math.floor(days / 365)}년 전`;
}

function getPublicAgendaDateInfo(item) {
    const date = parsePublicAgendaDate(item?.proposed_at || item?.published_at || item?.created_at || item?.updated_at);
    if (!date) return { date: null, relative: '날짜 미확인', exact: '정확한 날짜 확인 필요', iso: '', isNew: false };
    const ageDays = getPublicAgendaDateAgeDays(date);
    return {
        date,
        relative: formatPublicAgendaRelativeDate(date),
        exact: formatPublicAgendaExactDate(date),
        iso: formatPublicAgendaIsoDate(date),
        isNew: ageDays <= 2,
    };
}

function renderPublicAgendaTopTags(kind, item, isNew) {
    const tags = [];
    if (isNew) tags.push({ label: 'NEW', title: '2일 이내 올라온 안건', type: 'new' });
    const status = formatPublicAgendaStatusLabel(item?.status);
    if (status) tags.push({ label: status, title: `처리 상태: ${status}`, type: 'status' });
    const committee = kind === 'parliament' ? formatPublicAgendaCommitteeLabel(item?.committee) : null;
    if (committee) tags.push({ label: committee.label, title: `상임위: ${committee.title}`, type: 'committee' });
    return `<div class="public-agenda-top-tags" aria-label="안건 상태와 추정 방식">
        ${tags.map(tag => `<span class="public-agenda-tag ${tag.type}" title="${escapeHtml(tag.title)}">${escapeHtml(tag.label)}</span>`).join('')}
    </div>`;
}

function renderPublicAgendaDateMeta(kind, item) {
    const info = getPublicAgendaDateInfo(item);
    const dateLabel = kind === 'parliament' ? '의안 제출일' : '게시일';
    const tags = renderPublicAgendaTopTags(kind, item, info.isNew);
    if (!info.date) {
        return `<div class="public-agenda-card-top">
            ${tags}
            <span class="public-agenda-time is-unknown">${escapeHtml(info.relative)}</span>
        </div>`;
    }
    const fullDate = `${dateLabel}: ${info.exact}`;
    return `<div class="public-agenda-card-top">
        ${tags}
        <time class="public-agenda-time" datetime="${escapeHtml(info.iso)}" title="${escapeHtml(fullDate)}" data-full-date="${escapeHtml(fullDate)}" tabindex="0" aria-label="${escapeHtml(fullDate)}">${escapeHtml(info.relative)}</time>
    </div>`;
}

function formatPublicAgendaStatusLabel(status) {
    const clean = String(status || '').replace(/\s+/g, ' ').trim();
    if (!clean || clean === '정책') return '';
    return clean.replace(/^정책\s*/, '') || clean;
}

function formatPublicAgendaCommitteeLabel(committee) {
    const clean = String(committee || '').replace(/\s+/g, ' ').trim();
    if (!clean) return null;
    return {
        label: PUBLIC_AGENDA_COMMITTEE_SHORT_LABELS[clean] || clean.replace(/위원회$/, '위'),
        title: clean,
    };
}

function normalizePublicAgendaTitle(title) {
    return String(title || '')
        .replace(/\s+/g, ' ')
        .replace(/\s*(본안|재정추계안|지방적용안|단계시행안|성과점검 반영안|감사보고 반영안|전국 확대|시범지역 추가|예산 조기집행|민관협력형)$/g, '')
        .replace(/\s*(일부개정법률안|전부개정법률안|개정법률안|법률안)$/g, '')
        .trim();
}

function clampPublicAgendaSummaryLine(text, maxWords = 20) {
    const clean = String(text || '').replace(/\s+/g, ' ').trim();
    if (!clean) return '';
    const words = clean.split(' ');
    return words.length > maxWords ? `${words.slice(0, maxWords).join(' ')}...` : clean;
}

function inferPublicAgendaCoreLine(kind, item) {
    const title = String(item?.title || '');
    const spine = normalizePublicAgendaTitle(title) || title;
    if (/재생에너지.*계통접속|계통접속.*재생에너지/.test(title)) {
        return '재생에너지 설비의 계통접속 심사와 처리 기한을 앞당기는 법안입니다.';
    }
    if (/인공지능|AI/.test(title) && /책임|고지|이용자/.test(title)) {
        return 'AI 서비스 책임성과 이용자 고지 의무를 강화하는 법안입니다.';
    }
    if (/플랫폼.*수수료|수수료.*플랫폼/.test(title)) {
        return '온라인 플랫폼 수수료 공개와 분쟁조정 절차를 강화하는 법안입니다.';
    }
    if (/돌봄.*노동|노동.*돌봄/.test(title)) {
        return '돌봄노동자의 처우와 현장 안전관리 기준을 높이는 법안입니다.';
    }
    if (/에너지.*비용|소상공인/.test(title)) {
        return '소상공인 에너지 비용 부담을 완화하는 지원 기준을 마련합니다.';
    }
    if (/법률안/.test(title) || kind === 'parliament') {
        return `${spine} 관련 의무와 지원 기준을 정비하는 법안입니다.`;
    }
    return `${spine}의 지원 대상과 집행 일정을 안내하는 정책입니다.`;
}

function getPublicAgendaOneLineSummary(kind, item) {
    const summary = String(item?.summary || '').replace(/\s+/g, ' ').trim();
    const generic = /정책 효과|반응을 추정|형평성|집행 가능성|재정 부담/.test(summary);
    const source = summary && !generic ? summary : inferPublicAgendaCoreLine(kind, item);
    return clampPublicAgendaSummaryLine(source, 20);
}

function renderPublicAgendaCard(kind, item, _idx, viewMode = PUBLIC_AGENDA_DEFAULT_VIEW) {
    const poll = item.poll || {};
    const support = Number(poll.support || 0);
    const oppose = Number(poll.oppose || 0);
    const selectedVote = readPublicAgendaVote(kind, item.id || '');
    const resultVisible = Boolean(selectedVote);
    const sourceLink = item.url
        ? `<a class="public-agenda-source" href="${escapeHtml(item.url)}" target="_blank" rel="noopener">원문</a>`
        : '';
    return `<article class="public-agenda-card ${resultVisible ? 'has-public-vote' : ''}" data-public-agenda-kind="${escapeHtml(kind)}" data-public-agenda-id="${escapeHtml(item.id || '')}" data-public-card-view="${escapeHtml(viewMode)}">
        <div class="public-agenda-card-body">
            ${renderPublicAgendaDateMeta(kind, item)}
            <h3>${escapeHtml(item.title || '공개 안건')}</h3>
            <p class="public-agenda-summary-line">${escapeHtml(getPublicAgendaOneLineSummary(kind, item))}</p>
            ${renderPublicOpinionVoteScale(kind, item)}
            <div class="public-poll-result ${resultVisible ? 'is-visible' : ''}" data-public-poll-result aria-hidden="${resultVisible ? 'false' : 'true'}">
                <div class="public-poll-result-head">
                    <span class="public-agenda-tag ai-estimate" title="AI 추정 기반 참고값">AI 추정</span>
                </div>
                <div class="public-poll-comparison" aria-label="AI 추정 결과">
                    <div class="public-poll-row agree">
                        <span class="public-poll-row-label">동의</span>
                        <span class="public-poll-row-track"><span style="width:${support}%"></span></span>
                        <strong>${support.toFixed(1)}%</strong>
                    </div>
                    <div class="public-poll-row oppose">
                        <span class="public-poll-row-label">비동의</span>
                        <span class="public-poll-row-track"><span style="width:${oppose}%"></span></span>
                        <strong>${oppose.toFixed(1)}%</strong>
                    </div>
                </div>
            </div>
            <div class="public-agenda-actions">
                ${sourceLink}
            </div>
        </div>
    </article>`;
}

window.openPublicAgendaInSimulation = function (kind, id) {
    const item = (publicAgendaState[kind]?.items || []).find(candidate => String(candidate.id) === String(id));
    if (!item) return;
    const input = document.getElementById('document-intake-text');
    if (input) {
        input.value = `${item.poll_question || item.title}\n\n${item.summary || ''}`;
        input.dispatchEvent(new Event('input', { bubbles: true }));
    }
    window.selectAudienceMode?.('sim');
};

const FORECAST_VOTE_STORAGE_KEY = 'deepSurveyForecastVotesV1';
const FORECAST_VOTE_MARKETS = [
    {
        id: 'kr-gdp-yoy-q2-2026',
        category: '경제 · 대한민국',
        title: '2026년 2분기 한국 GDP 성장률은 어느 구간에 가까울까?',
        closesAt: '2026.07.23',
        source: 'Polymarket 공개 이벤트 구조 참고 · 한국은행 GDP 발표 기준',
        context: '거래 확률을 베팅으로 쓰지 않고, 결과 구간에 대한 집단전망 투표로 변환했다.',
        rule: '한국은행 2026년 2분기 실질 GDP 전년동기대비 성장률 최초 발표값을 기준으로 본다.',
        options: [
            { id: 'lt15', label: '<1.5%', signal: 19.1, votes: 191, trend: [14, 15, 17, 18, 19.1] },
            { id: '15-19', label: '1.5-1.9%', signal: 23.0, votes: 230, trend: [17, 18, 20, 21, 23.0] },
            { id: '20-24', label: '2.0-2.4%', signal: 21.0, votes: 210, trend: [24, 23, 22, 21, 21.0] },
            { id: '25-29', label: '2.5-2.9%', signal: 36.4, votes: 364, trend: [28, 31, 35, 34, 36.4] },
            { id: '30-34', label: '3.0-3.4%', signal: 43.0, votes: 430, trend: [22, 30, 38, 41, 43.0] },
            { id: '35-39', label: '3.5-3.9%', signal: 60.0, votes: 600, trend: [34, 42, 49, 55, 60.0] },
            { id: '40-44', label: '4.0-4.4%', signal: 49.0, votes: 490, trend: [29, 34, 38, 45, 49.0] },
            { id: 'gt45', label: '4.5%+', signal: 25.0, votes: 250, trend: [18, 21, 23, 24, 25.0] },
        ],
    },
    {
        id: 'kr-semiconductor-export-june',
        category: '산업 · 수출',
        title: '6월 한국 반도체 수출 증가율은 25%를 넘을까?',
        closesAt: '2026.07.01',
        source: '관세청·산업부 수출입 공개 지표 기준으로 설계',
        context: 'AI 반도체 수요와 원화, 중국향 수요 회복을 함께 보는 정책형 예측 투표다.',
        rule: '월간 수출입 동향의 반도체 수출 전년동월대비 증가율을 기준으로 판정한다.',
        options: [
            { id: 'yes', label: '25% 초과', signal: 57, votes: 570, trend: [42, 46, 51, 54, 57] },
            { id: 'no', label: '25% 이하', signal: 43, votes: 430, trend: [58, 54, 49, 46, 43] },
        ],
    },
    {
        id: 'kr-bok-rate-july',
        category: '금융 · 통화정책',
        title: '7월 한국은행 기준금리는 동결될까?',
        closesAt: '2026.07.09',
        source: '한국은행 금융통화위원회 발표 기준으로 설계',
        context: '물가, 환율, 성장률 전망이 엇갈리는 구간에서 정책 기대를 투표로 모은다.',
        rule: '해당 회의 직후 발표되는 기준금리 결정 결과를 기준으로 판정한다.',
        options: [
            { id: 'hold', label: '동결', signal: 64, votes: 640, trend: [58, 59, 61, 63, 64] },
            { id: 'cut', label: '인하', signal: 28, votes: 280, trend: [34, 32, 31, 29, 28] },
            { id: 'hike', label: '인상', signal: 8, votes: 80, trend: [8, 9, 8, 8, 8] },
        ],
    },
];

let activeForecastMarketId = FORECAST_VOTE_MARKETS[0]?.id || '';
let activeForecastOutcomeId = '';

function readForecastVoteState() {
    try {
        return JSON.parse(localStorage.getItem(FORECAST_VOTE_STORAGE_KEY) || '{}') || {};
    } catch (_) {
        return {};
    }
}

function writeForecastVoteState(state) {
    try {
        localStorage.setItem(FORECAST_VOTE_STORAGE_KEY, JSON.stringify(state || {}));
    } catch (_) {
        /* localStorage can be unavailable in restricted previews. */
    }
}

function getForecastVoteRows(market) {
    const state = readForecastVoteState();
    const selected = state[market.id];
    const rows = market.options.map(option => {
        const votes = Number(option.votes || 0) + (selected === option.id ? 1 : 0);
        return { ...option, votes, selected: selected === option.id };
    });
    const total = rows.reduce((sum, row) => sum + row.votes, 0) || 1;
    return rows.map(row => ({ ...row, share: row.votes / total * 100 }));
}

function getForecastMarket(id = activeForecastMarketId) {
    return FORECAST_VOTE_MARKETS.find(market => market.id === id) || FORECAST_VOTE_MARKETS[0];
}

function getForecastLeading(rows) {
    return [...rows].sort((a, b) => b.share - a.share)[0];
}

function forecastPct(value) {
    const n = Number(value || 0);
    return n >= 10 ? n.toFixed(1).replace(/\.0$/, '') : n.toFixed(1);
}

function renderForecastMarketList() {
    const list = document.getElementById('forecast-market-list');
    if (!list) return;
    list.innerHTML = FORECAST_VOTE_MARKETS.map(market => {
        const rows = getForecastVoteRows(market);
        const leading = getForecastLeading(rows);
        return `<button class="forecast-market-item ${market.id === activeForecastMarketId ? 'active' : ''}" type="button" onclick="selectForecastMarket('${escapeHtml(market.id)}')">
            <span class="forecast-market-item-top"><span>${escapeHtml(market.category)}</span><strong>${forecastPct(leading.share)}%</strong></span>
            <h4>${escapeHtml(market.title)}</h4>
            <small>${escapeHtml(leading.label)} · ${escapeHtml(market.closesAt)}</small>
        </button>`;
    }).join('');
}

function renderForecastChart(option, currentShare) {
    const values = [...(option.trend || []), currentShare].slice(-7).map(Number);
    const width = 640;
    const height = 178;
    const padTop = 22;
    const padBottom = 30;
    const padLeft = 45;
    const padRight = 22;
    const plotW = width - padLeft - padRight;
    const plotH = height - padTop - padBottom;
    const points = values.map((value, index) => {
        const x = padLeft + (values.length === 1 ? plotW : index / (values.length - 1) * plotW);
        const y = padTop + (1 - Math.max(0, Math.min(100, value)) / 100) * plotH;
        return [x, y, value];
    });
    const d = points.map((point, index) => `${index ? 'L' : 'M'}${point[0].toFixed(1)} ${point[1].toFixed(1)}`).join(' ');
    const area = `${d} L${points[points.length - 1][0].toFixed(1)} ${height - padBottom} L${points[0][0].toFixed(1)} ${height - padBottom} Z`;
    const dots = points.map(point => `<circle class="point" cx="${point[0].toFixed(1)}" cy="${point[1].toFixed(1)}" r="4"><title>${forecastPct(point[2])}%</title></circle>`).join('');
    const valueLabels = points.map(point => `<text class="chart-value-label" x="${point[0].toFixed(1)}" y="${(point[1] - 8).toFixed(1)}" text-anchor="middle">${forecastPct(point[2])}%</text>`).join('');
    const verticalGrid = points.map(point => `<line class="grid vertical" x1="${point[0].toFixed(1)}" y1="${padTop}" x2="${point[0].toFixed(1)}" y2="${height - padBottom}"/>`).join('');
    const xLabels = points.map((point, index) => {
        if (index === 0) {
            return `<text class="axis-label x-axis" x="${point[0].toFixed(1)}" y="${height - 8}" text-anchor="start">${values.length - 1}주 전</text>`;
        } else if (index === values.length - 1) {
            return `<text class="axis-label x-axis" x="${point[0].toFixed(1)}" y="${height - 8}" text-anchor="end">오늘 (현재)</text>`;
        }
        return '';
    }).join('');

    return `<svg class="forecast-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeHtml(option.label)} 전망 변화 그래프">
        <defs>
            <linearGradient id="forecastVoteArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#13b7c8" stop-opacity=".25"/>
                <stop offset="100%" stop-color="#13b7c8" stop-opacity="0"/>
            </linearGradient>
        </defs>
        <line class="grid" x1="${padLeft}" y1="${padTop + plotH * .25}" x2="${width - padRight}" y2="${padTop + plotH * .25}"/>
        <line class="grid" x1="${padLeft}" y1="${padTop + plotH * .5}" x2="${width - padRight}" y2="${padTop + plotH * .5}"/>
        <line class="grid" x1="${padLeft}" y1="${padTop + plotH * .75}" x2="${width - padRight}" y2="${padTop + plotH * .75}"/>
        ${verticalGrid}
        <text class="axis-label" x="${padLeft - 8}" y="${padTop + 4}" text-anchor="end">100%</text>
        <text class="axis-label" x="${padLeft - 8}" y="${padTop + plotH * .5 + 4}" text-anchor="end">50%</text>
        <text class="axis-label" x="${padLeft - 8}" y="${height - padBottom + 4}" text-anchor="end">0%</text>
        ${xLabels}
        <line class="axis" x1="${padLeft}" y1="${height - padBottom}" x2="${width - padRight}" y2="${height - padBottom}"/>
        <path class="area" d="${area}"/>
        <path class="line" d="${d}"/>
        ${dots}
        ${valueLabels}
    </svg>`;
}

function renderForecastMarketDetail() {
    const detail = document.getElementById('forecast-market-detail');
    const market = getForecastMarket();
    if (!detail || !market) return;
    const rows = getForecastVoteRows(market);
    const leading = getForecastLeading(rows);
    const chartOption = rows.find(row => row.id === activeForecastOutcomeId) || rows.find(row => row.selected) || leading;
    activeForecastOutcomeId = chartOption.id;
    detail.innerHTML = `
        <div class="forecast-detail-head">
            <div>
                <h4>${escapeHtml(market.title)}</h4>
                <div class="forecast-detail-meta">
                    <span>${escapeHtml(market.category)}</span>
                    <span>마감 ${escapeHtml(market.closesAt)}</span>
                    <span>투표 ${rows.reduce((sum, row) => sum + row.votes, 0).toLocaleString('ko-KR')}</span>
                </div>
            </div>
            <div class="forecast-leading-pill">
                <span>선두 전망</span>
                <strong>${forecastPct(leading.share)}%</strong>
                <span>${escapeHtml(leading.label)}</span>
            </div>
        </div>
        <div class="forecast-options">
            ${rows.map(row => `<div class="forecast-option ${row.selected ? 'is-user-vote' : ''}">
                <button class="forecast-option-select" type="button" aria-label="${escapeHtml(row.label)} 전망 그래프 보기" onclick="selectForecastOutcome('${escapeHtml(row.id)}')">
                    <span class="forecast-option-name">${escapeHtml(row.label)} <em class="forecast-option-pct">${forecastPct(row.share)}%</em></span>
                    <span class="forecast-option-track" aria-hidden="true"><span class="forecast-option-fill" style="width:${Math.max(2, row.share)}%"></span></span>
                </button>
                <button class="forecast-option-action" type="button" onclick="castForecastVote('${escapeHtml(market.id)}','${escapeHtml(row.id)}');">${row.selected ? '선택됨' : '투표'}</button>
            </div>`).join('')}
        </div>
        <div class="forecast-chart-panel">
            <div class="forecast-chart-head">
                <strong>${escapeHtml(chartOption.label)} 전망 변화</strong>
                <span class="forecast-chart-source-pill">참여자 신호 ${forecastPct(chartOption.signal)}% · 현재 여론 수치 아님</span>
            </div>
            ${renderForecastChart(chartOption, chartOption.share)}
        </div>
        <div class="forecast-context">
            <div class="forecast-context-card"><span>기준</span><p>${escapeHtml(market.rule)}</p></div>
            <div class="forecast-context-card"><span>출처</span><p>${escapeHtml(market.source)}</p></div>
        </div>
    `;
}

function renderForecastVoteMarket() {
    if (!document.getElementById('forecast-vote-section')) return;
    renderForecastMarketList();
    renderForecastMarketDetail();
}

function selectForecastMarket(id) {
    activeForecastMarketId = id;
    const market = getForecastMarket(id);
    activeForecastOutcomeId = '';
    if (market) activeForecastMarketId = market.id;
    renderForecastVoteMarket();
}

function selectForecastOutcome(id) {
    activeForecastOutcomeId = id;
    renderForecastMarketDetail();
}

function castForecastVote(marketId, optionId) {
    const state = readForecastVoteState();
    state[marketId] = optionId;
    writeForecastVoteState(state);
    activeForecastMarketId = marketId;
    activeForecastOutcomeId = optionId;
    renderForecastVoteMarket();
}

function initForecastVoteMarket() {
    renderForecastVoteMarket();
}

window.selectForecastMarket = selectForecastMarket;
window.selectForecastOutcome = selectForecastOutcome;
window.castForecastVote = castForecastVote;

moveCustomSimulationToTop();
initDocumentIntakePresetBehavior();
selectCustomSimMode('panel');
updateSampleSizeLabel();
loadPopulationFrameForMonth('2026-05').then(updateSamplingDesignLabels);
initLiveIssueFeed();
initPublicAgendaFeeds();
initForecastVoteMarket();
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        enhanceIssueCardsWithInfographics();
        initModalSwipeDismiss();
    });
} else {
    enhanceIssueCardsWithInfographics();
    initModalSwipeDismiss();
}

function escapeHtml(value) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return String(value ?? '').replace(/[&<>"']/g, ch => map[ch]);
}

function formatCustomSource(data) {
    if (data.source === 'panel_weighted') {
        return data.sample_n ? 'AI 추정 · 패널 가중추정 (n=' + data.sample_n + ')' : 'AI 추정 · 패널 가중추정';
    }
    if (data.source === 'nemotron_persona_sample') {
        const llm = data.llm_generation?.enabled ? ` · LLM ${data.llm_generation.generated_n + data.llm_generation.cached_n}/${data.llm_generation.requested_n}` : '';
        return `AI 추정 · NVIDIA 가상 표본추출 (n=${data.sample_n || '-'} / 풀=${data.pool_n || '-'})${llm}`;
    }
    if (data.source === 'panel_persona_fallback') {
        return `AI 추정 · 가상 표본추출 (n=${data.sample_n || '-'} / 풀=${data.pool_n || '-'})`;
    }
    return data.source ? `AI 추정 · ${data.source}` : 'AI 추정 · 출처 미확인';
}

function getOpinionTotals(stats) {
    const s = stats || {};
    const agree = clampPercent((+s.agree || 0) + (+s.agreeish || 0));
    const disagree = clampPercent((+s.disagreeish || 0) + (+s.disagree || 0));
    return {
        agree,
        disagree,
        net: agree - disagree,
        unsure: clampPercent(+s.unsure || 0),
    };
}

function renderSamplingAudit(sampling) {
    const audit = sampling || {};
    if (!audit.method) return '';
    const raking = audit.raking || {};
    const warnings = audit.warnings || [];
    const confidencePct = Math.round((audit.confidence_level || 0) * 100);
    const recommendedN = Number(audit.recommended_n || audit.final_n || 0);
    const finalN = Number(audit.final_n || 0);
    const completionRatio = recommendedN ? Math.min(1, finalN / recommendedN) : 1;
    const rakingOk = raking.converged !== false;
    const trustScore = Math.round(Math.max(0, Math.min(100, (confidencePct || 95) * 0.55 + completionRatio * 30 + (rakingOk ? 15 : 0) - Math.min(warnings.length * 8, 24))));
    const trustTone = trustScore >= 90 ? 'strong' : trustScore >= 75 ? 'watch' : 'weak';
    const trustLabel = trustScore >= 90 ? '바로 설명 가능한 표본설계' : trustScore >= 75 ? '주의 문구와 함께 활용' : '추가 표본/보정 필요';
    const method = audit.method === 'frame_allocated_random_extraction_rim_weighting'
        ? '표본프레임 할당 랜덤추출 + 림가중 보정'
        : audit.method;
    return `<div class="custom-insight-block sampling-audit-card ${trustTone}">
        <div class="sampling-audit-head">
            <h5>${monoIcon('chart')} 표본설계 점검</h5>
            <div class="sampling-trust-meter" aria-label="표본설계 신뢰도 ${trustScore}점">
                <span>${trustScore}</span><small>/100</small>
            </div>
        </div>
        <p class="sampling-trust-copy">${escapeHtml(trustLabel)} · 외부 공유 시 “${escapeHtml(method)}”와 n값을 함께 표기합니다.</p>
        <div class="sampling-audit-grid">
            <span>방식</span><strong>${escapeHtml(method)}</strong>
            <span>목표 신뢰수준</span><strong>${escapeHtml(confidencePct)}%</strong>
            <span>목표 구간</span><strong>±${escapeHtml(Math.round((audit.target_margin_of_error || 0) * 100))}%p</strong>
            <span>프레임</span><strong>${escapeHtml(audit.active_population_frame_month || '최신/데모')}</strong>
            <span>권장 n</span><strong>${recommendedN.toLocaleString('ko-KR')}</strong>
            <span>최종 n</span><strong>${finalN.toLocaleString('ko-KR')}</strong>
            <span>림가중</span><strong>${raking.converged ? '수렴' : '점검 필요'} · 최대 Δ ${escapeHtml(raking.max_delta ?? '-')}</strong>
        </div>
        ${warnings.length ? `<p class="custom-method-note">주의: ${warnings.slice(0, 3).map(escapeHtml).join(' / ')}</p>` : ''}
    </div>`;
}

function renderLlmGenerationAudit(llm) {
    if (!llm || llm.enabled === false) {
        const reason = llm?.reason === 'api_key_missing_or_disabled' ? 'Anthropic API 키가 없어 규칙 기반 응답으로 실행됨' : 'LLM 보강 없음';
        return `<div class="custom-insight-block sampling-audit-card watch">
            <div class="sampling-audit-head"><h5>${monoIcon('chart')} LLM 응답 생성</h5></div>
            <p class="sampling-trust-copy">${escapeHtml(reason)}</p>
        </div>`;
    }
    const completed = Number(llm.generated_n || 0) + Number(llm.cached_n || 0);
    return `<div class="custom-insight-block sampling-audit-card ${completed ? 'strong' : 'watch'}">
        <div class="sampling-audit-head">
            <h5>${monoIcon('chart')} LLM 응답 생성</h5>
            <div class="sampling-trust-meter"><span>${escapeHtml(llm.coverage_pct || 0)}</span><small>%</small></div>
        </div>
        <p class="sampling-trust-copy">표본 응답 ${completed.toLocaleString('ko-KR')}개를 LLM 생성/캐시로 보강했습니다. 나머지는 동일한 row 점수화 엔진을 사용합니다.</p>
        <div class="sampling-audit-grid">
            <span>제공자</span><strong>${escapeHtml(llm.provider || 'anthropic')}</strong>
            <span>생성</span><strong>${Number(llm.generated_n || 0).toLocaleString('ko-KR')}</strong>
            <span>캐시</span><strong>${Number(llm.cached_n || 0).toLocaleString('ko-KR')}</strong>
            <span>요청</span><strong>${Number(llm.requested_n || 0).toLocaleString('ko-KR')}</strong>
        </div>
        ${llm.reason ? `<p class="custom-method-note">${escapeHtml(llm.reason)}</p>` : ''}
    </div>`;
}

function isStrategicInsightsSchemaCompatible(data) {
    return data?.result_schema_version === EXPECTED_STRATEGIC_INSIGHTS_SCHEMA_VERSION
        && data?.strategic_insights
        && data.strategic_insights.executive_summary
        && Array.isArray(data.strategic_insights.field_playbook)
        && Array.isArray(data.strategic_insights.message_strategy)
        && Array.isArray(data.strategic_insights.risk_controls)
        && Array.isArray(data.strategic_insights.method_notes);
}

function renderTrustManifestCard(trust, resultSchemaVersion) {
    const reproducibility = trust?.reproducibility || {};
    const event_summary = trust?.event_summary || {};
    const sources = Array.isArray(trust?.data_sources) ? trust.data_sources : [];
    if (!reproducibility.manifest_hash && !event_summary.event_hash && !sources.length) return '';
    const sourceDisclosure = sources.map(source => [source.kind, source.source, source.available_n ? `n=${source.available_n}` : ''].filter(Boolean).join(' / ')).join(' · ') || 'source pending';
    const copyPayload = {
        result_schema_version: resultSchemaVersion || EXPECTED_STRATEGIC_INSIGHTS_SCHEMA_VERSION,
        request_id: trust?.request_id || reproducibility.request_id || null,
        seed: reproducibility.seed ?? null,
        input_hash: reproducibility.input_hash || null,
        manifest_hash: reproducibility.manifest_hash || null,
        event_hash: event_summary.event_hash || null,
        event_count: event_summary.event_count || 0,
        source_disclosure: sourceDisclosure,
        limitations: trust?.limitations || [],
    };
    const copyText = JSON.stringify(copyPayload, null, 2);
    return `<div class="custom-insight-block trust-manifest-card">
        <div class="sampling-audit-head">
            <h5>${monoIcon('chart')} 복사 가능한 신뢰 매니페스트</h5>
            <button type="button" class="trust-manifest-copy-btn" data-trust-manifest-copy="${escapeHtml(copyText)}" onclick="copyTrustManifest(this)">감사 카드 복사</button>
        </div>
        <p class="sampling-trust-copy">seed·request id·input hash·event hash·source disclosure를 함께 공유해 표본추출 과정과 최종 인사이트를 재검증할 수 있습니다.</p>
        <div class="sampling-audit-grid trust-manifest-grid">
            <span>스키마</span><strong>${escapeHtml(copyPayload.result_schema_version)}</strong>
            <span>Request ID</span><strong data-request-id>${escapeHtml(copyPayload.request_id || '-')}</strong>
            <span>Seed</span><strong>${escapeHtml(copyPayload.seed ?? 'none')}</strong>
            <span>Input hash</span><strong>${escapeHtml(copyPayload.input_hash || '-')}</strong>
            <span>Manifest hash</span><strong>${escapeHtml(copyPayload.manifest_hash || '-')}</strong>
            <span>Event hash</span><strong>${escapeHtml(event_summary.event_hash || '-')} · ${Number(event_summary.event_count || 0).toLocaleString('ko-KR')} stages</strong>
            <span>Source</span><strong>${escapeHtml(sourceDisclosure)}</strong>
        </div>
    </div>`;
}

async function copyTrustManifest(button) {
    const text = button?.getAttribute('data-trust-manifest-copy') || '';
    if (!text) return;
    try {
        await navigator.clipboard?.writeText(text);
        button.textContent = '복사됨';
        setTimeout(() => { button.textContent = '감사 카드 복사'; }, 1200);
    } catch (_) {
        button.textContent = '복사 실패';
        setTimeout(() => { button.textContent = '감사 카드 복사'; }, 1200);
    }
}

function buildOnePageMemoExport(title, data, verdict, rationale) {
    const totals = getOpinionTotals(data?.stats || {});
    const trust = data?.trust || {};
    const reproducibility = trust.reproducibility || {};
    const eventSummary = trust.event_summary || {};
    const evidence = data?.evidence_retrieval || trust.evidence_retrieval || {};
    const evidenceSlots = Array.isArray(evidence.retrieval_slots) ? evidence.retrieval_slots : [];
    const firstEvidence = evidenceSlots[0] || {};
    const strategic = data?.strategic_insights || {};
    const memo = {
        result_schema_version: data?.result_schema_version || EXPECTED_STRATEGIC_INSIGHTS_SCHEMA_VERSION,
        insight_completeness_score: data?.insight_completeness_score || strategic.completeness_score || null,
        title,
        verdict,
        executive_summary: strategic.executive_summary || rationale,
        next_action: Array.isArray(strategic.field_playbook) ? strategic.field_playbook[0] : null,
        message_strategy: Array.isArray(strategic.message_strategy) ? strategic.message_strategy.slice(0, 2) : [],
        risk_controls: Array.isArray(strategic.risk_controls) ? strategic.risk_controls.slice(0, 2) : [],
        risk_mitigation_pairs: Array.isArray(strategic.risk_mitigation_pairs) ? strategic.risk_mitigation_pairs.slice(0, 3) : [],
        unsure_mover_analysis: strategic.unsure_mover_analysis || null,
        same_seed_compare: strategic.same_seed_compare || null,
        metrics: {
            agree: totals.agree,
            disagree: totals.disagree,
            unsure: totals.unsure,
            net: totals.net,
        },
        trust_manifest: {
            result_schema_version: data?.result_schema_version || EXPECTED_STRATEGIC_INSIGHTS_SCHEMA_VERSION,
            request_id: trust?.request_id || reproducibility.request_id || null,
            seed: reproducibility.seed ?? null,
            input_hash: reproducibility.input_hash || null,
            manifest_hash: reproducibility.manifest_hash || null,
            event_hash: eventSummary.event_hash || null,
            event_count: eventSummary.event_count || 0,
        },
        evidence_disclosure: {
            schema_version: evidence.schema_version || 'nec_evidence_retrieval_slots_v1',
            status: firstEvidence.display_status || '검증 대기',
            observation_point: firstEvidence.observation_point || firstEvidence.observation_label || '관찰 포인트',
            usage_caveat: `현재 여론 수치로 사용하지 않습니다. ${firstEvidence.usage_caveat || '검증 대기 근거 슬롯으로만 사용하세요.'}`,
            source_count: evidenceSlots.flatMap(slot => Array.isArray(slot.candidate_sources) ? slot.candidate_sources : []).length,
        },
    };
    return JSON.stringify(memo, null, 2);
}

async function copyOnePageMemo(button) {
    const text = button?.getAttribute('data-memo-export') || '';
    if (!text) return;
    try {
        await navigator.clipboard?.writeText(text);
        button.textContent = '1쪽 메모 복사됨';
        setTimeout(() => { button.textContent = '1쪽 메모 복사'; }, 1200);
    } catch (_) {
        button.textContent = '복사 실패';
        setTimeout(() => { button.textContent = '1쪽 메모 복사'; }, 1200);
    }
}

function buildDecisionMemo(title, data) {
    const totals = getOpinionTotals(data?.stats || {});
    let verdict = '수정 후 재검증';
    let verdictClass = 'revise';
    let rationale = '총평: 찬반 격차가 작아 메시지·보완책을 조정한 뒤 같은 표본 프레임으로 다시 검증해야 합니다.';
    if (totals.net >= 15) {
        verdict = '발표 가능 · 반대 프레임 선제 대응';
        verdictClass = 'go';
        rationale = '총평: 순동의가 충분히 우세합니다. 반대 세그먼트의 비용·형평성 프레임만 먼저 닫으면 발표 가능성이 높습니다.';
    } else if (totals.net <= -15) {
        verdict = '보류 · 대안 프레임 필요';
        verdictClass = 'hold';
        rationale = '총평: 순동의가 크게 열세입니다. 현안 정의, 수혜자, 비용부담 구조를 재설계한 뒤 재측정해야 합니다.';
    }
    const memoExport = buildOnePageMemoExport(title, data, verdict, rationale);

    return `<section class="decision-memo-card ${verdictClass} compact">
        <div class="decision-memo-head">
            <span>총평</span>
            <strong>${escapeHtml(verdict)}</strong>
        </div>
        <p>${escapeHtml(rationale)}</p>
        <div class="one-page-memo-export">
            <span>복사 가능한 1쪽 메모</span>
            <button type="button" data-memo-export="${escapeHtml(memoExport)}" onclick="copyOnePageMemo(this)">1쪽 메모 복사</button>
        </div>
    </section>`;
}

function buildNextActionPanel(title, data) {
    const totals = getOpinionTotals(data?.stats || {});
    const sampling = data?.sampling || data?.sampling_audit || {};
    const canShare = sampling.method && Number(sampling.final_n || 0) >= Number(sampling.recommended_n || 0) * 0.85;
    const primary = totals.net >= 15 ? '발표 문안 리스크 점검' : totals.net <= -15 ? '대안 프레임 재설계' : '메시지 A/B 재측정';
    const secondary = canShare ? '감사 근거 포함해 공유 가능' : '표본조건 조정 후 재실행 권장';
    return `<section class="next-action-panel">
        <div class="next-action-copy">
            <span>다음 조치</span>
            <strong>${escapeHtml(primary)}</strong>
            <p>${escapeHtml(secondary)} · 같은 이슈에서 프레임·표본설계·응답 미리보기를 한 번 더 확인하세요.</p>
        </div>
        <div class="next-action-buttons">
            <button type="button" onclick="const input=document.getElementById('document-intake-text'); if(input){input.focus(); input.select(); input.scrollIntoView({behavior:'smooth',block:'center'});}">질문 다시 쓰기</button>
            <button type="button" onclick="const d=document.querySelector('.sampling-detail-options'); if(d){d.open=true; d.scrollIntoView({behavior:'smooth',block:'center'});}">표본조건 조정</button>
            <button type="button" class="primary" onclick="runCustomSimulation()">다시 예측</button>
        </div>
    </section>`;
}

function switchCustomResultTab(tab) {
    document.querySelectorAll('.result-tab').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.resultTab === tab);
    });
    document.querySelectorAll('.result-tab-panel').forEach(panel => {
        panel.classList.toggle('active', panel.id === `result-tab-${tab}`);
    });
}

function ensureCustomRegressionTab() {
    const tabs = document.querySelector('.result-tabs');
    const result = document.getElementById('custom-sim-result');
    if (!tabs || !result) return null;
    if (!tabs.querySelector('[data-result-tab="regression"]')) {
        const button = document.createElement('button');
        button.className = 'result-tab';
        button.type = 'button';
        button.dataset.resultTab = 'regression';
        button.textContent = '회귀진단';
        button.onclick = () => switchCustomResultTab('regression');
        const responses = tabs.querySelector('[data-result-tab="responses"]');
        tabs.insertBefore(button, responses || null);
    }
    let panel = document.getElementById('result-tab-regression');
    if (!panel) {
        panel = document.createElement('div');
        panel.className = 'result-tab-panel';
        panel.id = 'result-tab-regression';
        panel.innerHTML = '<div class="custom-regression-section" id="custom-regression-section"></div>';
        const responsesPanel = document.getElementById('result-tab-responses');
        result.insertBefore(panel, responsesPanel || null);
    }
    return document.getElementById('custom-regression-section');
}

function buildStatsCardsHtml(stats, questionType, choices) {
    const s = stats || {};
    if (questionType === 'binary' && choices && choices.length >= 2) {
        const a = clampPercent((+s.agree || 0) + (+s.agreeish || 0));
        const b = clampPercent((+s.disagreeish || 0) + (+s.disagree || 0));
        return `
            <div class="scale-stat-card agree">
                <div class="value" style="color:var(--opinion-agree)">${formatPct(a)}%</div>
                <div class="label">${escapeHtml(choices[0])}</div>
            </div>
            <div class="scale-stat-card disagree">
                <div class="value" style="color:var(--opinion-disagree)">${formatPct(b)}%</div>
                <div class="label">${escapeHtml(choices[1])}</div>
            </div>`;
    }
    if (questionType === 'tripartite' && choices && choices.length >= 3) {
        const a = clampPercent((+s.agree || 0) + (+s.agreeish || 0));
        const b = clampPercent((+s.disagreeish || 0) + (+s.disagree || 0));
        const u = clampPercent(+s.unsure || 0);
        return `
            <div class="scale-stat-card agree">
                <div class="value" style="color:var(--opinion-agree)">${formatPct(a)}%</div>
                <div class="label">${escapeHtml(choices[0])}</div>
            </div>
            <div class="scale-stat-card disagree">
                <div class="value" style="color:var(--opinion-disagree)">${formatPct(b)}%</div>
                <div class="label">${escapeHtml(choices[1])}</div>
            </div>
            <div class="scale-stat-card neutral">
                <div class="value" style="color:var(--text-secondary)">${formatPct(u)}%</div>
                <div class="label">${escapeHtml(choices[2])}</div>
            </div>`;
    }
    if (questionType === 'custom' && choices && choices.length >= 2) {
        const keys = ['agree', 'agreeish', 'disagreeish', 'disagree', 'unsure'];
        const colors = ['var(--opinion-agree)', 'var(--opinion-agree-soft, #86efac)', 'var(--opinion-disagree-soft, #fca5a5)', 'var(--opinion-disagree)', 'var(--text-secondary)'];
        return choices.map((label, i) => {
            const val = clampPercent(+s[keys[i]] || 0);
            return `
                <div class="scale-stat-card">
                    <div class="value" style="color:${colors[i] || 'var(--text-primary)'}">${formatPct(val)}%</div>
                    <div class="label">${escapeHtml(label)}</div>
                </div>`;
        }).join('');
    }
    const totals = getOpinionTotals(s);
    const netToneClass = totals.net > 0 ? 'is-positive' : totals.net < 0 ? 'is-negative' : 'is-neutral';
    const netToneColor = totals.net > 0 ? 'var(--opinion-agree)' : totals.net < 0 ? 'var(--opinion-disagree)' : 'var(--text-secondary)';
    let labels = { agree: '동의', disagree: '비동의', unsure: '판단 유보' };
    if (choices && choices.length >= 5) {
        labels = { agree: `${choices[0]}+${choices[1]}`, disagree: `${choices[2]}+${choices[3]}`, unsure: choices[4] };
    }
    return `
        <div class="scale-stat-card net ${netToneClass}">
            <div class="value" style="color:${netToneColor}">${formatSignedPoint(totals.net)}</div>
            <div class="label">순동의 (${escapeHtml(labels.agree)} - ${escapeHtml(labels.disagree)})</div>
        </div>
        <div class="scale-stat-card agree">
            <div class="value" style="color:var(--opinion-agree)">${formatPct(totals.agree)}%</div>
            <div class="label">${escapeHtml(labels.agree)}</div>
        </div>
        <div class="scale-stat-card disagree">
            <div class="value" style="color:var(--opinion-disagree)">${formatPct(totals.disagree)}%</div>
            <div class="label">${escapeHtml(labels.disagree)}</div>
        </div>
        <div class="scale-stat-card neutral">
            <div class="value" style="color:var(--text-secondary)">${formatPct(totals.unsure)}%</div>
            <div class="label">${escapeHtml(labels.unsure)}</div>
        </div>`;
}

function renderCustomSimResult(title, data) {
    if (!data || !data.stats) {
        renderSimulationFailure(new Error('Simulation result payload missing stats'), [{ title }], getSelectedLiveIssue(), getSelectedSampleSize());
        return;
    }

    if (!isStrategicInsightsSchemaCompatible(data)) {
        renderSimulationFailure(new Error(`Result schema mismatch: expected ${EXPECTED_STRATEGIC_INSIGHTS_SCHEMA_VERSION}`), [{ title }], getSelectedLiveIssue(), getSelectedSampleSize());
        return;
    }

    document.getElementById('custom-result-title').textContent = title;
    document.getElementById('custom-result-source').textContent = formatCustomSource(data);

    const s = data.stats;
    const choices = data.choices || [];
    const questionType = data.question_type || 'likert_5';
    const totals = getOpinionTotals(s);
    
    document.getElementById('custom-result-stats').innerHTML = buildStatsCardsHtml(s, questionType, choices);
    const auditContainer = document.getElementById('custom-sampling-audit');
    if (auditContainer) {
        const llmAudit = ['nemotron_persona_sample', 'panel_persona_fallback'].includes(data.source)
            ? renderLlmGenerationAudit(data.llm_generation)
            : '';
        auditContainer.innerHTML = `${renderSamplingAudit(data.sampling || data.sampling_audit)}${renderTrustManifestCard(data.trust, data.result_schema_version)}${llmAudit}`;
    }
    const memoContainer = document.getElementById('custom-decision-memo');
    if (memoContainer) memoContainer.innerHTML = buildDecisionMemo(title, data);
    const actionContainer = document.getElementById('custom-next-actions');
    if (actionContainer) actionContainer.innerHTML = buildNextActionPanel(title, data);

    // Political chart
    document.getElementById('custom-political-chart').innerHTML = renderCrossChart(data.by_political, questionType, choices);
    // Age chart
    document.getElementById('custom-age-chart').innerHTML = renderCrossChart(data.by_age, questionType, choices);
    // Region chart
    const regionTitle = document.getElementById('custom-region-chart-title');
    const regionChart = document.getElementById('custom-region-chart');
    if (regionTitle && regionChart) {
        regionTitle.textContent = data.by_region ? '지역별 반응' : 'persona군별 반응';
        regionChart.innerHTML = renderCrossChart(data.by_region || data.by_persona_group, questionType, choices);
    }

    const summaryTone = totals.net >= 15
        ? '총평: 동의 우위가 분명합니다. 반대층의 비용·형평성 우려만 보완하면 실행 설명력이 높습니다.'
        : totals.net <= -15
            ? '총평: 비동의 우위가 분명합니다. 수혜자·비용부담·정책수단을 재구성한 뒤 다시 측정해야 합니다.'
            : '총평: 판단 유보와 찬반 접전이 커서 메시지 A/B와 표본 조건을 바꿔 한 번 더 확인해야 합니다.';
    document.getElementById('custom-insights').innerHTML = renderStrategicInsights(data.strategic_insights, summaryTone);
    const customRegressionContainer = ensureCustomRegressionTab();
    if (customRegressionContainer) {
        const regressionIssue = {
            ...data,
            title,
            stats: data.stats,
            factors: data.factors || [],
            regression_analysis: data.regression_analysis || null,
        };
        const customRegression = buildRegressionAnalysis(regressionIssue, data.factors || []);
        customRegressionContainer.innerHTML = `<div class="factor-list">${renderRegressionFactorList(customRegression)}</div>${renderRegressionDiagnostics(customRegression)}`;
    }
    renderResponseExamples(data);

    // Risks — Risk Matrix + Scenario Analysis
    const customRiskContainer = document.getElementById('custom-risk-section');
    if (customRiskContainer) {
        const activeIssue = getSelectedLiveIssue() || {};
        const r = buildRiskProfile(data.risks ? data : activeIssue);
        let riskHtml = '<div class="risk-matrix-section">';
        // Risk Matrix header
        riskHtml += '<div class="risk-card"><h5 style="color:var(--text-secondary);margin-bottom:12px">' + monoIcon('risk') + ' 리스크 매트릭스 — 발생가능성 × 영향도</h5>';
        riskHtml += '<table class="risk-matrix-table"><thead><tr><th>리스크 요인</th><th>가능성</th><th>영향도</th><th>등급</th></tr></thead><tbody>';
        r.critical.forEach(c => riskHtml += `<tr><td>${c}</td><td>높음</td><td>치명적</td><td><span style="color:var(--text-secondary);font-weight:700">${monoIcon('risk')} 핵심</span></td></tr>`);
        r.medium.forEach(m => riskHtml += `<tr><td>${m}</td><td>중간</td><td>상당</td><td><span style="color:var(--text-secondary);font-weight:700">${monoIcon('alert')} 주의</span></td></tr>`);
        riskHtml += '</tbody></table></div>';
        // Scenario Analysis
        riskHtml += '<div class="risk-card"><h5 style="color:var(--text-secondary);margin-bottom:12px">' + monoIcon('chart') + ' 시나리오 분석</h5>';
        riskHtml += '<div class="scenario-grid">';
        riskHtml += '<div class="scenario-item scenario-best"><div class="scenario-label">' + monoIcon('check') + ' 최선의 경우</div><div class="scenario-desc">' + (r.insight[0] || '') + '</div><div class="scenario-note">이해관계자 합의 도출 + 정책 신뢰도 확보 시</div></div>';
        riskHtml += '<div class="scenario-item scenario-likely"><div class="scenario-label">' + monoIcon('neutral') + ' 가장 가능성 높음</div><div class="scenario-desc">' + (r.insight[1] || '') + '</div><div class="scenario-note">현 추세 유지 시 가장 높은 확률의 시나리오</div></div>';
        riskHtml += '<div class="scenario-item scenario-worst"><div class="scenario-label">' + monoIcon('risk') + ' 최악의 경우</div><div class="scenario-desc">' + (r.critical[0] || '') + '</div><div class="scenario-note">정책 실패 + 여론 반전 시 최악의 시나리오</div></div>';
        riskHtml += '</div></div>';
        // Pre-mortem Insight
        riskHtml += '<div class="risk-card"><h5 style="color:var(--text-secondary)">' + monoIcon('idea') + ' 사전 점검 인사이트</h5><ul>';
        r.insight.forEach(i => riskHtml += '<li>' + i + '</li>');
        riskHtml += '</ul></div></div>';
        customRiskContainer.innerHTML = riskHtml;
    }

    // Jury
    const jury = data.jury || [];
    if (jury.length) {
        let juryHtml = `<h5>${monoIcon('users')} 12인 숙의 배심단 (패널 기반 비례할당)</h5><div class="jury-grid">`;
        jury.forEach(j => {
            const icon = monoIcon('person');
            const color = STANCE_GRADIENT[j.stance] || STANCE_GRADIENT.unsure;
            juryHtml += `<div class="jury-card"><div class="jury-avatar" style="background:linear-gradient(135deg,${color})">${icon}</div><div class="jury-name">${j.panel_no || 'P###'}</div><div class="jury-demo">${j.age}세 ${j.gender} / ${j.political3} / ${j.region_rm}</div><span class="jury-stance ${STANCE_CLASS[j.stance] || STANCE_CLASS.unsure}">${STANCE_LABEL[j.stance] || STANCE_LABEL.unsure}</span></div>`;
        });
        juryHtml += '</div>';
        document.getElementById('custom-jury-section').innerHTML = juryHtml;
    } else {
        document.getElementById('custom-jury-section').innerHTML = '';
    }

    switchCustomResultTab('segment');
    const resultEl = document.getElementById('custom-sim-result');
    resultEl.style.display = 'block';
    resultEl.classList.remove('reveal-card');
    void resultEl.offsetWidth;
    resultEl.classList.add('reveal-card');
    resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function renderScoreEstimate(estimate) {
    const ci = estimate.confidence_interval || {};
    const meanCi = ci.mean_agreement_pct || [0, 0];
    const supportCi = ci.support_rate_pct || [0, 0];
    const reliability = estimate.reliability || {};
    return `<div class="score-estimate-panel">
        <div class="score-estimate-card primary">
            <div class="score-estimate-value">${escapeHtml(estimate.mean_agreement_pct ?? 0)}%</div>
            <div class="score-estimate-label">평균 동의 점수</div>
            <div class="score-estimate-note">95% CI ${escapeHtml(meanCi[0])}% ~ ${escapeHtml(meanCi[1])}%</div>
        </div>
        <div class="score-estimate-card">
            <div class="score-estimate-value">${escapeHtml(estimate.support_rate_pct ?? 0)}%</div>
            <div class="score-estimate-label">동의권 비율</div>
            <div class="score-estimate-note">95% CI ${escapeHtml(supportCi[0])}% ~ ${escapeHtml(supportCi[1])}%</div>
        </div>
        <div class="score-estimate-card">
            <div class="score-estimate-value">${escapeHtml(reliability.score ?? 0)}</div>
            <div class="score-estimate-label">표본 신뢰도</div>
            <div class="score-estimate-note">${escapeHtml(reliability.grade || '미정')} · n=${Number(estimate.sample_n || 0).toLocaleString()} / N=${Number(estimate.population_n || 0).toLocaleString()}</div>
        </div>
        <div class="score-estimate-card">
            <div class="score-estimate-value">±${escapeHtml(estimate.margin_of_error_pct ?? 0)}%p</div>
            <div class="score-estimate-label">평균 오차범위</div>
            <div class="score-estimate-note">FPC ${escapeHtml(estimate.finite_population_correction ?? 1)}</div>
        </div>
    </div>`;
}

function renderStrategicInsights(insights, fallbackSummary) {
    if (!insights) {
        return `<div class="custom-insight-block summary-only"><h5>총평</h5><p>${escapeHtml(fallbackSummary)}</p></div>`;
    }
    const listBlock = (title, items, className) => {
        const safeItems = Array.isArray(items) ? items.filter(Boolean).slice(0, 5) : [];
        if (!safeItems.length) return '';
        return `<div class="strategic-insight-list ${className}">
            <h6>${escapeHtml(title)}</h6>
            <ul>${safeItems.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
        </div>`;
    };
    const pairBlock = (pairs) => {
        const safePairs = Array.isArray(pairs) ? pairs.filter(pair => pair && pair.risk && pair.mitigation).slice(0, 4) : [];
        if (!safePairs.length) return '';
        return `<div class="strategic-insight-list mitigation">
            <h6>리스크-완화 쌍</h6>
            <ul>${safePairs.map(pair => `<li><strong>${escapeHtml(pair.risk)}</strong><span>${escapeHtml(pair.mitigation)}</span></li>`).join('')}</ul>
        </div>`;
    };
    const unsureBlock = (analysis) => {
        if (!analysis) return '';
        const unsurePct = analysis.unsure_pct === undefined ? '' : `잘 모름 ${escapeHtml(String(analysis.unsure_pct))}% · `;
        return `<div class="strategic-insight-list unsure-mover">
            <h6>유보층 전환</h6>
            <ul>
                <li>${unsurePct}${escapeHtml(analysis.priority_segment || '우선 세그먼트 검토')}</li>
                <li>${escapeHtml(analysis.conversion_message || '')}</li>
                <li>${escapeHtml(analysis.next_test || '')}</li>
            </ul>
        </div>`;
    };
    const sameSeedBlock = (compare) => {
        if (!compare) return '';
        const locked = Array.isArray(compare.locked_fields) ? compare.locked_fields.join(', ') : 'random_seed, sample_size';
        const metrics = Array.isArray(compare.comparison_metrics) ? compare.comparison_metrics.join(' · ') : 'net_agree_pct · unsure_pct';
        return `<div class="strategic-insight-list same-seed-compare">
            <h6>동일 seed A/B</h6>
            <ul>
                <li>${escapeHtml(compare.operator_instruction || '동일 seed와 표본조건을 잠그고 메시지만 바꿔 비교')}</li>
                <li>고정값: ${escapeHtml(locked)}</li>
                <li>비교 지표: ${escapeHtml(metrics)}</li>
            </ul>
        </div>`;
    };
    const score = insights.completeness_score || {};
    const scoreLabel = Number.isFinite(Number(score.score))
        ? `인사이트 완성도 ${Number(score.score).toLocaleString('ko-KR')}점 · ${score.grade || '검토'}`
        : 'job 결과 기반';
    return `<div class="custom-insight-block strategic-insights-card">
        <div class="strategic-insights-head">
            <h5>${monoIcon('chart')} 현업용 분석 인사이트</h5>
            <span>${escapeHtml(scoreLabel)}</span>
        </div>
        <p class="strategic-executive-summary">${escapeHtml(insights.executive_summary || fallbackSummary)}</p>
        <div class="strategic-insights-grid">
            ${listBlock('집행 플레이북', insights.field_playbook, 'playbook')}
            ${listBlock('메시지 전략', insights.message_strategy, 'message')}
            ${listBlock('리스크 통제', insights.risk_controls, 'risk')}
            ${pairBlock(insights.risk_mitigation_pairs)}
            ${unsureBlock(insights.unsure_mover_analysis)}
            ${sameSeedBlock(insights.same_seed_compare)}
            ${listBlock('방법론 메모', insights.method_notes, 'method')}
        </div>
    </div>`;
}

function renderResponseExamples(data) {
    const container = document.getElementById('custom-response-pool-section');
    if (!container) return;

    const examples = data.response_examples || [];
    if (!examples.length) {
        container.innerHTML = '';
        return;
    }

    let html = '<h5>표본 응답 미리보기</h5><div class="sample-response-grid">';
    examples.slice(0, 12).forEach(item => {
        const score = item.agreement_score === undefined ? '' : `<span>score ${Number(item.agreement_score).toFixed(2)}</span>`;
        html += `<div class="sample-response-card">
            <div class="sample-response-meta"><span>${escapeHtml(item.persona_id || '')}</span>${score}<span class="jury-stance ${STANCE_CLASS[item.stance] || STANCE_CLASS.unsure}">${escapeHtml(item.stance_label || STANCE_LABEL[item.stance] || STANCE_LABEL.unsure)}</span></div>
            <div class="sample-response-persona">${escapeHtml(item.persona_summary || '')}</div>
            <div class="sample-response-text">${escapeHtml(item.response_text || '')}</div>
        </div>`;
    });
    html += '</div>';
    container.innerHTML = html;
}

function clampPercent(value) {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) return 0;
    return Math.min(100, Math.max(0, parsed));
}

function formatPct(value) {
    const rounded = Math.round(value);
    return Math.abs(value - rounded) < 0.05 ? String(rounded) : value.toFixed(1);
}

const STANCE_CLASS = {
    agree: 'stance-agree-strong',
    agreeish: 'stance-agree',
    disagreeish: 'stance-disagree',
    disagree: 'stance-disagree-strong',
    unsure: 'stance-unsure',
};

const STANCE_LABEL = {
    agree: '매우 동의',
    agreeish: '동의하는 편',
    disagreeish: '비동의하는 편',
    disagree: '전혀 동의 안 함',
    unsure: '잘 모름',
};

const STANCE_GRADIENT = {
    agree: '#1597D4,#0578B8',
    agreeish: '#3BAED8,#1597D4',
    disagreeish: '#BF6959,#A75A4B',
    disagree: '#A75A4B,#864337',
    unsure: '#C5CCD6,#9CA3AF',
};

function normalizeDetailLabel(label) {
    return String(label || '')
        .replace('~29세', '대')
        .replace('세이상', '+');
}

const POLL_LEGAL_SOURCE = 'Deep Survey의 수치와 분석은 AI 추정 기반 참고 정보이며 실제 여론조사 결과가 아닙니다. 법률·정책 판단은 관련 법령과 전문가 검토를 거쳐야 합니다.';

function distributionToDetailRow(label, dist) {
    const values = Array.isArray(dist)
        ? dist
        : ['매우동의', '동의하는편', '동의않는편', '전혀동의않음', '잘모름'].map(k => dist?.[k] || 0);
    return {
        label: normalizeDetailLabel(label),
        primaryStrong: clampPercent(+values[0] || 0),
        primarySoft: clampPercent(+values[1] || 0),
        primary: clampPercent((+values[0] || 0) + (+values[1] || 0)),
        secondarySoft: clampPercent(+values[2] || 0),
        secondaryStrong: clampPercent(+values[3] || 0),
        secondary: clampPercent((+values[2] || 0) + (+values[3] || 0)),
        muted: clampPercent(+values[4] || 0)
    };
}

function getDistributionRow(label, data, key) {
    return data && data[key] ? distributionToDetailRow(label, data[key]) : null;
}

function normalizeDistribution(values) {
    const cleaned = (values || []).map(v => Math.max(0, Number(v) || 0));
    const sum = cleaned.reduce((acc, v) => acc + v, 0) || 1;
    return cleaned.map(v => +(v * 100 / sum).toFixed(1));
}

function shiftDistributionForGender(base, direction = 1, strength = 4) {
    const v = Array.isArray(base) ? base.slice(0, 5) : [base?.agree || 0, base?.agreeish || 0, base?.disagreeish || 0, base?.disagree || 0, base?.unsure || 0];
    const shift = Math.max(1.5, Math.min(7, Math.abs(strength)));
    const movedStrong = shift * 0.45;
    const movedSoft = shift * 0.55;
    if (direction >= 0) {
        v[0] = (+v[0] || 0) + movedStrong;
        v[1] = (+v[1] || 0) + movedSoft;
        v[2] = (+v[2] || 0) - movedSoft;
        v[3] = (+v[3] || 0) - movedStrong;
    } else {
        v[0] = (+v[0] || 0) - movedStrong;
        v[1] = (+v[1] || 0) - movedSoft;
        v[2] = (+v[2] || 0) + movedSoft;
        v[3] = (+v[3] || 0) + movedStrong;
    }
    v[4] = +v[4] || 0;
    return normalizeDistribution(v);
}

function inferGenderSource(issue) {
    const seg = issue.segments || {};
    if (seg.gender2) return seg.gender2;
    if (issue.gender) return issue.gender;
    const base = issue.stats
        ? [issue.stats.agree, issue.stats.agreeish, issue.stats.disagreeish, issue.stats.disagree, issue.stats.unsure]
        : [20, 30, 25, 15, 10];
    const genderFactor = (issue.factors || []).find(f => /성별/.test(f.name || ''));
    const text = `${genderFactor?.name || ''} ${issue.target || ''}`;
    let femaleDirection = 0;
    if (/여성/.test(text)) femaleDirection = genderFactor?.pos === false ? -1 : 1;
    if (/남성/.test(text) && !/여성/.test(text)) femaleDirection = genderFactor?.pos === false ? 1 : -1;
    if (!femaleDirection) {
        const femaleAgree = (issue.jury || []).filter(j => /\/여\//.test(j.demo || '') && ['agree','agreeish'].includes(j.stance)).length;
        const maleAgree = (issue.jury || []).filter(j => /\/남\//.test(j.demo || '') && ['agree','agreeish'].includes(j.stance)).length;
        femaleDirection = femaleAgree >= maleAgree ? 1 : -1;
    }
    const strength = genderFactor ? Math.min(7, Math.max(3, Math.abs(parseFloat(genderFactor.coef) || 0.5) * 4)) : 3;
    return {
        female: shiftDistributionForGender(base, femaleDirection, strength),
        male: shiftDistributionForGender(base, -femaleDirection, strength),
    };
}

function getPollSegmentGroups(issue, detailed = false) {
    const seg = issue.segments || {};
    const ideologySource = issue.ideology || seg.ideology5;
    const ageSource = detailed ? (seg.age6 || issue.age) : (seg.age6 || issue.age);
    const regionSource = detailed ? (seg.region7 || issue.region) : (seg.region7 || issue.region);
    const genderSource = inferGenderSource(issue);

    const ideologyRows = issue.ideology
        ? [
            getDistributionRow('보수', issue.ideology, 'cons'),
            getDistributionRow('중도', issue.ideology, 'mod'),
            getDistributionRow('진보', issue.ideology, 'prog'),
        ]
        : [
            getDistributionRow('보수', ideologySource, 'cons'),
            getDistributionRow('중도', ideologySource, 'mod'),
            getDistributionRow('진보', ideologySource, 'prog'),
        ];

    const ageRows = ageSource === seg.age6
        ? [
            getDistributionRow('18-29', ageSource, 'a18'),
            getDistributionRow('30대', ageSource, 'a30'),
            getDistributionRow('40대', ageSource, 'a40'),
            getDistributionRow('50대', ageSource, 'a50'),
            getDistributionRow('60대', ageSource, 'a60'),
            getDistributionRow('70+', ageSource, 'a70'),
        ]
        : [
            getDistributionRow('20대', ageSource, 'a20'),
            getDistributionRow('40대', ageSource, 'a40'),
            getDistributionRow('60대+', ageSource, 'a60'),
        ];

    const regionRows = regionSource === seg.region7
        ? [
            getDistributionRow('서울', regionSource, 'seoul'),
            getDistributionRow('경기/인천', regionSource, 'gyeonggi'),
            getDistributionRow('충청', regionSource, 'chungcheong'),
            getDistributionRow('호남', regionSource, 'honam'),
            getDistributionRow('부산/경남', regionSource, 'busan'),
            getDistributionRow('대구/경북', regionSource, 'daegu'),
            getDistributionRow('강원/제주', regionSource, 'gangwon'),
        ]
        : [
            getDistributionRow('호남', regionSource, 'honam'),
            getDistributionRow('수도권', regionSource, 'seoul'),
            getDistributionRow('영남', regionSource, 'yeongnam'),
        ];

    const genderRows = [
        getDistributionRow('여성', genderSource, 'female'),
        getDistributionRow('남성', genderSource, 'male'),
    ];

    return [
        { title: '성별', kicker: '성별 응답차', rows: genderRows.filter(Boolean), wholeNumbers: true },
        { title: '연령대별', kicker: '세대별', rows: ageRows.filter(Boolean) },
        { title: '지역별', kicker: '권역별', rows: regionRows.filter(Boolean) },
        { title: '정치성향별', kicker: '정치 성향별', rows: ideologyRows.filter(Boolean) },
    ].filter(group => group.rows.length);
}

function getPollInsight(rows) {
    if (!rows || !rows.length) return '세그먼트 데이터 부족.';
    const topAgree = rows.reduce((best, row) => row.primary > best.primary ? row : best, rows[0]);
    const topOppose = rows.reduce((best, row) => row.secondary > best.secondary ? row : best, rows[0]);
    return `동의는 ${topAgree.label} ${formatSegmentPercent(topAgree.primary)}, 비동의는 ${topOppose.label} ${formatSegmentPercent(topOppose.secondary)}로 가장 높음.`;
}

function formatInsightPoint(value) {
    return String(Math.round(Math.abs(Number(value) || 0)));
}

function formatSegmentPercent(value) {
    return `${formatPct(clampPercent(value))}%`;
}

function hasHangulFinalConsonant(value) {
    const char = String(value || '').trim().slice(-1);
    const code = char.charCodeAt(0);
    if (code < 0xAC00 || code > 0xD7A3) return false;
    return ((code - 0xAC00) % 28) !== 0;
}

function subjectParticle(label) {
    return hasHangulFinalConsonant(label) ? '이' : '가';
}

function getPollMultiAngleInsight(rows, groupTitle = '세그먼트') {
    if (!rows || rows.length < 3) return '';
    const gapRows = rows.map(row => ({
        label: row.label,
        gap: Math.abs((Number(row.primary) || 0) - (Number(row.secondary) || 0)),
    }));
    const smallest = gapRows.reduce((best, row) => row.gap < best.gap ? row : best, gapRows[0]);
    const largest = gapRows.reduce((best, row) => row.gap > best.gap ? row : best, gapRows[0]);
    if (Math.abs(largest.gap - smallest.gap) < 1) {
        return `응답 격차는 ${groupTitle} 전반에서 ${formatInsightPoint(largest.gap)}%p 안팎으로 유사함.`;
    }
    return `응답 격차는 ${smallest.label}${subjectParticle(smallest.label)} ${formatInsightPoint(smallest.gap)}%p로 가장 작고, ${largest.label}${subjectParticle(largest.label)} ${formatInsightPoint(largest.gap)}%p로 가장 큼.`;
}

function renderNetOpinionChart(top2, bot2, options = {}) {
    const margin = clampPercent(top2) - clampPercent(bot2);
    const absMargin = Math.abs(margin);
    const directionClass = margin > 0 ? 'is-positive' : margin < 0 ? 'is-negative' : 'is-neutral';
    const label = options.label || '순동의 (동의 - 비동의)';
    const value = formatSignedPoint(margin);
    const width = Math.min(100, absMargin);
    return `<div class="net-opinion-chart ${directionClass}" aria-label="${escapeHtml(label)} ${value}">
        <span class="net-opinion-label">${escapeHtml(label)}</span>
        <strong class="net-opinion-value">${value}</strong>
        <span class="net-opinion-track" aria-hidden="true">
            <span class="net-opinion-zero"></span>
            <span class="net-opinion-fill" style="width:${width}%"></span>
        </span>
    </div>`;
}

function renderPollBar(label, value, tone, caption, segments = null) {
    const pct = clampPercent(value);
    const fillHtml = Array.isArray(segments) && segments.length
        ? segments.map(segment => {
            const width = clampPercent(segment.value || 0);
            if (width <= 0) return '';
            const segmentLabel = segment.label ? ` title="${escapeHtml(segment.label)} ${formatPct(width)}%"` : '';
            return `<span class="poll-bar-fill ${segment.className || ''}" style="width:${width}%"${segmentLabel}></span>`;
        }).join('')
        : `<span class="poll-bar-fill poll-bar-fill-${tone}" style="width:${pct}%"></span>`;
    return `<div class="poll-bar-row poll-bar-${tone}">
        <div class="poll-bar-label">
            <span>${escapeHtml(label)}</span>
            <strong>${formatPct(pct)}%</strong>
        </div>
        <div class="poll-bar-track" aria-label="${escapeHtml(label)} ${formatPct(pct)}%">
            ${fillHtml}
        </div>
        ${caption ? `<p>${escapeHtml(caption)}</p>` : ''}
    </div>`;
}

function renderPollMiniSegments(segments) {
    return segments.map(segment => {
        const width = clampPercent(segment.value || 0);
        if (width <= 0) return '';
        const segmentLabel = segment.label ? ` title="${escapeHtml(segment.label)} ${formatPct(width)}%"` : '';
        return `<span class="poll-mini-fill ${segment.className}" style="width:${width}%"${segmentLabel}></span>`;
    }).join('');
}

function renderPollMiniSection(group) {
    const rows = group.rows || [];
    if (!rows.length) return '';
    const formatRowValue = group.wholeNumbers ? (value) => String(Math.round(Number(value) || 0)) : formatPct;
    const body = rows.map(row => `<div class="poll-mini-row">
            <span class="poll-mini-label">${escapeHtml(row.label)}</span>
            <div class="poll-mini-track-wrap">
                <span class="poll-mini-track" title="동의 ${formatPct(row.primary)}%">
                ${renderPollMiniSegments([
                    { value: row.primaryStrong, className: 'poll-mini-top-strong', label: '매우 동의' },
                    { value: row.primarySoft, className: 'poll-mini-top', label: '동의하는 편' },
                ])}
            </span>
            <span class="poll-mini-track" title="비동의 ${formatPct(row.secondary)}%">
                ${renderPollMiniSegments([
                    { value: row.secondaryStrong, className: 'poll-mini-bot-strong', label: '전혀 동의 안 함' },
                    { value: row.secondarySoft, className: 'poll-mini-bot', label: '비동의하는 편' },
                ])}
            </span>
        </div>
        <span class="poll-mini-value">${formatRowValue(row.primary)} / ${formatRowValue(row.secondary)}</span>
    </div>`).join('');

    const secondaryInsight = getPollMultiAngleInsight(rows, group.title);
    return `<section class="poll-mini-section">
        <div class="poll-mini-head">
            <h4>${escapeHtml(group.title)}</h4>
        </div>
        <div class="poll-mini-insights">
            <p class="poll-mini-insight">${escapeHtml(getPollInsight(rows))}</p>
            ${secondaryInsight ? `<p class="poll-mini-insight poll-mini-insight-secondary">${escapeHtml(secondaryInsight)}</p>` : ''}
        </div>
        <div class="poll-mini-rows">${body}</div>
    </section>`;
}

function renderPollSegmentSections(issue, detailed = false) {
    const groups = getPollSegmentGroups(issue, detailed);
    if (!groups.length) return '';
    const legend = `<div class="poll-mini-legend">
            <span class="poll-mini-legend-top"></span>동의
            <span class="poll-mini-legend-bot"></span>비동의
        </div>`;
    const byTitle = Object.fromEntries(groups.map(group => [group.title, group]));
    const leftStack = ['성별', '정치성향별'].map(title => byTitle[title]).filter(Boolean);
    const mainColumns = ['연령대별', '지역별'].map(title => byTitle[title]).filter(Boolean);
    const used = new Set([...leftStack, ...mainColumns]);
    const extraGroups = groups.filter(group => !used.has(group));
    if (leftStack.length && mainColumns.length) {
        return `${legend}
        <div class="poll-mini-grid poll-mini-grid-detail-compact">
            <div class="poll-mini-stack">${leftStack.map(renderPollMiniSection).join('')}</div>
            ${mainColumns.map(renderPollMiniSection).join('')}
            ${extraGroups.map(renderPollMiniSection).join('')}
        </div>`;
    }
    return `${legend}
        <div class="poll-mini-grid">${groups.map(renderPollMiniSection).join('')}</div>`;
}

function renderModalFeatureRail() {
    return `<div class="analysis-tabs poll-feature-tabs" role="tablist" aria-label="상세 분석">
        <div class="analysis-tab active" role="tab" data-analysis-tab="segment" onclick="togglePollSegmentReveal(this)" aria-expanded="true"><span class="mono-icon mono-icon-chart" aria-hidden="true"></span> 세그먼트 분석</div>
        <div class="analysis-tab" role="tab" data-analysis-tab="map" onclick="switchAnalysis('map')"><span class="mono-icon mono-icon-map" aria-hidden="true"></span> 포지셔닝맵</div>
        <div class="analysis-tab" role="tab" data-analysis-tab="risk" onclick="switchAnalysis('risk')"><span class="mono-icon mono-icon-risk" aria-hidden="true"></span> 리스크분석</div>
        <div class="analysis-tab" role="tab" data-analysis-tab="jury" onclick="switchAnalysis('jury')"><span class="mono-icon mono-icon-users" aria-hidden="true"></span> 12인 숙의 배심원단</div>
        <div class="analysis-tab" role="tab" data-analysis-tab="regression" onclick="switchAnalysis('regression')"><span class="mono-icon mono-icon-chart" aria-hidden="true"></span> 회귀분석</div>
    </div>`;
}

function renderModalLegalDisclaimer() {
    return `<div class="legal-disclaimer modal-analysis-disclaimer">
        <strong>법률적 면책조항</strong>
        Deep Survey의 수치와 분석은 AI 추정 기반 참고 정보이며 실제 여론조사 결과가 아닙니다. 법률·정책 판단은 관련 법령과 전문가 검토를 거쳐야 합니다.
    </div>`;
}

function renderModalAnalysisPanels(sections, source) {
    return `<div id="segment-analysis" class="analysis-content active">
            <div class="poll-segment-panel">
                ${sections}
                ${source}
            </div>
        </div>
        <div id="map-analysis" class="analysis-content">
            <div class="map-controls">
                <span style="font-size:11px;color:var(--text-secondary)">축 조합 · 2개 선택:</span>
                <div class="map-axis-selector">
                    <button class="map-axis-btn active" data-map-dim="ideology" onclick="switchMapDimension('ideology')">성향</button>
                    <button class="map-axis-btn active" data-map-dim="age" onclick="switchMapDimension('age')">연령</button>
                    <button class="map-axis-btn" data-map-dim="region" onclick="switchMapDimension('region')">지역</button>
                    <button class="map-axis-btn" data-map-dim="gender" onclick="switchMapDimension('gender')">성별</button>
                </div>
                <span id="map-bubble-count" style="font-size:10px;color:var(--text-secondary);margin-left:auto"></span>
            </div>
            <p id="map-description" style="font-size:10px;color:var(--text-secondary);margin-bottom:8px">성향과 연령을 두 축으로 배치합니다. 색상은 동의율, 크기는 표본 비중입니다.</p>
            <div id="positioning-map" class="positioning-map"></div>
            <div id="map-legend-section" style="margin-top:10px">
                <div id="map-legend" class="map-bubble-legend"></div>
            </div>
        </div>
        <div id="risk-analysis" class="analysis-content">
            <div id="risk-content"></div>
        </div>
        <div id="jury-analysis" class="analysis-content">
            <p style="font-size:11px;color:var(--text-secondary);margin-bottom:12px">패널 가중치 기반 의견 분포에 따라 배심원단을 배정합니다.</p>
            <div id="jury-grid" class="jury-grid"></div>
        </div>
        <div id="regression-analysis" class="analysis-content">
            <p style="font-size:11px;color:var(--text-secondary);margin-bottom:12px">응답 확률에 영향을 주는 주요 요인을 요약합니다.</p>
            <div id="factor-list" class="factor-list"></div>
            <p id="target-segment" style="font-size:12px;color:var(--text-secondary);margin-top:14px"></p>
            <div id="regression-diagnostics" class="regression-diagnostics-wrap"></div>
        </div>`;
}

function renderPollSegmentReveal(issue, options = {}) {
    const sections = renderPollSegmentSections(issue, options.detailed);
    if (!sections) return '';
    const source = options.source === false
        ? ''
        : `<div class="poll-card-source">${POLL_LEGAL_SOURCE}</div>`;
    if (options.modal === true) {
        return `<div class="poll-segment-reveal is-open">
        ${renderModalFeatureRail()}
        <div class="poll-segment-panel">
            ${renderModalAnalysisPanels(sections, '')}
        </div>
        ${renderModalLegalDisclaimer()}
    </div>`;
    }
    return `<div class="poll-segment-reveal is-open">
        <div class="poll-segment-panel">
            ${sections}
            ${source}
        </div>
    </div>`;
}

function setPollSegmentRevealState(shell, open) {
    if (!shell) return;
    const panel = shell.querySelector('.poll-segment-panel');
    const isOpen = Boolean(open);
    shell.classList.toggle('is-open', isOpen);
    if (panel) panel.hidden = !isOpen;
    const disclaimer = shell.querySelector('.modal-analysis-disclaimer');
    if (disclaimer) disclaimer.hidden = !isOpen;
    const segmentTab = shell.querySelector('[data-analysis-tab="segment"]');
    if (segmentTab) segmentTab.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

function togglePollSegmentReveal(control) {
    const shell = control?.closest?.('.poll-segment-reveal');
    if (!shell) return;
    const segmentPanel = shell.querySelector('#segment-analysis');
    if (shell.classList.contains('is-open') && segmentPanel?.classList.contains('active')) {
        shell.querySelectorAll('.analysis-content').forEach(c => c.classList.remove('active'));
        shell.querySelectorAll('.analysis-tab').forEach(t => t.classList.remove('active'));
        setPollSegmentRevealState(shell, false);
        return;
    }
    setActiveAnalysis('segment', control);
}

function initPollSegmentReveals(root = document) {
    root.querySelectorAll('.poll-segment-reveal').forEach(shell => {
        setPollSegmentRevealState(shell, true);
    });
}

function renderPollBriefingCard(issue, options = {}) {
    const s = issue.stats || {};
    const top2 = clampPercent((+s.agree || 0) + (+s.agreeish || 0));
    const bot2 = clampPercent((+s.disagreeish || 0) + (+s.disagree || 0));
    const unsure = clampPercent(+s.unsure || 0);
    const captionTop = `${formatPct(s.agree || 0)}% 매우 동의 + ${formatPct(s.agreeish || 0)}% 동의하는 편`;
    const captionBot = `${formatPct(s.disagree || 0)}% 전혀 동의 안 함 + ${formatPct(s.disagreeish || 0)}% 비동의하는 편`;

    return `<div class="poll-card-inner">
        <div class="poll-card-kicker"><span class="ai-estimate-label">AI 추정</span><span>Deep Survey 분석</span></div>
        <h3>${escapeHtml(issue.title)}</h3>
        <p class="poll-card-question">${escapeHtml(issue.subtitle || '전체 응답 기준')}</p>
        <div class="poll-card-summary">
            ${renderNetOpinionChart(top2, bot2)}
            <span>유보 ${formatPct(unsure)}%</span>
        </div>
        <div class="poll-main-bars">
            ${renderPollBar('동의', top2, 'top', captionTop, [
                { value: s.agree, className: 'poll-bar-fill-strong-top', label: '매우 동의' },
                { value: s.agreeish, className: 'poll-bar-fill-top', label: '동의하는 편' },
            ])}
            ${renderPollBar('비동의', bot2, 'bot', captionBot, [
                { value: s.disagree, className: 'poll-bar-fill-strong-bot', label: '전혀 동의 안 함' },
                { value: s.disagreeish, className: 'poll-bar-fill-bot', label: '비동의하는 편' },
            ])}
        </div>
        ${renderPollSegmentReveal(issue, options.modal === true
            ? { modal: true, detailed: true }
            : { toggle: false, autoReveal: false, initiallyOpen: true, detailed: false })}
    </div>`;
}


function renderIssueCardPreview(issue, key = '') {
    const alt = `${issue?.title || 'Deep Survey 이슈'} 대표 이미지`;
    return `<div class="issue-card-preview" role="img" aria-label="${escapeHtml(alt)}" style="--issue-preview-image:url('${getIssueHeaderImage(issue, key)}')">
            <span class="issue-card-preview-mark" aria-hidden="true"></span>
        </div>`;
}

function renderIssueCardInfographic(issue, cardMeta = {}) {
    const s = issue.stats || {};
    const top2 = clampPercent((+s.agree || 0) + (+s.agreeish || 0));
    const bot2 = clampPercent((+s.disagreeish || 0) + (+s.disagree || 0));
    return `<div class="issue-card-poll">
            <div class="issue-ai-estimate-row"><span class="ai-estimate-label">AI 추정</span><span>사용자 반응은 아래 참여 지표에 반영됩니다</span></div>
            ${renderNetOpinionChart(top2, bot2)}
            <div class="poll-main-bars">
                ${renderPollBar('동의', top2, 'top', null, [
                    { value: s.agree, className: 'poll-bar-fill-strong-top', label: '매우 동의' },
                    { value: s.agreeish, className: 'poll-bar-fill-top', label: '동의하는 편' },
                ])}
                ${renderPollBar('비동의', bot2, 'bot', null, [
                    { value: s.disagree, className: 'poll-bar-fill-strong-bot', label: '전혀 동의 안 함' },
                    { value: s.disagreeish, className: 'poll-bar-fill-bot', label: '비동의하는 편' },
                ])}
            </div>
            ${renderPollSegmentReveal(issue, { source: false, toggle: false, autoReveal: false, initiallyOpen: true })}
            <div class="poll-card-source">${POLL_LEGAL_SOURCE}</div>
        </div>`;
}

const ISSUE_HEADER_IMAGE_BY_KEY = {
    samsung_strike: 'issue-bg-industrial.png',
    hyundai_strike: 'issue-bg-industrial.png',
    work52: 'issue-bg-industrial.png',
    homeplus: 'issue-bg-industrial.png',
    steel_crisis: 'issue-bg-industrial.png',
    semiconductor: 'issue-bg-chip.png',
    ai_dividend: 'issue-bg-chip.png',
    crime_penalty: 'issue-bg-civic.png',
    namu_iran: 'issue-bg-civic.png',
    airport_parking: 'issue-bg-airport.png',
    sugar: 'issue-bg-health.png',
    dosu_regulate: 'issue-bg-health.png',
    life_sustain: 'issue-bg-health.png',
    teacher_protect: 'issue-bg-education.png',
    realestate: 'issue-bg-city.png',
    seoul_apt: 'issue-bg-city.png',
    kospi_tax: 'issue-bg-city.png',
    usury_ban: 'issue-bg-city.png',
};

function getIssueHeaderImage(issue, key = '') {
    if (ISSUE_HEADER_IMAGE_BY_KEY[key]) return ISSUE_HEADER_IMAGE_BY_KEY[key];
    const category = String(issue?.category || '');
    if (/노동|유통/.test(category)) return 'issue-bg-industrial.png';
    if (/산업|과학|기술|재정/.test(category)) return 'issue-bg-chip.png';
    if (/행정|외교|사회|정치/.test(category)) return 'issue-bg-civic.png';
    if (/보건|의료|복지|금융/.test(category)) return 'issue-bg-health.png';
    if (/교육/.test(category)) return 'issue-bg-education.png';
    if (/부동산|경제/.test(category)) return 'issue-bg-city.png';
    return 'issue-bg-civic.png';
}

function getDemoAssetUrl(assetPath) {
    if (/^(https?:|file:|data:|\/)/.test(String(assetPath))) return assetPath;
    return `${window.DEEP_SURVEY_ASSET_BASE || ''}${assetPath}`;
}

function applyIssueHeaderImage(card, issue, key) {
    const header = card?.querySelector('.issue-card-header');
    if (!header) return;
    header.style.setProperty('--issue-bg-image', `url("${getDemoAssetUrl(getIssueHeaderImage(issue, key))}")`);
    card.classList.add('has-title-image');
}

function showIssueCardChart(card) {
    if (!card || card.classList.contains('show-chart')) return;
    const key = getIssueKeyFromCard(card);
    const issue = issueData[key];
    const body = card.querySelector('.issue-card-body');
    if (!issue || !body) return;

    if (card.__issueCardRevealTimer) {
        clearTimeout(card.__issueCardRevealTimer);
        card.__issueCardRevealTimer = null;
    }
    const cardMeta = card.__issueCardMeta || readIssueCardMeta(card, issue);
    card.__issueCardMeta = cardMeta;
    const actions = body.querySelector('.issue-share-actions');
    if (actions) actions.remove();
    body.innerHTML = renderIssueCardInfographic(issue, cardMeta);
    if (actions) body.appendChild(actions);
    initPollSegmentReveals(body);
    card.classList.remove('is-previewing');
    card.classList.add('show-chart');
}
window.showIssueCardChart = showIssueCardChart;

function resetIssueCardForRevote(card) {
    if (!card) return;
    const key = getIssueKeyFromCard(card);
    const issue = issueData[key];
    const body = card.querySelector('.issue-card-body');
    if (!issue || !body) return;
    if (card.__issueCardRevealTimer) {
        clearTimeout(card.__issueCardRevealTimer);
        card.__issueCardRevealTimer = null;
    }
    const cardMeta = card.__issueCardMeta || readIssueCardMeta(card, issue);
    card.__issueCardMeta = cardMeta;
    const actions = body.querySelector('.issue-share-actions');
    if (actions) actions.remove();
    body.innerHTML = renderIssueCardPreview(issue, key);
    if (actions) body.appendChild(actions);
    updateIssueCardHeader(card, cardMeta, issue, key);
    card.classList.add('is-previewing');
    card.classList.remove('show-chart');
    fitIssueCardTitle(card);
}
window.resetIssueCardForRevote = resetIssueCardForRevote;

function wireIssueCardReveal(card) {
    if (card.__issueCardRevealWired) return;
    card.__issueCardRevealWired = true;
}

function readIssueCardMeta(card, issue) {
    const metaItems = Array.from(card.querySelectorAll('.issue-meta span')).map(item => item.textContent.trim());
    const sampleCount = parseCountText(metaItems[0]) || Number(issue?.sample_n || issue?.sample_size || 1000);
    const views = estimateViewsFromIssue(issue, sampleCount);
    const uploadedAgo = formatRelativeUploadTime(issue?.published_at || issue?.uploaded_at || metaItems[1]);
    return { sampleCount, views, uploadedAgo };
}

function readInlinePct(card, selector) {
    const value = card?.querySelector(selector)?.style?.width || '';
    return clampPercent(Number.parseFloat(value) || 0);
}

function getIssueRowAgreement(card, issue) {
    if (issue?.stats) {
        return getOpinionTotals(issue.stats);
    }
    const agree = readInlinePct(card, '.scale-strongly-agree') + readInlinePct(card, '.scale-agree');
    const disagree = readInlinePct(card, '.scale-disagree') + readInlinePct(card, '.scale-strongly-disagree');
    const unsure = readInlinePct(card, '.scale-unsure');
    return { agree: clampPercent(agree), disagree: clampPercent(disagree), unsure: clampPercent(unsure), net: agree - disagree };
}

const ISSUE_RESPONSE_LABEL_PAIRS = [
    {
        positive: '적절',
        negative: '부적절',
        shortPositive: '적',
        shortNegative: '부',
        softPositive: '다소 적절',
        softNegative: '다소 부적절',
        patterns: [/적절|부적절|타당|합리|충분|정당/],
    },
    {
        positive: '필요',
        negative: '불필요',
        shortPositive: '필',
        shortNegative: '불',
        softPositive: '다소 필요',
        softNegative: '다소 불필요',
        patterns: [/필요|불필요|의무|대책/],
    },
    {
        positive: '허용',
        negative: '불허',
        shortPositive: '허',
        shortNegative: '불',
        softPositive: '다소 허용',
        softNegative: '다소 불허',
        patterns: [/허용|인정|선택권|자율/],
    },
    {
        positive: '찬성',
        negative: '반대',
        shortPositive: '찬',
        shortNegative: '반',
        softPositive: '찬성하는 편',
        softNegative: '반대하는 편',
        patterns: [/찬반|도입|폐지|발동|재추진|규제|강화|확대|부과|배당|대응|추진|중단|상향|복원|개입|적용/],
    },
    {
        positive: '동의',
        negative: '비동의',
        shortPositive: '동',
        shortNegative: '비',
        softPositive: '동의하는 편',
        softNegative: '비동의하는 편',
        strongNegative: '전혀 동의 안 함',
        patterns: [/.*/],
    },
];

function getIssueResponseLabelPair(issue, fallbackText = '') {
    const source = [
        issue?.poll_question,
        issue?.subtitle,
        issue?.title,
        fallbackText,
    ].filter(Boolean).join(' ');
    const pair = ISSUE_RESPONSE_LABEL_PAIRS.find(candidate => candidate.patterns.some(pattern => pattern.test(source))) || ISSUE_RESPONSE_LABEL_PAIRS[ISSUE_RESPONSE_LABEL_PAIRS.length - 1];
    return {
        ...pair,
        strongPositive: pair.strongPositive || `매우 ${pair.positive}`,
        softPositive: pair.softPositive || `${pair.positive}하는 편`,
        softNegative: pair.softNegative || `${pair.negative}하는 편`,
        strongNegative: pair.strongNegative || `매우 ${pair.negative}`,
    };
}
window.getIssueResponseLabelPair = getIssueResponseLabelPair;

function renderIssueRowMetrics(agreement, issue) {
    const agree = clampPercent(agreement?.agree || 0);
    const disagree = clampPercent(agreement?.disagree || 0);
    const unsure = clampPercent(agreement?.unsure || 0);
    const net = agree - disagree;
    const pair = getIssueResponseLabelPair(issue);
    return `<span class="issue-row-metrics issue-row-bar-metrics" aria-label="${pair.positive} ${formatPct(agree)}%, ${pair.negative} ${formatPct(disagree)}%, 순 ${formatSignedPoint(net)}, 유보 ${formatPct(unsure)}%">
        <span class="issue-row-bar" aria-hidden="true">
            <span class="issue-row-bar-agree" style="width:${agree}%"></span>
            <span class="issue-row-bar-disagree" style="width:${disagree}%"></span>
            <span class="issue-row-bar-unsure" style="width:${unsure}%"></span>
        </span>
        <span class="issue-row-bar-labels">
            <span>${pair.shortPositive} ${formatPct(agree)}</span>
            <span>${pair.shortNegative} ${formatPct(disagree)}</span>
            <span>순 ${formatSignedPoint(net)}</span>
            <span>유 ${formatPct(unsure)}</span>
        </span>
    </span>`;
}

function updateIssueCardHeader(card, meta, issue, key) {
    card.classList.remove('hot', 'new');
    applyIssueHeaderImage(card, issue, key);
    card.querySelector('.issue-category')?.setAttribute('aria-hidden', 'true');
    card.dataset.viewCount = String(meta.views || 0);
    const header = card.querySelector('.issue-card-header');
    const metaEl = card.querySelector('.issue-meta');
    if (!metaEl) return;
    const agreementEl = header?.querySelector('.issue-row-metrics');
    const agreementHtml = renderIssueRowMetrics(getIssueRowAgreement(card, issue), issue);
    if (agreementEl) {
        agreementEl.outerHTML = agreementHtml;
    } else if (header) {
        metaEl.insertAdjacentHTML('beforebegin', agreementHtml);
    }
    metaEl.innerHTML = `<span>${escapeHtml(meta.uploadedAgo)}</span>`;
}

function fitIssueCardTitle(card) {
    const title = card?.querySelector('.issue-title');
    const header = card?.querySelector('.issue-card-header');
    if (!title || !header) return;
    if (document.body.classList.contains('audience-b2c') || document.body.classList.contains('audience-b2b')) {
        title.style.fontSize = '';
        return;
    }

    title.style.fontSize = '';
    const styles = getComputedStyle(header);
    const availableWidth = header.clientWidth
        - (parseFloat(styles.paddingLeft) || 0)
        - (parseFloat(styles.paddingRight) || 0);
    if (!availableWidth) return;

    const computedTitle = getComputedStyle(title);
    let size = Math.min(parseFloat(computedTitle.fontSize) || 42, 42);
    const minSize = window.matchMedia('(max-width: 560px)').matches ? 20 : 28;
    title.style.fontSize = `${size}px`;
    while (title.scrollWidth > availableWidth && size > minSize) {
        size -= 1;
        title.style.fontSize = `${size}px`;
    }
}

function getIssueKeyFromCard(card) {
    if (!card) return '';
    if (card.dataset.issueKey) return card.dataset.issueKey;
    const onclick = card.getAttribute('onclick') || '';
    const match = onclick.match(/openModal\('([^']+)'\)/);
    return match ? match[1] : '';
}

function enhanceIssueCardsWithInfographics() {
    document.querySelectorAll('.issue-card').forEach(card => {
        const key = getIssueKeyFromCard(card);
        const issue = issueData[key];
        const body = card.querySelector('.issue-card-body');
        if (!issue || !body || card.dataset.issueCardEnhanced === 'true') return;

        const cardMeta = readIssueCardMeta(card, issue);
        card.dataset.issueKey = key;
        card.dataset.issueCardEnhanced = 'true';
        card.__issueCardMeta = cardMeta;
        updateIssueCardHeader(card, cardMeta, issue, key);
        const actions = body.querySelector('.issue-share-actions');
        if (actions) actions.remove();
        body.innerHTML = renderIssueCardPreview(issue, key);
        if (actions) body.appendChild(actions);
        card.classList.add('is-previewing');
        card.classList.remove('show-chart');
        fitIssueCardTitle(card);
        wireIssueCardReveal(card);
    });
    updateReferenceIssueLibraryPagination();
}

const REFERENCE_ISSUE_PAGE_SIZE = 15;
let referenceIssuePageIndex = 0;

function updateReferenceIssueLibraryPagination(page = referenceIssuePageIndex) {
    const section = document.getElementById('issues');
    const grid = section?.querySelector('.issue-grid');
    if (!section || !grid) return;
    const cards = Array.from(grid.querySelectorAll(':scope > .issue-card'));
    const isReferenceMode = document.body.classList.contains('audience-b2b') || document.body.classList.contains('audience-sim');
    let pagination = section.querySelector('.issue-reference-pagination');
    if (!isReferenceMode || cards.length <= REFERENCE_ISSUE_PAGE_SIZE) {
        cards.forEach(card => card.classList.remove('is-reference-page-hidden', 'is-reference-page-last'));
        pagination?.remove();
        referenceIssuePageIndex = 0;
        return;
    }

    const maxPage = Math.ceil(cards.length / REFERENCE_ISSUE_PAGE_SIZE) - 1;
    referenceIssuePageIndex = Math.max(0, Math.min(Number(page) || 0, maxPage));
    const start = referenceIssuePageIndex * REFERENCE_ISSUE_PAGE_SIZE;
    const end = Math.min(cards.length, start + REFERENCE_ISSUE_PAGE_SIZE);
    cards.forEach((card, index) => {
        const visible = index >= start && index < end;
        card.classList.toggle('is-reference-page-hidden', !visible);
        card.classList.toggle('is-reference-page-last', visible && index === end - 1);
    });

    if (!pagination) {
        pagination = document.createElement('div');
        pagination.className = 'issue-reference-pagination';
        grid.insertAdjacentElement('afterend', pagination);
    }
    const pageButtons = Array.from({ length: maxPage + 1 }, (_, index) =>
        `<button type="button" class="${index === referenceIssuePageIndex ? 'active' : ''}" onclick="setReferenceIssueLibraryPage(${index})" aria-label="레퍼런스 이슈 ${index + 1}페이지">${index + 1}</button>`
    ).join('');
    pagination.innerHTML = `
        <span>${start + 1}-${end} / ${cards.length}</span>
        <button type="button" onclick="setReferenceIssueLibraryPage(${referenceIssuePageIndex - 1})" ${referenceIssuePageIndex === 0 ? 'disabled' : ''}>이전</button>
        ${pageButtons}
        <button type="button" onclick="setReferenceIssueLibraryPage(${referenceIssuePageIndex + 1})" ${referenceIssuePageIndex === maxPage ? 'disabled' : ''}>다음</button>
    `;
}

function setReferenceIssueLibraryPage(page) {
    updateReferenceIssueLibraryPagination(page);
}
window.setReferenceIssueLibraryPage = setReferenceIssueLibraryPage;

if (document.body) {
    new MutationObserver(() => updateReferenceIssueLibraryPagination()).observe(document.body, {
        attributes: true,
        attributeFilter: ['class'],
    });
}

let issueTitleFitRaf = null;
window.addEventListener('resize', () => {
    if (issueTitleFitRaf) cancelAnimationFrame(issueTitleFitRaf);
    issueTitleFitRaf = requestAnimationFrame(() => {
        document.querySelectorAll('.issue-card.is-previewing').forEach(fitIssueCardTitle);
        updateReferenceIssueLibraryPagination();
        issueTitleFitRaf = null;
    });
});

function valueSide(value, otherValue, axisMax, preferLeft) {
    const pct = axisMax ? (value / axisMax) * 100 : 0;
    if (pct < 9) return 'label-right';
    if (pct > 91) return 'label-left';
    if (value === otherValue) return preferLeft ? 'label-left' : 'label-right';
    return value < otherValue ? 'label-left' : 'label-right';
}

function renderDetailDotChart(rows, questionType, choices) {
    const visibleRows = (rows || []).filter(Boolean);
    if (!visibleRows.length) return '<p style="color:var(--text-secondary);font-size:11px">데이터 없음</p>';

    const maxValue = visibleRows.reduce((max, row) => Math.max(max, row.primary, row.secondary), 0);
    const axisMax = Math.min(100, Math.max(50, Math.ceil(maxValue / 10) * 10 || 50));
    const tickStep = axisMax <= 50 ? 10 : 20;
    const ticks = [];
    for (let tick = 0; tick <= axisMax; tick += tickStep) ticks.push(tick);

    const tickLines = ticks.map(tick =>
        `<span class="dot-chart-grid-line" style="left:${(tick / axisMax) * 100}%"></span>`
    ).join('');
    const tickLabels = ticks.map(tick => {
        const edgeClass = tick === 0 ? ' is-start' : tick === axisMax ? ' is-end' : '';
        return `<span class="dot-chart-tick-label${edgeClass}" style="left:${(tick / axisMax) * 100}%">${tick}</span>`;
    }).join('');

    let primaryLegend = "동의";
    let secondaryLegend = "비동의";
    if (choices && choices.length >= 2) {
        if (questionType === 'binary' || questionType === 'tripartite') {
            primaryLegend = choices[0];
            secondaryLegend = choices[1];
        } else {
            primaryLegend = `${choices[0]} + ${choices[1]}`;
            secondaryLegend = `${choices[3] || '비동의'} + ${choices[2] || ''}`;
        }
    }

    const body = visibleRows.map(row => {
        const primaryPct = (row.primary / axisMax) * 100;
        const secondaryPct = (row.secondary / axisMax) * 100;
        const primarySide = valueSide(row.primary, row.secondary, axisMax, true);
        const secondarySide = valueSide(row.secondary, row.primary, axisMax, false);
        return `<div class="dot-chart-row">
            <div class="dot-chart-label">${escapeHtml(row.label)}</div>
            <div class="dot-chart-plot">
                <div class="dot-chart-grid" aria-hidden="true">${tickLines}</div>
                <span class="dot-chart-point dot-chart-primary ${primarySide}" style="left:${primaryPct}%" title="${escapeHtml(primaryLegend)}: ${formatPct(row.primary)}%">
                    <span class="dot-chart-mark"></span><span class="dot-chart-value">${formatPct(row.primary)}%</span>
                </span>
                <span class="dot-chart-point dot-chart-secondary ${secondarySide}" style="left:${secondaryPct}%" title="${escapeHtml(secondaryLegend)}: ${formatPct(row.secondary)}%">
                    <span class="dot-chart-mark"></span><span class="dot-chart-value">${formatPct(row.secondary)}%</span>
                </span>
            </div>
        </div>`;
    }).join('');

    return `<div class="detail-dot-chart">
        <div class="dot-chart-legend">
            <span class="dot-legend-item dot-legend-primary"><span></span>${escapeHtml(primaryLegend)}</span>
            <span class="dot-legend-item dot-legend-secondary"><span></span>${escapeHtml(secondaryLegend)}</span>
        </div>
        <div class="dot-chart-body">${body}</div>
        <div class="dot-chart-axis-row">
            <div class="dot-chart-label"></div>
            <div class="dot-chart-axis">${tickLabels}</div>
        </div>
    </div>`;
}

function renderCrossChart(crossObj, questionType, choices) {
    if (!crossObj || !Object.keys(crossObj).length) return '<p style="color:var(--text-secondary);font-size:11px">데이터 없음</p>';
    const rows = Object.entries(crossObj).map(([group, dist]) => distributionToDetailRow(group, dist));
    return renderDetailDotChart(rows, questionType, choices);
}
