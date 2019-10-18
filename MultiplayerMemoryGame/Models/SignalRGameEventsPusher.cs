using ActorModel.ExternalSystems;
using GameModel;
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

        public void PlayerJoined(Player player)
        {
            _gameHubContext.Clients.All.SendAsync("PlayerJoined", player);
        }

        public void PlayerLoginSuccess(string playerName, string connectionId)
        {
            _gameHubContext.Clients.Client(connectionId).SendAsync("PlayerLoginSuccess", playerName);
        }

        public void PlayerLogoutSuccess(string playerName, string connectionId)
        {
            _gameHubContext.Clients.Client(connectionId).SendAsync("PlayerLogoutSuccess", playerName);
        }

        public void PlayerLeaved(string playerName)
        {
            _gameHubContext.Clients.All.SendAsync("PlayerLeaved", playerName);
        }

        public void PlayerLoginFailed(string errorMessage, string connectionId)
        {
            _gameHubContext.Clients.Client(connectionId).SendAsync("PlayerLoginFailed", errorMessage);
        }

        public void PlayersListProvided(IList<Player> players, string connectionId)
        {
            _gameHubContext.Clients.Client(connectionId).SendAsync("PlayersListProvided", players);
        }

        public void BoardStateProvided(Board board, string connectionId)
        {
            _gameHubContext.Clients.Client(connectionId).SendAsync("BoardStateProvided", board);
        }

        public void BroadcastBoardState(Board board)
        {
            _gameHubContext.Clients.All.SendAsync("BoardStateProvided", board);
        }

        public void LogMessage(string message)
        {
            _gameHubContext.Clients.All.SendAsync("LogMessage", message);
        }
    }
}
