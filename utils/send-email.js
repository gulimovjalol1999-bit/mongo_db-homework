const nodemailer = require("nodemailer")
const CustomErrorhandler = require("../error/custom-error.handler")

async function sendMessage(code, email) {
  try{
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "gulimovjalol1999@gmail.com",
        pass: process.env.GOOGLE_PASS
      }
    })

  await transporter.sendMail({
    subject: "Lesson",
    from: "gulimovjalol1999@gmail.com",
    to: email,
    test: `
    <!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Book Experience</title>
</head>
<body style="margin:0;padding:0;background:#f5f1ea;font-family: 'Georgia', serif;">

<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 15px 40px rgba(0,0,0,0.08);">

<!-- HEADER -->
<tr>
<td style="background:linear-gradient(135deg,#2c2a28,#3d372f);padding:40px;text-align:center;color:#ffffff;">
<h1 style="margin:0;font-size:34px;letter-spacing:3px;">📚 LUMINA BOOKS</h1>
<p style="margin-top:12px;font-size:15px;color:#d8d2c8;">
Sahifalar ortida yashiringan dunyolar sizni kutmoqda
</p>
</td>
</tr>

<!-- HERO -->
<tr>
<td style="padding:50px 40px;text-align:center;">

<h2 style="margin:0;font-size:28px;color:#2d2a26;">
Xush kelibsiz, ${name}
</h2>

<p style="margin-top:25px;font-size:17px;line-height:1.8;color:#555;">
Bugun siz oddiy saytga emas…  
fikrlar o‘sadigan, ilhom tug‘iladigan va tasavvur chegaralari kengayadigan makonga qadam qo‘ydingiz.
</p>

<p style="margin-top:20px;font-size:15px;line-height:1.8;color:#777;">
Har bir kitob — bu yangi boshlanish.  
Har bir sahifa — bu yangi imkoniyat.  
Va bugun siz o‘z hikoyangizni boshlayapsiz.
</p>

<a href="https://your-site.uz"
style="display:inline-block;margin-top:35px;padding:16px 36px;
background:#c6a35c;color:#ffffff;text-decoration:none;
border-radius:50px;font-weight:bold;font-size:15px;
box-shadow:0 8px 20px rgba(198,163,92,0.4);">
Kitoblar olamiga kirish →
</a>

</td>
</tr>

<!-- SECTION -->
<tr>
<td style="background:#faf8f4;padding:40px;text-align:center;">

<h3 style="margin:0;font-size:20px;color:#2d2a26;">
Nima sizni kutmoqda?
</h3>

<table width="100%" cellpadding="0" cellspacing="0" style="margin-top:25px;">
<tr>
<td align="center" style="padding:10px;font-size:14px;color:#555;">
✨ Bestseller asarlar
</td>
<td align="center" style="padding:10px;font-size:14px;color:#555;">
🚀 Tezkor yetkazib berish
</td>
<td align="center" style="padding:10px;font-size:14px;color:#555;">
🎁 Maxsus chegirmalar
</td>
</tr>
</table>

</td>
</tr>

<!-- FOOTER -->
<tr>
<td style="background:#2c2a28;padding:30px;text-align:center;color:#bbb;font-size:12px;">
<p style="margin:0;">
Siz bu xabarni ro‘yxatdan o‘tganingiz sababli oldingiz.
</p>
<p style="margin-top:10px;">
© 2026 Lumina Books. Barcha huquqlar himoyalangan.
</p>
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`
  })    

  }catch(error) {
    throw CustomErrorhandler.InternalServerError(error.message)
  }
}

module.exports = sendMessage