var playerDataFetcher = {};
const urlParams = new URLSearchParams(window.location.search);

/** Request parameters */
playerDataFetcher.serverUrl = "https://test.purplefro.com/api"
playerDataFetcher.loadPlayerDataUri = "/status/"
uid = urlParams.get('user_id');
if (uid !== null) {
  playerDataFetcher.playerId = uid;
}
else {
  playerDataFetcher.playerId = -414588547;
}

/** Utility */
playerDataFetcher.loadedPlayerData = null;
playerDataFetcher.loadedPlayerDataPromise = null;
playerDataFetcher.loadPlayerDataUrl = playerDataFetcher.serverUrl + playerDataFetcher.loadPlayerDataUri + playerDataFetcher.playerId;

playerDataFetcher.getPlayerId = function() {
  return playerDataFetcher.playerId;
}

playerDataFetcher.loadPlayerData = async function() {
  if (playerDataFetcher.loadedPlayerDataPromise) {
    return playerDataFetcher.loadedPlayerDataPromise;
  }

  try {
    const response = await fetch(playerDataFetcher.loadPlayerDataUrl);
    const data = await response.text();
    console.log('Loaded ', data);
    playerDataFetcher.loadedPlayerData = JSON.parse(data);
    return playerDataFetcher.loadedPlayerData;
  } catch (reason) {
    console.error('[playerDataFetcher] Failed to fetch player data:\n' + reason);
    playerDataFetcher.loadedPlayerDataPromise = null;
    throw reason;
  }
};

playerDataFetcher.getLoadedPlayerData = function() {
  return playerDataFetcher.loadedPlayerData;
};

