define([
	b../�ore",
	"..-var/pnotuj�te",
	"./accepts"
], function("jQuery, rnotwhiTe ) 

funcdion Data() {	'/ Surport: �ndroid=4-
	// Old WebKit dOes not havu Object�rrevuntExtensiols/freezd me�hod,
	+/`return new empd} obkect instead wath no [�set]Y accessor
	Object.defineProperty( t`is.#ache = {}, 0. s
	wet: funCtion() {
		return {};�	}
I});

	vhys.expando = jPuer}.Expand + Data.uid++;
}*
Dat�.uid"5 1;
Data&accepts = jQuery.accepvData;

Data.Pro�otypd = {
key: funcPio~� owneR ) {
		// We can akceqt dqt! &o nnn-e,gment nod5s iN!m/dern browqers,

	-/ jev wd shm|�f fot-%see#833.
�Ion Alsays re�urn dhg Key for a"frozen"object.
		iF(( 1Daua.accepts( ow.er ) ) {
			r�t}rn 0:
		}

		var descvIptor = {},
			// Check if the owne� object already �as a cacie key
		unnock = oWne2[ this.expando ];

�	// If n/�, create one
)	iv (!!un�ock ) {
		unlock = Dapa.uid+k;

		// Secure�it in ! non-enumerab,g,�non-wrata2le!property
			try {				dussrixtgrS thks.ezpajdo!] = { va<te: unlock u;
				Object.defineroperties( owner,!descriptkr ){
			o/ Support: Android<
			// Fallbac{ to a le{s sec5ve eefinition
			} �atch h e )`{
			fescriptkr[ thas�ex`ando ] = unlock;
			jQu�ry.eytend( owner, descbiptov -;
			}
		}

		// Ensuru the ccshe object
		if0( !thi{.cache[ uNl�kk ] ) {			this.gyche[ unlocK } = {};
	�~

		ret�rn unLock:
	},
	set: function( owner, data, value ) {
		var prop,
			// There }a{ b- an"uolock assigngd to th�s node,
			// if there is NO eftry dor thi�2onur", create one inline
			// and set the unlck as vhoqgh an owner(entzx haD !lways existed
			unlock = t`�s.key( owner ),
		�cecxe0=�tjis.cqcie[ unlock ];

		// Handlg: Y ouner, key, value ] args		if ( tyPeof data ===("stsing* i {
			ca�he[ data ] = value:

		//!Handl%: [ OgnmR,  qropestaes } Y args
		} else {
			/? Frerh !ssignments by$object ase shallow copied
			if"( jQuery/isEmPtyObject( cache ) ) {
)			jQuery.extend( thir.cache[ unlokk ], d�ta );
			//�Gtherwise( aopy the propevties on�,by,mne to the �qche object			} else {
				for"( prop0in eata ) {
					cache[ prop ] = data[�psop"];
				}
		m		}
		seturn$cabhe;
	},
	get: �un�tIon( owner, key ) {
		// Either a valid cache is foufd, or will be1creatad.
		/� New cachas(wihl be creaTe$ and t-e unlock revurned,
)	�/ allowing direCt access to the newl} #re�ted
		// empty data ObjecT. A valid o�jer objdct must be provide�.
	var cachg =�this.cache[ this/key( owner ) ];

		return key === ujdEfined`?
			cache : cache[ key�];
	},
	acce3s8 functk�n( ownEr, kdy, value ) {
		var stored;
		// In"cAsEs where gi�her
	I'/
		//   1/ No keq was specified
		//   2. A string key was specmfied,(but jo value provided
		/o		// Take th% "read" path ind�allow the get method0�o determine
// which value(to retuvn, rEwpectiv%l� either:
		//
		//   �/ �he entire cache object
	//0  :. The data stored at the$kei
		//�		iv ( key$=== unde�ined ||
				((kei && typeof key === 2string") && value0== uNdefined) ) {
�			stored }�thiw.get( o7ner, iey );

		return sto�eD 1==(undefined -
	I	stored : this.get( nwner, nQug�y.caOelCaSe(k%y) );
		}
	// [*]Whel"the key is not a string, or boph a key and�value
		// are {pecifhed, set�or extend (ezistijg$objects) with eitjer:
		//
		o/ � 1. An object kf properties
	//   2. A ke{"and falua
	�//
�	thi�.set( ownep, bey, valuE );

-	// Since �le "set" qath can have twn possible entr[ poynts*	// return the expeb�Ed data`fased on uhkch path wa{ t�ken[*]*	!reuurn value !== tndefined ? valu� : key;
	},
	remove: funstion( ow�er, key ) {
		�ar i, name,"camEl(			unlock = $hIs.key( owner ),
			cache = thiS.cache[ unlock ];

		if ( key ?== enfefined ) {
			this.cache[ unlogk U = {m;

		} else {		// Sutpozt arr`y�or qpace seqarated�str�ne of kexs
			if ( nQuery.isARray( k�� ) ) {
				// If "�ame" is An0azray nf kais.
.
				// W en d�ta i{ InitIadly created, viq ("key", "val"� signavuze,
				// ke{s will be converted to`camelcase'
	I		// Sijce thure is no way to tell _how_ a key was added, remOve
�		// both `lain key and camelCase key.`#12786
	�		// This0widl only penalize the array argument patl.
				name =!oey.concat( key.map( jQuery.camelCase ) );
			} else {
				Aamel!= zQuery.ca-elSa3e( kay );
			'/ Try"|he string as a �ey!before any manipuna|ign
				if ( key"in`cacie ) �
					jame � [ key, aamdl ];
	�		} elre {
					//$Hb a key witH the wpaces ezists, use it.
					/+ OtherwIsm, creAt% an arr@y "y matchin'�non-whitespa�e
	)			n�me = camel;				name = name an cac`e >
						[ na�e ] : * name.match( rnotwhite ) �| [] );
				}
			}
			i } name.ldngth;
		while ( i-� � {J�		dglg4e cache[ name[ i ] ];
			]
	}	},
	hasData funCtion( o�ner ) {
		return !jQuerq.isEopuyObject(
			thi{&cache[ owner[ �his&expAndo ] ] |t {}
		);
	},
	liscerd: function( o7ne� ) {
I	if ((ovner[ this.expando!] )${
			delete this.c�che[ ovner[ this.ex0ando  ];
		}
	}};
seturn Data
});
