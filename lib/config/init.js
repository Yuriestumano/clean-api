import { UsuarioModel } from "../model/usuarios";
import bcrypt from "bcrypt";

export const init = async () => {
  try {
    // let usuario = {
    //   name: "Dieguinho",
    //   password: "1234",
    //   cpf: "00000000000",
    //   email: "diego141@outlook.com",
    //   status: 1,
    // };
    // usuario.password = bcrypt.hashSync(usuario.password, 10);
    // let _usuario = new UsuarioModel(usuario);
    // await _usuario.save();
    // console.log("criado com sucesso")
    // let empresa = {
    //   name: "Estumano Developer",
    //   email: "giovane@estumanosdev.com",
    //   documents: {
    //     number: "3929329839",
    //   },
    //   colors: ["#046b8c", "#eba96f", "#3c5945"],
    //   address: {
    //     city: "Belém",
    //     street: "Av. Jose Bonifacio",
    //     number: "2833",
    //     zipcode: "66065112",
    //     neighborhood: "Guamá",
    //     state: "PA"
    //   },
    //   offices: [{
    //     name: "admin",
    //     permissions: [],
    //     employees: [{
    //       _id: "6113381482dff31c5bb2c129",
    //       name: "Giovane Yuri",
    //       documents: "04742342232"
    //     }]
    //   }]
    // }
    // let _empresa = new CompaniesModel(empresa)
    // _empresa.save()

    // let produtos = [{
    //   name: "dress",
    //   createdBy: {
    //     _id: "6113381482dff31c5bb2c129",
    //     name: "Giovane Yuri",
    //   },
    //   updatedBy: {
    //     _id: "6113381482dff31c5bb2c129",
    //     name: "Giovane Yuri",
    //   },
    //   category: ["Clothes"],
    //   description: "lorem ypsulom teste",
    //   companie: {
    //     _id: "61149079081589400a21dbb3",
    //     name: "Estumano Developer",
    //   },
    //   types: [
    //     {
    //       value: 50,
    //       images: ["https://firebasestorage.googleapis.com/v0/b/eco-maiandeua.appspot.com/o/dresses-blue.jpeg?alt=media&token=ed7e3688-b381-4a5c-96e7-74b22aadfe87"],
    //       color: {
    //         name: "Blue",
    //         value: "#0971B2"
    //       }
    //     },
    //     {
    //       value: 50,
    //       images: ["https://firebasestorage.googleapis.com/v0/b/eco-maiandeua.appspot.com/o/dresses-red.jpeg?alt=media&token=08366741-37d9-40d1-9f47-7ea2327f91ad"],
    //       color: {
    //         name: "Red",
    //         value: "#FF0000"
    //       }
    //     },
    //     {
    //       value: 80,
    //       images: ["https://firebasestorage.googleapis.com/v0/b/eco-maiandeua.appspot.com/o/dresses-whitw.jpeg?alt=media&token=d2b94bf1-e085-44c9-934c-a77d771670b7"],
    //       color: {
    //         name: "white",
    //         value: "#FFFFFF"
    //       }
    //     }
    //   ],
    //   specifications: [{
    //     name: "tamanho",
    //     value: "P"
    //   }],
    // },
    // {
    //   name: "books",
    //   createdBy: {
    //     _id: "6113381482dff31c5bb2c129",
    //     name: "Giovane Yuri",
    //   },
    //   updatedBy: {
    //     _id: "6113381482dff31c5bb2c129",
    //     name: "Giovane Yuri",
    //   },
    //   category: ["Arts", "Escritorio"],
    //   description: "description teste, some content, for illustration of books",
    //   companie: {
    //     _id: "61149079081589400a21dbb3",
    //     name: "Estumano Developer",
    //   },
    //   types: [{
    //     value: 50,
    //     images: ["https://firebasestorage.googleapis.com/v0/b/eco-maiandeua.appspot.com/o/books.jpeg?alt=media&token=3aa863b4-0655-48fe-9edf-ffccbfd0b419"],
    //     color: {
    //       name: "bookOculos"          
    //     }
    //   }],
    //   specifications: [{
    //     name: "Total Paginas",
    //     value: "500"
    //   }],
    // },
    // {
    //   name: "books 2",
    //   createdBy: {
    //     _id: "6113381482dff31c5bb2c129",
    //     name: "Giovane Yuri",
    //   },
    //   updatedBy: {
    //     _id: "6113381482dff31c5bb2c129",
    //     name: "Giovane Yuri",
    //   },
    //   category: ["Arts", "Escritorio"],
    //   description: "Another description of books, because i need do a test for my web site, lol",
    //   companie: {
    //     _id: "61149079081589400a21dbb3",
    //     name: "Estumano Developer",
    //   },
    //   types: [{
    //     value: 10,
    //     images: ["https://firebasestorage.googleapis.com/v0/b/eco-maiandeua.appspot.com/o/books2.jpeg?alt=media&token=4135b82c-c74f-448b-bc07-942fcb83e3f6"],
    //     color: {
    //       name: "bookOculosCafe"          
    //     }
    //   }],
    //   specifications: [{
    //     name: "Total Paginas",
    //     value: "100"
    //   }],
    // },
    // ]

    // for(let produto of produtos){
    //   let _p = new ProductsModel(produto)
    //   _p.save()
    //   console.log(produto.name, "PRODUTO SALVO")
    // }

    // console.log("empresa criada com sucesso!!");
  } catch (error) {
    throw error;
  }
};
