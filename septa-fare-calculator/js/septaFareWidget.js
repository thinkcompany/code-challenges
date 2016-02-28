$.ajax({
	url: 'fares.json',
	dataType: 'json',
	success(data) {
		console.log(data)
	},
	error(data) {
		console.log(data)
	}
});