window.onload = function ()
{
    let objs;
    let mountainList = document.getElementById('mountain');


        $.getJSON("data/mountains.json", function(data) 
        {    
            // the returned data is available in an "already parsed" 
                // parameter named data
                // take a few minutes to examine the attached .json file
                objs = data.mountains;  
                for(var i = 0; i < objs.length; i++) 
                {
                    var opt = document.createElement('option');
                    opt.text = objs[i].name;
                    opt.value = i;
                    mountainList.appendChild(opt);
                    getInfo (objs);
                }   
        });

        mountainList.onchange = function ()
        {
            getInfo(objs);
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
function getInfo (objs)
{
    let mountSelect = document.getElementById("mountain");
    let i = mountSelect.value;
    let table = document.getElementById("mount");
    table.innerHTML = "";

    //generates the table.
    let row = table.insertRow(table.rows.length);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    cell1.innerHTML = "Name";
    cell2.innerHTML = objs[i].name;
    row = table.insertRow(table.rows.length);
    cell1 = row.insertCell(0);
    cell2 = row.insertCell(1);
    cell1.innerHTML = "Elevation";
    cell2.innerHTML = objs[i].elevation;
    row = table.insertRow(table.rows.length);
    cell1 = row.insertCell(0);
    cell2 = row.insertCell(1);
    cell1.innerHTML = "Effort";
    cell2.innerHTML = objs[i].effort;
    row = table.insertRow(table.rows.length);
    cell1 = row.insertCell(0);
    cell2 = row.insertCell(1);
    cell1.innerHTML = "Description";
    cell2.innerHTML = objs[i].desc;
    row = table.insertRow(table.rows.length);
    cell1 = row.insertCell(0);
    cell2 = row.insertCell(1);
    cell1.innerHTML = "Latitude";
    cell2.innerHTML = objs[i].coords.lat;
    row = table.insertRow(table.rows.length);
    cell1 = row.insertCell(0);
    cell2 = row.insertCell(1);
    cell1.innerHTML = "Longitude";
    cell2.innerHTML = objs[i].coords.lng;
    row = table.insertRow(table.rows.length);
    cell1 = row.insertCell(0);
    cell2 = row.insertCell(1);
    cell1.innerHTML = "Image";
    var img = document.createElement('img');
    img.src = "/images/" + objs[i].img;
    cell2.appendChild(img);
}