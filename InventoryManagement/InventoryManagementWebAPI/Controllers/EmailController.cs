using InventoryManagementWebAPI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Web.Http;
//using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class EmailController : ApiController
    {
        private InventoryManagementDBEntities db = new InventoryManagementDBEntities();

        // GET: api/Logins
        public IQueryable<Login> GetLogins()
        {
            return db.Logins;
        }
        private IHttpActionResult sendEmailViaWebApi(string user_name)
        {
            string subject = "Email Subject";
            string body = "Email body";
            string FromMail = "rakhee02singh@gmail.com";
            string emailTo = "rakheesingh02@gmail.com";
            MailMessage mail = new MailMessage();
            SmtpClient SmtpServer = new SmtpClient("mail.reckonbits.com.pk");

            mail.From = new MailAddress(FromMail);
            mail.To.Add(emailTo);
            mail.Subject = subject;
            mail.Body = body;

            SmtpServer.Port = 25;
            SmtpServer.Credentials = new System.Net.NetworkCredential("rakhee02singh@gmail.com", "rakheeronaksingh");
            SmtpServer.EnableSsl = false;
            SmtpServer.Send(mail);
            return Ok("email send");

        }
    }
}
