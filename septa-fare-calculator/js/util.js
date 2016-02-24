/**
 * Created by Brendan on 2/23/2016.
 */
var utilJS = {
    getObjects: function getObjects(obj, key, val) {
                    var objects = [];
                    for (var i in obj) {
                        if (!obj.hasOwnProperty(i)) continue;
                        if (typeof obj[i] == 'object') {
                            objects = objects.concat(getObjects(obj[i], key, val));
                        } else if (i == key && obj[key] == val) {
                            objects.push(obj);
                        }
                    }
                    return objects;
                },
    formatCurrency: function formatCurrency(value){
                        return '$' + parseFloat(value, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString();
                    }
};