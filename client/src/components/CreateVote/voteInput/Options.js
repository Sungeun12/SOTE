import React, {createRef, useRef, useState} from 'react';
import TextareaAutosize from "react-textarea-autosize";
import {Controller, useFieldArray} from 'react-hook-form'
import {MdClear, MdAddBox, MdWallpaper} from 'react-icons/md'
import {AiFillCloseCircle} from "react-icons/ai";
import styled from 'styled-components';
import * as S from "../style";
import color from "../../../util/style/color";


function Options({control, register,setValue }) {
    const [addImg, setAddImg] = useState(false);
    const [addDesc, setAddDesc] = useState(false);

    const {fields, append, remove} = useFieldArray({
            control,
            name: "options"
        }
    );

    const toggleImage = () => {
        setAddImg(!addImg);
    }
    const toggleDescription = () => {
        setAddDesc(!addDesc);
    }

    const inputOpenImageRef = useRef();

    const handleOpenImageRef = () => {
        const { current } = inputOpenImageRef;
        if (current) {
            current.click();
        }
    };

    function handleImageChange(event, index) {
        if (event.target.files && event.target.files[0]) {

            const formData = new FormData();
            /*  const config = {
                  header: { "content-type": "multipart/form-data" },
              }; */
            formData.append("file", event.target.files[0]);

            /*  axios.post("/api/product/image", formData, config).then((response) => {
                  if (response.data.success) {
                      console.log(response.data);
                      setValue(`options[${index}].image`,response.data.filePath);
                  } else {
                      alert("파일을 저장하는데 실패했습니다.");
                  }
              });
              } */
        }
        console.log(index, event.target)
    }

    return (
        <OptionContainer>
            <S.LabelColumn>선택지를 입력해주세요</S.LabelColumn>
            <AddButtonContainer>
                <AddButton type="button" onClick={toggleImage}>이미지 추가하기</AddButton>
                <AddButton type="button" onClick={toggleDescription}>상세설명 추가하기</AddButton>
            </AddButtonContainer>
            <ul>
                {fields.map((item, index) => (
                    <OptionItem key={item.id} ref={createRef}>
                        {index + 1}
                        {addImg ?
                            <div style={{marginLeft:'2%'}}>
                                {item.image ? (
                                    <ImagePreview>
                                        <AiFillCloseCircle
                                            size="20"
                                            id="close-icon"
                                            onClick={() => {
                                               setValue(`options.${index}.image`,null)
                                            }}
                                        />
                                        <img id="uploaded-image" src={`options.${index}.image`} alt="uploaded-img" />
                                    </ImagePreview>
                                ) : (
                                    <BoxUpload>
                                        <MdWallpaper size="25" onClick={handleOpenImageRef} style={{margin:'auto auto', cursor: 'pointer'}}/>
                                        <input
                                            {...register(`options.${index}.image`)}
                                            ref={inputOpenImageRef}
                                            style={{ display: "none" }}
                                            type="file"
                                            accept=".jpg,.jpeg,.gif,.png,.mov,.mp4"
                                            defaultValue=""
                                            onChange={event => handleImageChange(event,index)}
                                        />
                                    </BoxUpload>
                                )}
                            </div>

                            : ''}
                        <InputWrapper>
                            <OptionInput
                                key={item.id}
                                {...register(`options.${index}.name`, {required: true, maxLength: 30})}
                                defaultValue={item.name}
                            />
                            {addDesc ?
                                <Controller
                                    control={control}
                                    name={`options.${index}.description`}
                                    defaultValue=""
                                    render={({field}) => (
                                        <TextArea
                                            {...field}
                                            minRows={2}
                                        />
                                    )}
                                />
                                : ''}
                        </InputWrapper>

                        <MdClear onClick={() => remove(index)} size="25"  color="#454545" style={{cursor: 'pointer'}}/>
                    </OptionItem>
                ))}
            </ul>
            <MdAddBox onClick={() => {
                append({name: ""});
            }}
                      size="35"
                      color="#454545"
                      style={{cursor: 'pointer', margin: '2vh auto'}}/>

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