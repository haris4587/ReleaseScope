import unittest
import json
from gltest.direct import VMContext, deploy_contract, create_address

SHA='a'*40
UP='80960fa31918d7663c3f4c3ad61661cf0e80628f'
I={'id':'demo','repo':'haris4587/ReleaseScope','commit':SHA,'dependency':'httpx','version':'0.27.2','manifest_path':'fixtures/requirements.txt','usage_path':'fixtures/application.py','upstream':'encode/httpx'}
R={'id':'httpx028','integration_id':'demo','target_version':'0.28.0','doc_commit':UP,'doc_path':'CHANGELOG.md'}
D={'verdict':'BREAKING_CHANGE','reason':'The used proxies argument was removed.','migration':'Replace proxies with proxy.','affected_symbols':['httpx.Client(proxies=)'],'citations':[{'source':'manifest','quote':'httpx==0.27.2'},{'source':'usage','quote':'httpx.Client(proxies='},{'source':'release','quote':'The deprecated `proxies` argument has now been removed.'}]}

class ContractTests(unittest.TestCase):
 def setUp(self):
  self.vm=VMContext()
  self.vm.sender=create_address('owner')
  self.active=self.vm.activate(); self.active.__enter__()
  self.c=deploy_contract('contracts/releasescope.py',self.vm,sdk_version='v0.2.16')
 def tearDown(self):
  self.active.__exit__(None,None,None)
 def register(self):
  self.c.register_integration(json.dumps(I));self.c.submit_release(json.dumps(R))
 def mocks(self, decision=D):
  for name,body in [('requirements.txt','httpx==0.27.2'),('application.py','with httpx.Client(proxies="localhost") as client:'),('CHANGELOG.md','The deprecated `proxies` argument has now been removed.')]:
   self.vm.mock_web(name, {'status':200,'body':body})
  self.vm.mock_llm('.*', json.dumps(decision))
 def test_immutable_registration(self):
  self.register()
  with self.assertRaises(Exception):self.c.register_integration(json.dumps(I))
  self.assertEqual(json.loads(self.c.get_integration('demo'))['commit'],SHA)
 def test_rejects_mutable_commit_and_traversal(self):
  for fields in [{'commit':'main'},{'usage_path':'../secret'},{'repo':'https://localhost'},{'id':'<script>'}]:
   with self.assertRaises(Exception): self.c.register_integration(json.dumps(I|fields))
 def test_owner_permissions(self):
  self.c.register_integration(json.dumps(I)); self.vm.sender=create_address('attacker')
  with self.assertRaises(Exception):self.c.submit_release(json.dumps(R))
 def test_assessment_and_history(self):
  self.register();self.mocks()
  first=json.loads(self.c.assess_impact('httpx028'))
  self.assertEqual(first['decision']['verdict'],'BREAKING_CHANGE')
  self.assertEqual(len(first['decision']['evidence']),3)
  second=json.loads(self.c.challenge_assessment('httpx028','Review migration guidance',UP,'CHANGELOG.md'))
  self.assertEqual(second['previous_hash'],first['report_hash'])
  self.assertEqual(len(json.loads(self.c.get_report('httpx028'))),2)
  with self.assertRaises(Exception):self.c.assess_impact('httpx028')
  with self.assertRaises(Exception):self.c.challenge_assessment('httpx028','Review migration guidance',UP,'CHANGELOG.md')
 def test_fabricated_citation_fails_closed(self):
  self.register();self.mocks(D|{'citations':[{'source':'release','quote':'fabricated'}]})
  self.assertEqual(json.loads(self.c.assess_impact('httpx028'))['decision']['verdict'],'INCONCLUSIVE')
 def test_missing_evidence_fails_closed(self):
  self.register()
  self.assertEqual(json.loads(self.c.assess_impact('httpx028'))['decision']['verdict'],'INCONCLUSIVE')
 def test_challenge_before_assess(self):
  self.register()
  with self.assertRaises(Exception):self.c.challenge_assessment('httpx028','Please review',UP,'CHANGELOG.md')
 def test_all_supported_verdicts(self):
  for verdict in ['MIGRATION_NEEDED','NO_IMPACT','INCONCLUSIVE']:
   with self.subTest(verdict=verdict):
    self.vm.clear_mocks(); self.mocks(D|{'verdict':verdict})
    rid='release-'+verdict
    self.c.register_integration(json.dumps(I|{'id':rid}))
    self.c.submit_release(json.dumps(R|{'id':rid,'integration_id':rid}))
    self.assertEqual(json.loads(self.c.assess_impact(rid))['decision']['verdict'],verdict)
 def test_challenge_limit_and_initial_owner(self):
  self.register(); self.mocks()
  self.vm.sender=create_address('attacker')
  with self.assertRaises(Exception): self.c.assess_impact('httpx028')
  self.vm.sender=create_address('owner'); self.c.assess_impact('httpx028')
  self.vm.sender=create_address('attacker')
  for n in range(3): self.c.challenge_assessment('httpx028','Objection '+str(n),UP,'CHANGELOG.md')
  with self.assertRaises(Exception): self.c.challenge_assessment('httpx028','Fourth objection',UP,'CHANGELOG.md')
 def test_same_version_rejected(self):
  self.c.register_integration(json.dumps(I))
  with self.assertRaises(Exception):self.c.submit_release(json.dumps(R|{'target_version':'0.27.2'}))

if __name__=='__main__':unittest.main()
