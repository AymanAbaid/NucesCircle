
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

            setCookie("search", inputText, 1);
            window.location.href = "SearchResultPeople.html";

        }
        else
            alert("Search Field Empty");



    }
    function myFunction() {

        if (document.getElementById("myDropdown").style.display == "block") {
            document.getElementById("myDropdown").style.display = "none";
        }
        else
            document.getElementById("myDropdown").style.display = "block";

    }


