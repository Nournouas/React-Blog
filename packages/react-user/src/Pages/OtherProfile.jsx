import { useParams } from "react-router";
import { useEffect, useState } from 'react'
import { getAuthorDetails } from '../Utility/API';
import { useNavigate } from 'react-router';
import { Navbar } from '../Components/Navbar';
import Posts from "../Components/Posts";

export default function OtherProfile() {
  let params = useParams();
  const [author, setAuthor] = useState(undefined);
  const navigate = useNavigate();
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPosts() {
      try{
        const fetchedAuthor = await getAuthorDetails(params.profileId);
        if (fetchedAuthor === "LOGIN"){
          navigate("/login")
        }else{
          setAuthor(fetchedAuthor);
        }
      }catch(e){
        setError(e);
      }finally{
        setLoading(false);
      }
    }
    getPosts();
  }, []);

if (loading != true && error === undefined){
  return (
    <div className='flex flex-col items-center'>
      <Navbar/>
      <div className='w-full max-w-[300px] md:max-w-[500px] lg:max-w-[700px]'>
        <div className='flex flex-col  gap-6 bg-secondary p-6 w-full text-black'>
          <h1>{author.name}'s Writings:</h1>
          < Posts posts={author.posts}/>
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
      <h1>{error === undefined ? "Loading..." : "failed to load"}</h1>
    </div>
  )
}
}
