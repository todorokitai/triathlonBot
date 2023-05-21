function BikeForm(){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('練習内容詳細');
  const values = sheet.getDataRange().getValues();
  const formTitle = values[1][0];
  const formDescription = values[1][1];
  
  const form = FormApp.create(formTitle)
  form.setDescription(formDescription)
  
  const name = form.addTextItem()
            .setTitle("氏名")
            .setRequired(true);
  
  const role = form.addCheckboxItem();
  role.setTitle("参加方法");
  role.setChoices([
    role.createChoice("選手"),
    role.createChoice("マネージャー")
  ]);
  role.setRequired(true);

  const style = form.addCheckboxItem();
  style.setTitle("バイク");
  style.setChoices([
    style.createChoice("部のバイクで参加")
  ]);

  const car = form.addCheckboxItem();
  car.setTitle("車出し");
  car.setChoices([
    car.createChoice("可能")
  ]);

  const remarks = form.addTextItem()
            .setTitle("備考");
}
