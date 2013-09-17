'use strict';

// Set variables
var activedTads = [];

// Called when a tab has been updated
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	
	// Get tab status
	var iconState = activedTads.indexOf(tab.id) != -1 ? "" : "-disabled";

	// Set and show the status
	chrome.pageAction.setIcon({path: 'images/icon-38' + iconState + '.png', tabId: tab.id});
  chrome.pageAction.show(tabId);

});


// Called when the user clicks on the browser action.
chrome.pageAction.onClicked.addListener(function(tab) {

	// State inversion
	var state = false;
	if (activedTads.indexOf(tab.id) != -1) {
		// Remove the current tab from the array
		activedTads.splice(activedTads.indexOf(tab.id), 1);
	} else{
		// Add the current tab to the active tab
		activedTads.push(tab.id);
		state = true;
	};

	var iconState = state ? "" : "-disabled";
  chrome.pageAction.setIcon({path: 'images/icon-38' + iconState + '.png', tabId: tab.id});

  chrome.tabs.executeScript(null, {file:"scripts/gest.min.js"});
});
