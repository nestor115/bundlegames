

const Loading = (props) => {
  
if (props.source === "BoardgamesPage") {
    return (
        <div className="m-6 max-w-xs h-80 bg-white border-2 border-gray-300 rounded-lg shadow flex items-center justify-center" style={{ width: "300px" }}>
        <div className="p-5 text-center">
          <div className="w-10 h-10 border-4 text-orange-400 text-2xl animate-spin border-gray-300 flex items-center justify-center border-t-orange-400 rounded-full">
            <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em" className="animate-ping">
            </svg>
          </div>
        </div>
      </div>
    );  
}
    return (
        
          <div className="flex-col gap-4 w-full flex items-center justify-center">
            <div className="w-10 h-10 border-4 text-orange-400 text-2xl animate-spin border-gray-300 flex items-center justify-center border-t-orange-400 rounded-full">
              <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em" className="animate-ping">
              </svg>
            </div>
          </div>
        
    ); 

};

export default Loading;
