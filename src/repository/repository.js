import { request } from '../helpers/axios_helper';
import {request_ml} from "../helpers/axios_ml_helper";
import {da} from "plotly.js/src/traces/carpet/attributes";

const Repository = {
    fetch_clusters:(pageNumber)=>{
        return request("GET",`/productCluster/all?pageNumber=${pageNumber}`, {})
    },
    fetch_filtered_clusters:(pageNumber,filters)=>{
        let filtersQuery=Helpers.buildFilters(filters)
        return request("GET",`/productCluster/filter?pageNumber=${pageNumber}&${filtersQuery}`, {})
    },
    fetch_product_clusters_pagination_info:(filters)=>{
        let filtersQuery=Helpers.buildFilters(filters)
        return request("GET",`/productCluster/filter/paginationInfo?${filtersQuery}`, {})
    },
    fetch_categories:()=>{
        return request("GET", "/helpers/categories/all",{})
    },
    fetch_stores:()=>{
        return request("GET", "/helpers/stores/all",{})
    },
    fetch_cluster:(id)=>{
        return request("GET", `/productCluster/${id}`, {})
    },
    fetch_product:(id)=>{
        return request("GET", `/product/${id}`, {})
    },
    get_visualization:(id)=>{
        return request_ml("GET", `/visualize/${id}`,{},{})
    },
    scrape_data:()=>{
        return request_ml("GET", `/admin/scrape_data`,{},{})
    },
    add_new_data:(data)=>{
        return request_ml("POST", `/admin/add_new_data`, data,{'Content-Type': 'multipart/form-data'})
    }
}
const Helpers = {
    buildFilters:(filters)=>{
        let filtersQuery=""
        for(const f in filters){
            filtersQuery+=f
            if(filters[f]!==''){
                filtersQuery+='='
                filtersQuery+=filters[f]
            }
            filtersQuery+='&'
        }
        filtersQuery=filtersQuery.substring(0,filtersQuery.length-1)
        return filtersQuery
    }
}
export default Repository
