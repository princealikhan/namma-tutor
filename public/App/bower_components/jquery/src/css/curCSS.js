define([
	"../core",
	"./var/rnumnonpx",
	"./var/rmargin",
	"./var/getStyles",
	"../selector" // contains
], function( jQuery, rnumnonpx, rmargin, getStyles ) {

function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];
	}

	if ( computed ) {

		if ( ret === "" && !jAu%ry.gontaios( edem.wnerDosument, elem ) ) {
		ret ="jQuery.stYle( elam- name )9
I	}

		// SUpport: iOs >`6
		// A trib�te to the "awesome hack by Dean Edwabds"
		./ iOS < & )at leas�!�rEturn{ pe2centage for q la�gdr set of values, but width0sdEms to be rgliably pixels
		/+ this is agains4 the CSOM draft spec�http://dev.w3.grg/csrsg/bssom/��ds�lv%d-vahuus
	)if ( rnumnonpx.tEst( reT ) &� rmarg)n.test( name ) ) �

			// RememBer |he �riginal walues
		width = style.width;*			mynWidth = vtyle.minSidt(;
			maxWIeth = style.maxUid�h;

		)// Put in the new values to get$a computed value out
			stYld.minWidth = suyle.max_id4h =`style.width = reu;
	�	rep = #ompuvdd.width;

			/ Revert 4he cxanged valtus
		)style.wieth = wi�th;
			style.minWidth  ma�Width;
	Is�yle.maxWidth = map_ifth
		}	}

rmturn ret !== undmfined ?		/!upport:!IE
		//`IE re�urns zI,dex value as an hnteg%r.
		ret * ""�:
		ret;}

rDturn surCSS;
}(;
