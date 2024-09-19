const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/send', (req, res) => {
  const { name, furigana, phone, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.COMPANY_EMAIL,
    subject: `New message from ${name}`,
    text: `
      ※このメールはシステムからの自動返信です

      以下の内容でお問い合わせを受け付けいたしました。
      担当はご対応をお願いします。

      ━━━━━━□■□　お問い合わせ内容　□■□━━━━━━

      名前: ${name}
      ふりがな: ${furigana}
      メールアドレス: ${email}
      電話番号: ${phone}
      お問い合わせ内容:
      ${message}
    `,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Message sent successfully');
  });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
