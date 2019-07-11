function load(){
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
            console.log(data)
            document.querySelector(".main").innerHTML = data.questionContent;
        })
        .catch((error) => {
            console.log(error);
            window.alert(error.message);
        });
}

function down() {
    fetch(`/questionlist`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            const x = data;
            fetch(`../update-question`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    id: data.id,
                    dislike: data.dislike + 1,
                    like: data.like,
                }),
            })
                .then((res) => {
                    return res.json();
                })
                .then((data1) => {
                    if (data1.success) {
                        window.location.href = `../question/${x.id}`;
                    }
                    else { window.alert(data.message); }
                })
                .catch((error) => {
                    console.log(error);
                    window.alert(error.message);
                });
        })
        .catch((error) => {
            console.log(error);
            window.alert(error.message);
        });
}

function up() {
    fetch(`/questionlist`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            const x = data;
            fetch(`../update-question`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    id: x.id,
                    dislike: data.dislike,
                    like: x.like + 1,
                }),
            })
                .then((res) => {
                    return res.json();
                })
                .then((data1) => {
                    if (data1.success) {
                        window.location.href = `../question/${x.id}`;
                    }
                    else { window.alert(data.message); }
                })
                .catch((error) => {
                    console.log(error);
                    window.alert(error.message);
                });
        })
        .catch((error) => {
            console.log(error);
            window.alert(error.message);
        });
}
function redirect() {
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
            window.location.href = `../question/${data.id}`;
        })
        .catch((error) => {
            console.log(error);
            window.alert(error.message);
        });
}