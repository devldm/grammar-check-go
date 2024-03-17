"use client";

import ElipsisVerticalIcon from "./elipsisVertical";
import { deleteSolution } from "../lib/deleteSolution";

export default function OptionsToggle({ solutionId }: { solutionId: string }) {
  return (
    <div className="dropdown dropdown-bottom dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn-ghost hover:shadow hover:rounded-md"
      >
        <ElipsisVerticalIcon />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow rounded-box w-52 bg-neutral"
      >
        <li onClick={async () => await deleteSolution(solutionId)}>
          <a className="text-red-500">delete</a>
        </li>
      </ul>
    </div>
  );
}
