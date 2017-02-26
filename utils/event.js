/**
 * event.js
 * 用于微信小程序跨页面通讯
 * @date 2017-02-24
 * @author linrui
 */
var events = {};

/**
 * [on description] 
 * @param  {[type]}   name     [description]  event name
 * @param  {[type]}   self     [description]  the obj when event execute
 * @param  {Function} callback [description]  callback function
 * @return {[type]}            [description]
 */
function on(name, self, callback) {
	var tuple = {
		'self': self,
		callback: callback
	};
	var tuples = events[name] || [];
	tuples.push(tuple);
	events[name] = tuples;
}

/**
 * [emit description] 
 * @param  {[type]} name [description]  event name
 * @param  {[type]} data [description]  the callback props
 * @return {[type]}      [description]  
 */
function emit(name, data) {
	var tuples = events[name] || [];
	tuples.map((tuple) => {
		var _this = tuple['self'];
		var callback = tuple['callback'];
		callback.call(_this, data);
	})
}

/**
 * [remove description] remove event listener
 * @param  {[type]} name [description]  event name
 * @param  {[type]} self [description]  the obj when event execute
 * @return {[type]}      [description]
 */
function remove(name, self) {
	var tuples = events[name] || [];
	events[name] = tuples.filter((tuple) => {
		return tuple['self'] != self;
	})
}

module.exports = {
	on: on,
	emit: emit,
	remove: remove
}