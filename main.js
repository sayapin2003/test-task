var myMap
		var groups = [
        {
            name: "",
            style: "islands#redIcon",
            items: [
                {
                    center: [50.426472, 30.563022],
                    name: "Монумент &quot;Родина-Мать&quot;",
                    hintContent:"подсказка",
                    balloonContent:"Балун"
                }
            ]},
    ];
    	ymaps.ready(init);
function init() {
    myMap = new ymaps.Map('map', {
            center: [50.426472, 30.563022],
            zoom: 9
        })
        
    for (var i = 0, l = groups.length; i < l; i++) {
        createMenuGroup(groups[i]);
    }

    function createMenuGroup (group) {
        for(i=0;i<group.items.length;i++){
        	var myPlacemark = new ymaps.Placemark(group.items[i].center,groups[i].items[i]);
			myMap.geoObjects.add(myPlacemark);
		}
    }  
}
var q = 0
$('#add').click(function(event){
	//document.getElementById('name').value
	$('#ul-list').append("<li id='"+q+"'>"+document.getElementById('name').value+"<button id='x"+q+"' onclick='x("+q+")'>X</button></li>")
	q++
	//myMap.geoObjects.add(s(document.getElementById('name').value));

})
function x(id){
$("li#"+id).hide()
}
function s (searchObj) {
	var firstGeoObject
	 ymaps.geocode(searchObj, {
        boundedBy: myMap.getBounds(),
        results: 1
    }).then(function (res) {
            firstGeoObject = res.geoObjects.get(0),
                coords = firstGeoObject.geometry.getCoordinates(),
            firstGeoObject.options.set('preset', 'islands#darkBlueDotIconWithCaption');
            firstGeoObject.properties.set('iconCaption', firstGeoObject.getAddressLine());
            myMap.geoObjects.add(firstGeoObject);
        });
    return firstGeoObject
}