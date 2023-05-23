function remindMail() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('menu');
  const values = sheet.getDataRange().getValues();
  
  let year = new Date().getFullYear()
  year.toString().padStart(2, '0');
  let month = new Date().getMonth() + 1;
  month = month.toString().padStart(2, '0');
  let toDate = new Date().getDate()+1;
  toDate = toDate.toString().padStart(2, '0');
  let tomorrow = `${year}-${month}-${toDate}`;
  let i = discoverDate(tomorrow,sheet);
  
  const date = values[i][0];
  const day = values[i][1];
  const event = values[i][2];
  const detail = values[i][3];
  const time = values[i][4];
  const place = values[i][5];
  // const daily = values[i][6];
  const addition = values[i][7];
  if(["日", "月", "水", "木"].includes(day)){
    if(event!="休み"){//イレギュラーな休みを想定
      // sendMail(date,day,event,detail,time,place,daily,addition);
      sendMail(date,day,event,detail,time,place,addition);
    }
 }
  
}

function discoverDate(tomorrow,sheet){
  let i;
  for(i=0;i<sheet.getLastRow();i++){
    let a = 'A' + (i + 1);
    let cellValue = sheet.getRange(a).getDisplayValue();
    if(tomorrow==cellValue){
      break;
    }
  }
  return i;
}

// function sendMail(date,day, event, detail, time, place, daily, addition) {
function sendMail(date,day, event, detail, time, place, addition){
  const ss2 = SpreadsheetApp.getActiveSpreadsheet();
  const sheet2 = ss2.getSheetByName('連絡先');
  const values2 = sheet2.getDataRange().getValues();
  const name = values2[4][0];
  const grade = values2[4][1];
  const address = values2[4][3];
  const belongs = values2[4][4];
  const recipient = 'ta282ji@icloud.com';
  const subject = '[Triathlon]明日の練習メニュー';

  let body = `<style>p{margin:0;}</style><html><body><p>${grade}の${name}です。</p>`;
  body += `<p>明日の${event}について連絡します。</p>`;
  body += `<p>明日の${event}は <a href='https://www.youtube.com/'>${detail} </a>をします。<br>${addition}</p>`;

  let runOption = '';
  if (event == "ラン") {
    runOption = "<p>雨の場合はレイヤートレーニングをします。</p>";
  }

  body += runOption;
  body += `<br><br><br><br>`;
  body += `<p>以下詳細です。</p>`;
  body += `-------------------------<br>`;
  body += `種目： ${event}<br>`;
  body += `メイン： <a href='https://www.youtube.com/'>${detail} </a><br>`;
  body += `集合時間： ${time}<br>`;
  body += `集合場所： ${place}<br>`;
  body += `-------------------------<br>`;
  body += `<br>`;
  body += `以上です。<br>`;
  body += `何か質問等がありましたら私まで連絡してください。<br>`;
  body += `-------------------------<br>`;
  body += `${belongs}<br>`;
  body += `${grade} ${name}<br>`;
  body += `email: ${address}<br>`;
  body += `-------------------------</body></html>`;

  MailApp.sendEmail(recipient, subject, '', { htmlBody: body });
}
