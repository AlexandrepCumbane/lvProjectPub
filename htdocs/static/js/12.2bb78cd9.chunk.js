(this["webpackJsonpvuexy-react-admin-dashboard"]=this["webpackJsonpvuexy-react-admin-dashboard"]||[]).push([[12],{645:function(e,t,a){"use strict";a.r(t);var n=a(14),r=a(15),c=a(18),s=a(17),o=a(0),i=a.n(o),u=a(38),l=a(640),m=a(634),h=a(625),d=a(626),p=a(639),f=a(134),v=a(129),g=a(39),b=a(131),y=a(60),E=a(61),_=(a(499),function(e){Object(c.a)(a,e);var t=Object(s.a)(a);function a(){var e;Object(n.a)(this,a);for(var r=arguments.length,c=new Array(r),s=0;s<r;s++)c[s]=arguments[s];return(e=t.call.apply(t,[this].concat(c))).state={activeTab:"1",email:"",password:"",username:"",csrf:"",times:0,initialText:""},e.authService=new b.a,e.toggle=function(t){e.state.activeTab!==t&&e.setState({activeTab:t})},e.updateToken=function(){e.authService.renewToken().then((function(){e.authService.getUser().then((function(t){e.context.initSocket(t.access_token),e.props.requestUpdateUser(t)}))}))},e.renderText=function(){return e.state.times>=10?i.a.createElement(l.a,{className:"d-flex justify-content-between align-items-center"},i.a.createElement("div",{className:"justify-content-center"},i.a.createElement("h4",null,"Linha 1458"),i.a.createElement("p",null,"You've reached the attempts limit, please reload the page or contact your system manager."))):i.a.createElement(l.a,{className:"d-flex justify-content-between align-items-center"},i.a.createElement("div",{className:"justify-content-center"},i.a.createElement("h4",null,"Linha 1458"),i.a.createElement("p",null,"Welcome, your account is being validated."),i.a.createElement("p",null,"Validation attemps ",i.a.createElement("strong",null,e.state.times))),i.a.createElement(m.a,{color:"primary"}))},e.test_connection=function(t){g.a.get("users/0/get_user_info",{headers:{Authorization:"Bearer ".concat(t)}}).then((function(t){var a=t.data;e.updateToken(),e.props.changeRole(a.groups_label[0]),E.a.push("/home")})).catch((function(a){var n=a.response;e.validate_error(n.data.detail);var r=setInterval((function(){e.state.times<10?(e.setState({times:e.state.times+1}),g.a.get("users/0/get_user_info",{headers:{Authorization:"Bearer ".concat(t)}}).then((function(t){var a=t.data;clearInterval(r),e.updateToken(),e.props.changeRole(a.groups_label[0]),E.a.push("/home")})).catch((function(t){var a=t.response;e.validate_error(a.data.detail)}))):clearInterval(r)}),5e3)}))},e.validate_error=function(t){"You do not have permission to perform this action."!==t&&"Invalid Authorization header. Unable to verify bearer token"===t&&e.authService.logout().then((function(){return e.authService.login()}))},e}return Object(r.a)(a,[{key:"componentDidMount",value:function(){var e=this;this.authService.getUser().then((function(t){e.props.requestUpdateUser(t).then((function(){e.test_connection(e.props.userOauth.access_token)}))})).catch((function(t){e.login()}))}},{key:"render",value:function(){return i.a.createElement(h.a,{className:"m-0 justify-content-center"},i.a.createElement(d.a,{sm:"8",xl:"7",lg:"10",md:"8",className:"d-flex justify-content-center"},i.a.createElement(p.a,{className:"rounded-0 mb-0 w-100"},i.a.createElement(h.a,{className:"m-0"},i.a.createElement(d.a,{md:"12",className:"p-0"},i.a.createElement(p.a,{className:"rounded-0 mb-0 px-2"},this.renderText()))))))}}]),a}(i.a.Component));_.contextType=y.a,t.default=Object(u.b)((function(e){return{state:e,auth_state:e.auth.login,userOauth:e.auth.login.userOauth}}),{requestLogin:f.c,requestGetUser:f.b,changeRole:f.a,requestDropodowns:v.b,requestUpdateUser:f.e})(_)}}]);
//# sourceMappingURL=12.2bb78cd9.chunk.js.map