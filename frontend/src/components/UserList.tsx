import { useState } from "react";

interface User {
	username: string;
	email: string;
	password: string;
}

export function UserList() {
	const [userList, setUserList] = useState<User[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [noUserFound, setNoUserFound] = useState<boolean>(false);

	const showUserList = async () => {
		try {
			const response = await fetch("/user/list", {
				method: "GET",
			});
			if (!response.ok) {
				throw new Error("Failed to fetch user list");
			}
			const data = await response.json();
			setUserList(data.reverse());
			if (data.length === 0) {
				setNoUserFound(true);
			} else {
				setNoUserFound(false);
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				setError(error.message);
			} else {
				setError("An unknown error occurred");
			}
		}
	};

	return (
		<div className="w-[1000px] h-auto bg-zinc-800 gap-8 p-8 rounded-lg flex flex-col items-center justify-between">
			<button
				onClick={showUserList}
				className="bg-zinc-700 text-white text-lg p-2 pt-1 pb-1 rounded-sm w-[375px] h-[45px] hover:bg-zinc-600 transition-colors duration-200 ease-in-out"
			>
				Show user list
			</button>

			{error && <p className="text-white">Error: {error}</p>}
			{userList.length > 0 && (
				<ul className="w-full bg-zinc-700 p-8 rounded-lg flex flex-col items-center justify-between h-auto gap-2">
					<li className="flex gap-2">
						<span className="text-white bg-zinc-500 text-lg w-[450px] h-[50px] rounded-md px-4 flex items-center justify-center">
							Username
						</span>
						<span className="text-white bg-zinc-500 text-lg w-[450px] h-[50px] rounded-md px-4 flex items-center justify-center">
							Email
						</span>
					</li>
					{userList.map((user, index) => (
						<li key={index} className="flex gap-2">
							<span className="text-white bg-zinc-600 text-lg w-[450px] h-[50px] rounded-md px-4 flex items-center justify-center">
								{user.username}
							</span>
							<span className="text-white bg-zinc-600 text-lg w-[450px] h-[50px] rounded-md px-4 flex items-center justify-center">
								{user.email}
							</span>
						</li>
					))}
				</ul>
			)}
			{noUserFound && (
				<div>
					<span className="text-zinc-800 bg-zinc-300 font-semibold w-[930px] h-[50px] rounded-md px-4 flex items-center justify-center">
						No user found
					</span>
				</div>
			)}
		</div>
	);
}
