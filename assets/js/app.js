// Consolidated site JavaScript moved from inline scripts
// assets/js/app.js

// QA data (excerpt) - keep concise to avoid very large file
const QA = {
  "who is bk": "<strong>Barada Kanta (BK) Satpathy</strong> is a Procurement Transformation Leader and Independent Consultant with 19+ years of experience governing multi-billion enterprise spend portfolios.",
  "p2p": "<strong>Procure-to-Pay (P2P) Transformation</strong> redesigns your end-to-end procurement workflow from purchase requisition to supplier payment.",
  "savings": "<strong>Typical savings by engagement type:</strong><br>P2P Transformation: 15-30% process cost reduction; Strategic Sourcing: 10-25% category savings.",
  "ariba": "<strong>SAP Ariba</strong> is a cloud procurement platform for sourcing, contracting, and buying.",
  "contact": "Reach BK at <a href='mailto:bksatpathy@live.in' style='color:var(--rose)'>bksatpathy@live.in</a>",
  "available": "BK is available for executive roles and consulting globally.",
};

function getAnswer(q){
  const l = q.toLowerCase();
  if((l.includes("who") && (l.includes("bk") || l.includes("satpathy"))) || l.includes("experience") ) return QA["who is bk"];
  if(l.includes("p2p") || l.includes("procure-to-pay")) return QA["p2p"];
  if(l.includes("saving")||l.includes("roi")||l.includes("how much")) return QA["savings"];
  if(l.includes("ariba")) return QA["ariba"];
  if(l.includes("contact")) return QA["contact"];
  if(l.includes("available")||l.includes("hire")) return QA["available"];
  return "I can answer questions about procurement transformation, P2P, SAP/Ariba, indirect categories, GBS, vendor management, ESG, and consulting. Try asking about P2P, savings, or SAP Ariba.";
}

// Chat widget functions
function addMsg(html, isUser){
  const d = document.createElement('div');
  d.className = 'chat-msg ' + (isUser ? 'msg-user' : 'msg-bot');
  d.innerHTML = html;
  const m = document.getElementById('chatMsgs');
  if(m){ m.appendChild(d); m.scrollTop = m.scrollHeight; }
}

function askQ(btn){
  const q = (typeof btn === 'string') ? btn : btn.textContent.trim();
  const sug = document.getElementById('chatSugs'); if(sug) sug.style.display = 'none';
  addMsg(q, true);
  setTimeout(()=> addMsg(getAnswer(q), false), 400);
}

function sendChat(){
  const i = document.getElementById('chatIn');
  if(!i) return; const q = i.value.trim(); if(!q) return; i.value = '';
  const sug = document.getElementById('chatSugs'); if(sug) sug.style.display = 'none';
  addMsg(q, true);
  setTimeout(()=> addMsg(getAnswer(q), false), 500);
}

function toggleChat(){
  const box = document.getElementById('chatBox'); if(!box) return; box.classList.toggle('open');
}

// Menu
function toggleMenu(){
  const mob = document.getElementById('mobnav'); if(!mob) return; mob.classList.toggle('open');
}

document.addEventListener('click', (e)=>{
  const ham = document.getElementById('ham'); const mob = document.getElementById('mobnav');
  if(!e.target.closest('#mobnav') && !e.target.closest('#ham')){ if(mob) mob.classList.remove('open'); }
});

// FAQ toggle
function toggleFaq(el){
  const ans = el.querySelector('.faq-ans'); const icon = el.querySelector('.faq-icon');
  if(!ans) return; const isOpen = ans.style.display !== 'none';
  ans.style.display = isOpen ? 'none' : 'block';
  if(icon) { icon.textContent = isOpen ? '+' : '×'; icon.style.transform = isOpen ? 'rotate(0)' : 'rotate(45deg)'; }
}

// ROI calc
function calcROI(){
  const spendEl = document.getElementById('spendSlider'); const eng = document.getElementById('engType');
  if(!spendEl || !eng) return;
  const spend = parseInt(spendEl.value,10); const rate = parseFloat(eng.value);
  const low = Math.round(spend * rate); const high = Math.round(spend * (rate + 0.1));
  const res = document.getElementById('roiResult'); const range = document.getElementById('roiRange'); const pay = document.getElementById('roiPayback');
  if(res) res.textContent = '₹' + low + 'Cr';
  if(range) range.textContent = '₹' + low + 'Cr – ₹' + high + 'Cr range';
  if(pay) pay.textContent = 'Typical payback: ' + (spend>200 ? '2–4 months' : spend>50 ? '3–6 months' : '4–8 months');
}

// Scroll nav shadow
window.addEventListener('scroll', ()=>{
  const mn = document.getElementById('mainnav'); if(!mn) return; mn.classList.toggle('scrolled', window.scrollY > 20);
});

// Intersection reveal
document.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('.rev,.revL,.revR').forEach(el => {
    const obs = new IntersectionObserver(entries => entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('vis'); }), {threshold:0.1});
    obs.observe(el);
  });

  // Count-up observer (simplified)
  document.querySelectorAll('.cnt').forEach(el=>{
    const target = parseFloat(el.dataset.t || el.textContent) || 0; el.textContent = '0';
    const observer = new IntersectionObserver(entries => { entries.forEach(e=>{ if(e.isIntersecting && !el.dataset.done){ el.dataset.done = 1; let cur=0; const step = Math.max(1, Math.round(target/60)); const iv = setInterval(()=>{ cur+=step; if(cur>=target){ el.textContent = target; clearInterval(iv);} else el.textContent = cur; }, 20); } }); }, {threshold:0.3});
    observer.observe(el);
  });

  // Attach event handlers for chat suggestion buttons
  document.querySelectorAll('.chat-sug').forEach(b=> b.addEventListener('click', ()=> askQ(b)));

  // Attach ROI inputs
  const spend = document.getElementById('spendSlider'); if(spend) spend.addEventListener('input', calcROI);
  const engType = document.getElementById('engType'); if(engType) engType.addEventListener('change', calcROI);
  calcROI();

  // Attach FAQ toggles
  document.querySelectorAll('[data-faq]').forEach(f=> f.addEventListener('click', ()=> toggleFaq(f)));
});
