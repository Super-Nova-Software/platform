"use client";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Edit } from "lucide-react";
import { Skeleton } from "../ui/skeleton";


interface InternalNavbarProps {
  tabs:any ;
}

export const InternalNavbar = ({
  tabs,
}: InternalNavbarProps) => {
  const params = useParams();
  const router = useRouter();

  const onClick = () => {
    router.push(`/${params?.cases}/${tabs?.link}/`)
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative px-2 py-2 rounded-md flex items-center gap-x-2  hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
      )}
    >
      <div
        className={cn(
          "absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
          params?.cases !== tabs.link && "group-hover:h-[20px]",
          params?.cases === tabs.link ? "h-[36px]" : "h-[8px]"
        )}
      />
        <>{tabs.emoji}</>
      <p className={cn(
        "line-clamp-1 font-semibold text-base text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
        params?.cases === tabs.link && "text-primary dark:text-zinc-200 dark:group-hover:text-white"
      )}>
        {tabs.name}
      </p>
    </button>
  );
}

InternalNavbar.Skeleton = function InternalNavbarSkeleton() {
  return (
    <div className="group relative px-2 py-2 rounded-md flex items-center gap-x-2 w-full mb-1">
      <div className="absolute left-0 rounded-r-full transition-all w-[4px] h-[8px]" />
      <Skeleton className="flex-shrink-0 w-5 h-5 bg-[rgb(50,129,70)]" />
      <Skeleton className="flex-1 h-4 bg-[rgb(50,129,70)]" />
      <Skeleton className="ml-auto w-4 h-4 bg-[rgb(50,129,70)]" />
    </div>
  );
};