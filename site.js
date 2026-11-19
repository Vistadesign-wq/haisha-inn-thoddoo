/* Thoddoo Haisha Inn — site script (engine from the thoddoo-guesthouse-website skill) */
document.documentElement.classList.add('js');
(function(){
  /* ===== EDIT YOUR CONTACT DETAILS HERE ===== */
  var CONTACT = {
    whatsapp: '9607407768',            // from Haisha's own Facebook post + Maldiveo listing
    phone:    '+960 740 7768',         // shown on the page
    viber:    '[NUMBER]',              // not found publicly: hidden until filled
    email:    '[EMAIL]',               // not found publicly: hidden until filled
    instagram:'thoddoo_haisha_inn',
    facebook: '100077276923639'
  };
  var real = function(v){ return v.indexOf('[') < 0; };
  var LINKS = {
    whatsapp: 'https://wa.me/' + CONTACT.whatsapp,
    viber:    'viber://chat?number=%2B' + CONTACT.viber,
    instagram:'https://www.instagram.com/' + CONTACT.instagram + '/',
    facebook: 'https://www.facebook.com/' + CONTACT.facebook,
    email:    'mailto:' + CONTACT.email,
    phone:    'tel:' + CONTACT.phone.replace(/[^+\d]/g,'')
  };
  document.querySelectorAll('[data-link]').forEach(function(a){ a.href = LINKS[a.dataset.link]; });
  document.querySelectorAll('[data-text]').forEach(function(el){ el.textContent = CONTACT[el.dataset.text]; });
  /* hide any contact detail that is still a [placeholder] so guests never see it */
  ['email','instagram','facebook','phone','whatsapp','viber'].forEach(function(k){
    if (real(CONTACT[k])) return;
    document.querySelectorAll('[data-link="' + k + '"],[data-text="' + k + '"]').forEach(function(el){
      var row = el.closest('.clist li') || el.closest('.fc-line') || el;
      row.hidden = true; row.style.display = 'none';
    });
  });
  var T = function(s){ return window.RT_T ? window.RT_T(s) : s; };
  var esc = function(s){ return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); };
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function(s,r){ return (r||document).querySelector(s); };
  var $$ = function(s,r){ return [].slice.call((r||document).querySelectorAll(s)); };

  /* ----- photos (used by gallery + lightbox) ----- */
  var P = function(n){ return 'assets/p' + (n<10?'0':'') + n + '.jpg'; };
  var PHOTOS = [
    [1,'Entrance under the bougainvillea','exterior'],[2,'Double room with wooden beams','rooms'],[3,'Spacious tiled bathroom','bath'],
    [4,'Walking on Thoddoo beach','island'],[5,'Twin room','rooms'],[6,'Bathroom with walk-in shower','bath'],
    [7,'Thoddoo from the air: farms and lagoon','island'],[8,'Welcome flowers on the bed','rooms'],[9,'The red door and flowering garden','exterior'],
    [10,'Bright bathroom','bath'],[11,'Room with sitting area','rooms'],[12,'Towel-art welcome','rooms'],
    [13,'Palm-lined beach from above','island'],[14,'Swimming in the lagoon','island'],[15,'The garden island of the Maldives','island'],
    [16,'Reef and turquoise water','island'],[17,'Crystal-clear shallows','island'],[18,'White sand and palms','island']
  ].map(function(p){ return {src:P(p[0]), cap:p[1], cat:p[2]}; });

  /* ----- guest testimonials: genuine reviews from Booking.com, Instagram and Facebook -----
     Fields: score, title, text, name, flag, country, traveller, stay, source, translated-from */
  var REVIEWS = [
    {s:10, t:'People you remember', q:'Some places stay in your memory not only because of their beautiful surroundings, but because of the people you meet. Haisha Inn is definitely one of those places! Mohamed is an incredibly kind, welcoming and helpful host who makes you feel truly at home from the very first moment. The warm, family-like atmosphere and genuine hospitality made our stay on Thoddoo truly special.', n:'Krzysztof', c:'Poland', who:'Couple', stay:'Double or Twin · 5 nights', src:'Booking.com'},
    {s:10, t:'Amazing place', q:'Great place: we had a nice clean room and a big bathroom. A quiet place close to shops and cafés. Friendly staff. Tasty food, always fresh fruit, and excellent fruit juices with every meal. Near the most beautiful beach. We will be happy to come back someday!', n:'Petra', c:'Czech Republic', who:'Couple', stay:'Double or Twin · 8 nights', src:'Booking.com'},
    {s:10, t:'Great value for money!', q:'The room and bathroom are spacious, and the bed is so big that we slept comfortably with our child. A lovely, quiet and pleasant stay. Meals were simple with a small choice, but completely sufficient, always with fresh juice and fruit. The owner and his assistant were very friendly and warm.', n:'Sibel', c:'Germany', who:'Family', stay:'Double or Twin · 6 nights', src:'Booking.com', tr:'German'},
    {s:10, t:'Delicious food, lots of greenery', q:'We stayed seven nights in July and left more than satisfied. Excellent food with plenty of vegetables and fruit, a beautifully arranged room on arrival, lots of greenery, and a very kind owner and staff who tried to arrange everything we wished for. We had bikes to get around the island.', n:'Petr', c:'Czech Republic', who:'Solo traveller', stay:'Double or Twin · 7 nights', src:'Booking.com', tr:'Czech'},
    {s:10, t:'Excellent staff, very clean, great breakfast', q:'Excellent staff, a very clean room, a very good breakfast and a very good location. Highly recommended!', n:'Jesus', c:'Spain', who:'Couple', stay:'Double or Twin · 3 nights', src:'Booking.com', tr:'Spanish'},
    {s:10, t:'A green courtyard and good food', q:'Clean and comfortable room, a very pretty green courtyard, good breakfasts and dinners, and a very kind and helpful owner and staff.', n:'Mirosława', c:'Poland', who:'Couple', stay:'Double or Twin · 1 night', src:'Booking.com', tr:'Polish'},
    {s:10, t:'Mohamed arranges everything', q:'Nice accommodation with a beautiful front garden and good food. Pleasant staff, and the owner Mohamed arranges everything.', n:'Martin', c:'Czech Republic', who:'Couple', stay:'Double or Twin · 8 nights', src:'Booking.com', tr:'Czech'},
    {s:10, t:'Nothing was missing', q:'Throughout our stay they did everything possible to make it perfect so that we lacked nothing.', n:'Morenorios', c:'Spain', who:'Solo traveller', stay:'Double or Twin · 4 nights', src:'Booking.com', tr:'Spanish'},
    {s:10, t:'A very friendly host', q:'A very friendly host who took all our wishes into account.', n:'Ekaterina', c:'Russia', who:'Solo traveller', stay:'Double or Twin · 8 nights', src:'Booking.com', tr:'Russian'},
    {s:9, t:'A place with real island atmosphere', q:'A good place, well located and with an atmosphere very true to the island. The staff are always ready to help and arrange anything you need.', n:'Ramón', c:'Spain', who:'Couple', stay:'Double or Twin · 5 nights', src:'Booking.com', tr:'Spanish'}
  ];

  /* ----- Russian text for the review cards (shown when the site is in Russian) ----- */
  var REVIEWS_RU = [
    {t:'Люди, которых запоминаешь', q:'Некоторые места остаются в памяти не только благодаря красивой природе, но и благодаря людям, которых там встречаешь. Haisha Inn — именно такое место! Мохамед — невероятно добрый, гостеприимный и отзывчивый хозяин, с ним с первой минуты чувствуешь себя как дома. Тёплая семейная атмосфера и искреннее гостеприимство сделали наш отдых на Тодду по-настоящему особенным.'},
    {t:'Чудесное место', q:'Отличное место: чистый номер и большая ванная. Тихо, рядом магазины и кафе. Дружелюбный персонал. Вкусная еда, всегда свежие фрукты и отличные фруктовые соки к каждому приёму пищи. Рядом самый красивый пляж. С радостью вернёмся когда-нибудь!'},
    {t:'Отличное соотношение цены и качества!', q:'Номер и ванная просторные, а кровать такая большая, что мы удобно спали вместе с ребёнком. Приятный, тихий и спокойный отдых. Еда простая, выбор небольшой, но всего вполне достаточно, всегда со свежим соком и фруктами. Хозяин и его помощник были очень дружелюбны и приветливы.'},
    {t:'Вкусная еда, много зелени', q:'Мы провели семь ночей в июле и уехали более чем довольными. Отличная еда с большим количеством овощей и фруктов, красиво украшенный номер к приезду, много зелени, очень добрые хозяин и персонал, которые старались выполнить все наши пожелания. Для поездок по острову у нас были велосипеды.'},
    {t:'Отличный персонал, чистота, прекрасный завтрак', q:'Отличный персонал, очень чистый номер, очень хороший завтрак и прекрасное расположение. Очень рекомендую!'},
    {t:'Зелёный дворик и вкусная еда', q:'Чистый и удобный номер, очень красивый зелёный дворик, хорошие завтраки и ужины, очень добрые и отзывчивые хозяин и персонал.'},
    {t:'Мохамед всё организует', q:'Приятное жильё с красивым садом перед домом и вкусной едой. Приятный персонал, а хозяин Мохамед всё организует.'},
    {t:'Всё было идеально', q:'Всё время нашего пребывания они делали всё возможное, чтобы у нас ни в чём не было недостатка.'},
    {t:'Очень дружелюбный хозяин', q:'Очень дружелюбный хозяин, учёл все наши пожелания.'},
    {t:'Настоящая островная атмосфера', q:'Хорошее место с удобным расположением и настоящей атмосферой острова. Персонал всегда готов помочь и организовать всё необходимое.'}
  ];
  var RU_WORDS = {'Poland':'Польша','Czech Republic':'Чехия','Germany':'Германия','Spain':'Испания','Russia':'Россия','Couple':'Пара','Family':'Семья','Solo traveller':'Путешествует один','Double or Twin':'Двухместный','nights':'ноч.','night':'ночь','German':'немецкого','Czech':'чешского','Spanish':'испанского','Polish':'польского','Russian':'русского'};
  var ruW = function(str){ return String(str).replace(/Czech Republic|Solo traveller|Double or Twin|Poland|Germany|Spain|Russia|Couple|Family|nights|night/g, function(m){ return RU_WORDS[m] || m; }); };
  /* ----- header ----- */
  var hdr = $('.site-h'), burger = $('.burger');
  var onScroll = function(){ hdr.classList.toggle('scrolled', scrollY > 10); };
  addEventListener('scroll', onScroll, {passive:true}); onScroll();
  if (burger) burger.addEventListener('click', function(){ var o = !hdr.classList.contains('open'); hdr.classList.toggle('open', o); burger.setAttribute('aria-expanded', o); });
  $$('.nav a').forEach(function(a){ a.addEventListener('click', function(){ hdr.classList.remove('open'); }); });
  var page = document.body.dataset.page;
  $$('.nav a[data-p]').forEach(function(a){ if (a.dataset.p === page) { a.classList.add('on'); a.setAttribute('aria-current','page'); } });

  /* ----- Maldives time in the ticker ----- */
  var clock = $('#mvt');
  var tick = function(){ if (!clock) return; try { clock.textContent = new Date().toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit',timeZone:'Indian/Maldives'}) + ' MVT'; } catch(e){} };
  tick(); setInterval(tick, 30000);
  $$('[data-year]').forEach(function(el){ el.textContent = new Date().getFullYear(); });

  /* ----- reveal ----- */
  var rvs = $$('.rv');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function(es){ es.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }); }, {rootMargin:'0px 0px -8% 0px', threshold:.05});
    rvs.forEach(function(el){ io.observe(el); });
  } else rvs.forEach(function(el){ el.classList.add('in'); });

  /* ----- hero slider + USP rotation ----- */
  var slides = $$('.slide'), dots = $('.dots'), usp = $('.usp-rot span');
  if (slides.length) {
    var cur = 0, timer;
    dots.innerHTML = slides.map(function(s,i){ return '<button type="button" aria-label="Show slide '+(i+1)+'"></button>'; }).join('');
    var db = $$('button', dots);
    var go = function(i){
      slides[cur].classList.remove('on'); db[cur].classList.remove('on');
      cur = (i + slides.length) % slides.length;
      slides[cur].classList.add('on'); void db[cur].offsetWidth; db[cur].classList.add('on');
      if (usp) { usp.classList.add('out'); setTimeout(function(){ usp.textContent = slides[cur].dataset.usp; usp.classList.remove('out'); }, 350); }
      clearTimeout(timer); if (!reduce) timer = setTimeout(function next(){ if (window.RT_heroPaused || document.hidden) { timer = setTimeout(next, 1000); return; } go(cur+1); }, 6000);
    };
    db.forEach(function(b,i){ b.addEventListener('click', function(){ go(i); }); });
    slides[0].classList.remove('on'); cur = 0; slides[0].classList.add('on'); db[0].classList.add('on');
    if (usp) usp.textContent = slides[0].dataset.usp;
    if (!reduce) timer = setTimeout(function next(){ if (window.RT_heroPaused || document.hidden) { timer = setTimeout(next, 1000); return; } go(1); }, 6000);
  }

  /* ----- booking bar → contact page ----- */
  var today = new Date().toISOString().slice(0,10);
  $$('input[type=date]').forEach(function(el){ el.min = today; });
  var pair = function(a,b){ if (a && b) a.addEventListener('change', function(){ b.min = a.value || today; if (b.value && b.value <= a.value) b.value = ''; }); };
  pair($('#bIn'), $('#bOut')); pair($('#fIn'), $('#fOut'));
  var bbar = $('#bookBar');
  if (bbar) bbar.addEventListener('submit', function(e){
    e.preventDefault();
    var q = new URLSearchParams({ in: $('#bIn').value, out: $('#bOut').value, room: $('#bRoom').value });
    location.href = 'contact.html?' + q.toString() + '#book';
  });

  /* ----- testimonials slider ----- */
  var track = $('#tmTrack');
  if (track) {
    var SRC = {'Booking.com':'B','Instagram':'IG','Facebook':'f'};
    track.innerHTML = REVIEWS.map(function(r, i){
      var meta = [r.c, r.who].filter(Boolean).join(' · ');
      return '<figure class="tm" role="group" aria-roledescription="slide" aria-label="Review ' + (i+1) + ' of ' + REVIEWS.length + '">' +
        '<div class="tm-top"><span class="tm-q" aria-hidden="true">“</span><span class="tm-src"><i>' + SRC[r.src] + '</i>' + esc(r.src) + '</span></div>' +
        '<div class="tm-score"><span class="stars" aria-hidden="true">★★★★★</span><b>' + r.s + '</b><small>/10</small></div>' +
        '<h3>' + esc(r.t) + '</h3>' +
        '<blockquote>' + esc(r.q) + '</blockquote>' +
        '<button type="button" class="tm-more" hidden>Read more</button>' +
        '<figcaption><span class="av" aria-hidden="true">' + esc(r.n.charAt(0)) + '</span><span class="who"><b>' + esc(r.n) + '</b>' + (meta ? '<span>' + esc(meta) + '</span>' : '') + (r.stay ? '<span class="stay">' + esc(r.stay) + '</span>' : '') + '</span>' + (r.tr ? '<span class="tr">Translated from ' + esc(r.tr) + '</span>' : '') + '</figcaption></figure>';
    }).join('');
    var cards = $$('.tm', track);
    var setCardLang = function(){
      var ru = window.RT_lang && window.RT_lang() === 'ru';
      cards.forEach(function(card, i){
        var r = REVIEWS[i], x = REVIEWS_RU[i]; if (!r) return;
        $('h3', card).textContent = ru && x ? x.t : r.t;
        $('blockquote', card).textContent = ru && x ? x.q : r.q;
        var meta = [r.c, r.who].filter(Boolean).join(' · '), sp = $$('.who span', card);
        if (sp[0]) sp[0].textContent = ru ? ruW(meta) : meta;
        var st = $('.stay', card); if (st) st.textContent = ru ? ruW(r.stay) : r.stay;
        var tr = $('.tr', card);
        if (tr) { tr.hidden = ru && r.tr === 'Russian'; tr.textContent = ru ? 'Перевод с ' + (RU_WORDS[r.tr] || r.tr) + ' языка' : 'Translated from ' + r.tr; }
      });
      if (typeof checkMore === 'function') setTimeout(checkMore, 50);
    };
    document.addEventListener('langchange', setCardLang);
    /* show "Read more" only when the text is clamped */
    var checkMore = function(){ cards.forEach(function(card){ var bq = $('blockquote', card), b = $('.tm-more', card); if (card.classList.contains('open')) return; b.hidden = bq.scrollHeight <= bq.clientHeight + 2; }); };
    cards.forEach(function(card){ $('.tm-more', card).addEventListener('click', function(){ var o = card.classList.toggle('open'); this.textContent = T(o ? 'Show less' : 'Read more'); }); });
    document.addEventListener('langchange', function(){ cards.forEach(function(card){ $('.tm-more', card).textContent = T(card.classList.contains('open') ? 'Show less' : 'Read more'); }); });
    /* dots + counter */
    var dotsBox = $('#tmDots'), count = $('#tmCount');
    var perView = function(){ var w = cards[0].offsetWidth + 22; return Math.max(1, Math.round(track.clientWidth / w)); };
    var pages = function(){ return Math.max(1, cards.length - perView() + 1); };
    var current = function(){ var w = cards[0].offsetWidth + 22; return Math.min(pages()-1, Math.round(track.scrollLeft / w)); };
    var buildDots = function(){ if (!dotsBox) return; var n = pages(); dotsBox.innerHTML = Array.apply(null, {length:n}).map(function(_, i){ return '<button type="button" aria-label="Go to review ' + (i+1) + '"></button>'; }).join(''); $$('button', dotsBox).forEach(function(b, i){ b.addEventListener('click', function(){ goTo(i); restart(); }); }); sync(); };
    var target = null;
    var sync = function(){ var i = target != null ? target : current(); if (dotsBox) $$('button', dotsBox).forEach(function(b, j){ b.classList.toggle('on', j === i); b.setAttribute('aria-current', j === i); }); if (count) count.textContent = String(i+1).padStart(2,'0') + ' / ' + String(pages()).padStart(2,'0'); };
    var goTo = function(i){ var n = pages(); i = (i + n) % n; target = i; sync(); track.scrollTo({left: i * (cards[0].offsetWidth + 22), behavior: reduce ? 'auto' : 'smooth'}); clearTimeout(goTo.t); goTo.t = setTimeout(function(){ target = null; }, 900); };
    var pos = function(){ return target != null ? target : current(); };
    var pv = $('#tmPrev'), nx = $('#tmNext');
    if (pv) pv.addEventListener('click', function(){ goTo(pos()-1); restart(); });
    if (nx) nx.addEventListener('click', function(){ goTo(pos()+1); restart(); });
    var st; track.addEventListener('scroll', function(){ clearTimeout(st); st = setTimeout(sync, 60); }, {passive:true});
    /* autoplay, paused on hover, focus or touch */
    var auto = null, paused = false;
    var restart = function(){ clearInterval(auto); if (!reduce) auto = setInterval(function(){ if (!paused && !window.RT_tmPaused && !document.hidden) goTo(pos()+1); }, 5500); };
    var wrap = track.closest('.tm-wrap') || track;
    wrap.addEventListener('mouseenter', function(){ paused = true; }); wrap.addEventListener('mouseleave', function(){ paused = false; });
    wrap.addEventListener('focusin', function(){ paused = true; }); wrap.addEventListener('focusout', function(){ paused = false; });
    wrap.addEventListener('touchstart', function(){ paused = true; restart(); setTimeout(function(){ paused = false; }, 8000); }, {passive:true});
    /* drag with the mouse */
    var down = false, sx = 0, sl = 0, moved = false;
    track.addEventListener('pointerdown', function(e){ if (e.pointerType !== 'mouse' || e.target.closest('button')) return; down = true; moved = false; sx = e.clientX; sl = track.scrollLeft; track.classList.add('drag'); });
    addEventListener('pointermove', function(e){ if (!down) return; var dx = e.clientX - sx; if (Math.abs(dx) > 4) moved = true; track.scrollLeft = sl - dx; });
    addEventListener('pointerup', function(){ if (!down) return; down = false; track.classList.remove('drag'); if (moved) { var w = cards[0].offsetWidth + 22; goTo(Math.round(track.scrollLeft / w)); restart(); } });
    track.addEventListener('keydown', function(e){ if (e.key === 'ArrowRight') { goTo(pos()+1); restart(); } if (e.key === 'ArrowLeft') { goTo(pos()-1); restart(); } });
    var rt; addEventListener('resize', function(){ clearTimeout(rt); rt = setTimeout(function(){ buildDots(); checkMore(); }, 150); });
    buildDots(); checkMore(); restart();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(checkMore);
  }
  /* ----- lightbox ----- */
  var lb = document.createElement('div');
  lb.className = 'lb'; lb.hidden = true; lb.setAttribute('role','dialog'); lb.setAttribute('aria-modal','true'); lb.setAttribute('aria-label','Photo viewer');
  lb.innerHTML = '<figure><img alt=""><figcaption></figcaption></figure><button class="x" type="button" aria-label="Close">✕</button><button class="pv" type="button" aria-label="Previous photo">‹</button><button class="nx" type="button" aria-label="Next photo">›</button>';
  document.body.appendChild(lb);
  var set = [], idx = 0, last = null;
  var show = function(i){ idx = (i + set.length) % set.length; var it = set[idx]; $('img', lb).src = it.src; $('img', lb).alt = it.cap; $('figcaption', lb).textContent = it.cap + '  ·  ' + (idx+1) + ' / ' + set.length; };
  var open = function(items, i){ set = items; last = document.activeElement; show(i); lb.hidden = false; document.body.style.overflow = 'hidden'; $('.x', lb).focus(); };
  var close = function(){ lb.hidden = true; document.body.style.overflow = ''; if (last) last.focus(); };
  $('.x', lb).addEventListener('click', close);
  $('.pv', lb).addEventListener('click', function(){ show(idx-1); });
  $('.nx', lb).addEventListener('click', function(){ show(idx+1); });
  lb.addEventListener('click', function(e){ if (e.target === lb) close(); });
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') { if (!lb.hidden) close(); hdr.classList.remove('open'); }
    if (lb.hidden) return;
    if (e.key === 'ArrowLeft') show(idx-1); if (e.key === 'ArrowRight') show(idx+1);
  });
  /* any element group with data-lb="name" containing buttons with <img> */
  $$('[data-lb]').forEach(function(g){
    var btns = $$('button', g);
    var items = btns.map(function(b){ var im = $('img', b); return {src: im.getAttribute('src'), cap: im.alt}; });
    btns.forEach(function(b,i){ b.addEventListener('click', function(){ open(items, i); }); });
  });

  /* ----- gallery page ----- */
  var gal = $('#gal');
  if (gal) {
    var render = function(cat){
      var list = PHOTOS.filter(function(p){ return cat === 'all' || p.cat === cat; });
      gal.innerHTML = list.map(function(p,i){ return '<button type="button" data-i="'+i+'"><img loading="lazy" src="'+p.src+'" alt="'+esc(p.cap)+'"><span>'+esc(p.cap)+'</span></button>'; }).join('');
      $$('button', gal).forEach(function(b,i){ b.addEventListener('click', function(){ open(list, i); }); });
    };
    $$('.filters button').forEach(function(b){ b.addEventListener('click', function(){
      $$('.filters button').forEach(function(x){ x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', x === b); });
      render(b.dataset.cat);
    }); });
    render('all');
  }

  /* ----- booking form (contact page) ----- */
  var form = $('#bookForm');
  if (form) {
    var q = new URLSearchParams(location.search);
    if (q.get('in')) $('#fIn').value = q.get('in');
    if (q.get('out')) { $('#fOut').min = q.get('in') || today; $('#fOut').value = q.get('out'); }
    if (q.get('room') && $$('option', $('#fRoom')).some(function(o){ return o.value === q.get('room'); })) $('#fRoom').value = q.get('room');

    /* country list */
    /* country list with dialling codes (picking a country also sets the phone code) */
    var COUNTRIES = 'Afghanistan:93;Albania:355;Algeria:213;Andorra:376;Angola:244;Antigua and Barbuda:1;Argentina:54;Armenia:374;Australia:61;Austria:43;Azerbaijan:994;Bahamas:1;Bahrain:973;Bangladesh:880;Barbados:1;Belarus:375;Belgium:32;Belize:501;Benin:229;Bhutan:975;Bolivia:591;Bosnia and Herzegovina:387;Botswana:267;Brazil:55;Brunei:673;Bulgaria:359;Burkina Faso:226;Burundi:257;Cabo Verde:238;Cambodia:855;Cameroon:237;Canada:1;Central African Republic:236;Chad:235;Chile:56;China:86;Colombia:57;Comoros:269;Congo:242;Costa Rica:506;Cote d\'Ivoire:225;Croatia:385;Cuba:53;Cyprus:357;Czech Republic:420;Democratic Republic of the Congo:243;Denmark:45;Djibouti:253;Dominica:1;Dominican Republic:1;Ecuador:593;Egypt:20;El Salvador:503;Equatorial Guinea:240;Eritrea:291;Estonia:372;Eswatini:268;Ethiopia:251;Fiji:679;Finland:358;France:33;Gabon:241;Gambia:220;Georgia:995;Germany:49;Ghana:233;Greece:30;Grenada:1;Guatemala:502;Guinea:224;Guinea-Bissau:245;Guyana:592;Haiti:509;Honduras:504;Hong Kong:852;Hungary:36;Iceland:354;India:91;Indonesia:62;Iran:98;Iraq:964;Ireland:353;Israel:972;Italy:39;Jamaica:1;Japan:81;Jordan:962;Kazakhstan:7;Kenya:254;Kiribati:686;Kosovo:383;Kuwait:965;Kyrgyzstan:996;Laos:856;Latvia:371;Lebanon:961;Lesotho:266;Liberia:231;Libya:218;Liechtenstein:423;Lithuania:370;Luxembourg:352;Macau:853;Madagascar:261;Malawi:265;Malaysia:60;Maldives:960;Mali:223;Malta:356;Marshall Islands:692;Mauritania:222;Mauritius:230;Mexico:52;Micronesia:691;Moldova:373;Monaco:377;Mongolia:976;Montenegro:382;Morocco:212;Mozambique:258;Myanmar:95;Namibia:264;Nauru:674;Nepal:977;Netherlands:31;New Zealand:64;Nicaragua:505;Niger:227;Nigeria:234;North Korea:850;North Macedonia:389;Norway:47;Oman:968;Pakistan:92;Palau:680;Palestine:970;Panama:507;Papua New Guinea:675;Paraguay:595;Peru:51;Philippines:63;Poland:48;Portugal:351;Qatar:974;Romania:40;Russia:7;Rwanda:250;Saint Kitts and Nevis:1;Saint Lucia:1;Saint Vincent and the Grenadines:1;Samoa:685;San Marino:378;Sao Tome and Principe:239;Saudi Arabia:966;Senegal:221;Serbia:381;Seychelles:248;Sierra Leone:232;Singapore:65;Slovakia:421;Slovenia:386;Solomon Islands:677;Somalia:252;South Africa:27;South Korea:82;South Sudan:211;Spain:34;Sri Lanka:94;Sudan:249;Suriname:597;Sweden:46;Switzerland:41;Syria:963;Taiwan:886;Tajikistan:992;Tanzania:255;Thailand:66;Timor-Leste:670;Togo:228;Tonga:676;Trinidad and Tobago:1;Tunisia:216;Turkey:90;Turkmenistan:993;Tuvalu:688;Uganda:256;Ukraine:380;United Arab Emirates:971;United Kingdom:44;United States:1;Uruguay:598;Uzbekistan:998;Vanuatu:678;Vatican City:39;Venezuela:58;Vietnam:84;Yemen:967;Zambia:260;Zimbabwe:263'.split(';').map(function(x){ var p = x.split(':'); return {n:p[0], d:'+' + p[1]}; });
    var cSel = $('#fCountry'), dSel = $('#fDial');
    if (cSel) COUNTRIES.forEach(function(c){ var o = document.createElement('option'); o.value = c.n; o.textContent = c.n; cSel.appendChild(o); });
    if (dSel) COUNTRIES.forEach(function(c){ var o = document.createElement('option'); o.value = c.d; o.setAttribute('data-c', c.n); o.textContent = c.n + ' (' + c.d + ')'; dSel.appendChild(o); });
    if (cSel && dSel) cSel.addEventListener('change', function(){ $$('option', dSel).forEach(function(o){ if (o.getAttribute('data-c') === cSel.value) o.selected = true; }); });

    /* children: one age box per child */
    var kidsSel = $('#fKids'), agesBox = $('#agesBox'), agesGrid = $('#agesGrid');
    var ageOpts = function(){ var h = '<option value="">–</option><option value="under 1">' + esc(T('Under 1')) + '</option>'; for (var a = 1; a <= 17; a++) h += '<option value="' + a + '">' + a + '</option>'; return h; };
    var buildAges = function(){
      var n = +kidsSel.value, prev = $$('select', agesGrid).map(function(s){ return s.value; });
      agesBox.hidden = n === 0;
      var h = '';
      for (var i = 0; i < n; i++) h += '<label><span>' + esc(T('Child')) + ' ' + (i+1) + '</span><select name="age' + (i+1) + '" required>' + ageOpts() + '</select></label>';
      agesGrid.innerHTML = h;
      $$('select', agesGrid).forEach(function(s, i){ if (prev[i]) s.value = prev[i]; });
    };
    if (kidsSel) { kidsSel.addEventListener('change', buildAges); buildAges(); document.addEventListener('langchange', buildAges); }

    form.addEventListener('submit', function(e){
      e.preventDefault();
      var f = form, out = $('#sent'), btn = $('#sendBtn');
      var kids = +f.kids.value, ages = $$('select', agesGrid).map(function(s){ return s.value === 'under 1' ? 'under 1' : s.value; });
      var guests = f.adults.value + ' adult(s)' + (kids ? ', ' + kids + ' child(ren) aged ' + ages.join(', ') : '');
      var data = { Room: f.room.value, Rooms: f.rooms.value, Guests: guests, 'Check-in': f.cin.value, 'Check-out': f.cout.value, Name: f.who.value, Country: f.country.value, Email: f.email.value, Phone: (f.dial.value ? f.dial.value + ' ' : '') + f.phone.value, Message: f.msg.value, Language: (window.RT_lang ? window.RT_lang() : 'en').toUpperCase() };
      var lines = Object.keys(data).filter(function(k){ return data[k]; }).map(function(k){ return k + ': ' + data[k]; }).join('\n');
      var msg = 'Hello Thoddoo Haisha Inn! I would like to book:\n' + lines;
      var mail = 'mailto:' + CONTACT.email + '?subject=' + encodeURIComponent('Booking request: ' + data.Room + ', ' + data['Check-in']) + '&body=' + encodeURIComponent(msg);
      var choices = '<div class="row">' + (real(CONTACT.email) ? '<a class="btn btn-light" href="'+mail+'">'+T('Send by email')+'</a>' : '') + '<a class="btn btn-wa" href="'+LINKS.whatsapp+'?text='+encodeURIComponent(msg)+'" target="_blank" rel="noopener">'+T('Send on WhatsApp')+'</a></div>';
      var fallback = function(){ out.innerHTML = T('Your request is ready. Choose how to send it:') + choices; out.hidden = false; btn.disabled = false; btn.textContent = T('Send booking request'); };
      if (!real(CONTACT.email) || !window.fetch) { fallback(); return; }
      btn.disabled = true; btn.textContent = T('Sending…');
      data._subject = 'New booking request: ' + data.Room + ' (' + data['Check-in'] + ' to ' + data['Check-out'] + ')';
      data._replyto = data.Email; data._template = 'table'; data._captcha = 'false';
      fetch('https://formsubmit.co/ajax/' + encodeURIComponent(CONTACT.email), {method:'POST', headers:{'Content-Type':'application/json','Accept':'application/json'}, body: JSON.stringify(data)})
        .then(function(r){ return r.json(); })
        .then(function(j){ if (String(j.success) !== 'true') throw 0; out.innerHTML = T('Thank you') + ', ' + esc(data.Name) + '! ' + T('Your request has been sent. We will reply by email or WhatsApp within a few hours.'); out.hidden = false; f.reset(); buildAges(); btn.disabled = false; btn.textContent = T('Send booking request'); })
        .catch(fallback);
    });
  }

  /* ----- scroll progress line ----- */
  var prog = $('.progress i');
  if (prog) { var pr = function(){ var h = document.documentElement.scrollHeight - innerHeight; prog.style.transform = 'scaleX(' + (h > 0 ? Math.min(1, scrollY / h) : 0) + ')'; }; addEventListener('scroll', pr, {passive:true}); pr(); }

  /* ----- gentle parallax on hero / page headers ----- */
  var px = $$('.slides, .phero > img');
  if (px.length && !reduce) {
    var ticking = false;
    addEventListener('scroll', function(){ if (ticking) return; ticking = true; requestAnimationFrame(function(){ var y = Math.min(scrollY, innerHeight); px.forEach(function(el){ el.style.transform = 'translate3d(0,' + (y * 0.28).toFixed(1) + 'px,0)'; }); ticking = false; }); }, {passive:true});
  }

  /* ----- pause / play controls for moving content ----- */
  var pauseBtn = function(label){ var b = document.createElement('button'); b.type = 'button'; b.className = 'pp'; b.setAttribute('aria-pressed','false'); b.innerHTML = '<svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path class="i-pause" d="M2 1h3v10H2zM7 1h3v10H7z" fill="currentColor"/><path class="i-play" d="M2 1l9 5-9 5z" fill="currentColor"/></svg><span>' + T('Pause') + '</span>'; b.setAttribute('aria-label', label); return b; };
  var heroDots = $('.dots');
  if (heroDots && slides.length) {
    var hp = pauseBtn('Pause slideshow'); heroDots.parentNode.insertBefore(hp, heroDots.nextSibling);
    hp.addEventListener('click', function(){ var p = hp.getAttribute('aria-pressed') !== 'true'; hp.setAttribute('aria-pressed', p); $('span', hp).textContent = T(p ? 'Play' : 'Pause'); document.body.classList.toggle('hero-paused', p); window.RT_heroPaused = p; });
  }
  var tmFoot = $('.tm-foot');
  if (tmFoot) {
    var tp = pauseBtn('Pause reviews'); tmFoot.appendChild(tp);
    tp.addEventListener('click', function(){ var p = tp.getAttribute('aria-pressed') !== 'true'; tp.setAttribute('aria-pressed', p); $('span', tp).textContent = T(p ? 'Play' : 'Pause'); window.RT_tmPaused = p; });
  }
  document.addEventListener('langchange', function(){ $$('.pp').forEach(function(b){ $('span', b).textContent = T(b.getAttribute('aria-pressed') === 'true' ? 'Play' : 'Pause'); }); });

  /* ----- live weather on Thoddoo (Open-Meteo, no key needed) ----- */
  var wx = $('#wx');
  var wxDone = false;
  window.RT_loadWeather = function(){ if (wxDone || !wx || !window.fetch) return; wxDone = true;
    var WX = {0:'Clear sky',1:'Mostly clear',2:'Partly cloudy',3:'Cloudy',45:'Hazy',48:'Hazy',51:'Light drizzle',53:'Drizzle',55:'Drizzle',61:'Light rain',63:'Rain',65:'Heavy rain',80:'Showers',81:'Showers',82:'Heavy showers',95:'Thunderstorm',96:'Thunderstorm',99:'Thunderstorm'};
    fetch('https://api.open-meteo.com/v1/forecast?latitude=4.44&longitude=72.96&current=temperature_2m,weather_code&timezone=Indian%2FMaldives')
      .then(function(r){ return r.json(); })
      .then(function(j){ var c = j && j.current; if (!c) return; var draw = function(){ wx.innerHTML = esc(T('Thoddoo now')) + ' <b>' + Math.round(c.temperature_2m) + '°C</b> · ' + esc(T(WX[c.weather_code] || 'Tropical')); }; draw(); wx.hidden = false; document.addEventListener('langchange', draw); })
      .catch(function(){});
  };

  /* ----- optional aerial photo of Thoddoo (assets/thoddoo-aerial.jpg) ----- */
  $$('img[data-optional]').forEach(function(img){
    var fb = function(){ if (img.dataset.fallback && img.getAttribute('src') !== img.dataset.fallback) img.src = img.dataset.fallback; };
    img.addEventListener('error', fb);
    if (img.complete && img.naturalWidth === 0) fb();
  });


  /* ----- cookie consent -----
     Essential: always on (the consent choice itself).
     Preferences: remembers the chosen language.
     External content: the island map (OpenStreetMap) and the live weather in the top bar. */
  var CK = 'haisha-consent';
  var readConsent = function(){ try { return JSON.parse(localStorage.getItem(CK)); } catch(e){ return null; } };
  var consent = readConsent();
  window.RT_canStore = function(kind){ var c = readConsent(); return !!(c && c[kind]); };
  var saveConsent = function(pref, ext){
    consent = {pref: !!pref, ext: !!ext, at: new Date().toISOString().slice(0,10)};
    try { localStorage.setItem(CK, JSON.stringify(consent)); } catch(e){}
    if (!pref) { try { localStorage.removeItem('haisha-lang'); } catch(e){} }
    applyConsent();
  };
  var mapBox = $('.map');
  var mapSrc = mapBox && $('iframe', mapBox) ? $('iframe', mapBox).getAttribute('src') : null;
  var applyConsent = function(){
    var ext = !!(consent && consent.ext);
    if (mapBox && mapSrc) {
      if (ext) { if (!$('iframe', mapBox)) mapBox.innerHTML = '<iframe title="Map showing Thoddoo Haisha Inn on Thoddoo island" loading="lazy" src="' + mapSrc + '"></iframe>'; }
      else if ($('iframe', mapBox)) {
        mapBox.innerHTML = '<div class="map-off"><p>' + esc(T('The map is hidden because external content is switched off.')) + '</p><button type="button" class="btn btn-ghost">' + esc(T('Show map')) + '</button></div>';
        $('button', mapBox).addEventListener('click', function(){ saveConsent(consent ? consent.pref : false, true); });
      }
    }
    if (ext && window.RT_loadWeather) window.RT_loadWeather();
  };
  var ckBox = document.createElement('div');
  ckBox.className = 'ck'; ckBox.setAttribute('role', 'dialog'); ckBox.setAttribute('aria-labelledby', 'ckTitle'); ckBox.hidden = true;
  ckBox.innerHTML =
    '<div class="ck-head"><svg class="ck-logo" aria-hidden="true"><use href="#logo"/></svg><h2 id="ckTitle">Manage cookie consent</h2></div>' +
    '<p class="ck-txt">To give you the best experience, we use technologies such as cookies and local storage to remember your choices. Consenting allows us to remember your language and to show the island map and live weather. Not consenting may affect some features.</p>' +
    '<div class="ck-prefs" hidden>' +
      '<label><input type="checkbox" checked disabled><span><b>Essential</b><small>Needed for the site to work and to remember this choice.</small></span></label>' +
      '<label><input type="checkbox" id="ckPref"><span><b>Preferences</b><small>Remembers the language you choose.</small></span></label>' +
      '<label><input type="checkbox" id="ckExt"><span><b>External content</b><small>Island map (OpenStreetMap) and live weather (Open-Meteo).</small></span></label>' +
    '</div>' +
    '<div class="ck-btns"><button type="button" class="btn btn-sun" data-ck="all">Accept</button><button type="button" class="btn btn-ghost" data-ck="none">Deny</button><button type="button" class="btn btn-ghost" data-ck="prefs">View preferences</button></div>' +
    '<p class="ck-links"><a href="privacy.html#cookies">Cookie policy</a><a href="privacy.html">Privacy notice</a></p>';
  document.body.appendChild(ckBox);
  var ckOpen = function(){
    $('#ckPref').checked = !!(consent && consent.pref); $('#ckExt').checked = !!(consent && consent.ext);
    ckBox.hidden = false; requestAnimationFrame(function(){ ckBox.classList.add('on'); });
  };
  var ckClose = function(){ ckBox.classList.remove('on'); setTimeout(function(){ ckBox.hidden = true; }, 300); };
  $$('[data-ck]', ckBox).forEach(function(b){ b.addEventListener('click', function(){
    var k = b.getAttribute('data-ck'), prefs = $('.ck-prefs', ckBox);
    if (k === 'all') { saveConsent(true, true); ckClose(); }
    else if (k === 'none') { saveConsent(false, false); ckClose(); }
    else if (prefs.hidden) { prefs.hidden = false; b.textContent = T('Save preferences'); b.setAttribute('data-en', 'Save preferences'); }
    else { saveConsent($('#ckPref').checked, $('#ckExt').checked); ckClose(); }
  }); });
  $$('[data-cookie-settings]').forEach(function(a){ a.addEventListener('click', function(e){ e.preventDefault(); ckOpen(); }); });
  applyConsent();
  if (!consent) setTimeout(ckOpen, 900);

  /* ----- "book direct" window, shown once per visit ----- */
  var promoSeen = false;
  try { promoSeen = sessionStorage.getItem('haisha-promo') === '1'; } catch(e){}
  if (!promoSeen && page !== 'contact' && page !== 'privacy') {
    var promo = document.createElement('div');
    promo.className = 'promo'; promo.hidden = true;
    promo.innerHTML =
      '<div class="promo-box" role="dialog" aria-modal="true" aria-labelledby="promoTitle">' +
        '<div class="promo-img"><img src="assets/p13.jpg" alt="Palm trees, white sand and turquoise lagoon on Thoddoo seen from above"></div>' +
        '<div class="promo-body">' +
          '<button type="button" class="promo-x" aria-label="Close"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19"/></svg></button>' +
          '<h2 id="promoTitle">Book direct for a <em>better rate</em></h2>' +
          '<p>Book directly with us on WhatsApp and get a better rate than on booking sites. Same room, better price.</p>' +
          '<a class="btn btn-sun promo-wa" href="' + LINKS.whatsapp + '?text=' + encodeURIComponent('Hello Thoddoo Haisha Inn! I would like to book direct.') + '" target="_blank" rel="noopener">Book on WhatsApp</a>' +
          '<button type="button" class="promo-later">Maybe later</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(promo);
    var lastFocus = null;
    var promoClose = function(){ promo.classList.remove('on'); document.removeEventListener('keydown', esc_); setTimeout(function(){ promo.hidden = true; if (lastFocus) lastFocus.focus(); }, 350); try { sessionStorage.setItem('haisha-promo', '1'); } catch(e){} };
    var esc_ = function(e){ if (e.key === 'Escape') promoClose(); };
    $('.promo-x', promo).addEventListener('click', promoClose);
    $('.promo-later', promo).addEventListener('click', promoClose);
    $('.promo-wa', promo).addEventListener('click', promoClose);
    promo.addEventListener('click', function(e){ if (e.target === promo) promoClose(); });
    setTimeout(function(){
      if (window.RT_applyLang && window.RT_lang) window.RT_applyLang(window.RT_lang(), false);
      lastFocus = document.activeElement; promo.hidden = false;
      requestAnimationFrame(function(){ promo.classList.add('on'); $('.promo-x', promo).focus(); });
      document.addEventListener('keydown', esc_);
    }, 2500);
  }

  /* ----- languages ----- */
  if (window.RT_startLang) window.RT_startLang();
})();
