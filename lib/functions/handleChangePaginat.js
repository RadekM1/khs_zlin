export const handleChangePaginat = (event, value, setCurrentPage) => {
    let temp = value
    setCurrentPage(temp); 
    window.scrollTo({
        top: 0,
        behavior: "smooth", 
      });
}