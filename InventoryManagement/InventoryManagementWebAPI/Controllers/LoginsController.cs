using InventoryManagementWebAPI;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Mail;
//using WebAPI.Models;
//using System.Web.Http;

namespace WebAPI.Controllers
{
    public class LoginsController : ApiController
    {
        private InventoryManagementDBEntities db = new InventoryManagementDBEntities();

        // GET: api/Logins
        public IQueryable<Login> GetLogins()
        {
            return db.Logins;
        }

        //send email
        [System.Web.Http.AcceptVerbs("GET", "POST")]
        [System.Web.Http.HttpGet]
        [HttpPost]
        public IHttpActionResult sendEmailViaWebApi([FromUri]Login login)
        {
            //string subject = "Email Subject";
            //string body = "Email body";
            //string FromMail = "rakhee02singh@gmail.com";
            //string emailTo = "rakheesingh02@gmail.com";
            //System.Net.Mail.MailMessage mail = new System.Net.Mail.MailMessage();
            //SmtpClient SmtpServer = new SmtpClient("mail.reckonbits.com.pk");

            //mail.From = new MailAddress(FromMail);
            //mail.To.Add(emailTo);
            //mail.Subject = subject;
            //mail.Body = body;

            //SmtpServer.Port = 25;
            //SmtpServer.Credentials = new System.Net.NetworkCredential("rakhee02singh@gmail.com", "rakheeronaksingh");
            //SmtpServer.EnableSsl = false;
            //SmtpServer.Send(mail);
            // Gmail Address from where you send the mail
            Random r = new Random();
            //string password =Convert.ToString(r.Next());
            var fromAddress = "inventorymanagementapp@gmail.com";
            // any address where the email will be sending
            var toAddress = login.user_name;
            //Password of your gmail address
            const string fromPassword = "Inventory";
            // Passing the values and make a email formate to display
            string subject = "Sucessfull Registration";
            string body = "From: Inventory Management system" + "/n" ;
            body += "Please confirm if this your valid email ID, We are sending your password, Please Login into the application using this password " + "/n";
            body += "Password: " + login.password;
            try
            {
                // smtp settings
                var smtp = new System.Net.Mail.SmtpClient();
                {
                    smtp.Host = "smtp.gmail.com";
                    smtp.Port = 587;
                    smtp.EnableSsl = true;
                    smtp.DeliveryMethod = System.Net.Mail.SmtpDeliveryMethod.Network;
                    smtp.Credentials = new NetworkCredential(fromAddress, fromPassword);
                    //smtp.Timeout = 20000;
                }
                // Passing values to smtp object
                smtp.Send(fromAddress, toAddress, subject, body);
            }
            catch(Exception e)
                {
                string err = e.ToString();

            }
            return Ok(login);

        }

        // GET: api/Logins/5
        [ResponseType(typeof(Login))]
        public IHttpActionResult GetLogin(int id)
        {
            Login login = db.Logins.Find(id);
            if (login == null)
            {
                return NotFound();
            }

            return Ok(login);
        }
        //rks
        [HttpGet]
        public Boolean GetLoginsSucess([FromUri]Login login)
        {
            Login loginGetdata = new Login();
            using (var ctx = new InventoryManagementDBEntities())
            {
                loginGetdata = ctx.Logins.Where(s => s.password == login.password && s.user_name == login.user_name).FirstOrDefault();
            }

            //2. change student name in disconnected mode (out of ctx scope)
            if (loginGetdata != null)
            {
                return true;
            }
            else
            {
                return false;
            }


        }
        //get Id of user
        //rks
        [HttpGet]
        public IHttpActionResult GetLoginsSucessUserID([FromUri]Login login)
        {
            Login loginGetdata = new Login();
            using (var ctx = new InventoryManagementDBEntities())
            {
                loginGetdata = ctx.Logins.Where(s => s.password == login.password && s.user_name == login.user_name).FirstOrDefault();
            }

            //2. change student name in disconnected mode (out of ctx scope)
            if (loginGetdata != null)
            {
                login.User_ID = loginGetdata.User_ID;
                return Ok(login);
            }
            else
            {
                return Ok(login);
            }


        }

        //check username is already exists or not
        [HttpGet]
        public Boolean GetUserName([FromUri]Login login)
        {
            Login loginGetdata = new Login();
            using (var ctx = new InventoryManagementDBEntities())
            {
                loginGetdata = ctx.Logins.Where(s => s.user_name == login.user_name) .FirstOrDefault();
            }

            //2. change student name in disconnected mode (out of ctx scope)
            if (loginGetdata != null)
            {
                return true;
            }
            else
            {
                return false;
            }


        }
        //rks
        [HttpPost]
        public  IHttpActionResult Savedata1(Login login)
        {
            // create new Student entity object in disconnected scenario (out of the scope of DbContext)
            //var login = new Login();

            //set student name
            //login.Name = "testing";

            //create DBContext object
            using (var dbCtx = new InventoryManagementDBEntities())
            {
                //Add Student object into Students DBset
                dbCtx.Logins.Add(login);

                // call SaveChanges method to save student into database
                dbCtx.SaveChanges();
            }
            return Ok(login);
        }
        [HttpPut]
        public Boolean UpdateData(Login login)
        {
            //1. Get student from DB
            Login loginGetdata = new Login();
            using (var ctx = new InventoryManagementDBEntities())
            {
                loginGetdata = ctx.Logins.Where(s => s.User_ID == login.User_ID).FirstOrDefault<Login>();
            }

            //2. change student name in disconnected mode (out of ctx scope)
            if (loginGetdata != null)
            {
                loginGetdata.user_name = login.user_name;
            }

            //save modified entity using new Context
            using (var dbCtx = new InventoryManagementDBEntities())
            {
                //3. Mark entity as modified
                dbCtx.Entry(loginGetdata).State = System.Data.Entity.EntityState.Modified;

                //4. call SaveChanges
                dbCtx.SaveChanges();
            }
            return true;
        }
        //Change password
        [HttpPut]
        public IHttpActionResult ChangePassword([FromBody]Login login)
        {
            //1. Get student from DB
            Login loginGetdata = new Login();
            using (var ctx = new InventoryManagementDBEntities())
            {
                loginGetdata = ctx.Logins.Where(s => s.user_name == login.user_name).FirstOrDefault<Login>();
            }

            //2. change student name in disconnected mode (out of ctx scope)
            if (loginGetdata != null)
            {
                loginGetdata.password = login.password;
            }

            //save modified entity using new Context
            using (var dbCtx = new InventoryManagementDBEntities())
            {
                //3. Mark entity as modified
                dbCtx.Entry(loginGetdata).State = System.Data.Entity.EntityState.Modified;

                //4. call SaveChanges
                dbCtx.SaveChanges();
                return Ok(login);
            }
           
        }

        [HttpPut]
        public IHttpActionResult ForgotPasswoord([FromBody]Login login)
        {
            //1. Get student from DB
            Login loginGetdata = new Login();
            using (var ctx = new InventoryManagementDBEntities())
            {
                loginGetdata = ctx.Logins.Where(s => s.user_name == login.user_name).FirstOrDefault<Login>();
            }

            //2. change student name in disconnected mode (out of ctx scope)
            if (loginGetdata != null)
            {
                loginGetdata.password = login.password;
            }

            //save modified entity using new Context
            using (var dbCtx = new InventoryManagementDBEntities())
            {
                //3. Mark entity as modified
                dbCtx.Entry(loginGetdata).State = System.Data.Entity.EntityState.Modified;

                //4. call SaveChanges
                dbCtx.SaveChanges();
                sendEmailViaWebApi(login);
                return Ok(login);
            }

        }
        //delete
        [HttpDelete]
        public IHttpActionResult DeleteData(int login)
        {

            //Login logindata;
            
                return Ok(login);
            
            //1. Get student from DB
            //using (var ctx = new Login_DBEntities1())
            //{
            //    logindata = ctx.Logins.Where(s => s.User_ID == login.User_ID).FirstOrDefault<Login>();
            //}

            //if (logindata != null)
            //{
            //    //Create new context for disconnected scenario
            //    using (var newContext = new Login_DBEntities1())
            //    {
            //        newContext.Entry(logindata).State = System.Data.Entity.EntityState.Deleted;

            //        newContext.SaveChanges();
            //    }
            //}
           
            //return true;
        }


        // PUT: api/Logins/5
        //[ResponseType(typeof(void))]
        //public IHttpActionResult PutLogin(int id, Login login)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    if (id != login.User_ID)
        //    {
        //        return BadRequest();
        //    }

        //    db.Entry(login).State = EntityState.Modified;

        //    try
        //    {
        //        db.SaveChanges();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!LoginExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return StatusCode(HttpStatusCode.NoContent);
        //}

        //// POST: api/Logins
        ////[ResponseType(typeof(Login))]
        ////public IHttpActionResult PostLogin(Login login)
        ////{
        ////    if (!ModelState.IsValid)
        ////    {
        ////        return BadRequest(ModelState);
        ////    }

        ////    db.Logins.Add(login);
        ////    db.SaveChanges();

        ////    return CreatedAtRoute("DefaultApi", new { id = login.User_ID }, login);
        ////}

        //// DELETE: api/Logins/5
        //[ResponseType(typeof(Login))]
        //public IHttpActionResult DeleteLogin(int id)
        //{
        //    Login login = db.Logins.Find(id);
        //    if (login == null)
        //    {
        //        return NotFound();
        //    }

        //    db.Logins.Remove(login);
        //    db.SaveChanges();

        //    return Ok(login);
        //}

        //protected override void Dispose(bool disposing)
        //{
        //    if (disposing)
        //    {
        //        db.Dispose();
        //    }
        //    base.Dispose(disposing);
        //}

        //private bool LoginExists(int id)
        //{
        //    return db.Logins.Count(e => e.User_ID == id) > 0;
        //}
    }
}