export function transactionState(tx) {
  const status = String(tx?.statusName ?? tx?.status ?? '').toUpperCase();
  const leaders=tx?.consensus_data?.leader_receipt;
  const leader=Array.isArray(leaders)?leaders.at(-1):leaders;
  const execution = String(tx?.txExecutionResultName ?? tx?.tx_execution_result ?? tx?.execution_result ?? tx?.txExecutionResult ?? leader?.execution_result ?? '').toUpperCase();
  if (['CANCELED','CANCELLED','UNDETERMINED','LEADER_TIMEOUT','VALIDATORS_TIMEOUT'].includes(status)) return {phase:'failed',status,execution};
  if (['ACCEPTED','FINALIZED'].includes(status)) {
    if (!['FINISHED_WITH_RETURN','RETURN','SUCCESS'].includes(execution)) return {phase:'failed',status,execution};
    return {phase:status==='FINALIZED'?'success':'accepted',status,execution};
  }
  return {phase:'pending',status:status||'PENDING',execution};
}
export const isAddress = value => /^0x[a-fA-F0-9]{40}$/.test(value);
export const isHash = value => /^0x[a-fA-F0-9]{64}$/.test(value);
export function parseObject(text){ const value=JSON.parse(text); if(!value || Array.isArray(value)||typeof value!=='object')throw Error('Expected a JSON object');return value; }
export function safeURL(url){try{const u=new URL(url);return u.protocol==='https:'?u.href:null;}catch{return null;}}
