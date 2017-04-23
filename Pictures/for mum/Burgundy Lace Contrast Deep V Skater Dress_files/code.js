if(typeof yiel === 'undefined'){
  var yiel = {};
  var _snaq = _snaq || []; //Analytic requests handler

  yiel = {"website":{"id":3278,"name":"newlook.com","track_yieldify_only":"false","use_snowplow":"","infrequent_basket_updates":"","shopping_class":"","shopping_selector":"","shopping_cart_multiple":"","shopping_initial":-1,"coupon_selector":"input#couponValue[name=\"couponValue\"]","submit_coupon_selector":"#promo_update_input","submit_coupon_just_click":"","shopping_cart_seperator":".","track_visited_pages":"","track_visited_pages_expire":2592000000,"sign_out_class":"","campaigns_protocol":"//","watchdogs":"","cam_ids":"57765,57732,57767,57678","campaigns":"57765,57732,57767,57678","track_products":"","products_url_pattern":"","product_image_css_path":"","form_targeting":"","afiliate_block":"","cookie_block":"","cookie_block_expire":"","referring_traffic_block":"","referring_traffic_expire":"","text_grabb_condition":"no","text_grabb_options":"","track_sale":"true","track_sale_expire":2592000000,"track_impression_sale":"true","track_impression_sales_expire":0,"thanks_page_pattern":"checkout/summary,,false,,,,,,;;","sales_extra_details":"page,,Order ID,,span.orderColumn2:first,,;;page,,Total Amount,,.orderColumn2:nth(1),,;;page,,Order Email,,.orderEmail,,;;","sale_ajax_update":"","track_sale_ajax":"","sub_domains":"","track_purchases":"true","last_price_pattern":"payment","last_price_selector":".subtotal-value","sale_value_multiplier":1.0,"browser_not_target":"","browser_target":"msie|chrome|firefox|safari|opera","delayed_start":200,"iv_delay":10000,"iv_delay_all":"","mouse_hh":0,"aa_delay":0,"bbb_margin":null,"bbb_ratio":8,"bbb_all_location":"","bbb_all_margin":"","bbb_all_ratio":"","exit_margin":"","exit_margin_right":"true","exit_margin_left":"true","exit_margin_right_val":null,"exit_margin_left_val":null,"exit_margin_right_unit":"px","exit_margin_left_unit":"px","show_powerd_by":"","close_image":"","delay":691200000,"encrypt_userinfo":"true","inactivity_period":15,"sale_display_type":"sale","website_sale_display_value":"1.5","block_script":"yieoptout","heatmap_script":"function getURLParameter(name) {\r\n  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(window.location.href)||[,\"\"])[1])||null\r\n}\r\n\r\nif (window.location.href.match(/&gender=/)){\r\nif (!yiel.fn.getYieldifyCookie(\"gender\")){\r\nyiel.fn.setYieldifyCookie(\"gender\",getURLParameter(\"gender\"),31556900000);\r\n}}\r\n\r\nvar results = new RegExp('[\\\\?&]yiaddressuk=([^&#]*)').exec(window.location.href);\r\nif (results!=null)\r\n{    \r\nconsole.log(results);\r\n  email = results[1];\r\n  var results2 = new RegExp('[\\&]gender=([MF])').exec(window.location.href);\r\n  if (results2!=null) \r\n  {\r\n    gender = results2[1];\r\n  }\r\n  else { gender = ''; }\r\n  var tstamp = getURLParameter(\"tstamp\");\r\n  if (!!tstamp) {\r\n    var objToday = new Date(parseInt(tstamp));\r\n  }\r\n  else {\r\n    var objToday = new Date();\r\n  }\r\n\r\n  method = \"post\";\r\n  path = \"https://fashion.newlook.com/pub/rf?\"\r\n\r\n  var curSeconds = objToday.getSeconds() < 10 ? \"0\" + objToday.getSeconds() : objToday.getSeconds();\r\n  var today = objToday.getFullYear() + \"-\" + (objToday.getMonth()+1) + \"-\" + (objToday.getDate()) + \" \" + objToday.getHours() + \":\" + objToday.getMinutes() + \":\" + curSeconds;\r\n  var form = document.createElement(\"form\");\r\n  form.setAttribute(\"method\", method);\r\n  form.setAttribute(\"action\", path);\r\n  \r\n  params = {\"EMAIL_ADDRESS_\": email,\r\n            \"Gender\": gender,\r\n            \"_ri_\": \"X0Gzc2X%3DWQpglLjHJlTQGn6DpbOUdsmmMhNzazcTngLTJsNDcp8mRHEBsSVwjpnpgHlpgneHmgJoXX0Gzc2X%3DWQpglLjHJlTQGrYqS8rXJ2CUfiNfk0zgCcL3sNDcp8mRHEBsS\",\r\n            \"SOURCE_SITE\" : \"en_GB_NewLook\",\r\n            \"SRCDATE_YIELDIFY_UK\" : today,\r\n            \"SRC_YIELDIFY_UK\": \"Y\",\r\n            \"EMAIL_PERMISSION_STATUS_\": \"I\"\r\n           }\r\n  keys = Object.keys(params)         \r\n  for(i = 0; i < keys.length; i++) {\r\n    var hiddenField = document.createElement(\"input\");\r\n    hiddenField.setAttribute(\"type\", \"hidden\");\r\n    hiddenField.setAttribute(\"name\", keys[i]);\r\n    hiddenField.setAttribute(\"value\", params[keys[i]]);\r\n    form.appendChild(hiddenField);\r\n  }\r\n  document.body.appendChild(form);\r\n\r\n  yiel.$.ajax({\r\n    type: method,\r\n    data: yiel.$(form).serialize(),\r\n    url: path\r\n  });\r\n\r\n}\r\n\r\n//Set Random Split 33/33/34\r\n  if (!yiel.fn.getYieldifyCookie('split')) {\r\n\r\n        var manSplit = Math.random();\r\n\r\n        if (manSplit <= 0.33) {\r\n\r\n            yiel.fn.setYieldifyCookie(\"split\", \"A\");\r\n        } else if (manSplit > 0.33 && manSplit <= 0.66)  {\r\n\r\n            yiel.fn.setYieldifyCookie(\"split\", \"B\");\r\n        } else {\r\n\r\n            yiel.fn.setYieldifyCookie(\"split\", \"C\");\r\n        }\r\n    }","ajax_coupon_selector":"","max_products_store":5,"analytics_events":"","analytics_events_category_name":"Yieldify","affiliate_blocker":"","affiliate_block_expire":2592000000,"form_refill":"","url_pattern":"","form_refill_fields":"","form_refill_expire":null,"website_version":1,"shopping_item_selector":"","data_fields":[],"data_events":[],"basket_fields":[],"form_fields":[]},"info":{"cr":108,"env":"production","dms":{"gls":"geo.yieldify.com","evc":"b.yieldify.com","rt":"rt-proxy.yieldify.com"},"request_host_with_port":"app.yieldify.com","src":"//d33wq5gej88ld6.cloudfront.net/code_revisions/000/000/108/original/yieldify_1447944648.js?1447944651"}};

  yiel.md = {};

  //load Yieldify here
  if (yiel.info.src) {
    var e = document.createElement('script');
    e.src = yiel.info.src;
    e.async = true;
    document.getElementsByTagName("head")[0].appendChild(e);
  }
}