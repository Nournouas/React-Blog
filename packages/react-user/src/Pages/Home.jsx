import React, { useEffect, useState } from 'react'
import { getAllPosts } from '../Utility/API';
import { Link, useNavigate } from 'react-router';
import { Navbar } from '../Components/Navbar';
import CreatePost from '../Components/CreatePost';
import Posts from '../Components/Posts';


export default function Home() {
  const [posts, setPosts] = useState(undefined);
  const [published, setPublished] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;
    async function getPosts() {
      const fetchedPosts = await getAllPosts();
      if (ignore) return;
      if (fetchedPosts === "LOGIN"){
        navigate("/login")
      }else{
        setPosts(fetchedPosts);
      }
    }
    getPosts();

    return () => { ignore = true };
  }, [published]);

if (posts != undefined){
  return (
    <div className='flex flex-col items-center h-full'>
      <Navbar/>
      <div className='w-full  max-w-[300px] md:max-w-[500px] lg:max-w-[700px]'>
        <div className='flex flex-col h-full gap-6 bg-secondary p-6 w-full text-black'>
          <h1 className='self-center'>Writings</h1>
          < Posts posts={posts} setPub={setPublished} pub={published}/>
        </div>
      </div>
    </div>
  )
}
}
