using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Results;


namespace InventoryManagementWebAPI.Controllers
{

    public class InventoryController : ApiController
    {
        //// GET api/<controller>
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        //// GET api/<controller>/5
        //public string Get(int id)
        //{
        //    return "value";
        //}

        //// POST api/<controller>
        //public void Post([FromBody]string value)
        //{
        //}

        //// PUT api/<controller>/5
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        //// DELETE api/<controller>/5
        //public void Delete(int id)
        //{
        //}

        //[Route("api/Inventory/GetListOfInventoryItems")]
        [HttpGet]
        public List<classInventoryItems> GetListOfInventoryItems()
        {
            List<classInventoryItems> listInventoryItem = new List<classInventoryItems>();

            using (var dbCtx = new InventoryManagementDBEntities())
            {
                var inventoryItemDetails = dbCtx.InventoryLists;
                foreach (InventoryList obj in inventoryItemDetails)
                {
                    classInventoryItems item = new classInventoryItems();
                    item.Id = obj.InventoryListId;
                    item.ItemName = obj.ItemName;
                    item.Percentage = obj.Percentage.ToString();
                    item.TotalCost = obj.TotalCost.ToString();
                    item.UnitType = obj.UnitType;
                    item.TotalItems = obj.TotalItems.ToString();

                    listInventoryItem.Add(item);
                }
            }

            return listInventoryItem;
        }


        [HttpPost]
        public string SaveInventoryItemName([FromBody]classItemName objItem)
        {
            string IsSuccessOrError = string.Empty;
            string message = string.Empty;
            string itemName = objItem.itemName;

            try
            {

                using (var dbCtx = new InventoryManagementDBEntities())
                {
                    var inventoryItemDetails = dbCtx.InventoryLists;
                    if (inventoryItemDetails != null)
                    {

                        InventoryList obj = inventoryItemDetails.Where(p => p.ItemName == itemName).FirstOrDefault<InventoryList>();


                        if (obj == null)
                        {

                            InventoryList objInventoryList = new InventoryList();
                            objInventoryList.ItemName = itemName;
                            dbCtx.InventoryLists.Add(objInventoryList);
                            dbCtx.SaveChanges();
                            IsSuccessOrError = "Success";
                        }
                        else
                        {
                            message = "Item is already exists in system.";
                            IsSuccessOrError = "Error";
                        }
                    }

                }



            }
            catch (Exception ex)
            {

                IsSuccessOrError = "Error" + ";" + ex.Message;
                return IsSuccessOrError;
            }

            return IsSuccessOrError + ";" + message;
        }

        [HttpDelete]
        public string DeleteInventoryItem([FromUri]int Id)
        {
            string message = string.Empty;

            try
            {
                InventoryList inventoryItemToDelete;
                //1. Get student from DB
                using (var ctx = new InventoryManagementDBEntities())
                {
                    inventoryItemToDelete = ctx.InventoryLists.Where(s => s.InventoryListId == Id).FirstOrDefault<InventoryList>();
                }

                //Create new context for disconnected scenario
                using (var newContext = new InventoryManagementDBEntities())
                {
                    newContext.Entry(inventoryItemToDelete).State = System.Data.Entity.EntityState.Deleted;

                    newContext.SaveChanges();

                    message = "Success";
                }


            }
            catch (Exception)
            {
                message = "Error";
                return message;
            }
            return message;
        }

        [HttpGet]
        public List<classInventoryItemsDetails> GetListOfInventoryItemsDetails()
        {
            List<classInventoryItemsDetails> listInventoryItemDetails = new List<classInventoryItemsDetails>();

            try
            {
                using (var dbCtx = new InventoryManagementDBEntities())
                {
                    var inventoryItemDetails = dbCtx.InventoryItemtbls;
                    foreach (InventoryItemtbl obj in inventoryItemDetails)
                    {
                        /// Console.WriteLine("message : " + idList.itemId);
                        //if (obj.InventoryListId == idList)
                        //{
                        classInventoryItemsDetails item = new classInventoryItemsDetails();
                        item.IdDetails = obj.InventoryItemId;
                        item.IdItem = obj.InventoryListId;
                        // item.IdUser = obj.UserId;
                        item.Location = obj.Location;
                        item.UnitType = obj.UnitType;
                        item.Price = obj.Price;
                        item.Quantity = obj.Quantity.ToString();
                        item.DateOfBuying = obj.DateOfBuying;
                        listInventoryItemDetails.Add(item);
                        // }
                    }
                }

            }
            catch (Exception ex)
            {

                Console.WriteLine("Error : " + ex.Message);
            }

            return listInventoryItemDetails;
        }

        [HttpGet]
        public classInventoryItemsDetails GetInventoryItemsDetailsById(int Id)
        {
            classInventoryItemsDetails item = new classInventoryItemsDetails();

            using (var dbCtx = new InventoryManagementDBEntities())
            {
                var obj = dbCtx.InventoryItemtbls.FirstOrDefault(p => p.InventoryItemId == Id);

                if (obj != null)
                {
                    item.IdDetails = obj.InventoryItemId;
                    item.IdItem = obj.InventoryListId;
                    // item.IdUser = obj.UserId;
                    item.Location = obj.Location;
                    item.UnitType = obj.UnitType;
                    item.Price = obj.Price;
                    item.Quantity = obj.Quantity.ToString();
                    item.DateOfBuying = obj.DateOfBuying;
                    return item;
                }


            }

            return item;
        }


        [HttpPost]
        public string AddInventoryItemDetails([FromBody]classInventoryItemsDetails objItem)
        {
            string IsSuccessOrError = string.Empty;
            string message = string.Empty;

            try
            {

                using (var dbCtx = new InventoryManagementDBEntities())
                {
                    InventoryItemtbl entity = new InventoryItemtbl();
                    entity.DateOfBuying = objItem.DateOfBuying;
                    // entity.InventoryItemId = objItem.IdDetails;
                    entity.InventoryListId = objItem.IdItem;
                    entity.Location = objItem.Location;
                    entity.Price = objItem.Price;
                    entity.Quantity = objItem.Quantity;
                    entity.UnitType = objItem.UnitType;
                    //entity.UserId = 0;


                    dbCtx.InventoryItemtbls.Add(entity);

                    dbCtx.SaveChanges();
                    IsSuccessOrError = "Success";
                    message = "Item has been added successfully.";
                }



            }
            catch (Exception ex)
            {
                message = "Error While adding item in Database.";
                IsSuccessOrError = "Error";
                return IsSuccessOrError + ";" + message;
            }

            return IsSuccessOrError + ";" + message;
        }

        [HttpPut]
        public string UpdateInventoryItemDetails([FromBody]classInventoryItemsDetails objItem)
        {
            string IsSuccessOrError = string.Empty;
            string message = string.Empty;
            //IsSuccessOrError = "UpdateInventoryItemDetails : " + objItem.IdDetails.ToString();
            try
            {
                InventoryItemtbl inventoryDetails;
                using (var ctx = new InventoryManagementDBEntities())
                {
                    IsSuccessOrError = "ErrorBeforeNull : objItem.IdDetails" + objItem;
                    inventoryDetails = ctx.InventoryItemtbls.Where(s => s.InventoryItemId == objItem.IdDetails).FirstOrDefault();
                    IsSuccessOrError = "hi";
                }


                //2. change student name in disconnected mode (out of ctx scope)
                if (inventoryDetails != null)
                {
                    IsSuccessOrError = "ErrorAfterNull";
                    inventoryDetails.DateOfBuying = objItem.DateOfBuying;
                    inventoryDetails.Location = objItem.Location;
                    inventoryDetails.Price = objItem.Price;
                    inventoryDetails.Quantity = objItem.Quantity;
                    inventoryDetails.UnitType = objItem.UnitType;


                    //save modified entity using new Context
                    using (var dbCtx = new InventoryManagementDBEntities())
                    {
                        IsSuccessOrError = "ErrorUpdateNull";
                        //3. Mark entity as modified
                        dbCtx.Entry(inventoryDetails).State = System.Data.Entity.EntityState.Modified;

                        //4. call SaveChanges
                        dbCtx.SaveChanges();

                        IsSuccessOrError = "Success";
                    }
                }





            }
            catch (Exception ex)
            {

                //   IsSuccessOrError = "Error" + ex.Message + ": Inner Exception : " + ex.InnerException;
                return IsSuccessOrError;
            }

            return IsSuccessOrError + ";" + message;
        }

        [HttpDelete]
        public string DeleteInventoryItemDetails([FromUri]int id)
        {
            string message = string.Empty;

            try
            {
                InventoryItemtbl inventoryItemDetailsToDelete;
                //1. Get student from DB
                using (var ctx = new InventoryManagementDBEntities())
                {
                    inventoryItemDetailsToDelete = ctx.InventoryItemtbls.Where(s => s.InventoryItemId == id).FirstOrDefault<InventoryItemtbl>();
                }

                //Create new context for disconnected scenario
                using (var newContext = new InventoryManagementDBEntities())
                {
                    newContext.Entry(inventoryItemDetailsToDelete).State = System.Data.Entity.EntityState.Deleted;

                    newContext.SaveChanges();

                    message = "Success";
                }


            }
            catch (Exception)
            {
                message = "Error";
                return message;
            }
            return message;
        }
    }

    public class classInventoryItemsDetails
    {
        public int IdDetails { get; set; }

        public int IdItem { get; set; }
        // public int IdUser { get; set; }

        public string Price { get; set; }

        public string DateOfBuying { get; set; }
        public string Location { get; set; }

        public string Quantity { get; set; }

        public string UnitType { get; set; }

        //  public string SuccessMessage { get; set; }
    }

    public class classInventoryItems
    {
        public int Id { get; set; }
        public string ItemName { get; set; }

        public string TotalCost { get; set; }

        public string Percentage { get; set; }

        public string UnitType { get; set; }
        public string TotalItems { get; set; }
    }

    public class classItemName
    {
        public string itemName { get; set; }
    }

    public class classItemID
    {
        public int itemId { get; set; }
    }
}
