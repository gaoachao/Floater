const nodemailer = require("nodemailer");

module.exports = sendEmail = function(emailAddress,authCode) {
  const transporter = nodemailer.createTransport({
    host: "smtp.qq.com",
    port: 465,
    secure: true,
    auth: {
      user: "1227448581@qq.com",
      pass: "ehegbtcpwjkijchc",
    },
  });
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("email is ready");
    }
  });

  // 2. 配置消息
  const mailOptions = {
    subject: "Floater",
    from: "1227448581@qq.com",
    to: emailAddress,
    // html: '支持发送html',
    text: "您好，您的验证码为" + authCode + "，有效期10分钟。",
  };

  // 3. 发送
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("邮件发送成功 ID：", info.messageId);
    }
  });

	return authCode;
}



