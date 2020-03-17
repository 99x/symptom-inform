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

});
