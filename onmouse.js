function readChords()
{
	var opts;
	var optsMenu;
	var optsChordName;
	var optsVariations;
	var optsPhotosvar;
	var optsType;
	var optsLeftHanded;
	var optsChordStyle;
	var optsPrint;
	var elms = document.getElementsByTagName('div');
	for (i = 0; i < elms.length; i++) {
		if (elms[i].className.indexOf("drawchord") == 0) { 
			opts = elms[i].innerHTML.split(";")
			
			if (elms[i].id == undefined || elms[i].id == "") 
			{
				elms[i].id = "div_chord_" + i + "_" + Math.ceil(Math.random() * 100);
				elms[i].style.width = '120px'
				elms[i].zIndex = 1
				//elms[i].style.position = 'fixed'
			}
			optsMenu = ""
			optsChordName = ""
			optsVariations = ""
			optsPhotosvar = ""
			optsType = ""
			optsLeftHanded = ""
			optsChordStyle = ""
			optsPrint = ""
			for (var n = 0; n < opts.length; n ++)
			{
				attribs = Trim(opts[n]).split(":")
				value = Trim(attribs[1])
				key = Trim(attribs[0]).toLowerCase()
				if (key == "menu") optsMenu = value
				if (key == "chordname") optsChordName = value
				if (key == "variations") optsVariations = value
				if (key == "photosvar") optsPhotosvar = value
				if (key == "type") optsType = value
				if (key == "lefthanded") optsLeftHanded = value
				if (key == "chordstyle") optsChordStyle = value
				if (key == "print") optsPrint = value
			}
			drawChord({
					'div': 		elms[i].id ,
					'menu': 	optsMenu,
					'chordname':optsChordName,
					'variations':optsVariations,
					'photosvar':optsPhotosvar,
					'lefthanded':optsLeftHanded,
					'chordstyle':optsChordStyle,
					'type':optsType,
					'print':optsPrint
					})
		}
	}
}


function Trim(str){return (str+'').replace(/^\s+|\s+$/g,"");}

var isIE  = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
//var isIE6 = $.browser.msie && $.browser.version.substr(0,1)<7
var ver = $.browser.version.substr(0,1)

/*
var xPos 
var yPos 
if (!isIE) document.captureEvents(Event.MOUSEMOVE)
document.onmousemove = getMouseXY;

function getMouseXY(e) {
  if (isIE) { // grab the x-y pos.s if browser is IE
    xPos = event.clientX + document.body.scrollLeft
    yPos = event.clientY + document.body.scrollTop
  } else {  // grab the x-y pos.s if browser is NS
    xPos = e.pageX
    yPos = e.pageY
  }  
  if (xPos < 0){xPos = 0}
  if (yPos < 0){yPos = 0}  
  
  return true
}
*/


function clearDrop(div)
{
	document.body.removeChild(document.getElementById(div))
}
function drawVariations(div, opts)
{
	xPos = cursorX
	yPos = cursorY
	var type = opts.type; if (type == undefined) type = ""
	var arrVariations = opts.variations.split(' ')
	var d1;
	
	if(document.getElementById(div)) clearDrop(div)

	var d = document.createElement('div');
	d.className = "drop"
	d.id = "drop_chord_" + div
	d.style.left = xPos + "px";
	d.style.top = yPos + "px";
	if (type == "") 
	{
		spaceX = 100
		spaceY = 140
		cols = 4
	}
	if (type == "keyboard") 
	{
		spaceX = 205
		spaceY = 100
		cols = 2
	}
	if (type == "banjo" || type == "ukulele") 
	{
		spaceX = 100
		spaceY = 140
		cols = 2
	}
	
	d.style.width = (arrVariations.length > cols ? (spaceX * cols + cols * 5 + (isIE ? 9 : 2)) : (spaceX * arrVariations.length + cols * 5 + (isIE ? 9 : 2))) + "px";
	//mod = arrVariations.length - (parseInt(arrVariations.length / cols)) 
	d.style.height = ( (arrVariations.length < cols ? 1 : (parseInt(arrVariations.length / cols) + (arrVariations.length % cols)) )
	* spaceY + (isIE ? 10 : -5)) + "px";
	d.setAttribute('id',"drop_" + opts.div);
	document.body.appendChild(d);

	var html = ""
	var nn = 0
	var ttop = 0
	for (var n = 0;	n < arrVariations.length; n ++)
	{
		if (nn == cols)
		{
			nn = 0
			ttop ++
		}
		if (!isIE)
		{
			d1 = document.createElement('div');
			d1.className = "ch"
			d1.style.left = (spaceX * nn + 5) + "px";
			d1.style.top = (ttop * spaceY + 4) + "px";
			d1.style.cursor = "pointer";
			d1.setAttribute('id',"drop_" + n + "_" + opts.div);
			d1.setAttribute('onmouseover','this.className="chordover"');
			d1.setAttribute('onmouseout','this.className="ch"');
			d1.setAttribute('onclick', "drawChord({'div':'" + opts.div + "','menu':'" + opts.menu + "','chordname':'" + opts.chordname + "','variations':'" + opts.variations + "','lefthanded':'" + opts.lefthanded + "','photosvar':'" + opts.photosvar + "','type':'" + type + "','chordstyle':'" + opts.chordstyle + "','print':'" + opts.print + "','chordposition':" + n + "});clearDrop('drop_" + opts.div + "')");
			d.appendChild(d1);
		}
		else
		{
			html += '<div id="drop_' + n + '_' + opts.div + '" class="ch" style="left:' + (spaceX * nn + 5) + 'px;top:' + (ttop * spaceY + 4) + 'px;cursor:pointer;" onmouseover="this.className=\'chordover\'" onmouseout="this.className=\'ch\'" onclick="drawChord({\'div\':\'' + opts.div + '\',\'menu\':\'' + opts.menu + '\',\'variations\':\'' + opts.variations + '\',\'lefthanded\':\'' + opts.lefthanded + '\',\'chordname\':\'' + opts.chordname + '\',\'photosvar\':\'' + opts.photosvar + '\',\'type\':\'' + type + '\',\'chordstyle\':\'' + opts.chordstyle + '\',\'print\':\'' + opts.print + '\',\'chordposition\':\'' + n + '\'});clearDrop(\'drop_' + opts.div + '\')"></div>'
		}
		nn ++;
	}
	if (isIE) d.innerHTML = html
	for (var n = 0;	n < arrVariations.length; n ++)
	{
		drawChord({'div':'drop_' + n + '_' + opts.div,'menu':'','chordname':'','variations':opts.variations,'lefthanded':opts.lefthanded,'type':type,'chordstyle':opts.chordstyle,'print':opts.print, 'chordposition': n})	
	}
	
}
function changeChord(opts)
{
	if (isP != 'S') {
		if ($('#fancyButton1').size() > 0){
			$('#fancyButton1').fancybox({'frameWidth':625, 'frameHeight':315, 'url': base_href + 'site/login2.htm?clos=1&iframe', 'padding':5})
			$('#fancyButton1').click()
			return false	
		} else {	
			alert('To swap chord variations you need to be a premium member')	
			return false
		}
	}
	//alert(opts)
	$('#' + opts.div).animate
	(
		{
			opacity: 0
		}
		, 100
		, ''
		, function (){ 

			drawChord(opts)
			$(this).animate({opacity:1}, 100)
			
		}
	)
}
function drawChord(opts) 
{
/*	'div': 		'chord4',
	'ouvir': 	true,
	'photo':	true,
	'type':		'v',
	'chordname':'Am',
	'variations':'X 0 2 2 1 0,5 7 7 5 5 5'*/
	var html
	var y = 30
	var x = (isIE && ver == 6 ? 21 : 18)
	var n;
	var arrAc 
	var tonica
	var dedo
	var type
	var drawphoto
	var menu
	var chordstyle
	var inversion
	var lefthanded
	var folder
	var oPrint
	
	if (opts.chordstyle == undefined) 
	{
		chordstyle = ""; folder = ""
	}
	else
	{
		chordstyle = opts.chordstyle; folder = chordstyle + "/"
	}
	if (opts.menu == undefined) 
		menu = ""
	else
		menu = opts.menu
	if (opts.drawphoto == undefined) 
		drawphoto = false
	else
		drawphoto = opts.drawphoto
	if (opts.type == undefined || opts.type == "guitar") 
		type = ""
	else
		type = opts.type
	if (opts.print == undefined || opts.print == 'undefined' || opts.print == "guitar") 
		oPrint = ""
	else
		oPrint = opts.print
	if (opts.lefthanded == undefined || opts.lefthanded == "" || opts.lefthanded == "false") 
	{
		lefthanded = false
		//opts.lefthanded = ""
	}
	else
		lefthanded = true


	var chordposition = opts.chordposition
	var arrVariations = opts.variations.split(" "); 
	if (chordposition == undefined) chordposition = 0
	if (chordposition >= arrVariations.length -1) chordposition = 0
	var arrAcorde = arrVariations[chordposition].split(",")
//alert(chordposition)
	if (opts.inversion == undefined) 
		inversion = 0
	else
	{

		inversion = opts.inversion
	//alert(opts.inversions)
		//inversions = opts.inversions
		var arrInversions = opts.inversions.split(" "); 
		if (inversion >= arrInversions.length) inversion = 0
		var arrAcorde = arrInversions[inversion].split(",")
	}

	var refOptsExtra	
	var refOpts = "{'div':'" + opts.div + "', 'menu':'" + menu + "', 'type':'" + type + "','chordname':'" + opts.chordname + "','variations':'" + opts.variations + "','lefthanded':'" + lefthanded + "', 'photosvar': '" + opts.photosvar + "', 'print': '" + opts.print + "', 'chordstyle':'" + chordstyle + "'"

	
	obj = document.getElementById(opts.div)
	//alert(opts.div)
	if (menu.indexOf('D') > -1)
	{
		refOptsExtra = refOpts + "}"
		html = '<div class="chordtitle ' + type + '">' + opts.chordname + '<img class="prem" style="cursor:pointer" src="' + static_server + 'images/chords/arrow_down.gif"width="7"height="7" onClick="drawVariations(\'drop_' + opts.div + '\', ' + refOptsExtra + ')"  /></div>'
	}
	else
	{
		html = '<div class="chordtitle ' + type + '">' + opts.chordname + '</div>'
	}

	if (type == "keyboard")
	{
		html += '<div><img src="' + static_server + 'images/chords/teclado.png" /></div>'
		tecla = 0
		dedo = 0
		arrAcorde[arrAcorde.length] = arrAcorde[0]

		for (var n = 1; n <= 33; n ++)
		{
			if (n != 6 && n != 14 && n!= 20 && n!= 28) tecla ++
			if (tecla == 13) tecla = 1
			arrAc = arrAcorde[dedo]
			if (tecla == parseInt(arrAc))
			{
				if (tecla == 2 || tecla == 4 || tecla == 7 || tecla == 9 || tecla == 11)
				{
					if (dedo == 0)
					{
						html += drawFinger(n * 6 + x - (isIE & ver == 6? 29 : 20), 21, 0, "key4.gif")
						html += drawFinger(n * 6 + x - (isIE  & ver == 6? 29 : 20), 40, 0, "bolabranca.jpg" )
					}
					else
					{
						html += drawFinger(n * 6 + x - (isIE  & ver == 6 ? 29 : 20), 40, 0, (dedo == 0 ? "bolayellow.gif" : "bolabranca.jpg" ) )
					}
				}
				else
				{
					if (dedo == 0)
					{
						if (tecla == 1 || tecla == 6) key = 1
						if (tecla == 3 || tecla == 8 || tecla == 10) key = 2
						if (tecla == 5 || tecla == 12) key = 3
					
						html += drawFinger(n * 6 + x - (isIE  & ver == 6? 31 : 22) - (key == 1 ? 1 : 0), 21, 0, "key" + key + ".gif")
						html += drawFinger(n * 6 + x - (isIE  & ver == 6? 29 : 20), 60, 0,"bolapreta.jpg")
					
					}
					else
					{
						html += drawFinger(n * 6 + x - (isIE  & ver == 6? 29 : 20), 60, 0, (dedo == 0 ? "bolayellow.gif" : "bolapreta.jpg" ))
					}
				}
				dedo ++
			}
			
		}
	
	
		html += '<div class="chordmenu keyboard" ' + (drawphoto ? 'style="_margin-top:-2px"' : 'style="margin-top:5px"') + '>'

	}
	else
	{
		if (opts.drawphoto)
		{
			html += '<div class="trastenum"  style="width:14px"> </div><img src="http://www.e-chords.com/arquivos/chords/img/guitar/thumb/' + arrVariations[chordposition].replaceAll(',', ' ') + '.jpg" style="border:solid 1px #000" />'
		}
		else
		{	
		if (oPrint) // || $("#thechords2").css('display') == 'block')
		{
			//alert("oPrint: " + oPrint)
//			html += '<div class="trastenum"  style="width:14px"> </div><div style="position:relative;margin-top:-19px;z-index:-1;height:109px"><img src="http://www.cifras.com.br/images/chordimagewhitemin.asp?chord=' + arrVariations[chordposition] + '" style="margin-left:-14px" /></div>'
			html += '<img src="http://www.cifras.com.br/images/chordimagewhitemin.asp?chord=' + arrVariations[chordposition] + '" />'
		}
		else
		{
			var min = 100
			var max = 0
			var toques = 0
			var bolTonica = true
			var primeiroTraste 
			for (var n = 0; n < arrAcorde.length; n ++)
			{
				arrAc = arrAcorde[n]
				if (arrAc != "X")
				{
					if (arrAc.substr(0,1) != "P")
					{
						if (arrAc != "0" && parseInt(arrAc) < min) min = parseInt(arrAc);
						if (parseInt(arrAc) > max) max = parseInt(arrAc);
					}
					if (arrAc.substr(0,1) != "P" && arrAc != "0") toques ++;
					if (bolTonica)
					{
						tonica = n
						bolTonica = false
					}
				}
			}
			intPestana = 0	
			startPestana = -1	
			//alert(arrAcorde + ' - ' + toques)

			if (toques > 4)
			{
				for (var n = 0; n < arrAcorde.length; n ++)
				{
					/*if (arrAcorde[n] != "X" && arrAcorde[n] != "0") {
						arrAcorde[n] = "P" + arrAcorde[n]; break
						}*/
						if (arrAcorde[n] == min)
						{
						arrAcorde[n] = "P" + arrAcorde[n]; 
						startPestana = n
						intPestana ++;
						
						//break
						}
						
						
						
				}
			}

			if (intPestana == 1) arrAcorde[startPestana] = arrAcorde[startPestana].replace("P", "");			
			intPestana = (intPestana > 1 ? 1 : 0)


			// ROTINA PARA COLOCAR SEGUNDA PESTANA 
			//alert(arrAcorde + ' - toques:' + toques + " - intPestana: " + intPestana + ' - countNotes(arrAcorde): ' + countNotes(arrAcorde))
			if ((toques - intPestana) > 4)
			{
				for (var n = arrAcorde.length -2; n >0; n --)
				{
					if (arrAcorde[n] == max && 
								  ( n == 3 && arrAcorde[n] == arrAcorde[n + 1].replace("P", "") && arrAcorde[n] == arrAcorde[n + 2].replace("P", "")  )  )
					{
						arrAcorde[n] = "P" + arrAcorde[n]; 
					}						
				}
			}

			
			toques = countNotes(arrAcorde)
			//alert(arrAcorde + ' - toques:' + toques + " - intPestana: " + intPestana)

			primeiroTraste = min;
			if (max <= 5) min = 1;
			dedo = 1
		
			if (min > 1) 
				mmin = (min * 16) - 16 
			else 
				mmin = 0	
		
			//if (chordstyle == "classic")
			//	braco  = "bracoclassic.gif"
			//else
			//{
				braco = (max >5 ? folder + 'braco2' : folder + 'braco') + ".gif"
				braco = braco.replace(".", type + ".")
			//}

		
			html += '<div class="trastenum">' + (max > 5 ? min + 'ª' : '') + '</div>'
	
			//if (chordstyle == "" && type == "")
			if (type == "")
			for (var n = min; n <= (min + 4); n ++)
				if (n == 3 || n == 5 || n == 7 || n == 9 || n == 11 || n == 13)
					html += drawFinger(3 * 12 + x - 3, (n - min + 1) * 16 + y - 13 , 0, "bolinha.jpg", folder)
		
			if (lefthanded)	arrAcorde.reverse()
			for (var traste = min; traste <= (min + 4); traste ++)
			{
				pestana = false
				trasteVazio = true
				//for (var corda = 0; corda <= 5; corda ++)
				for (var corda = (lefthanded? 5 : 0); (lefthanded? corda >= 0 : corda <= 5); corda = corda + (lefthanded? -1 : 1) )
				{
			
					if (arrAcorde[corda] == ("P" + traste)) 
						posPestana = true 
					else 
						posPestana = false
					// X,7,8,6,5,5	
					if (arrAcorde[corda] == traste.toString() || posPestana) 
					{
						trasteVazio = false
						//if ((toques > 4 && traste == primeiroTraste) || posPestana)
						if (posPestana)
						{ 
							if (chordstyle == "classic")
							html += drawFinger(corda * 12 + x + 1, traste * 16 + y - 13 - mmin, (6 - corda) * 12 - 2, -2)
							else
							{
								html += drawFinger((lefthanded ? 0 : corda * 12 ) + x, traste * 16 + y - 15 - mmin, (arrAcorde.length - (lefthanded ? 5 - corda : corda)) * 12 - 2, -1, folder)
								html += drawFinger(corda * 12 + x, traste * 16 + y - 13 - mmin, 0, dedo, folder)
							}
		
							dedo ++
							break;
							
						}
						else
						{
							html += drawFinger(corda * 12 + x, traste * 16 + y - 15 - mmin, 0, dedo, folder)
							dedo ++
						}
					}
				} 
				if (trasteVazio && dedo > 1 && dedo < 3 && toques < 4) dedo ++
			}
		
			for (var n = 0;  n < arrAcorde.length; n ++){
				if (arrAcorde[n] == "X")
					html += drawFinger(n * 12 + x + 2, 84 + y, 0, "x.jpg")
				else
					if ( (lefthanded ? 5 - tonica : tonica)   == n) 
						html += drawFinger(n * 12 + x + 2, 84 + y, 0, "bolapreta.jpg")
					else
						html += drawFinger(n * 12 + x + 2, 84 + y, 0, "bolabranca.jpg")
			}
			html += '<div><img src="' + static_server + 'images/chords/' + braco + '" /></div>'
		}
		html += '<div rel="' + opts.chordname + ',' + chordposition + '" class="chordmenu ' + type + '" ' + (drawphoto ? 'style="_margin-top:12px"' : 'style="margin-top:' + (oPrint ? 0 : 15) + 'px;"') + '>'
		}
	}
	

	
	if (menu.indexOf('V')>-1) 
	{
		if (arrVariations.length > 1)
		{
			refOptsExtra = refOpts + ", 'chordposition':" + (chordposition + 1) + "}"
			//html += '<a onclick="javascript:drawChord(' + refOptsExtra + ')">variar</a> '
			html += '<a class="prem" onclick="javascript:changeChord(' + refOptsExtra + ')">swap</a> '
		}
		else
		{
			html += 'change '
		}
	}
	if (menu.indexOf('I')>-1 && type == "keyboard") 
	{
		refOptsExtra = refOpts + ", 'inversion':" + (inversion + 1) + ", 'inversions': '" + inverse(arrVariations[chordposition]) + "'}"
		html += '<a onclick="javascript:drawChord(' + refOptsExtra + ')">inverter</a> '
	}

	if (menu.indexOf('O')>-1) html += '<a onclick="">sound</a> '
	
	
	
	// verifica se o array de fotos tem a foto do acorde atual
	var havePhoto = false
	if (menu.indexOf('P')>-1)
	{
		if (opts.photosvar != undefined)
		{

			try
			  {
						photo = ' ' + eval(opts.photosvar) + ' '
			  }
			catch(err)
			  {
						photo = ''
			  }
			if (photo.indexOf(arrVariations[chordposition]) >-1) 
			{
				if (drawphoto) 
					refOptsExtra = refOpts + ", 'chordposition':" + chordposition + ",'drawphoto':false}"
				else
					refOptsExtra = refOpts + ", 'chordposition':" + chordposition + ",'drawphoto':true}"
	
				html += '<br /><a onclick="javascript:drawChord(' + refOptsExtra + ')">photo</a> '
				havePhoto = true
			}
		}
		if (!havePhoto) 
			html += '<br />photo '
	}
	if (menu.indexOf('A')>-1) html += '<br /><img src="' + static_server + 'images/bt_add.png" rel="' + arrVariations[chordposition] + '|' + $('img[alt^=add]').size() + '" alt="add to your personal chord lybrary" /> '
	if (menu.indexOf('R')>-1) html += '<br /><img src="' + static_server + 'images/bt_remove.png" rel="' + arrVariations[chordposition] + '|' + $('img[alt^=remove from]').size() + '" alt="remove from your personal chord lybrary" /> '

	html += '</div>'
	obj.innerHTML = html
}


function drawFinger(x, y, size, finger, chordstyle)
{
	var draw;
	if (chordstyle == undefined) chordstyle = ""
	draw = '<div class="ch" style="top:' + y + 'px; left:' + x + 'px">'
	if (finger == -1)
	{
		draw += '<img src="' + static_server + 'images/chords/' + chordstyle + 'pestana.gif" width="' + size + '" height="10">'
	}
	else if (finger == -2)
	{
		draw += '<img src="' + static_server + 'images/chords/pestana.bmp"width="' + size + '"height="5">'
	}
	else if (finger == "x.jpg" || finger.toString().substr(0,3) == "bol" || finger.toString().substr(0,3) == "key")
	{
		draw += '<img src="' + static_server + 'images/chords/' + chordstyle + finger + '"width="6"height="6">'
	}
	else
	{
		draw += '<img src="' + static_server + 'images/chords/' + chordstyle + finger + '.gif"width="9"height="9">'
	}
	draw += '</div>'
	return draw;
}

function countNotes(array1)
{

	var array = array1.join(","); array = array.split(",")
	var count = 0
	var elem
	
	for (var n = 0; n < array.length; n ++)
	{
		elem = array[n]
		if (elem.substr(0,1) == "P")
		{
			tecla = elem.replace("P", "")
			for (nn = n + 1; nn < array.length; nn++)
				if (array[nn].replace("P", "") == tecla) array[nn] = "X"
		}
		
		if (elem != "X" && elem != "0")
		{

				count ++
		}
	}
	return count
}



var contInversions = 0
	
//drawChord({'div':'chord2', 'menu':'VOP','chordname':'A','variations':'5,7,7,6,5,5','photosvar':'photos'})

function inverse(chord)
{
	var inversions = "";
	inversions += chord + ' '
	var newchord = ""
	if (chord.indexOf(' ') > -1) 
	{
		var chords = chord.split(' ')
		chord = chords[chords.length - 1]
	}

	var arrAcorde = chord.split(',')
	pos = arrAcorde.length - 1
	for (var n = 0; n < arrAcorde.length; n ++)
	{
		newchord += ',' + arrAcorde[pos]
		pos ++
		if (pos >= arrAcorde.length) pos = 0
	}
	newchord = (newchord.substr(0,1) == "," ? newchord.substr(1) : "")
	contInversions ++
	inversions += newchord
	if (contInversions == arrAcorde.length - 1) 
	{	
		//var newinversions = inversions + ''
		//inversions = ""

		contInversions = 0
		return inversions; //inversions
	}
	
	return inverse(inversions)
}
function addEvent(obj, evType, fn){
 if (obj.addEventListener){
    obj.addEventListener(evType, fn, false);
    return true;
 } else if (obj.attachEvent){
    var r = obj.attachEvent("on"+evType, fn);
    return r;
 } else {
    return false;
 }
}
//addEvent(window, "load", readChords);
