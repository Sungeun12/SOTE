import React, { createRef, useEffect, useState } from 'react';
import axios from 'axios';
import TextareaAutosize from 'react-textarea-autosize';
import { MdClear, MdAddBox, MdWallpaper } from 'react-icons/md';
import { AiFillCloseCircle } from 'react-icons/ai';
import styled from 'styled-components';
import * as S from '../style';
import color from '../../../../util/style/color';

function Options({ options, setOptions }) {
  const [addImg, setAddImg] = useState(false);
  const [addDesc, setAddDesc] = useState(false);

  const toggleImage = () => {
    setAddImg(!addImg);
  };
  const toggleDescription = () => {
    setAddDesc(!addDesc);
  };
  useEffect(() => {
    if (!addImg) {
      const newArr = [...options];
      newArr.forEach((item, index) => {
        newArr[index].image = '';
      });
      setOptions(newArr);
    }

    if (!addDesc) {
      const newArr = [...options];
      newArr.forEach((item, index) => {
        newArr[index].description = '';
      });
      setOptions(newArr);
    }
  }, [addImg, addDesc]);

  const handleImageChange = (event, index) => {
    if (event.target.files !== null) {
      const formData = new FormData();
      const config = {
        headers: { 'content-type': 'multipart/form-data' },
      };
      formData.append('img', event.target.files[0]);
      axios
        .post('http://localhost:5000/vote/upload', formData, config)
        .then(response => {
          if (response.data.success) {
            const newArr = [...options];
            newArr[index].image = response.data.filepath;
            setOptions(newArr);
          } else {
            alert('파일을 저장하는데 실패했습니다.');
          }
        })
        .catch(error => console.log(error));
    }
  };

  const deleteImage = index => {
    const newArr = [...options];
    newArr[index].image = '';
    setOptions(newArr);
  };

  const deleteOption = index => {
    setOptions(options.filter(option => option !== options[index]));
  };

  const addOptions = () => {
    const option = {
      name: ' ',
      description: '',
      image: '',
    };
    setOptions(options.concat(option));
  };
  const handleName = (event, index) => {
    const newArr = [...options];
    newArr[index].name = event.target.value;
    setOptions(newArr);
  };
  const handleDescription = (event, index) => {
    const newArr = [...options];
    newArr[index].description = event.target.value;
    setOptions(newArr);
  };

  return (
    <OptionContainer>
      <S.LabelColumn>선택지를 입력해주세요</S.LabelColumn>
      <AddButtonContainer>
        <AddButton type="button" onClick={toggleImage}>
          이미지 추가하기
        </AddButton>
        <AddButton type="button" onClick={toggleDescription}>
          상세설명 추가하기
        </AddButton>
      </AddButtonContainer>
      <ul>
        {options.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <OptionItem key={index} ref={createRef}>
            {index + 1}
            {addImg ? (
              <div style={{ marginLeft: '2%' }}>
                {item.image ? (
                  <ImagePreview>
                    <AiFillCloseCircle
                      size="20"
                      id="close-icon"
                      onClick={() => deleteImage(index)}
                    />
                    <img
                      id="uploaded-image"
                      src={`http://localhost:5000/${options[index].image}`}
                      alt="uploaded-img"
                    />
                  </ImagePreview>
                ) : (
                  <BoxUpload>
                    <ImageLabel htmlFor={index} style={{ margin: 'auto auto' }}>
                      <MdWallpaper size="25" style={{ cursor: 'pointer' }} />
                    </ImageLabel>
                    <input
                      id={index}
                      style={{ display: 'none' }}
                      type="file"
                      accept=".jpg,.jpeg,.gif,.png,.mov,.mp4"
                      onChange={event => handleImageChange(event, index)}
                    />
                  </BoxUpload>
                )}
              </div>
            ) : (
              ''
            )}
            <InputWrapper>
              <OptionInput
                value={options[index].name}
                onChange={event => handleName(event, index)}
              />
              {addDesc ? (
                <TextArea
                  value={options[index].description}
                  minRows={2}
                  onChange={event => handleDescription(event, index)}
                />
              ) : (
                ''
              )}
            </InputWrapper>

            <MdClear
              onClick={() => deleteOption(index)}
              size="25"
              color="#454545"
              style={{ cursor: 'pointer' }}
            />
          </OptionItem>
        ))}
      </ul>
      <MdAddBox
        onClick={addOptions}
        size="35"
        color="#454545"
        style={{ cursor: 'pointer', margin: '2vh auto' }}
      />
    </OptionContainer>
  );
}

const OptionContainer = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 5vh 0;
`;
const OptionItem = styled.li`
  margin: 2.5vh 0;
  font-weight: 800;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  color: #454545;
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 85%;
  margin-left: 2%;
`;
const OptionInput = styled.input`
  height: 45px;
`;
const TextArea = styled(TextareaAutosize)`
  border: 1px dashed gray;
  margin-top: 1vh;
  resize: none;
`;
const AddButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1vh;
`;

const AddButton = styled.button`
  font-family: 'Nanum Gothic Coding', monospace;
  font-size: 0.8rem;
  cursor: pointer;
  border: none;
  background: white;
  color: ${color.navy};
`;
export const BoxUpload = styled.div`
  display: flex;
  width: 70px;
  height: 80px;
  border: 1px dashed gray;
  background: #f2f1f1;
  border-radius: 3px;
`;
export const ImageLabel = styled.label`
  margin: auto auto;
`;

export const ImagePreview = styled.div`
  position: relative;
  #uploaded-image {
    width: 70px;
    height: 80px;
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
export default Options;
