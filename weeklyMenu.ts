function tomorrowMenu() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet_menu = ss.getSheetByName('menu');
  const values_menu = sheet_menu.getDataRange().getValues();

  let today_i;
  for(let i=0;i<values_menu.length;i++){
    if(edit_today()==values_menu[i][0]){
      today_i=i;
      break;
    }
  }
  const tomorrow_i=today_i+1;
  
  const date = values_menu[tomorrow_i][0];
  const day = values_menu[tomorrow_i][1];
  const event = values_menu[tomorrow_i][2];
  const detail = values_menu[tomorrow_i][3];
  const time = values_menu[tomorrow_i][4];
  const place = values_menu[tomorrow_i][5];
  const add_message = values_menu[tomorrow_i][6];
  const url = values_menu[tomorrow_i][7]

  tomorrowMail(ss,date,day,event,detail,time,place,add_message,url);
}

function edit_today(){//year/month/dayにする関数
  const d = new Date();
  let d_data=[];
  d_data[0] = d.getFullYear();
  d_data[1] = String(d.getMonth() + 1).padStart(2, '0');
  d_data[2] = String(d.getDate()).padStart(2, '0'); 
  const formattedDate = `${d_data[0]}/${d_data[1]}/${d_data[2]}`;
  return formattedDate;
}

function tomorrowMail(ss,date,day,event,detail,time,place,add_message,url){
  const sheet_contact = ss.getSheetByName('contact');
  const values_contact = sheet_contact.getDataRange().getValues();
  const name = values_contact[4][0];
  const grade = values_contact[4][1];
  const address = values_contact[4][3];
  const belongs = values_contact[4][4];
  const recipient = 'ta282ji@icloud.com';
  const subject = '[Triathlon]明日の練習メニュー';

  let body = `<style>p{margin:0;}</style><html><body><p>${grade}の${name}です。</p>`;
  body += `<p>明日の${event}について連絡します。</p>`;
  body += `<p>明日の${event}は <a href="${url}">${detail} </a>をします。<br>${add_message}</p>`;

  let runOption = '';
  if (event == "ラン") {
    runOption = "<p>雨の場合はレイヤートレーニングをします。</p>";
  }

  body += runOption;
  body += `<br><br><br><br>`;
  body += `<p>以下詳細です。</p>`;
  body += `-------------------------<br>`;
  body += `種目： ${event}<br>`;
  body += `メイン： <a href='${url}'>${detail} </a><br>`;
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
  if(event!="休み"){
    MailApp.sendEmail(recipient, subject, '', { htmlBody: body });
  }
}
