using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace InventoryManagementServices.Controllers
{
    public class LoginController : ApiController
    {
        [ActionName("GetLogin")]
        public string GetLogin()
        {
            string str = string.Empty;

            str = EFBasicCommonOperations.getUserName();
            return str;
        }

    }
}
