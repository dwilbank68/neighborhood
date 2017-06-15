import React from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
//import './App.css';
const CLOUD_NAME = 'dmij4pdz5';
const CLOUDINARY_UPLOAD_PRESET = 'ycojilpu';
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;
// const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload/c_pad,g_center,h_200,w_200,b_auto:predominant_gradient:2`;
// const CLOUDINARY_UPLOAD_URL = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/c_pad,g_center,h_200,w_200,b_auto:predominant_gradient:2`;
export default class ImageUpload extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            uploadedFile: null,
            uploadedFileCloudinaryUrl: '',
        };
        this.handleImageUpload = this.handleImageUpload.bind(this);
    }

    onImageDrop(files) {
        this.setState({
            uploadedFile: files[0]
        });
        this.handleImageUpload(files[0]);
    }

    handleImageUpload(file) {

        var formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

        axios({
            url: CLOUDINARY_UPLOAD_URL,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: formData
        })
        .then((res) => {
            if (res.data.secure_url !== '') {
                this.setState({
                    uploadedFileCloudinaryUrl: res.data.secure_url
                });

                this.props.avatarChange(res.data.secure_url, res.data.public_id);
            }
        })
        .catch((err) => {
            console.log('error in axios catch block',err);
        })

    }

    render() {

        const style = {
            width: '70px',
            height: '52px',
            border: '1px dashed gray',
            fontSize: '.7em',
            fontStyle: 'italic'
        }

        return (

                <div className="FileUpload">
                    <Dropzone   accept="image/*"
                                className='dropzone'
                                multiple={false}
                                onDrop={this.onImageDrop.bind(this)}
                                style={style}>
                        <div>Drop image here or click to select file for upload.</div>
                    </Dropzone>
                </div>

        )
    }
}

// c_pad,g_center,h_200,w_200