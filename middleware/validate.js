// const getField = (req, paresedField) => {
//   let value = req.body;
//   paresedField.forEach((element) => {
//     value = req.body[entry][element];
//   });
//   return value;
// };
const getField = (req, paresedField) => {
   let  value = req.body[paresedField[0]][paresedField[1]] || {};
  return value;
};

function parseField(field) {
  return field.split(/\[|\]/).filter((s) => s);
}

exports.required = (field) => {
  let parsedField = parseField(field);
  return (req, res, next) => {
    if (getField(req, parsedField)) {
      next();
    } else {
      res.error(`Поле ${field.join(" ")} не заполнено`); // готовит сообщение пользователю
      res.redirect("back");
    }
  };
};

exports.lengthAbove = (field, len) => {
  field = parseField(field);
  return (req, res, next) => {
    if (getField(req, field).length > len) {
      next();
    } else {
      res.error(`Поле ${field.join(" ")} должно быть более 4 знаков`); // готовит сообщение пользователю
      res.redirect("back");
    }
  };
};
