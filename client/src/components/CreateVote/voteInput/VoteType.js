import React,{useState,useEffect} from 'react';
import {Controller} from "react-hook-form";
import Select from "react-select";
import styled from "styled-components";
import * as S from "../style";
import {customStyles} from "../style";
import {FreeVoteCategory, voteTypes} from "../../../util/selectOption/selectOption";
import media from "../../../util/style/media";

function VoteType ({ control, watch } ) {
    const [freecategory, setFreeCategory] = useState(false);
    const voteType = watch('voteType', 1);
    useEffect(()=>{
        if(voteType.value === 1) {
            setFreeCategory(true)
        }
      else{
            setFreeCategory(false);
        }
    },[voteType])

    return (
        <div>
            <Selection>
                <S.Label>투표 종류</S.Label>
                <SelectItem>
                    <Controller
                        name="voteType"
                        rules={{required: true}}
                        render={({field}) => (
                            <Select
                                {...field}
                                options={voteTypes}
                                placeholder="투표 종류를 선택해주세요."
                                styles={customStyles}
                            />
                        )}
                        control={control}
                        defaultValue=""
                    />

                </SelectItem>
            </Selection>
            {freecategory?
            <Selection>
                <S.Label>카테고리</S.Label>
                <SelectItem>
                    <Controller
                        name="freeVoteCategory"
                        rules={{required: true}}
                        render={({field}) => (
                            <Select
                                {...field}
                                options={FreeVoteCategory}
                                placeholder="카테고리를 선택해주세요."
                                styles={customStyles}
                            />
                        )}
                        control={control}
                        defaultValue=""
                    />
                </SelectItem>
            </Selection>
                : ' '}
        </div>
    )
        ;
}


const Selection = styled.section`
  display: flex;
  margin: 5vh 0;
  align-items: center;
  width: 100%;
    @media (max-width: ${media.tablet}px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
const SelectItem = styled.div`
width: 40%;
  @media (max-width: ${media.tablet}px) {
width: 100%;
  }
`;

export default VoteType;