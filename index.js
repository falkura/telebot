var TelegramBot = require("node-telegram-bot-api");
var token = "1152859239:AAG3KuKQLqlRDtfdnY13qpA6GCYek9gU6Ms";
// Включить опрос сервера. Бот должен обращаться к серверу Telegram, чтобы получать актуальную информацию
// Подробнее: https://core.telegram.org/bots/api#getupdates
var bot = new TelegramBot(token, { polling: true });

var userList = [
  { id: 405472080, time: 1597268715, count: 600, name: "@nimzu" },
];

bot.onText(/\/topcumers/, function () {
  var forSort = [];
  for (var i = 0; i < userList.length; i++) {
    forSort.push(userList[i]["id"]);
  }
  //console.log(forSort[0]);
  function BubbleSort(A) {
    // A - массив, который нужно
    // отсортировать по возрастанию.
    var n = A.length;
    for (var i = 0; i < n - 1; i++) {
      for (var j = 0; j < n - 1 - i; j++) {
        if (A[j + 1] < A[j]) {
          var t = A[j + 1];
          A[j + 1] = A[j];
          A[j] = t;
        }
      }
    }
    return A; // На выходе сортированный по возрастанию массив A.
  }
  console.log(BubbleSort(forSort));
});

bot.onText(/\/cum/, function (msg) {
  var chatId = msg.chat.id;
  var chatTitle = msg.chat.title;
  var newChatTitle, vivod;
  var userId = msg.from.id;
  var ssilochka = `${msg.from.first_name} (@${msg.from.username})`;
  var time = msg.date;
  var bulo = false;
  var timeToCum = 300;

  if (chatTitle.indexOf(".Fap count:") > -1) {
    var lastNum = chatTitle.split(":");
    var bef = lastNum[0] + ": ";
    var aft = lastNum[1] ? Number(lastNum[1]) + 1 : 1;
    newChatTitle = bef + aft;
  } else {
    newChatTitle = chatTitle + ".Fap count: 1";
  }

  for (var i = 0; i < userList.length; i++) {
    if (userList[i]["id"] == userId) {
      if (time - userList[i]["time"] > timeToCum) {
        userList[i]["count"] = userList[i]["count"] + 1;
        vivod = `${userList[i]["name"]} подрочил. TF: ${userList[i]["count"]}`;
        userList[i]["time"] = time;
        bot.setChatTitle(chatId, newChatTitle);
      } else {
        var timeLeft = userList[i]["time"] + timeToCum - time;
        var min = timeLeft > 60 ? Math.floor(timeLeft / 60) : false;
        var sec = timeLeft > 60 ? timeLeft % 60 : timeLeft;
        var totalTime = min ? `${min}м. и ${sec}с.` : `${sec}с.`;
        vivod = `${msg.from.first_name}, отдыхай, сможешь подрочть через ${totalTime}`;
      }
      bulo = true;
    }
  }

  if (!bulo) {
    var user = { id: userId, time: time, count: 1, name: ssilochka };
    userList.push(user);
    vivod = `С первым разом, ${user["name"]}`;
    bot.setChatTitle(chatId, newChatTitle);
  }

  bot.sendMessage(chatId, vivod);
});
