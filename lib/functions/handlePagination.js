
export default function HandlePagination(PagNumReq, ArrayLenght , setpaginationNum) { 
    let PagN = PagNumReq;
    let ArrayL = ArrayLenght;
    
    let PagNum = ArrayL % PagN === 0 ? PagN : ArrayL % PagN;
    setpaginationNum(PagNum);
    return PagNum;
  }
  