import { createClient, createAccount } from 'genlayer-js';
import { studionet } from 'genlayer-js/chains';
import { transactionState, isAddress, isHash } from './lifecycle.js';
export const network = studionet;
export function connect(privateKey){
 if(privateKey && !/^0x[a-fA-F0-9]{64}$/.test(privateKey))throw Error('Enter the private key of a disposable Studio test account.');
 return createClient({chain:studionet,account:privateKey?createAccount(privateKey):createAccount()});
}
export const reader=createClient({chain:studionet});
export async function read(address,functionName,args=[]){return reader.readContract({address,functionName,args,transactionHashVariant:'latest-final'});}
export async function track(client,hash,onUpdate,{interval=5000,attempts=120}={}){
 if(!isHash(hash))throw Error('Invalid transaction hash');
 for(let n=0;n<attempts;n++){
  const tx=await client.getTransaction({hash});
  const state=transactionState(tx); onUpdate({...state,hash,receipt:tx});
  if(state.phase==='failed')throw Error(`Transaction failed: ${state.status} / ${state.execution||'execution not proven'}`);
  if(state.phase==='success')return tx;
  await new Promise(resolve=>setTimeout(resolve,interval));
 }
 throw Error('Tracking paused. Transaction may still be pending. Resume this hash; do not resubmit.');
}
