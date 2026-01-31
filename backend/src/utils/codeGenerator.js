// export const generateCode = async (Model, prefix) => {
//   const count = await Model.countDocuments();
//   return `${prefix}-${count + 1}`;
// };

export const generateCode = async (Model, prefix) => {
  let code;
  let exists = true;

  while (exists) {
    const random = Math.floor(1000 + Math.random() * 9000);
    code = `${prefix}-${random}`;
    exists = await Model.exists({ bugCode: code });
  }

  return code;
};
