/*
This is your site JavaScript code - you can add interactivity and carry out processing
- Initially the JS writes a message to the console, and moves a button you can add from the README
*/
var AT_url = "https://api.airtable.com/v0/appSfzhC5ABBvTp2O/Table%201"
var AT_key = "api_key=keySsUNwZfQgXnsjZ"
var SUMMARY_QUERY = "fields%5B%5D=Name%5B%5D=Photo%5B%5D=Information%5B%5D=Number%5B%5D=website%5B%5D=Desc%5B%5D=AcceptedDevices%5B%5D=methods%5B%5D=Appointment?";

function getBSC() {
  var eWRC_Element = document.getElementById("name");

  fetch(`${AT_url}?${AT_key}&view=order&${SUMMARY_QUERY}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // response is an object w/ .records array

      eWRC_Element.innerHTML = ""; // clear student

      var newHtml = "";

      for (var i = 0; i < data.records.length; i++) {
        var name = data.records[i].fields["Name"];
        var picture = data.records[i].fields["Photo"];
        var info = data.records[i].fields["Information"];
        var num = data.records[i].fields["Number"];
        var link = data.records[i].fields["website"];
        var desc = data.records[i].fields["Desc"];
        var aD = data.records[i].fields["AcceptedDevices"]
        var methods = data.records[i].fields["methods"];
        var appt = data.records[i].fields["Appointment?"];
        

        newHtml += `
        
          <div class="col-md-4 cardImageText">
          <div class="card">
            <a href="${link}" target="_blank"
              >${picture ? `<img class="head" src="${picture[0].url}">` : ``}
            </a>

            <div class="card-body">
              <p class="card-text card-key">${name}</p>
              <p class="card-text card-key">${info}</p>
              <p class="card-text card-key">${desc}</p>
            </div>
          </div>
        </div>
        
        `;
      }

       eWRC_Element.innerHTML.innerHTML = newHtml;
    });
}

