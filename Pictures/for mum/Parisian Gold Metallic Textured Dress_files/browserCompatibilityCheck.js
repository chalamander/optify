function getBrowser(){var a,b,c=navigator.userAgent,d={i:"Internet Explorer",f:"Firefox",o:"Opera",s:"Apple Safari",n:"Netscape Navigator",c:"Chrome",x:"Other"};if(/bot|googlebot|slurp|mediapartners|adsbot|bingbot|google web preview|like firefox|chromeframe|seamonkey|opera mini|min|meego|netfront|moblin|maemo|arora|camino|flot|k-meleon|fennec|kazehakase|galeon|android|mobile|iphone|ipod|ipad|epiphany|rekonq|symbian|webos/i.test(c))a="x";else if(/Trident.(\d+\.\d+)/i.test(c))a="io";else if(/MSIE.(\d+\.\d+)/i.test(c))a="i";else if(/Chrome.(\d+\.\d+)/i.test(c))a="c";else if(/Firefox.(\d+\.\d+)/i.test(c))a="f";else if(/Version.(\d+.\d+).{0,10}Safari/i.test(c))a="s";else if(/Safari.(\d+)/i.test(c))a="so";else if(/Opera.*Version.(\d+\.?\d+)/i.test(c))a="o";else if(/Opera.(\d+\.?\d+)/i.test(c))a="o";else{if(!/Netscape.(\d+)/i.test(c))return{n:"x",v:0,t:d[a]};a="n"}return"x"==a?{n:"x",v:0,t:d[a]}:(b=new Number(RegExp.$1),"so"==a&&(b=100>b&&1||130>b&&1.2||320>b&&1.3||520>b&&2||524>b&&3||526>b&&3.2||4,a="s"),"i"==a&&7==b&&window.XDomainRequest&&(b=8),"io"==a&&(a="i",b=b>5?10:b>4?9:b>3.1?8:b>3?7:9),{code:a,version:b,name:d[a]+" "+b})}function createMessage(a){var b=jq("<div />"),c=jq("<div />");b.addClass("incompbrowser");var d=jq("<span />");if(a){b.addClass("lower"),d.html(lowerBrowserPromptText);var e=jq("<a />");e.attr("href","javascript:void(0);"),e.click(function(){createPopup(),jq(".incompbrowser").slideUp().remove()}),e.html(lowerBrowserUpgradeLinkText),c.append(e)}else b.addClass("higher"),d.html(higherBrowserPromptText);c.prepend(d),b.prepend(c);var f=jq("<a />");f.addClass("close"),f.attr("href","javascript:void(0);"),f.html(closeButtonText),f.click(function(){jq(".incompbrowser").slideUp().remove()}),c.append(f),jq("body").prepend(b)}function createPopup(){var a=jq("<div />");a.addClass("browser-popup"),jq("body").append(a),jq.ajax({url:"/global/shared/browserUpgradeOptions.jsp",success:function(b){a.append(b),openModalPop(a)}})}jQuery(window).load(function(){if(!jq.isEmptyObject(bccoption)&&!jq.cookie("bccheck")){var a=!1,b=!1,c=getBrowser();jq.isEmptyObject(bccoption.minversions)||jq.each(bccoption.minversions,function(b,d){return b==c.code?(c.version<d&&(a=!0),!1):void 0}),jq.isEmptyObject(bccoption.maxversions)||jq.each(bccoption.maxversions,function(a,d){return a==c.code?(c.version>d&&(b=!0),!1):void 0}),(a||b)&&(createMessage(a),jq(".incompbrowser").slideDown())}jq.cookie("bccheck")||jq.cookie("bccheck","done")});