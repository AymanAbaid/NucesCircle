function myFunction() {

        if (document.getElementById("myDropdown").style.display == "block") {
                document.getElementById("myDropdown").style.display = "none";
        }
        else
                document.getElementById("myDropdown").style.display = "block";

}

function processForm() {
        var parameters = location.search.substring(1).split("&");
        var temp = parameters[0].split("=");
        l = unescape(temp[1]);
        alert(l); //Dialog with the text you put on the textbox
}

function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toGMTString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function Search() {
        inputText = "";
        var inputText = document.getElementById("search-text-input").value;

        // alert("again  entering");

        if (inputText != "") {
                //     alert(inputText);

                setCookie("search", inputText, 1);
        }
        else
                alert("Search Field Empty");



}

function OpenEditProfile(val) {
        document.getElementById("myOverlay").style.display = "block";

}

function CloseEditProfile() {
        document.getElementById("myOverlay").style.display = "none";

}

function OpenEditInstitute( ) {
       // alert(val);
        document.getElementById("myOverlay2").style.display = "block";

}
function CloseEditInstitute() {
        //document.getElementById("myOverlay2").style.display = "none";
        window.location.href="/NucesCircle/profile"

}
function OpenAddInstitute() {
        document.getElementById("AddIntitute").style.display = "block";

}
function CloseAddInstitute() {
        document.getElementById("AddIntitute").style.display = "none";

}
function checkInstValididty()
{ var institute = document.getElementById("newInst").value;
        if (institute == "" || institute == "-" || isNaN(institute)) {
                document.getElementById("InstError").style.display = "block";
                alert("Invalid Institute");

        }

}
/*
function checkInstituteError() {
        var to = document.getElementById("newTo").value;
        var from = document.getElementById("newFrom").value;
        var institute = document.getElementById("newInst").value;
        if (to > from || to.length < 5 || to.From < 5) {
                // yearValidation(to,ev)
                //  yearValidation(from,ev)
                document.getElementById("DateError").style.display = "block";

        }
        if (institute == "" || institute == "-" || isNaN(institute)) {
                document.getElementById("InstError").style.display = "block";

        }
        else { 
                var frm = $('#newInstitue');

                frm.submit(function (e) {

                        e.preventDefault();

                        $.ajax({
                                type:'POST',
                                url: '/NucesCircle/addInstitute',
                                data: frm.serialize(),
                                success: function (data) {
                                        console.log('Submission was successful.');
                                        console.log(data);
                                },
                                error: function (data) {
                                        console.log('An error occurred.');
                                        console.log(data);
                                },
                        });
                });
        }


}
function yearValidation(year, ev) {

        var text = /^[0-9]+$/;
        if (ev.type == "blur" || year.length == 4 && ev.keyCode != 8 && ev.keyCode != 46) {
                if (year != 0) {
                        if ((year != "") && (!text.test(year))) {

                                alert("Please Enter Numeric Values Only");
                                return false;
                        }

                        if (year.length != 4) {
                                alert("Year is not proper. Please check");
                                return false;
                        }
                        var current_year = new Date().getFullYear();
                        if ((year < 1920) || (year > current_year)) {
                                alert("Year should be in range 1920 to current year");
                                return false;
                        }
                        return true;
                }
        }
}
*/
// processForm();

