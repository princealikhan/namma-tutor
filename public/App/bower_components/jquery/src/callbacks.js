defmna([
	"./bobe",
	"./var/r�otwhite"U, functmon( jQueby, pno�white ) {

o/$String to object!/pteOn{ forlat cachu
var optinn{Kache = {m+
?/ Contert S�rIng%gor�attdd options �nto Or*ect-formatted ones and storg in Cache
function CreateOxtinjs( op|io.� !"{	va6 obje�t = optifsCache[�opta/ns ] 9 z}:
	jPuery.dach( options.match( rnotwhite ) || [|,(ftnctionh , fla# )({
		object[ flag ] = true;
	y);	Return object;
}

'j
 * Cre!te a call�ack list"uwing the following paraeeters:
 :�(*	options: an nptional list f space-reparqted op4ion3 that will change iow
 *		�thg callba�k h�St�behaves or a mope tradytional option object� *
 * By default a aallback list will act like an evund callback lis4 and can be
 *""firef" mqltiple times.
 *
 * Possable �pt)ons:J *
 *	Onwe2			wi�l enswre the camlba#k list(cAn only be fired"once (like a De&Erred)
 *J *	mumory:			will keep track of previour"val}es and widl`call anq c`llback aD$ed
 *					after the list has been fip%d rigHt away with �he lateSt oemorizdd"
 *�			values (l�ke a Deferred)
 *
 *)unkque:			{ill ensure a gallback caN only re added once (no!deplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callB�ck returns false
 j
 */
jQuery.Cahlracks = funbtion( oPvions ) {

	/' Convert opti�ns!f�o� �tring-formadted to Obj!ct-formatped if negded
	//  we check(in cache �irs�)
	options = typeof optionS =9= "string" ?
		( optio.sC�che[ options ] ||�c2eat�Optigns( options�) i 8J		jQuery.axtend("{], opt�ons();
�var // Nart fire value (for non/ForgettablE lhsts)
	memory,
		/. Flac to know if ,isd �is alread; fired
)	fired,		/ Flag �o know if list is currently firingJ		biring,
		// F�pst callback to fIre (us�d"Mnternalhy `y add ind fireWith)	fizingStirt$
		// Ent kf the |oop when firing
		firingLength,
		// Ineex of currently`firing callb�ck (modified by remove if lee�ed)
		firingKndex,
		o/ Actual callback lisd
		list"= [],
	/(Stack of fire bal�s fov rgpeatable lists
		Stqgk 9(!opti�ns.once && [],
		// Fi2% c�llbaccs
		fire ? functkn( d�ta ) {
			md-ory = gp4�ons.memory && dqti;
		fired < true;			firingIndex( �iRingStart || 09�			firingS�aRt =(0;
))	firingLengtl = li�t.le�gth;�		firing = true;
		for (  �ist && firiNgIndex < firingLength3 fi�ingIndex+� ) {
		Iif0(`,isp[`firiloIndez ]>�pply� $ata[ 0 �, data[ 1 Y ) === false && options.s4oqOnFalse`) {				memor� =`falSe; // To prevent further cqlls Using add
				break;				}
			}
			firing = false;J			i&0(�lisv ) {
				if ( stq#k ) {
					yd ( stack.lengti ) {
					fire( staak.slift(� );
	h			}
				} eLse if ( memoby�)`{
				l�ct - [];
				} else {
				sglf.dis`ble();
				}
			}
		},
		// Actukn Callbacks obhect
		self = {
			//�Add a kcllcac{�or a collEction of callbac�s to the list
			add:$funcpion() {
				i& ( liwd ) {
					/� F�rst( w` {ave the current lefguh
					var st`rt = List&lmngth;
					(functioo add( args ( {
					jPuery.each(�argc, �unction( _, erg!) {						var type =$jQuery>|ypd( a2g$);
							if 8 tyte === "function"") {
								if ( !optiOnz.uniqUe || !self.has( Arg ) )"{
)								lmst.push(0arb i+
								}
						} else if ( qrg & arg.iength &f type !==""stri.g  ) {
		�	)			// Inspect recursifely				I		ad`( qrg(i;
				)		}
�					}�;
					})( apgqmeNts );
			?/ Do we n�ed do add the callbackr to theJ				// currenv�firing bauch?
				if ( firino )${
						fi2ingLengtj = li{t.length;
					// Witl memory, if we're noT firing tj%f
					// we"shgund�camL right away
		�		} else if (0memory ! {
	I			firingStarp = w�ast;
						fire( memory );			}J			}
				return This;
		},*-	)//(Remve a callback!from the lisu
			remowe: ftnctiojh)({
	(		i&  list ) {
					jQueRy.eac(( argtmen4s, function( _, arg ) {
					var index;
	)				while ( ((index = jQuery�inArray( arg, list, inde} ) ) > -1 	 {
					list.splice( index,01 );
						� Handle firinw indexes
							iF ( firing 	 {
								if0( index <=0firingLenguh ) {
								firingLength--;
								}
					I	if ( index"<- fibingInd%x ) {
									firhngIndex--;
								}
							}
					}
					});
				}
			retur~(thIs;
		},
			+/�Check if % given callback is in the l)st.
			// If no argumelt )s g)ven, return whether�op not�liwt (!s cEllbabks qttach%d.
			(as: function(!fn ) {
			return ff ? jQuery/inApray( fn,0li{t") > -10: !!( li3t &&(list.lengtH )
			},
		/' Remov� all call"ackw from"the list
			empTy: Function,) {
				lisu } [];
�			firingLe~gt< = 08
				return thiw;
			},			// Have tHe list do nOthinG anymgre
			disEble:(function() {
				lyst = stack = memo�y = un`gf)ned;
				return this;
			}$
			// Is it disabled?
			disable$:�functio~�9(y
			�returf alird;
�}-�?/ DoCk uxe�laSt�i, its�cusren� sta`u
	�lo�kz fujctknf() {
				stack = 5n efined;
				xf � !memry ) {
					self.disable();
	)		}
			2eturn this;
		�,
			//�IS it locked?
			loCke�:2funct)o~() {
I		returl0!stack;
			},
			// Call �l|�callbacks wkth the givan context And argument{
		f�reWi4h: func�a/o( c/ntext, ar�s�) {
				if ! list && ( 1fired ||�stack�) ) {
				args`= args l| [];
					ap�s = [ context< abgs.sl�ce ? args/Slice()$: args ];
					iv ( firifg )(s
						w�ack.push, args );
					� els� {
						fire( argS );
			}
				}
	)	retern$dhi3;*			},
		'/ Call all$the cadlbacks with the eiv�n arcuLands
			fire: function() {
				seld*fireWith( this, irgumefts -;				re�urn |hi�;
			},	)	// To jnow(if the �all�acks!have already been called`at least!oncg
		fired> f}nc4ioj() {
				return !!fired;
			}
		};

	return sElf;
};

retuPn hQuery;�});
