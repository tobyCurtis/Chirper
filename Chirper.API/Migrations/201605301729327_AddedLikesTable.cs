namespace Chirper.API.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedLikesTable : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Likes",
                c => new
                    {
                        LikeId = c.Int(nullable: false, identity: true),
                        PostId = c.Int(nullable: false),
                        UserId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => t.LikeId)
                .ForeignKey("dbo.AspNetUsers", t => t.UserId)
                .ForeignKey("dbo.Posts", t => t.PostId, cascadeDelete: true)
                .Index(t => t.PostId)
                .Index(t => t.UserId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Likes", "PostId", "dbo.Posts");
            DropForeignKey("dbo.Likes", "UserId", "dbo.AspNetUsers");
            DropIndex("dbo.Likes", new[] { "UserId" });
            DropIndex("dbo.Likes", new[] { "PostId" });
            DropTable("dbo.Likes");
        }
    }
}
