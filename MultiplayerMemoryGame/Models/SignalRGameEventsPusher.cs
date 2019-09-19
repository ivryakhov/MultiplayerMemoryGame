using ActorModel.ExternalSystems;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Generic;

namespace MultiplayerMemoryGame.Models
{
    public class SignalRGameEventsPusher : IGameEventsPusher
    {
        private readonly IHubContext<GameHub> _gameHubContext;

        public SignalRGameEventsPusher(IHubContext<GameHub> gameHubContext)
        {
            _gameHubContext = gameHubContext;
        }

        public void PlayerJoined(string playerName)
        {
            _gameHubContext.Clients.All.SendAsync("PlayerJoined", playerName);
        }

        public void PlayerLoginSuccess(string playerName, string connectionId)
        {
            _gameHubContext.Clients.Client(connectionId).SendAsync("PlayerLoginSuccess", playerName);
        }

        public void PlayerLoginFailed(string errorMessage, string connectionId)
        {
            _gameHubContext.Clients.Client(connectionId).SendAsync("PlayerLoginFailed", errorMessage);
        }

        public void PlayersListProvided(IList<string> players, string connectionId)
        {
            _gameHubContext.Clients.Client(connectionId).SendAsync("PlayersListProvided", players);
        }
    }
}
