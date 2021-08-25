import { transporter } from "./nodemailerInfo"


export const Utils = {
  sendEmail: (mailOptions) =>{
    return transporter.sendMail(mailOptions, (error, info) => {
      try {
        if (error) throw error;
        console.log("Email enviado com sucesso para ");
      } catch (error) {
        throw error
      }
    })
  }
}