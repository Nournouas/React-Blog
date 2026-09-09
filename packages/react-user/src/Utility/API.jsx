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
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
    throw new Error(err.message);
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
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result
  } catch (error) {
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
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result
  } catch (error) {
    console.error(error.message)
  }
}

export const postNewPost = async (data) => {
  try{
    const response =  await fetch("http://localhost:3001/API/posts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': localStorage.getItem('token'),
      },
      body: JSON.stringify(data)
    })
    const result = await response.json();
    console.log(result.errors)
    if (!response.ok){
      return result.errors;
    }
    return true;
  }catch (error) {;
    console.error(error.message);
  }
}

export const postNewComment = async (data, postId) => {
  try{
    const response =  await fetch(`http://localhost:3001/API/posts/${postId}/add_comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': localStorage.getItem('token'),
      },
      body: JSON.stringify(data)
    })
    const result = await response.json();
    console.log(result.errors)
    if (!response.ok){
      return result.errors;
    }
    return true;
  }catch (error) {;
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
  }catch(err){;
    console.error(err.message);
    throw new Error(err.message);
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
  }catch(err){;
    console.error(err.message);
    throw new Error(err.message);
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
    }
    return true;

  }catch(err){;
    console.error(err.message);
    throw new Error(err.message);
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
    return result;
  }catch(err){;
    console.error(err.message);
    throw new Error(err.message);
  }
}

export const deleteOwnComment = async (commentId, postId) => {
  try{
    const response = await fetch(`http://localhost:3001/API/posts/${postId}/${commentId}` ,{
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
    return result;
  }catch(err){;
    console.error(err.message);
    throw new Error(err.message);
  }
}

export const getSinglePost = async (postId) => {
  try{
    const response = await fetch(`http://localhost:3001/API/posts/${postId}`, {
      method: "GET",
      headers: {
        Accept: 'application/json',
        'Authorization': localStorage.getItem('token'),
      },
    });
    if (!response.ok){
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result
  }catch(err){;
    console.error(err.message);
    throw new Error(err.message);
  }
}

export const signUpPost = async (data) => {
  try{
    const response = await fetch("http://localhost:3001/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    if (!response.ok){
      return (result.errors);
    }
    return false;
  }catch(err){;
    console.error(err.message);
    throw new Error(err.message);
  }
}

export const logInPost = async (data) => {
  try{
    const response = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
          Accept: 'application/json',
        "Content-Type": "application/json",
        credentials: 'include',
      },
      body: JSON.stringify(data)
    })
    const result = await response.json();
    if (!response.ok){
      throw result.errors;
    }
    return result;
  }catch(err){;
    throw err;
  }
}