using Chirper.API.Models;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Web;

namespace Chirper.API.Infrastructure
{
    public class ChirperDataContext : IdentityDbContext<ChirperUser>
    {
        public ChirperDataContext() : base("Chirper")
        {

        }

        public IDbSet<Like> Likes { get; set; }
        public IDbSet<Post> Posts { get; set; }
        public IDbSet<Comment> Comments { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            //config the 1 - * relationship between post and like
            modelBuilder.Entity<Post>()
                .HasMany(p => p.Likes)
                .WithRequired(c => c.Post)
                .HasForeignKey(c => c.PostId);

            //config the 1 - * relationship between post and comment
            modelBuilder.Entity<Post>()
                .HasMany(p => p.Comments)
                .WithRequired(c => c.Post)
                .HasForeignKey(c => c.PostId);

            //config 1-* elationship between user and post
            modelBuilder.Entity<ChirperUser>()
                .HasMany(u => u.Posts)
                .WithRequired(p => p.User)
                .HasForeignKey(p => p.UserId);

            //config 1-* elationship between user and like
            modelBuilder.Entity<ChirperUser>()
                .HasMany(u => u.Likes)
                .WithRequired(c => c.User)
                .HasForeignKey(c => c.UserId)
                .WillCascadeOnDelete(false); 

            //config 1-* elationship between user and comment
            modelBuilder.Entity<ChirperUser>()
                .HasMany(u => u.Comments)
                .WithRequired(c => c.User)
                .HasForeignKey(c => c.UserId)
                .WillCascadeOnDelete(false);

            base.OnModelCreating(modelBuilder);


        }



    }
}