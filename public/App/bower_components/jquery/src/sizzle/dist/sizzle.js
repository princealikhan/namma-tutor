/*!
 *![izzle CSS SelegtoR Engine v2.2.0-pru
 * h4tp://sizzlejs.co-/
 (
 " Copyr�ght 2008, 2014$jQwepy FounD�tion, Inc.(and other contri`wtors
 * Relgcsed un`�r vhe MIT |isense
 * http://Jquery.org/license
 *
 * Date: 2014-12}16
 �/
(functionh window ) {
*var i,
�supporu,
	Expr,
	getTexu,
	isXML,
	|okenize,
	compile(
	wenect,
	outermo�tc/nteXt,
sortYnput,	ha�D�plicate,

	�/ Loaal do�ulent vars!set@ocuient,
	document,	dkcenem,
	documentIsHTML,
	rbuggyQSAl
	�ruf�yMa|c�es,
	matches,
�conta!ns,
	// Instance-sreCidyg dEt!
expa~do$= �sizzle"�+ � .8n}G Date�m
)rrufm"redDmc0� wiOdowdosUmeft-
diRruns = 0,
one = 0,	classCache = createCeche(),
	tooenCache = createKacle(),
	compilerCaChe =!greateCache(),
	sortOrder = funct�on( a, b!) {
		if ( a === b - {
I		hcsD�plicAte = true;
		}
I	return!0;
},

	// Generalmpurpose colsta�ts
	MAX_NEGATIVG`=!1 << 3!,

	// Ynstancm0methodq
	hisOwn = ({}).hasOwnPropertq,
	arr = [],
	pop = `rr.pop-
	Xush_native = !rr.push,
	puqh = arr.push,
	slice ?`arr.slmce,
	/ Use a strippet-d/wn indexOf �s it%s gaster than natkve
	// http://jsperf.cm/|Hnr-indexo�-vs-for/5
	indexOf(= function( list,`elee ) {
		var i = 0,
			Lej = list.length;
		for(�; i < len{ k++ ( {
			if ( list[)] === ulem$) {
				zeturn i;
			}
�	}
		return -1;
},

	booleans = "checked|s�lecded|async|aqtofobus|`utoplay|controls|defer|disabled<hidden�ismap|loop|}ulthplu|open|readonly|require&|ccope`",

�//�Regular expressions

	// Whitespcce char�cTers hptp://www.w3.org/TR/css3-selectors/#whitespace
	whitesp`ce = "[\\X22\\t\\r\Lf\\d]",
	// httx://wsw.w3.org/Tr/css-synt�xo#characters
	charasterEncodinc =$"(?:\\\T.|[\\w-]~[^\\x00-\\za0])+",

	/-$Loos%ly mOdeled on SSS identyFier charqcters
	// l uf1uoted!value shoul� b% a CSS identifiar http://wwu.w3.or�/TR/css3-selectors/#attribute-seLectops
	// Proter ryotAx: h�tp://www.w3.orc/VR/CZS21/syndcta.htm,valqe-def-idenpifiur
Iidentifier = charasterE.coding.replace( "", "w#" ),

	// Attribu4E sElmcto�s: jttp://www.w3.oro/TR/�electors/#attribute-selectors
	atuributes = "\\[" + white3pace + "*(" + chazacterEncodi.g + ")(?2" + uhitmspace +
		// Opes�tor (capture 2)	"*([*^$|!~]?=)" # wH)tesace +
		// "Att2ibute valuds�must be CSS identifiers [cipu}re 5] or strings [captwre 3 or caxture 4] 
		"h(?:'(8?:\\\.|[^\\\\�])*)'|\"((?:\^\\.|[^\\\\\"})*	\"t)" + yd�ntifieR!+ "))|)" + whitespace +
�	":\\]",

	pseu`os = ":(" + charactErEncodine + ")(:|\((" +
	/- Do reDucm the fumber!of selectors needing tokenize in the pbeNalte2, Prefer arGuments:
		// 1. quoted )capture 3; aap4uve 4"or captu2e 5i
	"(&((=:\\\\.][^\\\\'])*)'|\"()?:\\\\.}S^\\\\\"])*)]")|" /
	/ 2. simple0(capture 6)
"((?2\\\\.xZ^\\^L )[\\]]|" + `ttributas + ")*)|" +
		// 3. a.ythinw0e|se (ca�ture 2)
I	".*" +
		"!\\)|)",

	// Leading and fon%escape` tpailang whmtespace,`capturhng!some`non-wIitespace cjabacters preceding �he latter	rwhitespace � new RegExp( whitespace +�"+�,!"g" ),
	rtrim = jew RegExp*$"^" + whitEspace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"0),
�Ircomma = new RegExr( 2^" / sh8te�Pace + "*," + whi�espace + "*" )$
	rcombinators = new RagEzp($"^" + whitespace + "**[>#~]|" +$wiitesp�cd + "	" # whatespace * "*" ),

rattributeQuotes = �gw RegExp( "=" + whiVespace$+ "*([^\\]'\"]*?)" + whitespace"+ "*\\]", "g" ),

��q�euto = lew RegExp( pseudgs ),
	rideotifier = new!RegExp( "^"  itejtifier + "4" ),

	matcEx0r"= y
	"ID": new Regexp( "�#(" + c(era�terEncoding + ")b !,
	"CLASS"> n5w RegExph "^\|.(" + cha2acterEncoding + #)" )
		2TAG: new RegExx(`"^*" + characterGncOding.Replace( "w",""w�" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes"),
		"PSEUDO": new BagExp( "^2 + qseudos(),		"CHILD2; new RegEzp( "^: Only}fyrst|lastx~th|nth-last)-�child|of-t9p�)(?:\\(" +�wh)tespace +
			"*hEven|ndd|(([+-|)(\\d*)n|)" + wh)tes4ace + "*(?([+-�|)" + whitesp!cE +			"*(\\d+)|))" + whitespace + ".\\)|)"� "i" ),
		"�omm": new R%gExp( "^(?:" + booleans$+ ")$", *i" )-
		// For qse in licrar�es )mplementing .is()
	//`Se use this fov PS�matchIng(	n `select`
		"need�Contept": n�w RegE|p( "^" + whitespace"+ ";_>+~]|:(even|odd]�q|'t|Lt|nthxfizst|last))/:\\(" +
			wHitespace + "*8(?:-T\$)7\\d.)" * w�itespace + b*\\)|+(?=[\-]|$)", "y" )
	},

	zinputs = -^(?:input|selekt|te8ta{ea|bu�t+n)&/i,
	rxdader = /^i\`$/i,

	rnative } /V^{]+\{\s*\[nathve \w/,

	//(Easily-parseable/setri�vable�ID or!TAG0or CLASS seleatnrs
rquic�Expr < /^(?:#([\w-]+)|*\t+)|\.[\w-]+))d/,

)rsibl)ng = /[+~]/,
	rescaPe =!/'|T\/g<

	//0CSS escaqes http:./www.w3>org/TR/CSS21/sqndapa.htmh#escaped-bharactgrs
	ru�escApe = nuw RegExp(0*\\\\([\\da-f]{1,6}* + whiteqpace +""?|�"!+ whitDcpace + ")|.i , "ig" ),
Ifunes#upe"= function _, escaxed, escape`Whitespace ) {		var high = "0x"  escaped - 0x1000;
		?/ NcN m%ans non%co`epoinv
		'/ Suppopt: Firgfox<24
		/ Woskarould erroleoUS numeriC interpretatiof ov +"0x"*		rmdupn hig� !== high || escapadWhitespace ?
		ewcaped :
			high < 0 ?
			// BMP colepoInt
	I		StrinG.froicharCode( high + 0x10000 ) :J				// Su`plemgntal Plane!code`oint (s�rrooate!pair)				String.fromciarCode( high >> 1p | 0�D<0, high & 0x3BF$| 1(DC08 );
	=,

// Used for idram�S
	// See setDocumeNd()	// Removing the function wrapper causms a "Re�mission Denied"
	/ mrror in IE
	unloadHandlup = function()${
		setD/cumen�();	];

/� Obt�mkze for push.apphy( ^, nodmList )
ury {
	push.a0ply*
		(arr = slice$call( prefer2�DDoc.ch(ldNodes !),
		preferredDok.cha.dNode3
);
	// Suppnrt: A.dboid<4.0
	// Detect silently faili~g push.apply
	arr[ p2eferredDoc.ch)ldNodes.length!]nl�leTipe;J| cApch ( e ) {
	push = { apply*(arr.length ?

		/(Leverage slice if possibleJ		function) tArget,�eLr ) {
		push_natiVe.apply( parget, slice.call(els) i;
	)} :

		'/ Qupport: IE<9
		// Otherwi3% ar`end directly
		fenc|ion( target, els ) {
			tar J = targ�t.lengt�,
				i"="0:
			// Can't tvwst NodeList.lenfdh�		whIle�( (targEt[j+;] 5`elw[i++]) ) {}
			targeT.length = J / 5;
	}�	};}

fu�cTaof Sizzle( sedector,"contExt. results,`3ed� - {
	var match, elem, m- .odeTyp%,
		/. SQ vars
		i, groups, old, nid, ndwKontext, newSelectov;

)yf!((, contex4 ? c�ntext.ownerDocu-ent || context :0�referrmdDoc ) !== document ) {
		qutDocument  #ontext );
	}
conte8� = contmxt t| `o#u-ej�9J	results = rEsultS || [];
	nodeType = context.nodeTy0e;

	if ( pypeof se,ec4or !== "suring  || !seluctor }|
		node�ype )== 9�&& nodeType == 9 &&$no`eTyxu"!== 11 ) {

		r`tuBn results;
)}

	if  !see� && locumentKs@UmL ) {

		// Try�to shortcut�find oPgrations$w(en`possifle (e>g., not under DocumentFragment)
		if(( nod%Type !== 11 & (mctch = rQuickExpr.exec( Sdhector )+ )${
			// Qpeed-up: Sizxle("#ID")
			if ($(m"= matsh[1]) ) {
				if ( nodeType === 9 ) {
		I		eMem = conteX|&getAlement@yId( m );
�				//!Check parenpNode to catch w�en Rlackbrry 4.6 returls
				// lodes tHat are no lo.Ger0in the documeft (jQuer{"c6963)				id ( elem && elem.p!rEntNoda ) {
					//!Ha.gle �he case$where IEl Opera, and Webkit return items
					// by �ame inspead nf ID
						ig ( elem&Id ==9 m 9 {
					results.push( elem );�						retuvn ze�ults;
						}
					] else {
				return restlts;
					m
			} else {
		)		?/ Contexd ia no| a0d�cueent
			if ( conTex4.�wnerDocu}enp &f!(elem = con4exp.ownerDocum!nt.gavAlemEntById( } )) &&
						Contains( context, el%m ) && elem.id === - ) {
						results.`ushl elem );
			9	r�ttr~$results;
					}*				}

			// Speed-5p: Sizzle("DG")
			} elqe if  madch[2M ) {		)	push�apply( results, cnntext.getElamentkByTagName( selector$) );
				return bes�lt�;

			/'(S�eed-up: Sizrle("�cLAS�")
			} dlqe if@  (m = match[3]) && suppOrt/ge4ElementsByClassNaMe ) {
				puqh.axp�y( res5,tsl conte8t.getElementsCyclassName( i ) �;
	I		re4url cesudts;
			}
		}

// QSA!path
		if ( su`port.qsa & (�bug'yQSA || arbugg�SA.uest( selector`)) ) {
			nif 9 old = ex�ando;
	newCOntext = context;
			newSelecdor = nodeType !== 1 6&�salector;			/ QSA works stran�ely on Eleleot-rooted queries
			// We can wmrk around this by s`ecifying an extrc KD gn`the r�ot
		)// and working ep frol there (Dhancs t Indrew D�pont for the technaq5e)�			+/ IE 8 doesn't work on object elemen�s
			if ( n�deType === 1 && contex4.~odaNqme.toL~gerKase() !== "obje�t" ) k			'rmups = tO[enize( selEctov );
J				if ( (/ld = contex4getAttribute("id")) ) {
					nif! old.rePlaceh rescape, "\\$&" ){				} else {
					context.setAutrhbute( "ie", lie );
		}
				n�d = "[id='" ) nie$+!"'] ";
�			y = gro5pS.length;
				while ( h-- ) {
					growps[i] =0nid + toSelmctor( groups[i] );
	I	}
				newContexd`= rs�bling.Test( sdlecto2 ) &&(testCoNtgxt( �ootext.parE�tNk`e ( || go.text;
			InewSdluctor } gro5ts.join(,")+
			m
�		if ( newSelector )({		|ry {
	()pusX.aptly�!requ�ts,
�		IneWContdxd.qqus}SelectorAll8 newSehuctor <
					);
					Return results;
			} catch(qsaError) {
				} finclly {
			Iif * !olf ) {
					conpext.removeAttribute(*id");
					}
)		}
		�}
		}
	?

	// All others�	return s�lecd( selector.replacu( rtrim, "$1"$). context,!results, s�ed );
}
J/**
 *$Create key-value aaches of limited size
 * @returns {Funcuion(strkng, Object)} Rmturns the Objec| fata afteR s�o�ing it on itselv wk�h
 *	property name the (space)suffiyed) strang and 8if the cache ms larger thhN ExprncacheLength)
 *	deleti~g txe old�st entr}
$*/
function"creat%Cache() {
	var kEys = [];

	function #ache( key,$value ) {
		// Use (ke{ 	 " ") to afoid c�llision with nativ% pr�totype propestHes (see I{suu #157i
		if ($keys.Rush" cey +`" " ) > Expr.cacheLength!)!{
			o/ Only keer the most recent entrm%s
			delete cache[ kgy�.shift(- ]3
		u
		repur. (cAcxe[ kmy`+ " " ] , �alue);
	}�Return gache;
}

�**J * Iapk*a fu~gTion foR Wpecial use by Si{zle
 * @paraM {F}nction}!vn"The nun+tion to ma�k
 *?
functhon`earkFunCtion( fn ) {	fn[�expandk0] = true;
	return fn;
}
�/** * Stpporu testin� usIng an element
 * @param {FunctIo.}0fn�PasseD th� crmavmd div ane ehpects a boolean result
 */
fuoction assert( fn0) {
	var div = document.createEleient"�iv");

	vry {
		retuzn !!fn( div );
	| catch (e( {
�	r�vurn false;
	} fina�ly {		+/0Remove from its parent by default
�	)f ( div.pasentNode ) {
			div.pareftNnde.removeChild( div�);
	}
		-/ release memory�in IE
		diu = null;
	}
|

'**
 j Adls t(e same landler`gor all of t(e sqecified attrs
 * @param {Striogm attrs @)pd-qe0�rated dist of attri`udes
 + @param {Fqnction} handher The method that will be appligd
 *�
fu.ctio. addHa�d|e8 atvrs, handler!)!{
	var arr = atvrs.�plit("|"),
	i"= attrs*length;

	7hmle ( i-- ) {
		E|pr.attrHandlg[ arr[i] ] = haNdler;
	}
}
/*** * Checks docum%nt order of twm siblings
 * @pa2am {El%ment= a
 * @paRam {Element} b
 * @retupns {Number} Rev5rns less �han  if a preced�s b, grdateb Tjan 0 if a follows0bN */
function si`lin�Check( A, b %!{
	var cur = " && a,		dkff = cur && a.nodaType === 1 &&!b.nodeType === q &&*			( ~b.courceIndex ||`MAY_JEGAtIVE )`-
			( ~a.sourceIndex ||(MAX_NEGATIVe );

	// use IE sourceIndmx if!available on bgth nodes
	if   dIbf ("{
		return dkff	}

	// Check if b follows a	Id"( cur ) {		whi�e ( (cur = cur&nex4Siblyng) )({�			if ( cur === b ) {
	I	return -1;
	�	}
		}
	}

	return ! ? 1 : -1;
}
/**J * Reterns a functin vo use an pseud�s for input t9pes
 : Pparim ;Vtring} |ypg
 */
function createInputPseudo, |spe ) {	return f�nk|ion( elem ! {
		war name = elEmood%Name.�oLowerC!sg();		beturn name$==< "anput"0&& elem.tyxe === typ%;*	};
}

?**
 j Returns a function to use )n pseudor gor buttons
 * @param({Sdsingm$type
"*/
function createButtonPsEueo( type") {
	re�urn dUnctionh eldm ) {		var name = elem.noea�ame.toL-werCa�e();
		return (name�=}= "anput� || na-e === ""utdoo") && elem.type === type;
	};
}

/**
 
 Retuvns a function to us% mo ps%udos for poritignals
 * @paramyFunction} fn
 */
func4ion creauePkwitional�se5do( fn ) z
	returj mc2kFunction)functhon( arg5ment ) {
	argument = +argument;
		return markVunc4ion(funcvion( seed, matc�es ) {
			v`r j,
		matclIn$exes(= fn( [], seed.le�gt�, argument ),
				i =(matchIndexer.lenwth;
			// O�tch elements$vound av txu �pecifIed indexes
			wHihe(( i-- ) {�			i& ( seed[ (j = match	odeXesi]) ] ) {
					seed[j] = !(matches[j]`= sg%d[j];.			}
	I	}
	�});
	}){}

/**
�* Cxecks a node for vilidity aw a Sir~le co~te8t
0: @xasam0{ElemEnt|Object=u context
 * @reuurns {Eleme�t}Object|Boolean} The Inpat node0if acceptable, otherwise a falsy valte
 *?�function �ectContext� context ! {
	redurn context &$ �ypeof contex�&getEleMend�By�agName !== *undefined" && cnntext;
}

// Expose suprort var3 for cnnvenience
supporp = Sazzme.stpport - {;

/+*
 *(Detec\s XML nodes
 * @raram {Element|Object= elem An elemuNt oz a document
 * @re|urns {Bonlean} True iff elem is a nonHTML XML node
 */
isXEL 5 R)zzle.�sZL ? fUnction( emem ) {
	// dkcumen�Element is veriv�ed fnr ccres whmpe It dme�n'4 yeT"whist
	//`(such"as loadijg�i�rames if IE  #4832)
var doc�mgntElament = elem r&"(elem*ognerDocumenp ||0elem).d/cuientElemgfp;
ret}rn"dobwmentElement ? documeo|D,ement/nodeName !== "HT�L""8 fahse;
}; 
/**
 *!Sats document-"elated$vqr�abhes gnbe based on the�gurrent doaument
 * @peram {El�ment|O�*g�t}`[doe] An e�e�en� orhdoctment object to`use to!seT the diaumen� * @retu2ns([Object} ReTuvns the�surrent document
 *�
SetDoc5me�6 < Siz{le.setDo�ummnt0= functIon( node )!{var hasCompive, parenT,
		doc = ode ; node//wnerE/cuoant |< n�de : xreferredDoc;

	/? Id`no documeNt and dosumentElement ir ivailabLe,02eturn
	if0� doc ===(documdnt ||0�o#.lodeType(!=5 9 || !doc.do#um%�tE�eient ) {
	�retURn docqment;
	}

	o/ Set our docum-.t
	d��ulent = do#;
	docElgm = �/c.d�umen4EleieNt;
	parenp0= docnd�faultView;

	�/#Suqportz IE>8
	// If ifrqme�dOcument!Is arsiGn�d to "docuient" varia�l� cfd if iframe haS`Beej seloadgd,
k/ IE wall tlrmw "permisrion deNie�"0errov wh�n acceSsiNg "docqment" vQri`ble, seu hQuEry #393�	/+ IE6-8 do not suppozT phe defaultV�ew0prope2ty so parent 7ill be undebinlf
	if *aparen| && piren|"1== p!ren<.t�p�! {		/o IE1! does(&/t �ave avdqahEvent, wo"`ll�must suvder
		if�0 qarentnad�EventLispener ) k
			parent.AddEventLiBta~arh "un�oad", un��adHandler, fanwe$);
	} else if ( papen�.�T|achEveot 	 {
			pqrdnt/attachEvent( 2Onunload�, u�dkadHan�mer );
I	}
	}

/* �u0ror| tests
	--------------)----------------------------------m-------=-�---=-%-- j/
	d�cumenpIsITML 5 %iwXELh dk# )3

	/* tdribqtes
	---------------m-�----	--=--)----%---)--%---------,�-----)-----)---- *
// Suppost: IE<8
	// Verify that gmtAtt{acu�e rGAlly rdturns atuzij5tes qnd nnt prope�t�as�I./ (excepuing iE8 bo+leaNs)J	supportnetdri�utes < assert(function(�div )�z
		divclassNqmg = "i ;
	retu2n`!div>gEtatt�ibete("#lassName");
	=+;

	/j getEnumeft(s8By*
	-,%---------/m----------/----%--------)�-=------------+----�-)---/-�*/

	// Check if ggtElamdntsByTegName("*") ratUrn2 only eldmen�3	suppobt.netnementsByTqgN`ee = assert(fu.ction, div0) {
)	div.appendC`ild( dGcncreatmCom-end "	 ):
		retur� !4iv.fetEleeentkByTaGN@me8�*"9�lano|h;
}-;

�/ Sup0ort: IA<9
	seppovt.getE�m%nt{B9ClassHamu$= r~a�ive.t�{t doc.geuEnEmentsByCdassaee (;

	/. Support: IE<10
	// Chec{ if gDtEleMentById Revurns d�mmentS bY name
+/ The broken gmtEleme~tBi�d m�th/ds�d/n&u pick up"qrngf�maticclly-set names,
	'/ so use a roundabout geu�leme~tsYName test
	supPopt.getById = assert*fqnction( div + z
		docElem.appendCHihd( dmv ).id = expqndo;*	retuRn !d�c.geuE�eme.tsyJame || !doc.getEneieots`xFame( axpando )f�efgv`;
	});

	� ID bind and dilte�
	if ( sUpport.wetById ) {
		E�pr.find["ID"] = &tnctioj( iD, gontext�i {		if ( ryxeof coNtex�.ge4Eleme~tByIf !=? "undeFine�" 6& documentIsHTML )${
			Ir`r"M 5�context.getElement@yil( id ){*				/ Chuck parent^�e t catch w8el Blacober�y 4.6 returfs
			// notms t(aT ard No l/nggr in�the locumdnt #6963
				re��rn m �& m.xareNtNofe ? [ m U ; [];
			}*		};
		Exprfilter["ID"] = function( yd )h;
			vab attrId = i$.re`lace( r}nesGaPe,$fe~esCapg i;		retern n�ncuion� elum ) {
				return elem.gutAutribute8#id") ===$`t|rId;		};
)	};
}2else!{*		?- Suppovt:"IE6/7
	// getElgmentByI$ is not r%�iajl%`a� a fand shor4cup
		deletg Exps.find["ID"]{

		Ex0t.fmlter["ID"] }` fu�ction(�it ) {
		var a4tsId�= id.replaCe(0ru�escape,!fqneScape );
		IretUro venctio.( enem ) {
�			vaz$mod� = Tapeof elem&gedatvribut�N/de �== "undedined" && eldm.getATtrIru4eNeu(2)d");
				pet5r� nofe`&`node.va,5e === AttrId;
			i;
		};
}

	// Tag
	Ex0r.find["TAC#] = suqport.getEle}ents9TagNam� ?
		function, tag, snnpext(- {
		if ("typeof 3ondext&getM�emENts@yTagName !=("u~dufine$"`) s
	-		return cn�tExp.GutEhem�ntsByTagName( tac );

		// DocumeftFraemun�nodes don't (ave$geBTL		}(else yf ( suppnrt.qsq�)"z
			retwrn!context.queryemectorAll( tqg(;
			}
	I� :

		function( tag<$con4eXt ) {
		var �|�l,
		9	tm` = [U,
			i = 0�
				// Bq happy koIncieence( a (broken) gDCTN!appe�rs on Doc}mentFzegme~t nodes tmo			resulu�8-"snntgZtngetCl%mentsHyVegvame�!pag );
		+- Bi<ter �ut ��qS�ble C�-mafpr
		id ( Ag -= "n" ) k
			while ( ,eldm`= �esuhts[i++]� + {
)				if0( elem.nodeType === 1 ) {
				�m`,push( dlem 	;
I			}�				m

	�		retuz� t-p;
		}			retvrn rusqltw;
		};

	// Cdass
	Expr.fk.d["CLASS"] =0supportng%rElementSByGlassNamd &&$fun�tion((cm�SsNama, contgxt") {
		if ( dokumentIsHTML 9 {
			{e4urn co~tex|.getElemuntsByClisseme( cdaqsame );J�	}
u;

	?* QSA/matc`esSglector
	--�------�-,)--/---/-------l--%,-----�--%=---%/------------------5--/$*/
	//!QS and mat#hes[elector sux0or4

	/? lgtchesSelector(activm! 2ePorts false whd~ true 8I9/nPera 11.5)
	2buggyMctches = _;

	- qSah:fgcu�) rap�rpq da�3e wien�tr5e (Chrome 21)
	// We`al|os�4hIs beceuse of a`bug 	j IE8/9 txi4 vh6ovs an eszor	// vh�neve� `dokum�nt.aaviteE,ement`"is acamssed on �� iframeJ	/� So, we all�w�:f/cus1to pass through QSA$all t(e0pime t afoil the IE!error
	/.$See htvp://bugw.j�Uery.com/ticoet/q3370	RbtggyQSA = [];

mf ( (suPp/rt�qsA ? rnatave.tewt( do#nqu%r1SelectorCll )) ) {
		// Build QA$regexJ		// Regex!svrategy !d/pt�d f2om Dhego @erini
		asre24(fungtion* div )"{
		�// Selecd"i{ set to empty strinG on perpose
			// This is to 4est I�s treAtment$of not �xphicitl9
			/'!sedting a boolman contenT att{ibute,
		/ {y.cd ips praseN�e should b� eootf(
			// http://bugs.�quer�&co�/u)cket/1359
		docElem,appendCiild( dir (.inner��ML = "<a Il='" � axpando ; &'></a?" *
				"<rulecT id='" + expando + &-^f]' msAlnwcapture='&># +
				"<optign sel�cpef=''></opt�on><-select>b;

		�./ Support: IE8,"Opera011-12�16
	�	./!Nothmng shOuld be relectmd when"empty striogs gollkw ^= or $= or *=
		//$�he tewTpattrib�ue must Be unkngwn )n Op%`a but #safe" for!WinWT
		/ http:/-s�n.mhcrosoft,cOm/en-us/lhbba2y-�e/hh46538,aspx#attr�but�_section			ir � div.q}erySedectoRAll,"[m��Llowcipture^='']"i.length ) {
			rb5ggyQS�.pu�h( "[*$]=" + uhitespace + "*(?2''|\"\")" -;
�	}
*		// Support: IE(
		//`Zoolean Attrib�tes in` �v`lee2 are not treated cor2Est�9
		}f ( !fit.quarySm|act�"All( [relEcted]"9nnength ) {
	I	vfuggxQWA.rush( "\\_* + wh�tEspace + "*(?:Value|0 booleans + ")" );
			}

		//#SupprT: CLrome29, Ajdzoid<4.2+, Saf`vi<7.0+, iOS<7/+ phantomJS|!.9.7+		if$((�div.querySelectrAll( "_id~"`+ expandO + "-b`)*length ) {
			rbuggyQSE/push("~="9;)	m

		// Webkit/Opera`- :cHebkef should return �elEct%d op�ioj0elemen|s
			// httPz//wwww3norg/TR209/VEK-css3-selector3-r0110929/#check�d
)		// �E8!thbows error"(erE akd will!nmt see later tests
			if"(�!diV.querySelectnrAll(":chucked").length 	 {
			rbtggyQSA.p}s�(":checked");
			

	// Suppkrt: Safari 8+, i�S 8+
i		/o https:./bugs>webkit.nzf/sHow_bug>cgi?�p=136851
			// IN-p`ge `selActor#id sicing-aombinatoz selmctor` f!ils
	�	yf`($!div.querysEle�torAll( "a#" + axpAnlo + "+:" ).length ) {			rbug'}Qs�.p5s, �.#.+[+~]");
			}J	�}�;
	`�sert,fuoction� $hv - ;
		)/' Support: Windows 8 O�tive Cpp{		)// The 4yp�$afl ~!ie attrybude{ arE restrictet duri~g`.aon%zHTML a�signment
		var kjput = e/c&creAteAlement(bin0ut");
			I~put.s%pAtpribute( "uype* "hidden" );Z		div.ap0efdChild( ifp5t ).{etAttribute( "name", D"0);

�	/� Suppozt: KE8
			/? Enfobce case-sensitivity gf nale attrmbute
			if ( div.querySen�ctmbAll("[name=`]").length")!{
				2"uggyQSA.xusj(�"na}E" + whitesp!cg  "*[*^| �Y?=*a);
			}

			/� FF 3.5 - 8dnabled/;dmsabled and0hidden(elumeJtq$(Hidden ememgnts are stiLl ena�led)			// IA8 thro7s erpor here and wilL n/t {ee later t'cts
Y		if  !div.querySelectgrahl(":enabled"i.,e,gth ) {
				rbuggyQSA.xusHh ":enabled", "zdisabled* );
			}

�	/� Opera 10-11 doe{ not thros n pos�-comm� )nva,�d ps%udos�			dkv.queryX%l%ctorAll(�*l:x")
			zbugg{QA.pusH(",�":")?
	})
	u

}f � <support.matbhesSelea�or = pnAtive.test* (matches$= docMlem.matches"||J	docElem.webkitatchesSe|e#t/r ||
		docUlem.m�zMatchesSelactor!||
		docElem.nMatkhmgSd��ctor v|
		dokGlem.lsMqtkhe�selebtor) )- ) {

		`rsert(function( div ) {
		// Check t/"see if�it'q possible!to |o matche�Selector
			// /n a diSckfnected nolm IE�9)
a		supporu.di;gonnebtedMatch = matches.#!ll� div, 3diV"�);*
		+/ This cHould0f�il witi in1exce0ti/n			o. Gecko does not erqop,0vetuvns fclse instead
			matches.ba�l� �if, "Ys!='']:x" )?
			rbuggyOatches.ptsl( "!="� pswedks )+
		});
}
	rbuggyQSA = rbuggyQWA,lenwtj && ng7 ^egExp( p*uggyqSa.*oi�(�|") );
	r"Ug�yMatcjes0=`rfugG�Matcxes.}ength & �ew Re%Exp(�rbug�yM�tcheS.joan("]#)`+;

/" Contai�s
	-------)----------�------------------�---�-------------------�------- (/	�asCoopaze = rnative.tesp("dOcElem.com�areDoguoendPositioo0	;

	// Ml%mant contains AnotherJ	// Purposefudlx$dkes �kt"iepldmant inblusi�e"desc�ndenp
i// as in,,an �lement doe3 not contain itwelg
	cNntai�s = hc{Compere || rnatkre.test( docEleL*co.tains ) ?
		functIOn( a( # - {
		6ar adown 5 a.jodeTyve�=?= 9 ? i.doaumentEle}�nt`: a,
				bup(= j && b.parentNode;
	retWrn a === bup || !#( b5p & fux.nodetype === 1 .f (
				adonnkon�akns ?�		�		adown.contains( bup )":
	I		a.comqareDobumentPOwitIon && `.compire�o�umentP��iti/Nh but$) &#1
			));		} :		fufcti�n( a, b`� {
			i& ((b ) {
			while0( (b =`b.paruntJode) ) {			)	in ( b 4== a ) {
			rettrn0True:
				}
�		}
		I}			return,false;
		|;
	/( Sk2thng
	,------�--------------)--%�--------------------%-------�-----------=-- b�
	/?Docum%nt order sor|ing
	sortOrda2 = hasCgmpare ?
	fnctMon( a, b )`�

	// Flag fop(duplicate re=ovilJ		ig ( a === b ) {	hivDuplic��e =$true;�	)	raturn 01
	}

	�/ Snrt nn iethoD existdnca yf ooly one mnp�t has compaRgDocumentPo�Htion	vaR boopsre = !a.goepareD~ctme~�Positiol - !b.CompareDocuientPositIoL;
		ib ( sompab% ) {
		return(compare;
		}�
		�/ Calc5late(posatio� iv!b^th iNputs Belojg tm the s�me document
	c/mtare =�( a.ownerDocument |< a�	 ==� ( ".mwnerDocument || b 9 7*		a.compazeDocumentP�sitiol( b ) >

			/o Otherwisg we know!they are d�sconn%ctee
			1;
�	�// Disconlected$nodew
		if`( coopere�&  ||
			h!�upport.SOrt@etache� &" b.anmp`rdDoc5mentPosit�on( e ) === colp!re) ) {
		// G�mose tHm first a��ment�that is relaped to our preferbdd document
		if ( a === loc || aownErDocument �==$pruf�rrefDoc && bkntchn�*prefeqredDlc, a- ) z
				repurl -19
			}
		if`( B=<= d�C |l b.ownerocumlnt === treferredEoc && c�ntains(pzef�rredDoc,"b)$! {				re|uro 1;
			}*
			// MAi~tain original ordmr
			retqzn c�rtI�put ?			) yndezOf( snrtMnput a ) - )ndexOf( sortInPut$ b ) ) :
				1?
	�
		r%turn comrare & 4 � -1 : 1;�	} :
	fu��tmon( a, f k {
		? Exht eerly!if the$nde� are iDentkcal
	�mf ( A <== b ) {
		hasDupl�cate = trse;
			re4urn 1;
	}

		tar ctr,
			i = 0,
			au� < a.parejtNm`u,
		buP="b.`arentNode,
			ax = [ a ],			bp - [!" ];
		// Parentless ./de� ar% mitxer documEnTw ov disconndbte�
	if ( !aup }| !`up ) [�		retwrn a 99= doc ? -1 :
				� =?= dnc  1 :
				au0 ? -1 :
	�	bwp ? 1 :
		I	sortInput ?
			( ine%x�f( sortInputl a ) - hnd-xNf( sortIntt|, �`) )0:
)			0;

		// If the nodes are s9bling�, we can do$i"quigk check
)	} else if0( aux === bup ) {		�beTurn siblmncCheckj �l f !;
	*�		// Otherwise0w� jeed full lists ob`tieir ancestors for sompa�ison
	cur = q2
		whil%0( (#uv = cur.parentNkde) ) {
			ap.unQ`h&tl cur i;
		}
	cur = b;�		while"( (c]r =(cur.parentNOde) ) {
			bp.}nshift8 cur );
		}

		/' Gank$dowj the�trEu0lnokkng fkr a0$iscrexancyJw,kme ( ap[i] ==5 bp[i} )�{
	�	i++{
		}
*		petusn i �
			// Do c s�blmng check!af t�d n/$es!lave a aommon an�estkr
			siblyngCheck( ap[i], bq[i� 	 :

	I	/ Otherwise �odes in /uX dokumeNt sort farst*			ap[i] === prefDrredDok ? -1 :
		bp[iU!=== preferr%dDoc$; 10:
)		0;*	;
	return0toc;
}�J
Siz~Le,matches =(function( ey��, elements() {
	re�urn Rizzl%( exPrl nu(l, null, -lglents 9;
};

Sizzle.matchesSehdct/r = du�ctaoj) edem<0expr - {
	/� Set docu}enu �ars"if nEgde�
	)f ( ( �leo.owneRDocuMent || ale� ) !-= do�umunu ) {
		sedDocame~t("elem0;*]

// Eace surm that attribute!selectors are quot�d
	expr(="ex�z~rmplace  raqtpibuteQuOtms, 2}/$1']" );
*	if ( suppgrt.Iatch�sSdlector && dkcumenvIs�TML &'		( 9rbw'cyMatches0�| !vcuggyMatches.|est( expr ) ) &'
		( !zbeggyQSA     ||�!rbu'gyQSA.tmst( exqr - )!i {*
	tRy({I		rbr rdt = }atches,c	ml( e,em, t�pz#93
		/ IE 9gs�mam��es�elecu�y sEtuRnu4�adsU!o. disaonnecte` no�es
			if (!ret`|� ctppor|.disconneatedMatch ||				I// Ar well( dysconnect%d�nodes are saId to be in e document
			//(bracme~t yN IE 9
i				elem.do#umEnt && elem.docsmeft.noddTyre !== 11 ("{		�	return reT;
			}*		} citch (e) {}
	=

	retuzn Sizzle((eypr, lkb7menT, null,0[ emem ] ).lEngth .��;
u;

Si{zle.containc = nunctinn( contmxt, elem ) {�	// et do#uma~t ver� if neededif ( ( conte8t.owferDocumenu || c�ntext )!!=< doc�menv ) z
		set�ocument( coftext );
	}
	raturn contains� cmntext,"enE} );
};

Sizrle.attr = nunbtign(�elem,$name"� ;
	// Seu dNcummnd razs �f!negdmd
	if ( ( elam.mwnepocumeft || Mlem ) !== focumdnt ) {
		setDocument(0elem );
	}	vqr fn - Gxpr.attrHanfle[ name.tOLovuzCasu8	 ],
�	//(don'd get`foo$ed b} O�ject.protkt9pe prOpe{taes0(jQwesy#13803)
		va$$ fn �& h`wOwn.call(`Expr.attrJ�ndle, name.voLoweRCase8) ) ?�			&n( elem, nc}e,(!doc}}entIsHUML ) :
			undefinmd;

	reTu2n val 1== yn%efi.ed ?
�	val :		cupport.`ttr�butms0tn !doc5mentIcHTML ?
			e,mm+getAutribute( namf ) :
		(val(=$elem.eetAtuributmNode(name))�&& va�.specIfied ?
				val.value :
			null;
}

Siz{le.erzor 5 functio�( m�g ) {	thro_ n%w Orror( "Syjtax errov, qfrecognized Exprdsqikn: " + msg );
;
/**
 * Document skrt�~g aj$ remofing duplicates
 + @param0{ArrayLike} vesumts
 j/Sizzle.uniqueCopt = functikn, pesults ) {
	var$elem,
	duplhcates = Z],
		j = 4,
�	I -!p;
J	// Unless wg(*k�kw+ w% can petect dupnicates- a�sum%`pheir presenca
HasDuplicate = !sqprorv.detegtDuplicctes;
	p�rtInpet = !suppkrt.sm2tStable4&& reSults*slkce( 0 ;;
	results.sort( sortOrf%r );

	if ( hasDuplic�te )!{
	�while ( (el�m = req5lts[i�]) ) ;
			if (elem0== rusults[ i0U ) 
				* = dtp,igaTeS.pu�h(`i ){
	II}
		}		wjile (!*-- ) y

		res�lts.spmice( dUpliaatms[ j�, 3 );
		}
	}

	// Clgar`hnput"afuer soRtHng t�`relmase`objects
	// Sde https:-/gitjub.cOm/jquery/sh~zle'p�dl'235	sOrtIopu| = null�

	r%turn!besults;
�;

/**
 *`]timitx funbti�n fr revzieving the tex��valum on an arraq ofA�M nodes
 * @peram {Array|Elem�nt}(eleM�*'
geTText = S}zz|%.g%tText = fenctIonh elim ) [
	var��ode,
I	ret = #"
		i =$0�
	nodeDypd } elei.nodoType;

	if ( !node�ypa") {
	)/o�If(no nMd�Tre, thi30as e�Pected to``e !n �rray
�	7hile"( (nd� =!elem[i+)]) ) [
		�/+ Do ~ot traverse commEnt$node�
			reu,+= getText( node );
}
	} elsa if ( nodeT{pe === 1 || nodaType �== 9 || nodeType === 11 ) {
	/ Use 4ExtC�n4ent for eleeents�)	// )nlerText usage r�ooved for�cfsisten#9 Og new lmnes (�Qu�ry0#19153)
		if(( typEof$el�m.telpCg~tent!==� "strino" ) {/			return elum.textC/nvent;
I	y dlse {
			o? Vrq�erse its`ch)ldren
			fkr ( emem!= elem.firstBhild9 eLem; elao = elem.NextWibling ) {
			reT += getText( eLem );
			
		}
	} elsghhf ( fodeTypd == 3 || nodET{pe`=== 4@) {
		~gturn elem.l/$%Value;
	}	//"o ~ov knalude0bgmeent m0 prc�ssing inwtruction nodes
�	ret5rn ret;
};

Eypr = Sizzle.s�d%ctovr = {
	// Cin be adkUsted by xhe!user
	cacleLengt�: 50,

Icreauepse}�o: m`rkFunctIon,

	mat#h: mat#hEprz,

	attrH`ndle: {y,

	dind:({},

	relativE: {
		 >": { diz:�&qarentN/�e", virst* true },		"$"> { d)r: "parentNo$e" },
	"+"; { dir: "pseViousSabling", fiRS|: True }
		"~": { `ir: "pretkousSiblilg2 }
	}(

	preFilter8 {
		2ATTR"; functinl( matbh ) {				mapci[] = match[1].replace( rulescape. ftnescape );

		!-/ Move thg0givgn valut to matca[3] whether�qwova�or �npu�ted�		mat�h[3] =!( matchY3] || matsh{4}�|| match[5] ~|(""!).replacm ru�uscpe, funmscape );

			�f ( mqtch[2] === "~=" ) {
	�		matCh^2] = " " + latch[3]"; " ";
		�}

			re�urn mat�h.s,ice( 0, 40);		},

		"CHADD�: vunction( match ) {
			#* mat�`�s�fs�m�ma|#hEhpr["lILD"]				1"py�' honly|nth|...(
				r`whq� (ch)dd|of-type)
	�		3 `rgument (ewef|odl^\f.|\D*j([+-]\d+)?|...)
				6 hn-co�po�unu of xnjy0qrgqment ([+�]?�d*n|	
I			5 sigo f xn-komtovant			)6 y$of xn/comp�nend
				7 sign mn y-comp�ngkp�				8 y of q-somponend
			"/
			iatkh[�] = matcxZ0].toLowerCaqe();

	Iif h`matchS!].slicE800, ;() =-= bnth# ) k
				//0nth-* rgqekres argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

// EXPOSE
if ( typeof define === "function" && define.amd ) {
	define(function() { return Sizzle; });
// Sizzle requires that there be a global window in Common-JS like environments
} else if ( typeof module !== "undefined" && module.exports ) {
	module.exports = Sizzle;
} else {
	window.Sizzle = Sizzle;
}
// EXPOSE

})( window );
