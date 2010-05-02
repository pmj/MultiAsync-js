function showUserScores(users, scores) {
	var user_scores = matchScoresToUsers(
		scores,
		users);
	showScores(user_scores);
}

var handler = new AsyncHandler();
jQuery.getJSON("/users",
	handler.cb(    // generate callback so handler depends on completion
		showUsers)); // additional (immediate) callback
jQuery.getJSON("/scores", handler.cb());

handler.whenDone(showUserScores);