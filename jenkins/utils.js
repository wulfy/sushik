function getPdf() {
    var links = document.querySelectorAll('#listeDetailContrat_Label .pdfLink a');
    return Array.prototype.map.call(links, function(e) {
        return e.getAttribute('onclick');
    });
}

function replaceAll(wordToReplace,replace,data)
{
			re = new RegExp(wordToReplace, 'g');
			return data.replace(re,replace)
}

var nb_errors;
function logError(test)
{
	this.echo("ERREUR "+test,"error");
	this.capture('erreur_'+test+'_'+getDate()+'.png');
	nb_errors ++;
}

function getDate()
{
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	
	if(dd<10) {
    dd='0'+dd;
	} 

	if(mm<10) {
		mm='0'+mm;
	} 

	today = mm+''+dd+''+yyyy;
	
	return today;
}

function sanitize(stringToReplace)
{
	filteredData = stringToReplace;
	filteredData = filteredData.replace(/^[a-zA-Z0-9äöüÄÖÜ]*$/gi, '');
	filteredData = replaceAll('<[^>]*>', '',filteredData);
	filteredData = replaceAll('\n', '',filteredData);
	filteredData = replaceAll('\t', '',filteredData);
	filteredData = replaceAll(' ', '',filteredData);
	return filteredData;
}


function filter(badwords,data) {
		filteredData = data;
		for (var index in badwords)
		{
			filteredData = replaceAll(badwords[index],"",filteredData);
		}
	return filteredData;
}

function formatDate(date)
{
	return replaceAll('/','_',date);
}

function filterHtmlTag(htmlTag)
{
	var re = new RegExp('<'+htmlTag+'.*?>');
	
}

function formatDateReg(dateToFormat)
{
	var re = new RegExp('/', 'g');
	var formatedDate = dateToFormat.replace(re,"_");
	return formatedDate;
}

function stristr(haystack, needle, bool) {
  // From: http://phpjs.org/functions
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfxied by: Onno Marsman
  // *     example 1: stristr('Kevin van Zonneveld', 'Van');
  // *     returns 1: 'van Zonneveld'
  // *     example 2: stristr('Kevin van Zonneveld', 'VAN', true);
  // *     returns 2: 'Kevin '
  var pos = 0;

  haystack += '';
  pos = haystack.toLowerCase().indexOf((needle + '').toLowerCase());
  if (pos == -1) {
    return false;
  } else {
    if (bool) {
      return haystack.substr(0, pos);
    } else {
      return haystack.slice(pos);
    }
  }
}