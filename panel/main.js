(()=>{var k=(e,o,n)=>()=>{if(e)try{o=e(e=0)}catch(s){n=[s]}if(n)throw n[0];return o};var E="openchamber.sdk",_=1;var be=()=>{};function io(e){let o=e.documentElement;if(o.hasAttribute("data-oc-scrollbar-activity"))return;o.setAttribute("data-oc-scrollbar-activity","");let n=new WeakMap;e.addEventListener("scroll",(s)=>{let l=s.target===e?o:s.target;if(!(l instanceof Element))return;if(!l.hasAttribute("data-oc-scrolling"))l.setAttribute("data-oc-scrolling","");let g=n.get(l);if(g!==void 0)clearTimeout(g);n.set(l,setTimeout(()=>{n.delete(l),l.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var qe=`
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
`,lr;var ye=k(()=>{lr=`(${io.toString()})(document);`});var tt=128,ot=65536;var xe=128,ge=65536;var rt=()=>{};var po,ao=(e)=>Object(e)===e&&!Array.isArray(e),nt=(e,o)=>Object.keys(e).every((n)=>o.includes(n)),co=(e)=>String(e)===e&&e.length>=1&&e.length<=60,lo=(e)=>String(e)===e&&e.length>=1&&e.length<=80,uo=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let o=new Set;for(let n of e){if(!ao(n)||!po.test(n.id)||!co(n.label))return!1;if(n.disabled!==void 0&&n.disabled!==!0&&n.disabled!==!1)return!1;if(o.has(n.id))return!1;if(o.add(n.id),n.kind==="button"){if(!nt(n,["kind","id","label","disabled"]))return!1;continue}if(n.kind!=="select"||!nt(n,["kind","id","label","value","options","disabled"]))return!1;if(!lo(n.value)||!Array.isArray(n.options)||n.options.length<1||n.options.length>16)return!1;let s=new Set;for(let l of n.options){if(!ao(l)||!nt(l,["value","label"])||!lo(l.value)||!co(l.label)||s.has(l.value))return!1;s.add(l.value)}if(!s.has(n.value))return!1}return!0};var st=k(()=>{po=/^[a-z][a-z0-9-]{0,39}$/});var it=()=>{};var Eo=()=>{};var _o=k(()=>{it()});var Oe=20000000,ve=256,at=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,So=(e,o)=>{if(e.path!==o.path||e.readOnly!==o.readOnly)return!1;if(e.encoding==="text"||o.encoding==="text")return e.encoding==="text"&&o.encoding==="text"&&e.content===o.content;if(e.bytes.byteLength!==o.bytes.byteLength)return!1;for(let n=0;n<e.bytes.byteLength;n+=1)if(e.bytes[n]!==o.bytes[n])return!1;return!0};var ct=()=>{};var fo,To,mo=(e,o=0,n={remaining:16000})=>{if(--n.remaining<0||o>=32)return!1;if(e===null)return!0;let s=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let l of s)if(!mo(l,o+1,n))return!1;return!0},dt=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((o)=>/^(0|[1-9]\d*)$/.test(o)&&Number(o)<e.length)&&e.every(dt);if(Object(e)===e){let o=Object.getPrototypeOf(e);return(o===null||o===Object.prototype)&&Object.values(e).every(dt)}return String(e)===e||Number.isFinite(e)},lt=(e)=>{try{if(String(e.id)!==e.id||!fo.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!To.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!mo(e.data)||!dt(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var pt=k(()=>{fo=/^[A-Za-z0-9_-]{1,80}$/,To=["left","right","top","bottom"]});var Ao,Et=(e)=>Boolean(e&&"sessionId"in e),_t=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e)),bo,St=(e)=>bo.test(e),ke=500,Re=32000,yo=16000,xo=128,go=200,Oo=2000,vo=16000,ko=80,Ro=200,Uo=16000,Co=2000,ft=20000,Ue=1024,Ce=2000000,Ie=64000,Le=8000,Tt=4000,mt=960000,Io=999,Lo=1e4,le=500,wo,Mo,ur,No=(e)=>ur.has(e),Po=(e)=>e&&No(e)?e:"HOST_REJECTED",Q=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(Q);if(Object(e)===e)return Object.values(e).every(Q);return!1},Do=(e)=>Q(e)&&JSON.stringify(e).length<=Uo,ho=(e)=>e?.trim().slice(0,Ro)??"",Z=(e)=>{let o=e.id.trim().slice(0,xo),n=e.title.trim().slice(0,go),s=e.url.trim().slice(0,Oo),l=e.text?.trim().slice(0,vo),g=e.author?.trim().slice(0,ko),M=e.kind==="pull"?"pull":"issue",O={providerId:e.providerId.trim(),id:o,title:n||o,url:s,kind:M};if(l)O.text=l;if(g)O.author=g;if(M==="pull"){let L=ho(e.branches?.head),B=ho(e.branches?.base);if(L&&B)O.branches={head:L,base:B}}if(Do(e.data))O.data=e.data;return O},ht=(e)=>{let o=Z(e);if(e.projectId)o.projectId=e.projectId;if(e.navigation)o.navigation=e.navigation;if(e.worktree)o.worktree=e.worktree;return o},At=(e)=>{let o={text:e.text.trim().slice(0,yo)};if(e.send)o.send=!0;return o},bt=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(Io,Math.max(0,Math.round(e)))},yt=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(Lo,Math.max(0,Math.ceil(e)))},q=(e)=>e.length>0&&e.length<=Ue&&!e.includes("\x00")&&!e.includes("\\"),we=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>Co)return!1;return!e.split("/").some((n)=>n==="."||n==="..")},Er,xt=(e)=>Boolean(e&&"status"in e&&Er.has(String(e.status))&&!("body"in e)),Me=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),gt=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),Ot=(e)=>Boolean(e&&"written"in e&&e.written===!0),vt=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),_r,kt=(e)=>Boolean(e&&"kind"in e&&"size"in e&&_r.has(String(e.kind))&&Number.isFinite(e.size)),Rt=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),Sr,fr=(e)=>Object(e)===e?e:null,ut=(e)=>String(e)===e&&e.length>0,Tr=(e)=>{if(!ut(e.id))return null;if(e.ok===!0){let o={channel:E,v:_,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)o.payload=e.payload;return o}if(e.ok===!1&&ut(e.error))return{channel:E,v:_,type:"result",id:e.id,ok:!1,error:e.error,code:Po(ut(e.code)?e.code:void 0)};return null},Ut=(e)=>{let o=fr(e);if(!o||o.channel!==E||o.v!==_)return null;if(o.type==="result")return Tr(o);if(!Sr.has(String(o.type))||Object(o.payload)!==o.payload)return null;return o};var Ne=k(()=>{be();Ao=["file","directory","other","missing"],bo=/^[0-9a-f]{7,64}$/i,wo=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],Mo=["stopped","starting","ready","failed"],ur=new Set(wo),Er=new Set(Mo),_r=new Set(Ao),Sr=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"])});var Go=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),mr=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s",c,$o=()=>Promise.reject(new c("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Pe=()=>Promise.reject(new c("BAD_PATH",`File path must be 1 to ${Ue} characters without NUL or backslash.`)),De=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new c("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},u=(e)=>(e.value+=1,`oc-${e.value}`),pe=(e={})=>{let o=e.target??("window"in globalThis?window:null);if(!o)throw new c("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let n=e.acceptSource??((t)=>t===o.parent),s=e.requestTimeoutMs??ft,l=new Set,g=new Set,M=new Set,O=new Set,L=new Set,B=new Set,re=new Set,_e=new Set,Se=new Set,W=new Set,Ke=[],ne=null,se=null,fe=new Set,Te=new Set,ie=null,ae=null,Je=!1,K=new Map,J=new Map,Y=new Map,D=!1,p={value:0},d=null,G=null,ce=!1,de=!1,Kt=null,Jt=(t)=>{if(!t)return null;return{sessionId:t.id,phase:t.busy?"started":"completed"}},w=(t)=>{o.parent.postMessage(t,"*")},Yt=()=>{if(D||o.parent===o||W.size===0||d?.features?.lateGenerateResults!==!0)return;w({channel:E,v:_,type:"generate-late-listen"})},h=(t,r)=>{for(let i of t)try{i(r)}catch(a){console.error(a)}},Qt=(t)=>{if(!(t instanceof MessageEvent))return;if(!n(t.source))return;let r=Ut(t.data);if(!r)return;if(r.type==="workspace"){let a=J.get(r.payload.subscriptionId);if(a)h([a],r.payload.snapshot);return}if(r.type==="shells"){let a=Y.get(r.payload.subscriptionId);if(a)h([a],r.payload.snapshot);return}if(r.type==="ready"){if(d=r.payload,G=Jt(r.payload.session),h(l,r.payload),h(g,r.payload.directory),h(M,r.payload.session),G)h(O,G);h(L,r.payload.connection),h(B,r.payload.settings),h(re,r.payload.item),Yt();return}if(r.type==="generate-late"){if(W.size===0)Ke.push(r.payload);else h(W,r.payload);return}if(r.type==="directory"){if(d)d={...d,directory:r.payload.directory};h(g,r.payload.directory);return}if(r.type==="session"){if(d)d={...d,session:r.payload.session};if(!r.payload.session)G=null;else if(G?.sessionId!==r.payload.session.id)G=Jt(r.payload.session);h(M,r.payload.session);return}if(r.type==="session-lifecycle"){G=r.payload,h(O,r.payload);return}if(r.type==="connection"){if(d)d={...d,connection:r.payload.connection};h(L,r.payload.connection);return}if(r.type==="settings"){if(d)d={...d,settings:r.payload.settings};h(B,r.payload.settings);return}if(r.type==="item"){if(d)d={...d,item:r.payload.item};h(re,r.payload.item);return}if(r.type==="status-control-event"){h(_e,r.payload);return}if(r.type==="popover-closed"){h(Se,r.payload);return}if(r.type==="action"){let a=(S)=>{if(!D)w({channel:E,v:_,type:"action-result",id:r.id,payload:S})},f=se;if(!f){a({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>f(r.payload)).then(()=>a({ok:!0}),(S)=>{let x=(S instanceof Error?S.message:String(S)).trim();a({ok:!1,error:(x||"Action failed.").slice(0,le)})});return}if(r.type==="file-open"){let a=r.payload;if(ae&&So(ae,a))return;ae=a,h(fe,r.payload);return}if(r.type==="file-saved"){h(Te,r.payload.version);return}if(r.type==="file-snapshot"){let a=(x)=>{if(!D)w({channel:E,v:_,type:"file-snapshot-result",id:r.id,payload:x})},f=(x)=>a({error:(x.trim()||"Could not read the edited file.").slice(0,le)}),S=ie;if(!S){f("This extension does not edit files.");return}Promise.resolve().then(()=>S(r.payload.purpose)).then((x)=>{if(at(x)>Oe){f(`The file is over ${Oe} ${"bytes"in x?"bytes":"characters"}.`);return}if(x.version.length>ve){f(`The snapshot version is over ${ve} characters.`);return}a({snapshot:"bytes"in x?{bytes:x.bytes,version:x.version}:{content:x.content,version:x.version}})},(x)=>f(x instanceof Error?x.message:String(x)));return}if(r.type==="resolve"){let a=(S)=>{w({channel:E,v:_,type:"resolve-result",id:r.id,payload:S})},f=ne;if(!f){a({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>f(r.payload)).then((S)=>a({item:S?Z(S):null}),(S)=>{let x=(S instanceof Error?S.message:String(S)).trim();a({error:(x||"Command failed.").slice(0,le)})});return}let i=K.get(r.id);if(!i)return;if(clearTimeout(i.timer),K.delete(r.id),r.ok){i.resolve(r.payload);return}i.reject(new c(r.code,r.error))};o.addEventListener("message",Qt),w({channel:E,v:_,type:"hello"});let v=(t,r=s)=>{if(D||o.parent===o)return Promise.reject(new c("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((i,a)=>{let f=setTimeout(()=>{K.delete(t.id),a(new c("HOST_TIMEOUT","Host did not answer in time."))},r);K.set(t.id,{resolve:i,reject:a,timer:f}),w(t)})},b=(t)=>v(t).then(()=>{return}),y={channel:E,v:_},Ye=(t)=>{if(!D&&o.parent!==o)w(t)},Zt=()=>Ye({...y,type:"file-save"}),qt=(t)=>{if(!Go(t)||!mr(t))return;t.preventDefault(),Zt()},eo=(t)=>{if(!Go(t)||t.key!=="Escape"||d?.surface!=="popover"||!d.popover)return;t.preventDefault(),no(d.popover.id,"escape").catch(()=>{return})},me=()=>{let t=d?.surface==="popover"?d.popover:void 0;if(!t)return;let r=ce||de;if(Kt===r)return;Kt=r,so(t.id,r).catch(()=>{return})},he=()=>{if(d?.surface!=="popover"||ce)return;ce=!0,me()},to=(t)=>{if(d?.surface!=="popover"||t.relatedTarget!==null||!ce)return;ce=!1,me()},oo=()=>{if(d?.surface!=="popover"||de)return;de=!0,me()},ro=()=>{if(d?.surface!=="popover"||!de)return;de=!1,me()},P=(t,r=1024)=>{if(!t.trim()||t.length>r)throw new c("HOST_REJECTED",`Identity must contain 1 to ${r} characters.`)},Qe=async(t)=>{if(t.kind!=="projects")P(t.projectId);let r=await v({...y,type:"workspace-read",id:u(p),payload:t});if(!r||!("kind"in r)||!("state"in r)||r.kind!==t.kind)throw new c("HOST_REJECTED","Host did not return workspace data.");return r},Ze=async(t,r)=>{if(t.kind!=="projects")P(t.projectId);let i=u(p);J.set(i,r);try{await b({...y,type:"workspace-subscribe",id:u(p),payload:{subscriptionId:i,query:t}})}catch(a){if(J.delete(i),!D)w({...y,type:"workspace-unsubscribe",id:u(p),payload:{subscriptionId:i}});throw a}return()=>{if(!J.delete(i)||D)return;w({...y,type:"workspace-unsubscribe",id:u(p),payload:{subscriptionId:i}})}},dr=async(t,r)=>{if(t.kind==="session")P(t.sessionId);if(t.kind==="project")P(t.projectId);let i=u(p);Y.set(i,r);try{await b({...y,type:"shells-subscribe",id:u(p),payload:{subscriptionId:i,scope:t}})}catch(a){if(Y.delete(i),!D)w({...y,type:"shells-unsubscribe",id:u(p),payload:{subscriptionId:i}});throw a}return()=>{if(!Y.delete(i)||D)return;w({...y,type:"shells-unsubscribe",id:u(p),payload:{subscriptionId:i}})}},Ae=async(t)=>{if("key"in t&&(t.key.length===0||t.key.length>tt))throw new c("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!Q(t.value))throw new c("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>ot)throw new c("HOST_REJECTED","Storage value exceeds 64 KiB.");if(t.scope==="device"&&d?.features?.deviceStorage!==!0)throw new c("UNSUPPORTED","This host does not support device storage.");let r=await v({...y,type:"storage",id:u(p),payload:t});if(!r||!("storage"in r)||r.op!==t.op)throw new c("HOST_REJECTED","Host did not return storage data.");return r},no=(t,r)=>d?.features?.popovers!==!0&&!(d?.surface==="popover"&&d.popover?.id===t)?Promise.reject(new c("UNSUPPORTED","This host does not support popovers.")):b({...y,type:"popover-close",id:u(p),payload:r?{id:t,reason:r}:{id:t}}),so=(t,r)=>d?.features?.popovers!==!0&&!(d?.surface==="popover"&&d.popover?.id===t)?Promise.reject(new c("UNSUPPORTED","This host does not support popovers.")):b({...y,type:"popover-anchor",id:u(p),payload:{id:t,active:r}});return o.addEventListener("keydown",eo,!0),o.addEventListener("pointerover",he),o.addEventListener("pointermove",he),o.addEventListener("pointerout",to),o.addEventListener("focus",oo),o.addEventListener("blur",ro),{onAction:(t)=>(se=t,()=>{if(se===t)se=null}),listProjects:async()=>{let t=await Qe({kind:"projects"});if(t.kind!=="projects")throw new c("HOST_REJECTED","Expected projects.");return t},listWorktrees:async(t)=>{let r=await Qe({kind:"worktrees",projectId:t});if(r.kind!=="worktrees")throw new c("HOST_REJECTED","Expected worktrees.");return r},listSessions:async(t)=>{let r=await Qe({kind:"sessions",projectId:t});if(r.kind!=="sessions")throw new c("HOST_REJECTED","Expected sessions.");return r},onProjects:(t)=>Ze({kind:"projects"},(r)=>{if(r.kind==="projects")t(r)}),onWorktrees:(t,r)=>Ze({kind:"worktrees",projectId:t},(i)=>{if(i.kind==="worktrees")r(i)}),onSessions:(t,r)=>Ze({kind:"sessions",projectId:t},(i)=>{if(i.kind==="sessions")r(i)}),onRunningShells:(t,r)=>dr(t,r),readShellOutput:async(t,r)=>{P(t,xe);let i=r?.cursor;if(i!==void 0&&(!Number.isInteger(i)||i<0))throw new c("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let a=r?.tailBytes;if(a!==void 0&&(!Number.isInteger(a)||a<1||a>ge))throw new c("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${ge}.`);let S=await v({...y,type:"shell-output",id:u(p),payload:{shellId:t,cursor:i,tailBytes:a}});if(!S||typeof S.output!=="string"||!Number.isFinite(S.cursor))throw new c("HOST_REJECTED","Host did not return shell output.");return S},stopShell:async(t)=>{if(P(t,xe),(await v({...y,type:"shell-stop",id:u(p),payload:{shellId:t}}))?.stopped!==!0)throw new c("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(t)=>{P(t),await b({...y,type:"open-session",id:u(p),payload:{sessionId:t}})},storage:{get:async(t,r)=>{let i=De(r),a={op:"get",key:t};if(i)a.scope=i;let f=await Ae(a);return f.op==="get"&&f.found?f.value:void 0},set:async(t,r,i)=>{let a=De(i),f={op:"set",key:t,value:r};if(a)f.scope=a;await Ae(f)},delete:async(t,r)=>{let i=De(r),a={op:"delete",key:t};if(i)a.scope=i;await Ae(a)},keys:async(t)=>{let r=De(t),i={op:"keys"};if(r)i.scope=r;let a=await Ae(i);if(a.op!=="keys")throw new c("HOST_REJECTED","Expected storage keys.");return a.keys}},onReady:(t)=>{if(l.add(t),d)t(d);return()=>{l.delete(t)}},onDirectory:(t)=>{if(g.add(t),d)t(d.directory);return()=>{g.delete(t)}},onSession:(t)=>{if(M.add(t),d)t(d.session);return()=>{M.delete(t)}},onSessionLifecycle:(t)=>{if(O.add(t),G)t(G);return()=>{O.delete(t)}},onConnection:(t)=>{if(L.add(t),d)t(d.connection);return()=>{L.delete(t)}},onSettings:(t)=>{if(B.add(t),d)t(d.settings);return()=>{B.delete(t)}},onItem:(t)=>{if(re.add(t),d)t(d.item);return()=>{re.delete(t)}},onStatusControl:(t)=>(_e.add(t),()=>{_e.delete(t)}),onPopoverClosed:(t)=>(Se.add(t),()=>{Se.delete(t)}),setStatusControls:(t)=>{if(d?.features?.statusControls!==!0)return Promise.reject(new c("UNSUPPORTED","This host does not support status controls."));if(!uo(t))return Promise.reject(new c("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return b({...y,type:"status-controls",id:u(p),payload:{controls:t}})},openPopover:(t)=>{if(d?.features?.popovers!==!0)return Promise.reject(new c("UNSUPPORTED","This host does not support popovers."));if(!lt(t))return Promise.reject(new c("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return b({...y,type:"popover-open",id:u(p),payload:t})},closePopover:no,setPopoverAnchorActive:so,onResolve:(t)=>(ne=t,()=>{if(ne===t)ne=null}),toast:(t)=>{let r=t.message.trim();if(!r||r.length>ke)return Promise.reject(new c("HOST_REJECTED",`Toast message must contain 1 to ${ke} characters.`));if(t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>Re))return Promise.reject(new c("HOST_REJECTED",`Toast copy text must contain 1 to ${Re} characters.`));return b({channel:E,v:_,type:"toast",id:u(p),payload:{...t,message:r}})},openUrl:(t)=>b({channel:E,v:_,type:"open-url",id:u(p),payload:{url:t}}),openCommit:(t)=>St(t)?b({channel:E,v:_,type:"open-commit",id:u(p),payload:{sha:t}}):Promise.reject(new c("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(t)=>b({channel:E,v:_,type:"open-surface",id:u(p),payload:{surfaceId:t}}),writeClipboard:(t)=>b({channel:E,v:_,type:"clipboard-write",id:u(p),payload:{text:t}}),compose:(t)=>b({channel:E,v:_,type:"compose",id:u(p),payload:t}),attach:(t)=>b({channel:E,v:_,type:"attach",id:u(p),payload:Z(t)}),startSession:async(t)=>{if(t.projectId!==void 0)P(t.projectId);let r=t.worktree;if(r&&r!==!0)if(r.kind==="existing")P(r.directory);else{if(r.name!==void 0)P(r.name,200);if(r.baseBranch!==void 0)P(r.baseBranch,200)}let i=await v({channel:E,v:_,type:"start-session",id:u(p),payload:ht(t)},e.requestTimeoutMs??180000);if(!Et(i))throw new c("HOST_REJECTED","Host did not return a session.");return i},prompt:(t)=>v({channel:E,v:_,type:"prompt",id:u(p),payload:At(t)}).then((r)=>{if(!_t(r))throw new c("HOST_REJECTED","Host did not return a prompt result.");return r}),sessionLink:(t)=>b({channel:E,v:_,type:"session-link",id:u(p),payload:Z(t)}),close:()=>b({channel:E,v:_,type:"close",id:u(p)}),oauthStart:()=>b({channel:E,v:_,type:"oauth-start",id:u(p)}),oauthDisconnect:()=>b({channel:E,v:_,type:"oauth-disconnect",id:u(p)}),request:(t)=>(we(t.path)?v({channel:E,v:_,type:"request",id:u(p),payload:t}):$o()).then((r)=>{if(!Me(r))throw new c("HOST_REJECTED","Host request result was empty.");return r}),serviceRequest:(t)=>(we(t.path)?v({channel:E,v:_,type:"service-request",id:u(p),payload:t}):$o()).then((r)=>{if(!Me(r))throw new c("HOST_REJECTED","Host service request result was empty.");return r}),serviceStatus:()=>v({channel:E,v:_,type:"service-status",id:u(p)}).then((t)=>{if(!xt(t))throw new c("HOST_REJECTED","Host did not return service status.");return t}),readFile:(t)=>(q(t)?v({channel:E,v:_,type:"file-read",id:u(p),payload:{path:t}}):Pe()).then((r)=>{if(!gt(r))throw new c("HOST_REJECTED","Host did not return file content.");return r}),writeFile:(t,r)=>{if(!q(t))return Pe();if(r.length>Ce)return Promise.reject(new c("FILE_TOO_LARGE",`Content is over ${Ce} characters.`));return v({channel:E,v:_,type:"file-write",id:u(p),payload:{path:t,content:r}}).then((i)=>{if(!Ot(i))throw new c("HOST_REJECTED","Host did not confirm the write.");return i})},listDir:(t)=>(q(t)?v({channel:E,v:_,type:"file-list",id:u(p),payload:{path:t}}):Pe()).then((r)=>{if(!vt(r))throw new c("HOST_REJECTED","Host did not return directory entries.");return r}),stat:(t)=>(q(t)?v({channel:E,v:_,type:"file-stat",id:u(p),payload:{path:t}}):Pe()).then((r)=>{if(!kt(r))throw new c("HOST_REJECTED","Host did not return file status.");return r}),generate:(t)=>{let r=t.prompt.trim(),i=t.system?.trim();if(r.length===0||r.length>Ie)return Promise.reject(new c("HOST_REJECTED",`Prompt must be 1 to ${Ie} characters.`));if(i!==void 0&&(i.length===0||i.length>Le))return Promise.reject(new c("HOST_REJECTED",`System prompt must be 1 to ${Le} characters.`));let a=t.maxOutputTokens===void 0?void 0:Math.min(Tt,Math.max(1,Math.floor(t.maxOutputTokens)));if(a!==void 0&&!Number.isFinite(a))return Promise.reject(new c("HOST_REJECTED","maxOutputTokens must be a number."));let f={prompt:r};if(i!==void 0)f.system=i;if(a!==void 0)f.maxOutputTokens=a;return v({channel:E,v:_,type:"generate",id:u(p),payload:f},e.requestTimeoutMs??mt).then((S)=>{if(!Rt(S))throw new c("HOST_REJECTED","Host did not return generated text.");return S})},onLateGenerateResult:(t)=>{W.add(t);for(let r of Ke.splice(0))h([t],r);return Yt(),()=>{W.delete(t)}},setBadge:(t)=>b({channel:E,v:_,type:"badge",id:u(p),payload:{count:bt(t)}}),setHeight:(t)=>b({channel:E,v:_,type:"resize",id:u(p),payload:{height:yt(t)}}),onFileOpen:(t)=>{if(fe.add(t),!Je)Je=!0,o.addEventListener("keydown",qt,!0);if(ae)t(ae);return()=>{fe.delete(t)}},onFileSnapshot:(t)=>(ie=t,()=>{if(ie===t)ie=null}),onFileSaved:(t)=>(Te.add(t),()=>{Te.delete(t)}),reportFileChange:(t)=>Ye({...y,type:"file-change",payload:{dirty:t.dirty,edited:t.edited}}),requestFileSave:Zt,reportFileUnsupported:()=>Ye({...y,type:"file-unsupported"}),dispose:()=>{for(let t of J.keys())w({...y,type:"workspace-unsubscribe",id:u(p),payload:{subscriptionId:t}});J.clear();for(let t of Y.keys())w({...y,type:"shells-unsubscribe",id:u(p),payload:{subscriptionId:t}});if(Y.clear(),D=!0,ne=null,se=null,ie=null,fe.clear(),Te.clear(),Je)o.removeEventListener("keydown",qt,!0);o.removeEventListener("message",Qt),o.removeEventListener("keydown",eo,!0),o.removeEventListener("pointerover",he),o.removeEventListener("pointermove",he),o.removeEventListener("pointerout",to),o.removeEventListener("focus",oo),o.removeEventListener("blur",ro);for(let t of K.values())clearTimeout(t.timer),t.reject(new c("HOST_UNAVAILABLE","Host client was disposed."));K.clear(),l.clear(),g.clear(),M.clear(),O.clear(),L.clear(),B.clear(),re.clear(),_e.clear(),Se.clear(),W.clear(),Ke.length=0}}};var Ho=k(()=>{be();st();pt();ct();Ne();rt();c=class c extends Error{code;constructor(e,o){super(o);this.name="HostRequestError",this.code=e}}});var Xo,Sn;var Fo=k(()=>{Xo=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"],Sn=new Set(Xo)});var Bo,Tn;var Vo=k(()=>{Bo=["none","agent","user"],Tn=new Set(Bo)});var Ct=k(()=>{be();ye();rt();st();it();Eo();_o();ct();Ho();pt();Ne();Ne();Fo();Vo()});function Ft(e){Cr=e}async function Zo(){try{let e=await ue.readFile(".vstack/manifest.json");return JSON.parse(e.content)}catch{return null}}async function qo(){try{let e=await ue.readFile(".vstack/state/index.json");return JSON.parse(e.content)}catch{return null}}async function Bt(e){try{let o=await ue.readFile(`.vstack/reports/deliveries/${e}.json`);return JSON.parse(o.content)}catch{return null}}async function er(e){try{let o=await ue.readFile(`.vstack/reports/activity/${e}.json`);return JSON.parse(o.content)}catch{return null}}async function tr(e){try{let o=await ue.readFile(`.vstack/reports/quality/${e}.json`);return JSON.parse(o.content)}catch{return null}}var ue,Cr=null;var Ve=k(()=>{Ct();ue=pe()});Ct();var hr=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],Ar=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],jo=(e,o)=>{o.style.colorScheme=e.mode;for(let[n,s]of hr)o.style.setProperty(n,e.tokens[s]);for(let[n,s,l]of Ar){let g=e.tokens[l]??"";o.style.setProperty(n,g),o.style.setProperty(s,g)}o.style.setProperty("font-family",e.tokens.font),o.style.setProperty("font-size","0.875rem"),o.style.setProperty("line-height","1.45"),o.style.setProperty("color",e.tokens.foreground)},It=(e,o)=>{if(jo(e.theme,o),o.dataset)o.dataset.ocSurface=e.surface,o.dataset.ocTheme=e.theme.mode};ye();var br={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},m=(e,o)=>`var(--${e}, var(--oc-${br[e]}, ${o}))`,X=m("surface-background","transparent"),$e=m("surface-elevated","transparent"),ee=m("surface-elevated-foreground","inherit"),N=m("surface-foreground","inherit"),T=m("surface-muted-foreground","gray"),yr=m("surface-muted","transparent"),V=m("interactive-border","currentColor"),R=m("interactive-hover","transparent"),j=m("interactive-active","transparent"),Lt=m("interactive-selection","transparent"),wt=m("interactive-selection-foreground","inherit"),H=m("primary","currentColor"),Mt=m("primary-text","inherit"),Nt=m("error-text","inherit"),xr=m("font-sans","inherit"),Pt=m("font-mono","monospace"),Yo=m("radius","9px"),Dt=`calc(${Yo} - 2px)`,zo=`calc(${Yo} - 4px)`,A=(e,o,n="transparent")=>`color-mix(in srgb, ${e} ${o}%, ${n})`,Wo=`background-image: linear-gradient(${R}, ${R});`,Gt=(e)=>`box-shadow: inset 0 0 0 1px ${e}, var(--oc-sdk-field-lift);`,$t="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",Ko="box-shadow: var(--oc-sdk-lit);",Jo=`inset 0 1px 0 0 ${A(N,1.5)}, 0 1px 1px 0 rgb(0 0 0 / 0.28), 0 2px 3px -2px rgb(0 0 0 / 0.2)`,gr=`
:root {
  --oc-sdk-edge: ${A(N,10)};
  --oc-sdk-field-bg: ${$e};
  --oc-sdk-raised-bg: ${X};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 2px 0 rgb(0 0 0 / 0.06);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.45), 0 1px 2px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.1);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.8), inset 0 0 0 1px rgb(0 0 0 / 0.04), 0 1px 2px -0.5px rgb(0 0 0 / 0.08), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.08);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${A(N,6)};
  --oc-sdk-field-bg: ${A(X,50,$e)};
  --oc-sdk-raised-bg: ${$e};
  --oc-sdk-field-lift: ${Jo};
  --oc-sdk-raised-lift: ${Jo};
  --oc-sdk-lit: inset 0 1px 0 0 ${A(N,1.5)}, 0 1px 1px 0 rgb(0 0 0 / 0.28), 0 2px 3px -2px rgb(0 0 0 / 0.2);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.36);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.06), inset 0 0 0 1px rgb(255 255 255 / 0.08), 0 1px 1px -0.5px rgb(0 0 0 / 0.22), 0 3px 3px -1.5px rgb(0 0 0 / 0.2), 0 6px 6px -3px rgb(0 0 0 / 0.16);
}`,Ge=(e)=>{let o=m(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${o}; --oc-sdk-tone-text: ${m(`${e}-text`,"inherit")}; }`},Or=`
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
`,Qo=`${gr}
.oc-sdk { color: ${N}; font-family: ${xr}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${Wo} }
.oc-sdk-mono { font-family: ${Pt}; }
.oc-sdk-muted { color: ${T}; }
${Ge("success")}${Ge("warning")}${Ge("error")}${Ge("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${H}; --oc-sdk-tone-text: ${Mt}; }

.oc-sdk-btn { border-radius: ${Dt}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${zo}; }
.oc-sdk-btn[data-variant="default"] { color: ${Mt}; background: ${A(H,10,X)}; border-color: ${A(H,12)}; ${Ko} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${A(H,16,X)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${A(H,22,X)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${yr}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${R}, ${R}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${j}, ${j}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${ee}; ${$t} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${R}, ${R}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${j}, ${j}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${R}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${j}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${m("status-error","red")}; color: ${Nt}; background: ${A("var(--oc-sdk-tone)",7,X)}; border-color: ${A("var(--oc-sdk-tone)",12)}; ${Ko} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${A("var(--oc-sdk-tone)",9,X)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${A("var(--oc-sdk-tone)",11,X)}; box-shadow: none; }

.oc-sdk-field-note { color: ${T}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${Nt}; }
.oc-sdk-input { border-radius: ${Dt}; background: var(--oc-sdk-field-bg); color: ${ee}; ${Gt("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${T}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${R}, ${R}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${Gt(A(N,26))} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${Gt(m("status-error","red"))} }
.oc-sdk-input[data-mono="true"] { font-family: ${Pt}; }

.oc-sdk-search-icon { color: ${T}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${H}; }
.oc-sdk-search-clear { border-radius: ${zo}; color: ${T}; }
.oc-sdk-search-clear:hover { background: ${R}; color: ${N}; }

.oc-sdk-trigger { border-radius: ${Dt}; background: var(--oc-sdk-raised-bg); color: ${ee}; ${$t} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${R}, ${R}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${j}, ${j}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${T}; }
.oc-sdk-trigger-chevron { color: ${T}; }
/* The app's dropdown light: lit top, hairline rings and a layered shadow. Its outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${ee}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${$e}; background-clip: padding-box; color: ${ee}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${R}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${Lt}; color: ${wt}; }
.oc-sdk-option-check { color: ${N}; }
.oc-sdk-option[data-destructive="true"] { color: ${Nt}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${A(m("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${T}; }
.oc-sdk-popup-empty { color: ${T}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${V}; border-radius: 4px; color: ${N}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${A(N,60,V)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${V}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${X}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${H}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${Wo} }
.oc-sdk-check-desc { color: ${T}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${A(N,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${T}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${N}; }
.oc-sdk-tab[aria-selected="true"] { color: ${wt}; background: ${Lt}; border-color: ${V}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${ee}; background: var(--oc-sdk-raised-bg); ${$t} }
.oc-sdk-tab-count { color: ${T}; }

.oc-sdk-badge { border-radius: 9999px; background: ${R}; color: ${T}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${A("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${R}; }
.oc-sdk-row[aria-selected="true"] { background: ${Lt}; color: ${wt}; }
.oc-sdk-row-lead { font-family: ${Pt}; color: ${T}; }
.oc-sdk-row-sub { color: ${T}; }
.oc-sdk-row-meta { color: ${T}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${T}; }

.oc-sdk-empty-body { color: ${T}; }

.oc-sdk-spinner { color: ${T}; }
.oc-sdk-spinner-ring { border-color: ${V}; border-top-color: ${H}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${A("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${T}; }

.oc-sdk-separator { color: ${T}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${A(V,40)}; }

.oc-sdk-progress-label { color: ${T}; }
.oc-sdk-progress-track { border-radius: 9999px; background: ${V}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${H}); }

.oc-sdk-text a { color: ${Mt}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${A(V,60)}; }
`,U=`
${qe}
${Or}
${Qo}`;ye();Ve();Ve();function Vt(e){return{proposed:"status-proposed",active:"status-active",blocked:"status-blocked",completed:"status-completed",cancelled:"status-cancelled",failed:"status-failed",dispatched:"status-dispatched",running:"status-running",pending:"status-pending",ready:"status-ready",in_progress:"status-in_progress",review:"status-review",skipped:"status-skipped",needs_rework:"status-needs_rework",not_started:"status-not_started",verifying:"status-verifying",approved:"status-approved",rejected:"status-rejected",expired:"status-expired"}[e]||"status-unknown"}function oe(e){try{let o=new Date(e);return o.toLocaleDateString()+" "+o.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}catch{return e}}function z(e){let o=document.createElement("div");return o.textContent=e,o.innerHTML}function or(e){switch(e){case"proposed":return"Start workflow (vstack_workflow_start)";case"active":return"Continue work on current phase";case"blocked":return"Resolve blocker";case"completed":return"Delivery completed";default:return"Check vstack_status tool"}}function rr(e,o,n,s){let l=document.getElementById("deliveryDetail");l.innerHTML=`
    <div class="delivery-detail-header">
      <h2>${z(e.title)}</h2>
      <div class="delivery-meta">
        <span class="type-badge type-${e.type}">${e.type}</span>
        <span class="profile-badge">${e.profile}</span>
        <span class="risk-badge risk-${e.risk}">${e.risk}</span>
      </div>
      <p>${z(e.description)}</p>
    </div>
    
    <div class="detail-tabs">
      <nav class="sub-tabs" role="tablist">
        <button class="sub-tab active" role="tab" data-tab="phases" aria-selected="true">Phases (${o.length})</button>
        <button class="sub-tab" role="tab" data-tab="tasks" aria-selected="false">Tasks (${n.length})</button>
        <button class="sub-tab" role="tab" data-tab="agents" aria-selected="false">Agents (${s.length})</button>
        <button class="sub-tab" role="tab" data-tab="quality" aria-selected="false">Quality</button>
        <button class="sub-tab" role="tab" data-tab="reviews" aria-selected="false">Reviews</button>
      </nav>
      
      <div class="sub-tab-panel active" id="subpanel-phases" role="tabpanel">
        ${Ir(o)}
      </div>
      <div class="sub-tab-panel" id="subpanel-tasks" role="tabpanel">
        ${Lr(n)}
      </div>
      <div class="sub-tab-panel" id="subpanel-agents" role="tabpanel">
        ${wr(s)}
      </div>
      <div class="sub-tab-panel" id="subpanel-quality" role="tabpanel">
        <div class="empty-state">Quality checks coming soon</div>
      </div>
      <div class="sub-tab-panel" id="subpanel-reviews" role="tabpanel">
        <div class="empty-state">Reviews coming soon</div>
      </div>
    </div>
  `,l.querySelectorAll(".sub-tab").forEach((M)=>{let O=M;O.addEventListener("click",()=>{l.querySelectorAll(".sub-tab").forEach((L)=>{L.classList.remove("active"),L.setAttribute("aria-selected","false")}),l.querySelectorAll(".sub-tab-panel").forEach((L)=>L.classList.remove("active")),O.classList.add("active"),O.setAttribute("aria-selected","true"),document.getElementById(`subpanel-${O.dataset.tab}`).classList.add("active")})})}function Ir(e){if(e.length===0)return'<div class="empty-state">No phases</div>';return`
    <table class="phases-table">
      <thead>
        <tr><th>Phase</th><th>Status</th><th>Sequence</th><th>Required Gates</th><th>Passed</th><th>Started</th><th>Completed</th></tr>
      </thead>
      <tbody>
        ${e.map((o)=>`
          <tr class="phase-row status-${o.status}">
            <td>${o.phase}</td>
            <td><span class="status-badge ${Vt(o.status)}">${o.status}</span></td>
            <td>${o.runSequence}</td>
            <td>${o.requiredGates.join(", ")||"None"}</td>
            <td>${o.gateResults?.filter((n)=>n.status==="passed").length||0}/${o.requiredGates.length}</td>
            <td>${o.startedAt?oe(o.startedAt):"-"}</td>
            <td>${o.completedAt?oe(o.completedAt):"-"}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `}function Lr(e){if(e.length===0)return'<div class="empty-state">No tasks</div>';return`
    <table class="tasks-table">
      <thead>
        <tr><th>Title</th><th>Type</th><th>Status</th><th>Priority</th><th>Agent</th><th>Dependencies</th></tr>
      </thead>
      <tbody>
        ${e.map((o)=>`
          <tr class="task-row status-${o.status}">
            <td>${z(o.title)}</td>
            <td><span class="type-badge type-${o.type}">${o.type}</span></td>
            <td><span class="status-badge ${Vt(o.status)}">${o.status}</span></td>
            <td><span class="priority-badge priority-${o.priority}">${o.priority}</span></td>
            <td>${o.assignedAgentId||"-"}</td>
            <td>${o.dependencies?.join(", ")||"None"}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `}function wr(e){if(e.length===0)return'<div class="empty-state">No agent runs</div>';return`
    <table class="agents-table">
      <thead>
        <tr><th>Agent</th><th>Task</th><th>Status</th><th>Session</th><th>Started</th><th>Completed</th></tr>
      </thead>
      <tbody>
        ${e.map((o)=>`
          <tr>
            <td>${o.agentId}</td>
            <td>${o.taskId||"-"}</td>
            <td><span class="status-badge ${Vt(o.status)}">${o.status}</span></td>
            <td>${o.sessionId?.slice(0,8)||"-"}</td>
            <td>${oe(o.startedAt)}</td>
            <td>${o.completedAt?oe(o.completedAt):"-"}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `}function jt(e){document.querySelectorAll(".tab").forEach((s)=>{s.classList.remove("active"),s.setAttribute("aria-selected","false")}),document.querySelectorAll(".tab-panel").forEach((s)=>s.classList.remove("active"));let o=document.querySelector(`.tab[data-tab="${e}"]`);if(o)o.classList.add("active"),o.setAttribute("aria-selected","true");let n=document.getElementById(`panel-${e}`);if(n)n.classList.add("active")}var je="overview",ze=null,nr=null,zt=null;async function ar(e){nr=e,zt=new Date,Mr(e),sr(e),ir(),Gr(),$r(),Hr(),Xr(),Fr(),document.getElementById("tabs")?.addEventListener("click",(o)=>{let n=o.target;if(!n.classList.contains("tab"))return;if(document.querySelectorAll(".tab").forEach((s)=>{s.classList.remove("active"),s.setAttribute("aria-selected","false")}),document.querySelectorAll(".tab-panel").forEach((s)=>s.classList.remove("active")),n.classList.add("active"),n.setAttribute("aria-selected","true"),document.getElementById(`panel-${n.dataset.tab}`)?.classList.add("active"),je=n.dataset.tab,je==="deliveries")sr(nr);else if(je==="tasks"&&ze)ir()}),document.getElementById("refreshBtn")?.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("vstack-refresh"))})}function Mr(e){let o=e.activeDeliveries?.[0];document.getElementById("goal").textContent=o?.title||"-",document.getElementById("status").textContent=o?.status||"-",document.getElementById("currentStep").textContent=o?.currentPhase||"-",document.getElementById("activeTask").textContent="-";let n=document.getElementById("statusBadge");n.className=`status-badge status-${o?.status||"idle"}`,n.textContent=o?.status||"Idle";let s=o?or(o.status):"Create a delivery (vstack_delivery_create)";document.getElementById("nextAction").textContent=s;let l=e.activeDeliveries?.filter((O)=>O.status==="completed").length||0,g=e.activeDeliveries?.length||0,M=g>0?l/g*100:0;document.getElementById("progressFill").style.width=`${M}%`,document.getElementById("progressText").textContent=`${l}/${g} deliveries`,document.getElementById("lastUpdated").textContent=e.updatedAt?`Last updated: ${new Date(e.updatedAt).toLocaleString()}`:"Last updated: never"}function sr(e){let o=document.getElementById("deliveriesList"),n=e.activeDeliveries||[];if(n.length===0){o.innerHTML='<div class="empty-state">No active deliveries. Create one with vstack_delivery_create.</div>';return}o.innerHTML=n.map((s)=>`
    <div class="delivery-item ${s.id===ze?"selected":""}" data-id="${s.id}">
      <div class="delivery-header">
        <span class="delivery-title">${z(s.title)}</span>
        <span class="delivery-status status-${s.status}">${s.status}</span>
      </div>
      <div class="delivery-meta">
        <span>${s.type} • ${s.profile}</span>
        <span>${s.currentPhase}</span>
        <span>${s.revision} rev</span>
      </div>
    </div>
  `).join(""),document.querySelectorAll(".delivery-item").forEach((s)=>{s.addEventListener("click",()=>{let l=s.getAttribute("data-id");ze=l,je="delivery-detail",Nr(l),jt("delivery-detail")})})}async function Nr(e){try{let[o,n,s]=await Promise.all([Bt(e),er(e),tr(e)]);if(!o){document.getElementById("deliveryDetail").innerHTML='<div class="error-state">Delivery report not found</div>';return}if(rr(o.delivery,[],o.tasks,o.agentRuns),s)Pr(s);if(n)Dr(n);jt("delivery-detail")}catch(o){console.error("Failed to load delivery detail from projections:",o),document.getElementById("deliveryDetail").innerHTML='<div class="error-state">Failed to load delivery detail</div>'}}function Pr(e){let o=document.getElementById("qualityContent");o.innerHTML=`
    <div class="quality-summary">
      <h3>Quality Gates</h3>
      <div class="quality-metrics">
        <div class="metric"><span class="metric-value">${e.checksPassed}/${e.checksTotal}</span> Checks Passed</div>
        <div class="metric"><span class="metric-value">${e.checksFailed}</span> Checks Failed</div>
        <div class="metric"><span class="metric-value">${e.checksSkipped}</span> Checks Skipped</div>
      </div>
      <div class="quality-breakdown">
        <h4>By Type</h4>
        <table class="quality-table">
          <thead><tr><th>Type</th><th>Passed</th><th>Failed</th></tr></thead>
          <tbody>
            ${Object.entries(e.checksByType).map(([n,s])=>`
              <tr><td>${n}</td><td>${s.passed}</td><td>${s.failed}</td></tr>
            `).join("")}
          </tbody>
        </table>
      </div>
      <div class="quality-findings">
        <h4>Review Findings</h4>
        <div class="findings-counts">
          <span class="finding critical">${e.reviewFindings.critical} Critical</span>
          <span class="finding high">${e.reviewFindings.high} High</span>
          <span class="finding medium">${e.reviewFindings.medium} Medium</span>
          <span class="finding low">${e.reviewFindings.low} Low</span>
        </div>
      </div>
    </div>
  `}function Dr(e){let o=document.getElementById("activityContent");if(!o)return;o.innerHTML=`
    <div class="activity-summary">
      <h3>Activity Timeline</h3>
      <div class="activity-list">
        ${e.activities.slice(0,20).map((n)=>`
          <div class="activity-item">
            <span class="activity-time">${oe(n.timestamp)}</span>
            <span class="activity-actor">${n.actor}</span>
            <span class="activity-event">${n.eventType}</span>
            <span class="activity-entity">${n.entity.type}:${n.entity.id}</span>
            <span class="activity-summary">${z(n.summary)}</span>
            ${n.outcome?`<span class="activity-outcome">${n.outcome}</span>`:""}
          </div>
        `).join("")}
      </div>
    </div>
  `}function ir(){let e=document.getElementById("tasksList"),o=ze;if(!o){e.innerHTML='<div class="empty-state">Select a delivery to view tasks</div>';return}Bt(o).then((n)=>{if(!n){e.innerHTML='<div class="error-state">Delivery report not found</div>';return}let s=n.tasks;if(s.length===0){e.innerHTML='<div class="empty-state">No tasks for this delivery</div>';return}e.innerHTML=s.map((l)=>`
      <div class="task-item">
        <div class="task-header">
          <span class="task-title">${z(l.title)}</span>
          <span class="task-status status-${l.status}">${l.status}</span>
        </div>
        <div class="task-meta">
          <span>Type: ${l.type}</span>
          <span>Priority: ${l.priority}</span>
          <span>Assigned: ${l.assignedAgentId||"none"}</span>
        </div>
        <div class="task-meta">
          <span>Dependencies: ${l.dependencies.join(", ")||"none"}</span>
        </div>
      </div>
    `).join("")}).catch((n)=>{e.innerHTML=`<div class="error-state">Error loading tasks: ${n instanceof Error?n.message:"unknown"}</div>`})}function Gr(){document.getElementById("qualityContent").innerHTML='<div class="empty-state">Select a delivery to view quality gates</div>'}function $r(){document.getElementById("reviewsContent").innerHTML='<div class="empty-state">Select a delivery to view reviews</div>'}function Hr(){document.getElementById("releasesContent").innerHTML='<div class="empty-state">Release status will be shown here</div>'}function Xr(){document.getElementById("evidenceContent").innerHTML='<div class="empty-state">Select a delivery to view evidence</div>'}function Fr(){let e=document.getElementById("lastRefresh");e.textContent=zt?`Last refreshed: ${zt.toLocaleTimeString()}`:"Last refreshed: never"}async function Br(){}Br();var Vr=3000,cr=pe(),We=null,Ee=null;cr.onReady((e)=>{if(It(e,document.documentElement),document.body.dataset.theme=e.theme.mode,document.body.dataset.surface=e.surface,We=e.directory,Ft(e.directory),Wt(),Ee)clearInterval(Ee);Ee=window.setInterval(()=>{if(document.visibilityState==="visible")Wt()},Vr),cr.onDirectory((o)=>{if(o!==We)We=o,Ft(o),Wt()}),window.addEventListener("beforeunload",()=>{if(Ee)clearInterval(Ee)})});async function Wt(){if(!We)return;try{await Promise.resolve().then(() => Ve());let n=await Zo();if(!n)return;if(n.schemaVersion!==1)return;let s=await qo();if(!s)return;await ar(s)}catch(e){console.error("Failed to load dashboard:",e)}}})();
