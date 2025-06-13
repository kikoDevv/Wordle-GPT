"use client";
import React from "react";
import {
	IoGameController,
	IoTrophy,
	IoInformationCircle,
	IoFolder,
	IoGrid,
} from "react-icons/io5";

export default function Sidebar() {
	return (
		<div className="bg-neutral-900 h-dvh w-60 flex flex-col">
			{/*--------- slider head ----------*/}
			<div className="flex items-center p-5 select-none">
				<IoGrid className="mr-3 text-xl text-blue-400" />
				<h1 className="text-white font-semibold">Wordle-GPT</h1>
				<button
					className="ml-auto p-2 hover:bg-gray-800 rounded-lg transition-colors duration-200 text-gray-400 hover:text-white hover:cursor-pointer"
					title="Close sidebar"
				>
					<svg
						width="20"
						height="20"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth="2"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>
			{/*--------- slider body ----------*/}
			<ul className="grid py-5">
				<li className="hover:bg-gray-800 hover:cursor-pointer pl-5 py-2 rounded-sm flex items-center text-gray-300 hover:text-white transition-colors">
					<IoGameController className="mr-3 text-lg" />
					Play
				</li>
				<li className="hover:bg-gray-800 hover:cursor-pointer pl-5 py-2 rounded-sm flex items-center text-gray-300 hover:text-white transition-colors">
					<IoTrophy className="mr-3 text-lg" />
					Leader board
				</li>
				<li className="hover:bg-gray-800 hover:cursor-pointer pl-5 py-2 rounded-sm flex items-center text-gray-300 hover:text-white transition-colors">
					<IoInformationCircle className="mr-3 text-lg" />
					About
				</li>
				<li className="hover:bg-gray-800 hover:cursor-pointer pl-5 py-2 rounded-sm flex items-center text-gray-300 hover:text-white transition-colors">
					<IoFolder className="mr-3 text-lg" />
					My other projects
				</li>
			</ul>
			{/*--------- slider foot ----------*/}
			<div className="flex justify-center mt-auto p-5 border-t border-gray-700">
				<p className="text-gray-500 text-sm">Version 2.0</p>
			</div>
		</div>
	);
}
