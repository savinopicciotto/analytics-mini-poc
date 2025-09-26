
let USERS=[], ORDERS=[], EXTRA=[];
let merged=false;

async function loadCSV(url){
  const res = await fetch(url);
  const text = await res.text();
  const [head, ...lines] = text.trim().split(/\r?\n/);
  const cols = head.split(",");
  return lines.map(l=>{
    const parts = l.split(",");
    const o={};
    cols.forEach((c,i)=>o[c]=parts[i]);
    return o;
  });
}

async function init(){
  USERS = await loadCSV('data/users.csv');
  ORDERS = await loadCSV('data/orders.csv');
  EXTRA  = await loadCSV('data/orders_plus.csv');
  render();
}

function parseDate(s){ return new Date(s + "T00:00:00"); }

function lastNDays(n){
  const out=[];
  const today = parseDate("2025-09-22"); // fixed for demo stability
  for(let i=n-1;i>=0;i--){
    const d = new Date(today);
    d.setDate(today.getDate()-i);
    out.push(d.toISOString().slice(0,10));
  }
  return out;
}

function computeKPIs(useExtra=false){
  const orders = useExtra ? EXTRA : ORDERS;
  // 1) New users last 7d
  const days7 = lastNDays(7);
  const newUsers = USERS.filter(u=>days7.includes(u.signup_date)).length;

  // 2) Orders last 7d + revenue
  const o7 = orders.filter(o=>days7.includes(o.created_at));
  const orders7d = o7.length;
  const revenue7d = o7.reduce((a,b)=>a + parseFloat(b.amount),0);

  // 3) Repeat rate: users with >1 order
  const byUser={};
  orders.forEach(o=>{
    byUser[o.user_id] = (byUser[o.user_id]||0)+1;
  });
  const usersWithOrders = Object.keys(byUser).length;
  const repeats = Object.values(byUser).filter(n=>n>1).length;
  const repeatRate = usersWithOrders ? (repeats / usersWithOrders) : 0;

  // Chart: orders per day (last 14d)
  const days14 = lastNDays(14);
  const counts = days14.map(d=>orders.filter(o=>o.created_at===d).length);

  return {newUsers, orders7d, revenue7d, repeatRate, days14, counts};
}

function fmt(n){ return n.toLocaleString(undefined,{maximumFractionDigits:2}); }
function pct(n){ return (n*100).toFixed(0)+"%"; }

function render(){
  const k = computeKPIs(merged);
  document.getElementById('newUsers').innerText = fmt(k.newUsers);
  document.getElementById('orders7d').innerText = fmt(k.orders7d);
  document.getElementById('rev7d').innerText = "$"+fmt(k.revenue7d);

  document.getElementById('repeat').innerText = pct(k.repeatRate);

  // draw bars
  const wrap = document.getElementById('chart');
  wrap.innerHTML='';
  const max = Math.max(1, ...k.counts);
  k.counts.forEach(c=>{
    const b = document.createElement('div');
    b.className = 'bar';
    b.style.height = ( (c / max) * 100 ) + "%";
    wrap.appendChild(b);
  });
  document.getElementById('legend').innerText = k.days14[0] + " → " + k.days14[k.days14.length-1];
  document.getElementById('simNote').innerText = merged ? "Latest export applied" : "Baseline export";
}

function toggleMerge(cb){
  merged = cb.checked;
  render();
}

document.addEventListener('DOMContentLoaded', init);
