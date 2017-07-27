let should = require('chai').should(),
    expect = require('chai').expect,
    base64 = require("base-64"),
    submission = require('../index'),
    util = require('../util/util'),
    judge = submission.judge,
    fs = require('fs');

const TIMEOUT = 150000;

describe('#Test timed Submission', function () {
  it('Tests N^2 submissions', function (done) {
    const source = `#include <iostream> \n using namespace std; int main() { int n,i,j,temp; cin>>n; int a[n]; for(i=0;i<n;++i) cin>>a[i]; for(i=1;i<n;++i) { for(j=0;j<(n-i);++j) if(a[j]>a[j+1]) { temp=a[j]; a[j]=a[j+1]; a[j+1]=temp; } } for(i=0;i<n;++i) cout<<a[i]<<endl; return 0; }`;
     
    fs.readFile('/home/siddharth/Documents/cb-submission/assests/input0.txt',function(err, testcases){
    	fs.readFile('/home/siddharth/Documents/cb-submission/assests/output0.txt',function(err, expected) {
        	const test_count = 1
		testcases = String(testcases);
		expected = String(expected);
		console.log(base64.encode(testcases));
		judge("cpp", source, test_count, [testcases], [expected], true, (body) => {
      			util.assertResult(body, "success", ["timelimit"], [""])
      			done()
    		});
       })
    });
  }).timeout(TIMEOUT)

  it('Tests NlogN submissions', (done) => {
    const source = `#include <iostream>\n #include<algorithm>\n using namespace std; int main() { int n,i,j,temp; cin>>n; int a[n]; for(i=0;i<n;++i) cin>>a[i]; sort(a,a+n); for(i=0;i<n;++i) cout<<a[i]<<endl; return 0; }`;
    
    const test_count = 1
 fs.readFile('/home/siddharth/Documents/cb-submission/assests/input0.txt',function(err, testcases){
	 fs.readFile('/home/siddharth/Documents/cb-submission/assests/output0.txt',function(err, expected) {
		 testcases = String(testcases);
		 expected = String(expected);
    		 judge("cpp", source, test_count, [testcases],[expected], true, (body) => {
      			util.assertResult(body, "success", ["correct"], [expected])
      			done()
    		});
	})
	});
  }).timeout(TIMEOUT)
  });
