"use client"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { deleteEvent } from "@/lib/actions/event.actions";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTransition } from "react";

const DeleteConfirmation = ({ eventId }:{eventId:string}) => {
  const pathname = usePathname();
  let [isPending, startTransition] = useTransition();

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger>
          <Image
            src="/assets/icons/delete.svg"
            alt="edit"
            width={20}
            height={20}
          />
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this event?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              event.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                startTransition(async () => {
                  await deleteEvent({ eventId, path: pathname });
                })
              }
            >
              {isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
export default DeleteConfirmation;
