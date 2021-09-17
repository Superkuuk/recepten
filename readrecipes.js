var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("GET", "receptenboek.xml");
oReq.send();

function reqListener () {
    var obj = JSON.parse(this.responseText);
    console.log(obj);
}
