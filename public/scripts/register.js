//for the registration page.
//Objs is the array of the object info from /api/courses/
$(function ()
{
    let urlParams = new URLSearchParams(location.search); 
    let urlID = urlParams.get("id"); //is also the class ID.

        $.getJSON("/api/courses/" + urlID, function(classes) 
        {    
            // the returned data is available in an "already parsed" 
                // parameter named data
                // take a few minutes to examine the attached .json file
                objs = classes;  
                getTableInfo();
        });
        //parkSelector = category
});

/*This function populates the table on the page
*
*
*@param ---idNum--- is the field for the class ID.
*@param ---cancel --- is the cancel button.
*@param ---register--- is the registration button.
*@param ---pattern--- is the regular expression to check for email.
*/

function getTableInfo()
{  
    $('#idNum').val(objs.CourseId);
    //$(".classID").append(objs.CourseId);

    $('#cancel').click(function() {
        document.location.href='courses.html';
    });

   // $('#register').attr("href", "details.html?id=" + objs.CourseId);
    $('#register').click(function() 
    {

       let pattern=/^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        console.log(email.value)
        
        if(pattern.test($("#email").val()) && $("#studentname").val() != "")
            {
            $.get("/api/register/", $("#studentInfo").serialize(), function(data){
                $("#msgDiv").html(data);
                })
                document.location.href="details.html?id=" + objs.CourseId;
            } else {
                alert("Please Enter Valid Name and Email");
            }
        });
};
