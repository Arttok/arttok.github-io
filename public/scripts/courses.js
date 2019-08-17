//This is for the courses page.
//Objs is the array of the object info from /api/courses/
$(function ()
{
    let objs;
    let tableHead = ["Title", "Start Date", "Fee", "Details"]
    let catagorySelect;

    $.getJSON("/api/categories", function(catagories) 
    {    
        // the returned data is available in an "already parsed" 
            // parameter named data
            // take a few minutes to examine the attached .json file
            catagorySelect = catagories;  
            getDropDownInfo (catagorySelect);

            $("#classSelector").change(function()
            {
                $.getJSON("/api/courses", function(classes) 
                {    
                    // the returned data is available in an "already parsed" 
                    // parameter named data
                    // take a few minutes to examine the attached .json file
                    objs = classes;  
                    getTableInfo(objs, tableHead);
                });
            })
    });
});

/*This function gets the drop down informaiton on the page.
*
*
*@param ---classSelector--- is the classSelector field..
*@param ---classList--- is the class table.
*@param ---detailtbl--- is the table for the class information.
*@param ---option:selected--- gets the selected option.
*@param ---objs--- is the object array.
*/
function getDropDownInfo (catagorySelect)
{
$("#category").empty();
for(var i = 0; i < catagorySelect.length; i++) 
    {
        $("#classSelector").append('<option value='+catagorySelect[i].Value +'>'+ catagorySelect[i].Category +'</option>');
    }
}

/*This function gets the drop down informaiton on the page.
*
*
*@param ---thead--- table head.
*@param ---trow--- table row.
*@param ---tBody---table body.
*@param ---catatext--- text of dropdown, that is selected.
*/
function getTableInfo(objs, tableHead)
{  
$("#classList").empty();
let thead = $("<thead>");
$('#classList').append(thead);
let trow = $("<tr>");
$('#classList thead').append(trow);
for (let i = 0; i < tableHead.length; i++)
{
        let col = $('<th>' + tableHead[i] + '</th>');
        $('#classList thead tr').append(col)
}

   let tBody =  $("<tbody>");
    $('#classList').append(tBody);
    // forming table header ends
    

    var catatext = $( "#classSelector option:selected" ).text();//gets text of drop down. 

    if (catatext == "Choose One")//start off empty and make sure they can go back to empty.
    {
        $("#classList").empty();
    }

    if (catatext == "All")//shows all classes
    {
        for (let i = 0; i < objs.length; i++)
        {
            let markup = "<tr><td>" + objs[i].Title + "</td><td>" + objs[i].StartDate + "</td><td>" + objs[i].Fee + "</td><td>" + "<a href=details.html?id=" + objs[i].CourseId + ">Details</a>" +  "</td></tr>";
            $('#classList tbody').append(markup);
        }
    } else {
        for (let i = 0; i < objs.length; i++)
        {
            if(objs[i].Category == catatext)//gets classes based upon dropdown info.
            {   
                let markup = "<tr><td>" + objs[i].Title + "</td><td>" + objs[i].StartDate + "</td><td>" + objs[i].Fee + "</td><td>" + "<a href=details.html?id=" + objs[i].CourseId + ">Details</a>" +  "</td></tr>";
                $('#classList tbody').append(markup);
            }
        }
    }
}