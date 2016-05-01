var username;

$('.submit-button').click(function () {
  username = $('.name-input').val();
  $('.name-form').hide();
});

$('.option-0').click(function () { sendMessage(0) })
$('.option-1').click(function () { sendMessage(1) })
$('.option-2').click(function () { sendMessage(2) })
$('.option-3').click(function () { sendMessage(3) })
$('.option-4').click(function () { sendMessage(4) })
$('.option-5').click(function () { sendMessage(5) })
$('.option-6').click(function () { sendMessage(6) })
$('.option-7').click(function () { sendMessage(7) })
$('.option-8').click(function () { sendMessage(8) })
$('.option-9').click(function () { sendMessage(9) })
$('.option-10').click(function () { sendMessage(10) })
$('.option-11').click(function () { sendMessage(11) })
$('.option-12').click(function () { sendMessage(12) })

function sendMessage(val) {
  Chat.sendMessage({
    sender: username,
    type: 'color',
    value: val
  });
}

var colorMap = {
  0: 'red',
  1: 'blue', 
  2: 'orange', 
  3: 'purple', 
  4: 'pink',
  5: 'fuchsia',
  6: 'cyan',
  7: 'turquoise',
  8: 'yellow',
  9: 'tan',
  10: 'beige',
  11: 'green',
  12: 'black'
};

Chat.onMessage(function (messageData) {
 var color = colorMap[messageData.value];
  $('body').css({
    backgroundColor: color
  });
});