using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Chirper.API.Models
{
    public class Post
    {
        //Primary Key
        public int PostId { get; set; }
        public string UserId { get; set; }

        //Keys relevant to post
        public int LikeCount { get; set; }
        public DateTime CreatedDate { get; set; }
        public string Text { get; set; }


        //relationship fields
        public virtual ChirperUser User { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<Like> Likes { get; set; }
    }
}