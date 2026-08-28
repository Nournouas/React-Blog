import React, { useEffect, useState } from 'react'
import { getOwnPosts } from '../Utility/API';
import { useNavigate } from 'react-router';
import { Navbar } from '../Components/Navbar';
import CreatePost from '../Components/CreatePost';
import Posts from '../Components/Posts';

export default function Profile() {
  const [posts, setPosts] = useState(undefined);
  const [published, setPublished] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    async function getPosts() {
      const fetchedPosts = await getOwnPosts()
      if (fetchedPosts === "LOGIN"){
        navigate("/login")
      }else{
        setPosts(fetchedPosts);
      }
    }
    getPosts();
  }, [published]);

if (posts != undefined){
  return (
    <div className='flex flex-col items-center'>
      <Navbar/>
      <div className='w-full max-w-[300px] md:max-w-[500px] lg:max-w-[700px]'>
        < CreatePost setPub={setPublished} pub={published} />
        <div className='flex flex-col  gap-6 bg-secondary p-6 w-full text-black'>
          <h1>Your Writings</h1>
          < Posts posts={posts}/>
        </div>
      </div>
    </div>
  )
}
}
