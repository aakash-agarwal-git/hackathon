const express = require("express");
const sendPushNotification = require("../services/pushNotification");
const sendNotification = require("../services/sendSmsService");

const router = express.Router();

router.get("/testPN", async (req, res) => {
  try {
    const resp = await sendPushNotification({
      tokens: [
        "cCMYOXURTqG7M6cLWTNnw0:APA91bEgwaVSFJ6sb4Us4H3m8OkSRlqkLZkfczmYnhv0_CGCwb8AP1tFyny2PO6lc1Jb44Kbmt6OoqiXdiDBtXhPvSEa-11UOc96mdXLZ9lVc5MhNEQdF-2Iuiga3UUrGZSueOWH6JT_",
      ],
      title: "Test",
      body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu",
      imageUrl:
        "https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU",
      mobileNumber: "9999988888",
    });

    res.json(resp);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/testSMS", async (req, res) => {
  try {
    const resp = await sendNotification({
      URL: "https://www.youtube.com/watch?v=MV1qaFv4VUg",
      mobile: "8375921127",
    });
    res.json(resp);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
