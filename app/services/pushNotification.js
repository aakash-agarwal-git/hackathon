const  admin = require("firebase-admin");
const { errorLogger, infoLogger } = require("../utility/log");

const serviceAccount = JSON.parse(process.env.FirebaseConfig);

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const sendPushNotification = async (data) => {
  infoLogger(
    "sendPushNotification",
    "event begin in the sendPushNotification",
    data
  );

  try {
    const decodedTitle = decodeURIComponent(data.title);
    infoLogger("sendPushNotification", "decodedTitle", decodedTitle);
    const decodedBody = decodeURIComponent(data.body);
    infoLogger("sendPushNotification", "decodedBody", decodedBody);

    const registrationToken = data.tokens;
    let message;

    if (data.imageUrl && data.imageUrl !== "") {
      message = {
        notification: {
          title: decodedTitle,
          body: decodedBody,
        },
        tokens: registrationToken,
        android: {
          priority: "HIGH",
          notification: {
            default_sound: true,
            default_vibrate_timings: true,
            notification_count: 1,
            imageUrl: data.imageUrl,
          },
        },
        apns: {
          payload: {
            aps: {
              "mutable-content": 1,
              badge: 1,
              sound: "bingbong.aiff",
            },
          },
        },
        data: {
          metaData: data.metaData ? data.metaData : "NA",
          image: data.imageUrl,
          mobileNumber: data.mobileNumber ? data.mobileNumber.toString() : "NA",
        },
      };
    } else {
      message = {
        notification: {
          title: decodedTitle,
          body: decodedBody,
        },
        tokens: registrationToken,
        android: {
          priority: "HIGH",
          notification: {
            default_sound: true,
            default_vibrate_timings: true,
            notification_count: 1,
          },
        },
        apns: {
          payload: {
            aps: {
              "mutable-content": 1,
              badge: 1,
              sound: "bingbong.aiff",
            },
          },
        },
        data: {
          metaData: data.metaData ? data.metaData : "NA",
          mobileNumber: data.mobileNumber ? data.mobileNumber.toString() : "NA",
        },
      };
    }

    infoLogger("sendPushNotification", "message", message);

    try {
      const response = await admin.messaging().sendEachForMulticast(message);
      infoLogger("sendPushNotification", "Success response", response);
      return true;
    } catch (error) {
      console.error("Error sending message:", error);
      errorLogger(
        "sendPushNotification",
        "Error in sendPushNotification",
        error
      );

      return false;
    }
  } catch (error) {
    console.error("Error sending message:", error);
    errorLogger("sendPushNotification", "Error in sendPushNotification", error);

    return false;
  }
};

module.exports = sendPushNotification;
