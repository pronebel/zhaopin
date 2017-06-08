let resume = {
	userinfo: {
		name: '',
		email: '',
		sex: '',
		degree: '',
		city: '',
		telephone: '',
		birthday: '',
		avatarUrl: ''
	},
	educations: [{
		graduation_year: '',
		school: '',
		degree: '',
		major: ''
	}],
	interships: [{
		start_date: '',
		end_date: '',
		company: '',
		job: '',
		description: '',
	}],
	projects: [{
		start_date: '',
		end_date: '',
		name: '',
		duty: '',
		description: ''
	}],
	honors: [{
		date: '',
		prize: '',
		name: ''
	}],
	hope: {
		job: '',
		type: '',
		city: '',
		salary: '',
		otherDescription: ''
	},
	selfAssessment: '',
}

let input = 'phone13728738411    性别男    sex女    出生2017-12-11    出 生年月2017-12-22    birthday2017-12    123城 市深圳     城市：深 圳     acity广州     123姓  名 ： 林卓彦\r\n name : 林锐       姓名无 谓      姓 名无谓    电子邮箱670390939@qq.com     邮 箱：670390939@qq.com    email 670350939@qq.com'
input = input.replace(/\n|\r\n/, '    ') //去掉回车换行符
let regEmail = /(email\s*)|(\邮\s*\箱\s*)(\：*|\:*)/ //匹配邮箱
let regName = /(\姓\s*\名\s*)|(name\s*)(\：*|\:*)/ //匹配姓名
let regCity = /(\城\s*\市\s*)|(city\s*)(\：*|\:*)/ //匹配城市
let regBirth = /(\出\s*\生\s*\日\s*\期\s*)|(\出\s*\生\s*\年\s*\月\s*)|(\出\s*\生\s*)|(birthday\s*)|(birth\s*)(\：*|\:*)/
let regDegree = /(\学\s*\历\s*)|(degree\s*)(\：*|\:*)/ //匹配学位
let regSex = /(\性\s*\别\s*)|(sex\s*)(\：*|\:*)/ //匹配性别
let regPhone = /(\联\s*\系\s*\方\s*\式\s*)|(\联\s*\系\s*\电\s*\话\s*)|(\手\s*\机\s*\号\s*\码\s*)|(\电\s*\话\s*\号\s*\码\s*)|(\手\s*\机\s*)|(phone\s*)(\：*|\:*)/


console.log(input.split(/\s{4,}/))
input.split(/\s{4,}/).forEach(val => {
	if (regName.test(val)) {
		let start = val.indexOf(val.match(regName)[0][0]);
		console.log(val.substring(start + val.match(regName)[0].length).replace(/\s/, '').replace(/\:|\：|\,/, ''));
	}
	if (regEmail.test(val)) {
		let start = val.indexOf(val.match(regEmail)[0][0]);
		console.log(val.substring(start + val.match(regEmail)[0].length).replace(/\s/, '').replace(/\:|\：|\,/, ''));
	}
	if (regCity.test(val)) {
		let start = val.indexOf(val.match(regCity)[0][0]);
		console.log(val.substring(start + val.match(regCity)[0].length).replace(/\s/, '').replace(/\:|\：|\,/, ''));
	}
	if (regBirth.test(val)) {
		let start = val.indexOf(val.match(regBirth)[0][0]);
		console.log(val.substring(start + val.match(regBirth)[0].length).replace(/\s/, '').replace(/\:|\：|\,/, ''));
	}
	if (regSex.test(val)) {
		let start = val.indexOf(val.match(regSex)[0][0]);
		console.log(val.substring(start + val.match(regSex)[0].length).replace(/\s/, '').replace(/\:|\：|\,/, ''));
	}
	if (regPhone.test(val)) {
		let start = val.indexOf(val.match(regPhone)[0][0]);
		console.log(val.substring(start + val.match(regPhone)[0].length).replace(/\s/, '').replace(/\:|\：|\,/, ''));
	}
})


// for (let i = 0; i < regName.length; i++) {
// 	if (regName[i].test(input)) {
// 		console.log(input.substring(input.match(regName[i])[0].length).replace(/\s/, ''));
// 		break;
// 	}
// }