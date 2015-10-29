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
    public class PersonnelController : ApiController
    {
        private InventoryManagementDBEntities db = new InventoryManagementDBEntities();

        // GET: api/Logins
        public IQueryable<Personnel> GetPersonnelDetails()
        {
            return db.Personnels;
        }

        [HttpPost]
        public IHttpActionResult SavePersonnel([FromBody]Personnel personnel)
        {
            // create new Student entity object in disconnected scenario (out of the scope of DbContext)
            //var login = new Login();

            //set student name
            //login.Name = "testing";

            //create DBContext object
            using (var dbCtx = new InventoryManagementDBEntities())
            {
                //Add Student object into Students DBset
                dbCtx.Personnels.Add(personnel);

                // call SaveChanges method to save student into database
                dbCtx.SaveChanges();
            }
            return Ok(personnel);
        }
    }
}
