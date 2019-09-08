import nodemailer from 'nodemailer';
import { resolve } from 'path';
import expressHandlebars from 'express-handlebars';
import nodemailerHandlebars from 'nodemailer-express-handlebars';
import mailconfig from '../config/mail';

class Mail {
  constructor() {
    const { host, port, secure, auth } = mailconfig;
    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth : null,
    });

    this.configureTemplates();
  }

  configureTemplates() {
    const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');

    this.transporter.use(
      'compile',
      nodemailerHandlebars({
        viewEngine: expressHandlebars.create({
          layoutsDir: resolve(viewPath, 'layouts'),
          partialsDir: resolve(viewPath, 'partials'),
          defaultLayout: 'default',
          extname: '.hbs', // default: .handlebars
        }),
        viewPath,
        extName: '.hbs',
      })
    );
  }

  sendMail(message) {
    return this.transporter.sendMail({
      ...mailconfig.default,
      ...message,
    });
  }
}

export default new Mail();
