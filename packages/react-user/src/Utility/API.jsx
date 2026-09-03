import { useNavigate } from "react-router";

export const getAllPosts = async () => {
  try{
    const response = await fetch("http://localhost:3001/API/posts", {
      method: "GET",
      headers: {
        Accept: 'application/json',
        cache: "no-store",
        'Authorization': localStorage.getItem('token'),
      },
    });
    if (!response.ok){
      console.log("test")
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result
  } catch (error) {
    console.log("error")
    console.error(error.message)
  }
}

export const getOwnPosts = async () => {
  try{
    const response = await fetch("http://localhost:3001/API/posts/profile", {
      method: "GET",
      headers: {
        Accept: 'application/json',
        'Authorization': localStorage.getItem('token'),
      },
    });
    if (!response.ok){
      console.log("test")
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result
  } catch (error) {
    console.log("error")
    console.error(error.message)
  }
}

export const getOtherPosts = async (id) => {
  try{
    const response = await fetch(`http://localhost:3001/API/posts/profile/${id}`, {
      method: "GET",
      headers: {
        Accept: 'application/json',
        'Authorization': localStorage.getItem('token'),
      },
    });
    if (!response.ok){
      console.log("test")
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result
  } catch (error) {
    console.log("error")
    console.error(error.message)
  }
}

export const postNewPost = async (data) => {
  try{
    await fetch("http://localhost:3001/API/posts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': localStorage.getItem('token'),
      },
      body: JSON.stringify(data)
    })
    .then (() => {
      return true;
    })

  }catch (error) {
    console.log("error");
    console.error(error.message);
  }
}

export const getUserDetails = async () => {
  try{
    const response = await fetch("http://localhost:3001/details", {
      method: "GET",
      headers: {
        Accept: "application/json",
        'Authorization': localStorage.getItem('token'),
      },
    });
    if (!response.ok){
      throw new Error(`Response status: ${response.status}`);
    }
    
    const result = await response.json();
    return result
  }catch(err){
    console.log("error");
    console.error(err.message)
  }
}

export const getAuthorDetails = async (id) => {
  try{
    const response = await fetch(`http://localhost:3001/details/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        'Authorization': localStorage.getItem('token'),
      },
    });
    if (!response.ok){
      throw new Error(`Response status: ${response.status}`);
    }
    
    const result = await response.json();
    return result
  }catch(err){
    console.log("error");
    console.error(err.message)
  }
}


export const logUserOut = async () => {
  try{
    const response = await fetch("http://localhost:3001/logout", {
      method: "POST",
      headers: {
        Accept: "application/json",
        'Authorization': localStorage.getItem('token'),
      },
    });
    if (!response.ok){
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    if (result){
      localStorage.removeItem("token");
      console.log("loggout")
    }
    return true;

  }catch(err){
    console.log("error");
    console.error(err.message)
  }
}

export const deleteOwnPost = async (postId) => {
  try{
    const response = await fetch(`http://localhost:3001/API/posts/${postId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        'Authorization': localStorage.getItem('token'),
      },
    });
    if (!response.ok){
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    return result
  }catch(err){
    console.log("error");
    console.error(err.message)
  }
}