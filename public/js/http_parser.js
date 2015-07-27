
function http_parser (ahref) {
  var split_href = ahref.split("/");

  for (var i = 0; i < split_href.length; i++) {
    if(split_href[i] === "http:") {
      return split_href[2];
    }
    else {
      return split_href[0];
    }
  }
}
