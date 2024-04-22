import { useQuery } from '@tanstack/react-query';
import React from 'react';
import GithubCard from './GithubCard.jsx';
import { githubRepositoriesName } from './GithubList.jsx';
import NavBar from './NavBar.jsx';

export default function GithubApi() {
	const [githubIndex, setGithubIndex] = React.useState(0);

	const { data, error, isError, isPending } = useQuery({
		queryKey: ['github'],
		queryFn: () =>
			Promise.all(
				githubRepositoriesName.map((repositoryName) =>
					fetch(`https://api.github.com/repos/${repositoryName}`)
						.then((response) => {
							if (!response.ok) {
								throw new Error(`${repositoryName} Not Found`);
							}
							return response.json();
						})
						.catch((error) => ({
							error: true,
							message: error.message,
							full_name: repositoryName,
						}))
				)
			),
	});

	function nextGithub() {
		if (githubIndex < githubRepositoriesName.length - 1) {
			setGithubIndex(githubIndex + 1);
		}
	}

	function previousGithub() {
		if (githubIndex > 0) {
			setGithubIndex(githubIndex - 1);
		}
	}

	if (isPending) {
		return <span>Loading...</span>;
	}

	if (isError) {
		return <span>Error: {error.message}</span>;
	}

	return (
		<div>
			{data[githubIndex].error ? (
				<span>Error: {data[githubIndex].message}</span>
			) : (
				<GithubCard github={data[githubIndex]} />
			)}
			<NavBar
				githubRepositoriesName={githubRepositoriesName}
				githubIndex={githubIndex}
				previousGithub={previousGithub}
				nextGithub={nextGithub}
			/>
		</div>
	);
}
