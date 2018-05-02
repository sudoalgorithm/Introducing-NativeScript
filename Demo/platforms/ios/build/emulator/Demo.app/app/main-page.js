/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

/*
NativeScript adheres to the CommonJS specification for dealing with
JavaScript modules. The CommonJS require() function is how you import
JavaScript modules defined in other files.
*/
var createViewModel = require("./main-view-model").createViewModel;

function onNavigatingTo(args) {
    /*
    This gets a reference this page’s <Page> UI component. You can
    view the API reference of the Page to see what’s available at
    https://docs.nativescript.org/api-reference/classes/_ui_page_.page.html
    */
    var page = args.object;

    /*
    A page’s bindingContext is an object that should be used to perform
    data binding between XML markup and JavaScript code. Properties
    on the bindingContext can be accessed using the {{ }} syntax in XML.
    In this example, the {{ message }} and {{ onTap }} bindings are resolved
    against the object returned by createViewModel().

    You can learn more about data binding in NativeScript at
    https://docs.nativescript.org/core-concepts/data-binding.
    */
    page.bindingContext = createViewModel();
}

/*
Exporting a function in a NativeScript code-behind file makes it accessible
to the file’s corresponding XML file. In this case, exporting the onNavigatingTo
function here makes the navigatingTo="onNavigatingTo" binding in this page’s XML
file work.
*/
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