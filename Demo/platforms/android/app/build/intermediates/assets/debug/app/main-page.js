var createViewModel = require("./main-view-model").createViewModel;

function onNavigatingTo(args) {
    var page = args.object;
    page.bindingContext = createViewModel();
}
exports.onNavigatingTo = onNavigatingTo;

var observableModule = require("data/observable");

var observableArray = require("data/observable-array");
var images = new observableArray.ObservableArray([]);
var pageData = new observableModule.Observable();

var http = require("http");


var api_key = 'd9b7ac93c6e47d51b6f3a2d4bd011e04';


function pageLoaded(args) {
    var page = args.object;
    pageData.set("images", images);
    page.bindingContext = pageData;
}
exports.pageLoaded = pageLoaded;

exports.signin = function() {

	while(images.length>0){
		images.pop();
	}

	http.getJSON("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key="+api_key+"&text="+pageData.get('txtKeyword')+"&format=json&nojsoncallback=1&per_page=5").then(function (r) {
    // Argument (r) is JSON!

	    var imgUrl = '';

	    var photoList = r.photos.photo;

	    for(var i=0;i<photoList.length;i++){
	    	imgUrl = "https://farm"+photoList[i].farm+".staticflickr.com/"+photoList[i].server+"/"+photoList[i].id+"_"+photoList[i].secret+".jpg";

	    	images.push({ img: imgUrl });

	    }

	}, function (e) {
	    // Argument (e) is Error!
	    console.log('error');
	    console.log(e);

	});

};