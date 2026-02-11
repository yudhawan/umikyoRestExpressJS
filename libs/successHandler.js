function responseSuccess(data) {
  return {
    status: 202,
    msg: "Created",
    data: data,
  };
}

module.exports = { responseSuccess };
