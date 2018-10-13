import jp from 'jsonpath'

//The should probably be reformatted to remove the underscores and such but time was not permitting
export function getZoneOptions(data){
    return jp.query(data, '$.zones')[0].map(function(zone) { return { value: zone.zone, label: zone.name }});
};

export function getRidingOptions(data){
    return jp.query(data, '$.zones[0].fares[*].type').filter(filterUnique).map(function(type) { return { value: type, label: type }});
};

function filterUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

export function getRadioValues(data, selectedTime){
   return jp.query(data, `$.zones[0].fares[?(@.type=="${selectedTime.value}")].purchase`).filter(filterUnique);
}