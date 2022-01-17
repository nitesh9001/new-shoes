import React,{ useEffect, useState } from 'react'
import { filterData, getShoesData } from '../services/shoesService'
import Card from './Card'
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../Spinner';
import Sidebar from '../component/sidebar';
import { shoesAction } from '../redux/actions/shoesAction';
import { arryOfShoes } from '../services/jsonData';

const Dashboard = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true)
    const shoesData = useSelector((state) => state?.shoes?.shoes);
    const originalData = arryOfShoes?.data;
    useEffect(() => {
        getShoesData(dispatch, setIsLoading);
    }, []);

    const handleFilter = (props) => {
        console.log("props filter",props);
        let finalData = originalData
        if(props?.size){
            finalData = originalData.filter(function(d){
            if (props?.size.indexOf(d?.size) > -1)
               return true
        });
        }
        if(props?.category){
            finalData = finalData.filter(function(d){
                console.log(d?.category === props?.category);
              if(d?.category === props?.category)
                return true
        })
        }
        if(props?.category){
            finalData = finalData.filter(function(d){
            console.log(d?.retailPrice > props?.price[0]);
            if(d?.retailPrice > props?.price[0] && d?.retailPrice < props?.price[1])
               return true
        })
        }
        dispatch(shoesAction(finalData));
    }

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
                      <select>
                          <option>Sort by Price</option>
                          <option>Sort by Date</option>
                          <option>Sort by Name</option>
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
                    <div style={{color:"white", textAlign:"center", fontSize:"40px"}}>
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
