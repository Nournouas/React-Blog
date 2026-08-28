import { useParams } from "react-router";
import React, { useEffect, useState } from 'react'
import { getOtherPosts } from '../Utility/API';
import { useNavigate } from 'react-router';
import { Navbar } from '../Components/Navbar';
import CreatePost from '../Components/CreatePost';
import Posts from "../Components/Posts";

export default function OtherProfile() {
  let params = useParams();
  const [posts, setPosts] = useState(undefined);
  const navigate = useNavigate();
  

  useEffect(() => {
    async function getPosts() {
      const fetchedPosts = await getOtherPosts(params.profileId)
      if (fetchedPosts === "LOGIN"){
        navigate("/login")
      }else{
        setPosts(fetchedPosts);
      }
    }
    getPosts();
  }, []);

if (posts != undefined){
  return (
    <div className='flex flex-col items-center'>
      <Navbar/>
      <div className='w-full max-w-[300px] md:max-w-[500px] lg:max-w-[700px]'>
        <div className='flex flex-col  gap-6 bg-secondary p-6 w-full text-black'>
          <h1>{posts[0].authorName}'s Writings:</h1>
          < Posts posts={posts}/>
        </div>
      </div>
    </div>
  )
}
}
