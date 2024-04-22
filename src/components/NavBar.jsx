function NavBar({
	githubIndex,
	previousGithub,
	nextGithub,
	githubRepositoriesName,
}) {
	return (
		<>
			{(githubIndex > 0 && (
				<button onClick={previousGithub}>Previous</button>
			)) || <button disabled>Previous</button>}
			{(githubIndex < githubRepositoriesName.length - 1 && (
				<button onClick={nextGithub}>Next</button>
			)) || <button disabled>Next</button>}
		</>
	);
}

export default NavBar;
