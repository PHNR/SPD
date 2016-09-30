
function prototypeClone(obj){
	function Clone(){}
	Clone.prototype = obj;
	var o = new Clone();
	for(var a in o){
		if(typeof o[a] == "object") {
			o[a] = arguments.callee(o[a]);
		}
	}
	return o;
}

function constructorClone(obj) {
	var o;
	if(obj.constructor == Object) {
		o = new obj.constructor();
	} else {
		o = new obj.constructor(obj.valueOf());
	}
	for(var key in obj) {
		if(o[key] != obj[key]) {
			if(typeof(obj[key]) == 'object') {
				o[key] = arguments.callee(obj[key]);
			} else {
				o[key] = obj[key];
			}
		}
	}
	o.toString = obj.toString;
	o.valueOf  = obj.valueOf;
	return o;
}
function caseClone(obj) {
	var o, undefined;
	switch(typeof obj) {
		case 'undefined':
			//noinspection JSUnusedAssignment
			o = undefined;
			break;
		case 'string'   :
			o = obj + '';
			break;
		case 'number'   :
			o = obj - 0;
			break;
		case 'boolean'  :
			o = !!obj;
			break;
		case 'object'   :
			if(obj === null) {
				o = null;
			} else {
				if(obj instanceof Array) {
					o = [];
					for(var i = 0, len = obj.length; i < len; i++) {
						o.push(arguments.callee(obj[i]));
					}
				} else {
					o = {};
					for(var k in obj) {
						o[k] = arguments.callee(obj[k]);
					}
				}
			}
			break;
		default:
			o = obj;
			break;
	}
	return o;
}