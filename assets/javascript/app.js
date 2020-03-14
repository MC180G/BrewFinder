const breweries = [];
const cities = [];
const states  = ["Alaska",
"Alabama",
"Arkansas",
"American Samoa",
"Arizona",
"California",
"Colorado",
"Connecticut",
"District of Columbia",
"Delaware",
"Florida",
"Georgia",
"Guam",
"Hawaii",
"Iowa",
"Idaho",
"Illinois",
"Indiana",
"Kansas",
"Kentucky",
"Louisiana",
"Massachusetts",
"Maryland",
"Maine",
"Michigan",
"Minnesota",
"Missouri",
"Mississippi",
"Montana",
"North Carolina",
" North Dakota",
"Nebraska",
"New Hampshire",
"New Jersey",
"New Mexico",
"Nevada",
"New York",
"Ohio",
"Oklahoma",
"Oregon",
"Pennsylvania",
"Puerto Rico",
"Rhode Island",
"South Carolina",
"South Dakota",
"Tennessee",
"Texas",
"Utah",
"Virginia",
"Virgin Islands",
"Vermont",
"Washington",
"Wisconsin",
"West Virginia",
"Wyoming"]
var lat;
var long;
var address;
$(document).ready(function () {

    $(".row").hide();
    $("#add-brew").on("click", function (event) {

        event.preventDefault();
        $("#brewery").empty();
        $(".row").show();

        let userName = "&by_name=" + $("#brewery-name").val().trim();
        let userState = "&by_state=" + $("#state").val().trim();
        let userCity = "&by_city=" + $("#city").val().trim();
        $("#brewery-name").val("");
        $("#state").val("");
        $("#city").val("");
        let queryURL = "https://api.openbrewerydb.org/breweries?per_page=16";
        if (userName === "&by_name=") {
            userName = "";
        }
        if (userCity === "&by_city=") {
            userCity = ""
        }
        if (userState === "&by_state=") {
            userState = ""
        }
        if (userCity === "&by_city=" && userName === "&by_state=") {
            userCity = ""
            userState = ""
        }
        if (userState === "&by_state=" && userName === "&by_name=") {
            userName = "";
            userState = "";
        }
        if (userCity === "&by_city=" && userState === "&by_state=") {
            userCity = "";
            userState = "";
        }
        if (userName === "" && userCity === "" && userState === "") {
            $(".modal1").modal();
            return false;
        }

        $.ajax({
            url: queryURL + userName + userState + userCity,
            method: "GET"
        }).then(function (response) {


            if (Array.isArray(response) && !response.length) {
                $(".modal2").modal();
                return false;
            }

            
            
            for (let i = 0; i < response.length; i++) {

                 address = response[i].street;
                let newBrew = response[i].name
                let newCity = response[i].city
                breweries.push(newBrew)
                cities.push(newCity);
                if (address !== ""){
                
                let brewRow = $("<div class='row'>");
                let mapDiv = $("<div id='map" + i + "'>")
                let brewDiv = $("<div>");
                let brewList = $("<ul id='list'>");
                mapDiv.addClass("map");
                let name = $("<h3>").text(response[i].name).appendTo(brewList);
                name.attr("data-lat", response[i].latitude);
                name.attr("data-long", response[i].longitude);
                let lat = response[i].latitude;
                let long = response[i].longitude;

                $("<li>").text(response[i].city).appendTo(brewList);
                $("<li>").text(response[i].state).appendTo(brewList);
                $("<li>").text(response[i].street).appendTo(brewList);
                $("<li>").text(response[i].postal_code).appendTo(brewList);
                $("<li>").text(response[i].phone).appendTo(brewList);
                $("<a href=" + response[i].website_url + " " + "target='_blank'" + ">" ).text(response[i].website_url).appendTo(brewList);
                
                
                console.log(lat);
                console.log(long);
                brewDiv.addClass("brewery-div");
                name.addClass("brw-btn");
                
                $(brewDiv).append(brewList);
                $(brewRow).append(brewDiv);
                $(brewRow).append(mapDiv);
                $("#brewery").append(brewRow);



                let platform = new H.service.Platform({
                    "app_id": "dyibLlBU2QNaCv7xikm2",
                    "apikey": "5nf_6CsIndRsth2qYd4s86AwOQs8XMDgUf7vOLU09Ls"
                });

                if (lat !== null) {
                let maptypes = platform.createDefaultLayers();

                let map = new H.Map(
                    document.getElementById("map" + i),
                    maptypes.vector.normal.map, {
                        zoom: 10,
                        center: { lat: lat, lng: long },
               
                        }
                        );

                        const mapEvents = new H.mapevents.MapEvents(map);
                        const behavior = new H.mapevents.Behavior(mapEvents);
                        let svgMarkup = 'https://cdnjs.cloudflare.com/ajax/libs/fatcow-icons/20130425/FatCow_Icons16x16/beer.png'
                        let icon = new H.map.Icon(svgMarkup),
                            coords = { lat: lat, lng: long },
                            marker = new H.map.Marker(coords, { icon: icon });
                        map.addObject(marker);
                        map.setCenter(coords);
                    } else {
                        $("<img class = 'map'>").attr("src", "assets/images/no_map.png").attr("id", "noMap").appendTo(mapDiv);
                    }
                };
            };
        });
    });
    function autocomplete(inp, arr) {
        /*the autocomplete function takes two arguments,
        the text field element and an array of possible autocompleted values:*/
        var currentFocus;
        /*execute a function when someone writes in the text field:*/
        inp.addEventListener("input", function(e) {
            var a, b, i, val = this.value;
            /*close any already open lists of autocompleted values*/
            closeAllLists();
            if (!val) { return false;}
            currentFocus = -1;
            /*create a DIV element that will contain the items (values):*/
            a = document.createElement("DIV");
            a.setAttribute("id", this.id + "autocomplete-list");
            a.setAttribute("class", "autocomplete-items");
            /*append the DIV element as a child of the autocomplete container:*/
            this.parentNode.appendChild(a);
            /*for each item in the array...*/
            for (i = 0; i < arr.length; i++) {
              /*check if the item starts with the same letters as the text field value:*/
              if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                    b.addEventListener("click", function(e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
              }
            }
        });
        /*execute a function presses a key on the keyboard:*/
        inp.addEventListener("keydown", function(e) {
            var x = document.getElementById(this.id + "autocomplete-list");
            if (x) x = x.getElementsByTagName("div");
            if (e.keyCode == 40) {
              /*If the arrow DOWN key is pressed,
              increase the currentFocus variable:*/
              currentFocus++;
              /*and and make the current item more visible:*/
              addActive(x);
            } else if (e.keyCode == 38) { //up
              /*If the arrow UP key is pressed,
              decrease the currentFocus variable:*/
              currentFocus--;
              /*and and make the current item more visible:*/
              addActive(x);
            } else if (e.keyCode == 13) {
              /*If the ENTER key is pressed, prevent the form from being submitted,*/
              e.preventDefault();
              if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
              }
            }
        });
        function addActive(x) {
          /*a function to classify an item as "active":*/
          if (!x) return false;
          /*start by removing the "active" class on all items:*/
          removeActive(x);
          if (currentFocus >= x.length) currentFocus = 0;
          if (currentFocus < 0) currentFocus = (x.length - 1);
          /*add class "autocomplete-active":*/
          x[currentFocus].classList.add("autocomplete-active");
        }
        function removeActive(x) {
          /*a function to remove the "active" class from all autocomplete items:*/
          for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
          }
        }
        function closeAllLists(elmnt) {
          /*close all autocomplete lists in the document,
          except the one passed as an argument:*/
          var x = document.getElementsByClassName("autocomplete-items");
          for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
            x[i].parentNode.removeChild(x[i]);
          }
        }
      }
      /*execute a function when someone clicks in the document:*/
      document.addEventListener("click", function (e) {
          closeAllLists(e.target);
      });
      }
      autocomplete(document.getElementById("brewery-name"), breweries);
      autocomplete(document.getElementById("state"), states);
      autocomplete(document.getElementById("city"), cities);
});


