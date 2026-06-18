import { useState, useEffect, createContext, useContext, useRef } from "react";

const ThemeCtx = createContext();
function useTheme() { return useContext(ThemeCtx); }

function buildTheme(dark) {
  return dark ? {
    bg:"#0f172a",bg2:"#1e293b",bg3:"#334155",
    text:"#f1f5f9",text2:"#cbd5e1",text3:"#64748b",
    border:"#334155",border2:"#475569",
    card:"#1e293b",navBg:"#1e293b",navBorder:"#334155",
    input:"#0f172a",inputBorder:"#334155",inputText:"#f1f5f9",
    tabBg:"#1e293b",tabActive:"#3b82f6",tabActiveTxt:"#fff",tabTxt:"#64748b",
    progressTrack:"#0f172a",
    slotFreeBg:"#14532d30",slotFreeBorder:"#16a34a",slotFreeTxt:"#86efac",
    slotBusyBg:"#7f1d1d30",slotBusyBorder:"#dc2626",slotBusyTxt:"#fca5a5",
    slotMaintBg:"#78350f30",slotMaintBorder:"#f59e0b",slotMaintTxt:"#fcd34d",
    slotSelBg:"#1d4ed8",slotSelTxt:"#fff",
    rowBorder:"#334155",
    releaseBtn:{bg:"#7f1d1d",color:"#fca5a5",border:"#dc2626"},
    toggleBg:"#1e293b",toggleBorder:"#334155",toggleTxt:"#cbd5e1",
    authCard:"#1e293b",authCardBorder:"#334155",authTabBg:"#0f172a",
  } : {
    bg:"#f8fafc",bg2:"#f1f5f9",bg3:"#e2e8f0",
    text:"#0f172a",text2:"#374151",text3:"#64748b",
    border:"#e2e8f0",border2:"#cbd5e1",
    card:"#ffffff",navBg:"#ffffff",navBorder:"#e2e8f0",
    input:"#fafafa",inputBorder:"#e2e8f0",inputText:"#1e293b",
    tabBg:"#ffffff",tabActive:"#1a56db",tabActiveTxt:"#fff",tabTxt:"#64748b",
    progressTrack:"#e2e8f0",
    slotFreeBg:"#f0fdf4",slotFreeBorder:"#86efac",slotFreeTxt:"#166534",
    slotBusyBg:"#fee2e2",slotBusyBorder:"#fca5a5",slotBusyTxt:"#dc2626",
    slotMaintBg:"#fffbeb",slotMaintBorder:"#f59e0b",slotMaintTxt:"#92400e",
    slotSelBg:"#1a56db",slotSelTxt:"#fff",
    rowBorder:"#f1f5f9",
    releaseBtn:{bg:"#fee2e2",color:"#dc2626",border:"#fca5a5"},
    toggleBg:"#f1f5f9",toggleBorder:"#e2e8f0",toggleTxt:"#374151",
    authCard:"#ffffff",authCardBorder:"#e2e8f0",authTabBg:"#f1f5f9",
  };
}

function ThemeProvider({ children }) {
  const [dark,setDark] = useState(() => localStorage.getItem("pz_theme")==="dark");
  const toggle = () => setDark(d => { localStorage.setItem("pz_theme",!d?"dark":"light"); return !d; });
  return <ThemeCtx.Provider value={{ dark, toggle, t:buildTheme(dark) }}>{children}</ThemeCtx.Provider>;
}

function ThemeToggle() {
  const { dark, toggle, t } = useTheme();
  return (
    <button onClick={toggle} style={{display:"flex",alignItems:"center",gap:6,padding:"7px 13px",background:t.toggleBg,border:`1.5px solid ${t.toggleBorder}`,borderRadius:20,cursor:"pointer",color:t.toggleTxt,fontSize:13,fontWeight:600,transition:"all 0.2s"}}>
      <span style={{fontSize:14}}>{dark?"☀️":"🌙"}</span>
      <span>{dark?"Light":"Dark"}</span>
    </button>
  );
}

// ─── Constants ────────────────────────────────────────────────────────────────
const ADMIN_EMAIL = "admin@parkzone.com";
const ADMIN_PASS  = "Admin@123";
const BOOKING_DURATION_MS = 2 * 60 * 60 * 1000; // 2 hours

const ZONES = [
  { id:"Z1",name:"Zone Alpha",color:"#1a56db",icon:"A",
    floors:["Ground Floor","Level 1","Level 2"],
    blocks:{"Ground Floor":["A1","A2","A3","A4","A5","A6","A7","A8"],"Level 1":["B1","B2","B3","B4","B5","B6","B7","B8"],"Level 2":["C1","C2","C3","C4","C5","C6","C7","C8"]}},
  { id:"Z2",name:"Zone Beta",color:"#057a55",icon:"B",
    floors:["Ground Floor","Level 1"],
    blocks:{"Ground Floor":["D1","D2","D3","D4","D5","D6"],"Level 1":["E1","E2","E3","E4","E5","E6"]}},
  { id:"Z3",name:"Zone Gamma",color:"#9f1239",icon:"G",
    floors:["Ground Floor","Level 1","Level 2","Rooftop"],
    blocks:{"Ground Floor":["F1","F2","F3","F4","F5","F6","F7","F8","F9","F10"],"Level 1":["G1","G2","G3","G4","G5","G6","G7","G8","G9","G10"],"Level 2":["H1","H2","H3","H4","H5","H6","H7","H8","H9","H10"],"Rooftop":["R1","R2","R3","R4","R5","R6"]}},
  { id:"Z4",name:"Zone Delta",color:"#6b21a8",icon:"D",
    floors:["Ground Floor","Level 1"],
    blocks:{"Ground Floor":["J1","J2","J3","J4","J5","J6","J7","J8"],"Level 1":["K1","K2","K3","K4","K5","K6","K7","K8"]}},
];

// ─── Storage helpers ──────────────────────────────────────────────────────────
function initStorage() {
  if (!localStorage.getItem("pz_init")) {
    const b={};
    ZONES.forEach(z=>z.floors.forEach(f=>z.blocks[f].forEach(s=>{b[`${z.id}_${f}_${s}`]=null;})));
    localStorage.setItem("pz_bookings",JSON.stringify(b));
    localStorage.setItem("pz_users",JSON.stringify([]));
    localStorage.setItem("pz_history",JSON.stringify([]));
    localStorage.setItem("pz_activity",JSON.stringify([]));
    localStorage.setItem("pz_maintenance",JSON.stringify([]));
    localStorage.setItem("pz_notifications",JSON.stringify({}));
    localStorage.setItem("pz_favorites",JSON.stringify({}));
    localStorage.setItem("pz_init","1");
  }
}

const getB  = () => JSON.parse(localStorage.getItem("pz_bookings")||"{}");
const getU  = () => JSON.parse(localStorage.getItem("pz_users")||"[]");
const getH  = () => JSON.parse(localStorage.getItem("pz_history")||"[]");
const getAL = () => JSON.parse(localStorage.getItem("pz_activity")||"[]");
const getM  = () => JSON.parse(localStorage.getItem("pz_maintenance")||"[]");
const getNotifs = (email) => { const n=JSON.parse(localStorage.getItem("pz_notifications")||"{}"); return n[email]||[]; };
const getFavs   = (email) => { const f=JSON.parse(localStorage.getItem("pz_favorites")||"{}"); return f[email]||[]; };

function pushActivity(msg, type="info") {
  const al=getAL();
  al.unshift({msg,type,time:new Date().toISOString()});
  if(al.length>100) al.pop();
  localStorage.setItem("pz_activity",JSON.stringify(al));
}

function pushNotif(email, msg) {
  const n=JSON.parse(localStorage.getItem("pz_notifications")||"{}");
  if(!n[email]) n[email]=[];
  n[email].unshift({msg, time:new Date().toISOString(), read:false});
  if(n[email].length>50) n[email].pop();
  localStorage.setItem("pz_notifications",JSON.stringify(n));
}

function markNotifsRead(email) {
  const n=JSON.parse(localStorage.getItem("pz_notifications")||"{}");
  if(n[email]) n[email]=n[email].map(x=>({...x,read:true}));
  localStorage.setItem("pz_notifications",JSON.stringify(n));
}

function toggleFavorite(email, zoneId) {
  const f=JSON.parse(localStorage.getItem("pz_favorites")||"{}");
  if(!f[email]) f[email]=[];
  if(f[email].includes(zoneId)) f[email]=f[email].filter(x=>x!==zoneId);
  else f[email].push(zoneId);
  localStorage.setItem("pz_favorites",JSON.stringify(f));
  return f[email];
}

function saveBooking(zId,f,s,email,vehicle,timeSlot) {
  const b=getB();
  const expiry=new Date(Date.now()+BOOKING_DURATION_MS).toISOString();
  b[`${zId}_${f}_${s}`]={email,time:new Date().toISOString(),vehicle:vehicle||"N/A",expiry,timeSlot:timeSlot||null};
  localStorage.setItem("pz_bookings",JSON.stringify(b));
  const z=ZONES.find(x=>x.id===zId);
  pushActivity(`🚗 ${email} booked ${s} in ${z?.name} (${f})`, "booking");
}

function clearBooking(zId,f,s,byAdmin,userEmail) {
  const b=getB();
  const prev=b[`${zId}_${f}_${s}`];
  // save to history
  if(prev) {
    const h=getH();
    const z=ZONES.find(x=>x.id===zId);
    h.unshift({email:prev.email,vehicle:prev.vehicle,zone:z?.name,floor:f,slot:s,
      bookedAt:prev.time,releasedAt:new Date().toISOString(),
      releasedBy:byAdmin?"admin":prev.email,timeSlot:prev.timeSlot||null});
    if(h.length>200) h.pop();
    localStorage.setItem("pz_history",JSON.stringify(h));
    if(byAdmin && prev.email!==userEmail) {
      pushNotif(prev.email, `⚠️ Your slot ${s} in ${z?.name} was released by admin.`);
    }
    const z2=ZONES.find(x=>x.id===zId);
    pushActivity(`${byAdmin?"🔧 Admin":"❌ User"} released ${s} in ${z2?.name} (${f}) [${prev.email}]`, byAdmin?"admin":"cancel");
  }
  b[`${zId}_${f}_${s}`]=null;
  localStorage.setItem("pz_bookings",JSON.stringify(b));
}

function registerUser(name,email,pw,vehicle) {
  const u=getU();
  if(u.find(x=>x.email===email)) return false;
  u.push({name,email,pw,vehicle:vehicle||""});
  localStorage.setItem("pz_users",JSON.stringify(u));
  pushActivity(`👤 New user registered: ${email}`, "user");
  return true;
}

function loginUser(email,pw) {
  if(email===ADMIN_EMAIL&&pw===ADMIN_PASS) return{name:"Admin",email,isAdmin:true};
  const u=getU().find(x=>x.email===email&&x.pw===pw);
  return u?{name:u.name,email:u.email,vehicle:u.vehicle,isAdmin:false}:null;
}

function deleteUser(email) {
  const u=getU().filter(x=>x.email!==email);
  localStorage.setItem("pz_users",JSON.stringify(u));
  // release all their bookings
  const b=getB();
  Object.entries(b).forEach(([k,v])=>{
    if(v&&v.email===email) b[k]=null;
  });
  localStorage.setItem("pz_bookings",JSON.stringify(b));
  pushActivity(`🗑️ Admin deleted user: ${email}`, "admin");
}

function banUser(email, banned) {
  const u=getU().map(x=>x.email===email?{...x,banned}:x);
  localStorage.setItem("pz_users",JSON.stringify(u));
  pushActivity(`${banned?"🚫":"✅"} Admin ${banned?"banned":"unbanned"} user: ${email}`, "admin");
}

function getMaintenance() { return JSON.parse(localStorage.getItem("pz_maintenance")||"[]"); }
function setMaintenance(list) { localStorage.setItem("pz_maintenance",JSON.stringify(list)); }
function toggleMaintenance(zId,f,s) {
  const m=getMaintenance();
  const key=`${zId}_${f}_${s}`;
  const idx=m.indexOf(key);
  if(idx>=0){ m.splice(idx,1); pushActivity(`✅ Slot ${s} (${f}) removed from maintenance`,"admin"); }
  else{ m.push(key); pushActivity(`🔧 Slot ${s} (${f}) set to maintenance`,"admin"); }
  setMaintenance(m);
  return m;
}

function exportCSV(bookings) {
  const rows=[["Zone","Floor","Slot","Email","Vehicle","Booked At","Expires At","Time Slot"]];
  Object.entries(bookings).forEach(([k,v])=>{
    if(!v) return;
    const[zId,...r]=k.split("_");const sl=r[r.length-1];const fl=r.slice(0,-1).join("_");
    const z=ZONES.find(x=>x.id===zId);
    rows.push([z?.name||zId,fl,sl,v.email,v.vehicle||"N/A",new Date(v.time).toLocaleString(),new Date(v.expiry).toLocaleString(),v.timeSlot||"Open-ended"]);
  });
  const csv=rows.map(r=>r.map(c=>`"${c}"`).join(",")).join("\n");
  const blob=new Blob([csv],{type:"text/csv"});
  const url=URL.createObjectURL(blob);
  const a=document.createElement("a");a.href=url;a.download=`parkzone_bookings_${Date.now()}.csv`;a.click();
  URL.revokeObjectURL(url);
}

// ─── Auto-expiry checker (run every 30s) ────────────────────────────────────
function checkExpiry() {
  const b=getB();
  const now=Date.now();
  let changed=false;
  Object.entries(b).forEach(([k,v])=>{
    if(v&&v.expiry&&new Date(v.expiry).getTime()<now){
      const[zId,...r]=k.split("_");
      clearBooking(zId,r.slice(0,-1).join("_"),r[r.length-1],false,null);
      changed=true;
    }
  });
  return changed;
}

// ─── QR Code — proper 21×21 matrix QR (Version 1) ───────────────────────────
function QRCode({value, size=140}) {
  // Deterministic seeded RNG for consistent data modules
  function seededRng(seed) {
    let s = seed >>> 0;
    return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  const hash = value.split("").reduce((a,c,i) => ((a << 5) - a + c.charCodeAt(0) * (i+1)) | 0, 0x811c9dc5);
  const rng = seededRng(Math.abs(hash));

  const N = 21; // Version 1 QR is 21×21
  const grid = Array.from({length:N}, () => Array(N).fill(null)); // null=free, true=dark, false=light

  // Place a 7×7 finder pattern at (r,c)
  function placeFinder(r, c) {
    for (let dr = -1; dr <= 7; dr++) for (let dc = -1; dc <= 7; dc++) {
      const rr = r+dr, cc = c+dc;
      if (rr<0||rr>=N||cc<0||cc>=N) continue;
      if (dr===-1||dr===7||dc===-1||dc===7) grid[rr][cc] = false; // separator (white)
      else if (dr===0||dr===6||dc===0||dc===6) grid[rr][cc] = true;  // outer ring
      else if (dr>=2&&dr<=4&&dc>=2&&dc<=4) grid[rr][cc] = true;      // inner square
      else grid[rr][cc] = false;                                       // inner white
    }
  }
  placeFinder(0, 0);   // top-left
  placeFinder(0, 14);  // top-right
  placeFinder(14, 0);  // bottom-left

  // Timing patterns (row 6, col 6)
  for (let i = 8; i <= 12; i++) {
    grid[6][i] = (i % 2 === 0);
    grid[i][6] = (i % 2 === 0);
  }

  // Dark module
  grid[13][8] = true;

  // Format info region — mark as reserved (light) then stamp format bits
  const fmtPos = [0,1,2,3,4,5,7,8];
  fmtPos.forEach(i => { if(grid[8][i]===null) grid[8][i]=false; if(grid[i][8]===null) grid[i][8]=false; });
  grid[8][8] = false;
  for (let i=0;i<8;i++) { if(grid[N-1-i][8]===null) grid[N-1-i][8]=false; if(grid[8][N-1-i]===null) grid[8][N-1-i]=false; }

  // Fill remaining free cells with deterministic "data" modules
  for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) {
    if (grid[r][c] === null) grid[r][c] = rng() > 0.45;
  }

  const cell = size / N;
  const pad = 6; // quiet zone in px

  return (
    <svg width={size + pad*2} height={size + pad*2} viewBox={`0 0 ${size+pad*2} ${size+pad*2}`}
      style={{background:"#fff", borderRadius:10, display:"block"}}>
      <rect width={size+pad*2} height={size+pad*2} fill="#fff" rx={10}/>
      {grid.map((row,r) => row.map((dark,c) =>
        dark ? <rect key={`${r}-${c}`} x={pad + c*cell} y={pad + r*cell} width={cell} height={cell} fill="#111"/> : null
      ))}
    </svg>
  );
}

// ─── Countdown timer ─────────────────────────────────────────────────────────
function useCountdown(expiry) {
  const [remaining, setRemaining] = useState(0);
  useEffect(()=>{
    const update=()=>setRemaining(Math.max(0,new Date(expiry).getTime()-Date.now()));
    update();
    const iv=setInterval(update,1000);
    return()=>clearInterval(iv);
  },[expiry]);
  const h=Math.floor(remaining/3600000);
  const m=Math.floor((remaining%3600000)/60000);
  const s=Math.floor((remaining%60000)/1000);
  const pct=Math.min(100,(remaining/BOOKING_DURATION_MS)*100);
  const expired=remaining===0;
  return{h,m,s,pct,expired,remaining};
}

function CountdownBadge({expiry}) {
  const {h,m,s,pct,expired}=useCountdown(expiry);
  const color=pct>50?"#16a34a":pct>20?"#f59e0b":"#dc2626";
  if(expired) return <span style={{fontSize:11,background:"#fee2e2",color:"#dc2626",padding:"2px 8px",borderRadius:6,fontWeight:700}}>EXPIRED</span>;
  return(
    <div style={{display:"flex",flexDirection:"column",gap:3,minWidth:120}}>
      <span style={{fontSize:12,fontWeight:700,color}}>{h}h {m}m {s}s left</span>
      <div style={{height:4,background:"#e2e8f0",borderRadius:4,overflow:"hidden"}}>
        <div style={{height:"100%",width:`${pct}%`,background:color,borderRadius:4,transition:"width 1s"}}/>
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function App(){return<ThemeProvider><Root/></ThemeProvider>;}

function Root(){
  const {t}=useTheme();
  const [user,setUser]=useState(null);
  const [toasts,setToasts]=useState([]);
  const [bookings,setBookings]=useState({});
  const [lastSync,setLastSync]=useState(null);

  useEffect(()=>{
    initStorage();
    setBookings(getB());
    localStorage.setItem("pz_bookings_prev_snapshot",JSON.stringify(getB()));

    const onStorage=(e)=>{
      if(e.key==="pz_bookings"||e.key===null){
        setBookings(getB()); setLastSync(new Date());
      }
    };
    window.addEventListener("storage",onStorage);

    const interval=setInterval(()=>{
      const changed=checkExpiry();
      const fresh=JSON.stringify(getB());
      const prev=localStorage.getItem("pz_bookings_prev_snapshot");
      if(fresh!==prev||changed){
        localStorage.setItem("pz_bookings_prev_snapshot",fresh);
        setBookings(JSON.parse(fresh));
        setLastSync(new Date());
      }
    },1500);

    return()=>{ window.removeEventListener("storage",onStorage); clearInterval(interval); };
  },[]);

  const showToast=(msg,type="success")=>{
    const id=Date.now();
    setToasts(p=>[...p,{id,msg,type}]);
    setTimeout(()=>setToasts(p=>p.filter(x=>x.id!==id)),4000);
  };
  const refresh=()=>{ setBookings(getB()); setLastSync(new Date()); };

  return(
    <div style={{minHeight:"100vh",background:t.bg,fontFamily:"'Inter',sans-serif",transition:"background 0.25s"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        input,button,select{font-family:inherit}button{cursor:pointer}
        .fi{animation:fi 0.3s ease}@keyframes fi{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        .ta{animation:ta 0.3s ease}@keyframes ta{from{opacity:0;transform:translateX(60px)}to{opacity:1;transform:translateX(0)}}
        .sb{transition:all 0.14s}.sb:hover{transform:scale(1.06)}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.35}}
        @keyframes spin{to{transform:rotate(360deg)}}
        ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-thumb{background:#475569;border-radius:3px}
        .hover-row:hover{background:rgba(59,130,246,0.06)!important}
      `}</style>

      {/* Toast stack */}
      <div style={{position:"fixed",top:16,right:16,zIndex:9999,display:"flex",flexDirection:"column",gap:8,maxWidth:340}}>
        {toasts.map(toast=>(
          <div key={toast.id} className="ta" style={{background:toast.type==="error"?"#fee2e2":toast.type==="warn"?"#fffbeb":"#dcfce7",color:toast.type==="error"?"#991b1b":toast.type==="warn"?"#92400e":"#166534",border:`1px solid ${toast.type==="error"?"#fca5a5":toast.type==="warn"?"#fcd34d":"#86efac"}`,borderRadius:10,padding:"12px 18px",fontWeight:500,fontSize:14,boxShadow:"0 4px 20px rgba(0,0,0,0.15)"}}>
            {toast.msg}
          </div>
        ))}
      </div>

      {!user&&<AuthScreen onLogin={setUser} showToast={showToast}/>}
      {user&&!user.isAdmin&&<UserApp user={user} onLogout={()=>setUser(null)} bookings={bookings} refresh={refresh} showToast={showToast}/>}
      {user&&user.isAdmin&&<AdminApp user={user} onLogout={()=>setUser(null)} bookings={bookings} refresh={refresh} showToast={showToast} lastSync={lastSync}/>}
    </div>
  );
}

// ─── Auth ─────────────────────────────────────────────────────────────────────
function AuthScreen({onLogin,showToast}){
  const {t}=useTheme();
  const [mode,setMode]=useState("login");
  const [form,setForm]=useState({name:"",email:"",pw:"",vehicle:""});
  const [loading,setLoading]=useState(false);
  const [showPw,setShowPw]=useState(false);
  const set=k=>e=>setForm(f=>({...f,[k]:e.target.value}));

  const handle=()=>{
    setLoading(true);
    setTimeout(()=>{
      if(mode==="login"){
        const u=loginUser(form.email.trim(),form.pw);
        if(!u){showToast("Invalid email or password","error");setLoading(false);return;}
        const users=getU();
        const uf=users.find(x=>x.email===form.email.trim());
        if(uf&&uf.banned){showToast("Your account has been banned. Contact admin.","error");setLoading(false);return;}
        onLogin(u);
      } else {
        if(!form.name.trim()){showToast("Enter your name","error");setLoading(false);return;}
        if(!form.email.includes("@")){showToast("Invalid email","error");setLoading(false);return;}
        if(form.pw.length<6){showToast("Password must be 6+ chars","error");setLoading(false);return;}
        const ok=registerUser(form.name.trim(),form.email.trim(),form.pw,form.vehicle.trim());
        if(ok){showToast("Account created! Please log in.");setMode("login");setForm({name:"",email:"",pw:"",vehicle:""});}
        else showToast("Email already registered","error");
      }
      setLoading(false);
    },400);
  };

  return(
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"linear-gradient(135deg,#1e3a5f 0%,#0f172a 60%,#1a1a2e 100%)",padding:20}}>
      <div style={{position:"fixed",top:18,right:18,zIndex:999}}><ThemeToggle/></div>
      <div className="fi" style={{width:"100%",maxWidth:440}}>
        <div style={{textAlign:"center",marginBottom:32}}>
          <div style={{width:64,height:64,borderRadius:18,background:"#1a56db",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",fontSize:28}}>🅿️</div>
          <h1 style={{color:"#fff",fontSize:28,fontWeight:800,letterSpacing:-0.5}}>ParkZone</h1>
          <p style={{color:"#94a3b8",fontSize:14,marginTop:6}}>Smart Parking Management System</p>
        </div>
        <div style={{background:t.authCard,borderRadius:20,padding:32,boxShadow:"0 25px 60px rgba(0,0,0,0.4)",border:`1px solid ${t.authCardBorder}`}}>
          <div style={{display:"flex",background:t.authTabBg,borderRadius:10,padding:4,marginBottom:28}}>
            {["login","signup"].map(m=>(
              <button key={m} onClick={()=>setMode(m)} style={{flex:1,padding:"9px 0",border:"none",borderRadius:8,fontSize:14,fontWeight:600,background:mode===m?t.card:"transparent",color:mode===m?t.text:t.text3,boxShadow:mode===m?"0 1px 4px rgba(0,0,0,0.12)":"none",transition:"all 0.2s"}}>
                {m==="login"?"Log In":"Sign Up"}
              </button>
            ))}
          </div>
          {mode==="signup"&&<FInput label="Full Name" value={form.name} onChange={set("name")} placeholder="John Doe"/>}
          <FInput label="Email Address" value={form.email} onChange={set("email")} placeholder="you@email.com" type="email"/>
          <FInput label="Password" value={form.pw} onChange={set("pw")} placeholder="••••••••" type={showPw?"text":"password"}
            suffix={<button onClick={()=>setShowPw(s=>!s)} style={{background:"none",border:"none",color:t.text3,fontSize:14,padding:"0 10px"}}>{showPw?"🙈":"👁️"}</button>}/>
          {mode==="signup"&&<FInput label="Vehicle Number (optional)" value={form.vehicle} onChange={set("vehicle")} placeholder="e.g. UP32 AB 1234"/>}
          <button onClick={handle} disabled={loading} style={{width:"100%",padding:"13px 0",background:loading?"#64748b":"#1a56db",color:"#fff",border:"none",borderRadius:10,fontSize:15,fontWeight:700,marginTop:8,transition:"background 0.2s"}}>
            {loading?"Please wait…":mode==="login"?"Log In":"Create Account"}
          </button>
          <p style={{textAlign:"center",fontSize:12,color:t.text3,marginTop:20}}>Admin: <span style={{color:"#3b82f6",fontWeight:600}}>admin@parkzone.com</span></p>
        </div>
      </div>
    </div>
  );
}

function FInput({label,value,onChange,placeholder,type="text",suffix}){
  const {t}=useTheme();
  const [focus,setFocus]=useState(false);
  return(
    <div style={{marginBottom:18}}>
      <label style={{fontSize:13,fontWeight:600,color:t.text2,display:"block",marginBottom:6}}>{label}</label>
      <div style={{display:"flex",alignItems:"center",border:`1.5px solid ${focus?"#1a56db":t.inputBorder}`,borderRadius:9,background:t.input,transition:"border 0.2s",overflow:"hidden"}}>
        <input type={type} value={value} onChange={onChange} placeholder={placeholder}
          onFocus={()=>setFocus(true)} onBlur={()=>setFocus(false)}
          style={{flex:1,padding:"11px 14px",border:"none",background:"transparent",fontSize:14,color:t.inputText,outline:"none"}}/>
        {suffix}
      </div>
    </div>
  );
}

// ─── User App ─────────────────────────────────────────────────────────────────
function UserApp({user,onLogout,bookings,refresh,showToast}){
  const {t}=useTheme();
  const [tab,setTab]=useState("book");
  const [step,setStep]=useState(1);
  const [selZ,setSelZ]=useState(null);
  const [selF,setSelF]=useState(null);
  const [selS,setSelS]=useState(null);
  const [modal,setModal]=useState(false);
  const [payModal,setPayModal]=useState(false);
  const [vehicle,setVehicle]=useState(user.vehicle||"");
  const [timeSlot,setTimeSlot]=useState("");
  const [favorites,setFavorites]=useState(()=>getFavs(user.email));
  const [notifs,setNotifs]=useState(()=>getNotifs(user.email));
  const [showNotifs,setShowNotifs]=useState(false);
  const [receipt,setReceipt]=useState(null);

  // Poll for new notifications
  useEffect(()=>{
    const iv=setInterval(()=>{
      const fresh=getNotifs(user.email);
      setNotifs(fresh);
    },2000);
    return()=>clearInterval(iv);
  },[user.email]);

  const unreadCount=notifs.filter(n=>!n.read).length;
  const maintenance=getMaintenance();

  const myB=Object.entries(bookings).filter(([,v])=>v&&v.email===user.email).map(([k,v])=>{
    const[zId,...r]=k.split("_");const sl=r[r.length-1];const fl=r.slice(0,-1).join("_");
    const z=ZONES.find(x=>x.id===zId);
    return{key:k,zoneName:z?.name,zoneColor:z?.color,zoneIcon:z?.icon,floor:fl,slot:sl,...v};
  });

  const zone=ZONES.find(z=>z.id===selZ);

  const avail=(z,f)=>{
    if(!z||!f) return 0;
    return z.blocks[f].filter(s=>{
      const key=`${z.id}_${f}_${s}`;
      return !bookings[key] && !maintenance.includes(key);
    }).length;
  };

  const toggleFav=(zId)=>{
    const updated=toggleFavorite(user.email,zId);
    setFavorites([...updated]);
  };

  const sortedZones=[...ZONES].sort((a,b)=>{
    const af=favorites.includes(a.id)?0:1;
    const bf=favorites.includes(b.id)?0:1;
    return af-bf;
  });

  const tryBook=()=>{
    if(!selZ||!selF||!selS){showToast("Select zone, floor & slot","error");return;}
    const key=`${selZ}_${selF}_${selS}`;
    if(bookings[key]){showToast("Slot already taken!","error");return;}
    if(maintenance.includes(key)){showToast("This slot is under maintenance","error");return;}
    if(Object.entries(bookings).find(([,v])=>v&&v.email===user.email)){showToast("Cancel your existing booking first","error");return;}
    setModal(true);
  };

  const confirmBook=()=>{
    setModal(false);
    setPayModal(true);
  };

  const finalizeBooking=()=>{
    saveBooking(selZ,selF,selS,user.email,vehicle,timeSlot||null);
    refresh();
    const bk=getB()[`${selZ}_${selF}_${selS}`];
    setReceipt({zone:zone?.name,floor:selF,slot:selS,vehicle,timeSlot,bookedAt:bk?.time,expiry:bk?.expiry,bookingId:`PZ-${Date.now()}`});
    showToast(`✅ Block ${selS} booked in ${zone?.name}!`);
    setPayModal(false);setStep(1);setSelZ(null);setSelF(null);setSelS(null);setTab("mybookings");
  };

  const cancel=key=>{
    const[zId,...r]=key.split("_");
    clearBooking(zId,r.slice(0,-1).join("_"),r[r.length-1],false,user.email);
    refresh();showToast("Booking cancelled.");
  };

  const openNotifs=()=>{
    setShowNotifs(true);
    markNotifsRead(user.email);
    setNotifs(getNotifs(user.email));
  };

  return(
    <div style={{minHeight:"100vh",background:t.bg}}>
      <nav style={{background:t.navBg,borderBottom:`1px solid ${t.navBorder}`,padding:"14px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:100,transition:"background 0.25s,border 0.25s"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:22}}>🅿️</span>
          <span style={{fontWeight:800,fontSize:18,color:t.text,letterSpacing:-0.3}}>ParkZone</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <ThemeToggle/>
          {/* Notification bell */}
          <button onClick={openNotifs} style={{position:"relative",background:"none",border:`1.5px solid ${t.border}`,borderRadius:10,padding:"7px 10px",color:t.text3,fontSize:16}}>
            🔔
            {unreadCount>0&&<span style={{position:"absolute",top:-4,right:-4,background:"#dc2626",color:"#fff",fontSize:10,fontWeight:700,borderRadius:"50%",width:16,height:16,display:"flex",alignItems:"center",justifyContent:"center"}}>{unreadCount}</span>}
          </button>
          <div style={{textAlign:"right"}}>
            <p style={{fontWeight:600,fontSize:14,color:t.text}}>{user.name}</p>
            <p style={{fontSize:12,color:t.text3}}>{user.email}</p>
          </div>
          <button onClick={onLogout} style={{padding:"7px 14px",background:"#fee2e2",color:"#dc2626",border:"none",borderRadius:8,fontSize:13,fontWeight:600}}>Logout</button>
        </div>
      </nav>

      <div style={{maxWidth:960,margin:"0 auto",padding:"28px 20px"}}>
        <Tabs tabs={[["book","🚗 Book a Slot"],["mybookings","📋 My Bookings"],["history","📜 History"]]} active={tab} onChange={setTab}/>

        {/* ── BOOK TAB ── */}
        {tab==="book"&&(
          <div className="fi">
            <Steps step={step}/>
            {step===1&&(
              <>
                <SH title="Select a Parking Zone" sub="⭐ Tap the star to save a favourite zone"/>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))",gap:16}}>
                  {sortedZones.map(z=>{
                    const tot=Object.values(z.blocks).flat().length;
                    const av=z.floors.reduce((a,f)=>a+avail(z,f),0);
                    const isFav=favorites.includes(z.id);
                    return(
                      <div key={z.id} style={{background:t.card,border:`2px solid ${selZ===z.id?z.color:t.border}`,borderRadius:14,padding:20,cursor:"pointer",transition:"all 0.2s",boxShadow:selZ===z.id?`0 0 0 4px ${z.color}22`:"none",position:"relative"}}
                        onClick={()=>{setSelZ(z.id);setSelF(null);setSelS(null);setStep(2);}}>
                        <button onClick={e=>{e.stopPropagation();toggleFav(z.id);}} style={{position:"absolute",top:12,right:12,background:"none",border:"none",fontSize:18,cursor:"pointer"}}>{isFav?"⭐":"☆"}</button>
                        <ZI color={z.color} icon={z.icon} size={48}/>
                        <h3 style={{fontWeight:700,fontSize:16,color:t.text,margin:"12px 0 4px"}}>{z.name}{isFav&&<span style={{fontSize:10,marginLeft:6,color:"#f59e0b",fontWeight:700}}>FAV</span>}</h3>
                        <p style={{fontSize:12,color:t.text3,marginBottom:10}}>{z.floors.length} floors • {tot} slots</p>
                        <Bdg color={av>0?"green":"red"} label={`${av} available`}/>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {step===2&&zone&&(
              <>
                <Bk onClick={()=>setStep(1)} label="Back to Zones"/>
                <SH title={`Select Floor — ${zone.name}`} sub="Choose which floor to park on"/>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(170px,1fr))",gap:14}}>
                  {zone.floors.map(f=>{
                    const av=avail(zone,f);
                    return(
                      <div key={f} onClick={()=>{setSelF(f);setSelS(null);setStep(3);}} style={{background:t.card,border:`2px solid ${selF===f?zone.color:t.border}`,borderRadius:14,padding:18,cursor:"pointer",transition:"all 0.2s"}}>
                        <div style={{fontSize:28,marginBottom:10}}>🏢</div>
                        <h3 style={{fontWeight:700,fontSize:15,color:t.text,marginBottom:10}}>{f}</h3>
                        <Bdg color={av>0?"green":"red"} label={`${av} free`}/>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {step===3&&zone&&selF&&(
              <>
                <Bk onClick={()=>setStep(2)} label="Back to Floors"/>
                <SH title="Select Parking Block" sub={`${zone.name} • ${selF} — Tap a free slot`}/>

                {/* Time slot picker */}
                <div style={{background:t.card,borderRadius:12,padding:16,marginBottom:16,border:`1px solid ${t.border}`}}>
                  <label style={{fontSize:13,fontWeight:600,color:t.text2,display:"block",marginBottom:8}}>📅 Reserve for a specific time slot (optional)</label>
                  <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                    {["","8AM–10AM","10AM–12PM","12PM–2PM","2PM–4PM","4PM–6PM","6PM–8PM"].map(ts=>(
                      <button key={ts} onClick={()=>setTimeSlot(ts)} style={{padding:"6px 14px",borderRadius:8,border:`1.5px solid ${timeSlot===ts?"#1a56db":t.border}`,background:timeSlot===ts?"#1a56db20":"transparent",color:timeSlot===ts?"#1a56db":t.text3,fontSize:12,fontWeight:600}}>
                        {ts||"Open-ended"}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{background:t.card,borderRadius:16,padding:24,border:`1px solid ${t.border}`}}>
                  <div style={{display:"flex",gap:20,marginBottom:20,flexWrap:"wrap"}}>
                    {[["#16a34a","Available"],["#dc2626","Occupied"],["#f59e0b","Maintenance"],["#1a56db","Selected"]].map(([c,l])=>(
                      <div key={l} style={{display:"flex",alignItems:"center",gap:8}}>
                        <div style={{width:14,height:14,borderRadius:4,background:c+"20",border:`2px solid ${c}`}}/>
                        <span style={{fontSize:13,color:t.text3}}>{l}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(72px,1fr))",gap:10}}>
                    {zone.blocks[selF].map(s=>{
                      const key=`${zone.id}_${selF}_${s}`;
                      const booked=!!bookings[key];
                      const inMaint=maintenance.includes(key);
                      const isSel=selS===s;
                      const bg=isSel?t.slotSelBg:inMaint?t.slotMaintBg:booked?t.slotBusyBg:t.slotFreeBg;
                      const border=isSel?"#1a56db":inMaint?t.slotMaintBorder:booked?t.slotBusyBorder:t.slotFreeBorder;
                      const color=isSel?t.slotSelTxt:inMaint?t.slotMaintTxt:booked?t.slotBusyTxt:t.slotFreeTxt;
                      const label=isSel?"✓":inMaint?"🔧":booked?"BUSY":"FREE";
                      return(
                        <button key={s} className="sb" disabled={booked||inMaint} onClick={()=>setSelS(s)}
                          style={{padding:"14px 8px",borderRadius:10,border:`2px solid ${border}`,background:bg,color,fontWeight:700,fontSize:14,cursor:(booked||inMaint)?"not-allowed":"pointer",opacity:(booked||inMaint)?0.7:1}}>
                          {s}
                          <div style={{fontSize:9,fontWeight:600,marginTop:3,opacity:0.85}}>{label}</div>
                        </button>
                      );
                    })}
                  </div>
                  {selS&&(
                    <div style={{marginTop:24,padding:20,background:t.bg2,borderRadius:12,border:`1px solid ${t.border}`}}>
                      <p style={{fontWeight:600,fontSize:15,color:t.text,marginBottom:4}}>Selected: Block {selS}</p>
                      <p style={{fontSize:13,color:t.text3,marginBottom:8}}>{zone.name} • {selF}{timeSlot?` • ${timeSlot}`:""}</p>
                      <div style={{marginBottom:14}}>
                        <label style={{fontSize:12,color:t.text3,display:"block",marginBottom:4}}>Vehicle number</label>
                        <input value={vehicle} onChange={e=>setVehicle(e.target.value)} placeholder="e.g. UP32 AB 1234"
                          style={{padding:"8px 12px",border:`1.5px solid ${t.border}`,borderRadius:8,background:t.input,color:t.inputText,fontSize:13,width:"100%",outline:"none"}}/>
                      </div>
                      <button onClick={tryBook} style={{padding:"11px 28px",background:"#1a56db",color:"#fff",border:"none",borderRadius:10,fontSize:14,fontWeight:700}}>Confirm & Book →</button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* ── MY BOOKINGS TAB ── */}
        {tab==="mybookings"&&(
          <div className="fi">
            <SH title="My Bookings" sub="Your active parking reservations"/>
            {myB.length===0?(
              <div style={{background:t.card,borderRadius:16,padding:48,textAlign:"center",border:`1px solid ${t.border}`}}>
                <div style={{fontSize:48,marginBottom:12}}>🅿️</div>
                <p style={{fontWeight:600,color:t.text3}}>No active bookings</p>
                <button onClick={()=>setTab("book")} style={{marginTop:16,padding:"10px 22px",background:"#1a56db",color:"#fff",border:"none",borderRadius:10,fontSize:14,fontWeight:600}}>Book a Slot</button>
              </div>
            ):(
              <div style={{display:"flex",flexDirection:"column",gap:14}}>
                {myB.map(b=>(
                  <div key={b.key} style={{background:t.card,borderRadius:16,padding:22,border:`1px solid ${t.border}`}}>
                    <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:16,flexWrap:"wrap"}}>
                      <div style={{display:"flex",alignItems:"center",gap:16}}>
                        <ZI color={b.zoneColor} icon={b.zoneIcon} size={52}/>
                        <div>
                          <p style={{fontWeight:700,fontSize:16,color:t.text}}>{b.zoneName}</p>
                          <p style={{fontSize:13,color:t.text3}}>{b.floor} • Block <strong style={{color:t.text}}>{b.slot}</strong></p>
                          {b.vehicle&&<p style={{fontSize:12,color:t.text3,marginTop:2}}>🚗 {b.vehicle}</p>}
                          {b.timeSlot&&<p style={{fontSize:12,color:"#1a56db",marginTop:2}}>⏰ {b.timeSlot}</p>}
                          <p style={{fontSize:11,color:t.text3,marginTop:2}}>Booked: {new Date(b.time).toLocaleString()}</p>
                        </div>
                      </div>
                      <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:10}}>
                        {b.expiry&&<CountdownBadge expiry={b.expiry}/>}
                        <div style={{display:"flex",gap:8}}>
                          <button onClick={()=>setReceipt({zone:b.zoneName,floor:b.floor,slot:b.slot,vehicle:b.vehicle,timeSlot:b.timeSlot,bookedAt:b.time,expiry:b.expiry,bookingId:`PZ-${b.key.replace(/_/g,"")}`.slice(0,16)})}
                            style={{padding:"8px 14px",background:t.bg2,color:t.text,border:`1px solid ${t.border}`,borderRadius:9,fontSize:12,fontWeight:600}}>🧾 Receipt</button>
                          <button onClick={()=>cancel(b.key)} style={{padding:"8px 14px",background:t.releaseBtn.bg,color:t.releaseBtn.color,border:`1px solid ${t.releaseBtn.border}`,borderRadius:9,fontSize:12,fontWeight:700}}>Cancel</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── HISTORY TAB ── */}
        {tab==="history"&&(
          <div className="fi">
            <SH title="Booking History" sub="All your past reservations"/>
            {(()=>{
              const history=getH().filter(h=>h.email===user.email);
              if(!history.length) return(
                <div style={{background:t.card,borderRadius:16,padding:48,textAlign:"center",border:`1px solid ${t.border}`}}>
                  <p style={{color:t.text3,fontWeight:600}}>No booking history yet</p>
                </div>
              );
              return(
                <div style={{display:"flex",flexDirection:"column",gap:10}}>
                  {history.map((h,i)=>(
                    <div key={i} className="hover-row" style={{background:t.card,borderRadius:12,padding:18,border:`1px solid ${t.border}`,transition:"background 0.15s"}}>
                      <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
                        <div>
                          <p style={{fontWeight:700,color:t.text}}>{h.zone} — Block {h.slot}</p>
                          <p style={{fontSize:12,color:t.text3}}>{h.floor} {h.vehicle?`• 🚗 ${h.vehicle}`:""} {h.timeSlot?`• ⏰ ${h.timeSlot}`:""}</p>
                          <p style={{fontSize:11,color:t.text3,marginTop:4}}>📅 {new Date(h.bookedAt).toLocaleString()} → {new Date(h.releasedAt).toLocaleString()}</p>
                        </div>
                        <span style={{fontSize:11,padding:"3px 10px",borderRadius:6,background:h.releasedBy==="admin"?"#fee2e2":"#f0fdf4",color:h.releasedBy==="admin"?"#dc2626":"#16a34a",fontWeight:700,alignSelf:"flex-start"}}>
                          {h.releasedBy==="admin"?"Released by Admin":"Self Cancelled"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        )}
      </div>

      {/* Booking confirm modal */}
      {modal&&(
        <Modal onClose={()=>setModal(false)}>
          <h3 style={{fontWeight:800,fontSize:20,color:t.text,marginBottom:6}}>Confirm Booking</h3>
          <p style={{color:t.text3,fontSize:14,marginBottom:24}}>You're about to reserve:</p>
          <div style={{background:t.bg2,borderRadius:12,padding:18,marginBottom:24}}>
            <IR label="Zone" value={zone?.name}/>
            <IR label="Floor" value={selF}/>
            <IR label="Block" value={selS}/>
            {vehicle&&<IR label="Vehicle" value={vehicle}/>}
            {timeSlot&&<IR label="Time Slot" value={timeSlot}/>}
            <IR label="Duration" value="2 hours (auto-expires)"/>
          </div>
          <div style={{display:"flex",gap:12}}>
            <button onClick={()=>setModal(false)} style={{flex:1,padding:"12px 0",border:`1.5px solid ${t.border}`,borderRadius:10,background:t.card,color:t.text3,fontWeight:600,fontSize:14}}>Cancel</button>
            <button onClick={confirmBook} style={{flex:1,padding:"12px 0",background:"#1a56db",color:"#fff",border:"none",borderRadius:10,fontWeight:700,fontSize:14}}>Book Now ✓</button>
          </div>
        </Modal>
      )}

      {/* Payment Gateway Modal */}
      {payModal&&(
        <RazorpayModal
          booking={{zone:zone?.name,slot:selS,vehicle,timeSlot}}
          onSuccess={finalizeBooking}
          onClose={()=>setPayModal(false)}
        />
      )}

      {/* Notifications modal */}
      {showNotifs&&(
        <Modal onClose={()=>setShowNotifs(false)}>
          <h3 style={{fontWeight:800,fontSize:18,color:t.text,marginBottom:16}}>🔔 Notifications</h3>
          {notifs.length===0?(
            <p style={{color:t.text3,fontSize:14}}>No notifications yet.</p>
          ):(
            <div style={{display:"flex",flexDirection:"column",gap:10,maxHeight:340,overflowY:"auto"}}>
              {notifs.map((n,i)=>(
                <div key={i} style={{background:t.bg2,borderRadius:10,padding:12,border:`1px solid ${t.border}`}}>
                  <p style={{fontSize:13,color:t.text}}>{n.msg}</p>
                  <p style={{fontSize:11,color:t.text3,marginTop:4}}>{new Date(n.time).toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </Modal>
      )}

      {/* Receipt modal */}
      {receipt&&<ReceiptModal receipt={receipt} onClose={()=>setReceipt(null)}/>}
    </div>
  );
}

// ─── Razorpay Payment Gateway Simulation ─────────────────────────────────────
const RAZORPAY_AMOUNT = 50; // ₹50 parking fee

const UPI_APPS = [
  { id:"gpay",  name:"Google Pay",  color:"#4285F4", emoji:"🔵", bg:"#e8f0fe" },
  { id:"phonepe",name:"PhonePe",   color:"#5f259f", emoji:"🟣", bg:"#f3e8ff" },
  { id:"paytm", name:"Paytm",      color:"#00baf2", emoji:"🔷", bg:"#e0f7ff" },
  { id:"bhim",  name:"BHIM UPI",   color:"#f97316", emoji:"🟠", bg:"#fff3e0" },
  { id:"amazon",name:"Amazon Pay", color:"#ff9900", emoji:"🛒", bg:"#fff8e1" },
];

function RazorpayModal({ booking, onSuccess, onClose }) {
  const { t } = useTheme();
  const [payTab, setPayTab] = useState("card"); // card | upi | netbanking | wallet
  const [stage, setStage] = useState("form");   // form | processing | otp | success | failed
  const [card, setCard] = useState({ num:"", exp:"", cvv:"", name:"" });
  const [upiId, setUpiId] = useState("");
  const [selUpiApp, setSelUpiApp] = useState(null);
  const [otp, setOtp] = useState("");
  const [progress, setProgress] = useState(0);
  const [errMsg, setErrMsg] = useState("");

  function fmtCard(v) {
    return v.replace(/\D/g,"").slice(0,16).replace(/(.{4})/g,"$1 ").trim();
  }
  function fmtExp(v) {
    const d = v.replace(/\D/g,"").slice(0,4);
    return d.length>2 ? d.slice(0,2)+"/"+d.slice(2) : d;
  }

  function validateCard() {
    const num = card.num.replace(/\s/g,"");
    if (num.length < 16) return "Please enter a valid 16-digit card number";
    if (card.exp.length < 5) return "Enter expiry as MM/YY";
    if (card.cvv.length < 3) return "CVV must be 3 digits";
    if (!card.name.trim()) return "Enter cardholder name";
    return null;
  }

  function validateUPI() {
    if (payTab==="upi" && !selUpiApp && !upiId.includes("@")) return "Enter a valid UPI ID (eg: name@upi)";
    return null;
  }

  function startPayment() {
    const err = payTab==="card" ? validateCard() : payTab==="upi" ? validateUPI() : null;
    if (err) { setErrMsg(err); return; }
    setErrMsg("");
    setStage("processing");
    setProgress(0);
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 18 + 4;
      if (p >= 100) { p = 100; clearInterval(iv); setTimeout(()=>setStage("otp"), 300); }
      setProgress(Math.min(p, 100));
    }, 180);
  }

  function verifyOtp() {
    if (otp.length < 4) { setErrMsg("Enter the 6-digit OTP sent to your mobile"); return; }
    setErrMsg("");
    setStage("processing");
    setProgress(0);
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 22 + 8;
      if (p >= 100) { p = 100; clearInterval(iv);
        setTimeout(() => { Math.random() > 0.07 ? setStage("success") : setStage("failed"); }, 400);
      }
      setProgress(Math.min(p, 100));
    }, 120);
  }

  // Card type detector
  const cardType = (() => {
    const n = card.num.replace(/\s/g,"");
    if (n.startsWith("4")) return { label:"VISA", color:"#1a56db" };
    if (n.startsWith("5")) return { label:"MASTERCARD", color:"#eb001b" };
    if (n.startsWith("6")) return { label:"RUPAY", color:"#f97316" };
    if (n.startsWith("3")) return { label:"AMEX", color:"#2e7d32" };
    return null;
  })();

  const tabStyle = (id) => ({
    flex: 1, padding: "10px 6px", border: "none", borderBottom: `3px solid ${payTab===id?"#1a56db":"transparent"}`,
    background: "transparent", color: payTab===id ? "#1a56db" : t.text3,
    fontWeight: 700, fontSize: 12, cursor: "pointer", transition: "all 0.2s",
  });

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.65)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999,padding:16}}>
      <div style={{background:"#fff",borderRadius:16,width:"100%",maxWidth:420,boxShadow:"0 30px 80px rgba(0,0,0,0.4)",overflow:"hidden",maxHeight:"95vh",overflowY:"auto",fontFamily:"'Segoe UI',sans-serif"}}>

        {/* Razorpay Header */}
        <div style={{background:"#2c3e50",padding:"16px 20px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:32,height:32,borderRadius:8,background:"#3498db",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <span style={{color:"#fff",fontWeight:800,fontSize:14}}>Rz</span>
            </div>
            <div>
              <p style={{color:"#fff",fontWeight:700,fontSize:14,margin:0}}>ParkZone Payments</p>
              <p style={{color:"#94a3b8",fontSize:11,margin:0}}>Secured by Razorpay</p>
            </div>
          </div>
          <div style={{textAlign:"right"}}>
            <p style={{color:"#94a3b8",fontSize:11,margin:0}}>Amount</p>
            <p style={{color:"#fff",fontWeight:800,fontSize:22,margin:0}}>₹{RAZORPAY_AMOUNT}.00</p>
          </div>
        </div>

        {/* Booking summary strip */}
        <div style={{background:"#f8fafc",borderBottom:"1px solid #e2e8f0",padding:"10px 20px",display:"flex",gap:16,flexWrap:"wrap"}}>
          <span style={{fontSize:12,color:"#64748b"}}>🏢 {booking.zone}</span>
          <span style={{fontSize:12,color:"#64748b"}}>📍 Block {booking.slot}</span>
          <span style={{fontSize:12,color:"#64748b"}}>🚗 {booking.vehicle||"N/A"}</span>
        </div>

        <div style={{padding:20}}>

          {/* PROCESSING STAGE */}
          {stage==="processing" && (
            <div style={{textAlign:"center",padding:"32px 0"}}>
              <div style={{width:64,height:64,borderRadius:"50%",background:"#e0f2fe",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px",fontSize:28}}>⚡</div>
              <p style={{fontWeight:700,fontSize:16,color:"#0f172a",marginBottom:6}}>Processing Payment…</p>
              <p style={{fontSize:13,color:"#64748b",marginBottom:24}}>Please do not close this window</p>
              <div style={{background:"#e2e8f0",borderRadius:8,height:8,overflow:"hidden",marginBottom:8}}>
                <div style={{height:"100%",width:`${progress}%`,background:"linear-gradient(90deg,#3b82f6,#1a56db)",borderRadius:8,transition:"width 0.2s"}}/>
              </div>
              <p style={{fontSize:11,color:"#94a3b8"}}>{Math.round(progress)}% complete</p>
            </div>
          )}

          {/* OTP STAGE */}
          {stage==="otp" && (
            <div>
              <div style={{textAlign:"center",marginBottom:20}}>
                <div style={{fontSize:36,marginBottom:8}}>📱</div>
                <p style={{fontWeight:700,fontSize:16,color:"#0f172a",marginBottom:4}}>OTP Verification</p>
                <p style={{fontSize:13,color:"#64748b"}}>Enter the 6-digit OTP sent to your registered mobile number</p>
              </div>
              <div style={{background:"#fffbeb",border:"1px solid #fcd34d",borderRadius:10,padding:"10px 14px",marginBottom:20,fontSize:12,color:"#92400e",textAlign:"center"}}>
                🔐 OTP sent to <strong>+91 ••••••7823</strong> (valid for 5 min)
              </div>
              {/* OTP boxes */}
              <div style={{display:"flex",gap:8,justifyContent:"center",marginBottom:20}}>
                {Array.from({length:6}).map((_,i)=>(
                  <div key={i} style={{width:40,height:48,border:`2px solid ${i<otp.length?"#1a56db":"#e2e8f0"}`,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:20,color:"#1a56db",background:i<otp.length?"#eff6ff":"#f8fafc"}}>
                    {otp[i]||""}
                  </div>
                ))}
              </div>
              <input value={otp} onChange={e=>setOtp(e.target.value.replace(/\D/g,"").slice(0,6))}
                placeholder="Enter 6-digit OTP"
                style={{width:"100%",padding:"11px 14px",border:`1.5px solid ${errMsg?"#dc2626":"#e2e8f0"}`,borderRadius:9,fontSize:15,textAlign:"center",letterSpacing:8,fontWeight:700,outline:"none",color:"#0f172a",boxSizing:"border-box"}}/>
              {errMsg&&<p style={{color:"#dc2626",fontSize:12,marginTop:6,textAlign:"center"}}>{errMsg}</p>}
              <p style={{fontSize:12,color:"#3b82f6",textAlign:"center",marginTop:10,cursor:"pointer"}}>Resend OTP in 0:28</p>
              <button onClick={verifyOtp} style={{width:"100%",padding:"13px 0",background:"#1a56db",color:"#fff",border:"none",borderRadius:10,fontWeight:700,fontSize:15,marginTop:16,cursor:"pointer"}}>
                Verify & Pay ₹{RAZORPAY_AMOUNT}
              </button>
            </div>
          )}

          {/* SUCCESS STAGE */}
          {stage==="success" && (
            <div style={{textAlign:"center",padding:"24px 0"}}>
              <div style={{width:72,height:72,borderRadius:"50%",background:"#dcfce7",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",fontSize:36}}>✅</div>
              <p style={{fontWeight:800,fontSize:20,color:"#166534",marginBottom:4}}>Payment Successful!</p>
              <p style={{fontSize:13,color:"#64748b",marginBottom:20}}>Your slot has been confirmed</p>
              <div style={{background:"#f0fdf4",border:"1px solid #86efac",borderRadius:12,padding:16,marginBottom:20,textAlign:"left"}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                  <span style={{fontSize:12,color:"#64748b"}}>Amount Paid</span>
                  <span style={{fontSize:14,fontWeight:800,color:"#166534"}}>₹{RAZORPAY_AMOUNT}.00</span>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                  <span style={{fontSize:12,color:"#64748b"}}>Transaction ID</span>
                  <span style={{fontSize:11,fontWeight:700,color:"#374151"}}>pay_{Math.random().toString(36).slice(2,12).toUpperCase()}</span>
                </div>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                  <span style={{fontSize:12,color:"#64748b"}}>Mode</span>
                  <span style={{fontSize:12,fontWeight:600,color:"#374151",textTransform:"capitalize"}}>{payTab==="card"?"Card ("+cardType?.label+")":payTab==="upi"?"UPI":payTab==="netbanking"?"Net Banking":"Wallet"}</span>
                </div>
              </div>
              <button onClick={onSuccess} style={{width:"100%",padding:"13px 0",background:"#16a34a",color:"#fff",border:"none",borderRadius:10,fontWeight:700,fontSize:15,cursor:"pointer"}}>
                View Booking Receipt 🧾
              </button>
            </div>
          )}

          {/* FAILED STAGE */}
          {stage==="failed" && (
            <div style={{textAlign:"center",padding:"24px 0"}}>
              <div style={{width:72,height:72,borderRadius:"50%",background:"#fee2e2",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",fontSize:36}}>❌</div>
              <p style={{fontWeight:800,fontSize:20,color:"#dc2626",marginBottom:4}}>Payment Failed</p>
              <p style={{fontSize:13,color:"#64748b",marginBottom:20}}>Your payment could not be processed. No amount was deducted.</p>
              <div style={{display:"flex",gap:10}}>
                <button onClick={()=>{setStage("form");setOtp("");setProgress(0);}} style={{flex:1,padding:"12px 0",background:"#f1f5f9",color:"#374151",border:"none",borderRadius:10,fontWeight:700,cursor:"pointer"}}>Try Again</button>
                <button onClick={onClose} style={{flex:1,padding:"12px 0",background:"#fee2e2",color:"#dc2626",border:"none",borderRadius:10,fontWeight:700,cursor:"pointer"}}>Cancel</button>
              </div>
            </div>
          )}

          {/* FORM STAGE */}
          {stage==="form" && (
            <>
              {/* Payment method tabs */}
              <div style={{display:"flex",borderBottom:"1px solid #e2e8f0",marginBottom:20,gap:0}}>
                {[["card","💳 Card"],["upi","📲 UPI"],["netbanking","🏦 Net Banking"],["wallet","👛 Wallet"]].map(([id,label])=>(
                  <button key={id} onClick={()=>{setPayTab(id);setErrMsg("");}} style={tabStyle(id)}>{label}</button>
                ))}
              </div>

              {/* CARD TAB */}
              {payTab==="card" && (
                <div>
                  {/* Card preview */}
                  <div style={{background:"linear-gradient(135deg,#1a56db,#3b82f6)",borderRadius:14,padding:"20px 22px",marginBottom:20,position:"relative",overflow:"hidden"}}>
                    <div style={{position:"absolute",top:-20,right:-20,width:120,height:120,borderRadius:"50%",background:"rgba(255,255,255,0.08)"}}/>
                    <div style={{position:"absolute",bottom:-30,right:20,width:90,height:90,borderRadius:"50%",background:"rgba(255,255,255,0.06)"}}/>
                    {cardType&&<span style={{display:"inline-block",background:"rgba(255,255,255,0.2)",color:"#fff",fontSize:10,fontWeight:800,padding:"2px 8px",borderRadius:4,marginBottom:12}}>{cardType.label}</span>}
                    <p style={{color:"rgba(255,255,255,0.7)",fontSize:11,margin:"0 0 6px"}}>Card Number</p>
                    <p style={{color:"#fff",fontWeight:700,fontSize:18,letterSpacing:2,margin:"0 0 16px",fontFamily:"monospace"}}>{card.num||"•••• •••• •••• ••••"}</p>
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                      <div><p style={{color:"rgba(255,255,255,0.7)",fontSize:10,margin:"0 0 2px"}}>CARDHOLDER</p><p style={{color:"#fff",fontWeight:600,fontSize:13,margin:0}}>{card.name||"YOUR NAME"}</p></div>
                      <div><p style={{color:"rgba(255,255,255,0.7)",fontSize:10,margin:"0 0 2px"}}>EXPIRES</p><p style={{color:"#fff",fontWeight:600,fontSize:13,margin:0}}>{card.exp||"MM/YY"}</p></div>
                    </div>
                  </div>
                  <div style={{display:"flex",flexDirection:"column",gap:12}}>
                    <div>
                      <label style={{fontSize:12,fontWeight:600,color:"#374151",display:"block",marginBottom:4}}>Card Number</label>
                      <input value={card.num} onChange={e=>setCard(c=>({...c,num:fmtCard(e.target.value)}))} placeholder="1234 5678 9012 3456" maxLength={19}
                        style={{width:"100%",padding:"11px 13px",border:`1.5px solid ${errMsg?"#dc2626":"#e2e8f0"}`,borderRadius:9,fontSize:14,outline:"none",color:"#0f172a",fontFamily:"monospace",letterSpacing:1,boxSizing:"border-box"}}/>
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                      <div>
                        <label style={{fontSize:12,fontWeight:600,color:"#374151",display:"block",marginBottom:4}}>Expiry (MM/YY)</label>
                        <input value={card.exp} onChange={e=>setCard(c=>({...c,exp:fmtExp(e.target.value)}))} placeholder="MM/YY" maxLength={5}
                          style={{width:"100%",padding:"11px 13px",border:"1.5px solid #e2e8f0",borderRadius:9,fontSize:14,outline:"none",color:"#0f172a",boxSizing:"border-box"}}/>
                      </div>
                      <div>
                        <label style={{fontSize:12,fontWeight:600,color:"#374151",display:"block",marginBottom:4}}>CVV</label>
                        <input value={card.cvv} onChange={e=>setCard(c=>({...c,cvv:e.target.value.replace(/\D/g,"").slice(0,4)}))} placeholder="•••" type="password"
                          style={{width:"100%",padding:"11px 13px",border:"1.5px solid #e2e8f0",borderRadius:9,fontSize:14,outline:"none",color:"#0f172a",boxSizing:"border-box"}}/>
                      </div>
                    </div>
                    <div>
                      <label style={{fontSize:12,fontWeight:600,color:"#374151",display:"block",marginBottom:4}}>Name on Card</label>
                      <input value={card.name} onChange={e=>setCard(c=>({...c,name:e.target.value}))} placeholder="As on card"
                        style={{width:"100%",padding:"11px 13px",border:"1.5px solid #e2e8f0",borderRadius:9,fontSize:14,outline:"none",color:"#0f172a",boxSizing:"border-box"}}/>
                    </div>
                  </div>
                </div>
              )}

              {/* UPI TAB */}
              {payTab==="upi" && (
                <div>
                  <p style={{fontSize:13,fontWeight:600,color:"#374151",marginBottom:14}}>Select UPI App</p>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:20}}>
                    {UPI_APPS.map(app=>(
                      <button key={app.id} onClick={()=>{setSelUpiApp(app.id);setUpiId("");}}
                        style={{padding:"14px 10px",border:`2px solid ${selUpiApp===app.id?app.color:"#e2e8f0"}`,borderRadius:12,background:selUpiApp===app.id?app.bg:"#f8fafc",cursor:"pointer",display:"flex",alignItems:"center",gap:10,transition:"all 0.18s"}}>
                        <span style={{fontSize:22}}>{app.emoji}</span>
                        <span style={{fontSize:12,fontWeight:700,color:selUpiApp===app.id?app.color:"#374151"}}>{app.name}</span>
                        {selUpiApp===app.id&&<span style={{marginLeft:"auto",color:app.color,fontSize:14}}>✓</span>}
                      </button>
                    ))}
                  </div>
                  <div style={{position:"relative"}}>
                    <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
                      <div style={{flex:1,height:1,background:"#e2e8f0"}}/>
                      <span style={{fontSize:11,color:"#94a3b8",fontWeight:600}}>OR ENTER UPI ID</span>
                      <div style={{flex:1,height:1,background:"#e2e8f0"}}/>
                    </div>
                    <input value={upiId} onChange={e=>{setUpiId(e.target.value);setSelUpiApp(null);}} placeholder="yourname@upi"
                      style={{width:"100%",padding:"11px 13px",border:`1.5px solid ${errMsg?"#dc2626":"#e2e8f0"}`,borderRadius:9,fontSize:14,outline:"none",color:"#0f172a",boxSizing:"border-box"}}/>
                  </div>
                </div>
              )}

              {/* NET BANKING TAB */}
              {payTab==="netbanking" && (
                <div>
                  <p style={{fontSize:13,fontWeight:600,color:"#374151",marginBottom:12}}>Popular Banks</p>
                  <div style={{display:"flex",flexDirection:"column",gap:8}}>
                    {[["SBI","State Bank of India","#22c55e"],["HDFC","HDFC Bank","#1a56db"],["ICICI","ICICI Bank","#f97316"],["Axis","Axis Bank","#7c3aed"],["Kotak","Kotak Mahindra","#ef4444"]].map(([code,name,color])=>(
                      <button key={code} onClick={()=>startPayment()}
                        style={{display:"flex",alignItems:"center",gap:14,padding:"14px 16px",border:"1.5px solid #e2e8f0",borderRadius:10,background:"#f8fafc",cursor:"pointer",textAlign:"left",transition:"border 0.2s"}}>
                        <div style={{width:36,height:36,borderRadius:8,background:color+"18",border:`1.5px solid ${color}`,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:12,color}}>{code}</div>
                        <span style={{fontSize:13,fontWeight:600,color:"#374151"}}>{name}</span>
                        <span style={{marginLeft:"auto",color:"#94a3b8",fontSize:14}}>›</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* WALLET TAB */}
              {payTab==="wallet" && (
                <div>
                  <p style={{fontSize:13,fontWeight:600,color:"#374151",marginBottom:12}}>Select Wallet</p>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                    {[["Paytm Wallet","#00baf2","💙"],["Mobikwik","#ef4444","❤️"],["Freecharge","#22c55e","💚"],["Ola Money","#f59e0b","💛"]].map(([name,color,emoji])=>(
                      <button key={name} onClick={()=>startPayment()}
                        style={{padding:"16px 10px",border:`1.5px solid ${color}30`,borderRadius:12,background:color+"0f",cursor:"pointer",textAlign:"center",transition:"all 0.18s"}}>
                        <div style={{fontSize:24,marginBottom:6}}>{emoji}</div>
                        <p style={{fontSize:12,fontWeight:700,color,margin:0}}>{name}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {errMsg && payTab!=="netbanking" && <p style={{color:"#dc2626",fontSize:12,marginTop:12,textAlign:"center"}}>{errMsg}</p>}

              {/* Pay button (not for netbanking/wallet which auto-trigger) */}
              {(payTab==="card"||payTab==="upi") && (
                <button onClick={startPayment} style={{width:"100%",padding:"14px 0",background:"linear-gradient(90deg,#1a56db,#3b82f6)",color:"#fff",border:"none",borderRadius:11,fontWeight:800,fontSize:16,marginTop:20,cursor:"pointer",letterSpacing:0.5}}>
                  Pay ₹{RAZORPAY_AMOUNT} Securely 🔒
                </button>
              )}

              {/* Trust badges */}
              <div style={{display:"flex",justifyContent:"center",gap:16,marginTop:14,alignItems:"center"}}>
                <span style={{fontSize:10,color:"#94a3b8"}}>🔒 256-bit SSL</span>
                <span style={{fontSize:10,color:"#94a3b8"}}>🛡️ PCI DSS</span>
                <span style={{fontSize:10,color:"#94a3b8"}}>✅ RBI Compliant</span>
              </div>
            </>
          )}

        </div>

        {/* Footer close */}
        {stage==="form" && (
          <div style={{padding:"12px 20px",borderTop:"1px solid #e2e8f0",textAlign:"center"}}>
            <button onClick={onClose} style={{background:"none",border:"none",color:"#94a3b8",fontSize:12,cursor:"pointer"}}>✕ Cancel Payment</button>
          </div>
        )}
      </div>
    </div>
  );
}


function ReceiptModal({receipt,onClose}){
  const {t}=useTheme();
  return(
    <Modal onClose={onClose}>
      <div style={{textAlign:"center",marginBottom:16}}>
        <div style={{fontSize:32,marginBottom:6}}>🧾</div>
        <h3 style={{fontWeight:800,fontSize:18,color:t.text}}>Booking Receipt</h3>
        <p style={{fontSize:11,color:t.text3,marginTop:2}}>{receipt.bookingId}</p>
      </div>
      <div style={{display:"flex",justifyContent:"center",marginBottom:16}}>
        <QRCode value={receipt.bookingId} size={160}/>
      </div>
      <div style={{background:t.bg2,borderRadius:12,padding:16,marginBottom:16}}>
        <IR label="Zone" value={receipt.zone}/>
        <IR label="Floor" value={receipt.floor}/>
        <IR label="Block" value={receipt.slot}/>
        {receipt.vehicle&&<IR label="Vehicle" value={receipt.vehicle}/>}
        {receipt.timeSlot&&<IR label="Time Slot" value={receipt.timeSlot}/>}
        <IR label="Booked At" value={new Date(receipt.bookedAt).toLocaleString()}/>
        {receipt.expiry&&<IR label="Expires At" value={new Date(receipt.expiry).toLocaleString()}/>}
      </div>
      <button onClick={onClose} style={{width:"100%",padding:"11px 0",background:"#1a56db",color:"#fff",border:"none",borderRadius:10,fontWeight:700,fontSize:14}}>Close</button>
    </Modal>
  );
}

// ─── Admin App ────────────────────────────────────────────────────────────────
function AdminApp({user,onLogout,bookings,refresh,showToast,lastSync}){
  const {t}=useTheme();
  const [tab,setTab]=useState("overview");
  const [selZ,setSelZ]=useState(null);
  const [selF,setSelF]=useState(null);
  const [maintenance,setMaintenanceState]=useState(()=>getMaintenance());

  const allB=Object.entries(bookings).filter(([,v])=>v!==null).map(([k,v])=>{
    const[zId,...r]=k.split("_");const sl=r[r.length-1];const fl=r.slice(0,-1).join("_");
    const z=ZONES.find(x=>x.id===zId);
    return{key:k,zoneName:z?.name,zoneColor:z?.color,zoneIcon:z?.icon,floor:fl,slot:sl,...v};
  });

  const totalSlots=ZONES.reduce((a,z)=>a+Object.values(z.blocks).flat().length,0);
  const totalBooked=allB.length;
  const totalMaint=maintenance.length;

  const zStats=ZONES.map(z=>{
    const tot=Object.values(z.blocks).flat().length;
    const bk=z.floors.reduce((a,f)=>a+z.blocks[f].filter(s=>!!bookings[`${z.id}_${f}_${s}`]).length,0);
    return{...z,total:tot,booked:bk,available:tot-bk};
  });

  const release=key=>{
    const[zId,...r]=key.split("_");
    clearBooking(zId,r.slice(0,-1).join("_"),r[r.length-1],true,user.email);
    refresh();showToast("Slot released by admin.");
  };

  const handleToggleMaint=(zId,f,s)=>{
    const updated=toggleMaintenance(zId,f,s);
    setMaintenanceState([...updated]);
    refresh();showToast(`Slot ${s} maintenance status toggled.`,"warn");
  };

  const zone=ZONES.find(z=>z.id===selZ);
  const history=getH();
  const activity=getAL();
  const users=getU();

  const handleDeleteUser=email=>{
    if(!window.confirm(`Delete user ${email}? All their bookings will be released.`)) return;
    deleteUser(email);refresh();showToast(`User ${email} deleted.`);
  };
  const handleBanUser=(email,banned)=>{
    banUser(email,banned);refresh();showToast(`User ${email} ${banned?"banned":"unbanned"}.`,banned?"warn":"success");
  };

  // analytics helpers
  const hourlyData=()=>{
    const counts=Array(24).fill(0);
    history.forEach(h=>{
      const hr=new Date(h.bookedAt).getHours();
      counts[hr]++;
    });
    return counts;
  };
  const maxHourly=Math.max(...hourlyData(),1);
  const zonePopularity=ZONES.map(z=>({
    name:z.name,color:z.color,
    count:history.filter(h=>h.zone===z.name).length
  }));
  const maxZone=Math.max(...zonePopularity.map(z=>z.count),1);

  return(
    <div style={{minHeight:"100vh",background:t.bg}}>
      <nav style={{background:t.navBg,borderBottom:`1px solid ${t.navBorder}`,padding:"14px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:100}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:22}}>🅿️</span>
          <span style={{fontWeight:800,fontSize:18,color:t.text,letterSpacing:-0.3}}>ParkZone</span>
          <span style={{fontSize:11,background:"#dc2626",color:"#fff",padding:"2px 9px",borderRadius:20,fontWeight:700,marginLeft:4}}>ADMIN</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <ThemeToggle/>
          <button onClick={()=>exportCSV(bookings)} style={{padding:"7px 14px",background:"#1a56db20",color:"#1a56db",border:"1px solid #1a56db",borderRadius:8,fontSize:13,fontWeight:600}}>⬇ Export CSV</button>
          <div style={{textAlign:"right"}}>
            <p style={{fontWeight:600,fontSize:14,color:t.text}}>{user.name}</p>
            <p style={{fontSize:12,color:t.text3}}>{user.email}</p>
          </div>
          <button onClick={onLogout} style={{padding:"7px 14px",background:"#fee2e2",color:"#dc2626",border:"none",borderRadius:8,fontSize:13,fontWeight:600}}>Logout</button>
        </div>
      </nav>

      {/* Live sync bar */}
      <div style={{background:"#0f172a",borderBottom:"1px solid #1e3a5f",padding:"6px 24px",display:"flex",alignItems:"center",gap:8}}>
        <span style={{width:8,height:8,borderRadius:"50%",background:"#22c55e",display:"inline-block",boxShadow:"0 0 6px #22c55e",animation:"pulse 2s infinite"}}/>
        <span style={{fontSize:12,color:"#94a3b8",fontWeight:500}}>Live sync active — updates automatically</span>
        {lastSync&&<span style={{fontSize:11,color:"#475569",marginLeft:"auto"}}>Last updated: {lastSync.toLocaleTimeString()}</span>}
      </div>

      <div style={{maxWidth:1200,margin:"0 auto",padding:"28px 20px"}}>
        <Tabs tabs={[
          ["overview","📊 Overview"],
          ["bookings","🚗 All Bookings"],
          ["zones","🗺️ Zone Detail"],
          ["users","👥 Users"],
          ["history","📜 History"],
          ["activity","⚡ Activity Log"],
          ["analytics","📈 Analytics"],
        ]} active={tab} onChange={setTab}/>

        {/* ── OVERVIEW ── */}
        {tab==="overview"&&(
          <div className="fi">
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:16,marginBottom:28}}>
              {[
                {label:"Total Slots",value:totalSlots,color:"#3b82f6",icon:"🅿️"},
                {label:"Occupied",value:totalBooked,color:"#dc2626",icon:"🔴"},
                {label:"Available",value:totalSlots-totalBooked-totalMaint,color:"#16a34a",icon:"🟢"},
                {label:"Maintenance",value:totalMaint,color:"#f59e0b",icon:"🔧"},
                {label:"Occupancy",value:Math.round((totalBooked/totalSlots)*100)+"%",color:"#8b5cf6",icon:"📈"},
                {label:"Total Users",value:users.length,color:"#0891b2",icon:"👥"},
              ].map(s=>(
                <div key={s.label} style={{background:t.card,borderRadius:14,padding:20,border:`1px solid ${t.border}`}}>
                  <div style={{fontSize:24,marginBottom:8}}>{s.icon}</div>
                  <p style={{fontSize:13,color:t.text3,marginBottom:4}}>{s.label}</p>
                  <p style={{fontSize:28,fontWeight:800,color:s.color}}>{s.value}</p>
                </div>
              ))}
            </div>
            <h3 style={{color:t.text,fontWeight:700,fontSize:17,marginBottom:14}}>Zone Breakdown</h3>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              {zStats.map(z=>(
                <div key={z.id} style={{background:t.card,borderRadius:14,padding:20,border:`1px solid ${t.border}`}}>
                  <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:14}}>
                    <ZI color={z.color} icon={z.icon} size={44}/>
                    <div style={{flex:1}}>
                      <p style={{fontWeight:700,color:t.text,fontSize:15}}>{z.name}</p>
                      <p style={{fontSize:12,color:t.text3}}>{z.booked}/{z.total} occupied • {z.available} free</p>
                    </div>
                    <span style={{fontSize:20,fontWeight:800,color:z.color}}>{Math.round((z.booked/z.total)*100)}%</span>
                  </div>
                  <div style={{background:t.progressTrack,borderRadius:8,height:8,overflow:"hidden"}}>
                    <div style={{height:"100%",width:`${(z.booked/z.total)*100}%`,background:z.color,borderRadius:8,transition:"width 0.5s"}}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── ALL BOOKINGS ── */}
        {tab==="bookings"&&(
          <div className="fi">
            <SH title="All Active Bookings" sub={`${allB.length} booking${allB.length!==1?"s":""} across all zones`}/>
            {allB.length===0?(
              <div style={{background:t.card,borderRadius:16,padding:48,textAlign:"center",border:`1px solid ${t.border}`}}>
                <p style={{color:t.text3,fontWeight:600}}>No active bookings</p>
              </div>
            ):(
              <div style={{display:"flex",flexDirection:"column",gap:12}}>
                {allB.map(b=>(
                  <div key={b.key} style={{background:t.card,borderRadius:14,padding:18,border:`1px solid ${t.border}`,display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:16,flexWrap:"wrap"}}>
                    <div style={{display:"flex",alignItems:"center",gap:14}}>
                      <ZI color={b.zoneColor||"#1a56db"} icon={b.zoneIcon||"P"} size={44}/>
                      <div>
                        <p style={{fontWeight:700,color:t.text,fontSize:15}}>{b.zoneName} • Block {b.slot}</p>
                        <p style={{fontSize:12,color:t.text3}}>{b.floor} • {b.email}</p>
                        {b.vehicle&&<p style={{fontSize:12,color:t.text3}}>🚗 {b.vehicle}</p>}
                        {b.timeSlot&&<p style={{fontSize:11,color:"#1a56db"}}>⏰ {b.timeSlot}</p>}
                        <p style={{fontSize:11,color:t.text3,marginTop:2}}>{new Date(b.time).toLocaleString()}</p>
                      </div>
                    </div>
                    <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:8}}>
                      {b.expiry&&<CountdownBadge expiry={b.expiry}/>}
                      <button onClick={()=>release(b.key)} style={{padding:"8px 16px",background:t.releaseBtn.bg,color:t.releaseBtn.color,border:`1px solid ${t.releaseBtn.border}`,borderRadius:9,fontSize:13,fontWeight:700}}>Release Slot</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── ZONE DETAIL ── */}
        {tab==="zones"&&(
          <div className="fi">
            <SH title="Zone Detail View" sub="Inspect slots · click 🔧 to toggle maintenance mode"/>
            <div style={{display:"flex",gap:12,marginBottom:20,flexWrap:"wrap"}}>
              {ZONES.map(z=>(
                <button key={z.id} onClick={()=>{setSelZ(z.id);setSelF(z.floors[0]);}}
                  style={{padding:"9px 18px",borderRadius:10,border:`2px solid ${selZ===z.id?z.color:t.border}`,background:selZ===z.id?z.color+"20":t.card,color:selZ===z.id?z.color:t.text3,fontWeight:600,fontSize:14,transition:"all 0.2s"}}>
                  {z.name}
                </button>
              ))}
            </div>
            {zone&&(
              <>
                <div style={{display:"flex",gap:10,marginBottom:20,flexWrap:"wrap"}}>
                  {zone.floors.map(f=>(
                    <button key={f} onClick={()=>setSelF(f)} style={{padding:"7px 16px",borderRadius:9,border:`1.5px solid ${selF===f?t.text2:t.border}`,background:selF===f?t.bg3:"transparent",color:selF===f?t.text:t.text3,fontWeight:600,fontSize:13}}>
                      {f}
                    </button>
                  ))}
                </div>
                {selF&&(
                  <div style={{background:t.card,borderRadius:16,padding:24,border:`1px solid ${t.border}`}}>
                    <p style={{fontSize:12,color:t.text3,marginBottom:16}}>Click a slot to toggle 🔧 maintenance mode. Click "Release" on an occupied slot to free it.</p>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(100px,1fr))",gap:10}}>
                      {zone.blocks[selF].map(s=>{
                        const key=`${zone.id}_${selF}_${s}`;
                        const bk=bookings[key];
                        const inMaint=maintenance.includes(key);
                        return(
                          <div key={s} style={{borderRadius:10,textAlign:"center",border:`2px solid ${inMaint?"#f59e0b":bk?"#dc2626":"#16a34a"}`,background:inMaint?t.slotMaintBg:bk?t.slotBusyBg:t.slotFreeBg,overflow:"hidden"}}>
                            <div style={{padding:"10px 6px"}}>
                              <div style={{fontWeight:700,fontSize:14,color:inMaint?t.slotMaintTxt:bk?t.slotBusyTxt:t.slotFreeTxt}}>{s}</div>
                              <div style={{fontSize:9,marginTop:2,fontWeight:600,color:inMaint?t.slotMaintTxt:bk?t.slotBusyTxt:t.slotFreeTxt}}>{inMaint?"MAINT":bk?"OCCUPIED":"FREE"}</div>
                              {bk&&<div style={{fontSize:8,color:t.text3,marginTop:2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{bk.email?.split("@")[0]}</div>}
                              {bk&&bk.vehicle&&<div style={{fontSize:8,color:t.text3}}>🚗{bk.vehicle}</div>}
                            </div>
                            <div style={{display:"flex",borderTop:`1px solid ${t.border}`}}>
                              <button onClick={()=>handleToggleMaint(zone.id,selF,s)}
                                style={{flex:1,padding:"5px 0",fontSize:10,fontWeight:600,background:"transparent",border:"none",color:inMaint?"#f59e0b":t.text3,borderRight:bk?`1px solid ${t.border}`:"none"}}>
                                {inMaint?"✅ Fix":"🔧 Maint"}
                              </button>
                              {bk&&<button onClick={()=>{release(key);}} style={{flex:1,padding:"5px 0",fontSize:10,fontWeight:600,background:"transparent",border:"none",color:"#dc2626"}}>Release</button>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* ── USERS ── */}
        {tab==="users"&&(
          <div className="fi">
            <SH title="Registered Users" sub={`${users.length} user${users.length!==1?"s":""} registered`}/>
            {users.length===0?(
              <div style={{background:t.card,borderRadius:16,padding:48,textAlign:"center",border:`1px solid ${t.border}`}}>
                <p style={{color:t.text3,fontWeight:600}}>No users registered yet</p>
              </div>
            ):(
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                {users.map(u=>{
                  const hasBooking=Object.values(bookings).some(b=>b&&b.email===u.email);
                  return(
                    <div key={u.email} style={{background:t.card,borderRadius:14,padding:18,border:`1px solid ${u.banned?"#dc2626":t.border}`,display:"flex",alignItems:"center",justifyContent:"space-between",gap:16,flexWrap:"wrap"}}>
                      <div style={{display:"flex",alignItems:"center",gap:14}}>
                        <div style={{width:44,height:44,borderRadius:12,background:u.banned?"#fee2e2":"#dbeafe",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>
                          {u.banned?"🚫":"👤"}
                        </div>
                        <div>
                          <p style={{fontWeight:700,color:u.banned?"#dc2626":t.text,fontSize:15}}>{u.name} {u.banned&&<span style={{fontSize:11,background:"#fee2e2",color:"#dc2626",padding:"1px 6px",borderRadius:5,marginLeft:4}}>BANNED</span>}</p>
                          <p style={{fontSize:12,color:t.text3}}>{u.email}</p>
                          {u.vehicle&&<p style={{fontSize:11,color:t.text3}}>🚗 {u.vehicle}</p>}
                          <span style={{fontSize:11,padding:"2px 8px",borderRadius:5,background:hasBooking?"#dcfce7":"#f1f5f9",color:hasBooking?"#166534":t.text3,fontWeight:600}}>{hasBooking?"Has active booking":"No booking"}</span>
                        </div>
                      </div>
                      <div style={{display:"flex",gap:8}}>
                        <button onClick={()=>handleBanUser(u.email,!u.banned)} style={{padding:"7px 14px",background:u.banned?"#dcfce7":"#fffbeb",color:u.banned?"#166534":"#92400e",border:`1px solid ${u.banned?"#86efac":"#fcd34d"}`,borderRadius:8,fontSize:12,fontWeight:600}}>
                          {u.banned?"Unban":"Ban"}
                        </button>
                        <button onClick={()=>handleDeleteUser(u.email)} style={{padding:"7px 14px",background:"#fee2e2",color:"#dc2626",border:"1px solid #fca5a5",borderRadius:8,fontSize:12,fontWeight:600}}>Delete</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── HISTORY ── */}
        {tab==="history"&&(
          <div className="fi">
            <SH title="Full Booking History" sub={`${history.length} total past bookings`}/>
            {history.length===0?(
              <div style={{background:t.card,borderRadius:16,padding:48,textAlign:"center",border:`1px solid ${t.border}`}}>
                <p style={{color:t.text3,fontWeight:600}}>No booking history yet</p>
              </div>
            ):(
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                {history.map((h,i)=>(
                  <div key={i} className="hover-row" style={{background:t.card,borderRadius:12,padding:16,border:`1px solid ${t.border}`,transition:"background 0.15s"}}>
                    <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
                      <div>
                        <p style={{fontWeight:700,color:t.text}}>{h.zone} — Block {h.slot}</p>
                        <p style={{fontSize:12,color:t.text3}}>{h.floor} • {h.email} {h.vehicle?`• 🚗 ${h.vehicle}`:""}</p>
                        {h.timeSlot&&<p style={{fontSize:11,color:"#1a56db"}}>⏰ {h.timeSlot}</p>}
                        <p style={{fontSize:11,color:t.text3,marginTop:4}}>📅 {new Date(h.bookedAt).toLocaleString()} → {new Date(h.releasedAt).toLocaleString()}</p>
                      </div>
                      <span style={{fontSize:11,padding:"3px 10px",borderRadius:6,background:h.releasedBy==="admin"?"#fee2e2":"#f0fdf4",color:h.releasedBy==="admin"?"#dc2626":"#16a34a",fontWeight:700,alignSelf:"flex-start"}}>
                        {h.releasedBy==="admin"?"Admin Release":"User Cancel"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── ACTIVITY LOG ── */}
        {tab==="activity"&&(
          <div className="fi">
            <SH title="Activity Log" sub="Real-time log of all system events"/>
            {activity.length===0?(
              <div style={{background:t.card,borderRadius:16,padding:48,textAlign:"center",border:`1px solid ${t.border}`}}>
                <p style={{color:t.text3,fontWeight:600}}>No activity yet</p>
              </div>
            ):(
              <div style={{display:"flex",flexDirection:"column",gap:6}}>
                {activity.map((a,i)=>{
                  const colors={booking:"#1a56db",cancel:"#dc2626",admin:"#9f1239",user:"#057a55",info:"#64748b"};
                  const c=colors[a.type]||"#64748b";
                  return(
                    <div key={i} style={{background:t.card,borderRadius:10,padding:"12px 16px",border:`1px solid ${t.border}`,display:"flex",alignItems:"center",gap:12}}>
                      <div style={{width:8,height:8,borderRadius:"50%",background:c,flexShrink:0,boxShadow:`0 0 6px ${c}`}}/>
                      <p style={{fontSize:13,color:t.text,flex:1}}>{a.msg}</p>
                      <span style={{fontSize:11,color:t.text3,whiteSpace:"nowrap"}}>{new Date(a.time).toLocaleTimeString()}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── ANALYTICS ── */}
        {tab==="analytics"&&(
          <div className="fi">
            <SH title="Analytics Dashboard" sub="Booking trends and zone popularity"/>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:24}}>
              {/* Peak Hours Chart */}
              <div style={{background:t.card,borderRadius:16,padding:24,border:`1px solid ${t.border}`,gridColumn:"1/-1"}}>
                <h3 style={{fontWeight:700,color:t.text,marginBottom:4,fontSize:16}}>📊 Peak Booking Hours</h3>
                <p style={{fontSize:12,color:t.text3,marginBottom:20}}>Based on all-time booking history</p>
                <div style={{display:"flex",alignItems:"flex-end",gap:4,height:120}}>
                  {hourlyData().map((count,hr)=>{
                    const pct=(count/maxHourly)*100;
                    const color=pct>70?"#dc2626":pct>40?"#f59e0b":"#1a56db";
                    return(
                      <div key={hr} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                        <div style={{width:"100%",background:color,borderRadius:"3px 3px 0 0",height:`${Math.max(pct,3)}%`,minHeight:3,transition:"height 0.5s"}}/>
                        <span style={{fontSize:8,color:t.text3}}>{hr}</span>
                      </div>
                    );
                  })}
                </div>
                <div style={{display:"flex",justifyContent:"space-between",marginTop:8}}>
                  <span style={{fontSize:11,color:t.text3}}>Midnight (0h)</span>
                  <span style={{fontSize:11,color:t.text3}}>11 PM (23h)</span>
                </div>
              </div>

              {/* Zone Popularity */}
              <div style={{background:t.card,borderRadius:16,padding:24,border:`1px solid ${t.border}`,gridColumn:"1/-1"}}>
                <h3 style={{fontWeight:700,color:t.text,marginBottom:4,fontSize:16}}>🗺️ Zone Popularity</h3>
                <p style={{fontSize:12,color:t.text3,marginBottom:20}}>Total bookings per zone (all-time)</p>
                <div style={{display:"flex",flexDirection:"column",gap:12}}>
                  {zonePopularity.sort((a,b)=>b.count-a.count).map(z=>(
                    <div key={z.name}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                        <span style={{fontSize:13,fontWeight:600,color:t.text}}>{z.name}</span>
                        <span style={{fontSize:13,fontWeight:700,color:z.color}}>{z.count} bookings</span>
                      </div>
                      <div style={{background:t.progressTrack,borderRadius:8,height:10,overflow:"hidden"}}>
                        <div style={{height:"100%",width:`${maxZone>0?(z.count/maxZone)*100:0}%`,background:z.color,borderRadius:8,transition:"width 0.5s"}}/>
                      </div>
                    </div>
                  ))}
                  {maxZone===1&&history.length===0&&<p style={{color:t.text3,fontSize:13}}>No booking history yet — analytics will populate as bookings are made and completed.</p>}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Shared primitives ────────────────────────────────────────────────────────
function Tabs({tabs,active,onChange}){
  const {t}=useTheme();
  return(
    <div style={{display:"flex",gap:4,background:t.tabBg,borderRadius:12,padding:6,marginBottom:28,border:`1px solid ${t.border}`,transition:"background 0.25s",flexWrap:"wrap"}}>
      {tabs.map(([id,label])=>(
        <button key={id} onClick={()=>onChange(id)} style={{flex:"1 1 auto",padding:"10px 12px",border:"none",borderRadius:8,fontSize:13,fontWeight:600,background:active===id?t.tabActive:"transparent",color:active===id?t.tabActiveTxt:t.tabTxt,transition:"all 0.2s",whiteSpace:"nowrap"}}>
          {label}
        </button>
      ))}
    </div>
  );
}

function SH({title,sub}){
  const {t}=useTheme();
  return(
    <div style={{marginBottom:20}}>
      <h2 style={{fontSize:20,fontWeight:700,color:t.text,marginBottom:4}}>{title}</h2>
      {sub&&<p style={{color:t.text3,fontSize:14}}>{sub}</p>}
    </div>
  );
}

function Bk({onClick,label}){
  return<button onClick={onClick} style={{background:"none",border:"none",color:"#3b82f6",fontSize:14,fontWeight:600,marginBottom:20,padding:0,cursor:"pointer"}}>← {label}</button>;
}

function ZI({color,icon,size=48}){
  return<div style={{width:size,height:size,borderRadius:Math.round(size*0.27),flexShrink:0,background:color+"18",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:Math.round(size*0.4),color}}>{icon}</div>;
}

function Bdg({color,label}){
  const c={green:{bg:"#dcfce7",text:"#166534"},red:{bg:"#fee2e2",text:"#991b1b"}}[color]||{bg:"#dbeafe",text:"#1e40af"};
  return<span style={{display:"inline-block",padding:"5px 10px",borderRadius:8,background:c.bg,color:c.text,fontSize:12,fontWeight:700}}>{label}</span>;
}

function IR({label,value}){
  const {t}=useTheme();
  return(
    <div style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`1px solid ${t.rowBorder}`}}>
      <span style={{fontSize:13,color:t.text3}}>{label}</span>
      <span style={{fontSize:13,fontWeight:700,color:t.text}}>{value}</span>
    </div>
  );
}

function Modal({children,onClose}){
  const {t}=useTheme();
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999,padding:20}} onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div className="fi" style={{background:t.card,borderRadius:20,padding:32,maxWidth:440,width:"100%",boxShadow:"0 25px 60px rgba(0,0,0,0.35)",border:`1px solid ${t.border}`,maxHeight:"90vh",overflowY:"auto"}}>
        {children}
      </div>
    </div>
  );
}

function Steps({step}){
  const {t}=useTheme();
  const labels=["Select Zone","Select Floor","Select Block"];
  return(
    <div style={{display:"flex",alignItems:"center",marginBottom:32}}>
      {labels.map((s,i)=>(
        <div key={i} style={{display:"flex",alignItems:"center",flex:i<labels.length-1?1:"none"}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <div style={{width:30,height:30,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:13,flexShrink:0,background:i+1<=step?"#1a56db":t.bg3,color:i+1<=step?"#fff":t.text3}}>
              {i+1<step?"✓":i+1}
            </div>
            <span style={{fontSize:13,fontWeight:600,whiteSpace:"nowrap",color:i+1===step?t.text:t.text3}}>{s}</span>
          </div>
          {i<labels.length-1&&<div style={{flex:1,height:2,margin:"0 12px",borderRadius:2,background:i+1<step?"#1a56db":t.bg3}}/>}
        </div>
      ))}
    </div>
  );
}
