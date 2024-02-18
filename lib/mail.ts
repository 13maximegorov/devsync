import nodemailer from 'nodemailer';

const options = {
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT as string),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
};

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  const transporter = nodemailer.createTransport(options);

  return await transporter.sendMail({
    from: `DevSync <${process.env.SMTP_FROM_EMAIL}>`,
    to: email,
    subject: 'Двухфакторная аутентификация',
    html: `<p>Ваш код: ${token}</p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const transporter = nodemailer.createTransport(options);

  const resetLink = `${domain}/auth/new-password?token=${token}`;

  return await transporter.sendMail({
    from: `DevSync <${process.env.SMTP_FROM_EMAIL}>`,
    to: email,
    subject: 'Сброс пароля',
    html: `<p>Нажмите <a href="${resetLink}">здесь</a>, чтобы сбросить пароль.</p>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const transporter = nodemailer.createTransport(options);

  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  return await transporter.sendMail({
    from: `DevSync <${process.env.SMTP_FROM_EMAIL}>`,
    to: email,
    subject: 'Подтверждение Вашей электронной почты',
    html: `<p>Нажмите <a href="${confirmLink}">здесь</a>, чтобы подтвердить адрес электронной почты.</p>`,
  });
};
