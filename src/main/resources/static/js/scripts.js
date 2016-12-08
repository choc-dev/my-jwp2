String.prototype.format = function() {
	var args = arguments;
	return this.replace(/{(\d+)}/g, function(match, number) {
		return typeof args[number] != 'undefined' ? args[number] : match;
	});
};

$(".answer-write input[type='submit']").click(addAnswer);

function addAnswer(e) {
	console.log('click answer button!');
	e.preventDefault();

	var url = $(".answer-write").attr("action");
	console.log("url : " + url);

	var queryString = $(".answer-write").serialize();
	console.log("query : " + queryString);

	$.ajax({
		type : 'post',
		url : url,
		data : queryString,
		dataType : 'json',
		error : function() {
			console.log('fail!');
		},
		success : function(data) {
			console.log(data);
			var answerTemplate = $("#answerTemplate").html();
			var template = answerTemplate.format(data.writer.userId,
					data.formattedCreateDate, data.contents, data.question.id, data.question.id,
					data.id);
			$(".qna-comment-slipp-articles").prepend(template);
			$("textarea[name=contents]").val("");
		}
	})
}

$(".link-delete-answer").click(deleteAnswer);

function deleteAnswer(e) {
	console.log('click delete button!');
	e.preventDefault();

	var url = $(".form-delete-answer").attr("action");
	console.log("url : " + url);

	var queryString = $(".form-delete").serialize();
	console.log("query : " + queryString);

	var deleteTarget = $(this).closest('article');
	
	$.ajax({
		type : 'delete',
		url : url,
		data : queryString,
		dataType : 'json',
		error : function() {
			console.log('fail!');
		},
		success : function(data) {
			console.log("this : " , data);
			deleteTarget.remove();
		}
	})
}

