import { Request, Response } from "express";
import nodemailer from "nodemailer";
import pdf from "html-pdf";
import fs from "fs";
import { formatterData } from "../utils/formatterData";
import { formatterDataDocument } from "../utils/formatterDate";
import { formatterDataHours } from "../utils/formatterHours";

export const SendEmail = async (req: Request, res: Response): Promise<void> => {
    const { email, name, value, phone, cpf, number, state, complement, sale, product, quantity, street, city, neighborhood, cep, formPayment  } = req.body;

    const date = formatterDataDocument(formatterData(new Date().toISOString()));

    try{
        const transporter = nodemailer.createTransport({
        host: "smtp.office365.com",
        port: 587,
        secure: false,
        auth: {
            user: "renatonunes0011@hotmail.com",
            pass: "Dias1999Bete2005" 
        }})


        const html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="pt" lang="pt">
          <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <title>file_1706385773204</title>
            <meta name="author" content="Filipe Cavalcanti" />
            <style type="text/css">
              * {
                margin: 0;
                padding: 0;
                text-indent: 0;
              }
              p {
                color: black;
                font-family: Calibri, sans-serif;
                font-style: normal;
                font-weight: normal;
                text-decoration: none;
                font-size: 11pt;
                margin: 0pt;
              }
              .s1 {
                color: black;
                font-family: Calibri, sans-serif;
                font-style: normal;
                font-weight: bold;
                text-decoration: none;
                font-size: 14pt;
              }
              .s2 {
                color: black;
                font-family: Calibri, sans-serif;
                font-style: normal;
                font-weight: bold;
                text-decoration: none;
                font-size: 12pt;
              }
              .s3 {
                color: black;
                font-family: "Calibri Light", sans-serif;
                font-style: normal;
                font-weight: normal;
                text-decoration: none;
                font-size: 10pt;
              }
              .s4 {
                color: black;
                font-family: Calibri, sans-serif;
                font-style: normal;
                font-weight: normal;
                text-decoration: none;
                font-size: 10pt;
              }
              .s5 {
                color: black;
                font-family: Calibri, sans-serif;
                font-style: normal;
                font-weight: normal;
                text-decoration: none;
                font-size: 10pt;
              }
              .s6 {
                color: black;
                font-family: Calibri, sans-serif;
                font-style: normal;
                font-weight: normal;
                text-decoration: none;
                font-size: 11pt;
              }
              .s7 {
                color: black;
                font-family: "Calibri Light", sans-serif;
                font-style: normal;
                font-weight: normal;
                text-decoration: none;
                font-size: 11pt;
              }
              .s9 {
                color: #e7e6e6;
                font-family: "Calibri Light", sans-serif;
                font-style: normal;
                font-weight: normal;
                text-decoration: none;
                font-size: 11pt;
              }
              .s10 {
                color: black;
                font-family: Calibri, sans-serif;
                font-style: normal;
                font-weight: normal;
                text-decoration: none;
                font-size: 9pt;
              }
              .s11 {
                color: black;
                font-family: Calibri, sans-serif;
                font-style: normal;
                font-weight: bold;
                text-decoration: none;
                font-size: 11pt;
              }
              table,
              tbody {
                vertical-align: top;
                overflow: visible;
              }
            </style>
          </head>
          <body>
            <p style="padding-top: 1pt; text-indent: 0pt; text-align: right">
              Página 1
            </p>
            <p style="text-indent: 0pt; text-align: left"><br /></p>
            <table
              style="border-collapse: collapse; margin-left: 5.994pt"
              cellspacing="0"
            >
              <tr style="height: 17pt">
                <td
                  style="
                    width: 524pt;
                    border-top-style: solid;
                    border-top-width: 1pt;
                    border-left-style: solid;
                    border-left-width: 1pt;
                    border-bottom-style: solid;
                    border-bottom-width: 1pt;
                    border-right-style: solid;
                    border-right-width: 1pt;
                  "
                  colspan="9"
                >
                  <p
                    class="s1"
                    style="
                      padding-left: 132pt;
                      padding-right: 132pt;
                      text-indent: 0pt;
                      line-height: 16pt;
                      text-align: center;
                    "
                  >
                    DOCUMENTO AUXILIAR DE VENDA - PEDIDO
                  </p>
                </td>
              </tr>
              <tr style="height: 20pt">
                <td
                  style="
                    width: 524pt;
                    border-top-style: solid;
                    border-top-width: 1pt;
                    border-left-style: solid;
                    border-left-width: 1pt;
                    border-bottom-style: solid;
                    border-bottom-width: 1pt;
                    border-right-style: solid;
                    border-right-width: 1pt;
                  "
                  colspan="9"
                >
                  <p
                    class="s2"
                    style="
                      padding-left: 131pt;
                      padding-right: 132pt;
                      text-indent: 0pt;
                      text-align: center;
                    "
                  >
                    VIA DE CONTROLE INTERNO
                  </p>
                </td>
              </tr>
              <tr style="height: 13pt">
                <td
                  style="
                    width: 524pt;
                    border-top-style: solid;
                    border-top-width: 1pt;
                    border-left-style: solid;
                    border-left-width: 1pt;
                    border-bottom-style: solid;
                    border-bottom-width: 1pt;
                    border-right-style: solid;
                    border-right-width: 1pt;
                  "
                  colspan="9"
                >
                  <p
                    class="s3"
                    style="
                      padding-left: 132pt;
                      padding-right: 131pt;
                      text-indent: 0pt;
                      line-height: 11pt;
                      text-align: center;
                      font-weight: 700;
                    "
                  >
                    Identificação do Estabelecimento Emissor
                  </p>
                </td>
              </tr>
              <tr style="height: 67pt">
                <td
                  style="
                    width: 524pt;
                    border-top-style: solid;
                    border-top-width: 1pt;
                    border-left-style: solid;
                    border-left-width: 1pt;
                    border-bottom-style: solid;
                    border-bottom-width: 1pt;
                    border-right-style: solid;
                    border-right-width: 1pt;
                  "
                  colspan="9"
                >
                  <div style="display: flex">
                    <div
                      style="
                        display: flex;
                        justify-content: start;
                        flex-direction: column;
                        gap: 1px;
                        width: 50%;
                      "
                    >
                      <p
                        class="s4"
                        style="
                          padding-left: 5pt;
                          padding-right: 109pt;
                          text-indent: 0pt;
                          text-align: left;
                        "
                      >
                        Denominação: Essence IPhones
                      </p>
                      <p
                        class="s4"
                        style="
                          padding-left: 5pt;
        
                          text-indent: 0pt;
                          text-align: left;
                        "
                      >
                        Endereço: Rua senador Pinheiro Ramos, Nº 412A
                      </p>
                      <p
                        class="s4"
                        style="padding-left: 5pt; text-indent: 0pt; text-align: left"
                      >
                        Bairro: Centro
                      </p>
                      <p
                        class="s4"
                        style="padding-left: 5pt; text-indent: 0pt; text-align: left"
                      >
                        CEP: 55825-000
                      </p>
                    </div>
                    <div
                      style="
                        display: flex;
                        justify-content: start;
                        flex-direction: column;
                        gap: 1px;
                        width: 50%;
                      "
                    >
                      <p
                        class="s4"
                        style="padding-left: 5pt; text-indent: 0pt; text-align: left"
                      >
                        CNPJ: --------------------
                      </p>
                      <p
                        class="s4"
                        style="padding-left: 5pt; text-indent: 0pt; text-align: left"
                      >
                        Cidade: Paudalho
                      </p>
                      <p
                        class="s4"
                        style="padding-left: 5pt; text-indent: 0pt; text-align: left"
                      >
                        UF: PE
                      </p>
                      <p
                        class="s4"
                        style="padding-left: 5pt; text-indent: 0pt; text-align: left"
                      >
                        Telefone: (81) 9 8148-0245
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
              <tr style="height: 13pt">
                <td
                  style="
                    width: 524pt;
                    border-top-style: solid;
                    border-top-width: 1pt;
                    border-left-style: solid;
                    border-left-width: 1pt;
                    border-bottom-style: solid;
                    border-bottom-width: 1pt;
                    border-right-style: solid;
                    border-right-width: 1pt;
                  "
                  colspan="9"
                >
                  <p
                    class="s3"
                    style="
                      padding-left: 132pt;
                      padding-right: 132pt;
                      text-indent: 0pt;
                      line-height: 11pt;
                      text-align: center;
                      font-weight: 700;
                    "
                  >
                    Identificação do Comprador
                  </p>
                </td>
              </tr>
              <tr style="height: 74pt">
                <td
                  style="
                    width: 524pt;
                    border-top-style: solid;
                    border-top-width: 1pt;
                    border-left-style: solid;
                    border-left-width: 1pt;
                    border-bottom-style: solid;
                    border-bottom-width: 1pt;
                    border-right-style: solid;
                    border-right-width: 1pt;
                  "
                  colspan="9"
                >
                  <div style="display: flex">
                    <div
                      style="
                        display: flex;
                        justify-content: start;
                        flex-direction: column;
                        gap: 2px;
                        width: 50%;
                      "
                    >
                      <p
                        class="s4"
                        style="padding-left: 5pt; text-indent: 0pt; text-align: left"
                      >
                        Denominação: ${name}
                      </p>
                      <p
                        class="s4"
                        style="padding-left: 5pt; text-indent: 0pt; text-align: left"
                      >
                        Endereço: ${street}, Nº${number}
                      </p>
                      <p
                        class="s4"
                        style="padding-left: 5pt; text-indent: 0pt; text-align: left"
                      >
                        Complemento:
                      </p>
                      <p
                        class="s4"
                        style="
                          padding-left: 5pt;
                          text-indent: 0pt;
                          line-height: 12pt;
                          text-align: left;
                        "
                      >
                        Bairro: ${neighborhood}
                      </p>
                      <p
                        class="s4"
                        style="
                          padding-left: 5pt;
                          text-indent: 0pt;
                          line-height: 12pt;
                          text-align: left;
                        "
                      >
                        CEP: ${cep}
                      </p>
                    </div>
                    <div
                      style="
                        display: flex;
                        justify-content: start;
                        flex-direction: column;
                        gap: 2px;
                      "
                    >
                      <p
                        class="s4"
                        style="
                          padding-left: 5pt;
        
                          text-indent: 0pt;
                          text-align: left;
                          padding-right: auto;
                        "
                      >
                        CPF: ${cpf}
                      </p>
                      <p
                        class="s4"
                        style="
                          padding-left: 5pt;
        
                          text-indent: 0pt;
                          text-align: left;
                          padding-right: auto;
                        "
                      >
                        Cidade: ${city}
                      </p>
                      <p
                        class="s4"
                        style="
                          padding-left: 5pt;
        
                          text-indent: 0pt;
                          text-align: left;
                          padding-right: auto;
                        "
                      >
                        UF: ${state}
                      </p>
                      <p
                        class="s4"
                        style="
                          padding-left: 5pt;
                          text-indent: 0pt;
                          line-height: 12pt;
                          text-align: left;
                        "
                      >
                        Telefone: ${phone}
                      </p>
                      <p
                        class="s4"
                        style="
                          padding-left: 5pt;
                          text-indent: 0pt;
                          line-height: 12pt;
                          text-align: left;
                        "
                      >
                        E-mail: ${email}
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
              <tr style="height: 13pt">
                <td
                  style="
                    width: 524pt;
                    border-top-style: solid;
                    border-top-width: 1pt;
                    border-left-style: solid;
                    border-left-width: 1pt;
                    border-bottom-style: solid;
                    border-bottom-width: 1pt;
                    border-right-style: solid;
                    border-right-width: 1pt;
                  "
                  colspan="9"
                >
                  <p
                    class="s3"
                    style="
                      padding-left: 132pt;
                      padding-right: 132pt;
                      text-indent: 0pt;
                      line-height: 11pt;
                      text-align: center;
                      font-weight: 700;
                    "
                  >
                    Identificação da Transportadora
                  </p>
                </td>
              </tr>
              <tr style="height: 43pt">
                <td
                  style="
                    width: 524pt;
                    border-top-style: solid;
                    border-top-width: 1pt;
                    border-left-style: solid;
                    border-left-width: 1pt;
                    border-bottom-style: solid;
                    border-bottom-width: 1pt;
                    border-right-style: solid;
                    border-right-width: 1pt;
                  "
                  colspan="9"
                >
                  <div style="display: flex">
                    <div
                      style="
                        display: flex;
                        justify-content: start;
                        flex-direction: column;
                        gap: 1px;
                        width: 50%;
                      "
                    >
                      <p
                        class="s6"
                        style="
                          padding-left: 5pt;
        
                          text-indent: 0pt;
                          text-align: left;
                        "
                      >
                        Nome: -
                      </p>
                      <p
                        class="s6"
                        style="
                          padding-left: 5pt;
        
                          text-indent: 0pt;
                          text-align: left;
                        "
                      >
                        CNPJ: -
                      </p>
                    </div>
                    <div
                      style="
                        display: flex;
                        justify-content: start;
                        flex-direction: column;
                        gap: 1px;
                      "
                    >
                      <p
                        class="s6"
                        style="
                          padding-left: 5pt;
        
                          text-indent: 0pt;
                          text-align: left;
                        "
                      >
                        Tipo Frete: -
                      </p>
                      <p
                        class="s6"
                        style="
                          padding-left: 5pt;
        
                          text-indent: 0pt;
                          text-align: left;
                        "
                      >
                        Veículo: -
                      </p>
                      <p
                        class="s6"
                        style="
                          padding-left: 5pt;
        
                          text-indent: 0pt;
                          text-align: left;
                          padding-bottom: 2px;
                        "
                      >
                        Placa:
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
              <tr style="height: 57pt">
                <td
                  style="
                    width: 241pt;
                    border-top-style: solid;
                    border-top-width: 1pt;
                    border-left-style: solid;
                    border-left-width: 1pt;
                    border-bottom-style: solid;
                    border-bottom-width: 1pt;
                    border-right-style: solid;
                    border-right-width: 1pt;
                  "
                  colspan="5"
                >
                  <div
                    style="
                      display: flex;
                      justify-content: start;
                      flex-direction: column;
                      gap: 1px;
                      width: 100%;
                    "
                  >
                    <p
                      class="s6"
                      style="
                        padding-left: 5pt;
        
                        text-indent: 0pt;
                        text-align: left;
                      "
                    >
                      Nº do Documento: 000000237
                    </p>
                    <p
                      class="s6"
                      style="
                        padding-left: 5pt;
        
                        text-indent: 0pt;
                        text-align: left;
                      "
                    >
                      Emissão: ${date}
                    </p>
                    <p
                      class="s6"
                      style="padding-left: 5pt; text-indent: 0pt; text-align: left"
                    >
                      Condição de Pagamento: ${formPayment}
                    </p>
                  </div>
                </td>
                <td
                  style="
                    width: 283pt;
                    border-top-style: solid;
                    border-top-width: 1pt;
                    border-left-style: solid;
                    border-left-width: 1pt;
                    border-bottom-style: solid;
                    border-bottom-width: 1pt;
                    border-right-style: solid;
                    border-right-width: 1pt;
                  "
                  colspan="4"
                >
                  <p
                    class="s7"
                    style="padding-left: 5pt; text-indent: 0pt; text-align: left"
                  >
                    Nº do Documento Fiscal:
                  </p>
                </td>
              </tr>
              <tr style="height: 57pt">
                <td
                  style="
                    width: 241pt;
                    border-top-style: solid;
                    border-top-width: 1pt;
                    border-left-style: solid;
                    border-left-width: 1pt;
                    border-bottom-style: solid;
                    border-bottom-width: 1pt;
                    border-right-style: solid;
                    border-right-width: 1pt;
                  "
                  colspan="5"
                >
                  <div
                    style="
                      display: flex;
                      justify-content: start;
                      flex-direction: column;
                      gap: 1px;
                      width: 100%;
                    "
                  >
                    <p
                      class="s7"
                      style="padding-left: 5pt; text-indent: 0pt; text-align: left"
                    >
                      Entrega.
                    </p>
                    <p
                      class="s7"
                      style="
                        padding-left: 5pt;
        
                        text-indent: 0pt;
                        text-align: left;
                      "
                    >
                      Data: ${date}
                    </p>
                    <p
                      class="s7"
                      style="
                        padding-left: 5pt;
        
                        text-indent: 0pt;
                        text-align: left;
                      "
                    >
                      Hora: ${formatterDataHours(formatterData(new Date().toISOString()))}
                    </p>
                  </div>
                </td>
                <td
                  style="
                    width: 283pt;
                    border-top-style: solid;
                    border-top-width: 1pt;
                    border-left-style: solid;
                    border-left-width: 1pt;
                    border-bottom-style: solid;
                    border-bottom-width: 1pt;
                    border-right-style: solid;
                    border-right-width: 1pt;
                  "
                  colspan="4"
                >
                  <p
                    class="s7"
                    style="padding-left: 5pt; text-indent: 0pt; text-align: left"
                  >
                    Situação de Pagamento:
                  </p>
                  <p style="text-indent: 0pt; text-align: left"><br /></p>
                  <p
                    class="s9"
                    style="padding-left: 94pt; text-indent: 0pt; text-align: left"
                  >
                    ÁREA PARA CARIMBO
                  </p>
                </td>
              </tr>
              <tr style="height: 81pt">
                <td
                  style="
                    width: 524pt;
                    border-top-style: solid;
                    border-top-width: 1pt;
                    border-left-style: solid;
                    border-left-width: 1pt;
                    border-bottom-style: solid;
                    border-bottom-width: 1pt;
                    border-right-style: solid;
                    border-right-width: 1pt;
                  "
                  colspan="9"
                >
                  <p
                    class="s6"
                    style="padding-left: 5pt; text-indent: 0pt; text-align: left"
                  >
                    Observações:
                  </p>
                  <p style="text-indent: 0pt; text-align: left"><br /></p>
                  <p
                    class="s6"
                    style="padding-left: 5pt; text-indent: 0pt; text-align: left"
                  >
                    APARELHO NOVO, 3 MESES DE GARANTIA.
                  </p>
                </td>
              </tr>
              <tr style="height: 11pt">
                <td
                  style="
                    width: 35pt;
                    border-top-style: solid;
                    border-top-width: 1pt;
                    border-left-style: solid;
                    border-left-width: 1pt;
                    border-bottom-style: solid;
                    border-bottom-width: 1pt;
                    border-right-style: solid;
                    border-right-width: 1pt;
                  "
                >
                  <p
                    class="s10"
                    style="
                      padding-left: 7pt;
                      padding-right: 6pt;
                      text-indent: 0pt;
                      line-height: 10pt;
                      text-align: center;
                    "
                  >
                    ITEM
                  </p>
                </td>
                <td
                  style="
                    width: 50pt;
                    border-top-style: solid;
                    border-top-width: 1pt;
                    border-left-style: solid;
                    border-left-width: 1pt;
                    border-bottom-style: solid;
                    border-bottom-width: 1pt;
                    border-right-style: solid;
                    border-right-width: 1pt;
                  "
                >
                  <p
                    class="s10"
                    style="
                      padding-left: 9pt;
                      padding-right: 8pt;
                      text-indent: 0pt;
                      line-height: 10pt;
                      text-align: center;
                    "
                  >
                    CÓDIGO
                  </p>
                </td>
                <td
                  style="
                    width: 90pt;
                    border-top-style: solid;
                    border-top-width: 1pt;
                    border-left-style: solid;
                    border-left-width: 1pt;
                    border-bottom-style: solid;
                    border-bottom-width: 1pt;
                    border-right-style: solid;
                    border-right-width: 1pt;
                  "
                >
                  <p
                    class="s10"
                    style="
                      padding-left: 23pt;
                      text-indent: 0pt;
                      line-height: 10pt;
                      text-align: left;
                    "
                  >
                    DESCRIÇÃO
                  </p>
                </td>
                <td
                  style="
                    width: 27pt;
                    border-top-style: solid;
                    border-top-width: 1pt;
                    border-left-style: solid;
                    border-left-width: 1pt;
                    border-bottom-style: solid;
                    border-bottom-width: 1pt;
                    border-right-style: solid;
                    border-right-width: 1pt;
                  "
                >
                  <p
                    class="s10"
                    style="
                      padding-left: 6pt;
                      padding-right: 6pt;
                      text-indent: 0pt;
                      line-height: 10pt;
                      text-align: center;
                    "
                  >
                    UN
                  </p>
                </td>
                <td
                  style="
                    width: 57pt;
                    border-top-style: solid;
                    border-top-width: 1pt;
                    border-left-style: solid;
                    border-left-width: 1pt;
                    border-bottom-style: solid;
                    border-bottom-width: 1pt;
                    border-right-style: solid;
                    border-right-width: 1pt;
                  "
                >
                  <p
                    class="s10"
                    style="
                      padding-left: 13pt;
                      text-indent: 0pt;
                      line-height: 10pt;
                      text-align: left;
                    "
                  >
                    QUANT.
                  </p>
                </td>
                <td
                  style="
                    width: 76pt;
                    border-top-style: solid;
                    border-top-width: 1pt;
                    border-left-style: solid;
                    border-left-width: 1pt;
                    border-bottom-style: solid;
                    border-bottom-width: 1pt;
                    border-right-style: solid;
                    border-right-width: 1pt;
                  "
                >
                  <p
                    class="s10"
                    style="
                      padding-left: 15pt;
                      text-indent: 0pt;
                      line-height: 10pt;
                      text-align: left;
                    "
                  >
                    P. UNITÁRIO
                  </p>
                </td>
                <td
                  style="
                    width: 55pt;
                    border-top-style: solid;
                    border-top-width: 1pt;
                    border-left-style: solid;
                    border-left-width: 1pt;
                    border-bottom-style: solid;
                    border-bottom-width: 1pt;
                    border-right-style: solid;
                    border-right-width: 1pt;
                  "
                >
                  <p
                    class="s10"
                    style="
                      padding-left: 15pt;
                      padding-right: 15pt;
                      text-indent: 0pt;
                      line-height: 10pt;
                      text-align: center;
                    "
                  >
                    DESC.
                  </p>
                </td>
                <td
                  style="
                    width: 76pt;
                    border-top-style: solid;
                    border-top-width: 1pt;
                    border-left-style: solid;
                    border-left-width: 1pt;
                    border-bottom-style: solid;
                    border-bottom-width: 1pt;
                    border-right-style: solid;
                    border-right-width: 1pt;
                  "
                >
                  <p
                    class="s10"
                    style="
                      padding-left: 22pt;
                      padding-right: 21pt;
                      text-indent: 0pt;
                      line-height: 10pt;
                      text-align: center;
                    "
                  >
                    ACRESC.
                  </p>
                </td>
                <td
                  style="
                    width: 58pt;
                    border-top-style: solid;
                    border-top-width: 1pt;
                    border-left-style: solid;
                    border-left-width: 1pt;
                    border-bottom-style: solid;
                    border-bottom-width: 1pt;
                    border-right-style: solid;
                    border-right-width: 1pt;
                  "
                >
                  <p
                    class="s10"
                    style="
                      padding-left: 7pt;
                      padding-right: 7pt;
                      text-indent: 0pt;
                      line-height: 10pt;
                      text-align: center;
                    "
                  >
                    TOTAL
                  </p>
                </td>
              </tr>
              <tr style="height: 48pt">
                <td
                  style="
                    width: 35pt;
                    border-top-style: solid;
                    border-top-width: 1pt;
                    border-left-style: solid;
                    border-left-width: 1pt;
                    border-bottom-style: solid;
                    border-bottom-width: 1pt;
                    border-right-style: solid;
                    border-right-width: 1pt;
                  "
                >
                  <p class="s10" style="text-indent: 0pt; text-align: center">1</p>
                </td>
                <td
                  style="
                    width: 50pt;
                    border-top-style: solid;
                    border-top-width: 1pt;
                    border-left-style: solid;
                    border-left-width: 1pt;
                    border-bottom-style: solid;
                    border-bottom-width: 1pt;
                    border-right-style: solid;
                    border-right-width: 1pt;
                  "
                >
                  <p
                    class="s10"
                    style="
                      padding-left: 9pt;
                      padding-right: 8pt;
                      text-indent: 0pt;
                      text-align: center;
                    "
                  >
                    0001
                  </p>
                </td>
                <td
                  style="
                    width: 90pt;
                    border-top-style: solid;
                    border-top-width: 1pt;
                    border-left-style: solid;
                    border-left-width: 1pt;
                    border-bottom-style: solid;
                    border-bottom-width: 1pt;
                    border-right-style: solid;
                    border-right-width: 1pt;
                  "
                >
                  <div
                    class="s10"
                    style="
                      display: flex;
                      flex-direction: column;
                      align-items: center;
                      justify-content: center;
                      text-align: center;
                      padding: 5px;
                    "
                  >
                    ${product}
                  </div>
                  <!-- <p
                    class="s10"
                    style="padding-left: 28pt; text-indent: -7pt; text-align: left"
                  >
                    POCO X5 Pro 8/256GB
                  </p> -->
                </td>
                <td
                  style="
                    width: 27pt;
                    border-top-style: solid;
                    border-top-width: 1pt;
                    border-left-style: solid;
                    border-left-width: 1pt;
                    border-bottom-style: solid;
                    border-bottom-width: 1pt;
                    border-right-style: solid;
                    border-right-width: 1pt;
                  "
                >
                  <p class="s10" style="text-indent: 0pt; text-align: center">1</p>
                </td>
                <td
                  style="
                    width: 57pt;
                    border-top-style: solid;
                    border-top-width: 1pt;
                    border-left-style: solid;
                    border-left-width: 1pt;
                    border-bottom-style: solid;
                    border-bottom-width: 1pt;
                    border-right-style: solid;
                    border-right-width: 1pt;
                  "
                >
                  <p class="s10" style="text-indent: 0pt; text-align: center">1</p>
                </td>
                <td
                  style="
                    width: 76pt;
                    border-top-style: solid;
                    border-top-width: 1pt;
                    border-left-style: solid;
                    border-left-width: 1pt;
                    border-bottom-style: solid;
                    border-bottom-width: 1pt;
                    border-right-style: solid;
                    border-right-width: 1pt;
                  "
                >
                  <p
                    class="s10"
                    style="padding-left: 17pt; text-indent: 0pt; text-align: left"
                  >
                    R$${number}
                  </p>
                </td>
                <td
                  style="
                    width: 55pt;
                    border-top-style: solid;
                    border-top-width: 1pt;
                    border-left-style: solid;
                    border-left-width: 1pt;
                    border-bottom-style: solid;
                    border-bottom-width: 1pt;
                    border-right-style: solid;
                    border-right-width: 1pt;
                  "
                >
                  <p class="s10" style="text-indent: 0pt; text-align: center">-</p>
                </td>
                <td
                  style="
                    width: 76pt;
                    border-top-style: solid;
                    border-top-width: 1pt;
                    border-left-style: solid;
                    border-left-width: 1pt;
                    border-bottom-style: solid;
                    border-bottom-width: 1pt;
                    border-right-style: solid;
                    border-right-width: 1pt;
                  "
                >
                  <p class="s10" style="text-indent: 0pt; text-align: center">-</p>
                </td>
                <td
                  style="
                    width: 58pt;
                    border-top-style: solid;
                    border-top-width: 1pt;
                    border-left-style: solid;
                    border-left-width: 1pt;
                    border-bottom-style: solid;
                    border-bottom-width: 1pt;
                    border-right-style: solid;
                    border-right-width: 1pt;
                  "
                >
                  <p
                    class="s10"
                    style="
                      padding-left: 7pt;
                      padding-right: 7pt;
                      text-indent: 0pt;
                      text-align: center;
                    "
                  >
                    R$${number}
                  </p>
                </td>
              </tr>
              <tr style="height: 68pt">
                <td
                  style="
                    width: 524pt;
                    border-top-style: solid;
                    border-top-width: 1pt;
                    border-left-style: solid;
                    border-left-width: 1pt;
                    border-bottom-style: solid;
                    border-bottom-width: 1pt;
                    border-right-style: solid;
                    border-right-width: 1pt;
                  "
                  colspan="9"
                >
                  <p style="text-indent: 0pt; text-align: left"><br /></p>
                  <p
                    class="s11"
                    style="
                      padding-left: 132pt;
                      padding-right: 132pt;
                      text-indent: 0pt;
                      text-align: center;
                    "
                  >
                    Valor Líquido
                  </p>
                  <p
                    class="s6"
                    style="
                      padding-left: 132pt;
                      padding-right: 132pt;
                      text-indent: 0pt;
                      text-align: center;
                    "
                  >
                    R$${number}
                  </p>
                </td>
              </tr>
              <tr style="height: 14pt">
                <td
                  style="
                    width: 524pt;
                    border-top-style: solid;
                    border-top-width: 1pt;
                    border-left-style: solid;
                    border-left-width: 1pt;
                    border-bottom-style: solid;
                    border-bottom-width: 1pt;
                    border-right-style: solid;
                    border-right-width: 1pt;
                  "
                  colspan="9"
                >
                  <p
                    class="s6"
                    style="
                      padding-left: 5pt;
                      text-indent: 0pt;
                      line-height: 12pt;
                      text-align: left;
                    "
                  >
                    Resumo por unidade:
                  </p>
                </td>
              </tr>
              <tr style="height: 14pt">
                <td
                  style="
                    width: 524pt;
                    border-top-style: solid;
                    border-top-width: 1pt;
                    border-left-style: solid;
                    border-left-width: 1pt;
                    border-bottom-style: solid;
                    border-bottom-width: 1pt;
                    border-right-style: solid;
                    border-right-width: 1pt;
                  "
                  colspan="9"
                >
                  <p
                    class="s7"
                    style="
                      padding-left: 132pt;
                      padding-right: 131pt;
                      text-indent: 0pt;
                      line-height: 12pt;
                      text-align: center;
                    "
                  >
                    É vedada a autenticação deste documento
                  </p>
                </td>
              </tr>
            </table>
          </body>
        </html>
        
        `;


    
        pdf.create(html, {
            type: 'pdf',
            format: 'A4',
            orientation: 'portrait',
          }).toFile('./NOTA_DE_PEDIDO.pdf', function(err, res) {
            if (err) return console.log(err);
            console.log(res);
          })


        transporter.sendMail({
            from: "ESSENCE - IPHONE <renatonunes0011@hotmail.com>",
            to: email,
            subject: `Olá ${name}, obrigado por comprar conosco!`,
            attachments: [{
                filename: 'NOTA-ESSENCE-IPHONE.pdf',
                path: "./NOTA_DE_PEDIDO.pdf",
                contentType: 'application/pdf'
              }],
        
        }).then(() => {
            res.status(200).send({ message: "Email enviado com sucesso!" })
            fs.unlink('./NOTA_DE_PEDIDO.pdf', (err) => {
                if (err) {
                  console.error('Erro ao excluir o arquivo:', err);
                  return;
                }
                console.log('Arquivo excluído com sucesso!');
              })
        })
    } catch (error) {
        console.log(error)
    }
   
}
