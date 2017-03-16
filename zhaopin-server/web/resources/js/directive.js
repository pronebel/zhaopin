/**
 * @author Administrator
 *
 * 2016年12月23日
 */

Vue.directive('sdown', {
	bind:function(){
		console.log('31');
		$('#chatlist').scrollTop( $('#chatlist')[0].scrollHeight );
	}
})
