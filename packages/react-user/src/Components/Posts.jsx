import React, { useState, useEffect } from 'react'
import { Link } from 'react-router';
import { deleteOwnPost, getUserDetails } from '../Utility/API';
import { CTA_DELETE } from '../assets/styles';


export default function Posts({ posts, setPub, pub}) {
  const parser = new DOMParser();
      const cardLinks = [
      "/t-1.webp",
      "/t-2.webp",
      "/t-3.webp",
      "/t-4.webp",
      "/t-5.webp",
      "/t-6.webp",
      "/t-7.webp",
      "/t-8.webp",
      "/t-9.webp",
      "/t-10.webp",
      "/t-11.webp",
      "/t-12.webp",
    ]

    const [currentAuthor, setCurrentAuthor] = useState(undefined);
    const handleDeletePost = async (postId) => {
      const response = await deleteOwnPost(postId)
      if (response) console.log("deleted");
      await setPub(pub + 1);
    }
    useEffect(() => {
      async function getPosts() {
        const details = await getUserDetails()
        if (details === "LOGIN"){
          navigate("/login")
        }else{
          setCurrentAuthor(details);
        }
      }
      getPosts();
    }, []);

    let listPosts = posts.map((post) => {
    const pubDate = new Date(post.pubTime);
    const date = `${pubDate.getFullYear()}/${pubDate.getMonth()}/${pubDate.getDay()}  ${pubDate.getHours()}:${pubDate.getMinutes()}`;
    return <div key={post.id} className="relative flex flex-col p-4  rounded-sm before:absolute before:inset-0 before:bg-cover before:bg-[url(/paper-bg.jpg)] before:opacity-30 before:content-[''] before:pointer-events-none" >
        <div className='flex flex-row gap-2 items-center'>
          <img src={cardLinks[post.author.tarot]} alt="" className='max-h-20' />
          <div className='flex flex-row justify-between w-full'>
            <div className='flex flex-col'>
              <h2 className='text-primary text-2xl leading-10'>{post.title}</h2>
              <Link className='underline' to={"/users/" + post.authorId} >By: {post.authorName}</Link>
            </div>
            <p>{date}</p>
          </div>
        </div>
        
        <br />
        {
        <div dangerouslySetInnerHTML={{ __html: post.body}}></div>
        }
        {currentAuthor && currentAuthor.id === post.authorId && 
          <button 
          onClick={() => handleDeletePost(post.id)}
          className={CTA_DELETE}>
            Delete
          </button>
        }
    </div>
  });
  return (
    listPosts
  )
}