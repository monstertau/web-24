window.onload = () => {
    fetch(`../questionlist`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);
            document.querySelector(".question").innerHTML = data.questionContent;
            document.querySelector(".like").innerHTML = data.like + ' like';
            document.querySelector(".dislike").innerHTML = data.dislike + ' dislike';
        })
        .catch((error) => {
            console.log(error);
            window.alert(error.message);
        });
}