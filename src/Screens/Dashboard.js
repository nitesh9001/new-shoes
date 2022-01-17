import React,{ useEffect, useState } from 'react'
import { getShoesData } from '../services/shoesService'
import Card from './Card'
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../Spinner';
import Sidebar from '../component/sidebar';
import { shoesAction } from '../redux/actions/shoesAction';
import { arryOfShoes } from '../services/jsonData';

const Dashboard = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [sortValue,setSortValue] = useState('');
    const shoesData = useSelector((state) => state?.shoes?.shoes);
    const originalData = arryOfShoes?.data;
    
    useEffect(() => {
        getShoesData(dispatch, setIsLoading);
        handleSort(sortValue);
    }, []);

    const handleFilter = (props) => {
        console.log("props filter",props);
        let finalData = originalData;
        if(props?.size.length > 0){
            finalData = originalData.filter(function(d){
            if (props?.size.indexOf(d?.size) > -1)
               return true
        });
        dispatch(shoesAction(finalData));
        }
        if(props?.category){
            finalData = finalData.filter(function(d){
              if(d?.category === props?.category)
                return true
        })
        dispatch(shoesAction(finalData));
        }
        if(props?.price.length>0){
            finalData = finalData.filter(function(d){
            if(d?.retailPrice > props?.price[0] && d?.retailPrice < props?.price[1])
               return true
        })
        dispatch(shoesAction(finalData));
        }
    }

    const handleSort = (val) => {
        if(val === "price"){
           shoesData.sort(function(a,b){return a.retailPrice - b.retailPrice})
        }
        if(val === "size"){
           shoesData.sort(function(a,b){return a.size - b.size})
        }
        if(val === "name"){
           shoesData.sort( function( a, b ) {
                a = a.shoe.toLowerCase();
                b = b.shoe.toLowerCase();

                return a < b ? -1 : a > b ? 1 : 0;
            });
        }
    };

    return (
        <div className="main_wrapper_content">
            <div className="main_wrapper_sidebar">
                <Sidebar handleFilter={handleFilter}/>
            </div>
            <div className="main_card_wrap_section">  
              <div className="action_section">
                  <div className="board_title">
                      <p>New Arrivals</p>
                  </div>
                  <div className="board_action_sort">
                      <select value={sortValue} onChange={(e) => {
                          setSortValue(e.target.value);
                          handleSort(e.target.value)}} >
                          <option value="">Sort the shoes</option>
                          <option value="price">Sort by Price</option>
                          <option value="size">Sort by Size</option>
                          <option value="name">Sort by Name</option>
                      </select>
                  </div>
              </div>
              <div className="main_card_wrap">
                  {isLoading ?
                <>
                <Spinner/>
                </>
              :
                <>
                    {shoesData && shoesData?.length !== 0 ? shoesData.map((data, i) => (<Card key={data?.id} data={data} /> )) : 
                    <div style={{color:"black", textAlign:"center", fontSize:"40px"}}>
                        <b>No data Found</b>
                    </div>
                    }
                </>
             }
              </div>
            </div>
        </div>
 )
}

export default Dashboard
