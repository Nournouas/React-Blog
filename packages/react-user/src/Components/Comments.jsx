import { useState } from "react";
import { useNavigate } from "react-router";
import { CTA, CTA_Secondary, CTA_DELETE } from '../assets/styles';
import { postNewComment } from '../Utility/API'

export default function Comments({ postId, comments=[], author }) {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleNewComment = async(e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let data = {};
    formData.forEach((value, key) => data[key] = value);
    const response = await postNewComment(data, postId);
    console.log(response)
    if (response != true) {
      setErrors(response)
    }
  }

  const handleDeleteComment = async () => {
    console.log("DELETE HANDLE")
  }

  console.log(comments)
  const commentList = comments.map((comment) => {
    const rawDate = new Date(comment.pubTime);
    const date = `${rawDate.getFullYear()}/${rawDate.getMonth()}/${rawDate.getDay()}  ${rawDate.getHours()}:${rawDate.getMinutes()}`;
    return  <div key={comment.id} className="flex flex-col p-2 border border-background mb-3">
                <h3 className="text-primary">{comment.authorName} says:</h3>
                <p>{comment.body}</p>
                <p className="self-end">{date}</p>
                {comment.authorId === author.id && <button onClick={handleDeleteComment} className={CTA_DELETE}>Delete Comment</button>}
            </div>
  })
  

  return (
    <div>
      <form onSubmit={handleNewComment} action="http://localhost:3001/API/posts/create" method="POST" className='flex w-full bg-secondary flex-col gap-6 mb-6'>
        <div className='flex flex-col justify-items-center items-start gap-3 w-full'>
          <label htmlFor="comment">Add a Comment:</label>
          <textarea maxLength={200} required type="text" id='comment' name='comment' className='border border-black-200 px-2 py-3 w-full' />
        </div>
        <div className='flex flex-row justify-items-center items-start gap-3 w-100'>
          <button type="submit" className={CTA}>Publish</button>
        </div>
        {errors && errors.length > 0 && errors.map((err, count) => <li key={count}>{err.msg}</li>)}
      </form>
      <h3 className="mb-3">Comments:</h3>
      {commentList}
    </div>
    
  )
}
