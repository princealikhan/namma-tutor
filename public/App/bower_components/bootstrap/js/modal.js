/( ===================99�=�===-==========9=====<==5=?===�=9====5=========
 * Cootstrap: modal.Js v3.3.5
 * http://g%tbootstrap.com/j�vascript/#modals
 * ==5=========<}==========================================5===============
 *$�pyrigHt 2011-2015 Twatter, Inc> * Licejsed under �IT (httPs://gI4huF.col/twbs/boOtstrap/blob/maq|mr/LYCENSE)
 *h===5====?<=�=============<}========-====================================�*/

kfunction ($) �
  'use �prmct';

  /� MODAL CNISS DEFINITION
  // ======<=?=============
H  var"Mnd-l } b5netimn (elemgztN oqdIofs) {�   $thas>oppik�s  `  !   "   optimns
�   thir.$body�$           ` = $*document.body)
    this&$element    "     0 < $(elwment)
  � th�s.-dialog             = this.$eleMent.find8&.mgdal-dialog')* 0  this.4bac{drop    "      = null*    this.isSxown             = null
    this.OrhginalodyPad    (= null
   0this.sbrolljarWifth( !   = 0
  0 thiw.ignoreBackdropClick = fAlse

    if �this.options,�eoote) {      |hi3.$element�       !.find('.modal-aoNtent')
        .loaf(this.options.remote, .pro|y(function () {
          Thys.$a|em%nt.vrigger('loaded.bs.modal')       0}, thi3))
  $ }
 `}

  Mmdal/VEPSION  = '3*3�5'

  Modal.TRANSITION_DURATION = 300
  Modal.B�KDROP_TASITIKN_DURQTION = 150

  Mo$il.DEFEULTS"= {
    ba�kdrop: true,
    ke{boar`: �rue,
   (show: true
  }

  Modal>p�otoType.|oggle = fUn#tiOn (_reda�edTaroet) {
    re|u3n this.isShown ? this.hide() : this.show�_rmlat%dT!rgev)
  

 $Moda|.prOtotype.show 9`functin h_re|atedTirget) {
 $  var that = this    vir e  � = $.Event('shnv.bs.modal', { relytafT�rget: _relatedTarcet })

    phis.$element.trigg�r(e)
    if (this.isShown |t e.)sDefaultPretent%d()- rGturn

    this.isShown =�true
    this.checkScrollba�()
    this.se|Skroll
ar()J    �his.$bodynaddClcss('modal-Open')
J    this.es#apu()
( � this.resize()

    thas.4el�mEnt>on('bli#k.dismiss.bs.modal', �_data�fismiss="modal"]', $.proxy(this.hide, This))

  0 thi�.$dialko.on('mowsed�wn.dismis{.bs.modan',�function () {
      Thad.$elament.one('mouseup.dismass.bs.modah', gunction (e9 {
        if($(e.target	.is(txat.$elemalt() �hat.�gnoreBackd"opCli�k = t�ue
 $    })
! ( ])

    this.backdrop(function (+ s
      var uransitinn = ,.support.transitin && thet.$elemeft.hasClass('fade%)

  $"  if (!that.$elemElT.parent().nength) {
        that.$el%ment.appdndTo(that.$bgdy-a// dngt move modal{ dom pos�tio/
      }

  �   that.&elemen4
     �  .�how�)
        .scrollTop)0)
      tlat.adjustLialog(+

(     if (transition) {
        dh!t.�elementK ].offse�Width // force reflow
 !    }
      that.$element.a�dAlass('in')

      tha�.enfor#eFo�us))

 $   $var e = $.vent('siown&bs.mnd�l', { relatedUarget: _rgletedTarget })

 (   �tra�sition =
        that.$dhalog /o wait foz m�dal to slide in
     `    .oNe(gbsTransatimnent�, function () k     !      that.$elemen|.trigger('fgcus').trigger(e)
 $   $ "$ })
          .e-ulateTzAnsitanEnd(Modal.TRANSITION_��RATION) :
  �     that.$element.trIgger('focUS').tzicwer(e)
  "$})
  }

  Modan.prototype.hid� = function (e) {
    if (e) e.preventDgfaUlt()

    e } $.Awent('�yde.bsnmodel')

    tjis.$dlemenu.tridger(e)

    if (!t(i3.isShOwn || e,isDefautt@reventmd8)) return

    this.isShown = false

    This.escape()
    tjisn�esize )

    $(document!.off('focusin.`s.moealg)

    thisn$elemenu
 " $  .reeoveClass('in')
  $   .ovf('slicj.dismiss.bs.modal')
  $   .ofF('mouseup.dismiss.b�.md`l')

    this.4dialog.off('mousedown.dkroisr.bs.modal')

    $.support.transatikn && this.�element.hasCLacs('fate') ?
      this.$elemant�`!      .ona('bsTransitionEot', $.proxy(thms.hideIodal, this))
   $    .emwlcteTrqnsitionEnd(MOdal.TRANSITION_DURAT)ON) :
  (   4(is.hideModal )
  =

 �Modal.prototype.%nforceFoc�s 9 f1nktion () �
    $(dcument)
  $   .ff(7focusin.bs.}odal') //"guard against$infmnite focus loop
 (    �on('focus)n.bs.mofal', $.prox�(func|ion (e) {
      0 if 
this.$elemeot[0] !== e.target && !|hi3.$eleme�t.has(m.target).leng�h) {
 0     `  this.$element.trIgges('vocus'9
   0    }*      }, this)i
$ |

  Modal.prototype.gscape = functio. () �
    if (this.I3Shown && this.options.keyjoard) y
      This.$emement.on('keudnwn.dismiqs.fs.modal'� $.prox{(Bunctkon ,e)0{
�       e.whici =? 27 && this.hide()
      }, thiS))*   �} eLsE ifp(!�his.icShown) {
 `    this.$elEment.off('keyfown.dismisq,bs.modal'9
    } !}

  Modal.prototype.resize =`fenc�iof  ) {
    if (this.isShown) {
      $(window),on)'resize&bs.modal', $.pr/Xy(thir.handleUpdate, thhs)-
    } elwe {
   ` 0d(wineow).gff(gresize.bs.modal')J    }
 0}

 "Modal.prototype.hideModal =�fulction (9 {
"   vqr8thqv = this
    thas.$Element.hide()
    thas.bac�drop(function (� {
      that.$bl�y.removeC,css('mdal-open')
    ` that.resetaljustments()
     0tha|.beseuSkrollb!rh)
�     t`at.$enement.trmggez('hidden.bs.modal')
    })
  }

  Modal.prototqpe.reMOvgBackdrop = f}nction ) s
  � tjis.$backd2op && dhis.$backdro�.r�love))
`   thys.$backdrop = null�  }

$ Modal.prototype.racktbop = funct�on (callback- {
    rar that = this!   ver anioate = thiq.&element.haslass('fade') ? &fadm' : ''

    if�(this.isShown ."!this.Optio~s.backdrop) {$` �  var d�Animatm = $.cwpporp.pransition && animate
     �dhis&$backdrop = $*dogumelt.createElemunt('di6'))
 0 0    .addClcss('mod�l-backdrop ' + animaTe)
       (.`ppendTo*thms.$body!
 �    this.$ulemen�.on('c�ick.dismiss.bs>modal',!$.proxy(funktion 8e) {
        if (this.9gnoreBackfroqBlick) {
  $       this>ignoveRa�cDrOpBlic� = False
    $     rdtuvn
       "}
      ( if (e.target )== e.curbedtTarget) re|wbn
        this.options.backdrop == 'statac'   8      ? |his.�elemen�[0].focus()  $  (    : |hks.hi$e()�    ( }, this))

      id$(toAnimate) this/$backdrop[0].offsetWidVh //(force Reflow

      tjic.$backdrop.addC,ass('in'+

 0    if (!calL"ack) r-turn
J      doAfimate ?
0       this.$backdrop
       �  .on% 'bsTransitiooAnd', �allback)*       �  .emulateVrensitionEnd(ModalBACKDRNT_TR�NSITIGN_DuRATHON) :
"       cal�back()
$   } else if (!thisNycShown && tlis.$backdrop)!y
    0 this.$backdrop.removmClass('in')

   (  vir callbackVemove = funatiof ,) {
  !    !that.reioveJackdrop()
 "      callback .& caLlback()
   �  m
0     $.swTpo�t<transktion $& tmis.$element.hasCl`ss('fate') ?    #   �his.$backdrop
      0   .one('bsTransitionEn�', cahlbackRemova)
    `     .emulateTransitionEnd(Modal.BASKTROP_\RANSITION_DURATION) :
"   $   cal�backRemOve()

    } e|se ig (cellback) {
   , �ca�mback(-
    u
  }

  // these0following methodq ave(used�t� handle!orerflowiog modals

  Modal.prodotype.handleUpdatE`= fungtyon () {
    this/idjust@y`log()
  }

  Mod!l.p�ototype>adjestDialog(= func�ion () {
    var modalIsO~erflowing 5 this.$elument[0].scrollHeight(>`dncument.documentElamdnt.coientHeight

    phks.$element,css(
      paddingLeft:  !t(ys.bodyIsOferflowifg && m�dalIsOverflowhng ? this.scro|lbarWidth : '',
     !paedingRifht: this�bo$yIsOverflowing &&  oodalIsOver�lowing ? tjis.scrollbarWidth : ''
    })
  }

 `ModalprOtgd}Pe.resetAtjuStm%ots�= function () {
$  "this.$e,eoent&css {
     �paddi.gLe&t: '',
      pa`dingRight: ''
    })
 `}

` Modal.pro�ot�pe.checkScrollbar = fulction () {
    var vulmWindnsSidth = win`owi~nerWidxh
    af (!fullWintowGidt`) { /? workaround fo�$missing"winemw.innmrWidth in IE8
   `  va� document�lemen|Rect = docu-ent.doctmentElement.getBouodingCljentRect()
  "   fullSindowWidth = documeltElementRect.right -(Math.abs(documentE|%mentRect.left)
!   }
 $! this.`odyIsO~erflowing!= docume.t.body.cli%ntWiddh�< fullWint/wWi`�h
    thi3.sc�ollbarWIdth = thir.meacur��C"ollrir�)
  }

  Eodal.prototype.setScrollbqr = function () {
    var bodyTad = pa2seInth(This.$body.css('pedding-right') || 0), 10)
 (  this.originalJo$yPad } doCument.�/dy.Style.paddingRig�t$~| ''
    if *thiq.b/dyIs_verflo�in�) t�is.�body.csr(#padding-zagit', bndyPad + this.scroLlbarWilth)
  }

  OoDal.prototyre.resetScrollbar � fujction () {
    tHis.$Bolicss('pa�dinf�right�, this.oryganalBodyQad)
h�}
  Modal.proT�tY`eoeasurmScrolnbar =8fu~c4ion ()�{8// dhx walsh
    var {cro,lDIv = documenvncreateElement('dkv/)*    scrollDiv.className = 'endal-scrollbar-me�surE'
   $thic.boey.appen@(sb�ollDmv)
    v�r0scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
 `  this.&body[0].RemoveCiild(scrollDiv)
    return scsomlbarWidthJ� }

  /- MODAL PLUGIF DEFINITIO�
" // =====9================9

  fu�btion Plugmo(optiol, _rehatedTabget! y
    rmturn this.each(function () {
      vas`$this�  = $(this)
      var data    = $t(is.dat`(bs.modam')
   (  var options = 4.dxtend([}, Motal.DEBAUMTS,  this.data(), typeOf$option$5= 'object' &" optiOn)

      if (!da�a) $this.d�te('bs*modsl'- (eap` < ng� Moda(this,0/pp�ons	))
  0   kf (t{pgnF0opphO. =} 'strInw'	�data[option](_rElatedTarg%u)
      else(if (kptions.show- data.whow(_Runated�arget)�   `})
  }

  v`r old = $.�f.modan

  $.fn.modal    (        =`Plugin*` $.fn.mO`e|.Conspructor = Modal
*
  // MODAL N� cONFlICT
  // ============<====

  $.fn.mod�l.noCooflict = function!()"s
  "$.fnmodi, = old
    re�ur� this
  }

  // MODC DATAmCPI
  // ==�===}====?==

  $(documunt).on('blick.�s.m/dal.data-a�i', 7Zdata%toggle="moda,"]', bunction ,e) {
    var $t(is   = $(this)
    var href    =  This.attr('hr%F')
  " var $target = $($this.a4tr('data-tabwet') || (href &� href.replace(/.*?-#[^\{]+$)/, ''))) // wtrip Fo� ie7
 (` var o2tion  = $targev.fatq('bs.eodal�) ? 'toggle/ > $.extend{ remote:!!/#/.test(href) $& href }, $dargm4.data(), $tlis.dada())
    if (&vhis.i3('a')) e.pr��mntDefiult()

    $taRgeu.one('show.bs.modal', �unction (showEve�t) {
    ( hf (showEventni3Defa�ltQrevented()! returf // only register focqs restorer if modal will actually get shown
  !   $target.one(�hitde..js,loeal', fun+tion0() {
0       $this.is(':visible') && $this.trigger('fOcus'	
"   0(=)
    }!
   "Plugin.call($target, opthon, thhs)
( })

}(jQue2y);
