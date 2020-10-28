(this.webpackJsonpfrontend_web=this.webpackJsonpfrontend_web||[]).push([[0],{51:function(e,t,a){e.exports=a(64)},64:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(23),c=a.n(l),o=a(10),i=a(5),u=a(15),m=a(14);function s(){var e=Object(u.a)(["\n  query getUser($id: ID!) {\n    user(id: $id) {\n      id\n      username\n      dateJoined\n      firstName\n      lastName\n      lastLogin\n      email\n      isStaff\n      isSuperuser\n    }\n  }\n"]);return s=function(){return e},e}function d(){var e=Object(u.a)(["\n  mutation registerUser(\n    $id: ID\n    $username: String!\n    $email: String!\n    $firstName: String\n    $lastName: String\n  ) {\n    registerUser(\n      id: $id\n      username: $username\n      email: $email\n      firstName: $firstName\n      lastName: $lastName\n    ) {\n      user {\n        id\n        username\n        dateJoined\n        firstName\n        lastName\n        lastLogin\n        email\n        isStaff\n        isSuperuser\n      }\n    }\n  }\n"]);return d=function(){return e},e}function b(){var e=Object(u.a)(["\n  query getUsers {\n    users {\n      id\n      username\n      dateJoined\n      firstName\n      lastName\n      lastLogin\n      email\n      isStaff\n      isSuperuser\n    }\n  }\n"]);return b=function(){return e},e}function f(){var e=Object(u.a)(["\n  query getMe {\n    me {\n      id\n      username\n      dateJoined\n      firstName\n      lastName\n      lastLogin\n      email\n      isStaff\n      isSuperuser\n    }\n  }\n"]);return f=function(){return e},e}function E(){var e=Object(u.a)(["\n  mutation getToken($username: String!, $password: String!) {\n    tokenAuth(username: $username, password: $password) {\n      token\n    }\n  }\n"]);return E=function(){return e},e}var p=Object(m.b)(E()),v=Object(m.b)(f()),g=Object(m.b)(b()),y=Object(m.b)(d()),O=Object(m.b)(s());var h=function(e){var t=Object(i.c)(v),a=t.loading,n=t.error,l=t.data;return a?r.a.createElement("p",null,"Loading..."):n?r.a.createElement("p",null,"Error :("):(console.log(l),r.a.createElement("div",{className:"user-profile-nav"},r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement("b",null,l.me.username)),r.a.createElement("li",null,r.a.createElement(o.b,{exact:!0,to:"/login"},"Logout")))))},j=a(7);var N=function(){var e=Object(j.g)(),t=Object(i.c)(v),a=t.loading,n=t.error,r=t.data;if(a)return null;if(n){if(n.graphQLErrors.length){var l=n.graphQLErrors[0].message;"Signature has expired"!==l&&"You do not have permission to perform this action"!==l||e.push("/login")}return console.log(n),null}return r},S={DEV:{baseUrl:"http://localhost:8000/api",ROOT:"http://localhost:8000"},PROD:{baseUrl:"/api",ROOT:""}},w=S.PROD.baseUrl;S.PROD.ROOT;var x=function(){var e=N();return console.log(e),r.a.createElement("header",{className:"navbar container"},r.a.createElement("div",{className:"content"},r.a.createElement("h3",null,"TAG MAKOKA (MSCC)"),r.a.createElement("div",{className:"nav-links"},r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement(o.b,{exact:!0,to:"/"},"Home")),r.a.createElement("li",null,r.a.createElement(o.b,{to:"/entries"},"Entries")),e&&e.me&&e.me.isSuperuser&&r.a.createElement("li",null,r.a.createElement(o.b,{to:"/users"},"Users"))),r.a.createElement(h,null))))};function C(){var e=Object(u.a)(["\n  query titheSummary {\n    titheSummary {\n      date\n      total\n    }\n  }\n"]);return C=function(){return e},e}function k(){var e=Object(u.a)(["\n  query revenueSummary {\n    revenueSummary {\n      date\n      cat\n      total\n    }\n  }\n"]);return k=function(){return e},e}var A=Object(m.b)(k()),T=Object(m.b)(C()),$=a(46),q=a.n($),D=function(e){return isNaN(e)?0:parseFloat(e)},F={fmt:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return Number(e).toFixed(t).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1,")},sum:function(e){return e.reduce((function(e,t){return D(e)+D(t)}),0)},dpts:function(e){return(Math.round(100*e)/100).toFixed(2)}},L=function(e){var t=e.graphId,a=e.meta,l=e.title,c=e.extra,o=void 0===c?null:c,i=e.type,u=void 0===i?"bar":i,m=e.stacked,s=void 0!==m&&m;return Object(n.useEffect)((function(){var e={datasets:a.data,labels:a.labels};console.log(e);var n={legend:{display:window.screen.width>800,position:"top"},plugins:{datalabels:{display:!1}},hover:{mode:"index",intersect:!1},tooltips:{displayColors:!0,callbacks:{mode:"x"}},scales:{xAxes:[{stacked:s,gridLines:{display:!1}}],yAxes:[{stacked:s,ticks:{beginAtZero:a.beginAtZero||!1,callback:function(e){return e.toLocaleString()},userCallback:function(e,t,a){if(Math.floor(e)===e)return F.fmt(e)}},type:"linear"}]}};console.log("Data: ",e),new q.a(document.getElementById(t),{type:u,data:e,options:n})}),[]),r.a.createElement("div",{className:"graph-container bg-white card ".concat(o||"")},r.a.createElement("h6",{className:"pl-1"},l),r.a.createElement("div",null,r.a.createElement("canvas",{id:t,className:"graph p-1",style:{}})))},M=(a(50),a(47),function(){for(var e="#",t=0;t<6;t++)e+="0123456789ABCDEF"[Math.floor(16*Math.random())];return e});var I=function(e){N();var t=Object(i.c)(A),a=t.loading,n=t.data,l=t.error;if(a)return"Loading ...";if(l)return"Error!";console.log(n),console.log(n.revenueSummary);var c=n.revenueSummary.map((function(e){return e.date})).filter((function(e,t,a){return a.indexOf(e)===t})),o={data:[{cat:"ZAKA",total:0},{cat:"SADAKA",total:0}].map((function(e){return{label:e.cat,backgroundColor:M(),data:c.map((function(t){var a=n.revenueSummary.find((function(a){return a.date===t&&a.cat===e.cat}));return a?a.total:0}))}})),labels:c.map((function(e){return e})),beginAtZero:!0};return r.a.createElement(L,{stacked:!0,meta:o,title:"Revenue By Date",graphId:"revenue-date-summary"})};var R=function(e){N();var t=Object(i.c)(T),a=t.loading,n=t.data,l=t.error;if(a)return"Loading ...";if(l)return"Error!";console.log(n),console.log(n.titheSummary);var c=n.titheSummary.map((function(e){return e.date})).filter((function(e,t,a){return a.indexOf(e)===t})),o={data:[{label:"Members",backgroundColor:M(),data:n.titheSummary.map((function(e){return e.total}))}],labels:c.map((function(e){return e})),beginAtZero:!0};return console.log(o),r.a.createElement(L,{stacked:!1,meta:o,title:"Tithing Members By Date",graphId:"tithe-date-summary"})};var U=function(){return console.log("Home Page"),r.a.createElement("div",{className:"dashboard"},r.a.createElement(I,null),r.a.createElement(R,null))},V=a(13),P=a(4),_=a(6);var B=function(e){var t=e.columns,a=e.data,n=e.idCol,l=void 0===n?"id":n;return r.a.createElement("div",{className:"table-container"},r.a.createElement("table",{className:"table-scrollable"},r.a.createElement("thead",null,r.a.createElement("tr",null,t.map((function(e){return r.a.createElement("th",{key:e.name},e.label)})))),r.a.createElement("tbody",null,a.map((function(e){return r.a.createElement("tr",{key:e[l]},t.map((function(t){return r.a.createElement("td",{key:t.name,className:t.className},t.render?t.render(e):e[t.name])})))})))))},J=function(e){var t=e.name,a=e.extra,n=e.text;return r.a.createElement(r.a.Fragment,null,r.a.createElement("span",{className:"mat-icon material-icons".concat(a?" "+a:"")},t),n&&r.a.createElement("span",null,n))};function Q(){var e=Object(u.a)(["\n  mutation createEntity($name: String!) {\n    createEntity(input: { name: $name }) {\n      result {\n        id\n      }\n    }\n  }\n"]);return Q=function(){return e},e}function z(){var e=Object(u.a)(["\n  mutation createEntry($entity: ID!, $amount: Float!, $entryType: Int!, $createdAt: DateTime!) {\n    createEntry(input: { entity: $entity, amount: $amount, entryType: $entryType, createdAt: $createdAt }) {\n      result {\n        id\n      }\n    }\n  }\n"]);return z=function(){return e},e}function K(){var e=Object(u.a)(["\n  query getEntities {\n    entities {\n      id\n      name\n    }\n  }\n"]);return K=function(){return e},e}function Z(){var e=Object(u.a)(["\n  query getEntries(\n    $pageNo: Int\n    $pageSize: Int\n    $entity: Int\n    $entryType: Int\n    $dateFrom: Date\n    $dateTo: Date\n  ) {\n    entries(\n      pageNo: $pageNo\n      pageSize: $pageSize\n      entity: $entity\n      entryType: $entryType\n      dateFrom: $dateFrom\n      dateTo: $dateTo\n    ) {\n      id\n      amount\n      entryType\n      createdAt\n      updatedAt\n      entity {\n        id\n        name\n      }\n    }\n  }\n"]);return Z=function(){return e},e}var H=Object(m.b)(Z()),G=Object(m.b)(K()),W=Object(m.b)(z()),Y=Object(m.b)(Q()),X=a(17),ee=a(31),te=a(24);var ae=function(e){var t=e.label,a=e.name,n=e.help,l=e.type,c=void 0===l?"text":l,o=e.cls,i=Object(te.a)(e,["label","name","help","type","cls"]);return r.a.createElement("div",{className:"input-wrap ".concat(o||"")},r.a.createElement("label",{htmlFor:a},t),"textarea"===c?r.a.createElement("textarea",Object.assign({name:a,id:a},i)):r.a.createElement("input",Object.assign({type:c,name:a,id:a},i)),n&&r.a.createElement("span",{className:"input-help"},n))},ne={pageSize:1e4,pageNo:1},re=a(49);var le=function(e){var t=e.label,a=e.name,n=e.query,l=e.onCreateOption,c=e.onChange,o=e.options,u=void 0===o?[]:o,m=e.defaultValue,s=void 0===m?null:m,d=Object(te.a)(e,["label","name","query","onCreateOption","onChange","options","defaultValue"]),b=Object(i.c)(n?n.name:v,{skip:null===n}),f=b.loading,E=b.data,p=b.error;if(f||p)return null;E&&n&&(u=E[n.data]);var g=u.map((function(e){return{value:e.id,label:e.name}})),y=g&&g.find((function(e){return s==e.value})),O=void 0!==s&&y?{value:s,label:y.label}:null;return r.a.createElement("div",{className:"input-wrap"},r.a.createElement("label",{htmlFor:a},t),r.a.createElement(re.a,Object.assign({options:g},d,{onCreateOption:function(e){l&&l(a,e)},onChange:function(e){c&&c({target:{name:a,value:e.value}})},value:O,maxMenuHeight:110})))},ce=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],a=new Date(e),n=""+(a.getMonth()+1),r=""+a.getDate(),l=a.getFullYear(),c=a.getHours(),o=a.getMinutes();a.getSeconds();n.length<2&&(n="0"+n),r.length<2&&(r="0"+r),c<10&&(c="0"+c),o<10&&(o="0"+o);var i=[l,n,r].join("-"),u="".concat(c,":").concat(o<10?"0"+o:o,":00.00"),m=t?i+"T"+u:i;return m};var oe=function(e){e.filter;var t=e.onSuccess;N();var a=Object(i.c)(G),l=Object(n.useState)(null),c=Object(_.a)(l,1)[0],o=Object(n.useState)(null),u=Object(_.a)(o,2),m=u[0],s=u[1],d=new Map;d.entryType=0,d.createdAt=ce(Date.now(),!0);var b=Object(n.useState)(d),f=Object(_.a)(b,2),E=f[0],p=f[1],v=Object(i.b)(W),g=Object(_.a)(v,2),y=g[0],O=g[1].loading,h=Object(i.b)(Y),S=Object(_.a)(h,2),w=S[0];Object(ee.a)(S[1]);var x=a.data?a.data.entities:[];function C(e){var t=e.target,a=t.value,n=t.name;p(Object(P.a)(Object(P.a)({},E),{},Object(X.a)({},n,a)))}return c?r.a.createElement(j.a,{to:c}):r.a.createElement("div",null,O&&r.a.createElement("p",null,"Sending ...."),r.a.createElement("form",{className:"form",onSubmit:function(e){e.preventDefault(),E.entity&&E.amount?y({variables:Object(P.a)(Object(P.a)({},E),{},{createdAt:E.createdAt.split(" ")[0]}),awaitRefetchQueries:!0}).then((function(e){console.log(e),p(Object(P.a)(Object(P.a)({},E),{},{amount:"",entity:null}));var a=e.data.createEntry.result.id;s({error:!1,text:"Successfully recorded an entry: ".concat(a)}),t(a)}),(function(e){console.log("Error: ",e),s({error:!0,text:"Form submit failed!"})})):s({error:!0,text:"Fill in amount & entity"})},autoComplete:"off"},r.a.createElement("div",null,r.a.createElement(ae,{name:"createdAt",label:"Record Date",type:"datetime-local",onChange:C,required:!0,defaultValue:ce(Date.now(),!0)}),r.a.createElement(le,{name:"entryType",label:"Type",options:[{id:0,name:"Revenue"},{id:1,name:"Expense"}],onChange:C,defaultValue:E.entryType||0,required:!0}),r.a.createElement(le,{name:"entity",label:"Entity",options:x,onChange:C,onCreateOption:function(e,t){w({variables:{name:t},refetchQueries:function(){return[{query:G}]},awaitRefetchQueries:!0}).then((function(t){var a=t.data.createEntity.result.id;p(Object(P.a)(Object(P.a)({},E),{},Object(X.a)({},e,a)))}),(function(e){return s({error:!0,text:"Error creating entity"})}))},defaultValue:E.entity,required:!0}),r.a.createElement(ae,{name:"amount",label:"Amount",type:"number",onChange:C,required:!0,value:E.amount,min:100})),r.a.createElement("div",{className:"form-footer"},r.a.createElement("button",null,"Submit"))),m&&r.a.createElement("small",{className:"p-1 message ".concat(m.error?"fail":"success")},m.text))};var ie=function(e){var t=e.pageNo,a=e.onPageChanged,n=e.lastPage;return r.a.createElement("ul",{className:"pagination"},r.a.createElement("li",{className:"btn-wrap"},r.a.createElement("button",{onClick:function(){a&&a(t>1?t-1:1)},disabled:t<=1},r.a.createElement(J,{name:"keyboard_arrow_left"})," Previous")),r.a.createElement("li",null,r.a.createElement("span",null,"Page ",t)),r.a.createElement("li",{className:"btn-wrap"},r.a.createElement("button",{onClick:function(){a&&a(t+1)},disabled:n},"Next ",r.a.createElement(J,{name:"keyboard_arrow_right"}))))};var ue=function(e){var t=e.label,a=e.name,n=e.query,l=e.options,c=void 0===l?[]:l,o=Object(te.a)(e,["label","name","query","options"]),u=Object(i.c)(n?n.name:v,{skip:null===n}),m=u.loading,s=u.data,d=u.error;return m||d?null:(s&&n&&(c=s[n.data]),r.a.createElement("div",{className:"input-wrap"},r.a.createElement("label",{htmlFor:a},t),r.a.createElement("select",Object.assign({name:a,id:a},o),r.a.createElement("option",{value:""},"---Select---"),c.map((function(e){return r.a.createElement("option",{key:e.id,value:e.id},e.name)})))))};var me=function(e){var t=e.fields,a=e.handleChange,n=e.handleSubmit,l=(e.filter,e.handleExport);return r.a.createElement("div",{className:"filter-export  w-100"},r.a.createElement("form",{className:"form d-flex align-bottom",onSubmit:n},r.a.createElement("div",{className:"inline-fields"},t.map((function(e){return e.type&&"select"===e.type?r.a.createElement(ue,Object.assign({key:e.name},e,{onChange:a})):r.a.createElement(ae,Object.assign({key:e.name},e,{onChange:a}))}))),r.a.createElement("div",{className:"d-flex"},r.a.createElement("button",{name:"filter"},"Filter"),r.a.createElement("button",{className:"ml-1",name:"export",type:"button",onClick:l},"Export"))))};var se=function(e){var t=e.handleSubmit,a=e.handleExport,l=e.filter,c=void 0===l?{}:l;console.log(c);var o=Object(n.useState)(c),i=Object(_.a)(o,2),u=i[0],m=i[1],s=[{name:"entity",label:"Entity",type:"select",query:{name:G,data:"entities"},defaultValue:c.entity},{name:"entryType",label:"Type",type:"select",options:[{id:0,name:"Revenue"},{id:1,name:"Expense"}],defaultValue:c.entryType},{name:"dateFrom",label:"From",type:"date",defaultValue:c.dateFrom||ce(Date.now())},{name:"dateTo",label:"To",type:"date",defaultValue:c.dateTo||ce(Date.now())}];return r.a.createElement(me,{handleSubmit:function(e){e.preventDefault(),t(u)},fields:s,handleChange:function(e){var t=e.target,a=t.value,n=t.name;m(Object(P.a)(Object(P.a)({},u),{},Object(X.a)({},n,a||null)))},handleExport:function(e){e.preventDefault(),a(u)}})};var de=function(e){var t=e.filter,a=e.newEntry,l=Object(i.a)(H,{variables:Object(P.a)(Object(P.a)({},ne),t)}),c=Object(_.a)(l,2),o=c[0],u=c[1],m=u.loading,s=u.data,d=u.error,b=u.refetch;if(Object(n.useEffect)((function(){var e=new AbortController;return o(),function(){e.abort()}}),[t]),Object(n.useEffect)((function(){console.log("New Entry: ",a);var e=new AbortController;return b&&b(),function(){e.abort()}}),[a]),m||m)return r.a.createElement("p",null,"Loading...");if(d||d)return r.a.createElement("p",null,"Error :(");var f=s?s.entries.filter((function(e){return 0===e.entryType})):[],E=s?s.entries.filter((function(e){return 1===e.entryType})):[],p=f.reduce((function(e,t){return e+t.amount}),0),v=E.reduce((function(e,t){return e+t.amount}),0),g=p-v;return r.a.createElement("div",{className:"summary"},r.a.createElement("h5",null,"Summary"),r.a.createElement("div",null,r.a.createElement("div",null,"Revenue: ",r.a.createElement("br",null),r.a.createElement("i",null,r.a.createElement("small",null,f.length," record(s)")))," ",r.a.createElement("span",null,F.fmt(p))),r.a.createElement("div",null,r.a.createElement("div",null,"Expense:",r.a.createElement("br",null),r.a.createElement("i",null,r.a.createElement("small",null,E.length," record(s)"))," "),r.a.createElement("span",null,F.fmt(v))),r.a.createElement("hr",null),r.a.createElement("div",null,"Balance: ",r.a.createElement("span",null,F.fmt(g))))};var be=function(e){var t=e.onClose,a=e.title,n=e.children,l=(e.posx,e.posy,Object(te.a)(e,["onClose","title","children","posx","posy"]));return c.a.createPortal(r.a.createElement("div",Object.assign({className:"modal display-block"},l),r.a.createElement("div",{className:"modal-main"},r.a.createElement("div",{className:"modal-header"},a?r.a.createElement("h5",{className:"modal-title"},a):r.a.createElement("span",null),r.a.createElement("div",{className:"btn-group"},r.a.createElement("button",{type:"button",className:"btn btn-no-bg text-warning m-1 close-button",onClick:t},r.a.createElement(J,{name:"close"})))),r.a.createElement("div",{className:"modal-content"},n))),document.getElementById("portal"))};var fe=function(){N();var e=Object(n.useState)(1),t=Object(_.a)(e,2),a=t[0],l=t[1],c=Object(n.useState)(new Map),o=Object(_.a)(c,2),u=o[0],m=o[1],s=Object(i.a)(H,{variables:Object(P.a)({pageSize:10,pageNo:a},u)}),d=Object(_.a)(s,2),b=d[0],f=d[1],E=f.data,p=f.refetch,v=Object(n.useState)(!1),g=Object(_.a)(v,2),y=g[0],O=g[1],h=Object(n.useState)(0),S=Object(_.a)(h,2),x=S[0],C=S[1];Object(n.useEffect)((function(){var e=new AbortController;return b(),function(){e.abort()}}),[a,u]);var k=function(e){var t=Date.parse(e);return new Date(t).toLocaleDateString("en-GB")},A=E?E.entries.map((function(e){return Object(P.a)(Object(P.a)({},e),{},{entity_name:e.entity.name,createdAt:k(e.createdAt),updatedAt:k(e.updatedAt),amount:F.fmt(e.amount),entryType:0===e.entryType?"Revenue":"Expense"})})):[];return r.a.createElement(r.a.Fragment,null,r.a.createElement(j.b,{path:"/entries",exact:!0},r.a.createElement("div",{className:"toolbar"},r.a.createElement("h5",null,"List of entries"),r.a.createElement("button",{onClick:function(){return O(!0)},className:"btn"},r.a.createElement(J,{name:"add",text:"New Entry"}))),r.a.createElement("hr",null),r.a.createElement("div",{className:"toolbar"},E&&r.a.createElement(se,{handleSubmit:function(e){for(var t=new Map,a=0,n=Object.entries(e);a<n.length;a++){var r=Object(_.a)(n[a],2),c=r[0],o=r[1];o&&(t[c]=o)}m(t),l(1)},filter:u,handleExport:function(e){for(var t=new Map,a=0,n=Object.entries(e);a<n.length;a++){var r=Object(_.a)(n[a],2),l=r[0],c=r[1];c&&(t[l]=c)}var o=Object.keys(t).map((function(e){return e+"="+t[e]})).join("&");fetch("".concat(w,"/export-entries?").concat(o)).then((function(e){return e.blob()})).then((function(e){var t=window.URL.createObjectURL(e),a=document.createElement("a");a.href=t,a.download="Export.xlsx",document.body.appendChild(a),a.click(),a.remove()}))}})),r.a.createElement("div",{className:"d-flex desktop"},r.a.createElement("div",{className:"d-flex-main"},r.a.createElement(B,{columns:[{name:"id",label:"ID"},{name:"entity_name",label:"Entity"},{name:"amount",label:"Amount"},{name:"entryType",label:"Entry Type"},{name:"createdAt",label:"Created"}],data:A}),E&&r.a.createElement(ie,{pageNo:a,onPageChanged:function(e){l(e)},lastPage:E.entries.length<10})),r.a.createElement(de,{filter:u,newEntry:x}))),y&&r.a.createElement(be,{onClose:function(){return O(!1)},title:"Register New Entry"},r.a.createElement(oe,{onSuccess:function(e){p(),C(e)}})))};var Ee=function(){var e=Object(n.useState)(null),t=Object(_.a)(e,2),a=t[0],l=t[1],c=Object(n.useState)(new Map),u=Object(_.a)(c,2),m=u[0],s=u[1],d=Object(i.b)(y),b=Object(_.a)(d,2),f=b[0],E=b[1].loading;function p(e){var t=e.target,a=t.value,n=t.name;s(Object(P.a)(Object(P.a)({},m),{},Object(X.a)({},n,a)))}return a?r.a.createElement(j.a,{to:a}):r.a.createElement("div",null,r.a.createElement("div",{className:"toolbar"},r.a.createElement("div",{className:"titlebar"},r.a.createElement(o.b,{to:"/users",className:"btn btn-light mr-1"},r.a.createElement(J,{name:"keyboard_arrow_left"})),r.a.createElement("h5",null,"Register New User"))),E&&r.a.createElement("p",null,"Sending ...."),r.a.createElement("form",{className:"form form-medium",onSubmit:function(e){e.preventDefault(),f({variables:Object(P.a)({},m),refetchQueries:[{query:g},{query:v}]}).then((function(){return l("/users")}),(function(e){return console.log("Error: ",e)}))}},r.a.createElement("div",null,r.a.createElement(ae,{name:"username",label:"Username",onChange:p,required:!0}),r.a.createElement(ae,{name:"email",label:"Email Address",onChange:p,type:"email",required:!0}),r.a.createElement(ae,{name:"firstName",label:"First Name",onChange:p,required:!0}),r.a.createElement(ae,{name:"lastName",label:"Last Name",onChange:p,required:!0})),r.a.createElement("div",{className:"form-footer"},r.a.createElement("button",null,"Submit"))))};var pe=Object(j.h)((function(e){var t=e.match,a=Object(n.useState)(null),l=Object(_.a)(a,2),c=l[0],u=l[1],m=Object(n.useState)(new Map),s=Object(_.a)(m,2),d=s[0],b=s[1],f=Object(i.b)(y),E=Object(_.a)(f,2),p=E[0];Object(ee.a)(E[1]);var h=Object(i.c)(O,{variables:{id:t.params.id}}),N=h.loading,S=h.error,w=h.data;if(N)return r.a.createElement("p",null,"Loading...");if(S)return r.a.createElement("p",null,"Error :(");var x=w.user;function C(e){var t=e.target,a=t.value,n=t.name;b(Object(P.a)(Object(P.a)({},d),{},Object(X.a)({},n,a)))}return c?r.a.createElement(j.a,{to:c}):r.a.createElement("div",null,r.a.createElement("div",{className:"toolbar"},r.a.createElement("div",{className:"titlebar"},r.a.createElement(o.b,{to:"/users",className:"btn btn-light mr-1"},r.a.createElement(J,{name:"keyboard_arrow_left"})),r.a.createElement("h5",null,"Update User"))),N&&r.a.createElement("p",null,"Sending ...."),r.a.createElement("form",{className:"form form-medium",onSubmit:function(e){e.preventDefault();var t=new Map;Object.keys(x).forEach((function(e){d[e]||(t[e]=x[e])})),p({variables:Object(P.a)(Object(P.a)(Object(P.a)({},d),t),{},{id:x.id}),refetchQueries:[{query:g},{query:v}]}).then((function(){return u("/users")}),(function(e){return console.log("Error: ",e)}))}},r.a.createElement("div",null,r.a.createElement(ae,{name:"username",label:"Username",onChange:C,required:!0,defaultValue:x.username,readOnly:!0}),r.a.createElement(ae,{name:"email",label:"Email Address",onChange:C,type:"email",required:!0,defaultValue:x.email}),r.a.createElement(ae,{name:"firstName",label:"First Name",onChange:C,required:!0,defaultValue:x.firstName}),r.a.createElement(ae,{name:"lastName",label:"Last Name",onChange:C,required:!0,defaultValue:x.lastName})),r.a.createElement("div",{className:"form-footer"},r.a.createElement("button",null,"Submit"))))}));var ve=function(e){N();var t=Object(i.c)(g),a=t.loading,n=t.error,l=t.data;if(a)return null;if(n)return r.a.createElement("p",null,"Error (:");var c=[{name:"id",label:"ID"},{name:"username",label:"Client Name"},{name:"email",label:"Email"},{name:"name",label:"Full Name"},{name:"actions",label:"",render:function(e){return r.a.createElement("div",null,r.a.createElement("a",{href:"/users/update/".concat(e.id),className:"d-flex align-left"},r.a.createElement(J,{name:"edit",text:"Edit"})))}}],u=l.users.map((function(e){return Object(P.a)(Object(P.a)({},e),{},{name:e.firstName?"".concat(e.firstName," ").concat(e.lastName):null})}));return r.a.createElement(r.a.Fragment,null,r.a.createElement(j.b,{path:"/users",exact:!0},r.a.createElement("div",{className:"toolbar"},r.a.createElement("h5",null,"List of users"),r.a.createElement(o.b,{className:"d-flex btn btn-light has-left-icon",to:"/users/new-user"},r.a.createElement(J,{name:"add",text:"New User"}))),r.a.createElement(B,{columns:c,data:u})),r.a.createElement(j.b,{path:"/users/new-user",exact:!0},r.a.createElement(Ee,null)),r.a.createElement(j.b,{path:"/users/update/:id",exact:!0},r.a.createElement(pe,null)))},ge={saveToken:function(e,t){sessionStorage.setItem("AccessToken",e),t(!0)},getToken:function(){return sessionStorage.getItem("AccessToken")},removeToken:function(){return sessionStorage.removeItem("AccessToken")}};var ye=function(e){var t=Object(n.useState)(new Map),a=Object(_.a)(t,2),l=a[0],c=a[1],o=Object(n.useState)(null),u=Object(_.a)(o,2),m=u[0],s=u[1],d=Object(i.b)(p),b=Object(_.a)(d,2),f=b[0],E=b[1].client;function v(e){var t=e.target,a=t.value,n=t.name;c(Object(P.a)(Object(P.a)({},l),{},Object(X.a)({},n,a)))}return m?r.a.createElement(j.a,{to:m}):r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"login-page box-shadow"},r.a.createElement("div",{className:"login-header d-flex mb-1 p-1"},r.a.createElement("h3",null,"TAG MAKOKA (MSCC)"),r.a.createElement("img",{src:"/static/images/logo.png",alt:"Logo"})),r.a.createElement("form",{className:"form",onSubmit:function(e){e.preventDefault(),E.clearStore(),f({variables:Object(P.a)({},l)}).then((function(e){if(e.data){var t=e.data.tokenAuth.token;ge.saveToken(t,(function(){s("/")}))}}),(function(e){return console.log("Error: ",e)}))}},r.a.createElement("div",{className:"mt-1"},r.a.createElement(ae,{name:"username",label:"Username",onChange:v,required:!0}),r.a.createElement(ae,{name:"password",label:"Password",type:"password",onChange:v,required:!0})),r.a.createElement("div",{className:"form-footer"},r.a.createElement("button",null,r.a.createElement("span",{className:"mr-1"},"Login"),r.a.createElement(J,{name:"login"}))))))},Oe=function(){var e=ge.getToken();return e?"JWT ".concat(e):""},he=new m.a({uri:"".concat(w,"/graphql"),request:function(e){e.setContext({headers:{Authorization:Oe()}})}});var je=function(){return r.a.createElement(o.a,null,r.a.createElement(V.a,{client:he},r.a.createElement(j.d,null,r.a.createElement(j.b,{path:"/login",exact:!0},r.a.createElement(ye,null)),r.a.createElement(j.b,{path:"/"},r.a.createElement(x,null),r.a.createElement("section",{className:"page-content container"},r.a.createElement("div",{className:"content"},r.a.createElement(j.d,null,r.a.createElement(j.b,{path:"/",exact:!0},r.a.createElement(U,null)),r.a.createElement(j.b,{path:"/entries"},r.a.createElement(fe,null)),r.a.createElement(j.b,{path:"/users"},r.a.createElement(ve,null)))))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(je,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[51,1,2]]]);
//# sourceMappingURL=main.a6ea6bb1.chunk.js.map