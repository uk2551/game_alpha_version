const chronicle = document.getElementById('chronicleFeed')

function addplayerbox(text) {
    const command = text
    const htmlString = `<div class="entry-player">
<div class="ep-label">📜 พระราชโองการ</div>
<div class="ep-bubble">${command}</div>
</div>`;

    chronicle.insertAdjacentHTML('beforeend', htmlString);
    const respond_loading = `<div class="entry-ai" id='loading'>
<div class="entry-label">⚔️ Game Master</div>
<p class="entry-text"> กำลังประมวลผล </p></div>`;

    chronicle.insertAdjacentHTML('beforeend', respond_loading);
}



function addfeedback(respond) {
    const game_state = respond.game_state 
    const loading_div = document.getElementById('loading')
    const loading_status = respond.loading
    const error_div = document.getElementById('error')

    console.log(game_state)
    if (game_state !== undefined){
    const kingdom_stats = respond.kingdom_stats
    const resource_production = respond.resource_production
    const stability_breakdown = respond.stability_breakdown
    const profile = respond.profile
    const armyData = respond.armyData
    const active_projects = respond.active_projects
    const active_conditions = respond.active_conditions
    const npcs = respond.npcs
    const history_log = respond.history_log // not upd
    const narrative = respond.narrative
    
    //kingdom_stats chagne
    document.querySelectorAll(".currency").forEach(el =>{
        el.textContent = kingdom_stats.currency
    });
     document.querySelectorAll(".supplies").forEach(el =>{
        el.textContent = kingdom_stats.supplies
    });
     document.querySelectorAll(".population").forEach(el =>{
        el.textContent = kingdom_stats.population
    });
     document.querySelectorAll(".army_size").forEach(el =>{
        el.textContent = kingdom_stats.army_size
    });
    document.querySelectorAll(".stability_percent").forEach(el =>{
        el.textContent = kingdom_stats.stability_percent
    });

    //game_state
    document.getElementById("turn").textContent = game_state.turn
    document.getElementById("chapter").textContent = game_state.chapter
    document.getElementById("chapter_title").textContent = game_state.chapter_title
    document.getElementById("season").textContent = game_state.season
    document.getElementById("year").textContent = game_state.year
    document.getElementById("current_date").textContent = game_state.current_date

    //resource_production
    document.getElementById("food_per_turn").textContent = resource_production.food_per_turn
    document.getElementById("income_per_turn").textContent = resource_production.income_per_turn
    document.getElementById("expense_per_turn").textContent = resource_production.expense_per_turn
    document.getElementById("birth_rate").textContent = resource_production.birth_rate
    document.getElementById("death_rate").textContent = resource_production.death_rate

    //stability_breakdown
    document.getElementById("politics").textContent = stability_breakdown.politics
    document.getElementById("economy").textContent = stability_breakdown.economy
    document.getElementById("military").textContent = stability_breakdown.military
    document.getElementById("religion").textContent = stability_breakdown.religion

    document.getElementById("politics_meter").style.width = stability_breakdown.politics + "%"
    document.getElementById("economy_meter").style.width = stability_breakdown.economy + "%"
    document.getElementById("military_meter").style.width = stability_breakdown.military + "%"
    document.getElementById("religion_meter").style.width = stability_breakdown.religion + "%"

    //profile
    document.getElementById("terrain").textContent = profile.terrain
    document.getElementById("reputation").textContent = profile.reputation
    document.getElementById("kingname").textContent = profile.leader.name
    document.getElementById("traits").textContent = profile.leader.traits
    document.getElementById("military").textContent = profile.leader.stats.military
    document.getElementById("intelligence").textContent = profile.leader.stats.intelligence
    document.getElementById("management").textContent = profile.leader.stats.management
    document.getElementById("diplomacy").textContent = profile.leader.stats.diplomacy
    document.querySelectorAll(".kingdomname").forEach(el => {
        el.textContent = profile.name
    });

    //armyData
    document.getElementById("morale").textContent = armyData.morale
    document.getElementById("maintenance_cost").textContent = armyData.maintenance_cost
    document.getElementById("war").textContent = armyData.status.war
    document.getElementById("supplies").textContent = armyData.status.supplies
    
    //active_projects
    const projects_display = document.getElementById('projects_display')
    projects_display.innerHTML = `<div class="pop-st">โปรเจกต์</div>`

    active_projects.forEach(el => {
  const projects_html = `<div class="pop-row">
    <span class="pop-key">${el.name}</span>
    <span class="pop-val pgold">${el.progress}</span></div>`
    projects_display.insertAdjacentHTML('beforeend', projects_html);
});
    
    //active_conditions
    const conditoin_display = document.getElementById('Condition_display')
    conditoin_display.innerHTML = `<div class="pop-st">Condition</div>`
    
    active_conditions.forEach(el => {
        const conditionz_html = `<div class="pop-row">
        <span class="pop-key" id="Conditionname">${el.name}</span>
    <span class="pop-val pred" id="effect">${el.effect}</span></div>`
    conditoin_display.insertAdjacentHTML('beforeend', conditionz_html);
    });

    

    //npc
    const npcs_display = document.getElementById('npcs_display')
    
    
    npcs.forEach(el => {

        const check_id = document.getElementById(el.id)
    if (check_id == null){
         const npc_pofile = `
        <div class="npc-card" onclick="openP('${el.id}')">
<div class="npc-av">${el.logo}</div>
<div class="npc-inf"><div class="npc-n">${el.name}</div><div class="npc-r">${el.role}</div></div>
<div class="npc-loy ${el.loyalty}">ภักดี ●</div>
<div class="npc-arr">›</div>
</div>`
        npcs_display.insertAdjacentHTML('beforeend', npc_pofile);

            const npc_detail_create = `
        <div class="popup-overlay" id="${el.id}"><div class="popup-sheet light">
<div class="popup-header"><div class="popup-title">${el.logo} ${el.name}</div><div class="popup-close" onclick="closeP('${el.id}')">✕</div></div>
<div class="popup-body">
<div class="know-lbl" id="${el.id + "familiarity"}">ระดับการรู้จัก — สนิท (${el.familiarity}/5)</div>
<div class="know-bar" id="${el.id + "familiarity_meter"}"></div>
<div class="pop-section"><div class="pop-st">ข้อมูลพื้นฐาน</div>
<div class="pop-row"><span class="pop-key">ตำแหน่ง</span><span class="pop-val">${el.role}</span></div>
<div class="pop-row"><span class="pop-key">อายุ</span><span class="pop-val">${el.age} ปี</span></div>
<div class="pop-row"><span class="pop-key">ตระกูล</span><span class="pop-val pgold">${el.clan}</span></div>
<div class="pop-row"><span class="pop-key">รูปลักษณ์</span><span class="pop-val">${el.appearance}</span></div>
</div>
<div class="pop-section"><div class="pop-st">ค่าสถานะ</div>
<div class="stat-grid">
<div class="stat-box"><div class="sb-lbl">การทหาร</div><div class="sb-v">${el.stats.military}</div><div class="sb-b"><div class="sb-bf" style="width:40%"></div></div></div>
<div class="stat-box"><div class="sb-lbl">ปัญญา</div><div class="sb-v">${el.stats.intelligence}</div><div class="sb-b"><div class="sb-bf" style="width:85%"></div></div></div>
<div class="stat-box"><div class="sb-lbl">การบริหาร</div><div class="sb-v">${el.stats.management}</div><div class="sb-b"><div class="sb-bf" style="width:75%"></div></div></div>
<div class="stat-box"><div class="sb-lbl">การทูต</div><div class="sb-v">${el.stats.diplomacy}</div><div class="sb-b"><div class="sb-bf" style="width:70%"></div></div></div>
</div>
</div>
<div class="pop-section"><div class="pop-st">Traits</div>
<span class="trait-b">${el.traits[0]}</span><span class="trait-b">${el.traits[1]}</span><span class="trait-b locked">🔒 Locked(ยังไม่เสร็จ)</span>
</div>
<div class="pop-section"><div class="pop-st">ประวัติ</div>
<p class="pop-text">${el.backstory}</p>

</div>
<div class="pop-section"><div class="pop-st">ความสัมพันธ์ (ยังไม่เสร็จ)</div>
<div class="rel-row"><div class="rel-dot f"></div><span class="rel-name">..</span><span class="rel-st f">..</span></div>
</div>
<div class="pop-section"><div class="pop-st">แรงจูงใจซ่อนเร้น (ยังไม่เสร็จ)</div>
<div class="locked-box"><p>🔒 .. </p></div>
</div>
</div>
</div>
</div>

`
const phone = document.getElementById('phone');
phone.insertAdjacentHTML('beforeend', npc_detail_create);
        } 
        document.querySelectorAll("#current_status").forEach(el =>{el.remove();});

const npc_detail_target =  document.querySelector(`#${el.id} .popup-sheet .popup-body`)
if (npc_detail_target){
    const current_npc_status  = `<div class="pop-section" id="current_status"><div class="pop-st">สถานะปัจจุบัน</div>
<div class="pop-row"><span class="pop-key">อารมณ์</span><span class="pop-val pgreen">${el.current_mood}</span></div>
<div class="pop-row"><span class="pop-key">คำร้อง</span><span class="pop-val pgold">${el.request}</span></div>
</div>
`

npc_detail_target.insertAdjacentHTML('beforeend', current_npc_status)
}

const familiarity_display =  document.getElementById(el.id + "familarity")
if (familiarity_display){
    familiarity_upd.innerHTML = `ระดับการรู้จัก — สนิท (${el.familiarity}/5)`;
}

const familiarity_meter = document.getElementById(el.id + "familiarity_meter")
if (familiarity_meter){
    meter = ''
    for (let i = 5 - Number(el.familiarity); i < 5; i++) {
        meter += '<div class="ks f"></div>'
        console.log(meter)
    }
    for (let i = Number(el.familiarity); i < 5; i++) {
        meter += '<div class="ks"></div>'
        console.log(meter)
    }
    
    familiarity_meter.innerHTML = meter
}

    })
        
    //narrative change
    loading_div.remove()
    
    if (error_div !== null){
        console.log(error_div)
        error_div.remove()
        
    } 
        const htmlString = `<div class="entry-ai">
    <div class="entry-label">⚔️ Game Master</div> 
    ${narrative}

    <div class="choice-btn custom" onclick="focusInput()"><span class="choice-key">✍️</span><span class="choice-text">จารึกคำสั่งเอง...</span></div>
    </div>
    </div>
    <div class="ornament">✦ · ✦ · ✦</div>`;
        chronicle.insertAdjacentHTML('beforeend', htmlString);
        console.log("success udate data")
}else if(loading_status !== undefined){
        console.log("loding")
        const loading_html = document.getElementById('loading')
        loading_html.innerHTML = `
<div class="entry-label">⚔️ Game Master</div>
<p class="entry-text"> ${loading_status} </p>`;
}

    else{
        console.log("has error")
        const error = respond.error
        console.log(error)
        loading_div.remove()
        const htmlerror = `<div class="entry-ai" id="errortage">
<div class="entry-label">⚔️ Game Master</div>
<p class="entry-text" id="error">${error} </p></div>`
chronicle.insertAdjacentHTML('beforeend', htmlerror);
    } 
    }
    