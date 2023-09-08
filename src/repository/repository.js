import { request } from '../helpers/axios_helper';

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
