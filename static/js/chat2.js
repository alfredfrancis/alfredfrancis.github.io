/**
 * Created by alfred on 1/1/17.
 */
class Messenger {
  constructor() {
    this.messageList = [];
    this.deletedList = [];

    this.me = 1; // completely arbitrary id
    this.them = 5; // and another one

    this.onRecieve = (message) => console.log('Recieved: ' + message.text);
    this.onSend = (message) => console.log('Sent: ' + message.text);
    this.onDelete = (message) => console.log('Deleted: ' + message.text);
  }

  send(text = '') {
    text = this.filter(text);

    if (this.validate(text)) {
      let message = {
        user: this.me,
        text: text,
        time: new Date().getTime()
      };

      this.messageList.push(message);

      this.onSend(message);
    }
  }

  recieve(text = '') {
    text = this.filter(text);

    if (this.validate(text)) {
      let message = {
        user: this.them,
        text: text,
        time: new Date().getTime()
      };

      this.messageList.push(message);

      this.onRecieve(message);
    }
  }

  delete(index) {
    index = index || (this.messageLength - 1);

    let deleted = this.messageLength.pop();

    this.deletedList.push(deleted);
    this.onDelete(deleted);
  }

  filter(input) {
    let output = input.replace('bad input', 'good output'); // such amazing filter there right?
    return output;
  }

  validate(input) {
    return !!input.length; // an amazing example of validation I swear.
  }
}

class BuildHTML {
  constructor() {
    this.messageWrapper = 'message-wrapper';
    this.circleWrapper = 'circle-wrapper';
    this.textWrapper = 'text-wrapper';

    this.meClass = 'me';
    this.themClass = 'them';
  }

  _build(text, who) {
    return `<div class="${this.messageWrapper} ${this[who + 'Class']}">
              <div class="${this.circleWrapper} animated bounceIn"></div>
              <div class="${this.textWrapper}">...</div>
            </div>`;
  }

  me(text) {
    return this._build(text, 'me');
  }

  them(text) {
    return this._build(text, 'them');
  }
}

$(document).ready(function() {
  let messenger = new Messenger();
  let buildHTML = new BuildHTML();

  let $input = $('#input');
  let $send = $('#send');
  let $content = $('#content');
  let $inner = $('#inner');

  function safeText(text) {
    $content.find('.message-wrapper').last().find('.text-wrapper').text(text);
  }

  function animateText() {
    setTimeout(() => {
      $content.find('.message-wrapper').last().find('.text-wrapper').addClass('animated fadeIn');
    }, 350)
  }

  function scrollBottom() {
    $($inner).animate({
      scrollTop: $($content).offset().top + $($content).outerHeight(true)
    }, {
      queue: false,
      duration: 'ease'
    });
  }

  function buildSent(message) {
    console.log('sending: ', message.text);

    $content.append(buildHTML.me(message.text));
    safeText(message.text);
    animateText();

    scrollBottom();
  }

  function buildRecieved(message) {
    console.log('recieving: ', message.text);

    $content.append(buildHTML.them(message.text));
    safeText(message.text);
    animateText();

    scrollBottom();
  }

  function sendMessage() {
    let text = $input.val();
    messenger.send(text);

    $input.val('');
    $input.focus();
  }

  messenger.onSend = buildSent;
  messenger.onRecieve = buildRecieved;

  setTimeout(() => {
    messenger.recieve('Hello there!');
  }, 1500);

  setTimeout(() => {
    messenger.recieve('Do you like this? If so check out more on my page...');
  }, 5000);

  setTimeout(() => {
    messenger.recieve('Or maybe just give it a like!');
  }, 7500);

  $input.focus();

  $send.on('click', function(e) {
    sendMessage();
  });

  $input.on('keydown', function(e) {
    let key = e.which || e.keyCode;

    if (key === 13) { // enter key
      e.preventDefault();

      sendMessage();
    }
  });
});