using InventoryManagementWebAPI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
//using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class UserController : ApiController
    {
        private InventoryManagementDBEntities db = new InventoryManagementDBEntities();

        // GET: api/Logins
        public IQueryable<User_Details> GetUser()
        {
            return db.User_Details;
        }

        [HttpPost]
        public IHttpActionResult SaveUser(User_Details user_detail)
        {
            // create new Student entity object in disconnected scenario (out of the scope of DbContext)
            //var login = new Login();

            //set student name
            //login.Name = "testing";

            //create DBContext object
            using (var dbCtx = new InventoryManagementDBEntities())
            {
                //Add Student object into Students DBset
                dbCtx.User_Details.Add(user_detail);

                // call SaveChanges method to save student into database
                dbCtx.SaveChanges();
            }
            return Ok(user_detail);
        }
    }
}
