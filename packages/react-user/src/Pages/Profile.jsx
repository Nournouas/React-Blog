import React, { useEffect, useState } from 'react'
import { getOwnPosts, getUserDetails } from '../Utility/API';
import { useNavigate } from 'react-router';
import { Navbar } from '../Components/Navbar';
import Posts from '../Components/Posts';
import ProfileModule from '../Components/ProfileModule';

export default function Profile() {
  const [posts, setPosts] = useState(undefined);
  const [currentAuthor, setCurrentAuthor] = useState(undefined);
  const [published, setPublished] = useState(0);
  const [hideCreatePost, setHideCreatePost] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    async function getPosts() {
      const fetchedPosts = await getOwnPosts()
      const details = await getUserDetails()
      if (fetchedPosts === "LOGIN"){
        navigate("/login")
      }else{
        console.log("fetched, updated");
        setPosts(fetchedPosts);
        console.log("setPosts done")
        setCurrentAuthor(details);
      }
    }
    getPosts();
  }, [published]);

if (posts != undefined){
  return (
    <div className='flex h-full flex-col items-center'>
      <Navbar/>
      <div className='flex flex-col w-full h-full max-w-75 md:max-w-125 lg:max-w-175'>
        <ProfileModule name={currentAuthor.name} postCount={posts.length} tarot={currentAuthor.tarot}/>
        <div className='flex-1 flex flex-col gap-6 bg-secondary p-6 w-full text-black'>
          <h1>Writings:</h1>
          < Posts posts={posts} setPub={setPublished} pub={published}/>
        </div>
      </div>
    </div>
  )
}
}
