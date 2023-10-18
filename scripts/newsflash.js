

var persistlastviewedmsg=1 //should messages' order persist after users navigate away (1=yes, 0=no)?
var persistmsgbehavior="onclick" //set to "onload" or "onclick".

//configure the below variable to determine the delay between ticking of messages (in miliseconds):
var tickdelay=3000

////Do not edit pass this line////////////////

var divonclick=(persistlastviewedmsg && persistmsgbehavior=="onclick")? 'onClick="savelastmsg()" ' : ''
var currentmessage=0

function changetickercontent(){
if (crosstick.filters && crosstick.filters.length>0)
crosstick.filters[0].Apply()
crosstick.innerHTML=tickercontents[currentmessage]
if (crosstick.filters && crosstick.filters.length>0)
crosstick.filters[0].Play()
currentmessage=(currentmessage==tickercontents.length-1)? currentmessage=0 : currentmessage+1
var filterduration=(crosstick.filters&&crosstick.filters.length>0)? crosstick.filters[0].duration*1000 : 0
setTimeout("changetickercontent()",tickdelay+filterduration)
}

function beginticker(){
if (persistlastviewedmsg && get_cookie("lastmsgnum")!="")
revivelastmsg()
crosstick=document.getElementById? document.getElementById("memoryticker") : document.all.memoryticker
changetickercontent()
}

function get_cookie(Name) {
var search = Name + "="
var returnvalue = ""
if (document.cookie.length > 0) {
offset = document.cookie.indexOf(search)
if (offset != -1) {
offset += search.length
end = document.cookie.indexOf(";", offset)
if (end == -1)
end = document.cookie.length;
returnvalue=unescape(document.cookie.substring(offset, end))
}
}
return returnvalue;
}

function savelastmsg(){
document.cookie="lastmsgnum="+currentmessage
}

function revivelastmsg(){
currentmessage=parseInt(get_cookie("lastmsgnum"))
currentmessage=(currentmessage==0)? tickercontents.length-1 : currentmessage-1
}

if (persistlastviewedmsg && persistmsgbehavior=="onload")
window.onunload=savelastmsg

if (document.all||document.getElementById)
document.write('<div id="memoryticker" '+divonclick+'></div>')
if (window.addEventListener)
window.addEventListener("load", beginticker, false)
else if (window.attachEvent)
window.attachEvent("onload", beginticker)
else if (document.all || document.getElementById)
window.onload=beginticker
