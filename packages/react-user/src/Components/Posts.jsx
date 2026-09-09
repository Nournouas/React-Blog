import React, { useState, useEffect } from 'react'
import { Link } from 'react-router';
import { deleteOwnPost, getUserDetails } from '../Utility/API';
import { CTA_DELETE } from '../assets/styles';
import DOMPurify from 'dompurify';
import { cardLinks } from '../Utility/cardLinks';


export default function Posts({ posts, setPub, pub}) {
  const [currentAuthor, setCurrentAuthor] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const handleDeletePost = async (postId) => {
    try{
      await deleteOwnPost(postId);
      await setPub(pub + 1);
    }catch(e){
      setError(e);
    }finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    async function getPosts() {
      try{
        const details = await getUserDetails()
        if (details === "LOGIN"){
          navigate("/login")
        }else{
          setCurrentAuthor(details);
        }
      }catch(e){
        setError(e)
      }finally{
        setLoading(false);
      }
    }
    getPosts();
  }, []);

  let listPosts = posts.map((post) => {
  const pubDate = new Date(post.pubTime);
  const date = `${pubDate.getFullYear()}/${pubDate.getMonth()}/${pubDate.getDay()}  ${pubDate.getHours()}:${pubDate.getMinutes()}`;
  
  return (
    <div key={post.id} className="relative flex flex-col p-4 max-h-100  rounded-sm before:absolute before:inset-0 before:bg-cover before:bg-[url(/paper-bg.jpg)] before:opacity-30 before:content-[''] before:pointer-events-none" >
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
        <div className='max-h-40 overflow-hidden' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.body, {
            ALLOWED_TAGS: ['p','br','b','strong','i','em','u','s','strike','ul','ol','li','a','blockquote','code','pre','h1','h2','h3','h4'],
            ALLOWED_ATTR: ['href','target','rel']
          })}}></div>
        }
        <div className='flex flex-row justify-between items-center mt-8'>
          <Link to={"/posts/" + post.id} className="p-2 bg-background z-2 text-sm rounded-s text-white hover:bg-black transition delay-50 duration-120 ease-in-out"> View Post</Link>
          {currentAuthor && currentAuthor.id === post.authorId && 
            <button 
            onClick={() => handleDeletePost(post.id)}
            className={CTA_DELETE}>
              Delete
            </button>
            }
        </div>
    </div>
  )
});

if (loading != true && error === undefined){
  return (
    listPosts
  )
}else{
  return(
    <h3 className='text-red-700'>Error While Deleting...</h3>
  )
}
}