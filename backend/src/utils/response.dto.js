// export const successResponse = (res, message = "Success", data = [], statusCode = 200) => {
//   return res.status(statusCode).json({
//     status: true,
//     statusCode,
//     message,
//     data: Array.isArray(data) ? data : [data],
//   });
// };

// export const errorResponse = (res, message = "Something went wrong", statusCode = 500) => {
//   return res.status(statusCode).json({
//     status: false,
//     statusCode,
//     message,
//     data: [],
//   });
// };

export const successResponse = (res, message = "Success", data = null, statusCode = 200) => {
  return res.status(statusCode).json({
    status: true,
    statusCode,
    message,
    data,
  });
};

export const errorResponse = (res, message = "Something went wrong", statusCode = 500) => {
  return res.status(statusCode).json({
    status: false,
    statusCode,
    message,
    data: null,
  });
};
