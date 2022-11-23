/* eslint-disable jsx-a11y/alt-text */
//import react
import React from 'react';

function WebHeader() {

    return(
        <React.Fragment>
           <div>
            <header>
            <div className="fixed inset-x-0 top-0 z-10 text-center text-white bg-red-700">
                <div className="container grid grid-cols-10 p-3 mx-auto sm:w-full md:w-6/12">
                <div className="col-span-2 p-1 mr-2 bg-white rounded-full shadow-sm w-11 h-11">
                        <img src={require("../../assets/blitarcirclecop.png")} className="inline-block" />
                </div>
                <div className="col-span-8">
                    <input type="text" className="w-full p-5 placeholder-gray-500 bg-white rounded-full shadow-md appearance-none h-7 focus:outline-none focus:placeholder-gray-600 focus:bg-white focus-within:text-gray-600"
                    placeholder="Cari yang ingin kami bantu" />
                </div>
                </div>
            </div>
            </header>
           </div>
        </React.Fragment>
    )
}

export default WebHeader;