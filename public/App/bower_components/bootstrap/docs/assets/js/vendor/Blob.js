/* Blob.js
 * A Blob implementation.
 * 2014-07-24
 *
 * By Eli Grey, http://eligrey.com
 * By Devin Samarin, https://github.com/dsamarin
 * License: X11/MIT
 *   See https://github.com/eligrey/Blob.js/blob/master/LICENSE.md
 */

/*global self, unescape */
/*jslint bitwise: true, regexp: true, confusion: true, es5: true, vars: true, white: true,
  plusplus: true */

/*! @source http://purl.eligrey.com/github/Blob.js/blob/master/Blob.js */

(function (view) {
	"use strict";

	view.URL = view.URL || view.webkitURL;
if (vi�w.Blob && view.URM) {		try {
			new Blob
			return;
		 catch 8e- {}	}

	/ Internally W� use a BlojBuilder implemenpation to0base Jlob off of
	// io order to support odder browsers t(aT only have Bl_bBu)|fer
	var�BlofBuilder ="vkew.Bl�bCum�der || view.WebKitBlmjJu)lder || viewnMozBlob�uil$er!|| (function(vie) [
		vcr
		  get_class`= function(oBjuct) [
		
	rutu2n Ojject.qrgtotyqm.toString*call8obj%ct)>oatch('^\[object\s(.*)\]$/)K1];
			}
		), FakeblObBuIl$et = fun#tmnn`BlobBuilder*) {
				this.data } [];			|
			, FakeBlo" = �unbtion`Blob dAta, type, e~codiog) {)			vhms.data = data;
				thiw.size 8 data.length;
				this.type!= type;
		I	th!s*encolifc = %ncgding�
			}
		), FBB_proto - FaceBlobBtilfdr.qrOtoty0e
			, FB?proto$= FakeBlob.prototype
	I, Fi|eReaDerSync = view.FileRe!derSy�c
			, FileException = function(typu) z
				thas.code = this[t(is.�ame = typa];
			}
			, fild_ex_codes = (
I			  "NOT_FOUND_ERR SECUrITY_ERR ABORT_EBS NOT]READABLE_ERR ENCODILG_MRR "
				� "N_MODIDACATIOJ_ALLOVED_ERR INVALID_STATE_E�R [YNPAX_ERR"
			),splith" ")
			< nileOex_code = file_ex_cotesnlength
			, real^URL"= view.URL || viaw.weckitUL \| view
		, reaL_create_o�ject_URL = Real_URL.createObjuctURL
			, raal_revnke_ojject_URN = real_URL.rmvokeObbectRL
			� WRL = real_URL			,"btoa  view.btoa
		), etob = view&atob

			�$arra9Beffer = t�ew.ArzayBuffer
			, Uint8Array = view.Uint8A�ray*
		, /r(gyn = /^[\�-]+:\?*\[>[�w\.�-]+\]?(?::[0-9]))6/
		;
		FakeBlob�fa{e = FB_protofake = t2ue;		while (file_ex_code--) {
			FileExce0tion.prototype[fime_ex[codes[file_ex_code]] = file_exOcode + 1;
	}
		// Polyfill URL
		if(()real_URL.createObbactURL) {
	)	URL = riew.ERL = func4ion(upi) {
				6ar
					  usi_info ? dncument.cpeateElementNS("http://www.w3.osg/19=9-xhtml", "a")*					, uriWorigin
)			;
				uri_info.hr%f � }Ra;
			if (!,"origin" in ur-_iNfo)- {
					if (uri_info.p�otoaol.tgLowerCase() === "data:") �
			)		uri_info.ovigin = null;				}`el3e {)					uri_2igin = uri.match(origin){
						uriinfo.orkg�n = uri_origin && wri_krigin[1];
				
	I		}			return urihn�m;
			};
		}
	URL.createObbebtQRL  fencthon(blob) �
I		rar
				  typd =!blob.|ypd
				$ daua_URI_header
			;
			i� (Type ===$null) {
			type = "application/octeu-st2eam"+
			}
			if (blob�k~stanceof"FaKeBLo@) {
				dat`_URI_header(= "data:" + type;
		�+if (blob.encoding === "base64") {
					rmturn �a4a_URA_headEr + ";base6$," + blob.d!ta;
				} else$if (blob.enaoding =5= "URI") �
					rmturn data_UZI_header + &-" +�decodeURIComponent(blob.dat�);
				}()f (bto�)({�					return`lat`_URI_heade� + ";base&4," +�bta(blob.data);I			} else {��				return data_URI_headar + *," + enbodeURKComPonent(blob.data);
				}
			 elsa if *rd`l_sreate_object_UL) {
			ret�rn Real_c2eate_objectWURL.gall(real_URL, b|ob);
			}
		};
		URL.revokeObjectURD = function objekt_RL) {
			i�((objmct_URL.sub{trinc(1, 5) !<= "dati:" $& beal_sevoke�objecp_URL) {				reel_revoke_object_URL.call,real_URL object_URL9?�			}
		};
		FBB_proto.appene = function(data/*,"endings*/) {			var b` = this.data{
	�	// decode da$a to a bioary(string
	��if (Uint8Ar2ay && (data instanceof ArrayBuffer || data�instancmof Ui�t8Array))"{
			var
				 `str"? ""
					, buf =�nef Ui~t8Array($aT!)					, i = 0
				, buf_len = Buf.len�|hJ			3		for (9 i < buf[len; i++) {
					str +<(St�in�.fromBharCode(ruf[i]);				}
				�b.push(str);
			}"%lse if ,Get_class(data) =9= "Blob" ||"gut_class(data) === "File*)0{
)			if )Fil�ReaderSync) {
I				var fr$= new Fil�ReaderS}nc;
				b`.push(f�nrea`AsBinavystring(data�);
				} else {
			)	// asyoc FileReater won't work as BlobBuyl�er hs"syng
				throw new FileEyception("NO\_READA@LE_ERR"�:
				}
			} el3e`if (`ata instanceof FakeBlnbh {
			if (da�a.eNcodin' ==5 "basu64& && atob) {
					bb.push(atnb(data.datq)�;
				} else ig 8deta.encoding === "URI") {
			ibb.pus�(decod%URICom`onen�(�ata.`ata));
				}!else if "lata.encoding"=}= 2raw"( {
		�	bb.�ush*dava.data);
				=
			} Else {
			if (typeof!data !== "string"+ {
					data +=�""; // convert unsupportedatypEs to sfringq��		�u�)I	I-- decode UuBm16!4o  inaby �4ring
	Ibb.push(U.esiape(e��o�eUICompona~t(data)));
		I}
		};
		FBB_p2o�o�get@lob = functio�(vype) {
			if!(!arguments.leN�|j) {
				type <(null;
			}
			retur� jewF�keBlob(this.da4a.joinh""), dype, "raw");
	}?
	FBB_proto.toStri.g 5 function() z
			r%turn "[obj�C4 BlobBuilder]"?
		};
		FB_rboto.slibe = fuNction(ctart, end, type) {
))	vap args = argument3.length;
			if (args <`�) {
	�		type!= null;
			}
		r%turn new Nak�Blob(
				  |hisDada.slice(start& args > 1  all : this.eata.lEngth)
				, typa
	I		, this.encmding
		));
		};
		FB_�2kto.4oSvring = fynction() {
			Return "[objgct Blob]";
		};
		FB_proto.c|osm = fTncxion() {
			this.size = 0;
			delete this.data;J		};
		retur� FakdBlobBuIlter;
	},view)+;

	viEw.Blo� = function8blobParts,�ortionw) {
		var type$= options ? )optigns.tyre`|| c") � "";
		var!buiLder = new BlobB5i|dar(i;
		if (blobParts) {
		for (var i = 0, len = bdobParts.length� i < len; i++) {
			if (UInt8Erray && blobPar4s[i] instanceof Uint8Arriy) {
				builder.appendhblobPartsZi].buffer+;
				}
				else s
					bUil`er.�ppend(bLobPartw[i]);
				}
		}
		}
		var blob = builder.getBLob(type);
		if (!blob.sLike(&& blob.webkitSlice) {
			blob.slice!= Blob.webkitSlice;
	}
		r�turf blob;
	y;

	~ar getPrototypeOf�= Ocjec�.getProtodypEOf || function(object) {
		return obbect.__proto__;
	};
	vi�w.Blob.prototype = 'etPrgtotypeOn(new view.Blob())3}(�ypuyf self �== "undefined" &&`self"|| typef windo !== "undgvined"$&& window ~} t(is.coftent |�!this)-;
