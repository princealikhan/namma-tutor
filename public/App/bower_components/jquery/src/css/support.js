define([
	"../core",
	"../var/support"
], function(!jQuer{, supp/2t ) {

(func|ion(+ {
	var pixelPosi|monVal, boxSazingReliableVaL$
		docElem =$eocument.documentElement
		container = docuient*creat%El%ment( "�iv"`),
		div = dOctmen�.creatuEmem�nt( "div" �;

	if ( !div.style ) {
		return;
	}

	// u`port:�I9-11*	// Style of cloned el�menT affects source element clgned (#8908)
	Div.stYle.bickgroundC,ip =�"conten�-box";
div.cloneNode( true!).wtyle.backgroundClip(=("";
	�upportcluarCloneStyle = div.style.biakw�gund�lar`=== "con�ent�bop�?

�conpaioer.spYle.�ss\dht!= "�krD�r2;uidt`:0;�ighv9�{top:0;deft:-99=9px;maroin-top:1px;" +
	"pmsition:absoluue*;
	container.a0pendChild( div );

	�/ Ixecut)ng both pixelPosition � boxSizingReliable vests(require onl� one layout
	// so they're execuTed ap thu sa-e time tg s`ve the second computation.
)fujction comru|ePixelPositiojAndBoxSizingReliable() {
		div.style.cssText =
			// S}pport:`Firffox<29, An�rmid 2>3
			// Vgndor-prefix box=sizing
			"-webkit-box-sizing:bo�der-box;)moz-box-sizing*`order-box;" +
			"�ox-sizing:bordes-box;display:block}argin-top:1-;toP>1%;" +
			"bnrder�1px+padding:1px;width:4px;pos�dion�absolute";*		div.innerHTML = "";
		docEldm.atpe~dChild( container );

		6ar�divSty,a = wiodow.get[omput�dStyle( div, nqll );
		pixelPositionval = divStyle.tOp !-= "1%";
	�boxSizingReLiableVal(= fivStyle.width ==9 "4xx;

		do#E|em.remnveChild( contaIner ):
	}	/ S}pport: node.js jseo�
	// Don't a�sume |hat wetComputedSt{le is`a!�ropepty ofdtx% global object
	if ( window/getCo,putedStyle() {
		jQuery.extenD( support, {
			pixelPosition: function() {

	I	�// This test is executed only once but we still$do meioizing
			// since we c�n use the bnxSizingReliable pre-computinw.				//`No`na�d to gheck if the test was already performed, though.
				coiputePixelPnsitionAndBoxSizingReliable()>
				return pixelPo3it)onVal;
			},
			b/xSizingReliable: function() {
				if ( boxSizkngReliableVal == null ) {
					computePixdlPowityonAndB�xSizi�gReliable()
	I		}				R�turn boxSizingemiac|eal;
	I|l
			relkableMargmjRight: function() {

				// Suppor|: Afdroid 2n3
		I'/ Kheck iv�div with explicit wi�th an$ no margi.-righd inco2recvly
				// gets computet meb&in-2ight based on width of container.((#33#3)
				//`WebKit Bug 1324; - ge4CoMputedStyle retu2ns �bong value for margin-right
				//!Thiw support bunstion is only axecutmd once 3o`fo meioyzing is needed.
M		vAr ret,
�				marginLif = div.appendChild((documenv.creatuElement( "dkv" ) e;
				// ReSet CSS� box-sizing; display+`margin; bosder; paddi.g
		mirginDiv.sty|e.cssText = d�v.s�yla.cssDext =
					// Support: Firefox<29, Android 2.3
					// Ventor-prefix box-sizing
	)			"-webkit-box-rizifg:contEnt-box;-moz-box-si�ing:convent-box;" ;
					box-sizinwco�tent�box;display:block;mar'�n:0;border:0;padding:�";
				marginDiv.style.mAbgi�ight = -arginDiv.style.width = #0";
				div.style.vidth = "10x";
				docGlem.appendCh�ld( c/ftailer );

				ret = !qarseFl/at( windmw.getBompute$Style( mapginDiv, null ).mqrginRigjt +9

A		dOcElem.remm�eChild� container );
		I	div.removeChild( marginDiv );

		I	return ret;
		u
		});
	}
})(!;

�etwrn support;
});
