export interface DelegateData {
    delegate: string;
    ens_name:string;
    voting_power: string;
    th_vp:string;
    ch_member_r3?: string;
    ch_member_r4?:string;
    ch_member_r2?: string;
    gc_member_s3?: string;
    gc_member_s4?: string;
    gc_member_s5?: string;
    gc_member_mm_s5?: string;
    sc_member_s5?: string;
    coc_member_s5?: string;
    dab_member_s5?: string;
    influence_r2_s3?: string;
    influence_r2_s4?: string;
    influence_r2_s5?: string;
    influence_r3_s5?: string;
    influence_r4_s5?:string;
    influence:string;
  }
  
  

  export interface ApiResponse {
    totalItems: number;
    totalPages:number;
    currentPage: number;
    itemsPerPage: number;
    data: DelegateData[];
  }
  
export type ButtonType = 'All' | 'Optimism' | 'Aave' | 'Compound' | 'Uniswap';

export type FetchParams = {
  page: number;
  sort: string;
  isAsc: boolean;
  search: string;
  url:string;
};