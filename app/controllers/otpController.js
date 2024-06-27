const otpService = require('../services/otpService');

async function sendOTP(req, res) {
  try {
    if(!req.body.mobile || !req.body.userId) {
      return res.status(400).json({ message: 'Mobile or userId is required' });
    }
    const otpPayload = buildSendOTPPayload(req.body);
    const sendOTPDbResponse = await otpService.createOTPData(req, otpPayload);

    if (!sendOTPDbResponse) {
      return res.status(500).json({ message: 'Failed to send OTP' });
    }
    const communicationServiceResult = await sendOTP_CommunicationService(sendOTPDbResponse);
    if (!communicationServiceResult) {
      return res.status(500).json({ message: 'Failed to send OTP' });
    }
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}

function buildSendOTPPayload(body) {
  const currentTime = new Date();
  currentTime.setMinutes(currentTime.getMinutes() + 15);

  const payload = {
    userId: body.userId,
    mobile: body.mobile,
    otp: Math.floor(1000 + Math.random() * 9000),
    expiryDate: currentTime,
    retryCount: 3,
  };
  return payload;
}

async function sendOTP_CommunicationService(data) {
  const communicationUrl = 'https://alpha10bn.tataaig.com/lambda/uat-communication/sendMessage';
  const communicationToken = '987854321ABCDF28887654321ABCDF39THJHFJFFF5567HJGJ666KHFDF4347';
  const commonParameters = {
    parameter: {
      title: {},
      body: {
        name: data.userId,
        otp: data.otp,
      },
    },
  };

  let body = {};
  
    body = {
      ...commonParameters,
      sms: {
        name: data.name,
        templateKey: TEMPLATE_KEY.mobileOTP,
        mobile: data.sendTo,
      },
    };
  

  const request = this.http.post(`${communicationUrl}`, body, {
    headers: {
      'Content-Type': 'application/json',
      token: communicationToken,
      json: true,
    },
  });

  const response = await lastValueFrom(request);
  return response.data;
}

async function verifyOTP(req, res) {
  try {
    if(!req.body.mobile || !req.body.otp || !req.body.userId) {
      return res.status(400).json({ message: 'Mobile or userId or otp is required' });
    }
    const verifyOTPDbResponse = await verifyOTPData(req);
      if (verifyOTPDbResponse?._id == undefined) {
        return res.status(500).json({ message: 'Failed to verify OTP' });
      }
      let count = verifyOTPDbResponse.retryCount;

      if (count == 0) {
        return {
          result: false,
          message: 'You have exhausted the permissible number of retries',
          code: 100,
        };
      }
      if (verifyOTPDbResponse.otp != req.body.otp) {
        count = verifyOTPDbResponse.retryCount - 1;
        console.log(verifyOTPDbResponse);
        const updatedDocument = updateOTPData(req.body, count);
        
        if (!updatedDocument._id) {
          throw new Error('Failed to update otp data in db');
        }
        if (count == 0) {
          //this.logger.info('verify OTP', 'You have exhausted the permissible number of retries');
          return {
            result: false,
            message: 'You have exhausted the permissible number of retries',
            code: 100,
            key,
          };
        }
        //this.logger.info('verify OTP', `You have ${count} more attempts left`);
        return { result: false, message: `You have ${count} more attempts left`, code: 101, key };
      }
      const currentTime = new Date();
      const difference = moment(verifyOTPDbResponse.expiryDate).diff(currentTime);

      if (difference < 0) {
        //this.logger.info('verify OTP', 'The OTP has expired');
        return { result: false, message: 'The OTP has expired', code: 102, key };
      }

      //this.logger.info('verify OTP', 'The OTP has been verified');
      return { result: true, message: 'The OTP has been verified', code: 103, key };
    } catch (error) {
      //this.logger.error('verify OTP', 'Error in verify OTP');
      throw error;
    }
}

module.exports = {
  sendOTP,
  verifyOTP
};
