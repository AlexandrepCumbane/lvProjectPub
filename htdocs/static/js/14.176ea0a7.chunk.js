(this["webpackJsonpvuexy-react-admin-dashboard"]=this["webpackJsonpvuexy-react-admin-dashboard"]||[]).push([[14],{651:function(e,t,a){"use strict";a.r(t);var n,r,l=a(14),s=a(15),o=a(18),i=a(17),c=a(0),u=a.n(c),p=a(38),h=a(44),d=a(625),m=a(626),E=a(405),b=a(391),f=a(70),g=a(639),v=a(640),O=a(447),j=a.n(O),y=function(e){Object(o.a)(a,e);var t=Object(i.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).state={series:[],options:{}},n}return Object(s.a)(a,[{key:"componentDidMount",value:function(){this.setState({series:[{name:"Value",data:this.props.options.data}],options:{chart:{height:350,type:"bar"},plotOptions:{bar:{dataLabels:{position:"top",columnWidth:"50%",barHeight:"70%"}}},dataLabels:{enabled:!0,offsetY:-20,style:{fontSize:"12px",colors:["brown"]}},xaxis:{categories:this.props.options.categories,position:"bottom",axisBorder:{show:!1},axisTicks:{show:!1},crosshairs:{fill:{type:"gradient",gradient:{colorFrom:"brown",colorTo:this.props.options.color,stops:[0,100],opacityFrom:0,opacityTo:.5}}},tooltip:{enabled:!0}},yaxis:{axisBorder:{show:!1},axisTicks:{show:!1},labels:{show:!1}},title:{text:this.props.title,floating:!0,offsetY:330,align:"center",style:{color:"brown"}}}})}},{key:"render",value:function(){return u.a.createElement(g.a,{className:"square rounde-0"},u.a.createElement(v.a,null,u.a.createElement(j.a,{options:this.state.options,series:this.state.series,type:"bar",height:350})))}}]),a}(u.a.Component),C=Object(f.gql)(n||(n=Object(b.a)(["\n  {\n    allCaseTypologies {\n      id\n      category\n      lvformSet {\n        id\n      }\n    }\n  }\n"])));function w(e){var t=Object(f.useQuery)(C,{pollInterval:5e4}),a=t.loading,n=t.error,r=t.data;if(a)return u.a.createElement("p",null,"Loading...");if(n)return u.a.createElement("p",null,"Error ");var l=[],s=[];return r.allCaseTypologies.forEach((function(t){l.push(e.translate(t.category)),s.push(t.lvformSet.length)})),u.a.createElement(y,{options:{color:"#d9eb55",title:"CASE TYPE",categories:l,data:s}})}var S,L=Object(f.gql)(r||(r=Object(b.a)(["\n  {\n    allCasesProvinces {\n      id\n      name\n      lvformSet {\n        id\n      }\n    }\n  }\n"])));function A(e){var t=Object(f.useQuery)(L,{pollInterval:5e4}),a=t.loading,n=t.error,r=t.data;if(a)return u.a.createElement("p",null,"Loading...");if(n)return u.a.createElement("p",null,"Error ");var l=[],s=[];return r.allCasesProvinces.forEach((function(t){l.push(e.translate(t.name)),s.push(t.lvformSet.length)})),u.a.createElement(y,{options:{color:"#d9eb55",title:"CASE TYPE",categories:l,data:s}})}var T=Object(f.gql)(S||(S=Object(b.a)(["\n  {\n    allCasesSector {\n      sector\n      dcount\n    }\n  }\n"])));function k(e){var t=Object(f.useQuery)(T,{pollInterval:5e4}),a=t.loading,n=t.error,r=t.data;if(a)return u.a.createElement("p",null,"Loading...");if(n)return u.a.createElement("p",null,"Error ");var l=[],s=[];return r.allCasesSector.forEach((function(t){l.push(e.translate(t.sector)),s.push(t.dcount)})),u.a.createElement(y,{options:{color:"#d9eb55",title:"CASE TYPE",categories:l,data:s}})}var P,x=function(e){Object(o.a)(a,e);var t=Object(i.a)(a);function a(){var e;Object(l.a)(this,a);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).state={series:[],options:{},isLoaded:!1},e}return Object(s.a)(a,[{key:"componentDidMount",value:function(){this.setState({series:this.props.series,options:{chart:{width:380,type:"pie"},labels:this.props.labels,responsive:[{breakpoint:480,options:{chart:{width:200},legend:{position:"bottom"}}}],title:{text:this.props.title,floating:!0,offsetY:330,align:"center",style:{color:"brown"}}}})}},{key:"render",value:function(){var e;return u.a.createElement(g.a,{className:"square rounde-0"},u.a.createElement(v.a,null,u.a.createElement(j.a,{options:this.state.options,series:null!==(e=this.state.series)&&void 0!==e?e:[],type:"donut",height:350})))}}]),a}(u.a.Component),I=Object(f.gql)(P||(P=Object(b.a)(["\n  {\n    allCasesAge {\n      ageGroup\n      dcount\n    }\n  }\n"])));function N(e){var t=Object(f.useQuery)(I,{pollInterval:5e4}),a=t.loading,n=t.error,r=t.data;if(a)return u.a.createElement("p",null,"Loading...");if(n)return u.a.createElement("p",null,"Error ");var l=[],s=[];return r.allCasesAge.forEach((function(t){l.push(e.translate(t.ageGroup)),s.push(Number(t.dcount))})),u.a.createElement(x,{series:s,labels:l})}var R,F,q=function(e){Object(o.a)(a,e);var t=Object(i.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).state={series:n.props.series,options:{chart:{width:380,type:"pie"},labels:n.props.labels,responsive:[{breakpoint:480,options:{chart:{},legend:{position:"bottom"}}}]}},n}return Object(s.a)(a,[{key:"render",value:function(){return u.a.createElement(g.a,{className:"square rounde-0"},u.a.createElement(v.a,null,u.a.createElement(j.a,{options:this.state.options,series:this.state.series,type:"pie",height:350})))}}]),a}(u.a.Component),Y=Object(f.gql)(R||(R=Object(b.a)(["\n  {\n    allCasesKnowledgeAbout {\n      howKnowsLv\n      dcount\n    }\n  }\n"])));function G(e){var t=Object(f.useQuery)(Y,{pollInterval:5e4}),a=t.loading,n=t.error,r=t.data;if(a)return u.a.createElement("p",null,"Loading...");if(n)return u.a.createElement("p",null,"Error ");var l=[],s=[];return r.allCasesKnowledgeAbout.forEach((function(t){t.howKnowsLv&&t.dcount&&(l.push(e.translate(t.howKnowsLv)),s.push(Number(t.dcount)))})),u.a.createElement(q,{series:s,labels:l})}var Q,B=Object(f.gql)(F||(F=Object(b.a)(["\n  {\n    allCasesCallFeedback {\n      callFeedback\n      dcount\n    }\n  }\n"])));function K(e){var t=Object(f.useQuery)(B,{pollInterval:5e4}),a=t.loading,n=t.error,r=t.data;if(a)return u.a.createElement("p",null,"Loading...");if(n)return u.a.createElement("p",null,"Error ");var l=[],s=[];return r.allCasesCallFeedback.forEach((function(t){t.callFeedback&&(l.push(e.translate(t.callFeedback)),s.push(Number(t.dcount)))})),u.a.createElement(q,{series:s,labels:l})}var D={male:"Male",female:"Female",other:"Not specified"},M=Object(f.gql)(Q||(Q=Object(b.a)(["\n  {\n    allCasesGender {\n      gender\n      dcount\n    }\n  }\n"])));function U(e){var t=Object(f.useQuery)(M,{pollInterval:5e4}),a=t.loading,n=t.error,r=t.data;if(a)return u.a.createElement("p",null,"Loading...");if(n)return u.a.createElement("p",null,"Error ");var l=[],s=[];return r.allCasesGender.forEach((function(t){l.push(e.translate(D[t.gender])),s.push(Number(t.dcount))})),u.a.createElement(x,{series:s,labels:l})}var V=function(e){Object(o.a)(a,e);var t=Object(i.a)(a);function a(){var e;Object(l.a)(this,a);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).translate=e.context.translate,e.state={pageTitle:e.translate("Reports"),pageParent:e.translate("Analysis and Reporting"),activePage:e.translate("Reports"),items:[],columnDefs:[],show:!1,data:[],page:"lvform",locale:h.c.PORTUGUESE},e}return Object(s.a)(a,[{key:"render",value:function(){return u.a.createElement("div",null,u.a.createElement(E.a,{breadCrumbItems:[],breadCrumbTitle:this.state.pageTitle,breadCrumbParent:this.state.pageParent,breadCrumbActive:this.state.activePage}),u.a.createElement(d.a,null,u.a.createElement(m.a,{md:"6"},u.a.createElement("h5",null,this.translate("CALLER PROFILE BY AGE")),u.a.createElement(N,{translate:this.translate})),u.a.createElement(m.a,{md:"6"},u.a.createElement("h5",null," ",this.translate("CALLER PROFILE BY GENDER")),u.a.createElement(U,{translate:this.translate})),u.a.createElement(m.a,{md:"6"},u.a.createElement("h5",{className:""}," ",this.translate("KOWLEDGE ABOUT LV")),u.a.createElement(G,{translate:this.translate})),u.a.createElement(m.a,{md:"6"},u.a.createElement("h5",null,this.translate("SATISFATION")),u.a.createElement(K,{translate:this.translate}))),u.a.createElement(d.a,null,u.a.createElement(m.a,{md:"12"},u.a.createElement("h5",null,this.translate("CASES BY PROVINCES")),u.a.createElement(A,{translate:this.translate})),u.a.createElement(m.a,{md:"12"},u.a.createElement("h5",null," ",this.translate("CASE TYPE")),u.a.createElement(w,{translate:this.translate}))),u.a.createElement(d.a,null,u.a.createElement(m.a,{md:"12"},u.a.createElement("h5",null,this.translate("CASES PER SECTOR")),u.a.createElement(k,{translate:this.translate}))))}}]),a}(c.Component);V.contextType=h.a;t.default=Object(p.b)((function(e){return{state:e,config:e.auth.login.config,app_reducer:e.app.app_reducer}}),{})(V)}}]);
//# sourceMappingURL=14.176ea0a7.chunk.js.map