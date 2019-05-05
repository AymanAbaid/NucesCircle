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

function OpenEditInstitute() {
        // alert(val);
        document.getElementById("myOverlay2").style.display = "block";

}
function CloseEditInstitute() {
        document.getElementById("myOverlay2").style.display = "none";

}
function OpenAddInstitute() {
        document.getElementById("AddIntitute").style.display = "block";

}
function CloseAddInstitute() {
        document.getElementById("AddIntitute").style.display = "none";

}
function checkInstValididty() {
        var institute = document.getElementById("newInst").value;
        if (institute == "" || institute == "-" || isNaN(institute)) {
                document.getElementById("InstError").style.display = "block";
                alert("Invalid Institute");

        }

}
function OpenAddProject() {
        document.getElementById("AddProject").style.display = "block";


}
function CloseAddProject() {
        document.getElementById("AddProject").style.display = "none";


}

function OpenAddSkill() {
        document.getElementById("AddSkill").style.display = "block";


}
function CloseAddSkill() {
        document.getElementById("AddSkill").style.display = "none";


}
function OpenChangePic() {
        document.getElementById("ChangeProfilePic").style.display = "block";


}
function CloseChangePic() {
        document.getElementById("ChangeProfilePic").style.display = "none";


}
function OpenAddCourse() {
        document.getElementById("AddCourse").style.display = "block";


}
function CloseAddCourse() {
        document.getElementById("AddCourse").style.display = "none";


}
function OpenAddLanguage() {
        document.getElementById("AddLanguage").style.display = "block";


}
function CloseAddLanguage() {
        document.getElementById("AddLanguage").style.display = "none";


}
function OpenAddExperience() {
        document.getElementById("AddExperience").style.display = "block";


}
function CloseAddExperience() {
        document.getElementById("AddExperience").style.display = "none";


}function OpenAddCertification() {
        document.getElementById("AddCertification").style.display = "block";


}
function CloseAddCertification() {
        document.getElementById("AddCertification").style.display = "none";


}






function displayPercent() {
        val = document.getElementById("per").value;
        document.getElementById("percentage").innerHTML = val + "" + "%";

}

function adjustSKill() {
        var a = document.getElementById("skillsPrecent").style.width;
        alert(a)
        document.getElementById("skillsPrecent").style.width = document.getElementById("percentage").val + "" + "%";
        alert(document.getElementById("skillsPrecent").style.width);

        document.getElementById("SKILLR").style.height = "230 px";
}
