
count = 0;
SearchFlag = 0;

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getosearch() {
    var inputItem = "";
    inputItem = document.getElementById("search-text-input").value;
    if (inputItem != "") {

        setCookie("search", inputItem, 1);
        window.location.href = "SearchResultPeople.html";
    }
    else {

        alert("Search Field Empty");
    }

}
function search() {

    var job = " ", location = " ";
    job = document.getElementById("job").value;
    location = document.getElementById("location").value;
    if (job.length != 0 && location.length != 0) {
        //FormInput();
        var myNode = document.getElementById("output");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }

        SearchFlag = 1;
        i = 0;



        var searchRes;
        searchRes = document.getElementById("SearchResult");
        searchRes.style.display = "block";
        var searchRes1;
        searchRes1 = document.getElementById("container3");
        searchRes1.style.display = "block";
        document.getElementById("container4").style.display = "none";
    }

    //  window.location.href = "SearchResultPeople.html";
    else if (job.length == 0) {
        alert("Job Field Empty ");

    }
    else if (location.length == 0) {
        alert("Location Field Empty");

    }
}


window.onscroll = yHandler;
i = 0;
function yHandler() {
    inputItem = document.getElementById("job").value;
    Loc = document.getElementById("location").value;

    var wrap = document.getElementById('output');
    var contentHeight = wrap.offsetHeight;
    var yOffset = window.pageYOffset;
    var y = yOffset + window.innerHeight;
    if (y >= contentHeight) {
        //  wrap.innerHTML += "Records"+"<br>";
        if (i <= 20 && SearchFlag == 1) {
            var divElement = document.createElement("Div");
            divElement.id = "divID" + i;
            divElement.style.backgroundColor = "white";
            divElement.style.color = "black";
            divElement.style.height = "45px";
            divElement.style.width = "80%";
            divElement.style.textAlign = "left";
            divElement.style.border = "2px solid gray";
            divElement.style.margin = "auto";
            divElement.style.padding = "10px";
            divElement.style.marginBottom = "10px";
            divElement.style.position = "relative";

            str = "Some Job";
            x = document.createElement("B");
            var text1 = document.createTextNode(str + " " + inputItem + " ;");
            x.appendChild(text1);
            divElement.appendChild(x);
            var text2 = document.createTextNode(" Location :" + Loc);
            divElement.appendChild(text2);
            var btn = document.createElement("BUTTON");
            var btntext = document.createTextNode("Apply for Job");
            btn.style.color = "white";
            btn.style.backgroundColor = "rgb(139, 40, 114)";
            btn.style.fontSize = "14px";
            btn.style.textAlign = "center";
            btn.style.width = "120px";
            btn.style.padding = "10px";
            btn.style.position = "absolute";
            btn.style.right = "10px";
            btn.setAttribute("onclick", "openSearch()");
            // var break1 = document.createElement("BR");
            //btn.insertBefore(break1, text2);
            // btn.style.

            btn.appendChild(btntext);

            divElement.appendChild(btn);
            i++;
            //document.getElementsByTagName("body")[0].appendChild(divElement);
            wrap.appendChild(divElement);


            wrap
            //var break1 = document.createElement("BR");
            //  em1.insertBefore(break1, em2);
        }
    }
    // SearchFlag=0;

}

function openSearch() {
    document.getElementById("myOverlay").style.display = "block";
}

function closeSearch() {
    document.getElementById("myOverlay").style.display = "none";
}

