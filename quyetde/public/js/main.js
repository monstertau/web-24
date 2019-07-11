window.onload = () => {
    //js code
    // count characters

    // listen input event of textarea
    const textAreaElement = document.querySelector('#textcontent');
    if (textAreaElement) {
        textAreaElement.addEventListener('input', (event) => {
            const content = textAreaElement.value;
            const charactersLeft = 200 - content.length;
            const cLeftElement = document.querySelector('#countword');
            if (cLeftElement) {
                cLeftElement.innerText = charactersLeft + '/200';
            }

        });

    }
    // listen click button event
    const submitElement = document.querySelector('#submit-button');
    if (submitElement) {
        submitElement.addEventListener('click', (event) => {
            const textAreaElement = document.querySelector('#textcontent');
            if (textAreaElement) {
                const content = textAreaElement.value;
                if (!content || content.length == 0) {
                    document.querySelector('#validate').innerText = 'Please add a question!';
                } else {
                    const parentElement = document.querySelector('.container');
                    if (parentElement) {
                        const validateElement = document.querySelector('#validate');
                        if (validateElement) {
                            parentElement.removeChild(validateElement);
                        }
                    }

                    //url params
                    // url query
                    const content = textAreaElement.value;
                    fetch(`/create-question`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            questionContent: content,
                            createdAt: '20190707',
                        }),
                    })
                        .then((res) => {
                            return res.json();
                        })
                        .then((data)=>{
                            if(data.success){
                                // redirect to question detail
                                //window.location.href
                                window.location.href = `./question/${data.id}`;
                            }else{
                                window.alert(error.message);
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                            window.alert(error.message);
                        });
                }
            }
        });
    }

}


// document.getElementById();
// document.getElementsByClassName();
// document.querySelector();
// document.querySelectorAll();

// elementObject.addEventListener();