import { FormEvent } from 'react';
import { useState } from 'react';
import { GoStop } from 'react-icons/go';

function ReportModal() {
  const [message, setMessage] = useState('');
  const handleSubmit = (e: FormEvent) => {
    console.log(message);
    // Handle db request here
  };
  const handleCloseCLick = () => {
    const modal = document.getElementById('modal') as HTMLDialogElement;
    if (modal) {
      modal.close();
    }
  };
  return (
    <>
      <div>
        <dialog id="modal" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box md:w-11/12 w-full max-w-2xl">
            <h3 className="font-bold text-4xl block mb-2 text-2023-manga-2">
              Report This Repository
            </h3>
            <div className="modal-action flex flex-col">
              <p className="text-2023-manga-3 text-lg">
                Please provide as much detail as possible to explain why you are
                reporting this repository.
                <span className="flex gap-2  items-center font-extralight text-sm mt-2   text-2023-bavarian-red-1">
                  <GoStop className="font-extrabold" />
                  Note that we may remove the repository
                </span>
              </p>

              <form method="dialog" onSubmit={handleSubmit}>
                <textarea
                  id="reportReason"
                  name="message"
                  placeholder="Why do want to report this repository......"
                  className="textarea-lg textarea textarea-bordered textarea-ghost rounded-md w-full p-2   focus:outline-2023-bavarian-red-1 mt-6 -ml-2 text-white"
                  onChange={e => setMessage(e.target.value)}
                  required
                />
                <div className="flex mt-4 justify-end items-center ml-6 p-2 space-x-4">
                  <button className="btn glass shadow-md bg-2023-bavarian-red-2 text-xl text-2023-manga-2 hover:bg-2023-bavarian-red-3">
                    Report
                  </button>
                </div>
              </form>
              <button
                className="btn btn-md text-sxl btn-circle btn-ghost absolute right-2 top-2"
                onClick={handleCloseCLick}
              >
                ✕
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button className="cursor-default">close</button>
          </form>
        </dialog>
      </div>
    </>
  );
}

export default ReportModal;
