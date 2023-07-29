/*
This is your site JavaScript code - you can add interactivity and carry out processing
- Initially the JS writes a message to the console, and moves a button you can add from the README
*/
var AT_url = "https://api.airtable.com/v0/appSfzhC5ABBvTp2O/RC_data"
var AT_key = "api_key=keySsUNwZfQgXnsjZ"
var SUMMARY_QUERY = "fields%5B%5D=Name&fields%5B%5D=Photo&fields%5B%5D=DVPhoto&fields%5B%5D=googURL&fields%5B%5D=Information&fields%5B%5D=Address&fields%5B%5D=Number&fields%5B%5D=Website&fields%5B%5D=Desc&fields%5B%5D=AcceptedDevices&fields%5B%5D=methods&fields%5B%5D=Appointment";


function getBSC() {
  var eWRC_Element = document.querySelector(".grid-container");

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
        var aD = data.records[i].fields["AcceptedDevices"];
        var recordId = data.records[i].id; // Get the record ID for this button

        newHtml += `
          <div id="list-view-container" class="cardImageText col-9 grid-item"> 
            <div class="card " style="font-size: 30px;">
              ${photo ? `<img class="card-img-top" src="${photo[0].url}">` : ''}
              <div class="card-body">
                <p class="card-text card-key">${name}</p>
                <p class="card-text card-accepted-devices">Accepted Devices: <br>  ${aD}</p>
                <!-- Add the event handler to the button and pass the record ID -->
                <button class="btn btn-primary more-info-button" data-id="${recordId}">More Info</button>
              </div>
            </div>
          </div>
        `;
      }

      eWRC_Element.innerHTML = newHtml;

      const moreInfoButtons = document.querySelectorAll(".more-info-button");
      moreInfoButtons.forEach(button => {
        button.addEventListener("click", function() {
          // Get the ID from the data-id attribute of the button
          const recordId = button.getAttribute("data-id");
          // Redirect the user to the detailed view using the record ID
          window.location.href = `index.html?id=${recordId}`;
        });
      });
    });
}


// edit below
function fetchSingleRC(rcId) {
  var eWRC_Element = document.getElementById("detailed-view-container");

  fetch(`${AT_url}/${rcId}?${AT_key}`)
    .then(response => response.json())
    .then(data => {
      console.log(data); // response is a single object

      var photo1 = data.fields["DVPhoto"];
      var name = data.fields["Name"];
      var info = data.fields["Information"];
      var num = data.fields["Number"];
      var link = data.fields["Website"];
      var desc = data.fields["Desc"];
      var aD = data.fields["AcceptedDevices"]
      var methods = data.fields["methods"];
      var appt = data.fields["Appointment"];
      var gmurl = data.fields["googURL"];

      var newHtml = `
      <div class="container-detailed-view">
       <div class="detailed-view-content">
          <div class="card" style="font-size: 20px;">
            
            <h4 class="card-title" style="font-family: Monospace; text-align: center;" >${name}</h4> 
            
            <h5 style="font-family: Monospace">Description</h5>
            <p style="font-family: Monospace">${desc}</p>
            
            <h5 style="font-family: Monospace">Information</h5>
            <p style="font-family: Monospace">${info}</p>
            
            <h5 style="font-family: Monospace">Phone</h5>
            <p style="font-family: Monospace">${num}</p>
            
            <h5 style="font-family: Monospace">Website</h5>
            <a href="${link}" target="_blank" class="card-link" style="font-family: Monospace">${link}</a>
            
            <h5 style="font-family: Monospace">Accepted devices</h5>
            <list>
            <ul style="font-family: Monospace">${aD}</ul>
            </list>
            <h5 style="font-family: Monospace">Methods</h5>
            <p style="font-family: Monospace">${methods}</p>
            
            <h5 style="font-family: Monospace">Appointment?</h5>
            <p style="font-family: Monospace">${appt}</p>
            
            <div class="col">
            <a href="${gmurl}" target="_blank">
              <img src="${photo1[0].url}" style="width: 100%" alt="picture of a ${name} recycling center">
            </div>
            
          </div>
        </div>
      </div>
      `;

      eWRC_Element.innerHTML = newHtml;
    });
}
//edit above

function searchFunction() {
  var input, filter, cardimagetext, x;
  input = document.getElementById('myinput');
  filter = input.value.toLowerCase();
  cardimagetext = document.getElementsByClassName('cardImageText');

  for (x = 0; x < cardimagetext.length; x++) {
    var nameElement = cardimagetext[x].getElementsByClassName("card-key")[0];
    var aDElement = cardimagetext[x].getElementsByClassName("card-accepted-devices")[0];

    var name = nameElement.innerText.toLowerCase();
    var aD = aDElement.innerText.toLowerCase();

    if (name.includes(filter) || aD.includes(filter)) {
      cardimagetext[x].style.display = "block";
    } else {
      cardimagetext[x].style.display = "none";
    }
  }
}

function showViewElements() {
  const idParams = window.location.search.split("?id=");
  const backButtonContainer = document.querySelector(".back-button-container");
  const searchContainer = document.querySelector(".search-bar");

  if (idParams.length >= 2) {
    // has at least ["id?", "OUR ID"]
    backButtonContainer.style.display = "block"; // Show back button
    searchContainer.style.display = "none"; // Hide search bar
  } else {
    backButtonContainer.style.display = "none"; // Hide back button
    searchContainer.style.display = "block"; // Show search bar
  }
}

// Add event listener to the back button
document.getElementById("back-button").addEventListener("click", function () {
  window.location.href = "index.html"; 
});

// Call the function to set the initial view state
showViewElements();

var idParams = window.location.search.split("?id=");
if (idParams.length >= 2) {
  // has at least ["id?", "OUR ID"]
  fetchSingleRC(idParams[1]); // create detail view HTML w/ our id
} else {
  getBSC(); // no id given, fetch summaries
}
