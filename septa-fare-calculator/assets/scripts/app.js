var $select = $('#zone');

$.getJSON('fares.json', function(data){
	//console.log(data);
	$select.html('');
	
	for (i = 0; i < data['zones'].length; i++) {
		$select.append('<option id="' + data['zones'][i]['name'] + '">' + data['zones'][i]['name'] + '</option>');
	}
});