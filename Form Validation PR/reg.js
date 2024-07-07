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
            $("#name_err").text("Enter Valid Name... Like Aastha Katharotiya")
        }


        //Email

        let email = $("#email").val()
        let email_Regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        $("#email_err").text("")

        if(email === "")
        {
            isValid = false;
            $("#email_err").text("Please Enter Email !!!")
        }
        else if(!email_Regex.test(email))
        {
            isValid = false;
            $("#email_err").text("Enter Valid Email... Like aastha@gmail.com")
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
            $("#psw_err").text("Enter Valid Password... Like Aastha123@")
        }


        //Confirm Password

        let cpw = $("#cpw").val()
        $("#cpw_err").text("")

        if(cpw === "")
        {
            isValid = false;
            $("#cpw_err").text("Enter Confirm Password !!!")
        }
        if(cpw !== psw)
        {
            isValid = false;
            $("#cpw_err").text("Password Will Not Match...")
        }



        if (isValid) {
            location = "complet.html";
        }

    })
})