import axios from "axios";
import {
  onGlobalSuccess,
  onGlobalError,
  API_HOST_PREFIX,
} from "./serviceHelpers";

//--Comment Service----------------------------------------------------//

const endpoint = `${API_HOST_PREFIX}/api/comments`;

//--POST Comment-------------------------------------------------------//

const add = (payload) => {
    const config = {
      method: "POST",
      url: endpoint,
      data: payload,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
  
    return axios(config).then(onGlobalSuccess).then((data) =>{
        return {
            ...payload,
            id:data.item
        }
    }).catch(onGlobalError);
  };


//--Update Comment-------------------------------------------------------//

const upDate = (payload) => {
    const config = {
    method: "PUT",
    url: endpoint + `/${payload.id}`,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
    };

    return axios(config).then(onGlobalSuccess).then(()=>{return{...payload}}).catch(onGlobalError);
    };


//--DELETE Friend---------------------------------------------------//

const deleteById = (id) => {
    const config = {
    method: "DELETE",
    url: endpoint + `/${id}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
    };

    return axios(config)
        .then(() => id)
        .catch(onGlobalError);
    };

//--GET Comment ID-------------------------------------------------------//

    const getById = (id) => {
    const config = {
    method: "GET",
    url: endpoint + `/${id}`, //"/5782"
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
    };

    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
    };


//--GET Entity ID-------------------------------------------------------//

const getByEntity = (entityId, entityTypeId) => {
    const config = {
        method: "GET",
        url: `${endpoint}/entities/${entityId}/${entityTypeId}`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };
    
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
    };
    

//--GET Paginated Comment-------------------------------------------------------//

const getAll = (pageIndex, pageSize) => {
    const config = {
        method: "GET",
        url: `${endpoint}/paginate/?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };
    
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
    };
        
//--GET Paginated CreatedBy Comment-------------------------------------------------------//

    const getCreatedBy = (pageIndex, pageSize, createdBy) => {
    const config = {
        method: "GET",
        url: `${endpoint}/comments/?pageIndex=${pageIndex}&pageSize=${pageSize}&createdBy=${createdBy}`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };
    
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
    };


//--GET-ALL-Comments-NOT-Paginated-------------------------------------------------------//

    const getCommentFeed = () => {
    const config = {
        method: "GET",
        url: `${endpoint}/feed`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };
    
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
    };

//------------------------------------------------------------------------------//

    export { add, getAll, getById, upDate, getByEntity, getCreatedBy, deleteById, getCommentFeed };
