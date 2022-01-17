import React,{useState, useEffect} from 'react'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import ArrowDropUp from '@material-ui/icons/ArrowDropUp'
import { filterData, getShoesData } from '../services/shoesService';
import { useDispatch, useSelector } from 'react-redux';

const Sidebar = (props) => {
    const arrayofSize = [35, 36, 37,38,39,40,41,42,43,44,45,46,47,48,49,50];
    const [filterSize, setFilterSize] = useState([]);
    const [openDrop, setOpenDrop] = useState(false);
    const [category, setCategory] = useState('')
    const [minSlider, setMinSlider] = useState("100");
    const [maxSlider, setMaxSlider] = useState("1000");
    const [filter, setFilter] = useState(false);

    const priceGap = 800;
    
    useEffect(() => {
        const range = document.querySelector(".slider .progress");
        let minVal = parseInt(minSlider),
        maxVal = parseInt(maxSlider);
        range.style.left = ((minVal / 10000) * 100) + "%";
        range.style.right = 100 - (maxVal / 10000) * 100 + "%";
    }, []);

    const sliderHandler = ( e ) => {
        
        const range = document.querySelector(".slider .progress");
        let minVal = parseInt(minSlider),
        maxVal = parseInt(maxSlider);
        console.log("val", minVal,maxVal, e.target.value, maxVal - minVal)
        if((maxVal - minVal) < priceGap){ 
            if(e.target.className === "range-min"){
                setMinSlider(maxVal - priceGap);
            }else{
                setMaxSlider(minVal + priceGap);
            }
        }else{
            range.style.left = ((minVal / e.target.max) * 100) + "%";
            range.style.right = 100 - (maxVal / e.target.max) * 100 + "%";
        }
        setFilter(!filter);
    };

    const setFilterHandle = (e, d) => {
        var data = filterSize;
        if(!filterSize?.includes(d)){
          data.push(d);
          setFilterSize(data); 
        }
        setFilter(!filter);
    };
    
    const setcategory = (e) => {
      setCategory(e.target.value);
      setFilter(!filter);
    };

    useEffect(() => {
        const filterRequest = {
            "size": filterSize,
            "price": [minSlider, maxSlider],
            "category": category
        }
        props?.handleFilter(filterRequest)
        console.log(filterSize, maxSlider, minSlider);
    }, [filter]);

    return (
        <div className="main_side_bar_element">
            <div className="main_side_bar_first">
              
            </div>
            <div className="main_side_bar_second">
              <button onClick={() => setOpenDrop(!openDrop)}>
                  <span style={{color:"black", fontWeight:800, fontSize:"16px"}}>Categories</span>
                  {openDrop ? 
                  <ArrowDropUp style={{color:"grey",fontSize:"30px", marginTop:"-5px"}}/> :
                  <ArrowDropDown style={{color:"grey",fontSize:"30px", marginTop:"-5px"}}/>
                  }
              </button>
            </div>
            {openDrop && <div>
             <div className="radio_selector">
                <label className="container_radio">
                <input 
                   type="radio" 
                   name="radio" 
                   value={"Flip Flops"} 
                   onChange={(e) => setcategory(e)} 
                   checked={category === "Flip Flops"}/>
                <span className="checkmark"></span>
                 <span className="label_radio">
                    Flip Flops
                </span>
                </label>
                <label className="container_radio">
                <input 
                  type="radio" 
                  name="radio" 
                  value={"Sneakers"} 
                  onChange={(e) => setcategory(e)} 
                  checked={category === "Sneakers"}/>
                <span className="checkmark"></span>
                <span className="label_radio">
                    Sneakers
                </span>
                </label>
                <label className="container_radio">
                <input 
                  type="radio" 
                  name="radio" 
                  value={"Lace-Up Shoes"} 
                  onChange={(e) => setcategory(e)}
                  checked={category === "Lace-Up Shoes"}/>
                <span className="checkmark"></span>
                 <span className="label_radio">
                    Lace-Up Shoes
                </span>
                </label>
                <label className="container_radio">
                <input 
                  type="radio" 
                  name="radio" 
                  value={"Sports"} 
                  onChange={(e) => setcategory(e)}
                  checked={category === "Sports"}/>
                <span className="checkmark"></span>
                 <span className="label_radio">
                    Sports
                </span>
                </label>
             </div>
            </div>
            }
            <div className="main_side_bar_price">
                <div className="price_title">
                  <span style={{color:"black", fontWeight:600, fontSize:"16px"}}>Price Range</span>
                </div>
                <div  className="price_range_wrapper">
                    <div className="slider">
                     <div className="progress"></div>
                    </div>
                   <div className="range-input">
                    <input type="range" className="range-min" min="100" max="10000" value ={minSlider} step="100" onChange={(e) => {
                        setMinSlider(e.target.value)
                        sliderHandler(e);}
                    }/>
                    <input type="range" className="range-max" min="100" max="10000" value ={maxSlider} step="100" onChange={(e) => {
                        setMaxSlider(e.target.value)
                        sliderHandler(e)}
                    }/>
                </div><br/>
                <div style={{display:"flex", justifyContent:"space-around"}}>
                    <div>
                        <b>Min :</b> $ {minSlider}
                    </div>
                     <div>
                     <b>Max :</b> $ {maxSlider}
                     </div>
                    </div>
                </div>
               </div>
           <div>
               <div className="main_side_bar_size">
                <div className="price_title">
                  <span style={{color:"black", fontWeight:600, fontSize:"16px"}}>Size</span>
                </div>
                <div className="main_side_bar_size">
                    {arrayofSize.map((d, i) => <div key={i}
                    className={!filterSize?.includes(d) ? "s_button" : "s_button active"}
                      onClick={(e) => setFilterHandle(e, d)}>
                        {d}
                       </div>
                    )}
                </div>
            </div>
           </div>
           </div>
    );
}

export default Sidebar;
