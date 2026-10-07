const panel = document.querySelector('#preview-panel');
const tabs = [...document.querySelectorAll('[data-panel]')];
const footer = '<p class="preview-footnote">演示数据 · 实际统计随你的记账记录更新</p>';
const content = {
  ledger: '<header><h3>收支明细</h3><span>2026年10月</span></header><div class="preview-total"><small>本月支出</small><strong>¥1,280.00</strong><div class="bar"><i style="width:64%"></i></div></div>' + [['☕','咖啡','餐饮 · 09:20','28'],['♧','午餐','餐饮 · 12:10','38'],['⇄','地铁','交通 · 18:30','20']].map(([icon,name,time,amount]) => `<div class="bill"><span class="bill-icon">${icon}</span><div><b>${name}</b><small>${time}</small></div><strong>−${amount}</strong></div>`).join('') + footer,
  statistics: '<header><h3>分类统计</h3><span>2026年10月 · 支出</span></header><div class="stat-box"><svg viewBox="0 0 120 120" role="img" aria-label="演示支出分类环形图"><circle cx="60" cy="60" r="44" fill="none" stroke="#eee" stroke-width="14"/>' + [['#ffd43b',88.6,0],['#222',49.7,88.6],['#b2b2b2',41,138.3]].map(([color,len,offset])=>`<circle cx="60" cy="60" r="44" fill="none" stroke="${color}" stroke-width="14" stroke-dasharray="${len} 276.5" stroke-dashoffset="-${offset}" transform="rotate(-90 60 60)"/>`).join('') + '<text x="60" y="56" text-anchor="middle" font-size="9" fill="#888">本月支出</text><text x="60" y="73" text-anchor="middle" font-size="15" font-weight="700" fill="#222">¥1,280</text></svg><div class="stat-legend"><div><span><i style="background:#ffd43b"></i>餐饮</span><b>32% · ¥410</b></div><div><span><i style="background:#222"></i>购物</span><b>18% · ¥230</b></div><div><span><i style="background:#b2b2b2"></i>交通</span><b>15% · ¥190</b></div><div><span><i style="background:#eee"></i>其他分类</span><b>35% · ¥450</b></div></div></div><div class="stat-summary">这个月，餐饮是你最大的支出分类。</div>' + footer,
  budget: '<header><h3>月度预算</h3><span>2026年10月</span></header><div class="preview-total"><small>本月预算 ¥2,000 · 剩余</small><strong>¥720</strong><div class="bar"><i style="width:64%"></i></div></div>' + [['餐饮','410','600',68.3],['购物','230','400',57.5],['交通','190','300',63.3]].map(([name,amount,budget,width])=>`<div class="budget-row"><div><span>${name}</span><small>¥${amount} / ¥${budget}</small></div><div class="bar"><i style="width:${width}%"></i></div></div>`).join('') + footer,
};
function selectTab(tab, focus = false) {
  tabs.forEach(item => { const active = item === tab; item.setAttribute('aria-selected', String(active)); item.tabIndex = active ? 0 : -1; });
  panel.innerHTML = content[tab.dataset.panel];
  panel.setAttribute('aria-labelledby', tab.id);
  if (focus) tab.focus();
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) { event.preventDefault(); selectTab(tabs[next], true); }
  });
});
selectTab(tabs[0]);
