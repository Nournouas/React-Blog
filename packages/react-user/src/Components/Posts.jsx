import React from 'react'
import { Link } from 'react-router';

export default function Posts({ posts }) {
    let listPosts = posts.map((post) => {
    //<p key={post.id}>
      //{post.title} {post.authorName} {post.body} {post.pubTime} {post.pubStatus} {post.comments}
    //</p>
    
    const pubDate = new Date(post.pubTime);
    const date = `${pubDate.getFullYear()}/${pubDate.getMonth()}/${pubDate.getDay()}  ${pubDate.getHours()}:${pubDate.getMinutes()}`;
    return <div key={post.id} className="relative flex flex-col p-4  rounded-sm before:absolute before:inset-0 before:bg-cover before:bg-[url(/paper-bg.jpg)] before:opacity-30 before:content-[''] before:pointer-events-none" >
        <h2 className='text-primary'>{post.title}</h2>
        <Link to={"/users/" + post.authorId} >By: {post.authorName}</Link>
        <br />
        <p>{post.body}</p>
        <p>{date}</p>
    </div>
  });
  return (
    listPosts
  )
}