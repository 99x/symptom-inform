$.fn.serializeObject = function()
{
   var o = {};
   var a = this.serializeArray();
   $.each(a, function() {
       if (o[this.name]) {
           if (!o[this.name].push) {
               o[this.name] = [o[this.name]];
           }
           o[this.name].push(this.value || '');
       } else {
           o[this.name] = this.value || '';
       }
   });
   return o;
};

$(document).ready(function () {
  // Initialize Progress Bar
  var totalQuestions = ($(".survey-question").length);
  var incrementWidth = 100 / totalQuestions;

  // Progress Bar Update
  $('.survey-question input').click(function () {
    setTimeout(function () {
      var wrapperWidth = $('#progress-wrapper').width();
      var progressWidth = $('#progress-bar').width();
      var currentWidth = (progressWidth / wrapperWidth) * 100;
      var newWidth = currentWidth + incrementWidth;
      var newWidthRounded = newWidth.toFixed();
      $('#progress-bar').css('width', newWidth + '%').attr('data-progress', newWidthRounded);
    }, 500);
  });

  // Initialize questions
  $("#start-survey").click(function () {
    $(this).addClass('remove');
    $('#survey-wrapper').addClass('start');
  });

  $("#q1").click(function () {
    $(this).css({ "display": "none" });
  });

  $("#q2").click(function () {
    $(this).css({ "display": "none" });
  });

  $("#q3").click(function () {
    $('#survey-wrapper').addClass('remove');
    $('#start-survey').addClass('start');
  });

  $("#submit").click(function (e) {
    e.preventDefault();
    var data = $("form").serializeObject();
    $.ajax({
      type: "POST",
      contentType: "application/json;charset=utf-8",
      url: "https://d29l6e9wtrec9i.cloudfront.net/api/submit",
      data: JSON.stringify(data),
      success: function (result) {
        alert('Your information submitted succesfully !');
      }
    });
  });
});