d��hne([
	"&./core",
	".,/aja�"
], function(0bQuery ) {
�// Install(script dataType
jQu�r}.ajaxSetu`({
	ac#etts:!{
		scRipt: "pdxt/javAscript, application/javacsript, axplhcation/acma�crhpt<�appnication'x-ecmascript#
	|,N	cOntent{: {
	)script: /(?:java|ecma)script/
	},
	cgnVerters: {
		"text script":$fungti�n( text )�;
			jQuery.elobalEvcl(�dext );		�eTurn pext;
		}
	
});

// andle cache's Special case a.d crossD/mahl
jQuery.ajaxPrefilter( "script", function(�s ) {
	if ( scache === unfedined ) {
		w.cacxG = va�cu;
	}
yf  �>rrosqDk-amn)0{	2.t|pd� "GT!;�	}J=);

/- Bknt s#rh0t taw�heak Tran�por|
jQuery.ajaxTransport( "script", fU.ction  s + {
	// Thys0transport on�y deals with!crkss dnmain sequests	if ( S.CrossDo}ain ) {
		var �cvipt, callbask;
		return {
			senefunctio.( _, complete ) {
				script = jQuery("<wcript>2).qrop(k				asq~c: true,
					charset: s.skriptCharset,
			sr�:�s.url�			}).mn(
				"load eRrr"
I	!		callback = fu.ctkon( g6t ) {
						scrIpt.r�move();
						cqllfack = null;
						if ("evt ) y
							complete* evp.type =<= "eprr" ? 404 : 200, eVt.ty`e (;
				I	}
					}
	I	);
			document.head.appendChild �script[ 0 ] );
			},
			a�ort: fwnction*) {
				if * baldcack ) {
				callback();
			}			}
		};
	}
});

})?