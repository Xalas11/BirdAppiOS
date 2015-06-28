/* Notes:
 * - History management is currently done using window.location.hash.  This could easily be changed to use Push State instead.
 * - jQuery dependency for now. This could also be easily removed.
 */
var oldswitch = '';;

function PageSlider(container) {
	
    var container = container,
        currentPage,
        stateHistory = [];

    // Use this function if you want PageSlider to automatically determine the sliding direction based on the state history
    this.slidePage = function(page) {

        var l = stateHistory.length,
            state = window.location.hash;

        if (l === 0) {
            stateHistory.push(state);
            this.slidePageFrom(page);
            return;
        }
        if (state === stateHistory[l-2]) {
            stateHistory.pop();
            this.slidePageFrom(page, 'left');
        } else {
            stateHistory.push(state);
            this.slidePageFrom(page, 'right');
        }

    };

    // Use this function directly if you want to control the sliding direction outside PageSlider
    this.slidePageFrom = function(page, from) {
    	
   		var pagecoutn = 0;
   		if (pagecoutn == 0) {
   			pagecoutn = 1;
   		} else {
   			$("#anticlick").show();
   		}
        container.append(page); // windowsphone .html  find a workaround// android should be append laguage switch... low versions until 4.4!!!

        if (!currentPage || !from) {
            page.attr("class", "page center");
            currentPage = page;
            return;
        }
        // Position the page at the starting position of the animation
        page.attr("class", "page " + from);
		
					// setTimeout(function() {
// 					
					// var hashlang = window.location.hash;
// 					
					// switch(oldswitch) { 
						// case '#detailedPage':
						// $('#detailedPageWarp').remove();
						// console.log("dP");
						// break;
						// case '#about':
						// $('#aboutWarp').remove();
						// console.log("a");
						// break;
						// case '#detailedPageGallery':
						// $('#detailedPageGalleryWarp').remove();
						// console.log("dpg");
						// break;
						// case '#seasonMenu':
						// $('#sPContainer').remove();
						// console.log("seasonMenu");
						// break;
						// case '#seasonMonth':
						// $('#birdListWarp').remove();
						// console.log("seasonMonth");
						// break;
						// case '#name':
						// $('#birdListWarp').remove();
						// console.log("name");
						// break;
						// case '':
						// $('#mPWrap').remove();
						// console.log("main");
						// //page transition center
						// break;
					// };
					// oldswitch = hashlang; 
					// }, 250);
        currentPage.one('transitionEnd webkitTransitionEnd transitionend', function(e) {
            $(e.target).remove();
            $("#anticlick").hide();
        });
        

        // Force reflow. More information here: http://www.phpied.com/rendering-repaint-reflowrelayout-restyle/
        container[0].offsetWidth;

        // Position the new page and the current page at the ending position of their animation with a transition class indicating the duration of the animation
        page.attr("class", "page transition center");
        currentPage.attr("class", "page transition " + (from === "left" ? "right" : "left"));
        currentPage = page;
    };

}