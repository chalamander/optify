/*!************************************************************************
*
* ADOBE CONFIDENTIAL
* ___________________
*
*  Copyright 2011 Adobe Systems Incorporated
*  All Rights Reserved.
*
* NOTICE:  All information contained herein is, and remains
* the property of Adobe Systems Incorporated and its suppliers,
* if any.  The intellectual and technical concepts contained
* herein are proprietary to Adobe Systems Incorporated and its
* suppliers and are protected by trade secret or copyright law.
* Dissemination of this information or reproduction of this material
* is strictly forbidden unless prior written permission is obtained
* from Adobe Systems Incorporated.
**************************************************************************/
s7sdk.Util.require("s7sdk.utils.SwatchesParser");if(!s7sdk.ItemDesc){s7sdk.ItemDesc=function ItemDesc(d,c,a,b){this.parent=d;this.type=c;this.name=a;this.swatch=b};s7sdk.ItemDesc.prototype.toString=function(){return this.name}}if(!s7sdk.ItemDescType){s7sdk.ItemDescType={UNKNOWN:0,IMG:1,VIDEO:2,IMAGE_SET:4,SPIN_SET:8,ECAT_SET:16,MEDIA_SET:32,EMPTY:64,VIDEO_SET:128,VIDEO_GROUP:256};s7sdk.ItemDescType.decodeItemDescType=function(a){switch(a){case"img":return s7sdk.ItemDescType.IMG;case"img_set":return s7sdk.ItemDescType.IMAGE_SET;case"spin":return s7sdk.ItemDescType.SPIN_SET;case"video":return s7sdk.ItemDescType.VIDEO;case"ecat":return s7sdk.ItemDescType.ECAT_SET;case"media_set":return s7sdk.ItemDescType.MEDIA_SET;case"empty":return s7sdk.ItemDescType.EMPTY;case"video_set":return s7sdk.ItemDescType.VIDEO_SET;case"video_group":return s7sdk.ItemDescType.VIDEO_GROUP}return s7sdk.ItemDescType.UNKNOWN}}if(!s7sdk.ImageDesc){s7sdk.ImageDesc=function ImageDesc(m,j,a,o,c,q,h,d,k,e,l,i,g,b,p,f,n){arguments.callee.superclass.call(this,m,j,a,o);this.isDefault=d;this.mod=(typeof(k)=="undefined"?null:k);this.pmod=(typeof(e)=="undefined"?null:e);this.label=l;this.width=c;this.height=q;this.version=h;this.maps=i;this.targets=g;this.userData=b;this.mapsuppressed=p;this.userdatasuppressed=f;this.np=n;this.images=null};s7sdk.Class.inherits("s7sdk.ImageDesc","s7sdk.ItemDesc")}if(!s7sdk.MapDesc){s7sdk.MapDesc=function MapDesc(b,d,f,a,c,e){this.shape=b;this.coords=d;this.alt=f;this.href=a;this.rolloverKey=c;this.target=e}}if(!s7sdk.MapDescShape){s7sdk.MapDescShape={SHAPE_RECT:"rect",SHAPE_CIRCLE:"circle",SHAPE_POLY:"poly"}}if(!s7sdk.MediaSetDesc){s7sdk.MediaSetDesc=function MediaSetDesc(d,e,c,a,b){arguments.callee.superclass.call(this,d,c,a,b);this.level=e;this.items=new Array();this.maps=null;this.targets=null;this.userdata=null};s7sdk.Class.inherits("s7sdk.MediaSetDesc","s7sdk.ItemDesc")}if(!s7sdk.VideoSetDesc){s7sdk.VideoSetDesc=function VideoSetDesc(d,f,c,a,b,e){arguments.callee.superclass.call(this,d,f,c,a,b);this.image=e};s7sdk.Class.inherits("s7sdk.VideoSetDesc","s7sdk.MediaSetDesc")}if(!s7sdk.OrientationSetDesc){s7sdk.OrientationSetDesc=function OrientationSetDesc(a,b){arguments.callee.superclass.call(this,null,null,null,null);this.landscape=a;this.portrait=b?b:null;this.portraitTolandscapeHash=[];this.landscapeToportraitHash=[]};s7sdk.OrientationSetDesc.prototype.getPortraitIndex=function(a){return this.landscapeToportraitHash[a]};s7sdk.OrientationSetDesc.prototype.getLandscapeIndex=function(a){return this.portraitTolandscapeHash[a]};s7sdk.Class.inherits("s7sdk.OrientationSetDesc","s7sdk.ItemDesc")}if(!s7sdk.SwatchDesc){s7sdk.SwatchDesc=function SwatchDesc(e,b,c,a,d,f){this.image=e;this.color=b;this.label=c;this.mod=typeof(d)=="undefined"?null:d;this.pmod=typeof(f)=="undefined"?null:f;this.version=a;this.asset=null;this.frame=-1;this.sourceFrame=-1}}if(!s7sdk.TargetDesc){s7sdk.TargetDesc=function TargetDesc(c,e,d,b,a){this.frameId=e;this.index=c;this.rect=d;this.label=b;this.userdata=a}}if(!s7sdk.VideoDesc){s7sdk.VideoDesc=function VideoDesc(i,f,a,h,j,l,e,c,k,b,d,g){arguments.callee.superclass.call(this,i,f,a,j);this.suffix=l;this.version=e;this.width=c;this.height=k;this.userData=b;this.image=d;this.videoType=h;this.bitrate=g};s7sdk.Class.inherits("s7sdk.VideoDesc","s7sdk.ItemDesc")}if(!s7sdk.VideoDescType){s7sdk.VideoDescType={FILE:0,CATALOG_ID:1,PATH:2}}if(!s7sdk.MediaSetParser){s7sdk.MediaSetParser=function MediaSetParser(){};s7sdk.MediaSetParser.parse=function(b,c,a){return s7sdk.MediaSetParser.parseSet(null,b,0,null,c,a)};s7sdk.MediaSetParser.parseSet=function(h,c,a,j,k,g){if(k&&k.length>0){c.n+=(c.n.indexOf("?")==-1)?"?":"&";c.n+=k}var d;if(s7sdk.ItemDescType.decodeItemDescType(c.type)==s7sdk.ItemDescType.VIDEO_SET){var b=null;if(c.i){b=s7sdk.MediaSetParser.parseItemImage(null,c)}d=new s7sdk.VideoSetDesc(h,a,s7sdk.ItemDescType.decodeItemDescType(c.type),c.n,j,b)}else{d=new s7sdk.MediaSetDesc(h,a,s7sdk.ItemDescType.decodeItemDescType(c.type),c.n,j)}if(s7sdk.Util.isArray(c.item)){var f=c.item;for(var e=0;e<f.length;++e){d.items[e]=s7sdk.MediaSetParser.parseItem(d,f[e],a,k,g)}}else{d.items[0]=s7sdk.MediaSetParser.parseItem(d,c.hasOwnProperty("item")?c.item:c,a,k,g)}d.targets=s7sdk.MediaSetParser.parseTargets(c);d.maps=s7sdk.MediaSetParser.parseMaps(c);d.userdata=c.userdata;return d};s7sdk.MediaSetParser.parseItem=function(c,b,e,d,a){if(b.v!=undefined){return s7sdk.MediaSetParser.parseItemVideo(c,b,e,d,a)}else{if(b.set!=undefined){return s7sdk.MediaSetParser.parseItemSet(c,b,e,d,a)}else{if(b.i!=undefined){return s7sdk.MediaSetParser.parseItemImage(c,b,e,d)}}}};s7sdk.MediaSetParser.parseItemImage=function(l,b,a,p){var n=s7sdk.MediaSetParser.parseSwatch(b,b.iv,p);var i=s7sdk.MediaSetParser.parseMaps(b);var g=s7sdk.MediaSetParser.parseTargets(b);var o=(b.map=="1");var f=(b.userdata=="1");var m=(b.np=="1");if(s7sdk.Util.isArray(b.i)){var h=new Array();var e=new Array();for(var d=0;d<b.i.length;++d){h.push(new s7sdk.ImageDesc(null,s7sdk.ItemDescType.IMG,b.i[d].n,null,parseInt(b.dx),parseInt(b.dy),b.iv,b.i[d].isDefault,b.i[d].mod,b.i[d].pmod,b.i[d].l,null,null,null,false,false,false));e.push(b.i[d].n)}var k=new s7sdk.ImageDesc(l,b.type==undefined?s7sdk.ItemDescType.IMG:s7sdk.ItemDescType.decodeItemDescType(b.type),b.i[0].n,n,parseInt(b.dx),parseInt(b.dy),b.iv,b.i[0].isDefault,b.i[0].mod,b.i[0].pmod,b.i[0].l,i,g,b.userdata,o,f,m);k.name=s7sdk.SwatchesParser.combinedImageName(e,false);if(p&&p.length>0){if(k.name.indexOf("?")){var c=k.name.substring(0,k.name.indexOf("?"));c+="?";c+=p+"&";k.name=c+k.name.substring(k.name.indexOf("?"))}}k.mod+="?";k.images=h;return k}else{if(p&&p.length>0){b.i.n+=(b.i.n.indexOf("?")==-1)?"?":"&";b.i.n+=p}return new s7sdk.ImageDesc(l,s7sdk.ItemDescType.IMG,b.i.n,n,parseInt(b.dx),parseInt(b.dy),b.iv,b.i.isDefault,b.i.mod,b.i.pmod,b.i.l,i,g,b.userdata,o,f,m)}};s7sdk.MediaSetParser.parseItemVideo=function(g,d,a,i,e){var h=s7sdk.MediaSetParser.parseSwatch(d,d.iv,i);var j=null;var c=d.v.name;var f=s7sdk.VideoDescType.FILE;if(e){if(d.v.path!=undefined){c=d.v.path;f=s7sdk.VideoDescType.PATH}else{if(d.v.id!=undefined){c=d.v.id;f=s7sdk.VideoDescType.CATALOG_ID}}}else{if(d.v.path!=undefined){c=d.v.path;f=s7sdk.VideoDescType.PATH}if(d.v.id!=undefined){c=d.v.id;f=s7sdk.VideoDescType.CATALOG_ID}}if(d.i!=undefined){j=s7sdk.MediaSetParser.parseItemImage(null,d)}s7sdk.Logger.log(s7sdk.Logger.FINER,"posterImage: "+(j!=null?j:"none"));var b=parseInt(d.v.bitrate)*(e?1024:1);return new s7sdk.VideoDesc(g,s7sdk.ItemDescType.VIDEO,c,f,h,d.v.suffix,d.iv,parseInt(d.v.dx),parseInt(d.v.dy),d.userdata,j,b)};s7sdk.MediaSetParser.resolveVideoAsset=function(d,c,a,b){var e=!b&&(d.name.indexOf("?")!=-1)?d.name.split("?")[0]:d.name;if(d.type==s7sdk.ItemDescType.VIDEO_GROUP&&b){if(s7sdk.browser.supportflash()&&(c.type=="auto")){throw new Error("Sets with type 'video_group'("+d.type+") could not be played by flash-video proxy.")}else{e=s7sdk.MediaSetParser.formNonAVS(d.items,a)}}else{if(((s7sdk.browser.name=="safari")&&((("ipad"==s7sdk.browser.device.name)||("iphone"==s7sdk.browser.device.name))||((s7sdk.browser.device.name=="desktop")&&(((c.type=="native")||(s7sdk.browser.version.minor>6))||(!s7sdk.browser.supportflash()&&c.type=="auto")))))||((s7sdk.browser.device.name=="blackberry")&&(s7sdk.browser.device.version==10)&&(!(s7sdk.browser.supportflash())||(c.type=="native")))){if(d.videoType!=s7sdk.VideoDescType.PATH){e+=".m3u8"}}else{if(((s7sdk.browser.device.name=="android")||((s7sdk.browser.device.name=="desktop")&&(!s7sdk.browser.supportflash()||(c.type=="native"))))&&(d.type==s7sdk.ItemDescType.VIDEO_SET)){e=s7sdk.MediaSetParser.getAssetByNearestBitrate(d.items,a)}}}return e};s7sdk.MediaSetParser.getAssetByNearestBitrate=function(h,g){var f,b;var a=-1;var e=-1;var c="";if(!h.length){c=h.name}else{for(f=0;f<h.length;f++){b=parseInt(h[f].bitrate);if((b<=g)&&(b>e)){a=b;e=b;c=h[f].name}}if(c==""){var d=-1;for(f=0;f<h.length;f++){b=parseInt(h[f].bitrate);if((d==-1)||(b<d)){d=b;c=h[f].name}}}}return c};s7sdk.MediaSetParser.formNonAVS=function(f,d){var g=Array.apply(this,f);var c=Array.apply(this,f);for(var b=c.length-1;b>=0;b--){if(c[b].suffix=="mp4"){c.splice(b,1)}}for(var b=g.length-1;b>=0;b--){if(g[b].suffix=="webm"){g.splice(b,1)}}var h=[],e=s7sdk.MediaSetParser.getAssetByNearestBitrate(c,d),a=s7sdk.MediaSetParser.getAssetByNearestBitrate(g,d);if(!s7sdk.Util.isNull(a)){h.push(a)}if(!s7sdk.Util.isNull(e)){h.push(e)}return h};s7sdk.MediaSetParser.parseItemSet=function(d,b,f,e,a){var c=s7sdk.MediaSetParser.parseSwatch(b,b.iv,e);return s7sdk.MediaSetParser.parseSet(d,b.set,f+1,c,e,a)};s7sdk.MediaSetParser.parseSwatch=function(c,a,d){if(c.s!=undefined){if(d&&d.length>0){c.s.n+=(c.s.n.indexOf("?")==-1)?"?":"&";c.s.n+=d}var b=c.s.n;return new s7sdk.SwatchDesc(b,c.s.c,c.s.l,a,c.s.mod,c.s.pmod)}return null};s7sdk.MediaSetParser.parseTargets=function(e){if(e.targets!=undefined&&e.targets.target!=undefined){var b=new Array();if(e.targets.target instanceof Array){for(var d=0;d<e.targets.target.length;d++){var c=e.targets.target[d];var g=(c.frame!=undefined&&c.frame!=""?c.frame:-1);var a=c.rect.split(",");var f=new s7sdk.Rectangle(parseInt(a[0]),parseInt(a[1]),parseInt(a[2]),parseInt(a[3]));b.push(new s7sdk.TargetDesc(c.number,g,f,c.label,c.userData))}}else{var c=e.targets.target;var g=(c.frame!=undefined&&c.frame!=""?c.frame:-1);var a=c.rect.split(",");var f=new s7sdk.Rectangle(parseInt(a[0]),parseInt(a[1]),parseInt(a[2]),parseInt(a[3]));b.push(new s7sdk.TargetDesc(c.number,g,f,c.label,c.userData))}return b}return null};s7sdk.MediaSetParser.parseMaps=function(b){var d=null;function c(g){var f=g.coords.split(",");for(var e=0;e<f.length;e++){f[e]=parseFloat(f[e])}return new s7sdk.MapDesc(g.shape,f,g.alt,g.href,g.rollover_key,g.target)}if(b.map&&b.map.area){d=[];if(s7sdk.Util.isArray(b.map.area)){for(var a=0;a<b.map.area.length;a++){d.push(c(b.map.area[a]))}}else{if(b.map.area.coords&&b.map.area.shape){d.push(c(b.map.area))}}}return d};s7sdk.MediaSetParser.findCompanyNameInAsset=function(a){var b=s7sdk.MediaSetParser.parseAssetForSetReq(a).name;return b};s7sdk.MediaSetParser.parseAssetForSetReq=function(i){function c(k){var l=k;var n;do{n=l;l=l.replace(/[\({][^{}\(\)]+[}\)]/g,function(o){return new Array(o.length+1).join("X")})}while(l!=n);var m=l.indexOf("?");if(m==-1){return{mainAssetPart:k,globalISModifier:null}}else{return{mainAssetPart:k.substring(0,m),globalISModifier:k.substring(m+1)}}}var g=i.match(/^\{?([^{\?\/]+)/);var j=g?g[1]:"";g=i.match(/^{[^{}]+}(?:,{[^{}]+})+/);var e=g?g[0]:"";var b=c(i);var a=b.mainAssetPart;var d=b.globalISModifier;var f=(i.match(/^{/)||a.match(/[,:;]+/))?true:false;var h=(f&&((e.length>0)||a.match(/^[^{]/)))?true:false;if(f){if(h){req=j+"?req=set,json,UTF-8&imageSet={"+a+"}"+((d)?"&"+d:"")}else{req=j+"?req=set,json,UTF-8&imageSet="+a+((d)?"&"+d:"")}}else{req=a+"?req=set,json,UTF-8"+((d)?"&"+d:"")}return{req:req,name:j,mod:d}}};