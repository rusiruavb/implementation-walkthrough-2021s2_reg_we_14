class ResponseHandler {
  static sendSuccessRespond(res, data, status = 201) {
    if (data === null) {
      return res.status(404).json({ status: 404, message: 'Data not found.' });
    } else {
      return res.status(status).json(data);
    }
  }

  static sendNotFoundRespond(res, message) {
    return res.status(404).json({ status: 404, message: message });
  }

  static sendErrorRespond(res, error) {
    if (error) {
      return res.status(400).json({ status: 400, message: error });
    } else {
      return res
        .status(500)
        .json({ status: 500, message: 'Internal Server Error' });
    }
  }
}

export default ResponseHandler;
