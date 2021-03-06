/* 
 * @name: gest.js
 * @description: gest.js is a webcam based gesture recognition library that helps developers make webpages more immersive.
 * @version: 0.4.3
 * @author: Hadi Michael (http://hadi.io)
 * @acknowledgements: gest.js is an extension of work started by William Wu (https://github.com/wvvvw)
 * @license: MIT License
 */

window.gest=function(e){function L(e,t,n){e=e/255;t=t/255;n=n/255;var r=Math.max(e,t,n);var i=Math.min(e,t,n);var s,o,u=r;var a=r-i;o=r===0?0:a/r;if(r==i){s=0}else{switch(r){case e:s=(t-n)/a+(t<n?6:0);break;case t:s=(n-e)/a+2;break;case n:s=(e-t)/a+4;break;default:break}s/=6}return[s,o,u]}function j(e){var n={x:e.x/e.d,y:e.y/e.d,d:e.d};H=.9*H+.1*n.d;var r=n.d-H,i=r>D;switch(B){case 0:if(i){B=1;M={x:n.x,y:n.y,d:n.d}}break;case 1:B=2;var s=n.x-M.x,o=n.y-M.y;var u=Math.abs(o)<Math.abs(s);if(s<-_&&u){m({direction:"Left",left:true})}else if(s>_&&u){m({direction:"Right",right:true})}if(o>_&&!u){if(r>P){m({direction:"Long down",down:true})}else{m({direction:"Down",down:true})}}else if(o<-_&&!u){if(r>P){m({direction:"Long up",up:true})}else{m({direction:"Up",up:true})}}U('<span style="line-height: 80px; vertical-align: middle;">'+t.direction+"</span>",50);break;case 2:if(!i){B=0}break;default:break}}var t={};navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia;var n={framerate:25,videoCompressionRate:5,debug:false,locked:false};var i=false;var s=false;var o;var u,f,l,c,h,p,d=0,v=0;var m=function(r){t.direction=r.direction||null;t.up=r.up||false;t.down=r.down||false;t.left=r.left||false;t.right=r.right||false;t.error=r.error||null;if((t.up||t.down||t.left||t.right)&&n.locked){if(n.debug){console.log("Locked. Gesture skipped.")}return false}else{n.locked=true;setTimeout(function(){n.locked=false},gest.options.locking)}try{if(e.createEventObject){return e.fireEvent("on"+t.eventType,t)}else{return e.dispatchEvent(t)}}catch(i){console.error(i);console.log(t);return false}};gest=function(){function r(){e.removeEventListener("DOMContentLoaded",r,false);window.removeEventListener("load",r,false);if(e.createEventObject){t=e.createEventObject();t.eventType="gest"}else{t=e.createEvent("Event");t.initEvent("gest",true,true)}if(y()){i=true}if(s&&i){return gest.start()}else{return i}}this.options={skinFilter:false,messages:true,locking:0,debug:function(e){n.debug=e;if(e){c.setAttribute("style","visibility: visible; position: fixed; left: 0; top: 0; width: 100%; height: 100%; opacity: 1;")}else{c.setAttribute("style","visibility: hidden; position: fixed; left: 0; top: 0; width: 100%; height: 100%; opacity: 1;")}return n.debug}};if(e.readyState==="complete"){r()}else{e.addEventListener("DOMContentLoaded",r,false);window.addEventListener("load",r,false)}return true};var y=function(){p=e.createElement("div");e.body.appendChild(p);if(!navigator.getUserMedia){F(0);return false}u=e.createElement("video");u.width=300;u.setAttribute("style","visibility: hidden;");e.body.appendChild(u);f=e.createElement("canvas");f.setAttribute("style","width: 300px; display: none;");e.body.appendChild(f);l=f.getContext("2d");c=e.createElement("canvas");c.setAttribute("style","visibility: hidden;");e.body.appendChild(c);h=c.getContext("2d");return true};gest.prototype.start=function(){s=true;if(!navigator.getUserMedia||!i){return false}if(!u||!(u.paused||u.ended||u.seeking||u.readyState<u.HAVE_FUTURE_DATA)){F(2);return false}if(navigator.getUserMedia){navigator.getUserMedia({audio:false,video:true},function(e){o=e;window.URL=window.URL||window.webkitURL;u.src=window.URL.createObjectURL(o);u.addEventListener("canplaythrough",function(){u.play();d=Math.floor(u.videoWidth/n.videoCompressionRate);v=Math.floor(u.videoHeight/n.videoCompressionRate);setInterval(w,1e3/n.framerate);U("The force is strong with you. <br />Go forth and gesture!")})},function(e){if(e.PERMISSION_DENIED){F(10,e)}else if(e.NOT_SUPPORTED_ERROR){F(11,e)}else if(e.MANDATORY_UNSATISFIED_ERROR){F(12,e)}else{F(13,e)}})}else{F(0)}return!!navigator.getUserMedia};gest.prototype.stop=function(){if(!navigator.getUserMedia){return false}if(u){u.src=""}return!!o.stop()};var w=function(){f.width=d;c.width=d;f.height=v;c.height=v;l.drawImage(u,d,0,-d,v);var e=l.getImageData(0,0,d,v);h.putImageData(e,0,0);if(gest.options.skinFilter){O(k(e),150)}else{O(e,150)}};var E=0,S=.1,x=.3,T=1,N=.4,C=1;var k=function(e){skin_filter=l.getImageData(0,0,d,v);var t=skin_filter.width*skin_filter.height;var n=t*4;var i=0;for(var s=0;s<v;s++){for(var o=0;o<d;o++){n=o+s*d;r=e.data[i];g=e.data[i+1];b=e.data[i+2];a=e.data[i+3];hsv=L(r,g,b);if((hsv[0]>E&&hsv[0]<S||hsv[0]>.59&&hsv[0]<1)&&hsv[1]>x&&hsv[1]<T&&hsv[2]>N&&hsv[2]<C){skin_filter[i]=r;skin_filter[i+1]=g;skin_filter[i+2]=b;skin_filter[i+3]=a}else{skin_filter.data[i]=255;skin_filter.data[i+1]=255;skin_filter.data[i+2]=255;skin_filter.data[i+3]=0}i=n*4}}return skin_filter};var A=false;var O=function(e,t){delt=l.createImageData(d,v);if(A!==false){var n=0,r=0,i=0,s=delt.width*delt.height,o=s*4;while(o-=4){var u=Math.abs(e.data[o]-A.data[o])+Math.abs(e.data[o+1]-A.data[o+1])+Math.abs(e.data[o+2]-A.data[o+2]);if(u>t){delt.data[o]=255;delt.data[o+1]=0;delt.data[o+2]=0;delt.data[o+3]=255;i+=1;n+=o/4%d;r+=Math.floor(o/4/delt.height)}else{delt.data[o]=e.data[o];delt.data[o+1]=e.data[o+1];delt.data[o+2]=e.data[o+2];delt.data[o+3]=e.data[o+3]}}}if(i){j({x:n,y:r,d:i})}A=e;h.putImageData(delt,0,0)};var M=false,_=2,D=300,P=1e3,H=0,B=0;var F=function(e,t){switch(e){case 0:_error={code:e,message:"Your web browser does not support gest.js :( <br />Try using Google Chrome."};break;case 1:_error={code:e,message:"gest.js could not start."};break;case 2:_error={code:e,message:"gest.js has already started."};break;case 10:_error={code:e,message:"DEEEENIED! The user denied permission to use a media device required for the operation.",obj:t};break;case 11:_error={code:e,message:"A constraint specified is not supported by the web browser.",obj:t};break;case 12:_error={code:e,message:"No media tracks of the type specified in the constraints are found.",obj:t};break;case 13:_error={code:e,message:"Couldn't get user media.",obj:t};break;default:_error=null;break}if(n.debug){console.error(_error)}U(_error.message,4e3);m({error:_error})};var I=null,q=null,R=false;var U=function(t,n){if(!gest.options.messages||!t){return false}if(R){R=true;return false}var r=n||2500;window.clearTimeout(I);window.clearInterval(q);var i='visibility: visible; position: fixed; left: 50%; top: 40%; min-height: 80px; margin-top: -50px; padding: 10px; background-color: #222222; border-radius: 10px; z-index: 100; font: normal 15px/1.1 "Helvetica Neue", Helvetica, Arial, sans-serif; color: #FFFFFF; font-size: 35px; text-align: center;';if(e.width>767||window.innerWidth>767){i+="margin-left: -250px; width: 500px"}else{i+="margin-left: -40%; width:80%; min-width: 250px"}var s=1;p.innerHTML=t;p.setAttribute("style",i);I=window.setTimeout(function(){q=window.setInterval(function(){if(s-.1<=0){window.clearInterval(q);p.setAttribute("style","visibility: hidden")}else{s-=.05;p.setAttribute("style","opacity: "+s+";"+i)}R=false},40)},r);if(r>=2e3){R=true}return true};return new gest}(document)


if (typeof jQuery != 'undefined') {
    // jQuery is not loaded
    console.log("Load jQuery");
    document.body.appendChild(document.createElement('script')).src='//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js';
}

var disabled = false;

document.addEventListener('gest', function(gesture) {
	if (gesture.up && !disabled) {
		
		console.log("upper");
		$('html, body').animate({  
        scrollTop: $(window).scrollTop() + 300
    }, 'slow'); 
		
		disabled = true;
		setTimeout(function() {
			disabled = false;
		}, 1000);

	} else if (gesture.down && !disabled) {
		
		console.log("down");
		$('html, body').animate({  
        scrollTop: $(window).scrollTop() - 300
    }, 'slow'); 

		disabled = true;
		setTimeout(function() {
			disabled = false;
		}, 1000);
		
	}
}, false);

gest.options.messages = false;
gest.options.locking = 500;
gest.start();