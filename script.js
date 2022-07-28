/*
This is your site JavaScript code - you can add interactivity and carry out processing
- Initially the JS writes a message to the console, and moves a button you can add from the README
*/
var AT_url = "https://api.airtable.com/v0/appSfzhC5ABBvTp2O/RC_data"
var AT_key = "api_key=keySsUNwZfQgXnsjZ"
var SUMMARY_QUERY = "fields%5B%5D=Name&fields%5B%5D=Photo&fields%5B%5D=Address&fields%5B%5D=Number&fields%5B%5D=Website&fields%5B%5D=Desc&fields%5B%5D=AcceptedDevices&fields%5B%5D=methods&fields%5B%5D=Appointments?";

function getBSC() {
  var eWRC_Element = document.getElementById("RC center");

  fetch(`${AT_url}?${AT_key}&${SUMMARY_QUERY}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // response is an object w/ .records array

      eWRC_Element.innerHTML = ""; // clear student

      var newHtml = "";

      for (var i = 0; i < data.records.length; i++) {
        var name = data.records[i].fields["Name"];
        var photo = data.records[i].fields["Photo"];
        var address = data.records[i].fields["Address"];
        
      /*  var num = data.records[i].fields["Number"];
        var link = data.records[i].fields["Website"];
        var desc = data.records[i].fields["Desc"];
        var aD = data.records[i].fields["AcceptedDevices"]
        var methods = data.records[i].fields["methods"];
        var appt = data.records[i].fields["Appointment?"];
        */

        newHtml += `
        
          <div class="col-md-4 cardImageText">
          <div class="card" >
            
              ${photo ? `<img class="head" src="${photo[0].url}">` : ``}
            

            <div class="card-body">
              <p class="card-text card-key">${name}</p>
              <p class="card-text card-key">${address}</p>
              
             <a class="btn btn-primary" 
                href="index.html?id=${data.records[i].id}"
                target="_blank">More Info</a>
            </div>
          </div>
        </div>
        
        `;
      }
    
    

       eWRC_Element.innerHTML = newHtml;
    });
}

// edit below
function fetchSingleRC(rcId) {
  var eWRC_Element = document.getElementById("RC center");

  fetch(`${AT_url}/${rcId}?${SUMMARY_QUERY}`)
    .then(response => response.json())
    .then(data => {
      console.log(data); // response is a single object

      var photo = data.fields["Photo"];
      var name = data.fields["Name"];
      var info = data.fields["Information"];
      var num = data.fields["Number"];
      var link = data.fields["Website"];
      var desc = data.fields["Desc"];
      var aD = data.fields["AcceptedDevices"]
      var methods = data.fields["methods"];
      var appt = data.fields["Appointment?"];
 
      /*var colorsHtml = "";
      if ("AcceptedDevices" in data.fields) {
        colorsHtml += "<ul>";
        var aD = data.fields["AcceptedDevices"].split(", ");
        for (var i = 0; i < aD.length; i++) {
          colorsHtml += `<li>${aD[i]}</li>`;
        }
        colorsHtml += "</ul>";
      }
      */

      var newHtml = `
        <div class="col-9">
          <div class="card">
            <h4 class="card-title">${name}</h4> 
            <h5>Description</h5>
            <p>${desc}</p>
            <h5>Information</h5>
            <p>${info}</p>
            <h5>Phone</h5>
            <p>${num}</p>
            <h5>Website</h5>
            <p>${link}</p>
            <h5>Description</h5>
            <p>${desc}</p>
            
            
          </div>
        </div>
        <div class="col">
          <img src="${photo}" alt="picture of a ${name} recycling center">
        </div>
      `;

      eWRC_Element.innerHTML = newHtml;
    });
}
//edit above

var idParams = window.location.search.split("?id=");
if (idParams.length >= 2) {
  // has at least ["id?", "OUR ID"]
  getSingleDirectory(idParams[1]); // create detail view HTML w/ our id
} else {
  getBSC(); // no id given, fetch summaries
}
