$(document).ready(function()
{
    $("#login_from").submit(function(event)
    {
        event.preventDefault()
        let isValid = true;

        //UserName 

        let name = $("#name").val()
        let name_Regex = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/
        $("#name_err").text("")

        if(name === "")
        {
            isValid = false;
            $("#name_err").text("Please Enter Name !!!")
        }
        else if(!name_Regex.test(name))
        {
            isValid = false;
            $("#name_err").text("Enter Valid Name... Like Hetvi Mungra")
        }
        //Password

        let psw = $("#psw").val()
        let psw_Regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
        $("#psw_err").text("")

        if(psw === "")
        {
            isValid = false;
            $("#psw_err").text("Please Enter Password !!!")
        }
        else if(psw.length < 8)
        {
            isValid = false;
            $("#psw_err").text("must be at least 8 Digit long")
        }
        else if(!psw_Regex.test(psw))
        {
            isValid = false;
            $("#psw_err").text("Enter Valid Password... Like Hetvi123@")
        }




        if (isValid) {
            location = "register.html"; // Change this to your target page
        }

    })
})