 (function() {
    'use strict';

    angular
        .module('app')
        .controller('PostsController', PostsController);

    PostsController.$inject = ['PostsFactory', 'CommentsFactory', 'authService'];

    /* @ngInject */
    function PostsController(PostsFactory, CommentsFactory, authService) {

        //setting variables I will use later
        var vm = this;
        vm.posts = [];
        vm.commentBody = '';
        var comment = {};
        var serverComment = {};
        var comments = [];
        var postIndex;
        //set to work with in here
        var currentUser = authService.get();
        //set to display on the page
        vm.currentUser = currentUser;

        initialize();

        //loads the posts and their comments from the server when the user is authenticated
        function initialize() {

            PostsFactory.getPosts().then(
                function(response) {
                    console.log(response);
                    //iterating through the posts to put them into the local array
                    for (var i = 0; i < response.data.length; i++) {

                        //iterating through the comments on each post to prepare them for lacal insertion
                        for (var j = 0; j < response.data[i].Comments.length; j++) {
                            comment.postId = response.data[i].Comments[j].PostId;
                            comment.userId = response.data[i].Comments[j].UserId;
                            comment.text = response.data[i].Comments[j].text;
                            comment.user = response.data[i].Comments[j].User;
                            comment.serverId = response.data[i].Comments[j].CommentId;

                            comments.push(comment);
                            comment = {};

                        }
                        //putting the post with the comments into the local array
                        vm.posts.push({
                            text: response.data[i].Text,
                            upvotes: response.data[i].LikeCount,
                            userName: response.data[i].User.Email,
                            date: response.data[i].CreatedDate,
                            serverId: response.data[i].PostId,
                            user: response.data[i].User,
                            userId: response.data[i].UserId,
                            commentBody: '',
                            comments: comments
                        });

                        //clearing my variables for the next loop
                        comments = [];
                        comment = {};

                    }
                },
                function(error) {
                    console.log(error);
                });
        }

        //add a post to the local computer as well as to the server
        vm.add = function() {

            //posting the post to the server
            PostsFactory.postPost(vm.postBody).then(
                function(response) {
                    //pushing the post to the local array with some relevant information from the servers succesful repsonse utilized
                    vm.posts.push({
                        text: vm.postBody,
                        upvotes: 0,
                        userName: response.data.User.Email,
                        date: response.data.CreatedDate,
                        serverId: response.data.PostId,
                        user: response.data.User,
                        userId: response.data.UserId,
                        commentBody: '',
                        comments: [{}]
                    })
                },
                function(error) {
                    console.log(error);
                });


        };

        vm.comment = function(post) {

            //build the comment to put back on the server
            serverComment.PostId = post.serverId;
            serverComment.UserId = post.userId;
            serverComment.text = post.commentBody;

            //post it into the server
            CommentsFactory.postComment(serverComment).then(
                function(response) {

                    //build the comment to put into the local array
                    comment.postId = post.serverId;
                    comment.userId = response.data.UserId;
                    comment.text = post.commentBody;
                    comment.user = response.data.User;
                    comment.serverId = response.data.CommentId;

                    post.comments.push(comment);

                    //clear local variables
                    comment = {};
                    serverComment = {};

                },
                function(error) {
                    console.log(error);
                });



        };

        vm.upvote = function(post) {
            post.upvotes = post.upvotes + 1;
        };

        vm.deletePost = function(post) {

            //delete the post from the local array
            vm.posts.splice(vm.posts.indexOf(post), 1);

            //delete the post from the server
            PostsFactory.deletePost(post);

        };

        vm.deleteComment = function(post, comment) {

            //grab the post index so I know which post to delete a comment from in the local array
            postIndex = vm.posts.indexOf(post);

            //splice the array to delete the element at the index of the comment parameter in the correct comment array
            vm.posts[postIndex].comments.splice(vm.posts[postIndex].comments.indexOf(comment), 1);

            //delete the comment on the server
            CommentsFactory.deleteComment(comment.serverId);

        };

        vm.logout = function() {

            authService.logout();
        };

        vm.isCurrentUser = function(email) {

            if (email == currentUser) {
                return true;
            } else {
                return false;
            }
        };


    }
})();
