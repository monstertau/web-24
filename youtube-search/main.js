window.onload = () => {
  document.querySelector(".submit-button").addEventListener("click", function (event) {
    event.preventDefault();
    const textElements = document.querySelector("#keyword").value;
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q={${textElements}}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res)=>{
      return res.json();
    })
    .then((data)=>{
      console.log(data);
    })
    .catch((error)=>{
      console.log(error);
      window.alert(error.message);
    })
  });



}