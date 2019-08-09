"use strict";
window.onload = function ()
{
    let objs;
    const parkDropdown = document.getElementById("parkSelector");
    let radioSelect = document.getElementsByName("search");
    //list of all states for national parks
    let states = 
    [
        "Alabama","Alaska","American Samoa","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","DC","Florida","Georgia","Guam","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Puerto Rico","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virgin Islands","Virginia","Washington","West Virginia","Wisconsin","Wyoming"
    ]

    //list of all parktypes for national park.
    let parktypes =  
    [
        "National Park","National Monument","Recreation Area","Scenic Trail","Battlefield","Historic","Memorial","Preserve","Island",
        "River","Seashore","Trail","Parkway"
     ]
    
     $.getJSON("data/nationalparks.json", function(nationalparks) 
     {    
         // the returned data is available in an "already parsed" 
             // parameter named data
             objs = nationalparks.parks;     
     });
    
    //gets the starting dropdown since State gets picked at start.
    startingDDL(states, parkDropdown);
    
    //since radio buttons are in a array
    for (let i = 0; i < radioSelect.length; i++)
    {
        radioSelect[i].onchange = function ()
        {
            getDropDownInfo(states, parktypes, parkDropdown);
        }
    }     
    
    parkDropdown.onchange = function ()
        {
            getParkInfo(objs);
        }
}

function getDropDownInfo (states, parktypes, parkDropdown)
{
    let typeDropDown = document.getElementById("typeddl");
    let locationDrop = document.getElementById("locationddl");
    $("#parkSelector").empty();
    if(typeDropDown.checked)
    {
        for(var i = 0; i < parktypes.length; i++) 
        {
            let opt = document.createElement('option');
            opt.text = parktypes[i];
            opt.value = i;
            parkDropdown.appendChild(opt);
        }
    } else if(locationDrop.checked)
    {
        let opt = document.createElement('option');
        opt.text = ""
        startingDDL(states, parkDropdown);
    }

}

function startingDDL(states, parkDropdown)
{

    for(var i = 0; i < states.length; i++) 
        {
            var opt = document.createElement('option');
            opt.text = states[i];
            opt.value = i;
            parkDropdown.appendChild(opt);
        }
}

/*This function gets the informaiton for the table and displays it.
*
*
*@param ---mountSelect is used to get the html dropdown.
*@param ---i is for mountSelect.value.
*@param ---table is for my html table.
*@param ---row makes the table row
*@param ---cell1 & cell 2 make the 2 cells on the table.
*/
function getParkInfo (objs)
{
    let parkSelect = document.getElementById("parkSelector");
    let i = parkSelect.value;
    let table = document.getElementById("parks");
    let typeDropDown = document.getElementById("typeddl");
    let locationDrop = document.getElementById("locationddl");
    table.innerHTML = "";

    // Create an empty <thead> element and add it to the table:
    var header = table.createTHead();

    // Create an empty <tr> element and add it to the first position of <thead>:
    var row = header.insertRow(0);

    // Insert a new cell (<td>) at the first position of the "new" <tr> element:
    var cell = row.insertCell(0);
    var cell1 = row.insertCell(1);
    var cell2 = row.insertCell(2);
    var cell3 = row.insertCell(3);
    var cell4 = row.insertCell(4);
    var cell5 = row.insertCell(5);

    // Add header names:
    cell.innerHTML = "<b>Name</b>";
    cell1.innerHTML = "<b>Address</b>";
    cell2.innerHTML = "<b>City</b>";
    cell3.innerHTML = "<b>State</b>";
    cell4.innerHTML = "<b>Phone</b>";
    cell5.innerHTML = "<b>Website - click link to visit</b>";
    
    //radio buttons. Finds out which one is selected and then gets the appropriate dropdown menu,
    for (let j=0; j < objs.length; j++)
    {
        if (locationDrop.checked && parkSelect[i].innerHTML == objs[j].State)
        {
            populateTable(objs, table, i, j);
        }

        if (typeDropDown.checked && objs[j].LocationName.search(parkSelect[i].innerHTML) != -1)
        {
            populateTable(objs, table, i, j);
        }
    }
}

/*This function gets the informaiton for the table and displays it.
*
*
*@param ---mountSelect is used to get the html dropdown.
*@param ---i is for mountSelect.value.
*@param ---table is for my html table.
*@param ---row makes the table row
*@param ---cell1 & cell 2 make the 2 cells on the table.
*/
function populateTable (objs, table, i, j)
{
            let row = table.insertRow(table.rows.length);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            let cell4 = row.insertCell(3);
            let cell5 = row.insertCell(4);
            let cell6 = row.insertCell(5);
            cell1.innerHTML = objs[j].LocationName; //gets location name from array.
            cell2.innerHTML = objs[j].Address; //gets address from array.
            cell3.innerHTML = objs[j].City; //gets city from array.
            cell4.innerHTML = objs[j].State; //gets state from array.
            cell5.innerHTML = objs[j].Phone; //gets phone # from array.

            //used to turn the visit url into a link able to be clicked.
            if (objs[j].Visit != undefined)
            {
            var elLink = document.createElement('a');
            var href= objs[j].Visit;
            elLink.href = href;
            elLink.innerHTML = objs[j].Visit;
            elLink.style.color = "white";
            cell6.appendChild(elLink);
            } else {
                cell6.innerHTML = "Not Listed";
            }
            
            //checks to see if the address is a 0
            //if so let the user know that it isn't listed.
            if (cell2.innerHTML == 0) 
            { 
                cell2.innerHTML = "Not Listed";
            }

            //checks to see if the phone is a 0
            //if so let the user know that it isn't listed.
            if (cell5.innerHTML == 0)
            {
                cell5.innerHTML = "Not Listed";
            }
}