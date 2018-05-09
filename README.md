# Introducing NativeScript
NativeScript is an open source framework for building native iOS and Android apps using JavaScript and CSS. NativeScript renders UIs with the native platform’s rendering engine—no WebViews—resulting in native-like performance and UX.

## Prerequisites
This guide assumes that you have some basic knowledge of JavaScript, CSS, and your development machine’s terminal. More specifically:

- **JavaScript**: You should know basic JavaScript concepts, such as how functions, if statements, and loops work.
- **CSS**: You should know how to write simple CSS selectors, and know how to apply CSS rules as name/value pairs.
- **The terminal**: You should know how to open a terminal or command-line prompt on your development machine, how to change directories, and how to execute commands.
- **A text editor or IDE**: You should know the basics of your text editor or IDE of choice. You can use any text editor to build NativeScript apps.

## Installation
In order to start this tutorial you need to have the NativeScript CLI (command-line interface) installed on your development machine

- **Step 1 : Install Node.js**
    - The NativeScript CLI is built on Node.js, and as such you need to have Node.js installed to use NativeScript.
    - To check whether you have Node.js installed, open a terminal or command prompt and execute node --version. If there is an error, head to https://nodejs.org/ and download and install the latest “LTS” (long-term support) distribution and restart your terminal or command prompt.

- **Step 2: Install the NativeScript CLI**
    - Open your terminal or command prompt and execute the following command to install the NativeScript CLI from npm, which is the Node.js package manager:

        ```
        sudo npm install -g nativescript
        ```
        After completing the setup there should be two commands available on the terminal/command prompt: **tns** (short for Telerik NativeScript) and **nativescript**. The two commands are identical, so we'll stick with the shorter tns.

        Verify that the installation was successful by running tns in the terminal. You should see a long list of commands that starts with this section:

        ![alt text](https://raw.githubusercontent.com/sudoalgorithm/Introducing-NativeScript/master/assets/Screen%20Shot%202018-04-30%20at%2012.28.17%20PM.png)
- **Step 3: Install iOS and Android requirements**
    - NativeScript builds truly native iOS and Android apps, and as such, each target platform needs setting up on the development machine. To ease the pain of installing all of these requirements manually, the tns command provides quick-start scripts for Windows and macOS. Let’s look at how they work.

    ## Windows

    #### Setup

    If running OS is Windows; copy and paste the script below into your command prompt as an administrator and press Enter:
    Note:- Please be sure that you run this command in cmd as an administator (Windows key > type "cmd" > right click > Run as Administrator).
    ```
    @powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((new-object net.webclient).DownloadString('https://www.nativescript.org/setup/win'))"
    ```
    During installation you may need to accept a User Account Control prompt to grant the script administrative privileges. Also, be aware that the script downloads and installs some big dependencies—so it’s common for the script to take a while to complete. When the script finishes, close and reopen your command prompt.

    After the installation the system setup should have:

    - The latest stable official release of Node.js (LTS) 6.x
    - Google Chrome
    - JDK 8
    - Android SDK 22 or a later stable official release
    - Android Support Repository
    - Google Repository
    - Android SDK Build-tools 25.0.2 or a later stable official release
    - Android Studio
    - Set up Android virtual devices to expand your testing options

    The two environment variables JAVA_HOME and ANDROID_HOME are required for Android development, which should have been automatically added as part of the installation

    ## macOS

    If OS is a Mac, copy and paste the script below into your terminal and press Enter:

    ```
    sudo ruby -e "$(curl -fsSL https://www.nativescript.org/setup/mac)"
    ```
    ![alt text](https://raw.githubusercontent.com/sudoalgorithm/Introducing-NativeScript/master/assets/Screen%20Shot%202018-04-30%20at%2012.44.18%20PM.png)

- **Step 4: Verify the setup**

    - To verify the setup, run the **tns doctor** command which will check for any issues with the installation. If you see “No issues were detected” you’re good to go!

## Creating An Image Search Application

In this tutorial we will create a simple app that searches for images on flickr and displays the results. We will make use of the flicker developer API to search images.

| Android  | iOS |
| ------------- | ------------- |
| ![alt text](https://raw.github.ibm.com/Kunal-Malhotra1/Introducing-NativeScript/master/assets/Screen%20Shot%202018-05-02%20at%2010.23.51%20PM.png?token=AAH1NCCwOlob8vacuGStqwXG-8lVEHTwks5a8z1KwA%3D%3D)| ![alt text](https://raw.github.ibm.com/Kunal-Malhotra1/Introducing-NativeScript/master/assets/Screen%20Shot%202018-05-02%20at%2010.24.11%20PM.png?token=AAH1NH4AKzWB20M2xqasoEVpOYJTQLkIks5a8z1iwA%3D%3D)  |


### Getting Started

- **Step 1: Start by executing the following command to create a new NativeScript project:**
    ```
    tns create <app-name> --appid "<com.yourname.appname>"
    ```
    **app-name** is the name of the project, and **com.yourname.appname** is the unique app ID. This will be used later on to identify your app once you submit it to the Play or App Store. By default, the **tns** create command will create the following folders and files for you:

   - app
   - node_modules
   - platforms
   - package.json

    You'll typically only have to touch the files inside the app directory. But there are also instances where you might need to edit files inside the platforms/android directory. One such case is when a plugin that you're trying to use doesn't automatically link the dependencies and assets that it needs.

    Next, navigate to the app directory and delete all files except the App_Resources folder. Then create the following files:

    - app.js
    - app.css
    - main-page.js
    - main-page.xml
    - main-view-model.js
    - bundle-config.js
    - package.json

    These are the files that will be used by the NativeScript runtime. Just like when building web pages, .css files are used for styling, and .js files for functionality. But for the markup of the app, we use XML instead of HTML. Usually you would create a separate folder for each screen of the app (e.g. login, sign up, or dashboard) and have XML, CSS, and JavaScript files inside each folder. But since this app has only one screen, we created all the files inside the root directory.

- **Step 2: Navigate to the project directory and add the mobile development platform.**

    ### For Android
    ```
    tns platform add android
    ```
    ### For iOS
    ```
    tns platform add ios
    ```
- **Step 3: Run the application on the android emulator.**

     ### For Android
    ```
    tns run android
    ```
    ### For iOS
    ```
    tns run ios
    ```

### Designing the app

Let’s start by designing the app using XML. Open **main-page.xml** and look at the default code. Remove everything except the page tag. The Page tag has an attribute called loaded which executes the pageLoaded function once the app loads. The pageLoaded function is inside the main-page.js file.

This project will use a stack layout to design our app. There are a number of layouts offered by native script.

Inside the **Page tag** add the **Stack layout**.

```
<StackLayout orientation="vertical">

</StackLayout>
```

Define the stack layout with a **vertical orientation**. Add a search text box and button inside the stack layout.

```
<TextField text="{{txtKeyword}}"  hint="What's On Your" id="txtKeyword" />

<Button text="Search" id="btnSearch" tap="signin"/>
```

### Fetching data from flickr

Add an attribute called tap to the search button.


Now, when the user taps the search button the signin function is called. Let’s define the signin function inside main-page.js.

```
tap="search"
```

To use flickr’s developer APIs you will need a free account on flickr. Request an API key to make API requests.

In main-page.js define the API key.

```
var api_key = "replace_with_you_api_key"
```

Calling the API will require the http module, so import the module into main-page.js.

```
var http = require("http");
```

Inside the signin function, and using the http module, now make the API call.

```
http.getJSON("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + api_key + "&text=hello&format=json&nojsoncallback=1&per_page=5").then(function(r) {

    console.log(JSON.stringify(r));

}, function(e) {

    console.log(e);

});
```

The code above makes the API call with the search text hard coded for now, this will become dynamic later in the tutorial.

When running an app in the emulator you will need to run ‘adb logcat’ to check log messages.

Save changes and run the app on the emulator. Click the search button and the returned result from Flickr should be visible in terminal.

Next create the image url using the response returned and push the URL to the images array.

An observable array is required to create and detect changes to a collection of things. Bind this same observable array to the view so that the view updates whenever a change occurs.

To create the observable array, add these variable declarations to main-page.js :

```
var observableArray = require("data/observable-array");
var images = new observableArray.ObservableArray([]);
```

Based on the response returned from the API request, the next task is to create the flickr image URL.

Next, we iterate through the returned data, create the image URLs and push to the images array. Add this code inside the signin function.

```
var imgUrl = '';

var photoList = r.photos.photo;

for (var i = 0; i < photoList.length; i++) {
    imgUrl = "https://farm" + photoList[i].farm + ".staticflickr.com/" + photoList[i].server + "/" + photoList[i].id + "_" + photoList[i].secret + ".jpg";

    images.push({
        img: imgUrl
    });

}
```

### Binding data to the UI

Once the data is in the images array, bind it to the UI. For displaying the data, create a ListView in main-page.xml, underneath the existing Button element.

```
<ListView>
    <ListView.itemTemplate>

        <Image stretch="fill" id="imgList" />

    </ListView.itemTemplate>
</ListView>
```
Bind the images array to the list view and set the source of the image.

```
<ListView items="{{ images }}">
    <ListView.itemTemplate>

        <Image stretch="fill" height="200px" src="{{img}}" />

    </ListView.itemTemplate>
</ListView>
```

For the images array to be available across the view, set the images array in the observable module. Do this by importing an observable module and using it to create an observable object.

```
var observableModule = require("data/observable");
var pageData = new observableModule.Observable();
```

In the pageLoaded function, set the images array to the observable module and add the observable module to the page context.

```
function pageLoaded(args) {
    var page = args.object;
    pageData.set("images", images);
    page.bindingContext = pageData;
}
```

Using the same pageData observable object, the values from the search text box are readable. Modify the text field to add the text attribute.

```
<TextField width="300px" text="{{txtKeyword}}"  hint="search keyword"/>
```

Inside the signin function, remove the hard coded hello search text and replace it with:

```
pageData.get('txtKeyword')
```

Save changes and run the app on the emulator. Click on the search button and images received from the Flickr API should be viewable








