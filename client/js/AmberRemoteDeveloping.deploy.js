smalltalk.addPackage('AmberRemoteDeveloping');
smalltalk.addClass('AmberRemoteConnector', smalltalk.Object, ['socket'], 'AmberRemoteDeveloping');
smalltalk.addMethod(
"_createSocket_",
smalltalk.method({
selector: "createSocket:",
fn: function (aBlock){
var self=this;
return smalltalk.withContext(function($ctx1) { self["@socket"]=_st((smalltalk.NativeFunction || NativeFunction))._constructor_value_("WebSocket","ws://localhost:9090/broadcast");
_st(self["@socket"])._onopen_((function(){
return smalltalk.withContext(function($ctx2) {_st(self["@socket"])._send_("register#defaultConnection");
return _st(window)._alert_("Connection opened");
}, function($ctx2) {$ctx2.fillBlock({},$ctx1)})}));
_st(self["@socket"])._onmessage_(aBlock);
_st(self["@socket"])._onclose_((function(){
return smalltalk.withContext(function($ctx2) {return _st(self)._createSocket_(aBlock);
}, function($ctx2) {$ctx2.fillBlock({},$ctx1)})}));
return self}, function($ctx1) {$ctx1.fill(self,"createSocket:",{aBlock:aBlock},smalltalk.AmberRemoteConnector)})},
messageSends: ["constructor:value:", "onopen:", "send:", "alert:", "onmessage:", "onclose:", "createSocket:"]}),
smalltalk.AmberRemoteConnector);

smalltalk.addMethod(
"_socket",
smalltalk.method({
selector: "socket",
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { var $1;
$1=self["@socket"];
return $1;
}, function($ctx1) {$ctx1.fill(self,"socket",{},smalltalk.AmberRemoteConnector)})},
messageSends: []}),
smalltalk.AmberRemoteConnector);



smalltalk.addClass('AmberRemoteDevelopingClient', smalltalk.Object, ['client'], 'AmberRemoteDeveloping');
smalltalk.addMethod(
"_answerWithObject_",
smalltalk.method({
selector: "answerWithObject:",
fn: function (aString){
var self=this;
var object;
return smalltalk.withContext(function($ctx1) { var $1;
object=_st(_st((smalltalk.AmberSessionObjects || AmberSessionObjects))._session())._objectAt_(aString);
$1=object;
if(($receiver = $1) == nil || $receiver == undefined){
_st(self)._sendReply_withString_("object#","nil");
} else {
_st(self)._sendReply_withString_("object#",_st((smalltalk.AmberSessionObjects || AmberSessionObjects))._objectAsString_(object));
};
return self}, function($ctx1) {$ctx1.fill(self,"answerWithObject:",{aString:aString,object:object},smalltalk.AmberRemoteDevelopingClient)})},
messageSends: ["objectAt:", "session", "ifNil:ifNotNil:", "sendReply:withString:", "objectAsString:"]}),
smalltalk.AmberRemoteDevelopingClient);

smalltalk.addMethod(
"_createDefaultConnection",
smalltalk.method({
selector: "createDefaultConnection",
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { self["@client"]=_st(_st((smalltalk.AmberRemoteConnector || AmberRemoteConnector))._new())._createSocket_((function(evt){
return smalltalk.withContext(function($ctx2) {return _st(self)._processMessage_(_st(evt)._data());
}, function($ctx2) {$ctx2.fillBlock({evt:evt},$ctx1)})}));
return self}, function($ctx1) {$ctx1.fill(self,"createDefaultConnection",{},smalltalk.AmberRemoteDevelopingClient)})},
messageSends: ["createSocket:", "processMessage:", "data", "new"]}),
smalltalk.AmberRemoteDevelopingClient);

smalltalk.addMethod(
"_evaluateString_",
smalltalk.method({
selector: "evaluateString:",
fn: function (aString){
var self=this;
var result;
return smalltalk.withContext(function($ctx1) { var $1;
result=_st(_st((smalltalk.Compiler || Compiler))._new())._evaluateExpression_(aString);
_st(_st((smalltalk.AmberSessionObjects || AmberSessionObjects))._session())._appendObject_(result);
$1=result;
return $1;
}, function($ctx1) {$ctx1.fill(self,"evaluateString:",{aString:aString,result:result},smalltalk.AmberRemoteDevelopingClient)})},
messageSends: ["evaluateExpression:", "new", "appendObject:", "session"]}),
smalltalk.AmberRemoteDevelopingClient);

smalltalk.addMethod(
"_inspectObject_",
smalltalk.method({
selector: "inspectObject:",
fn: function (anObject){
var self=this;
return smalltalk.withContext(function($ctx1) { _st(self)._sendReply_withString_("inspectResult#",_st(_st(anObject)._identityHash())._asString());
return self}, function($ctx1) {$ctx1.fill(self,"inspectObject:",{anObject:anObject},smalltalk.AmberRemoteDevelopingClient)})},
messageSends: ["sendReply:withString:", "asString", "identityHash"]}),
smalltalk.AmberRemoteDevelopingClient);

smalltalk.addMethod(
"_printObject_",
smalltalk.method({
selector: "printObject:",
fn: function (anObject){
var self=this;
return smalltalk.withContext(function($ctx1) { _st(self)._sendReply_withString_("printResult#",_st(anObject)._printString());
return self}, function($ctx1) {$ctx1.fill(self,"printObject:",{anObject:anObject},smalltalk.AmberRemoteDevelopingClient)})},
messageSends: ["sendReply:withString:", "printString"]}),
smalltalk.AmberRemoteDevelopingClient);

smalltalk.addMethod(
"_processMessage_",
smalltalk.method({
selector: "processMessage:",
fn: function (aMessage){
var self=this;
return smalltalk.withContext(function($ctx1) { var $1,$2,$3,$4;
_st(self)._showMessage_(aMessage);
$1=_st(aMessage)._match_("doIt#");
if(smalltalk.assert($1)){
_st(self)._evaluateString_(_st(aMessage)._replace_with_("doIt#",""));
};
$2=_st(aMessage)._match_("printIt#");
if(smalltalk.assert($2)){
_st(self)._printObject_(_st(self)._evaluateString_(_st(aMessage)._replace_with_("printIt#","")));
};
$3=_st(aMessage)._match_("inspectIt#");
if(smalltalk.assert($3)){
_st(self)._inspectObject_(_st(self)._evaluateString_(_st(aMessage)._replace_with_("inspectIt#","")));
};
$4=_st(aMessage)._match_("object#");
if(smalltalk.assert($4)){
_st(self)._answerWithObject_(_st(aMessage)._replace_with_("object#",""));
};
return self}, function($ctx1) {$ctx1.fill(self,"processMessage:",{aMessage:aMessage},smalltalk.AmberRemoteDevelopingClient)})},
messageSends: ["showMessage:", "ifTrue:", "evaluateString:", "replace:with:", "match:", "printObject:", "inspectObject:", "answerWithObject:"]}),
smalltalk.AmberRemoteDevelopingClient);

smalltalk.addMethod(
"_sendReply_withString_",
smalltalk.method({
selector: "sendReply:withString:",
fn: function (aHeader,aString){
var self=this;
return smalltalk.withContext(function($ctx1) { var $1;
$1=_st(self["@client"])._socket();
if(($receiver = $1) == nil || $receiver == undefined){
$1;
} else {
_st(_st(self["@client"])._socket())._send_(_st(aHeader).__comma(aString));
};
return self}, function($ctx1) {$ctx1.fill(self,"sendReply:withString:",{aHeader:aHeader,aString:aString},smalltalk.AmberRemoteDevelopingClient)})},
messageSends: ["ifNotNil:", "send:", ",", "socket"]}),
smalltalk.AmberRemoteDevelopingClient);

smalltalk.addMethod(
"_showMessage_",
smalltalk.method({
selector: "showMessage:",
fn: function (aMessage){
var self=this;
var div;
return smalltalk.withContext(function($ctx1) { var $1;
div=_st(document)._getElementById_("messagesField");
$1=div;
if(($receiver = $1) == nil || $receiver == undefined){
$1;
} else {
_st(div)._innerHTML_(_st(_st(_st(div)._innerHTML()).__comma(aMessage)).__comma(_st((smalltalk.String || String))._cr()));
};
return self}, function($ctx1) {$ctx1.fill(self,"showMessage:",{aMessage:aMessage,div:div},smalltalk.AmberRemoteDevelopingClient)})},
messageSends: ["getElementById:", "ifNotNil:", "innerHTML:", ",", "cr", "innerHTML"]}),
smalltalk.AmberRemoteDevelopingClient);



smalltalk.addClass('AmberSessionObjects', smalltalk.Dictionary, [], 'AmberRemoteDeveloping');
smalltalk.addMethod(
"_appendObject_",
smalltalk.method({
selector: "appendObject:",
fn: function (anObject){
var self=this;
var hash;
return smalltalk.withContext(function($ctx1) { hash=_st(_st(anObject)._identityHash())._asString();
_st(self)._at_put_(hash,anObject);
return self}, function($ctx1) {$ctx1.fill(self,"appendObject:",{anObject:anObject,hash:hash},smalltalk.AmberSessionObjects)})},
messageSends: ["asString", "identityHash", "at:put:"]}),
smalltalk.AmberSessionObjects);

smalltalk.addMethod(
"_objectAt_",
smalltalk.method({
selector: "objectAt:",
fn: function (aHash){
var self=this;
return smalltalk.withContext(function($ctx1) { var $1;
$1=_st(self)._at_ifPresent_ifAbsent_(_st(aHash)._asString(),(function(){
return smalltalk.withContext(function($ctx2) {return _st(self)._at_(_st(aHash)._asString());
}, function($ctx2) {$ctx2.fillBlock({},$ctx1)})}),(function(){
return smalltalk.withContext(function($ctx2) {return nil;
}, function($ctx2) {$ctx2.fillBlock({},$ctx1)})}));
return $1;
}, function($ctx1) {$ctx1.fill(self,"objectAt:",{aHash:aHash},smalltalk.AmberSessionObjects)})},
messageSends: ["at:ifPresent:ifAbsent:", "asString", "at:"]}),
smalltalk.AmberSessionObjects);


smalltalk.AmberSessionObjects.klass.iVarNames = ['session'];
smalltalk.addMethod(
"_collectionAsString_",
smalltalk.method({
selector: "collectionAsString:",
fn: function (aCollection){
var self=this;
var json;
return smalltalk.withContext(function($ctx1) { var $1;
json="[ ";
_st(aCollection)._do_((function(each){
return smalltalk.withContext(function($ctx2) {json=_st(_st(_st(json).__comma("{ ")).__comma(_st(self)._concreteObjectAsString_(each))).__comma("},");
return json;
}, function($ctx2) {$ctx2.fillBlock({each:each},$ctx1)})}));
json=_st(json).__comma("#");
json=_st(json)._replace_with_(",#"," ]");
$1=json;
return $1;
}, function($ctx1) {$ctx1.fill(self,"collectionAsString:",{aCollection:aCollection,json:json},smalltalk.AmberSessionObjects.klass)})},
messageSends: ["do:", ",", "concreteObjectAsString:", "replace:with:"]}),
smalltalk.AmberSessionObjects.klass);

smalltalk.addMethod(
"_concreteObjectAsString_",
smalltalk.method({
selector: "concreteObjectAsString:",
fn: function (anObject){
var self=this;
return smalltalk.withContext(function($ctx1) { var $1;
_st(_st(self)._session())._appendObject_(anObject);
$1=_st(_st(_st(_st(_st(_st(_st(_st(_st("\x22objectId\x22: \x22").__comma(_st(_st(anObject)._identityHash())._asString())).__comma("\x22, \x22class\x22: ")).__comma("\x22")).__comma(_st(_st(anObject)._class())._asString())).__comma("\x22")).__comma(", \x22printString\x22: ")).__comma("\x22")).__comma(_st(anObject)._printString())).__comma("\x22");
return $1;
}, function($ctx1) {$ctx1.fill(self,"concreteObjectAsString:",{anObject:anObject},smalltalk.AmberSessionObjects.klass)})},
messageSends: ["appendObject:", "session", ",", "printString", "asString", "class", "identityHash"]}),
smalltalk.AmberSessionObjects.klass);

smalltalk.addMethod(
"_objectAsString_",
smalltalk.method({
selector: "objectAsString:",
fn: function (anObject){
var self=this;
var json;
return smalltalk.withContext(function($ctx1) { var $1,$2,$3,$4;
_st(_st(self)._session())._appendObject_(anObject);
json="{ ";
json=_st(json).__comma(_st(self)._concreteObjectAsString_(anObject));
_st(_st(_st(anObject)._class())._allInstanceVariableNames())._do_((function(each){
return smalltalk.withContext(function($ctx2) {json=_st(_st(_st(_st(_st(json).__comma(", \x22")).__comma(_st(each)._asString())).__comma("\x22: { ")).__comma(_st(self)._concreteObjectAsString_(_st(anObject)._instVarAt_(each)))).__comma("}");
return json;
}, function($ctx2) {$ctx2.fillBlock({each:each},$ctx1)})}));
$1=_st(_st(_st(anObject)._class())._asString()).__eq("Dictionary");
if(smalltalk.assert($1)){
json=_st(_st(json).__comma(", \x22content\x22: ")).__comma(_st(self)._collectionAsString_(anObject));
json;
};
$2=_st(_st(_st(anObject)._class())._asString()).__eq("Array");
if(smalltalk.assert($2)){
json=_st(_st(json).__comma(", \x22content\x22: ")).__comma(_st(self)._collectionAsString_(anObject));
json;
};
$3=_st(_st(_st(anObject)._class())._asString()).__eq("String");
if(smalltalk.assert($3)){
json=_st(_st(json).__comma(", \x22content\x22: ")).__comma(_st(self)._collectionAsString_(anObject));
json;
};
json=_st(json).__comma("}");
$4=json;
return $4;
}, function($ctx1) {$ctx1.fill(self,"objectAsString:",{anObject:anObject,json:json},smalltalk.AmberSessionObjects.klass)})},
messageSends: ["appendObject:", "session", ",", "concreteObjectAsString:", "do:", "instVarAt:", "asString", "allInstanceVariableNames", "class", "ifTrue:", "collectionAsString:", "="]}),
smalltalk.AmberSessionObjects.klass);

smalltalk.addMethod(
"_session",
smalltalk.method({
selector: "session",
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { var $1,$2;
$1=self["@session"];
if(($receiver = $1) == nil || $receiver == undefined){
self["@session"]=_st((smalltalk.AmberSessionObjects || AmberSessionObjects))._new();
self["@session"];
} else {
$1;
};
$2=self["@session"];
return $2;
}, function($ctx1) {$ctx1.fill(self,"session",{},smalltalk.AmberSessionObjects.klass)})},
messageSends: ["ifNil:", "new"]}),
smalltalk.AmberSessionObjects.klass);


