const app = {
	init() {
		console.log('loaded')
		window.api = '7e42e974-b3bc-11eb-8089-0200cd936042'
		app.otp.askPhone()
	},
	otp: {
		template(data) {
			window.input.value = ''
			window.title.innerHTML = data[0]
			window.content.innerHTML = data[1]
			window.input.className = data[2]
			window.input.maxLength = data[3]
			window.button.innerHTML = data[4]
			window.button.onclick = function () {
				eval(data[5])
			}
			window.input.focus()
		},
		askPhone() {
			app.otp.template([
				'Enter Mobile Number',
				'We will send an OTP to your mobile number.',
				'phone',
				10,
				'SEND OTP',
				'app.otp.askOTP()',
			])
		},
		askOTP() {
			window.number = window.input.value
			fetch(
				`https://2factor.in/API/V1/${window.api}/SMS/${window.number}/AUTOGEN`
			)
				.then((res) => res.json())
				.then((data) => {
					console.log(data)
					window.details = data.Details
				})
			app.otp.template([
				'Verification Code',
				`Please enter the OTP we sent to your number : <span>${window.number}<span>`,
				'otp',
				6,
				'VERIFY',
				'app.otp.verify()',
			])
		},
		verify() {
			fetch(
				`https://2factor.in/API/V1/${window.api}/SMS/VERIFY/${window.details}/${window.input.value}`
			)
				.then((res) => res.json())
				.then((data) => {
					if (data.Status === 'Success') {
						alert('CORRECT !!!')
						app.otp.askPhone()
					} else {
						alert('INCORRECT!! Try again')
						window.input.value = ''
						window.input.focus()
					}
				})
		},
	},
}

document.addEventListener('DOMContentLoaded', (e) => {
	app.init()
})
