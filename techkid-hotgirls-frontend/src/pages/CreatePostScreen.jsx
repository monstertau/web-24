import React from 'react';

class CreatePostScreen extends React.Component {
  state = {
    imageFile: undefined,
    imageSrc: '',
    content: '',
    errorMessage: '',
  };

  handleImageChange = (event) => {
    const imageFile = event.target.files[0];

    // validate image: File type + File size

    if (imageFile) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(imageFile);
      fileReader.onloadend = (data) => {
        this.setState({
          imageFile: imageFile,
          imageSrc: data.currentTarget.result,
        });
      };
    }
  };

  handleContentChange = (event) => {
    this.setState({
      content: event.target.value,
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();

    if (!this.state.imageFile || !this.state.content) {
      this.setState({
        errorMessage: 'Please select image and input content'
      });
    } else {
      // Upload image
      const formData = new FormData();
      formData.append('image', this.state.imageFile);
      fetch(`http://localhost:3001/uploads/image`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        },
        body: formData,
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          this.setState({
            errorMessage: error.message,
          });
        });

      // Create post
    }
  };

  render() {
    return (
      <div className='row mt-5'>
        <div className='col-2'></div>
        <div className='col-8'>
          <form onSubmit={this.handleFormSubmit}>
            <div className='form-group'>
              <div
                style={{
                  position: `relative`,
                  top: `30px`,
                  textAlign: 'center',
                }}
              >Select image ...</div>
              <input
                id='file'
                type='file'
                className='form-control'
                accept="image/*"
                style={{
                  color: 'transparent',
                  margin: `0 auto`,
                  textIndent: `-999em`,
                  zIndex: 10,
                  height: `50px`
                }}
                onChange={this.handleImageChange}
              />
              {this.state.imageSrc ? (
                <div style={{
                  textAlign: 'center',
                  marginTop: '5px',
                }}>
                  <img src={this.state.imageSrc} alt='preview' style={{
                    height: `300px`,
                    width: 'auto',
                  }} />
                </div>
              ) : null}
            </div>
            <div className="form-group">
              <textarea 
                className="form-control" 
                id="exampleFormControlTextarea1" 
                rows="4"
                placeholder='Please input content ...'
                value={this.state.content}
                onChange={this.handleContentChange}
              ></textarea>
            </div>
            {this.state.errorMessage ? (
              <div class="alert alert-danger" role="alert">
                {this.state.errorMessage}
              </div>
            ) : null}
            <div className='form-group'>
              <input type='submit' className='btn btn-primary' value='Create Post' />
            </div>
          </form>
        </div>
        <div className='col-2'></div>
      </div>
    )
  }
}

export default CreatePostScreen;