
const Modal = ({ title, hideModal, children }) => {
  return (
    <>
      <div className="justify-center items-start flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative my-6 mx-auto max-w-4xl w-full  md:h-5/6">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex  items-start justify-between p-4 border-b rounded-t ">
              <h3 className="text-xl font-semibold text-black">{title}</h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                onClick={hideModal}
              >
                X
              </button>
            </div>

            {/*body*/}
            <div className="relative p-6 flex-auto">{children}</div>
            {/*footer*/}
          </div>
        </div>
      </div>
      <div className=" opacity-65 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default Modal;
