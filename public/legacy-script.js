// Aegis interactions: navigation popovers, autonomy demo, and product showcase.
const header = document.querySelector('.header');
const sharedReactHeader = header?.dataset.reactShell === 'true';
const themeToggle = document.querySelector('.theme-toggle');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
document.documentElement.classList.add(reduceMotion ? 'reduce-motion' : 'motion-ready');
if (!reduceMotion) document.documentElement.classList.add('js-reveal');
const storedTheme = window.localStorage.getItem('aegis-theme');
if (storedTheme === 'dark' || storedTheme === 'light') document.documentElement.dataset.theme = storedTheme;
const setTheme = theme => {
  document.documentElement.dataset.theme = theme;
  window.localStorage.setItem('aegis-theme', theme);
  window.dispatchEvent(new CustomEvent('aegis-theme-change', { detail: theme }));
  if (!themeToggle) return;
  const dark = theme === 'dark';
  themeToggle.setAttribute('aria-pressed', String(dark));
  themeToggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
  themeToggle.querySelector('span').textContent = dark ? '☾' : '☼';
  themeToggle.querySelector('b').textContent = dark ? 'Dark' : 'Light';
};
// The shared React header owns theme state on the landing page too. Calling
// setTheme here would overwrite a persisted dark theme with the default light
// theme after React has already restored it.
if (!sharedReactHeader) setTheme(document.documentElement.dataset.theme || 'light');
if (!sharedReactHeader) themeToggle?.addEventListener('click', () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));

// Keep the Android call controls crisp and recognizable at every card size.
const androidControlIcons = [
  '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6h2M11 6h2M16 6h2M6 11h2M11 11h2M16 11h2M6 16h2M11 16h2M16 16h2"/></svg>',
  '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 10v4h4l5 4V6l-5 4H5Z"/><path d="M17 9.5a4 4 0 0 1 0 5M19.5 7a7.5 7.5 0 0 1 0 10"/></svg>',
  '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5a3 3 0 0 1 6 0v6a3 3 0 0 1-6 0V5Z"/><path d="M6.5 10.5a5.5 5.5 0 0 0 9.1 4.2M12 19v-3M9 19h6M5 5l14 14"/></svg>'
];
document.querySelectorAll('.android-call-controls span i').forEach((icon, index) => { icon.innerHTML = androidControlIcons[index]; });
document.querySelectorAll('.android-call-controls>b').forEach(button => { button.innerHTML = '<svg class="icon hangup-icon" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-phone"/></svg>'; });
document.querySelectorAll('.android-call-status span:last-child').forEach(status => { status.className = 'android-status-icons'; status.setAttribute('role', 'img'); status.setAttribute('aria-label', 'Mobile signal, Wi-Fi, battery'); status.innerHTML = '<svg class="status-icon signal-icon" viewBox="0 0 14 12" aria-hidden="true"><path d="M1 11h2V9H1v2Zm4 0h2V6H5v5Zm4 0h2V3H9v8Zm4 0h2V0h-2v11Z"/></svg><svg class="status-icon wifi-icon" viewBox="0 0 16 12" aria-hidden="true"><path d="M1.5 4.5a9 9 0 0 1 13 0M4 7a5.5 5.5 0 0 1 8 0M6.8 9.5a1.7 1.7 0 0 1 2.4 0"/><circle cx="8" cy="10.2" r=".8" fill="currentColor" stroke="none"/></svg><svg class="status-icon battery-icon" viewBox="0 0 18 10" aria-hidden="true"><rect x="1" y="1" width="14" height="8" rx="2"/><path d="M16 4h1v2h-1"/><path d="M3 3h8v4H3z" fill="currentColor" stroke="none"/></svg>'; });
const voiceStory = document.querySelector('.story-grid > .story-card:first-child');
if (voiceStory) {
  voiceStory.querySelector('.android-call')?.setAttribute('aria-label', 'Outbound Android phone call from the assistant to a BrightCare customer');
  voiceStory.querySelector('.android-call-profile small').textContent = 'FOLLOW-UP CALL';
  voiceStory.querySelector('.android-call-profile b').textContent = 'BrightCare Clinic';
  voiceStory.querySelector('.android-call-profile > span:last-child').textContent = '+1 (555) 014-2040';
  voiceStory.querySelector('.story-ui-booking b').textContent = 'Called Maya back';
  voiceStory.querySelector('.story-ui-booking > span').textContent = 'Friday · 2:00 PM available';
  voiceStory.querySelector('.story-ui-booking strong').innerHTML = '<svg class="icon"><use href="#i-check"/></svg> Booked';
  voiceStory.querySelector('.story-kicker').textContent = 'For a clinic';
  voiceStory.querySelector('.story-copy h3').textContent = '“A Friday slot opened.”';
  voiceStory.querySelector('.story-copy p').textContent = 'Maya asked earlier. When the clinic’s schedule changed, the assistant called back and kept the appointment moving.';
  voiceStory.querySelector('.story-copy > b').firstChild.textContent = 'See the follow-up flow ';
}
document.querySelector('.story-grid > .story-card:first-child .story-image img')?.setAttribute('alt', 'A dental clinic customer taking a phone call in the waiting area');
const reviewPreview = document.querySelector('.story-grid > .story-card:last-child .story-ui-review');
if (reviewPreview) reviewPreview.innerHTML = '<div class="review-panel-head"><small>REVIEW QUEUE · 1 ACTION</small><strong>Review</strong></div><div class="review-row-focus" role="group" aria-label="Update beneficiary details for Sophie Bell, showing the name change to Sophie Bell-Smith"><span class="review-focus-avatar avatar-photo avatar-jon" role="img" aria-label="Jon Bell"></span><div class="review-focus-copy"><small>ONE ACTION NEEDS YOUR REVIEW</small><b>Update beneficiary details</b><div class="review-focus-change"><span><small>BEFORE</small><b>Sophie Bell</b></span><i aria-hidden="true">→</i><span><small>AFTER</small><b>Sophie Bell-Smith</b></span></div><em>Prepared by Aegis assist · 2m ago</em></div><span class="review-focus-status">Policy check passed</span></div>';
if (reviewPreview) reviewPreview.insertAdjacentHTML('afterend', '<div class="review-laptop-deck" aria-hidden="true"><span class="review-trackpad"></span></div>');

if (!reduceMotion && 'IntersectionObserver' in window) {
  const revealTargets = document.querySelectorAll('.logos,.logos>div,.deployment-copy,.deployment-channels a,.section-label,.intro-grid,.governance-cards,.outcomes-heading,.outcome-grid,.real-life-heading,.story-grid,.autonomy-copy,.mode-card,.product-heading,.product-demo,.onboarding-copy,.onboarding-preview,.connectors-heading,.connector-list,.industry-heading,.industry-links,.cta h2,.cta .hero-actions');
  revealTargets.forEach((element, index) => {
    element.classList.add('reveal-on-scroll');
    element.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 70}ms`);
  });
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  revealTargets.forEach(element => revealObserver.observe(element));
}
const menuButtons = sharedReactHeader ? [] : document.querySelectorAll('[data-menu]');
const popovers = sharedReactHeader ? [] : document.querySelectorAll('.popover');
const cursorGlow = document.querySelector('.cursor-glow');

// Adds a restrained depth shift to key product surfaces without affecting layout.
if (!reduceMotion) {
  document.querySelectorAll('.hero-product .product-window,.mode-card,.onboarding-preview').forEach(surface => {
    surface.addEventListener('pointermove', event => {
      const rect = surface.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      surface.style.setProperty('--tilt-x', `${(y * -2.2).toFixed(2)}deg`);
      surface.style.setProperty('--tilt-y', `${(x * 2.8).toFixed(2)}deg`);
    });
    surface.addEventListener('pointerleave', () => {
      surface.style.setProperty('--tilt-x', '0deg');
      surface.style.setProperty('--tilt-y', '0deg');
    });
  });
}

if (cursorGlow && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.addEventListener('pointermove', event => {
    cursorGlow.style.opacity = '1';
    cursorGlow.style.transform = `translate(${event.clientX}px, ${event.clientY}px) translate(-50%, -50%)`;
  }, { passive: true });
  window.addEventListener('pointerleave', () => { cursorGlow.style.opacity = '0'; });
}

function closeMenus() {
  popovers.forEach(menu => { menu.classList.remove('open'); menu.setAttribute('aria-hidden', 'true'); });
  menuButtons.forEach(button => button.setAttribute('aria-expanded', 'false'));
}

menuButtons.forEach(button => button.addEventListener('click', () => {
  const menu = document.getElementById(button.dataset.menu);
  const opening = !menu.classList.contains('open');
  closeMenus();
  if (opening) { menu.classList.add('open'); menu.setAttribute('aria-hidden', 'false'); button.setAttribute('aria-expanded', 'true'); }
}));
document.addEventListener('click', event => { if (!event.target.closest('.header')) closeMenus(); });
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  closeMenus();
  if (header.classList.contains('mobile-open')) {
    header.classList.remove('mobile-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Open navigation');
  }
});

const modeCopy = {
  silent: ['Answered 42 customer questions', 'Booked 8 appointments for your team', 'Finished in 48 seconds'],
  guided: ['Assistant prepared 6 actions for approval', 'Nothing changes until your team confirms', 'Review queue ready'],
  ask: ['Assistant found a possible mismatch', 'Waiting for your instruction', 'No changes made']
};
document.querySelectorAll('.mode-pill').forEach(tab => tab.addEventListener('click', () => {
  document.querySelectorAll('.mode-pill').forEach(item => { item.classList.remove('active'); item.setAttribute('aria-selected', 'false'); item.tabIndex = -1; });
  tab.classList.add('active'); tab.setAttribute('aria-selected', 'true'); tab.tabIndex = 0;
  modeCopy[tab.dataset.mode].forEach((copy, index) => { document.querySelector(`[data-result="${['one', 'two', 'three'][index]}"]`).textContent = copy; });
}));

const views = {
  inbox: `<div class="view-frame"><aside class="view-side"><b>◈ AEGIS WORKSPACE</b><span class="active"><svg class="icon"><use href="#i-inbox"/></svg>Customer chats <b class="view-count">12</b></span><span><svg class="icon"><use href="#i-chat"/></svg>Conversations</span><span><svg class="icon"><use href="#i-spark"/></svg>Assistant help</span><span><svg class="icon"><use href="#i-phone"/></svg>Voice calls</span><span><svg class="icon"><use href="#i-automation"/></svg>Your systems</span><span><svg class="icon"><use href="#i-settings"/></svg>Settings</span></aside><div class="view-main"><div class="view-head"><div><small>CUSTOMER HELP / LIVE</small><h3>Good morning, BrightCare</h3></div><button class="new-button">+ New conversation</button></div><div class="inbox-tabs"><span class="selected">All conversations <b>12</b></span><span>Mine <b>7</b></span><span>Unassigned <b>5</b></span></div><div class="conversation selected"><span class="avatar mint">MC</span><div><b>Maya · Book an appointment</b><p>Do you have a slot this Friday?</p><small>Voice · just now</small></div><span class="conversation-tag">Appointment booked</span></div><div class="conversation"><span class="avatar purple">JA</span><div><b>Jon · Insurance plan question</b><p>What does my family plan include?</p><small>Web chat · 8m ago</small></div><span class="conversation-tag waiting">Checking details</span></div><div class="conversation"><span class="avatar blue">EL</span><div><b>Emma · Opening hours</b><p>Are you open on Saturday?</p><small>WhatsApp · 14m ago</small></div><span class="conversation-tag">Answered</span></div><div class="inbox-footer"><span><i class="green-check"><svg class="icon"><use href="#i-check"/></svg></i>Connected to BrightCare scheduling</span><span class="mono">SYNCED 10:42</span></div></div></div>`,
  approvals: `<div class="view-two"><div class="queue-list"><h4>Review queue <span class="badge yellow">6 pending</span></h4>${['Update beneficiary details', 'Issue replacement card', 'Escalate KYC exception', 'Adjust payment limit'].map((item, index) => { const avatars = ['<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.2"/><path d="M5.5 19c.8-3.2 3-5 6.5-5s5.7 1.8 6.5 5"/></svg>', '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="6" width="16" height="12" rx="2"/><path d="M4 10h16M8 15h3"/></svg>', '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 7 3v5c0 4.5-2.9 7.8-7 10-4.1-2.2-7-5.5-7-10V6l7-3Z"/><path d="m9 12 2 2 4-4"/></svg>', '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5v14M18 5v14M4 8h4M16 15h4"/><circle cx="6" cy="8" r="2"/><circle cx="18" cy="15" r="2"/></svg>']; return `<div class="queue-item"><span class="task-avatar task-avatar-${['person','card','shield','controls'][index]}" role="img" aria-label="${['Customer details','Payment card','KYC check','Payment controls'][index]}">${avatars[index]}</span><div><b>${item}</b><small>Prepared by Aegis assist · ${index + 2}m ago</small></div><span class="badge">Review</span></div>`; }).join('')}</div><div class="queue-list"><h4>Queue health</h4><div class="view-stat"><small>AVG. TIME TO REVIEW</small><b>4m 12s</b><em>↓ 32%</em></div><div class="view-stat" style="margin-top:9px"><small>APPROVED TODAY</small><b>42</b><em>98% within policy</em></div></div></div>`,
  journey: `<div class="journey-ui"><div class="journey-head"><div><h4>Customer journey <span class="badge">Live context</span></h4><p>Maya Chen · appointment request · Voice → SMS</p></div><span class="journey-score">High intent <b>92</b></span></div><div class="journey-steps"><div class="journey-step done"><span>1</span><b>Capture</b><small>Voice call received</small></div><i></i><div class="journey-step done"><span>2</span><b>Qualify</b><small>Returning patient</small></div><i></i><div class="journey-step active"><span>3</span><b>Route</b><small>BrightCare scheduling</small></div><i></i><div class="journey-step"><span>4</span><b>Confirm</b><small>Waiting for approval</small></div></div><div class="journey-lower"><div class="journey-thread"><div class="journey-thread-top"><span class="avatar mint">MC</span><div><b>Maya Chen</b><small>Voice · 10:42 AM</small></div><span class="conversation-tag">Returning customer</span></div><div class="journey-bubble customer">Do you have an opening this Friday afternoon?</div><div class="journey-bubble assistant"><b>Assistant draft</b><br>I found two openings with Dr. Patel. I can hold 2:00 PM or 4:30 PM for Maya.</div></div><div class="journey-action"><span class="eyebrow">Next best action</span><h5>Offer appointment slots</h5><p>Scheduling tool checked live availability. External booking still needs a team confirmation.</p><div class="journey-action-row"><span class="policy-check"><svg class="icon"><use href="#i-shield"/></svg></span><b>Guided by your policy</b><button class="review-button" type="button">Review</button></div></div></div></div>`,
  audit: `<div class="view-two"><div class="audit-list"><h4>Execution log <span class="badge">Immutable</span></h4>${['Assistant reconciled settlement batch', 'Approval granted by Finance Ops', 'Knowledge source refreshed', 'Policy ceiling evaluated', 'Assistant opened review queue'].map((item, index) => `<div class="audit-item"><span class="mono">10:${28 - index * 4} AM</span><b>${item}<small>transaction-runner / northstar-prod</small></b><span class="badge ${index === 1 ? 'yellow' : ''}">${index === 1 ? 'Approved' : 'Completed'}</span></div>`).join('')}</div><div class="queue-list"><h4>Run metadata</h4><div class="view-stat"><small>RUN ID</small><b class="mono">RUN-0928</b><em>Started 10:04:12 AM</em></div><div class="view-stat" style="margin-top:9px"><small>UNDO WINDOW</small><b>72h</b><em>Available</em></div></div></div>`,
  channels: `<div class="channel-grid-ui"><h4 style="grid-column:1/-1">Connect all your channels <span class="badge">4 connected</span></h4>${[['Website','i-website'],['WhatsApp','i-whatsapp'],['Telegram','i-telegram'],['Voice','i-phone'],['SMS','i-sms'],['API / SDK','i-api']].map(([item, icon], index) => `<div class="channel-option-ui"><span><svg class="icon"><use href="#${icon}"/></svg></span><b>${item}</b><small>${index < 4 ? 'Connected · ready' : 'Set up from dashboard'}</small></div>`).join('')}</div>`,
  policy: `<div class="view-two"><div class="queue-list policy-panel"><h4>Policy controls <span class="badge">Active</span></h4><div class="policy-row"><span class="policy-check"><svg class="icon"><use href="#i-check"/></svg></span><div><b>External changes</b><small>Always require approval</small></div><strong>On</strong></div><div class="policy-row"><span class="policy-check"><svg class="icon"><use href="#i-check"/></svg></span><div><b>Customer data access</b><small>Read-only by default</small></div><strong>On</strong></div><div class="policy-row"><span class="policy-check"><svg class="icon"><use href="#i-check"/></svg></span><div><b>Undo window</b><small>Reversible for 72 hours</small></div><strong>72h</strong></div></div><div class="queue-list"><h4>Autonomy by workflow</h4><div class="policy-meter"><span>Reconciliation</span><b>Silent</b><i><em style="width:86%"></em></i></div><div class="policy-meter"><span>Beneficiary changes</span><b>Guided</b><i><em style="width:58%"></em></i></div><div class="policy-meter"><span>Customer replies</span><b>Ask</b><i><em style="width:28%"></em></i></div></div></div>`,
  knowledge: `<div class="channel-grid-ui knowledge-grid-ui"><h4 style="grid-column:1/-1">Knowledge connectors <span class="badge">7 sources</span></h4>${[['Google Drive','BRAND_DRIVE'],['SharePoint','BRAND_SHAREPOINT'],['OneDrive','BRAND_ONEDRIVE'],['Microsoft Teams','BRAND_TEAMS'],['Slack','BRAND_SLACK'],['Notion','BRAND_NOTION'],['Confluence','BRAND_CONFLUENCE']].map(([item, icon]) => `<div class="channel-option-ui"><span>${icon}</span><b>${item}</b><small>${item === 'Google Drive' || item === 'SharePoint' || item === 'OneDrive' || item === 'Microsoft Teams' ? 'Synced · 2m ago' : 'Ready to connect'}</small></div>`).join('')}</div>`
};
const productView = document.getElementById('product-view');
const svgIcon = name => `<svg class="icon"><use href="#i-${name}"/></svg>`;
const brandIcon = name => `<svg class="brand-local"><use href="#i-${name}"/></svg>`;

// Make the hero inbox immediately legible: every visible conversation has a
// real channel mark, and the tab row previews the sources in one glance.
document.querySelectorAll('.hero .conversation small').forEach(source => {
  const sourceText = source.textContent.trim();
  const icon = sourceText.startsWith('Voice') ? 'phone' : sourceText.startsWith('Web chat') ? 'chat' : 'whatsapp';
  source.innerHTML = `${svgIcon(icon)}<span>${sourceText}</span>`;
});
document.querySelector('.hero .workspace-name')?.remove();
const chatStatusIcons = document.querySelector('.story-card-ios .ios-status-icons');
if (chatStatusIcons) {
  chatStatusIcons.innerHTML = '<svg class="status-icon status-signal" viewBox="0 0 16 12" aria-label="Mobile signal"><path d="M1 11h2V8H1zm4 0h2V6H5zm4 0h2V3H9zm4 0h2V1h-2z"/></svg><svg class="status-icon status-wifi" viewBox="0 0 16 12" aria-label="Wi-Fi connected"><path d="M1.5 4.5a10 10 0 0 1 13 0M4 7a6.3 6.3 0 0 1 8 0M6.8 9.5a2.1 2.1 0 0 1 2.4 0"/><circle cx="8" cy="11" r=".8" fill="currentColor" stroke="none"/></svg><svg class="status-icon status-battery" viewBox="0 0 18 10" aria-label="Battery full"><rect x="1" y="1" width="14" height="8" rx="2"/><path d="M17 4v2"/><path d="M3 3h9v4H3z" fill="currentColor" stroke="none"/></svg>';
}
function decorateAvatars(root = productView) {
  root?.querySelectorAll('.conversation .avatar').forEach((avatar, index) => {
    avatar.classList.add('avatar-photo', ['avatar-maya', 'avatar-jon', 'avatar-emma'][index] || 'avatar-maya');
    avatar.textContent = '';
    avatar.setAttribute('aria-label', ['Maya', 'Jon', 'Emma'][index] || 'Customer');
  });
  root?.querySelectorAll('.queue-item>span:first-child').forEach(avatar => avatar.classList.add('task-avatar'));
  const journeyIcons = [
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"/><path d="M9 7h6M10 17h4"/></svg>',
    '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="5.5"/><path d="m15 15 4 4"/></svg>',
    '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="5" cy="12" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="19" cy="18" r="2"/><path d="m7 11 10-4M7 13l10 4"/></svg>',
    '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"/><path d="m8 12 2.5 2.5L16 9"/></svg>'
  ];
  root?.querySelectorAll('.journey-step>span').forEach((step, index) => { step.classList.add('journey-step-icon'); step.innerHTML = journeyIcons[index] || journeyIcons[0]; });
  const journeyAvatar = root?.querySelector('.journey-thread-top .avatar');
  if (journeyAvatar) { journeyAvatar.classList.add('avatar-photo', 'avatar-maya'); journeyAvatar.textContent = ''; journeyAvatar.setAttribute('aria-label', 'Maya'); }
}
function renderView(name) {
  const shouldAnimateView = productView.childElementCount > 0 && !reduceMotion;
  if (shouldAnimateView) productView.classList.add('is-switching');
  const paintView = () => {
  productView.innerHTML = views[name]
    .replaceAll('◈ AEGIS', `${svgIcon('shield')} AEGIS`)
    .replaceAll('▣', svgIcon('inbox'))
    .replaceAll('◌', svgIcon('chat'))
    .replaceAll('✦', svgIcon('spark'))
    .replaceAll('◉', svgIcon('phone'))
    .replaceAll('⌁', svgIcon('automation'))
    .replaceAll('⚙', svgIcon('settings'))
    .replaceAll('➤', svgIcon('channel'))
    .replaceAll('▤', svgIcon('audit'))
    .replaceAll('BRAND_DRIVE', brandIcon('drive'))
    .replaceAll('BRAND_SHAREPOINT', brandIcon('sharepoint'))
    .replaceAll('BRAND_ONEDRIVE', brandIcon('onedrive'))
    .replaceAll('BRAND_TEAMS', brandIcon('teams'))
    .replaceAll('BRAND_SLACK', brandIcon('slack'))
    .replaceAll('BRAND_NOTION', brandIcon('notion'))
    .replaceAll('BRAND_CONFLUENCE', brandIcon('confluence'));
  decorateAvatars();
  productView.classList.remove('is-switching');
  };
  if (shouldAnimateView) window.setTimeout(paintView, 160); else paintView();
}
renderView('journey');
document.querySelectorAll('.product-tab').forEach(tab => tab.addEventListener('click', () => {
  document.querySelectorAll('.product-tab').forEach(item => { item.classList.remove('active'); item.setAttribute('aria-selected', 'false'); item.tabIndex = -1; });
  tab.classList.add('active'); tab.setAttribute('aria-selected', 'true'); tab.tabIndex = 0; renderView(tab.dataset.view);
}));
document.querySelectorAll('[role="tablist"] [role="tab"]').forEach(tab => { tab.tabIndex = tab.getAttribute('aria-selected') === 'true' ? 0 : -1; });
document.querySelectorAll('[role="tablist"] [role="tab"]').forEach(tab => tab.addEventListener('keydown', event => {
  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
  const tabs = [...tab.closest('[role="tablist"]').querySelectorAll('[role="tab"]')];
  const current = tabs.indexOf(tab);
  const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (current + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
  event.preventDefault(); tabs[next].click(); tabs[next].focus();
}));

const productDemo = document.querySelector('.product-demo');
const expandView = document.querySelector('.expand-view');
const previewScrim = document.querySelector('.preview-scrim');
const setExpanded = expanded => {
  productDemo.classList.toggle('is-expanded', expanded);
  productDemo.setAttribute('role', expanded ? 'dialog' : 'region');
  if (expanded) productDemo.setAttribute('aria-modal', 'true'); else productDemo.removeAttribute('aria-modal');
  productDemo.setAttribute('aria-label', expanded ? 'Expanded Aegis Console preview' : 'Aegis Console product preview');
  expandView.setAttribute('aria-expanded', String(expanded));
  expandView.setAttribute('aria-label', expanded ? 'Close product preview' : 'Expand product preview');
  expandView.querySelector('span').textContent = expanded ? 'Close preview' : 'Expand preview';
  previewScrim.hidden = !expanded;
  document.body.classList.toggle('preview-open', expanded);
  if (expanded) expandView.focus();
};
document.addEventListener('click', event => {
  if (event.target.closest?.('.expand-view')) setExpanded(!productDemo.classList.contains('is-expanded'));
  if (event.target === previewScrim) setExpanded(false);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Tab' && productDemo?.classList.contains('is-expanded')) {
    const focusable = [...productDemo.querySelectorAll('button, a, [tabindex]:not([tabindex="-1"])')].filter(item => !item.hasAttribute('disabled') && item.getBoundingClientRect().width > 0);
    if (focusable.length) {
      const current = focusable.indexOf(document.activeElement);
      const next = (current + (event.shiftKey ? -1 : 1) + focusable.length) % focusable.length;
      event.preventDefault();
      focusable[next].focus();
    }
    return;
  }
  if (event.key === 'Escape' && productDemo?.classList.contains('is-expanded')) setExpanded(false);
});

const menuToggle = document.querySelector('.menu-toggle');
if (!sharedReactHeader) {
  menuToggle?.addEventListener('click', () => {
    const open = header.classList.toggle('mobile-open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    if (!open) closeMenus();
  });
  document.querySelectorAll('.nav a,.header-right a,.popover a').forEach(link => link.addEventListener('click', () => { header?.classList.remove('mobile-open'); menuToggle?.setAttribute('aria-expanded', 'false'); closeMenus(); }));
}

const onboardingPreview = document.querySelector('.onboarding-preview');
const skipOnboarding = document.querySelector('[data-skip-onboarding]');
const skipState = document.querySelector('.skip-state');
skipOnboarding?.addEventListener('click', () => {
  const skipped = onboardingPreview.classList.toggle('is-skipped');
  skipState.hidden = !skipped;
  skipOnboarding.setAttribute('aria-pressed', String(skipped));
  skipOnboarding.textContent = skipped ? 'Restore setup' : 'Skip for now';
});

const demoNewConversation = document.querySelector('[data-demo-new]');
demoNewConversation?.addEventListener('click', () => {
  demoNewConversation.classList.add('is-created');
  demoNewConversation.innerHTML = '<svg class="icon"><use href="#i-check"/></svg> Draft created';
  demoNewConversation.setAttribute('aria-label', 'Draft conversation created');
});

document.querySelector('[data-result="one"]').textContent = modeCopy.silent[0];
document.querySelector('[data-result="two"]').textContent = modeCopy.silent[1];
document.querySelector('[data-result="three"]').textContent = modeCopy.silent[2];

// Give the autonomy preview the same calm, human-readable structure as the live product.
const autonomyDescription = document.querySelector('.assistant-core');
if (autonomyDescription) {
  autonomyDescription.className = 'mode-description';
  autonomyDescription.innerHTML = '<span class="mode-badge"><svg class="icon" aria-hidden="true"><use href="#i-spark"/></svg>Today\'s work</span><h3>Answers and actions, handled.</h3><p>Your assistant can answer questions, use your tools, and pause whenever your team should decide.</p>';
}

// Keep the marketing language short, warm, and easy to scan.
const plainCopy = {
  '.outcomes-heading .eyebrow': 'How it works',
  '.outcomes-heading h2': 'A question comes in.<br><em>A useful next step goes out.</em>',
  '.outcomes-heading p': 'Customers ask in the channel they prefer. Aegis looks in the right places, uses your tools, and keeps the conversation moving.',
  '.outcome-card:nth-child(1) h3': 'Find the answer',
  '.outcome-card:nth-child(1) p': 'Use your approved FAQs, plans, policies, and opening hours.',
  '.outcome-card:nth-child(1) .outcome-link': 'See what it can use ↗',
  '.outcome-card:nth-child(2) h3': 'Do the useful thing',
  '.outcome-card:nth-child(2) p': 'Check availability, book an appointment, or update a record.',
  '.outcome-card:nth-child(2) .outcome-link': 'See it in action ↗',
  '.outcome-card:nth-child(3) h3': 'Keep you in charge',
  '.outcome-card:nth-child(3) p': 'Choose what happens automatically and what needs your say-so.',
  '.outcome-card:nth-child(3) .outcome-link': 'Choose your level of help ↗',
  '.intro > .section-label .eyebrow': 'Why teams choose it',
  '.intro-grid .lead': 'Work faster without losing the human say-so.',
  '.intro-grid .arrow-link': 'See why it matters ↗',
  '.autonomy-copy .eyebrow': 'When should it act?',
  '.autonomy-copy h2': 'Your assistant can help.<br><em>Your team stays in control.</em>',
  '.autonomy-copy > p': 'Let it answer on its own, ask before it acts, or wait for you.',
  '.product > .section-label .eyebrow': 'See it in action',
  '.product-heading h2': 'Give every customer<br><em>a clear next step.</em>',
  '.product-heading p': 'See the journey from a customer’s question to the answer, action, or handoff your team chooses.',
  '.positioning': 'Aegis helps clinics, banks, insurers, and growing teams answer people and get things done.',
  '.onboarding > .onboarding-copy .eyebrow': 'Adopt it simply',
  '.onboarding-copy .eyebrow': 'Adopt it simply',
  '.onboarding-copy h2': 'Ready from day one.<br><em>Built for your team.</em>',
  '.onboarding-copy p': 'Start with a ready workspace, connect your channels, and set the moments that need a person.',
  '.onboarding-body h3': 'Let’s get you set up',
  '.onboarding-body > p': 'A few quick steps and you’re ready to go.',
  '.ready-row:first-of-type b': 'Your workspace',
  '.ready-row:first-of-type small': 'Ready to use',
  '.ready-row:nth-of-type(2) b': 'Review step',
  '.ready-row:nth-of-type(2) small': 'You decide before changes happen',
  '.connectors-heading .eyebrow': 'Use what you already have',
  '.connectors-heading h2': 'Let your assistant<br><em>find the right answer.</em>',
  '.connectors-heading p': 'Bring FAQs, policies, and documents your team already uses. Then connect the tools that let it help.',
  '.industries > .section-label .eyebrow': 'Where it fits',
  '.industry-heading h2': 'Built for the work<br><em>people count on.</em>',
  '.industry-heading p': 'Helpful answers and actions for teams serving people every day.',
  '.cta .eyebrow': 'Your next step',
  '.cta h2': 'Give people better answers.<br><em>Give your team room to help.</em>',
  '.footer p': 'Helpful automation for real work.'
};
Object.entries(plainCopy).forEach(([selector, copy]) => {
  const element = document.querySelector(selector);
  if (element) element.innerHTML = copy;
});

// The landing experience begins with the main "Start here" hero, followed by
// the deployment strip that explains where Aegis works.
const pageMain = document.querySelector('main');
const heroSection = pageMain?.querySelector('.hero');
const deploymentSection = pageMain?.querySelector('.deployment-strip');
if (pageMain && heroSection && deploymentSection) pageMain.insertBefore(heroSection, deploymentSection);

['Conversations', 'Review', 'Journey', 'History', 'Channels', 'Rules', 'Knowledge'].forEach((label, index) => {
  const tab = document.querySelectorAll('.product-tab')[index];
  if (tab) tab.textContent = label;
});
document.querySelector('.mode-pills')?.setAttribute('aria-label', 'How much help');
document.querySelectorAll('.workspace-link span').forEach(label => {
  if (label.textContent.trim() === 'Assistant assist') label.textContent = 'Aegis assist';
});

if (!sharedReactHeader) {
const simpleMenuCopy = {
  '#industries-menu': [
    ['Banking & Fintech', 'Handle sensitive work'], ['Telecom', 'Help more people'],
    ['Insurance', 'Make each step clear'], ['Healthcare', 'Keep people informed'],
    ['Retail', 'Be there when needed'], ['Government', 'Keep a clear record'],
    ['Professional Services', 'Make work easier']
  ],
  '#resources-menu': [
    ['See Aegis', 'A quick look around'], ['Your trusted sources', 'Bring your tools'],
    ['Documentation', 'Find simple answers'], ['Keep it private', 'Stay in control'],
    ['Safety and trust', 'See how it works']
  ]
};
Object.entries(simpleMenuCopy).forEach(([selector, items]) => {
  const menu = document.querySelector(selector);
  if (!menu) return;
  menu.innerHTML = items.map(([title, detail]) => `<a href="${selector === '#industries-menu' ? '#industries' : title === 'Your trusted sources' ? '#connectors' : '#contact'}">${title} <small>${detail}</small></a>`).join('');
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { header.classList.remove('mobile-open'); menuToggle?.setAttribute('aria-expanded', 'false'); closeMenus(); }));
});

const navPanelLinks = menu => menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { header.classList.remove('mobile-open'); menuToggle?.setAttribute('aria-expanded', 'false'); closeMenus(); }));
const industriesMenu = document.querySelector('#industries-menu');
if (industriesMenu) {
  industriesMenu.className = 'popover industry-mega';
  industriesMenu.innerHTML = `<div class="industry-menu-feature"><div class="industry-feature-rings" aria-hidden="true"></div><span class="menu-feature-icon"><svg class="icon"><use href="#i-channel"/></svg></span><span class="eyebrow">Made for your work</span><h3>Start with your world</h3><p>One helpful layer for customer questions, calls, and everyday tasks.</p><a href="#industries">Explore industries <svg class="icon"><use href="#i-arrow"/></svg></a></div><div class="industry-menu-list"><div class="menu-panel-heading"><div><span class="eyebrow">Choose your work</span><p>Helpful assistants, shaped around the way your team works.</p></div><span class="menu-count">7 areas</span></div><div class="industry-menu-grid"><a href="#industries"><span class="menu-item-icon"><svg class="icon"><use href="#i-shield"/></svg></span><span><b>Banking &amp; Fintech</b><em>Answer questions with care.</em></span><strong>↗</strong></a><a href="#industries"><span class="menu-item-icon"><svg class="icon"><use href="#i-phone"/></svg></span><span><b>Telecom</b><em>Help more people, faster.</em></span><strong>↗</strong></a><a href="#industries"><span class="menu-item-icon"><svg class="icon"><use href="#i-audit"/></svg></span><span><b>Insurance</b><em>Make every answer clear.</em></span><strong>↗</strong></a><a href="#industries"><span class="menu-item-icon"><svg class="icon"><use href="#i-channel"/></svg></span><span><b>Healthcare</b><em>Keep people informed.</em></span><strong>↗</strong></a><a href="#industries"><span class="menu-item-icon"><svg class="icon"><use href="#i-channel"/></svg></span><span><b>Retail</b><em>Be there when needed.</em></span><strong>↗</strong></a><a href="#industries"><span class="menu-item-icon"><svg class="icon"><use href="#i-audit"/></svg></span><span><b>Government</b><em>Keep a clear record.</em></span><strong>↗</strong></a><a href="#industries"><span class="menu-item-icon"><svg class="icon"><use href="#i-spark"/></svg></span><span><b>Professional Services</b><em>Make work easier.</em></span><strong>↗</strong></a></div></div>`;
  navPanelLinks(industriesMenu);
}
const resourcesMenu = document.querySelector('#resources-menu');
if (resourcesMenu) {
  resourcesMenu.className = 'popover resources-mega';
  resourcesMenu.innerHTML = `<a class="resource-feature" href="#governance"><span class="resource-feature-top"><span class="menu-feature-icon"><svg class="icon"><use href="#i-shield"/></svg></span><span class="resource-tag">Trust</span></span><b>Stay in control</b><em>Clear answers, helpful actions, and a record your team can follow.</em><span class="resource-feature-link">Explore governance <svg class="icon"><use href="#i-arrow"/></svg></span></a><div class="resource-menu-list"><div class="menu-panel-heading"><div><span class="eyebrow">Explore</span><p>Useful places to learn, connect, and get started.</p></div></div><a href="#contact"><span class="menu-item-icon"><svg class="icon"><use href="#i-chat"/></svg></span><span><b>Contact us</b><em>Talk to our team about your use case.</em></span></a><a href="#contact"><span class="menu-item-icon"><svg class="icon"><use href="#i-channel"/></svg></span><span><b>Help Center</b><em>Guides and simple answers.</em></span></a><a href="#connectors"><span class="menu-item-icon"><svg class="icon"><use href="#i-audit"/></svg></span><span><b>Your trusted sources</b><em>Bring the tools your team already uses.</em></span></a><div class="resource-bottom"><span><b>Ready to see it in action?</b><em>Start with a guided walkthrough.</em></span><a href="#contact">Get started <svg class="icon"><use href="#i-arrow"/></svg></a></div></div>`;
  navPanelLinks(resourcesMenu);
}
}

// A small, multi-screen first-run flow for internal teams.
const onboardingBody = document.querySelector('.onboarding-body');
if (onboardingBody) {
  onboardingBody.innerHTML = `
    <div class="onboarding-screen-tabs" role="tablist" aria-label="Workspace setup">
      <button class="onboarding-screen-tab active" type="button" role="tab" aria-selected="true" data-onboarding-screen="workspace">1. Workspace</button>
      <button class="onboarding-screen-tab" type="button" role="tab" aria-selected="false" data-onboarding-screen="channels">2. Channels</button>
      <button class="onboarding-screen-tab" type="button" role="tab" aria-selected="false" data-onboarding-screen="tools">3. Tools</button>
    </div>
    <div class="onboarding-screens">
      <section class="onboarding-screen active" data-onboarding-panel="workspace" role="tabpanel">
        <span class="eyebrow">Start here</span><h3>Your workspace is ready</h3>
        <p>A shared place for customer questions, calls, and follow-up.</p>
        <div class="onboarding-item"><span class="onboarding-item-icon"><svg class="icon"><use href="#i-aegis-mark"/></svg></span><div><b>BrightCare clinic</b><small>Customer help workspace</small></div><strong>Ready</strong></div>
        <div class="onboarding-item"><span class="onboarding-item-icon"><svg class="icon"><use href="#i-shield"/></svg></span><div><b>You stay in charge</b><small>Important changes wait for your team</small></div><strong>On</strong></div>
      </section>
      <section class="onboarding-screen" data-onboarding-panel="channels" role="tabpanel" hidden>
        <span class="eyebrow">Meet customers where they are</span><h3>Choose your channels</h3>
        <p>Start with one channel. Add more when your team is ready.</p>
        <div class="onboarding-screen-grid"><div class="onboarding-channel active"><svg class="icon"><use href="#i-phone"/></svg><b>Voice</b><small>Talk to customers</small></div><div class="onboarding-channel"><svg class="icon"><use href="#i-website"/></svg><b>Website</b><small>Answer online</small></div><div class="onboarding-channel"><svg class="icon"><use href="#i-whatsapp"/></svg><b>WhatsApp</b><small>Stay connected</small></div></div>
      </section>
      <section class="onboarding-screen" data-onboarding-panel="tools" role="tabpanel" hidden>
        <span class="eyebrow">Make answers useful</span><h3>Connect the tools that do the work</h3>
        <p>Let the assistant look up information or take the next step for a customer.</p>
        <div class="onboarding-tool-row"><span class="onboarding-item-icon"><svg class="icon"><use href="#i-automation"/></svg></span><div><b>Appointment booking</b><small>Your scheduling API · Ready to connect</small></div><strong>Set up</strong></div>
        <div class="onboarding-tool-row"><span class="onboarding-item-icon"><svg class="icon"><use href="#i-audit"/></svg></span><div><b>Insurance plan lookup</b><small>Your internal API · Add an endpoint</small></div><strong>Set up</strong></div>
      </section>
    </div>
    <div class="onboarding-actions"><a class="button button-mint button-sm" href="#contact">Continue <b>↗</b></a><button class="quiet-button" type="button" data-skip-onboarding aria-pressed="false">Skip for now</button></div>
    <div class="skip-state" hidden><span><svg class="icon"><use href="#i-check"/></svg></span><div><b>Setup paused</b><small>Resume anytime from your workspace.</small></div></div>`;

  const screenTabs = onboardingBody.querySelectorAll('.onboarding-screen-tab');
  const screenPanels = onboardingBody.querySelectorAll('.onboarding-screen');
  const selectOnboardingScreen = name => {
    screenTabs.forEach(tab => { const active = tab.dataset.onboardingScreen === name; tab.classList.toggle('active', active); tab.setAttribute('aria-selected', String(active)); });
    screenPanels.forEach(panel => { const active = panel.dataset.onboardingPanel === name; panel.classList.toggle('active', active); panel.hidden = !active; });
  };
  screenTabs.forEach(tab => tab.addEventListener('click', () => selectOnboardingScreen(tab.dataset.onboardingScreen)));
  const newSkipButton = onboardingBody.querySelector('[data-skip-onboarding]');
  const newSkipState = onboardingBody.querySelector('.skip-state');
  newSkipButton.addEventListener('click', () => {
    const skipped = onboardingPreview.classList.toggle('is-skipped');
    newSkipState.hidden = !skipped;
    newSkipButton.textContent = skipped ? 'Restore setup' : 'Skip for now';
    newSkipButton.setAttribute('aria-pressed', String(skipped));
  });
}

// Use local SVG marks for brands so logos never depend on a remote icon font.
const brandMarks = {
  'si-googledrive': 'i-drive',
  'fa-microsoft': 'i-microsoft',
  'fa-slack': 'i-slack',
  'si-notion': 'i-notion',
  'si-confluence': 'i-confluence'
};
document.querySelectorAll('.brand-logo i, .connector-list span i').forEach(icon => {
  const symbol = Object.entries(brandMarks).find(([className]) => icon.classList.contains(className))?.[1];
  if (!symbol) return;
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'brand-local');
  svg.setAttribute('aria-hidden', 'true');
  svg.innerHTML = `<use href="#${symbol}"></use>`;
  icon.replaceWith(svg);
});

function humanizePreview() {
  const replacements = [
    ['.view-side b', 'AEGIS WORKSPACE'],
    ['.view-head small', 'CUSTOMER HELP / LIVE'],
    ['.audit-list h4', 'Activity log'],
    ['.audit-list .badge', 'Clear record'],
    ['.queue-list.policy-panel h4', 'Your rules'],
    ['.policy-panel + .queue-list h4', 'Help by task'],
    ['.knowledge-grid-ui h4', 'Your sources']
  ];
  replacements.forEach(([selector, text]) => {
    const element = productView.querySelector(selector);
    if (element) element.textContent = text;
  });
  ['OPEN CHATS', 'HELPED BY ASSISTANT', 'NEEDS YOUR REVIEW'].forEach((text, index) => {
    const label = productView.querySelectorAll('.view-stats .view-stat small')[index];
    if (label) label.textContent = text;
  });
  productView.querySelectorAll('.queue-item .badge').forEach(badge => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'review-button';
    button.textContent = 'Review';
    button.setAttribute('aria-label', `Review ${badge.closest('.queue-item')?.querySelector('b')?.textContent || 'item'}`);
    button.addEventListener('click', () => {
      const opened = button.classList.toggle('is-open');
      button.innerHTML = opened ? '<svg class="icon" aria-hidden="true"><use href="#i-check"/></svg>Opened' : 'Review';
      button.setAttribute('aria-label', `${opened ? 'Close' : 'Review'} ${badge.closest('.queue-item')?.querySelector('b')?.textContent || 'item'}`);
    });
    badge.replaceWith(button);
  });
}
humanizePreview();
document.querySelectorAll('.product-tab').forEach(tab => tab.addEventListener('click', humanizePreview));
