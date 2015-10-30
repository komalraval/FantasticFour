using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Web.Http;

namespace InventoryManagementWebAPI.Controllers
{
    public class ReportsController : ApiController
    {
        //send email
        //[System.Web.Http.AcceptVerbs("GET", "POST")]
        //[System.Web.Http.HttpGet]
        [System.Web.Http.AcceptVerbs("GET", "POST")]
        [System.Web.Http.HttpGet]
        [HttpPost]
        public string ExportReport()
        {

            string message = string.Empty;
           
                     
            //var fromAddress = "inventorymanagementapp@gmail.com";
           
            //var toAddress = "komal.raval@allscripts.com";
            
            //const string fromPassword = "Inventory";
           
            try
            {
                

                //MailMessage mail = new MailMessage();
                //SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
                //mail.From = new MailAddress(fromAddress);
                //mail.To.Add(toAddress);
                //mail.Subject = "Test Mail - 1";
                //mail.Body = "mail with attachment";

                //System.Net.Mail.Attachment attachment;
                //attachment = new System.Net.Mail.Attachment(@"C:\Users\K735701\Desktop\test.xlsx");
                //mail.Attachments.Add(attachment);
                //SmtpServer.Port = 587;
                //SmtpServer.Credentials = new System.Net.NetworkCredential(fromAddress, fromPassword);
                //SmtpServer.EnableSsl = true;

                //SmtpServer.Send(mail);
                message = "Success";


              
            }
            catch (Exception e)
            {
                string err = e.ToString();
                message = "Error";

            }
             return message;
          //  return Ok();

        }
    }
}
