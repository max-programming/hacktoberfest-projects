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
import { Button } from '@/app/(public)/_components/button';

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
      repoUrl: repo.url
    } satisfies SendReportSchema;
    try {
      const response = await sendReportAction(data);
      if (response && 'id' in response) {
        toast.success('Report sent successfully');
        setRepo(null);
      } else {
        toast.error(response.errors.join(', '));
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
      <div
        className="w-full max-w-2xl modal-box bg-hacktoberfest-blue shadow-2xl md:w-11/12 rounded-xl border border-hacktoberfest-light-blue"
        style={{ boxShadow: '0 25px 50px -12px rgba(208, 204, 227, 0.25)' }}
      >
        <h3 className="block text-3xl font-bold text-hacktoberfest-light">
          Report This Repository
        </h3>
        {session.data ? (
          !isReported ? (
            <div className="flex flex-col modal-action">
              <p className="text-lg text-hacktoberfest-light mb-4">
                Please provide as much detail as possible to explain why you are
                reporting this repository.
                <span className="flex items-center gap-2 mt-3 text-sm font-bold text-hacktoberfest-light bg-hacktoberfest-light-blue/20 p-3 rounded-lg">
                  <GoStop className="text-red-400" />
                  Note that we may remove the repository
                </span>
              </p>

              <form method="dialog" onSubmit={handleSubmit} className="w-full">
                <textarea
                  name="message"
                  placeholder="Why do you want to report this repository..."
                  className="w-full p-4 mt-4 text-white rounded-lg textarea-lg textarea textarea-bordered bg-hacktoberfest-light-blue/10 focus:outline-none focus:ring-2 focus:ring-hacktoberfest-light/50 transition-all duration-200"
                  required
                  rows={4}
                />
                <div className="flex items-center justify-end p-2 mt-6 space-x-4">
                  <button
                    type="button"
                    onClick={handleCloseClick}
                    className="btn bg-transparent text-hacktoberfest-light hover:bg-hacktoberfest-light hover:text-hacktoberfest-blue transition-all duration-200"
                    style={{
                      boxShadow: '0 10px 15px -3px rgba(208, 204, 227, 0.1)'
                    }}
                  >
                    Cancel
                  </button>
                  <Button
                    type="submit"
                    className={cn(
                      isLoading &&
                        'disabled cursor-not-allowed pointer-events-none opacity-50'
                    )}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                        Loading...
                      </span>
                    ) : (
                      <span>Submit Report</span>
                    )}
                  </Button>
                </div>
              </form>
              <button
                className="absolute btn btn-md text-xl  btn-ghost right-2 top-2 text-hacktoberfest-light transition-all duration-200"
                onClick={handleCloseClick}
              >
                ✕
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center p-6">
              <span className="text-hacktoberfest-light text-lg font-medium">
                This repository is already reported and in review
              </span>
            </div>
          )
        ) : (
          <div className="flex flex-col items-center justify-center p-8">
            <p className="text-hacktoberfest-light text-lg mb-4 text-center">
              Please sign in to report this repository
            </p>
            <Button onClick={() => signIn('github')}>
              <BsGithub className="w-6 h-6 mr-2" />
              Sign in with GitHub
            </Button>
          </div>
        )}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button className="cursor-default">close</button>
      </form>
    </dialog>
  );
}
