import { get, post } from './ajax'
import axios from 'axios'



/**
 * 获取新闻列表
 */
export function getNewList(params) {
    return get("/api/index", params);
    // return get("http://localhost:8080/api/index", params);
}


/**
 * 新闻上下线
 */
export function articleSwitchStatue(params) {
    post("/api/index", params);   
}


/**
 * 获取冻结新闻列表
 */
export function getFrezzNewList(params) {
    return get("/frezzNewsList", params);  
}


