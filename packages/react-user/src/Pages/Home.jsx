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
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function getPosts() {
      try{
        const fetchedPosts = await getAllPosts();
        if (fetchedPosts === "LOGIN"){
          navigate("/login");
        }else{
          setPosts(fetchedPosts);
        }
      }catch(e){
        setError(e);
      }finally{
        setLoading(false);
      }
    }
    getPosts();
  }, [published]);

if (loading != true && error === undefined){
  return (
    <div className='flex flex-col items-center h-full'>
      <Navbar/>
      <div className='w-full  max-w-75 md:max-w-125 lg:max-w-175'>
        <div className='flex flex-col h-full gap-6 bg-secondary p-6 w-full text-black'>
          <h1 className='self-center'>Writings</h1>
          < Posts posts={posts} setPub={setPublished} pub={published}/>
        </div>
      </div>
    </div>
  )
}else{
  return(
    <div className="flex h-full flex-col items-center ">
      <Navbar/>
      <br />
      <br />
      <h1>{error === undefined ? "Loading..." : "failed to fetch posts, Please try again"}</h1>
    </div>
  )
}
}
