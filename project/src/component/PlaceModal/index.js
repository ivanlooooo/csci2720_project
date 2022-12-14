// Au Yeung Hui Kei (1155158820) Chan Gi Wei Violet (1155126648) 
// Kong Ming Kin(1155144268)     Lo Kwun Hei (1155155612) 
// Yeung Ka Him(1155176590)      Yuen Man Yi (1155127553)

import React, { useEffect, useState } from "react";
import { _getUserList, _delUser, _reg, _update, _addNewPlace } from "../../util/req";
import Button from '../button';
import ModalWithTitle from '../ModalWithTitle';
import "./style.css";
import {
  _saveJson,
  _saveReviewsJson,
  _getPlacesLists,
  _delPlace,
  _updatePlace,
} from "../../util/req";

const PlaceModal = (props) => {
	const [list, setList] = useState([]);
	const [info, setInfo] = useState({
    name: "",
    rating: "",
    formatted_phone_number: "",
    website: "",
    formatted_address: "",
    lat:"",
    lng:"",
  });
	const gelist = async () => {
    var res = await _getPlacesLists();
    setList(res.data);
  };
  const handleInfo = (infoForm) =>{
    console.log(infoForm)
      if(infoForm===undefined){
        setInfo({...infoForm,name: '',
        rating: '',
        formatted_phone_number: '',
        website:'',
        formatted_address: '',
        lat:'',
        lng:'',})
      }
      else{
        setInfo({...infoForm,lat:infoForm.geometry.location.lat, lng:infoForm.geometry.location.lng})
      }

	}
  const save = async () => {

    if (info._id) {
      await _updatePlace(info);
      alert("Updated!");
    } else {
      
      await _addNewPlace(info);
      
      alert("Added!");
    } 
    gelist();
    props.onClickClose();
    setInfo({
      name: '',
      rating: '',
      formatted_phone_number: '',
      website:'',
      formatted_address: '',
      lat:'',
      lng:'',
    });
    
	};

  const update = async (it) => {
    setInfo({ ...it });
  };

	useEffect(() => {
    if(infoForm===undefined){
      setInfo({...infoForm,name: '',
      rating: '',
      formatted_phone_number: '',
      website:'',
      formatted_address: '',
      lat:'',
      lng:'',})
    }
    else{
      setInfo({...infoForm,lat:infoForm.geometry.location.lat, lng:infoForm.geometry.location.lng})
    }
    gelist();
  }, []);
	
  const { up = false, infoForm ,className} = props;

  return(
    <ModalWithTitle englishTitle={up ? "Update Place" : " Add New Place"} onClick={props.onClickClose} backgroundColor="#1F6332">
		<div className="addmodal-container">
			<div className="addmodal-title-container">
				<span className="addmodal-english-title">
					name:{" "}
				</span>
			</div>
			<div className="addmodal-input-container">
				<input
						type="text"
						className="addmodal-input"
            value={info.name}
            onChange={(e) => {
              setInfo({ ...info, name: e.target.value });
            }}
          />
			</div>
			<div className="addmodal-title-container">
				<span className="addmodal-english-title">
					rating:{" "}
				</span>
			</div>
      <div className="addmodal-input-container">
				<input
						type="number"
						className="addmodal-input"
            value={info.rating}
            min = '1'
            max = '5'
            onChange={(e) => {
              setInfo({ ...info, rating: e.target.value });
            }}
          />
			</div>
			<div className="addmodal-title-container">
				<span className="addmodal-english-title">
					formatted_phone_number:{" "}
				</span>
			</div>
      <div className="addmodal-input-container">
				<input
						type="text"
						className="addmodal-input"
            value={info.formatted_phone_number}
            onChange={(e) => {
              setInfo({
                ...info,
                formatted_phone_number: e.target.value,
              });
            }}
        />
			</div>
			<div className="addmodal-title-container">
				<span className="addmodal-english-title">
					website:{" "}
				</span>
			</div>
      <div className="addmodal-input-container">
				<input
						type="text"
						className="addmodal-input"
            value={info.website}
            onChange={(e) => {
              setInfo({ ...info, website: e.target.value });
            }}
        />
			</div>
			<div className="addmodal-title-container">
				<span className="addmodal-english-title">
					formatted_address:{" "}
				</span>
			</div>
      <div className="addmodal-input-container">
				<input
						type="text"
						className="addmodal-input"
            value={info.formatted_address}
            onChange={(e) => {
              setInfo({ ...info, formatted_address: e.target.value });
            }}
        />
			</div>
			<div className="addmodal-title-container">
				<span className="addmodal-english-title">
          latitude:{" "}
				</span>
			</div>
      <div className="addmodal-input-container">
				<input
						type="text"
						className="addmodal-input"
            value={info.lat}
            onChange={(e) => {
              setInfo({ ...info, lat: e.target.value });
            }}
        />
			</div>
			<div className="addmodal-title-container">
				<span className="addmodal-english-title">
          longitude :{" "}
				</span>
			</div>
      <div className="addmodal-input-container">
				<input
						type="text"
						className="addmodal-input"
            value={info.lng}
            onChange={(e) => {
              setInfo({ ...info, lng: e.target.value });
            }}
        />
			</div>
			<div className="addmodal-button-container">
				<div className="addmodal-button">
					<Button chineseLabel="確認" englishLabel="Confirm" onClick={save} >
						{info._id ? "Save" : "Create"}
					</Button>
				</div>
      </div>
		</div>	
  	</ModalWithTitle>
  )

}

export default PlaceModal