(()=>{var I=(e,r,n)=>()=>{if(e)try{r=e(e=0)}catch(l){n=[l]}if(n)throw n[0];return r};var S="openchamber.sdk",f=1;var ve=()=>{};function co(e){let r=e.documentElement;if(r.hasAttribute("data-oc-scrollbar-activity"))return;r.setAttribute("data-oc-scrollbar-activity","");let n=new WeakMap;e.addEventListener("scroll",(l)=>{let u=l.target===e?r:l.target;if(!(u instanceof Element))return;if(!u.hasAttribute("data-oc-scrolling"))u.setAttribute("data-oc-scrolling","");let i=n.get(u);if(i!==void 0)clearTimeout(i);n.set(u,setTimeout(()=>{n.delete(u),u.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var ot=`
:root {
  /* Quiet at rest like the app's own thumbs; hover gives a clear grab target. */
  --oc-scrollbar-thumb: color-mix(in srgb, var(--oc-muted, currentColor) 18%, transparent);
  --oc-scrollbar-thumb-hover: color-mix(in srgb, var(--oc-muted, currentColor) 36%, transparent);
  scrollbar-gutter: stable;
}
* {
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}
:hover, [data-oc-scrolling] {
  scrollbar-color: var(--oc-scrollbar-thumb) transparent;
}
/* Chromium's standard scrollbar properties otherwise override its pseudo-elements. */
@supports selector(::-webkit-scrollbar) {
  *, :hover, [data-oc-scrolling] { scrollbar-width: auto; scrollbar-color: auto; }
  ::-webkit-scrollbar { width: 6px; height: 6px; background: transparent; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 999px;
    min-width: 24px;
    min-height: 24px;
  }
  :hover::-webkit-scrollbar-thumb, [data-oc-scrolling]::-webkit-scrollbar-thumb { background: var(--oc-scrollbar-thumb); }
  ::-webkit-scrollbar-thumb:hover { background: var(--oc-scrollbar-thumb-hover); }
  ::-webkit-scrollbar-corner { background: transparent; }
  ::-webkit-scrollbar-button { display: none; width: 0; height: 0; }
}
@media (forced-colors: active) {
  *, :hover, [data-oc-scrolling] { scrollbar-color: auto; }
  ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb:hover { background: CanvasText; }
}
`,ar;var ge=I(()=>{ar=`(${co.toString()})(document);`});var nt=128,st=65536;var ye=128,Re=65536;var it=()=>{};var Eo,lo=(e)=>Object(e)===e&&!Array.isArray(e),at=(e,r)=>Object.keys(e).every((n)=>r.includes(n)),po=(e)=>String(e)===e&&e.length>=1&&e.length<=60,uo=(e)=>String(e)===e&&e.length>=1&&e.length<=80,_o=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let r=new Set;for(let n of e){if(!lo(n)||!Eo.test(n.id)||!po(n.label))return!1;if(n.disabled!==void 0&&n.disabled!==!0&&n.disabled!==!1)return!1;if(r.has(n.id))return!1;if(r.add(n.id),n.kind==="button"){if(!at(n,["kind","id","label","disabled"]))return!1;continue}if(n.kind!=="select"||!at(n,["kind","id","label","value","options","disabled"]))return!1;if(!uo(n.value)||!Array.isArray(n.options)||n.options.length<1||n.options.length>16)return!1;let l=new Set;for(let u of n.options){if(!lo(u)||!at(u,["value","label"])||!uo(u.value)||!po(u.label)||l.has(u.value))return!1;l.add(u.value)}if(!l.has(n.value))return!1}return!0};var ct=I(()=>{Eo=/^[a-z][a-z0-9-]{0,39}$/});var dt=()=>{};var So=()=>{};var fo=I(()=>{dt()});var ke=20000000,Ue=256,lt=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,To=(e,r)=>{if(e.path!==r.path||e.readOnly!==r.readOnly)return!1;if(e.encoding==="text"||r.encoding==="text")return e.encoding==="text"&&r.encoding==="text"&&e.content===r.content;if(e.bytes.byteLength!==r.bytes.byteLength)return!1;for(let n=0;n<e.bytes.byteLength;n+=1)if(e.bytes[n]!==r.bytes[n])return!1;return!0};var pt=()=>{};var ho,mo,Ao=(e,r=0,n={remaining:16000})=>{if(--n.remaining<0||r>=32)return!1;if(e===null)return!0;let l=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let u of l)if(!Ao(u,r+1,n))return!1;return!0},ut=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((r)=>/^(0|[1-9]\d*)$/.test(r)&&Number(r)<e.length)&&e.every(ut);if(Object(e)===e){let r=Object.getPrototypeOf(e);return(r===null||r===Object.prototype)&&Object.values(e).every(ut)}return String(e)===e||Number.isFinite(e)},Et=(e)=>{try{if(String(e.id)!==e.id||!ho.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!mo.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!Ao(e.data)||!ut(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var _t=I(()=>{ho=/^[A-Za-z0-9_-]{1,80}$/,mo=["left","right","top","bottom"]});var bo,ft=(e)=>Boolean(e&&"sessionId"in e),Tt=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e)),xo,ht=(e)=>xo.test(e),Ce=500,we=32000,vo=16000,go=128,yo=200,Ro=2000,ko=16000,Uo=80,Co=200,wo=16000,Io=2000,mt=20000,Ie=1024,Le=2000000,Me=64000,Ne=8000,At=4000,Ot=960000,Lo=999,Mo=1e4,_e=500,No,Po,dr,Go=(e)=>dr.has(e),Do=(e)=>e&&Go(e)?e:"HOST_REJECTED",oe=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(oe);if(Object(e)===e)return Object.values(e).every(oe);return!1},$o=(e)=>oe(e)&&JSON.stringify(e).length<=wo,Oo=(e)=>e?.trim().slice(0,Co)??"",re=(e)=>{let r=e.id.trim().slice(0,go),n=e.title.trim().slice(0,yo),l=e.url.trim().slice(0,Ro),u=e.text?.trim().slice(0,ko),i=e.author?.trim().slice(0,Uo),a=e.kind==="pull"?"pull":"issue",m={providerId:e.providerId.trim(),id:r,title:n||r,url:l,kind:a};if(u)m.text=u;if(i)m.author=i;if(a==="pull"){let k=Oo(e.branches?.head),U=Oo(e.branches?.base);if(k&&U)m.branches={head:k,base:U}}if($o(e.data))m.data=e.data;return m},bt=(e)=>{let r=re(e);if(e.projectId)r.projectId=e.projectId;if(e.navigation)r.navigation=e.navigation;if(e.worktree)r.worktree=e.worktree;return r},xt=(e)=>{let r={text:e.text.trim().slice(0,vo)};if(e.send)r.send=!0;return r},vt=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(Lo,Math.max(0,Math.round(e)))},gt=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(Mo,Math.max(0,Math.ceil(e)))},ne=(e)=>e.length>0&&e.length<=Ie&&!e.includes("\x00")&&!e.includes("\\"),Pe=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>Io)return!1;return!e.split("/").some((n)=>n==="."||n==="..")},lr,yt=(e)=>Boolean(e&&"status"in e&&lr.has(String(e.status))&&!("body"in e)),Ge=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),Rt=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),kt=(e)=>Boolean(e&&"written"in e&&e.written===!0),Ut=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),pr,Ct=(e)=>Boolean(e&&"kind"in e&&"size"in e&&pr.has(String(e.kind))&&Number.isFinite(e.size)),wt=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),ur,Er=(e)=>Object(e)===e?e:null,St=(e)=>String(e)===e&&e.length>0,_r=(e)=>{if(!St(e.id))return null;if(e.ok===!0){let r={channel:S,v:f,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)r.payload=e.payload;return r}if(e.ok===!1&&St(e.error))return{channel:S,v:f,type:"result",id:e.id,ok:!1,error:e.error,code:Do(St(e.code)?e.code:void 0)};return null},It=(e)=>{let r=Er(e);if(!r||r.channel!==S||r.v!==f)return null;if(r.type==="result")return _r(r);if(!ur.has(String(r.type))||Object(r.payload)!==r.payload)return null;return r};var De=I(()=>{ve();bo=["file","directory","other","missing"],xo=/^[0-9a-f]{7,64}$/i,No=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],Po=["stopped","starting","ready","failed"],dr=new Set(No),lr=new Set(Po),pr=new Set(bo),ur=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"])});var Ho=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),Sr=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s",d,Fo=()=>Promise.reject(new d("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),$e=()=>Promise.reject(new d("BAD_PATH",`File path must be 1 to ${Ie} characters without NUL or backslash.`)),He=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new d("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},_=(e)=>(e.value+=1,`oc-${e.value}`),Se=(e={})=>{let r=e.target??("window"in globalThis?window:null);if(!r)throw new d("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let n=e.acceptSource??((t)=>t===r.parent),l=e.requestTimeoutMs??mt,u=new Set,i=new Set,a=new Set,m=new Set,k=new Set,U=new Set,G=new Set,Te=new Set,he=new Set,Z=new Set,Qe=[],ce=null,de=null,me=new Set,Ae=new Set,le=null,pe=null,Ze=!1,q=new Map,ee=new Map,te=new Map,B=!1,E={value:0},p=null,V=null,ue=!1,Ee=!1,Yt=null,Qt=(t)=>{if(!t)return null;return{sessionId:t.id,phase:t.busy?"started":"completed"}},D=(t)=>{r.parent.postMessage(t,"*")},Zt=()=>{if(B||r.parent===r||Z.size===0||p?.features?.lateGenerateResults!==!0)return;D({channel:S,v:f,type:"generate-late-listen"})},b=(t,o)=>{for(let s of t)try{s(o)}catch(c){console.error(c)}},qt=(t)=>{if(!(t instanceof MessageEvent))return;if(!n(t.source))return;let o=It(t.data);if(!o)return;if(o.type==="workspace"){let c=ee.get(o.payload.subscriptionId);if(c)b([c],o.payload.snapshot);return}if(o.type==="shells"){let c=te.get(o.payload.subscriptionId);if(c)b([c],o.payload.snapshot);return}if(o.type==="ready"){if(p=o.payload,V=Qt(o.payload.session),b(u,o.payload),b(i,o.payload.directory),b(a,o.payload.session),V)b(m,V);b(k,o.payload.connection),b(U,o.payload.settings),b(G,o.payload.item),Zt();return}if(o.type==="generate-late"){if(Z.size===0)Qe.push(o.payload);else b(Z,o.payload);return}if(o.type==="directory"){if(p)p={...p,directory:o.payload.directory};b(i,o.payload.directory);return}if(o.type==="session"){if(p)p={...p,session:o.payload.session};if(!o.payload.session)V=null;else if(V?.sessionId!==o.payload.session.id)V=Qt(o.payload.session);b(a,o.payload.session);return}if(o.type==="session-lifecycle"){V=o.payload,b(m,o.payload);return}if(o.type==="connection"){if(p)p={...p,connection:o.payload.connection};b(k,o.payload.connection);return}if(o.type==="settings"){if(p)p={...p,settings:o.payload.settings};b(U,o.payload.settings);return}if(o.type==="item"){if(p)p={...p,item:o.payload.item};b(G,o.payload.item);return}if(o.type==="status-control-event"){b(Te,o.payload);return}if(o.type==="popover-closed"){b(he,o.payload);return}if(o.type==="action"){let c=(T)=>{if(!B)D({channel:S,v:f,type:"action-result",id:o.id,payload:T})},h=de;if(!h){c({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>h(o.payload)).then(()=>c({ok:!0}),(T)=>{let y=(T instanceof Error?T.message:String(T)).trim();c({ok:!1,error:(y||"Action failed.").slice(0,_e)})});return}if(o.type==="file-open"){let c=o.payload;if(pe&&To(pe,c))return;pe=c,b(me,o.payload);return}if(o.type==="file-saved"){b(Ae,o.payload.version);return}if(o.type==="file-snapshot"){let c=(y)=>{if(!B)D({channel:S,v:f,type:"file-snapshot-result",id:o.id,payload:y})},h=(y)=>c({error:(y.trim()||"Could not read the edited file.").slice(0,_e)}),T=le;if(!T){h("This extension does not edit files.");return}Promise.resolve().then(()=>T(o.payload.purpose)).then((y)=>{if(lt(y)>ke){h(`The file is over ${ke} ${"bytes"in y?"bytes":"characters"}.`);return}if(y.version.length>Ue){h(`The snapshot version is over ${Ue} characters.`);return}c({snapshot:"bytes"in y?{bytes:y.bytes,version:y.version}:{content:y.content,version:y.version}})},(y)=>h(y instanceof Error?y.message:String(y)));return}if(o.type==="resolve"){let c=(T)=>{D({channel:S,v:f,type:"resolve-result",id:o.id,payload:T})},h=ce;if(!h){c({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>h(o.payload)).then((T)=>c({item:T?re(T):null}),(T)=>{let y=(T instanceof Error?T.message:String(T)).trim();c({error:(y||"Command failed.").slice(0,_e)})});return}let s=q.get(o.id);if(!s)return;if(clearTimeout(s.timer),q.delete(o.id),o.ok){s.resolve(o.payload);return}s.reject(new d(o.code,o.error))};r.addEventListener("message",qt),D({channel:S,v:f,type:"hello"});let w=(t,o=l)=>{if(B||r.parent===r)return Promise.reject(new d("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((s,c)=>{let h=setTimeout(()=>{q.delete(t.id),c(new d("HOST_TIMEOUT","Host did not answer in time."))},o);q.set(t.id,{resolve:s,reject:c,timer:h}),D(t)})},v=(t)=>w(t).then(()=>{return}),g={channel:S,v:f},qe=(t)=>{if(!B&&r.parent!==r)D(t)},eo=()=>qe({...g,type:"file-save"}),to=(t)=>{if(!Ho(t)||!Sr(t))return;t.preventDefault(),eo()},oo=(t)=>{if(!Ho(t)||t.key!=="Escape"||p?.surface!=="popover"||!p.popover)return;t.preventDefault(),io(p.popover.id,"escape").catch(()=>{return})},Oe=()=>{let t=p?.surface==="popover"?p.popover:void 0;if(!t)return;let o=ue||Ee;if(Yt===o)return;Yt=o,ao(t.id,o).catch(()=>{return})},be=()=>{if(p?.surface!=="popover"||ue)return;ue=!0,Oe()},ro=(t)=>{if(p?.surface!=="popover"||t.relatedTarget!==null||!ue)return;ue=!1,Oe()},no=()=>{if(p?.surface!=="popover"||Ee)return;Ee=!0,Oe()},so=()=>{if(p?.surface!=="popover"||!Ee)return;Ee=!1,Oe()},X=(t,o=1024)=>{if(!t.trim()||t.length>o)throw new d("HOST_REJECTED",`Identity must contain 1 to ${o} characters.`)},et=async(t)=>{if(t.kind!=="projects")X(t.projectId);let o=await w({...g,type:"workspace-read",id:_(E),payload:t});if(!o||!("kind"in o)||!("state"in o)||o.kind!==t.kind)throw new d("HOST_REJECTED","Host did not return workspace data.");return o},tt=async(t,o)=>{if(t.kind!=="projects")X(t.projectId);let s=_(E);ee.set(s,o);try{await v({...g,type:"workspace-subscribe",id:_(E),payload:{subscriptionId:s,query:t}})}catch(c){if(ee.delete(s),!B)D({...g,type:"workspace-unsubscribe",id:_(E),payload:{subscriptionId:s}});throw c}return()=>{if(!ee.delete(s)||B)return;D({...g,type:"workspace-unsubscribe",id:_(E),payload:{subscriptionId:s}})}},ir=async(t,o)=>{if(t.kind==="session")X(t.sessionId);if(t.kind==="project")X(t.projectId);let s=_(E);te.set(s,o);try{await v({...g,type:"shells-subscribe",id:_(E),payload:{subscriptionId:s,scope:t}})}catch(c){if(te.delete(s),!B)D({...g,type:"shells-unsubscribe",id:_(E),payload:{subscriptionId:s}});throw c}return()=>{if(!te.delete(s)||B)return;D({...g,type:"shells-unsubscribe",id:_(E),payload:{subscriptionId:s}})}},xe=async(t)=>{if("key"in t&&(t.key.length===0||t.key.length>nt))throw new d("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!oe(t.value))throw new d("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>st)throw new d("HOST_REJECTED","Storage value exceeds 64 KiB.");if(t.scope==="device"&&p?.features?.deviceStorage!==!0)throw new d("UNSUPPORTED","This host does not support device storage.");let o=await w({...g,type:"storage",id:_(E),payload:t});if(!o||!("storage"in o)||o.op!==t.op)throw new d("HOST_REJECTED","Host did not return storage data.");return o},io=(t,o)=>p?.features?.popovers!==!0&&!(p?.surface==="popover"&&p.popover?.id===t)?Promise.reject(new d("UNSUPPORTED","This host does not support popovers.")):v({...g,type:"popover-close",id:_(E),payload:o?{id:t,reason:o}:{id:t}}),ao=(t,o)=>p?.features?.popovers!==!0&&!(p?.surface==="popover"&&p.popover?.id===t)?Promise.reject(new d("UNSUPPORTED","This host does not support popovers.")):v({...g,type:"popover-anchor",id:_(E),payload:{id:t,active:o}});return r.addEventListener("keydown",oo,!0),r.addEventListener("pointerover",be),r.addEventListener("pointermove",be),r.addEventListener("pointerout",ro),r.addEventListener("focus",no),r.addEventListener("blur",so),{onAction:(t)=>(de=t,()=>{if(de===t)de=null}),listProjects:async()=>{let t=await et({kind:"projects"});if(t.kind!=="projects")throw new d("HOST_REJECTED","Expected projects.");return t},listWorktrees:async(t)=>{let o=await et({kind:"worktrees",projectId:t});if(o.kind!=="worktrees")throw new d("HOST_REJECTED","Expected worktrees.");return o},listSessions:async(t)=>{let o=await et({kind:"sessions",projectId:t});if(o.kind!=="sessions")throw new d("HOST_REJECTED","Expected sessions.");return o},onProjects:(t)=>tt({kind:"projects"},(o)=>{if(o.kind==="projects")t(o)}),onWorktrees:(t,o)=>tt({kind:"worktrees",projectId:t},(s)=>{if(s.kind==="worktrees")o(s)}),onSessions:(t,o)=>tt({kind:"sessions",projectId:t},(s)=>{if(s.kind==="sessions")o(s)}),onRunningShells:(t,o)=>ir(t,o),readShellOutput:async(t,o)=>{X(t,ye);let s=o?.cursor;if(s!==void 0&&(!Number.isInteger(s)||s<0))throw new d("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let c=o?.tailBytes;if(c!==void 0&&(!Number.isInteger(c)||c<1||c>Re))throw new d("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${Re}.`);let T=await w({...g,type:"shell-output",id:_(E),payload:{shellId:t,cursor:s,tailBytes:c}});if(!T||typeof T.output!=="string"||!Number.isFinite(T.cursor))throw new d("HOST_REJECTED","Host did not return shell output.");return T},stopShell:async(t)=>{if(X(t,ye),(await w({...g,type:"shell-stop",id:_(E),payload:{shellId:t}}))?.stopped!==!0)throw new d("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(t)=>{X(t),await v({...g,type:"open-session",id:_(E),payload:{sessionId:t}})},storage:{get:async(t,o)=>{let s=He(o),c={op:"get",key:t};if(s)c.scope=s;let h=await xe(c);return h.op==="get"&&h.found?h.value:void 0},set:async(t,o,s)=>{let c=He(s),h={op:"set",key:t,value:o};if(c)h.scope=c;await xe(h)},delete:async(t,o)=>{let s=He(o),c={op:"delete",key:t};if(s)c.scope=s;await xe(c)},keys:async(t)=>{let o=He(t),s={op:"keys"};if(o)s.scope=o;let c=await xe(s);if(c.op!=="keys")throw new d("HOST_REJECTED","Expected storage keys.");return c.keys}},onReady:(t)=>{if(u.add(t),p)t(p);return()=>{u.delete(t)}},onDirectory:(t)=>{if(i.add(t),p)t(p.directory);return()=>{i.delete(t)}},onSession:(t)=>{if(a.add(t),p)t(p.session);return()=>{a.delete(t)}},onSessionLifecycle:(t)=>{if(m.add(t),V)t(V);return()=>{m.delete(t)}},onConnection:(t)=>{if(k.add(t),p)t(p.connection);return()=>{k.delete(t)}},onSettings:(t)=>{if(U.add(t),p)t(p.settings);return()=>{U.delete(t)}},onItem:(t)=>{if(G.add(t),p)t(p.item);return()=>{G.delete(t)}},onStatusControl:(t)=>(Te.add(t),()=>{Te.delete(t)}),onPopoverClosed:(t)=>(he.add(t),()=>{he.delete(t)}),setStatusControls:(t)=>{if(p?.features?.statusControls!==!0)return Promise.reject(new d("UNSUPPORTED","This host does not support status controls."));if(!_o(t))return Promise.reject(new d("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return v({...g,type:"status-controls",id:_(E),payload:{controls:t}})},openPopover:(t)=>{if(p?.features?.popovers!==!0)return Promise.reject(new d("UNSUPPORTED","This host does not support popovers."));if(!Et(t))return Promise.reject(new d("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return v({...g,type:"popover-open",id:_(E),payload:t})},closePopover:io,setPopoverAnchorActive:ao,onResolve:(t)=>(ce=t,()=>{if(ce===t)ce=null}),toast:(t)=>{let o=t.message.trim();if(!o||o.length>Ce)return Promise.reject(new d("HOST_REJECTED",`Toast message must contain 1 to ${Ce} characters.`));if(t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>we))return Promise.reject(new d("HOST_REJECTED",`Toast copy text must contain 1 to ${we} characters.`));return v({channel:S,v:f,type:"toast",id:_(E),payload:{...t,message:o}})},openUrl:(t)=>v({channel:S,v:f,type:"open-url",id:_(E),payload:{url:t}}),openCommit:(t)=>ht(t)?v({channel:S,v:f,type:"open-commit",id:_(E),payload:{sha:t}}):Promise.reject(new d("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(t)=>v({channel:S,v:f,type:"open-surface",id:_(E),payload:{surfaceId:t}}),writeClipboard:(t)=>v({channel:S,v:f,type:"clipboard-write",id:_(E),payload:{text:t}}),compose:(t)=>v({channel:S,v:f,type:"compose",id:_(E),payload:t}),attach:(t)=>v({channel:S,v:f,type:"attach",id:_(E),payload:re(t)}),startSession:async(t)=>{if(t.projectId!==void 0)X(t.projectId);let o=t.worktree;if(o&&o!==!0)if(o.kind==="existing")X(o.directory);else{if(o.name!==void 0)X(o.name,200);if(o.baseBranch!==void 0)X(o.baseBranch,200)}let s=await w({channel:S,v:f,type:"start-session",id:_(E),payload:bt(t)},e.requestTimeoutMs??180000);if(!ft(s))throw new d("HOST_REJECTED","Host did not return a session.");return s},prompt:(t)=>w({channel:S,v:f,type:"prompt",id:_(E),payload:xt(t)}).then((o)=>{if(!Tt(o))throw new d("HOST_REJECTED","Host did not return a prompt result.");return o}),sessionLink:(t)=>v({channel:S,v:f,type:"session-link",id:_(E),payload:re(t)}),close:()=>v({channel:S,v:f,type:"close",id:_(E)}),oauthStart:()=>v({channel:S,v:f,type:"oauth-start",id:_(E)}),oauthDisconnect:()=>v({channel:S,v:f,type:"oauth-disconnect",id:_(E)}),request:(t)=>(Pe(t.path)?w({channel:S,v:f,type:"request",id:_(E),payload:t}):Fo()).then((o)=>{if(!Ge(o))throw new d("HOST_REJECTED","Host request result was empty.");return o}),serviceRequest:(t)=>(Pe(t.path)?w({channel:S,v:f,type:"service-request",id:_(E),payload:t}):Fo()).then((o)=>{if(!Ge(o))throw new d("HOST_REJECTED","Host service request result was empty.");return o}),serviceStatus:()=>w({channel:S,v:f,type:"service-status",id:_(E)}).then((t)=>{if(!yt(t))throw new d("HOST_REJECTED","Host did not return service status.");return t}),readFile:(t)=>(ne(t)?w({channel:S,v:f,type:"file-read",id:_(E),payload:{path:t}}):$e()).then((o)=>{if(!Rt(o))throw new d("HOST_REJECTED","Host did not return file content.");return o}),writeFile:(t,o)=>{if(!ne(t))return $e();if(o.length>Le)return Promise.reject(new d("FILE_TOO_LARGE",`Content is over ${Le} characters.`));return w({channel:S,v:f,type:"file-write",id:_(E),payload:{path:t,content:o}}).then((s)=>{if(!kt(s))throw new d("HOST_REJECTED","Host did not confirm the write.");return s})},listDir:(t)=>(ne(t)?w({channel:S,v:f,type:"file-list",id:_(E),payload:{path:t}}):$e()).then((o)=>{if(!Ut(o))throw new d("HOST_REJECTED","Host did not return directory entries.");return o}),stat:(t)=>(ne(t)?w({channel:S,v:f,type:"file-stat",id:_(E),payload:{path:t}}):$e()).then((o)=>{if(!Ct(o))throw new d("HOST_REJECTED","Host did not return file status.");return o}),generate:(t)=>{let o=t.prompt.trim(),s=t.system?.trim();if(o.length===0||o.length>Me)return Promise.reject(new d("HOST_REJECTED",`Prompt must be 1 to ${Me} characters.`));if(s!==void 0&&(s.length===0||s.length>Ne))return Promise.reject(new d("HOST_REJECTED",`System prompt must be 1 to ${Ne} characters.`));let c=t.maxOutputTokens===void 0?void 0:Math.min(At,Math.max(1,Math.floor(t.maxOutputTokens)));if(c!==void 0&&!Number.isFinite(c))return Promise.reject(new d("HOST_REJECTED","maxOutputTokens must be a number."));let h={prompt:o};if(s!==void 0)h.system=s;if(c!==void 0)h.maxOutputTokens=c;return w({channel:S,v:f,type:"generate",id:_(E),payload:h},e.requestTimeoutMs??Ot).then((T)=>{if(!wt(T))throw new d("HOST_REJECTED","Host did not return generated text.");return T})},onLateGenerateResult:(t)=>{Z.add(t);for(let o of Qe.splice(0))b([t],o);return Zt(),()=>{Z.delete(t)}},setBadge:(t)=>v({channel:S,v:f,type:"badge",id:_(E),payload:{count:vt(t)}}),setHeight:(t)=>v({channel:S,v:f,type:"resize",id:_(E),payload:{height:gt(t)}}),onFileOpen:(t)=>{if(me.add(t),!Ze)Ze=!0,r.addEventListener("keydown",to,!0);if(pe)t(pe);return()=>{me.delete(t)}},onFileSnapshot:(t)=>(le=t,()=>{if(le===t)le=null}),onFileSaved:(t)=>(Ae.add(t),()=>{Ae.delete(t)}),reportFileChange:(t)=>qe({...g,type:"file-change",payload:{dirty:t.dirty,edited:t.edited}}),requestFileSave:eo,reportFileUnsupported:()=>qe({...g,type:"file-unsupported"}),dispose:()=>{for(let t of ee.keys())D({...g,type:"workspace-unsubscribe",id:_(E),payload:{subscriptionId:t}});ee.clear();for(let t of te.keys())D({...g,type:"shells-unsubscribe",id:_(E),payload:{subscriptionId:t}});if(te.clear(),B=!0,ce=null,de=null,le=null,me.clear(),Ae.clear(),Ze)r.removeEventListener("keydown",to,!0);r.removeEventListener("message",qt),r.removeEventListener("keydown",oo,!0),r.removeEventListener("pointerover",be),r.removeEventListener("pointermove",be),r.removeEventListener("pointerout",ro),r.removeEventListener("focus",no),r.removeEventListener("blur",so);for(let t of q.values())clearTimeout(t.timer),t.reject(new d("HOST_UNAVAILABLE","Host client was disposed."));q.clear(),u.clear(),i.clear(),a.clear(),m.clear(),k.clear(),U.clear(),G.clear(),Te.clear(),he.clear(),Z.clear(),Qe.length=0}}};var Xo=I(()=>{ve();ct();_t();pt();De();it();d=class d extends Error{code;constructor(e,r){super(r);this.name="HostRequestError",this.code=e}}});var Bo,sn;var Vo=I(()=>{Bo=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"],sn=new Set(Bo)});var jo,cn;var zo=I(()=>{jo=["none","agent","user"],cn=new Set(jo)});var Lt=I(()=>{ve();ge();it();ct();dt();So();fo();pt();Xo();_t();De();De();Vo();zo()});function jt(e){Rr=e}async function er(){try{let e=await We.readFile(".vstack/manifest.json");return JSON.parse(e.content)}catch{return null}}async function tr(){try{let e=await We.readFile(".vstack/state/index.json");return JSON.parse(e.content)}catch{return null}}async function ae(e){try{let r=await We.readFile(`.vstack/reports/deliveries/${e}.json`);return JSON.parse(r.content)}catch{return null}}async function or(e){try{let r=await We.readFile(`.vstack/reports/quality/${e}.json`);return JSON.parse(r.content)}catch{return null}}var We,Rr=null;var Y=I(()=>{Lt();We=Se()});Lt();var fr=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],Tr=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],Wo=(e,r)=>{r.style.colorScheme=e.mode;for(let[n,l]of fr)r.style.setProperty(n,e.tokens[l]);for(let[n,l,u]of Tr){let i=e.tokens[u]??"";r.style.setProperty(n,i),r.style.setProperty(l,i)}r.style.setProperty("font-family",e.tokens.font),r.style.setProperty("font-size","0.875rem"),r.style.setProperty("line-height","1.45"),r.style.setProperty("color",e.tokens.foreground)},Mt=(e,r)=>{if(Wo(e.theme,r),r.dataset)r.dataset.ocSurface=e.surface,r.dataset.ocTheme=e.theme.mode};ge();var hr={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},O=(e,r)=>`var(--${e}, var(--oc-${hr[e]}, ${r}))`,z=O("surface-background","transparent"),Xe=O("surface-elevated","transparent"),se=O("surface-elevated-foreground","inherit"),F=O("surface-foreground","inherit"),A=O("surface-muted-foreground","gray"),mr=O("surface-muted","transparent"),K=O("interactive-border","currentColor"),L=O("interactive-hover","transparent"),J=O("interactive-active","transparent"),Nt=O("interactive-selection","transparent"),Pt=O("interactive-selection-foreground","inherit"),j=O("primary","currentColor"),Gt=O("primary-text","inherit"),Dt=O("error-text","inherit"),Ar=O("font-sans","inherit"),$t=O("font-mono","monospace"),Zo=O("radius","9px"),Ht=`calc(${Zo} - 2px)`,Ko=`calc(${Zo} - 4px)`,x=(e,r,n="transparent")=>`color-mix(in srgb, ${e} ${r}%, ${n})`,Jo=`background-image: linear-gradient(${L}, ${L});`,Ft=(e)=>`box-shadow: inset 0 0 0 1px ${e}, var(--oc-sdk-field-lift);`,Xt="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",Yo="box-shadow: var(--oc-sdk-lit);",Qo=`inset 0 1px 0 0 ${x(F,1.5)}, 0 1px 1px 0 rgb(0 0 0 / 0.28), 0 2px 3px -2px rgb(0 0 0 / 0.2)`,Or=`
:root {
  --oc-sdk-edge: ${x(F,10)};
  --oc-sdk-field-bg: ${Xe};
  --oc-sdk-raised-bg: ${z};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 2px 0 rgb(0 0 0 / 0.06);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.45), 0 1px 2px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.1);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.8), inset 0 0 0 1px rgb(0 0 0 / 0.04), 0 1px 2px -0.5px rgb(0 0 0 / 0.08), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.08);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${x(F,6)};
  --oc-sdk-field-bg: ${x(z,50,Xe)};
  --oc-sdk-raised-bg: ${Xe};
  --oc-sdk-field-lift: ${Qo};
  --oc-sdk-raised-lift: ${Qo};
  --oc-sdk-lit: inset 0 1px 0 0 ${x(F,1.5)}, 0 1px 1px 0 rgb(0 0 0 / 0.28), 0 2px 3px -2px rgb(0 0 0 / 0.2);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.36);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.06), inset 0 0 0 1px rgb(255 255 255 / 0.08), 0 1px 1px -0.5px rgb(0 0 0 / 0.22), 0 3px 3px -1.5px rgb(0 0 0 / 0.2), 0 6px 6px -3px rgb(0 0 0 / 0.16);
}`,Fe=(e)=>{let r=O(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${r}; --oc-sdk-tone-text: ${O(`${e}-text`,"inherit")}; }`},br=`
.oc-sdk { box-sizing: border-box; font-size: 0.875rem; line-height: 1.45; }
.oc-sdk *, .oc-sdk *::before, .oc-sdk *::after { box-sizing: border-box; }
/* :where() keeps the reset at zero specificity so every primitive class below overrides it. */
:where(.oc-sdk) :where(button, input, textarea), :where(button.oc-sdk, input.oc-sdk, textarea.oc-sdk) { font: inherit; color: inherit; margin: 0; }
:where(.oc-sdk) :where(button), :where(button.oc-sdk) { cursor: pointer; background: none; border: 0; padding: 0; }
.oc-sdk button:disabled, button.oc-sdk:disabled, .oc-sdk[aria-disabled="true"], .oc-sdk [aria-disabled="true"] { opacity: .5; pointer-events: none; }

.oc-sdk-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; height: 32px; padding: 0 12px; border: 1px solid transparent; font-size: 0.875rem; font-weight: 500; line-height: 1; white-space: nowrap; }
.oc-sdk-btn[data-size="sm"] { gap: 6px; height: 28px; padding: 0 10px; font-size: 0.8125rem; }
.oc-sdk-btn[data-size="xs"] { gap: 4px; height: 24px; padding: 0 8px; font-size: 0.75rem; }
.oc-sdk-btn[data-loading="true"] { opacity: .5; pointer-events: none; }
.oc-sdk-btn > .oc-sdk-spinner-ring { width: 14px; height: 14px; }

.oc-sdk-field { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-field-label { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-field-note { font-size: 0.75rem; }
.oc-sdk-input { display: block; width: 100%; min-width: 0; height: 32px; padding: 0 10px; border: 0; font-size: 0.875rem; line-height: 1.45; appearance: none; }
textarea.oc-sdk-input { height: auto; padding: 8px 10px; resize: vertical; }

.oc-sdk-search { position: relative; min-width: 0; }
.oc-sdk-search .oc-sdk-input { padding-left: 34px; padding-right: 34px; }
.oc-sdk-search-icon { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); pointer-events: none; }
.oc-sdk-search-clear { position: absolute; right: 6px; top: 50%; transform: translateY(-50%); display: none; align-items: center; justify-content: center; width: 24px; height: 24px; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-clear { display: inline-flex; }

.oc-sdk-select { position: relative; display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-trigger { display: inline-flex; align-items: center; gap: 6px; align-self: flex-start; width: auto; max-width: 100%; min-width: 0; height: 28px; padding: 0 10px; border: 1px solid transparent; font-size: 0.8125rem; text-align: left; }
.oc-sdk-trigger-value { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-trigger-chevron { flex: 0 0 auto; }
.oc-sdk-popup { position: fixed; z-index: 50; display: flex; flex-direction: column; gap: 2px; min-width: 160px; max-width: calc(100vw - 16px); max-height: min(320px, calc(100vh - 16px)); overflow: auto; padding: 4px; border: 1px solid transparent; }
.oc-sdk-popup-search { flex: 0 0 auto; padding: 2px 2px 4px; }
.oc-sdk-popup-search .oc-sdk-input { height: 28px; font-size: 0.8125rem; }
.oc-sdk-option { display: flex; align-items: center; gap: 8px; width: 100%; padding: 6px 8px; font-size: 0.8125rem; text-align: left; }
.oc-sdk-option-label { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-option-hint { flex: 0 0 auto; font-size: 0.75rem; }
.oc-sdk-option-check { flex: 0 0 auto; display: inline-flex; width: 14px; visibility: hidden; }
.oc-sdk-option[aria-selected="true"] > .oc-sdk-option-check { visibility: visible; }
.oc-sdk-popup-empty { padding: 8px; font-size: 0.8125rem; }

.oc-sdk-check { display: inline-flex; align-items: flex-start; gap: 8px; width: 100%; text-align: left; }
.oc-sdk-check-box { flex: 0 0 auto; display: inline-flex; align-items: center; justify-content: center; width: 14px; height: 14px; margin-top: 3px; border: 1px solid transparent; }
.oc-sdk-check-box > svg { display: none; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box > svg { display: block; }
.oc-sdk-check-thumb { flex: 0 0 auto; position: relative; width: 36px; height: 20px; }
.oc-sdk-check-thumb::after { content: ""; position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; }
.oc-sdk-check-text { display: flex; flex-direction: column; min-width: 0; }
.oc-sdk-check-label { font-size: 0.875rem; }
.oc-sdk-check-desc { font-size: 0.75rem; }

.oc-sdk-tabs { display: inline-flex; gap: 2px; padding: 2px; max-width: 100%; overflow: auto; }
.oc-sdk-tab { display: inline-flex; align-items: center; gap: 6px; height: 28px; padding: 0 10px; border: 1px solid transparent; font-size: 0.8125rem; font-weight: 500; white-space: nowrap; }
.oc-sdk-tab-count { font-size: 0.75rem; font-variant-numeric: tabular-nums; }

.oc-sdk-badge { display: inline-flex; align-items: center; padding: 1px 6px; font-size: 11px; font-weight: 500; line-height: 16px; white-space: nowrap; }

.oc-sdk-list { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.oc-sdk-row { display: flex; align-items: center; gap: 8px; width: 100%; padding: 6px 8px; text-align: left; }
.oc-sdk-row-lead { flex: 0 0 auto; width: 64px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-main { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; }
.oc-sdk-row-title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-row-sub { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-meta { flex: 0 0 auto; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-list-empty { padding: 16px 8px; text-align: center; font-size: 0.8125rem; }

.oc-sdk-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; padding: 40px 16px; text-align: center; }
.oc-sdk-empty-title { margin: 0; font-size: 0.8125rem; font-weight: 600; }
.oc-sdk-empty-body { margin: 0; max-width: 32rem; font-size: 0.8125rem; }
.oc-sdk-empty-action { margin-top: 12px; }

@keyframes oc-sdk-spin { to { transform: rotate(360deg); } }
.oc-sdk-spinner { display: inline-flex; align-items: center; gap: 8px; font-size: 0.8125rem; }
.oc-sdk-spinner-ring { width: 16px; height: 16px; border: 2px solid transparent; animation: oc-sdk-spin .8s linear infinite; }
.oc-sdk-spinner[data-size="sm"] .oc-sdk-spinner-ring { width: 12px; height: 12px; }

.oc-sdk-banner { display: flex; align-items: flex-start; gap: 12px; padding: 8px 12px; border: 1px solid transparent; }
.oc-sdk-banner-text { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.oc-sdk-banner-title { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-banner-body { font-size: 0.8125rem; }
.oc-sdk-banner-action { flex: 0 0 auto; }

.oc-sdk-separator { display: flex; align-items: center; gap: 8px; width: 100%; margin: 8px 0; font-size: 0.75rem; }
.oc-sdk-separator::before, .oc-sdk-separator::after { content: ""; flex: 1 1 auto; height: 1px; }
.oc-sdk-separator[data-labeled="false"]::after { display: none; }
.oc-sdk-popup > .oc-sdk-separator { margin: 4px 0; }

.oc-sdk-progress { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-progress-label { display: flex; justify-content: space-between; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-progress-track { height: 6px; overflow: hidden; }
.oc-sdk-progress-fill { height: 100%; transform-origin: left; transition: transform 200ms ease-out; }

.oc-sdk-menu { position: relative; display: inline-flex; }

.oc-sdk-text { white-space: pre-wrap; overflow-wrap: anywhere; }
.oc-sdk-text img { display: block; max-width: 100%; margin: 8px 0; }
`,qo=`${Or}
.oc-sdk { color: ${F}; font-family: ${Ar}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${Jo} }
.oc-sdk-mono { font-family: ${$t}; }
.oc-sdk-muted { color: ${A}; }
${Fe("success")}${Fe("warning")}${Fe("error")}${Fe("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${j}; --oc-sdk-tone-text: ${Gt}; }

.oc-sdk-btn { border-radius: ${Ht}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${Ko}; }
.oc-sdk-btn[data-variant="default"] { color: ${Gt}; background: ${x(j,10,z)}; border-color: ${x(j,12)}; ${Yo} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${x(j,16,z)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${x(j,22,z)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${mr}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${L}, ${L}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${J}, ${J}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${se}; ${Xt} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${L}, ${L}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${J}, ${J}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${L}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${J}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${O("status-error","red")}; color: ${Dt}; background: ${x("var(--oc-sdk-tone)",7,z)}; border-color: ${x("var(--oc-sdk-tone)",12)}; ${Yo} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${x("var(--oc-sdk-tone)",9,z)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${x("var(--oc-sdk-tone)",11,z)}; box-shadow: none; }

.oc-sdk-field-note { color: ${A}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${Dt}; }
.oc-sdk-input { border-radius: ${Ht}; background: var(--oc-sdk-field-bg); color: ${se}; ${Ft("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${A}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${L}, ${L}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${Ft(x(F,26))} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${Ft(O("status-error","red"))} }
.oc-sdk-input[data-mono="true"] { font-family: ${$t}; }

.oc-sdk-search-icon { color: ${A}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${j}; }
.oc-sdk-search-clear { border-radius: ${Ko}; color: ${A}; }
.oc-sdk-search-clear:hover { background: ${L}; color: ${F}; }

.oc-sdk-trigger { border-radius: ${Ht}; background: var(--oc-sdk-raised-bg); color: ${se}; ${Xt} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${L}, ${L}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${J}, ${J}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${A}; }
.oc-sdk-trigger-chevron { color: ${A}; }
/* The app's dropdown light: lit top, hairline rings and a layered shadow. Its outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${se}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${Xe}; background-clip: padding-box; color: ${se}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${L}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${Nt}; color: ${Pt}; }
.oc-sdk-option-check { color: ${F}; }
.oc-sdk-option[data-destructive="true"] { color: ${Dt}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${x(O("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${A}; }
.oc-sdk-popup-empty { color: ${A}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${K}; border-radius: 4px; color: ${F}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${x(F,60,K)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${K}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${z}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${j}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${Jo} }
.oc-sdk-check-desc { color: ${A}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${x(F,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${A}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${F}; }
.oc-sdk-tab[aria-selected="true"] { color: ${Pt}; background: ${Nt}; border-color: ${K}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${se}; background: var(--oc-sdk-raised-bg); ${Xt} }
.oc-sdk-tab-count { color: ${A}; }

.oc-sdk-badge { border-radius: 9999px; background: ${L}; color: ${A}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${x("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${L}; }
.oc-sdk-row[aria-selected="true"] { background: ${Nt}; color: ${Pt}; }
.oc-sdk-row-lead { font-family: ${$t}; color: ${A}; }
.oc-sdk-row-sub { color: ${A}; }
.oc-sdk-row-meta { color: ${A}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${A}; }

.oc-sdk-empty-body { color: ${A}; }

.oc-sdk-spinner { color: ${A}; }
.oc-sdk-spinner-ring { border-color: ${K}; border-top-color: ${j}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${x("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${A}; }

.oc-sdk-separator { color: ${A}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${x(K,40)}; }

.oc-sdk-progress-label { color: ${A}; }
.oc-sdk-progress-track { border-radius: 9999px; background: ${K}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${j}); }

.oc-sdk-text a { color: ${Gt}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${x(K,60)}; }
`,M=`
${ot}
${br}
${qo}`;ge();Y();var kr=3000,rr=1,nr=Se(),Je=null,Kt=null,fe=null,sr="overview",C=null,H=[];nr.onReady((e)=>{if(Mt(e,document.documentElement),document.body.dataset.theme=e.theme.mode,document.body.dataset.surface=e.surface,Je=e.directory,jt(e.directory),Ke(),fe)clearInterval(fe);fe=window.setInterval(()=>{if(document.visibilityState==="visible")Ke()},kr),nr.onDirectory((r)=>{if(r!==Je)Je=r,jt(r),Ke()}),window.addEventListener("beforeunload",()=>{if(fe)clearInterval(fe)}),document.getElementById("refreshBtn")?.addEventListener("click",Ke),document.getElementById("deliverySelect")?.addEventListener("change",(r)=>{C=r.target.value||null,Ye()}),document.getElementById("tabs")?.addEventListener("click",(r)=>{let n=r.target;if(!n.classList.contains("tab"))return;document.querySelectorAll(".tab").forEach((l)=>{l.classList.remove("active"),l.setAttribute("aria-selected","false")}),document.querySelectorAll(".tab-panel").forEach((l)=>l.classList.remove("active")),n.classList.add("active"),n.setAttribute("aria-selected","true"),document.getElementById(`panel-${n.dataset.tab}`)?.classList.add("active"),sr=n.dataset.tab,Ye()})});async function Ke(){if(!Je){zt("No project open");return}try{await Promise.resolve().then(() => Y());let n=await er();if(!n){zt("No vstack workflow found in this project");return}if(n.schemaVersion!==rr){Wt(Error(`Unsupported schema version: ${n.schemaVersion}. Expected ${rr}`));return}let l=await tr();if(!l){zt("No active workflow state");return}if(H=l.activeDeliveries||[],Jt(),!C&&H.length>0)C=H[0].id,Jt();Ye(),Kt=new Date,Mr()}catch(e){if(console.error("Failed to load dashboard:",e),e instanceof Error&&e.message.includes("NOT_GRANTED"))Wt(Error("Files permission denied. Please approve the 'files' capability in OpenChamber Settings."));else Wt(e)}}function Jt(){let e=document.getElementById("deliverySelect");if(!e)return;e.innerHTML='<option value="">Select delivery...</option>'+H.map((r)=>`<option value="${r.id}" ${r.id===C?"selected":""}>${R(r.title)} (${r.status})</option>`).join(""),e.disabled=H.length===0}function Ye(){switch(sr){case"overview":Ur();break;case"quality":Cr();break;case"reviews":wr();break;case"releases":Ir();break;case"evidence":Lr();break}}async function Ur(){let e=document.getElementById("overviewGrid");if(H.length===0){e.innerHTML='<div class="empty-state">No active deliveries. Create one with vstack_delivery_create.</div>';return}let r=C?H.find((i)=>i.id===C):H[0];if(!r){e.innerHTML='<div class="empty-state">No delivery selected</div>';return}let n=H.filter((i)=>i.status==="completed").length,l=H.length,u=l>0?n/l*100:0;e.innerHTML=`
    <div class="card">
      <h3>Delivery: ${R(r.title)}</h3>
      <div class="stat-row"><span class="stat-label">Type</span><span class="stat-value"><span class="type-badge type-${r.type}">${r.type}</span></span></div>
      <div class="stat-row"><span class="stat-label">Profile</span><span class="stat-value">${R(r.profile)}</span></div>
      <div class="stat-row"><span class="stat-label">Status</span><span class="stat-value"><span class="status-badge-cell status-${r.status}">${r.status}</span></span></div>
      <div class="stat-row"><span class="stat-label">Current Phase</span><span class="stat-value">${R(r.currentPhase)}</span></div>
      <div class="stat-row"><span class="stat-label">Revision</span><span class="stat-value">${r.revision}</span></div>
      <div class="stat-row"><span class="stat-label">Updated</span><span class="stat-value">${Q(r.updatedAt)}</span></div>
    </div>
    
    <div class="card">
      <h3>Workflow Progress</h3>
      <div class="stat-row"><span class="stat-label">Total Deliveries</span><span class="stat-value">${l}</span></div>
      <div class="stat-row"><span class="stat-label">Completed</span><span class="stat-value passed">${n}</span></div>
      <div class="stat-row"><span class="stat-label">Active</span><span class="stat-value">${H.filter((i)=>i.status==="active").length}</span></div>
      <div class="stat-row"><span class="stat-label">Blocked</span><span class="stat-value warning">${H.filter((i)=>i.status==="blocked").length}</span></div>
      <div class="stat-row"><span class="stat-label">Progress</span><span class="stat-value">${u.toFixed(0)}%</span></div>
    </div>
    
    <div class="card" style="grid-column: 1 / -1;">
      <h3>All Deliveries</h3>
      <div class="table-wrapper">
        <table>
          <thead>
            <tr><th>Title</th><th>Type</th><th>Profile</th><th>Status</th><th>Phase</th><th>Revision</th><th>Updated</th></tr>
          </thead>
          <tbody>
            ${H.map((i)=>`
              <tr class="${i.id===C?"selected":""}" style="cursor: pointer;" data-id="${i.id}">
                <td>${R(i.title)}</td>
                <td><span class="type-badge type-${i.type}">${i.type}</span></td>
                <td>${R(i.profile)}</td>
                <td><span class="status-badge-cell status-${i.status}">${i.status}</span></td>
                <td>${R(i.currentPhase)}</td>
                <td>${i.revision}</td>
                <td>${Q(i.updatedAt)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `,document.querySelectorAll("#overviewGrid tbody tr[data-id]").forEach((i)=>{i.addEventListener("click",()=>{C=i.getAttribute("data-id"),Jt(),Ye()})})}async function Cr(){let e=document.getElementById("qualityContent");if(!C){e.innerHTML='<div class="empty-state">Select a delivery to view quality checks</div>';return}try{await Promise.resolve().then(() => Y());let n=await or(C);if(!n){e.innerHTML='<div class="empty-state">No quality summary available</div>';return}e.innerHTML=`
      <div class="quality-summary">
        <div class="quality-stats">
          <div class="stat">
            <span class="stat-value">${n.checksTotal}</span>
            <span class="stat-label">Total Checks</span>
          </div>
          <div class="stat">
            <span class="stat-value passed">${n.checksPassed}</span>
            <span class="stat-label">Passed</span>
          </div>
          <div class="stat">
            <span class="stat-value failed">${n.checksFailed}</span>
            <span class="stat-label">Failed</span>
          </div>
          <div class="stat">
            <span class="stat-value warning">${n.checksSkipped}</span>
            <span class="stat-label">Skipped</span>
          </div>
        </div>
        
        <div class="quality-breakdown">
          <h4>By Type</h4>
          <div class="table-wrapper">
            <table class="evidence-table">
              <thead>
                <tr><th>Type</th><th>Passed</th><th>Failed</th></tr>
              </thead>
              <tbody>
                ${Object.entries(n.checksByType).map(([l,u])=>`
                  <tr><td>${R(l)}</td><td>${u.passed}</td><td>${u.failed}</td></tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
        
        <div class="quality-findings">
          <h4>Review Findings</h4>
          <div class="quality-stats">
            <div class="stat">
              <span class="stat-value failed">${n.reviewFindings.critical}</span>
              <span class="stat-label">Critical</span>
            </div>
            <div class="stat">
              <span class="stat-value failed">${n.reviewFindings.high}</span>
              <span class="stat-label">High</span>
            </div>
            <div class="stat">
              <span class="stat-value warning">${n.reviewFindings.medium}</span>
              <span class="stat-label">Medium</span>
            </div>
            <div class="stat">
              <span class="stat-value">${n.reviewFindings.low}</span>
              <span class="stat-label">Low</span>
            </div>
          </div>
        </div>
      </div>
    `}catch(r){console.error("Failed to render quality:",r),e.innerHTML='<div class="error-state">Failed to load quality data</div>'}}async function wr(){let e=document.getElementById("reviewsContent");if(!C){e.innerHTML='<div class="empty-state">Select a delivery to view reviews</div>';return}try{await Promise.resolve().then(() => Y());let n=await ae(C);if(!n){e.innerHTML='<div class="empty-state">Delivery report not found</div>';return}let l=n.reviewSessions||[],u=n.reviewFindings||[];if(l.length===0&&u.length===0){e.innerHTML='<div class="empty-state">No reviews conducted yet</div>';return}let i=`
      <div class="reviews-summary">
        <div class="quality-stats">
          <div class="stat">
            <span class="stat-value">${l.length}</span>
            <span class="stat-label">Review Runs</span>
          </div>
          <div class="stat">
            <span class="stat-value">${u.length}</span>
            <span class="stat-label">Total Findings</span>
          </div>
          <div class="stat">
            <span class="stat-value failed">${u.filter((a)=>a.severity==="critical"||a.severity==="high").length}</span>
            <span class="stat-label">Critical/High</span>
          </div>
          <div class="stat">
            <span class="stat-value passed">${u.filter((a)=>a.disposition==="fixed"||a.disposition==="resolved").length}</span>
            <span class="stat-label">Resolved</span>
          </div>
        </div>
      </div>
    `;if(l.length>0)i+=`
        <div class="review-runs">
          <h4>Review Runs</h4>
          <div class="table-wrapper">
            <table class="review-table">
              <thead>
                <tr><th>Type</th><th>Independence</th><th>Reviewer</th><th>Status</th><th>Findings</th><th>Started</th><th>Completed</th></tr>
              </thead>
              <tbody>
                ${l.map((a)=>`
                  <tr>
                    <td><span class="type-badge type-${a.type}">${a.type}</span></td>
                    <td>${a.independence}</td>
                    <td>${a.reviewerId}</td>
                    <td><span class="status-badge-cell status-${a.status}">${a.status}</span></td>
                    <td>${a.findings?.length||0}</td>
                    <td>${Q(a.startedAt)}</td>
                    <td>${a.completedAt?Q(a.completedAt):"-"}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
      `;if(u.length>0){let a=u.reduce((k,U)=>((k[U.severity]??(k[U.severity]=[])).push(U),k),{});i+=`
        <div class="findings">
          <h4>Findings by Severity</h4>
          ${["critical","high","medium","low","informational"].map((k)=>{let U=a[k]||[];if(U.length===0)return"";return`
              <div class="severity-group severity-${k}">
                <h5>${k.toUpperCase()} (${U.length})</h5>
                <div class="table-wrapper">
                  <table class="findings-table">
                    <thead>
                      <tr><th>Category</th><th>Title</th><th>Location</th><th>Status</th></tr>
                    </thead>
                    <tbody>
                      ${U.map((G)=>`
                        <tr>
                          <td><span class="type-badge type-${G.category}">${G.category}</span></td>
                          <td>${R(G.title)}</td>
                          <td>${R(G.location)}</td>
                          <td><span class="status-badge-cell status-${G.disposition}">${G.disposition}</span></td>
                        </tr>
                      `).join("")}
                    </tbody>
                  </table>
                </div>
              </div>
            `}).join("")}
        </div>
      `}e.innerHTML=i}catch(r){console.error("Failed to render reviews:",r),e.innerHTML='<div class="error-state">Failed to load review data</div>'}}async function Ir(){let e=document.getElementById("releasesContent");if(!C){e.innerHTML='<div class="empty-state">Select a delivery to view releases</div>';return}try{await Promise.resolve().then(() => Y());let n=await ae(C);if(!n){e.innerHTML='<div class="empty-state">Delivery report not found</div>';return}let l=n.decisions?.filter((a)=>a.phase==="release")||[],u=n.decisions?.filter((a)=>a.phase==="deployment")||[];if(l.length===0&&u.length===0){e.innerHTML='<div class="empty-state">No releases or deployments yet</div>';return}let i="";if(l.length>0)i+=`
        <div class="releases-list">
          <h4>Release Candidates</h4>
          ${l.map((a)=>`
            <div class="release-card status-${a.status||"draft"}">
              <div class="release-header">
                <h5>${R(a.summary)} <span class="badge version">${R(a.chosenOption)}</span></h5>
                <span class="status-badge-cell status-${a.status||"draft"}">${a.status||"draft"}</span>
              </div>
              <div class="release-meta">
                <span>Created: ${Q(a.createdAt)}</span>
              </div>
              ${a.rationale?`<div class="changelog">${R(a.rationale)}</div>`:""}
            </div>
          `).join("")}
        </div>
      `;if(u.length>0)i+=`
        <div class="deployments-list">
          <h4>Deployments</h4>
          <div class="table-wrapper">
            <table class="deployments-table">
              <thead>
                <tr><th>Phase</th><th>Summary</th><th>Status</th><th>Created</th></tr>
              </thead>
              <tbody>
                ${u.map((a)=>`
                  <tr class="status-${a.status||"active"}">
                    <td>${a.phase}</td>
                    <td>${R(a.summary)}</td>
                    <td><span class="status-badge-cell status-${a.status||"active"}">${a.status||"active"}</span></td>
                    <td>${Q(a.createdAt)}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
      `;e.innerHTML=i}catch(r){console.error("Failed to render releases:",r),e.innerHTML='<div class="error-state">Failed to load release data</div>'}}async function Lr(){let e=document.getElementById("evidenceContent");if(!C){e.innerHTML='<div class="empty-state">Select a delivery to view evidence</div>';return}try{await Promise.resolve().then(() => Y());let n=await ae(C);if(!n){e.innerHTML='<div class="empty-state">Delivery report not found</div>';return}let l=n.evidence||[];if(l.length===0){e.innerHTML='<div class="empty-state">No evidence recorded yet</div>';return}let u=l.reduce((i,a)=>((i[a.type]??(i[a.type]=[])).push(a),i),{});e.innerHTML=`
      <div class="evidence-summary">
        <div class="quality-stats">
          <div class="stat">
            <span class="stat-value">${l.length}</span>
            <span class="stat-label">Total Records</span>
          </div>
          <div class="stat">
            <span class="stat-value passed">${l.filter((i)=>i.status==="passed").length}</span>
            <span class="stat-label">Passed</span>
          </div>
          <div class="stat">
            <span class="stat-value failed">${l.filter((i)=>i.status==="failed").length}</span>
            <span class="stat-label">Failed</span>
          </div>
        </div>
      </div>
      
      <div class="evidence-list">
        ${Object.entries(u).map(([i,a])=>`
          <div class="evidence-source-group">
            <h4>${R(i)} <span class="badge">${a.length}</span></h4>
            <div class="table-wrapper">
              <table class="evidence-table">
                <thead>
                  <tr><th>Check</th><th>Status</th><th>Exit Code</th><th>Task</th><th>Completed</th><th>Summary</th></tr>
                </thead>
                <tbody>
                  ${a.map((m)=>`
                    <tr class="status-${m.status}">
                      <td>${R(m.checkId)}</td>
                      <td><span class="status-badge-cell status-${m.status}">${m.status}</span></td>
                      <td>${m.exitCode!==null?m.exitCode:"-"}</td>
                      <td>${m.taskId||"-"}</td>
                      <td>${Q(m.completedAt)}</td>
                      <td>${R(m.summary||"-")}</td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </div>
        `).join("")}
      </div>
    `}catch(r){console.error("Failed to render evidence:",r),e.innerHTML='<div class="error-state">Failed to load evidence data</div>'}}function Q(e){try{let r=new Date(e);return r.toLocaleDateString()+" "+r.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}catch{return e}}function zt(e){let r=document.getElementById("overviewGrid");r.innerHTML=`<div class="empty-state">${e}</div>`}function Wt(e){let r=document.getElementById("overviewGrid");r.innerHTML=`<div class="error-state">Error: ${e.message}</div>`}function Mr(){let e=document.getElementById("lastRefresh");e.textContent=Kt?`Last refreshed: ${Kt.toLocaleTimeString()}`:"Last refreshed: never"}function R(e){let r=document.createElement("div");return r.textContent=e,r.innerHTML}async function Nr(){}Nr();})();
