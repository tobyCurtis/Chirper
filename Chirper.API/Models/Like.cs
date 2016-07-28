using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Chirper.API.Models
{
    public class Like
    {
        public int LikeId { get; set; }
        public int PostId { get; set; }
        public string UserId { get; set; }

        public virtual Post Post { get; set; }
        public virtual ChirperUser User { get; set; }
    }
}