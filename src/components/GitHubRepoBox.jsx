export default function GitHubRepoBox({ repoUrl }) {
    return (
        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
        >
          🔗
        </a>
    );
  }
  