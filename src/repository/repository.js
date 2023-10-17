import { request } from '../helpers/axios_helper';
import {request_ml} from "../helpers/axios_ml_helper";

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
    get_model_statistics_visualization:()=>{
      return request_ml("GET", '/admin/modelStatistics', {},{})
    },
    scrape_data:()=>{
        return request_ml("GET", `/admin/scrape_data`,{},{})
    },
    add_new_data:(data)=>{
        return request_ml("POST", `/admin/add_new_data`, data,{'Content-Type': 'multipart/form-data'})
    },
    train_model:()=>{
        return request_ml("GET", `/admin/train`, {},{})
    },
    fetch_expected:(filterType, pageNumber)=>{
        return request("GET", `/product/expected?pageNumber=${pageNumber}&type=${filterType}`, {})
    },
    fetch_pagination_info_ups_downs:(filterType)=>{
        return request("GET", `/product/expectedPagination?type=${filterType}`, {})
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
