smalltalk.addPackage('AmberRemoteDeveloping');
smalltalk.addClass('AmberRemoteConnector', smalltalk.Object, ['socket'], 'AmberRemoteDeveloping');
smalltalk.AmberRemoteConnector.comment="This class represents connection made with WebSocket technology."
smalltalk.addMethod(
"_createSocket_",
smalltalk.method({
selector: "createSocket:",
category: 'creating',
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
args: ["aBlock"],
source: "createSocket: aBlock\x0a\x09\x09\x22Creating client websocket and register the connection on server\x22\x0a\x09\x09\x22Note: after disconnecting from server client will try to reconnect as many times, as possible :)\x22\x0a\x09\x09socket := NativeFunction constructor: 'WebSocket' value: 'ws://localhost:9090/broadcast'.\x0a\x09\x09socket onopen: [ socket send: 'register#defaultConnection'. window alert: 'Connection opened'. ].\x0a\x09\x09socket onmessage: aBlock.\x0a\x09\x09socket onclose: [ self createSocket: aBlock ].",
messageSends: ["constructor:value:", "onopen:", "send:", "alert:", "onmessage:", "onclose:", "createSocket:"],
referencedClasses: ["NativeFunction"]
}),
smalltalk.AmberRemoteConnector);

smalltalk.addMethod(
"_socket",
smalltalk.method({
selector: "socket",
category: 'accessing',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { var $1;
$1=self["@socket"];
return $1;
}, function($ctx1) {$ctx1.fill(self,"socket",{},smalltalk.AmberRemoteConnector)})},
args: [],
source: "socket\x0a\x09\x22Returns socket variable\x22\x0a\x09^socket",
messageSends: [],
referencedClasses: []
}),
smalltalk.AmberRemoteConnector);



smalltalk.addClass('AmberRemoteDevelopingClient', smalltalk.Object, ['client'], 'AmberRemoteDeveloping');
smalltalk.AmberRemoteDevelopingClient.comment="This class represents an Amber client, that allows user to work with amber using Pharo IDE with workspace and inspector. (Class browser and debugger in future)"
smalltalk.addMethod(
"_answerWithObject_",
smalltalk.method({
selector: "answerWithObject:",
category: 'connection',
fn: function (aString){
var self=this;
var object;
return smalltalk.withContext(function($ctx1) { object=_st(_st((smalltalk.AmberSessionObjects || AmberSessionObjects))._session())._objectAt_(aString);
_st(self)._sendReply_withString_("object#",_st((smalltalk.AmberSessionObjects || AmberSessionObjects))._objectAsString_(object));
return self}, function($ctx1) {$ctx1.fill(self,"answerWithObject:",{aString:aString,object:object},smalltalk.AmberRemoteDevelopingClient)})},
args: ["aString"],
source: "answerWithObject: aString\x0a\x09\x22Answer Pharo with JSON-representation of object with id = aString in session dictionary\x22\x0a\x09| object |\x0a\x09object := AmberSessionObjects session objectAt: aString.\x0a\x09self sendReply: 'object#' withString: ( AmberSessionObjects objectAsString: object )",
messageSends: ["objectAt:", "session", "sendReply:withString:", "objectAsString:"],
referencedClasses: ["AmberSessionObjects"]
}),
smalltalk.AmberRemoteDevelopingClient);

smalltalk.addMethod(
"_createDefaultConnection",
smalltalk.method({
selector: "createDefaultConnection",
category: 'connection',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { self["@client"]=_st(_st((smalltalk.AmberRemoteConnector || AmberRemoteConnector))._new())._createSocket_((function(evt){
return smalltalk.withContext(function($ctx2) {return _st(self)._processMessage_(_st(evt)._data());
}, function($ctx2) {$ctx2.fillBlock({evt:evt},$ctx1)})}));
return self}, function($ctx1) {$ctx1.fill(self,"createDefaultConnection",{},smalltalk.AmberRemoteDevelopingClient)})},
args: [],
source: "createDefaultConnection\x0a\x09\x22Creating default connection with AmberRemoteConnector'\x22\x0a\x09client := ( AmberRemoteConnector new ) createSocket: [ :evt | self processMessage: ( evt data ) ].",
messageSends: ["createSocket:", "processMessage:", "data", "new"],
referencedClasses: ["AmberRemoteConnector"]
}),
smalltalk.AmberRemoteDevelopingClient);

smalltalk.addMethod(
"_evaluateString_",
smalltalk.method({
selector: "evaluateString:",
category: 'evaluating',
fn: function (aString){
var self=this;
var result;
return smalltalk.withContext(function($ctx1) { var $1;
$1=_st(_st((smalltalk.Compiler || Compiler))._new())._evaluateExpression_(aString);
return $1;
}, function($ctx1) {$ctx1.fill(self,"evaluateString:",{aString:aString,result:result},smalltalk.AmberRemoteDevelopingClient)})},
args: ["aString"],
source: "evaluateString: aString\x0a\x09\x22Evaluating message = aString and returning result of this operation. Also generated object will be available in session dictionary\x22\x0a\x09| result |\x0a\x09^( Compiler new evaluateExpression: aString )",
messageSends: ["evaluateExpression:", "new"],
referencedClasses: ["Compiler"]
}),
smalltalk.AmberRemoteDevelopingClient);

smalltalk.addMethod(
"_inspectObject_",
smalltalk.method({
selector: "inspectObject:",
category: 'inspecting',
fn: function (anObject){
var self=this;
return smalltalk.withContext(function($ctx1) { _st(self)._sendReply_withString_("inspectResult#",_st(_st(anObject)._identityHash())._asString());
return self}, function($ctx1) {$ctx1.fill(self,"inspectObject:",{anObject:anObject},smalltalk.AmberRemoteDevelopingClient)})},
args: ["anObject"],
source: "inspectObject: anObject\x0a\x09\x22Return the unique identificator of inspected object, which is also available in session dictionary\x22\x0a\x09self sendReply: 'inspectResult#' withString: ( anObject identityHash asString).",
messageSends: ["sendReply:withString:", "asString", "identityHash"],
referencedClasses: []
}),
smalltalk.AmberRemoteDevelopingClient);

smalltalk.addMethod(
"_printObject_",
smalltalk.method({
selector: "printObject:",
category: 'printing',
fn: function (anObject){
var self=this;
return smalltalk.withContext(function($ctx1) { _st(self)._sendReply_withString_("printResult#",_st(anObject)._printString());
return self}, function($ctx1) {$ctx1.fill(self,"printObject:",{anObject:anObject},smalltalk.AmberRemoteDevelopingClient)})},
args: ["anObject"],
source: "printObject: anObject\x0a\x09\x22Sending answer to Pharo after request 'printIt' command\x22\x0a\x09self sendReply: 'printResult#' withString:( anObject printString )",
messageSends: ["sendReply:withString:", "printString"],
referencedClasses: []
}),
smalltalk.AmberRemoteDevelopingClient);

smalltalk.addMethod(
"_processMessage_",
smalltalk.method({
selector: "processMessage:",
category: 'connection',
fn: function (aMessage){
var self=this;
var object;
return smalltalk.withContext(function($ctx1) { var $1,$2,$3,$4;
_st(self)._showMessage_(aMessage);
_st((function(){
return smalltalk.withContext(function($ctx2) {$1=_st(aMessage)._match_("doIt#");
if(smalltalk.assert($1)){
object=_st(self)._evaluateString_(_st(aMessage)._replace_with_("doIt#",""));
object;
_st(_st((smalltalk.AmberSessionObjects || AmberSessionObjects))._session())._appendObject_(object);
};
$2=_st(aMessage)._match_("printIt#");
if(smalltalk.assert($2)){
object=_st(self)._evaluateString_(_st(aMessage)._replace_with_("printIt#",""));
object;
_st(self)._printObject_(object);
_st(_st((smalltalk.AmberSessionObjects || AmberSessionObjects))._session())._appendObject_(object);
};
$3=_st(aMessage)._match_("inspectIt#");
if(smalltalk.assert($3)){
object=_st(self)._evaluateString_(_st(aMessage)._replace_with_("inspectIt#",""));
object;
_st(self)._inspectObject_(object);
_st(_st((smalltalk.AmberSessionObjects || AmberSessionObjects))._session())._appendObject_(object);
};
$4=_st(aMessage)._match_("object#");
if(smalltalk.assert($4)){
return _st(self)._answerWithObject_(_st(aMessage)._replace_with_("object#",""));
};
}, function($ctx2) {$ctx2.fillBlock({},$ctx1)})}))._on_do_((smalltalk.Error || Error),(function(ex){
return smalltalk.withContext(function($ctx2) {return _st(self)._throwError_(ex);
}, function($ctx2) {$ctx2.fillBlock({ex:ex},$ctx1)})}));
return self}, function($ctx1) {$ctx1.fill(self,"processMessage:",{aMessage:aMessage,object:object},smalltalk.AmberRemoteDevelopingClient)})},
args: ["aMessage"],
source: "processMessage: aMessage\x0a\x09| object |\x0a\x09\x22Parsing incoming messages and processing them\x22\x0a\x09self showMessage: aMessage.\x0a\x09\x0a\x09[ (aMessage match: 'doIt#')  \x0a\x09\x09ifTrue: [ \x0a\x09\x09\x09object := self evaluateString: (aMessage replace: 'doIt#' with: '').\x0a\x09\x09\x09AmberSessionObjects session appendObject: object] .\x0a    (aMessage match: 'printIt#')  \x0a\x09\x09ifTrue: [ \x0a\x09\x09\x09object :=  self evaluateString: (aMessage replace: 'printIt#' with: '').\x0a\x09\x09\x09self printObject: object.\x0a\x09\x09\x09AmberSessionObjects session appendObject: object].\x0a\x09(aMessage match: 'inspectIt#')  \x0a\x09\x09ifTrue: [ \x0a\x09\x09\x09object := self evaluateString: ( aMessage replace: 'inspectIt#' with: '').\x0a\x09\x09\x09self inspectObject: object.\x0a\x09\x09\x09AmberSessionObjects session appendObject: object].\x0a\x09(aMessage match: 'object#')\x0a\x09\x09ifTrue:[\x0a\x09\x09\x09self answerWithObject: (aMessage replace: 'object#' with: '') ] ] on: Error do: [ : ex | self throwError: ex  ]",
messageSends: ["showMessage:", "on:do:", "throwError:", "ifTrue:", "evaluateString:", "replace:with:", "appendObject:", "session", "match:", "printObject:", "inspectObject:", "answerWithObject:"],
referencedClasses: ["Error", "AmberSessionObjects"]
}),
smalltalk.AmberRemoteDevelopingClient);

smalltalk.addMethod(
"_sendReply_withString_",
smalltalk.method({
selector: "sendReply:withString:",
category: 'connection',
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
args: ["aHeader", "aString"],
source: "sendReply: aHeader withString: aString\x0a\x09\x22Send answer to Pharo with header = aHeader and message = aString\x22\x0a\x09client socket ifNotNil: [\x0a\x09\x09client socket send: ( aHeader, aString ) ]",
messageSends: ["ifNotNil:", "send:", ",", "socket"],
referencedClasses: []
}),
smalltalk.AmberRemoteDevelopingClient);

smalltalk.addMethod(
"_showMessage_",
smalltalk.method({
selector: "showMessage:",
category: 'printing',
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
args: ["aMessage"],
source: "showMessage: aMessage\x0a\x09\x22Displays message aMessage on HTML page\x22\x0a\x09|div|\x0a\x09div := document getElementById: 'messagesField'.\x0a\x09div ifNotNil: [ div innerHTML: (div innerHTML), aMessage, String cr].",
messageSends: ["getElementById:", "ifNotNil:", "innerHTML:", ",", "cr", "innerHTML"],
referencedClasses: ["String"]
}),
smalltalk.AmberRemoteDevelopingClient);

smalltalk.addMethod(
"_throwError_",
smalltalk.method({
selector: "throwError:",
category: 'errors',
fn: function (error){
var self=this;
return smalltalk.withContext(function($ctx1) { _st(self)._sendReply_withString_("error#",_st(error)._messageText());
return self}, function($ctx1) {$ctx1.fill(self,"throwError:",{error:error},smalltalk.AmberRemoteDevelopingClient)})},
args: ["error"],
source: "throwError: error\x0a\x09\x22Throws an error while processing message\x22\x0a\x09self sendReply: 'error#' withString: (  error messageText ).",
messageSends: ["sendReply:withString:", "messageText"],
referencedClasses: []
}),
smalltalk.AmberRemoteDevelopingClient);



smalltalk.addClass('AmberSessionObjects', smalltalk.Dictionary, [], 'AmberRemoteDeveloping');
smalltalk.AmberSessionObjects.comment="This dictionary represents map (Unique id --> anObject)\x0aUsing this dictionary Pharo can take object by id using AmberObjectMirror on Pharo side"
smalltalk.addMethod(
"_appendObject_",
smalltalk.method({
selector: "appendObject:",
category: 'accessors',
fn: function (anObject){
var self=this;
var hash;
return smalltalk.withContext(function($ctx1) { var $1,$2;
hash=_st(_st(anObject)._identityHash())._asString();
$1=(smalltalk.Transcript || Transcript);
_st($1)._show_(hash);
$2=_st($1)._cr();
_st(self)._at_put_(hash,anObject);
return self}, function($ctx1) {$ctx1.fill(self,"appendObject:",{anObject:anObject,hash:hash},smalltalk.AmberSessionObjects)})},
args: ["anObject"],
source: "appendObject: anObject\x0a\x09\x22Adding object = anObject to dictionary\x22\x0a\x09| hash |\x0a\x09hash := anObject identityHash asString.\x0a\x09Transcript show: hash; cr.\x0a\x09self at: hash put: anObject.",
messageSends: ["asString", "identityHash", "show:", "cr", "at:put:"],
referencedClasses: ["Transcript"]
}),
smalltalk.AmberSessionObjects);

smalltalk.addMethod(
"_objectAt_",
smalltalk.method({
selector: "objectAt:",
category: 'accessors',
fn: function (aHash){
var self=this;
return smalltalk.withContext(function($ctx1) { var $1;
$1=_st(self)._at_ifPresent_ifAbsent_(_st(aHash)._asString(),(function(){
return smalltalk.withContext(function($ctx2) {return _st(self)._at_(_st(aHash)._asString());
}, function($ctx2) {$ctx2.fillBlock({},$ctx1)})}),(function(){
return smalltalk.withContext(function($ctx2) {return _st((smalltalk.AmberUndefinedObject || AmberUndefinedObject))._new();
}, function($ctx2) {$ctx2.fillBlock({},$ctx1)})}));
return $1;
}, function($ctx1) {$ctx1.fill(self,"objectAt:",{aHash:aHash},smalltalk.AmberSessionObjects)})},
args: ["aHash"],
source: "objectAt: aHash\x0a\x09\x22Returns object with id = aHash, otherwise returns nill\x22\x0a\x09\x22abc\x22\x0a\x09^self at: ( aHash asString ) ifPresent: [ self at: ( aHash asString) ] ifAbsent: [ AmberUndefinedObject new ]",
messageSends: ["at:ifPresent:ifAbsent:", "asString", "at:", "new"],
referencedClasses: ["AmberUndefinedObject"]
}),
smalltalk.AmberSessionObjects);


smalltalk.AmberSessionObjects.klass.iVarNames = ['session'];
smalltalk.addMethod(
"_collectionAsString_",
smalltalk.method({
selector: "collectionAsString:",
category: 'converting',
fn: function (aCollection){
var self=this;
var json;
return smalltalk.withContext(function($ctx1) { var $7,$9,$8,$6,$5,$4,$3,$2,$1,$10;
json="";
_st(aCollection)._withIndexDo_((function(each,index){
return smalltalk.withContext(function($ctx2) {$7=json;
$9=_st(index).__eq_eq((1));
if(smalltalk.assert($9)){
$8=" ";
} else {
$8=" , ";
};
$6=_st($7).__comma($8);
$5=_st($6).__comma("\x22");
$4=_st($5).__comma(_st(index)._printString());
$3=_st($4).__comma("\x22 : ");
$2=_st($3).__comma("{ ");
$1=_st($2).__comma(_st(self)._concreteObjectAsString_(each));
json=_st($1).__comma("}");
return json;
}, function($ctx2) {$ctx2.fillBlock({each:each,index:index},$ctx1)})}));
$10=json;
return $10;
}, function($ctx1) {$ctx1.fill(self,"collectionAsString:",{aCollection:aCollection,json:json},smalltalk.AmberSessionObjects.klass)})},
args: ["aCollection"],
source: "collectionAsString: aCollection\x0a\x09\x22Converting collection to json \x22\x0a\x09\x09| json |\x0a\x09json := ''.\x0a\x09aCollection withIndexDo: [:each :index |\x0a\x09\x09json := json, (index == 1 ifFalse: [' , '] ifTrue: [' ']),  '\x22', index printString , '\x22 : ', '{ ', ( self concreteObjectAsString: each ) , '}' ].\x0a\x09^json",
messageSends: ["withIndexDo:", ",", "concreteObjectAsString:", "printString", "ifFalse:ifTrue:", "=="],
referencedClasses: []
}),
smalltalk.AmberSessionObjects.klass);

smalltalk.addMethod(
"_concreteObjectAsString_",
smalltalk.method({
selector: "concreteObjectAsString:",
category: 'converting',
fn: function (anObject){
var self=this;
return smalltalk.withContext(function($ctx1) { var $1;
_st(_st(self)._session())._appendObject_(anObject);
$1=_st(_st(_st(_st(_st(_st(_st(_st(_st("\x22objectId\x22: \x22").__comma(_st(_st(anObject)._identityHash())._asString())).__comma("\x22, \x22class\x22: ")).__comma("\x22")).__comma(_st(_st(anObject)._class())._asString())).__comma("\x22")).__comma(", \x22printString\x22: ")).__comma("\x22")).__comma(_st(anObject)._printString())).__comma("\x22");
return $1;
}, function($ctx1) {$ctx1.fill(self,"concreteObjectAsString:",{anObject:anObject},smalltalk.AmberSessionObjects.klass)})},
args: ["anObject"],
source: "concreteObjectAsString: anObject\x0a\x09\x22Converting concrete object to json. Also try to add this object to session dictionary (because all objects which id`s we sent to Pharo must be available in sesion dictionary)\x22\x0a\x09self session appendObject: anObject.\x0a\x09^'\x22objectId\x22: \x22' , anObject identityHash asString, '\x22, \x22class\x22: ', '\x22' ,anObject class asString, '\x22' , ', \x22printString\x22: ', '\x22' , anObject printString , '\x22'.",
messageSends: ["appendObject:", "session", ",", "printString", "asString", "class", "identityHash"],
referencedClasses: []
}),
smalltalk.AmberSessionObjects.klass);

smalltalk.addMethod(
"_objectAsString_",
smalltalk.method({
selector: "objectAsString:",
category: 'converting',
fn: function (anObject){
var self=this;
var json;
return smalltalk.withContext(function($ctx1) { var $1,$2,$3,$4,$5,$6,$7;
_st(_st(self)._session())._appendObject_(anObject);
json="{ ";
json=_st(json).__comma(_st(self)._concreteObjectAsString_(anObject));
_st(_st(_st(anObject)._class())._allInstanceVariableNames())._do_((function(each){
return smalltalk.withContext(function($ctx2) {json=_st(_st(_st(_st(_st(json).__comma(", \x22")).__comma(_st(each)._asString())).__comma("\x22: { ")).__comma(_st(self)._concreteObjectAsString_(_st(anObject)._instVarAt_(each)))).__comma("}");
return json;
}, function($ctx2) {$ctx2.fillBlock({each:each},$ctx1)})}));
$1=_st(_st(_st(anObject)._class())._asString()).__eq("Dictionary");
if(smalltalk.assert($1)){
$2=_st(_st(anObject)._size()).__eq((0));
if(! smalltalk.assert($2)){
json=_st(_st(json).__comma(", ")).__comma(_st(self)._collectionAsString_(anObject));
json;
};
};
$3=_st(_st(_st(anObject)._class())._asString()).__eq("Array");
if(smalltalk.assert($3)){
$4=_st(_st(anObject)._size()).__eq((0));
if(! smalltalk.assert($4)){
json=_st(_st(json).__comma(",  ")).__comma(_st(self)._collectionAsString_(anObject));
json;
};
};
$5=_st(_st(_st(anObject)._class())._asString()).__eq("String");
if(smalltalk.assert($5)){
$6=_st(_st(anObject)._size()).__eq((0));
if(! smalltalk.assert($6)){
json=_st(_st(json).__comma(", ")).__comma(_st(self)._collectionAsString_(anObject));
json;
};
};
json=_st(json).__comma("}");
$7=json;
return $7;
}, function($ctx1) {$ctx1.fill(self,"objectAsString:",{anObject:anObject,json:json},smalltalk.AmberSessionObjects.klass)})},
args: ["anObject"],
source: "objectAsString: anObject\x0a\x09\x22Convert object = anObject to json\x22\x0a\x09| json |\x0a\x09self session appendObject: anObject.\x0a\x09json := '{ '.\x0a\x09json := json, ( self concreteObjectAsString: anObject ). \x0a\x09anObject class allInstanceVariableNames do: [:each |\x0a\x09\x09json := json, ', \x22' , each asString,'\x22: { ' , ( self concreteObjectAsString: ( anObject instVarAt: each)) , '}' ].\x0a\x09\x0a\x09anObject class asString = 'Dictionary' ifTrue: [\x0a\x09\x09anObject size = 0 ifFalse: [\x0a\x09\x09json := json, ', ', ( self collectionAsString: anObject ) ]\x0a\x09].\x0a\x09anObject class asString = 'Array' ifTrue: [\x0a\x09\x09anObject size = 0 ifFalse: [\x0a\x09\x09json := json, ',  ', ( self collectionAsString: anObject ) ]\x0a\x09].\x0a\x09anObject class asString = 'String' ifTrue: [\x0a\x09\x09anObject size = 0 ifFalse: [\x0a\x09\x09json := json, ', ', ( self collectionAsString: anObject ) ]\x0a\x09].\x0a\x09json := json, '}'.\x0a\x09^json",
messageSends: ["appendObject:", "session", ",", "concreteObjectAsString:", "do:", "instVarAt:", "asString", "allInstanceVariableNames", "class", "ifTrue:", "ifFalse:", "collectionAsString:", "=", "size"],
referencedClasses: []
}),
smalltalk.AmberSessionObjects.klass);

smalltalk.addMethod(
"_session",
smalltalk.method({
selector: "session",
category: 'converting',
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
args: [],
source: "session\x0a\x09\x22Returns AmberSessionObjects object, that holds all used objects with their id`s\x22\x0a\x09session ifNil: [ session := AmberSessionObjects new ].\x0a\x09^session",
messageSends: ["ifNil:", "new"],
referencedClasses: ["AmberSessionObjects"]
}),
smalltalk.AmberSessionObjects.klass);


smalltalk.addClass('AmberUndefinedObject', smalltalk.Object, ['instance'], 'AmberRemoteDeveloping');
smalltalk.AmberUndefinedObject.comment="Representation of nil object"
smalltalk.addMethod(
"_instance",
smalltalk.method({
selector: "instance",
category: 'not yet classified',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { return nil;
}, function($ctx1) {$ctx1.fill(self,"instance",{},smalltalk.AmberUndefinedObject)})},
args: [],
source: "instance\x0a\x09^nil",
messageSends: [],
referencedClasses: []
}),
smalltalk.AmberUndefinedObject);



