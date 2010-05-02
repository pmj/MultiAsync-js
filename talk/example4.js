var all_users, all_scores;

function showUserScores() {
	var user_scores = matchScoresToUsers(
		all_scores,
		all_users);
	showScores(user_scores);
}
jQuery.getJSON("/users", function(users) {
	all_users = users;
	showUsers(users);
	if (all_scores) showUserScores();
});
jQuery.getJSON("/scores", function(score_data) {
	all_scores = score_data;
	if (all_users) showUserScores();
});
