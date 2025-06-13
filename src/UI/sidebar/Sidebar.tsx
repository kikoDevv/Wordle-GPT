"use client"
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
		<div className="bg-neutral-900 h-dvh w-50">
			<div className="flex items-center p-5">
				<IoGrid className="mr-3 text-xl text-blue-400" />
				<h1 className="text-white font-semibold">Wordle-GPT</h1>
			</div>
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
		</div>
	);
}
