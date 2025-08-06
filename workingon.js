

function timeAgo(dateString) {
  const now = new Date();
  const past = new Date(dateString);
  const diffInSeconds = Math.floor((now - past) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
}

function formatNiceDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

async function getLastPublicRepoCommitWithFormattedTime(username) {
  const response = await fetch(`https://api.github.com/users/${username}/events/public`);

  if (!response.ok) {
    throw new Error(`Failed to fetch public events for ${username}`);
  }

  const events = await response.json();
  const pushEvent = events.find(event => event.type === "PushEvent");

  if (!pushEvent) {
    throw new Error(`No recent public commits found for ${username}`);
  }

  const repoName = pushEvent.repo.name;
  const commit = pushEvent.payload.commits?.[0];
  const timestamp = commit?.timestamp || pushEvent.created_at;

  return {
      repo: repoName,
      exactTime: formatNiceDate(timestamp),
      relativeTime: timeAgo(timestamp)
    };
}

// Example usage
getLastPublicRepoCommitWithFormattedTime("jsteagle")
.then(data => {
    console.log(`Last commit to ${data.repo}`);
    console.log(`Time: (${data.relativeTime})`);
    document.getElementById("current-project").innerText = `${data.repo} (${data.relativeTime})`;
  })
  .catch(err => console.error("Error:", err.message));

