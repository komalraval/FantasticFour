//------------------------------------------------------------------------------
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
    using System.Collections.Generic;
    
    public partial class User_Details
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public User_Details()
        {
            this.Personnels = new HashSet<Personnel>();
        }
    
        public int User_ID_Ref { get; set; }
        public string First_Name { get; set; }
        public string Last_Name { get; set; }
        public string Mobile_Number { get; set; }
        public string Email_ID { get; set; }
        public string User_Type { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Personnel> Personnels { get; set; }
        public virtual UsedInventoryDetailsTbl UsedInventoryDetailsTbl { get; set; }
    }
}
