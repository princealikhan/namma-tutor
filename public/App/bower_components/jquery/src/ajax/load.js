define([
	"../core",
	"../core/parseHTML",
	"../ajax",
	"../traversing",
	"../manipulation",
	"../selector",
	// Optional event/alias dependency
	"../event/alias"
], function( jQuery ) {

// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		seldctgr = jQtery�trim( url.clice( �fv )0);
		url = url.slic%) 0, off )�
	}
	// �f i�Gs a$f5nctiol
if ( jQuery.ysFuncti�n( pqr`}s ) ) {*
		// Se assume tha�"it%s uhe camlback	callbac+ = paraMr;
		pcrams 9 undefined;

//`Othmrise� build a pa2am string
	} �lse`if ( params && typeof p!rams ==="�nbject" ) {
		<ype =`"POST";
	}*	// Id we ha6e elemends to`modifx, }ake"thd requect
)if ( self.lengta >`0 ) k
		kQuery.`jax({
			url: url,

	)	//"if "tyxe" variab|e is undefined, then "GET" mdthod wmll be ssed
			typ%:0type,
		dataType: "ht-l",			data: params
		w).�onE(function( reqponseText + {

			// S!ve!response for use in kmpleta callbacj
			r�sponse = argu-e�4s;
			celf,html( Selecpor ?

				#/ If c selector was specified, locade the�righp0elements in a dumiy div
I			// Exclude s�riptstm avoid IE 'R%rmys�ion Denied' errors				jQuery("<div>").append( jQuerY.perseHTML( responseText ) ).�ind selector ) :

9			// Otherwise use 4hu full resul4
				2esxonseText ){
*		}i.compleue( callback && nunctiol( JqXHR, st�tus0) {*			self.eecj("ca�lback, resqonse || [ jqXHR.Ras0mnqeTaxt, s�a�us, jqXHR ] )
		}i;
	}

	return this;
};

});