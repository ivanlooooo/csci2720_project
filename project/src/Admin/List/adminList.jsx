// Au Yeung Hui Kei (1155158820) Chan Gi Wei Violet (1155126648) 
// Kong Ming Kin(1155144268)     Lo Kwun Hei (1155155612) 
// Yeung Ka Him(1155176590)      Yuen Man Yi (1155127553)

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './stylesheet.css'
// import { _getPlacesLists } from "./../../util/req";
import Button from '../../component/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

// import {
//   _saveJson,
//   _saveReviewsJson,
// } from "../../util/req";

export default function Index() {
  const [List, setList] = useState([]);
  const [sort, setSort] = useState(false);

  const TableFilter = (function(Arr) {

		var _input;

		function _onInputEvent(e) {
			_input = e.target;
			var tables = document.getElementsByClassName(_input.getAttribute('data-table'));
			Arr.forEach.call(tables, function(table) {
				Arr.forEach.call(table.tBodies, function(tbody) {
					Arr.forEach.call(tbody.rows, _filter);
				});
			});
		}

		function _filter(row) {
			var text = row.textContent.toLowerCase(), val = _input.value.toLowerCase();
			row.style.display = text.indexOf(val) === -1 ? 'none' : 'table-row';
		}

		return {
			init: function() {
				var inputs = document.getElementsByClassName('table-filter');
				Arr.forEach.call(inputs, function(input) {
					input.oninput = _onInputEvent;
				});
			}
		};
	})(Array.prototype);


  // const getList = async () => {
  //   var data = await _getPlacesLists();
  //   var mpdata = data.data.map(
  //     (it, index) => ({
  //     ...it
  //   }));
  //   mpdata.sort(
  //     (a, b) => a.wait.hospName.charCodeAt(0) - b.wait.hospName.charCodeAt(0)
  //   );
  //   setList(mpdata);
  //   console.log("data -> :", mpdata);
  // };


  // useEffect(() => {
  //   TableFilter.init();
  //   getList();
  // }, []);

  // useEffect(() => {
  //   const newList = List;
  //   if (sort) {
  //     newList.sort(
  //       (a, b) => a.wait.hospName.charCodeAt(0) - b.wait.hospName.charCodeAt(0)
  //     );
  //   } else {
  //     newList.sort(
  //       (a, b) => b.wait.hospName.charCodeAt(0) - a.wait.hospName.charCodeAt(0)
  //     );
  //   }
  //   console.log("newList -> :", newList);

  //   setList(newList);
  // }, [List, sort]);
  // const created = async () => {
  //   await _saveJson();
  //   await _saveReviewsJson();
  //   alert("done");
  // };
  

  return (
    <div style={{ overflowX: "auto" }} className="page-container">
      <div style={{display:"flex"}}>
        <div className="list-search-container">
          <input type="Search" class="table-filter list-search-input" data-table="table" placeholder="Search"/>
        </div>
        
        <div className="place-button">
            <Button label="Update events"  onClick={created}/>
          </div>
        </div>
      <table className="table">
        <thead>
          <tr>
            <td style={{ width: "25%" }}>
              Events{" "}
              {sort ? (
                <span
                  onClick={() => {
                    setSort(false);
                  }}
                >
                  ↑
                </span>
              ) : (
                <span
                  onClick={() => {
                    setSort(true);
                  }}
                >
                  ↓
                </span>
              )}
            </td>
            <td>Venue</td>
            <td>Date/Time</td>
            <td>Description</td>
            <td>Presenter</td>
            <td>Price</td>
          </tr>
        </thead>
        {/* <tbody>
          {List.map((it, index) => (
            <tr key={index}>
              <td>
                <Link to={`/index/info/${it.place_id}`}>
                  {it.wait.hospName}
                </Link>
              </td>
              <td>{it.name}</td>
              <td>{it.formatted_address}</td>
              <td>
                <a href={it.website}>{it.website}</a>
              </td>
              <td>{it.wait.topWait}</td>
              <td>{it.rating}</td>
              <td>
                <img src={it.icon} width="50px" height="50px" alt="" />
              </td>
            </tr>
          ))}
        </tbody> */}
      </table>
    </div>
  );
}
