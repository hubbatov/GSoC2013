define("hubbatov/AmberRemoteDeveloping", ["amber_vm/smalltalk", "amber_vm/nil", "amber_vm/_st", "amber_vm/globals", "amber_core/Kernel-Objects", "amber_core/Kernel-Collections"], function(smalltalk,nil,_st, globals){
smalltalk.addPackage('AmberRemoteDeveloping');
smalltalk.packages["AmberRemoteDeveloping"].transport = {"type":"amd","amdNamespace":"hubbatov"};

smalltalk.addClass('AmberRemoteConnector', globals.Object, ['socket'], 'AmberRemoteDeveloping');
globals.AmberRemoteConnector.comment="This class represents connection made with WebSocket technology.";
smalltalk.addMethod(
smalltalk.method({
selector: "createSocket:",
protocol: 'creating',
fn: function (aBlock){
var self=this;
function $NativeFunction(){return globals.NativeFunction||(typeof NativeFunction=="undefined"?nil:NativeFunction)}
return smalltalk.withContext(function($ctx1) { 
self["@socket"]=_st($NativeFunction())._constructor_value_("WebSocket","ws://localhost:9090/broadcast");
_st(self["@socket"])._onopen_((function(){
return smalltalk.withContext(function($ctx2) {
_st(self["@socket"])._send_("register#defaultConnection");
return _st(window)._alert_("Connection opened");
}, function($ctx2) {$ctx2.fillBlock({},$ctx1,1)})}));
_st(self["@socket"])._onmessage_(aBlock);
_st(self["@socket"])._onclose_((function(){
return smalltalk.withContext(function($ctx2) {
return self._createSocket_(aBlock);
}, function($ctx2) {$ctx2.fillBlock({},$ctx1,2)})}));
return self}, function($ctx1) {$ctx1.fill(self,"createSocket:",{aBlock:aBlock},globals.AmberRemoteConnector)})},
args: ["aBlock"],
source: "createSocket: aBlock\x0a\x09\x09\x22Creating client websocket and register the connection on server\x22\x0a\x09\x09\x22Note: after disconnecting from server client will try to reconnect as many times, as possible :)\x22\x0a\x09\x09socket := NativeFunction constructor: 'WebSocket' value: 'ws://localhost:9090/broadcast'.\x0a\x09\x09socket onopen: [ socket send: 'register#defaultConnection'. window alert: 'Connection opened'. ].\x0a\x09\x09socket onmessage: aBlock.\x0a\x09\x09socket onclose: [ self createSocket: aBlock ].",
messageSends: ["constructor:value:", "onopen:", "send:", "alert:", "onmessage:", "onclose:", "createSocket:"],
referencedClasses: ["NativeFunction"]
}),
globals.AmberRemoteConnector);

smalltalk.addMethod(
smalltalk.method({
selector: "socket",
protocol: 'accessing',
fn: function (){
var self=this;
var $1;
$1=self["@socket"];
return $1;
},
args: [],
source: "socket\x0a\x09\x22Returns socket variable\x22\x0a\x09^socket",
messageSends: [],
referencedClasses: []
}),
globals.AmberRemoteConnector);



smalltalk.addClass('AmberRemoteDevelopingClient', globals.Object, ['client'], 'AmberRemoteDeveloping');
globals.AmberRemoteDevelopingClient.comment="This class represents an Amber client, that allows user to work with amber using Pharo IDE with workspace and inspector. (Class browser and debugger in future)";
smalltalk.addMethod(
smalltalk.method({
selector: "answerWithObject:",
protocol: 'connection',
fn: function (aString){
var self=this;
var object;
function $AmberSessionObjects(){return globals.AmberSessionObjects||(typeof AmberSessionObjects=="undefined"?nil:AmberSessionObjects)}
return smalltalk.withContext(function($ctx1) { 
object=_st(_st($AmberSessionObjects())._session())._objectAt_(aString);
self._sendReply_withString_("object#",_st($AmberSessionObjects())._objectAsString_(object));
return self}, function($ctx1) {$ctx1.fill(self,"answerWithObject:",{aString:aString,object:object},globals.AmberRemoteDevelopingClient)})},
args: ["aString"],
source: "answerWithObject: aString\x0a\x09\x22Answer Pharo with JSON-representation of object with id = aString in session dictionary\x22\x0a\x09| object |\x0a\x09object := AmberSessionObjects session objectAt: aString.\x0a\x09self sendReply: 'object#' withString: ( AmberSessionObjects objectAsString: object )",
messageSends: ["objectAt:", "session", "sendReply:withString:", "objectAsString:"],
referencedClasses: ["AmberSessionObjects"]
}),
globals.AmberRemoteDevelopingClient);

smalltalk.addMethod(
smalltalk.method({
selector: "createDefaultConnection",
protocol: 'connection',
fn: function (){
var self=this;
function $AmberRemoteConnector(){return globals.AmberRemoteConnector||(typeof AmberRemoteConnector=="undefined"?nil:AmberRemoteConnector)}
return smalltalk.withContext(function($ctx1) { 
self["@client"]=_st(_st($AmberRemoteConnector())._new())._createSocket_((function(evt){
return smalltalk.withContext(function($ctx2) {
return self._processMessage_(_st(evt)._data());
}, function($ctx2) {$ctx2.fillBlock({evt:evt},$ctx1,1)})}));
return self}, function($ctx1) {$ctx1.fill(self,"createDefaultConnection",{},globals.AmberRemoteDevelopingClient)})},
args: [],
source: "createDefaultConnection\x0a\x09\x22Creating default connection with AmberRemoteConnector'\x22\x0a\x09client := ( AmberRemoteConnector new ) createSocket: [ :evt | self processMessage: ( evt data ) ].",
messageSends: ["createSocket:", "new", "processMessage:", "data"],
referencedClasses: ["AmberRemoteConnector"]
}),
globals.AmberRemoteDevelopingClient);

smalltalk.addMethod(
smalltalk.method({
selector: "evaluateString:",
protocol: 'evaluating',
fn: function (aString){
var self=this;
var result;
function $Compiler(){return globals.Compiler||(typeof Compiler=="undefined"?nil:Compiler)}
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st(_st($Compiler())._new())._evaluateExpression_(aString);
return $1;
}, function($ctx1) {$ctx1.fill(self,"evaluateString:",{aString:aString,result:result},globals.AmberRemoteDevelopingClient)})},
args: ["aString"],
source: "evaluateString: aString\x0a\x09\x22Evaluating message = aString and returning result of this operation. Also generated object will be available in session dictionary\x22\x0a\x09| result |\x0a\x09^( Compiler new evaluateExpression: aString )",
messageSends: ["evaluateExpression:", "new"],
referencedClasses: ["Compiler"]
}),
globals.AmberRemoteDevelopingClient);

smalltalk.addMethod(
smalltalk.method({
selector: "inspectObject:",
protocol: 'inspecting',
fn: function (anObject){
var self=this;
return smalltalk.withContext(function($ctx1) { 
self._sendReply_withString_("inspectResult#",_st(_st(anObject)._identityHash())._asString());
return self}, function($ctx1) {$ctx1.fill(self,"inspectObject:",{anObject:anObject},globals.AmberRemoteDevelopingClient)})},
args: ["anObject"],
source: "inspectObject: anObject\x0a\x09\x22Return the unique identificator of inspected object, which is also available in session dictionary\x22\x0a\x09self sendReply: 'inspectResult#' withString: ( anObject identityHash asString).",
messageSends: ["sendReply:withString:", "asString", "identityHash"],
referencedClasses: []
}),
globals.AmberRemoteDevelopingClient);

smalltalk.addMethod(
smalltalk.method({
selector: "printObject:",
protocol: 'printing',
fn: function (anObject){
var self=this;
return smalltalk.withContext(function($ctx1) { 
self._sendReply_withString_("printResult#",_st(anObject)._printString());
return self}, function($ctx1) {$ctx1.fill(self,"printObject:",{anObject:anObject},globals.AmberRemoteDevelopingClient)})},
args: ["anObject"],
source: "printObject: anObject\x0a\x09\x22Sending answer to Pharo after request 'printIt' command\x22\x0a\x09self sendReply: 'printResult#' withString:( anObject printString )",
messageSends: ["sendReply:withString:", "printString"],
referencedClasses: []
}),
globals.AmberRemoteDevelopingClient);

smalltalk.addMethod(
smalltalk.method({
selector: "processMessage:",
protocol: 'connection',
fn: function (aMessage){
var self=this;
var object;
function $AmberSessionObjects(){return globals.AmberSessionObjects||(typeof AmberSessionObjects=="undefined"?nil:AmberSessionObjects)}
function $Error(){return globals.Error||(typeof Error=="undefined"?nil:Error)}
return smalltalk.withContext(function($ctx1) { 
var $1,$2,$3,$4,$5,$6,$7,$8,$9;
self._showMessage_(aMessage);
_st((function(){
return smalltalk.withContext(function($ctx2) {
$1=_st(aMessage)._match_("doIt#");
$ctx2.sendIdx["match:"]=1;
if(smalltalk.assert($1)){
$2=_st(aMessage)._replace_with_("doIt#","");
$ctx2.sendIdx["replace:with:"]=1;
object=self._evaluateString_($2);
$ctx2.sendIdx["evaluateString:"]=1;
object;
$3=_st($AmberSessionObjects())._session();
$ctx2.sendIdx["session"]=1;
_st($3)._appendObject_(object);
$ctx2.sendIdx["appendObject:"]=1;
};
$4=_st(aMessage)._match_("printIt#");
$ctx2.sendIdx["match:"]=2;
if(smalltalk.assert($4)){
$5=_st(aMessage)._replace_with_("printIt#","");
$ctx2.sendIdx["replace:with:"]=2;
object=self._evaluateString_($5);
$ctx2.sendIdx["evaluateString:"]=2;
object;
self._printObject_(object);
$6=_st($AmberSessionObjects())._session();
$ctx2.sendIdx["session"]=2;
_st($6)._appendObject_(object);
$ctx2.sendIdx["appendObject:"]=2;
};
$7=_st(aMessage)._match_("inspectIt#");
$ctx2.sendIdx["match:"]=3;
if(smalltalk.assert($7)){
$8=_st(aMessage)._replace_with_("inspectIt#","");
$ctx2.sendIdx["replace:with:"]=3;
object=self._evaluateString_($8);
object;
self._inspectObject_(object);
_st(_st($AmberSessionObjects())._session())._appendObject_(object);
};
$9=_st(aMessage)._match_("object#");
if(smalltalk.assert($9)){
return self._answerWithObject_(_st(aMessage)._replace_with_("object#",""));
};
}, function($ctx2) {$ctx2.fillBlock({},$ctx1,1)})}))._on_do_($Error(),(function(ex){
return smalltalk.withContext(function($ctx2) {
return self._throwError_(ex);
}, function($ctx2) {$ctx2.fillBlock({ex:ex},$ctx1,6)})}));
return self}, function($ctx1) {$ctx1.fill(self,"processMessage:",{aMessage:aMessage,object:object},globals.AmberRemoteDevelopingClient)})},
args: ["aMessage"],
source: "processMessage: aMessage\x0a\x09| object |\x0a\x09\x22Parsing incoming messages and processing them\x22\x0a\x09self showMessage: aMessage.\x0a\x0a\x09[ (aMessage match: 'doIt#')  \x0a\x09\x09ifTrue: [ \x0a\x09\x09\x09object := self evaluateString: (aMessage replace: 'doIt#' with: '').\x0a\x09\x09\x09AmberSessionObjects session appendObject: object] .\x0a    (aMessage match: 'printIt#')  \x0a\x09\x09ifTrue: [ \x0a\x09\x09\x09object :=  self evaluateString: (aMessage replace: 'printIt#' with: '').\x0a\x09\x09\x09self printObject: object.\x0a\x09\x09\x09AmberSessionObjects session appendObject: object].\x0a\x09(aMessage match: 'inspectIt#')  \x0a\x09\x09ifTrue: [ \x0a\x09\x09\x09object := self evaluateString: ( aMessage replace: 'inspectIt#' with: '').\x0a\x09\x09\x09self inspectObject: object.\x0a\x09\x09\x09AmberSessionObjects session appendObject: object].\x0a\x09(aMessage match: 'object#')\x0a\x09\x09ifTrue:[\x0a\x09\x09\x09self answerWithObject: (aMessage replace: 'object#' with: '') ] ] on: Error do: [ : ex | self throwError: ex  ]",
messageSends: ["showMessage:", "on:do:", "ifTrue:", "match:", "evaluateString:", "replace:with:", "appendObject:", "session", "printObject:", "inspectObject:", "answerWithObject:", "throwError:"],
referencedClasses: ["AmberSessionObjects", "Error"]
}),
globals.AmberRemoteDevelopingClient);

smalltalk.addMethod(
smalltalk.method({
selector: "sendReply:withString:",
protocol: 'connection',
fn: function (aHeader,aString){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1,$receiver;
$1=_st(self["@client"])._socket();
$ctx1.sendIdx["socket"]=1;
if(($receiver = $1) == null || $receiver.isNil){
$1;
} else {
_st(_st(self["@client"])._socket())._send_(_st(aHeader).__comma(aString));
};
return self}, function($ctx1) {$ctx1.fill(self,"sendReply:withString:",{aHeader:aHeader,aString:aString},globals.AmberRemoteDevelopingClient)})},
args: ["aHeader", "aString"],
source: "sendReply: aHeader withString: aString\x0a\x09\x22Send answer to Pharo with header = aHeader and message = aString\x22\x0a\x09client socket ifNotNil: [\x0a\x09\x09client socket send: ( aHeader, aString ) ]",
messageSends: ["ifNotNil:", "socket", "send:", ","],
referencedClasses: []
}),
globals.AmberRemoteDevelopingClient);

smalltalk.addMethod(
smalltalk.method({
selector: "showMessage:",
protocol: 'printing',
fn: function (aMessage){
var self=this;
var div;
function $String(){return globals.String||(typeof String=="undefined"?nil:String)}
return smalltalk.withContext(function($ctx1) { 
var $1,$2,$3,$receiver;
div=_st(document)._getElementById_("messagesField");
$1=div;
if(($receiver = $1) == null || $receiver.isNil){
$1;
} else {
$2=div;
$3=_st(_st(_st(div)._innerHTML()).__comma(aMessage)).__comma(_st($String())._cr());
$ctx1.sendIdx[","]=1;
_st($2)._innerHTML_($3);
};
return self}, function($ctx1) {$ctx1.fill(self,"showMessage:",{aMessage:aMessage,div:div},globals.AmberRemoteDevelopingClient)})},
args: ["aMessage"],
source: "showMessage: aMessage\x0a\x09\x22Displays message aMessage on HTML page\x22\x0a\x09|div|\x0a\x09div := document getElementById: 'messagesField'.\x0a\x09div ifNotNil: [ div innerHTML: (div innerHTML), aMessage, String cr].",
messageSends: ["getElementById:", "ifNotNil:", "innerHTML:", ",", "innerHTML", "cr"],
referencedClasses: ["String"]
}),
globals.AmberRemoteDevelopingClient);

smalltalk.addMethod(
smalltalk.method({
selector: "throwError:",
protocol: 'errors',
fn: function (error){
var self=this;
return smalltalk.withContext(function($ctx1) { 
self._sendReply_withString_("error#",_st(error)._messageText());
return self}, function($ctx1) {$ctx1.fill(self,"throwError:",{error:error},globals.AmberRemoteDevelopingClient)})},
args: ["error"],
source: "throwError: error\x0a\x09\x22Throws an error while processing message\x22\x0a\x09self sendReply: 'error#' withString: (  error messageText ).",
messageSends: ["sendReply:withString:", "messageText"],
referencedClasses: []
}),
globals.AmberRemoteDevelopingClient);



smalltalk.addClass('AmberSessionObjects', globals.Dictionary, [], 'AmberRemoteDeveloping');
globals.AmberSessionObjects.comment="This dictionary represents map (Unique id --> anObject)\x0aUsing this dictionary Pharo can take object by id using AmberObjectMirror on Pharo side";
smalltalk.addMethod(
smalltalk.method({
selector: "appendObject:",
protocol: 'accessors',
fn: function (anObject){
var self=this;
var hash;
return smalltalk.withContext(function($ctx1) { 
hash=_st(_st(anObject)._identityHash())._asString();
self._at_put_(hash,anObject);
return self}, function($ctx1) {$ctx1.fill(self,"appendObject:",{anObject:anObject,hash:hash},globals.AmberSessionObjects)})},
args: ["anObject"],
source: "appendObject: anObject\x0a\x09\x22Adding object = anObject to dictionary\x22\x0a\x09| hash |\x0a\x09hash := anObject identityHash asString.\x0a\x09self at: hash put: anObject.",
messageSends: ["asString", "identityHash", "at:put:"],
referencedClasses: []
}),
globals.AmberSessionObjects);

smalltalk.addMethod(
smalltalk.method({
selector: "objectAt:",
protocol: 'accessors',
fn: function (aHash){
var self=this;
function $AmberUndefinedObject(){return globals.AmberUndefinedObject||(typeof AmberUndefinedObject=="undefined"?nil:AmberUndefinedObject)}
return smalltalk.withContext(function($ctx1) { 
var $2,$1;
$2=_st(aHash)._asString();
$ctx1.sendIdx["asString"]=1;
$1=self._at_ifPresent_ifAbsent_($2,(function(){
return smalltalk.withContext(function($ctx2) {
return self._at_(_st(aHash)._asString());
}, function($ctx2) {$ctx2.fillBlock({},$ctx1,1)})}),(function(){
return smalltalk.withContext(function($ctx2) {
return _st($AmberUndefinedObject())._new();
}, function($ctx2) {$ctx2.fillBlock({},$ctx1,2)})}));
return $1;
}, function($ctx1) {$ctx1.fill(self,"objectAt:",{aHash:aHash},globals.AmberSessionObjects)})},
args: ["aHash"],
source: "objectAt: aHash\x0a\x09\x22Returns object with id = aHash, otherwise returns nill\x22\x0a\x09\x22abc\x22\x0a\x09^self at: ( aHash asString ) ifPresent: [ self at: ( aHash asString) ] ifAbsent: [ AmberUndefinedObject new ]",
messageSends: ["at:ifPresent:ifAbsent:", "asString", "at:", "new"],
referencedClasses: ["AmberUndefinedObject"]
}),
globals.AmberSessionObjects);


globals.AmberSessionObjects.klass.iVarNames = ['session'];
smalltalk.addMethod(
smalltalk.method({
selector: "collectionAsString:",
protocol: 'converting',
fn: function (aCollection){
var self=this;
var json;
return smalltalk.withContext(function($ctx1) { 
var $7,$9,$8,$6,$5,$4,$3,$2,$1,$10;
json="";
_st(aCollection)._withIndexDo_((function(each,index){
return smalltalk.withContext(function($ctx2) {
$7=json;
$9=_st(index).__eq_eq((1));
if(smalltalk.assert($9)){
$8=" ";
} else {
$8=" , ";
};
$6=_st($7).__comma($8);
$5=_st($6).__comma("\x22");
$ctx2.sendIdx[","]=6;
$4=_st($5).__comma(_st(index)._printString());
$ctx2.sendIdx[","]=5;
$3=_st($4).__comma("\x22 : ");
$ctx2.sendIdx[","]=4;
$2=_st($3).__comma("{ ");
$ctx2.sendIdx[","]=3;
$1=_st($2).__comma(self._concreteObjectAsString_(each));
$ctx2.sendIdx[","]=2;
json=_st($1).__comma("}");
$ctx2.sendIdx[","]=1;
return json;
}, function($ctx2) {$ctx2.fillBlock({each:each,index:index},$ctx1,1)})}));
$10=json;
return $10;
}, function($ctx1) {$ctx1.fill(self,"collectionAsString:",{aCollection:aCollection,json:json},globals.AmberSessionObjects.klass)})},
args: ["aCollection"],
source: "collectionAsString: aCollection\x0a\x09\x22Converting collection to json \x22\x0a\x09\x09| json |\x0a\x09json := ''.\x0a\x09aCollection withIndexDo: [:each :index |\x0a\x09\x09json := json, (index == 1 ifFalse: [' , '] ifTrue: [' ']),  '\x22', index printString , '\x22 : ', '{ ', ( self concreteObjectAsString: each ) , '}' ].\x0a\x09^json",
messageSends: ["withIndexDo:", ",", "ifFalse:ifTrue:", "==", "printString", "concreteObjectAsString:"],
referencedClasses: []
}),
globals.AmberSessionObjects.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "concreteObjectAsString:",
protocol: 'converting',
fn: function (anObject){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $10,$9,$8,$7,$6,$5,$4,$3,$2,$1;
_st(self._session())._appendObject_(anObject);
$10=_st(_st(anObject)._identityHash())._asString();
$ctx1.sendIdx["asString"]=1;
$9="\x22objectId\x22: \x22".__comma($10);
$8=_st($9).__comma("\x22, \x22class\x22: ");
$ctx1.sendIdx[","]=8;
$7=_st($8).__comma("\x22");
$ctx1.sendIdx[","]=7;
$6=_st($7).__comma(_st(_st(anObject)._class())._asString());
$ctx1.sendIdx[","]=6;
$5=_st($6).__comma("\x22");
$ctx1.sendIdx[","]=5;
$4=_st($5).__comma(", \x22printString\x22: ");
$ctx1.sendIdx[","]=4;
$3=_st($4).__comma("\x22");
$ctx1.sendIdx[","]=3;
$2=_st($3).__comma(_st(anObject)._printString());
$ctx1.sendIdx[","]=2;
$1=_st($2).__comma("\x22");
$ctx1.sendIdx[","]=1;
return $1;
}, function($ctx1) {$ctx1.fill(self,"concreteObjectAsString:",{anObject:anObject},globals.AmberSessionObjects.klass)})},
args: ["anObject"],
source: "concreteObjectAsString: anObject\x0a\x09\x22Converting concrete object to json. Also try to add this object to session dictionary (because all objects which id`s we sent to Pharo must be available in sesion dictionary)\x22\x0a\x09self session appendObject: anObject.\x0a\x09^'\x22objectId\x22: \x22' , anObject identityHash asString, '\x22, \x22class\x22: ', '\x22' ,anObject class asString, '\x22' , ', \x22printString\x22: ', '\x22' , anObject printString , '\x22'.",
messageSends: ["appendObject:", "session", ",", "asString", "identityHash", "class", "printString"],
referencedClasses: []
}),
globals.AmberSessionObjects.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "objectAsString:",
protocol: 'converting',
fn: function (anObject){
var self=this;
var json;
return smalltalk.withContext(function($ctx1) { 
var $1,$2,$4,$3,$8,$9,$7,$6,$5,$12,$11,$10,$14,$13,$15,$16,$19,$18,$17,$21,$20,$22,$23,$24,$25,$26,$27;
_st(self._session())._appendObject_(anObject);
json="{ ";
$1=json;
$2=self._concreteObjectAsString_(anObject);
$ctx1.sendIdx["concreteObjectAsString:"]=1;
json=_st($1).__comma($2);
$ctx1.sendIdx[","]=1;
$4=_st(anObject)._class();
$ctx1.sendIdx["class"]=1;
$3=_st($4)._allInstanceVariableNames();
_st($3)._do_((function(each){
return smalltalk.withContext(function($ctx2) {
$8=_st(json).__comma(", \x22");
$ctx2.sendIdx[","]=6;
$9=_st(each)._asString();
$ctx2.sendIdx["asString"]=1;
$7=_st($8).__comma($9);
$ctx2.sendIdx[","]=5;
$6=_st($7).__comma("\x22: { ");
$ctx2.sendIdx[","]=4;
$5=_st($6).__comma(self._concreteObjectAsString_(_st(anObject)._instVarAt_(each)));
$ctx2.sendIdx[","]=3;
json=_st($5).__comma("}");
$ctx2.sendIdx[","]=2;
return json;
}, function($ctx2) {$ctx2.fillBlock({each:each},$ctx1,1)})}));
$12=_st(anObject)._class();
$ctx1.sendIdx["class"]=2;
$11=_st($12)._asString();
$ctx1.sendIdx["asString"]=2;
$10=_st($11).__eq("Dictionary");
$ctx1.sendIdx["="]=1;
if(smalltalk.assert($10)){
$14=_st(anObject)._size();
$ctx1.sendIdx["size"]=1;
$13=_st($14).__eq((0));
$ctx1.sendIdx["="]=2;
if(! smalltalk.assert($13)){
$15=_st(json).__comma(", ");
$ctx1.sendIdx[","]=8;
$16=self._collectionAsString_(anObject);
$ctx1.sendIdx["collectionAsString:"]=1;
json=_st($15).__comma($16);
$ctx1.sendIdx[","]=7;
json;
};
};
$19=_st(anObject)._class();
$ctx1.sendIdx["class"]=3;
$18=_st($19)._asString();
$ctx1.sendIdx["asString"]=3;
$17=_st($18).__eq("Array");
$ctx1.sendIdx["="]=3;
if(smalltalk.assert($17)){
$21=_st(anObject)._size();
$ctx1.sendIdx["size"]=2;
$20=_st($21).__eq((0));
$ctx1.sendIdx["="]=4;
if(! smalltalk.assert($20)){
$22=_st(json).__comma(",  ");
$ctx1.sendIdx[","]=10;
$23=self._collectionAsString_(anObject);
$ctx1.sendIdx["collectionAsString:"]=2;
json=_st($22).__comma($23);
$ctx1.sendIdx[","]=9;
json;
};
};
$24=_st(_st(_st(anObject)._class())._asString()).__eq("String");
$ctx1.sendIdx["="]=5;
if(smalltalk.assert($24)){
$25=_st(_st(anObject)._size()).__eq((0));
if(! smalltalk.assert($25)){
$26=_st(json).__comma(", ");
$ctx1.sendIdx[","]=12;
json=_st($26).__comma(self._collectionAsString_(anObject));
$ctx1.sendIdx[","]=11;
json;
};
};
json=_st(json).__comma("}");
$27=json;
return $27;
}, function($ctx1) {$ctx1.fill(self,"objectAsString:",{anObject:anObject,json:json},globals.AmberSessionObjects.klass)})},
args: ["anObject"],
source: "objectAsString: anObject\x0a\x09\x22Convert object = anObject to json\x22\x0a\x09| json |\x0a\x09self session appendObject: anObject.\x0a\x09json := '{ '.\x0a\x09json := json, ( self concreteObjectAsString: anObject ). \x0a\x09anObject class allInstanceVariableNames do: [:each |\x0a\x09\x09json := json, ', \x22' , each asString,'\x22: { ' , ( self concreteObjectAsString: ( anObject instVarAt: each)) , '}' ].\x0a\x0a\x09anObject class asString = 'Dictionary' ifTrue: [\x0a\x09\x09anObject size = 0 ifFalse: [\x0a\x09\x09json := json, ', ', ( self collectionAsString: anObject ) ]\x0a\x09].\x0a\x09anObject class asString = 'Array' ifTrue: [\x0a\x09\x09anObject size = 0 ifFalse: [\x0a\x09\x09json := json, ',  ', ( self collectionAsString: anObject ) ]\x0a\x09].\x0a\x09anObject class asString = 'String' ifTrue: [\x0a\x09\x09anObject size = 0 ifFalse: [\x0a\x09\x09json := json, ', ', ( self collectionAsString: anObject ) ]\x0a\x09].\x0a\x09json := json, '}'.\x0a\x09^json",
messageSends: ["appendObject:", "session", ",", "concreteObjectAsString:", "do:", "allInstanceVariableNames", "class", "asString", "instVarAt:", "ifTrue:", "=", "ifFalse:", "size", "collectionAsString:"],
referencedClasses: []
}),
globals.AmberSessionObjects.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "session",
protocol: 'converting',
fn: function (){
var self=this;
function $AmberSessionObjects(){return globals.AmberSessionObjects||(typeof AmberSessionObjects=="undefined"?nil:AmberSessionObjects)}
return smalltalk.withContext(function($ctx1) { 
var $1,$2,$receiver;
$1=self["@session"];
if(($receiver = $1) == null || $receiver.isNil){
self["@session"]=_st($AmberSessionObjects())._new();
self["@session"];
} else {
$1;
};
$2=self["@session"];
return $2;
}, function($ctx1) {$ctx1.fill(self,"session",{},globals.AmberSessionObjects.klass)})},
args: [],
source: "session\x0a\x09\x22Returns AmberSessionObjects object, that holds all used objects with their id`s\x22\x0a\x09session ifNil: [ session := AmberSessionObjects new ].\x0a\x09^session",
messageSends: ["ifNil:", "new"],
referencedClasses: ["AmberSessionObjects"]
}),
globals.AmberSessionObjects.klass);


smalltalk.addClass('AmberUndefinedObject', globals.Object, ['instance'], 'AmberRemoteDeveloping');
globals.AmberUndefinedObject.comment="Representation of nil object";
smalltalk.addMethod(
smalltalk.method({
selector: "instance",
protocol: 'not yet classified',
fn: function (){
var self=this;
return nil;
},
args: [],
source: "instance\x0a\x09^nil",
messageSends: [],
referencedClasses: []
}),
globals.AmberUndefinedObject);


});
