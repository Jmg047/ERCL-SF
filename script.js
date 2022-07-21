/*
This is your site JavaScript code - you can add interactivity and carry out processing
- Initially the JS writes a message to the console, and moves a button you can add from the README
*/
var AT_url = "https://api.airtable.com/v0/appSfzhC5ABBvTp2O/Table%201"
var AT_key = "api_key=keySsUNwZfQgXnsjZ"
//var SUMMARY_QUERY = "fields%5B%5D=Name&fields%5B%5D=Link&fields%5B%5D=Pictures";

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
        var link = data.records[i].fields["Link"];
        var picture = data.records[i].fields["Pictures"];

        newHtml += `
        
          <div class="col-md-4 cardImageText">
          <div class="card">
            <a href="${link}" target="_blank"
              >${picture ? `<img class="head" src="${picture[0].url}">` : ``}
            </a>

            <div class="card-body">
              <p class="card-text card-key">${name}</p>
            </div>
          </div>
        </div>
        
        `;
      }

       eWRC_Element.innerHTML.innerHTML = newHtml;
    });
}

