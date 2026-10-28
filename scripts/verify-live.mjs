import {readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {createClient} from 'genlayer-js';
import {studionet} from 'genlayer-js/chains';
import {transactionState} from '../src/lifecycle.js';
const config=JSON.parse(readFileSync(new URL('../public/deployment.json',import.meta.url)));
const evidence=JSON.parse(readFileSync(new URL('../docs/verified-transactions.json',import.meta.url)));
const client=createClient({chain:studionet});
assert.equal(config.chainId,studionet.id);
const source=readFileSync(new URL('../contracts/releasescope.py',import.meta.url),'utf8');
const codeUpdate=await client.getTransaction({hash:config.upgradeTransaction});
assert.equal(codeUpdate.statusName,'FINALIZED');
assert.equal(codeUpdate.data.new_code,source,'Studio recorded code must match checkout exactly');
assert.equal(createHash('sha256').update(source).digest('hex'),config.contractSourceSha256);
for(const [label,item] of Object.entries(evidence)){
 const tx=await client.getTransaction({hash:item.hash});
 const state=transactionState(tx);
 assert.equal(state.phase,item.expectedFailure?'failed':'success',label);
 assert.equal(state.status,'FINALIZED',label+' must be finalized');
 console.log(label,state.status,state.execution);
}
const raw=await client.readContract({address:config.contractAddress,functionName:'get_report',args:[config.demoReleaseId],transactionHashVariant:'latest-final'});
const history=JSON.parse(raw);
assert.ok(history.length>=2,'Reference assessment and challenge must exist');
assert.equal(history.at(-1).decision.verdict,'BREAKING_CHANGE');
for(const [index,entry]of history.entries()){
 assert.equal(entry.revision,index+1);
 assert.equal(entry.previous_hash,index?history[index-1].report_hash:'');
 for(const item of Object.values(entry.decision.evidence)){
  const response=await fetch(item.url);assert.ok(response.ok);const text=await response.text();
  assert.equal(createHash('sha256').update(text).digest('hex'),item.sha256);
 }
}
writeFileSync(new URL('../docs/live-report.json',import.meta.url),JSON.stringify(history,null,2)+'\n');
console.log('Verified live source, finalized transactions, report revisions and source fingerprints.');
