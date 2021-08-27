export const sendEmailHtml = {
  checkEmail: (data) => {
    return `<body style="margin: 0 auto;">
                        <div style="padding: 20px; text-align: center; background-color: #333333">
                            <p style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; color: white">
                                Olá ${data.name}, confirme o email para ter acesso aos nossos serviços!</p>
                           <a style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; color: white" href='quicktrip://quicktrip/${data.token}' >Confirme seu email aqui</a>
                           <a style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; color: white" href='https://www.google.com/search?q=translate&oq=transla&aqs=chrome.0.69i59j69i57j0i512j46i433i512j0i512j0i433i512j0i131i433i512j0i433i512j0i512j46i433i512.971j0j7&sourceid=chrome&ie=UTF-8' >Confirme seu email aqui</a>

                        </div>
                    </body>`
  }
}
