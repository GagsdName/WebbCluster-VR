function foo()
{
 loadJSON(function(response) {
	 var check = response[6];
  // Parse JSON string into object
    var JSONString = JSON.stringify(response);
	var parse = JSON.parse(JSONString);
	JSONString = JSONString.replace(/\r?\n|\r/g, '"');
	
 });
 function loadJSON(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', './src/data/visible.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }
}