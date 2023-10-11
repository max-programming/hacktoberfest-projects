import axios from 'axios';
import { useAtom } from 'jotai';
import { signIn, useSession } from 'next-auth/react';
import { SendReportSchema } from 'pages/api/send-report';
import { FormEvent, use } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { BsGithub } from 'react-icons/bs';
import { GoStop } from 'react-icons/go';
import { useGetRepo } from 'utils/hooks/use-get-repo';
import { repoAtom } from 'utils/state/repoAtom';

function ReportModal() {
  const isReported = useGetRepo();
  const session = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [repo, setRepo] = useAtom(repoAtom);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!repo || !session.data || !session.data.user) return;

    setIsLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const message = formData.get('message') as string;
    const repoId = repo.id;
    const repoAuthor = repo.owner.login;

    const data = {
      message,
      repoAuthor,
      repoId,
      repoUrl: repo.html_url
    } satisfies SendReportSchema;
    try {
      const res = await axios.post('/api/send-report', data, {
        validateStatus: status =>
          (status >= 200 && status < 300) || status === 409
      });
      if (res.status === 200) {
        toast.success('Report sent successfully');
        setRepo(null);
      } else {
        toast.error(res.data.message);
      }
    } catch (e: any) {
    } finally {
      setIsLoading(false);
      handleCloseClick();
    }
  }

  function handleCloseClick() {
    const modal = document.getElementById('modal') as HTMLDialogElement;
    if (modal) modal.close();
  }

  return (
    <dialog id="modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box md:w-11/12 w-full max-w-2xl">
        <h3 className="font-bold text-2xl text-center block mb-2 text-2023-manga-2">
          Report This Repository
        </h3>
        {session.data ? (
          !isReported ? (
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
                  name="message"
                  placeholder="Why do want to report this repository..."
                  className="textarea-lg textarea textarea-bordered textarea-ghost rounded-md w-full p-2   focus:outline-2023-bavarian-red-1 mt-6 -ml-2 text-white"
                  required
                />
                <div className="flex mt-4 justify-end items-center ml-6 p-2 space-x-4">
                  <button
                    type="submit"
                    className={`btn glass shadow-md bg-2023-bavarian-red-2 text-xl text-2023-manga-2 hover:bg-2023-bavarian-red-3 ${
                      isLoading
                        ? 'disabled cursor-not-allowed pointer-events-none'
                        : ''
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <span className="loading loading-spinner"></span>
                        Sending report...
                      </>
                    ) : (
                      'Report'
                    )}
                  </button>
                </div>
              </form>
              <button
                className="btn btn-md text-sxl btn-circle btn-ghost absolute right-2 top-2"
                onClick={handleCloseClick}
              >
                ✕
              </button>
            </div>
          ) : (
            <div className="flex justify-center items-center mt-5">
              <span className="text-2023-bavarian-gold-1">
                This repository is already reported and in review
              </span>
            </div>
          )
        ) : (
          <div className="flex justify-center items-center mt-5">
            <button
              className="btn bg-2023-manga-2 hover:bg-2023-manga-3 text-black capitalize"
              onClick={() => signIn('github')}
            >
              <BsGithub className="w-6 h-6 mr-1" />
              Sign in with GitHub
            </button>
          </div>
        )}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button className="cursor-default">close</button>
      </form>
    </dialog>
  );
}

export default ReportModal;
