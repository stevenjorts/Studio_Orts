//Hide The press any key to begin




var rgb = [];

for(var i = 0; i < 3; i++)
    rgb.push(Math.floor(Math.random() * 255));

document.querySelector("body").style.backgroundColor = 'rgb('+ rgb.join(',') + ')';


// We declare the username variable up here so that we can
// access it after we set it's value in the submit-button
// click handler

var username = '';

function randomString(length, chars) {
    
    for (var i = length; i > 0; --i) username += chars[Math.round(Math.random() * (chars.length - 1))];
    return username;
}
// document.write(randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'));
randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');


// When the user clicks the submit button, we want to save the 
// username they entered, hide the form, and show the color input

// Actually handle user input on our chat options
// This is where we're tying particular values to 
// colors in messages we send.


$(document).keypress(function(e) {
    if(e) {
        $('.start').css('display','none');
    }
});

Mousetrap.bind(['a', 'b', 'c', 'd', '1'], function() { sendMessage(0); });
Mousetrap.bind(['e', 'y', 'tab', 'i', '2'], function() { sendMessage(1); });
Mousetrap.bind(['f', 'u', 'shift', '3'], function() { sendMessage(2); });
Mousetrap.bind(['g', 'i', 'capslock', '4'], function() { sendMessage(3); });
Mousetrap.bind(['h', 'o', 'return', '5'], function() { sendMessage(4); });
Mousetrap.bind(['j', 'p', 'cmd', '6'], function() { sendMessage(5); });
Mousetrap.bind(['k', 's', 'esc', 'space', '7'], function() { sendMessage(6); });
Mousetrap.bind(['l', 'z', 'left', '8'], function() { sendMessage(7); });
Mousetrap.bind(['q', 'x', 'right', '9'], function() { sendMessage(8); });
Mousetrap.bind(['w', 'c', 'up', 'control', '0'], function() { sendMessage(9); });
Mousetrap.bind(['e', 'v', 'down', '='], function() { sendMessage(10); });
Mousetrap.bind(['r', 'n', ']', 'alt', 'plus'], function() { sendMessage(11); });
Mousetrap.bind(['t', 'm', '[', '/', 'delete'], function() { sendMessage(12); });


// This is where the magic happens!!!
// We use the Chat object's `sendMessage` function
// to actually send the message





function sendMessage(value) {
  Chat.sendMessage({
    sender: username,
    type: 'color',
    value: value
  });

}

console.log(username);
// This map of color values makes it easy
// for us to interpret the messages we receive
var colorValues = {
  0: 'blue',
  1: 'red',
  2: 'purple',
  3: 'yellow',
  4: 'cyan',
  5: 'turquoise',
  6: 'green',
  7: 'navy',
  8: 'fuchsia',
  9: 'pink',
  10: 'orange',
  11: 'gold',
  12: 'green'
};

// And here's where we actually handle incoming messages
// For each message we get, we create a new element, label
// it with the message sender's name, and assign classes
// based on its sender and value
Chat.onMessage(function (data) {


if($("#" + data.sender).length) {

$("#" + data.sender).removeClass().addClass('message').addClass(colorValues[data.value]);

} else {
  // Create the message element
  var message = $('<div id="' + data.sender + '"></div>');
  $(message).addClass('message');

  // Here's where we assign the color class. We use the
  // message's value to pull a color from our map of 
  // colors above
  $(message).addClass(colorValues[data.value]);

  // Append message to the container on the page
  $('.message-container').append(message);

}
});

// This is where we handle changes in active user count.
// We're going to lighten the background based on the number
// of users on the page
Chat.onUserCountChange(function (currentCount) {
  // We'll say that maximum lightness happens at 20 users,
  // so we'll treat all counts greater than 20 the same as 20
  if (currentCount > 20) {
    currentCount = 20;
  }

  // How close we are to twenty users determines the lightness.
  // It's a percentage so we multiply by 100.
  var lightness = Math.round((currentCount / 20) * 100);

  // Actually set the background color. HSL is often the easiest
  // color format to use when modifying color dynamically
 
});


var possibleColors = [ 
 'blue',
   'red',
  'purple',
  'yellow',
 'cyan',
  'turquoise',
 'green',
 'navy',
  'fuchsia',
 'pink',
 'orange',
 'gold',
 'green'];

var userColors = {};

Chat.onMessage(function (data) {
  // Try to get a color that corresponds to the message's sender
  var color = userColors[data.sender];
   
  // If we failed to get a color, generate a random color
  // and associate it with the user

    var newColor = possibleColors[Math.floor(Math.random() * possibleColors.length)];
    userColors[data.sender] = newColor;
  
  // Get a list of all of our current user colors
  var workingColors = [];
  for (var key in userColors) {
    workingColors.push(userColors[key]);
  }
  
  // Generate gradient css
  var gradientStyle = 'linear-gradient(0deg,' + workingColors.join(',') + ')';
  console.log(gradientStyle);

  // Actually apply gradient CSS to div
  $('.gradient').css({
    background: gradientStyle
  });
});


