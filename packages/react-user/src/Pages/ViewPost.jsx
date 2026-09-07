import React, { useEffect, useState } from 'react'
import { getSinglePost, getUserDetails } from '../Utility/API';
import { Link, useNavigate, useParams } from 'react-router';
import { Navbar } from '../Components/Navbar';
import Posts from '../Components/Posts';
import ProfileModule from '../Components/ProfileModule';
import DOMPurify from 'dompurify';
import Comments from '../Components/Comments';

export default function ViewPost() {
  const [post, setPost] = useState(undefined);
  const [currentAuthor, setCurrentAuthor] = useState(undefined);
  const params = useParams();
  
  const navigate = useNavigate();
  useEffect(() => {
    async function getPost() {
      const fetchedPost = await getSinglePost(params.postId);
      const details = await getUserDetails()
      if (fetchedPost === "LOGIN"){
        navigate("/login")
      }else{
        setPost(fetchedPost);
        setCurrentAuthor(details);
      }
    }
    getPost();
  }, []);

if (post != undefined){
  console.log(post)
  const rawDate = new Date(post.pubTime);
  const date = `${rawDate.getFullYear()}/${rawDate.getMonth()}/${rawDate.getDay()}  ${rawDate.getHours()}:${rawDate.getMinutes()}`;
  return (
    <div className="flex h-full flex-col items-center ">
      <Navbar/>
      <div className='flex flex-col w-full h-full max-w-75 md:max-w-125 lg:max-w-175 '>
        <ProfileModule date={date} postTitle={post.title} profilePic={false} name={currentAuthor.name} tarot={currentAuthor.tarot}/>
        <div className="flex-1 flex flex-col gap-6 bg-secondary p-6 w-full text-black ">
        {
        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.body, {
            ALLOWED_TAGS: ['p','br','b','strong','i','em','u','s','strike','ul','ol','li','a','blockquote','code','pre','h1','h2','h3','h4'],
            ALLOWED_ATTR: ['href','target','rel']
          })}}></div>
        }
        <div className='w-100 h-1 bg-black my-6'></div>
        <Link to="/home" className='bold underline'>Go Home</Link>
        <Comments postId={post.id} comments={post.comments} author={currentAuthor} />
        </div>
      </div>
    </div>
  )
}
}

