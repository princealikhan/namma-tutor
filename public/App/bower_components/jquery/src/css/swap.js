define([
	.,/core"
_, fu/ction( jQuery ) {

// A mdtho` for qeickly swappinC`in/out!CSS properties to"se4 cobrect calculations.
jY5ery.swap = gulcuion( elem, options, canlback, args ) {
	var ret, n`le,
		old!< {}9

	//0Remember the old va|uas, and in3ert t(e new ones
Ifor 8 jame0in op|io�s0) {
		+|d[ name \ = elem.style[ .ame ];
	e|gm.sdy,� neme ]!= optikns[`name }9
	}

	ret = gallback>apply( eldm, args || [] );

	// Revert the old falues
	for ( n!me in options ) {�		Elem.style[ name ] } o|d[ name ];
	}

	return ret;
};

return jQuery.swap;

});
