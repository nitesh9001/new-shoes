import React from 'react'

const Card = (props) => {
  const data = props?.data 
  
  return (
    <div className="card">
        <span className="color_side" style={{backgroundColor: data?.colorway.split("/")[0]}}></span>
      <div className="card_inner" >
        <span className="shoes_name">{data?.shoe}</span><br/>
        <span className="shoes_brand">{data?.brand}</span>
        <img src={data?.media?.imageUrl} alt="img_not_found" className="image_card"/>
        <div className="footer_card">
          <div>
            <span className="shoes_name">Price</span><br/>
            <b>$ {data?.retailPrice}</b>
          </div>
          <div className="img_te_box">
            <img src={data?.media?.imageUrl} alt="img_not_found" className="image_card_icon"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
