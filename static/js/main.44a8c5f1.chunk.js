(this.webpackJsonpapp=this.webpackJsonpapp||[]).push([[0],{1380:function(n,e,t){},1384:function(n,e,t){"use strict";t.r(e);var o=t(5),r=t.n(o),a=t(569),c=t.n(a),i=(t(585),t(311)),s=t.n(i),u=t(570),l=t(571),h=t(575),m=t(574),p=t.n(m),f=(t(1380),{yes:{x:[],y:[],name:"yes",orientation:"h",marker:{color:"#0000FF",width:1},type:"bar"},"-":{x:[],y:[],name:"unknown",orientation:"h",type:"bar",marker:{color:"#F4F4F4",width:1}},no:{x:[],y:[],name:"no",orientation:"h",type:"bar",marker:{color:"#FFB03B",width:1}}}),d={displayModeBar:!1,staticPlot:!0},y={title:"Endorsements",barmode:"stack",width:1024,height:768,yaxis:{automargin:!0}},v="https://raw.githubusercontent.com/nathanleiby/endorsements/main/endorsements.csv";function w(){return b.apply(this,arguments)}function b(){return(b=Object(u.a)(s.a.mark((function n(){return s.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.abrupt("return",new Promise((function(n,e){l.d3.csv(v,(function(t,o){t?e(t):n(o)}))})));case 1:case"end":return n.stop()}}),n)})))).apply(this,arguments)}var k=function(){var n=Object(h.a)({promiseFn:w}),e=n.data;n.error,e||(e=[]);var t=function(n){for(var e={},t=function(t){Object.keys(n[t]).forEach((function(o){if("Endorser"!==o){e[o]||(e[o]={},e[o].yes=0,e[o]["-"]=0,e[o].no=0);var r=n[t][o];e[o][r]++}}))},o=0;o<n.length;o++)t(o);return console.log({items:e}),Object.keys(e).sort().reverse().forEach((function(n){var t=e[n];Object.keys(t).forEach((function(e){var o=t[e];f[e].x.push(o),f[e].y.push(n)}))})),[f.no,f["-"],f.yes]}(e);return console.log({d:t}),r.a.createElement("div",{className:"App"},r.a.createElement(p.a,{data:t,layout:y,config:d}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(k,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(n){n.unregister()})).catch((function(n){console.error(n.message)}))},580:function(n,e,t){n.exports=t(1384)},585:function(n,e,t){},877:function(n,e){}},[[580,1,2]]]);
//# sourceMappingURL=main.44a8c5f1.chunk.js.map