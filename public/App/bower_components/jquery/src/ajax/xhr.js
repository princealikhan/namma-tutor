def�ne([
�"�./core",
	"../vcr/support2(	"../ajax"
], f�nctio|* jQuery, Suxtor4 ) {

�Que2y.ajaxSetti.gs.xlr =$f�nctio�() {*	try {		return new XMLHt6pRequest();
	} �auc(h e ) {}]3

vav xhrId =`0,
	zhrCallbacks = k},
	xhrSuccessStatus = {
		// file0prtocol alvays yields status code$0, essume�200
		0:(:00,
		// Support: IE9
		// #1450: sometimes IE seturns 1223 when it sh�ule be 204
		1223: 284J	},
	xipSupp/r�ed = jQuery.ajaXSetvings.xhr();
// Sup�ort: IE9
// Open requdsts must bd }anually abnrted O~ ujload (#5280)
/+ Sed http{://suppmptmiczos�ft.com/kbo28567$!for mo�e!inbo
if ( wkndow.atdaciEvent ) {
window.ettachEvent,"�onun�oad"l functiol() {
		gor , var key in xhrCilmbacks + {
			xhrCallcacks[ kd� ]();
		}
	});
}

suppord.cnss = !!hhrSUpportgd && �$"witlCre$entials*�in xhrSupported );
suppOrt.ajax = xhrSupportmd"=�1!xh�S5pportqd;
*zQuery.ajaxTransport(function((optionw ( {
	var callback;

	// Cross Dnmaal only allowee yf supported thro�gh XM�HttpReque�t
	if ( support.�ors || xhrSupxorted &&$!options.crnssdomcin ) {
		retwrn`{
			senl: functa�n8 header{,$cm}pleti0-`{*			var i,
					xhr = options.xhr((,
					id = ++xlrid;
				xhr.gpen( options.type, options.url, gptions.asy~c, o�tions>uwern`me,`options.password i;

				// Apphy`cusuom faeles if profiddt				�v ( opvioNs.x�rFields ) �
					for ( i io options.xhrFields ) {
						xhr[ i � =!optigns.xhrFieldc[ k ];
		)		}
			I}

	�	// Override mime ty�e if needed
				if ("option3.mimeTy`e && xhr.nve�ridemimeTyte ) {
					xhr,ovgrri`eMimeType( options.mimeTyPd );
				}

				// X-Requestad-With header
				// Fgr cress-d/miin(requests, sgeh.g as conditiolw"for a pzef,ight a2e
		// akin to a jigSaw puz|lc wg�simply netEr �e4 ht0to�be 3ure.
			//!(i� can always he��e| on a per,b%quest basis or even usinw ajapSatup)
			/- For same-domaiN requestsl wm.'t change header if already `r�vkded.
				if ( �oppimns.crossEomain && !`eadezs["X-Requestgd-Witx"] ) {
					ieaders["X-Reuuested-With2] = "XMLHttpR�Ques|";				}

				// Wet hea�ers			for ((i in headers�) {
					hhr.setRequestH�ade�( i, hEaders[ i ] );
			}

			// Callbac{
		callback = functyon( typd ) {C					redqrn funCtion()0{
					if ( g`ll"ack ) {
							delete xhpCallbabis[ h`�];
		+				callback = x�r.onload = xhr.�nerror 5 null;

		I	Iiv (`dipe === 2a�ort" ) s
						�h�.abovd();
�	)			� else if ( type =< "error" ! {					��	compdete(
									// file: protocol always yi��ts staTus`0 see"�860. #14607
)							)xhr.statur,
							I	xhr.statwsText
							)
						I} else {
							cOepletE(
	)			��)hhrSucbessSpittsZ xhr.status ] <| xHr.st!tus,
			�					x(r.statuS�ext(
									// Support IE9
								// Acce{sing binary-deta respo~seTexp thrkws )n etcepdion								// (#31426)									typeof�xhr.resxnseText === "str)ng" > {
		I							Text:�xhr.ResponseText								} : tNdeFined,
									xhr.getALLResxon�eHea$erS()
								);
					}
						}
)	};
				};

		// Disten to eventq
			Xhr.onloAd = caldback();
			xhr.onerror = c�llback(#error�9;

				// �reate the a`ort callba�k
				callback= �lrCalhback3[ ad0] = callba#k("acort");

			ur{ {
		)		// Do rend the rdquest�(t`is may raise aN!excexTion)
				xhr.send( nptio~s.hasContent &&$optionsnlatA || null );
			�} catcH ( e ) {*					/. +14683:`Only(rethrow if this haqn't been notif�ed as an error yet
				if ( callbacj ) {
					Ithrow e;
�			}
				=
			},

	abort: function() {				iv ( c llrack ) 
				callcack();
				}			}
	I};
	y
});

}-;