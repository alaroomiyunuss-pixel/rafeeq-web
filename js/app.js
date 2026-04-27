'use strict';

/* ══════════════════════════════════════
   UTILITIES
══════════════════════════════════════ */
const $ = id => document.getElementById(id);
const gv = id => { const e=$(id); return e ? e.value : ''; };
const sv = (id, v) => { const e=$(id); if(e) e.value = v; };
const setText = (id, v) => { const e=$(id); if(e) e.innerHTML = v; };
const show = id => { const e=$(id); if(e) e.style.display = 'block'; };
const hide = id => { const e=$(id); if(e) e.style.display = 'none'; };
const sleep = ms => new Promise(r => setTimeout(r, ms));

function toast(msg, type='ok') {
  const t = $('toast');
  if(!t) return;
  t.className = type;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

function setBtn(id, loading, html) {
  if(!id) return;
  const b = $(id);
  if(!b) return;
  b.disabled = loading;
  if(html) b.innerHTML = html;
}

function showMo(id) {
  const mo = $(`mo-${id}-ov`);
  if(mo) mo.classList.add('open');
}

function closeMo(id) {
  const mo = $(`mo-${id}-ov`);
  if(mo) mo.classList.remove('open');
}

/* ══════════════════════════════════════
   SEED DATA
══════════════════════════════════════ */
const SEED_TRIPS = [
  {id:'RF-001',from:'صنعاء',to:'جازان',date:'2025-07-20',time:'06:00',price:300,seats:3,total:5,driver:'أحمد الحكيمي',dId:'d1',rating:4.9,trips:47,luggage:'مسموح 20 كجم',type:'car',vehicle:'Land Cruiser 2020',meet:'شارع الزبيري - أمام مسجد الصالح',stops:'إب، ذمار',notes:'مكيف ومريح، رحلة مباشرة',status:'active'},
  {id:'RF-002',from:'عدن',to:'أبها',date:'2025-07-20',time:'08:00',price:450,seats:8,total:14,driver:'شركة النجم للنقل',dId:'c1',rating:4.7,trips:120,luggage:'مسموح 30 كجم',type:'bus',vehicle:'Mercedes Sprinter 2022',meet:'ميناء عدن - مقابل الكورنيش',stops:'لحج، تعز، صنعاء، جازان',notes:'باص مكيف مع وجبة',status:'active'},
  {id:'RF-003',from:'تعز',to:'نجران',date:'2025-07-21',time:'07:30',price:350,seats:2,total:4,driver:'محمد الغامدي',dId:'d2',rating:4.8,trips:33,luggage:'مسموح 25 كجم',type:'car',vehicle:'Hyundai H1 2021',meet:'دوار النصر',stops:'إب',notes:'',status:'active'},
  {id:'RF-004',from:'الحديدة',to:'جازان',date:'2025-07-21',time:'09:00',price:280,seats:4,total:6,driver:'حسن الزبيدي',dId:'d3',rating:4.6,trips:28,luggage:'غير مسموح',type:'car',vehicle:'Hyundai H1',meet:'كورنيش الحديدة',stops:'',notes:'حقيبة يد فقط',status:'active'},
  {id:'RF-005',from:'جازان',to:'صنعاء',date:'2025-07-22',time:'05:00',price:320,seats:3,total:5,driver:'علي المالكي',dId:'d4',rating:4.9,trips:62,luggage:'مسموح 20 كجم',type:'car',vehicle:'Land Cruiser GXR',meet:'جازان - الشيخ عثمان',stops:'صعدة',notes:'رحلة مباشرة',status:'active'},
  {id:'RF-006',from:'إب',to:'أبها',date:'2025-07-22',time:'06:30',price:380,seats:2,total:4,driver:'فهد العمري',dId:'d5',rating:4.7,trips:19,luggage:'مسموح 20 كجم',type:'car',vehicle:'Nissan Patrol 2019',meet:'إب - دوار المدينة',stops:'ذمار، صنعاء',notes:'',status:'active'},
  {id:'RF-007',from:'صنعاء',to:'أبها',date:'2025-07-23',time:'04:30',price:420,seats:5,total:7,driver:'نور الشهري',dId:'d6',rating:4.8,trips:55,luggage:'مسموح 25 كجم',type:'van',vehicle:'Toyota Hiace 2022',meet:'دوار النهدة',stops:'إب، تعز',notes:'فان مريح بمقاعد واسعة',status:'active'},
  {id:'RF-008',from:'تعز',to:'جدة',date:'2025-07-24',time:'05:30',price:550,seats:3,total:5,driver:'عبدالله الأهدل',dId:'d7',rating:4.9,trips:88,luggage:'مسموح 30 كجم',type:'car',vehicle:'Land Cruiser GXR 2023',meet:'تعز - منطقة قاسم',stops:'إب، صنعاء، جازان',notes:'رحلة مباشرة بدون توقفات طويلة',status:'active'},
];

const SEED_USERS = [
  {id:'p1',name:'محمد أحمد',phone:'+96775551234',email:'mohammed@example.com',role:'passenger',verified:true,created:'2025-01-01'},
  {id:'d1',name:'أحمد الحكيمي',phone:'+96771234567',email:'ahmed@example.com',role:'driver',verified:true,vehicle:'Land Cruiser 2020',created:'2025-01-01'},
  {id:'c1',name:'شركة النجم للنقل',phone:'+96679876543',email:'najm@example.com',role:'driver',verified:true,vehicle:'Mercedes Sprinter',created:'2025-01-01'},
  {id:'a1',name:'المدير العام',phone:'+96700000000',email:'admin@rafeeq.app',role:'admin',verified:true,created:'2025-01-01'},
];

const SEED_COUPONS = [
  {id:'RAFEEQ20',code:'RAFEEQ20',type:'percent',value:20,maxUses:100,uses:12,active:true,expiry:'2025-12-31',usedBy:[]},
  {id:'SUMMER30',code:'SUMMER30',type:'fixed',value:30,maxUses:50,uses:8,active:true,expiry:'2025-09-30',usedBy:[]},
];

/* ══════════════════════════════════════
   CITIES
══════════════════════════════════════ */
const CITIES = [
  'صنعاء','عدن','تعز','الحديدة','إب','ذمار','مأرب','حضرموت','الجوف','المهرة',
  'صعدة','البيضاء','لحج','أبين','شبوة','عمران','المحويت','حجة','ريمة','سقطرى',
  'جازان','نجران','أبها','خميس مشيط','الرياض','جدة','مكة المكرمة','المدينة المنورة',
  'الطائف','الدمام','الأحساء','تبوك','حائل','القصيم','بريدة','ينبع','الباحة',
  'صبيا','أبو عريش','صامطة','شرورة',
];
const SA_SET = new Set(['جازان','نجران','أبها','خميس مشيط','الرياض','جدة','مكة المكرمة',
  'المدينة المنورة','الطائف','الدمام','الأحساء','تبوك','حائل','القصيم','بريدة',
  'ينبع','الباحة','صبيا','أبو عريش','صامطة','شرورة']);
const VERIFIED = new Set(['d1','c1','d4','d7']);

/* ══════════════════════════════════════
   APP STATE
══════════════════════════════════════ */
const S = {
  user:null, role:null, trips:[], bookings:[], notifs:[], msgs:[],
  seats:2, pay:'كاش', bkTrip:null, rating:5,
  couponCode:'', couponDisc:0, finalPrice:0,
  lastResults:null, sortMode:'default', typeFilter:'all',
  meetTab:'addr', prevScreen:'h',
};

/* ══════════════════════════════════════
   INIT
══════════════════════════════════════ */
async function init() {
  try {
    // Seed on first run
    const ex = await DB.getAll('trips');
    if (!ex || !ex.length) {
      await DB.putAll('trips', SEED_TRIPS);
      await DB.putAll('users', SEED_USERS);
      await DB.putAll('coupons', SEED_COUPONS);
      await DB.setSetting('app', {commRate:10,commZero:false,commMsg:'عمولة المنصة 10% على جميع الرحلات',waSA:'+966500000000',waYE:'+967700000000',email:'info@rafeeq.app'});
    }
    S.trips = await DB.getAll('trips');

    // Restore session
    const sess = await DB.get('session','cur');
    if (sess) { S.user = sess.user; S.role = sess.role; await loadUserData(); showBnav(true); }

    // Set today date
    const today = new Date().toISOString().split('T')[0];
    $('sdate').value = today;
    $('at-d').value  = today;

    renderTrips(S.trips || []);
    buildAllDrops();
    setDayLabel();
  } catch(e) { console.error('Init failed:', e); }



  go('h');
}

/* ══════════════════════════════════════
   LOAD USER DATA
══════════════════════════════════════ */
async function loadUserData() {
  if (!S.user) return;
  const allBk = await DB.getAll('bookings');
  S.bookings = allBk.filter(b => b.pid === S.user.id);
  const allNt = await DB.getAll('notifications');
  S.notifs   = allNt.filter(n => n.uid === S.user.id).sort((a,b)=>b.ts-a.ts);
  if (!S.notifs.length) {
    const now = Date.now();
    S.notifs = [
      {id:'nt1',uid:S.user.id,icon:'🎉',title:'مرحباً بك في رفيق!',body:'يسعدنا انضمامك. ابدأ رحلتك الآن!',ts:now,read:false},
      {id:'nt2',uid:S.user.id,icon:'🛡️',title:'حسابك موثق',body:'تم تفعيل حسابك بنجاح.',ts:now-86400000,read:true},
    ];
    for (const n of S.notifs) await DB.put('notifications', n);
  }
  const allMs = await DB.getAll('messages');
  S.msgs = allMs.filter(m=>m.from===S.user.id||m.to===S.user.id).sort((a,b)=>a.ts-b.ts);
  if (!S.msgs.length) {
    const now = Date.now();
    S.msgs = [
      {id:'ms1',from:'d1',to:S.user.id,text:'أهلاً! الرحلة ستبدأ من شارع الزبيري',ts:now-3600000},
      {id:'ms2',from:S.user.id,to:'d1',text:'تمام، سأكون جاهزاً',ts:now-3500000},
      {id:'ms3',from:'d1',to:S.user.id,text:'ممتاز، أراك قريباً إن شاء الله 🚗',ts:now-3400000},
    ];
    for (const m of S.msgs) await DB.put('messages', m);
  }
  updateUI();
}

/* ══════════════════════════════════════
   NAVIGATION
══════════════════════════════════════ */
const SCREEN_MAP = {
  h:'s-h', lg:'s-lg', reg:'s-reg', pass:'s-pass', mytrips:'s-mytrips',
  drv:'s-drv', dtrips:'s-dtrips', plist:'s-plist', earn:'s-earn',
  chat:'s-chat', track:'s-track', notifs:'s-notifs', verify:'s-verify',
  pedit:'s-pedit', admin:'s-admin',
};

function go(key) {
  const cur = document.querySelector('.scr.on');
  if (cur) S.prevScreen = Object.keys(SCREEN_MAP).find(k=>SCREEN_MAP[k]===cur.id) || 'h';
  document.querySelectorAll('.scr').forEach(s => s.classList.remove('on'));
  const el = document.getElementById(SCREEN_MAP[key]);
  if (el) { el.classList.add('on'); window.scrollTo(0,0); }

  // Update bottom nav
  document.querySelectorAll('.bni').forEach(b => b.classList.remove('active'));
  if (key==='h') $('bn-h').classList.add('active');
  else if (key==='mytrips'||key==='dtrips') $('bn-trips').classList.add('active');
  else if (key==='chat') $('bn-chat').classList.add('active');
  else if (key==='pass'||key==='drv'||key==='admin') $('bn-profile').classList.add('active');

  // Screen actions
  if (key==='mytrips') loadMyTrips('upcoming');
  if (key==='dtrips')  loadDriverTrips();
  if (key==='plist')   loadPList();
  if (key==='earn')    loadEarnings();
  if (key==='chat')    initChat();
  if (key==='notifs')  renderNotifs();
  if (key==='verify')  renderVerify();
  if (key==='pedit')   loadEdit();
  if (key==='admin')   adminGo('overview', document.querySelector('.a-ni'));
}

function goBack()     { go(S.prevScreen||'h'); }
function goBnTrips()  { go(S.role==='driver'?'dtrips':'mytrips'); }
function goProfile()  {
  if (!S.user) { go('lg'); return; }
  if (S.role==='admin') go('admin');
  else if (S.role==='driver') go('drv');
  else go('pass');
}
function onAvClick()  { S.user ? goProfile() : go('lg'); }
function showBnav(v)  { $('bnav').classList.toggle('hidden', !v); }
function scrollToSearch() { $('search-area')?.scrollIntoView({behavior:'smooth'}); }

/* ══════════════════════════════════════
   AUTH
══════════════════════════════════════ */
function showFormAlert(id, msg, type='er') {
  const el = $(id); if (!el) return;
  el.className = 'form-alert ' + type;
  el.textContent = msg;
  el.style.display = 'block';
  setTimeout(() => { el.style.display = 'none'; }, 5000);
}

async function doLogin() {
  const u = gv('l-u').trim(), p = gv('l-p').trim();
  if (!u || p.length < 4) { showFormAlert('login-alert','يرجى إدخال بيانات صحيحة'); return; }
  setBtn('l-btn', true, '<span class="spin"></span> جاري الدخول...');
  await sleep(600);
  const all = await DB.getAll('users');
  let user = all.find(x => x.phone===u || x.email===u);
  if (!user) {
    showFormAlert('login-alert','❌ لم نجد حساباً بهذه البيانات. تحقق من رقم الجوال أو البريد الإلكتروني.');
    setBtn('l-btn', false, 'تسجيل الدخول');
    return;
  }
  await setSession(user, user.role);
  toast('مرحباً، '+user.name+'!','ok');
  setBtn('l-btn', false, 'تسجيل الدخول');
  routeLogin(user.role);
}

async function ql(role) {
  const map = {passenger:{id:'p1',name:'محمد أحمد'},driver:{id:'d1',name:'أحمد الحكيمي'},admin:{id:'a1',name:'المدير العام'}};
  let user = await DB.get('users', map[role].id);
  if (!user) user = {...map[role], phone:'+9670000000', role, verified:true, created:new Date().toISOString()};
  await setSession(user, role);
  toast('تم الدخول كـ '+user.name,'ok');
  routeLogin(role);
}

function routeLogin(r) { if(r==='admin') go('admin'); else if(r==='driver') go('drv'); else go('pass'); }

async function setSession(user, role) {
  S.user = user; S.role = role;
  await DB.put('session', {id:'cur', user, role});
  await loadUserData();
  showBnav(true);
  updateNavAvatar();
}

function selRole(r) {
  ['p','d','c'].forEach(x => {
    $('rt-'+x).classList.toggle('on', x===r);
    const el = $('r-'+x); if(el) el.style.display = x===r?'block':'none';
  });
}

async function doReg(type) {
  let name='', phone='', email='';
  if(type==='passenger')  { name=(gv('rp-fn')+' '+gv('rp-ln')).trim(); phone=gv('rp-ph'); email=gv('rp-em'); }
  else if(type==='driver') { name=gv('rd-nm'); phone=gv('rd-ph'); email=gv('rd-em'); }
  else                      { name=gv('rc-nm'); phone=gv('rc-ph'); }
  if (!name||!phone) { toast('يرجى ملء الحقول المطلوبة (*)','wa'); return; }
  setBtn(null, true, ''); // visual only
  await sleep(800);
  const role = type==='passenger'?'passenger':'driver';
  const user = {id:'u'+Date.now(),name,phone,email,role,verified:false,created:new Date().toISOString()};
  await DB.put('users', user);
  await setSession(user, role);
  toast('🎉 تم إنشاء حسابك!','ok');
  routeLogin(role);
}

async function doLogout() {
  await DB.del('session','cur');
  S.user=null; S.role=null; S.bookings=[]; S.notifs=[]; S.msgs=[];
  showBnav(false); updateNavAvatar();
  toast('تم تسجيل الخروج','wa');
  setTimeout(()=>go('h'),350);
}

async function doForgotPassword() {
  const email = gv('fp-email').trim();
  if (!email) { showFormAlert('fp-err','يرجى إدخال البريد الإلكتروني أولاً'); return; }
  hide('fp-err'); hide('fp-ok');
  const all = await DB.getAll('users');
  const user = all.find(x => x.email === email);
  if (!user) { showFormAlert('fp-err','❌ لم يتم العثور على حساب بهذا البريد الإلكتروني.'); return; }
  show('fp-ok');
  setTimeout(() => { hide('fp-ok'); closeMo('fp'); sv('fp-email',''); }, 4000);
}

/* ══════════════════════════════════════
   UI UPDATE
══════════════════════════════════════ */
function updateUI() {
  const qtb = $('quick-test-banner');
  if (!S.user) {
    if (qtb) qtb.style.display = 'block';
    return;
  }
  if (qtb) qtb.style.display = 'none';
  const n = S.user.name||'م', i = n[0]||'م';
  setText('p-avd', i+'<div class="dash-vb">✓</div>');
  setText('d-avd', i+'<div class="dash-vb">✓</div>');
  setText('p-name', n); setText('d-name', n);
  const active = S.bookings.filter(b=>b.status==='upcoming');
  setText('p-st1', S.bookings.length);
  const unread = S.notifs.filter(x=>!x.read).length;
  if(unread){show('p-nd');show('home-nd');}else{hide('p-nd');hide('home-nd');}
  // Upcoming trip widget for passenger
  const nextBk = active[0];
  const uw = $('p-upcoming-widget');
  if (uw) {
    if (nextBk) {
      uw.style.display = 'block';
      const df = nextBk.date ? new Date(nextBk.date+'T00:00').toLocaleDateString('ar-SA',{weekday:'short',day:'numeric',month:'short'}) : nextBk.date;
      setText('taw-title', '🔔 رحلة قادمة: '+nextBk.from+' → '+nextBk.to);
      setText('taw-details', df+' · '+nextBk.time+' · '+nextBk.driver);
    } else {
      uw.style.display = 'none';
    }
  }
  // Driver stats
  const myT = S.trips.filter(t=>t.dId===S.user.id||t.dId==='d1');
  setText('d-h1', myT.length ? myT.length+' رحلة منشورة' : 'لم تضف رحلات بعد');
  setText('d-st1', myT.filter(t=>t.status==='active').length);
  // Driver earnings
  DB.getAll('bookings').then(all => {
    const myIds = new Set(myT.map(t=>t.id));
    const earn = all.filter(b=>myIds.has(b.tripId)&&b.status!=='cancelled').reduce((s,b)=>s+(b.price||0),0);
    const newBk = all.filter(b=>myIds.has(b.tripId)&&b.status==='upcoming').length;
    setText('d-earn', earn.toLocaleString());
    setText('d-bk-cnt', newBk);
  });
  updateCommBanner();
  checkUpcomingTrips();
}

function updateNavAvatar() {
  const av = $('home-av');
  if (av) av.textContent = S.user ? (S.user.name||'م')[0] : 'م';
}

async function updateCommBanner() {
  const s = await DB.getSetting('app') || {commRate:10};
  const b = $('comm-banner'); if(!b) return;
  if(s.commZero){b.style.display='flex';setText('comm-txt',s.commMsg||'عمولة المنصة صفر');}
  else if(s.commRate>0){b.style.display='flex';setText('comm-txt','عمولة المنصة '+s.commRate+'%');}
  else {b.style.display='none';}
}

/* ══════════════════════════════════════
   TRIPS — RENDER
══════════════════════════════════════ */
function renderTrips(trips) {
  const c = $('tlist'); if (!c) return;
  const vis = trips.filter(t=>t.status!=='hidden'&&t.status!=='stopped');
  setText('tcnt', vis.length ? vis.length+' رحلة متاحة' : '');
  if (!vis.length) { c.innerHTML='<div class="empty"><div class="empty-i">🗺️</div><p>لا توجد رحلات متاحة</p></div>'; return; }
  c.innerHTML = vis.map(t => tripCardHTML(t, false)).join('');
  // Store trips map for click lookup
  window._tripsMap = {};
  trips.forEach(t => window._tripsMap[t.id] = t);
}

function tripCardHTML(t, actions=false) {
  const df  = t.date ? new Date(t.date+'T00:00').toLocaleDateString('ar-SA',{day:'numeric',month:'short',weekday:'short'}) : '';
  const str = '★'.repeat(Math.floor(t.rating||0))+'☆'.repeat(5-Math.floor(t.rating||0));
  const lbl = t.type==='bus'?'🚌 باص':t.type==='van'?'🚐 فان':'🚗 سيارة';
  const ver = VERIFIED.has(t.dId);
  const clickAttr = actions ? '' : `data-tripid="${t.id}"`;
  return `
<div class="tc" ${clickAttr} ${actions ? `onclick="openTripDetail('${t.id}')" style="cursor:pointer"` : ''}>\n  <div class="tc-route">\n    <div class="tc-city">🇾🇪 ${t.from}</div>\n    <div class="tc-line"></div>\n    <div class="tc-city arr">🇸🇦 ${t.to}</div>\n    <div class="tc-badge">${lbl}</div>\n  </div>\n  <div class="tc-meta">\n    <span class="mc">📅 ${df}</span>\n    <span class="mc">🕐 ${t.time}</span>\n    <span class="mc">💺 ${t.seats}/${t.total}</span>\n    ${t.stops?`<span class="mc">📍 ${t.stops}</span>`:''}\n    ${t.luggage?`<span class="mc">🧳 ${t.luggage}</span>`:''}\n  </div>\n  <div class="tc-foot">\n    <div class="drv-row">\n      <div class="drv-av">${(t.driver||'س')[0]}</div>\n      <div>\n        <div style="font-size:12px;font-weight:800">${t.driver||'السائق'} ${ver?'<span style="color:var(--ok);font-size:10px;font-weight:900">✓ موثق</span>':''}</div>\n        <div style="font-size:11px;color:var(--sub)">${t.vehicle||''} · ${str} (${t.rating||0})</div>\n      </div>\n    </div>\n    <div style="text-align:left">\n      <div style="font-size:19px;font-weight:900">${t.price} <span style="font-size:11px;font-weight:700;color:var(--sub)">ر.س</span></div>\n      ${actions\n        ? `<div style="display:flex;gap:5px;margin-top:5px">\n             <button class="btn b-g bsm" onclick="event.stopPropagation();editTrip('${t.id}')" style="font-size:10px" type="button">✏️</button>\n             <button class="btn b-er bsm" onclick="event.stopPropagation();delTrip('${t.id}')" style="font-size:10px" type="button">🗑️</button>\n           </div>`\n        : '<div style="font-size:10px;color:var(--ok);font-weight:800;margin-top:2px">احجز الآن ›</div>'\n      }\n    </div>\n  </div>\n  ${actions ? `<div style="border-top:1px solid var(--bg);margin-top:10px;padding-top:9px;display:flex;align-items:center;justify-content:space-between">\n    <div style="font-size:11px;color:var(--sub);font-weight:700">اضغط لعرض الحاجزين</div>\n    <div style="font-size:12px;font-weight:900;color:var(--ok)">👥 ${(t.total||0)-(t.seats||0)} حاجز ›</div>\n  </div>` : ''}\n</div>`;

}

document.addEventListener('click', function(e) {
  const card = e.target.closest('[data-tripid]');
  if (!card) return;
  const id = card.dataset.tripid;
  const trip = (window._tripsMap||{})[id] || S.trips.find(t=>t.id===id);
  if (trip) openBk(trip);
});

async function openTripDetail(tripId) {
  const trip = S.trips.find(t=>t.id===tripId); if(!trip) return;
  const all = await DB.getAll('bookings');
  const bks = all.filter(b=>b.tripId===tripId);
  const booked = (trip.total||0) - (trip.seats||0);
  const earned = bks.filter(b=>b.status!=='cancelled').reduce((s,b)=>s+(b.price||0),0);
  const df = trip.date ? new Date(trip.date+'T00:00').toLocaleDateString('ar-SA',{weekday:'long',day:'numeric',month:'long'}) : '';
  const pct = trip.total ? Math.round(booked/trip.total*100) : 0;
  const pColor = pct>=100?'var(--er)':pct>=70?'var(--warn)':'var(--ok)';

  const passHTML = bks.length ? bks.map(b=>{
    const sc = b.status==='upcoming'?'b-ok':b.status==='cancelled'?'b-er':'b-pen';
    const sl = b.status==='upcoming'?'قادمة':b.status==='completed'?'منجزة':'ملغاة';
    return `<div style="background:#fff;border:1px solid var(--border);border-radius:12px;padding:13px;margin-bottom:9px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:9px">
        <div style="display:flex;align-items:center;gap:9px">
          <div style="width:36px;height:36px;border-radius:50%;background:var(--mint);display:flex;align-items:center;justify-content:center;font-weight:900;font-size:15px;flex-shrink:0">${(b.pid||'م')[0]}</div>
          <div>
            <div style="font-size:13px;font-weight:900">${b.pid||'مسافر'}</div>
            <div style="font-size:10px;color:var(--sub)">${b.id}</div>
          </div>
        </div>
        <span class="${sc}">${sl}</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:7px">
        <div style="background:var(--bg);border-radius:8px;padding:8px;text-align:center">
          <div style="font-size:10px;color:var(--sub);font-weight:700">المقاعد</div>
          <div style="font-size:15px;font-weight:900">💺 ${b.seats}</div>
        </div>
        <div style="background:var(--bg);border-radius:8px;padding:8px;text-align:center">
          <div style="font-size:10px;color:var(--sub);font-weight:700">المبلغ</div>
          <div style="font-size:13px;font-weight:900;color:var(--ok)">${b.price} ر.س</div>
        </div>
        <div style="background:var(--bg);border-radius:8px;padding:8px;text-align:center">
          <div style="font-size:10px;color:var(--sub);font-weight:700">الدفع</div>
          <div style="font-size:11px;font-weight:900">${b.payment||'كاش'}</div>
        </div>
      </div>
      ${b.coupon?`<div style="margin-top:7px;font-size:11px;color:var(--ok);font-weight:700">🎁 كود: ${b.coupon}</div>`:''}
    </div>`;
  }).join('') : '<div class="empty" style="padding:22px 0"><div class="empty-i">👥</div><p>لا يوجد حاجزون بعد</p></div>';

  setText('td-content', `
    <div style="background:linear-gradient(135deg,var(--black),#1a2a3a);border-radius:14px;padding:16px;margin-bottom:14px;color:#fff">
      <div style="font-size:15px;font-weight:900;margin-bottom:5px">🇾🇪 ${trip.from} → ${trip.to} 🇸🇦</div>
      <div style="font-size:12px;opacity:.65;margin-bottom:13px">📅 ${df} · 🕐 ${trip.time} · ${trip.vehicle||''}</div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;text-align:center">
        <div style="background:rgba(255,255,255,.1);border-radius:10px;padding:10px">
          <div style="font-size:20px;font-weight:900">${booked}</div>
          <div style="font-size:10px;opacity:.7">حاجز</div>
        </div>
        <div style="background:rgba(255,255,255,.1);border-radius:10px;padding:10px">
          <div style="font-size:20px;font-weight:900">${trip.seats}</div>
          <div style="font-size:10px;opacity:.7">متبقي</div>
        </div>
        <div style="background:rgba(178,240,232,.15);border-radius:10px;padding:10px">
          <div style="font-size:20px;font-weight:900;color:var(--mint)">${earned}</div>
          <div style="font-size:10px;opacity:.7">ر.س</div>
        </div>
      </div>
    </div>
    <div style="background:#fff;border-radius:11px;padding:12px;margin-bottom:14px;border:1px solid var(--border)">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:7px">
        <div style="font-size:12px;font-weight:800">امتلاء الرحلة</div>
        <div style="font-size:12px;font-weight:900;color:${pColor}">${pct}%</div>
      </div>
      <div style="height:9px;background:var(--bg);border-radius:50px;overflow:hidden">
        <div style="height:100%;width:${pct}%;background:${pColor};border-radius:50px;transition:.4s"></div>
      </div>
    </div>
    <div style="font-size:13px;font-weight:900;margin-bottom:10px">👥 الحاجزون (${bks.length})</div>
    ${passHTML}
  `);
  showMo('td');
}


/* ══════════════════════════════════════
   CITY DROPDOWNS
══════════════════════════════════════ */
function buildAllDrops() {
  buildDrop('sf-drop','sf');
  buildDrop('sto-drop','sto');
  buildDrop('at-f-drop','at-f');
  buildDrop('at-t-drop','at-t');
}

function buildDrop(dropId, hiddenId) {
  const drop = $(dropId); if(!drop) return;
  drop.innerHTML = CITIES.map(c =>
    `<div class="city-item" onmousedown="pickCity('${c}','${dropId}','${hiddenId}')">${c}</div>`
  ).join('');
}

function filterDrop(inp, dropId, hiddenId) {
  const q  = (inp.value||'').trim();
  const d  = $(dropId); if(!d) return;
  const ls = q ? CITIES.filter(c=>c.includes(q)||q.includes(c)) : CITIES;
  if (!ls.length) { d.innerHTML='<div class="city-item" style="color:var(--sub)">لا نتائج</div>'; }
  else d.innerHTML = ls.map(c=>`<div class="city-item" onmousedown="pickCity('${c}','${dropId}','${hiddenId}')">${c}</div>`).join('');
  openDrop(dropId);
}

function openDrop(id)  { $(id)?.classList.add('open'); }
function closeDrop(id) { $(id)?.classList.remove('open'); }

function pickCity(name, dropId, hiddenId) {
  const txtId = hiddenId==='sf'?'sf-txt':hiddenId==='sto'?'sto-txt':hiddenId==='at-f'?'at-f-txt':hiddenId==='at-t'?'at-t-txt':null;
  if(txtId) sv(txtId, name);
  sv(hiddenId, name);
  closeDrop(dropId);
  if(hiddenId==='sf'||hiddenId==='sto') valRoute();
  if(hiddenId==='at-f'||hiddenId==='at-t') validateTripRoute();
}

/* ══════════════════════════════════════
   SEARCH & FILTER
══════════════════════════════════════ */
async function doSearch() {
  const from = gv('sf') || gv('sf-txt').trim();
  const to   = gv('sto') || gv('sto-txt').trim();
  const date = gv('sdate');
  const pax  = parseInt(gv('spax'))||1;
  setBtn('sbtn', true, '<span class="spin"></span> جاري البحث...');
  await sleep(450);
  let r = S.trips.filter(t=>t.status!=='hidden'&&t.status!=='stopped');
  if(from) r=r.filter(t=>t.from.includes(from)||from.includes(t.from));
  if(to)   r=r.filter(t=>t.to.includes(to)||to.includes(t.to));
  if(date) r=r.filter(t=>t.date===date);
  if(pax>1) r=r.filter(t=>t.seats>=pax);
  if(S.typeFilter!=='all') r=r.filter(t=>t.type===S.typeFilter);
  S.lastResults = r;
  applyFiltersToResults(r);
  setBtn('sbtn', false, '🔍 بحث عن الرحلات');
  renderActiveFilters(from,to,date,pax);
  $('tlist')?.scrollIntoView({behavior:'smooth',block:'start'});
}

function applyFilters() {
  if(!S.lastResults) S.lastResults = S.trips.filter(t=>t.status!=='hidden'&&t.status!=='stopped');
  applyFiltersToResults(S.lastResults);
}

function applyFiltersToResults(base) {
  let r = [...base];
  if($('f-verified')?.checked) r=r.filter(t=>VERIFIED.has(t.dId));
  if($('f-seats')?.checked)    r=r.filter(t=>t.seats>0);
  if($('f-today')?.checked)  { const d=new Date().toISOString().split('T')[0]; r=r.filter(t=>t.date===d); }
  const maxP = parseInt($('f-price')?.value)||9999;
  r = r.filter(t=>(t.price||0)<=maxP);
  if(S.typeFilter!=='all') r=r.filter(t=>t.type===S.typeFilter);
  if(S.sortMode==='price_asc')  r.sort((a,b)=>a.price-b.price);
  else if(S.sortMode==='price_dsc') r.sort((a,b)=>b.price-a.price);
  else if(S.sortMode==='seats')     r.sort((a,b)=>b.seats-a.seats);
  else if(S.sortMode==='rating')    r.sort((a,b)=>(b.rating||0)-(a.rating||0));
  renderTrips(r);
  const cnt = $('tcnt');
  if(cnt) cnt.innerHTML=`<span style="background:var(--mint);border-radius:50px;padding:3px 10px;font-size:11px;font-weight:800;color:var(--black)">${r.filter(t=>t.status!=='hidden').length} رحلة</span>`;
}

function setSort(mode, el) {
  S.sortMode=mode;
  document.querySelectorAll('.srt').forEach(b=>b.classList.remove('on'));
  el?.classList.add('on');
  applyFilters();
}

function ftype(type, el) {
  S.typeFilter=type;
  document.querySelectorAll('.sf-btn').forEach(b=>b.classList.remove('on'));
  el?.classList.add('on');
  S.lastResults=null;
  applyFilters();
}

function renderActiveFilters(from,to,date,pax) {
  const bar=$('active-filters'), tags=$('af-tags');
  if(!bar||!tags) return;
  const items=[];
  if(from) items.push({label:'من: '+from, clear:()=>{sv('sf','');sv('sf-txt','');doSearch();}});
  if(to)   items.push({label:'إلى: '+to,  clear:()=>{sv('sto','');sv('sto-txt','');doSearch();}});
  if(date) items.push({label:'📅 '+date,  clear:()=>{sv('sdate','');doSearch();}});
  if(pax>1) items.push({label:'💺 '+pax+' مسافرين',clear:()=>{sv('spax','1');doSearch();}});
  if(items.length) {
    bar.style.display='block';
    tags.innerHTML=items.map((x,i)=>`<div class="af-tag">${x.label}<span onclick="clearTag(${i})">✕</span></div>`).join('');
    window._afItems=items;
  } else bar.style.display='none';
}

function clearTag(i) { window._afItems?.[i]?.clear?.(); }

function clearAllFilters() {
  ['sf','sto'].forEach(id=>{sv(id,'');});
  ['sf-txt','sto-txt'].forEach(id=>{sv(id,'');});
  sv('sdate',''); sv('spax','1');
  ['f-verified','f-seats','f-today'].forEach(id=>{const e=$(id);if(e)e.checked=false;});
  S.sortMode='default'; S.typeFilter='all'; S.lastResults=null;
  document.querySelectorAll('.srt').forEach(b=>b.classList.remove('on'));
  $('srt-def')?.classList.add('on');
  document.querySelectorAll('.sf-btn').forEach(b=>b.classList.remove('on'));
  $('sf-all')?.classList.add('on');
  $('active-filters').style.display='none';
  $('sday-label').textContent='';
  renderTrips(S.trips.filter(t=>t.status!=='hidden'));
  setText('tcnt','');
}

function swapCities() {
  const fv=gv('sf-txt'), tv=gv('sto-txt');
  const fh=gv('sf'), th=gv('sto');
  sv('sf-txt',tv); sv('sto-txt',fv);
  sv('sf',th); sv('sto',fh);
  valRoute(); applyFilters();
}

function valRoute() {
  const f=gv('sf'), t=gv('sto');
  const both=f&&t&&SA_SET.has(f)&&SA_SET.has(t);
  $('rv-warn').style.display=both?'block':'none';
  $('sbtn').disabled=!!both;
}

function setDayLabel() {
  const d=gv('sdate'); if(!d) { $('sday-label').textContent=''; return; }
  $('sday-label').textContent = new Date(d+'T00:00').toLocaleDateString('ar-SA',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
}

/* ══════════════════════════════════════
   BOOKING
══════════════════════════════════════ */
function openBk(trip) {
  S.bkTrip=trip; S.seats=2; S.couponCode=''; S.couponDisc=0; S.finalPrice=trip.price*2;
  const df=trip.date?new Date(trip.date+'T00:00').toLocaleDateString('ar-SA',{day:'numeric',month:'long',weekday:'long'}):'';
  setText('bk-info',`
    <div style="font-weight:900;font-size:14px;margin-bottom:6px">🇾🇪 ${trip.from} → ${trip.to} 🇸🇦</div>
    <div style="font-size:12px;color:var(--sub);display:flex;gap:10px;flex-wrap:wrap">
      <span>📅 ${df}</span><span>🕐 ${trip.time}</span>
      <span>👤 ${trip.driver}</span><span>⭐ ${trip.rating}</span>
    </div>
    <div style="font-size:10px;color:#bbb;margin-top:4px">${trip.id}</div>`);
  updTotal();
  document.querySelectorAll('.seat').forEach((b,i)=>b.classList.toggle('on',i===1));
  document.querySelectorAll('.pay').forEach((b,i)=>b.classList.toggle('on',i===0));
  S.pay='كاش';
  sv('coupon-inp',''); setText('coupon-msg','');
  showMo('bk');
}

function selSeats(n,el){
  S.seats=n;
  document.querySelectorAll('.seat').forEach(b=>b.classList.remove('on'));
  el.classList.add('on');
  updTotal();
}
function selPay(el){
  document.querySelectorAll('.pay').forEach(b=>b.classList.remove('on'));
  el.classList.add('on');
  S.pay=el.textContent.trim();
}

function updTotal(){
  const base=(S.bkTrip?.price||0)*S.seats;
  const disc=S.couponDisc>0?(S.couponDisc<1?Math.round(base*S.couponDisc):S.couponDisc):0;
  const final=Math.max(0,base-disc);
  S.finalPrice=final;
  if(disc>0) setText('bk-total',`<div style="font-size:12px;color:var(--sub);text-decoration:line-through">${base.toLocaleString()} ر.س</div><div style="font-size:22px;font-weight:900;color:var(--ok)">${final.toLocaleString()} ر.س <span style="font-size:11px;background:#e8fff5;color:var(--ok);padding:2px 7px;border-radius:50px">وفّرت ${disc} ر.س</span></div>`);
  else setText('bk-total',`<span style="font-size:24px;font-weight:900">${final.toLocaleString()} ر.س</span>`);
}

async function applyCoupon(){
  const code=(gv('coupon-inp')||'').trim().toUpperCase();
  const msg=$('coupon-msg'); if(!code) return;
  const cp=await DB.get('coupons',code);
  if(!cp||!cp.active){if(msg){msg.textContent='❌ الكود غير صحيح أو منتهي الصلاحية';msg.style.color='var(--er)';}return;}
  if((cp.uses||0)>=(cp.maxUses||100)){if(msg){msg.textContent='❌ تجاوز الكود الحد الأقصى';msg.style.color='var(--er)';}return;}
  S.couponCode=code;
  S.couponDisc=cp.type==='percent'?cp.value/100:cp.value;
  if(msg){msg.textContent=`✅ تم تطبيق: خصم ${cp.type==='percent'?cp.value+'%':cp.value+' ر.س'}`;msg.style.color='var(--ok)';}
  updTotal();
}

async function confirmBooking(){
  if(!S.user){closeMo('bk');toast('يجب تسجيل الدخول أولاً','wa');setTimeout(()=>go('lg'),600);return;}
  const t=S.bkTrip;
  const bk={id:'BK-'+Date.now(),pid:S.user.id,tripId:t.id,from:t.from,to:t.to,date:t.date,time:t.time,driver:t.driver,dId:t.dId,seats:S.seats,price:S.finalPrice,origPrice:t.price*S.seats,coupon:S.couponCode||null,payment:S.pay,status:'upcoming',ts:Date.now()};
  await DB.put('bookings',bk);
  S.bookings.push(bk);
  if(S.couponCode){const cp=await DB.get('coupons',S.couponCode);if(cp){cp.uses=(cp.uses||0)+1;await DB.put('coupons',cp);}}
  const trip=S.trips.find(x=>x.id===t.id);if(trip){trip.seats=Math.max(0,trip.seats-S.seats);await DB.put('trips',trip);}
  const ntf={id:'nt'+Date.now(),uid:S.user.id,icon:'✅',title:'تم الحجز بنجاح!',body:`${t.from} → ${t.to} · ${S.seats} مقاعد · ${bk.id}`,ts:Date.now(),read:false};
  await DB.put('notifications',ntf);
  S.notifs.unshift(ntf);
  closeMo('bk'); updateUI();
  toast('🎉 تم الحجز! رقم: '+bk.id,'ok');
}

/* ══════════════════════════════════════
   MY TRIPS
══════════════════════════════════════ */
function loadMyTrips(filter,el){
  if(el){document.querySelectorAll('#s-mytrips .tab').forEach(b=>b.classList.remove('on'));el.classList.add('on');}
  const c=$('mytrips-list');
  const items=S.bookings.filter(b=>b.status===filter);
  if(!items.length){c.innerHTML='<div class="empty"><div class="empty-i">🗺️</div><p>لا توجد رحلات</p></div>';return;}
  c.innerHTML=items.map(b=>`
<div class="card cp" style="margin-bottom:11px">
  <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:9px">
    <div><div style="font-weight:900;font-size:14px">${b.from} → ${b.to}</div><div style="font-size:11px;color:var(--sub);margin-top:2px">${b.date} · ${b.time}</div></div>
    <span class="${b.status==='upcoming'?'b-ok':b.status==='cancelled'?'b-er':'b-pen'}">${b.status==='upcoming'?'قادمة':b.status==='completed'?'منجزة':'ملغاة'}</span>
  </div>
  <div class="tc-meta" style="margin-bottom:9px">
    <span class="mc">👤 ${b.driver}</span><span class="mc">💺 ${b.seats}</span>
    <span class="mc">💰 ${b.price} ر.س</span><span class="mc">💳 ${b.payment}</span>
    ${b.coupon?`<span class="mc" style="background:#e8fff5;color:var(--ok)">🎁 ${b.coupon}</span>`:''}
  </div>
  <div style="font-size:10px;color:#bbb;margin-bottom:9px">${b.id}</div>
  <div style="display:flex;gap:6px;flex-wrap:wrap">
    ${b.status==='upcoming'?`<button class="btn b-o bsm" onclick="go('track')" type="button">📍 تتبع</button><button class="btn b-g bsm" onclick="go('chat')" type="button">💬 تواصل</button><button class="btn b-er bsm" onclick="cancelBk('${b.id}')" type="button">إلغاء</button>`:''}
    ${b.status==='completed'?`<button class="btn b-k bsm" onclick="showMo('rate')" type="button">⭐ تقييم</button>`:''}
  </div>
</div>`).join('');
}

async function cancelBk(id){
  const b=S.bookings.find(x=>x.id===id);
  if(b){b.status='cancelled';await DB.put('bookings',b);const t=S.trips.find(x=>x.id===b.tripId);if(t){t.seats+=b.seats;await DB.put('trips',t);}}
  loadMyTrips('upcoming'); toast('تم إلغاء الحجز','wa');
}

/* ══════════════════════════════════════
   DRIVER TRIPS
══════════════════════════════════════ */
function loadDriverTrips(){
  const c=$('dtrips-list');
  const mine=S.trips.filter(t=>t.dId===S.user?.id||t.dId==='d1');
  if(!mine.length){c.innerHTML='<div class="empty"><div class="empty-i">🗺️</div><p>لم تضف رحلات بعد</p></div>';return;}
  window._tripsMap = window._tripsMap||{};
  mine.forEach(t=>window._tripsMap[t.id]=t);
  c.innerHTML=mine.map(t=>tripCardHTML(t,true)).join('');
}

function validateTripRoute(){
  const f=gv('at-f')||gv('at-f-txt').trim();
  const t=gv('at-t')||gv('at-t-txt').trim();
  const both=f&&t&&SA_SET.has(f)&&SA_SET.has(t);
  $('at-route-warn').style.display=both?'block':'none';
  $('at-submit-btn').disabled=!!both;
}

function setMeetTab(tab){
  S.meetTab=tab;
  ['addr','link','coords','flex'].forEach(x=>{
    $('mt-'+x)?.classList.toggle('on',x===tab);
    const p=$('mp-'+x); if(p) p.style.display=x===tab?'block':'none';
  });
}

function buildMeetPoint(){
  if(S.meetTab==='addr'){const a=gv('at-mp-addr'),ar=gv('at-mp-area'),ti=gv('at-mp-time');return[ar,a,ti?'الساعة '+ti:''].filter(Boolean).join(' — ');}
  if(S.meetTab==='link') return gv('at-mp-link');
  if(S.meetTab==='coords'){const la=gv('at-mp-lat'),lo=gv('at-mp-lng');return la&&lo?`${la},${lo}`:'';}
  return gv('at-mp-flex');
}

function getMyLocation(){
  if(!navigator.geolocation){toast('المتصفح لا يدعم GPS','wa');return;}
  toast('جاري تحديد موقعك...','ok');
  navigator.geolocation.getCurrentPosition(pos=>{
    const la=pos.coords.latitude.toFixed(6),lo=pos.coords.longitude.toFixed(6);
    sv('at-mp-lat',la);sv('at-mp-lng',lo);
    const p=$('mp-coords-preview');
    if(p){p.style.display='block';p.innerHTML=`📍 موقعك: ${la}, ${lo} — <a href="https://maps.google.com/?q=${la},${lo}" target="_blank" style="color:var(--black);font-weight:800">معاينة ↗</a>`;}
    toast('✅ تم تحديد موقعك','ok');
  },()=>toast('تعذّر تحديد الموقع','er'));
}

/* ══════════════════════════════════════
   WIZARD — 3-Step Add Trip
══════════════════════════════════════ */
const WIZARD = {
  step: 1,
  titles: ['🗺️ المسار', '🚗 التفاصيل', '✅ التأكيد'],
  go(s) {
    for (let i=1;i<=3;i++) {
      const el = $('wz-s'+i); if(el) el.style.display = i===s ? 'block' : 'none';
      const stp = $('stp-'+i); if(!stp) continue;
      stp.classList.toggle('active', i<=s);
      stp.classList.toggle('done', i<s);
    }
    const bar1=$('stp-bar-1'), bar2=$('stp-bar-2');
    if(bar1) bar1.classList.toggle('done', s>1);
    if(bar2) bar2.classList.toggle('done', s>2);
    this.step = s;
    const prev=$('wz-prev'), next=$('wz-next');
    if(prev) prev.style.display = s===1 ? 'none' : 'inline-flex';
    if(next) { next.textContent = s===3 ? '🚀 نشر الرحلة' : 'التالي ←'; next.onclick = s===3 ? submitTrip : ()=>WIZARD.next(); }
    setText('wz-title', this.titles[s-1]);
    if(s===3) this.renderSummary();
  },
  next() {
    if(this.step===1) {
      const from=gv('at-f')||gv('at-f-txt').trim(), to=gv('at-t')||gv('at-t-txt').trim(), date=gv('at-d');
      if(!from||!to||!date){toast('يرجى اختيار المدن والتاريخ','wa');return;}
      if(SA_SET.has(from)&&SA_SET.has(to)){toast('⛔ لا يُسمح بالرحلات الداخلية السعودية','er');return;}
      this.go(2);
    } else if(this.step===2) {
      const price=parseInt(gv('at-p')), seats=parseInt(gv('at-s'));
      if(!price||price<1){toast('يرجى إدخال السعر','wa');return;}
      if(!seats||seats<1){toast('يرجى إدخال عدد المقاعد','wa');return;}
      this.go(3);
    }
  },
  prev() { if(this.step>1) this.go(this.step-1); },
  selType(type, el) {
    document.querySelectorAll('.vt-btn').forEach(b=>b.classList.remove('on'));
    el.classList.add('on'); sv('at-tp', type);
  },
  selLuggage(val, el) {
    document.querySelectorAll('.lg-btn').forEach(b=>b.classList.remove('on'));
    el.classList.add('on'); sv('at-l', val);
  },
  renderSummary() {
    const from=gv('at-f')||gv('at-f-txt').trim(), to=gv('at-t')||gv('at-t-txt').trim();
    const date=gv('at-d'), time=gv('at-tm'), price=gv('at-p'), seats=gv('at-s'), vehicle=gv('at-v');
    const df = date ? new Date(date+'T00:00').toLocaleDateString('ar-SA',{weekday:'long',day:'numeric',month:'long'}) : '-';
    setText('wz-summary', `<div class="sum-row"><span>المسار</span><span>${from} → ${to}</span></div><div class="sum-row"><span>التاريخ</span><span>${df} · ${time}</span></div><div class="sum-row"><span>السعر</span><span>${price} ر.س / مقعد</span></div><div class="sum-row"><span>المقاعد</span><span>${seats} مقعد</span></div><div class="sum-row"><span>المركبة</span><span>${vehicle||'-'}</span></div>`);
  },
  reset() {
    this.go(1);
    ['at-f-txt','at-t-txt','at-f','at-t','at-d','at-p','at-v','at-sp','at-n','at-mp-addr'].forEach(id=>sv(id,''));
    sv('at-tm','07:00'); sv('at-s','4'); sv('at-tp','car'); sv('at-l','مسموح 20 كجم');
    document.querySelectorAll('.vt-btn').forEach((b,i)=>b.classList.toggle('on',i===0));
    document.querySelectorAll('.lg-btn').forEach((b,i)=>b.classList.toggle('on',i===0));
  }
};

/* ══════════════════════════════════════
   SMART NOTIFICATIONS (2hr check)
══════════════════════════════════════ */
function checkUpcomingTrips() {
  if(!S.user || !S.bookings.length) return;
  const now = new Date();
  S.bookings.filter(b=>b.status==='upcoming').forEach(b=>{
    if(!b.date||!b.time) return;
    const tripTime = new Date(b.date+'T'+b.time);
    const diffHrs = (tripTime - now) / 3600000;
    const key = 'notified_'+b.id;
    if(diffHrs>0 && diffHrs<2 && !localStorage.getItem(key)) {
      toast(`🔔 رحلتك ${b.from} → ${b.to} خلال أقل من ساعتين!`,'wa');
      localStorage.setItem(key,'1');
    }
  });
}
setInterval(checkUpcomingTrips, 60000);

async function submitTrip(){
  const from=gv('at-f')||gv('at-f-txt').trim();
  const to=gv('at-t')||gv('at-t-txt').trim();
  if(from&&to&&SA_SET.has(from)&&SA_SET.has(to)){toast('⛔ لا يُسمح بالرحلات الداخلية السعودية','er');return;}
  const trip={
    id:'RF-'+Date.now(), from, to, date:gv('at-d'), time:gv('at-tm'),
    price:parseInt(gv('at-p'))||0, seats:parseInt(gv('at-s'))||4, total:parseInt(gv('at-s'))||4,
    driver:S.user?.name||'السائق', dId:S.user?.id||'d1', rating:0, trips:0,
    luggage:gv('at-l'), type:gv('at-tp')||'car', vehicle:gv('at-v'),
    meet:gv('at-mp-addr'), stops:gv('at-sp'), notes:gv('at-n'), status:'active', ts:Date.now()
  };
  if(!trip.from||!trip.to||!trip.date||!trip.price){toast('يرجى ملء: المدن، التاريخ، السعر','wa');return;}
  await DB.put('trips', trip);
  S.trips.unshift(trip);
  if(!window._tripsMap) window._tripsMap={};
  window._tripsMap[trip.id]=trip;
  renderTrips(S.trips);
  closeMo('at'); WIZARD.reset();
  toast('✅ تم نشر الرحلة بنجاح!','ok');
  updateUI();
}

async function delTrip(id){
  if(!confirm('هل تريد حذف هذه الرحلة؟')) return;
  S.trips=S.trips.filter(t=>t.id!==id);
  await DB.del('trips',id);
  loadDriverTrips(); renderTrips(S.trips);
  toast('تم حذف الرحلة','wa');
}

function editTrip(id){
  const t=S.trips.find(x=>x.id===id); if(!t) return;
  sv('at-f-txt',t.from);sv('at-f',t.from);
  sv('at-t-txt',t.to);sv('at-t',t.to);
  sv('at-d',t.date);sv('at-tm',t.time);sv('at-p',t.price);sv('at-n',t.notes||'');
  showMo('at');
}

/* ══════════════════════════════════════
   PASSENGERS LIST
══════════════════════════════════════ */
async function loadPList(){
  const c=$('plist-content');
  const all=await DB.getAll('bookings');
  const myIds=new Set(S.trips.filter(t=>t.dId===S.user?.id||t.dId==='d1').map(t=>t.id));
  const bks=all.filter(b=>myIds.has(b.tripId));
  if(!bks.length){c.innerHTML='<div class="empty"><div class="empty-i">👥</div><p>لا يوجد حجوزات على رحلاتك</p></div>';return;}
  c.innerHTML=bks.map(b=>`
<div class="card cp" style="margin-bottom:11px">
  <div style="font-weight:900;font-size:13px;margin-bottom:6px">${b.from} → ${b.to}</div>
  <div style="font-size:12px;color:var(--sub);margin-bottom:9px">📋 ${b.id} · ${b.date}</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:12px">
    <div style="background:var(--bg);border-radius:8px;padding:9px"><div style="color:var(--sub);font-size:10px">المسافر</div><div style="font-weight:800">${b.pid||'-'}</div></div>
    <div style="background:var(--bg);border-radius:8px;padding:9px"><div style="color:var(--sub);font-size:10px">المقاعد</div><div style="font-weight:800">${b.seats}</div></div>
    <div style="background:var(--bg);border-radius:8px;padding:9px"><div style="color:var(--sub);font-size:10px">الدفع</div><div style="font-weight:800">${b.price} ر.س · ${b.payment}</div></div>
    <div style="background:var(--bg);border-radius:8px;padding:9px"><div style="color:var(--sub);font-size:10px">الحالة</div><span class="${b.status==='upcoming'?'b-ok':b.status==='cancelled'?'b-er':'b-pen'}">${b.status==='upcoming'?'قادمة':b.status==='completed'?'منجزة':'ملغاة'}</span></div>
  </div>
</div>`).join('');
}

/* ══════════════════════════════════════
   EARNINGS
══════════════════════════════════════ */
async function loadEarnings(){
  const c=$('earn-content');
  const all=await DB.getAll('bookings');
  const myIds=new Set(S.trips.filter(t=>t.dId===S.user?.id||t.dId==='d1').map(t=>t.id));
  const bks=all.filter(b=>myIds.has(b.tripId)&&b.status!=='cancelled');
  const total=bks.reduce((s,b)=>s+(b.price||0),0);
  const settings=await DB.getSetting('app')||{commRate:10};
  const comm=Math.round(total*settings.commRate/100);
  const net=total-comm;
  c.innerHTML=`
<div class="stats-3" style="margin-bottom:14px">
  <div class="stat"><div class="stat-v" style="color:var(--ok)">${total.toLocaleString()}</div><div class="stat-l">إجمالي ر.س</div></div>
  <div class="stat"><div class="stat-v" style="color:var(--er)">${comm.toLocaleString()}</div><div class="stat-l">عمولة المنصة</div></div>
  <div class="stat"><div class="stat-v">${net.toLocaleString()}</div><div class="stat-l">الصافي ر.س</div></div>
</div>
<div class="a-card">
  <div class="a-ch"><div class="a-ct">آخر المدفوعات</div></div>
  ${bks.length===0?'<div class="empty" style="padding:20px"><div class="empty-i">💰</div><p>لا توجد مدفوعات بعد</p></div>':''}
  ${bks.slice(-5).reverse().map(b=>`<div style="display:flex;justify-content:space-between;padding:9px 0;border-bottom:1px solid var(--bg);font-size:12px"><div><div style="font-weight:800">${b.from} → ${b.to}</div><div style="color:var(--sub)">${b.date} · ${b.seats} مقاعد</div></div><div style="font-weight:900;color:var(--ok)">+${b.price} ر.س</div></div>`).join('')}
</div>
<div style="margin-top:14px"><button class="btn b-k bfw" onclick="toast('ميزة السحب قريباً 🏦','wa')" type="button">💳 سحب الأرباح</button></div>`;
}

/* ══════════════════════════════════════
   CHAT
══════════════════════════════════════ */
function initChat(){
  const c=$('chat-msgs');
  if(!S.msgs.length){c.innerHTML='<div class="empty"><div class="empty-i">💬</div><p>لا توجد رسائل</p></div>';return;}
  c.innerHTML=S.msgs.map(m=>{
    const sent=m.from===S.user?.id;
    const t=new Date(m.ts).toLocaleTimeString('ar-SA',{hour:'2-digit',minute:'2-digit'});
    return`<div class="msg ${sent?'sent':'recv'}">${m.text}<div class="msg-time" style="color:${sent?'rgba(255,255,255,.5)':'var(--sub)'}">${t}</div></div>`;
  }).join('');
  c.scrollTop=c.scrollHeight;
}

async function sendMsg(){
  const inp=$('chat-inp');
  const text=inp?.value?.trim();
  if(!text||!S.user) return;
  const m={id:'ms'+Date.now(),from:S.user.id,to:'d1',text,ts:Date.now()};
  await DB.put('messages',m); S.msgs.push(m);
  inp.value=''; initChat();
  setTimeout(async()=>{
    const replies=['شكراً، تم الأخذ بعين الاعتبار 👍','إن شاء الله سأكون هناك','تمام نراك على الطريق 🚗','ممتاز!'];
    const r={id:'ms'+Date.now(),from:'d1',to:S.user.id,text:replies[Math.floor(Math.random()*replies.length)],ts:Date.now()};
    await DB.put('messages',r); S.msgs.push(r); initChat();
  },1400);
}

/* ══════════════════════════════════════
   NOTIFICATIONS
══════════════════════════════════════ */
function renderNotifs(){
  const c=$('notifs-list');
  if(!S.notifs.length){c.innerHTML='<div class="empty"><div class="empty-i">🔔</div><p>لا توجد إشعارات</p></div>';return;}
  c.innerHTML=S.notifs.map(n=>`
<div style="display:flex;gap:12px;padding:13px 0;border-bottom:1px solid var(--bg);${!n.read?'background:rgba(178,240,232,.08);margin:-2px;padding:13px;border-radius:10px;':''}">
  <div style="width:40px;height:40px;border-radius:11px;background:var(--mint);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0">${n.icon}</div>
  <div style="flex:1">
    <div style="font-size:13px;font-weight:${n.read?700:900};margin-bottom:3px">${n.title}</div>
    <div style="font-size:12px;color:var(--sub)">${n.body}</div>
    <div style="font-size:10px;color:#bbb;margin-top:3px">${new Date(n.ts).toLocaleDateString('ar-SA',{month:'short',day:'numeric'})}</div>
  </div>
  ${!n.read?'<div style="width:8px;height:8px;border-radius:50%;background:var(--black);flex-shrink:0;margin-top:5px"></div>':''}
</div>`).join('');
}

async function markAllRead(){
  for(const n of S.notifs){if(!n.read){n.read=true;await DB.put('notifications',n);}}
  hide('p-nd');hide('home-nd');
  renderNotifs(); toast('تم تحديد الكل كمقروء','ok');
}

/* ══════════════════════════════════════
   VERIFY
══════════════════════════════════════ */
function renderVerify(){
  const c=$('verify-content');
  const docs=[
    {id:'lic',label:'رخصة القيادة',icon:'🪪',desc:'صورة واضحة من الجهتين'},
    {id:'idc',label:'بطاقة الهوية',icon:'📋',desc:'بطاقة سارية المفعول'},
    {id:'vrg',label:'استمارة السيارة',icon:'🚗',desc:'الاستمارة السنوية الحالية'},
    {id:'ins',label:'التأمين',icon:'🛡️',desc:'وثيقة التأمين الشاملة'},
  ];
  c.innerHTML=`
<div class="info info-wa" style="margin-bottom:14px">📋 يرجى رفع الوثائق للحصول على شارة "موثق"</div>
${docs.map(d=>`
<div class="card cp" style="margin-bottom:11px">
  <div style="display:flex;align-items:center;gap:11px;margin-bottom:11px">
    <div style="font-size:26px">${d.icon}</div>
    <div><div style="font-size:13px;font-weight:800">${d.label}</div><div style="font-size:11px;color:var(--sub)">${d.desc}</div></div>
  </div>
  <div class="doc-upload" onclick="toast('ميزة رفع الملفات قيد التطوير 🔧','wa')">
    <div style="font-size:26px;margin-bottom:6px">📁</div>
    <div style="font-size:12px;font-weight:700;color:var(--sub)">اضغط لرفع الملف</div>
    <div style="font-size:10px;color:#bbb;margin-top:3px">JPG, PNG, PDF · حتى 5MB</div>
  </div>
</div>`).join('')}
<button class="btn b-k bfw" style="margin-top:4px" onclick="toast('تم إرسال طلب التوثيق للمراجعة ✅','ok')" type="button">📤 إرسال للمراجعة</button>`;
}

/* ══════════════════════════════════════
   PROFILE EDIT
══════════════════════════════════════ */
function loadEdit(){
  if(!S.user) return;
  sv('pe-name',S.user.name||'');sv('pe-phone',S.user.phone||'');
  sv('pe-email',S.user.email||'');sv('pe-vehicle',S.user.vehicle||'');
}

async function saveEdit(){
  if(!S.user) return;
  S.user.name=gv('pe-name'); S.user.phone=gv('pe-phone');
  S.user.email=gv('pe-email'); S.user.vehicle=gv('pe-vehicle');
  await DB.put('users',S.user);
  await DB.put('session',{id:'cur',user:S.user,role:S.role});
  updateUI(); toast('تم حفظ البيانات ✅','ok');
}

/* ══════════════════════════════════════
   RATING
══════════════════════════════════════ */
function setRating(n){
  S.rating=n;
  document.querySelectorAll('#stars-row span').forEach((s,i)=>s.style.opacity=i<n?'1':'.25');
}
function submitRating(){ toast('شكراً على تقييمك ⭐'.repeat(1)+S.rating,'ok'); closeMo('rate'); }

/* ══════════════════════════════════════
   ADMIN PANEL
══════════════════════════════════════ */
function adminGo(sec,el){
  document.querySelectorAll('.a-ni').forEach(b=>b.classList.remove('active'));
  el?.classList.add('active');
  const c=$('a-content');
  const fns={overview:aOverview,trips:aTrips,users:aUsers,bookings:aBookings,commission:aCommission,discounts:aDiscounts,settings:aSettings};
  const fn=fns[sec];
  if(!fn) return;
  const r=fn();
  if(r && typeof r.then==='function') r.then(h=>{if(h!==undefined)c.innerHTML=h;});
  else if(typeof r==='string') c.innerHTML=r;
}

async function aOverview(){
  const [trips,users,bks]=await Promise.all([DB.getAll('trips'),DB.getAll('users'),DB.getAll('bookings')]);
  const rev=bks.filter(b=>b.status!=='cancelled').reduce((s,b)=>s+(b.price||0),0);
  return`<div style="font-size:18px;font-weight:900;margin-bottom:14px">📊 لوحة التحكم</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px">
  <div class="a-card" style="text-align:center"><div style="font-size:28px;font-weight:900;color:var(--ok)">${trips.filter(t=>t.status==='active').length}</div><div style="font-size:12px;color:var(--sub);font-weight:700">رحلات نشطة</div></div>
  <div class="a-card" style="text-align:center"><div style="font-size:28px;font-weight:900">${users.length}</div><div style="font-size:12px;color:var(--sub);font-weight:700">مستخدم مسجل</div></div>
  <div class="a-card" style="text-align:center"><div style="font-size:28px;font-weight:900;color:var(--warn)">${bks.length}</div><div style="font-size:12px;color:var(--sub);font-weight:700">إجمالي الحجوزات</div></div>
  <div class="a-card" style="text-align:center"><div style="font-size:22px;font-weight:900;color:var(--er)">${rev.toLocaleString()}</div><div style="font-size:12px;color:var(--sub);font-weight:700">ر.س إجمالي الإيرادات</div></div>
</div>
<div class="a-card">
  <div class="a-ch"><div class="a-ct">آخر الرحلات</div><button class="btn b-k bsm" onclick="showMo('at')" type="button">+ إضافة</button></div>
  ${trips.slice(-5).reverse().map(t=>`<div style="display:flex;justify-content:space-between;padding:9px 0;border-bottom:1px solid var(--bg);font-size:12px"><div><div style="font-weight:800">${t.from} → ${t.to}</div><div style="color:var(--sub)">${t.date} · ${t.driver}</div></div><div style="font-weight:900">${t.price} ر.س</div></div>`).join('')}
</div>`;
}

async function aTrips(){
  const trips=await DB.getAll('trips');
  return `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px"><div style="font-size:18px;font-weight:900">🗺️ الرحلات (${trips.length})</div><button class="btn b-k bsm" onclick="showMo('at')" type="button">+ إضافة</button></div>
${trips.map(t=>`<div class="a-card" style="padding:12px"><div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px"><div><div style="font-size:13px;font-weight:900">${t.from} → ${t.to}</div><div style="font-size:11px;color:var(--sub)">${t.date} · ${t.time} · ${t.driver}</div></div><span class="${t.status==='active'?'b-ok':'b-er'}" style="font-size:10px">${t.status==='active'?'نشطة':'موقوفة'}</span></div><div style="display:flex;gap:5px;flex-wrap:wrap;font-size:11px"><span class="mc">💺 ${t.seats}/${t.total}</span><span class="mc">💰 ${t.price} ر.س</span><span class="mc">${t.type==='bus'?'🚌':t.type==='van'?'🚐':'🚗'} ${t.vehicle||'-'}</span></div></div>`).join('')}`;
}

async function aUsers(){
  const users=await DB.getAll('users');
  return `<div style="font-size:18px;font-weight:900;margin-bottom:14px">👥 المستخدمون (${users.length})</div>
${users.map(u=>`<div class="a-card" style="padding:12px"><div style="display:flex;justify-content:space-between;align-items:flex-start"><div><div style="font-size:13px;font-weight:900">${u.name} ${u.verified?'<span style="color:var(--ok)">✓</span>':''}</div><div style="font-size:11px;color:var(--sub)">${u.phone}</div></div><span class="mc" style="background:var(--black);color:#fff">${u.role==='admin'?'مدير':u.role==='driver'?'سائق':'مسافر'}</span></div></div>`).join('')}`;
}

async function aBookings(){
  const bks=await DB.getAll('bookings');
  return `<div style="font-size:18px;font-weight:900;margin-bottom:14px">📋 الحجوزات (${bks.length})</div>
${bks.map(b=>`<div class="a-card" style="padding:12px"><div style="display:flex;justify-content:space-between;margin-bottom:6px"><div><div style="font-size:13px;font-weight:900">${b.from} → ${b.to}</div><div style="font-size:11px;color:var(--sub)">${b.date} · السائق: ${b.driver}</div></div><span class="${b.status==='upcoming'?'b-ok':b.status==='cancelled'?'b-er':'b-pen'}" style="font-size:10px">${b.status==='upcoming'?'قادمة':b.status==='completed'?'منجزة':'ملغاة'}</span></div><div style="font-size:11px"><span class="mc">💺 ${b.seats}</span><span class="mc">💰 ${b.price} ر.س</span></div></div>`).join('')}`;
}

async function aCommission(){
  const bks=await DB.getAll('bookings');
  const valid=bks.filter(b=>b.status!=='cancelled');
  const total=valid.reduce((s,b)=>s+(b.price||0),0);
  const settings=await DB.getSetting('app')||{commRate:10};
  const comm=Math.round(total*settings.commRate/100);
  return `<div style="font-size:18px;font-weight:900;margin-bottom:14px">💰 العمولات والأرباح</div>
<div class="stats-3" style="margin-bottom:14px">
  <div class="stat"><div class="stat-v">${total.toLocaleString()}</div><div class="stat-l">إجمالي التداول</div></div>
  <div class="stat"><div class="stat-v" style="color:var(--ok)">${comm.toLocaleString()}</div><div class="stat-l">أرباح المنصة (${settings.commRate}%)</div></div>
</div><div class="info info-wa">ميزة السحب والتسويات مع السائقين قيد التطوير.</div>`;
}

async function aDiscounts(){
  const cps=await DB.getAll('coupons');
  return `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px"><div style="font-size:18px;font-weight:900">🎁 كود الخصم</div><button class="btn b-k bsm" onclick="toast('قريباً','wa')" type="button">+ إضافة</button></div>
${cps.map(c=>`<div class="a-card" style="padding:12px"><div style="display:flex;justify-content:space-between"><div><div style="font-size:14px;font-weight:900;letter-spacing:1px">${c.code}</div><div style="font-size:11px;color:var(--sub)">خصم ${c.type==='percent'?c.value+'%':c.value+' ر.س'} · الاستخدام: ${c.uses}/${c.maxUses}</div></div><div class="tgl"><input type="checkbox" ${c.active?'checked':''}><span class="tsl"></span></div></div></div>`).join('')}`;
}

async function aSettings(){
  const s=await DB.getSetting('app')||{commRate:10,commZero:false,commMsg:'',waSA:'',waYE:'',email:''};
  return `<div style="font-size:18px;font-weight:900;margin-bottom:14px">⚙️ إعدادات المنصة</div>
<div class="a-card">
  <div class="a-ct" style="margin-bottom:14px">العمولة والتسعير</div>
  <label style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
    <div style="font-size:13px;font-weight:800">إلغاء العمولة مؤقتاً (عرض ترويجي)</div>
    <div class="tgl"><input type="checkbox" id="as-cz" ${s.commZero?'checked':''}><span class="tsl"></span></div>
  </label>
  <div class="fg"><label class="fl">رسالة العرض</label><input class="fc" id="as-cm" value="${s.commMsg||''}"></div>
  <div class="fg"><label class="fl">نسبة العمولة الافتراضية (%)</label><input type="number" class="fc" id="as-cr" value="${s.commRate||10}"></div>
  <div style="margin:16px 0;height:1px;background:var(--bg)"></div>
  <div class="a-ct" style="margin-bottom:14px">أرقام التواصل</div>
  <div class="fg"><label class="fl">واتساب السعودية</label><input class="fc" id="as-ws" value="${s.waSA||''}"></div>
  <div class="fg"><label class="fl">واتساب اليمن</label><input class="fc" id="as-wy" value="${s.waYE||''}"></div>
  <div class="fg"><label class="fl">البريد الإلكتروني</label><input class="fc" id="as-em" value="${s.email||''}"></div>
  <button class="btn b-k bfw" onclick="saveAdminSettings()" type="button">💾 حفظ الإعدادات</button>
</div>`;
}

window.saveAdminSettings = async function(){
  const s = {
    commZero:$('as-cz')?.checked||false, commMsg:gv('as-cm'), commRate:parseInt(gv('as-cr'))||10,
    waSA:gv('as-ws'), waYE:gv('as-wy'), email:gv('as-em')
  };
  await DB.setSetting('app',s);
  toast('تم حفظ الإعدادات بنجاح','ok');
};

// Start app
window.onload = init;
