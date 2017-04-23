/*!************************************************************************
*
*
*
* ADOBE CONFIDENTIAL
* ___________________
*
*  Copyright 2012 Adobe Systems Incorporated
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
s7sdk.pkg("s7sdk.image");s7sdk.Util.require("s7sdk.common.IS");s7sdk.Util.require("s7sdk.image.FlyoutView");s7sdk.Util.require("s7sdk.common.ItemDesc");if(!s7sdk.image.FlyoutZoomViewControl){s7sdk.image.FlyoutZoomViewControl=function(a){arguments.callee.superclass.apply(this,[a,s7sdk.image.FlyoutZoomViewControl.NS,a.constructor,s7sdk.image.FlyoutZoomView.RESTRICTED_STYLES])};s7sdk.image.FlyoutZoomViewControl.NS="s7sdk.image.FlyoutZoomViewControl";s7sdk.image.FlyoutZoomViewControl.prototype.rebuild=function(a){if(this.component){this.component.prepareUnload();this.superproto.rebuild.apply(this,[a])}}}s7sdk.Class.inherits(s7sdk.image.FlyoutZoomViewControl.NS,"s7sdk.ControlComponent");if(!s7sdk.image.FlyoutZoomView){s7sdk.image.FlyoutZoomView=function FlyoutZoomView(a,c,b){var e=!!arguments[3];b=(typeof b=="string"&&b.length)?b:"Flyout_"+s7sdk.Util.createUniqueId();arguments.callee.superclass.apply(this,[b,a,"div","s7flyoutzoomview",c,!e]);this.createElement();this.compSize={};this.devicePixelRatio=("devicePixelRatio" in window)?window.devicePixelRatio:1;this.container=this.getParent();if(this.serverUrl.lastIndexOf("/")!=(this.serverUrl.length-1)){this.serverUrl+="/"}this.compId=(s7sdk.Util.isNull(b)?"":b);this.asset=unescape(this.asset);this.imageModifier="";this.frame=-1;this.mediaSet=null;this.initialSize=null;this.initialFlyoutSize=null;this.adjustedZoomFactors={primaryFactor:-1,secondaryFactor:-1};if(typeof this.getParam("flyouttransition")!="undefined"){this.transition.type=this.flyouttransition.type;this.transition.duration={showTime:this.flyouttransition.showtime,showDelay:this.flyouttransition.showdelay,hideTime:this.flyouttransition.hidetime,hideDelay:this.flyouttransition.hidedelay}}else{this.transition.type=this.transition.type;this.transition.duration={showTime:this.transition.duration,showDelay:0,hideTime:this.transition.duration,hideDelay:0}}if(this.transition.type==s7sdk.image.FlyoutZoomView.ANIM_NONE){this.transition.duration={showTime:0.001,showDelay:this.flyouttransition.showdelay,hideTime:0.001,hideDelay:this.flyouttransition.hidedelay}}this.url="";this.attachToContainer();if(this.flyout){this.flyoutPos=new s7sdk.Rectangle(this.flyout.x,this.flyout.y,this.flyout.w,this.flyout.h)}else{this.flyoutPos=new s7sdk.Rectangle(0,0,0,0)}this.mainViewPos=new s7sdk.Rectangle(0,0,0,0);this.mainViewSizePreparation();this.flyoutView=new s7sdk.FlyoutView(this);this.breakpoints=null;this.bubble_desktop=this.getLocalizedText("TIP_BUBBLE_OVER");this.bubble_mobile=this.getLocalizedText("TIP_BUBBLE_TAP");var d=s7sdk.browser.device;if(d.name=="ipad"||d.name=="ipod"||d.name=="iphone"||(d.name=="android"&&parseFloat(d.version)>=3)){this.infoText=this.bubble_mobile}else{this.infoText=this.bubble_desktop}this.flyoutView.infoMessage=new s7sdk.InfoMessage(this.id,this.tip,this.infoText);this.loadAsset();if(!e){return new s7sdk.image.FlyoutZoomViewControl(this)}else{return this}};s7sdk.Class.inherits("s7sdk.image.FlyoutZoomView","s7sdk.UIComponent");s7sdk.image.FlyoutZoomView.prototype.getComponent=function(){return this};s7sdk.image.FlyoutZoomView.ANIM_NONE="none";s7sdk.image.FlyoutZoomView.ANIM_WIPE="wipe";s7sdk.image.FlyoutZoomView.ANIM_FADE="fade";s7sdk.image.FlyoutZoomView.ANIM_SLIDE="slide";s7sdk.image.FlyoutZoomView.ANIM_DISSOLVE="dissolve";s7sdk.image.FlyoutZoomView.NONE="none";s7sdk.image.FlyoutZoomView.MASK="mask";s7sdk.image.FlyoutZoomView.COLORIZE="colorize";s7sdk.image.FlyoutZoomView.prototype.symbols={TIP_BUBBLE_OVER:"Mouse over to zoom",TIP_BUBBLE_TAP:"Tap and hold to zoom"};s7sdk.image.FlyoutZoomView.prototype.modifiers={serverUrl:{params:["isRootPath"],defaults:["/is/image/"]},asset:{params:["asset"],defaults:[""],parseParams:false},iscommand:{params:["value"],defaults:[""],parseParams:false},zoomfactor:{params:["primaryFactor","secondaryFactor","upscale"],defaults:[3,-1,true]},transition:{params:["type","duration"],defaults:[s7sdk.image.FlyoutZoomView.ANIM_FADE,1],ranges:[[s7sdk.image.FlyoutZoomView.ANIM_NONE,s7sdk.image.FlyoutZoomView.ANIM_FADE,s7sdk.image.FlyoutZoomView.ANIM_SLIDE],"0:"],deprecated:true},flyouttransition:{params:["type","showtime","showdelay","hidetime","hidedelay"],defaults:[s7sdk.image.FlyoutZoomView.ANIM_FADE,1,0,1,0],ranges:[[s7sdk.image.FlyoutZoomView.ANIM_NONE,s7sdk.image.FlyoutZoomView.ANIM_FADE,s7sdk.image.FlyoutZoomView.ANIM_SLIDE],"0:","0:","0:","0:"]},tip:{params:["duration","count","fade"],defaults:[3,1,0.3]},preloadtiles:{params:["preloadtilesInitial","preloadtilesResize"],defaults:[false,false]},overlay:{params:["overlay"],defaults:[false]},fmt:{params:["format"],defaults:["jpg"],ranges:[["jpg","jpeg","png","png-alpha","gif","gif-alpha"]]},flyout:{params:["x","y","w","h"],defaults:[0,0,0,0],ranges:[,,"0:","0:"],deprecated:true},size:{params:["width","height"],defaults:[0,0],ranges:["0:","0:"],deprecated:true},highlightMode:{params:["type","showtime","position"],defaults:["highlight",0.1,"onimage"],ranges:[["highlight","cursor"],"0:",["onimage","free"]]},frameTransition:{params:["transition","duration"],ranges:[["none","fade"],"0:"],defaults:["none",0.3]},imageReload:{params:["enabled","type","options","fullscreen"],defaults:[false,"breakpoint","",false],ranges:[,["breakpoint","scale"],,]}};s7sdk.image.FlyoutZoomView.RESTRICTED_STYLES={width:"width",height:"height",left:"left",top:"top",border:"border","border-width":"border-width","border-left-width":"border-left-width","border-right-width":"border-right-width","border-top-width":"border-top-width","border-bottom-width":"border-bottom-width"};s7sdk.image.FlyoutZoomView.prototype.setCSS=function(c,b,a){if(s7sdk.image.FlyoutZoomView.RESTRICTED_STYLES[b]){throw new Error("You cannot set "+c+" : "+b+" CSS property for this component ")}else{this.superproto.setCSS.apply(this,[c,b,a])}};s7sdk.image.FlyoutZoomView.prototype.setModifier=function(a){throw new Error("Trying to use setModifier on the Core class (FlyoutZoomView) is unsupported! Please refer to SDK documentation on using setModifier.")};s7sdk.image.FlyoutZoomView.prototype.cleanUp=function(){s7sdk.Util.removeTags(this.obj)};s7sdk.image.FlyoutZoomView.prototype.dispose=function(){this.cleanUp();if(this.obj){if(this.obj.parentElement){this.obj.parentElement.removeChild(this.obj)}}};s7sdk.image.FlyoutZoomView.prototype.loadRequest=function(a){this.mediaSet=s7sdk.MediaSetParser.parse(a.set,this.imageModifier);if(this.mediaSet.items.length>0&&this.mediaSet.items[0] instanceof s7sdk.ItemDesc){this.item=this.mediaSet.items[0];this.asset=this.item.name;this.currentAsset=this.asset;this.configFlyoutZoomView();var b=new s7sdk.event.StatusEvent(s7sdk.event.StatusEvent.NOTF_ASSET_METADATA_READY,true);s7sdk.Event.dispatch(this.obj,b,false)}else{throw new Error("Set response did not contain valid items! Set may be empty.")}};s7sdk.image.FlyoutZoomView.prototype.loadAsset=function(){if(!this.asset||this.asset.length==0){return}this.currentAsset=this.asset;var b=s7sdk.MediaSetParser.parseAssetForSetReq(this.asset);this.imageModifier=b.mod;this.frame=-1;var a=this.serverUrl+"/"+b.req;if(s7sdk.Util.isNonEmptyString(this.locale)){a+="&locale="+this.locale}this.isReq=new s7sdk.IS(this.serverUrl,this.asset);this.isReq.getHttpReq(a,function(d,c){s7sdk.image.FlyoutZoomView.prototype.loadRequest.apply(c,[d])},null,this)};s7sdk.image.FlyoutZoomView.prototype.setAsset=function(b){s7sdk.Logger.log(s7sdk.Logger.FINE,"s7sdk.image.FlyoutZoomView.setAsset - asset: %0",b);var a=this.asset;if(this.isReq){this.isReq.cancelHttpReq()}if(typeof b!="string"){throw new Error("Asset name must be represented by a string!")}this.asset=b;this.loadAsset();if(a!=null&&this.asset!=null&&this.asset!=""){var c=new s7sdk.event.UserEvent(s7sdk.event.UserEvent.SWAP,[0,this.asset],true);s7sdk.Event.dispatch(this.obj,c,false)}};s7sdk.image.FlyoutZoomView.prototype.addEventListener=function(c,b,a){s7sdk.Base.prototype.addEventListener.apply(this,[c,b,a])};s7sdk.image.FlyoutZoomView.prototype.setItem=function(b){s7sdk.Logger.log(s7sdk.Logger.FINE,"s7sdk.image.FlyoutZoomView.setItem - item: %0",b);if(this.isReq){this.isReq.cancelHttpReq()}if(b instanceof s7sdk.ItemDesc==false){throw new Error("Item must be a descendant of ItemDesc!")}if(b.parent==null){throw new Error("ItemDesc must be part of a parent set!")}this.currentAsset=b;this.mediaSet=b.parent;this.item=b;this.asset=b.name;this.configFlyoutZoomView();var a=new s7sdk.event.StatusEvent(s7sdk.event.StatusEvent.NOTF_ASSET_METADATA_READY,"",true);s7sdk.Event.dispatch(this.obj,a,false)};s7sdk.image.FlyoutZoomView.prototype.mainViewSizePreparation=function(){if(this.mainViewPos.equals(new s7sdk.Rectangle(0,0,0,0))){this.left=parseInt(s7sdk.Util.css.getCss("s7flyoutzoomview","left",this.compId,null,this.container));this.top=parseInt(s7sdk.Util.css.getCss("s7flyoutzoomview","top",this.compId,null,this.container));this.left=isNaN(this.left)?0:this.left;this.top=isNaN(this.top)?0:this.top;if(this.size.width==0||this.size.height==0){var d=parseInt(s7sdk.Util.css.getCss("s7flyoutzoomview","border-left-width",this.compId,null,this.container));d=isNaN(d)?0:d;var c=parseInt(s7sdk.Util.css.getCss("s7flyoutzoomview","border-right-width",this.compId,null,this.container));c=isNaN(c)?0:c;var b=parseInt(s7sdk.Util.css.getCss("s7flyoutzoomview","border-top-width",this.compId,null,this.container));b=isNaN(b)?0:b;var a=parseInt(s7sdk.Util.css.getCss("s7flyoutzoomview","border-bottom-width",this.compId,null,this.container));a=isNaN(a)?0:a;this.compSize.width=parseInt(s7sdk.Util.css.getCss("s7flyoutzoomview","width",this.compId,null,this.container));this.compSize.height=parseInt(s7sdk.Util.css.getCss("s7flyoutzoomview","height",this.compId,null,this.container));this.size.width=this.compSize.width-(d+c);this.size.height=this.compSize.height-(b+a);if(!s7sdk.Util.isNumber(this.size.width)||!s7sdk.Util.isNumber(this.size.height)||this.size.width<=0||this.size.height<=0){this.size.width=358;this.size.height=478;s7sdk.Util.setObjSize(this.obj,this.size.width+(d+c),this.size.height+(b+a));this.compSize.width=this.size.width+2*(d+c);this.compSize.height=this.size.height+2*(b+a)}}else{var d=parseInt(s7sdk.Util.css.getCss("s7flyoutzoomview","border-left-width",this.compId,null,this.container));d=isNaN(d)?0:d;var c=parseInt(s7sdk.Util.css.getCss("s7flyoutzoomview","border-right-width",this.compId,null,this.container));c=isNaN(c)?0:c;var b=parseInt(s7sdk.Util.css.getCss("s7flyoutzoomview","border-top-width",this.compId,null,this.container));b=isNaN(b)?0:b;var a=parseInt(s7sdk.Util.css.getCss("s7flyoutzoomview","border-bottom-width",this.compId,null,this.container));a=isNaN(a)?0:a;this.compSize.width=parseInt(s7sdk.Util.css.getCss("s7flyoutzoomview","width",this.compId,null,this.container))+(d+c);this.compSize.height=parseInt(s7sdk.Util.css.getCss("s7flyoutzoomview","height",this.compId,null,this.container))+(b+a)}this.mainViewPos=new s7sdk.Rectangle(this.left,this.top,this.size.width,this.size.height)}this.mainViewPos=this.getComponentBounds()};s7sdk.image.FlyoutZoomView.prototype.sizePreparation=function(){if(this.flyoutPos.equals(new s7sdk.Rectangle(0,0,0,0))){function b(n,h,j,f,g){if((h=="width")||(h=="left")||(h=="top")||(h=="height")){var k="";var o=s7sdk.Util.createElement("div"),p;g=(g&&s7sdk.Util.isElement(g))?g:document.body;o.className=n;if(f){p=s7sdk.Util.createElement("div");p.className=f;p.appendChild(o)}if(j&&j.length>0){if(f){p.setAttribute("id",j)}else{o.setAttribute("id",j)}}g.appendChild(p||o);k=s7sdk.Util.getStyle(o,h);if(/^[-\d\.]+px?$/.test(k)){k=k}else{if(s7sdk.browser.name=="ie"){if((h=="width")||(h=="left")){var l=o.style.left;var q=o.runtimeStyle.left;o.runtimeStyle.left=o.currentStyle.left;o.style.left=k||0;k=o.style.pixelLeft+"px";o.style.left=l;o.runtimeStyle.left=q}else{var m=o.style.top;var i=o.runtimeStyle.top;o.runtimeStyle.top=o.currentStyle.top;o.style.top=k||0;k=o.style.pixelTop+"px";o.style.top=m;o.runtimeStyle.top=i}}else{switch(h){case"width":k=o.offsetWidth;break;case"height":k=o.offsetHeight;break;case"left":k=o.offsetLeft;break;case"top":k=o.offsetTop;break}}}g.removeChild(p||o);return k}else{return s7sdk.Util.css.getCss(n,h,j,f,g)}}this.flyoutPos=new s7sdk.Rectangle(this.mainViewPos.width+5,this.mainViewPos.y,600,480);var a=parseInt(b("s7flyoutzoom","width",this.compId,null,this.obj));var d=parseInt(b("s7flyoutzoom","height",this.compId,null,this.obj));var e=parseInt(b("s7flyoutzoom","left",this.compId,null,this.obj));var c=parseInt(b("s7flyoutzoom","top",this.compId,null,this.obj));if(!isNaN(e)){this.flyoutPos.x=e}if(!isNaN(c)){this.flyoutPos.y=c}if(a>0){this.flyoutPos.width=a}if(d>0){this.flyoutPos.height=d}if(!s7sdk.Util.isNumber(this.flyoutPos.width)||!s7sdk.Util.isNumber(this.flyoutPos.height)||this.flyoutPos.width<=0||this.flyoutPos.height<=0){this.flyoutPos.width=600;this.flyoutPos.height=480}}this.s7anchors=this.findAnchors()};s7sdk.image.FlyoutZoomView.prototype.configFlyoutZoomView=function(){if(this.flyoutPos.equals(new s7sdk.Rectangle(0,0,0,0))){this.sizePreparation()}if(this.asset==null||this.asset.length<=0){console.log("ERROR: bad configFlyoutZoomView");return}var d=this.asset;function g(k,i,l){k+=((k.indexOf("?")==-1)?"?":"&")+i;k+=(typeof l=="undefined")?"":"="+l;return k}if(s7sdk.Util.isNonEmptyString(this.locale)){d=g(d,"locale",this.locale)}if(s7sdk.Util.isNonEmptyString(this.item.version)){d=g(d,"id",this.item.version)}function a(k,i){return k-i}function h(k,i){return i-k}if(this.initialSize==null){this.initialSize={width:this.mainViewPos.width,height:this.mainViewPos.height};this.initialFlyoutSize={width:this.flyoutPos.width,height:this.flyoutPos.height}}var b=Math.max(this.item.width/this.initialSize.width,this.item.height/this.initialSize.height);var j=Math.round(this.item.width/b);this.breakpoints=(this.imageReload.enabled&&this.imageReload.type=="breakpoint"&&this.imageReload.options&&this.imageReload.options.split(";").length>0)?this.imageReload.options.split(";"):null;if(this.breakpoints){for(var f=0;f<this.breakpoints.length;f++){this.breakpoints[f]=Math.round(parseInt(this.breakpoints[f],10))}this.breakpoints.push(j);this.breakpoints.sort(a)}else{this.breakpoints=[];this.breakpoints.push(j)}var e=false;for(var f=0;f<this.breakpoints.length;f++){if(this.breakpoints[f]==this.item.width){e=true;break}}this.breakpoints.sort(a);for(var f=0;f<this.breakpoints.length;f++){if(this.breakpoints[f]>this.item.width){if(e){this.breakpoints.splice(f,1);f--}else{this.breakpoints[f]=this.item.width;e=true}}}this.calcAdjustedZoomFactors();var c=false;if(this.preloadtiles.preloadtilesInitial){c=true}this.flyoutView.firstInit=true;this.flyoutView.loadImage(d,this.serverUrl,this.mainViewPos,this.flyoutPos,this.adjustedZoomFactors.primaryFactor,this.transition.type,this.transition.duration,c,this.fmt,this.iscommand,this.adjustedZoomFactors.secondaryFactor,this.overlay);this.settings.trackLoad(this)};s7sdk.image.FlyoutZoomView.prototype.getComponentBounds=function(){return new s7sdk.Rectangle(this.left,this.top,this.size.width,this.size.height)};s7sdk.image.FlyoutZoomView.prototype.getWidth=function(){return this.size.width};s7sdk.image.FlyoutZoomView.prototype.getHeight=function(){return this.size.height};s7sdk.image.FlyoutZoomView.prototype.resize=function(l,p){this.compSize.width=l;this.compSize.height=p;var e=parseInt(s7sdk.Util.css.getCss("s7flyoutzoomview","border-left-width",this.compId,null,this.container));e=isNaN(e)?0:e;var d=parseInt(s7sdk.Util.css.getCss("s7flyoutzoomview","border-right-width",this.compId,null,this.container));d=isNaN(d)?0:d;var m=parseInt(s7sdk.Util.css.getCss("s7flyoutzoomview","border-top-width",this.compId,null,this.container));m=isNaN(m)?0:m;var k=parseInt(s7sdk.Util.css.getCss("s7flyoutzoomview","border-bottom-width",this.compId,null,this.container));k=isNaN(k)?0:k;l=l-(e+d);p=p-(m+k);function f(u){var h=[];h.push({x:u.x,y:u.y});h.push({x:u.x+u.width,y:u.y});h.push({x:u.x+u.width,y:u.y+u.height});h.push({x:u.x,y:u.y+u.height});return h}function j(h){return{x:h[0].x,y:h[0].y,width:h[1].x-h[0].x,height:h[2].y-h[0].y}}function i(z,w,v,h){var A=f(z);var B=[];for(var x=0;x<A.length;x++){var y=A[x];var u={x:w.x+v*(y.x-w.x),y:w.y+h*(y.y-w.y)};B.push(u)}return j(B)}function s(v,u,h){return{x:v.x+u,y:v.y+h,width:v.width,height:v.height}}function a(u,h){return{x:u.x+h.relX*u.width,y:u.y+h.relY*u.height}}function t(x,v,y,z,h){var u=a(y,h.main);y=i(y,{x:y.x,y:y.y},x,v);var w=a(y,h.main);z=s(z,w.x-u.x,w.y-u.y);var A=a(z,h.flyout);z=i(z,A,x,v);return{main:y,flyout:z}}var r=l/this.mainViewPos.width;var q=p/this.mainViewPos.height;if((r==1)&&(q==1)){return}if(this.flyoutPos.equals(new s7sdk.Rectangle(0,0,0,0))){var o=i(this.mainViewPos,{x:this.mainViewPos.x,y:this.mainViewPos.y},r,q);this.mainViewPos=new s7sdk.Rectangle(o.x,o.y,o.width,o.height);this.left=this.mainViewPos.x;this.top=this.mainViewPos.y;this.size.width=this.mainViewPos.width;this.size.height=this.mainViewPos.height;s7sdk.Util.setObjSize(this.obj,this.mainViewPos.width,this.mainViewPos.height);return}var c=t(r,q,this.mainViewPos,this.flyoutPos,this.s7anchors);this.mainViewPos=new s7sdk.Rectangle(c.main.x,c.main.y,c.main.width,c.main.height);this.left=this.mainViewPos.x;this.top=this.mainViewPos.y;this.size.width=this.mainViewPos.width;this.size.height=this.mainViewPos.height;this.flyoutPos=new s7sdk.Rectangle(c.flyout.x,c.flyout.y,c.flyout.width,c.flyout.height);if(this.asset==null||this.asset.length<=0){}else{var n=this.asset;function b(u,h,v){u+=((u.indexOf("?")==-1)?"?":"&")+h;u+=(typeof v=="undefined")?"":"="+v;return u}if(s7sdk.Util.isNonEmptyString(this.locale)){n=b(n,"locale",this.locale)}if(s7sdk.Util.isNonEmptyString(this.item.version)){n=b(n,"id",this.item.version)}this.flyoutView.firstInit=true;var g=false;if(this.preloadtiles.preloadtilesInitial&&this.preloadtiles.preloadtilesResize){g=true}else{if(this.preloadtiles.preloadtilesInitial&&!this.preloadtiles.preloadtilesResize){g=false}}this.flyoutView.loadImage(n,this.serverUrl,this.mainViewPos,this.flyoutPos,this.adjustedZoomFactors.primaryFactor,this.transition.type,this.transition.duration,g,this.fmt,this.iscommand,this.adjustedZoomFactors.secondaryFactor,this.overlay);this.settings.trackLoad(this)}};s7sdk.image.FlyoutZoomView.prototype.prepareUnload=function(){this.size.width=this.compSize.width;this.size.height=this.compSize.height};s7sdk.image.FlyoutZoomView.prototype.findAnchors=function(){var i={relX:0,relY:0};var f={relX:0,relY:0};var e=!((this.flyoutPos.x>=this.mainViewPos.x+this.mainViewPos.width)||(this.flyoutPos.x+this.flyoutPos.width<=this.mainViewPos.x));var b=!((this.flyoutPos.y>=this.mainViewPos.y+this.mainViewPos.height)||(this.flyoutPos.y+this.flyoutPos.height<=this.mainViewPos.y));function a(k){var j=[];j.push({x:k.x,y:k.y});j.push({x:k.x+k.width,y:k.y});j.push({x:k.x+k.width,y:k.y+k.height});j.push({x:k.x,y:k.y+k.height});return j}function h(j){switch(j){case 0:return{relX:0,relY:0};case 1:return{relX:1,relY:0};case 2:return{relX:1,relY:1};case 3:return{relX:0,relY:1}}}function g(k,j){return Math.pow(Math.pow(k.x-j.x,2)+Math.pow(k.y-j.y,2),0.5)}function c(q,p){var m=a(q);var k=a(p);var o=[-1,-1];for(var n=0;n<4;n++){for(var l=0;l<4;l++){if((o[0]==-1)||(g(m[o[0]],k[o[1]])>g(m[n],k[l]))){o[0]=n;o[1]=l}}}return o}if(!e&&!b){var d=c(this.mainViewPos,this.flyoutPos);i=h(d[0]);f=h(d[1])}else{if(e&&b){i={relX:0.5,relY:0.5};f={relX:0.5,relY:0.5}}else{if(e){if(this.flyoutPos.y>this.mainViewPos.y){i={relX:0.5,relY:1};f={relX:0.5,relY:0}}else{i={relX:0.5,relY:0};f={relX:0.5,relY:1}}}else{if(this.flyoutPos.x>this.mainViewPos.x){i={relX:1,relY:0.5};f={relX:0,relY:0.5}}else{i={relX:0,relY:0.5};f={relX:1,relY:0.5}}}}}return({main:i,flyout:f})};s7sdk.image.FlyoutZoomView.prototype.calcAdjustedZoomFactors=function(){var b;var a;if((this.zoomfactor.upscale==0)&&((this.initialSize.height>this.item.height)&&(this.initialSize.width>this.item.width))){b=this.item.width;a=this.item.height}else{a=this.initialSize.height;b=Math.round(this.item.width*a/this.item.height);if(b>this.initialSize.width){b=this.initialSize.width;a=Math.round(this.item.height*b/this.item.width)}}var c;if(this.initialFlyoutSize.width*a/this.initialFlyoutSize.height<b){c=this.initialFlyoutSize.height/a}else{c=this.initialFlyoutSize.width/b}this.adjustedZoomFactors.primaryFactor=this.zoomfactor.primaryFactor>c?this.zoomfactor.primaryFactor:c;if(this.zoomfactor.secondaryFactor>0){this.adjustedZoomFactors.secondaryFactor=this.zoomfactor.secondaryFactor>c?this.zoomfactor.secondaryFactor:c}else{this.adjustedZoomFactors.secondaryFactor=-1}if(this.zoomfactor.upscale==0){if((this.adjustedZoomFactors.primaryFactor*a>this.item.height)&&(this.adjustedZoomFactors.primaryFactor*b>this.item.width)){this.adjustedZoomFactors.primaryFactor=Math.max(1/(b/this.item.width),1)}if((this.adjustedZoomFactors.secondaryFactor*a>this.item.height)&&(this.adjustedZoomFactors.secondaryFactor*b>this.item.width)){this.adjustedZoomFactors.secondaryFactor=Math.max(1/(b/this.item.width),1)}}};s7sdk.image.FlyoutZoomView.prototype.getCurrentAsset=function(){return typeof this.currentAsset=="undefined"?null:this.currentAsset};s7sdk.image.FlyoutZoomView.prototype.setCurrentAsset=function(a){if(typeof(a)=="string"){this.setAsset(a)}else{this.setItem(a)}};s7sdk.FlyoutZoomView=s7sdk.image.FlyoutZoomView;(function addDefaultCSS(){var c=s7sdk.Util.css.createCssRuleText;var b=s7sdk.Util.css.createCssImgUrlText;var a=c(".s7flyoutzoomview",{position:"relative",border:"1px solid #c2c2c2","-moz-user-select":"-moz-none","-webkit-user-select":"none","-webkit-tap-highlight-color":"rgba(0,0,0,0)","-ms-user-select":"none","user-select":"none","text-align":"left"})+c(".s7flyoutzoomview .s7highlight",{opacity:"0.6",filter:"alpha(opacity = 60)","background-color":"#FFFFFF"})+c(".s7flyoutzoomview .s7cursor[input='mouse']",{width:"80px",height:"80px","background-image":b("zoom-cursor-desktop.png")})+c(".s7flyoutzoomview .s7cursor[input='touch']",{width:"80px",height:"100px","background-image":b("zoom-cursor-tablet-1x.png")})+c(".s7flyoutzoomview .s7overlay",{opacity:"0.6",filter:"alpha(opacity = 60)","background-color":"#FFFFFF"})+c(".s7flyoutzoomview .s7flyoutzoom",{width:"600px",height:"480px",left:"365px",top:"0px",position:"absolute",border:"1px solid #c2c2c2","-webkit-transform":"translateZ(0px)"})+c(".s7flyoutzoomview .s7tip",{position:"absolute",bottom:"50px",color:"#ffffff","font-family":"Arial","font-size":"12px","padding-bottom":"10px","padding-top":"10px","padding-left":"12px","padding-right":"12px","background-color":"#000000","border-radius":"4px","-webkit-transform":"translateZ(0px)",opacity:"0.5",filter:"alpha(opacity = 50)"});s7sdk.Util.css.addDefaultCSS(a,"FlyoutZoomView")})()}if(!s7sdk.InfoMessage){s7sdk.InfoMessage=function(b,a,d,c){c=(typeof c=="string"&&c.length)?c:"InfoMessage_"+s7sdk.Util.createUniqueId();arguments.callee.superclass.apply(this,[c,b,"div","s7tip"]);this.createElement();this.baseOpacity=null;this.currentOpacity=0;this.hiddenState=true;this.enabled=true;this.textType=d||this.textType;if(a){this.tip=a}else{this.tip.duration=3;this.tip.count=1;this.tip.fade=0.3}this.obj.innerHTML=this.textType;this.obj.style.display="none";this.appended=null;this.timerId=null};s7sdk.Class.inherits("s7sdk.InfoMessage","s7sdk.UIComponent");s7sdk.InfoMessage.prototype.show=function(d,c){if(!this.hiddenState||this.tip.count==0||!this.enabled){return}if(this.tip.count>0){this.tip.count--}this.hiddenState=false;this.container=this.getParent();this.obj.style.display="block";if(!this.appended){this.appended=this.container.appendChild(this.obj)}if(this.baseOpacity==null){this.baseOpacity=s7sdk.Util.getStyle(this.obj,"opacity")}this.centerOverlay(d||this.container.offsetWidth,c||this.container.offsetHeight);var b=this;function a(){if(b.currentOpacity<1&&!b.hiddenState){b.currentOpacity+=0.05/b.tip.fade;b.obj.style.opacity=b.baseOpacity*b.currentOpacity;b.obj.style.filter="alpha(opacity ="+(b.baseOpacity*b.currentOpacity*100)+")";b.timerId=setTimeout(a,50)}}if(this.tip.fade>0){a()}else{this.obj.style.opacity=this.baseOpacity;this.obj.style.filter="alpha(opacity ="+(this.baseOpacity*100)+")"}};s7sdk.InfoMessage.prototype.hide=function(){if(this.hiddenState){return}this.hiddenState=true;var a=this;function b(){if(a.hiddenState){if(a.currentOpacity>0){a.currentOpacity-=0.05/a.tip.fade;a.obj.style.opacity=a.baseOpacity*a.currentOpacity;a.obj.style.filter="alpha(opacity ="+(a.baseOpacity*a.currentOpacity*100)+")";a.timerId=setTimeout(b,50)}else{a.obj.style.opacity=0;a.obj.style.display="none"}}}if(this.tip.fade>0){b()}else{this.obj.style.opacity=0;this.obj.style.filter="";this.obj.style.display="none"}};s7sdk.InfoMessage.prototype.centerOverlay=function(b,a){this.obj.style.left=0+"px";this.obj.style.left=(b-this.obj.offsetWidth)/2+"px"}};