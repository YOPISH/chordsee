// drag jquery
(function(E){E.fn.drag=function(L,K,J){if(K){this.bind("dragstart",L)}if(J){this.bind("dragend",J)}return !L?this.trigger("drag"):this.bind("drag",K?K:L)};var A=E.event,B=A.special,F=B.drag={not:":input",distance:0,which:1,dragging:false,setup:function(J){J=E.extend({distance:F.distance,which:F.which,not:F.not},J||{});J.distance=I(J.distance);A.add(this,"mousedown",H,J);if(this.attachEvent){this.attachEvent("ondragstart",D)}},teardown:function(){A.remove(this,"mousedown",H);if(this===F.dragging){F.dragging=F.proxy=false}G(this,true);if(this.detachEvent){this.detachEvent("ondragstart",D)}}};B.dragstart=B.dragend={setup:function(){},teardown:function(){}};function H(L){var K=this,J,M=L.data||{};if(M.elem){K=L.dragTarget=M.elem;L.dragProxy=F.proxy||K;L.cursorOffsetX=M.pageX-M.left;L.cursorOffsetY=M.pageY-M.top;L.offsetX=L.pageX-L.cursorOffsetX;L.offsetY=L.pageY-L.cursorOffsetY}else{if(F.dragging||(M.which>0&&L.which!=M.which)||E(L.target).is(M.not)){return }}switch(L.type){case"mousedown":E.extend(M,E(K).offset(),{elem:K,target:L.target,pageX:L.pageX,pageY:L.pageY});A.add(document,"mousemove mouseup",H,M);G(K,false);F.dragging=null;return false;case !F.dragging&&"mousemove":if(I(L.pageX-M.pageX)+I(L.pageY-M.pageY)<M.distance){break}L.target=M.target;J=C(L,"dragstart",K);if(J!==false){F.dragging=K;F.proxy=L.dragProxy=E(J||K)[0]}case"mousemove":if(F.dragging){J=C(L,"drag",K);if(B.drop){B.drop.allowed=(J!==false);B.drop.handler(L)}if(J!==false){break}L.type="mouseup"}case"mouseup":A.remove(document,"mousemove mouseup",H);if(F.dragging){if(B.drop){B.drop.handler(L)}C(L,"dragend",K)}G(K,true);F.dragging=F.proxy=M.elem=false;break}return true}function C(M,K,L){M.type=K;var J=E.event.handle.call(L,M);return J===false?false:J||M.result}function I(J){return Math.pow(J,2)}function D(){return(F.dragging===false)}function G(K,J){if(!K){return }K.unselectable=J?"off":"on";K.onselectstart=function(){return J};if(K.style){K.style.MozUserSelect=J?"":"none"}}})(jQuery);

$(document).ready(function() {
	if (typeof(base_href) == 'undefined') {
		var base_href = "https://www.e-chords.com/";
	}
});
var static_server 	= "https://e-chords-static-petaxxoninformat.netdna-ssl.com/";

var isIE = $.browser.msie;
var intKey = 0;
var intInitKey = 1; 	//initial key
var cifra;
var arrChordsUsed = chordsUsed.split(" ")
var leftHanded = false
var isHideChords = false;
var maxY;
var cursorX, cursorY;
var isShowChords = false;
var isSplitColumns = false
var originalCifra;
var bolChordsOnLyrics = false
var dropKeyOpened = false
var invChanged = new Array()
var floatingChord = 0;
var timeFloatingChord = new Array()
var floatChordZIndex = 300
var count;
var cache = new Array();
var startFloatChord;
var killFloatChord;
var heightBanner = 120
var paramDigitacoes;
notas_musicais = new Array ();notas_musicais[1] = new Array('C', '');notas_musicais[2] = new Array('C#', 'Db');notas_musicais[3] = new Array('D', '');notas_musicais[4] = new Array('Eb', 'D#');notas_musicais[5] = new Array('E', '');notas_musicais[6] = new Array('F', '');notas_musicais[7] = new Array('F#', 'Gb');notas_musicais[8] = new Array('G', '');notas_musicais[9] = new Array('G#', 'Ab');notas_musicais[10] = new Array('A', '');notas_musicais[11] = new Array('Bb', 'A#');notas_musicais[12] = new Array('B', '');


function drawGlossary()
{
	$('#thechords').html('')
	x = 0;
	xx = 0
	var cols, height
	switch (typeInstrument)
	{
		case 'keyboard':
			cols = 4
			height = 110
			break
		default:
			cols = 8
			height = 155

	}

	for (var z in chords){
		if (x % cols == 0)
		{
			xx ++
			$("<div></div>").appendTo('#thechords').attr('id', 'spanchords_' + xx).css({'height':height}) //, 'overflow':'hidden'})
		}

		$("<div></div>").attr({ 'id' : 'thechord_' + x }).addClass('drawchord').appendTo('#spanchords_' + xx)

		drawChord({'div':'thechord_' + x,'menu':'VOIDP','type':typeInstrument,'chordname':z,'variations':chords[z].variations,'photosvar':'photos', 'lefthanded':leftHanded})

		x ++;
	};
	$('#thechords').css({height: parseInt(x/cols) * (height + 5) + (x % cols == 0 ? 0 : (height + 5)) })
}

var isLoggedIn	= (GetCookie ('ec%2Dmb') != '' && GetCookie ('ec%2Dmb') != null);
var isP 		= (GetCookie ('ec%2Dpmb') != '' && GetCookie ('ec%2Dpmb') != null) ? 'S' : 'N'; 	//$.get('ajax.asp', 'acao=get_status', function(r){isP = r.isP;}, 'json')

jQuery.fn.replaceChords = function(tone) {
	cont = 0
	if (tone == undefined) tone = intKey
	return this.each(function(){
		element = $(this);
		$(this)
		.html(retornaNovaNota2(element.html(), tone, true))
	});
};

jQuery.fn.replaceChordsA = function(replacement) {
	//cont = 0
	return this.each(function(){

		element = $(this);

		ch = retornaNovaNota2(element.html(), intKey, false)
		$(this)
		.html(ch)
		.attr('rel', ch)
	});
};
/*function logg()
{
	isLoggedIn = true
	$('.opcoes >span:eq(1)').unbind('click').bind('click', function(){startCorrect();})
	$('.com_cap >img:last').unbind('click').bind('click', function(){comment();})
}*/
function commentReport(idcomm, reports)
{
	if (!isLoggedIn)
	{
		$('#fancyButton1').fancybox({'frameWidth':625, 'frameHeight':315, 'url': base_href + 'site/login1.asp?func=commentReport(' + idcomm + ',*' + reports + '*)&clos=1&iframe', 'padding':5});
		$('#fancyButton1').click()
	}
	else
		if (confirm('Click ok if you really think this comment is illegal'))
		{

			if (cache['report_comment_' + idcomm] == undefined)
			$.get('ajax.asp', 'acao=report_comment&p=' + idcomm + '&p2=' + reports + '&p3=' + id, function(r){
			if (r.result == 1 || r.result == 4)
				alert('Your report was saved successfully. Thank you.');
			if (r.result == 2)
				alert('You\'ve already reported this comment before.');
			if (r.result == 3)
				alert('There was an error in this request. Please try again later.');

			cache['report_comment_' + idcomm] = 1
			}, 'json')
			else
				alert('You\'ve already reported this comment before.');
		}

}
function commentRemove(idcomm)
{
	if (!isLoggedIn)
	{
		$('#fancyButton1').fancybox({'frameWidth':625, 'frameHeight':315, 'url': base_href + 'site/login1.asp?func=commentRemove(' + idcomm + ')&clos=1&iframe', 'padding':5});
		$('#fancyButton1').click()
	}
	else
	{
		if (confirm('Click ok if you really want to remove your comment'))
		{

			$.get('ajax.asp', 'acao=remove_comment&p=' + idcomm + '&p2=' + id, function(r){
			if (r.result == 1)
				$('#comm_' + idcomm).hide('fast').remove()
			if (r.result == 2)
				alert('There was an error in this request. Please try again later.');
			}, 'json')
		}


	}
}
function commentReply(idcomm, idmember)
{
	if (!isLoggedIn)
	{
		$('#fancyButton1').fancybox({'frameWidth':625, 'frameHeight':315, 'url': base_href + 'site/login1.asp?func=commentReply(' + idcomm + ')&clos=1&iframe', 'padding':5});
		$('#fancyButton1').click()
	}
	else
	{
		$('#comm_close').remove()
		$('#input_com').clone().hide().insertAfter('#comm_' + idcomm).attr('id', 'input_com_temp').append('<img id="comm_close" src="js/fancybox/fancy_closebox.png" style="float:right;position:relative;margin-top:-205px;left:75px" />').show('fast')
		$('#input_com').hide('fast').remove()
		$('#input_com_temp').removeAttr('id').attr('id', 'input_com')
		$('#input_com p:first').html('Reply this comment')
		$('#id_parent').val(idcomm);$('#id_membro_pergunta').val(idmember);
		$('#comm_close').bind('click', function(){

			$('#id_parent').val('0');$('#id_membro_pergunta').val('0');
			$('#input_com').clone().hide().prependTo('.bloco_banner').attr('id', 'input_com_temp').show('fast')
			$('#input_com').hide('fast').remove()
			$('#input_com_temp').removeAttr('id').attr('id', 'input_com')
			$('#input_com p:first').html('Send your comment')
			$('#comm_close').remove()
			startComm()

		})
		startComm()
	}

}

function startCorrect()
{
	$('.coremain').hide(100)
	$('#box_subtools, #fixed0, .tom, #hasvideo, #thechords, #showchords, #fixed1, #changecolors, #inversions, #fixed2, #playbeat, .comments, .tones').hide()
	$('#correct').html('<img src="' + static_server + 'images/wait.gif" /><br><br><br><br><br><br><br><br>').show(100)
	$('.echord').css('padding-left', 25)
	for (var n = 0; n < floatingChord; n ++) { $('#flchord_' + n).hide(100) }

	if (cache['correction'] == undefined)
		$.ajax({type: 'GET', url:'ajax.asp', data:'acao=correct&p=' + id + '&p2=' + tipoTab, cache: true, success: function(r){
			$('#correct').html(r)
			cache['correction'] = r
		}})
	else
		$('#correct').html(cache['correction'])
}
function hideChords()
{
	if (!isHideChords) {
		$("#core").find("a").css('visibility','hidden');
		$("#t_hide").html('show chords');
	}else{
		$("#core").find("a").css('visibility','visible');
		$("#t_hide").html('hide chords');
	}
	isHideChords = !isHideChords
}

function sizeUp(val)
{
	$("#core").css({fontSize: parseInt($("#core").css('font-size')) + val * 2  })

	maxY = $('#request').position().top - (250 - heightBanner)
}
function procuraNota(strNota3) {
	for (n1=1; n1<=12; n1++) {if (notas_musicais[n1][0] == strNota3 || notas_musicais[n1][1] == strNota3) break	}
	return n1;
}
function retornaNota(strNota1, intTom) {
	var id = procuraNota(strNota1);
	if (id == 13) return strNota1
	if (intTom < 0) {intTom += 12;}
	if (intTom > 12) intTom = intTom % 12;
	var novo_id = id + intTom;
	if (novo_id > 12) novo_id = novo_id % 12;
	strNota1 = notas_musicais[novo_id][0];
	return strNota1;
}

var cont = 0;

function retornaNovaNota2(strNota2, intTom, poeTags) {
	strNota2 += ' ';nova_nota = ''; nota_2 = ''; tamanho = strNota2.length; acorde = '';aberto = false;
	for (pos = 0; pos < tamanho; pos ++)
	{
		nova_nota += strNota2.substr(pos, 1);
		notaFutura = nova_nota + strNota2.substr( pos + 1, 1) // + '*'
		if ((strNota2.substr(pos, 1) == ' ' || strNota2.substr(pos, 1) == '\t') && aberto)
		{
			aberto = false
				//nota_2 += '<a onMouseOver="MD(\'' + acorde + '\')" rel="' + acorde + '" id="a' + (cont++) + '">' + acorde + '</a>'
			if (poeTags)
			{
				nota_2 += '<a onMouseOver="MD(' + cont + ')" rel="' + acorde + '" id="a' + (cont++) + '">' + acorde + '</a>'
			}
			else
				nota_2 += acorde
			acorde = ''
			txtAcorde = ''
		}
		if (strNota2.substr(pos, 1) != ' ' && strNota2.substr(pos, 1) != '\t' && !aberto)
		{ aberto= true;acorde = '';txtAcorde = '' }
		if (procuraNota(notaFutura) == 13)
		{
			if (intTom == 0) acorde += nova_nota
			else
			acorde += retornaNota (nova_nota, intTom);nova_nota = '';
		}
		if (!aberto && pos < tamanho - 1) nota_2 += strNota2.substr(pos, 1)
	}
	return nota_2;
}

function showChords()
{
	if (!isShowChords)
	{
		x = 0
		for (var n in chords)
		{
			$("<div></div>").attr({ 'id' : 'showchord_' + x }).addClass('drawchord2').appendTo('#showchords')
			drawChord({
				'div': 		'showchord_' + x,
				'menu': 	'',
				'chordname':n,
				'variations':chords[n].variations,
				'photosvar':'photos',
				'type':typeInstrument,
				'lefthanded':leftHanded
				})
				x ++;

		}

		$('#showchords').css({display: 'block'}).animate({
			left: $(window).width() - 260
		}, 'fast')
		$("#showc").text("hide chords");
		isShowChords = true;
	}
	else
	{
		$('#showchords').animate({
			left: $(window).width()
		},'fast', '',
		function (){
				for (var n in chords)
				{
					$("#showchords").remove('showchord_' + x )
					x ++;
				}
				$("#showchords").html('').css({display: 'none'})
			}

		)
		$("#showc").text("show chords");
		isShowChords = false;
	}
}

function inCollection(arr, index)
{
	var n = 0
	for (nn in arr)
	{
		if (n == index) break
		n ++
	}
	return nn
}
function openWait()
{
	/*$('<div></div>').insertAfter('body').html('<img src="images/wait.gif" />')
	.css({
			'position':'absolute',
			'top': 500,
			'left':500
	    })*/

	$('body').css('cursor','progress')

}
function closeWait() {
	$('body').css('cursor','auto')
}
function changeKey(key)
{
	if (bolChordsOnLyrics) return false

	if (isP != 'S' && key != 1) { 	// && (key > 1 || key < -1)){
		$('#fancyButton1').fancybox({'frameWidth':625, 'frameHeight':315, 'url': base_href + 'site/login1.htm?t=premium&func=window.top.isP=\'S\';window.top.changeKey(' + key + ')&clos=1&iframe', 'padding':5})
		$('#fancyButton1').click()
		return false
	}

	chordsUsed = retornaNovaNota2(chordsUsed, key - 1, false)
	chordsDefault = retornaNovaNota2(chordsDefault, key - 1, false)

	//var chords1 = retornaNovaNota2(chordsUsed, key - 1, false)
	var chords1 = chordsUsed
	//var chords2 = escape(retornaNovaNota2(chordsDefault, key - 1, false))
	var chords2 = escape(chordsDefault)

	arrChordsUsed = chords1.split(" ")
	openWait()
	$.get('ajax.asp', 'acao=CHANGE_KEY&p=' + chords1.replaceAll('#', '%23').replaceAll('+', '%2B').replaceAll('/', '%2F') + '&p2=' + chords2 + '&p3=' + key + '&p4=' + typeInstrument, function(r){
			$("#actions").html(r)

			//intKeyTemp = intKey
			intKey = key - 1
			$(".actualkey").html( retornaNovaNota2(strKey, key - 1) )
			strKey = $(".actualkey").html()

			$('.tom > div').each(function(){
				$(this).attr('title', parseInt($(this).attr('title')) - parseInt(intKey) )
			})

			//$('#core').html(cifra);
			//$('#core').html("<pre>" + cifra + "</pre>")

			$('#core a').replaceChordsA();
			drawGlossary()

			drawFloatingChords(chords1)
			/*for (nn in chords)
			{
				//alert(chords[nn].inversions)
				chords[nn].inversions = retornaNovaNota2(chords[nn].inversions, key - 1)
			}*/
			//changeInversions()
			setInversionsDiv()
			if (isShowChords)
			{
				isShowChords = false
				show
				Chords()
			}

			$("#core a").css({'color': '#' + color[0]})
			$("#core").css({'color': '#' + color[1]})

			$(".topo_cifra .subopcoes a").each(function() {
				var href = $(this).attr('href');
				if (intInitKey > 1) {
					if (href.indexOf('key-') < 0) {
						href += (href.substr(href.length * -1) !== "/" ? "/" : "") + "key-" + intInitKey;
					} else {
						href = href.replace(/key-\d+/g, "key-" + intInitKey);
					}
				} else {
					href = href.replace(/\/key-\d+/g, "");
				}
				$(this).attr('href', href);
			});

			closeWait();
						//intKey = intKeyTemp
		//intKey=0
			btnSaveTo();

	})

}
function drawFloatingChords(paramChords)
{
	//'flchord_' + floatingChord

	arrParamChords = paramChords.split(" ")

	for (var n = 0; n < floatingChord; n ++)
	{
		rel = $('#flchord_' + n).attr('rel')

		if (rel != undefined) { // && chords[$('#flchordcontent_' + n + ' > div:eq(0)').html()] != undefined){

		try
		{
		drawChord({
		'div': 		'flchordcontent_' +  n  ,
		'chordname':arrParamChords[rel],
		'variations':chords[arrParamChords[rel]].variations,
		'photosvar':'photos',
		'type':typeInstrument,
		'lefthanded':leftHanded
		})
		}
		catch(e)
		{

		}



		}

	}

}
function checkTagU(line)
{
	g1 = line.match(/<u>/gi)
	g2 = line.match(/<\/u>/gi)
	//alert("line na function: " + line)

	g1 = (g1 == null ? 0 : g1.length)
	g2 = (g2 == null ? 0 : g2.length)

	//alert("line (dentro do if): " + line + " <u>: " + g1.length + " </u>:" + g2.length)

	if(g1 < g2)
	{
		line = "<u>" + line
		//alert(line)
	}
	if(g2 < g1)
	{
		line += "</u>"
		//alert(line)
	}
//				text.match(/<u>/gi).length
	return line
}
function cutLine(line1, line2, cols, debug)
{
	var newLine = new Array()
	col = 0
	var char = "¨"
	var newLine1, newLine2
	newLine1 = line1
	newLine2 = line2
	newLine1 = newLine1.replaceAll('<u>', '[').replaceAll('</u>', ']')
	var pos = 0

	if (newLine1.length < cols) return line1 + '\n' + line2
	//alert('parte 1: ' + debug + '\nline1: ' + newLine1 + '\n---\nline2: ' + line2)
	//0123456789012345678901234567890
	//[B7(b9)]          [E7]           [A7] [D7M]     [G7+]                   [A7]
	var lll = ''
	if (newLine1.length > cols && newLine1.substr(0,cols).indexOf(' ')==-1) {
		newLine1 = newLine1.substr(0,cols) + ' ' + newLine1.substr(cols)
	}
	while (pos + cols < newLine1.length)
	{
		for (var n = pos + cols; n >pos; n --)
		{
			if (newLine1.substr(n, 1) == " "){
				lll += newLine1.substring(pos, n ) + char //+ newLine1.substr(n)
				pos = n //+ 1
				//alert('newLine parcial: ' + lll + '\npos: ' + pos)
				break;
			}
		}

	}
	if (pos < newLine1.length) lll += newLine1.substring(pos) + char
	newLine1 = lll
	if (newLine1.substr(newLine1.length - 1, 1) == char) newLine1 = newLine1.substr(0, newLine1.length - 1)

	//alert('parte 2: ' + debug + '\nline1: ' + newLine1 + '\n---\nline2: ' + line2)
//	newLine1 = newLine1.replaceAll('[', '<u>').replaceAll(']', '</u>')

	if (newLine2 > " ")
	{
		if (newLine2.length > cols && newLine2.substr(0,cols).indexOf(' ')==-1) {
			newLine2 = newLine2.substr(0,cols) + ' ' + newLine2.substr(cols)
		}


		var arr = newLine1.split(char)
		//newLine2 = line2
		lll = ''
		pos = 0
		for (var nn = 0; nn < arr.length; nn ++)
		{

			lll += newLine2.substr(pos, arr[nn].length) + char //+ newLine2.substr(arr[nn].length)
			//alert('lll line2: ' + lll + '\npos: ' + pos + '\narr[' + nn + '].length: ' + arr[nn].length + '\ntrecho: ' + newLine2.substr(pos, arr[nn].length) + '\nnewLine2: ' + newLine2)
			pos += arr[nn].length //+ 1
			if (pos > newLine2.length) break

		}
		if (lll.substr(lll.length - 1, 1) == char) lll = lll.substr(0, lll.length - 1)
		if (pos < newLine2.length) lll += newLine2.substr(pos)



		//line2 = newLine2
		newLine2 = lll

		//alert(debug + '\netapa 2: line1: ' + newLine1 + '\n---\nline2: ' + newLine2 + '\ncorte pos: ' + arr[0].length)

		var arr2 = newLine2.split(char)
		newLine1 = ''

		if (arr.length > arr2.length)
			max1 = arr.length
		else
			max1 = arr2.length


		for (var nn = 0; nn < max1; nn ++)
		{
			newLine1 += (arr[nn] == undefined ? '' : arr[nn]) + '\n' + (arr2[nn] == undefined ? '' : arr2[nn] + '_\n')
		}



	}
	else
	{

		var arr = newLine1.split(char)
		newLine1 = ''
		for (var nn = 0; nn < arr.length; nn ++)
		{
			newLine1 += arr[nn] + '\n'
		}


	}
	//alert('newLine1: ' + newLine1.replaceAll('[', '<u>').replaceAll(']', '</u>'))
	return newLine1.replaceAll('[', '<u>').replaceAll(']', '</u>')

}
function stripTagsA(txt)
{
	//var reg = new Regexp("<[//]{0,1}(" + tags + ")[^><]*>", "gi")
	pos = 0
	while (pos > -1){
		txt = txt.replace(/<[//]{0,1}(a)[^><]*>/gi, '');
		//txt = txt.replace(reg, '');
		pos = txt.indexOf('<a');
	}
	return txt
}

function stripTagsU(txt)
{
	pos = 0
	while (pos > -1){
		txt = txt.replace(/<[//]{0,1}(U)[^><]*>/gi, '');
		pos = txt.indexOf('<u');
	}
	return txt
}


function splitColumns()
{
	maxCol = 40

	if (!isSplitColumns)
	{

		//cifra2 = (cifra + "\n").split('\n')
		//.replace( /<a\b[^>]*>(.*?)<\/a>/  , '')
		//alert($('#core').html())
		if (isIE && ver==6)
		{
			$('#core u').each(function(){
				element = $(this);
				element
					.after("<u></u>").next()
					.html(element.html())
					.prev().remove();
			})
		}
		//else
		if (bolChordsOnLyrics)
		{
			$('#core a').each(function(){
				$(this).html($(this).attr('rel'))
			}).removeAttr('style')
			//bolChordsOnLyrics = false
			$('#core').css({'line-height':'1.4em'})
		}


		originalCifra = $('#core').html()


		cifra2 = stripTagsA($('#core').html()).split('\n')




		//cifra2[0] = "<!--SpCl--><div style='float:left;width:47%;margin-right:10px;'><pre><!--/SpCl-->" + cifra2[0]
		ref = false
		tab = false
		for (n = 0; n < cifra2.length; n ++)
		{
			//alert('linha ' + n + ': ' + cifra2[n])

			if (cifra2[n].indexOf("curva_up_tab") > -1) tab = true; // refrao aberto

			//alert(stripTagsAU(cifra2[n]))
			if (
			stripTagsU(cifra2[n]).length > maxCol &&
			cifra2[n].indexOf("curva_up_chorus") == -1 &&
			cifra2[n].indexOf("curva_down_chorus") == -1 &&
			!tab
			)

			{
				//alert('linha ' + n + ': ' + cifra2[n])
				if (cifra2[n].toLowerCase().indexOf("<u>") > -1) // linha de acordes
				{

					// se a linha seguinte não é de acordes...
					if (cifra2[n + 1].toLowerCase().indexOf("<u>") == -1) {
						//alert(cifra2[n] + '\n---\n' + cifra2[n + 1])
						cifra2[n] = cutLine(cifra2[n], cifra2[n+1], maxCol, 'acordes, letras')
						cifra2[n+1] = "***"
						n ++
					}
					else // se a linha seguinte é de acordes
					{
						cifra2[n] = cutLine(cifra2[n], '', maxCol, 'acordes, acordes')
					}
				}

				else //if (cifra2[n].toLowerCase().indexOf("<u>") == -1)
				{

					/*if (cifra2[n - 1].toLowerCase().indexOf("<u>") > -1) {
						cifra2[n] = cutLine(cifra2[n-1], cifra2[n], maxCol, 'letras, acordes')
						cifra2[n-1] = "***"
					}
					else*/
					//{
						cifra2[n] = cutLine(cifra2[n], '', maxCol, 'letras, letras')
					//}
				}
				if (cifra2[n].indexOf("curva_down_tab") > -1) tab = false// refrao fechado




			}
		}
		//alert(cifra2)
		cifra2 = cifra2.join('\n')
		cifra2 = cifra2.split('\n')


		while (jQuery.inArray("***", cifra2) > -1)
		{
			cifra2.splice(jQuery.inArray("***", cifra2), 1)
		}
		cifra2[0] = "<!--SpCl--><div style='float:left;width:47%;margin-right:10px;border-right:dashed 1px #CCC'><pre><!--/SpCl-->" + cifra2[0]

		cifra2 = cifra2.join("\n").split("\n")

		for (n = 1; n < cifra2.length; n ++)
		{
			if (cifra2[n].indexOf("curva_up_chorus") > -1) ref = true; // refrao aberto
			if (cifra2[n].indexOf("curva_up_tab") > -1) tab = true; // refrao aberto

			if (n >= parseInt(cifra2.length / 2) &&
			!ref &&
			!tab &&
			(cifra2[n].toLowerCase().indexOf("<u>") > -1 || (cifra2[n].indexOf("<U>") == -1 && cifra2[n-1].toLowerCase().indexOf("<u>") == -1)
			) )
			{
				cifra2[n] = "<!--SpCl--></pre></div><div style='width:50%;margin-left:47%;'><pre><!--/SpCl-->" + cifra2[n]
				break;
			}

			if (cifra2[n].indexOf("curva_down_chorus") > -1) ref = false// refrao fechado
			if (cifra2[n].indexOf("curva_down_tab") > -1) tab = false// refrao fechado

	}
	cifra2[cifra2.length -1] =  cifra2[cifra2.length - 1] + "<!--SpCl--></pre></div><!--/SpCl-->"
	cifra2 = cifra2.join ("\n")

	//if (isIE && ver == 6)
	$('#core').html(cifra2)
	//else
	//$('#core').html("<pre>" + cifra2 + "</pre>")
	//alert(cifra2)
	if (bolChordsOnLyrics)
	{
		bolChordsOnLyrics = false
		showDrawings()
	}
	$('#core u').replaceChords(0)
	//alert(cifra2)
	setInversionsDiv()
	/*if (isShowChords)
	{
		isShowChords = false
		show
		Chords()
	}*/

	//init()
	$('#core .tab').css({width: 340})
	$('#core .imgtab').attr({width: 364})

	maxY = $('#request').position().top - (250 - heightBanner)
	}
	else
	{
		$('#core').html(originalCifra)
		setInversionsDiv()
		maxY = $('#request').position().top - (250 - heightBanner)
	}
	isSplitColumns = !isSplitColumns
	$('#core').css({'line-height':'1.4em'})
	if (bolChordsOnLyrics) {
		bolChordsOnLyrics = false
		showDrawings()
		//$('#core').css({'line-height':'1.4em'})
	}
	if (fonte_fixa == "1") $('#core pre').css('font-family','arial')

	//init()
}


function showDrawings()
{
	//alert(bolChordsOnLyrics)
	var n = 0
	var x= 0
	if (!bolChordsOnLyrics)
	{
		$('#core').css({'line-height':'2.5em'})
		$('#core a').each(function(){

		if (n > 0) x = element.position().left
		element = $(this);

		$(this)
		.html('<img src="' + base_href + 'images/c3/chordimage.asp?chord=' + chords[element.html()].variations.split(" ")[0].replaceAll(",", " ") + '" rel="' + element.html() + '">')
		.css({position: 'absolute', 'margin-top': (isIE ? -10 : 0),	'margin-right':30})
		dist = element.position().left - x
		if (dist > 0 && dist < 36)
		{
			//alert(dist + " " + element.position().left)
			element.css({"left": x + 35 - (isIE ? 155 : 0) })
		}
		n = 2
		})//.unbind('mouseenter');
	}
	else
	{
		$('#core').css({'line-height':'1.4em'})


		$('#core a').each(function(){
			$(this).html($(this).attr('rel'))
		}).removeAttr('style')
	//	cifra = originalCifra
		//$('#core').html("<pre>" + cifra + "</pre>")
		//$('#core u').replaceChords()
		maxY = $('#request').position().top - (250 - heightBanner)
		/*if (isSplitColumns)
		{
			isSplitColumns = false;
			splitColumns();
		}*/
		//init()
		$("#core a").css({'color': '#' + color[0]})
		$("#core").css({'color': '#' + color[1]})
	}
	bolChordsOnLyrics = !bolChordsOnLyrics;
}

function fixIEWhiteSpaces() {
	nova_cifra = cifra
	ret = ""
	var n = 0
	//alert(nova_cifra)
	pos1 = 0
	while (pos1 > -1)
	{
		pos1 = nova_cifra.indexOf("<u>")
		if (pos1 == -1)	break
		pos2 = nova_cifra.indexOf("</u>")
		//alert(nova_cifra.substring(pos1 +3, pos2))


		if (  nova_cifra.substring(pos1+3, pos2).indexOf(" ") > -1)
		{
			spaceChords = nova_cifra.substring(pos1+3, pos2)
			newSpaceChords = ""
			note = false
			for (nn = 0; nn < spaceChords.length; nn++)
			{
				char1 = spaceChords.substr(nn,1);
				if (char1 != " " && !note)
				{
					newSpaceChords += "<u>"
					note = true
				}
				if (char1 == " " && note)
				{
					newSpaceChords += "</u>"
					note = false
				}
				newSpaceChords += char1


			}
			if (note) newSpaceChords += "</u>"

			newSpaceChords = "</u>" + newSpaceChords //+ "<u>"


		}
		else
		{
			newSpaceChords = nova_cifra.substring(pos1+3, pos2) + "</u>"
		}
		ret += nova_cifra.substr(0,pos1 + 3) + newSpaceChords

		nova_cifra = nova_cifra.substr(pos2 + 4 )
		//alert(nova_cifra)
		n ++
		if (n > 1000) break
	}
	ret += nova_cifra.substr(0)
	ret = ret.replaceAll("<u></u>", "")
	return ret
}

function startComm(){
	$('#insert_com').keyup(function(){
		$('.counter').html(140 - $('#insert_com').val().length).css({ 'color': parseInt($('.counter').html()) < 0 ? "#F00" : "" })
	})

	if (!isLoggedIn){
		$('#btsbm1').fancybox({'frameWidth':625, 'frameHeight':315, 'type':'iframe', 'padding':5}).show();
	}
	else{
		$('#btsbm2').show();
		$('#btsbm2').bind('click', function(){comment();})
	}
}

var hasSuperBanner = false;
function setInversionsDiv()
{
		//alert($('.echord').position().top)
		$('#core a').bind('mouseenter', function(event) {
			if (bolChordsOnLyrics) return false
			//if ($('body').css('background') > ' ' ) return false
				elem = $(this)

			/*
			parent1 = elem.parent().parent().parent()
			if (parent1.attr('class') == 'chorus')
			{
				top1 = parent1.position().top + elem.position().top + 20
				left1 = parent1.position().left + elem.position().left + 20
				}
			  else
			  {
			  	top1 = elem.position().top
				left1 = elem.position().left
			}
			res = $(document).width()
			left1 -= 140 - (res > 980 ? (res - 980) / 2 : 0)
			top1 += (isIE && ver < 8 ? (ver == 6 ? -150px-160 : heightBanner + 5) : heightBanner + 5)
			left1 += (isIE? -14 : 0)
			left1 -= 2 //left1 += (hasSuperBanner? -160: 0)
			top1 += (isPrintVersion ? 116 : -18 )
			*/

			top1 = elem.offset().top - 39
			left1 = elem.offset().left - 4

			html = elem.html() + '<img src="' + static_server + 'images/st4.png" width="8" height="9" alt="More" style="cursor:pointer"  />'

			if (chords[elem.attr('rel')]!=undefined)
			{
				arr = chords[elem.attr('rel')].inversions.split(" ")

				for (n = 0; n < arr.length; n ++)
				{

					if (arr[n] > '')
					html += "<p rel='" + n + "'>" + arr[n]
					.replace("[r]", "<font>root</font> ")
					.replace("[d]", "<font>default</font> ")
					.replace("[1]", "<font>inversion #1</font> ")
					.replace("[2]", "<font>inversion #2</font> ")
					.replace("[3]", "<font>inversion #3</font> ")
					.replace("[4]", "<font>inversion #4</font> ")
					.replace("[5]", "<font>inversion #5</font> ")
					 + "</p> \n"
					// else
					//html += "<div rel='" + n + "'>" + elem.attr('rel') + "</div>"

				}
			}
			html += "<div><input type='text' id='newchord' style='width:40px'><input type=button value='swap' style='height'></div>"

			/*$('#inversions').css({
			'visibility':'visible',	'top': top1 + $('.echord').position().top + 129 + ($('#prtop').css('display') == 'block' ? -269 : 0), 'left': left1 + 138, 'font-size': $('#core').css('font-size'), height: parseInt($('#core').css('font-size')) - 1
			  }).attr('rel', n).html(html) //.html(elem.html() + '<img src="images/st4.png" width="8" height="9" alt="More" style="cursor:pointer"  />')
			  */
			$('#inversions').css({
			'visibility':'visible',	'top': top1, 'left': left1, 'font-size': $('#core').css('font-size'), height: parseInt($('#core').css('font-size')) - 1
			  }).attr('rel', n).html(html) //.html(elem.html() + '<img src="images/st4.png" width="8" height="9" alt="More" style="cursor:pointer"  />')

			$('#inversions >div>input[type=button]').click(
				function() {
					ch = $.trim($(this).prev().val())
					//alert(ch)
					addChord(ch)
					elem.html(ch).attr('rel', ch)
					$('#inversions').animate({height: $('#core').css('font-size'),width: 57}, 'fast', '', function(){$(this).css({'visibility':'hidden'})   })
				}
			)

			$('#inversions >div>input[type=text]').focus(
				function(){
					$(this).attr('rel', '1')
				}

			).blur(
				function(){
					$(this).attr('rel', '0')
				}

			).keyup(
				function (event)
				{
					//alert($(this).val())
					//var filter = /^([A-G])+^(m|b|2|4|5|6|7|9|11|13)?/
					//if (!filter.test($(this).val()))
						//alert('no')

				}

			)

			$('#inversions p[rel]').css('padding',2).click(
				function(){
					//alert($('#core').css('font-size'))
					ch = $.trim($(this).html().replace(/<.*>/g,""))
					//alert(ch)
					addChord(ch)
					elem.html(ch).attr('rel', ch)

					invChanged[elem.attr('id')] = ch
						$('#inversions').animate({height: $('#core').css('font-size'),width: 57}, 'fast', '', function(){$(this).css({'visibility':'hidden'})   })
				}).bind('mouseover',function( event ){
		return $( this ).addClass('dropover')
		})
		.bind('mouseout',function( event ){
		return $( this ).removeAttr('class')
		})
		})
}

function addChord(txt)
{
	//alert('ajax.asp?acao=add_chord&p=' + escape(txt))
	txt = txt.replaceAll("+", "@")
	if (cache['addchord_' + escape(txt)] == undefined)
	$.get('ajax.asp', 'acao=add_chord&p=' + escape(txt) + '&p2=' + typeInstrument, function(r){
		cache['addchord_' + escape(txt)] = r
		$("#actions").html(r)
	})
	else
	$("#actions").html(cache['addchord_' + escape(txt)])



	/*if (cache['addchord_' + escape(txt)] == undefined)
    $.ajax({
        'async': false,
        'global': false,
        'url': 'ajax.asp?acao=add_chord&p=' + escape(txt) + '&p2=' + typeInstrument,
        'success': function (r) {
            cache['addchord_' + escape(txt)] = r
			$("#actions").html(r)
        }
    })
	else
	$("#actions").html(cache['addchord_' + escape(txt)])*/
}

function addClickTabBt()
{
	//alert(0)
	$('.tabbt').click(
	function(){
	//alert(1)
		main = $(this)
		rel = $(this).attr('rel')
		elem = $('.hide_tab[rel=' + rel + ']')
		//height1 = elem.height()
		//alert(elem.css('height'))
		if (elem.css('display') == 'block')
		{
		//alert(elem.height())
		elem.animate({
		height:1
		}, 'fast', '',

		function(){
			maxY = $('#request').position().top - (250 - heightBanner)

			//$(this).css({'display': 'none', height: height1})
			$(this).css({'display': 'none'})
			$('.tabbt[rel=' + rel + ']').css({'border-bottom':'solid 2px #DEDEDD'}).html('show this tab<img src="' + static_server + 'images/st6.png" width="8" height="9" alt="Show" style="margin-left: 15px;" />')

		})
		}
		else
		{
		$('.tabbt[rel=' + rel + ']').css({'border-bottom':'0'}).html('hide this tab<img src="' + static_server + 'images/st5.png" width="8" height="9" alt="Hide" style="margin-left: 15px;" />')
		elem.css({'display': 'none', height: 0})
		//alert($('.tabbt[rel=' + rel + ']').attr('class'))
		elem.animate({
		height: $('.tabbt[rel=' + rel + ']').attr('class').substr(6)
		}, 'fast', '', function(){
				maxY = $('#request').position().top - (250 - heightBanner)


		})
		}

		//maxY = $('#request').position().top - 250
	});
}


var isShowTabs = true;
function showTabs()
{
	var heights = new Array()
		$('.tabbt').each(function(){

			rel = $(this).attr('rel')
			elem = $('.hide_tab[rel=' + rel + ']')
			//heights[rel] = parseInt(elem.css('height'))
			if (isShowTabs)
			{

				if (elem.css('display') == 'block')
				{
					elem.animate({

							height:1
							}, 'fast', '',
							function(){
								maxY = $('#request').position().top - (250 - heightBanner)

								//$(this).css({'display': 'none', height: heights[$(this).attr('rel')]})
								$(this).css({'display': 'none'})
								$('.tabbt[rel=' + $(this).attr('rel') + ']').css({'border-bottom':'solid 2px #DEDEDD'}).html('show this tab<img src="' + static_server + 'images/st6.png" width="8" height="9" alt="Show" style="margin-left: 15px;" />')
							})

				}
				$('.subtools a:eq(2)').html('show all tabs')
			}
			else
			{
				if (elem.css('display') == 'none')
				{
					$('.tabbt[rel=' + $(this).attr('rel') + ']').css({'border-bottom':'0'}).html('hide this tab<img src="' + static_server + 'images/st5.png" width="8" height="9" alt="Hide" style="margin-left: 15px;" />')
							elem.css({'display': 'none', height: 0})
							elem.animate({
							height: $('.tabbt[rel=' + $(this).attr('rel') + ']').attr('class').substr(6) //  heights[$(this).attr('rel')]
							}, 'fast', '', function(){
									maxY = $('#request').position().top - (250 - heightBanner)
							})
				}

			$('.subtools a:eq(2)').html('hide all tabs')
			}


		})
		isShowTabs = !isShowTabs
}
function simplify2(val, chordsTemp){

			if (val >= count) //chordsUsed > '')
			{

				chordsUsed = chordsTemp
				chordsDefault = padronizeChords(chordsUsed)
				changeKey(1)
				/*drawGlossary()
				drawFloatingChords(chordsUsed)
				setInversionsDiv()*/
				clearInterval(continueSimplify)
			}
}

function viewMore(idcomment)
{
	$('#viewmore').html('<img src="' + static_server + 'images/wait2.gif">')
	//alert('ajax.asp?acao=more_comments&p=' + id + '&p2=' + idcomment)
	$.get('ajax.asp', 'acao=more_comments&p=' + id + '&p2=' + idcomment, function(r){

		$('#viewmore').remove()


		$("#morecomments")
		.clone()
		.css({height: 10, 'overflow': 'hidden', opacity: 0})
		.removeAttr('id')
		.insertBefore(".v_banner").html(r)
		.animate({height: 660, opacity: 1}, 'slow') //(".bloco_banner>span:last");

//		$(".bloco_banner>span:last")

	})
	//$('#insert_com').val('')

}
function hideGlossary()
{
	if($('#thechords').css('display') == 'block')
	{
		$('#thechords').slideUp()
		$('#gloss').text("show glossary");
	}
	else
	{
		$('#thechords').slideDown()
		$('#gloss').text("hide glossary");
	}
}
function cancelPrint()
{

	//$('body').css({'background':'url(' + base_href + 'images/bg_topo.png) top left repeat-x #D4E3DB'})
	$('body').css("margin-top",'140px')
	$('.echord').css('padding-left', 160)
	$('.echord >div:first').hide()
	$('.rodape,#request,.dados_chord, .topofixo, .topo_cifra,.banner, .comments, .no_vid, .topo, #tablv1,#tablv2,#tablv3,.gg, .chords_extras, .tones, .subtools,#hasvideo,#banner,#demo0_box, .vid_lesson_area').show()
	//googletag.pubads().refresh()
	$('#request a').css('color','')
	$('.chordmenu').removeClass('noprint')
	$('img[src*=arrow],img[src*=st4]').removeClass('noprint')
	$('.echord >h1:first').show()
	$('#prtop, #prartist').hide()
	$('.echord_ico').attr('src', $('.echord_ico').attr('src').replace('_print.', '.'))
	//if (   $('#prtop, #prartist').children('img:eq(1)').attr('alt').indexOf('RTF') > -1 ) drawGlossary()
	drawGlossary()
	//setInversionsDiv()
}
function printSong(strType)
{

	//$.get('ajax.asp', 'acao=get_status', function(r){
		//isP = r.isP
		$('#prtop, #prartist').children('img:eq(2)').css('display','none')
		$('#prtop, #prartist').children('img:eq(3)').css('display','none')

		switch (strType)
		{
			case 'rtf':

				paramDigitacoes = ''
				if (tipoTab == "ukulele")
				{

					//chordsUsed="";
					for (var n = 0; n < arrChordsUsed.length; n ++)
					{
						acorde2 = new cifrasChords();
						a = arrChordsUsed[n]
						a = a.replaceAll("Ab","G#").replaceAll("Eb", "D#").replaceAll("Bb", "A#").replaceAll("Db", "C#").replaceAll("Gb", "F#")
						arrChordsUsed[n] = fourStringChords(removeBaixo(a)).chordName
						acoUku = arrChordsUsed[n]
						chords[acoUku] = new Array();
						chords[acoUku].variations = acorde2.getNotes(acoUku, 1, escalaUku)
						paramDigitacoes += chords[acoUku].variations
					}
				}

				src = static_server + 'images/cancelrtf.png';
				alt = 'Cancel RTF Version';
				$('#prtop, #prartist').children('img:eq(2)').css('display','block').bind('click', function() {
					window.location.href = base_href + 'pdf.asp?artist=' + cod_artist + '&title=' + cod_title + '&id=' + idSong + '&tipo=' + tipoTab + '&key=' + intKey + "&p4=" + (chordsUsed.replaceAll('#', '*').replaceAll('+', '$').replaceAll('/', '\\')) + "&p5=" + paramDigitacoes
				});
				$('#prtop, #prartist').children('img:eq(3)').css('display','block').bind('click', function() {
					window.location.href = base_href + 'pdf.asp?artist=' + cod_artist + '&title=' + cod_title + '&id=' + idSong + '&tipo=' + tipoTab + '&tipodoc=doc&key=' + intKey + "&p4=" + (chordsUsed.replaceAll('#', '*').replaceAll('+', '$').replaceAll('/', '\\')) + "&p5=" + paramDigitacoes
				});
				break
			case 'txt':
				src = static_server + 'images/canceltext.png'
				alt = 'Cancel Text Version'
				break
			default:
				strType = ''
				src = static_server + 'images/cancelprint.png'
				alt = 'Cancel Print Version'
		}
		//$('body').css({'background':'#CCC'})



		$('.echord').css('padding-left', 50)

		$('#prtop, #prartist').show().children('img:eq(1)').attr({'src': src, 'alt': alt})

		//$('#demo0_box').css('left', $(document).width() - 120)
		$('.rodape, .dados_chord, .topofixo, .topo_cifra, .banner, .comments, .no_vid, .topo, #tablv1,#tablv2,#tablv3,.gg,.chords_extras, .tones, .subtools, .echord >h1:first, .dados_chord >p:first,#hasvideo,#banner,#demo0_box, .vid_lesson_area').hide()
		$('#request a').css('color','#FFF')
		//$('#hasvideo').hide()
		$('.chordmenu').addClass('noprint')
		$('img[src*=arrow],img[src*=st4]').addClass('noprint')
	    $('body').removeClass('noprint').css("margin-top",0)
		if ($('.echord_ico').attr('src').indexOf('_print.') == -1)
			$('.echord_ico').attr('src', $('.echord_ico').attr('src')  )

		if (isP != 'S'){
			$('#fancyButton1').fancybox({'frameWidth':625, 'frameHeight':315, 'url': base_href + 'site/login1.asp?t=premium&func=printSong(\'' + strType + '\')&clos=1&iframe', 'padding':5, callbackOnClose: function() { cancelPrint();}  });
			$('#fancyButton1').click()
			$('body').addClass('noprint');
		}

	//})
}

function btnSaveTo() {
	paramDigitacoes = ''
	if (tipoTab == "ukulele")
	{
		//chordsUsed="";
		for (var n = 0; n < arrChordsUsed.length; n ++)
		{
			acorde2 = new cifrasChords();
			a = arrChordsUsed[n];
			a = a.replaceAll("Ab","G#").replaceAll("Eb", "D#").replaceAll("Bb", "A#").replaceAll("Db", "C#").replaceAll("Gb", "F#");
			arrChordsUsed[n] = fourStringChords(removeBaixo(a)).chordName;
			acoUku = arrChordsUsed[n];
			chords[acoUku] = new Array();
			chords[acoUku].variations = acorde2.getNotes(acoUku, 1, escalaUku);
			paramDigitacoes += chords[acoUku].variations;
		}
	}

	var paramKey = intInitKey;

	if (typeof songbook === 'undefined') {
		songbook = '';
	}
	if (typeof p5 === 'undefined') {
		var p5 = '';
	}
	if (plus.indexOf('key-') > -1) {
		var arrPlus = plus.split('-');
		paramKey = parseInt(arrPlus[1]);
	}

	var saveToParams = "cod_artist=" + cod_artist + "&cod_title=" + cod_title + "&artist=" + artist + "&title=" + title + "&id=" + idSong + "&tipo=" + tipoTab + "&key=" + paramKey + "&p4=" + (chordsUsed.replaceAll('#', '*').replaceAll('+', '$').replaceAll('/', '\\')) + "&p5=" + paramDigitacoes + "&songbook=" + songbook;

	$('.opcoes >span:eq(5)').fancybox({
		'url': base_href + 'site/saveto.asp?' + saveToParams + '&iframe',
		'frameWidth': 230,
		'frameHeight': 237,
		'padding': 5,
		'callbackOnStart': function() {
			$(this).fancybox.showLoading();
		},
		'callbackOnShow': function() {}
	});
}

function exportToTxt() {
	paramDigitacoes = ''
	if (tipoTab == "ukulele")
	{
		//chordsUsed="";
		for (var n = 0; n < arrChordsUsed.length; n ++)
		{
			acorde2 = new cifrasChords();
			a = arrChordsUsed[n]
			a = a.replaceAll("Ab","G#").replaceAll("Eb", "D#").replaceAll("Bb", "A#").replaceAll("Db", "C#").replaceAll("Gb", "F#")
			arrChordsUsed[n] = fourStringChords(removeBaixo(a)).chordName
			acoUku = arrChordsUsed[n]
			chords[acoUku] = new Array();
			chords[acoUku].variations = acorde2.getNotes(acoUku, 1, escalaUku)
			paramDigitacoes += chords[acoUku].variations
		}
	}

	//arr = chordsUsed.split(' ')
	//paramDigitacoes = ''
	//for (var n = 0; n < arr.length; n ++) paramDigitacoes += chords[arr[n]].variations.split(' ')[0] + ' '
	//$('#fancyButton1').fancybox({'frameWidth':625, 'frameHeight':500, 'url': base_href + 'site/text-version.htm?p=' + chordsUsed.replaceAll('#', '*').replaceAll('+', '$').replaceAll('/', '\\') + '&p2=' + paramDigitacoes + '&p3=' + id + '&p4=' + intKey + '&iframe', 'padding':5})
	//$('#fancyButton1').click()
	window.location.href = base_href + "download-txt.htm?p=" + idSong + "&p2=" + tipoTab + "&p3=" + intInitKey + "&p4=" + (chordsUsed.replaceAll('#', '*').replaceAll('+', '$').replaceAll('/', '\\')) + "&p5=" + paramDigitacoes
}

//function logAndComment()
//{
//	comment()
//}
function comment(){
	if ($('#insert_com').val() == '')
	{
		alert('You need to type in your comment.')
		return false
	}
	if ($('#captcha').val() == '')
	{
		alert('You need to type in the image code.')
		return false
	}
	if (GetCookie ("codigo") != $('#captcha').val())
	{
		alert('The image code you entered is not correct.')
		return false
	}
	if ($('#insert_com').val().length > 140)
	{
		alert('Your comment must have up to 140 characters.')
		return false
	}
	emailme =  (document.getElementById("emailme").checked ? "ok" : "")
	$.get('ajax.asp', 'acao=post_comment&p=' + id + '&p2=' + escape($('#insert_com').val()) + '&p3=' + $('#captcha').val() + '&p4=' + $('#id_parent').val() + '&p5=' + $('#id_membro_pergunta').val() + '&p6=' + emailme, function(r){

		$('#comments').prepend(r)



	})
	$('#insert_com').val('')
}

function padronizeChords(chord)
{
	var aco;aco = jQuery.trim(chord)
	aco = aco.replaceAll(" ", ",");aco = aco.replaceAll("/", " ");aco = aco.replaceAll("(", " ");aco = aco.replaceAll(")", " ");
	aco = aco.replaceAll("Eb", "D#");aco = aco.replaceAll("Bb", "A#");aco = aco.replaceAll("Db", "C#");aco = aco.replaceAll("Ab", "G#");aco = aco.replaceAll("Gb", "F#");aco = aco.replaceAll("add3", "");aco = aco.replaceAll("2", "9");
	aco = aco.replaceAll("sus4", "4");aco = aco.replaceAll("sus9", "9");aco = aco.replaceAll("add", "");aco = aco.replaceAll("sus", "4");aco = aco.replaceAll("74", "7 4");	aco = aco.replaceAll("11", "4");
	aco = aco.replaceAll("13", "6");aco = aco.replaceAll("dim", "°");aco = aco.replaceAll("no", "nn");aco = aco.replaceAll("omit", "nn");aco = aco.replaceAll("º", "°");aco = aco.replaceAll("o", "°");aco = aco.replaceAll("nn", "no");aco = aco.replaceAll("+", "M");aco = aco.replaceAll("aum", "M");
	aco = aco.replaceAll("5-","4M");aco = aco.replaceAll("6-","5M");aco = aco.replaceAll(" b5"," 4M");
	aco = aco.replaceAll(" b6"," 5M");aco = aco.replaceAll(" #5"," 5M");aco = aco.replaceAll(" #4"," 4M");aco = aco.replaceAll("5b","4M");aco = aco.replaceAll("9b","9-");aco = aco.replaceAll(" b9"," 9-");aco = aco.replaceAll("79", "7 9");
	aco = aco.replaceAll("aug", "5M");aco = aco.replaceAll("maj7", "7M");aco = aco.replaceAll("  ", " ");aco = aco.replaceAll(" ,", ",");
	aco = jQuery.trim(aco);
	return aco
}

function sugLoop()
{
	$('#aba1').hide('fast')
	$('#aba2').show('fast')
	if ( $('#aba2').html() == '' )
	{
		$.ajax({type: 'GET', url:'ajax.asp', data:'acao=more_beats', cache: true, success: function(r){
				$('#aba2').html(r)
			}})
	}
}

function backbeat()
{
	$('#aba1').show('fast')
	$('#aba2').hide('fast')
}

function showBeats(){
	//<div align="center"><a href="#"><img src="images/bt_playbeat.png" alt="play beat" width="158" height="34" /></a></div>
	$('#aba1').show('fast')
	$('#aba2').hide('fast')
	$("#playbeat").css({display: 'block',left: cursorX,top: cursorY})
	if (beat != '')
	{
		html = '<p>Here you can hear the beat music while you play.<br />Click play and make your sound!<br><div align="center"><div id="beatplayer">&nbsp;</div><br><a href="javascript:sugLoop()">Suggest Loop</a></div></p>'
		$("#aba1").html(html)

		$.ajax({type: 'GET', url:'ajax.asp', data:'acao=get_beat&p=' + beat + '&p2=' + beat.substr(7), cache: true, success: function(r){
			$('#actions').html(r)
		}})
	}
	else
	{
		html = '<p>There are no beats saved. Help us by telling us which beat is correct for this song.<div align="center" style="margin-top: 10px;"><a href="javascript:sugLoop()"><b>Suggest Loop</b></a></div></p>'
		$("#aba1").html(html)
	}
}

function showYTube(){
	if (cache['ytplayer'] == undefined)
	$.get('ajax.asp', 'acao=show_video&p=' + cod_artist + ' ' + cod_title, function(r){

		$('#actions').html(r)
		//$('#ytplayer').html(r)
		cache['ytplayer'] = 1
		$("#ytplayer").css({display: 'block', left: $(document).width() / 2 + 100,  top: 300  })
		/*$.get('ajax.asp', 'acao=more_videos&p=' + cod_artist + ' ' + cod_title, function(r){
		$('#morevideos').html(r)
		})*/
	})
	else
		$("#ytplayer").css({display: 'block', left: cursorX + 500,  top: 300  })
}

function changeColors(){$("#changecolors").css({display: 'block',left: cursorX,top: cursorY	}) }

function openColPic(div)
{
	$("#colpic" + div).html("<img src='" + static_server + "images/colpic.gif'>")
}

function playBeat(divId, folder, songName, artistName)
{
	$('#' + divId).html('<img src="' + static_server + 'images/wait.gif" />')
	/* JAVASCRIPT VARS*/
	var stageW = 140;
	var stageH = 39;
	var cacheBuster = "?t=" + Date.parse(new Date());

	/* PARAMS*/
	var params = {};
	params.bgcolor = "#ffffff";
	params.allowfullscreen = "true";
	/** FLASHVARS **/
	var flashvars = {};
	//
	flashvars.componentWidth = 140;
	flashvars.componentHeight = 39;
	//
	flashvars.pathToFiles = "player/";
	flashvars.xmlPath = static_server + "flash/audio/deploy/player/xml/settingsap.xml";
	flashvars.artistName = artistName;
	flashvars.songName = "Tempo " + songName;
	flashvars.songURL = static_server + "arquivos/beats/" + folder + "/" + songName + "bpm.mp3";
	//alert("http://www.e-chords.com/arquivos/beats/" + folder + "/" + songName + "bpm.mp3")
	/** SWF OBJECT EMBED **/
	swfobject.embedSWF(static_server + "flash/audio/deploy/preview.swf"+cacheBuster, divId, stageW, stageH, "9.0.124", "js/expressInstall.swf", flashvars, params);
}
function hearLoop()
{
	$('#suggestbeat,#bthear').hide()
	playBeat('newbeatplayer', $('#beatstyle').val(), $('#beattempo').val(), beats[$('#beatstyle').val()].name)
	setTimeout("$('#suggestbeat').show('slow')", 4000)
}
function votebeat()
{
	if (confirm('Your suggestion for this song is: ' + beats[$('#beatstyle').val()].name + ', tempo ' + $('#beattempo').val() + ' BPM?'))
	{
		$.get('ajax.asp', 'acao=save_wiki&p=' + id + '&p2=' + $('#beatstyle').val() + '/' + $('#beattempo').val() + 'bpm.mp3&p3=beat', function(r){
			//$('#actions').html('')
			alert('Thanks for your suggestion!')
			$('#suggestbeat').hide()
		})
	}
}
function closeColors() {$('#changecolors').fadeOut();}
function closeYPlayer() {$('#ytplayer').fadeOut();}
function closeBeat(){$('#playbeat').fadeOut();$('#aba2').hide()}

var colors = new Array ("000000","000000","003300","006600","009900","00CC00","00FF00","330000","333300","336600","339900","33CC00","33FF00","660000","663300","666600","669900","66CC00","66FF00","333333","000033","003333","006633","009933","00CC33","00FF33","330033","333333","336633","339933","33CC33","33FF33","660033","663333","666633","669933","66CC33","66FF33","666666","000066","003366","006666","009966","00CC66","00FF66","330066","333366","336666","339966","33CC66","33FF66","660066","663366","666666","669966","66CC66","66FF66","999999","000099","003399","006699","009999","00CC99","00FF99","330099","333399","336699","339999","33CC99","33FF99","660099","663399","666699","669999","66CC99","66FF99","CCCCCC","0000CC","0033CC","0066CC","0099CC","00CCCC","00FFCC","3300CC","3333CC","3366CC","3399CC","33CCCC","33FFCC","6600CC","6633CC","6666CC","6699CC","66CCCC","66FFCC","FFFFFF","0000FF","0033FF","0066FF","0099FF","00CCFF","00FFFF","3300FF","3333FF","3366FF","3399FF","33CCFF","33FFFF","6600FF","6633FF","6666FF","6699FF","66CCFF","66FFFF","FF0000","990000","993300","996600","999900","99CC00","99FF00","CC0000","CC3300","CC6600","CC9900","CCCC00","CCFF00","FF0000","FF3300","FF6600","FF9900","FFCC00","FFFF00","00FF00","990033","993333","996633","999933","99CC33","99FF33","CC0033","CC3333","CC6633","CC9933","CCCC33","CCFF33","FF0033","FF3333","FF6633","FF9933","FFCC00","FFFF33","0000FF","990066","993366","996666","999966","99CC66","99FF66","CC0066","CC3366","CC6666","CC9966","CCCC66","CCFF66","FF0066","FF3366","FF6666","FF9966","FFCC00","FFFF66","FFFF00","990099","993399","996699","999999","99CC99","99FF99","CC0099","CC3399","CC6699","CC9999","CCCC99","CCFF99","FF0099","FF3399","FF6699","FF9999","FFCC00","FFFF99","00FFFF","9900CC","9933CC","9966CC","9999CC","99CCCC","99FFCC","CC00CC","CC33CC","CC66CC","CC99CC","CCCCCC","CCFFCC","FF00CC","FF33CC","FF66CC","FF99CC","FFCCCC","FFFFCC","FF00FF","9900FF","9933FF","9966FF","9999FF","99CCFF","99FFFF","CC00FF","CC33FF","CC66FF","CC99FF","CCCCFF","CCFFFF","FF00FF","FF33FF","FF66FF","FF99FF","FFCCFF","FFFFFF")

var color = new Array ("a82927", "000000")
colorsCookie = GetCookie ("colors")
if (colorsCookie != undefined)
{
	colorsCookie = colorsCookie.split(",")
	color[0] = colorsCookie[0]
	color[1] = colorsCookie[1]

}

function MD (id, start) {

	if (bolChordsOnLyrics) return false
	chorname = $('#a' + id).html()
	if (chords[chorname] == undefined) return false
	clearInterval(startFloatChord)

	if (start != true)
	{
		startFloatChord = setTimeout('MD(' + id + ', true)', 500)
		return false
	}


	newFloat = 'flchord_' + floatingChord
	if (floatingChord > 0) destroyFloat('flchord_' + (floatingChord - 1))
	$('#flchord').clone().removeAttr('id').attr({'id':newFloat, 'rel': jQuery.inArray(chorname, arrChordsUsed) }).insertAfter('#flchord')
	$('#flchord_' + floatingChord).css({
				top: cursorY - 50,
				left: cursorX + 70,
				zIndex: ++floatChordZIndex,
				display: 'block'
				});
	$('#' + newFloat + ' > div')[1].id = 'flchordcontent_' + floatingChord


	$('#' + newFloat)
			.bind('mouseenter', function(event) {
				clearInterval(killFloatChord);
				stopFadeChord(this)

				})
			.bind('mouseleave', function(event) {
				clearInterval(killFloatChord);
				startFadeChord(this)
				})

			.bind('dragstart',function( event ){
			if ( !$(event.target).is('.handle') ) return false;

			stopFadeChord(document.getElementById(newFloat))

			$('#' + newFloat).unbind('mouseenter mouseleave')
			return $( this ).css('opacity',.5)
				.clone().addClass('active')
				.insertAfter( this );
			})
		.bind('drag',function( event ){
			$( event.dragProxy ).css({
				top: event.offsetY ,
				left: event.offsetX
				});
			})
		.bind('dragend',function( event ){
			$( event.dragProxy ).remove();
			$( this ).animate({
				top: event.offsetY,
				left: event.offsetX,
				opacity: 1
				})
				floatingChord ++
				this.getElementsByTagName('span')[0].style.visibility='visible'
				this.getElementsByTagName('span')[0].title = newFloat
			});
			//document.getElementById("temp").innerHTML = (chorname)
	drawChord({
		'div': 		'flchordcontent_' + floatingChord,
		'menu': 	(typeInstrument == 'keyboard' ? 'VOI' : 'VOP'),
		'chordname':chorname,
		'variations':chords[chorname].variations,
		'photosvar':'photos',
		'type':typeInstrument,
		'lefthanded':leftHanded
		});

	//timeFloatingChord[floatingChord] = setTimeout('destroyFloat(\'' + newFloat + '\')', 1000);

	floatingChord ++;
}
function KC()
{
destroyFloat('flchord_' + (floatingChord - 1));
	//killFloatChord = setTimeout('destroyFloat(\'flchord_' + (floatingChord - 1) + '\')', 1000);
}
function destroyFloat(div)
{
	if ($('#' + div + ' > span').visibility == 'visible' ) {return false;}
	//$('#' + div).animate({left: cursorX + 70, top: cursorY -50, opacity: 0},'slow', '', function (){ $(this).remove() });
	$('#' + div).hide('fast',function (){ $(this).remove() });
}
function stopFadeChord(obj)
{
	if (obj == undefined) return false;
	clearInterval(timeFloatingChord[obj.id.substr(8)]);
}
function startFadeChord(obj)
{
	stopFadeChord(obj)
	timeFloatingChord[obj.id.substr(8)] = setTimeout('destroyFloat(\'' + newFloat + '\')', 1000)
}
var levelScroll = 0;
var intervalScroll;
function overLevel(level)
{
	if (level == undefined)
	{
		for (var n = 1; n <= 5; n ++)
		{
			obj = document.getElementById("scroll_0" + n);
			if (n <= levelScroll)
				obj.style.backgroundImage = "url(images/scroll_square" + n + ".png)";
			else
				obj.style.backgroundImage = "url(images/scroll_square.png)";
		}
	}
	else
	{
		for (var n = 1; n <= 5; n ++)
		{
			obj = document.getElementById("scroll_0" + n);
			if (n <= level)
				obj.style.backgroundImage = "url(images/scroll_square" + n + ".png)";
			else
				obj.style.backgroundImage = "url(images/scroll_square.png)";
		}
	}
}
function setScroll(level)
{
	if (level == -1 && levelScroll == 0) return false;
	if (level == -1) level = levelScroll - 1;
	if (level >= 6) level = levelScroll + 1;
	if (level >= 6) level = 1;


	for (var n = 1; n <= 5; n ++)
	{
		obj = document.getElementById("scroll_0" + n);
		if (n <= level)
				obj.style.backgroundImage = "url(images/scroll_square" + n + ".png)";
			else
				obj.style.backgroundImage = "url(images/scroll_square.png)";
	}
	levelScroll = level;
	clearInterval(intervalScroll);
	if (level == 0) return true
	intervalScroll = setInterval("scrollWindow()",400);


}
function scrollWindow()
{
	if (isIE)
		currentpos=document.documentElement.scrollTop+levelScroll;
	else
		currentpos=window.pageYOffset+levelScroll;
	if (currentpos >= maxY) {setTimeout("$.scrollTo( '.echord', 900)", 2000); return false;} //currentpos = 300;
	window.scroll(0,currentpos);

}
function showScroll()
{
	setScroll(0);
	$('#fixed1').css({ display: 'block' });
	$('#autoscroll').css({ display: 'block', left: $(document).width() / 2 + 420, top: $(window).height() / 2 - 50 });
}
function closeScroll()
{
	clearInterval(intervalScroll);
	$('#autoscroll').fadeOut();

}
function freeCopy() {$("body").unbind('copy')}

function closeBannershop(){
	$('#bannershop').remove()
}

// *******************************************************
// *******************************************************
$(document).ready(function(){

	/*$.get('ajax.asp', 'acao=BREAD_CRUMB', function(r){
		$("#actions").html(r)

	})
	if (!isLoggedIn)
	{
		if (tipoTab == "ukulele")
		{
			//$('<div id="bannershop" style="box-shadow: 2px 2px grey;position:fixed;z-index:1000; left:50%;top:50%;margin-left:-150px;margin-top:-125px"> <div style="background-color:white; position:absolute;top:-24px;left:225px;cursor:pointer" onclick="$(\'#bannershop\').remove()"><img src="images/close_ad.gif" style="border:0" /></div><a target="_blank" href="//shop.e-chords.com/index.php?route=product/product&path=84_86&product_id=219"><img src="banner-tagima-ukulele.jpg" /></a></div>').insertAfter("body")
		}

		if (typeInstrument  == "guitar")
		{
			$.get('ajax.asp', 'acao=get_flutuante', function(r){
				result = r.split(',@,')

				$('<div id="bannershop" style="box-shadow: 2px 2px grey;position:absolute;z-index:1000; left:50%;top:50%;margin-left:-150px;margin-top:-125px"> <div style="background-color:white; position:absolute;top:-24px;left:225px;cursor:pointer" onclick="$(\'#bannershop\').remove()"><img src="images/close_ad.gif" style="border:0" /></div><a target="_blank" href="' + result[1] + '"><img src="' + result[0] + '" /></a></div>').insertAfter("body")
				setTimeout('closeBannershop()', 20000)
			})
		}
	}*/

	drawGlossary()
	if ($('.banner').size() > 0)
	{
		heightBanner = 115
	}
	else
	{
		heightBanner = 0
		$('#banner').css('height',5)
		$('.tools').css('top',375)
		$('.subtools').css('top',780)

	}



	//if ($.browser.msie)
	  $("body").bind('copy', function(e) {
		  if (isP != 'S'){
			$('#fancyButton1').fancybox({'frameWidth':625, 'frameHeight':315, 'url': base_href + 'site/login1.htm?t=premium&func=freeCopy()&clos=1&iframe', 'padding':5})
			$('#fancyButton1').click()
			return false;
			}
            })

	//document.onselectstart = new Function ('return false');


	cifra = $('#core').html();
	cifra = cifra.replaceAll("U>", "u>")//.replaceAll("</U>", "</u>");
	if (isIE)
	{
		cifra = fixIEWhiteSpaces();
		$('#core').html("<pre>" + cifra + "</pre>");
	}

	originalCifra = cifra

	$('font[rel]').doBaloon(-80, -250, 0, true)


	$('#core u').replaceChords()
	$('#core').css({'line-height':'1.4em'})

	if (fonte_fixa == "1") $('#core pre').css('font-family','arial')

	if (strKey == "") {
		strKey = $('#core a:first').attr('rel')
		if (strKey != undefined)
		{
			html = 'Key:&nbsp;&nbsp;<span class="actualkey">' + strKey + '</span> <img src="' + static_server + 'images/st4.png" width="8" height="9" alt="More" style="cursor:pointer"  />'
			nn = 7
			for (n = 0; n < 12; n++)
			{
				html += '<div title="' + (nn + 1) + '" data-init-key="' + (nn + 1) + '">' + retornaNovaNota2(strKey, nn, false)
				switch (nn + 1)
				{
					case 11:
						html += '<font>(one step down)</font>'; break;
					case 12:
						html += '<font>(half step down)</font>'; break;
					case 1:
						html += '<font>(original key)</font>'; break;
					case 2:
						html += '<font>(half step up)</font>'; break;
					case 3:
						html += '<font>(one step up)</font>'; break;
				}
				html += '</div>'
				nn ++; if(nn == 12) nn = 0
			}
			$('.tom').html(html)
		}
		else
		$('.tom').html('Key:')

	}
	$('.tom > div:first').css('margin-top', '4px')

	/*if (isP != 'S')
		$('.prem').unbind('click').removeAttr('onclick').bind('click', function(){
		alert('To swap chord variations you need to be premium member')

		})*/

		addClickTabBt()

	//if (!(isIE))
		setInversionsDiv()
	$('.tom').clone().insertBefore('#tone1').css({'background-color':'#d4e3db', 'margin-top':1, left: 20,'z-index':100})

	$('.opcoes >span:eq(0)').fancybox({'frameWidth':660, 'frameHeight':418, 'url': base_href + 'tuner.htm?iframe', 'padding':0})

	if (!isLoggedIn)
		$('.opcoes >span:eq(1)').fancybox({'frameWidth':625, 'frameHeight':315, 'url': base_href + 'site/login1.asp?func=startCorrect&clos=1&iframe', padding:5});
	else
		$('.opcoes >span:eq(1)').bind('click', function(){startCorrect();})
	/*
	$('.opcoes >span:eq(1)').click( function(){
		if (!isLoggedIn){
			$(this).fancybox({'frameWidth':625, 'frameHeight':315, 'url':'http://servidor/e-chords/site/login1.asp?func=startCorrect&iframe', padding:5});
			$(this).click()
		}
		else
			startCorrect()
	})
	*/
	//showYTube()

	//$('.opcoes >span:eq(2)').fancybox({'frameWidth':625, 'frameHeight':370, 'url': base_href + 'site/songbooks.htm?p=' + idSong + '&iframe', 'padding':5})

	$('.opcoes >span:eq(2)').fancybox({
		'url': base_href + 'site/songbooks.htm?p=' + idSong + '&iframe',
		'frameWidth': 625,
		'frameHeight': 368,
		'padding': 5,
		'callbackOnStart': function() {
			$(this).fancybox.showLoading();
		},
		'callbackOnShow': function() {}
	});

	$('.opcoes >span:eq(3)').click(function() {
		printSong();
		paramDigitacoes = ''
		if (tipoTab == "ukulele")
		{
			//chordsUsed="";
			for (var n = 0; n < arrChordsUsed.length; n ++)
			{
				acorde2 = new cifrasChords();
				a = arrChordsUsed[n]
				a = a.replaceAll("Ab","G#").replaceAll("Eb", "D#").replaceAll("Bb", "A#").replaceAll("Db", "C#").replaceAll("Gb", "F#")
				arrChordsUsed[n] = fourStringChords(removeBaixo(a)).chordName
				acoUku = arrChordsUsed[n]
				chords[acoUku] = new Array();
				chords[acoUku].variations = acorde2.getNotes(acoUku, 1, escalaUku)
				paramDigitacoes += chords[acoUku].variations
			}
		}
		$('.drawchord').each(
			function(){
				var txt = $(this).children('div.chordmenu').attr('rel')
				var arr = txt.split(',')
				var chord = (chords[arr[0]].variations + ' ').split(' ')[arr[1]]

				$(this).html("<img src='" + base_href + "images/chordimagewhitemin.asp?chord=" + chord + "&name=" + arr[0].replaceAll('#', '*').replaceAll('+', '$').replaceAll('/', '\\') + ((leftHanded == true) ? "&lefthanded=1" : "") + "'>")
			}
		);
	})
	if (!isLoggedIn) {
		$('.opcoes >span:eq(4)').fancybox({'frameWidth':625, 'frameHeight':315, 'url': base_href + 'site/login1.asp?func=exportToTxt&clos=1&iframe', padding:5});
	} else {
		$('.opcoes >span:eq(4)').bind('click', function(){exportToTxt();})
	}
	/*$('.opcoes >span:eq(5)').click(function() {
		printSong('rtf')
		$('.drawchord').each(
			function(){
				var txt = $(this).children('div.chordmenu').attr('rel')
				var arr = txt.split(',')
				var chord = (chords[arr[0]].variations + ' ').split(' ')[arr[1]]

				$(this).html("<img src='" + base_href + "images/chordimagewhitemin.asp?chord=" + chord + "&name=" + arr[0].replaceAll('#', '*').replaceAll('+', '$').replaceAll('/', '\\') + "'>")

			}
		)
	})*/
	if (isLoggedIn && isP == 'S') {
		$('.opcoes >span:eq(5)').bind('click', function() {
			btnSaveTo();
			$('.opcoes >span:eq(5)').click();
		});
	} else {
		$('.opcoes >span:eq(5)').fancybox({'frameWidth':625, 'frameHeight':315, 'url': base_href + 'site/login1.asp?t=premium&func=btnSaveTo&clos=1&iframe', padding:5});
	}
	$('.opcoes >span:eq(6)').fancybox({'frameWidth':624, 'frameHeight':440, 'url': base_href + 'site/modal_send_email.htm?p=' + id + '&iframe', 'padding':5})

	if (typeInstrument == 'keyboard') {
		$('.over_chord_guitar').removeClass('over_chord_guitar').addClass('over_chord_keyboard')
		$('.floatchord').css({"margin-top":-2, "margin-left":8 })
	}

	//$('#dificulty').mousemove(
	$('.topo_cifra >p:eq(1)').mousemove(
		function(e){
			pos = e.pageX - ((245 + ($(document).width() - 980) / 2) - 38.5)
			if (pos >0 && pos < 65)
			{
				if (pos >0 && pos < 10) img = 'images/beginner.png'
				if (pos >10 && pos < 23) img = 'images/easy.png'
				if (pos >23 && pos < 36) img = 'images/intermediate.png'
				if (pos >36 && pos < 50) img = 'images/advanced.png'
				if (pos >50 && pos < 65) img = 'images/expert.png'
				$('.topo_cifra >p:eq(1) >img:first').attr('src',  img)
				$('.topo_cifra >p:eq(1) >span:first').html(img.replace('images/', '').replace('.png', ''))
			}

		}
	).click(function() {
		obj = $('.topo_cifra >p:eq(1) >img:first')
		$.get('ajax.asp', 'acao=vote_level&p=' + obj.attr('src').replace('images/', '').replace('.png', '') + '&p2=' + id + '&p3=' + tipoTab, function(r){
			alert('Thank you for voting ')
			obj.attr('src',  obj.attr('src').replace('.', '_not.') )
			$(this).unbind('mousemove').unbind('click')
		})
	})
	//addClickTabBt()

	$('.tabbt').each(function(){
		rel = $(this).attr('rel')
		elem = $('.hide_tab[rel=' + rel + ']')
		$(this).attr('class', 'tabbt ' + elem.height() )
	})


	$('.tone[rel]').click(
		function(){
			changeKey( $(this).attr('rel') )
		}
	).css('cursor', 'pointer')

	$('.tone :eq(4)').click(
		function(){
			leftHanded = !leftHanded
			changeKey(1)
		}
	)

	$('#t_simplify').click(function() {
		if (bolChordsOnLyrics) return false
		chordsUsed = ''
		chordsDefault = ''
		chords = new Array()
		$('#songtitle, .echord h1').html(title + ' (Easy Version)')
		chordsTemp = ''
		n = $('#core a').size()
		$('.echord_ico').attr('src', 'images/icons/easy50.png')
		count = 0
		$('#core a').each(function() {
			element = $(this);
			//element.html( 'A7'  ).attr('rel', 'A7')
			var rel = padronizeChords(element.html())
			//alert(rel)
			var arrAcidentes = (rel).split(" ")
			ch = arrAcidentes[0].substr(0,1)
			l = arrAcidentes[0].length

			if (rel.length > 1)
			{
				for (var nn = 1; nn >= 0; nn --)
				{
					char = rel.substr(nn, 1)
					if (("#b°m").indexOf(char) > -1)
						ch += char
					else
						break
				}
				char = rel.substr(2, 1)
				if (("#b°m").indexOf(char) > -1)
					ch += char



				if (arrAcidentes.length > 2)
					final = arrAcidentes.length - 1
				else
					final = arrAcidentes.length

				for (nn = 1; nn < final; nn++)
				{
					if (
					("45679").indexOf( arrAcidentes[nn - 1].substr(0, 1)  ) > -1

					||  (  ("CDEFGAB").indexOf( arrAcidentes[nn].substr(0, 1)  ) > -1
						&& ("CDEFGAB").indexOf( arrAcidentes[nn - 1].substr(0, 1)  ) > -1 )
					)
					ch += " "

					ch += arrAcidentes[nn]
				}
				ch = ch.replaceAll(' ', '/').replaceAll('4M', '5-')

				if ((' ' + chordsTemp + ' ').indexOf(' ' + ch + ' ') == -1)
				{
				//addChord(ch);
				chordsTemp += ch + ' '
				}
				element.html('' + ch + '').attr('rel', ch)
				count ++
			}
			else
			{
			//alert('rel=0 in simplify')
			chordsTemp += rel + ' '
			//addChord(rel)
			count ++
			}
		})  //.css('cursor', 'pointer')
		continueSimplify = setInterval('simplify2(' + n + ', \'' + chordsTemp + '\')', 250)
		/*drawGlossary()
		drawFloatingChords(chordsUsed)
		setInversionsDiv()*/
	})

	startComm()
	if ($('.comment').size() == 0) $('<div align="center"></div>').insertBefore('#morecomments').html('<img src="' + static_server + 'images/nocomments.jpg" />')

	$(document).keypress(function (e) {
		/*if(e.which == 13)
		{
			changeKey(2)
		}*/
	 	if(e.which == 43)
		{
			if ($("#autoscroll").css('display') == 'none')
			{
				showScroll()
			}

			setScroll(levelScroll + 1)
		}
	 	if(e.which == 45 && $("#autoscroll").css('display') == 'block' ) setScroll(levelScroll - 1)
	})

	$('#hp_ac').bind('mouseover', function() {
		$('<div></div>').attr('id','tip_ac').addClass('help')
		.css({'top':cursorY - 100, left: cursorX - 30,'padding':5})
		.html('Click + button to speed up scroll or click - to speed down scroll or you can press + or - on the keyboard')
		.insertAfter('body')

	}).bind('mouseout', function(){
		$('#tip_ac').remove()
	})

	$(".opcoes img")
	.css({opacity: .8})
	.mouseout(function(){
		$(this).animate({
		height: 74,
		width: 58,
		marginTop: 0,
		opacity: .8
		}, 'slow')

    }).mouseover(function(){
		$(this).stop().animate({
		height: 90,
		width: 71,
		marginTop: -7,
		opacity: 1
		}, 'fast')
    });

	$("#inversions").click(function () {
		$(this).show().animate({
			height: (parseInt($(this).attr('rel')) + 1) * (parseInt($('#core').css('font-size')) + 10) + parseInt($('#core').css('font-size')),
			width: 170
		}, 'fast')
    }).mouseleave(function(){
  	//}).bind('mouseout', function(){

 	if ($(this).children('div:last').children('input:first').attr('rel') == '1') return false

	killFloatChord = setTimeout('KC()', 500)

	$(this).animate({height: $('#core').css('font-size'),width: 57}, 'fast', '', function(){

	$(this).css({'visibility':'hidden'})   })
    })


    $(".tom").click(function (e) {
    	e.stopPropagation();
      	if (dropKeyOpened) {
			$(this).animate({ height: 13, width: 57	}, 'fast')
			dropKeyOpened = false
     	} else {
      		if ($('.tom>div').size() == 0) return false
			dropKeyOpened = true
			$(this).animate({ height: 255, width: 170	}, 'fast')
		}
    });
    $("body").click(function() {
    	if (dropKeyOpened) {
			$(".tom").animate({ height: 13, width: 57	}, 'fast')
			dropKeyOpened = false
		}
    });

	$(".tom a").remove()

	$('.tom div')
	.bind('mouseover',function( event ){
		return $( this ).addClass('dropover')
	})
	.bind('mouseout',function( event ){
		return $( this ).removeAttr('class')
	})
	.click(function () {
		//$(".actualkey").html(  $(this).html().replace(/<.*>/g,""))
		intInitKey = $(this).attr('data-init-key');
	  	changeKey($(this).attr('title'))
		$(".tom").animate({	height: 13,	width: 57 }, 'fast')
    })

   $().mousemove(function(e){
		cursorX = e.pageX
		cursorY = e.pageY
   });

	$('#showchords').css({
		height: $(window).height(),
		top:0,
		width:250,
		left: $(window).width(),
		opacity: 0.8
	})

	$('#demo0_box').css({left: $(document).width() / 2 - 450 })
	$('#box_subtools').css({left: $(document).width() / 2 - 490 })

	maxY = $('#request').position().top - (250 - heightBanner)

	$(window).resize(function (event) {
		$('#demo0_box').css({left: $(document).width() / 2 - 450 + (hasSuperBanner ? -160 : 0) })
		$('#box_subtools').css({left: $(document).width() / 2 - 490 + (hasSuperBanner ? -160 : 0) })
	});

	$(window).scroll(function (event) {
		var ytheight = $('#ytplayer').css('height')
		var y = $(this).scrollTop();

		if (isIE && ver==6) {
			$('#showchords').css({ top: 0 })
			$('#fixed2').css({ top: y - 100 })
		}
		else
		{
			if (y > maxY) $('#fixed2').css({top: -(y - maxY) })
		}



		 if (y > (250 + heightBanner) ) {
			if (y > maxY) $('#fixed0').css({position:'absolute', top: maxY - (450 + heightBanner)})
			else
			if (isIE)
				$('#fixed0').css({top: (y - (250 + heightBanner))})
			else
				$('#fixed0').css({position:'fixed', top: -(250 + heightBanner)})
			}
		 else
			$('#fixed0').css({position:'absolute', top: 0})
	});

	if (isIE && ver ==6)
		$('#demo0_box').bind('drag',function( event ){
			$(this).css({
				top: event.offsetY -  $("#fixed0").position().top - (300 + heightBanner) ,
				left: event.offsetX + 20
			});
		});
	else
		$('#demo0_box')
		.bind('dragstart',function( event ){
			if ( !$(event.target).is('.handle') ) return false;
			return $( this ).css('opacity',.5)
				.clone().addClass('active')
				.insertAfter( this );
		})
		.bind('drag',function( event ){
			$( event.dragProxy ).css({
				top: event.offsetY -  $("#fixed0").position().top ,
				left: event.offsetX
			});
		})
		.bind('dragend',function( event ){
			$("#bar0").focus()
			$( event.dragProxy ).remove();
			$( this ).animate({
				top: event.offsetY-  $("#fixed0").position().top ,
				left: event.offsetX,
				opacity: 1
			})
		});

	$('#autoscroll')
		.bind('dragstart',function( event ){
			if ( !$(event.target).is('.handle') ) return false;
			return $( this ).css('opacity',.5)
				.clone().addClass('active')
				.insertAfter( this );
		})
		.bind('drag',function( event ){
			$( event.dragProxy ).css({
				top: event.offsetY -  $("#fixed1").position().top - (isIE ? 0 : 0) ,
				left: event.offsetX
				});
		})
		.bind('dragend',function( event ) {
			//$("#bar0").focus()
			$( event.dragProxy ).remove();
			$( this ).animate({
				top: event.offsetY-  $("#fixed1").position().top  - (isIE ? 0 : 0),
				left: event.offsetX ,
				opacity: 1
				})
		});

		$('#fl_ch_1')
		.bind('drag',function( event ){
		$( this ).css({
			top: event.offsetY,
			left: event.offsetX
			});
		});

	$("#changecolors, #playbeat")
	.bind('dragstart',function( event ){
		if ( !$(event.target).is('.handle') ) return false;
		if (!(isIE && ver == 6))
		{
			return $( this ).css('opacity',.5)
			.clone().addClass('active')
			.insertAfter( this );
		}
	})
	.bind('drag',function( event ){
		$( event.dragProxy ).css({
			top: event.offsetY ,
			left: event.offsetX
			});
	})
	.bind('dragend',function( event ){
		if (!(isIE && ver == 6))
		{
			$( event.dragProxy ).remove();
			$( this ).animate({
				top: event.offsetY,
				left: event.offsetX,
				opacity: 1
				}, "fast")
		}
	})

	$("#colpic1, #colpic2").mousemove(function(e){
		idColPic = $(this).attr('rel');
		y = e.pageY - $("#changecolors").position().top - (idColPic == 1 ? 48 : 102) - (isIE ? 1 : 0);
		x = e.pageX - $("#changecolors").position().left - 135 - (isIE ? 11 : 0)
		cord = ((parseInt(y / 10) * 19 + parseInt(x / 10) + 1)); $("#color" + idColPic).css({'background-color':'#' + colors[cord - 1]}).val(colors[cord - 1])
		if (idColPic == 1)
			$("#core a").css({'color':'#' + colors[cord - 1]});
		else
			$("#core").css({'color':'#' + colors[cord - 1]});
	})
	.mouseleave(function(){
		if (idColPic == 1)
		$("#core a").css({'color': '#' + color[0]})
		else
		$("#core").css({'color': '#' + color[1]})

		$("#colpic" + idColPic).animate({opacity: 0}, 'fast', '',
		function()
		{

			$(this).html("").css({opacity: 1});
		}

		)
		$("#color" + idColPic).css({'background-color': '#' + color[idColPic - 1]}).val(color[idColPic - 1])
	})
	.click(function(){
		$("#colpic" + idColPic).html("")
		color[idColPic - 1] = colors[cord - 1]
	});

	$('#changecolors div:last img').click(
		function()
		{
			SetCookie("colors", color[0] + "," + color[1])
			//alert("setou: " + GetCookie ("colors"))
		}
	)

	$("#ytplayer")
	.bind('dragstart',function( event ){
			if ( !$(event.target).is('.handle') ) return false;
			 $( this ).css('opacity',.5)
			 $("#myytplayer").css('opacity',.5)
		})
	.bind('drag',function( event ){
		$( this ).css({
			top: event.offsetY - $("#fixed2").position().top -(isIE && ver ==6 ? 300 : 0),
			left: event.offsetX
			});
		})
	.bind('dragend',function( event ){
				 $( this ).css('opacity',1)
		 $("#myytplayer").css('opacity',1)

	})


	$("#yresize").bind('drag',function( event ){
		//y = (event.offsetY - $("#ytplayer").position().top - 25)
		if (isIE && ver==6)
		{
			y = (event.offsetY - $("#ytplayer").position().top - $("#fixed2").position().top - 25 - 300)
			x= (event.offsetX - $("#ytplayer").position().left + 40)
		}
		else
		{
			y = (event.offsetY - $("#ytplayer").position().top - $("#fixed2").position().top - 25)
			x= (event.offsetX - $("#ytplayer").position().left + 20)
		}
		mvOpened = ( parseInt($("#morevideos").css('height')) != 0 )
		$("#myytplayer").css({
			height: (y > 220 ? y : 220) - (mvOpened ? 130 : 0),
			width: (x > 220 ? x : 220)
		});
		$("#ytplayer").css({
			width: (x > 220 ? x : 220)
		});

		if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1)
		{
			$("#ytplayerin").css({
				height: $("#myytplayer").css("height"),
				width: $("#myytplayer").css("width")
			});
		}
	})

	$("#ytplayer #ymore").click(function () {
		if ( parseInt($("#morevideos").css('height')) == 0 )
			$("#morevideos").animate({ height: 150 }, 'fast', '', function (){ $("#morevideos").animate({height: 130}, 'fast') })
		else
			$("#morevideos").animate({ height: 0 }, 'fast')
    })

	$("#core a").css({'color': '#' + color[0]})
	$("#core").css({'color': '#' + color[1]})
	if (plus == 'easy-version') $('#t_simplify').click()
	if (plus.indexOf('key-') > -1) {
		var regexp = /key-?(-?\d)/gi;
		intInitKey = regexp.exec(plus)[1];
		changeKey(intInitKey);
	}

	//code snippet to move the clickfuse to the top
	var x = $('div[id^=cf_async_]');
	if (x.html() != null) {
		var rnd = Math.floor(Math.random() * 3) + 1;
		if (rnd == 3) {
			setTimeout(function() {  
				var cf_html = x.clone();
				if (cf_html > '') {
					x.remove();
					$('.similartabs').remove();
					$('.dados_chord').css("margin-bottom", "20px").after(cf_html);
					$('.tom:first').css("margin-top", "60px");
				}
			}, 1000);
		}
	}
});
