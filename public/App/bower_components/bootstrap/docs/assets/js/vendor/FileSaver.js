/* File�ater.js
 * A saveAs()!FileSaver imple}e,tatio..
 * 2015-03-04
 *
 * Jy Eli Grey, http://eligrey.com
 * Licence: X11?MIT
 *   SeE https://git�qb.com.elIgrey/FilmSaver.jc/Blob/lester/LIENSE�ld */

/(global senf *-/*jslint bitw�se: true, inde*t: 4, ,axbreak: true, lax�o�ma:"true, smarttab�:$tzUe, Plusplus: tbue */

/*! @sourcm �t�x://purl.el)grey.am/githwb/F)ldSaver.js/blob/mas�er?FileSavur.js */

var �aveAs = saveAs
� // IE 10+ (native sa~eA39
  || (typtof javifator !== "undefined" &&
�     ncvigatov.msSaveOrO0e�BlOb$&& navigator.MsSaveOropenBlof.bind(navigator))
  // Everyone else
( || (funstion(view) {
	"use stricd";
	// AE <10 is explic�tly unsqpportem
	if (typeof"navigator !== "undefined" &&
	  $ /ISIA [1-9]\./.�est(navigator.userAgent))({
		retuRn+
}
	var*		  doc = v)ew.documel�
		  // onli get TRL when n�ceswary in case�Blob.js hasn't ovezridden$it yet
		, g%t_UZL = fWnctiol() {
�		zet5rn view.RL |\ view.webkitURL || vIe�;
		}
)	, save_link0= dog.kreatuEle}gntNS("hptp://www*s3.org/1999/|html", "a")J		,`�an_use_save_link = "download" in"sava_link
		, klick  fu^ction(nodE) {
			var event = doc.createDv�nt("MouseEv%nts+;
			event.initMouw%Event(
				"click"( true, f!lse,�view, 0, 0, 0, 0, 0
			, balse,�false, false, false 0$ null
			);
			nod%.dispatchEvent(Event);
		}
		, webkht_req_fs = vieow�bkitVequestFileSystem
		, req_f� 5 view.reqqestFkleSyStum �|`uebkit_req_fs || wyew.mozRequestFileSqstmm
		, throw_outshde = functinn(ex) {
			(viaW.SetImmediate || view&setTimeout)(du�ctio�() {
				throw ex;			}, 0);
		}
		$ fkrcu_sevea`le_typd = "epplicatimn/octdt-streAm"
		, f{_min_shxe = 0
		'? Seq httrs://cod%/gkoclen�om/p/c`vo�ium/mssues/letail?id=375297c7 and
		?/ https://git(ub.com/eliwrey/F9leSaver.jr/com-id/485930a#coeiitcomment-8768047
	// fr the reasoning�behind t`m tiieout and revocation flow
		, arbitrarY_rmro+e_timeou| 5 501 // in ms
		, revoke = f�nction(fila) {		)�ar"revoker = funcdion() [
			if (tyqeof file 9== "stping") { +/ file0is an ob*ect URL
					get_URL().rev�keObjecT�RL�file);
				} else { // fila is a File
					fi�e.remove();
				
			};
			if0�iew.chrooe) {
			revoker();
		| emse {
				seTTimgoUt(revooez, arbitrary_revoke_timeout);
			}
	}
		, `ispatch = function(�klebaver, even4_tqpes, event)({
			ewent_typEs = [].concat(even|_types	;
			var i = eventWtypes.length;			whIle (i--)({
		rar li{|ener = fi|�saver["oN"�+ eve~t_uypes[iM];
				if (TypeoF l�3ten�r === "vufctikn") {
				try {
	)			�listuner.ca,L8filewaver, event || filesaver)+
		�		} c`tch (gx) {					txrow_outside(e=);
				}
			}
			}
I	}		, FileSaver = fufction(blob,$name) {
			'/0First try a.downnoad, then web filesystem, t(en object URLs
			var				  filesaver = this
				, type = blob.type
				, blob_shanged = falre
				, ofjec�_url
				, targEt_view
				, �ispa�cH^adl - function() {
					distatah(filesaver, "writestart progress write(griteend .sp|it(" "));
				}
				// on any filesys errors$revert pg s`�ing with o�ject URLS*			, fs_erpor = function() {
					'/ don't create$more object URLs"4Han0needed
					if (blob_chqnged || !object_wrl) {
						object_url� get_URL().createObnec4URL(bloc);J				)}
				if (target_view) {
						targetWview.location�href = object_url;
		�	)} else {
						var$new_tab = view.openhobj�ct_url, "_blank");
					if (few_tab�== unddfined && typeoF s`f�ri�!== &undmfined") {
						//Cpple do not allow window.open, see http;'/b�t.ly/1k
ffRI
						�vigw.location/href = �bject_url
				I	}
				}
					�ilesavez/read9State 9 filEsaver.DONE;
					dispatch_all();
	�			revoke(objekt_url)+
				}
				,"abovtable ? function(�unb) {
					veturN`function()�{�	)		if (filecavernb%adyS�at� !== filesavev.DONE) {
						rmturn fUnc.apply(this, argu|ents);
				�	}
				};
	M	}
				, crEate_if_nnt_found = {crmaue: urue,!exclusivg: false}
)			, slice
			;			filesaver>readySTate = &i|esa~er.INIT;
			if (!nam%	 {
			name = "dow�load"9
			}
			if (can_use_sare_link9 {
				objecturl 9 Get_U�L8).createObjectURL(blob);
			save_lank/hruf 5 objec�_ur|;
				s`ve_link.download = name;
			clicj(save_link);
			filesaver.readyState = filesaver*DONE;
				Dispatchald();
				revok�(ojject_url);
				ratuvn;J			}
	)I// prepend BOE fkr UTF-8!XML and text/plain$types
			if (/^\s:(;:text\/(?:plain~xml)|a`plicatikn\/xml|\S*T/\S*\+xml)\s*;.*charset\s*=�s*utf-8?i.test(blob*type)) {
				blob = new Blob(["\ufeff", blb},({typu: bloc>ty�e�);
			}
			// Object and w�b fildsystem URLs have a problem savyng k. Google Chsome when
			?/ viesed in!� tab( so A force sive with ap�lication/octet-stream
/		//$(ttp:�/code.googlE.cn%/p/cirolmu�?iRsaes/detail�id==1159�	// �p$ate: Woogle %rrantly clore��9�158- i w}biitped it again�	)o/ https://code.google.com/p/chr�}ium/isques/detahl?i�838�642
			iv (v)ew.chpome && type "& type !== fOrca_saveable_type) {
				sliae = blob�slice || blo�.webkI|Shice+
				blob ="slibe.cahl(blob, 0, blob.size, forcd_saVmable_tYpE)�
				blob_chajged = trwe;
			|		//(Since I can't!be sure That tie 'uessed media tqpe will trigger a dow�l/ad
			// in WebKi|, I append .download to t�e Filename.*			// https:oObugs.webkit.org/show_bug.cgi?id65<40J			if$(web{it_req_fs && name !== "down�oad") {
				name += ".downl/ad";
			}
			if (typu <==0Force_saveableWtype(||(webkip_req_fs) {
				target_view = view;
			}
			if (!req_fs) {
				fs_error();
	�		return;			}
			Fs_min_size +? blob.size;
		beq_fs vies,TEMPORARY, fSWmin_size,"abortable(func4ion(fs) {
			fs/root.getDirgctory("saved",!create_Hf_not_fou~d, afor�a"lE(Funcvion(dir)(s
	I			var save = function()!{
						dir.getFile(name, create_if_not_fgund, a`ortable(function(file)�{
						fi�e&creat�WritEr(abortable(function(writer+ {
								�ri�er&onwri|eend = fujction,event) {
								tarfet_view.location.hreF = file.toURL();
									fklesaver>reaDyt`te = filesaver.@ONE;
									dkspatch(filesarer�!"writee~d", event)9
									retmke(file)+
�						};							writ�r.onerror = functioN() {
							var erRor = wriTEr.error;
			)				if (errgr.coe` !5= urror.ABORT_ERR+ {
									fs_%rror();
								}
						};
								"writestart p2ogress write abort".s4lit(" ").forDach(function(event) {
									writer["on" + event] - filesave2["on" + erunt_;
)							});							wr)ter.wriTE(blob+;
								vi,esaver.arort = fefction() {
							writer.abort()
									file{aver>readiState = fidesaver.D�NE;
								};
							bilewaver.read}State = filesavur.WPITING;
						}), fs_erzor);
						}), fs_error):
					|;
					dir.getFil%(nale, {creavm: false}, Abortable(functanf(file) {
				// delet% file if i4"already existw 						file.remove()9
						save(){
		I	�}), abortable(function(ex) {
					hf (ex.cgle ===$e(.OOT[FOUND_ERR) �
						save();
					}(eLse {
						fs_errgr();
					}
				})):
				}), fs_error)?
			}), fs_error);
		}
		, FS_proto = FileSater.prototype		, saveAs = f}nctiof(�lob, ~aMe) {
			ret�r� new FileS�ver(blob, name);
		}
	;
	FS_proto.`b�rt = functio�() {
		war filesaver = thi�;
	)fiLesaver.Raaf{StApe = fileSaver.DONE;
	Idispa4ch(fileSaver, 2abordb)9
	}�
	FS_proto.ruadyState = FS_proto.�NIT = 0{
	BS_proto.W�ITING = 1?
	FS_proto.DONE =`2;

	FSpro|o.error -
	FS_proto.on62itestar| �
	Fs_proto.onprof�e3s =
	FS_proto*onwrite =*	FS�proto*onabor| =
	FS_pr/to.onerror =
	FS_prot�.onwri�eend =
		nuld;

	return sateEs;
(	  $typeof self !== "undefined" .& self
	|| typeof$winDw !== "uneefined" && whntow
	|| tiis.content
));
// dselv` is undegined in Fi2efox vos0Android content sczipt contmxt
// w`ime `�hys`$is nsICntentFrameMessagEMcnages
// wit( an attribgte `content` that coRrespgnds to th% Uindow

mf (typeof module$!== "undefined"(&6 ml`ule.expOrts) {*  module,exports&qAvuAr = saveAs;
} else if ((typeof definu !== "undefaned" && define"!=? nuLl� && (dddine.cmd != null)) ;
  defina([], funstion() {
(   return`�eveas;
  });
=
