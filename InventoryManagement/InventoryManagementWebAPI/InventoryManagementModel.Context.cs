﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace InventoryManagementWebAPI
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class InventoryManagementDBEntities : DbContext
    {
        public InventoryManagementDBEntities()
            : base("name=InventoryManagementDBEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<InventoryItemtbl> InventoryItemtbls { get; set; }
        public virtual DbSet<InventoryList> InventoryLists { get; set; }
        public virtual DbSet<Login> Logins { get; set; }
        public virtual DbSet<Personnel> Personnels { get; set; }
        public virtual DbSet<UsedInventoryDetailsTbl> UsedInventoryDetailsTbls { get; set; }
        public virtual DbSet<User_Details> User_Details { get; set; }
    }
}
