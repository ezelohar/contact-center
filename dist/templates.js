angular.module('templates-dist', ['../app/views/about.html', '../app/views/calls-item.html', '../app/views/calls-list.html', '../app/views/calls-search.html', '../app/views/info.html']);

angular.module("../app/views/about.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/views/about.html",
    "<div class=\"row\">\n" +
    "	<div class=\"col-md-12\">\n" +
    "		<h2>\n" +
    "			About project page\n" +
    "		</h2>\n" +
    "		<hr />\n" +
    "		<p>\n" +
    "			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque velit turpis, sagittis nec lorem sit amet, lacinia ornare tellus. Ut ligula arcu, convallis et ante eget, tempor vestibulum massa. Nunc eu faucibus libero, nec mollis nulla. Nunc condimentum magna dui, non posuere ex imperdiet sed. Praesent vestibulum sollicitudin lectus, semper suscipit erat iaculis nec. Etiam imperdiet facilisis rutrum. Pellentesque augue tortor, maximus molestie augue ut, malesuada dapibus est. Maecenas pretium ac lacus eu feugiat. Nulla non eleifend dui. Aliquam ac metus quis velit vulputate molestie. Aliquam aliquam ullamcorper orci, vel convallis est iaculis eget. Interdum et malesuada fames ac ante ipsum primis in faucibus. Duis nec nibh sapien. Morbi vel posuere augue. Morbi at iaculis nisl.\n" +
    "		</p>\n" +
    "	</div>\n" +
    "</div>");
}]);

angular.module("../app/views/calls-item.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/views/calls-item.html",
    "<div class=\"row cc-screen-two\">\n" +
    "	<div class=\"col-md-12\">\n" +
    "		<div class=\"row\">\n" +
    "			<div class=\"col-md-8\">\n" +
    "				<h3>\n" +
    "					Evaluation form for call #{{call.callID}}\n" +
    "				</h3>\n" +
    "			</div>\n" +
    "			<div class=\"col-md-4\">\n" +
    "				<audio player-manager preload=\"false\" id=\"audioTag\" controls>\n" +
    "					<source ng-src=\"{{call.callMedias.audioFile |embedUrl}}\" type=\"audio/mp3\"/>\n" +
    "					Your browser does not support the audio element.\n" +
    "				</audio>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "\n" +
    "		<form class=\"form-horizontal\">\n" +
    "			<div class=\"row\">\n" +
    "				<div class=\"col-md-3\">\n" +
    "					Agent Details\n" +
    "				</div>\n" +
    "				<div class=\"col-md-9\">\n" +
    "					<p>\n" +
    "						<b>Agent</b>: {{call.agent.agentName}}, <b>Client</b>: {{call.client.clientName}}, <b>Direction</b>: {{call.callDirection | capitalize}}\n" +
    "					</p>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "			<div class=\"row\">\n" +
    "				<div class=\"col-md-3\">\n" +
    "					Customer Score\n" +
    "				</div>\n" +
    "				<div class=\"col-md-9\">\n" +
    "					<label class=\"radio-inline\" ng-repeat=\"n in [0,1,2,3,4,5,6,7,8,9] track by $index\">\n" +
    "						<input type=\"radio\" ng-model=\"call.evaluation.customerScore\" name=\"customerScore\" id=\"customerScore{{$index}}\"\n" +
    "						       value=\"{{$index+1}}\"> {{$index+1}}\n" +
    "					</label>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "			<div class=\"row\">\n" +
    "				<div class=\"col-md-3\">\n" +
    "					Manger Score\n" +
    "				</div>\n" +
    "				<div class=\"col-md-9\">\n" +
    "					<label class=\"radio-inline\" ng-repeat=\"n in [0,1,2,3,4,5,6,7,8,9] track by $index\">\n" +
    "						<input type=\"radio\" ng-model=\"call.evaluation.managerScore\" name=\"managerScore\" id=\"managerScore{{$index}}\"\n" +
    "						       value=\"{{$index+1}}\"> {{$index+1}}\n" +
    "					</label>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "			<div class=\"row\">\n" +
    "				<div class=\"col-md-3\">\n" +
    "					Improvement\n" +
    "				</div>\n" +
    "				<div class=\"col-md-9\">\n" +
    "					<select class=\"form-control\" id=\"filter_than\" ng-model=\"call.evaluation.improvement\"\n" +
    "						name=\"filter_than\">\n" +
    "						<option value=\"hard skills ­ products\">hard skills ­ products</option>\n" +
    "						<option value=\"soft skills ­ communication\">soft skills ­ communication</option>\n" +
    "						<option value=\"call technique\">call technique</option>\n" +
    "					</select>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "			<div class=\"row\">\n" +
    "				<div class=\"col-md-3\">\n" +
    "					Resume\n" +
    "				</div>\n" +
    "				<div class=\"col-md-9\">\n" +
    "					<textarea class=\"form-control\" rows=\"3\" ng-model=\"call.evaluation.resume\"></textarea>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "			<div class=\"row\">\n" +
    "				<div class=\"col-md-3 col-md-offset-9 text-right\">\n" +
    "					Total Score {{( + + call.evaluation.managerScore + + call.evaluation.customerScore)/2}}\n" +
    "				</div>\n" +
    "			</div>\n" +
    "\n" +
    "			<div class=\"row\">\n" +
    "				<div class=\"col-md-12\">\n" +
    "					<button type=\"submit\" class=\"btn btn-success\" ng-click=\"updateItem()\">Update\n" +
    "					</button>\n" +
    "					<button type=\"submit\" class=\"btn btn-warning\" back>Cancel\n" +
    "					</button>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "\n" +
    "		</form>\n" +
    "	</div>\n" +
    "</div>");
}]);

angular.module("../app/views/calls-list.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/views/calls-list.html",
    "<div class=\"row cc-screen-one\" id=\"main\">\n" +
    "	<div class=\"col-md-12\">\n" +
    "		<div class=\"row\">\n" +
    "			<div class=\"col-md-3\">\n" +
    "				<h3>\n" +
    "					Call list\n" +
    "				</h3>\n" +
    "			</div>\n" +
    "			<div class=\"col-md-9\">\n" +
    "				<h5>\n" +
    "					<audio player-manager preload=\"false\" id=\"audioTag\" controls\n" +
    "					       data-player=\"{{playerSettings.playerID}}\">\n" +
    "						<source ng-src=\"{{playerSettings.callMp3 |embedUrl}}\" type=\"audio/mp3\"/>\n" +
    "						Your browser does not support the audio element.\n" +
    "					</audio>\n" +
    "				</h5>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		<hr />\n" +
    "		<div class=\"row\">\n" +
    "			<div class=\"col-md-3\">\n" +
    "				<form class=\"form-horizontal\">\n" +
    "					<div class=\"form-group\">\n" +
    "						<label for=\"filter_agent_id\" class=\"col-sm-3 control-label\">Search</label>\n" +
    "						<div class=\"col-sm-9\">\n" +
    "							<input type=\"text\" class=\"form-control\"\n" +
    "							       id=\"search_box\" name=\"search_box\" ng-model=\"searchText\"\n" +
    "							       placeholder=\"Type to search calls...\">\n" +
    "						</div>\n" +
    "					</div>\n" +
    "					<hr />\n" +
    "					<h5>Filters</h5>\n" +
    "					<div class=\"form-group\">\n" +
    "						<label for=\"filter_agent_id\" class=\"col-sm-3 control-label\">Agent\n" +
    "							ID</label>\n" +
    "\n" +
    "						<div class=\"col-sm-9\">\n" +
    "							<input type=\"text\" class=\"form-control\"\n" +
    "							       id=\"filter_agent_id\" name=\"filter_agent_id\" ng-model=\"search.agentID\"\n" +
    "							       placeholder=\"Agent ID\">\n" +
    "						</div>\n" +
    "					</div>\n" +
    "					<div class=\"form-group\">\n" +
    "						<label for=\"filter_score\"\n" +
    "						       class=\"col-sm-3 control-label\">Score</label>\n" +
    "\n" +
    "						<div class=\"col-sm-9\">\n" +
    "							<input type=\"number\" class=\"form-control\" step=\"any\"\n" +
    "							       id=\"filter_score\" name=\"filter_score\" ng-model=\"search.score\"\n" +
    "							       placeholder=\"Score\" min=\"0\">\n" +
    "						</div>\n" +
    "					</div>\n" +
    "					<div class=\"form-group\">\n" +
    "						<label for=\"filter_duration\"\n" +
    "						       class=\"col-sm-3 control-label\">Duration (min)</label>\n" +
    "\n" +
    "						<div class=\"col-sm-9\">\n" +
    "							<input type=\"number\" class=\"form-control\"\n" +
    "							       id=\"filter_duration\" name=\"filter_duration\" ng-model=\"search.duration\"\n" +
    "							       placeholder=\"Minutes\" min=\"0\">\n" +
    "						</div>\n" +
    "					</div>\n" +
    "					<div class=\"form-group\">\n" +
    "						<label for=\"filter_days_ago\" class=\"col-sm-3 control-label\">Call\n" +
    "							Age (days)</label>\n" +
    "\n" +
    "						<div class=\"col-sm-9\">\n" +
    "							<input type=\"number\" class=\"form-control\" ng-model=\"search.callAgo\"\n" +
    "							       id=\"filter_days_ago\"\n" +
    "							       name=\"filter_days_ago\" placeholder=\"Days\" min=\"0\">\n" +
    "						</div>\n" +
    "					</div>\n" +
    "					<div class=\"form-group\">\n" +
    "						<div class=\"col-sm-12 text-right\">\n" +
    "							<button type=\"submit\" class=\"btn btn-success\" ng-click=\"searchAction(search)\">Apply Filters\n" +
    "							</button>\n" +
    "							<button type=\"submit\" class=\"btn btn-warning\" ng-click=\"resetFilter()\">Reset\n" +
    "							</button>\n" +
    "						</div>\n" +
    "					</div>\n" +
    "				</form>\n" +
    "			</div>\n" +
    "			<div class=\"col-md-9 relative {{loading}}\">\n" +
    "				<div class=\"loader\">\n" +
    "					<img src=\"assets/images/ajax-loaderBIG.gif\" />\n" +
    "				</div>\n" +
    "				<table class=\"table table-striped\">\n" +
    "					<thead>\n" +
    "					<tr>\n" +
    "						<th>ID</th>\n" +
    "						<th>Type</th>\n" +
    "						<th>Direction</th>\n" +
    "						<th>Time of occurrence</th>\n" +
    "						<th>Identification</th>\n" +
    "						<th>Duration</th>\n" +
    "						<th>Score</th>\n" +
    "						<th>Actions</th>\n" +
    "					</tr>\n" +
    "					</thead>\n" +
    "					<tbody>\n" +
    "					<tr dir-paginate=\"call in calls | filter:searchText | itemsPerPage: 25\" pagination-id=\"call\">\n" +
    "						<td>{{call.callID}}</td>\n" +
    "						<td>{{call.callType | capitalize}}</td>\n" +
    "						<td>{{call.callDirection | capitalize}}</td>\n" +
    "						<td><span am-time-ago=\"call.callEnd\"></span></td>\n" +
    "						<td>{{call.callDirection === 'inbound' ? 'Client:' + call.client.clientName : 'Agent:' +\n" +
    "							call.agent.agentName}}\n" +
    "						</td>\n" +
    "						<td>{{call.timeDifference}} minute</td>\n" +
    "						<td>\n" +
    "							<span ng-class=\"{red: (call.evaluation.totalScore < 5), yellow: (call.evaluation.totalScore > 4 && call.evaluation.totalScore < 9), green: (call.evaluation.totalScore > 8)}\">\n" +
    "								{{call.evaluation.totalScore}}\n" +
    "							</span></td>\n" +
    "						<td>\n" +
    "							<button type=\"button\" id=\"play_{{call.callID}}\"\n" +
    "								class=\"btn btn-primary player-control\"\n" +
    "								play=\"setPlay(call.callMedias.audioFile, call.callID)\"\n" +
    "								data-call-id=\"{{call.callID}}\">\n" +
    "								<span class=\"playing\">Pause</span>\n" +
    "								<span class=\"paused\">Play</span>\n" +
    "							</button>\n" +
    "							<a type=\"button\" class=\"btn btn-info\" ng-href=\"#/call/{{call.callID}}\">Evaluate</a>\n" +
    "						</td>\n" +
    "					</tr>\n" +
    "					</tbody>\n" +
    "				</table>\n" +
    "				<div class=\"row\" ng-hide=\"calls.length\">\n" +
    "					<div class=\"col-md-12\">\n" +
    "						<p>No data to show. Please adjust your filters</p>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "				<dir-pagination-controls pagination-id=\"call\" ></dir-pagination-controls>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "\n" +
    "	</div>\n" +
    "</div>");
}]);

angular.module("../app/views/calls-search.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/views/calls-search.html",
    "");
}]);

angular.module("../app/views/info.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/views/info.html",
    "<div class=\"row\">\n" +
    "	<div class=\"col-md-12\">\n" +
    "		<h2>\n" +
    "			Info project page\n" +
    "		</h2>\n" +
    "		<hr />\n" +
    "		<p>\n" +
    "			List of calls made by agents working for Zoom IT\n" +
    "		</p>\n" +
    "	</div>\n" +
    "</div>");
}]);
