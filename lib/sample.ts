export type Sample = { id:string; sample_code:string; location:string; sample_type:string; weight_g:string; notes:string; created_at:string; photos:string[] }

const KEY='provenanceos-demo-samples'
export function loadSamples():Sample[]{ if(typeof window==='undefined') return []; try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch{return[]} }
export function saveSample(s:Sample){ const all=loadSamples(); localStorage.setItem(KEY,JSON.stringify([s,...all])); }
export function nextSampleCode(){ const year=new Date().getFullYear(); const all=loadSamples(); const n=all.length+1; return `AND-${String(n).padStart(6,'0')}` }
