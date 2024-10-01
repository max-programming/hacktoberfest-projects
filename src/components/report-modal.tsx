'use client';

import { useAtom } from 'jotai';
import { signIn, useSession } from 'next-auth/react';
import { FormEvent } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { BsGithub } from 'react-icons/bs';
import { GoStop } from 'react-icons/go';
import { useGetRepo } from '@/hooks/use-get-repo';
import { repoAtom } from '@/state/repoAtom';
import { SendReportSchema } from '@/app/validation';
import { sendReportAction } from '@/app/actions';
import { cn } from '@/lib/utils';

export function ReportModal() {
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
      const response = await sendReportAction(data);
      if (response && 'id' in response) {
        toast.success('Report sent successfully');
        setRepo(null);
      } else {
        toast.error(response.formErrors.join(', '));
      }
    } catch (err: any) {
      toast.error(err.message);
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
      <div className="w-full max-w-2xl modal-box bg-hacktoberfest-black border-hacktoberfest-light-green border md:w-11/12">
        <h3 className="block mb-2 text-2xl font-medium text-center text-hacktoberfest-light-green">
          Report This Repository
        </h3>
        {session.data ? (
          !isReported ? (
            <div className="flex flex-col modal-action">
              <p className="text-lg text-hacktoberfest-light">
                Please provide as much detail as possible to explain why you are
                reporting this repository.
                <span className="flex items-center gap-2 mt-2 text-sm font-bold text-hacktoberfest-green">
                  <GoStop />
                  Note that we may remove the repository
                </span>
              </p>

              <form method="dialog" onSubmit={handleSubmit}>
                <textarea
                  name="message"
                  placeholder="Why do you want to report this repository..."
                  className="w-full p-2 mt-6 -ml-2 text-white rounded-md textarea-lg textarea textarea-bordered textarea-ghost focus:outline-hacktoberfest-pink"
                  required
                />
                <div className="flex items-center justify-end p-2 mt-4 ml-6 space-x-4">
                  <button
                    type="submit"
                    className={cn(
                      'btn glass shadow-md bg-hacktoberfest-deep-pink text-xl text-hacktoberfest-light hover:bg-hacktoberfest-pink',
                      isLoading &&
                        'disabled cursor-not-allowed pointer-events-none'
                    )}
                  >
                    {isLoading ? <span>Loading...</span> : <span>Submit</span>}
                  </button>
                </div>
              </form>
              <button
                className="absolute btn btn-md text-sxl btn-circle btn-ghost right-2 top-2"
                onClick={handleCloseClick}
              >
                ✕
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center mt-5">
              <span className="text-hacktoberfest-green">
                This repository is already reported and in review
              </span>
            </div>
          )
        ) : (
          <div className="flex items-center justify-center mt-5">
            <button
              className="text-black capitalize btn bg-hacktoberfest-light hover:bg-hacktoberfest-light-green"
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
