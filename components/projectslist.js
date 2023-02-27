import Image from "next/image";
import Link from "next/link";
import { cx } from "@utils/all";
import GetImage from "@utils/getImage";
import { parseISO, format } from "date-fns";
import { PhotographIcon } from "@heroicons/react/outline";
import CategoryLabel from "@components/blog/category";
import { BiLinkExternal } from "react-icons/bi";
import { FaGithub } from "react-icons/fa";

export default function ProjectList({ project, aspect }) {
  //   console.log(project);
  return (
    <>
      <div className="rounded-sm border  my-2">
        <div className="flex justify-between">
          <a
            href={`${project.link}`}
            target={"_blank"}
            rel="noreferrer"
            className="flex m-2 justify-between cursor-pointer link-effect">
            <BiLinkExternal size={25} className="mr-4" />
            <span className="">{project.title}</span>
          </a>
          <a
            href={`${project.githubLink}`}
            target={"_blank"}
            rel="noreferrer"
            className="flex m-2 justify-between cursor-pointer link-effect text-white bg-red-500">
            <span className="">source code</span>
            <FaGithub size={25} />
            <BiLinkExternal size={25} />
          </a>
        </div>
        <div>
          <span>tech stack:</span>
          {project?.techology?.map(item => (
            <span
              key={item._key}
              className="cursor-pointer px-1 mx-1 link-effect text-white bg-red-500">
              | {item.technology}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
