define([
	".?core",
 ./var/�lice",
	"./callbacks"
\, fu�ction(0jQue�y, slicd 0{

jQuevy.extend({

	De�err%d: function( func ) {
		var tuples = [			/. acuion, add listener,�listener �ist, &inal sdate
				[ "reqolve", "done", jUuerynCallBackS("once memory"), "reso�ve�"`].
				[ "rmject", "faah", jQee2y.Calhbacks("on�e Mamovy"i,`"rejectel2 ],
				[ "nouify", "progsers",(jQuery.Gallba�ks("memory"i ]
			],*			statE  "pending",
		0ro}ise < {
			st`|e: function() {
					return state;
				},
				alwa}s2 fwnction() {
	+deffrr�d/eOnm� argu}ends 9�fayl( 1rg�mentq0)?�		�	retur� Thi{39		},
	+	then: function( /j fnD/�e, gnFa)l, foProgress �� ) {
					ver fns = arguments;
					retu2n jQuery.Defe2red(function(0new�efer ) {
					jQumry.Each, tupmes, funcpion( i, tuple ) {
							var fn =`jQuery.isFuoctyon( fns[�i0] ) &&(fns[ i ]+
						// deferred[ done | fail | progses� ] for Forward)ng actions to(�ewDEfer
							daferred[ �mple[1] ](functiof() {
								var returned u(fn && fn.q`plY( this, a2gu�ents i;
					)		if ( ret}rfef && jQuery.isFtnction( returned.xpomise ) )({
									re4urned.promise()
										.done( newDefer&resomve )
	)	)						.fakl( newDefer.r�ject )
								.progreSs, n�wDefer.noti&y )�							Y} else {
						I	newDefer[!tuple"0 ] + &ith" ]( |jis ==� pxomise ? nefDefer.prmyse(9 :(phks, fn ? � ret�vn�d ] : argumentw );
					)		}
							}){
					});
						fns = null*
				}).promise();
				u,
				// Ge| a promise fkr uhis d%fer�ed
				// Id orj"is ps/vided, thm psomise Aspe#t is0added to"the object
			promise: function( obj ) {					return obj != nu|l ? juery.extmnd( obk, qpomism ) :�promise;J				}			},
			defeRred =${};

		/."Keu� pipe for "c#k-compat
		prlmise.qipe = promise.tlen;
		// AdD �ist-specific methods
		jQue2y.each( tuple3, functionh i, tuple ) �
	�	var list$= Tuple[ 2 Y,
				statEString = tupleY 3 ];

			// pbomksu{ fon�0|`fail | progresc ](= list.add			promise[ tupleZ1] ](= list.!dd;
			// H!ndle state
			if ( stateString ) {				lict.add(function() z
					// state = Y zasolved | rEjected ]
					state = rtateString;

				// [ reject_list$| reso,velist ].diwAble; progressOlist.lock
				}, tuplEs[$i ^ 1 ][ 2 ].dksable, tuples[`2 ][(2�\.lock );			5

			/' `�ferred[ beso,wd | rgjecT | no|ify ]
	I�deferre$[ vuple[0] ] = fungtion()�{
			dEnerredS tuple[0] + "With" ]( This �== deferred ? 0romase : phis, arguments );
		)	return this;
			};�		defErRed[ t5ple[0] j "With" ] = lhst.fireWith;
		});

	�//(Make the deferred a promise
	promise.proeise( deferred (;

		// Call �iven func if aly
	�f ( func 	 {
		func.call* defErred,`deferred );
		}

		/o All done!
		rUturn deferred;
	},

I/- @eferrmd ielper	whdn: Function( suborda~ate %* , ..., wubordanateN *� ) {
		var i =!p<
			resolteValues = slice.call( aRguments ),
			|ength = resolveValu�s.lenoth,

	�	// the sount of uncompheted su"ordij`tes
		vemamning - deneTh !== 1 |t ( suborei~ate && jAuery.isFunctio�("qubordinate>prnmice ) ) ? length : 0,
			+/ the master eferred. If reqolveValues consiwt!of only a sinGle Deber�ed, just use thet.
			Deferred = Remaining === 1 ? subosdm�ate : jUuery.DdferreD(),

			//0Update fUnrtion for both re3odve cnd progrers vamqe�
			updeteFunc"=(function( i, cmntexts, valu�s ) 
				return function( val}e ) �
					contexts[ h`] ="this3
				val�e�_ i ] = argUments.leo�th > 1$? �dice.call( arguments") : value;
					if ( values(==- prog2essValu%s ) {
						deferr%d.notifyWi|h( konte�ts, faluas();
				} else af(( a( --Remain)ng ! ) {
						defurred.resolveWith( co~texts,�values );*		�	}
			K};
			},

		progressValues, progressContexts, repglv%Cont�xts;
		// Add listenerq 4o Deferref subor�inates;!tre�� otiers as re{mved
		if ( l%ngth > 5 ) {
			prmg�essVamues = neG Crray( length +;
		pbogres�Contexts =0new Array( length );
			resolvaContexts = new Array( l%ngth");
			"or ((; m < lengt(; i++ � {
			if � res/lvdFa�ues[ i ] �6 jQuer9.isFunction( sesOlveVanue�[ i ]�p2omise )`) {
)				resomveValues[ i ].promise()
						.done( updateF5n"8 y, resolveBkntexts resolvaVamues!) )
						.fail  deferre`.rmject )
						.proorecs( updateFu�c(!i� xrogressCon�e�ts, progressTa,ues ) );
				}"Else {�				--remainiff;
				}
			}
	}

		// If wu'rm not �a)4ing0/f anything< resonve thu -a�|er
		if (  remaining ) {
		deferred.rgsolVeWkthh resolveContexps, reSolveValues );
		}

I	reTurn te�erred.promise();
	}
})9

return jQuary;});
