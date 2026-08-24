function App() {
  async function getData() {
    const res = await fetch("http://localhost:3001/API/posts");
    if (!res.ok){
      return "error";
    }

    const result = await res.json();
    console.log(result)
  }

  getData();
  return (
    <>
    <h1 className='text-3xl'>Hello I am app</h1>
    </>
  )
}

export default App
