namespace Chirper.API.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class changedDateTimeNullable : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Comments", "CreatedDate", c => c.DateTime());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Comments", "CreatedDate", c => c.DateTime(nullable: false));
        }
    }
}
