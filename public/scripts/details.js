//for the details page.
//Objs is the array of the object info from /api/courses/
$(function ()
{
    let objs;
    let urlParams = new URLSearchParams(location.search); 
    let urlID = urlParams.get("id");

        $.getJSON("/api/courses/" + urlID, function(classes) 
        {    
            // the returned data is available in an "already parsed" 
                // parameter named data
                // take a few minutes to examine the attached .json file
                objs = classes;  
                getTableInfo(objs);
        });
        //parkSelector = category
});

/*This function creates the table for the detail page.
*
*
*@param ---register--- is the register button.
*@param ---students--- is the student table.
*@param ---detailtbl--- is the table for the class information.
*@param ---cancel--- is the cancel button.
*@param ---objs--- is the object array.
*/
function getTableInfo(objs)
{  
    let table = document.getElementById("detailtbl");
    table.innerHTML = "";
            //generates the table.
            let row = table.insertRow(table.rows.length);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            cell1.innerHTML = "Course ID";
            cell2.innerHTML = objs.CourseId;
            populateTable(table, row, objs);
    
    $('#register').attr("href", "register.html?id=" + objs.CourseId);       
    $('#register').click(function() {
        document.location.href="register.html?id=" + objs.CourseId;
      });

      $('#cancel').click(function() {
        document.location.href="courses.html";
      });
    
      showStudents(objs);
}

function showStudents(objs)
{
    if(objs.Students.length == 0)
    {   
        $("#students").html("No Students have Registered");
    } else {      
        let tBody =  $("<tbody>");
            $('#students').append(tBody);             
        for(let i = 0; i <objs.Students.length; i++)
        {
            let markup = "<tr><td>" + objs.Students[i].StudentName + "</td><td>" + objs.Students[i].Email + "</td></tr>";
            $('#students tbody').append(markup);
        }
    }
}

function populateTable(table, row, objs)
{
    let innerHTMLInfo = [objs.Title, objs.Category, objs.Location, objs.StartDate, objs.EndDate, objs.Meets, objs.Fee]

    let header = ["Title", "Category", "Location", "Start Date", "End Date", "Meets", "Fee"]

    for (let j = 0; j < header.length; j++)
    {
        row = table.insertRow(table.rows.length);
        cell1 = row.insertCell(0);
        cell2 = row.insertCell(1);
        cell1.innerHTML = header[j].toString();
        cell2.innerHTML = innerHTMLInfo[j].toString();
    }
}