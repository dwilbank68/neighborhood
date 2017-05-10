import React from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

//import './App.css';
const CLOUD_NAME = 'dmij4pdz5';
const CLOUDINARY_UPLOAD_PRESET = 'ycojilpu';
const CLOUDINARY_UPLOAD_URL= `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;

export default class ImageUpload extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            uploadedFile: null,
            uploadedFileCloudinaryUrl: ''
        };
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
            console.log('------------------------------------------');
            console.log('res.data.secure_url',res.data.secure_url);
            console.log('------------------------------------------');
            if (res.data.secure_url !== '') {
                this.setState({
                    uploadedFileCloudinaryUrl: res.data.secure_url
                });
            }
        })
        .catch((err) => {
            console.log('error in axios catch block',err);
        })

    }

    render() {
        return (
            <form>
                <div className="FileUpload">
                    <Dropzone   onDrop={this.onImageDrop.bind(this)}
                                multiple={false}
                                accept="image/*">
                        <div>Drop an image or click to select a file to upload.</div>
                    </Dropzone>
                </div>

                <div>
                    {this.state.uploadedFileCloudinaryUrl === '' ? null :
                        <div>
                            <p>{this.state.uploadedFile.name}</p>
                            <img src={this.state.uploadedFileCloudinaryUrl} />
                        </div>}
                </div>
            </form>
        )
    }
}
