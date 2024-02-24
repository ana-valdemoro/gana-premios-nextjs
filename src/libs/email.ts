/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import nodemailer from 'nodemailer';
import Handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';

type MailOptions = {
  from: string; // sender address
  to: string | string[]; // list of receivers
  subject: string; // Subject line
  html: string; // plain html body
};
const emailsFolder = 'src/emailTemplates';

const sendEmail = async (
  mailOptions: MailOptions
): Promise<nodemailer.SentMessageInfo> => {
  const tranporterConfig: SMTPTransport.Options = {
    host: 'sandbox.smtp.mailtrap.io',
    port: parseInt(process.env.SMTP_PORT || '2525'),
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  };
  const transporter: nodemailer.Transporter =
    nodemailer.createTransport(tranporterConfig);

  // eslint-disable-next-line @typescript-eslint/return-await
  return transporter.sendMail(mailOptions);
};

export const sendAccountActivationEmail = async (
  email: string,
  token: string
): Promise<nodemailer.SentMessageInfo> => {
  const route = path.join(emailsFolder, '/activateAccount.hbs');
  const emailTemplateSource = fs.readFileSync(route, 'utf8');
  const template = Handlebars.compile(emailTemplateSource);
  const title = 'Activate account';
  const message = 'Welcome to PrizeHub';
  const buttonText = 'Activate your account';

  const htmlToSend = template({
    // TODO: pending to define FRONT_BASE_URL
    url: `${process.env.FRONT_BASE_URL}/activate-account/${token}`,
    title,
    message,
    buttonText,
  });

  const activeAccountMailOptions = {
    // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
    from: process.env.SMTP_SENDER_ADDRESS as string, // sender address
    to: email, // list of receivers
    subject: 'Activate your account', // Subject line
    html: htmlToSend, // plain html body
  };

  return await sendEmail(activeAccountMailOptions);
};
