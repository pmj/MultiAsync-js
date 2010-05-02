jQuery.getJSON("/users", function(users) {
	// ...
	showUsers(users);
	// ...
});

jQuery.getJSON("/scores", function(score_data) {
	// ...
	var user_scores = matchScoresToUsers(
		score_data,
		users); // uh oh.
	showScores(user_scores);
	// ...
});
