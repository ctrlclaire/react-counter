function GithubCard({ github }) {
	return (
		<div className="github-card">
			<h2>{github.full_name}</h2>
			<p>{github.description}</p>
			<img src={github.owner.avatar_url} />
		</div>
	);
}

export default GithubCard;
