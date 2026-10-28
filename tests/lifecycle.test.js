import test from 'node:test';
import assert from 'node:assert/strict';
import {transactionState,isAddress,isHash,parseObject,safeURL} from '../src/lifecycle.js';
test('pending and accepted are not finalized success',()=>{assert.equal(transactionState({statusName:'PENDING'}).phase,'pending');assert.equal(transactionState({statusName:'ACCEPTED',txExecutionResultName:'FINISHED_WITH_RETURN'}).phase,'accepted');});
test('finalized transaction requires proven successful execution',()=>{assert.equal(transactionState({statusName:'FINALIZED',txExecutionResultName:'FINISHED_WITH_RETURN'}).phase,'success');assert.equal(transactionState({statusName:'FINALIZED',txExecutionResultName:'CONTRACT_ERROR'}).phase,'failed');assert.equal(transactionState({statusName:'FINALIZED'}).phase,'failed');});
test('cancelled transaction is terminal',()=>assert.equal(transactionState({statusName:'CANCELED'}).phase,'failed'));
test('validate address, hash and payload shape',()=>{assert.ok(isAddress('0x'+'a'.repeat(40)));assert.ok(!isAddress('0x123'));assert.ok(isHash('0x'+'b'.repeat(64)));assert.throws(()=>parseObject('[]'));assert.deepEqual(parseObject('{"id":"app"}'),{id:'app'});});
test('report links reject executable URL schemes',()=>{assert.equal(safeURL('javascript:alert(1)'),null);assert.equal(safeURL('https://github.com/x'),'https://github.com/x');});
test('hosted Studio receipts prove success through latest leader execution',()=>{assert.equal(transactionState({statusName:'FINALIZED',consensus_data:{leader_receipt:[{execution_result:'SUCCESS'}]}}).phase,'success');assert.equal(transactionState({statusName:'FINALIZED',consensus_data:{leader_receipt:[{execution_result:'SUCCESS'},{execution_result:'ERROR'}]}}).phase,'failed');});
