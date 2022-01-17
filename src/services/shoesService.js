import axios from 'axios';
import { apiEndPoint } from "../utlis/genric";
import { SNACKBAR_SHOW } from "../redux/actions/snackbarAction";
import { shoesAction } from "../redux/actions/shoesAction";
import { arryOfShoes } from './jsonData';

var options = {
  method: 'GET',
  url: `${apiEndPoint}/sneakers`,
  params: {limit: 40},
  headers: {
    'x-rapidapi-host': 'v1-sneakers.p.rapidapi.com',
    'x-rapidapi-key': '1266c958c4msh08ff300fef225b6p1d3e09jsn40ec9b75defc'
  }
};

export const getShoes = ( dispatch, setIsLoading ) => { 
    axios(options)
    .then(response => {
        console.log("response from api", response)
        // if(response?.status === 200){
        //     dispatch(shoesAction(response?.data?.results));
        // }
        // else{
        //     dispatch(SNACKBAR_SHOW({
        //         show: true,
        //         data: {
        //         severity: "error",
        //         duration: 3000,
        //         message: response?.data?.message,
        //         },
        //     }))
        // }
    }).catch((err) => {
        console.log('error looged in genre', err);
         dispatch(SNACKBAR_SHOW({
            show: true,
            data: {
            severity: "error",
            duration: 3000,
            message: "Something went Wrong",
            },
        })
        )
    }).finally(() => {
        setIsLoading(false);
    })
}

export const getShoesData = ( dispatch, setIsLoading ) => {
    console.log("array data from file",arryOfShoes);
    if(arryOfShoes?.status === 200){
        dispatch(shoesAction(arryOfShoes?.data));
    }
    else{
        dispatch(SNACKBAR_SHOW({
            show: true,
            data: {
            severity: "error",
            duration: 3000,
            message: "something went wrong",
        },
    }))
    }
    setIsLoading(false);
}
