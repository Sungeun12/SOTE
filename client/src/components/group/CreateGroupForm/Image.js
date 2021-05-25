import React, { useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { MdWallpaper } from 'react-icons/md';
import styled from 'styled-components';
import axios from 'axios';

function Image() {
  const [image, setImage] = useState(false);
  const deleteImage = () => {};
  const handleImageChange = event => {
    if (event.target.files !== null) {
      const formData = new FormData();
      const config = {
        headers: { 'content-type': 'multipart/form-data' },
      };
      formData.append('group', event.target.files[0]);
      axios
        .post('http://localhost:5000/group/upload', formData, config)
        .then(response => {
          if (response.data.success) {
            setImage(response.data.filepath);
          } else {
            alert('파일을 저장하는데 실패했습니다.');
          }
        })
        .catch(error => console.log(error));
    }
  };
  return (
    <div>
      {image ? (
        <ImagePreview>
          <AiFillCloseCircle size="20" id="close-icon" onClick={() => deleteImage()} />
          <img id="uploaded-image" src={`http://localhost:5000/${image}`} alt="uploaded-img" />
        </ImagePreview>
      ) : (
        <BoxUpload>
          <ImageLabel htmlFor="group" style={{ margin: 'auto auto' }}>
            <MdWallpaper size="25" style={{ cursor: 'pointer' }} />
          </ImageLabel>
          <input
            id="group"
            style={{ display: 'none' }}
            type="file"
            accept=".jpg,.jpeg,.png,"
            onChange={event => handleImageChange(event)}
          />
        </BoxUpload>
      )}
    </div>
  );
}

const BoxUpload = styled.div`
  display: flex;
  width: 230px;
  height: 150px;
  border: 1px dashed gray;
  background: #f2f1f1;
  border-radius: 3px;
`;
const ImageLabel = styled.label`
  margin: auto auto;
`;

const ImagePreview = styled.div`
  position: relative;
  #uploaded-image {
   width: 230px;
  height: 150px;
    object-fit: cover;
    border-radius: 3px;
  }
  #close-icon {
    position: absolute;
    cursor: pointer;
    z-index: 10;
    right: -5px;
    top: -10px;
    opacity: .6;
    
    :hover {
    opacity: 1;
  }
`;
export default Image;
