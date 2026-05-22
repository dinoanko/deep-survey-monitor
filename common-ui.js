(function () {
    const root = document.documentElement;
    const storageKey = 'deep-survey-theme';
    const audienceStorageKey = 'deep-survey-audience';
    const userStorageKey = 'deep-survey-user';
    const savedIssuesStorageKey = 'deep-survey-saved-issues';
    const socialStorageKey = 'deep-survey-issue-social';
    const commentsStorageKey = 'deep-survey-issue-comments';
    const accountPreferencesStorageKey = 'deep-survey-account-preferences';
    const accountActivityStorageKey = 'deep-survey-account-activity';
    const defaultAccountPreferences = Object.freeze({
        defaultAudience: 'home',
        evidenceFirst: true,
        safeMode: true,
        compactCards: false,
        reduceMotion: false,
        digest: 'weekly',
    });
    let pendingSaveCard = null;
    let pendingCommentCard = null;
    let issueMenuDocumentListenerBound = false;
    let issueViewObserver = null;
    let accountModalReturnFocus = null;
    let audienceTransitionTimer = null;
    const audienceModeOrder = ['forecast', 'sim', 'home', 'parliament', 'government'];

    function normalizeAudienceMode(mode) {
        if (mode === 'b2b' || mode === 'simulation') return 'sim';
        if (mode === 'b2c' || mode === 'main') return 'home';
        return audienceModeOrder.includes(mode) ? mode : 'home';
    }

    function readSavedTheme() {
        try {
            return localStorage.getItem(storageKey);
        } catch (_) {
            return null;
        }
    }

    function writeSavedTheme(theme) {
        try {
            localStorage.setItem(storageKey, theme);
        } catch (_) {
            // Theme persistence is optional for file:// previews.
        }
    }

    function getSystemTheme() {
        try {
            return window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ? 'dark' : 'light';
        } catch (_) {
            return 'light';
        }
    }

    function normalizeThemeMode(mode) {
        return ['system', 'light', 'dark'].includes(mode) ? mode : 'system';
    }

    function getCurrentThemeMode() {
        return normalizeThemeMode(root.dataset.themeMode || readSavedTheme() || 'light');
    }

    function resolveTheme(mode) {
        return normalizeThemeMode(mode) === 'system' ? getSystemTheme() : normalizeThemeMode(mode);
    }

    function updateThemeButton(mode, resolvedTheme = resolveTheme(mode)) {
        const icon = document.getElementById('theme-icon');
        const text = document.getElementById('theme-text');
        if (icon) {
            icon.className = `mono-icon mono-icon-${resolvedTheme === 'dark' ? 'moon' : 'sun'}`;
            icon.setAttribute('aria-hidden', 'true');
        }
        if (text) {
            const label = mode === 'system' ? `시스템 · ${resolvedTheme === 'dark' ? '다크' : '라이트'}` : (resolvedTheme === 'dark' ? '다크' : '라이트');
            text.textContent = label;
        }
    }

    function applyTheme(mode = 'light', persist = false) {
        const nextMode = normalizeThemeMode(mode);
        const resolvedTheme = resolveTheme(nextMode);
        root.dataset.themeMode = nextMode;
        root.setAttribute('data-theme', resolvedTheme);
        updateThemeButton(nextMode, resolvedTheme);
        document.querySelectorAll('[data-theme-choice]').forEach(button => {
            const active = button.dataset.themeChoice === nextMode;
            button.classList.toggle('active', active);
            button.setAttribute('aria-pressed', active ? 'true' : 'false');
        });
        if (persist) writeSavedTheme(nextMode);
    }

    window.selectThemeMode = function (mode) {
        applyTheme(mode, true);
        renderSettingsMenu();
    };

    window.toggleTheme = function () {
        const current = getCurrentThemeMode();
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next, true);
    };

    const initialTheme = readSavedTheme() || 'light';
    applyTheme(initialTheme, false);

    const systemThemeMedia = window.matchMedia?.('(prefers-color-scheme: dark)');
    systemThemeMedia?.addEventListener?.('change', () => {
        if (getCurrentThemeMode() === 'system') {
            applyTheme('system', false);
            renderSettingsMenu();
        }
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => applyTheme(getCurrentThemeMode(), false));
    } else {
        applyTheme(getCurrentThemeMode(), false);
    }

    function readSavedAudienceMode() {
        try {
            return localStorage.getItem(audienceStorageKey);
        } catch (_) {
            return null;
        }
    }

    function writeSavedAudienceMode(mode) {
        try {
            localStorage.setItem(audienceStorageKey, mode);
        } catch (_) {
            // Audience mode persistence is optional for file:// previews.
        }
    }

    function applyAudienceMode(mode, persist) {
        const nextMode = normalizeAudienceMode(mode);
        const classTargets = [root, document.body];
        classTargets.forEach(target => {
            target.classList.toggle('audience-home', nextMode === 'home');
            target.classList.toggle('audience-forecast', nextMode === 'forecast');
            target.classList.toggle('audience-sim', nextMode === 'sim');
            target.classList.toggle('audience-parliament', nextMode === 'parliament');
            target.classList.toggle('audience-government', nextMode === 'government');
            target.classList.toggle('audience-b2c', nextMode === 'home');
            target.classList.toggle('audience-b2b', nextMode === 'sim');
        });
        document.querySelectorAll('[data-audience-mode]').forEach(button => {
            const active = normalizeAudienceMode(button.dataset.audienceMode) === nextMode;
            button.classList.toggle('active', active);
            button.setAttribute('aria-selected', active ? 'true' : 'false');
            if (button.classList.contains('bottom-tab')) {
                button.setAttribute('aria-current', active ? 'page' : 'false');
            }
        });
        if (persist) writeSavedAudienceMode(nextMode);
    }

    function getActiveAudienceMode() {
        if (document.body.classList.contains('audience-government')) return 'government';
        if (document.body.classList.contains('audience-parliament')) return 'parliament';
        if (document.body.classList.contains('audience-forecast')) return 'forecast';
        if (document.body.classList.contains('audience-sim') || document.body.classList.contains('audience-b2b')) return 'sim';
        return 'home';
    }

    function getAudienceTarget(mode) {
        const nextMode = normalizeAudienceMode(mode);
        if (nextMode === 'forecast') return document.getElementById('forecast-vote-section');
        if (nextMode === 'sim') return document.querySelector('.custom-sim-section');
        if (nextMode === 'parliament') return document.getElementById('parliament-page');
        if (nextMode === 'government') return document.getElementById('government-page');
        return document.getElementById('issues');
    }

    function scrollAudienceTarget(mode, behavior = 'smooth') {
        getAudienceTarget(mode)?.scrollIntoView({ behavior, block: 'start' });
    }

    function animateAudienceTransition(direction) {
        if (!direction) return;
        const className = direction === 'right' ? 'page-slide-right' : 'page-slide-left';
        document.body.classList.remove('page-slide-left', 'page-slide-right');
        window.clearTimeout(audienceTransitionTimer);
        window.requestAnimationFrame(() => {
            document.body.classList.add(className);
            audienceTransitionTimer = window.setTimeout(() => {
                document.body.classList.remove('page-slide-left', 'page-slide-right');
            }, 260);
        });
    }

    window.selectAudienceMode = function (mode, options = {}) {
        const nextMode = normalizeAudienceMode(mode);
        if (document.querySelector('.modal-overlay.active') && typeof window.closeModal === 'function') {
            window.closeModal();
        }
        applyAudienceMode(nextMode, true);
        animateAudienceTransition(options.direction);
        if (options.scroll !== false) {
            window.requestAnimationFrame(() => scrollAudienceTarget(nextMode, options.behavior || 'smooth'));
        }
    };

    function shouldBlockAudienceSwipe(target) {
        if (!target) return true;
        if (document.querySelector('.modal-overlay.active, .account-overlay:not([hidden]), .beta-intake-overlay:not([hidden])')) return true;
        return Boolean(target.closest([
            '.bottom-tab-bar',
            '.settings-wrap',
            '.settings-popover',
            '.modal-content',
            '.account-modal',
            '.beta-intake-modal',
            '.hot-carousel',
            '.ranking-carousel',
            '.sampling-options-popout',
            '.custom-sim-tabs',
            '.sampling-chips',
            '.result-tabs',
            '.analysis-tabs',
            '.map-axis-selector',
            '.issue-share-actions',
            '.comment-form',
            'button',
            'a',
            'input',
            'textarea',
            'select',
            'label',
            '[role="button"]',
            '[role="tab"]',
            '[contenteditable="true"]',
        ].join(',')));
    }

    function initAudienceSwipeNavigation() {
        let swipeStartX = 0;
        let swipeStartY = 0;
        let swipePointerId = null;
        let trackingSwipe = false;
        let suppressClickUntil = 0;
        const minSwipeDistance = 58;
        const maxVerticalDrift = 86;

        document.addEventListener('pointerdown', event => {
            if (event.pointerType === 'mouse' || shouldBlockAudienceSwipe(event.target)) return;
            swipeStartX = event.clientX;
            swipeStartY = event.clientY;
            swipePointerId = event.pointerId;
            trackingSwipe = true;
        }, { passive: true });

        document.addEventListener('pointermove', event => {
            if (!trackingSwipe || event.pointerId !== swipePointerId) return;
            const dx = event.clientX - swipeStartX;
            const dy = event.clientY - swipeStartY;
            if (Math.abs(dy) > Math.abs(dx) + 24) trackingSwipe = false;
        }, { passive: true });

        function finishSwipe(event) {
            if (!trackingSwipe || event.pointerId !== swipePointerId) return;
            const dx = event.clientX - swipeStartX;
            const dy = event.clientY - swipeStartY;
            trackingSwipe = false;
            swipePointerId = null;

            if (Math.abs(dx) < minSwipeDistance || Math.abs(dy) > maxVerticalDrift) return;
            const currentMode = getActiveAudienceMode();
            const currentIndex = Math.max(0, audienceModeOrder.indexOf(currentMode));
            const nextIndex = dx < 0
                ? Math.min(audienceModeOrder.length - 1, currentIndex + 1)
                : Math.max(0, currentIndex - 1);
            const nextMode = audienceModeOrder[nextIndex];
            if (nextMode === currentMode) return;
            suppressClickUntil = Date.now() + 360;
            window.selectAudienceMode(nextMode, {
                behavior: 'smooth',
                direction: dx < 0 ? 'left' : 'right',
            });
        }

        document.addEventListener('pointerup', finishSwipe, { passive: true });
        document.addEventListener('pointercancel', () => {
            trackingSwipe = false;
            swipePointerId = null;
        }, { passive: true });

        document.addEventListener('click', event => {
            if (Date.now() > suppressClickUntil) return;
            event.preventDefault();
            event.stopImmediatePropagation();
        }, true);

        document.addEventListener('keydown', event => {
            const tagName = event.target?.tagName;
            if (tagName && ['INPUT', 'TEXTAREA', 'SELECT'].includes(tagName)) return;
            if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
            const currentMode = getActiveAudienceMode();
            const currentIndex = audienceModeOrder.indexOf(currentMode);
            if (event.key === 'ArrowLeft' && currentIndex > 0) {
                window.selectAudienceMode(audienceModeOrder[currentIndex - 1], { direction: 'right' });
            }
            if (event.key === 'ArrowRight' && currentIndex >= 0 && currentIndex < audienceModeOrder.length - 1) {
                window.selectAudienceMode(audienceModeOrder[currentIndex + 1], { direction: 'left' });
            }
        });
    }

    function getSharedIssueKey() {
        try {
            const params = new URLSearchParams(window.location.search);
            return params.get('issue') || '';
        } catch (_) {
            return '';
        }
    }

    function initAudienceMode() {
        applyAudienceMode(getSharedIssueKey() ? 'home' : readSavedAudienceMode() || 'home', false);
    }

    function extractIssueKey(card) {
        if (!card) return '';
        if (card.dataset.issueKey) return card.dataset.issueKey;
        const onclick = card.getAttribute('onclick') || '';
        const match = onclick.match(/openModal\('([^']+)'\)/);
        return match ? match[1] : '';
    }

    function getIssueShareData(card) {
        const key = extractIssueKey(card);
        const category = card.querySelector('.issue-category')?.textContent?.trim() || '이슈';
        const title = card.querySelector('.issue-title')?.textContent?.trim() || 'Deep Survey 이슈';
        const meta = Array.from(card.querySelectorAll('.issue-meta span')).map(el => el.textContent.trim()).join(' · ');
        const stats = Array.from(card.querySelectorAll('.quick-stat')).map(el => el.textContent.trim());
        const url = new URL(window.location.href);
        if (key) url.searchParams.set('issue', key);
        url.hash = '';
        return {
            key,
            category,
            title,
            meta,
            stats,
            url: url.toString(),
            text: `${title} - Deep Survey`,
        };
    }

    function hashString(value) {
        let hash = 0;
        String(value || '').split('').forEach(char => {
            hash = ((hash << 5) - hash + char.charCodeAt(0)) | 0;
        });
        return Math.abs(hash);
    }

    function parseCompactCount(value) {
        const text = String(value || '').replace(/,/g, '').trim();
        const match = text.match(/([\d.]+)\s*([만천명KkMm]*)/);
        if (!match) return 0;
        const number = Number(match[1]);
        if (!Number.isFinite(number)) return 0;
        const unit = match[2] || '';
        if (unit.includes('만') || /m/i.test(unit)) return Math.round(number * 10000);
        if (unit.includes('천') || /k/i.test(unit)) return Math.round(number * 1000);
        return Math.round(number);
    }

    function formatCompactCount(value) {
        const count = Math.max(0, Math.round(Number(value) || 0));
        if (count >= 10000) {
            const rounded = Math.round(count / 1000) / 10;
            return `${Number.isInteger(rounded) ? rounded.toFixed(0) : rounded}만`;
        }
        if (count >= 1000) {
            const rounded = Math.round(count / 100) / 10;
            return `${Number.isInteger(rounded) ? rounded.toFixed(0) : rounded}천`;
        }
        return String(count);
    }

    function readSocialStore() {
        return readJsonStorage(socialStorageKey, {});
    }

    function writeSocialStore(store) {
        writeJsonStorage(socialStorageKey, store);
    }

    function getIssueSocialBase(card) {
        const data = getIssueShareData(card);
        return {
            key: data.key || data.title,
            comments: readIssueComments(data.key || data.title).length,
            shares: 0,
            likes: 0,
            views: 0,
            agreeVotes: 0,
            disagreeVotes: 0,
        };
    }

    function getIssueSocialState(card) {
        const base = getIssueSocialBase(card);
        const store = readSocialStore();
        const item = store[base.key] || {};
        const commentDelta = Math.max(item.commentDelta || 0, readIssueComments(base.key).length);
        return {
            key: base.key,
            comments: commentDelta,
            shares: base.shares + (item.shareDelta || 0),
            likes: base.likes + (item.likeDelta || 0),
            views: base.views + (item.viewDelta || 0),
            agreeVotes: base.agreeVotes + (item.agreeVotes || 0),
            disagreeVotes: base.disagreeVotes + (item.disagreeVotes || 0),
            vote: item.vote || '',
            liked: Boolean(item.liked),
        };
    }

    function setIssueSocialState(key, patch) {
        const store = readSocialStore();
        store[key] = { ...(store[key] || {}), ...patch };
        writeSocialStore(store);
    }

    function voteChoiceLabel(vote) {
        const labels = {
            'strong-agree': '강한 찬성',
            agreeish: '찬성',
            unsure: '잘 모름',
            disagreeish: '반대',
            'strong-disagree': '강한 반대',
        };
        return labels[vote] || '투표';
    }

    function readVotedIssueEntries() {
        const store = readSocialStore();
        return Object.entries(store)
            .filter(([, item]) => item && item.vote)
            .map(([key, item]) => {
                const card = findIssueCardByKey(key);
                const title = card?.querySelector('.issue-title')?.textContent?.trim() || key;
                return {
                    key,
                    title,
                    vote: item.vote,
                    label: voteChoiceLabel(item.vote),
                    updatedAt: item.voteUpdatedAt || item.updatedAt || '',
                };
            });
    }

    function isIssueSavedForCurrentUser(card) {
        const user = getCurrentUser();
        if (!user) return false;
        const data = getIssueShareData(card);
        return readSavedIssues(user.id).some(issue => issue.key === data.key || issue.url === data.url);
    }

    function refreshIssueSocialBar(card) {
        const actions = card?.querySelector('.issue-share-actions');
        if (!actions) return;
        const state = getIssueSocialState(card);
        const saved = isIssueSavedForCurrentUser(card);
        const setCount = (name, value) => {
            const el = actions.querySelector(`[data-social-count="${name}"]`);
            if (el) el.textContent = formatCompactCount(value);
        };
        setCount('comments', state.comments);
        setCount('shares', state.shares);
        setCount('likes', state.likes);
        setCount('views', state.views);
        setCount('agreeVotes', state.agreeVotes);
        setCount('disagreeVotes', state.disagreeVotes);
        renderIssueVoteSurface(card, actions, state);
        const saveButton = actions.querySelector('[data-social-action="save"]');
        const voteButtons = actions.querySelectorAll('[data-social-action^="vote-"]');
        if (saveButton) {
            saveButton.classList.toggle('active', saved);
            saveButton.setAttribute('aria-pressed', saved ? 'true' : 'false');
        }
        voteButtons.forEach(button => {
            const voteMap = {
                'vote-strong-agree': 'strong-agree',
                'vote-agreeish': 'agreeish',
                'vote-unsure': 'unsure',
                'vote-disagreeish': 'disagreeish',
                'vote-strong-disagree': 'strong-disagree',
            };
            const active = state.vote === voteMap[button.dataset.socialAction];
            button.classList.toggle('active', active);
            button.classList.toggle('is-selected', active);
            button.setAttribute('aria-pressed', active ? 'true' : 'false');
        });
    }
    window.refreshIssueSocialBar = refreshIssueSocialBar;

    function formatIssuePercent(value) {
        const numeric = Math.max(0, Math.min(100, Number(value) || 0));
        const rounded = Math.round(numeric * 10) / 10;
        return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
    }

    function formatIssueSignedPointValue(value) {
        const numeric = Number(value) || 0;
        const sign = numeric > 0 ? '+' : numeric < 0 ? '-' : '';
        return `${sign}${formatIssuePercent(Math.abs(numeric))}%p`;
    }

    function getIssueDataForCard(card) {
        const key = extractIssueKey(card);
        return (window.deepSurveyIssueData && key && window.deepSurveyIssueData[key]) || {};
    }

    function getIssueVoteTotals(card) {
        const issue = getIssueDataForCard(card);
        const stats = issue?.stats || {};
        if (stats && Object.keys(stats).length) {
            const agree = Math.max(0, Math.min(100, Number(stats.agree || 0) + Number(stats.agreeish || 0)));
            const disagree = Math.max(0, Math.min(100, Number(stats.disagreeish || 0) + Number(stats.disagree || 0)));
            const unsure = Math.max(0, Math.min(100, Number(stats.unsure || 0)));
            return { agree, disagree, unsure, net: agree - disagree };
        }
        const readWidth = selector => Number.parseFloat(card?.querySelector(selector)?.style?.width || '0') || 0;
        const agree = Math.max(0, Math.min(100, readWidth('.scale-strongly-agree') + readWidth('.scale-agree')));
        const disagree = Math.max(0, Math.min(100, readWidth('.scale-disagree') + readWidth('.scale-strongly-disagree')));
        const unsure = Math.max(0, Math.min(100, readWidth('.scale-unsure')));
        return { agree, disagree, unsure, net: agree - disagree };
    }

    function getIssueVotePair(card) {
        const issue = getIssueDataForCard(card);
        const title = card?.querySelector('.issue-title')?.textContent?.trim() || '';
        if (typeof window.getIssueResponseLabelPair === 'function') {
            return window.getIssueResponseLabelPair(issue, title);
        }
        return {
            positive: '동의',
            negative: '비동의',
            shortPositive: '동',
            shortNegative: '비',
            strongPositive: '매우 동의',
            softPositive: '동의하는 편',
            softNegative: '비동의하는 편',
            strongNegative: '매우 비동의',
        };
    }

    function renderIssueVoteScale(card) {
        const title = card?.querySelector('.issue-title')?.textContent?.trim() || '이슈';
        const pair = getIssueVotePair(card);
        return `<div class="issue-vote-scale" role="group" aria-label="${escapeHtml(title)} 입장 선택">
            <span class="issue-vote-scale-label agree" aria-hidden="true">${escapeHtml(pair.positive)}</span>
            <div class="issue-vote-options">
                <button class="issue-action-btn issue-vote-btn issue-vote-dot issue-vote-dot-strong-agree" type="button" data-social-action="vote-strong-agree" aria-label="${escapeHtml(pair.strongPositive)}" aria-pressed="false" title="${escapeHtml(pair.strongPositive)}">
                    <span class="sr-only">${escapeHtml(pair.strongPositive)}</span>
                </button>
                <button class="issue-action-btn issue-vote-btn issue-vote-dot issue-vote-dot-agreeish" type="button" data-social-action="vote-agreeish" aria-label="${escapeHtml(pair.softPositive)}" aria-pressed="false" title="${escapeHtml(pair.softPositive)}">
                    <span class="sr-only">${escapeHtml(pair.softPositive)}</span>
                </button>
                <button class="issue-action-btn issue-vote-btn issue-vote-dot issue-vote-dot-unsure" type="button" data-social-action="vote-unsure" aria-label="잘 모름" aria-pressed="false" title="잘 모름">
                    <span class="sr-only">잘 모름</span>
                </button>
                <button class="issue-action-btn issue-vote-btn issue-vote-dot issue-vote-dot-disagreeish" type="button" data-social-action="vote-disagreeish" aria-label="${escapeHtml(pair.softNegative)}" aria-pressed="false" title="${escapeHtml(pair.softNegative)}">
                    <span class="sr-only">${escapeHtml(pair.softNegative)}</span>
                </button>
                <button class="issue-action-btn issue-vote-btn issue-vote-dot issue-vote-dot-strong-disagree" type="button" data-social-action="vote-strong-disagree" aria-label="${escapeHtml(pair.strongNegative)}" aria-pressed="false" title="${escapeHtml(pair.strongNegative)}">
                    <span class="sr-only">${escapeHtml(pair.strongNegative)}</span>
                </button>
            </div>
            <span class="issue-vote-scale-label disagree" aria-hidden="true">${escapeHtml(pair.negative)}</span>
        </div>`;
    }

    function renderIssueVoteResult(card) {
        const pair = getIssueVotePair(card);
        const totals = getIssueVoteTotals(card);
        const agree = formatIssuePercent(totals.agree);
        const disagree = formatIssuePercent(totals.disagree);
        const unsure = formatIssuePercent(totals.unsure);
        return `<div class="issue-vote-result" aria-label="${escapeHtml(pair.positive)} ${agree}%, ${escapeHtml(pair.negative)} ${disagree}%, 유보 ${unsure}%">
            <div class="issue-result-bars" aria-hidden="true">
                <span class="issue-result-bar-agree" style="width:${totals.agree}%"></span>
                <span class="issue-result-bar-disagree" style="width:${totals.disagree}%"></span>
                <span class="issue-result-bar-unsure" style="width:${totals.unsure}%"></span>
            </div>
            <div class="issue-result-metrics">
                <span><strong>${escapeHtml(pair.shortPositive)}</strong> ${agree}</span>
                <span><strong>${escapeHtml(pair.shortNegative)}</strong> ${disagree}</span>
                <span><strong>유</strong> ${unsure}</span>
            </div>
        </div>`;
    }

    function renderIssueVoteCompletion() {
        return `<div class="issue-vote-complete" role="status" aria-live="polite" aria-label="투표 완료">
            <span class="issue-vote-complete-mark" aria-hidden="true">✓</span>
            <span class="issue-vote-complete-actions">
                <button class="issue-vote-retry-btn" type="button" data-social-action="retry-vote">다시 하기</button>
                <button class="issue-vote-result-btn" type="button" data-social-action="view-results">결과 보기</button>
            </span>
        </div>`;
    }

    function renderIssueVoteSurface(card, actions, state = getIssueSocialState(card)) {
        const surface = actions?.querySelector('[data-issue-vote-surface]');
        if (!surface) return;
        const isEditingVote = actions?.dataset.voteMode === 'editing';
        surface.innerHTML = state.vote && !isEditingVote ? renderIssueVoteResult(card) : renderIssueVoteScale(card);
    }

    function showShareToast(message) {
        let toast = document.querySelector('.share-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'share-toast';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add('show');
        clearTimeout(showShareToast.timer);
        showShareToast.timer = setTimeout(() => toast.classList.remove('show'), 1800);
    }
    window.showShareToast = showShareToast;

    async function copyText(value) {
        try {
            await navigator.clipboard.writeText(value);
            return true;
        } catch (_) {
            const input = document.createElement('textarea');
            input.value = value;
            input.setAttribute('readonly', '');
            input.style.position = 'fixed';
            input.style.left = '-9999px';
            document.body.appendChild(input);
            input.select();
            const copied = document.execCommand('copy');
            input.remove();
            return copied;
        }
    }

    async function shareIssue(card) {
        const data = getIssueShareData(card);
        if (navigator.share) {
            try {
                await navigator.share({ title: data.title, text: data.text, url: data.url });
                showShareToast('공유 준비를 완료했어요');
                return;
            } catch (_) {
                // User cancellation should simply fall through to copy.
            }
        }
        await copyText(data.url);
        showShareToast('공유 링크를 복사했어요');
    }

    function readJsonStorage(key, fallback) {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : fallback;
        } catch (_) {
            return fallback;
        }
    }

    function writeJsonStorage(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (_) {
            // Account persistence is optional in restricted previews.
        }
    }

    function removeJsonStorage(key) {
        try {
            localStorage.removeItem(key);
        } catch (_) {
            // Local data controls are best effort in restricted previews.
        }
    }

    function getPreferenceUserId(user = getCurrentUser()) {
        return user?.id || 'guest';
    }

    function readAccountPreferences(userId = getPreferenceUserId()) {
        const allPreferences = readJsonStorage(accountPreferencesStorageKey, {});
        return {
            ...defaultAccountPreferences,
            ...(allPreferences[userId] || {}),
        };
    }

    function writeAccountPreferences(nextPreferences, userId = getPreferenceUserId()) {
        const allPreferences = readJsonStorage(accountPreferencesStorageKey, {});
        const merged = {
            ...defaultAccountPreferences,
            ...(allPreferences[userId] || {}),
            ...nextPreferences,
            updatedAt: new Date().toISOString(),
        };
        allPreferences[userId] = merged;
        writeJsonStorage(accountPreferencesStorageKey, allPreferences);
        applyAccountPreferences(merged);
        return merged;
    }

    function resetAccountPreferences(userId = getPreferenceUserId()) {
        const allPreferences = readJsonStorage(accountPreferencesStorageKey, {});
        allPreferences[userId] = {
            ...defaultAccountPreferences,
            updatedAt: new Date().toISOString(),
        };
        writeJsonStorage(accountPreferencesStorageKey, allPreferences);
        applyAccountPreferences(allPreferences[userId]);
        return allPreferences[userId];
    }

    function applyAccountPreferences(preferences = readAccountPreferences()) {
        root.classList.toggle('account-evidence-first', Boolean(preferences.evidenceFirst));
        root.classList.toggle('account-compact-ui', Boolean(preferences.compactCards));
        root.classList.toggle('account-reduce-motion', Boolean(preferences.reduceMotion));
        root.dataset.accountSafeMode = preferences.safeMode ? 'on' : 'off';
    }

    function applyAccountDefaultAudience(user = getCurrentUser()) {
        if (!user || getSharedIssueKey()) return;
        const preferences = readAccountPreferences(user.id);
        applyAudienceMode(normalizeAudienceMode(preferences.defaultAudience), false);
    }

    function updateAccountPreference(key, value) {
        const allowed = Object.prototype.hasOwnProperty.call(defaultAccountPreferences, key);
        if (!allowed) return readAccountPreferences();
        return writeAccountPreferences({ [key]: value });
    }

    function readAccountActivity(userId = getPreferenceUserId()) {
        const allActivity = readJsonStorage(accountActivityStorageKey, {});
        return Array.isArray(allActivity[userId]) ? allActivity[userId] : [];
    }

    function writeAccountActivity(userId, activity) {
        const allActivity = readJsonStorage(accountActivityStorageKey, {});
        allActivity[userId] = activity.slice(0, 100);
        writeJsonStorage(accountActivityStorageKey, allActivity);
    }

    function logAccountActivity(type, label, meta = {}) {
        const user = getCurrentUser();
        if (!user) return;
        const activity = readAccountActivity(user.id);
        writeAccountActivity(user.id, [{
            type,
            label,
            meta,
            createdAt: new Date().toISOString(),
        }, ...activity]);
    }

    function escapeHtml(value) {
        return String(value || '').replace(/[&<>"']/g, char => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
        }[char]));
    }

    function getProviderLabel(provider) {
        if (provider === 'kakao') return '카카오';
        if (provider === 'naver') return '네이버';
        return 'Google';
    }

    function buildPersonaForUser(user) {
        const seed = hashString(`${user?.provider || 'local'}:${user?.id || user?.name || 'guest'}`);
        const types = [
            { title: '생활 안정형 참여자', desc: '' },
            { title: '정책 효율 검증가', desc: '' },
            { title: '공정성 민감형 시민', desc: '' },
            { title: '미래산업 낙관형', desc: '' },
            { title: '지역 균형 중시형', desc: '' },
            { title: '사회 안전망 지지형', desc: '' },
        ];
        const ideologies = ['보수', '중도보수', '중도', '중도진보', '진보'];
        const ages = ['20대', '30대', '40대', '50대', '60대+'];
        const regions = ['서울', '경기/인천', '충청', '호남', '부산/경남', '대구/경북', '강원/제주'];
        const type = types[seed % types.length];
        return {
            title: type.title,
            desc: type.desc,
            ideology: ideologies[(seed >> 2) % ideologies.length],
            age: ages[(seed >> 5) % ages.length],
            region: regions[(seed >> 8) % regions.length],
            confidence: 62 + (seed % 29),
        };
    }

    function ensureUserPersona(user) {
        if (!user) return null;
        const persona = user.persona || buildPersonaForUser(user);
        if (!user.persona) {
            setCurrentUser({ ...user, persona });
        }
        return persona;
    }

    function getUserPlanTier(user) {
        const rawTier = user?.planTier || user?.plan || user?.subscription?.tier || 'FREE';
        const tier = String(rawTier).trim().toUpperCase();
        return ['FREE', 'PRO', 'MAX'].includes(tier) ? tier : 'FREE';
    }

    function renderAccountAvatarButtonContent(user) {
        const persona = ensureUserPersona(user);
        if (!user || !persona) return '';
        const planTier = getUserPlanTier(user);
        const avatarLetter = persona.title.slice(0, 1);
        return `<span class="account-avatar-button" aria-hidden="true">${escapeHtml(avatarLetter)}</span><span class="account-plan-badge account-plan-${escapeHtml(planTier.toLowerCase())}">${escapeHtml(planTier)}</span>`;
    }

    function renderPersonaProfile(user, compact = false, analysis = null) {
        const taste = analysis || (user ? getUserTasteAnalysis(user, getAccountStats(user)) : null);
        const persona = taste || ensureUserPersona(user);
        if (!user || !persona) return '';
        const title = taste ? taste.signatureTitle : persona.title;
        const tags = taste
            ? [taste.activity.title, taste.judgment.title, taste.agenda.title, taste.discussion.title]
            : [persona.ideology, persona.age, persona.region, `매칭 ${persona.confidence}%`];
        return `<section class="persona-profile${compact ? ' compact' : ''}">
            <div class="persona-avatar">${escapeHtml(title.slice(0, 1))}</div>
            <div class="persona-profile-body">
                <span>${escapeHtml(user.providerLabel || '계정')} 프로필</span>
                <strong>${escapeHtml(title)}</strong>
                <div class="persona-tags">
                    ${tags.map(tag => `<em>${escapeHtml(tag)}</em>`).join('')}
                </div>
            </div>
        </section>`;
    }

    function getCurrentUser() {
        return readJsonStorage(userStorageKey, null);
    }

    function setCurrentUser(user) {
        if (user) {
            writeJsonStorage(userStorageKey, user);
            return;
        }
        try {
            localStorage.removeItem(userStorageKey);
        } catch (_) {
            // Ignore storage failures in local previews.
        }
    }

    function readSavedIssues(userId) {
        const allIssues = readJsonStorage(savedIssuesStorageKey, {});
        return Array.isArray(allIssues[userId]) ? allIssues[userId] : [];
    }

    function writeSavedIssues(userId, issues) {
        const allIssues = readJsonStorage(savedIssuesStorageKey, {});
        allIssues[userId] = issues.slice(0, 80);
        writeJsonStorage(savedIssuesStorageKey, allIssues);
    }

    function updateAuthButtons() {
        const user = getCurrentUser();
        const loginButton = document.getElementById('login-button');
        const myPageButton = document.getElementById('my-page-button');
        const pricingButton = document.getElementById('pricing-button');
        if (user) ensureUserPersona(user);
        applyAccountPreferences(readAccountPreferences(getPreferenceUserId(user)));
        if (pricingButton) {
            pricingButton.hidden = true;
        }
        if (loginButton) {
            loginButton.hidden = Boolean(user);
            loginButton.textContent = '로그인';
            loginButton.classList.remove('signed-in');
            loginButton.onclick = () => openLogin();
        }
        if (myPageButton) {
            myPageButton.hidden = !user;
            myPageButton.classList.add('account-entry');
            myPageButton.innerHTML = user ? renderAccountAvatarButtonContent(user) : '';
            myPageButton.setAttribute('aria-label', user ? `내 계정 · ${getUserPlanTier(user)}` : '내 계정');
            myPageButton.onclick = () => openMyPage();
        }
        renderSettingsMenu();
        document.querySelectorAll('.issue-card').forEach(refreshIssueSocialBar);
    }

    function initHeaderScrollState() {
        const header = document.querySelector('.header');
        const bottomTabBar = document.querySelector('.bottom-tab-bar');
        const modalOverlay = document.getElementById('modal');
        if (!header && !bottomTabBar) return;
        let ticking = false;
        const getScrollSource = () => {
            const activeModal = document.querySelector('.modal-overlay.active');
            return activeModal ? { key: 'modal', y: Math.max(0, activeModal.scrollTop || 0) } : { key: 'page', y: Math.max(0, window.scrollY || 0) };
        };
        const initialSource = getScrollSource();
        let lastScrollKey = initialSource.key;
        let lastScrollY = initialSource.y;
        const setNavigationHidden = hidden => {
            header?.classList.toggle('is-hidden', hidden);
            bottomTabBar?.classList.toggle('is-hidden', hidden);
        };
        const update = () => {
            const source = getScrollSource();
            const currentY = source.y;
            const delta = source.key === lastScrollKey ? currentY - lastScrollY : 0;
            const settingsOpen = document.getElementById('settings-popover')?.hidden === false;

            header?.classList.toggle('is-compact', currentY > 18);
            if (currentY <= 24 || settingsOpen) {
                setNavigationHidden(false);
            } else if (delta > 6 && currentY > 96) {
                setNavigationHidden(true);
            } else if (delta < -6) {
                setNavigationHidden(false);
            }

            lastScrollKey = source.key;
            lastScrollY = currentY;
            ticking = false;
        };
        const requestUpdate = () => {
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(update);
        };
        update();
        window.addEventListener('scroll', requestUpdate, { passive: true });
        window.addEventListener('resize', requestUpdate);
        modalOverlay?.addEventListener('scroll', requestUpdate, { passive: true });
    }

    function closeSettingsMenu() {
        const popover = document.getElementById('settings-popover');
        const button = document.getElementById('settings-button');
        if (popover) popover.hidden = true;
        if (button) button.setAttribute('aria-expanded', 'false');
    }

    function renderSettingsMenu() {
        const popover = document.getElementById('settings-popover');
        if (!popover) return;
        const user = getCurrentUser();
        const themeMode = getCurrentThemeMode();
        const resolvedTheme = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        const preferences = readAccountPreferences(getPreferenceUserId(user));
        const savedCount = user ? readSavedIssues(user.id).length : 0;
        const activityCount = user ? readAccountActivity(user.id).length : 0;
        popover.innerHTML = `
            <div class="settings-title-row">
                <div class="settings-title">설정</div>
                <span class="settings-badge">로컬 데모</span>
            </div>
            <div class="settings-billing-entry">
                <button type="button" data-settings-action="billing">
                    <span class="mono-icon mono-icon-card" aria-hidden="true"></span>
                    <strong>결제</strong>
                    <em>${user ? `${getUserPlanTier(user)} 플랜` : '요금제 보기'}</em>
                </button>
            </div>
            <div class="settings-group">
                <span>화면 모드 <em class="settings-subtext">현재 ${resolvedTheme === 'dark' ? '다크' : '라이트'}</em></span>
                <div class="settings-segmented settings-segmented-theme" role="group" aria-label="화면 모드">
                    <button type="button" data-theme-choice="system" class="${themeMode === 'system' ? 'active' : ''}" aria-pressed="${themeMode === 'system' ? 'true' : 'false'}">시스템</button>
                    <button type="button" data-theme-choice="light" class="${themeMode === 'light' ? 'active' : ''}" aria-pressed="${themeMode === 'light' ? 'true' : 'false'}">라이트</button>
                    <button type="button" data-theme-choice="dark" class="${themeMode === 'dark' ? 'active' : ''}" aria-pressed="${themeMode === 'dark' ? 'true' : 'false'}">다크</button>
                </div>
            </div>
            <div class="settings-group">
                <span>계정</span>
                ${user ? `
                    ${renderPersonaProfile(user, true)}
                    <div class="settings-account-stats" aria-label="계정 요약">
                        <span><strong>${savedCount}</strong> 저장</span>
                        <span><strong>${activityCount}</strong> 활동</span>
                    </div>
                    <div class="settings-actions">
                        <button type="button" data-settings-action="mypage">마이페이지</button>
                        <button type="button" data-settings-action="data">데이터</button>
                        <button type="button" data-settings-action="logout">로그아웃</button>
                    </div>
                ` : `
                    <button class="settings-login-btn" type="button" data-settings-action="login">로그인</button>
                `}
            </div>
        `;
    }

    function toggleSettingsMenu(event) {
        event?.preventDefault?.();
        event?.stopPropagation?.();
        const popover = document.getElementById('settings-popover');
        const button = document.getElementById('settings-button');
        if (!popover) return;
        renderSettingsMenu();
        const willOpen = popover.hidden;
        popover.hidden = !willOpen;
        if (button) button.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    }

    function initSettingsMenu() {
        const popover = document.getElementById('settings-popover');
        if (!popover || popover.dataset.bound === 'true') return;
        popover.dataset.bound = 'true';
        popover.addEventListener('click', event => {
            const themeButton = event.target.closest('[data-theme-choice]');
            if (themeButton) {
                applyTheme(themeButton.dataset.themeChoice, true);
                renderSettingsMenu();
                return;
            }

            const actionButton = event.target.closest('[data-settings-action]');
            if (!actionButton) return;
            const action = actionButton.dataset.settingsAction;
            closeSettingsMenu();
            if (action === 'login') openLogin();
            if (action === 'billing') window.location.href = 'pricing.html';
            if (action === 'mypage') openMyPage();
            if (action === 'data') openMyPage('data');
            if (action === 'logout') logoutUser();
        });

        document.addEventListener('click', event => {
            if (event.target.closest('.settings-wrap')) return;
            closeSettingsMenu();
        });
    }

    window.toggleSettingsMenu = toggleSettingsMenu;

    function ensureAccountModal() {
        let overlay = document.querySelector('.account-overlay');
        if (overlay) return overlay;

        overlay = document.createElement('div');
        overlay.className = 'account-overlay';
        overlay.hidden = true;
        overlay.innerHTML = `
            <section class="account-modal" role="dialog" aria-modal="true" aria-labelledby="account-modal-title" tabindex="-1">
                <div class="account-modal-header">
                    <h2 class="account-modal-title" id="account-modal-title"></h2>
                    <button class="account-modal-close" type="button" data-account-close aria-label="닫기">×</button>
                </div>
                <div class="account-modal-body" id="account-modal-body"></div>
            </section>
        `;
        overlay.addEventListener('click', event => {
            if (event.target === overlay || event.target.closest('[data-account-close]')) {
                closeAccountModal();
                return;
            }

            const viewButton = event.target.closest('[data-account-view]');
            if (viewButton) {
                openMyPage(viewButton.dataset.accountView || 'overview');
                return;
            }

            const preferenceButton = event.target.closest('[data-account-pref-toggle]');
            if (preferenceButton) {
                const key = preferenceButton.dataset.accountPrefToggle;
                const preferences = readAccountPreferences();
                updateAccountPreference(key, !Boolean(preferences[key]));
                const currentView = preferenceButton.closest('[data-account-current-view]')?.dataset.accountCurrentView || 'settings';
                openMyPage(currentView);
                return;
            }

            const audienceButton = event.target.closest('[data-account-audience]');
            if (audienceButton) {
                const mode = normalizeAudienceMode(audienceButton.dataset.accountAudience);
                updateAccountPreference('defaultAudience', mode);
                applyAudienceMode(mode, true);
                const currentView = audienceButton.closest('[data-account-current-view]')?.dataset.accountCurrentView || 'settings';
                openMyPage(currentView);
                return;
            }

            const themeButton = event.target.closest('[data-account-theme-choice]');
            if (themeButton) {
                applyTheme(themeButton.dataset.accountThemeChoice, true);
                openMyPage('settings');
                return;
            }

            if (event.target.closest('[data-account-billing-open]')) {
                window.location.href = 'pricing.html';
                return;
            }

            if (event.target.closest('[data-account-share-analysis]')) {
                const user = getCurrentUser();
                if (user) shareAccountAnalysis(user, getAccountStats(user));
                return;
            }

            if (event.target.closest('[data-account-export]')) {
                exportCurrentAccountData();
                return;
            }

            if (event.target.closest('[data-account-reset-preferences]')) {
                resetAccountPreferences();
                logAccountActivity('settings', '기본값 초기화');
                openMyPage('data');
                showShareToast('기본값을 초기화했어요');
                return;
            }

            if (event.target.closest('[data-account-clear-saved]')) {
                clearCurrentSavedIssues();
                return;
            }

            if (event.target.closest('[data-account-clear-activity]')) {
                clearCurrentAccountActivity();
                return;
            }

            if (event.target.closest('[data-account-delete-local]')) {
                deleteCurrentLocalAccountData();
                return;
            }

            const providerButton = event.target.closest('[data-login-provider]');
            if (providerButton) {
                loginWithProvider(providerButton.dataset.loginProvider);
                return;
            }

            const openButton = event.target.closest('[data-open-saved-index]');
            if (openButton) {
                openSavedIssue(Number(openButton.dataset.openSavedIndex));
                return;
            }

            const removeButton = event.target.closest('[data-remove-saved-index]');
            if (removeButton) {
                removeSavedIssue(Number(removeButton.dataset.removeSavedIndex));
                return;
            }

            const revoteButton = event.target.closest('[data-account-revote-key]');
            if (revoteButton) {
                requestIssueRevote(revoteButton.dataset.accountRevoteKey || '');
                return;
            }

            const commentButton = event.target.closest('[data-comment-submit]');
            if (commentButton) {
                submitIssueComment(commentButton.dataset.commentKey || '');
                return;
            }

            if (event.target.closest('[data-logout-user]')) {
                logoutUser();
            }
        });
        overlay.addEventListener('keydown', event => {
            if (event.key !== 'Tab') return;
            const focusable = Array.from(overlay.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'))
                .filter(el => !el.disabled && el.offsetParent !== null);
            if (!focusable.length) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        });
        document.body.appendChild(overlay);
        return overlay;
    }

    function setAccountModalContent(title, bodyHtml, titleHtml = '') {
        const overlay = ensureAccountModal();
        const titleEl = overlay.querySelector('#account-modal-title');
        const bodyEl = overlay.querySelector('#account-modal-body');
        if (overlay.hidden) accountModalReturnFocus = document.activeElement;
        if (titleEl) {
            titleEl.classList.toggle('account-modal-title-profile', Boolean(titleHtml));
            if (titleHtml) {
                titleEl.innerHTML = titleHtml;
            } else {
                titleEl.textContent = title;
            }
        }
        if (bodyEl) bodyEl.innerHTML = bodyHtml;
        overlay.hidden = false;
        const dialog = overlay.querySelector('.account-modal');
        window.requestAnimationFrame(() => dialog?.focus({ preventScroll: true }));
    }

    function closeAccountModal() {
        const overlay = document.querySelector('.account-overlay');
        if (overlay) overlay.hidden = true;
        if (accountModalReturnFocus && typeof accountModalReturnFocus.focus === 'function') {
            try {
                accountModalReturnFocus.focus({ preventScroll: true });
            } catch (_) {
                accountModalReturnFocus.focus();
            }
        }
        accountModalReturnFocus = null;
    }

    function openLogin(message) {
        const body = `
            ${message ? `<p class="auth-message">${escapeHtml(message)}</p>` : ''}
            <div class="auth-provider-list">
                <button class="auth-provider-btn google" type="button" data-login-provider="google"><span class="auth-provider-icon google" aria-hidden="true">G</span><span>Google로 계속하기</span></button>
                <button class="auth-provider-btn kakao" type="button" data-login-provider="kakao"><span class="auth-provider-icon kakao" aria-hidden="true">K</span><span>카카오로 계속하기</span></button>
                <button class="auth-provider-btn naver" type="button" data-login-provider="naver"><span class="auth-provider-icon naver" aria-hidden="true">N</span><span>네이버로 계속하기</span></button>
            </div>
        `;
        setAccountModalContent('로그인', body);
    }

    function loginWithProvider(provider) {
        const normalizedProvider = ['google', 'kakao', 'naver'].includes(provider) ? provider : 'google';
        const label = getProviderLabel(normalizedProvider);
        const user = {
            id: `${normalizedProvider}-local-user`,
            name: `${label} 사용자`,
            provider: normalizedProvider,
            providerLabel: label,
            signedInAt: new Date().toISOString(),
        };
        user.persona = buildPersonaForUser(user);
        setCurrentUser(user);
        applyAccountPreferences(readAccountPreferences(user.id));
        applyAccountDefaultAudience(user);
        logAccountActivity('login', `${label} 로그인`);
        updateAuthButtons();
        showShareToast(`${label} 로그인 완료`);

        if (pendingSaveCard) {
            const card = pendingSaveCard;
            pendingSaveCard = null;
            closeAccountModal();
            saveIssueForUser(card);
            return;
        }
        if (pendingCommentCard) {
            const card = pendingCommentCard;
            pendingCommentCard = null;
            openIssueComments(card);
            return;
        }
        openMyPage();
    }

    function logoutUser() {
        logAccountActivity('logout', '로그아웃');
        setCurrentUser(null);
        pendingSaveCard = null;
        pendingCommentCard = null;
        closeAccountModal();
        updateAuthButtons();
        showShareToast('로그아웃했어요');
    }

    function saveIssueForUser(card) {
        const user = getCurrentUser();
        if (!user) {
            pendingSaveCard = card;
            openLogin('저장하려면 로그인이 필요합니다.');
            return;
        }

        const data = getIssueShareData(card);
        const savedIssues = readSavedIssues(user.id);
        const now = new Date().toISOString();
        const nextIssue = {
            key: data.key,
            category: data.category,
            title: data.title,
            meta: data.meta,
            url: data.url,
            savedAt: now,
        };
        const existingIndex = savedIssues.findIndex(issue => issue.key === nextIssue.key || issue.url === nextIssue.url);
        const nextIssues = existingIndex >= 0
            ? [nextIssue, ...savedIssues.filter((_, index) => index !== existingIndex)]
            : [nextIssue, ...savedIssues];
        writeSavedIssues(user.id, nextIssues);
        logAccountActivity(existingIndex >= 0 ? 'save-update' : 'save', nextIssue.title, { key: nextIssue.key });
        refreshIssueSocialBar(card);
        showShareToast(existingIndex >= 0 ? '저장한 이슈를 갱신했어요' : '마이페이지에 저장했어요');
    }

    function formatSavedAt(value) {
        try {
            return new Intl.DateTimeFormat('ko-KR', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            }).format(new Date(value));
        } catch (_) {
            return '';
        }
    }

    function formatFullDate(value) {
        if (!value) return '-';
        try {
            return new Intl.DateTimeFormat('ko-KR', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            }).format(new Date(value));
        } catch (_) {
            return '-';
        }
    }

    function getAccountComments(user) {
        if (!user) return [];
        const allComments = readJsonStorage(commentsStorageKey, {});
        return Object.entries(allComments).flatMap(([key, comments]) => (
            Array.isArray(comments) ? comments.map(comment => ({ key, ...comment })) : []
        )).filter(comment => comment.userId === user.id || comment.author === user.name);
    }

    function getAccountEngagementBreakdown(user, comments, activity) {
        const ownComments = comments.filter(comment => !comment.parentId && !comment.replyTo && !comment.parentCommentId);
        const replies = comments.filter(comment => comment.parentId || comment.replyTo || comment.parentCommentId);
        const receivedLikes = comments.reduce((sum, comment) => (
            sum + Number(comment.likes || comment.likeCount || comment.reactionCount || 0)
        ), 0);
        const sentLikes = activity.filter(item => item.type === 'like').length;
        const views = activity.filter(item => item.type === 'view' || item.type === 'open').length;
        return {
            views,
            comments: ownComments.length,
            replies: replies.length,
            receivedLikes,
            sentLikes,
        };
    }

    function getAccountRanking(stats) {
        const breakdown = stats.engagement || {};
        const score = Math.round(
            (stats.savedIssues.length * 8) +
            (stats.votes * 3) +
            (breakdown.views * 1) +
            (breakdown.comments * 12) +
            (breakdown.replies * 16) +
            (breakdown.receivedLikes * 6) +
            (breakdown.sentLikes * 5)
        );
        const topPercent = score <= 0
            ? 100
            : Math.max(1, Math.min(99, Math.round(100 - Math.min(96, Math.log10(score + 1) * 34))));
        return {
            score,
            topPercent,
            label: `사용자 중 상위 ${topPercent}%`,
        };
    }

    const accountActivityTiers = [
        { min: 0, level: 'Lv.1', title: '첫 관찰자', desc: '아직 성향 데이터가 적어 탐색부터 시작하는 단계입니다.' },
        { min: 8, level: 'Lv.2', title: '반응 입문자', desc: '투표나 저장으로 관심 이슈의 윤곽을 만들기 시작했습니다.' },
        { min: 24, level: 'Lv.3', title: '이슈 탐색가', desc: '여러 이슈를 훑으며 나만의 판단 기준을 모으고 있습니다.' },
        { min: 48, level: 'Lv.4', title: '의견 축적가', desc: '저장, 투표, 댓글이 쌓여 분석 가능한 패턴이 보입니다.' },
        { min: 90, level: 'Lv.5', title: '토론 루틴러', desc: '반복 참여로 관심 의제와 반응 습관이 안정적으로 드러납니다.' },
        { min: 150, level: 'Lv.6', title: '정책 레이더', desc: '새 이슈를 빠르게 포착하고 비교하는 감각이 강합니다.' },
        { min: 240, level: 'Lv.7', title: '논점 수집가', desc: '참여 신호가 충분해 나만의 의제 지도가 만들어지고 있습니다.' },
        { min: 360, level: 'Lv.8', title: '공론장 단골', desc: '주요 이슈의 찬반 흐름을 꾸준히 기록하는 단계입니다.' },
        { min: 520, level: 'Lv.9', title: '의제 큐레이터', desc: '저장과 반응이 결합되어 다시 볼 만한 이슈를 잘 골라냅니다.' },
        { min: 760, level: 'Lv.10', title: '정책 내공인', desc: '다양한 행동 데이터가 쌓여 성향 조합이 또렷합니다.' },
        { min: 1080, level: 'Lv.11', title: '공론장 아카이비스트', desc: '의견과 근거를 오래 추적하는 헤비 참여자 구간입니다.' },
        { min: 1500, level: 'Lv.12', title: 'Deep Survey 고인물', desc: '로컬 활동 기준 최상위권의 참여 밀도를 보입니다.' },
    ];

    const judgmentTiers = [
        { max: -1.25, title: '강한 제동형', desc: '정책 추진보다 부작용과 제도적 한계를 먼저 확인합니다.' },
        { max: -0.65, title: '비판 검증형', desc: '새 제안에 쉽게 동의하지 않고 근거의 빈틈을 찾습니다.' },
        { max: -0.2, title: '신중 보류형', desc: '찬성보다 조건과 예외 조항을 먼저 따져보는 편입니다.' },
        { max: 0.2, title: '균형 저울형', desc: '동의와 비동의를 오가며 사안별 균형을 맞춥니다.' },
        { max: 0.65, title: '조건부 동의형', desc: '큰 방향에는 열려 있지만 세부 설계에 민감합니다.' },
        { max: 1.25, title: '개선 추진형', desc: '문제가 확인되면 제도 개선을 빠르게 지지하는 편입니다.' },
        { max: Infinity, title: '강한 추진형', desc: '공익적 필요가 보이면 적극적인 실행을 선호합니다.' },
    ];

    const agendaProfiles = [
        { key: 'livelihood', title: '생활 안정 감지형', desc: '일자리, 물가, 주거처럼 체감도가 큰 의제에 반응합니다.' },
        { key: 'fairness', title: '공정·안전 민감형', desc: '사회적 약자, 범죄, 안전망처럼 신뢰와 보호의 문제를 주시합니다.' },
        { key: 'future', title: '미래 투자형', desc: '교육, 과학기술, 산업 전환처럼 다음 세대의 선택지를 봅니다.' },
        { key: 'market', title: '시장 균형형', desc: '부동산, 금융, 세금처럼 이해관계가 충돌하는 의제를 추적합니다.' },
        { key: 'institution', title: '제도 설계 감시형', desc: '행정, 국회, 규제처럼 절차와 권한 배분에 관심이 높습니다.' },
        { key: 'portfolio', title: '의제 포트폴리오형', desc: '한 분야에 치우치지 않고 여러 의제를 고르게 모읍니다.' },
        { key: 'starter', title: '의제 탐색형', desc: '아직 특정 분야로 성향이 고정되지 않은 시작 구간입니다.' },
    ];

    function pickActivityTier(score) {
        return accountActivityTiers.slice().reverse().find(tier => score >= tier.min) || accountActivityTiers[0];
    }

    function getVoteValue(vote) {
        if (vote === 'strong-agree') return 2;
        if (vote === 'agreeish' || vote === 'agree') return 1;
        if (vote === 'disagreeish' || vote === 'disagree') return -1;
        if (vote === 'strong-disagree') return -2;
        return 0;
    }

    function pickJudgmentTier(votedIssues) {
        if (!votedIssues.length) {
            return {
                title: '판단 예열형',
                desc: '아직 투표 데이터가 적어 찬반 온도를 단정하지 않습니다.',
                value: '투표 대기',
            };
        }
        const average = votedIssues.reduce((sum, issue) => sum + getVoteValue(issue.vote), 0) / votedIssues.length;
        const tier = judgmentTiers.find(item => average <= item.max) || judgmentTiers.at(-1);
        const score = Math.round(((average + 2) / 4) * 100);
        return {
            ...tier,
            value: `판단 온도 ${score}점`,
        };
    }

    function normalizeAgendaCategory(category) {
        const text = String(category || '');
        if (/노동|보건|복지|주거|물가/.test(text)) return 'livelihood';
        if (/사회|범죄|안전|약자|인권/.test(text)) return 'fairness';
        if (/교육|산업|과학|기술|AI|반도체|R&D/.test(text)) return 'future';
        if (/부동산|경제|금융|세금|조세|시장/.test(text)) return 'market';
        if (/행정|정부|의회|국회|규제|공항/.test(text)) return 'institution';
        return '';
    }

    function getIssueCategoryByKey(key) {
        const card = findIssueCardByKey(key);
        return card?.querySelector('.issue-category')?.textContent?.trim() || '';
    }

    function pickAgendaProfile(stats) {
        const weights = {};
        const addWeight = (category, weight) => {
            const key = normalizeAgendaCategory(category);
            if (!key) return;
            weights[key] = (weights[key] || 0) + weight;
        };
        stats.savedIssues.forEach(issue => addWeight(issue.category, 3));
        stats.votedIssues.forEach(issue => addWeight(getIssueCategoryByKey(issue.key), 2));
        stats.comments.forEach(comment => addWeight(getIssueCategoryByKey(comment.key), 2));

        const entries = Object.entries(weights).sort((a, b) => b[1] - a[1]);
        const total = entries.reduce((sum, [, value]) => sum + value, 0);
        if (!total) return { ...agendaProfiles.find(item => item.key === 'starter'), value: '데이터 대기' };
        if (entries.length >= 3 && entries[0][1] / total < 0.45) {
            return { ...agendaProfiles.find(item => item.key === 'portfolio'), value: `${entries.length}개 분야` };
        }
        const profile = agendaProfiles.find(item => item.key === entries[0][0]) || agendaProfiles.at(-1);
        return { ...profile, value: `${Math.round((entries[0][1] / total) * 100)}% 집중` };
    }

    function pickDiscussionProfile(stats) {
        const engagement = stats.engagement || {};
        const signals = [
            { key: 'comments', count: engagement.comments || 0, title: '논점 작성형', desc: '짧은 반응보다 직접 의견을 남기는 쪽에 강합니다.' },
            { key: 'replies', count: engagement.replies || 0, title: '대화 연결형', desc: '남의 의견에 이어붙이며 토론의 흐름을 만듭니다.' },
            { key: 'receivedLikes', count: engagement.receivedLikes || 0, title: '공감 유도형', desc: '다른 사람이 반응할 만한 의견을 남기는 편입니다.' },
            { key: 'sentLikes', count: engagement.sentLikes || 0, title: '공감 큐레이터', desc: '좋은 의견을 발견하고 신호를 남기는 데 익숙합니다.' },
            { key: 'saved', count: stats.savedIssues.length, title: '아카이브형', desc: '당장 반응하기보다 다시 볼 이슈를 차곡차곡 모읍니다.' },
            { key: 'votes', count: stats.votes, title: '빠른 판단형', desc: '이슈를 보면 먼저 입장을 표시하며 흐름을 잡습니다.' },
            { key: 'views', count: engagement.views || 0, title: '정독 관찰형', desc: '말하기 전 여러 이슈를 충분히 살펴보는 편입니다.' },
        ].sort((a, b) => b.count - a.count);
        const top = signals[0];
        if (!top || top.count <= 0) {
            return { title: '눈팅 워밍업형', desc: '아직 행동 데이터가 적어 참여 방식이 열려 있습니다.', value: '기록 대기' };
        }
        return { ...top, value: `${top.count.toLocaleString('ko-KR')}회` };
    }

    function getUserTasteAnalysis(user, stats) {
        const ranking = stats.ranking || getAccountRanking(stats);
        const activity = pickActivityTier(ranking.score);
        const judgment = pickJudgmentTier(stats.votedIssues || []);
        const agenda = pickAgendaProfile(stats);
        const discussion = pickDiscussionProfile(stats);
        return {
            activity,
            judgment,
            agenda,
            discussion,
            ranking,
            axisCount: 4,
            combinationCount: accountActivityTiers.length * (judgmentTiers.length + 1) * agendaProfiles.length * 8,
            signatureTitle: `${agenda.title} · ${judgment.title}`,
            shareText: `${user?.name || 'Deep Survey 사용자'}님의 성향은 ${agenda.title}, ${judgment.title}, ${discussion.title}입니다.`,
        };
    }

    function getAccountStats(user) {
        const savedIssues = readSavedIssues(user.id);
        const comments = getAccountComments(user);
        const activity = readAccountActivity(user.id);
        const votedIssues = readVotedIssueEntries();
        const votes = activity.filter(item => item.type === 'vote').length;
        const shares = Object.values(readSocialStore()).reduce((sum, item) => sum + (Number(item?.shareDelta) || 0), 0);
        const lastActive = [user.signedInAt, ...activity.map(item => item.createdAt), ...savedIssues.map(issue => issue.savedAt)]
            .filter(Boolean)
            .sort()
            .at(-1);
        const stats = {
            savedIssues,
            comments,
            activity,
            votedIssues,
            votes,
            shares,
            lastActive,
        };
        stats.engagement = getAccountEngagementBreakdown(user, comments, activity);
        stats.ranking = getAccountRanking(stats);
        return stats;
    }

    function renderAccountTabs(activeView) {
        const tabs = [
            ['overview', '요약'],
            ['taste', '성향분석'],
            ['billing', '결제'],
            ['saved', '저장'],
            ['data', '데이터'],
            ['settings', '설정'],
        ];
        return `<div class="account-tabs" role="tablist" aria-label="마이페이지 메뉴">
            ${tabs.map(([view, label]) => `<button type="button" role="tab" data-account-view="${view}" class="${activeView === view ? 'active' : ''}" aria-selected="${activeView === view ? 'true' : 'false'}">${label}</button>`).join('')}
        </div>`;
    }

    function renderAccountModalTitle(user) {
        if (!user) return '마이페이지';
        const analysis = getUserTasteAnalysis(user, getAccountStats(user));
        return `<span class="account-title-avatar">${escapeHtml(analysis.signatureTitle.slice(0, 1))}</span>
            <span class="account-title-copy">
                <span>${escapeHtml(user.providerLabel || 'Google')} 프로필</span>
                <strong>${escapeHtml(analysis.signatureTitle)}</strong>
            </span>`;
    }

    function renderAccountMetric(label, value, note) {
        return `<div class="account-metric">
            <span>${escapeHtml(label)}</span>
            <strong>${escapeHtml(value)}</strong>
            <small>${escapeHtml(note)}</small>
        </div>`;
    }

    function renderRecentActivity(activity) {
        if (!activity.length) {
            return '<div class="saved-empty">아직 계정 활동이 없습니다.</div>';
        }
        return `<div class="account-activity-list">${activity.slice(0, 5).map(item => `
            <article class="account-activity-item">
                <span>${escapeHtml(activityTypeLabel(item.type))}</span>
                <strong>${escapeHtml(item.label)}</strong>
                <small>${escapeHtml(formatSavedAt(item.createdAt))}</small>
            </article>
        `).join('')}</div>`;
    }

    function activityTypeLabel(type) {
        const labels = {
            login: '로그인',
            logout: '로그아웃',
            save: '저장',
            'save-update': '갱신',
            remove: '삭제',
            comment: '댓글',
            vote: '투표',
            like: '좋아요',
            export: '내보내기',
            settings: '설정',
        };
        return labels[type] || '활동';
    }

    function renderTrustChecklist(preferences, stats) {
        return '';
    }

    function renderDefaultAudienceControl(preferences) {
        const current = normalizeAudienceMode(preferences.defaultAudience);
        const modes = [
            ['home', '홈'],
            ['sim', '시뮬레이션'],
            ['parliament', '의회'],
            ['government', '정부'],
        ];
        return `<div class="account-section account-default-screen">
            <div class="account-section-head"><strong>기본 화면</strong><span>${escapeHtml(modes.find(([mode]) => mode === current)?.[1] || '홈')}</span></div>
            <div class="account-segmented account-segmented-quad" role="group" aria-label="기본 화면">
                ${modes.map(([mode, label]) => `<button type="button" data-account-audience="${mode}" class="${current === mode ? 'active' : ''}" aria-pressed="${current === mode ? 'true' : 'false'}">${escapeHtml(label)}</button>`).join('')}
            </div>
        </div>`;
    }

    function renderAccountRankCard(stats) {
        const ranking = stats.ranking || getAccountRanking(stats);
        return `<div class="account-rank-card">
            <span>참여 랭킹</span>
            <strong>${escapeHtml(ranking.label)}</strong>
            <small>${ranking.score.toLocaleString('ko-KR')}점 · 댓글, 투표, 저장, 좋아요 활동 반영</small>
        </div>`;
    }

    function renderTasteAxisCard(label, axis) {
        return `<article class="taste-axis-card">
            <div class="taste-axis-label">
                <span>${escapeHtml(label)}</span>
                <em>${escapeHtml(axis.value || axis.level || '')}</em>
            </div>
            <strong>${escapeHtml(axis.title)}</strong>
            <p>${escapeHtml(axis.desc)}</p>
        </article>`;
    }

    function buildAccountAnalysisUrl(user) {
        const url = new URL(window.location.href);
        url.searchParams.delete('issue');
        url.hash = `taste-${encodeURIComponent(user?.id || 'local')}`;
        return url.toString();
    }

    async function shareAccountAnalysis(user, stats) {
        const analysis = getUserTasteAnalysis(user, stats);
        const url = buildAccountAnalysisUrl(user);
        try {
            if (navigator.share) {
                await navigator.share({
                    title: 'Deep Survey 성향분석',
                    text: analysis.shareText,
                    url,
                });
                showShareToast('성향분석을 공유했어요');
                return;
            }
        } catch (_) {
            // User cancellation falls through to copy.
        }
        await copyText(`${analysis.shareText}\n${url}`);
        showShareToast('성향분석 링크를 복사했어요');
    }

    function renderAccountTasteAnalysis(user, stats) {
        const analysis = getUserTasteAnalysis(user, stats);
        const axisCards = [
            ['참여 내공', analysis.activity],
            ['판단 온도', analysis.judgment],
            ['의제 취향', analysis.agenda],
            ['참여 방식', analysis.discussion],
        ];
        return `
            <section class="taste-hero">
                <span>Deep Survey 성향분석</span>
                <strong>${escapeHtml(analysis.signatureTitle)}</strong>
                <p>${analysis.axisCount}개 축 · ${analysis.combinationCount.toLocaleString('ko-KR')}개 조합 · ${escapeHtml(analysis.ranking.label)}</p>
                <button type="button" data-account-share-analysis>공유하기</button>
            </section>
            <div class="taste-axis-grid">
                ${axisCards.map(([label, axis]) => renderTasteAxisCard(label, axis)).join('')}
            </div>
            <section class="account-section taste-growth-card">
                <div class="account-section-head">
                    <strong>성장 랭킹</strong>
                    <span>${escapeHtml(analysis.activity.level || '')}</span>
                </div>
                <strong>${escapeHtml(analysis.activity.title)}</strong>
                <p>${escapeHtml(analysis.activity.desc)}</p>
                <div class="taste-scorebar" aria-label="참여 점수">
                    <span style="width:${Math.min(100, Math.max(6, analysis.ranking.score / 15))}%"></span>
                </div>
                <small>${analysis.ranking.score.toLocaleString('ko-KR')}점 · 실제 사용자 행동 기반 로컬 점수</small>
            </section>
            <section class="account-section taste-evidence-card">
                <div class="account-section-head"><strong>분석에 쓴 신호</strong><span>로컬 기록</span></div>
                <div class="taste-evidence-grid">
                    <span>투표 <strong>${stats.votes.toLocaleString('ko-KR')}</strong></span>
                    <span>댓글 <strong>${stats.engagement.comments.toLocaleString('ko-KR')}</strong></span>
                    <span>대댓글 <strong>${stats.engagement.replies.toLocaleString('ko-KR')}</strong></span>
                    <span>저장 <strong>${stats.savedIssues.length.toLocaleString('ko-KR')}</strong></span>
                    <span>좋아요 <strong>${stats.engagement.sentLikes.toLocaleString('ko-KR')}</strong></span>
                    <span>받은 좋아요 <strong>${stats.engagement.receivedLikes.toLocaleString('ko-KR')}</strong></span>
                </div>
            </section>
        `;
    }

    function renderAccountOverview(user, preferences, stats) {
        const analysis = getUserTasteAnalysis(user, stats);
        return `
            ${renderPersonaProfile(user, false, analysis)}
            ${renderAccountRankCard(stats)}
            ${renderDefaultAudienceControl(preferences)}
            <div class="account-metrics">
                ${renderAccountMetric('저장 이슈', String(stats.savedIssues.length), '최대 80개 보관')}
                ${renderAccountMetric('작성 댓글', String(stats.comments.length), '이슈별 의견')}
                ${renderAccountMetric('투표 활동', String(stats.votes), '동의/비동의')}
                ${renderAccountMetric('최근 활동', formatSavedAt(stats.lastActive), '로컬 기준')}
            </div>
            <div class="account-section">
                <div class="account-section-head"><strong>최근 활동</strong><button type="button" data-account-view="data">데이터</button></div>
                ${renderRecentActivity(stats.activity)}
            </div>
        `;
    }

    function renderSavedIssues(savedIssues) {
        if (!savedIssues.length) {
            return '<div class="saved-empty">저장한 이슈가 없습니다.</div>';
        }
        return `<div class="saved-issue-list">${savedIssues.map((issue, index) => `
            <article class="saved-issue-card">
                <span>${escapeHtml(issue.category)}</span>
                <strong>${escapeHtml(issue.title)}</strong>
                <small>${escapeHtml(issue.meta || '메타 정보 없음')} · ${escapeHtml(formatSavedAt(issue.savedAt))}</small>
                <div class="saved-issue-actions">
                    <button class="primary" type="button" data-open-saved-index="${index}">열기</button>
                    <button type="button" data-remove-saved-index="${index}">삭제</button>
                </div>
            </article>
        `).join('')}</div>`;
    }

    function renderAccountVoteHistory(votedIssues) {
        if (!votedIssues.length) {
            return '<div class="saved-empty">아직 투표한 이슈가 없습니다.</div>';
        }
        return `<div class="account-data-table account-vote-table" role="table" aria-label="투표 기록">
            ${votedIssues.map(issue => `<div class="account-data-row account-vote-row" role="row">
                <span>${escapeHtml(issue.title)}</span>
                <strong>${escapeHtml(issue.label)}</strong>
                <button type="button" data-account-revote-key="${escapeHtml(issue.key)}">재투표</button>
            </div>`).join('')}
        </div>`;
    }

    function renderAccountSaved(stats) {
        return `
            <div class="account-section-head account-section-head-top">
                <strong>저장 이슈 ${stats.savedIssues.length}개</strong>
                ${stats.savedIssues.length ? '<button type="button" data-account-clear-saved>비우기</button>' : ''}
            </div>
            ${renderSavedIssues(stats.savedIssues)}
        `;
    }

    function renderAccountData(user, preferences, stats) {
        const engagement = stats.engagement || {};
        const inventory = [
            ['계정', user ? 1 : 0, formatFullDate(user?.signedInAt)],
            ['설정', 1, formatFullDate(preferences.updatedAt)],
            ['저장 이슈', stats.savedIssues.length, stats.savedIssues[0] ? formatFullDate(stats.savedIssues[0].savedAt) : '-'],
            ['조회', engagement.views || 0, stats.lastActive ? formatFullDate(stats.lastActive) : '-'],
            ['댓글', engagement.comments || 0, stats.lastActive ? formatFullDate(stats.lastActive) : '-'],
            ['대댓글', engagement.replies || 0, stats.lastActive ? formatFullDate(stats.lastActive) : '-'],
            ['받은 좋아요', engagement.receivedLikes || 0, stats.lastActive ? formatFullDate(stats.lastActive) : '-'],
            ['보낸 좋아요', engagement.sentLikes || 0, stats.lastActive ? formatFullDate(stats.lastActive) : '-'],
        ];
        return `
            <div class="account-data-table" role="table" aria-label="로컬 데이터 현황">
                ${inventory.map(([label, count, updated]) => `<div class="account-data-row" role="row">
                    <span>${escapeHtml(label)}</span>
                    <strong>${escapeHtml(count)}</strong>
                    <small>${escapeHtml(updated)}</small>
                </div>`).join('')}
            </div>
            <div class="account-data-actions">
                <button class="primary" type="button" data-account-export>내 데이터 내보내기</button>
                <button type="button" data-account-reset-preferences>기본값 초기화</button>
                <button type="button" data-account-clear-activity>활동 기록 비우기</button>
                <button type="button" data-account-clear-saved>저장 이슈 비우기</button>
                <button class="danger" type="button" data-account-delete-local>로컬 계정 데이터 삭제</button>
                <button type="button" data-logout-user>로그아웃</button>
            </div>
            <div class="account-section">
                <div class="account-section-head"><strong>투표 기록</strong><span>재투표는 여기서만</span></div>
                ${renderAccountVoteHistory(stats.votedIssues || [])}
            </div>
        `;
    }

    function renderAccountBilling(user) {
        const planTier = getUserPlanTier(user);
        return `
            <section class="account-billing-card">
                <span>현재 플랜</span>
                <strong>${escapeHtml(planTier)}</strong>
                <p>결제와 플랜 관리는 계정 설정과 분리해서 확인합니다.</p>
                <button type="button" data-account-billing-open>결제 관리</button>
            </section>
            <div class="account-section">
                <div class="account-section-head"><strong>플랜 상태</strong><span>${escapeHtml(planTier === 'FREE' ? '무료' : '활성')}</span></div>
                <div class="account-data-table" role="table" aria-label="결제 상태">
                    <div class="account-data-row" role="row"><span>요금제</span><strong>${escapeHtml(planTier)}</strong><small>현재 계정</small></div>
                    <div class="account-data-row" role="row"><span>청구</span><strong>${escapeHtml(planTier === 'FREE' ? '없음' : '활성')}</strong><small>데모 기준</small></div>
                </div>
            </div>
        `;
    }

    function renderAccountSettings(user, preferences) {
        const themeMode = getCurrentThemeMode();
        const resolvedTheme = root.getAttribute('data-theme') === 'dark' ? '다크' : '라이트';
        return `
            <section class="account-section">
                <div class="account-section-head"><strong>화면 모드</strong><span>현재 ${escapeHtml(resolvedTheme)}</span></div>
                <div class="account-segmented account-segmented-quad" role="group" aria-label="화면 모드">
                    ${[
                        ['system', '시스템'],
                        ['light', '라이트'],
                        ['dark', '다크'],
                    ].map(([mode, label]) => `<button type="button" data-account-theme-choice="${mode}" class="${themeMode === mode ? 'active' : ''}" aria-pressed="${themeMode === mode ? 'true' : 'false'}">${label}</button>`).join('')}
                </div>
            </section>
            <section class="account-section">
                <div class="account-section-head"><strong>계정</strong><span>${escapeHtml(user.providerLabel || 'Google')}</span></div>
                <div class="account-data-actions">
                    <button type="button" data-logout-user>로그아웃</button>
                </div>
            </section>
        `;
    }

    function openMyPage(view = 'overview') {
        const user = getCurrentUser();
        if (!user) {
            openLogin('마이페이지는 로그인 후 이용할 수 있습니다.');
            return;
        }

        const activeView = ['overview', 'taste', 'billing', 'saved', 'data', 'settings'].includes(view) ? view : 'overview';
        const preferences = readAccountPreferences(user.id);
        const stats = getAccountStats(user);
        const viewHtml = {
            overview: renderAccountOverview(user, preferences, stats),
            taste: renderAccountTasteAnalysis(user, stats),
            billing: renderAccountBilling(user),
            saved: renderAccountSaved(stats),
            data: renderAccountData(user, preferences, stats),
            settings: renderAccountSettings(user, preferences),
        }[activeView];

        setAccountModalContent('마이페이지', `
            ${renderAccountTabs(activeView)}
            <div class="account-view account-view-${activeView}" data-account-current-view="${activeView}">
                ${viewHtml}
            </div>
        `, renderAccountModalTitle(user));
    }

    function buildAccountExportPayload(user) {
        const stats = getAccountStats(user);
        return {
            exportedAt: new Date().toISOString(),
            service: 'Deep Survey',
            scope: 'local-demo-account',
            user,
            preferences: readAccountPreferences(user.id),
            savedIssues: readSavedIssues(user.id),
            comments: getAccountComments(user),
            activity: readAccountActivity(user.id),
            tasteAnalysis: getUserTasteAnalysis(user, stats),
        };
    }

    function downloadJson(filename, payload) {
        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        link.remove();
        setTimeout(() => URL.revokeObjectURL(link.href), 1000);
    }

    function exportCurrentAccountData() {
        const user = getCurrentUser();
        if (!user) return;
        const filename = `deep-survey-account-${new Date().toISOString().slice(0, 10)}.json`;
        downloadJson(filename, buildAccountExportPayload(user));
        logAccountActivity('export', '내 데이터 내보내기');
        openMyPage('data');
        showShareToast('내 데이터를 내려받았어요');
    }

    function clearCurrentSavedIssues() {
        const user = getCurrentUser();
        if (!user) return;
        if (!window.confirm('저장한 이슈를 모두 비울까요?')) return;
        writeSavedIssues(user.id, []);
        logAccountActivity('remove', '저장 이슈 전체 비우기');
        document.querySelectorAll('.issue-card').forEach(refreshIssueSocialBar);
        openMyPage('saved');
        showShareToast('저장 이슈를 비웠어요');
    }

    function clearCurrentAccountActivity() {
        const user = getCurrentUser();
        if (!user) return;
        if (!window.confirm('활동 기록을 비울까요?')) return;
        writeAccountActivity(user.id, []);
        openMyPage('data');
        showShareToast('활동 기록을 비웠어요');
    }

    function deleteCurrentLocalAccountData() {
        const user = getCurrentUser();
        if (!user) return;
        if (!window.confirm('이 브라우저에 저장된 계정 데이터를 삭제할까요?')) return;

        const allSaved = readJsonStorage(savedIssuesStorageKey, {});
        delete allSaved[user.id];
        writeJsonStorage(savedIssuesStorageKey, allSaved);

        const allPreferences = readJsonStorage(accountPreferencesStorageKey, {});
        delete allPreferences[user.id];
        writeJsonStorage(accountPreferencesStorageKey, allPreferences);

        const allActivity = readJsonStorage(accountActivityStorageKey, {});
        delete allActivity[user.id];
        writeJsonStorage(accountActivityStorageKey, allActivity);

        const allComments = readJsonStorage(commentsStorageKey, {});
        Object.keys(allComments).forEach(key => {
            allComments[key] = (allComments[key] || []).filter(comment => comment.userId !== user.id && comment.author !== user.name);
        });
        writeJsonStorage(commentsStorageKey, allComments);

        setCurrentUser(null);
        closeAccountModal();
        applyAccountPreferences(readAccountPreferences('guest'));
        updateAuthButtons();
        document.querySelectorAll('.issue-card').forEach(refreshIssueSocialBar);
        showShareToast('로컬 계정 데이터를 삭제했어요');
    }

    function openSavedIssue(index) {
        const user = getCurrentUser();
        if (!user) return;
        const issue = readSavedIssues(user.id)[index];
        if (!issue) return;
        closeAccountModal();
        applyAudienceMode('b2c', true);
        const card = Array.from(document.querySelectorAll('.issue-card')).find(item => item.dataset.issueKey === issue.key);
        if (!card) {
            window.location.href = issue.url;
            return;
        }
        if (issue.key) {
            const url = new URL(window.location.href);
            url.searchParams.set('issue', issue.key);
            url.hash = '';
            window.history.replaceState({}, '', url.toString());
        }
        card.classList.add('is-shared-target');
        setTimeout(() => card.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
        setTimeout(() => card.classList.remove('is-shared-target'), 2400);
    }

    function requestIssueRevote(key) {
        if (!key) return;
        const store = readSocialStore();
        if (store[key]) {
            delete store[key].vote;
            delete store[key].voteUpdatedAt;
            writeSocialStore(store);
        }
        closeAccountModal();
        applyAudienceMode('b2c', true);
        const card = findIssueCardByKey(key);
        if (!card) {
            showShareToast('해당 이슈를 홈에서 다시 선택해 주세요');
            return;
        }
        if (typeof window.resetIssueCardForRevote === 'function') {
            window.resetIssueCardForRevote(card);
        }
        refreshIssueSocialBar(card);
        card.classList.add('is-shared-target');
        setTimeout(() => card.scrollIntoView({ behavior: 'smooth', block: 'center' }), 60);
        setTimeout(() => card.classList.remove('is-shared-target'), 2200);
        showShareToast('다시 투표할 수 있어요');
    }

    function removeSavedIssue(index) {
        const user = getCurrentUser();
        if (!user) return;
        const savedIssues = readSavedIssues(user.id);
        if (!savedIssues[index]) return;
        const removedTitle = savedIssues[index].title || '저장 이슈';
        savedIssues.splice(index, 1);
        writeSavedIssues(user.id, savedIssues);
        logAccountActivity('remove', removedTitle);
        openMyPage('saved');
        showShareToast('저장 목록에서 삭제했어요');
    }

    function readIssueComments(key) {
        const allComments = readJsonStorage(commentsStorageKey, {});
        return Array.isArray(allComments[key]) ? allComments[key] : [];
    }

    function writeIssueComments(key, comments) {
        const allComments = readJsonStorage(commentsStorageKey, {});
        allComments[key] = comments.slice(-80);
        writeJsonStorage(commentsStorageKey, allComments);
    }

    function findIssueCardByKey(key) {
        return Array.from(document.querySelectorAll('.issue-card')).find(card => extractIssueKey(card) === key);
    }

    function renderCommentList(comments) {
        if (!comments.length) return '<div class="comment-empty">아직 댓글이 없습니다.</div>';
        return `<div class="comment-list">${comments.slice().reverse().map(comment => `
            <article class="comment-item">
                <div class="comment-meta"><strong>${escapeHtml(comment.author)}</strong><span>${escapeHtml(formatSavedAt(comment.createdAt))}</span></div>
                <p>${escapeHtml(comment.text)}</p>
            </article>
        `).join('')}</div>`;
    }

    function openIssueComments(card) {
        const user = getCurrentUser();
        if (!user) {
            pendingCommentCard = card;
            openLogin('댓글을 작성하려면 로그인이 필요합니다.');
            return;
        }

        const data = getIssueShareData(card);
        const key = data.key || data.title;
        const comments = readIssueComments(key);
        setAccountModalContent('댓글', `
            <div class="comment-thread">
                <div class="comment-thread-title">${escapeHtml(data.title)}</div>
                ${renderCommentList(comments)}
                <div class="comment-form">
                    <textarea id="issue-comment-input" rows="3" maxlength="300" placeholder="의견을 남겨주세요"></textarea>
                    <button type="button" data-comment-submit data-comment-key="${escapeHtml(key)}">댓글 달기</button>
                </div>
            </div>
        `);
    }

    function submitIssueComment(key) {
        const user = getCurrentUser();
        const input = document.getElementById('issue-comment-input');
        const text = input?.value?.trim();
        if (!user || !key || !text) return;

        const comments = readIssueComments(key);
        comments.push({
            userId: user.id,
            author: user.name || user.providerLabel || '사용자',
            text,
            createdAt: new Date().toISOString(),
        });
        writeIssueComments(key, comments);

        const card = findIssueCardByKey(key);
        if (card) {
            setIssueSocialState(key, { commentDelta: comments.length });
            refreshIssueSocialBar(card);
            openIssueComments(card);
        } else {
            input.value = '';
        }
        logAccountActivity('comment', key);
        showShareToast('댓글을 남겼어요');
    }

    window.openLogin = openLogin;
    window.openMyPage = openMyPage;
    window.logoutUser = logoutUser;

    function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight, maxLines) {
        const words = String(text).split(/\s+/);
        const lines = [];
        let line = '';
        words.forEach(word => {
            const next = line ? `${line} ${word}` : word;
            if (ctx.measureText(next).width <= maxWidth) {
                line = next;
                return;
            }
            if (line) lines.push(line);
            line = word;
        });
        if (line) lines.push(line);
        lines.slice(0, maxLines).forEach((row, index) => {
            const suffix = index === maxLines - 1 && lines.length > maxLines ? '...' : '';
            ctx.fillText(row + suffix, x, y + index * lineHeight);
        });
        return Math.min(lines.length, maxLines) * lineHeight;
    }

    function drawRoundRect(ctx, x, y, width, height, radius) {
        const r = Math.min(radius, width / 2, height / 2);
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + width - r, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + r);
        ctx.lineTo(x + width, y + height - r);
        ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
        ctx.lineTo(x + r, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
    }

    function parseCanvasPercent(value) {
        const match = String(value || '').replace(/,/g, '').match(/-?\d+(?:\.\d+)?/);
        return match ? Number(match[0]) : 0;
    }

    function getCanvasStyleColor(el, fallback) {
        if (!el) return fallback;
        const color = getComputedStyle(el).backgroundColor;
        return color && color !== 'rgba(0, 0, 0, 0)' ? color : fallback;
    }

    function getPollExportRows(card) {
        const defaults = [
            { label: '동의', valueText: '-', fills: [{ pct: 0, color: '#1597D4' }] },
            { label: '비동의', valueText: '-', fills: [{ pct: 0, color: '#D45C4C' }] },
        ];
        const rows = Array.from(card.querySelectorAll('.poll-main-bars .poll-bar-row')).slice(0, 2).map((row, index) => {
            const label = row.querySelector('.poll-bar-label span')?.textContent?.trim() || defaults[index]?.label || '응답';
            const valueText = row.querySelector('.poll-bar-label strong')?.textContent?.trim() || '-';
            const fills = Array.from(row.querySelectorAll('.poll-bar-fill')).map(fill => ({
                pct: Math.max(0, Math.min(100, parseFloat(fill.style.width || '0') || 0)),
                color: getCanvasStyleColor(fill, index === 0 ? '#1597D4' : '#D45C4C'),
            })).filter(fill => fill.pct > 0);
            return {
                label,
                valueText,
                fills: fills.length ? fills : defaults[index].fills,
            };
        });
        return rows.length ? rows : defaults;
    }

    function drawStackedCanvasBar(ctx, x, y, width, height, fills, background = '#E7E8EA') {
        drawRoundRect(ctx, x, y, width, height, height / 2);
        ctx.fillStyle = background;
        ctx.fill();
        ctx.save();
        drawRoundRect(ctx, x, y, width, height, height / 2);
        ctx.clip();
        let currentX = x;
        fills.forEach(fill => {
            const segmentWidth = width * Math.max(0, Math.min(100, fill.pct)) / 100;
            ctx.fillStyle = fill.color;
            ctx.fillRect(currentX, y, segmentWidth, height);
            currentX += segmentWidth;
        });
        ctx.restore();
    }

    function formatCanvasPct(value) {
        const numeric = Number(value) || 0;
        const rounded = Math.round(numeric * 10) / 10;
        return Number.isInteger(rounded) ? rounded.toFixed(0) : rounded.toFixed(1);
    }

    function formatCanvasPoint(value) {
        const numeric = Number(value) || 0;
        const prefix = numeric > 0 ? '+' : numeric < 0 ? '-' : '';
        return `${prefix}${formatCanvasPct(Math.abs(numeric))}%p`;
    }

    function getExportIssue(card) {
        const key = extractIssueKey(card);
        const store = window.deepSurveyIssueData || {};
        return store[key] || Object.values(store).find(issue => issue?.title === getIssueShareData(card).title) || null;
    }

    function getCanvasTotals(stats = {}) {
        const agree = (+stats.agree || 0) + (+stats.agreeish || 0);
        const disagree = (+stats.disagreeish || 0) + (+stats.disagree || 0);
        const unsure = +stats.unsure || 0;
        return { agree, disagree, unsure, net: agree - disagree };
    }

    function segmentRowsFromIssue(issue) {
        const groups = [
            ['성향', { 진보: issue?.ideology?.prog, 중도: issue?.ideology?.mod, 보수: issue?.ideology?.cons }],
            ['연령', { '20대': issue?.age?.a20, '40대': issue?.age?.a40, '60대': issue?.age?.a60 }],
            ['지역', { 호남: issue?.region?.honam, 서울: issue?.region?.seoul, 영남: issue?.region?.yeongnam }],
        ];
        return groups.flatMap(([group, rows]) => Object.entries(rows).map(([label, dist]) => {
            const values = Array.isArray(dist) ? dist : [0, 0, 0, 0, 0];
            return {
                group,
                label,
                agree: (+values[0] || 0) + (+values[1] || 0),
                disagree: (+values[2] || 0) + (+values[3] || 0),
                unsure: +values[4] || 0,
            };
        }));
    }

    function agreementColor(value) {
        if (value >= 62) return '#1597D4';
        if (value >= 44) return '#E2A72E';
        return '#D45C4C';
    }

    function drawMetricChip(ctx, label, value, color, x, y, width) {
        drawRoundRect(ctx, x, y, width, 84, 16);
        ctx.fillStyle = '#f8fafc';
        ctx.fill();
        ctx.strokeStyle = '#e5e7eb';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.fillStyle = '#6b7280';
        ctx.font = '800 18px "Noto Sans KR", "Google Sans", sans-serif';
        ctx.fillText(label, x + 22, y + 30);
        ctx.fillStyle = color;
        ctx.font = '900 33px "Noto Sans KR", "Google Sans", sans-serif';
        ctx.fillText(value, x + 22, y + 66);
    }

    function drawTargetBand(ctx, target, x, y, width) {
        drawRoundRect(ctx, x, y, width, 98, 20);
        ctx.fillStyle = 'rgba(21,151,212,.08)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(21,151,212,.24)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.fillStyle = '#0578B8';
        ctx.font = '900 18px "Noto Sans KR", "Google Sans", sans-serif';
        ctx.fillText('핵심 타겟', x + 28, y + 38);
        ctx.fillStyle = '#111827';
        ctx.font = '800 23px "Noto Sans KR", "Google Sans", sans-serif';
        wrapCanvasText(ctx, target, x + 150, y + 36, width - 186, 30, 2);
        return 98;
    }

    function drawSegmentReport(ctx, issue, x, y, width) {
        const rows = segmentRowsFromIssue(issue);
        drawRoundRect(ctx, x, y, width, 500, 22);
        ctx.fillStyle = '#fbfcfe';
        ctx.fill();
        ctx.strokeStyle = '#e5e7eb';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = '#111827';
        ctx.font = '900 28px "Noto Sans KR", "Google Sans", sans-serif';
        ctx.fillText('세그먼트별 동의율', x + 28, y + 48);
        ctx.fillStyle = '#6b7280';
        ctx.font = '700 17px "Noto Sans KR", "Google Sans", sans-serif';
        ctx.fillText('성향 · 연령 · 지역별 top2 응답 비교', x + 28, y + 78);

        rows.forEach((row, index) => {
            const rowY = y + 122 + index * 40;
            ctx.fillStyle = '#9ca3af';
            ctx.font = '800 15px "Noto Sans KR", "Google Sans", sans-serif';
            ctx.fillText(row.group, x + 28, rowY);
            ctx.fillStyle = '#111827';
            ctx.font = '900 18px "Noto Sans KR", "Google Sans", sans-serif';
            ctx.fillText(row.label, x + 88, rowY);
            const value = Math.max(0, Math.min(100, row.agree));
            const color = agreementColor(value);
            ctx.fillStyle = color;
            ctx.font = '900 19px "Noto Sans KR", "Google Sans", sans-serif';
            ctx.fillText(`${formatCanvasPct(value)}%`, x + 188, rowY);
            drawStackedCanvasBar(ctx, x + 278, rowY - 17, width - 330, 18, [{ pct: value, color }], '#E7E8EA');
        });
        return 500;
    }

    function drawRiskReport(ctx, issue, x, y, width) {
        const critical = (issue?.risks?.critical || []).slice(0, 2);
        const insight = (issue?.risks?.insight || []).slice(0, 2);
        const lines = [
            ...critical.map(text => ({ label: '리스크', color: '#D45C4C', text })),
            ...insight.map(text => ({ label: '인사이트', color: '#1597D4', text })),
        ].slice(0, 4);
        if (!lines.length) {
            lines.push({ label: '메모', color: '#6b7280', text: '상세 리스크와 인사이트는 이슈 데이터 수집 후 자동 보강됩니다.' });
        }

        drawRoundRect(ctx, x, y, width, 250, 22);
        ctx.fillStyle = '#fbfcfe';
        ctx.fill();
        ctx.strokeStyle = '#e5e7eb';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.fillStyle = '#111827';
        ctx.font = '900 28px "Noto Sans KR", "Google Sans", sans-serif';
        ctx.fillText('핵심 리스크 / 인사이트', x + 28, y + 48);

        lines.forEach((line, index) => {
            const lineY = y + 86 + index * 38;
            drawRoundRect(ctx, x + 28, lineY - 19, 78, 25, 12);
            ctx.fillStyle = `${line.color}22`;
            ctx.fill();
            ctx.fillStyle = line.color;
            ctx.font = '900 13px "Noto Sans KR", "Google Sans", sans-serif';
            ctx.fillText(line.label, x + 42, lineY - 2);
            ctx.fillStyle = '#4b5563';
            ctx.font = '700 17px "Noto Sans KR", "Google Sans", sans-serif';
            wrapCanvasText(ctx, line.text, x + 122, lineY, width - 160, 21, 1);
        });
        return 250;
    }

    function drawIssueImage(card, data) {
        const width = 1080;
        const height = 2600;
        const canvas = document.createElement('canvas');
        canvas.width = width * 2;
        canvas.height = height * 2;
        const ctx = canvas.getContext('2d');
        ctx.scale(2, 2);
        const issue = getExportIssue(card) || {};
        const totals = getCanvasTotals(issue.stats || {});

        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(0, 0, width, height);
        drawRoundRect(ctx, 56, 56, width - 112, height - 112, 32);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.strokeStyle = '#e5e7eb';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#111827';
        ctx.font = '900 34px "Noto Sans KR", "Google Sans", sans-serif';
        ctx.fillText('Deep Survey poll', 96, 128);
        ctx.fillStyle = '#6b7280';
        ctx.font = '800 19px "Noto Sans KR", "Google Sans", sans-serif';
        ctx.fillText('상세 리포트', width - 226, 128);

        ctx.font = '900 25px "Noto Sans KR", "Google Sans", sans-serif';
        const categoryWidth = Math.ceil(ctx.measureText(data.category).width + 48);
        drawRoundRect(ctx, 96, 188, categoryWidth, 54, 27);
        ctx.fillStyle = 'rgba(21,151,212,.14)';
        ctx.fill();
        ctx.fillStyle = '#0578B8';
        ctx.fillText(data.category || '이슈', 120, 224);

        ctx.fillStyle = '#111827';
        ctx.font = '900 58px "Noto Sans KR", "Google Sans", sans-serif';
        const titleHeight = wrapCanvasText(ctx, data.title, 96, 330, width - 192, 72, 4);

        ctx.fillStyle = '#6b7280';
        ctx.font = '700 28px "Noto Sans KR", "Google Sans", sans-serif';
        ctx.fillText(data.meta || 'Deep Survey reaction intelligence', 96, 362 + titleHeight);

        const netEl = card.querySelector('.net-opinion-chart');
        const netLabel = netEl?.querySelector('.net-opinion-label')?.textContent?.trim() || '순동의 (동의 - 비동의)';
        const netValue = issue.stats ? formatCanvasPoint(totals.net) : (netEl?.querySelector('.net-opinion-value')?.textContent?.trim() || '-');
        const netNumber = Math.min(100, Math.abs(issue.stats ? totals.net : parseCanvasPercent(netValue)));
        const netColor = (issue.stats ? totals.net < 0 : netEl?.classList.contains('is-negative')) ? '#D45C4C' : (issue.stats ? totals.net === 0 : netEl?.classList.contains('is-neutral')) ? '#6b7280' : '#1597D4';
        const chartY = Math.max(560, 468 + titleHeight);

        ctx.fillStyle = '#4b5563';
        ctx.font = '900 24px "Noto Sans KR", "Google Sans", sans-serif';
        ctx.fillText(netLabel, 96, chartY);
        ctx.fillStyle = netColor;
        ctx.font = '900 44px "Noto Sans KR", "Google Sans", sans-serif';
        ctx.fillText(netValue, 96, chartY + 58);
        drawStackedCanvasBar(ctx, 300, chartY + 25, width - 396, 26, [{ pct: netNumber, color: netColor }], '#eef0f3');

        const rows = getPollExportRows(card);
        const barX = 96;
        const barWidth = width - 192;
        if (issue.stats) {
            rows[0] = {
                label: '동의',
                valueText: `${formatCanvasPct(totals.agree)}%`,
                fills: [
                    { pct: +issue.stats.agree || 0, color: '#0578B8' },
                    { pct: +issue.stats.agreeish || 0, color: '#1597D4' },
                ],
            };
            rows[1] = {
                label: '비동의',
                valueText: `${formatCanvasPct(totals.disagree)}%`,
                fills: [
                    { pct: +issue.stats.disagree || 0, color: '#B84C40' },
                    { pct: +issue.stats.disagreeish || 0, color: '#D45C4C' },
                ],
            };
        }
        rows.forEach((row, index) => {
            const y = chartY + 156 + index * 160;
            ctx.fillStyle = '#111827';
            ctx.font = '900 30px "Noto Sans KR", "Google Sans", sans-serif';
            ctx.fillText(row.label, barX, y);
            ctx.fillStyle = index === 0 ? '#1597D4' : '#D45C4C';
            ctx.font = '900 42px "Noto Sans KR", "Google Sans", sans-serif';
            ctx.fillText(row.valueText, width - 260, y);
            drawStackedCanvasBar(ctx, barX, y + 34, barWidth, 34, row.fills, '#E7E8EA');
        });

        const sampleNote = card.querySelector('.poll-sample-note')?.textContent?.trim();
        const sourceNote = card.querySelector('.poll-card-source')?.textContent?.trim();
        const sampleValue = (sampleNote || '').replace(/^표본수\s*/, '') || 'AI 추정';
        const metricY = chartY + 454;
        drawMetricChip(ctx, '판단 유보', `${formatCanvasPct(totals.unsure || parseCanvasPercent(data.stats?.[2]))}%`, '#6b7280', 96, metricY, 260);
        drawMetricChip(ctx, '결과 유형', sampleValue, '#1597D4', 384, metricY, 260);
        drawMetricChip(ctx, '추정 방식', issue.stats ? '세그먼트' : '카드', '#E2A72E', 672, metricY, 312);

        let nextSectionY = metricY + 116;
        if (issue.target) {
            drawTargetBand(ctx, issue.target, 96, nextSectionY, barWidth);
            nextSectionY += 124;
        }

        const segmentY = nextSectionY + 12;
        drawSegmentReport(ctx, issue, 96, segmentY, barWidth);
        const riskY = segmentY + 536;
        drawRiskReport(ctx, issue, 96, riskY, barWidth);

        const footerY = riskY + 314;
        ctx.fillStyle = '#6b7280';
        ctx.font = '700 24px "Noto Sans KR", "Google Sans", sans-serif';
        if (sampleNote) ctx.fillText(sampleNote, 96, footerY);
        ctx.font = '500 18px "Noto Sans KR", "Google Sans", sans-serif';
        wrapCanvasText(ctx, sourceNote || '본 이미지는 Deep Survey 분석 결과 요약입니다.', 96, footerY + 48, width - 192, 26, 4);
        return canvas;
    }

    function waitForNextPaint() {
        return new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    }

    async function prepareIssueCardForImage(card) {
        if (!card) return;
        if (card.classList.contains('is-previewing') && typeof window.showIssueCardChart === 'function') {
            window.showIssueCardChart(card);
            await waitForNextPaint();
        }
    }

    async function saveIssueCardImage(card) {
        await prepareIssueCardForImage(card);
        const data = getIssueShareData(card);
        if (document.fonts?.ready) {
            try {
                await document.fonts.ready;
            } catch (_) {
                // Font loading is best effort for the export image.
            }
        }
        const canvas = drawIssueImage(card, data);
        canvas.toBlob(blob => {
            if (!blob) return;
            const link = document.createElement('a');
            const filename = data.title.replace(/[\\/:*?"<>|]+/g, '').trim().slice(0, 42) || 'deep-survey-issue';
            link.href = URL.createObjectURL(blob);
            link.download = `${filename}.png`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            setTimeout(() => URL.revokeObjectURL(link.href), 1000);
            showShareToast('이미지로 저장했어요');
        }, 'image/png');
    }

    function closeIssueMoreMenus(except) {
        document.querySelectorAll('.issue-more-wrap.open').forEach(menu => {
            if (except && menu === except) return;
            menu.classList.remove('open');
            menu.querySelector('[data-more-trigger]')?.setAttribute('aria-expanded', 'false');
        });
    }

    function bindIssueMenuDocumentListener() {
        if (issueMenuDocumentListenerBound) return;
        issueMenuDocumentListenerBound = true;
        document.addEventListener('click', event => {
            if (event.target.closest('.issue-more-wrap')) return;
            closeIssueMoreMenus();
        });
        document.addEventListener('keydown', event => {
            if (event.key !== 'Escape') return;
            closeIssueMoreMenus();
            closeSettingsMenu();
            closeAccountModal();
        });
    }

    function markIssueViewed(card) {
        const state = getIssueSocialState(card);
        const sessionKey = 'deep-survey-viewed-issues';
        let viewed = [];
        try {
            viewed = JSON.parse(sessionStorage.getItem(sessionKey) || '[]');
        } catch (_) {
            viewed = [];
        }
        if (viewed.includes(state.key)) return;
        viewed.push(state.key);
        try {
            sessionStorage.setItem(sessionKey, JSON.stringify(viewed.slice(-200)));
        } catch (_) {
            // View tracking is best-effort local product telemetry.
        }
        setIssueSocialState(state.key, { viewDelta: state.views + 1 });
        refreshIssueSocialBar(card);
    }

    function observeIssueView(card) {
        if (!('IntersectionObserver' in window)) {
            markIssueViewed(card);
            return;
        }
        if (!issueViewObserver) {
            issueViewObserver = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    markIssueViewed(entry.target);
                    issueViewObserver.unobserve(entry.target);
                });
            }, { threshold: 0.55 });
        }
        issueViewObserver.observe(card);
    }

    function initIssueSharing() {
        bindIssueMenuDocumentListener();
        document.querySelectorAll('.issue-card').forEach(card => {
            if (card.querySelector('.issue-share-actions')) return;
            const key = extractIssueKey(card);
            if (key) card.dataset.issueKey = key;
            const body = card.querySelector('.issue-card-body');
            if (!body) return;
            const issueTitle = card.querySelector('.issue-title')?.textContent?.trim() || '이 이슈';
            const actions = document.createElement('div');
            actions.className = 'issue-share-actions';
            actions.innerHTML = `
                <div class="issue-vote-scale" role="group" aria-label="${escapeHtml(issueTitle)} 입장 선택">
                    <span class="issue-vote-scale-label agree" aria-hidden="true">그렇다</span>
                    <div class="issue-vote-options">
                        <button class="issue-action-btn issue-vote-btn issue-vote-dot issue-vote-dot-strong-agree" type="button" data-social-action="vote-strong-agree" aria-label="매우 동의" aria-pressed="false" title="매우 동의">
                            <span class="sr-only">매우 동의</span>
                        </button>
                        <button class="issue-action-btn issue-vote-btn issue-vote-dot issue-vote-dot-agreeish" type="button" data-social-action="vote-agreeish" aria-label="동의하는 편" aria-pressed="false" title="동의하는 편">
                            <span class="sr-only">동의하는 편</span>
                        </button>
                        <button class="issue-action-btn issue-vote-btn issue-vote-dot issue-vote-dot-disagreeish" type="button" data-social-action="vote-disagreeish" aria-label="비동의하는 편" aria-pressed="false" title="비동의하는 편">
                            <span class="sr-only">비동의하는 편</span>
                        </button>
                        <button class="issue-action-btn issue-vote-btn issue-vote-dot issue-vote-dot-strong-disagree" type="button" data-social-action="vote-strong-disagree" aria-label="전혀 동의 안 함" aria-pressed="false" title="전혀 동의 안 함">
                            <span class="sr-only">전혀 동의 안 함</span>
                        </button>
                    </div>
                    <span class="issue-vote-scale-label disagree" aria-hidden="true">그렇지 않다</span>
                </div>
                <button class="issue-action-btn icon-only" type="button" data-social-action="save" aria-label="저장" aria-pressed="false">
                    <span class="mono-icon mono-icon-bookmark" aria-hidden="true"></span>
                </button>
                <div class="issue-more-wrap">
                    <button class="issue-action-btn icon-only issue-more-trigger" type="button" data-more-trigger aria-label="${escapeHtml(issueTitle)} 더보기" aria-expanded="false">⋯</button>
                    <div class="issue-more-menu" role="menu" aria-label="${escapeHtml(issueTitle)} 추가 작업">
                        <button type="button" data-more-action="image" role="menuitem">이미지 저장</button>
                    </div>
                </div>
            `;
            actions.innerHTML = `<div class="issue-vote-surface" data-issue-vote-surface aria-live="polite"></div>`;
            actions.addEventListener('click', async event => {
                const trigger = event.target.closest('[data-more-trigger]');
                if (trigger) {
                    event.preventDefault();
                    event.stopPropagation();
                    const wrap = trigger.closest('.issue-more-wrap');
                    const willOpen = !wrap.classList.contains('open');
                    closeIssueMoreMenus(willOpen ? wrap : null);
                    wrap.classList.toggle('open', willOpen);
                    trigger.setAttribute('aria-expanded', String(willOpen));
                    return;
                }

                const socialButton = event.target.closest('[data-social-action]');
                if (socialButton) {
                    event.preventDefault();
                    event.stopPropagation();
                    const action = socialButton.dataset.socialAction;
                    if (action === 'retry-vote') {
                        clearTimeout(card.__issueVoteCompleteTimer);
                        actions.classList.remove('is-vote-completing');
                        actions.dataset.voteMode = 'editing';
                        renderIssueVoteSurface(card, actions, getIssueSocialState(card));
                        refreshIssueSocialBar(card);
                        return;
                    }
                    if (action === 'view-results') {
                        clearTimeout(card.__issueVoteCompleteTimer);
                        actions.classList.remove('is-vote-completing');
                        const key = extractIssueKey(card);
                        if (key && typeof window.openModal === 'function') {
                            window.openModal(key);
                        } else if (card.classList.contains('is-previewing') && typeof window.showIssueCardChart === 'function') {
                            window.showIssueCardChart(card);
                            refreshIssueSocialBar(card);
                        }
                        return;
                    }
                    if (['vote-strong-agree', 'vote-agreeish', 'vote-unsure', 'vote-disagreeish', 'vote-strong-disagree'].includes(action)) {
                        const voteMap = {
                            'vote-strong-agree': 'strong-agree',
                            'vote-agreeish': 'agreeish',
                            'vote-unsure': 'unsure',
                            'vote-disagreeish': 'disagreeish',
                            'vote-strong-disagree': 'strong-disagree',
                        };
                        const nextVote = voteMap[action];
                        const state = getIssueSocialState(card);
                        const previousVote = state.vote;
                        const previousSide = ['strong-agree', 'agreeish', 'agree'].includes(previousVote) ? 'agree' : ['disagreeish', 'strong-disagree', 'disagree'].includes(previousVote) ? 'disagree' : '';
                        const nextSide = ['strong-agree', 'agreeish'].includes(nextVote) ? 'agree' : ['disagreeish', 'strong-disagree'].includes(nextVote) ? 'disagree' : '';
                        const patch = {
                            vote: nextVote,
                            voteUpdatedAt: new Date().toISOString(),
                            agreeVotes: state.agreeVotes,
                            disagreeVotes: state.disagreeVotes,
                        };
                        if (previousSide === 'agree') patch.agreeVotes = Math.max(0, patch.agreeVotes - 1);
                        if (previousSide === 'disagree') patch.disagreeVotes = Math.max(0, patch.disagreeVotes - 1);
                        if (patch.vote && nextSide === 'agree') patch.agreeVotes += 1;
                        if (patch.vote && nextSide === 'disagree') patch.disagreeVotes += 1;
                        setIssueSocialState(state.key, patch);
                        delete actions.dataset.voteMode;
                        const surface = actions.querySelector('[data-issue-vote-surface]');
                        if (surface) surface.innerHTML = renderIssueVoteCompletion();
                        if (patch.vote) {
                            logAccountActivity('vote', getIssueShareData(card).title, { vote: patch.vote });
                        }
                        showShareToast('투표 완료');
                        clearTimeout(card.__issueVoteCompleteTimer);
                        return;
                    }
                    if (action === 'comment') {
                        openIssueComments(card);
                        return;
                    }
                    if (action === 'like') {
                        const state = getIssueSocialState(card);
                        setIssueSocialState(state.key, {
                            liked: !state.liked,
                            likeDelta: state.liked ? Math.max((state.likes - getIssueSocialBase(card).likes) - 1, 0) : (state.likes - getIssueSocialBase(card).likes) + 1,
                        });
                        refreshIssueSocialBar(card);
                        if (!state.liked) logAccountActivity('like', getIssueShareData(card).title);
                        showShareToast(state.liked ? '좋아요를 취소했어요' : '좋아요를 눌렀어요');
                        return;
                    }
                    if (action === 'save') {
                        saveIssueForUser(card);
                        return;
                    }
                }

                const moreAction = event.target.closest('[data-more-action]');
                if (moreAction) {
                    event.preventDefault();
                    event.stopPropagation();
                    closeIssueMoreMenus();
                    if (moreAction.dataset.moreAction === 'save') {
                        saveIssueForUser(card);
                        return;
                    }
                    if (moreAction.dataset.moreAction === 'image') {
                        saveIssueCardImage(card);
                    }
                    return;
                }

                const button = event.target.closest('[data-share-channel]');
                if (!button) return;
                event.preventDefault();
                event.stopPropagation();
                const state = getIssueSocialState(card);
                const base = getIssueSocialBase(card);
                setIssueSocialState(state.key, { shareDelta: (state.shares - base.shares) + 1 });
                refreshIssueSocialBar(card);
                await shareIssue(card);
            });
            body.appendChild(actions);
            refreshIssueSocialBar(card);
            observeIssueView(card);
        });
    }

    function focusSharedIssue() {
        const key = getSharedIssueKey();
        if (!key) return;
        const card = Array.from(document.querySelectorAll('.issue-card')).find(item => item.dataset.issueKey === key);
        if (!card) return;
        card.classList.add('is-shared-target');
        setTimeout(() => card.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
        setTimeout(() => card.classList.remove('is-shared-target'), 2600);
    }

    function initTrendingTicker() {
        const section = document.querySelector('.trending-section');
        if (!section) return;

        const header = section.querySelector('.trending-header');
        const items = Array.from(section.querySelectorAll('.trending-item'));
        if (!header || !items.length) return;

        const rowHeight = parseInt(getComputedStyle(section).getPropertyValue('--ticker-row-height'), 10) || 44;
        const tickerSteps = Math.max(items.length - 1, 1);
        section.style.setProperty('--ticker-steps', String(tickerSteps));
        section.style.setProperty('--ticker-offset', `-${tickerSteps * rowHeight}px`);
        section.style.setProperty('--ticker-duration', `${Math.max(items.length, 1) * 2.8}s`);
        section.classList.remove('is-expanded');
        header.removeAttribute('role');
        header.removeAttribute('aria-expanded');
        header.removeAttribute('tabindex');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initAudienceMode();
            applyAccountDefaultAudience();
            initSettingsMenu();
            updateAuthButtons();
            initHeaderScrollState();
            initIssueSharing();
            initAudienceSwipeNavigation();
            focusSharedIssue();
            initTrendingTicker();
        });
    } else {
        initAudienceMode();
        applyAccountDefaultAudience();
        initSettingsMenu();
        updateAuthButtons();
        initHeaderScrollState();
        initIssueSharing();
        initAudienceSwipeNavigation();
        focusSharedIssue();
        initTrendingTicker();
    }
})();
