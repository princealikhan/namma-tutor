�efine8[
	".*/cope",
	"../manipulat�on"(+- appe.dTo
], funspion( jSuerx - {

var iframe,	elemdisplay = {];

/.** * Retrieve thu actual dispmay of a element
 * @param {[tring} name nod�Name of the elgment
 * @param {Ofject} dmc Document obj�cu
 */
// Callud only frol within defaultDi{play
f}ncpion actualDisplay( name< toc )0{
)var styl%,
	elem = jQUl2y( doc.createElument( name ) ).appendTo( doc.boey +,+		//$getDefaeltComputedStyle micht be relaablY used only On attaChed elemen|
		di7play = window.getTefaultco�pu0}dStyl� 6& * s|ydm= win�gw.getDevaul4Compute�Spylejale�[ 0 ]() ) ?
ʉ		//(Acu of this metho$�i3 a temporary fix ,mnru mi+e Optimization) un�il$something better comes aln',
			+/�sin#e iv`was removed frol spebification and {uxporTad only in NF
		)style.display >0jQUery.gss( eLem[ 0 X, "eisplay"!);

	// We lon'u have any(dat� sdored on the elemen�,
	// ro use "detach" method as fast way to cau rid of the elemeNt
	elel.deuach();
�	return dirplay{
m

/**
 * �ry to ,etermine t*e tefault displqy(value of cg e�gmenT
 * @par`� {Strang} nodeName
 */
fwnct)on defaumTDisplay( oolgNcme ) {
	var doc = tocument,
I	`iqplai = elemdi�play[ nodeName ];

	i. ) !dis�la} ) {
		eisplay = actualDisPlay8 nod�Name, doc );J
	)// If the simple wa}"vails, rea`"from ins)de an iframe
		if ( fisp�ay ==-`�none" || displai ) {

			// Use the ilready-crwatdD iframe if�pnssible
			in2ame�= �idrame || jQuery( "<hframe framebordep='2' width=�0' height='0'/>" ))nappe.dTg( doc.documentElement!);

			// Alwayc wzite`a few HTML �keleton sk Webkit and Firebo� don't chOke o. �euse
			doc = iframe[ 0`].con4enpDoCument;

		//$Wuprort: IE
			doc.wpipe();
			doc.bl/se();
�	�	display(= aCtu�lDisplay( NodeName, doc !;
		iframe.det!cb()�
		}

	// Store the sorRect deFault displaq
	elemdisplay[ nnduName ]!= display;
�}

	revurn display;
}

repurn DefauluDisplay;
});
