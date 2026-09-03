import { useParams } from "react-router";
import React, { useEffect, useState } from 'react'
import { getOtherPosts, getAuthorDetails } from '../Utility/API';
import { useNavigate } from 'react-router';
import { Navbar } from '../Components/Navbar';
import CreatePost from '../Components/CreatePost';
import Posts from "../Components/Posts";

export default function OtherProfile() {
  let params = useParams();
  const [author, setAuthor] = useState(undefined);
  const navigate = useNavigate();
  

  useEffect(() => {
    async function getPosts() {
      const fetchedAuthor = await getAuthorDetails(params.profileId);
      console.log(fetchedAuthor)
      if (fetchedAuthor === "LOGIN"){
        navigate("/login")
      }else{
        setAuthor(fetchedAuthor);
      }
    }
    getPosts();
  }, []);

if (author != undefined){
  return (
    <div className='flex flex-col items-center'>
      <Navbar/>
      <div className='w-full max-w-[300px] md:max-w-[500px] lg:max-w-[700px]'>
        <div className='flex flex-col  gap-6 bg-secondary p-6 w-full text-black'>
          <h1>{author.posts[0].authorName}'s Writings:</h1>
          < Posts posts={author.posts}/>
        </div>
      </div>
    </div>
  )
}
}
