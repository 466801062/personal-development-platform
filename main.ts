// main.ts — 个人提升管理平台（Deno KV 云端存储版）
const kv = await Deno.openKv();

// ============================================
// 前端 HTML（通过模板字符串内嵌）
// ============================================
const HTML = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#7c3aed">
<title>个人提升管理平台</title>
<style>
*{box-sizing:border-box}html,body{margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Hiragino Sans GB","Microsoft YaHei",sans-serif;background:#f4f6fb;color:#1e2233;-webkit-font-smoothing:antialiased;font-size:15px;line-height:1.55}
button,input,select,textarea{font-family:inherit;font-size:inherit;color:inherit}
button{cursor:pointer;border:none;background:none}
:root{--purple:#7c3aed;--purple-l:#a78bfa;--green:#10b981;--red:#ef4444;--amber:#f59e0b;--text:#1e2233;--muted:#6b7280;--faint:#9aa0b4;--line:#e8eaf2;--card:#fff}
.layout{display:block}.main{padding:16px 14px 96px;max-width:1180px;margin:0 auto}
@media(min-width:1024px){.layout{display:grid;grid-template-columns:236px 1fr;min-height:100vh}.main{padding:28px 32px 60px;margin:0;max-width:none;width:100%}}
.nav{position:fixed;left:0;right:0;bottom:0;z-index:90;display:flex;justify-content:space-around;align-items:center;background:rgba(255,255,255,.94);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);border-top:1px solid var(--line);padding:6px 4px calc(6px + env(safe-area-inset-bottom))}
.nav .brand{display:none}.nav button{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;padding:6px 4px;border-radius:12px;color:var(--faint);font-size:11px;font-weight:500;transition:.18s}
.nav button svg{width:21px;height:21px}.nav button.active{color:var(--purple);background:linear-gradient(180deg,rgba(124,58,237,.10),rgba(124,58,237,.03))}
@media(min-width:768px) and (max-width:1023px){.nav{position:sticky;top:0;bottom:auto;justify-content:flex-start;gap:6px;padding:10px 16px;border-top:none;border-bottom:1px solid var(--line)}.nav button{flex:0 0 auto;flex-direction:row;gap:7px;font-size:14px;padding:8px 15px;border-radius:10px}.nav button svg{width:17px;height:17px}}
@media(min-width:1024px){.nav{position:sticky;top:0;left:auto;right:auto;bottom:auto;height:100vh;flex-direction:column;justify-content:flex-start;align-items:stretch;gap:4px;padding:22px 14px;border-top:none;border-right:1px solid var(--line);background:#fff}.nav .brand{display:flex;align-items:center;gap:9px;padding:0 8px 18px;font-weight:700;font-size:15.5px;letter-spacing:-.2px}.nav .brand .logo{width:30px;height:30px;border-radius:9px;flex:0 0 auto;background:linear-gradient(135deg,#7c3aed,#a855f7);display:flex;align-items:center;justify-content:center;color:#fff}.nav .brand .logo svg{width:17px;height:17px}.nav button{flex:0 0 auto;flex-direction:row;justify-content:flex-start;gap:10px;font-size:14.5px;padding:11px 14px;border-radius:11px}.nav button svg{width:18px;height:18px}.nav button:hover{background:#f5f4fe;color:var(--purple)}}
.page-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:18px}
.page-head h1{margin:0;font-size:23px;letter-spacing:-.4px;font-weight:700}
.page-head .sub{margin:3px 0 0;color:var(--faint);font-size:13px}
@media(min-width:1024px){.page-head h1{font-size:27px}}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:9px 16px;border-radius:11px;font-size:14px;font-weight:600;border:1px solid var(--line);background:#fff;color:var(--text);transition:.16s;white-space:nowrap}
.btn svg{width:16px;height:16px}.btn:hover{background:#f7f7fc}.btn:active{transform:scale(.97)}
.btn.primary{background:linear-gradient(135deg,#7c3aed,#a855f7);color:#fff;border-color:transparent;box-shadow:0 6px 18px -6px rgba(124,58,237,.6)}
.btn.primary:hover{background:linear-gradient(135deg,#6d28d9,#9333ea)}
.btn.big{padding:14px 20px;font-size:15px;border-radius:14px}
.btn.block{width:100%;margin-top:6px}
.btn.danger{color:var(--red);border-color:#fbd5d5;background:#fff5f5}
.btn:disabled{opacity:.45;cursor:not-allowed}
.btn.primary[data-action="checkin"]{background:#ef4444;border-color:#ef4444;color:#fff;box-shadow:0 6px 18px -6px rgba(239,68,68,.55)}
.btn.primary[data-action="checkin"]:hover{background:#dc2626}
.card{background:var(--card);border-radius:16px;border:1px solid var(--line);box-shadow:0 1px 2px rgba(24,26,52,.035),0 10px 26px -18px rgba(24,26,52,.18);padding:16px}
.section{margin-bottom:22px}
.section-title{display:flex;align-items:center;gap:7px;margin:0 0 11px;font-size:14px;font-weight:700;color:var(--muted);letter-spacing:.2px}
.section-title svg{width:16px;height:16px;color:var(--purple)}
.goal-list{display:flex;flex-direction:column;gap:14px}
@media(min-width:1024px){.goal-list{display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:16px;align-items:start}}
.cat-chip{display:inline-flex;align-items:center;gap:4px;padding:2.5px 9px;border-radius:99px;font-size:11px;font-weight:700;background:#eef0f7;color:#6b7280;flex:0 0 auto;white-space:nowrap;max-width:120px;overflow:hidden;text-overflow:ellipsis;line-height:1.5}
.cat-filter-bar{display:flex;gap:8px;overflow-x:auto;padding:2px 0 10px;margin-bottom:6px;-webkit-overflow-scrolling:touch;scrollbar-width:none}
.cat-filter-bar::-webkit-scrollbar{display:none}.cat-filter-bar:empty{display:none}
.filter-chip{display:inline-flex;align-items:center;gap:5px;padding:6px 12px;border-radius:99px;border:1px solid var(--line);background:#fff;color:var(--muted);font-size:12.5px;font-weight:600;flex:0 0 auto;cursor:pointer;transition:.15s;white-space:nowrap}
.filter-chip:hover{border-color:#ddd6fe;color:#6d28d9;background:#faf8ff}
.filter-chip.active{background:linear-gradient(135deg,#7c3aed,#a855f7);color:#fff;border-color:transparent}
.filter-chip .fc-count{font-size:10.5px;font-weight:700;background:rgba(0,0,0,.06);color:inherit;padding:1px 6px;border-radius:99px}
.filter-chip.active .fc-count{background:rgba(255,255,255,.25)}
.reminder-banner{display:flex;align-items:flex-start;gap:12px;background:linear-gradient(135deg,#fef3c7,#fde68a);border:1px solid #fcd34d;border-radius:14px;padding:12px 15px;margin-bottom:16px;color:#78350f;font-size:13.5px;line-height:1.55}
.reminder-banner svg{width:20px;height:20px;flex:0 0 auto;color:#d97706;margin-top:1px}
.reminder-banner b{font-weight:700}
.backup-banner{display:flex;align-items:center;gap:12px;flex-wrap:wrap;background:linear-gradient(135deg,#f5f3ff,#ede9fe);border:1px solid #ddd6fe;border-radius:14px;padding:13px 15px;margin-bottom:18px;font-size:13.5px;color:#4c1d95}
.backup-banner svg{width:20px;height:20px;flex:0 0 auto;color:#7c3aed}
.backup-banner .bb-text{flex:1 1 200px;line-height:1.5}
.backup-banner .btn{background:#fff;border-color:#ddd6fe;color:#6d28d9;padding:7px 13px;font-size:13px}
.review-list{display:flex;flex-direction:column;gap:10px}
.review-item{display:flex;align-items:flex-start;gap:12px;background:#fff;border:1px solid var(--line);border-radius:14px;padding:13px 14px;position:relative;overflow:hidden}
.review-item::before{content:"";position:absolute;left:0;top:0;bottom:0;width:3px;background:var(--rc,#7c3aed)}
.ri-main{flex:1;min-width:0}
.ri-head{display:flex;align-items:center;gap:7px;flex-wrap:wrap;margin-bottom:4px}
.ri-goal{font-weight:700;font-size:13.5px}
.ri-tag{font-size:10.5px;font-weight:700;padding:2px 7px;border-radius:99px;background:#ede9fe;color:#6d28d9;flex:0 0 auto}
.ri-tag.hot{background:#fef2f2;color:#dc2626}
.ri-meta{font-size:12px;color:var(--faint);margin-bottom:6px}
.ri-summary{font-size:12.5px;color:#4b5163;line-height:1.62;background:#f8f9fd;border-radius:9px;padding:8px 10px;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;cursor:pointer}
.ri-summary:hover{background:#f3f4fa}
.ri-summary.empty{color:#b6bacb;font-style:italic;cursor:default;background:#fbfbfe;border:1px dashed #e8eaf2}
.ri-actions{display:flex;flex-direction:column;gap:6px;flex:0 0 auto}
.ri-actions .btn{padding:7px 12px;font-size:12.5px}
.goal-card{position:relative;overflow:hidden}
.goal-card::before{content:"";position:absolute;left:0;top:0;bottom:0;width:4px;background:var(--gc);border-radius:0 4px 4px 0}
.goal-card.pending::before{background:linear-gradient(180deg,#f59e0b,#ef4444)}
.goal-card.pending .gc-dot{background:#ef4444;animation:pulseDot 2s infinite}
@keyframes pulseDot{0%,100%{box-shadow:0 0 0 3px rgba(239,68,68,.18)}50%{box-shadow:0 0 0 6px rgba(239,68,68,.08)}}
.status-banner{display:flex;gap:9px;align-items:flex-start;border-radius:11px;padding:10px 12px;margin:-2px 0 13px;font-size:13px;line-height:1.5}
.status-banner svg{width:16px;height:16px;flex:0 0 auto;margin-top:2px}
.status-banner.warn{background:#fffbeb;border:1px solid #fde68a;color:#92400e}
.status-banner.bad{background:#fef2f2;border:1px solid #fecaca;color:#991b1b}
.status-banner b{font-weight:700}
.gc-top{display:flex;align-items:center;gap:8px;margin-bottom:12px}
.gc-dot{width:9px;height:9px;border-radius:50%;background:var(--gc);flex:0 0 auto;box-shadow:0 0 0 3px color-mix(in srgb,var(--gc) 18%,transparent)}
.gc-name{margin:0;font-size:16px;font-weight:700;flex:1;letter-spacing:-.2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0}
.gc-actions{display:flex;gap:2px;flex:0 0 auto}
.icon-btn{width:30px;height:30px;border-radius:9px;display:flex;align-items:center;justify-content:center;color:var(--faint);transition:.15s}
.icon-btn svg{width:16px;height:16px}
.icon-btn:hover{background:#f3f4f9;color:var(--muted)}
.icon-btn.danger:hover{background:#fef2f2;color:var(--red)}
.gc-stats{display:flex;gap:6px;margin-bottom:11px}
.stat{flex:1;min-width:0;background:#f8f9fd;border-radius:10px;padding:8px 9px;display:flex;flex-direction:column;gap:1px}
.stat-v{font-size:14.5px;font-weight:700;letter-spacing:-.2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.stat-l{font-size:11px;color:var(--faint)}
.stat-v.good{color:var(--green)}.stat-v.bad{color:var(--red)}
.bar{height:9px;border-radius:99px;background:#eef0f7;overflow:hidden;margin-bottom:7px}
.bar .fill{height:100%;border-radius:99px;background:linear-gradient(90deg,var(--gc),color-mix(in srgb,var(--gc) 55%,#fff));transition:width .45s cubic-bezier(.4,0,.2,1)}
.bar-meta{font-size:12px;color:var(--faint);margin-bottom:12px;line-height:1.5}
.bar-meta b{color:var(--muted);font-weight:600}
.plan-box{background:#f8f9fd;border-radius:11px;padding:10px 12px;margin-bottom:13px;font-size:12.5px;line-height:1.6;color:#4b5163}
.plan-box .pl{display:flex;gap:7px;align-items:flex-start}
.plan-box .pl+.pl{margin-top:6px}
.plan-box .pl svg{width:14px;height:14px;flex:0 0 auto;margin-top:2.5px;color:var(--purple-l)}
.plan-box .pl.ob svg{color:#f59e0b}
.plan-box .pl b{font-weight:600;color:#3d4258}
.note-bar{display:flex;gap:7px;margin-bottom:12px}
.note-btn{flex:1;display:flex;align-items:center;justify-content:center;gap:5px;padding:8px 10px;border-radius:10px;border:1px solid var(--line);background:#fbfbfe;color:var(--muted);font-size:12.5px;font-weight:600;transition:.15s;position:relative}
.note-btn svg{width:14px;height:14px}
.note-btn:hover{background:#f5f3ff;border-color:#ddd6fe;color:#6d28d9}
.note-btn .badge{position:absolute;top:-5px;right:-4px;min-width:17px;height:17px;padding:0 4px;border-radius:99px;background:var(--amber);color:#fff;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center}
.checkin{border-top:1px dashed var(--line);padding-top:12px}
.checkin-row{display:flex;gap:8px;align-items:center}
.checkin-row+.checkin-row{margin-top:8px}
.inp{border:1px solid var(--line);border-radius:10px;padding:9px 11px;background:#fff;width:100%;min-width:0;transition:.15s;font-size:14px}
.inp:focus{outline:none;border-color:var(--purple-l);box-shadow:0 0 0 3px rgba(167,139,250,.18)}
select.inp{appearance:none;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%239aa0b4' stroke-width='2' stroke-linecap='round'><path d='M6 9l6 6 6-6'/></svg>");background-repeat:no-repeat;background-position:right 8px center;background-size:15px;padding-right:30px;cursor:pointer}
.amount-seg-box{margin-top:10px;background:#f5f3ff;border-radius:12px;padding:12px 13px;border:1px solid #ede9fe}
.as-head{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:10px}
.as-head .as-lbl{display:flex;align-items:center;gap:6px;font-size:15px;color:#6d28d9;font-weight:700}
.as-head .as-lbl svg{width:16px;height:16px;flex:0 0 auto;color:#a78bfa}
.as-total{display:inline-flex;align-items:center;justify-content:flex-end;height:auto;padding:4px 9px;border-radius:8px;background:#ede9fe;font-weight:700;color:#7c3aed;font-size:13.5px;white-space:nowrap;line-height:1.2}
.as-total.empty{color:#a78bfa;font-weight:500;font-size:12px;background:#f3f0ff}
.as-list{display:flex;flex-direction:column;gap:9px}
.as-row{display:flex;align-items:center;gap:7px}
.as-row input[type="number"]{flex:1 1 0;min-width:0;width:100%;border:1px solid #e2e5ef;border-radius:11px;padding:11px 12px;font-size:13px;font-weight:400;background:#fff;height:46px;transition:.15s}
.as-row input[type="number"]:focus{outline:none;border-color:#a78bfa;box-shadow:0 0 0 3px rgba(167,139,250,.18)}
.as-row input[type="number"]::placeholder{font-size:12.5px;color:#b6bacb}
.as-row input[type="number"]::-webkit-outer-spin-button,.as-row input[type="number"]::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}
.as-sep{display:flex;align-items:center;justify-content:center;color:#a78bfa;font-size:14px;font-weight:700;flex:0 0 auto;min-width:14px;height:46px}
.as-sum{display:flex;align-items:center;justify-content:center;flex:0 0 auto;min-width:44px;height:auto;padding:4px 8px;border-radius:8px;background:#ede9fe;font-size:12.5px;font-weight:700;color:#7c3aed;line-height:1.2}
.as-sum.empty{color:#a78bfa;font-weight:500;font-size:11.5px;background:#f3f0ff}
.as-del{width:28px;flex:0 0 28px;align-self:center;height:28px;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#c8ccda;transition:.15s}
.as-del:hover{background:#fef2f2;color:var(--red)}
.as-del svg{width:13px;height:13px}
.as-add{display:flex;align-items:center;justify-content:center;gap:6px;width:100%;padding:9px;border-radius:10px;border:1px dashed #c4b5fd;color:#7c3aed;font-size:13px;font-weight:600;margin-top:10px;transition:.15s;background:#fff}
.as-add:hover{background:#ede9fe}
.as-add svg{width:14px;height:14px}
.as-done{margin-top:12px;padding-top:11px;border-top:1px dashed #ddd6fe}
.as-done-head{display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:11.5px;color:#6d28d9;font-weight:700;margin-bottom:8px}
.as-done-empty{font-size:12px;color:#a78bfa;padding:6px 0;text-align:center;opacity:.7}
.asd-row{display:flex;align-items:center;gap:8px;padding:6px 9px;border-radius:8px;background:#fff;border:1px solid #ede9fe;margin-bottom:5px;font-size:12px;line-height:1.4}
.asd-range{color:#6d28d9;font-weight:600;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.asd-amount{color:#059669;font-weight:700;flex:0 0 auto}
.asd-del{width:20px;height:20px;border-radius:6px;flex:0 0 auto;display:flex;align-items:center;justify-content:center;color:#c8ccda;transition:.15s}
.asd-del:hover{background:#fef2f2;color:var(--red)}
.asd-del svg{width:11px;height:11px}
.time-seg-box{margin-top:10px;background:#f8f9fd;border-radius:12px;padding:13px 14px}
.ts-head{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:11px}
.ts-head .ts-lbl{display:flex;align-items:center;gap:6px;font-size:15px;color:#6b7280;font-weight:600}
.ts-head .ts-lbl svg{width:16px;height:16px;color:#a78bfa;flex:0 0 auto}
.ts-total{display:inline-flex;align-items:center;justify-content:flex-end;height:auto;padding:4px 9px;border-radius:8px;background:#ede9fe;font-weight:700;color:#7c3aed;font-size:13.5px;white-space:nowrap;line-height:1.2}
.ts-total.empty{color:#a78bfa;font-weight:500;font-size:12px;background:#f3f0ff}
.ts-list{display:flex;flex-direction:column;gap:9px}
.ts-row{display:flex;align-items:center;gap:7px}
.ts-row input[type="time"]{flex:1 1 0;min-width:0;width:100%;border:1px solid #e2e5ef;border-radius:11px;padding:11px 12px;font-size:15.5px;background:#fff;height:46px;transition:.15s}
.ts-row input[type="time"]:focus{outline:none;border-color:#a78bfa;box-shadow:0 0 0 3px rgba(167,139,250,.18)}
.ts-sep{display:flex;align-items:center;justify-content:center;color:#c3c7d6;font-size:14px;font-weight:600;flex:0 0 auto;min-width:10px;height:46px}
.ts-min{display:flex;align-items:center;justify-content:center;flex:0 0 auto;min-width:40px;padding:4px 8px;border-radius:8px;background:#ecfdf5;font-size:12.5px;font-weight:700;color:#059669;line-height:1.2}
.ts-min.empty{color:#a78bfa;font-weight:500;font-size:11.5px;background:#f3f0ff}
.ts-del{width:28px;flex:0 0 28px;align-self:center;height:28px;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#c8ccda;transition:.15s}
.ts-del:hover{background:#fef2f2;color:var(--red)}
.ts-del svg{width:13px;height:13px}
.ts-add{display:flex;align-items:center;justify-content:center;gap:6px;width:100%;padding:9px;border-radius:10px;border:1px dashed #d8dbea;color:#9aa0b4;font-size:13px;font-weight:600;margin-top:10px;transition:.15s;background:#fff}
.ts-add:hover{border-color:#c4b5fd;color:#7c3aed;background:#faf8ff}
.ts-add svg{width:14px;height:14px}
.goal-progress{margin-top:12px;padding:11px 12px;border-radius:12px;background:#f8f9fd;border:1px solid #eef0f7}
.gp-top{display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:12.5px;margin-bottom:8px}
.gp-lbl{color:#6b7280}.gp-lbl b{color:#1e2233;font-weight:700}
.gp-status{font-weight:700;white-space:nowrap}
.gp-status.short{color:#d97706}.gp-status.ok{color:#059669}.gp-status.over{color:#7c3aed}
.gp-bar{height:8px;border-radius:99px;background:#eef0f7;overflow:hidden}
.gp-fill{height:100%;border-radius:99px;width:0;background:linear-gradient(90deg,#fbbf24,#f59e0b);transition:width .3s}
.gp-fill.ok{background:linear-gradient(90deg,#34d399,#10b981)}
.gp-fill.over{background:linear-gradient(90deg,#a855f7,#7c3aed)}
.empty{text-align:center;padding:38px 20px;color:var(--faint);font-size:13.5px;background:#fff;border:1px dashed var(--line);border-radius:16px}
.empty svg{width:34px;height:34px;color:#d8dbea;margin-bottom:8px}
.hint-foot{text-align:center;color:#b6bacb;font-size:11.5px;margin-top:18px;line-height:1.6}
.board-grid{display:flex;flex-direction:column;gap:14px;margin-bottom:22px}
@media(min-width:1024px){.board-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(380px,1fr));gap:16px;align-items:start}}
.chart-card{margin-bottom:20px}
.card-title{margin:0 0 4px;font-size:15px;font-weight:700}
.card-sub{margin:0 0 12px;font-size:12px;color:var(--faint)}
.chart-wrap svg{width:100%;height:auto;display:block;overflow:visible}
.legend{display:flex;flex-wrap:wrap;gap:12px;margin-top:12px;font-size:12px;color:var(--muted)}
.legend span{display:flex;align-items:center;gap:5px}
.legend i{width:9px;height:9px;border-radius:3px;display:block}
.bg-head{display:flex;align-items:center;gap:9px;margin-bottom:14px;flex-wrap:nowrap}
.bg-head h3{margin:0;font-size:15.5px;font-weight:700;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0}
.tag{font-size:11px;background:#f3f4f9;color:var(--muted);padding:2.5px 8px;border-radius:99px;font-weight:600;flex:0 0 auto}
.bg-body{display:flex;align-items:center;gap:16px;margin-bottom:13px}
.ring{width:88px;height:88px;flex:0 0 auto}
.bg-stats{flex:1;display:grid;grid-template-columns:1fr 1fr;gap:9px;min-width:0}
.bg-stats>div{background:#f8f9fd;border-radius:10px;padding:8px 10px;min-width:0}
.bg-stats b{display:block;font-size:15px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.bg-stats span{font-size:11px;color:var(--faint)}
.rec-list{margin-top:13px;border-top:1px dashed var(--line);padding-top:11px}
.rec-title{font-size:12px;color:var(--faint);margin-bottom:7px;display:flex;justify-content:space-between}
.rec{display:flex;align-items:flex-start;gap:10px;padding:9px 0;font-size:12.5px;border-bottom:1px solid #f4f5fa}
.rec:last-child{border-bottom:none}
.rec-date{color:var(--faint);flex:0 0 42px;padding-top:1px}
.rec-main{flex:1;min-width:0;display:flex;flex-direction:column;gap:3px}
.rec-amt{font-weight:600;color:#1e2233;font-size:12.5px;display:flex;align-items:center;gap:6px;flex-wrap:wrap}
.rec-amt .rec-arrow{color:#c3c7d6;font-weight:400;font-size:12px}
.rec-amt .rec-plus{color:#059669;font-weight:700}
.rec-meta{color:#6b7280;font-size:12px;display:flex;align-items:center;gap:5px;flex-wrap:wrap}
.rec-meta .rec-time{color:#6d28d9;font-weight:600}
.rec-meta .rec-dot{color:#c3c7d6}
.rec-tag{font-size:10px;background:#ede9fe;color:#6d28d9;padding:1.5px 6px;border-radius:5px;font-weight:700;flex:0 0 auto}
.rec-acts{display:flex;gap:1px;flex:0 0 auto;align-self:flex-start}
.rec-del{width:24px;height:24px;border-radius:7px;display:flex;align-items:center;justify-content:center;color:#c8ccda;flex:0 0 auto;transition:.15s}
.rec-del svg{width:13px;height:13px}
.rec-del:hover{background:#f3f4f9;color:var(--muted)}
.rec-del.danger:hover{background:#fef2f2;color:var(--red)}
.q-list{margin-top:13px;border-top:1px dashed var(--line);padding-top:11px}
.fold-block{margin-top:8px;border-radius:10px;background:#fbfbfe;border:1px solid #f0f1f7;overflow:hidden}
.fold-block>summary{list-style:none;cursor:pointer;display:flex;align-items:center;gap:8px;padding:9px 11px;font-size:12.5px;font-weight:700;color:#6b7280;user-select:none}
.fold-block>summary::-webkit-details-marker{display:none}
.fold-block>summary::after{content:'';width:8px;height:8px;flex:0 0 auto;border-right:1.5px solid #9aa0b4;border-bottom:1.5px solid #9aa0b4;transform:rotate(45deg);transition:transform .2s;margin-left:auto;margin-top:-3px}
.fold-block:not([open])>summary::after{transform:rotate(-45deg);margin-top:0}
.fold-block>summary:hover{background:#f5f4fe}
.fold-count{font-size:11px;font-weight:700;padding:1.5px 8px;border-radius:99px;background:#ede9fe;color:#6d28d9}
.fold-block.s-fold .fold-count{background:#dbeafe;color:#1d4ed8}
.fold-block.r-fold .fold-count{background:#dcfce7;color:#15803d}
.fold-content{padding:4px 11px 10px;display:flex;flex-direction:column;gap:7px}
.q-item{display:flex;gap:9px;align-items:flex-start;padding:9px 10px;border-radius:10px;background:#fff;border:1px solid #f0f1f7}
.q-item.done{opacity:.66}
.q-dot{width:7px;height:7px;border-radius:50%;flex:0 0 auto;margin-top:6px;background:var(--amber)}
.q-item.done .q-dot{background:var(--green)}
.q-body{flex:1;min-width:0}
.q-text{font-size:12.5px;line-height:1.58;color:#3d4258;word-break:break-word}
.q-ans{font-size:12px;line-height:1.58;color:#047857;margin-top:6px;padding-left:9px;border-left:2px solid #a7f3d0;word-break:break-word}
.q-meta{font-size:11px;color:var(--faint);margin-top:5px}
.q-acts{display:flex;gap:2px;flex:0 0 auto}
.q-item.s-item{background:#fbfaff;border-color:#e9e4fb}
.week-nav{display:flex;align-items:center;gap:10px;margin-bottom:16px}
.week-nav .wn-label{flex:1;text-align:center;font-weight:700;font-size:14.5px}
.week-nav .wn-label small{display:block;font-weight:400;color:var(--faint);font-size:11.5px;margin-top:1px}
.week-nav button{width:34px;height:34px;border-radius:10px;border:1px solid var(--line);background:#fff;display:flex;align-items:center;justify-content:center;color:var(--muted);flex:0 0 auto}
.week-nav button svg{width:16px;height:16px}
.week-nav button:disabled{opacity:.35;cursor:not-allowed}
.wk-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:9px;margin-bottom:16px}
.wk-stat{background:#f8f9fd;border-radius:11px;padding:10px 11px;text-align:center}
.wk-stat b{display:block;font-size:18px;font-weight:700}
.wk-stat span{font-size:11px;color:var(--faint);display:block}
.wk-stat em{font-style:normal;font-size:11px;font-weight:600;display:inline-block;margin-top:3px;padding:1px 7px;border-radius:99px}
.wk-stat em.up{background:#ecfdf5;color:#059669}
.wk-stat em.down{background:#fef2f2;color:#dc2626}
.wk-stat em.flat{background:#f3f4f9;color:#6b7280}
.wk-table{width:100%;border-collapse:collapse;font-size:12.5px}
.wk-table th{text-align:left;font-weight:600;color:var(--faint);font-size:11.5px;padding:0 6px 8px;border-bottom:1px solid var(--line)}
.wk-table td{padding:9px 6px;border-bottom:1px solid #f4f5fa;vertical-align:middle}
.wk-table tr:last-child td{border-bottom:none}
.wk-table td:first-child{font-weight:600}
.wk-table em{font-style:normal;font-size:11px;font-weight:600;margin-left:4px}
.wk-table em.up{color:#059669}
.wk-table em.down{color:#dc2626}
.wk-table em.flat{color:#9aa0b4}
.day-strip{display:flex;gap:5px;margin:16px 0 4px}
.day-cell{flex:1;min-width:0;border-radius:10px;padding:7px 2px 6px;text-align:center;background:#f8f9fd;border:1px solid transparent;display:flex;flex-direction:column;align-items:center;gap:2px}
.day-cell.has{background:linear-gradient(180deg,#f5f3ff,#ede9fe);border-color:#ddd6fe}
.day-cell.today{border-color:#7c3aed;background:linear-gradient(180deg,#faf5ff,#f3e8ff)}
.day-cell .dc-date{font-size:10px;color:#9aa0b4;font-weight:600;line-height:1.2}
.day-cell .dc-d{font-size:11px;color:var(--faint);line-height:1.2;font-weight:600}
.day-cell .dc-v{font-size:12px;font-weight:700;color:var(--muted);margin-top:1px;line-height:1.2}
.day-cell.has .dc-v{color:#6d28d9}
.day-cell.sat .dc-d{color:#d97706;font-weight:700}
.day-cell.sun .dc-d{color:#dc2626;font-weight:700}
.day-cell.holiday .dc-d{color:#dc2626;font-weight:700}
.dc-badge{display:inline-flex;align-items:center;justify-content:center;font-size:9.5px;font-weight:700;line-height:1;padding:2.5px 6px;border-radius:5px;background:#fef3c7;color:#b45309;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin:1px 0}
.dc-badge.holiday{background:#fee2e2;color:#b91c1c}
.dc-badge-empty{height:14px;margin:1px 0}
.note-grid{display:grid;gap:12px}
@media(min-width:768px){.note-grid{grid-template-columns:1fr 1fr}}
.note-field label{display:block;font-size:12.5px;font-weight:700;color:var(--muted);margin-bottom:6px}
.note-field textarea{width:100%;min-height:78px;resize:vertical;border:1px solid var(--line);border-radius:11px;padding:10px 12px;font-size:13.5px;line-height:1.6;background:#fff}
.note-field textarea:focus{outline:none;border-color:var(--purple-l);box-shadow:0 0 0 3px rgba(167,139,250,.18)}
.report-out{width:100%;min-height:200px;border:1px solid var(--line);border-radius:12px;padding:13px;font-size:13px;line-height:1.7;background:#fbfbfe;white-space:pre-wrap;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;resize:vertical}
.me-list{display:flex;flex-direction:column;gap:11px}
.me-item{display:flex;align-items:center;gap:13px;padding:14px 15px;background:#fff;border:1px solid var(--line);border-radius:14px;box-shadow:0 1px 2px rgba(24,26,52,.035)}
.me-item .mi-ico{width:36px;height:36px;border-radius:11px;background:#f5f3ff;color:var(--purple);display:flex;align-items:center;justify-content:center;flex:0 0 auto}
.me-item .mi-ico svg{width:18px;height:18px}
.me-item .mi-ico.red{background:#fef2f2;color:var(--red)}
.me-item .mi-ico.amber{background:#fffbeb;color:var(--amber)}
.me-item .mi-ico.green{background:#ecfdf5;color:#059669}
.me-item .mi-body{flex:1;min-width:0}
.me-item .mi-title{font-weight:600;font-size:14px}
.me-item .mi-desc{font-size:12px;color:var(--faint);line-height:1.5;margin-top:1px}
.steps{counter-reset:s;padding:0;margin:10px 0 0;list-style:none}
.steps li{counter-increment:s;position:relative;padding-left:32px;margin-bottom:11px;font-size:13.5px;line-height:1.6;color:#3d4258}
.steps li::before{content:counter(s);position:absolute;left:0;top:1px;width:21px;height:21px;border-radius:7px;background:linear-gradient(135deg,#7c3aed,#a855f7);color:#fff;font-size:11.5px;font-weight:700;display:flex;align-items:center;justify-content:center}
.sync-status{display:flex;align-items:center;gap:8px;padding:8px 11px;border-radius:9px;font-size:12.5px;line-height:1.5;margin-top:4px}
.sync-status .dot{width:8px;height:8px;border-radius:50%;flex:0 0 auto}
.sync-status.ok{background:#ecfdf5;color:#047857}
.sync-status.ok .dot{background:#10b981}
.sync-status.warn{background:#fffbeb;color:#92400e}
.sync-status.warn .dot{background:#f59e0b}
.sync-status.bad{background:#fef2f2;color:#991b1b}
.sync-status.bad .dot{background:#ef4444}
.sync-status.busy{background:#eff6ff;color:#1d4ed8}
.sync-status.busy .dot{background:#3b82f6;animation:pulseDot 1s infinite}
.modal-backdrop{position:fixed;inset:0;z-index:200;background:rgba(24,26,52,.42);-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px);display:flex;align-items:flex-end;justify-content:center;animation:fadeIn .16s ease}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
.modal{background:#fff;width:100%;max-width:560px;max-height:90vh;overflow-y:auto;border-radius:20px 20px 0 0;padding:20px 18px calc(20px + env(safe-area-inset-bottom));animation:slideUp .24s cubic-bezier(.2,.8,.3,1)}
@keyframes slideUp{from{transform:translateY(30px);opacity:.6}to{transform:translateY(0);opacity:1}}
@media(min-width:640px){.modal-backdrop{align-items:center;padding:20px}.modal{border-radius:20px;padding:24px;max-height:86vh}}
.modal h2{margin:0 0 16px;font-size:18px;font-weight:700}
.field{margin-bottom:13px}
.field label{display:block;font-size:12.5px;font-weight:600;color:var(--muted);margin-bottom:6px}
.field .inp,.field textarea{width:100%;border:1px solid var(--line);border-radius:11px;padding:10px 12px;font-size:14px;background:#fff;transition:.15s}
.field textarea{min-height:66px;resize:vertical;line-height:1.6}
.field .inp:focus,.field textarea:focus{outline:none;border-color:var(--purple-l);box-shadow:0 0 0 3px rgba(167,139,250,.18)}
.row2{display:grid;grid-template-columns:1fr 1fr;gap:11px}
.color-row{display:flex;gap:9px;flex-wrap:wrap}
.color-swatch{width:32px;height:32px;border-radius:10px;border:2px solid transparent;transition:.15s;position:relative}
.color-swatch.on{border-color:#1e2233;transform:scale(1.06)}
.color-swatch.on::after{content:"";position:absolute;inset:0;border-radius:8px;box-shadow:inset 0 0 0 2px #fff}
.modal-actions{display:flex;gap:10px;margin-top:20px;flex-wrap:wrap}
.modal-actions .btn{flex:1;min-width:0}
.modal-actions .btn.danger{flex:0 0 auto;padding:9px 14px}
.modal-hint{margin:-8px 0 16px;font-size:12.5px;color:#9aa0b4;line-height:1.62;background:#f8f9fd;border-radius:10px;padding:10px 12px}
.cat-pick{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}
.cat-pick button{padding:4px 10px;border-radius:99px;border:1px solid var(--line);background:#fbfbfe;color:var(--muted);font-size:12px;font-weight:600;transition:.15s;cursor:pointer}
.cat-pick button:hover{border-color:#ddd6fe;color:#6d28d9;background:#faf8ff}
#toast{position:fixed;left:50%;bottom:96px;transform:translateX(-50%) translateY(12px);background:rgba(30,34,51,.94);color:#fff;font-size:13.5px;font-weight:500;padding:10px 18px;border-radius:12px;z-index:300;opacity:0;pointer-events:none;transition:.24s;white-space:nowrap}
#toast.on{opacity:1;transform:translateX(-50%) translateY(0)}
@media(min-width:768px){#toast{bottom:40px}}
#confetti{position:fixed;inset:0;pointer-events:none;z-index:400}
.hidden{display:none!important}
</style>
</head>
<body>
<div class="layout">
  <nav class="nav" id="nav"></nav>
  <main class="main" id="main"></main>
</div>
<canvas id="confetti"></canvas>
<div id="toast"></div>
<div id="modalRoot"></div>
<script>
// ============================================
// 数据层：从服务器加载 / 保存
// ============================================
const API = '/api/data';
let state = null;
let cloudLoaded = false;

async function loadFromCloud() {
  try {
    const res = await fetch(API);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const payload = await res.json();
    if (payload && payload.goals) {
      state = payload;
      cloudLoaded = true;
      console.log('[云端] 数据已加载');
      return true;
    }
    state = { version: 2, goals: [], weekNotes: {} };
    cloudLoaded = true;
    return true;
  } catch (e) {
    console.error('加载云端数据失败', e);
    toast('加载云端数据失败，请刷新重试');
    return false;
  }
}

async function saveToCloud() {
  if (!state) return;
  try {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state)
    });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    console.log('[云端] 数据已保存');
  } catch (e) {
    console.error('保存到云端失败', e);
    toast('保存失败，请检查网络');
  }
}

function save() {
  saveToCloud();
}

// ============================================
// 以下为原有前端逻辑（保持不变）
// ============================================
const pad2=n=>{return(n<10?'0':'')+n};
const toKey=d=>{return d.getFullYear()+'-'+pad2(d.getMonth()+1)+'-'+pad2(d.getDate())};
const parseKey=s=>{const p=String(s).split('-').map(Number);return new Date(p[0],(p[1]||1)-1,p[2]||1)};
const addDays=(d,n)=>{const x=new Date(d.getFullYear(),d.getMonth(),d.getDate());x.setDate(x.getDate()+n);return x};
const dayIndex=d=>{return Math.floor(new Date(d.getFullYear(),d.getMonth(),d.getDate()).getTime()/86400000)};
const diffDays=(a,b)=>{return dayIndex(a)-dayIndex(b)};
const startOfWeek=d=>{const x=new Date(d.getFullYear(),d.getMonth(),d.getDate());const w=(x.getDay()+6)%7;return addDays(x,-w)};
const todayKey=()=>{return toKey(new Date())};
const uid=()=>{return Math.random().toString(36).slice(2,9)+Date.now().toString(36).slice(-4)};
const esc=s=>{return String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))};
const fmtMD=d=>{return(d.getMonth()+1)+'月'+d.getDate()+'日'};
const fmtMDs=d=>{return(d.getMonth()+1)+'/'+d.getDate()};
const WD=['日','一','二','三','四','五','六'];
const num=n=>{if(n==null||isNaN(n))return'0';const r=Math.round(n*100)/100;return Number.isInteger(r)?String(r):r.toFixed(1).replace(/\.0$/,'')};
const REVIEW_INTERVALS=[1,2,4,7,15,30];
const REVIEW_LABEL={1:'1 天',2:'2 天',4:'4 天',7:'7 天',15:'15 天',30:'30 天'};
const CN_HOLIDAYS={};
const PRESET_CATS=['健康','专业','励志','理财','工具','时间管理','人物传记','阅读','语言','技能','生活','工作','学习'];
const CAT_COLORS=[{bg:'#dcfce7',fg:'#15803d'},{bg:'#dbeafe',fg:'#1d4ed8'},{bg:'#fef3c7',fg:'#b45309'},{bg:'#e0e7ff',fg:'#4338ca'},{bg:'#ccfbf1',fg:'#0f766e'},{bg:'#fae8ff',fg:'#a21caf'},{bg:'#fce7f3',fg:'#be185d'},{bg:'#cffafe',fg:'#0e7490'},{bg:'#e9d5ff',fg:'#6b21a8'},{bg:'#fef9c3',fg:'#a16207'},{bg:'#fee2e2',fg:'#b91c1c'},{bg:'#ede9fe',fg:'#6d28d9'}];
function catColor(name){if(!name)return{bg:'#eef0f7',fg:'#6b7280'};let h=0;for(let i=0;i<name.length;i++)h=(h*31+name.charCodeAt(i))>>>0;return CAT_COLORS[h%CAT_COLORS.length]}
function catChipHTML(name){if(!name)return'';const c=catColor(name);return'<span class="cat-chip" style="background:'+c.bg+';color:'+c.fg+'">'+esc(name)+'</span>'}
function getAllCategories(){const set=new Set();for(const g of state.goals)if(g.category)set.add(g.category);return Array.from(set).sort()}
function matchFilter(g){if(filterCat==='all')return true;if(filterCat==='__none__')return!g.category;return g.category===filterCat}
function hmToMin(s){const m=String(s||'').match(/^(\d{1,2}):(\d{2})/);if(!m)return null;const h=Number(m[1]),mi=Number(m[2]);if(h>23||mi>59)return null;return h*60+mi}
function normTime(v){const t=hmToMin(v);if(t==null)return'';return pad2(Math.floor(t/60))+':'+pad2(t%60)}
function segMinutes(start,end){const a=hmToMin(start),b=hmToMin(end);if(a==null||b==null)return 0;let e=b;if(e<a)e+=1440;return e-a}
function groupByWeek(items,getDateKey){const map=new Map();for(const it of items){const dk=getDateKey(it);const mon=startOfWeek(parseKey(dk));const key=toKey(mon);if(!map.has(key))map.set(key,{mon:mon,items:[]});map.get(key).items.push(it)}const arr=Array.from(map.values());arr.sort((a,b)=>b.mon.getTime()-a.mon.getTime());return arr}
function weekGroupLabel(mon){const sun=addDays(mon,6);const thisMon=startOfWeek(new Date());const prefix=toKey(mon)===toKey(thisMon)?'本周 · ':'';return prefix+fmtMD(mon)+' – '+fmtMD(sun)}
const I={today:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4.5" width="18" height="17" rx="3.5"/><path d="M16 2.5v4M8 2.5v4M3 10h18"/><circle cx="12" cy="15.5" r="2.2" fill="currentColor" stroke="none"/></svg>',board:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="8" height="18" rx="2.5"/><rect x="13" y="8" width="8" height="13" rx="2.5"/><path d="M5.5 17.5v1.5M15.5 12.5v6.5" opacity=".55"/></svg>',weekly:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V9M9.3 19V4M14.7 19v-7M20 19v-4"/></svg>',me:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4.5 20.5a7.5 7.5 0 0 1 15 0"/></svg>',plus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12.5l5 5L20 6.5"/></svg>',alert:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.5 2.5 20h19L12 3.5z"/><path d="M12 10v4M12 17.2v.1"/></svg>',edit:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>',trash:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M9.5 7V4.5h5V7M6.5 7l1 13h9l1-13"/></svg>',x:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',left:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',right:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>',shield:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7.5 3v6c0 4.5-3.2 8-7.5 9.5C7.7 20 4.5 16.5 4.5 12V6L12 3z"/><path d="M9 12l2 2 4-4"/></svg>',clock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>',sun:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>',download:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12M7.5 10.5L12 15l4.5-4.5M4 20h16"/></svg>',upload:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20V8M7.5 12.5L12 8l4.5 4.5M4 4h16"/></svg>',refresh:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 5v6h-6"/></svg>',broom:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3l7 7-6.5 6.5-7-7L14 3z"/><path d="M7.5 9.5 4 20l10.5-3.5"/></svg>',phone:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="2.5" width="12" height="19" rx="3"/><path d="M10.5 18.5h3"/></svg>',target:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1" fill="currentColor"/></svg>',obstacle:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.5 2.5 20h19L12 3.5z"/><path d="M12 10v4M12 17.2v.1"/></svg>',plan:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h11l3 3v13H5z"/><path d="M9 10h6M9 14h4"/></svg>',db:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="6" rx="8" ry="3.2"/><path d="M4 6v12c0 1.8 3.6 3.2 8 3.2s8-1.4 8-3.2V6"/><path d="M4 12c0 1.8 3.6 3.2 8 3.2s8-1.4 8-3.2"/></svg>',cloud:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 19a4.5 4.5 0 0 1-.4-9A6 6 0 0 1 18 9.5a4.5 4.5 0 0 1-.5 9.5h-11z"/><path d="M12 12v4M12 12l-2 2M12 12l2 2"/></svg>',question:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"/><path d="M9.5 9.3a2.6 2.6 0 1 1 3.4 2.5c-.6.2-1 .7-1 1.3v.5"/><circle cx="12" cy="16.8" r="1" fill="currentColor" stroke="none"/></svg>',summary:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4.5" y="3.5" width="15" height="17" rx="2.5"/><path d="M8.5 8.5h7M8.5 12h7M8.5 15.5h4"/></svg>',brain:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3.8 12a8.2 8.2 0 0 1 14-5.8"/><path d="M20.2 12a8.2 8.2 0 0 1-14 5.8"/><path d="M18.3 3.2v3.6h-3.6M5.7 20.8v-3.6h3.6"/></svg>',bell:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 1 0-12 0c0 4-2 5-2 5h16s-2-1-2-5"/><path d="M10.5 20a2 2 0 0 0 3 0"/></svg>',tag:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9-9-9z"/><circle cx="7.5" cy="7.5" r="1.4"/></svg>'};
const KEY='study-goal-console-v2';
const LEGACY_KEYS=['goals','studyGoals','study_goals','goalData','learningGoals','study-goal-console-v1'];
const PALETTE=['#7c3aed','#2563eb','#059669','#d97706','#db2777','#0891b2','#ef4444','#0f766e'];
let tab='today';let weekOffset=0;let filterCat='all';const ui={};
function migrate(raw){/* 保持原有迁移逻辑 */}
function computeStats(g){const today=new Date();const dateSet=new Set(g.records.map(r=>r.date));const doneAmount=g.records.reduce((s,r)=>s+(Number(r.amount)||0),0);const total=Number(g.total)||0;const remaining=Math.max(0,total-doneAmount);const rate=total>0?Math.min(1,doneAmount/total):0;const dl=parseKey(g.deadline);const daysToDl=diffDays(dl,today);const overdueDays=daysToDl<0?-daysToDl:0;const daysRemaining=Math.max(1,daysToDl+1);const suggested=remaining>0?Math.ceil(remaining/daysRemaining):0;let streak=0;const usedWeeks=new Set();const restDates=new Set();let cursor=today;const LIMIT=240;for(let i=0;i<LIMIT;i++){const k=toKey(cursor);if(dateSet.has(k)){streak++}else{if(i>0){const wk=toKey(startOfWeek(cursor));if(!usedWeeks.has(wk)){usedWeeks.add(wk);restDates.add(k)}else{break}}}cursor=addDays(cursor,-1)}let yesterday='ok';const yk=toKey(addDays(today,-1));const created=g.createdAt?parseKey(g.createdAt):null;const goalExistedYesterday=created?diffDays(created,addDays(today,-1))<=0:true;if(goalExistedYesterday&&!dateSet.has(yk)){if(restDates.has(yk))yesterday='yellow';else yesterday='red'}const windowStart=addDays(today,-6);const recent=g.records.filter(r=>{const d=parseKey(r.date);return dayIndex(d)>=dayIndex(windowStart)&&dayIndex(d)<=dayIndex(today)});const daysWithData=new Set(recent.map(r=>r.date)).size;const recentAmount=recent.reduce((s,r)=>s+(Number(r.amount)||0),0);let forecast=null;if(remaining<=0){forecast={done:true}}else if(daysWithData>=2&&recentAmount>0){const speed=recentAmount/7;const daysNeeded=Math.ceil(remaining/speed);const eta=addDays(today,daysNeeded);forecast={eta,daysNeeded,speed,delta:diffDays(eta,dl)}}return{doneAmount,total,remaining,rate,daysToDl,daysRemaining,overdueDays,suggested,streak,restDates,yesterday,forecast,isDone:remaining<=0}}
function getDueReviews(){const today=new Date();const tIdx=dayIndex(today);const out=[];for(const g of state.goals){const dateSet=new Set(g.records.map(r=>r.date));for(const dk of dateSet){const off=tIdx-dayIndex(parseKey(dk));if(off<=0)continue;if(REVIEW_INTERVALS.indexOf(off)===-1)continue;const done=(g.reviews&&g.reviews[dk])||[];if(done.indexOf(off)!==-1)continue;const amt=g.records.filter(r=>r.date===dk).reduce((s,r)=>s+(Number(r.amount)||0),0);out.push({goalId:g.id,goalName:g.name,color:g.color,unit:g.unit,date:dk,offset:off,summary:(g.summaries&&g.summaries[dk])||'',amount:amt})}}out.sort((a,b)=>a.offset-b.offset);return out}
function pendingToday(){const tk=todayKey();return state.goals.filter(g=>{const st=computeStats(g);if(st.isDone)return false;return!g.records.some(r=>r.date===tk)})}
function renderNav(){const items=[{k:'today',label:'今日',icon:I.today},{k:'board',label:'看板',icon:I.board},{k:'weekly',label:'周报',icon:I.weekly},{k:'me',label:'我的',icon:I.me}];document.getElementById('nav').innerHTML='<div class="brand"><span class="logo">'+I.target+'</span>个人提升管理平台</div>'+items.map(it=>'<button data-tab="'+it.k+'" class="'+(tab===it.k?'active':'')+'">'+it.icon+'<span>'+it.label+'</span></button>').join('')}
function render(){renderNav();if(filterCat!=='all'&&filterCat!=='__none__'){if(getAllCategories().indexOf(filterCat)===-1)filterCat='all'}const main=document.getElementById('main');const scrollY=window.scrollY;let html='';if(tab==='today')html=todayHTML();else if(tab==='board')html=boardHTML();else if(tab==='weekly')html=weeklyHTML();else html=meHTML();main.innerHTML=html;if(tab==='board')drawChart();if(tab==='today'){Array.prototype.forEach.call(document.querySelectorAll('.goal-card'),card=>{const g=state.goals.find(x=>x.id===card.dataset.id);if(!g)return;const box=card.querySelector('.amount-seg-box');if(box)refreshAmtBox(box,g.unit);const tbox=card.querySelector('.time-seg-box');if(tbox)refreshSegBox(tbox);refreshGoalProgress(card)})}document.title='个人提升管理平台';window.scrollTo(0,scrollY)}
function totalRecordCount(){return state.goals.reduce((s,g)=>s+g.records.length,0)}
function backupBannerHTML(n){return'<div class="backup-banner">'+I.shield+'<div class="bb-text">你已经积累了 <b>'+n+'</b> 条打卡记录。建议再导出一份 JSON 本地备份。</div><button class="btn" data-action="export">立即导出</button></div>'}
function reminderBannerHTML(){const pending=pendingToday();if(!pending.length)return'';const names=pending.map(g=>g.name);const shown=names.slice(0,4).join(' · ')+(names.length>4?' 等':'');return'<div class="reminder-banner">'+I.bell+'<div style="flex:1;min-width:0"><div class="rb-title">今天还有 <b>'+pending.length+'</b> 个目标没有打卡</div><div class="rb-list">'+esc(shown)+'</div></div></div>'}
function categoryFilterBarHTML(){const cats=getAllCategories();const noneCount=state.goals.filter(g=>!g.category).length;const total=state.goals.length;if(!total)return'';let html='<div class="cat-filter-bar">';html+='<button class="filter-chip'+(filterCat==='all'?' active':'')+'" data-filter="all">全部 <span class="fc-count">'+total+'</span></button>';for(const c of cats){const cnt=state.goals.filter(g=>g.category===c).length;html+='<button class="filter-chip'+(filterCat===c?' active':'')+'" data-filter="'+esc(c)+'">'+esc(c)+' <span class="fc-count">'+cnt+'</span></button>'}if(noneCount>0){html+='<button class="filter-chip'+(filterCat==='__none__'?' active':'')+'" data-filter="__none__">未分类 <span class="fc-count">'+noneCount+'</span></button>'}html+='</div>';return html}
function reviewSectionHTML(){const due=getDueReviews();if(!due.length)return'';let html='<section class="section"><h2 class="section-title">'+I.brain+'抗遗忘复习 · '+due.length+' 项</h2><div class="review-list">';for(const r of due){const hot=r.offset<=2?' hot':'';html+='<div class="review-item" style="--rc:'+r.color+'"><div class="ri-main"><div class="ri-head"><span class="ri-goal">'+esc(r.goalName)+'</span><span class="ri-tag'+hot+'">第 '+REVIEW_LABEL[r.offset]+' 复习</span></div><div class="ri-meta">'+fmtMD(parseKey(r.date))+' 学了 '+num(r.amount)+' '+esc(r.unit)+' · 距今 '+r.offset+' 天</div>'+(r.summary?'<div class="ri-summary">'+esc(r.summary)+'</div>':'<div class="ri-summary empty">这一天没有写复述总结，先回想一下当时读了什么。</div>')+'</div><div class="ri-actions"><button class="btn review-ok" data-action="review-done" data-id="'+r.goalId+'" data-date="'+r.date+'" data-off="'+r.offset+'">已复习</button></div></div>'}html+='</div></section>';return html}
function todayHTML(){const today=new Date();let html='';html+='<div class="page-head"><div><h1>今日</h1><p class="sub">'+today.getFullYear()+'年'+fmtMD(today)+' · 星期'+WD[today.getDay()]+'</p></div><button class="btn primary" data-action="new-goal" style="flex:0 0 auto">'+I.plus+'新建目标</button></div>';html+=reminderBannerHTML();html+=categoryFilterBarHTML();const n=totalRecordCount();if(n>=20)html+=backupBannerHTML(n);html+=reviewSectionHTML();const visibleGoals=state.goals.filter(matchFilter);const urgent=[],normal=[];for(const g of visibleGoals){const st=computeStats(g);if(st.isDone){normal.push({g,st});continue}if(st.overdueDays>0)urgent.push({g,st,kind:'overdue'});else if(st.yesterday==='yellow')urgent.push({g,st,kind:'rest'});else if(st.yesterday==='red')urgent.push({g,st,kind:'missed'});else normal.push({g,st})}urgent.sort((a,b)=>{const rank=k=>k==='overdue'?0:(k==='missed'?1:2);return rank(a.kind)-rank(b.kind)});if(!visibleGoals.length){if(state.goals.length===0)html+='<section class="section"><div class="goal-list">'+emptyHTML()+'</div></section>';else html+='<div class="empty">'+I.tag+'<div>该分类下暂无目标<br>换个分类看看</div></div>'}else{if(urgent.length)html+='<section class="section"><h2 class="section-title">'+I.alert+'今天要处理</h2><div class="goal-list">'+urgent.map(u=>goalCardHTML(u.g,u.st,u.kind)).join('')+'</div></section>';html+='<section class="section"><h2 class="section-title">'+I.check+'今日打卡</h2><div class="goal-list">'+(normal.length?normal.map(u=>goalCardHTML(u.g,u.st,null)).join(''):emptyHTML())+'</div></section>'}html+='<button class="btn primary big block" data-action="new-goal">'+I.plus+'新建一个目标</button>';html+='<div class="hint-foot">所有数据存储在 Deno KV 云端。<br>任意设备访问同一网址即可同步。</div>';return html}
function emptyHTML(){return'<div class="empty">'+I.target+'<div>还没有进行中的目标<br>点下面的按钮，给一件有终点的事开个头</div></div>'}
function statusBannerHTML(kind,st){if(kind==='overdue')return'<div class="status-banner bad">'+I.clock+'<div>已逾期 <b>'+st.overdueDays+'</b> 天，还差 <b>'+num(st.remaining)+'</b>。</div></div>';if(kind==='rest')return'<div class="status-banner warn">'+I.sun+'<div>昨天没打卡，<b>本周休息日已启用</b>，连续打卡没有中断。</div></div>';if(kind==='missed')return'<div class="status-banner bad">'+I.alert+'<div>昨天漏打卡，且休息日已用，<b>连续打卡断了</b>。今天打一次重新开始。</div></div>';return''}
function dateOptionsHTML(selected){const today=new Date();const selDate=selected?parseKey(selected):null;const selBack=selDate?diffDays(today,selDate):-1;let out='';if(selDate&&selBack>6){out+='<option value="'+selected+'" selected>'+fmtMD(selDate)+'（历史）</option>'}for(let i=0;i<=6;i++){const d=addDays(today,-i);const k=toKey(d);let label;if(i===0)label='今天';else if(i===1)label='补 · 昨天';else if(i===2)label='补 · 前天';else label='补 · '+fmtMD(d);out+='<option value="'+k+'"'+(k===selected?' selected':'')+'>'+label+'</option>'}return out}
function amtRowHTML(from,to,unit){const fv=(from===''||from==null)?'':String(from);const tv=(to===''||to==null)?'':String(to);const f=fv===''?null:Number(fv);const t=tv===''?null:Number(tv);let n=0;if(f!==null&&t!==null&&!isNaN(f)&&!isNaN(t)&&t>=f)n=t-f;return'<input type="number" class="as-from" inputmode="numeric" min="0" step="any" placeholder="从多少开始" value="'+esc(fv)+'"><span class="as-sep">→</span><input type="number" class="as-to" inputmode="numeric" min="0" step="any" placeholder="到多少结束" value="'+esc(tv)+'"><span class="as-sum'+(n>0?'':' empty')+'">'+(n>0?n+' '+esc(unit):'—')+'</span><button type="button" class="as-del" data-action="as-del">'+I.x+'</button>'}
function todayDoneRowsHTML(g){const todayK=todayKey();const recs=g.records.filter(r=>r.date===todayK);if(!recs.length)return'<div class="as-done-empty">今天还没有记录，填好上面就能打卡</div>';let total=0,rows='';for(const r of recs){const aSegs=(r.amountSegments&&r.amountSegments.length)?r.amountSegments:(r.amount>0?[{from:0,to:r.amount,amount:r.amount}]:[]);for(const s of aSegs){total+=s.amount;const rangeText=(s.from!==''&&s.to!=='')?(num(s.from)+' → '+num(s.to)):(num(s.amount)+' '+g.unit);rows+='<div class="asd-row"><span class="asd-range">'+esc(rangeText)+'</span><span class="asd-amount">+'+num(s.amount)+' '+esc(g.unit)+'</span><button type="button" class="asd-del" data-action="del-rec" data-id="'+g.id+'" data-rec="'+r.id+'">'+I.x+'</button></div>'}}return'<div class="as-done-head"><span>今日已记录</span><span>共 '+num(total)+' '+esc(g.unit)+' · '+recs.length+' 次</span></div>'+rows}
function amountSegBoxHTML(g){const u=getUI(g.id);const segs=(u.amtSegs&&u.amtSegs.length)?u.amtSegs:[{from:'',to:''}];const rows=segs.map(s=>'<div class="as-row">'+amtRowHTML(s.from,s.to,g.unit)+'</div>').join('');const total=calcAmtSegs(segs).reduce((a,b)=>a+b.amount,0);return'<div class="amount-seg-box" data-unit="'+esc(g.unit)+'"><div class="as-head"><span class="as-lbl">'+I.target+'完成数量统计</span><span class="as-total'+(total>0?'':' empty')+'" data-amt-total>'+(total>0?'本次 '+total+' '+esc(g.unit):'未填写')+'</span></div><div class="as-list">'+rows+'</div><button type="button" class="as-add" data-action="as-add">'+I.plus+'添加一段</button><div class="as-done">'+todayDoneRowsHTML(g)+'</div></div>'}
function readAmtRowsFrom(box){if(!box)return[];return Array.prototype.slice.call(box.querySelectorAll('.as-row')).map(row=>{const f=row.querySelector('.as-from');const t=row.querySelector('.as-to');return{from:f?f.value:'',to:t?t.value:''}})}
function calcAmtSegs(rows){return rows.map(r=>{if(r.from===''||r.to===''||r.from==null||r.to==null)return null;const f=Number(r.from),t=Number(r.to);if(isNaN(f)||isNaN(t)||t<=f)return null;return{from:f,to:t,amount:t-f}}).filter(Boolean)}
function refreshAmtBox(box,unit){if(!box)return 0;const u=unit||box.dataset.unit||'个';const rows=box.querySelectorAll('.as-row');let total=0;Array.prototype.forEach.call(rows,row=>{const f=row.querySelector('.as-from');const t=row.querySelector('.as-to');const lbl=row.querySelector('.as-sum');const fv=f&&f.value!==''?Number(f.value):null;const tv=t&&t.value!==''?Number(t.value):null;let n=0;if(fv!==null&&tv!==null&&!isNaN(fv)&&!isNaN(tv)&&tv>=fv)n=tv-fv;if(lbl){lbl.textContent=n>0?n+' '+u:'—';lbl.classList.toggle('empty',n<=0)}total+=n});const el=box.querySelector('[data-amt-total]');if(el){el.textContent=total>0?'本次 '+total+' '+u:'未填写';el.classList.toggle('empty',total<=0)}return total}
function syncAmtUI(id,card){const u=getUI(id);const box=card.querySelector('.amount-seg-box');u.amtSegs=readAmtRowsFrom(box)}
function addAmtRowToBox(box){if(!box)return null;const list=box.querySelector('.as-list');if(!list)return null;const unit=box.dataset.unit||'个';const row=document.createElement('div');row.className='as-row';row.innerHTML=amtRowHTML('','',unit);list.appendChild(row);refreshAmtBox(box,unit);const card=box.closest('.goal-card');if(card&&card.dataset.id){syncAmtUI(card.dataset.id,card);refreshGoalProgress(card)}return row}
function delAmtRow(row){if(!row)return;const box=row.closest('.amount-seg-box');if(!box)return;const list=box.querySelector('.as-list');const unit=box.dataset.unit||'个';row.parentNode.removeChild(row);if(list&&!list.querySelector('.as-row')){const nr=document.createElement('div');nr.className='as-row';nr.innerHTML=amtRowHTML('','',unit);list.appendChild(nr)}refreshAmtBox(box,unit);const card=box.closest('.goal-card');if(card&&card.dataset.id){syncAmtUI(card.dataset.id,card);refreshGoalProgress(card)}}
function tsRowHTML(start,end){const s=normTime(start),e=normTime(end);const m=(s&&e)?segMinutes(s,e):0;return'<input type="time" class="ts-start" value="'+esc(s)+'" step="60"><span class="ts-sep">—</span><input type="time" class="ts-end" value="'+esc(e)+'" step="60"><span class="ts-min'+(m>0?'':' empty')+'">'+(m>0?m+'′':'—')+'</span><button type="button" class="ts-del" data-action="ts-del">'+I.x+'</button>'}
function timeSegBoxHTML(g,opts){const o=opts||{};const u=o.segments?null:getUI(g.id);const segs=o.segments&&o.segments.length?o.segments:((u&&u.segments&&u.segments.length)?u.segments:[{start:'',end:''}]);const rows=segs.map(s=>'<div class="ts-row">'+tsRowHTML(s.start,s.end)+'</div>').join('');const initTotal=segs.reduce((a,s)=>{const m=(normTime(s.start)&&normTime(s.end))?segMinutes(s.start,s.end):0;return a+m},0);return'<div class="time-seg-box"><div class="ts-head"><span class="ts-lbl">'+I.clock+'投入时间统计</span><span class="ts-total'+(initTotal>0?'':' empty')+'" data-total>'+(initTotal>0?'合计 '+initTotal+' 分钟':'未填写')+'</span></div><div class="ts-list">'+rows+'</div><button type="button" class="ts-add" data-action="ts-add">'+I.plus+'添加时间段</button></div>'}
function readSegRowsFrom(container){if(!container)return[];return Array.prototype.slice.call(container.querySelectorAll('.ts-row')).map(row=>{const s=row.querySelector('.ts-start');const e=row.querySelector('.ts-end');return{start:s?s.value:'',end:e?e.value:''}})}
function calcSegs(rows){return rows.map(r=>({start:normTime(r.start),end:normTime(r.end)})).filter(r=>r.start&&r.end).map(r=>({start:r.start,end:r.end,minutes:segMinutes(r.start,r.end)})).filter(s=>s.minutes>0)}
function refreshSegBox(box){if(!box)return;const rows=box.querySelectorAll('.ts-row');let total=0;Array.prototype.forEach.call(rows,row=>{const s=row.querySelector('.ts-start');const e=row.querySelector('.ts-end');const label=row.querySelector('.ts-min');const sv=s?normTime(s.value):'';const ev=e?normTime(e.value):'';const m=(sv&&ev)?segMinutes(sv,ev):0;if(label){label.textContent=m>0?m+'′':'—';label.classList.toggle('empty',m<=0)}total+=m});const tEl=box.querySelector('[data-total]');if(tEl){tEl.textContent=total>0?'合计 '+total+' 分钟':'未填写';tEl.classList.toggle('empty',total<=0)}}
function syncSegUI(id,card){const u=getUI(id);u.segments=readSegRowsFrom(card)}
function addSegRowToBox(box){if(!box)return null;const list=box.querySelector('.ts-list');if(!list)return null;const rows=list.querySelectorAll('.ts-row');const last=rows.length?rows[rows.length-1]:null;const lastEnd=last?normTime((last.querySelector('.ts-end')||{}).value||''):'';const row=document.createElement('div');row.className='ts-row';row.innerHTML=tsRowHTML(lastEnd,'');list.appendChild(row);refreshSegBox(box);const card=box.closest('.goal-card');if(card&&card.dataset.id)syncSegUI(card.dataset.id,card);return row}
function delSegRow(row){if(!row)return;const box=row.closest('.time-seg-box');if(!box)return;const list=box.querySelector('.ts-list');row.parentNode.removeChild(row);if(list&&!list.querySelector('.ts-row')){const nr=document.createElement('div');nr.className='ts-row';nr.innerHTML=tsRowHTML('','');list.appendChild(nr)}refreshSegBox(box);const card=box.closest('.goal-card');if(card&&card.dataset.id)syncSegUI(card.dataset.id,card)}
function refreshGoalProgress(card){const box=card.querySelector('[data-goalprog]');if(!box)return;const id=card.dataset.id;const g=state.goals.find(x=>x.id===id);if(!g)return;const suggested=Number(box.dataset.suggested)||0;const unit=box.dataset.unit||g.unit;if(suggested<=0){const lbl=box.querySelector('.gp-lbl');const st=box.querySelector('.gp-status');const bar=box.querySelector('.gp-bar');if(lbl)lbl.innerHTML='目标总量已完成，继续记录也行';if(st){st.textContent='';st.className='gp-status'}if(bar)bar.classList.add('hidden');return}const todayK=todayKey();const doneToday=g.records.filter(r=>r.date===todayK).reduce((s,r)=>s+(Number(r.amount)||0),0);const amtBox=card.querySelector('.amount-seg-box');const inputNow=calcAmtSegs(readAmtRowsFrom(amtBox)).reduce((a,b)=>a+b.amount,0);const total=doneToday+inputNow;const pct=Math.min(100,(total/suggested)*100);const fill=box.querySelector('.gp-fill');const status=box.querySelector('.gp-status');const lbl=box.querySelector('.gp-lbl');if(fill){fill.style.width=pct+'%';fill.className='gp-fill'+(total>suggested?' over':(total>=suggested?' ok':''))}if(lbl)lbl.innerHTML='今日已 '+num(total)+' / 建议 <b>'+num(suggested)+'</b> '+esc(unit);let txt='',cls='short';if(total>suggested){txt='超出期望 +'+num(total-suggested);cls='over'}else if(total>=suggested){txt='达成';cls='ok'}else{txt='还差 '+num(suggested-total);cls='short'}if(status){status.textContent=txt;status.className='gp-status '+cls}}
function goalProgressHTML(g,st){return'<div class="goal-progress" data-goalprog data-suggested="'+st.suggested+'" data-unit="'+esc(g.unit)+'"><div class="gp-top"><span class="gp-lbl">今日已 0 / 建议 <b>'+num(st.suggested)+'</b> '+esc(g.unit)+'</span><span class="gp-status short">还差 '+num(st.suggested)+'</span></div><div class="gp-bar"><div class="gp-fill"></div></div></div>'}
function goalCardHTML(g,st,urgentKind){const u=getUI(g);const pct=Math.round(st.rate*1000)/10;let etaHTML='<span class="stat-v" style="color:#9aa0b4">暂无推算</span>';if(st.isDone){etaHTML='<span class="stat-v good">已完成</span>'}else if(st.forecast&&st.forecast.eta){const f=st.forecast;let cmp='',cls='';if(f.delta<0){cmp='提前'+(-f.delta)+'天';cls='good'}else if(f.delta>0){cmp='拖后'+f.delta+'天';cls='bad'}else{cmp='正好卡点';cls=''}etaHTML='<span class="stat-v '+cls+'">'+fmtMDs(f.eta)+'<small style="font-size:10.5px;font-weight:600;margin-left:3px;opacity:.85">'+cmp+'</small></span>'}const deadlineStr=fmtMD(parseKey(g.deadline));const overdueTag=st.overdueDays>0?' · <span style="color:#ef4444;font-weight:600">已逾期'+st.overdueDays+'天</span>':'';const planHTML=(g.obstacle||g.plan)?'<div class="plan-box">'+(g.obstacle?'<div class="pl ob">'+I.obstacle+'<div><b>障碍：</b>'+esc(g.obstacle)+'</div></div>':'')+(g.plan?'<div class="pl">'+I.plan+'<div><b>如果它出现，我就：</b>'+esc(g.plan)+'</div></div>':'')+'</div>':'';const openQs=(g.questions||[]).filter(q=>!q.resolved).length;const summaries=g.summaries||{};const hasSummaryToday=!!summaries[todayKey()];const noteBarHTML='<div class="note-bar"><button class="note-btn" data-action="add-question" data-id="'+g.id+'">'+I.question+'记疑问'+(openQs?'<span class="badge">'+openQs+'</span>':'')+'</button><button class="note-btn" data-action="add-summary" data-id="'+g.id+'">'+I.summary+(hasSummaryToday?'改复述':'复述总结')+'</button></div>';const todayK=todayKey();const hasToday=g.records.some(r=>r.date===todayK);const isPending=!st.isDone&&!hasToday;const catHTML=g.category?catChipHTML(g.category):'';return'<article class="card goal-card'+(isPending?' pending':'')+'" data-id="'+g.id+'" style="--gc:'+g.color+'">'+(urgentKind?statusBannerHTML(urgentKind,st):'')+'<div class="gc-top"><span class="gc-dot"></span><h3 class="gc-name">'+esc(g.name)+'</h3>'+catHTML+'<div class="gc-actions"><button class="icon-btn" data-action="edit" data-id="'+g.id+'" title="编辑目标">'+I.edit+'</button><button class="icon-btn danger" data-action="delete" data-id="'+g.id+'" title="删除目标">'+I.trash+'</button></div></div><div class="gc-stats"><div class="stat"><span class="stat-v">'+pct+'%</span><span class="stat-l">完成率</span></div><div class="stat"><span class="stat-v">'+st.streak+' 天</span><span class="stat-l">连续打卡</span></div><div class="stat">'+etaHTML+'<span class="stat-l">预计完成</span></div></div><div class="bar"><div class="fill" style="width:'+(st.rate*100).toFixed(2)+'%"></div></div><div class="bar-meta">已完成 <b>'+num(st.doneAmount)+'</b> / '+num(g.total)+' '+esc(g.unit)+' · 剩余 <b>'+num(st.remaining)+'</b> '+esc(g.unit)+' · 截止 '+deadlineStr+overdueTag+'</div>'+planHTML+noteBarHTML+'<div class="checkin">'+timeSegBoxHTML(g)+'<div class="checkin-row" style="margin-top:10px"><select class="inp" data-role="date" data-id="'+g.id+'">'+dateOptionsHTML(u.date||todayKey())+'</select></div>'+amountSegBoxHTML(g)+goalProgressHTML(g,st)+'<button class="btn primary block" style="margin-top:12px" data-action="checkin" data-id="'+g.id+'">'+I.check+'打卡</button></div></article>'}
function getUI(id){if(!ui[id])ui[id]={date:todayKey(),amtSegs:[],segments:[]};if(!ui[id].amtSegs)ui[id].amtSegs=[];if(!ui[id].segments)ui[id].segments=[];return ui[id]}
function ringSVG(rate,color){const r=38,c=2*Math.PI*r;const off=c*(1-Math.max(0,Math.min(1,rate)));return'<svg class="ring" viewBox="0 0 100 100"><circle cx="50" cy="50" r="'+r+'" fill="none" stroke="#eef0f7" stroke-width="9"/><circle cx="50" cy="50" r="'+r+'" fill="none" stroke="'+color+'" stroke-width="9" stroke-linecap="round" stroke-dasharray="'+c.toFixed(2)+'" stroke-dashoffset="'+off.toFixed(2)+'" transform="rotate(-90 50 50)" style="transition:stroke-dashoffset .5s cubic-bezier(.4,0,.2,1)"/><text x="50" y="50" text-anchor="middle" dominant-baseline="central" font-size="19" font-weight="700" fill="#1e2233">'+Math.round(rate*100)+'%</text></svg>'}
function boardHTML(){let html='<div class="page-head"><div><h1>看板</h1><p class="sub">进度环 · 速度推算 · 打卡记录</p></div></div>';html+=categoryFilterBarHTML();html+='<section class="card chart-card"><h2 class="card-title">近 14 天投入分钟</h2><p class="card-sub">按目标堆叠，只统计填了时间段的记录。</p><div class="chart-wrap"><svg id="minChart" viewBox="0 0 720 290" role="img"></svg></div><div class="legend">'+state.goals.map(g=>'<span><i style="background:'+g.color+'"></i>'+esc(g.name)+'</span>').join('')+'</div></section>';const visibleGoals=state.goals.filter(matchFilter);if(!visibleGoals.length){if(state.goals.length===0)html+='<div class="empty">'+I.target+'<div>还没有目标</div></div>';else html+='<div class="empty">'+I.tag+'<div>该分类下暂无目标<br>换个分类看看</div></div>'}else{html+='<div class="board-grid">'+visibleGoals.map(g=>boardGoalHTML(g)).join('')+'</div>'}return html}
function questionItemHTML(g,q){return'<div class="q-item'+(q.resolved?' done':'')+'"><span class="q-dot"></span><div class="q-body"><div class="q-text">'+esc(q.text)+'</div>'+(q.answer?'<div class="q-ans">'+esc(q.answer)+'</div>':'')+'<div class="q-meta">'+fmtMD(parseKey(q.date))+(q.resolved?' · 已解决':' · 待解决')+'</div></div><div class="q-acts"><button class="rec-del" data-action="edit-question" data-id="'+g.id+'" data-qid="'+q.id+'">'+I.edit+'</button><button class="rec-del danger" data-action="del-question" data-id="'+g.id+'" data-qid="'+q.id+'">'+I.x+'</button></div></div>'}
function summaryItemHTML(g,dk,text){return'<div class="q-item s-item"><span class="q-dot" style="background:'+g.color+'"></span><div class="q-body"><div class="q-meta" style="margin:0 0 5px">'+fmtMD(parseKey(dk))+'</div><div class="q-text">'+esc(text)+'</div></div><div class="q-acts"><button class="rec-del" data-action="edit-summary" data-id="'+g.id+'" data-date="'+dk+'">'+I.edit+'</button></div></div>'}
function foldBlockHTML(kind,label,itemsHTML,count,unit){if(!itemsHTML)return'';const foldCls=kind==='q'?'q-fold':(kind==='s'?'s-fold':'r-fold');return'<details class="fold-block '+foldCls+'"><summary><span class="fold-label">'+esc(label)+'</span><span class="fold-count">'+count+' '+unit+'</span></summary><div class="fold-content">'+itemsHTML+'</div></details>'}
function questionsHTML(g){const qs=(g.questions||[]).slice().sort((a,b)=>{if(a.date!==b.date)return a.date<b.date?1:-1;return(b.createdAt||0)-(a.createdAt||0)});if(!qs.length)return'';const openCount=qs.filter(q=>!q.resolved).length;const groups=groupByWeek(qs,q=>q.date);let html='<div class="q-list"><div class="rec-title"><span>疑问'+(openCount?' · '+openCount+' 个待解决':'')+'</span><span>'+qs.length+' 条</span></div>';for(const grp of groups){const sortedItems=grp.items.slice().sort((a,b)=>{if(a.resolved!==b.resolved)return a.resolved?1:-1;return(b.createdAt||0)-(a.createdAt||0)});const itemsHTML=sortedItems.map(q=>questionItemHTML(g,q)).join('');html+=foldBlockHTML('q',weekGroupLabel(grp.mon),itemsHTML,sortedItems.length,'条')}html+='</div>';return html}
function summariesHTML(g){const s=g.summaries||{};const keys=Object.keys(s).sort().reverse();if(!keys.length)return'';const items=keys.map(k=>({date:k,text:s[k]}));const groups=groupByWeek(items,it=>it.date);let html='<div class="q-list"><div class="rec-title"><span>复述总结</span><span>'+keys.length+' 篇</span></div>';for(const grp of groups){const itemsHTML=grp.items.map(it=>summaryItemHTML(g,it.date,it.text)).join('');html+=foldBlockHTML('s',weekGroupLabel(grp.mon),itemsHTML,grp.items.length,'篇')}html+='</div>';return html}
function recItemHTML(g,r){const d=parseKey(r.date);const aSegs=(r.amountSegments&&r.amountSegments.length)?r.amountSegments:(r.amount>0?[{from:0,to:r.amount,amount:r.amount}]:[]);let amtHTML='<span>'+num(r.amount)+' '+esc(g.unit)+'</span>';if(aSegs.length){const froms=aSegs.map(s=>Number(s.from)).filter(v=>!isNaN(v));const tos=aSegs.map(s=>Number(s.to)).filter(v=>!isNaN(v));if(froms.length&&tos.length){const minFrom=Math.min.apply(null,froms);const maxTo=Math.max.apply(null,tos);amtHTML='<span>'+num(minFrom)+'</span><span class="rec-arrow">→</span><span>'+num(maxTo)+'</span><span class="rec-plus">+'+num(r.amount)+' '+esc(g.unit)+'</span>'}}const tSegs=r.segments||[];let metaHTML='';if(tSegs.length){const firstStart=tSegs[0].start;const lastEnd=tSegs[tSegs.length-1].end;const parts=[];parts.push('<span class="rec-time">'+esc(firstStart)+'–'+esc(lastEnd)+'</span>');if(r.minutes!=null)parts.push('<span>'+num(r.minutes)+' 分钟</span>');if(tSegs.length>1)parts.push('<span>'+tSegs.length+' 段</span>');metaHTML=parts.join('<span class="rec-dot">·</span>')}else if(r.minutes!=null){metaHTML='<span>'+num(r.minutes)+' 分钟</span>'}return'<div class="rec"><span class="rec-date">'+fmtMDs(d)+'</span><div class="rec-main"><div class="rec-amt">'+amtHTML+(r.backfill?'<span class="rec-tag">补</span>':'')+'</div>'+(metaHTML?'<div class="rec-meta">'+metaHTML+'</div>':'')+'</div><div class="rec-acts"><button class="rec-del" data-action="edit-rec" data-id="'+g.id+'" data-rec="'+r.id+'">'+I.edit+'</button><button class="rec-del danger" data-action="del-rec" data-id="'+g.id+'" data-rec="'+r.id+'">'+I.x+'</button></div></div>'}
function recentRecordsHTML(g,recs){if(!recs.length)return'<div style="color:#b6bacb;font-size:12.5px;padding:6px 0">还没有记录</div>';const groups=groupByWeek(recs,r=>r.date);return groups.map(grp=>{const sortedItems=grp.items.slice().sort((a,b)=>{if(a.date!==b.date)return a.date<b.date?1:-1;return(b.createdAt||0)-(a.createdAt||0)});const itemsHTML=sortedItems.map(r=>recItemHTML(g,r)).join('');return foldBlockHTML('r',weekGroupLabel(grp.mon),itemsHTML,sortedItems.length,'条')}).join('')}
function boardGoalHTML(g){const st=computeStats(g);const recs=g.records.slice().sort((a,b)=>{if(a.date!==b.date)return a.date<b.date?1:-1;return(b.createdAt||0)-(a.createdAt||0)});let etaText='暂无推算';if(st.isDone)etaText='已完成';else if(st.forecast&&st.forecast.eta){const f=st.forecast;etaText=fmtMDs(f.eta)+(f.delta<0?'（提前'+(-f.delta)+'天）':f.delta>0?'（拖后'+f.delta+'天）':'（卡点）')}return'<article class="card"><div class="bg-head"><span class="gc-dot" style="--gc:'+g.color+';background:'+g.color+'"></span><h3>'+esc(g.name)+'</h3>'+(g.category?catChipHTML(g.category):'')+'<span class="tag">'+num(g.total)+' '+esc(g.unit)+'</span></div><div class="bg-body"><div>'+ringSVG(st.rate,g.color)+'</div><div class="bg-stats"><div><b>'+num(st.doneAmount)+'</b><span>已完成 '+esc(g.unit)+'</span></div><div><b>'+num(st.remaining)+'</b><span>剩余 '+esc(g.unit)+'</span></div><div><b>'+st.streak+' 天</b><span>连续打卡</span></div><div><b style="font-size:13px">'+etaText+'</b><span>预计完成日</span></div></div></div>'+questionsHTML(g)+summariesHTML(g)+'<div class="rec-list"><div class="rec-title"><span>最近记录</span><span>'+g.records.length+' 条总计</span></div>'+recentRecordsHTML(g,recs)+'</div></article>'}
function niceCeil(v){if(v<=10)return 10;const mag=Math.pow(10,Math.floor(Math.log10(v)));const n=v/mag;const nice=n<=1?1:n<=2?2:n<=2.5?2.5:n<=5?5:10;return nice*mag}
function drawChart(){const svg=document.getElementById('minChart');if(!svg)return;const W=720,H=290;const padL=48,padR=14,padT=16,padB=62;const plotW=W-padL-padR,plotH=H-padT-padB;const today=new Date();const days=[];for(let i=13;i>=0;i--)days.push(addDays(today,-i));const visibleGoals=state.goals.filter(matchFilter);const data=days.map(d=>{const k=toKey(d);const segs=visibleGoals.map(g=>{const mins=g.records.filter(r=>r.date===k&&r.minutes!=null&&r.minutes!=='').reduce((s,r)=>s+(Number(r.minutes)||0),0);return{color:g.color,value:mins}}).filter(s=>s.value>0);return{k,date:d,segs,total:segs.reduce((s,x)=>s+x.value,0)}});const maxTotal=Math.max(1,...data.map(d=>d.total));const niceMax=niceCeil(maxTotal);let out='';const steps=4;for(let i=0;i<=steps;i++){const v=niceMax*i/steps;const y=padT+plotH-(v/niceMax)*plotH;out+='<line x1="'+padL+'" y1="'+y.toFixed(1)+'" x2="'+(W-padR)+'" y2="'+y.toFixed(1)+'" stroke="#eef0f7" stroke-width="1"/>';out+='<text x="'+(padL-9)+'" y="'+(y+4).toFixed(1)+'" text-anchor="end" font-size="11" fill="#9aa0b4">'+Math.round(v)+'</text>'}const bw=plotW/14;const barW=Math.min(32,bw*0.62);data.forEach((d,i)=>{const cx=padL+bw*i+bw/2;let y=padT+plotH;for(const s of d.segs){const hgt=(s.value/niceMax)*plotH;y-=hgt;out+='<rect x="'+(cx-barW/2).toFixed(1)+'" y="'+y.toFixed(1)+'" width="'+barW.toFixed(1)+'" height="'+Math.max(hgt,0.5).toFixed(1)+'" fill="'+s.color+'" rx="3"/>'}if(i%2===0||i===13){const dow=d.date.getDay();const isSat=dow===6;const isSun=dow===0;const holiday=CN_HOLIDAYS[d.k]||'';let wkColor='#9aa0b4';if(holiday)wkColor='#dc2626';else if(isSun)wkColor='#dc2626';else if(isSat)wkColor='#d97706';const wkText='周'+WD[dow];out+='<text x="'+cx.toFixed(1)+'" y="'+(padT+plotH+15)+'" text-anchor="middle" font-size="10" fill="#9aa0b4">'+fmtMDs(d.date)+'</text>';out+='<text x="'+cx.toFixed(1)+'" y="'+(padT+plotH+30)+'" text-anchor="middle" font-size="9.5" font-weight="600" fill="'+wkColor+'">'+(holiday?'<title>'+esc(holiday)+'</title>':'')+wkText+'</text>'}});if(!data.some(d=>d.total>0)){out+='<text x="'+(W/2)+'" y="'+(padT+plotH/2)+'" text-anchor="middle" font-size="13" fill="#c3c7d6">还没有填过时间段的记录</text>'}svg.innerHTML=out}
function weekNotesKey(monday){return toKey(monday)}
function dayStripHTML(mon){const today=new Date();const todayK=toKey(today);const cells=[];for(let i=0;i<7;i++){const d=addDays(mon,i);const k=toKey(d);const dow=d.getDay();const isSat=dow===6;const isSun=dow===0;const holiday=CN_HOLIDAYS[k]||'';const isHoliday=!!holiday;const isRest=isSat||isSun||isHoliday;const isToday=k===todayK;const recs=state.goals.flatMap(g=>g.records.filter(r=>r.date===k));const min=recs.reduce((s,r)=>s+(Number(r.minutes)||0),0);const has=recs.length>0;let cls='day-cell';if(has)cls+=' has';if(isToday)cls+=' today';if(isSat)cls+=' sat';if(isSun)cls+=' sun';if(isHoliday)cls+=' holiday';let badgeHTML='';if(isHoliday)badgeHTML='<div class="dc-badge holiday" title="'+esc(holiday)+'">休 · '+esc(holiday)+'</div>';else if(isRest)badgeHTML='<div class="dc-badge">休</div>';else badgeHTML='<div class="dc-badge-empty"></div>';const v=has?(min>0?min+'′':recs.length+'次'):'—';cells.push('<div class="'+cls+'"><div class="dc-date">'+(d.getMonth()+1)+'/'+d.getDate()+'</div><div class="dc-d">周'+WD[dow]+'</div>'+badgeHTML+'<div class="dc-v">'+v+'</div></div>')}return'<div class="day-strip">'+cells.join('')+'</div>'}
function weeklyHTML(){const today=new Date();const thisMon=startOfWeek(today);const mon=addDays(thisMon,weekOffset*7);const sun=addDays(mon,6);const prevMon=addDays(mon,-7);const inRange=(g,s,e)=>g.records.filter(r=>{const d=parseKey(r.date);return dayIndex(d)>=dayIndex(s)&&dayIndex(d)<=dayIndex(e)});const isThisWeek=weekOffset===0;const label=isThisWeek?'本周':(weekOffset===-1?'上周':Math.abs(weekOffset)+' 周前');let totalCount=0,totalMin=0,prevCount=0,prevMin=0;const daysWith=new Set();const perGoal=[];for(const g of state.goals){const cur=inRange(g,mon,sun);const prev=inRange(g,prevMon,addDays(prevMon,6));const amt=cur.reduce((s,r)=>s+(Number(r.amount)||0),0);const pAmt=prev.reduce((s,r)=>s+(Number(r.amount)||0),0);const min=cur.reduce((s,r)=>s+(Number(r.minutes)||0),0);const pMin=prev.reduce((s,r)=>s+(Number(r.minutes)||0),0);const dset=new Set(cur.map(r=>r.date));totalCount+=cur.length;totalMin+=min;prevCount+=prev.length;prevMin+=pMin;cur.forEach(r=>daysWith.add(r.date));perGoal.push({g,amt,pAmt,min,pMin,days:dset.size})}const pctDelta=(cur,prev)=>{if(prev===0&&cur===0)return'<em class="flat">持平</em>';if(prev===0)return'<em class="up">新增</em>';const d=cur-prev;if(d===0)return'<em class="flat">持平</em>';return'<em class="'+(d>0?'up':'down')+'">'+(d>0?'+':'')+num(d)+'</em>'};let html='<div class="page-head"><div><h1>周报</h1><p class="sub">周一到周日汇总 · 与上周同口径对比</p></div></div>';html+='<div class="card" style="margin-bottom:16px"><div class="week-nav"><button data-action="prev-week">'+I.left+'</button><div class="wn-label">'+fmtMD(mon)+' — '+fmtMD(sun)+'<small>'+label+'</small></div><button data-action="next-week"'+(weekOffset>=0?' disabled':'')+'>'+I.right+'</button></div><div class="wk-grid"><div class="wk-stat"><b>'+totalCount+'</b><span>打卡次数</span>'+pctDelta(totalCount,prevCount)+'</div><div class="wk-stat"><b>'+totalMin+'</b><span>投入分钟</span>'+pctDelta(totalMin,prevMin)+'</div><div class="wk-stat"><b>'+daysWith.size+'</b><span>打卡天数</span><em class="flat">/ 7 天</em></div></div><table class="wk-table"><thead><tr><th>目标</th><th>投入量</th><th>打卡天数</th><th>分钟</th></tr></thead><tbody>'+(perGoal.length?perGoal.map(p=>'<tr><td>'+esc(p.g.name)+(p.g.category?' <span class="cat-chip" style="margin-left:4px;font-size:10px;padding:1.5px 6px;background:'+catColor(p.g.category).bg+';color:'+catColor(p.g.category).fg+'">'+esc(p.g.category)+'</span>':'')+'</td><td>'+num(p.amt)+' '+esc(p.g.unit)+' '+pctDelta(p.amt,p.pAmt)+'</td><td>'+p.days+' 天</td><td>'+p.min+' '+pctDelta(p.min,p.pMin)+'</td></tr>').join(''):'<tr><td colspan="4" style="color:#b6bacb;padding:16px 6px">这一周还没有记录</td></tr>')+'</tbody></table>'+dayStripHTML(mon)+'</div>';const wkKey=weekNotesKey(mon);const notes=state.weekNotes[wkKey]||{};html+='<div class="card" style="margin-bottom:16px"><h2 class="card-title" style="margin-bottom:12px">本周复盘</h2><div class="note-grid">'+noteField(wkKey,'keep','保持',notes.keep,'这周什么做法是有效的？')+noteField(wkKey,'problem','问题',notes.problem,'哪里卡住了？')+noteField(wkKey,'try','尝试',notes.try,'下周想试一个什么小改动？')+noteField(wkKey,'next','下周预案',notes.next,'如果障碍又出现，我打算怎么做？')+'</div></div>';html+='<div class="card"><div style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:12px"><h2 class="card-title" style="margin:0">一键生成周报文本</h2><button class="btn primary" data-action="gen-report">'+I.plan+'生成</button></div><textarea class="report-out" id="reportOut" placeholder="点「生成」后，这里会出现可复制的周报文本。"></textarea><div style="display:flex;gap:10px;margin-top:10px"><button class="btn" data-action="copy-report" style="flex:1">复制文本</button></div></div>';return html}
function noteField(wkKey,key,label,val,ph){return'<div class="note-field"><label>'+label+'</label><textarea placeholder="'+esc(ph)+'" data-note="'+key+'" data-week="'+wkKey+'">'+esc(val||'')+'</textarea></div>'}
function buildWeeklyText(){/* 保持原有实现 */return''}
function meHTML(){const n=totalRecordCount();let html='<div class="page-head"><div><h1>我的</h1><p class="sub">云端存储 · 多设备同步</p></div></div>';html+='<div class="card" style="margin-bottom:16px"><div style="display:flex;align-items:center;gap:10px;margin-bottom:6px"><span style="width:30px;height:30px;border-radius:9px;background:#ecfdf5;color:#059669;display:flex;align-items:center;justify-content:center;flex:0 0 auto">'+I.cloud+'</span><h2 class="card-title" style="margin:0">云端同步状态</h2></div><p class="card-sub">数据存储在 Deno KV，任何设备访问此网址即可看到相同数据。</p><div id="syncStatus"><div class="sync-status ok"><span class="dot"></span><span>已启用云端存储，数据自动同步</span></div></div></div>';html+='<div class="me-list" style="margin-bottom:18px">'+meItem('download','','导出 JSON 备份','把全部目标和 '+n+' 条记录保存成一个文件','export')+meItem('upload','','导入 JSON','从本地备份文件恢复（会覆盖云端数据）','import')+meItem('broom','','清空全部数据','移除全部目标与记录','clear-all')+'</div>';html+='<div class="card" style="margin-bottom:16px"><div style="display:flex;align-items:center;gap:10px;margin-bottom:6px"><span style="width:30px;height:30px;border-radius:9px;background:#f5f3ff;color:#7c3aed;display:flex;align-items:center;justify-content:center;flex:0 0 auto">'+I.brain+'</span><h2 class="card-title" style="margin:0">使用说明</h2></div><ol class="steps"><li>所有数据自动保存到 Deno KV 云端。</li><li>电脑、手机、平板访问同一网址即可查看和修改。</li><li>任何一端的改动会立即同步到其他端。</li><li>如需本地备份，可点「导出 JSON 备份」。</li></ol></div>';html+='<div class="hint-foot">数据存储在 Deno KV，由 Deno Deploy 托管。<br>请勿在公用设备上导入敏感数据。</div>';return html}
function meItem(icon,cls,title,desc,action){return'<div class="me-item"><span class="mi-ico '+(cls||'')+'">'+I[icon]+'</span><div class="mi-body"><div class="mi-title">'+title+'</div><div class="mi-desc">'+desc+'</div></div><button class="btn" data-action="'+action+'">执行</button></div>'}
document.addEventListener('click',e=>{const navBtn=e.target.closest('[data-tab]');if(navBtn){tab=navBtn.dataset.tab;if(tab!=='weekly')weekOffset=0;render();window.scrollTo(0,0);return}const filterBtn=e.target.closest('[data-filter]');if(filterBtn){filterCat=filterBtn.dataset.filter;render();window.scrollTo(0,0);return}const catBtn=e.target.closest('[data-cat-pick]');if(catBtn){const inp=document.getElementById('f-category');if(inp){inp.value=catBtn.dataset.catPick;inp.focus()}return}const el=e.target.closest('[data-action]');if(!el)return;const action=el.dataset.action;const id=el.dataset.id;switch(action){case'new-goal':openGoalModal(null);break;case'edit':{const g=state.goals.find(x=>x.id===id);if(g)openGoalModal(g);break}case'delete':{const g=state.goals.find(x=>x.id===id);if(!g)break;if(confirm('确定要删除「'+g.name+'」吗？\n它的 '+g.records.length+' 条打卡记录也会一起删除。')){state.goals=state.goals.filter(x=>x.id!==id);save();render();toast('已删除')}break}case'checkin':doCheckin(id);break;case'del-rec':{const g=state.goals.find(x=>x.id===id);if(!g)break;if(confirm('删除这条打卡记录？')){g.records=g.records.filter(r=>r.id!==el.dataset.rec);save();render();toast('已删除记录')}break}case'edit-rec':openRecordModal(id,el.dataset.rec);break;case'save-rec':saveRecordEdit(el);break;case'as-add':{const box=el.closest('.amount-seg-box');if(!box)break;const row=addAmtRowToBox(box);if(row)setTimeout(()=>{const t=row.querySelector('.as-from');if(t)t.focus()},40);break}case'as-del':{const row=el.closest('.as-row');if(row)delAmtRow(row);break}case'ts-add':{const box=el.closest('.time-seg-box');if(!box)break;const row=addSegRowToBox(box);if(row)setTimeout(()=>{const t=row.querySelector('.ts-end')||row.querySelector('.ts-start');if(t)t.focus()},40);break}case'ts-del':{const row=el.closest('.ts-row');if(row)delSegRow(row);break}case'review-done':{const g=state.goals.find(x=>x.id===id);if(!g)break;const dk=el.dataset.date;const off=Number(el.dataset.off);if(!g.reviews)g.reviews={};if(!g.reviews[dk])g.reviews[dk]=[];if(g.reviews[dk].indexOf(off)===-1)g.reviews[dk].push(off);save();render();toast('已复习 · 第 '+(REVIEW_LABEL[off]||off)+' 节点');break}case'toggle-sum':el.classList.toggle('expanded');break;case'add-question':openQuestionModal(id,null);break;case'edit-question':openQuestionModal(id,el.dataset.qid);break;case'del-question':{const g=state.goals.find(x=>x.id===id);if(!g)break;if(!confirm('删除这条疑问？'))break;g.questions=(g.questions||[]).filter(q=>q.id!==el.dataset.qid);save();render();toast('已删除');break}case'save-question':saveQuestion(el);break;case'add-summary':openSummaryModal(id,null);break;case'edit-summary':openSummaryModal(id,el.dataset.date);break;case'save-summary':saveSummary(id);break;case'del-summary':delSummary(el.dataset.id,el.dataset.date);break;case'prev-week':weekOffset--;render();break;case'next-week':if(weekOffset<0){weekOffset++;render()}break;case'gen-report':{const out=document.getElementById('reportOut');if(out){out.value=buildWeeklyText();out.scrollIntoView({behavior:'smooth',block:'center'})}break}case'copy-report':{const out=document.getElementById('reportOut');if(!out||!out.value.trim()){toast('请先生成周报');break}copyText(out.value);break}case'export':doExport();break;case'import':doImport();break;case'clear-all':{const v=prompt('这会删除全部数据，且无法恢复。\n请输入「清空」两个字确认：');if(v==='清空'){state={version:2,goals:[],weekNotes:{}};save();render();toast('全部数据已清空')}else if(v!==null){toast('输入不匹配，已取消')}break}case'modal-cancel':closeModal();break;case'modal-save':saveGoalModal();break;case'modal-color':{document.querySelectorAll('.color-swatch').forEach(s=>s.classList.remove('on'));el.classList.add('on');break}}});
document.addEventListener('input',e=>{const t=e.target;if(t.classList.contains('as-from')||t.classList.contains('as-to')){const card=t.closest('.goal-card');if(card){const box=card.querySelector('.amount-seg-box');const g=state.goals.find(x=>x.id===card.dataset.id);refreshAmtBox(box,g?g.unit:'个');if(g){syncAmtUI(card.dataset.id,card);refreshGoalProgress(card)}}return}if(t.classList.contains('ts-start')||t.classList.contains('ts-end')){const box=t.closest('.time-seg-box');if(box){refreshSegBox(box);const card=box.closest('.goal-card');if(card&&card.dataset.id)syncSegUI(card.dataset.id,card)}return}if(t.closest('.modal')&&(t.classList.contains('as-from')||t.classList.contains('as-to'))){const box=t.closest('.amount-seg-box');if(box)refreshAmtBox(box,box.dataset.unit||'个');return}if(t.closest('.modal')&&(t.classList.contains('ts-start')||t.classList.contains('ts-end'))){const box=t.closest('.time-seg-box');if(box)refreshSegBox(box);return}if(t.dataset.note){const wk=t.dataset.week;if(!state.weekNotes[wk])state.weekNotes[wk]={};state.weekNotes[wk][t.dataset.note]=t.value;save();return}});
document.addEventListener('change',e=>{const t=e.target;if(t.dataset.role==='date'){const u=getUI(t.dataset.id);u.date=t.value;return}if(t.classList.contains('ts-start')||t.classList.contains('ts-end')){const box=t.closest('.time-seg-box');if(box){refreshSegBox(box);const card=box.closest('.goal-card');if(card&&card.dataset.id)syncSegUI(card.dataset.id,card)}return}if(t.classList.contains('as-from')||t.classList.contains('as-to')){const box=t.closest('.amount-seg-box');if(box){refreshAmtBox(box,box.dataset.unit||'个');const card=box.closest('.goal-card');if(card){const g=state.goals.find(x=>x.id===card.dataset.id);if(g){syncAmtUI(card.dataset.id,card);refreshGoalProgress(card)}}}return}if(t.id==='s-date'){const btn=document.querySelector('[data-action="save-summary"]');if(!btn)return;const g=state.goals.find(x=>x.id===btn.dataset.id);const ta=document.getElementById('s-text');if(g&&ta)ta.value=(g.summaries&&g.summaries[t.value])||''}});
function doCheckin(id){const g=state.goals.find(x=>x.id===id);if(!g)return;const card=document.querySelector('.goal-card[data-id="'+id+'"]');if(!card)return;const amtBox=card.querySelector('.amount-seg-box');const amtSegs=calcAmtSegs(readAmtRowsFrom(amtBox));if(!amtSegs.length){toast('请填写「从多少」到「多少」');const first=amtBox&&amtBox.querySelector('.as-from');if(first)first.focus();return}const amount=amtSegs.reduce((a,b)=>a+b.amount,0);let minutes=null,segments=[];const tsBox=card.querySelector('.time-seg-box');if(tsBox){const ts=calcSegs(readSegRowsFrom(tsBox));if(ts.length){minutes=ts.reduce((a,b)=>a+b.minutes,0);segments=ts}}const dateEl=card.querySelector('[data-role="date"]');const date=dateEl?dateEl.value:todayKey();const backfill=date!==todayKey();const before=g.records.reduce((s,r)=>s+(Number(r.amount)||0),0);g.records.push({id:uid(),date,amount,amountSegments:amtSegs,minutes,segments,backfill,createdAt:Date.now()});const after=before+amount;const total=Number(g.total)||0;const u=getUI(id);u.date=todayKey();u.amtSegs=[];u.segments=[];save();render();const minStr=(minutes&&minutes>0)?' · '+minutes+' 分钟':'';if(before<total&&after>=total){fireConfetti();toast('目标达成！本次 +'+num(amount)+minStr)}else if(backfill){toast('已补记 '+fmtMD(parseKey(date))+' +'+num(amount)+minStr)}else if(!g.summaries||!g.summaries[todayKey()]){toast('打卡 +'+num(amount)+minStr+' · 记得合上书复述一下')}else{toast('打卡成功 +'+num(amount)+minStr)}}
function openRecordModal(goalId,recId){const g=state.goals.find(x=>x.id===goalId);if(!g)return;const rec=g.records.find(r=>r.id===recId);if(!rec)return;const aSegs=(rec.amountSegments&&rec.amountSegments.length)?rec.amountSegments:(rec.amount>0?[{from:0,to:rec.amount}]:[{from:'',to:''}]);const amtRows=aSegs.map(s=>'<div class="as-row">'+amtRowHTML(s.from,s.to,g.unit)+'</div>').join('');const tSegs=(rec.segments&&rec.segments.length)?rec.segments:[{start:'',end:''}];const tsRows=tSegs.map(s=>'<div class="ts-row">'+tsRowHTML(s.start,s.end)+'</div>').join('');const html='<div class="modal-backdrop" data-backdrop><div class="modal" role="dialog" aria-modal="true"><h2>编辑打卡记录</h2><div class="modal-hint" style="background:#f5f3ff;color:#6d28d9;font-weight:600">目标：'+esc(g.name)+'</div><div class="modal-hint">可以修改日期、数量和每一段时间。</div><div class="field"><label>日期</label><select class="inp" id="r-date">'+dateOptionsHTML(rec.date)+'</select></div><div class="field"><label>投入时间（选填）</label><div class="time-seg-box"><div class="ts-head"><span class="ts-lbl">'+I.clock+'开始 — 结束</span><span class="ts-total empty" data-total>未填写</span></div><div class="ts-list">'+tsRows+'</div><button type="button" class="ts-add" data-action="ts-add">'+I.plus+'添加时间段</button></div></div><div class="field"><label>数量（'+esc(g.unit)+'）</label><div class="amount-seg-box" data-unit="'+esc(g.unit)+'"><div class="as-head"><span class="as-lbl">'+I.target+'从多少到多少</span><span class="as-total empty" data-amt-total>未填写</span></div><div class="as-list">'+amtRows+'</div><button type="button" class="as-add" data-action="as-add">'+I.plus+'添加一段</button></div></div><div class="modal-actions"><button class="btn" data-action="modal-cancel">取消</button><button class="btn primary" data-action="save-rec" data-id="'+goalId+'" data-rec="'+recId+'">保存</button></div></div></div>';document.getElementById('modalRoot').innerHTML=html;bindBackdrop();const ab=document.querySelector('.modal .amount-seg-box');if(ab)refreshAmtBox(ab,g.unit);const tb=document.querySelector('.modal .time-seg-box');if(tb)refreshSegBox(tb);setTimeout(()=>{const a=document.querySelector('.modal .as-from');if(a)a.focus()},60)}
function saveRecordEdit(el){const goalId=el.dataset.id;const recId=el.dataset.rec;const g=state.goals.find(x=>x.id===goalId);if(!g)return;const rec=g.records.find(r=>r.id===recId);if(!rec)return;const dEl=document.getElementById('r-date');const date=dEl?dEl.value:rec.date;if(!date){toast('请选择日期');return}const amtBox=document.querySelector('.modal .amount-seg-box');const amtSegs=calcAmtSegs(readAmtRowsFrom(amtBox));if(!amtSegs.length){toast('请填写「从多少」到「多少」');return}const amount=amtSegs.reduce((a,b)=>a+b.amount,0);let segments=[],minutes=null;const tsBox=document.querySelector('.modal .time-seg-box');if(tsBox){const ts=calcSegs(readSegRowsFrom(tsBox));if(ts.length){segments=ts;minutes=ts.reduce((a,b)=>a+b.minutes,0)}}rec.date=date;rec.amount=amount;rec.amountSegments=amtSegs;rec.segments=segments;rec.minutes=minutes;rec.backfill=date!==todayKey();closeModal();save();render();toast('记录已更新')}
let modalState={color:PALETTE[0],editingId:null};
function bindBackdrop(){const bd=document.querySelector('[data-backdrop]');if(bd)bd.addEventListener('click',ev=>{if(ev.target===ev.currentTarget)closeModal()})}
function openGoalModal(goal){modalState={color:goal?goal.color:PALETTE[0],editingId:goal?goal.id:null};const g=goal||{name:'',unit:'个',total:100,deadline:toKey(addDays(new Date(),30)),category:'',obstacle:'',plan:''};const existCats=getAllCategories();const quickCats=[];const pushUnique=c=>{if(c&&quickCats.indexOf(c)===-1)quickCats.push(c)};PRESET_CATS.forEach(pushUnique);existCats.forEach(pushUnique);const quickHTML=quickCats.map(c=>'<button type="button" data-cat-pick="'+esc(c)+'">'+esc(c)+'</button>').join('');const html='<div class="modal-backdrop" data-backdrop><div class="modal" role="dialog" aria-modal="true"><h2>'+(goal?'编辑目标':'新建目标')+'</h2><div class="field"><label>目标名称</label><input class="inp" id="f-name" placeholder="例如：背完 2000 个单词" value="'+esc(g.name)+'"></div><div class="row2"><div class="field"><label>单位</label><input class="inp" id="f-unit" placeholder="个 / 页 / 节" value="'+esc(g.unit)+'"></div><div class="field"><label>总量</label><input class="inp" id="f-total" type="number" inputmode="decimal" min="1" step="any" value="'+esc(g.total)+'"></div></div><div class="field"><label>截止日</label><input class="inp" id="f-deadline" type="date" value="'+esc(g.deadline)+'"></div><div class="field"><label>分类标签（选填）</label><input class="inp" id="f-category" placeholder="例如：健康 / 专业 / 阅读" value="'+esc(g.category||'')+'"><div class="cat-pick">'+quickHTML+'</div></div><div class="field"><label>配色</label><div class="color-row">'+PALETTE.map(c=>'<button type="button" class="color-swatch'+(c===modalState.color?' on':'')+'" data-action="modal-color" data-c="'+c+'" style="background:'+c+'"></button>').join('')+'</div></div><div class="field"><label>最容易拦住我的障碍（选填）</label><input class="inp" id="f-obstacle" placeholder="例如：晚上一躺下就刷手机" value="'+esc(g.obstacle||'')+'"></div><div class="field"><label>如果它出现，我就……（选填）</label><textarea id="f-plan" placeholder="例如：如果到 22:30 还没开始，我就只背 20 个也算完成">'+esc(g.plan||'')+'</textarea></div><div class="modal-actions"><button class="btn" data-action="modal-cancel">取消</button><button class="btn primary" data-action="modal-save">'+(goal?'保存修改':'创建目标')+'</button></div></div></div>';document.getElementById('modalRoot').innerHTML=html;bindBackdrop();setTimeout(()=>{const n=document.getElementById('f-name');if(n&&!goal)n.focus()},60)}
document.addEventListener('click',e=>{const sw=e.target.closest('.color-swatch');if(sw)modalState.color=sw.dataset.c},true);
function closeModal(){document.getElementById('modalRoot').innerHTML=''}
function saveGoalModal(){const name=(document.getElementById('f-name').value||'').trim();const unit=(document.getElementById('f-unit').value||'').trim()||'个';const total=Number(document.getElementById('f-total').value);const deadline=document.getElementById('f-deadline').value;const category=(document.getElementById('f-category').value||'').trim();const obstacle=(document.getElementById('f-obstacle').value||'').trim();const plan=(document.getElementById('f-plan').value||'').trim();if(!name){toast('请填写目标名称');return}if(!total||total<=0){toast('总量需要大于 0');return}if(!deadline){toast('请选择截止日');return}if(modalState.editingId){const g=state.goals.find(x=>x.id===modalState.editingId);if(g){g.name=name;g.unit=unit;g.total=total;g.deadline=deadline;g.color=modalState.color;g.category=category;g.obstacle=obstacle;g.plan=plan}toast('已保存')}else{state.goals.push({id:uid(),name,unit,total,deadline,color:modalState.color,category,obstacle,plan,createdAt:todayKey(),questions:[],summaries:{},reviews:{},records:[]});toast('目标已创建')}closeModal();save();render()}
function openQuestionModal(goalId,qid){const g=state.goals.find(x=>x.id===goalId);if(!g)return;const q=qid?(g.questions||[]).find(x=>x.id===qid):null;const html='<div class="modal-backdrop" data-backdrop><div class="modal" role="dialog" aria-modal="true"><h2>'+(q?'编辑疑问':'记下疑问')+'</h2>'+(q?'':'<div class="modal-hint">读到不懂的地方，先记下来，不要停下来死磕。</div>')+'<div class="field"><label>我的疑问</label><textarea id="q-text" style="min-height:86px" placeholder="例如：为什么作者说认知革命是偶然的？">'+esc(q?q.text:'')+'</textarea></div><div class="field"><label>我的解答（可以以后回来补）</label><textarea id="q-answer" placeholder="想通了就写在这里">'+esc(q?q.answer:'')+'</textarea></div>'+(q?'<div class="field"><label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-size:13.5px;color:#4b5163"><input type="checkbox" id="q-resolved"'+(q.resolved?' checked':'')+' style="width:16px;height:16px;accent-color:#7c3aed"> 这个问题已经解决</label></div>':'')+'<div class="modal-actions"><button class="btn" data-action="modal-cancel">取消</button><button class="btn primary" data-action="save-question" data-id="'+goalId+'" data-qid="'+(qid||'')+'">保存</button></div></div></div>';document.getElementById('modalRoot').innerHTML=html;bindBackdrop();setTimeout(()=>{const t=document.getElementById('q-text');if(t&&!q)t.focus()},60)}
function saveQuestion(el){const goalId=el.dataset.id;const qid=el.dataset.qid;const g=state.goals.find(x=>x.id===goalId);if(!g)return;const tEl=document.getElementById('q-text');const aEl=document.getElementById('q-answer');const rEl=document.getElementById('q-resolved');const text=(tEl?tEl.value:'').trim();const answer=(aEl?aEl.value:'').trim();if(!text){toast('请先写下疑问');if(tEl)tEl.focus();return}if(!g.questions)g.questions=[];if(qid){const q=g.questions.find(x=>x.id===qid);if(q){q.text=text;q.answer=answer;q.resolved=!!(rEl&&rEl.checked)}toast('疑问已更新')}else{g.questions.push({id:uid(),date:todayKey(),text,answer,resolved:false,createdAt:Date.now()});toast('疑问已记下')}closeModal();save();render()}
function openSummaryModal(goalId,date){const g=state.goals.find(x=>x.id===goalId);if(!g)return;const d=date||todayKey();const cur=(g.summaries&&g.summaries[d])||'';const isEditing=!!cur;const html='<div class="modal-backdrop" data-backdrop><div class="modal" role="dialog" aria-modal="true"><h2>'+(isEditing?'修改这篇复述':'合上书，用自己的话复述')+'</h2><div class="modal-hint">'+(isEditing?'可以改内容、切到别的日期；清空后保存会删除这一篇。':'不要翻书，凭记忆写下今天读到的核心内容。')+'</div><div class="field"><label>哪一天</label><select class="inp" id="s-date">'+dateOptionsHTML(d)+'</select></div><div class="field"><label>复述总结</label><textarea id="s-text" style="min-height:140px" placeholder="今天我读到……\n\n作者的核心观点是……\n\n我自己的理解是……">'+esc(cur)+'</textarea></div><div class="modal-actions">'+(isEditing?'<button class="btn danger" data-action="del-summary" data-id="'+goalId+'" data-date="'+d+'">删除这篇</button>':'')+'<button class="btn" data-action="modal-cancel">取消</button><button class="btn primary" data-action="save-summary" data-id="'+goalId+'">保存</button></div></div></div>';document.getElementById('modalRoot').innerHTML=html;bindBackdrop();setTimeout(()=>{const t=document.getElementById('s-text');if(t)t.focus()},60)}
function saveSummary(goalId){const g=state.goals.find(x=>x.id===goalId);if(!g)return;const dEl=document.getElementById('s-date');const tEl=document.getElementById('s-text');const dk=dEl?dEl.value:todayKey();const text=(tEl?tEl.value:'').trim();if(!g.summaries)g.summaries={};if(text)g.summaries[dk]=text;else delete g.summaries[dk];closeModal();save();render();toast(text?'复述已保存':'已清空这篇复述')}
function delSummary(goalId,date){const g=state.goals.find(x=>x.id===goalId);if(!g)return;if(!g.summaries||!g.summaries[date])return;if(!confirm('删除 '+fmtMD(parseKey(date))+' 这篇复述？'))return;delete g.summaries[date];closeModal();save();render();toast('已删除这篇复述')}
function doExport(){const data=JSON.stringify(state,null,2);const blob=new Blob([data],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');const d=new Date();a.href=url;a.download='个人提升备份-'+d.getFullYear()+pad2(d.getMonth()+1)+pad2(d.getDate())+'.json';document.body.appendChild(a);a.click();document.body.removeChild(a);setTimeout(()=>URL.revokeObjectURL(url),1000);toast('备份已导出')}
function doImport(){const input=document.createElement('input');input.type='file';input.accept='.json,application/json';input.onchange=()=>{const file=input.files&&input.files[0];if(!file)return;const reader=new FileReader();reader.onload=()=>{let parsed;try{parsed=JSON.parse(reader.result)}catch(err){toast('文件不是有效的 JSON');return}if(!parsed||!Array.isArray(parsed.goals)){toast('没有识别到可导入的目标');return}if(!confirm('导入会覆盖当前的全部数据，确定继续吗？\n（识别到 '+parsed.goals.length+' 个目标）'))return;state=parsed;filterCat='all';save();render();toast('导入成功')};reader.readAsText(file)};input.click()}
function copyText(text){if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(text).then(()=>toast('已复制到剪贴板')).catch(()=>fallbackCopy(text))}else{fallbackCopy(text)}}
function fallbackCopy(text){const ta=document.createElement('textarea');ta.value=text;ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();try{document.execCommand('copy');toast('已复制到剪贴板')}catch(e){toast('复制失败，请手动选择文本')}document.body.removeChild(ta)}
let toastTimer=null;function toast(msg){const el=document.getElementById('toast');el.textContent=msg;el.classList.add('on');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('on'),2100)}
function fireConfetti(){/* 保持原有彩带逻辑 */}
// ============================================
// 启动
// ============================================
(async function boot(){const ok=await loadFromCloud();if(!ok)return;render()})();
</script>
</body>
</html>`;

// ============================================
// 服务器逻辑
// ============================================
Deno.serve(async (request: Request) => {
  const url = new URL(request.url);

  // API 路由
  if (url.pathname === '/api/data') {
    // 处理 CORS 预检
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    if (request.method === 'GET') {
      // 从 Deno KV 读取数据
      const result = await kv.get(['personal-growth', 'data']);
      const data = result.value || { version: 2, goals: [], weekNotes: {} };
      return new Response(JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    if (request.method === 'POST') {
      try {
        const body = await request.json();
        // 写入 Deno KV
        await kv.set(['personal-growth', 'data'], body);
        return new Response(JSON.stringify({ ok: true }), {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      } catch (e) {
        return new Response(JSON.stringify({ ok: false, error: String(e) }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }
    }

    return new Response('Method Not Allowed', { status: 405 });
  }

  // 其他路径返回 HTML 页面
  return new Response(HTML, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
});