using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace InventoryManagementServices
{
    public class EFBasicCommonOperations
    {
        public static string getUserName()
        {
            string username = string.Empty;

            using (var dbCtx = new InventoryManagementDBEntities())
            {
                var loginDetails = dbCtx.Logintbls.FirstOrDefault();
                username = loginDetails.UserName;
            }

            return username;
        }

        public static bool SaveData(Logintbl loginData)
        {
            bool tReturn = false;

            using (var dbCtx = new InventoryManagementDBEntities())
            {
                dbCtx.Logintbls.Add(loginData);

                // call SaveChanges method to save student into database
                dbCtx.SaveChanges();
            }


            return tReturn;
        }
    }
}