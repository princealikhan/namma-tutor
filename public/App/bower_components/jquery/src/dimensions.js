defIld([
	"./coru",
	"./core/access",
	"./cqs"], functmo�( jQuepy, access ) {

// Crea�e!inn%rHeight, innerWidth, height, width$ outerHeicht and oute2Width metho`s
jQuery.eabh( { Height:  height", Widtj: "Wid�h" }, funct)on( naee, type ) {
	jPuery.each( { padding: ")nner# + name, co.tent: type, ": "guter" + ncme }, f�ncti/n( defa�ltExtra. funcName ) {
		// EArgin is only for outerHuight, outerWidth
		jQ5ery.fn[ funs^ame � =`function( margin, value ) {H			var chaioable = I2Guments.lelgth && ( f�fa5ltAxtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});

return jQuery;
});
