(() => {
    function buildBetaIntakeText() {
        return [
            'Deep Survey 의뢰 브리프',
            '',
            '1. 이름/조직:',
            '2. 조직 유형(PA/GR, 의원실, 정책연구소, 기타):',
            '3. live trigger와 마감시점:',
            '4. 점검할 정책/메시지 자료(공개/비식별/비밀 여부):',
            '5. downstream use(클라이언트 메모, 청문회 준비, 보도자료, 내부브리핑 등):',
            '6. buyer/funding path:',
            '7. 희망 turnaround(24h/72h/1주):',
            '8. 가격 anchor(150만원/300만원/월500만원 retainer/논의):',
            '',
            '주의: 본 분석은 정책/메시지 리스크를 사전 탐색하는 decision-support 워크플로이며 실제 여론조사, 공표 가능한 선거여론조사, 법률 자문, 정책 효과 보장을 대체하지 않습니다.'
        ].join('\n');
    }

    function ensureBetaIntakeModal() {
        let overlay = document.querySelector('.beta-intake-overlay');
        if (overlay) return overlay;
        overlay = document.createElement('div');
        overlay.className = 'beta-intake-overlay';
        overlay.hidden = true;
        overlay.innerHTML = `
            <section class="beta-intake-modal" role="dialog" aria-modal="true" aria-labelledby="beta-intake-title">
                <div class="beta-intake-header">
                    <div>
                        <span class="beta-cta-kicker">Deep Survey Advisory Intake</span>
                        <h2 id="beta-intake-title">24–72h 정책/메시지 pre-mortem 의뢰</h2>
                    </div>
                    <button type="button" class="beta-intake-close" data-beta-intake-close aria-label="닫기">×</button>
                </div>
                <p class="beta-intake-help">아래 브리프를 복사해 보내면 CQA 5/5 기준으로 분석 가능성과 산출물 범위를 판단합니다. 공개 또는 비식별 자료 기준으로 시작합니다.</p>
                <textarea class="beta-intake-text" readonly></textarea>
                <div class="beta-intake-actions">
                    <button type="button" data-beta-copy>브리프 복사</button>
                    <a data-beta-mailto href="#">메일 앱으로 열기</a>
                </div>
                <p class="beta-intake-caveat">본 분석은 decision-support이며 실제 여론조사·법률 자문·정책 효과 보장을 대체하지 않습니다.</p>
            </section>
        `;
        overlay.addEventListener('click', event => {
            if (event.target === overlay || event.target.closest('[data-beta-intake-close]')) {
                overlay.hidden = true;
                return;
            }
            if (event.target.closest('[data-beta-copy]')) {
                const text = overlay.querySelector('.beta-intake-text')?.value || buildBetaIntakeText();
                navigator.clipboard?.writeText(text).then(() => {
                    event.target.textContent = '복사됨';
                    setTimeout(() => { event.target.textContent = '브리프 복사'; }, 1200);
                }).catch(() => {
                    overlay.querySelector('.beta-intake-text')?.select();
                });
            }
        });
        document.body.appendChild(overlay);
        return overlay;
    }

    window.openBetaIntake = function openBetaIntake() {
        const overlay = ensureBetaIntakeModal();
        const text = buildBetaIntakeText();
        const textarea = overlay.querySelector('.beta-intake-text');
        const mailto = overlay.querySelector('[data-beta-mailto]');
        if (textarea) textarea.value = text;
        if (mailto) {
            mailto.href = `mailto:?subject=${encodeURIComponent('Deep Survey 의뢰 브리프')}&body=${encodeURIComponent(text)}`;
        }
        overlay.hidden = false;
    };
})();
