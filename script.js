import {
  LIGA_MX_HISTORIC_PART1,
  LIGA_MX_HISTORIC_PART2,
  LIGA_MX_HISTORIC_PART3,
  LIGA_MX_HISTORIC_PART4,
  LIGA_MX_HISTORIC_PART5,
  LIGA_MX_HISTORIC_PART6,
} from './jugadores.js';

/* ---------------- DATA ---------------- */
const CHAMPIONS = [
  ...LIGA_MX_HISTORIC_PART1,
  ...LIGA_MX_HISTORIC_PART2,
  ...LIGA_MX_HISTORIC_PART3,
  ...LIGA_MX_HISTORIC_PART4,
  ...LIGA_MX_HISTORIC_PART5,
  ...LIGA_MX_HISTORIC_PART6,
];

// Stylized club badges (colors + initials) — not official crests/logos.
const TEAM_STYLE = {
  "Pachuca":          {short:"PAC", color:"#003DA5", text:"#5B9BFF"},
  "Toluca":           {short:"TOL", color:"#D2001C", text:"#FF5C5C"},
  "Pumas UNAM":       {short:"PUM", color:"#0C2340", text:"#93A9FF"},
  "América":          {short:"AME", color:"#F2C200", text:"#FFD447"},
  "Santos Laguna":    {short:"SAN", color:"#1C7A3E", text:"#4ADE80"},
  "Monterrey":        {short:"MTY", color:"#003DA5", text:"#38BDF8"},
  "Tigres UANL":      {short:"TIG", color:"#FF6A00", text:"#FFA24C"},
  "Chivas":           {short:"CHI", color:"#A5122A", text:"#F4736B"},
  "Cruz Azul":        {short:"CAZ", color:"#0033A0", text:"#6C8CFF"},
  "Atlas":            {short:"ATL", color:"#B01E2C", text:"#E0665B"},
  "Atlante":          {short:"ATE", color:"#123E7C", text:"#5AA9E6"},
  "León":             {short:"LEO", color:"#046A38", text:"#34D399"},
  "Monarcas Morelia": {short:"MOR", color:"#e9c526", text:"#fcd684"},
  "Necaxa":           {short:"NEC", color:"#C8102E", text:"#FF7B7B"},
  "Tijuana":          {short:"TIJ", color:"#7A1F1F", text:"#FF8B5E"},
  "Puebla":           {short:"PUE", color:"#003876", text:"#7FB8FF"},
  "Querétaro":        {short:"QRO", color:"#1B1B1B", text:"#B8B8B8"},
  "Veracruz":         {short:"VER", color:"#8C1D18", text:"#FF9E80"},
  "San Luis":         {short:"SLU", color:"#C8102E", text:"#FF8A8A"},
  "Xolos":            {short:"XOL", color:"#7A1F1F", text:"#FF8B5E"},
  // Históricos/actuales reconocidos que nunca han sido campeones — solo para variedad de rivales.
  "Toros Neza":       {short:"NEZ", color:"#B08D2B", text:"#E4C874"},
  "Tecos UAG":        {short:"TEC", color:"#0B2E4F", text:"#5B9BFF"},
  "Correcaminos":     {short:"COR", color:"#4B2E83", text:"#C084FC"},
  "Irapuato":         {short:"IRA", color:"#B5541C", text:"#FFA45E"},
  "Zacatepec":        {short:"ZAC", color:"#7A1F1F", text:"#FF8B5E"},
  "Atlético Español": {short:"ESP", color:"#C8102E", text:"#FF8A8A"},
  "Jaguares":         {short:"JAG", color:"#F2A900", text:"#FFD966"},
  "Dorados":          {short:"DOR", color:"#B8901A", text:"#F0C34A"},
  "Lobos BUAP":       {short:"LOB", color:"#5B2C6F", text:"#C084FC"},
  "Mazatlán FC":      {short:"MAZ", color:"#800020", text:"#FF6E8E"},
  "Bravos de Juárez": {short:"JRZ", color:"#2E7D32", text:"#6EE07E"},
};
function findTeamStyle(name){
  const key = Object.keys(TEAM_STYLE).find(k => name && name.includes(k));
  if(key) return TEAM_STYLE[key];
  return {short:(name||"?").replace(/[^A-Za-zÀ-ÿ]/g,'').slice(0,3).toUpperCase() || "?", color:"#5a6b62", text:"#c9d6cd"};
}
function crestHTML(team, size){
  const st = findTeamStyle(team);
  return `<span class="crest-badge" style="width:${size}px;height:${size}px;background:${st.color};font-size:${Math.round(size*0.34)}px;">${st.short}</span>`;
}
function teamNameHTML(team){
  const st = findTeamStyle(team);
  return `<span style="color:${st.text};">${team}</span>`;
}

// Each formation maps a broad category (POR/DEF/MED/DEL — matches the player
// data) to an ordered list of specific position labels shown on the pitch.
// Player eligibility is still decided by the broad category; the label is
// purely a more descriptive slot name (GK, RB, CB, LB, CDM, CM, CAM, LW, ST, RW...).
const FORMATIONS = {
  "4-3-3":    { POR:['GK'], DEF:['LB','CB','CB','RB'],        MED:['CDM','CM','CAM'],            DEL:['LW','ST','RW'] },
  "4-4-2":    { POR:['GK'], DEF:['LB','CB','CB','RB'],        MED:['LM','CM','CM','RM'],          DEL:['ST','ST'] },
  "4-2-3-1":  { POR:['GK'], DEF:['LB','CB','CB','RB'],        MED:['CDM','CDM','CAM','LW','RW'],  DEL:['ST'] },
  "4-1-4-1":  { POR:['GK'], DEF:['LB','CB','CB','RB'],        MED:['CDM','LM','CM','CM','RM'],    DEL:['ST'] },
  "3-5-2":    { POR:['GK'], DEF:['CB','CB','CB'],             MED:['LWB','CDM','CM','CAM','RWB'], DEL:['ST','ST'] },
  "3-4-3":    { POR:['GK'], DEF:['CB','CB','CB'],             MED:['LM','CDM','CM','RM'],         DEL:['LW','ST','RW'] },
  "5-3-2":    { POR:['GK'], DEF:['LWB','CB','CB','CB','RWB'], MED:['CDM','CM','CAM'],              DEL:['ST','ST'] },
  "4-5-1":    { POR:['GK'], DEF:['LB','CB','CB','RB'],        MED:['LM','CDM','CM','CAM','RM'],    DEL:['ST'] },
};
const POS_LABEL = {POR:"Portero", DEF:"Defensa", MED:"Medio", DEL:"Delantero"};

/* ---------------- STATE ---------------- */
let state = {
  formation: "4-3-3",
  needed: {...FORMATIONS["4-3-3"]},
  filled: [],          // {pos, name, team}
  usedTeams: new Set(),
  usedPlayers: new Set(), // player names already drafted, across any squad/year
  currentRoll: null,   // champion object
  rerolls: 3,
};
let selectedSlot = null; // player object currently selected for a position swap, or null

/* ---------------- SETUP UI ---------------- */
const formationRow = document.getElementById('formation-row');
Object.keys(FORMATIONS).forEach(f=>{
  const b = document.createElement('button');
  b.className = 'formation-btn' + (f===state.formation ? ' active' : '');
  b.textContent = f;
  b.onclick = ()=>{ if(state.filled.length>0){ if(!confirm('Cambiar de formación reinicia el draft. ¿Continuar?')) return; resetAll(false); } state.formation=f; state.needed={...FORMATIONS[f]}; renderAll(); };
  formationRow.appendChild(b);
});

// Purely visual: splits a category's flat label list into stacked sub-lines so the
// pitch reads like a real formation diagram (e.g. 3-5-2 shown as 3-2-3-2) instead of
// one crowded row. Values are INDICES into FORMATIONS[formation][pos], ordered
// attacking-line-first (top) to defensive-line-last (bottom). Any category/formation
// not listed here just renders as a single flat row.
const PITCH_LAYOUT = {
  "4-3-3":   { MED: [[1,2],[0]] },        // CM+CAM up top, CDM holding
  "4-2-3-1": { MED: [[3,2,4],[0,1]] },    // LW+CAM+RW up top, double pivot below
  "4-1-4-1": { MED: [[1,2,3,4],[0]] },    // flat four up top, CDM holding
  "3-5-2":   { MED: [[0,3,4],[1,2]] },    // wing-backs+CAM up top, double pivot below
  "3-4-3":   { MED: [[0,2,3],[1]] },      // flat three up top, CDM holding
  "5-3-2":   { MED: [[1,2],[0]] },        // CM+CAM up top, CDM holding
  "4-5-1":   { MED: [[0,2,3,4],[1]] },    // LM+CM+CAM+RM up top, CDM holding
};
function subRowsFor(formation, pos, labels){
  const layout = PITCH_LAYOUT[formation] && PITCH_LAYOUT[formation][pos];
  if(layout) return layout;
  return [ labels.map((_,i)=>i) ]; // default: single flat row, original order
}

/* ---------------- PITCH RENDER ---------------- */
function renderPitch(){
  const pitch = document.getElementById('pitch');
  pitch.innerHTML = '';
  const need = FORMATIONS[state.formation];
  const cats = [
    {pos:'DEL', labels:need.DEL},
    {pos:'MED', labels:need.MED},
    {pos:'DEF', labels:need.DEF},
    {pos:'POR', labels:need.POR},
  ];
  cats.forEach(cat=>{
    const filledOfPos = state.filled.filter(p=>p.pos===cat.pos);
    const subRows = subRowsFor(state.formation, cat.pos, cat.labels);
    subRows.forEach(indices=>{
      const rowEl = document.createElement('div');
      rowEl.className='pitch-row';
      indices.forEach(idx=>{
        const label = cat.labels[idx];
        const p = filledOfPos[idx];
        const slot = document.createElement('div');
        slot.className = 'slot' + (p ? ' filled':'') + (p && p===selectedSlot ? ' selected':'');
        const tag = (p && p.label) ? p.label : label;
        if(p){
          slot.innerHTML = `<div class="pos-tag">${tag}</div>${crestHTML(p.team, 22)}<div class="p-name">${p.name}</div><div class="p-team">${teamNameHTML(p.team)}</div>`;
          slot.onclick = ()=> handleSlotClick(p);
        } else {
          slot.innerHTML = `<div class="pos-tag">${tag}</div><div class="p-name" style="color:var(--chalk-dim)">—</div>`;
        }
        rowEl.appendChild(slot);
      });
      pitch.appendChild(rowEl);
    });
  });

  document.getElementById('formation-row').querySelectorAll('.formation-btn').forEach(b=>{
    b.classList.toggle('active', b.textContent===state.formation);
  });

  const total = Object.values(need).reduce((a,b)=>a+b.length,0);
  document.getElementById('sim-btn').disabled = state.filled.length < total;
  renderSquadList();
}

function renderSquadList(){
  const box = document.getElementById('squad-list');
  if(!box) return;
  if(state.filled.length===0){
    box.innerHTML = `<div class="sq-title">Plantilla</div><div class="squad-empty">Aún no has fichado a nadie. Tira el dado para empezar.</div>`;
    return;
  }
  const order = ['DEL','MED','DEF','POR'];
  const sorted = [...state.filled].sort((a,b)=>order.indexOf(a.pos)-order.indexOf(b.pos));
  const rows = sorted.map(p=>`
    <div class="squad-row">
      <div style="display:flex; align-items:center; gap:8px;">
        ${crestHTML(p.team, 26)}
        <div><span class="sq-pos">${p.label || POS_LABEL[p.pos]} · ${teamNameHTML(p.team)}</span><span class="sq-name">${p.name}</span></div>
      </div>
      <div class="sq-rat">${Math.round(p.rat)}</div>
    </div>
  `).join('');
  const avg = Math.round(state.filled.reduce((a,p)=>a+p.rat,0)/state.filled.length);
  box.innerHTML = `
    <div class="sq-title">Plantilla (${state.filled.length}/11)</div>
    ${rows}
    <div class="squad-avg"><span class="avg-lbl">Promedio</span><span class="avg-val">${avg}</span></div>
  `;
}

function handleSlotClick(p){
  const hint = document.getElementById('swap-hint');
  if(!selectedSlot){
    selectedSlot = p;
    hint.innerHTML = `🔀 <strong>${p.name}</strong> seleccionado (${POS_LABEL[p.pos]}). Toca otra casilla de <strong>${POS_LABEL[p.pos]}</strong> para intercambiarlo, o tócalo de nuevo para cancelar.`;
    renderPitch();
    return;
  }
  if(selectedSlot === p){
    selectedSlot = null;
    hint.textContent = 'Toca a un jugador ya colocado para seleccionarlo, luego toca otra casilla de su misma posición (DEL/MED/DEF/POR) para intercambiarlos.';
    renderPitch();
    return;
  }
  if(selectedSlot.pos !== p.pos){
    hint.innerHTML = `🚫 ${selectedSlot.name} es <strong>${POS_LABEL[selectedSlot.pos]}</strong> y no puede jugar de <strong>${POS_LABEL[p.pos]}</strong>. Elige una casilla de ${POS_LABEL[selectedSlot.pos]}.`;
    selectedSlot = null;
    renderPitch();
    return;
  }
  // Same broad position: swap identity (name/team/rating) between the two slots.
  const tmp = {name:selectedSlot.name, team:selectedSlot.team, rat:selectedSlot.rat};
  selectedSlot.name = p.name; selectedSlot.team = p.team; selectedSlot.rat = p.rat;
  p.name = tmp.name; p.team = tmp.team; p.rat = tmp.rat;
  hint.innerHTML = `✅ Posiciones intercambiadas.`;
  selectedSlot = null;
  renderPitch();
}

/* ---------------- DRAFT LOGIC ---------------- */
function remainingPositions(){
  const need = FORMATIONS[state.formation];
  const out = {};
  Object.keys(need).forEach(pos=>{
    const have = state.filled.filter(p=>p.pos===pos).length;
    out[pos] = need[pos].length-have;
  });
  return out;
}

function rollTeam(){
  const remPos = remainingPositions();
  const openPositions = Object.keys(remPos).filter(p=>remPos[p]>0);
  const available = CHAMPIONS.filter(c=>{
    if(state.usedTeams.has(c.team+c.tourney)) return false;
    return c.players.some(pl=>openPositions.includes(pl.pos) && !state.usedPlayers.has(pl.name));
  });
  if(available.length===0){
    document.getElementById('roll-area').innerHTML = `<p class="hint">No quedan planteles disponibles con jugadores para las posiciones abiertas.</p>`;
    return;
  }
  const pick = available[Math.floor(Math.random()*available.length)];
  state.currentRoll = pick;
  renderRoll(openPositions);
  document.getElementById('reroll-btn').disabled = state.rerolls<=0;
  document.getElementById('roll-btn').disabled = true;
}

function renderRoll(openPositions){
  const c = state.currentRoll;
  const area = document.getElementById('roll-area');
  const eligible = c.players.filter(p=>openPositions.includes(p.pos) && !state.usedPlayers.has(p.name));
  let html = `<div class="roll-card">
    ${crestHTML(c.team, 52)}
    <div class="info"><div class="team">${teamNameHTML(c.team)}</div><div class="tourney">${c.tourney} · Campeón</div></div>
  </div>
  <p class="hint">Elige un jugador de esta plantilla para una posición abierta:</p>
  <div class="player-grid">`;
  const need = FORMATIONS[state.formation];
  eligible.forEach(p=>{
    const labels = need[p.pos] || [];
    const alreadyFilled = state.filled.filter(x=>x.pos===p.pos).length;
    const slotLabel = labels[alreadyFilled] || POS_LABEL[p.pos];
    html += `<div class="player-card" onclick="pickPlayer('${p.name.replace(/'/g,"\\'")}')">
      <div><div class="pname">${p.name}</div><div class="ppos">${slotLabel} · ${teamNameHTML(c.team)}</div></div>
      <div class="prat">${p.rat}</div>
    </div>`;
  });
  html += `</div>`;
  area.innerHTML = html;
}

window.pickPlayer = pickPlayer;
function pickPlayer(name){
  const c = state.currentRoll;
  const p = c.players.find(pl=>pl.name===name);
  if(!p) return;
  const labels = FORMATIONS[state.formation][p.pos] || [];
  const alreadyFilled = state.filled.filter(x=>x.pos===p.pos).length;
  const label = labels[alreadyFilled] || POS_LABEL[p.pos];
  state.filled.push({pos:p.pos, label, name:p.name, team:c.team, rat:p.rat});
  state.usedTeams.add(c.team+c.tourney);
  state.usedPlayers.add(p.name);
  state.currentRoll = null;
  state.rerolls = 3;
  document.getElementById('roll-area').innerHTML = `<p class="hint">✓ ${p.name} (${teamNameHTML(c.team)}) fichado. Tira de nuevo para la siguiente posición.</p>`;
  document.getElementById('reroll-btn').disabled = true;
  document.getElementById('roll-btn').disabled = false;
  renderPitch();
}

document.getElementById('roll-btn').onclick = ()=>{
  const total = Object.values(FORMATIONS[state.formation]).reduce((a,b)=>a+b.length,0);
  if(state.filled.length>=total) return;
  rollTeam();
};
document.getElementById('reroll-btn').onclick = ()=>{
  if(state.rerolls<=0) return;
  state.rerolls -= 1;
  document.getElementById('reroll-count').textContent = state.rerolls;
  rollTeam();
};
document.getElementById('reset-btn').onclick = ()=>{ if(confirm('¿Reiniciar todo el draft?')) resetAll(true); };

function resetAll(rerender){
  state.filled = [];
  state.usedTeams = new Set();
  state.usedPlayers = new Set();
  state.currentRoll = null;
  state.rerolls = 3;
  selectedSlot = null;
  if(sim && sim.timer) clearInterval(sim.timer);
  sim = null;
  document.getElementById('reroll-count').textContent = 3;
  document.getElementById('reroll-btn').disabled = true;
  document.getElementById('roll-btn').disabled = false;
  document.getElementById('roll-area').innerHTML = `<p class="hint">Tira el dado para que aparezca un plantel campeón.</p>`;
  document.getElementById('swap-hint').textContent = 'Toca a un jugador ya colocado para seleccionarlo, luego toca otra casilla de su misma posición (DEL/MED/DEF/POR) para intercambiarlos.';
  document.getElementById('sim-area').innerHTML = `<p class="hint">Completa las 11 posiciones para poder simular. Formato: repechaje (partido único) → cuartos, semifinal y final a ida y vuelta.</p>`;
  document.getElementById('sim-btn').style.display='inline-block';
  document.getElementById('sim-btn').textContent='Iniciar torneo';
  document.getElementById('skip-match-btn').style.display='none';
  document.getElementById('skip-all-btn').style.display='none';
  document.getElementById('next-match-btn').style.display='none';
  if(rerender) renderAll();
}

/* ---------------- SIMULATION ENGINE ---------------- */

// Weight each position's contribution to attack vs defense strength.
const ATTACK_WEIGHT = {DEL:1.6, MED:1.1, DEF:0.35, POR:0.1};
const DEFENSE_WEIGHT = {POR:1.8, DEF:1.5, MED:0.6, DEL:0.15};
// Relative chance a player is involved in each kind of event, by position.
const SCORER_WEIGHT  = {DEL:6,   MED:3,   DEF:1,   POR:0.1};  // goals
const CARD_WEIGHT    = {DEF:3,   MED:2.2, DEL:1.3, POR:0.6};  // yellow/red cards
const INJURY_WEIGHT  = {DEL:1,   MED:1,   DEF:1,   POR:0.6};  // injuries

// How likely each event type is to show up, tuned independently per event —
// this is the "porcentaje de aparición" per match, per team unless noted.
const EVENT_RATES = {
  penaltyGoalChance: 0.12,  // of each goal scored, chance it came from the spot
  penaltyMissChance: 0.09,  // chance (per team, per match) of a missed penalty
  yellowLambda:      1.3,   // average yellow cards per team per match (Poisson)
  redChance:         0.05,  // chance (per team, per match) of a red card
  injuryChance:      0.12,  // chance (per team, per match) of a notable injury
  saveChance:        0.35,  // chance (per team, per match) of a standout save
  woodworkChance:    0.15,  // chance (per team, per match) of hitting the post
};

// icon + whether it puts the ball in the net (feeds the live scoreboard count)
const EVENT_META = {
  goal:         {icon:'⚽', isGoal:true},
  penalty_goal: {icon:'🎯', isGoal:true},
  penalty_miss: {icon:'❌', isGoal:false},
  yellow:       {icon:'🟨', isGoal:false},
  red:          {icon:'🟥', isGoal:false},
  injury:       {icon:'🩹', isGoal:false},
  save:         {icon:'🧤', isGoal:false},
  woodwork:     {icon:'🥅', isGoal:false},
};

function weightedAverage(weights){
  let num=0, den=0;
  state.filled.forEach(p=>{
    const w = weights[p.pos] || 0.3;
    num += p.rat * w;
    den += w;
  });
  return den ? num/den : 75;
}
function attackRating(){ return weightedAverage(ATTACK_WEIGHT); }
function defenseRating(){ return weightedAverage(DEFENSE_WEIGHT); }

// Correct Poisson sampling (Knuth's algorithm).
function poissonSample(lambda){
  lambda = Math.max(0.05, lambda);
  const L = Math.exp(-lambda);
  let k = 0, p = 1;
  do { k++; p *= Math.random(); } while (p > L);
  return k - 1;
}

function weightedPick(weights){
  const pool = state.filled.map(p=>({p, w: weights[p.pos] || 0.5}));
  const total = pool.reduce((a,x)=>a+x.w,0);
  let r = Math.random()*total;
  for(const x of pool){ r -= x.w; if(r<=0) return x.p.name; }
  return pool[pool.length-1].p.name;
}
function pickScorer(){ return weightedPick(SCORER_WEIGHT); }
function pickCardPlayer(){ return weightedPick(CARD_WEIGHT); }
function pickInjuryPlayer(){ return weightedPick(INJURY_WEIGHT); }
function pickGoalkeeperName(){
  const gk = state.filled.find(p=>p.pos==='POR');
  return gk ? gk.name : 'El portero';
}
function randMin(){ return Math.floor(Math.random()*90)+1; }
function clamp(v,a,b){ return Math.max(a, Math.min(b,v)); }

// Tournament shape: groups don't eliminate, repechaje is sudden-death single leg,
// cuartos/semis/final are two-legged aggregate ties.
const STAGE_DEFS = [
  {id:"repechaje", label:"Repechaje", kind:"sudden", legs:1, oppBase:[76,88]},
  {id:"cuartos", label:"Cuartos de Final", kind:"agg", legs:2, oppBase:[82,91]},
  {id:"semis", label:"Semifinal", kind:"agg", legs:2, oppBase:[85,93]},
  {id:"final", label:"Final", kind:"agg", legs:2, oppBase:[88,95]},
];
// Todos los campeones de la Liga MX (1996–2026) más algunos clubes históricos
// o reconocidos que nunca fueron campeones, incluidos solo para dar variedad
// de rivales durante la simulación.
const RIVALS = [
  // -- Campeones, del más reciente al más antiguo --
  "Cruz Azul Cla.26",
  "Toluca Apr.25", "Toluca Cla.25",
  "América Apr.24", "América Cla.24",
  "América Apr.23", "Tigres UANL Cla.23",
  "Pachuca Apr.22", "Atlas Cla.22",
  "Atlas Apr.21", "Cruz Azul Guard.21",
  "Monterrey Apr.19", "Tigres UANL Cla.19",
  "América Apr.18", "Santos Laguna Cla.18",
  "Tigres UANL Apr.17", "Chivas Cla.17",
  "Tigres UANL Apr.16", "Pachuca Cla.16",
  "Tigres UANL Apr.15", "Santos Laguna Cla.15",
  "América Apr.14", "León Cla.14",
  "León Apr.13", "América Cla.13",
  "Tijuana Apr.12", "Santos Laguna Cla.12",
  "Tigres UANL Apr.11", "Pumas UNAM Cla.11",
  "Monterrey Apr.10", "Toluca Bicen.10",
  "Monterrey Apr.09", "Pumas UNAM Cla.09",
  "Toluca Apr.08", "Santos Laguna Cla.08",
  "Atlante Apr.07", "Pachuca Cla.07",
  "Chivas Apr.06", "Pachuca Cla.06",
  "Toluca Apr.05", "América Cla.05",
  "Pumas UNAM Apr.04", "Pumas UNAM Cla.04",
  "Pachuca Apr.03", "Monterrey Cla.03",
  "Toluca Apr.02", "América Ver.02",
  "Pachuca Inv.01", "Santos Laguna Ver.01",
  "Monarcas Morelia Inv.00", "Toluca Ver.00",
  "Pachuca Inv.99", "Toluca Ver.99",
  "Necaxa Inv.98", "Toluca Ver.98",
  "Cruz Azul Inv.97", "Chivas Ver.97",
  "Santos Laguna Inv.96",
  // -- Históricos / reconocidos que nunca fueron campeones --
  "Toros Neza", "Tecos UAG", "Correcaminos", "Irapuato",
  "Zacatepec", "Atlético Español", "Jaguares", "Dorados",
  "Lobos BUAP", "Mazatlán FC", "Bravos de Juárez",
  "Puebla", "Querétaro", "Veracruz", "San Luis", "Xolos",
];
const SPEED_MS = {slow:170, normal:65, fast:14};

let sim = null; // active tournament state

function buildMatchQueue(){
  const rivals = [...RIVALS].sort(()=>Math.random()-0.5);
  const queue = [];
  STAGE_DEFS.forEach((stage, idx)=>{
    const rivalName = rivals[idx % rivals.length];
    const oppRating = stage.oppBase[0] + Math.random()*(stage.oppBase[1]-stage.oppBase[0]);
    for(let leg=1; leg<=stage.legs; leg++){
      queue.push({
        stageId: stage.id, stageLabel: stage.label, kind: stage.kind,
        legs: stage.legs, leg, rivalName, oppRating,
        home: stage.legs===1 ? true : (leg===1)
      });
    }
  });
  return queue;
}

function resolveGoals(oppRating){
  const myAtk = sim.myAtk, myDef = sim.myDef;
  const myLambda  = clamp(1.5 + (myAtk - oppRating)/16, 0.35, 4.5);
  const oppLambda = clamp(1.2 + (oppRating - myDef)/16, 0.3, 3.8);
  const myGoals = poissonSample(myLambda);
  const oppGoals = poissonSample(oppLambda);
  const rivalName = sim.currentMatch.rivalName;
  const events = [];

  // Goals — some come from the penalty spot.
  for(let i=0;i<myGoals;i++){
    const type = Math.random() < EVENT_RATES.penaltyGoalChance ? 'penalty_goal' : 'goal';
    events.push({min:randMin(), type, mine:true, name:pickScorer()});
  }
  for(let i=0;i<oppGoals;i++){
    const type = Math.random() < EVENT_RATES.penaltyGoalChance ? 'penalty_goal' : 'goal';
    events.push({min:randMin(), type, mine:false, name:rivalName});
  }

  // Missed penalties — independent of the score, never add a goal.
  if(Math.random() < EVENT_RATES.penaltyMissChance) events.push({min:randMin(), type:'penalty_miss', mine:true, name:pickScorer()});
  if(Math.random() < EVENT_RATES.penaltyMissChance) events.push({min:randMin(), type:'penalty_miss', mine:false, name:rivalName});

  // Cards.
  const myYellows = Math.min(poissonSample(EVENT_RATES.yellowLambda), 4);
  for(let i=0;i<myYellows;i++) events.push({min:randMin(), type:'yellow', mine:true, name:pickCardPlayer()});
  const oppYellows = Math.min(poissonSample(EVENT_RATES.yellowLambda), 4);
  for(let i=0;i<oppYellows;i++) events.push({min:randMin(), type:'yellow', mine:false, name:rivalName});
  if(Math.random() < EVENT_RATES.redChance) events.push({min:randMin(), type:'red', mine:true, name:pickCardPlayer()});
  if(Math.random() < EVENT_RATES.redChance) events.push({min:randMin(), type:'red', mine:false, name:rivalName});

  // Injuries.
  if(Math.random() < EVENT_RATES.injuryChance) events.push({min:randMin(), type:'injury', mine:true, name:pickInjuryPlayer()});
  if(Math.random() < EVENT_RATES.injuryChance) events.push({min:randMin(), type:'injury', mine:false, name:rivalName});

  // Flavor: standout saves and shots off the woodwork (no effect on the score).
  if(Math.random() < EVENT_RATES.saveChance) events.push({min:randMin(), type:'save', mine:true, name:pickGoalkeeperName()});
  if(Math.random() < EVENT_RATES.saveChance) events.push({min:randMin(), type:'save', mine:false, name:rivalName});
  if(Math.random() < EVENT_RATES.woodworkChance) events.push({min:randMin(), type:'woodwork', mine:true, name:pickScorer()});
  if(Math.random() < EVENT_RATES.woodworkChance) events.push({min:randMin(), type:'woodwork', mine:false, name:rivalName});

  events.sort((a,b)=>a.min-b.min);
  return {myGoals, oppGoals, events};
}

function penaltyShootout(){
  const edge = clamp((sim.myAtk+sim.myDef - sim.currentMatch.oppRating*2)/45, -0.25, 0.25);
  const myPk = 3 + Math.round(Math.random()*2);
  let oppPk = 3 + Math.round(Math.random()*2);
  if(Math.random() < 0.5+edge){ if(oppPk>=myPk) oppPk = Math.max(0, myPk-1); }
  else { if(myPk<=oppPk) oppPk = myPk+1; }
  return {myPk, oppPk};
}

function startTournament(){
  sim = {
    myAtk: attackRating(), myDef: defenseRating(),
    queue: buildMatchQueue(), qIndex: 0,
    currentMatch: null, currentResult: null,
    aggregates: {}, // stageId -> {my, opp}
    log: [], // finished match summaries for the log below the live viewer
    wins:0, draws:0, losses:0, goalsFor:0, goalsAgainst:0, shutouts:0,
    eliminated:false, eliminatedAt:null, champion:false,
    speed: sim ? sim.speed : 'normal',
  };
  document.getElementById('sim-btn').style.display='none';
  document.getElementById('skip-match-btn').style.display='inline-block';
  document.getElementById('skip-all-btn').style.display='inline-block';
  document.getElementById('next-match-btn').style.display='none';
  playNextMatch();
}

function playNextMatch(){
  if(sim.qIndex >= sim.queue.length || sim.eliminated){ finishTournament(); return; }
  sim.currentMatch = sim.queue[sim.qIndex];
  sim.currentResult = resolveGoals(sim.currentMatch.oppRating);
  sim.animMinute = 0;
  sim.animEvents = [...sim.currentResult.events];
  sim.animDisplayed = [];
  sim.renderedCount = 0;
  renderLiveShell();
  document.getElementById('skip-match-btn').disabled = false;
  animateMatch();
}

function animateMatch(){
  clearInterval(sim.timer);
  const delay = SPEED_MS[sim.speed] || SPEED_MS.normal;
  sim.timer = setInterval(()=>{
    sim.animMinute++;
    while(sim.animEvents.length && sim.animEvents[0].min<=sim.animMinute){
      sim.animDisplayed.push(sim.animEvents.shift());
    }
    updateLiveView();
    if(sim.animMinute>=90){
      clearInterval(sim.timer);
      onMatchFullTime();
    }
  }, delay);
}

function skipCurrentMatch(){
  clearInterval(sim.timer);
  sim.animMinute = 90;
  sim.animDisplayed = [...sim.currentResult.events];
  sim.animEvents = [];
  updateLiveView();
  onMatchFullTime();
}

function onMatchFullTime(){
  const m = sim.currentMatch, r = sim.currentResult;
  let needsPenalties = false;
  let penalties = null;

  if(m.kind==='group'){
    if(r.myGoals>r.oppGoals) sim.wins++;
    else if(r.myGoals===r.oppGoals) sim.draws++;
    else sim.losses++;
  } else if(m.kind==='sudden'){
    if(r.myGoals===r.oppGoals){ needsPenalties = true; penalties = penaltyShootout(); }
    const won = r.myGoals>r.oppGoals || (penalties && penalties.myPk>penalties.oppPk);
    if(won) sim.wins++; else { sim.losses++; sim.eliminated=true; sim.eliminatedAt=m.stageLabel; }
  } else if(m.kind==='agg'){
    if(!sim.aggregates[m.stageId]) sim.aggregates[m.stageId] = {my:0, opp:0};
    sim.aggregates[m.stageId].my += r.myGoals;
    sim.aggregates[m.stageId].opp += r.oppGoals;
    if(m.leg===m.legs){
      const agg = sim.aggregates[m.stageId];
      if(agg.my===agg.opp){ needsPenalties = true; penalties = penaltyShootout(); }
      const won = agg.my>agg.opp || (penalties && penalties.myPk>penalties.oppPk);
      if(won){ sim.wins++; if(m.stageId==='final') sim.champion=true; }
      else { sim.losses++; sim.eliminated=true; sim.eliminatedAt=m.stageLabel; }
    }
  }

  sim.goalsFor += r.myGoals;
  sim.goalsAgainst += r.oppGoals;
  if(r.oppGoals===0) sim.shutouts++;

  sim.log.push({...m, myGoals:r.myGoals, oppGoals:r.oppGoals, penalties, agg: m.kind==='agg' ? {...sim.aggregates[m.stageId]} : null});
  sim.qIndex++;
  renderLiveFinal(penalties);

  const isTieOver = m.kind!=='agg' || m.leg===m.legs;
  document.getElementById('skip-match-btn').disabled = true;
  if(sim.eliminated || sim.qIndex>=sim.queue.length){
    document.getElementById('next-match-btn').textContent = 'Ver resultado final ››';
  } else {
    document.getElementById('next-match-btn').textContent = 'Siguiente partido ›';
  }
  document.getElementById('next-match-btn').style.display='inline-block';
  document.getElementById('skip-match-btn').style.display = (sim.eliminated || sim.qIndex>=sim.queue.length) ? 'none' : 'inline-block';
}

function renderLiveShell(){
  const m = sim.currentMatch;
  const legNote = m.legs===2 ? ` · ${m.leg===1?'Ida':'Vuelta'}` : '';
  const aggNote = (m.kind==='agg' && m.leg===2)
    ? `<div class="agg-note">Global ida: ${sim.aggregates[m.stageId] ? sim.aggregates[m.stageId].my : 0} - ${sim.aggregates[m.stageId] ? sim.aggregates[m.stageId].opp : 0}</div>` : '';
  document.getElementById('sim-area').innerHTML = `
    <div class="live-match">
      <div class="live-head"><div class="live-stage">${m.stageLabel}${legNote}</div><div class="live-leg" id="live-minute">0'</div></div>
      <div class="live-score">
        <div class="team-name">${crestHTML('Tu Once', 30)}<div>Tu Once</div></div>
        <div><span id="live-my">0</span> - <span id="live-opp">0</span></div>
        <div class="team-name">${crestHTML(m.rivalName, 30)}<div>${teamNameHTML(m.rivalName)}</div></div>
      </div>
      <div class="live-clock"><div class="bar"><div class="bar-fill" id="live-bar"></div></div></div>
      <div class="live-feed" id="live-feed"></div>
      ${aggNote}
    </div>
    <div class="stage-log-title">Partidos jugados</div>
    <div class="results-list" id="log-list">${renderLogRows()}</div>
  `;
}

function eventLabel(e){
  const rival = sim.currentMatch.rivalName;
  const rivalSt = findTeamStyle(rival);
  const nameTag = (shake)=> `<span class="${shake?'goal-shake':''}" style="${e.mine?'':`color:${rivalSt.text};`}">${e.name}</span>`;
  switch(e.type){
    case 'goal':
      return e.mine ? `${nameTag(true)} anota (Tu Once)` : `${nameTag(true)} anota ${crestHTML(rival,16)}`;
    case 'penalty_goal':
      return e.mine ? `${nameTag(true)} anota de penal (Tu Once)` : `${nameTag(true)} anota de penal ${crestHTML(rival,16)}`;
    case 'penalty_miss':
      return e.mine ? `${nameTag(false)} falla un penal` : `${teamNameHTML(rival)} falla un penal`;
    case 'yellow':
      return e.mine ? `${nameTag(false)} amonestado` : `Jugador de ${teamNameHTML(rival)} amonestado`;
    case 'red':
      return e.mine ? `${nameTag(false)} expulsado — quedan con 10` : `Jugador de ${teamNameHTML(rival)} expulsado — rival con 10`;
    case 'injury':
      return e.mine ? `${nameTag(false)} se resiente de una lesión` : `Jugador de ${teamNameHTML(rival)} se resiente de una lesión`;
    case 'save':
      return e.mine ? `${nameTag(false)} ataja una clara ocasión` : `El portero de ${teamNameHTML(rival)} evita el gol`;
    case 'woodwork':
      return e.mine ? `${nameTag(false)} estrella el balón en el poste` : `${teamNameHTML(rival)} pega en el poste`;
    default:
      return e.name;
  }
}

function updateLiveView(){
  document.getElementById('live-minute').textContent = sim.animMinute + "'";
  document.getElementById('live-bar').style.width = (sim.animMinute/90*100)+'%';
  const myCount = sim.animDisplayed.filter(e=>e.mine && EVENT_META[e.type].isGoal).length;
  const oppCount = sim.animDisplayed.filter(e=>!e.mine && EVENT_META[e.type].isGoal).length;
  document.getElementById('live-my').textContent = myCount;
  document.getElementById('live-opp').textContent = oppCount;

  const feed = document.getElementById('live-feed');
  while(sim.renderedCount < sim.animDisplayed.length){
    const e = sim.animDisplayed[sim.renderedCount];
    const row = document.createElement('div');
    row.className = 'live-event';
    row.innerHTML = `<span class="min">${e.min}'</span><span>${EVENT_META[e.type].icon} ${eventLabel(e)}</span>`;
    feed.insertBefore(row, feed.firstChild);
    sim.renderedCount++;
  }
}

function renderLiveFinal(penalties){
  const m = sim.currentMatch, r = sim.currentResult;
  document.getElementById('live-minute').textContent = "90' — Final";
  let extra = '';
  if(penalties){
    extra = `<div class="agg-note">Penales: ${penalties.myPk} - ${penalties.oppPk}</div>`;
  }
  if(m.kind==='agg' && m.leg===m.legs){
    const agg = sim.aggregates[m.stageId];
    extra += `<div class="agg-note">Marcador global: ${agg.my} - ${agg.opp}</div>`;
  }
  document.getElementById('sim-area').querySelector('.live-match').insertAdjacentHTML('beforeend', extra);
  document.getElementById('log-list').innerHTML = renderLogRows();

  if(sim.eliminated){
    document.getElementById('sim-area').insertAdjacentHTML('beforeend', `
      <div class="elim-banner">
        <h2>Eliminado en ${sim.eliminatedAt}</h2>
        <p>Récord: ${sim.wins}V ${sim.draws}E ${sim.losses}D · Goles a favor: ${sim.goalsFor} · en contra: ${sim.goalsAgainst}</p>
      </div>
    `);
  }
}

function renderLogRows(){
  return sim.log.map(m=>{
    const lossClass = (m.myGoals<m.oppGoals && m.kind!=='agg') || (m.kind==='agg' && m.leg===m.legs && m.agg && m.agg.my<m.agg.opp) ? ' loss' : '';
    const legNote = m.legs===2 ? ` (${m.leg===1?'Ida':'Vuelta'})` : '';
    const pk = m.penalties ? ` · Penales ${m.penalties.myPk}-${m.penalties.oppPk}` : '';
    return `<div class="match-row${lossClass}">
      <div style="display:flex; align-items:center; gap:10px;">${crestHTML(m.rivalName, 28)}
        <div><div class="stage">${m.stageLabel}${legNote}</div><div class="vs">Tu Once vs. ${teamNameHTML(m.rivalName)}${pk}</div></div>
      </div>
      <div class="score">${m.myGoals} - ${m.oppGoals}</div>
    </div>`;
  }).reverse().join('');
}

function finishTournament(){
  const perfect = sim.champion && sim.goalsAgainst===0;
  const record = `${sim.wins}V ${sim.draws}E ${sim.losses}D`;
  let headline;
  if(sim.champion) headline = perfect ? '¡7 a 0 perfecto! Campeón invicto sin gol recibido' : '¡Campeón del torneo!';
  else headline = `Eliminado en ${sim.eliminatedAt}`;

  const replayLabel = sim.champion ? '🔁 Jugar torneo de nuevo' : '🔄 Reintentar torneo';
  const saveBtn = sim.champion ? `<button class="btn primary" id="save-image-btn">📸 Guardar alineación (JPG)</button>` : '';

  document.getElementById('sim-area').innerHTML = `
    <div class="stage-log-title">Resumen del torneo</div>
    <div class="results-list">${renderLogRows()}</div>
    <div class="verdict" style="${sim.champion ? '' : 'border-color:var(--red);'}">
      <h2 style="${sim.champion ? '' : 'color:var(--red-bright);'}">${headline}</h2>
      <p>Récord: ${record} · Goles a favor: ${sim.goalsFor} · Goles en contra: ${sim.goalsAgainst} · Vallas en cero: ${sim.shutouts}</p>
      <p>Ataque: ${Math.round(sim.myAtk)} · Defensa: ${Math.round(sim.myDef)}</p>
      <div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap; margin-top:14px;">
        ${saveBtn}
        <button class="btn primary" id="retry-btn">${replayLabel}</button>
        <button class="btn ghost" id="new-squad-btn">🗑️ Nueva plantilla desde cero</button>
      </div>
    </div>
  `;
  document.getElementById('skip-match-btn').style.display='none';
  document.getElementById('skip-all-btn').style.display='none';
  document.getElementById('next-match-btn').style.display='none';
  document.getElementById('sim-btn').style.display='none';

  if(sim.champion) document.getElementById('save-image-btn').onclick = downloadLineupImage;
  document.getElementById('retry-btn').onclick = startTournament;
  document.getElementById('new-squad-btn').onclick = ()=>{ if(confirm('¿Reiniciar todo el draft y armar una plantilla nueva desde cero?')) resetAll(true); };
}

function skipToEnd(){
  clearInterval(sim.timer);
  while(sim.qIndex < sim.queue.length && !sim.eliminated){
    sim.currentMatch = sim.queue[sim.qIndex];
    sim.currentResult = resolveGoals(sim.currentMatch.oppRating);
    sim.animDisplayed = [...sim.currentResult.events];
    onMatchFullTime();
  }
  finishTournament();
}

document.querySelectorAll('.speed-btn').forEach(b=>{
  b.onclick = ()=>{
    document.querySelectorAll('.speed-btn').forEach(x=>x.classList.remove('active'));
    b.classList.add('active');
    if(sim) sim.speed = b.dataset.speed;
    else { sim = sim || {}; sim.speed = b.dataset.speed; }
  };
});

document.getElementById('sim-btn').onclick = startTournament;
document.getElementById('skip-match-btn').onclick = skipCurrentMatch;
document.getElementById('skip-all-btn').onclick = skipToEnd;
document.getElementById('next-match-btn').onclick = ()=>{
  document.getElementById('next-match-btn').style.display='none';
  playNextMatch();
};

/* ---------------- LINEUP IMAGE EXPORT ---------------- */
function roundRectPath(ctx,x,y,w,h,r){
  ctx.beginPath();
  ctx.moveTo(x+r,y);
  ctx.arcTo(x+w,y,x+w,y+h,r);
  ctx.arcTo(x+w,y+h,x,y+h,r);
  ctx.arcTo(x,y+h,x,y,r);
  ctx.arcTo(x,y,x+w,y,r);
  ctx.closePath();
}
function wrapCenteredText(ctx,text,cx,y,maxWidth,lineHeight){
  const words = text.split(' ');
  let line = '';
  const lines = [];
  words.forEach(w=>{
    const test = line ? line+' '+w : w;
    if(ctx.measureText(test).width > maxWidth && line){ lines.push(line); line = w; }
    else line = test;
  });
  if(line) lines.push(line);
  lines.forEach((l,i)=> ctx.fillText(l, cx, y + i*lineHeight));
  return lines.length;
}

function downloadLineupImage(){
  const W = 960, H = 1280;
  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');

  // background: pitch stripes
  ctx.fillStyle = '#0a2e22';
  ctx.fillRect(0,0,W,H);
  ctx.fillStyle = 'rgba(255,255,255,0.03)';
  for(let x=0; x<W; x+=120){ if((x/120)%2===0) ctx.fillRect(x,0,60,H); }
  ctx.strokeStyle = 'rgba(245,243,236,0.18)';
  ctx.lineWidth = 3;
  ctx.strokeRect(24,24,W-48,H-48);

  // header
  ctx.textAlign = 'center';
  ctx.fillStyle = '#f0c34a';
  ctx.font = 'bold 64px Arial, sans-serif';
  ctx.fillText('MX 7-0', W/2, 100);
  ctx.fillStyle = '#c9d6cd';
  ctx.font = '20px "Courier New", monospace';
  const subtitle = (sim && sim.champion) ? `CAMPEÓN · Formación ${state.formation}` : `Formación ${state.formation}`;
  ctx.fillText(subtitle, W/2, 132);
  const teamAvg = Math.round(state.filled.reduce((a,p)=>a+p.rat,0)/state.filled.length);
  ctx.fillStyle = '#d4a72c';
  ctx.font = 'bold 18px "Courier New", monospace';
  ctx.fillText(`PROMEDIO DE PLANTILLA: ${teamAvg}`, W/2, 160);

  // rows top(delanteros) to bottom(portero), mirroring the on-screen pitch
  const order = ['DEL','MED','DEF','POR'];
  let y = 235;
  order.forEach(pos=>{
    const players = state.filled.filter(p=>p.pos===pos);
    if(players.length===0) return;
    ctx.textAlign = 'center';
    ctx.fillStyle = '#d4a72c';
    ctx.font = 'bold 15px "Courier New", monospace';
    ctx.fillText(POS_LABEL[pos].toUpperCase(), W/2, y-18);

    const boxW = 190, boxH = 150, gap = 18;
    const n = players.length;
    const totalW = n*boxW + (n-1)*gap;
    let x = (W-totalW)/2;
    players.forEach(p=>{
      ctx.fillStyle = '#123c2c';
      roundRectPath(ctx, x, y, boxW, boxH, 10);
      ctx.fill();
      ctx.strokeStyle = '#d4a72c';
      ctx.lineWidth = 2;
      ctx.stroke();

      // team crest (colored circle + initials) — top-left corner
      const st = findTeamStyle(p.team);
      const cx = x + 22, cy = y + 20, cr = 13;
      ctx.beginPath();
      ctx.arc(cx, cy, cr, 0, Math.PI*2);
      ctx.fillStyle = st.color;
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.5)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 9px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(st.short, cx, cy+3);

      // specific slot label — top-right corner, same row as the crest
      ctx.fillStyle = '#d4a72c';
      ctx.font = 'bold 11px "Courier New", monospace';
      ctx.textAlign = 'right';
      ctx.fillText(p.label || POS_LABEL[p.pos], x+boxW-12, cy+4);

      // name (well clear of the crest/label row), team, rating — spaced to
      // never collide even when the name wraps to two lines.
      ctx.fillStyle = '#f5f3ec';
      ctx.font = 'bold 17px Arial, sans-serif';
      ctx.textAlign = 'center';
      const nameY = y + 54;
      const lineHeight = 19;
      const lines = wrapCenteredText(ctx, p.name, x+boxW/2, nameY, boxW-24, lineHeight);
      ctx.fillStyle = st.text;
      ctx.font = '12px "Courier New", monospace';
      const teamY = nameY + lines*lineHeight + 18;
      ctx.fillText(p.team, x+boxW/2, teamY);
      ctx.fillStyle = '#f0c34a';
      ctx.font = 'bold 24px "Anton", Arial, sans-serif';
      ctx.fillText(`${Math.round(p.rat)}`, x+boxW/2, y+boxH-16);

      x += boxW + gap;
    });
    y += boxH + 55;
  });

  // footer stats
  ctx.textAlign = 'center';
  ctx.fillStyle = '#c9d6cd';
  ctx.font = '16px "Courier New", monospace';
  if(sim){
    ctx.fillText(`Récord: ${sim.wins}V ${sim.draws}E ${sim.losses}D  ·  GF ${sim.goalsFor} - GC ${sim.goalsAgainst}`, W/2, H-70);
  }
  ctx.font = '13px "Courier New", monospace';
  ctx.fillStyle = 'rgba(201,214,205,0.6)';
  ctx.fillText('Draft de campeones · Liga MX', W/2, H-40);

  const link = document.createElement('a');
  link.download = 'mx7a0-alineacion.jpg';
  link.href = canvas.toDataURL('image/jpeg', 0.92);
  link.click();
}

/* ---------------- INIT ---------------- */
function renderAll(){ renderPitch(); }
renderAll();