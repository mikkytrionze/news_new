/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
*/ 
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        //	fetch the data from the url
        console.log('Received Event: ' + id);
    }
};



$(document).ready(function () {
	var feed = new Array();
	
	$.mobile.loading('show', {
		text: "Loading News...",
		textVisible: true
	});
	
	var url = "http://hemencoolapp.orgfree.com/gist.me/api_page.php"; //xml page to get the data from
	var tmp_url = "http://127.0.0.1/newsBack/api_page.php";
	$.ajax({
    	type: "GET",
    	url:url,
    	dataType: "xml",
    	crossDomain : true
   }).done(function (data){
    	var $xml = $(data);
    	$xml.find('article').each(function () {
    			//loop through each article
    			var article 	= $(this);
    			var element = new Object();
    			element.title 		= article.find('title').text();
    			element.id			= article.find('id').text();
    			element.link		= article.find('link').text();
    			element.description	= article.find('description').text();
    			element.date		= article.find('date').text();
    			element.image		= article.find('image_url').text();
    			element.site		= article.find('site_name').text();
    			element.img_title	= article.find('image_title').text();
    			
    			element.extra_imgs	= article.find('extra_images');
    			element.images		= [];
    			element.extra_imgs.find('image').each(function () {
    				element.images.push($(this).text());
    			});
    			//
    			if (element.image.toString().length > 0 && element.description.toString().length < 1) {
    				temp = getTemplate(0, element);
    			} else if (element.image.toString().length > 0 && element.description.toString().length > 0) {
    				temp = getTemplate(1, element);
    			} else {
    				temp = getTemplate(2, element);
    			}
    			//navigator.notification.activityStart('', 'Loading News');
    			//console.log(temp);
				$('.content').append(temp);
				//$('.content').listview("refresh");
				
    		});
    		
            $('.content').flip({
                forwardDir: 'btot',
                loop: false,
                height: ((window.innerHeight) * 1)+"px",
                slide: 'slide',
            });
            
            $('.top_image').css({
                top:20,
                left:0,
                width: (window.innerWidth)+"px",
                height: ((window.innerHeight) * 0.40)+"px",
                marginLeft:-1,
            });
            
            $('.overall_image').css({
                top: 0,
                left:0,
                width: (window.innerWidth)+"px",
                height: ((window.innerHeight) * 0.93)+"px"
            });
            
            $('.bottom_title_text').css({
            	marginLeft: -1,
            	padding: 10,
            });
            
            $('.bottom_title_text').attr({
            	width: ((window.innerWidth) * 0.98)+"px",
            	height: ((window.innerHeight) * 0.14)+"px",
            });
            
            $('.blockquoter').css({
    			width: ((window.innerWidth) * 0.9)+"px"
            });
             
            $('.text_header').css({
                marginTop:((window.innerHeight) * 0.80)+"px"
            });
            
            $('.console_bd').css({
                height: 'inherit',
                backgroundColor: '#fff'
            });
            $('.top_image').imgLiquid();
            $('.overall_image').imgLiquid();
            
            $('#text-path').css({
                width:((window.innerWidth) - 25)+"px",
                height:((window.innerHeight) * 0.28)+"px"
            });
            
            $('.blockquoters').css({
            	height:((window.innerHeight) * 0.10)+"px",
            	borderBottom:"3px solid #dedede"
            });
            
            
    }).fail(function(xhr, textStatus, errorThrown) {
		alert(xhr, textStatus.toString());
		console.log(xhr);
		console.log(errorThrown);
	}).always (function() {
		$.mobile.loading("hide");
	});
});

function getTemplate (type, article) {
	
	var flip = "";
	//console.log(article);
	switch (type) {
		case 0:
			if (article.title.toString().length > 110) {
				article.title = article.title.toString().trim();
				article.title = article.title.toString().substr(0, 110)+"...";
			}
			// start: flip option 1
			flip = '<div id="article_'+article.id+'" class="console_bd" style="padding:0px!important;margin:1px 0px!important;">';
				flip += '<div class="topPanel">';
					if (article.site == "Linda ikeji") {
						flip += '<span id="left"> <img src="res/logos/linda-ikeji.jpg" class="linda" /> <span id="right">Linda Ikeji</span></span>';
					} else if (article.site == "BellaNaija") { 
						flip += '<span id="left"> <img src="res/logos/bellanaija-horizontal.png" class="bella" /> </span>';
					} else {
						flip += article.site;
					}
					
				flip += '</div>';
				
				
		        flip += '<div class="overall_image" > <div class="imgLiquidFill imgLiquid" style="height:inherit; width:inherit;">';
		            flip += '<img src="'+article.image+'"  />';
		        flip += '</div></div>';

		        flip += '<div class="text_header extra_header">';
		            flip += '<span class="titles">'+article.title+'</span>';
		            flip += '<p class="text_date">'+article.date+'</p>';
		        flip += '</div>';
		    flip += '</div>';
		    // end: flip option 1 -->
		break;
		
		case 1:
			if (article.description.toString().length > 310) {
				article.description = article.description.toString().trim();
				article.description = article.description.toString().substr(0, 310)+"...";
			}
			
			if (article.title.toString().length > 110) {
				article.title = article.title.toString().trim();
				article.description = article.description.toString().substr(0, 110)+"...";
			}
			 
			 
			// start: flip option 2
			flip = '<div id="article_'+article.id+'" class="console_bd" style="padding:0px!important;margin:1px 0px!important;">';
				flip += '<div class="topPanel">';
					if (article.site == "Linda ikeji") {
						flip += '<span id="left"><img src="res/logos/linda-ikeji.jpg" class="linda" /> <span id="right">Linda Ikeji</span></span>';
					} else if (article.site == "BellaNaija") {
						flip += '<span id="left"><img src="res/logos/bellanaija-horizontal.png" class="bella" /></span>';
					} else {
						flip += article.site;
					}
				flip += '</div>';
				
                flip += '<div class="imtt">';
                    flip += '<div class="top_image" ><div class="" style="height:inherit; width:inherit;">';
                        flip += '<img src="'+article.image+'"  data-imgLiquid-fill="true" data-imgLiquid-horizontalAlign="center" data-imgLiquid-verticalAlign="50%" style="visibility:inherit; height:inherit;" />';
                    flip += '</div></div>';
                    
                    /* start text display */
                    flip += '<div class="bottom_title_text" style="border:1px solid:#000; padding:0px!important;margin:0px 10px 5px 10px!important;">';
                        flip += '<h2 class="headers titles">'+article.title+'</h2>';
                        flip += '<span class="text_date cyan">Posted on '+article.date+'</span>';
						
						if (article.title.toString().length < 110) {
                        	flip += '<blockquote class="text-path blockquoter style="height:85px!important;">';
                        } else {
                       		flip += '<blockquote class="text-path blockquoter" style="height:34px!important;">';
                        }
                            flip += '<span>'+article.description+'</span>';
                        flip += '</blockquote>';
                    flip += '</div>';
                    /* end text display */
                   
                flip += '</div>';    
            flip += '</div>';
            // end: flip option 2 -->
		break;
		
		case 2:
			if (article.description.toString().length > 310) {
				article.description = article.description.toString().trim();
				article.description = article.description.toString().substr(0, 310)+"...";
			} 
			// start: flip option 3
			flip = '<div id="article_'+article.id+'" class="console_bd flipContent" style="padding:0px!important;margin:1px 0px!important;">';
				flip += '<div class="topPanel">';
					if (article.site == "Linda ikeji") {
						flip += '<span id="left"><img src="res/logos/linda-ikeji.jpg" class="linda" /> <span id="right">Linda Ikeji</span></span>';
					} else if (article.site == "BellaNaija") {
						flip += '<span id="left"><img src="res/logos/bellanaija-horizontal.png" class="bella" /></span>';
					} else {
						flip += article.site;
					}
				flip += '</div>';
                flip += '<blockquote class="text-path blockquote_page" style="">';
                    flip += '<h2 class="titles headers">'+article.title+'</h2>';
                    flip += '<span class="text_date cyan">Posted on '+article.date+'</span>';
                    flip += '<p>'+article.description+'</p>';
                flip += '</blockquote>';
            flip += '</div>';
            // end: flip option 3 -->
            
		break;
	}
	return flip;
}
