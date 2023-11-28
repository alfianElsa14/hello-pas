exports.handleServerError = (res) => {
    return res.status(500).json({ message: 'Internal server error' });
};
  
exports.handleClientError = (res, status, message) => {
    return res.status(status).json({ message });
};

exports.handleValidationError = (res, error) => {
    res.status(400).json({ status: 'Validation Failed', message: error.details[0].message });
};

exports.handleExistingRecordError = (res, message) => {
    res.status(400).json({ status: 'Error', message });
};

exports.handleLoginError = (res) => {
    res.status(404).json({ status: 'Error', message: `Invalid Email or Password` });
};

exports.handleNotFoundError = (res, data) => {
    res.status(404).json({ status: 'Error', message: `${data} tidak ditemukan` });
};

  