Smalltalk current createPackage: 'AmberRemoteDeveloping'!
Object subclass: #AmberRemoteConnector
	instanceVariableNames: 'socket'
	package: 'AmberRemoteDeveloping'!
!AmberRemoteConnector commentStamp!
This class represents connection made with WebSocket technology.!

!AmberRemoteConnector methodsFor: 'accessing'!

socket
	"Returns socket variable"
	^socket
! !

!AmberRemoteConnector methodsFor: 'creating'!

createSocket: aBlock
		"Creating client websocket and register the connection on server"
		"Note: after disconnecting from server client will try to reconnect as many times, as possible :)"
		socket := NativeFunction constructor: 'WebSocket' value: 'ws://localhost:9090/broadcast'.
		socket onopen: [ socket send: 'register#defaultConnection'. window alert: 'Connection opened'. ].
		socket onmessage: aBlock.
		socket onclose: [ self createSocket: aBlock ].
! !

Object subclass: #AmberRemoteDevelopingClient
	instanceVariableNames: 'client'
	package: 'AmberRemoteDeveloping'!
!AmberRemoteDevelopingClient commentStamp!
This class represents an Amber client, that allows user to work with amber using Pharo IDE with workspace and inspector. (Class browser and debugger in future)!

!AmberRemoteDevelopingClient methodsFor: 'connection'!

answerWithObject: aString
	"Answer Pharo with JSON-representation of object with id = aString in session dictionary"
	| object |
	object := AmberSessionObjects session objectAt: aString.
	self sendReply: 'object#' withString: ( AmberSessionObjects objectAsString: object )
!

createDefaultConnection
	"Creating default connection with AmberRemoteConnector'"
	client := ( AmberRemoteConnector new ) createSocket: [ :evt | self processMessage: ( evt data ) ].
!

processMessage: aMessage
	| object |
	"Parsing incoming messages and processing them"
	self showMessage: aMessage.
	
	[ (aMessage match: 'doIt#')  
		ifTrue: [ 
			object := self evaluateString: (aMessage replace: 'doIt#' with: '').
			AmberSessionObjects session appendObject: object] .
    (aMessage match: 'printIt#')  
		ifTrue: [ 
			object :=  self evaluateString: (aMessage replace: 'printIt#' with: '').
			self printObject: object.
			AmberSessionObjects session appendObject: object].
	(aMessage match: 'inspectIt#')  
		ifTrue: [ 
			object := self evaluateString: ( aMessage replace: 'inspectIt#' with: '').
			self inspectObject: object.
			AmberSessionObjects session appendObject: object].
	(aMessage match: 'object#')
		ifTrue:[
			self answerWithObject: (aMessage replace: 'object#' with: '') ] ] on: Error do: [ : ex | self throwError: ex  ]
!

sendReply: aHeader withString: aString
	"Send answer to Pharo with header = aHeader and message = aString"
	client socket ifNotNil: [
		client socket send: ( aHeader, aString ) ]
! !

!AmberRemoteDevelopingClient methodsFor: 'errors'!

throwError: error
	"Throws an error while processing message"
	self sendReply: 'error#' withString: (  error messageText ).
! !

!AmberRemoteDevelopingClient methodsFor: 'evaluating'!

evaluateString: aString
	"Evaluating message = aString and returning result of this operation. Also generated object will be available in session dictionary"
	| result |
	^( Compiler new evaluateExpression: aString )
! !

!AmberRemoteDevelopingClient methodsFor: 'inspecting'!

inspectObject: anObject
	"Return the unique identificator of inspected object, which is also available in session dictionary"
	self sendReply: 'inspectResult#' withString: ( anObject identityHash asString).
! !

!AmberRemoteDevelopingClient methodsFor: 'printing'!

printObject: anObject
	"Sending answer to Pharo after request 'printIt' command"
	self sendReply: 'printResult#' withString:( anObject printString )
!

showMessage: aMessage
	"Displays message aMessage on HTML page"
	|div|
	div := document getElementById: 'messagesField'.
	div ifNotNil: [ div innerHTML: (div innerHTML), aMessage, String cr].
! !

Dictionary subclass: #AmberSessionObjects
	instanceVariableNames: ''
	package: 'AmberRemoteDeveloping'!
!AmberSessionObjects commentStamp!
This dictionary represents map (Unique id --> anObject)
Using this dictionary Pharo can take object by id using AmberObjectMirror on Pharo side!

!AmberSessionObjects methodsFor: 'accessors'!

appendObject: anObject
	"Adding object = anObject to dictionary"
	| hash |
	hash := anObject identityHash asString.
	Transcript show: hash; cr.
	self at: hash put: anObject.
!

objectAt: aHash
	"Returns object with id = aHash, otherwise returns nill"
	"abc"
	^self at: ( aHash asString ) ifPresent: [ self at: ( aHash asString) ] ifAbsent: [ AmberUndefinedObject new ]
! !

AmberSessionObjects class instanceVariableNames: 'session'!

!AmberSessionObjects class methodsFor: 'converting'!

collectionAsString: aCollection
	"Converting collection to json "
	| json |
	json := ''.
	aCollection withIndexDo: [:each :index |
		json := json, (index == 1 ifFalse: [' , '] ifTrue: [' ']),  '"', index printString , '" : ', '{ ', ( self concreteObjectAsString: each ) , '}' ].
	^json
!

concreteObjectAsString: anObject
	"Converting concrete object to json. Also try to add this object to session dictionary (because all objects which id`s we sent to Pharo must be available in sesion dictionary)"
	self session appendObject: anObject.
	^'"objectId": "' , anObject identityHash asString, '", "class": ', '"' ,anObject class asString, '"' , ', "printString": ', '"' , anObject printString , '"'.
!

objectAsString: anObject
	"Convert object = anObject to json"
	| json |
	self session appendObject: anObject.
	json := '{ '.
	json := json, ( self concreteObjectAsString: anObject ). 
	anObject class allInstanceVariableNames do: [:each |
		json := json, ', "' , each asString,'": { ' , ( self concreteObjectAsString: ( anObject instVarAt: each)) , '}' ].
	
	anObject class asString = 'Dictionary' ifTrue: [
		json := json, ', ', ( self collectionAsString: anObject ).
	].
	anObject class asString = 'Array' ifTrue: [
		json := json, ', ', ( self collectionAsString: anObject ).
	].
	anObject class asString = 'String' ifTrue: [
		json := json, ', ', ( self collectionAsString: anObject ).
	].
	json := json, '}'.
	^json
!

session
	"Returns AmberSessionObjects object, that holds all used objects with their id`s"
	session ifNil: [ session := AmberSessionObjects new ].
	^session
! !

Object subclass: #AmberUndefinedObject
	instanceVariableNames: 'instance'
	package: 'AmberRemoteDeveloping'!
!AmberUndefinedObject commentStamp!
Representation of nil object!

!AmberUndefinedObject methodsFor: 'not yet classified'!

instance
	^nil
! !

